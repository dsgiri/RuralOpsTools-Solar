import { Accordion, AccordionItem } from "./ui/Accordion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export interface CalculatorFooterProps {
  howItWorks: string[];
  definitions: { term: string; def: string }[];
  faqs: { q: string; a: string }[];
  relatedLinks: { to: string; label: string }[];
  disclaimer?: string;
}

export function CalculatorFooter({ howItWorks, definitions, faqs, relatedLinks, disclaimer }: CalculatorFooterProps) {
  return (
    <div className="mt-12 space-y-12 border-t border-slate-200 pt-12">
      <div className="grid gap-8 md:grid-cols-2">
        <section>
          <h3 className="text-lg font-bold text-slate-900 mb-4">How It Works</h3>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600">
            {howItWorks.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </section>
        <section>
          <h3 className="text-lg font-bold text-slate-900 mb-4">Definitions</h3>
          <dl className="space-y-3 text-sm">
            {definitions.map((def, i) => (
              <div key={i}>
                <dt className="font-bold text-slate-900">{def.term}</dt>
                <dd className="text-slate-600 mt-1">{def.def}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>

      <section>
        <h3 className="text-lg font-bold text-slate-900 mb-4">Frequently Asked Questions</h3>
        <Accordion>
          {faqs.map((faq, i) => (
            <AccordionItem key={i} title={faq.q}>
              {faq.a}
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <div className="grid gap-8 md:grid-cols-2 border-t border-slate-200 pt-12">
          <section>
          <h3 className="text-lg font-bold text-slate-900 mb-4">Related Tools</h3>
          <div className="flex flex-col gap-3">
            {relatedLinks.map((link, i) => (
              <Link key={i} to={link.to} className="flex items-center text-sm font-bold text-slate-700 hover:text-slate-900 bg-slate-50 p-3 rounded border border-slate-200 hover:border-slate-300 transition-colors">
                <ArrowRight className="h-4 w-4 mr-2 text-slate-400" /> {link.label}
              </Link>
            ))}
          </div>
        </section>
        <section>
          <h3 className="text-lg font-bold text-slate-900 mb-4">Assumptions & Disclaimer</h3>
          <p className="text-xs text-slate-500 leading-relaxed bg-slate-50 p-4 rounded border border-slate-200">
            {disclaimer || "Calculations provide estimates for planning purposes. Environmental conditions, shading, temperature, and equipment degradation will impact actual performance. Always build a safety margin into remote field equipment."}
          </p>
        </section>
      </div>
    </div>
  )
}
