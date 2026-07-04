import { Link } from "react-router-dom";
import { ArrowRight, Battery, Sun, Zap, Droplet } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";

export default function Home() {
  const tools = [
    {
      title: "Solar Array Sizing",
      description: "Size a solar array for remote loads based on daily energy needs and local sun hours.",
      icon: Sun,
      to: "/solar-calculator",
    },
    {
      title: "Battery Storage",
      description: "Estimate battery capacity required for multi-day autonomy and reliable overnight operation.",
      icon: Battery,
      to: "/battery-calculator",
    },
    {
      title: "Remote Pump Sizing",
      description: "Calculate solar and battery needs for intermittent off-grid water pumping.",
      icon: Droplet,
      to: "/pump-sizing",
    },
    {
      title: "Electric Gate Sizing",
      description: "Determine the array and battery size needed for high-draw, short-duration gate motors.",
      icon: Zap,
      to: "/gate-sizing",
    },
  ];

  return (
    <div className="space-y-12">
      <section className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Practical solar sizing tools for remote pumps and gates.
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-600">
          Estimate solar array needs, battery storage, and system efficiency for off-grid field equipment. Clear assumptions, no hype.
        </p>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {tools.map((tool) => (
          <Link key={tool.to} to={tool.to} className="block group">
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="rounded bg-slate-100 p-3 group-hover:bg-slate-200 transition-colors">
                    <tool.icon className="h-6 w-6 text-slate-700" />
                  </div>
                  <div>
                    <CardTitle className="group-hover:text-slate-900 transition-colors text-lg">{tool.title}</CardTitle>
                    <CardDescription className="mt-1 normal-case tracking-normal">{tool.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm font-bold text-slate-700 group-hover:text-slate-900">
                  Open Calculator <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>

      <section className="rounded-lg bg-slate-100 p-8 text-center sm:p-12 border border-slate-200">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Built for real operational decisions</h2>
        <p className="mx-auto mt-4 max-w-2xl text-slate-600 leading-relaxed">
          These tools are designed to reduce guesswork in the field. Remember that all estimates depend heavily on local sun hours, actual duty cycles, and battery chemistry assumptions. Always review the <Link to="/assumptions" className="font-bold text-slate-900 underline underline-offset-4">assumptions</Link> before purchasing equipment.
        </p>
      </section>
    </div>
  );
}
