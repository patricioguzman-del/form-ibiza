"use client";

import { useId, useState } from "react";
import Link from "next/link";
import type { Dictionary } from "@/lib/i18n";

/**
 * The footer sign-up. The look is final; saving the address to Supabase arrives in milestone 6,
 * so until then the button says so instead of pretending to subscribe.
 */
export function NewsletterForm({ dict, privacyHref }: { dict: Dictionary["footer"]; privacyHref: string }) {
  const id = useId();
  const [notice, setNotice] = useState("");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setNotice(dict.newsletterSoon);
      }}
      className="flex w-full max-w-[560px] flex-col items-center gap-3"
    >
      <label htmlFor={id} className="t-label text-rule">
        {dict.newsletterLabel}
      </label>
      <div className="flex w-full flex-wrap gap-s2">
        <input
          id={id}
          type="email"
          name="email"
          autoComplete="email"
          required
          placeholder={dict.newsletterPlaceholder}
          className="t-body min-h-[48px] min-w-0 flex-[1_1_220px] rounded-none border border-line-control bg-transparent px-s2 text-paper placeholder:text-rule"
        />
        <button
          type="submit"
          className="t-ui min-h-[48px] flex-[1_1_100%] cursor-pointer rounded-none border border-paper bg-paper px-8 text-ink md:flex-none"
        >
          {dict.newsletterButton}
        </button>
      </div>
      <p className="t-caption m-0 text-center text-rule">
        {dict.newsletterNotice}{" "}
        <Link href={privacyHref} className="underline">
          {dict.privacy}
        </Link>
      </p>
      <p role="status" className="t-caption m-0 text-center text-paper">
        {notice}
      </p>
    </form>
  );
}
