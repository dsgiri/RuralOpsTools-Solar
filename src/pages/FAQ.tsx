import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { useEffect } from "react";

export default function FAQ() {
  const faqs = [
    {
      q: "How long does it take for off-grid solar to pay for itself?",
      a: "If you are replacing a generator, solar typically pays for itself in 1 to 4 years through fuel and maintenance savings alone. If you are comparing solar to extending grid power lines, solar often pays for itself immediately (instant ROI) because off-grid solar costs less upfront than trenching poles and wires over long distances."
    },
    {
      q: "Is solar cheaper than running a generator for a remote pump?",
      a: "Yes. While a generator is cheaper to buy on day one, the cost of fuel and maintenance adds up rapidly. A typical remote solar pump setup will cost $4,000-$8,000 more upfront than a generator setup, but will save $1,000-$3,000 per year in fuel, resulting in a fast payback period."
    },
    {
      q: "How much does it cost to extend power lines vs. install solar?",
      a: "Extending grid power lines typically costs $10 to $30 per foot, or $50,000 to $150,000 per mile, plus potential transformer costs. A complete off-grid solar system for a gate or pump usually costs $2,000 to $10,000. If your equipment is more than a few hundred feet from an existing pole, solar is almost always cheaper."
    },
    {
      q: "How many sun hours do I need for a reliable off-grid pump system?",
      a: "Most reliable off-grid systems are designed based on the worst-case winter 'peak sun hours', which is often 2 to 4 hours per day depending on your location. Peak sun hours refer to the equivalent hours of 1,000 watts/m² irradiance, not total daylight hours."
    },
    {
      q: "What happens to solar output on cloudy days — do I need a bigger system?",
      a: "Solar panels still produce 10% to 25% of their rated power on cloudy days. To maintain reliability through storms, you need to increase your battery capacity (Days of Autonomy) rather than just adding more solar panels, as extra panels won't help much when there is no sun."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  useEffect(() => {
    if (window.gtag) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            window.gtag("event", "faq_expanded", {
              event_category: "Engagement",
              event_label: entry.target.textContent
            });
            observer.unobserve(entry.target);
          }
        });
      });
      document.querySelectorAll(".faq-item").forEach(item => observer.observe(item));
      return () => observer.disconnect();
    }
  }, []);

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Frequently Asked Questions</h1>
        <p className="mt-2 text-slate-600">Common questions about off-grid sizing for rural equipment.</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <Card key={index} className="faq-item group border border-slate-200">
            <CardHeader className="cursor-pointer">
              <CardTitle className="text-lg">{faq.q}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 leading-relaxed">{faq.a}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
