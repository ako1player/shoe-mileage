import { ModeToggle } from "@/components/mode-toggle";

export function Header() {
    return (
        <div className="border-b py-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="">Shoe Mileage</div>
                <div className="flex gap-2">
                    {/* <OrganizationSwitcher />
                <UserButton />
                <SignedOut>
                    <SignInButton>
                        <Button>Sign In</Button>
                    </SignInButton>
                </SignedOut>*/}
                    <ModeToggle />
                </div>
            </div>
        </div>
    )
}