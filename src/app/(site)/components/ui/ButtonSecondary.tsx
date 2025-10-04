"use client";

import React from "react";
import Link from "next/link";
import clsx from "clsx";
import styles from "./ButtonSecondary.module.scss";

type Common = {
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string; // mapujemy na aria-label
};

type ButtonVariant = Common &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never; // gdy button – brak href
  };

type AnchorVariant = Common &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string; // gdy link – musi być href
  };

type Props = ButtonVariant | AnchorVariant;

// Type guard bez any
function isAnchorProps(p: Props): p is AnchorVariant {
  return typeof (p as AnchorVariant).href === "string";
}

const ButtonSecondary = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  Props
>(function ButtonSecondary(props, ref) {
  const { children, className, ariaLabel } = props;
  const classes = clsx(styles.base, styles.secondary, className);

  if (isAnchorProps(props)) {
    const { href, ...rest } = props;
    return (
      <Link
        href={href}
        {...rest}
        className={classes}
        aria-label={ariaLabel}
        ref={ref as React.Ref<HTMLAnchorElement>}
      >
        {children}
      </Link>
    );
  }

  const { type = "button", ...restBtn } = props;
  return (
    <button
      {...restBtn}
      type={type}
      className={classes}
      aria-label={ariaLabel}
      ref={ref as React.Ref<HTMLButtonElement>}
    >
      {children}
    </button>
  );
});

export default ButtonSecondary;
