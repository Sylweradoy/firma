"use client";

import React from "react";
import Link from "next/link";
import clsx from "clsx";
import styles from "./ButtonPrimary.module.scss";

type Common = {
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
};

type ButtonVariant = Common &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type AnchorVariant = Common &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
  };

type Props = ButtonVariant | AnchorVariant;

function isAnchorProps(p: Props): p is AnchorVariant {
  return typeof (p as AnchorVariant).href === "string";
}

const ButtonPrimary = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  Props
>(function ButtonPrimary(props, ref) {
  const { children, className, ariaLabel } = props;
  const classes = clsx(styles.base, styles.primary, className);

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

export default ButtonPrimary;
