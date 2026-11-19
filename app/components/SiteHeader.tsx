"use client";
import Link from "next/link";
import { Feather, ArrowUpRight } from "lucide-react";
export default function SiteHeader() {
return (
      <header className="flex items-center justify-between">
        <Link className="brand" href="/">
          <Feather size={25} /> dear<span>ly</span>
          <i>♡</i>
        </Link>
        <nav className="flex items-center gap-9">
          <span className="nav-note">
            A little less scrolling. A little more feeling.
          </span>
          <a href="#studio">
            The writing room <ArrowUpRight size={15} />
          </a>
        </nav>
      </header>

);
}
