"use client";

import EditButton from "@/app/dashboard/_components/edit-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export default function ShoeList() {
    const user = useUser();

    let userId: string | undefined = undefined;

    if (user.isLoaded) {
        userId = user.user?.id;
    }
    const getShoes = useQuery(api.shoes.getShoes, userId ? { userId } : "skip");
    const shoes = getShoes?.map((shoe) => shoe);
    return (
        <div className="flex gap-2">
            {shoes?.map((shoe, key) => (
                <Card className="w-[250px]" key={key}>
                    <CardHeader></CardHeader>
                    <CardContent className="grid gap-4">
                        <p>{shoe.name}</p>
                        <div className="flex gap-2 items-center content-center">
                            <Label>Miles</Label><p>{shoe.miles}</p>
                        </div>
                    </CardContent>
                    <CardFooter className="">
                        <div className="flex gap-1">
                            <EditButton shoeId={shoe._id} miles={shoe.miles} />
                            <Button variant={"destructive"}>Retire Shoe</Button>
                        </div>
                    </CardFooter>
                </Card>
            ))}
            {shoes?.length === 0 && (
                <div>You have no shoes on record.</div>
            )}
        </div>
    )
}