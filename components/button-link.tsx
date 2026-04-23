import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  children: ReactNode;
  className?: string;
  href: string;
  variant?: "primary" | "secondary" | "outline" | "dark";
};

export function ButtonLink({
  children,
  className,
  href,
  variant = "primary",
}: ButtonLinkProps) {
  const classes = ["button", `button-${variant}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <Link className={classes} href={href}>
      {children}
    </Link>
  );
}
