import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export default function FAQ() {
  const faqs = [
    {
      q: "What are 'Peak Sun Hours'?",
      a: "Peak sun hours are not the total hours the sun is up. It's the equivalent number of hours per day when solar irradiance is at 1,000 watts per square meter. In winter, a location might have 9 hours of daylight but only 2 peak sun hours. Always use winter peak sun hours for year-round reliability.",
    },
    {
      q: "Why is the recommended battery bank so much larger than my daily usage?",
      a: "Two reasons: Autonomy and Depth of Discharge (DoD). If you use 1000Wh a day and want 3 days of autonomy (running with no sun), you need 3000Wh. If you use lead-acid batteries, you shouldn't drain them below 50% to prevent damage. Therefore, you need a 6000Wh battery bank to safely provide 3000Wh.",
    },
    {
      q: "Why is standby power so important for electric gates?",
      a: "A gate motor might draw 150W but only runs for 30 seconds a day (1.25 Wh/day). The radio receiver and safety sensors might draw 2W, but they run 24 hours a day (48 Wh/day). The standby load is often 40x larger than the active motor load.",
    },
    {
      q: "What system efficiency should I use?",
      a: "For a well-designed MPPT system with thick wires, 80% is safe. For a cheap PWM controller, thin wires, or hot environments, use 65-70%. We default to conservative numbers to prevent field failures.",
    },
    {
      q: "Is it better to increase battery size or solar panel size?",
      a: "Usually, solar panels are cheaper than batteries. If your location gets consistent sun, over-sizing the solar array is cost-effective. If your location gets weeks of overcast weather (like the Pacific Northwest), you must increase battery capacity (autonomy) because extra panels won't help when there is no sun.",
    },
  ];

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Frequently Asked Questions</h1>
        <p className="mt-2 text-slate-600">Common questions about off-grid sizing for rural equipment.</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <Card key={index}>
            <CardHeader>
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
