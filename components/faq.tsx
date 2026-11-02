import type { Faq } from "@/content/types";
import { JsonLd } from "./json-ld";
import { faqJsonLd } from "@/lib/seo";

/** Accessible FAQ using native details/summary. Emits FAQPage JSON-LD. */
export function FaqList({ faqs, withJsonLd = true }: { faqs: Faq[]; withJsonLd?: boolean }) {
  return (
    <div className="divide-y divide-line rounded-lg border border-line bg-paper">
      {withJsonLd && <JsonLd data={faqJsonLd(faqs)} />}
      {faqs.map((f) => (
        <details key={f.question} className="group px-5 py-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-ink [&::-webkit-details-marker]:hidden">
            {f.question}
            <span aria-hidden="true" className="text-brand transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="mt-3 leading-relaxed text-ink-soft">{f.answer}</p>
        </details>
      ))}
    </div>
  );
}
