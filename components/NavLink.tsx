"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

/** next/link that marks itself aria-current="page" on its own route. */
export default function NavLink(props: ComponentProps<typeof Link> & { href: string }) {
  const pathname = usePathname();
  const current = !props.href.includes("#") && pathname === props.href;
  return <Link {...props} aria-current={current ? "page" : undefined} />;
}
