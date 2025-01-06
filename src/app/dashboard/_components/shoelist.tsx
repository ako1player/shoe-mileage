"use client";

import { ShoeCard } from "@/app/dashboard/_components/shoe-card";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export default function ShoeList() {
    const user = useUser();

    const userId = user.isLoaded ? user.user?.id : undefined;

    // Fetch non-retired shoes
    const nonRetiredShoes = useQuery(
        api.shoes.getShoes,
        userId ? { userId, retireShoe: false } : "skip"
    );

    // Fetch retired shoes
    const retiredShoes = useQuery(
        api.shoes.getShoes,
        userId ? { userId, retireShoe: true } : "skip"
    );

    return (
        <div className="space-y-8">
            {/* Non-Retired Shoes Section */}
            <div>
                <h1 className="text-xl font-bold">Active Shoes</h1>
                <div className="flex gap-2">
                    {nonRetiredShoes && nonRetiredShoes.length > 0 ? (
                        nonRetiredShoes.map((shoe) => (
                            <ShoeCard key={shoe._id} shoe={shoe} />
                        ))
                    ) : (
                        <div>You have no active shoes on record.</div>
                    )}
                </div>
            </div>

            {/* Retired Shoes Section */}
            <div>
                <h1 className="text-xl font-bold">Retired Shoes</h1>
                <div className="flex gap-2">
                    {retiredShoes && retiredShoes.length > 0 ? (
                        retiredShoes.map((shoe) => (
                            <ShoeCard key={shoe._id} shoe={shoe} retired={true} />
                        ))
                    ) : (
                        <div>You have no retired shoes on record.</div>
                    )}
                </div>
            </div>
        </div>
    );
}
