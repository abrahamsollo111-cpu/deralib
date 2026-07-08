import type { FaqItem } from "@/lib/content";
import JsonLd from "./JsonLd";

export default function Faq({ items, withSchema = true }: { items: FaqItem[]; withSchema?: boolean }) {
  return (
    <>
      <div className="faq-list">
        {items.map((item) => (
          <details key={item.q} className="faq-item">
            <summary>{item.q}</summary>
            <div className="faq-answer">{item.r}</div>
          </details>
        ))}
      </div>
      {withSchema && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.r },
            })),
          }}
        />
      )}
    </>
  );
}
