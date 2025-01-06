import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    tokenIdentifier: v.string(),
    name: v.optional(v.string()),
  }).index("by_tokenIdentifier", ["tokenIdentifier"]),
  shoes: defineTable({
    name: v.string(),
    miles: v.string(),
    userId: v.id("users"),
    shouldDelete: v.optional(v.boolean()),
  }).index("by_userId", ["userId"]),
  retiredShoes: defineTable({
    shoeId: v.id("shoes"),
    userId: v.id("users"),
  }).index("by_userId_shoeId", ["userId", "shoeId"]),
});
