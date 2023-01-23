import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <div className="px-6 py-2 flex items-center justify-between bg-[#121921]">
      <img src="/assets/congo.svg" alt="next" className="w-22 h-auto" />
      <Link
        href="infinite-scroll"
        className="text-white text-xs hover:text-cyan-500"
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
    </div>
    <main>{children}</main>
  </>
);

export default Layout;
