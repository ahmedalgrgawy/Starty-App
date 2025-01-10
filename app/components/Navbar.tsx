import { auth, signOut, signIn } from "@/auth";
import Link from "next/link"

export const Navbar = async () => {

    const session = await auth()

    return (
        <div className="px-5 py-3 bg-white shadow-sm font-work-sans">
            <nav className="flex justify-between items-center">
                <Link href="/">
                    <h1 className="text-2xl font-bold text-purple-600">
                        Starty-App
                    </h1>
                </Link>

                <div className="flex items-center gap-5">
                    {session && session?.user ? (
                        <>
                            <Link href="/startup/create" className="text-sm font-bold text-purple-600">
                                <span>Create Startup</span>
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
                                    Logout
                                </button>
                            </form>

                            <Link href={`/user/${session?.id}`}>
                                <span>{session?.user?.name}</span>
                            </Link>

                        </>
                    ) : (
                        <>
                            <form action={async () => {
                                "use server"

                                await signIn("github")
                            }}>
                                <button type="submit" className="text-sm font-bold text-purple-600">
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
