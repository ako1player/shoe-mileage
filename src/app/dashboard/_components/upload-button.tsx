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

const formSchema = z.object({
    shoe: z.string().min(1).max(200, "Name is required"),
    miles: z.string().min(1, "Miles is Required")
})

export default function UploadButton() {
    // const { toast } = useToast();
    // const organization = useOrganization();
    // const user = useUser();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            shoe: "",
            miles: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await createShoeMileage({
                name: values.shoe,
                miles: values.miles
            });
            form.reset();

            setIsFileDialogOpen(false);

            toast({
                variant: "default",
                title: "Shoe Data Created",
                description: "keep track of those miles!",
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

    const createShoeMileage = useMutation(api.shoes.createShoeMileage)
    return (
        <Dialog
            open={isFileDialogOpen}
            onOpenChange={(isOpen) => {
                setIsFileDialogOpen(isOpen);
                form.reset();
            }}
        >
            <DialogTrigger asChild>
                <Button>Add Shoe</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="mb-8">Create New Shoe Form</DialogTitle>
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
                                    name="shoe"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Shoe Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="miles"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Miles</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
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