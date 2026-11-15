"use client";

import Link from "next/link";
import { useId, useState } from "react";
import type { Dictionary } from "@/lib/i18n";

const fieldClass =
  "t-body min-h-[48px] w-full min-w-0 rounded-none border border-line-control bg-transparent px-s2 text-ink";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: (id: string) => React.ReactNode;
}) {
  const id = useId();
  return (
    <div className="flex min-w-0 flex-[1_1_220px] flex-col gap-s1">
      <label htmlFor={id} className="t-label leading-[1.6]">
        {label} {required && <span aria-hidden="true">*</span>}
      </label>
      {children(id)}
    </div>
  );
}

/**
 * The enquiry form. The look is final. Saving to Supabase and the email alerts are milestone 6,
 * so until then the button says so instead of pretending to send.
 * "Request Information" on a listing carries the property name automatically.
 */
export function EnquiryForm({
  dict,
  consent,
  privacyHref,
  propertyLabel,
  formType,
}: {
  dict: Dictionary["enquiry"];
  consent: Dictionary["pages"]["enquiry"];
  privacyHref: string;
  propertyLabel?: string;
  formType: string;
}) {
  const consentId = useId();
  const [notice, setNotice] = useState("");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setNotice(dict.sendingSoon);
      }}
      className="flex w-full flex-col gap-s3"
    >
      <input type="hidden" name="formType" value={formType} />
      {propertyLabel && (
        <>
          <input type="hidden" name="property" value={propertyLabel} />
          <p className="m-0 border-b border-rule pb-s2 text-[15px]">
            <span className="text-ink-soft">{dict.property}</span>{" "}
            <span className="ml-3 font-normal">{propertyLabel}</span>
          </p>
        </>
      )}

      <div className="flex flex-wrap gap-s3">
        <Field label={dict.firstName} required>
          {(id) => <input id={id} name="firstName" type="text" required autoComplete="given-name" className={fieldClass} />}
        </Field>
        <Field label={dict.lastName} required>
          {(id) => <input id={id} name="lastName" type="text" required autoComplete="family-name" className={fieldClass} />}
        </Field>
      </div>
      <div className="flex flex-wrap gap-s3">
        <Field label={dict.email} required>
          {(id) => <input id={id} name="email" type="email" required autoComplete="email" className={fieldClass} />}
        </Field>
        <Field label={dict.phone}>
          {(id) => <input id={id} name="phone" type="tel" autoComplete="tel" className={fieldClass} />}
        </Field>
      </div>
      <div className="flex flex-wrap gap-s3">
        <Field label={dict.message}>
          {(id) => (
            <textarea id={id} name="message" rows={5} className={`${fieldClass} min-h-[144px] resize-y py-3`} />
          )}
        </Field>
      </div>

      <div className="t-label flex items-start gap-3 leading-[1.6]">
        <input id={consentId} name="consent" type="checkbox" required className="mt-[1px] h-5 w-5 flex-none accent-ink" />
        <label htmlFor={consentId}>
          {consent.consent}{" "}
          <Link href={privacyHref} className="underline">
            {consent.privacyPolicy}
          </Link>
        </label>
      </div>

      <div className="flex flex-col gap-s2">
        <button type="submit" className="btn-primary self-start">
          {dict.send}
        </button>
        <p role="status" className="t-caption m-0 text-ink">
          {notice}
        </p>
      </div>
    </form>
  );
}
