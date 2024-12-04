import { ConvexError, v } from "convex/values";
import { mutation, MutationCtx, query, QueryCtx } from "./_generated/server";

export async function userIdentity(ctx: QueryCtx | MutationCtx) {
  const identity = await ctx.auth.getUserIdentity();

  if (!identity) {
    return null;
  }

  const user = await ctx.db
    .query("users")
    .withIndex("by_tokenIdentifier", (q) =>
      q.eq("tokenIdentifier", identity.tokenIdentifier)
    )
    .first();

  if (!user) {
    return null;
  }

  return { user };
}

//create shoe entry
export const createShoeMileage = mutation({
  args: {
    name: v.string(),
    miles: v.string(),
  },
  async handler(ctx, args) {
    const user = await userIdentity(ctx);

    if (!user) {
      throw new ConvexError("you are not authenticated");
    }

    await ctx.db.insert("shoes", {
      name: args.name,
      miles: args.miles,
      userId: user.user._id,
    });
  },
});

//Get all shoes for user
export const getShoes = query({
  args: {
    userId: v.string(),
  },

  async handler(ctx) {
    const user = await userIdentity(ctx);

    if (!user) {
      throw new ConvexError("you are not authenticated");
    }

    const shoes = await ctx.db
      .query("shoes")
      .withIndex("by_userId", (q) => q.eq("userId", user.user._id))
      .collect();

    return shoes;
  },
});

//update shoe mileage
export const updateShoeMileage = mutation({
  args: {
    miles: v.string(),
    id: v.id("shoes"),
  },
  async handler(ctx, args) {
    const user = await userIdentity(ctx);

    if (!user) {
      throw new ConvexError("you are not authenticated");
    }

    await ctx.db.patch(args.id, {
      miles: args.miles,
    });
  },
});
