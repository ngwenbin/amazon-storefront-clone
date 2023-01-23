import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useRouter();

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-2 flex items-center justify-between bg-[#121921]">
        <Link href="/">
          <img src="/assets/congo.svg" alt="next" className="w-22 h-auto" />
        </Link>
        {pathname === "/" ? (
          <Link
            href="infinite-scroll"
            className="text-white text-xs hover:text-blue-500"
          >
            <div className="flex gap-x-1 items-center">
              <p>
                Switch to infinite
                <br />
                scroll demo
              </p>
              <ArrowRightIcon width={18} />
            </div>
          </Link>
        ) : null}
      </div>
      <main className="grow">{children}</main>
    </div>
  );
};

export default Layout;
