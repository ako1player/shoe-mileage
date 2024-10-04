import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createShoeMileage = mutation({
  args: {
    name: v.string(),
    miles: v.string(),
  },
  async handler(ctx, args) {
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

    await ctx.db.insert("shoes", {
      name: args.name,
      miles: args.miles,
      userId: user._id,
    });
  },
});
