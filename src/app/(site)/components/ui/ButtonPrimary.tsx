"use client";

import Link from "next/link";
import clsx from "clsx";
import styles from "./Button.module.scss";

type Props = {
  children: React.ReactNode;
  href?: string;
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
  onClick?: () => void;
};

export default function ButtonPrimary({ children, href, className, disabled, ariaLabel, onClick }: Props) {
  const classes = clsx(styles.base, styles.primary, disabled && styles.disabled, className);

  if (href && !disabled) {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} disabled={disabled} aria-label={ariaLabel} onClick={onClick}>
      {children}
    </button>
  );
}
