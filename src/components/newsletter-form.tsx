"use client";

import { useId, useState } from "react";

type Status = "idle" | "submitting" | "subscribed" | "unconfigured" | "error";

export type NewsletterCopy = {
  placeholder: string;
  submitLabel: string;
  success: string;
  unconfigured: string;
  error: string;
};

type NewsletterFormProps = NewsletterCopy & { endpoint: string };

export function NewsletterForm({
  endpoint,
  placeholder,
  submitLabel,
  success,
  unconfigured,
  error,
}: NewsletterFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const emailId = useId();

  const messages: Partial<Record<Status, string>> = {
    subscribed: success,
    unconfigured,
    error,
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!endpoint) {
      setStatus("unconfigured");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(event.currentTarget),
      });
      setStatus(response.ok ? "subscribed" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex max-w-[340px]">
        <label htmlFor={emailId} className="sr-only">
          {placeholder}
        </label>
        <input
          id={emailId}
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder={placeholder}
          className="text-cream min-h-11 min-w-0 flex-1 rounded-l-[6px] border border-[#3a413c] bg-transparent px-3 text-[13px] font-light placeholder:text-[#8f8c82] focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          aria-label={submitLabel}
          className="bg-gold-light text-ink w-12 rounded-r-[6px] text-[15px] disabled:opacity-70"
        >
          →
        </button>
      </form>
      {messages[status] ? (
        <p
          role="status"
          className={`m-0 text-[13px] ${
            status === "subscribed" ? "text-gold-light" : "text-footer-ink"
          }`}
        >
          {messages[status]}
        </p>
      ) : null}
    </>
  );
}
