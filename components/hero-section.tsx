"use client";
import { Logo } from "@/components/logo";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, SendHorizonal, SendHorizontal, X } from "lucide-react";
import Image from "next/image";

const menuItems = [
  { name: "Features", href: "#" },
  { name: "Solution", href: "#" },
  { name: "Pricing", href: "#" },
  { name: "About", href: "#" },
];

export default function HeroSection() {
  const [menuState, setMenuState] = useState(false);
  return (
    <>
      <main>
        <div
          aria-hidden
          className="z-2 absolute inset-0 isolate hidden opacity-50 contain-strict lg:block "
        >
          <div className="w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
          <div className="h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
          <div className="h-320 -translate-y-87.5 absolute left-0 top-0 w-60 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
        </div>

        <section className="bg-muted/50 dark:bg-background overflow-hidden md:pt-20"> 
          <div className="relative mx-auto max-w-5xl px-6 pt-28 lg:pt-24">
            <div className="relative z-10 mx-auto max-w-2xl text-center">
              <h1 className="text-balance text-4xl font-semibold md:text-5xl lg:text-6xl">
                Notes That Work As Hard As You Do
              </h1>
              <p className="text-muted-foreground mx-auto my-8 max-w-2xl text-xl">
                The digital workspace where creativity meets organization,
                helping you capture inspiration and turn ideas into reality.
              </p>

              <Button size="lg">
                <Link href="/login" className="group flex items-center gap-2 ">
                  <span className="md:text-base text-sm">Get Started</span>
                  <SendHorizontal className="transition-all duration-300 ease-in-out group-hover:translate-x-3" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="mx-auto 2xl:max-w-7xl">
            <div className="perspective-distant">
              <div className="lg:h-176 rotate-x-20 mask-b-from-55% border-1 border-neutral-800/40 rounded-2xl mask-b-to-100% mask-r-from-75% skew-x-12 ">
                <Image
                  className="rounded-(--radius) border shadow-xl dark:hidden"
                  src="/card.png"
                  alt="nexus hero section"
                  width={2880}
                  height={2074}
                />
                <Image
                  className="rounded-(--radius) hidden border shadow-xl dark:block"
                  src="/home.png"
                  alt="nexus hero section"
                  width={2880}
                  height={2074}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
