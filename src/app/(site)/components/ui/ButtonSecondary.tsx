"use client";

import React from "react";
import Link from "next/link";
import clsx from "clsx";
import styles from "./ButtonSecondary.module.scss";

type ButtonVariant = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: undefined;
  ariaLabel?: string;
};

type AnchorVariant = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  ariaLabel?: string;
};

type Props = ButtonVariant | AnchorVariant;

const ButtonSecondary = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, Props>(
  function ButtonSecondary(props, ref) {
    const { children, className, ariaLabel } = props as Props;
    const classes = clsx(styles.base, styles.secondary, className);

    // Link
    if ("href" in props && typeof props.href === "string" && !(props as any).disabled) {
      const { href, ...rest } = props as AnchorVariant;
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

    // Button
    const { href: _href, type = "button", ...restBtn } = props as ButtonVariant;
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
  }
);

export default ButtonSecondary;
