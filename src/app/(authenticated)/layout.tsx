import { logoutAction } from "@/actions/logout";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ReactNode } from "react";

type Props = { children: ReactNode };

export default function AuthenticatedLayout({ children }: Props) {
  return (
    <div className="flex relative">
      <header className="fixed top-0 left-0 p-4 h-screen flex flex-col justify-between text-center w-48 border-r">
        <div>
          <h1>DM AI</h1>

          <nav className="mt-8 px-8">
            <ul className="flex flex-col gap-2">
              <li>
                <Button asChild>
                  <Link className="w-full" href="/" prefetch>
                    Home
                  </Link>
                </Button>
              </li>

              <li>
                <Button asChild>
                  <Link className="w-full" href="/tavern" prefetch>
                    Tavern
                  </Link>
                </Button>
              </li>

              <li>
                <Button asChild>
                  <Link className="w-full" href="/shop" prefetch>
                    Shop
                  </Link>
                </Button>
              </li>

              <li>
                <Button asChild>
                  <Link className="w-full" href="/npc" prefetch>
                    NPC
                  </Link>
                </Button>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-2">
          <ThemeSwitcher />

          <form action={logoutAction}>
            <Button>Logout</Button>
          </form>
        </div>
      </header>

      <div className="flex-grow w-full p-4 overflow-auto ml-48 min-h-screen">
        {children}
      </div>
    </div>
  );
}
