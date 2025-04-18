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
    retireShoe: v.optional(v.boolean()), // true = retired, false = non-retired, undefined = all
    query: v.optional(v.string()),
  },

  async handler(ctx, args) {
    const user = await userIdentity(ctx);

    if (!user) {
      throw new ConvexError("You are not authenticated");
    }

    // Fetch all shoes for the user
    let shoes = await ctx.db
      .query("shoes")
      .withIndex("by_userId", (q) => q.eq("userId", user.user._id))
      .collect();

    // Filter by search query
    if (args.query) {
      const query = args.query.toLowerCase();
      shoes = shoes.filter((shoe) => shoe.name.toLowerCase().includes(query));
    }

    // Filter by retirement status if retireShoe is defined
    if (args.retireShoe !== undefined) {
      const retiredShoesIds = new Set(
        (
          await ctx.db
            .query("retiredShoes")
            .withIndex("by_userId_shoeId", (q) => q.eq("userId", user.user._id))
            .collect()
        ).map((retiredShoe) => retiredShoe.shoeId)
      );

      shoes = shoes.filter((shoe) => {
        const isRetired = retiredShoesIds.has(shoe._id);
        return args.retireShoe ? isRetired : !isRetired;
      });
    }

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

//toggle retire shoe
export const retireShoe = mutation({
  args: {
    shoeId: v.id("shoes"),
  },
  async handler(ctx, args) {
    const user = await userIdentity(ctx);

    if (!user) {
      throw new ConvexError("you are not authenticated");
    }

    const retiredShoe = await ctx.db
      .query("retiredShoes")
      .withIndex("by_userId_shoeId", (q) =>
        q.eq("userId", user.user._id).eq("shoeId", args.shoeId)
      )
      .first();

    if (!retiredShoe) {
      await ctx.db.insert("retiredShoes", {
        shoeId: args.shoeId,
        userId: user.user._id,
      });
    } else {
      await ctx.db.delete(retiredShoe._id);
    }
  },
});
