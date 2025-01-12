import { auth, signOut, signIn } from "@/auth";
import { BadgePlus, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export const Navbar = async () => {

    const session = await auth()

    return (
        <div className="px-5 py-3 bg-white shadow-sm font-work-sans">
            <nav className="flex justify-between items-center">
                <Link href="/">
                    <h1 className="text-[32px] font-bold text-primary">Starty</h1>
                </Link>

                <div className="flex items-center gap-5">
                    {session && session?.user ? (
                        <>
                            <Link href="/startup/create" className="text-sm font-bold text-primary">
                                <span className="max-sm:hidden text-[18px] font-bold">Create Startup</span>
                                <BadgePlus className="size-6 sm:hidden" />
                            </Link>

                            <form action={
                                async () => {
                                    "use server"

                                    await signOut(
                                        {
                                            redirectTo: "/",
                                        }
                                    )
                                }
                            }>
                                <button type="submit"  >
                                    <span className="max-sm:hidden text-[18px] font-bold">Logout</span>
                                    <LogOut className="size-6 sm:hidden" />
                                </button>
                            </form>

                            <Link href={`/user/${session?.user?.id}`}>
                                <Avatar className="size-12">
                                    <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || ""} />
                                    <AvatarFallback>AV</AvatarFallback>
                                </Avatar>
                            </Link>

                        </>
                    ) : (
                        <>
                            <form action={async () => {
                                "use server"

                                await signIn("github")
                            }}>
                                <button type="submit" className="text-sm font-bold text-primary">
                                    Login
                                </button>
                            </form>
                        </>
                    )
                    }
                </div>
            </nav >
        </div >
    )
}
