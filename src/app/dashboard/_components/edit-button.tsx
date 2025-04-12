"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

const formSchema = z.object({
    miles: z.string().min(1, "Miles is Required")
})

export default function EditButton({ shoeId, miles }: { shoeId: Id<"shoes">, miles: string }) {
    // const { toast } = useToast();
    // const organization = useOrganization();
    // const user = useUser();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            miles: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await updateShoeMileage({
                miles: values.miles,
                id: shoeId
            });
            form.reset();

            setIsFileDialogOpen(false);

            toast({
                variant: "default",
                title: "Shoe Mileage Updated",
            });
        } catch (err) {
            toast({
                variant: "destructive",
                title: "Something went wrong",
                description: "Your file could not be uploaded, try again later",
            });
        }
    }
    const [isFileDialogOpen, setIsFileDialogOpen] = useState(false);

    const updateShoeMileage = useMutation(api.shoes.updateShoeMileage);
    return (
        <Dialog
            open={isFileDialogOpen}
            onOpenChange={(isOpen) => {
                setIsFileDialogOpen(isOpen);
                form.reset();
            }}
        >
            <DialogTrigger asChild className="mb-2">
                <Button>Edit Miles</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="mb-8">Edit Your Mileage</DialogTitle>
                    <DialogDescription>
                        Keep track of your shoe mileage
                    </DialogDescription>
                </DialogHeader>

                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="flex space-x-4 items-end">
                                <FormField
                                    control={form.control}
                                    name="miles"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Miles</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder={miles} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button
                                type="submit"
                                disabled={form.formState.isSubmitting}
                                className="flex gap-1"
                            >
                                {form.formState.isSubmitting && (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                )}
                                Submit
                            </Button>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
}