import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

import ThemeButton from "./themeButton";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-b-border bg-background">
      <div className="mx-auto container flex py-2 pl-6 pr-2 justify-between items-center">
        <Link href={"/"}>
          <p className="large">Base app</p>
        </Link>
        <div className="flex space-x-2 items-center">
          <ThemeButton />
          <SignedIn>
            <UserButton userProfileMode={"modal"} />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size={"sm"}>
                  Menu
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className={"mr-2"}>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/category">All categories</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <Button size={"sm"} className="my-auto">
                Sign in
              </Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}
