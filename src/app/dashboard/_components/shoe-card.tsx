import EditButton from "@/app/dashboard/_components/edit-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Label } from "@radix-ui/react-label"
import { useMutation } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { Doc } from "../../../../convex/_generated/dataModel"

export function ShoeCard({ shoe, retired }: { shoe: Doc<"shoes">, retired?: boolean }) {

    const retireShoe = useMutation(api.shoes.retireShoe);

    return (
        <Card className="w-[250px]">
            <CardHeader></CardHeader>
            <CardContent className="grid gap-4">
                <p>{shoe.name}</p>
                <div className="flex gap-2 items-center content-center">
                    <Label>Miles</Label><p>{shoe.miles}</p>
                </div>
            </CardContent>
            <CardFooter className="">
                <div className="flex gap-1">
                    {retired ? (<>
                        <Button onClick={() => { retireShoe({ shoeId: shoe._id }) }} variant={"destructive"}>Unretire Shoe</Button>
                    </>) : (
                        <div>
                            <EditButton shoeId={shoe._id} miles={shoe.miles} />
                            <Button onClick={() => { retireShoe({ shoeId: shoe._id }) }} variant={"destructive"}>Retire Shoe</Button>
                        </div>
                    )}
                </div>
            </CardFooter>
        </Card>
    )
}