import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export function Header() {
    return (
        <div className="border-b py-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href={"/"}>Shoe Mileage</Link>
                <div className="flex gap-2">
                    {/* {/* <OrganizationSwitcher /> */}
                    <UserButton />
                    <SignedOut>
                        <SignInButton forceRedirectUrl={"/dashboard"}>
                            <Button>Sign In</Button>
                        </SignInButton>
                    </SignedOut>
                    <ModeToggle />
                </div>
            </div>
        </div>
    )
}