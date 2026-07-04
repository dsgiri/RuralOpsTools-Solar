import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export default function About() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">About Solar by RuralOpsTools</h1>
        <p className="mt-2 text-slate-600">Boring but useful tools for rural operators.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Our Mission</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-slate-600 leading-relaxed">
          <p>
            RuralOpsTools builds focused utilities that help farmers, ranchers, and land managers make practical decisions.
          </p>
          <p>
            The solar industry is full of consumer RV products, flashy residential sales dashboards, and exaggerated claims. When you are trying to power a remote well pump or a security gate a mile from the nearest road, you don't need marketing—you need reliable math and clear assumptions.
          </p>
          <p>
            Solar by RuralOpsTools was created to provide fast, dependable sizing estimates for off-grid field equipment. We focus on low-maintenance installations and high-reliability design principles.
          </p>
          <p className="pt-4 font-bold text-slate-900">
            Keep it simple. Expose the math. Build it to work.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
