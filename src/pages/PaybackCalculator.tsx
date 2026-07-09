import { useState, useEffect } from "react";
import { Printer, Link2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { CalculatorFooter } from "@/components/CalculatorFooter";
import { formatNumber } from "@/lib/utils";

export default function PaybackCalculator() {
  const [loadType, setLoadType] = useState("water_pump");
  const [solarCost, setSolarCost] = useState(8000);
  
  // Grid
  const [gridDistanceFeet, setGridDistanceFeet] = useState(1500);
  const [gridCostPerFoot, setGridCostPerFoot] = useState(15);
  const [gridEquipCost, setGridEquipCost] = useState(6000); // Grid pump etc.
  
  // Generator
  const [genUpfrontCost, setGenUpfrontCost] = useState(4000); // Gen + pump
  const [genFuelCost, setGenFuelCost] = useState(3.50);
  const [genGalPerHour, setGenGalPerHour] = useState(0.5);
  const [genHoursPerWeek, setGenHoursPerWeek] = useState(10);
  
  const [years, setYears] = useState(20);

  // GA4 Event - Started
  useEffect(() => {
    if (window.gtag) {
      window.gtag("event", "payback_calculator_started", {
        event_category: "Calculator",
        event_label: "Payback Comparator"
      });
    }
  }, []);

  // GA4 Event - Completed/Type
  const trackComparisonType = (type: string) => {
    if (window.gtag) {
      window.gtag("event", "payback_comparison_type", {
        event_category: "Calculator",
        event_label: type,
        value: type
      });
      window.gtag("event", "payback_calculator_completed", {
        event_category: "Calculator"
      });
    }
  };

  // Calculations
  const gridTotalUpfront = (gridDistanceFeet * gridCostPerFoot) + gridEquipCost;
  const grid20YearCost = gridTotalUpfront; // Assuming minimal ongoing for grid itself for this simple comparison, or maybe add some? The prompt says: "Grid total cost = (Distance × cost/foot) + grid equipment cost"

  const genAnnualFuel = (genHoursPerWeek * 52) * genGalPerHour * genFuelCost;
  const gen20YearCost = genUpfrontCost + (genAnnualFuel * years);

  let gridPayback: string | number = 0;
  if (solarCost < gridTotalUpfront) {
    gridPayback = "Instant";
  } else {
    // If grid has ongoing costs, we would divide. But grid is usually just upfront line extension in this model.
    gridPayback = "Never"; // If solar is more expensive upfront and grid has $0 ongoing in this model. Let's add a small annual grid cost if we need, but prompt says: "(Solar cost - Grid total cost) / annual grid running cost savings". Let's assume a $50/mo grid connection fee.
  }

  // Let's implement the prompt's exact logic
  const gridAnnualCost = 600; // $50/mo connection + usage
  if (solarCost < gridTotalUpfront) {
    gridPayback = "Instant";
  } else {
    gridPayback = ((solarCost - gridTotalUpfront) / gridAnnualCost).toFixed(1);
  }

  const genPayback = ((solarCost - genUpfrontCost) / genAnnualFuel).toFixed(1);
  
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Solar Payback Comparator</h1>
        <p className="mt-2 text-slate-600">Compare off-grid solar against running a generator or extending grid power lines.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>1. Solar System</CardTitle>
              <CardDescription>Your estimated off-grid solar cost.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select
                label="Equipment Type"
                value={loadType}
                onChange={(e) => setLoadType(e.target.value)}
                options={[
                  { value: "water_pump", label: "Remote Water Pump" },
                  { value: "gate_motor", label: "Electric Gate" },
                  { value: "other", label: "Other Remote Equipment" }
                ]}
              />
              <Input
                label="Solar + Battery System Cost ($)"
                type="number"
                value={solarCost}
                onChange={(e) => setSolarCost(Number(e.target.value))}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Grid Extension Alternative</CardTitle>
              <CardDescription>Cost to bring utility power to the site.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Distance (Feet)"
                  type="number"
                  value={gridDistanceFeet}
                  onChange={(e) => setGridDistanceFeet(Number(e.target.value))}
                />
                <Input
                  label="Cost per Foot ($)"
                  type="number"
                  value={gridCostPerFoot}
                  onChange={(e) => setGridCostPerFoot(Number(e.target.value))}
                />
              </div>
              <Input
                label="Grid-Powered Equipment Cost ($)"
                type="number"
                value={gridEquipCost}
                onChange={(e) => setGridEquipCost(Number(e.target.value))}
                hint="Cost of AC pump or gate motor if you use grid."
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Generator Alternative</CardTitle>
              <CardDescription>Cost to run a generator instead.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Gen + Equipment Upfront Cost ($)"
                type="number"
                value={genUpfrontCost}
                onChange={(e) => setGenUpfrontCost(Number(e.target.value))}
              />
              <div className="grid grid-cols-3 gap-4">
                <Input
                  label="Fuel $/Gal"
                  type="number"
                  step="0.1"
                  value={genFuelCost}
                  onChange={(e) => setGenFuelCost(Number(e.target.value))}
                />
                <Input
                  label="Gal / Hour"
                  type="number"
                  step="0.1"
                  value={genGalPerHour}
                  onChange={(e) => setGenGalPerHour(Number(e.target.value))}
                />
                <Input
                  label="Hours / Week"
                  type="number"
                  value={genHoursPerWeek}
                  onChange={(e) => setGenHoursPerWeek(Number(e.target.value))}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <section className="sticky top-6">
            <div className="bg-white border-2 border-slate-900 rounded-xl p-6 shadow-sm">
              <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Results</h2>
              
              <div className="space-y-6">
                
                <div onClick={() => trackComparisonType("grid")} className="cursor-pointer">
                  <div className="text-slate-500 text-xs uppercase mb-1">vs. Grid Extension</div>
                  <div className="text-3xl font-bold text-slate-900">
                    {gridPayback === "Instant" ? "Instant ROI" : `${gridPayback} Years`}
                  </div>
                  {gridPayback === "Instant" && (
                    <div className="text-sm text-green-600 font-medium mt-1">Solar is cheaper immediately.</div>
                  )}
                </div>

                <div onClick={() => trackComparisonType("generator")} className="cursor-pointer border-t border-slate-100 pt-4">
                  <div className="text-slate-500 text-xs uppercase mb-1">vs. Generator</div>
                  <div className="text-3xl font-bold text-slate-900">
                    {Number(genPayback) < 0 ? "Instant ROI" : `${genPayback} Years`}
                  </div>
                  <div className="text-sm text-slate-500 mt-1">Saves ${formatNumber(genAnnualFuel, 0)}/yr in fuel.</div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-slate-200">
                  <h3 className="text-sm font-bold text-slate-900 mb-4">{years}-Year Total Cost Comparison</h3>
                  
                  <div className="space-y-3">
                    <div className="relative pt-1">
                      <div className="flex mb-1 items-center justify-between">
                        <span className="text-xs font-bold uppercase text-slate-900">Solar</span>
                        <span className="text-sm font-bold text-slate-900">${formatNumber(solarCost, 0)}</span>
                      </div>
                      <div className="overflow-hidden h-4 text-xs flex rounded bg-slate-100">
                        <div style={{ width: `${Math.min(100, (solarCost / Math.max(solarCost, gridTotalUpfront, gen20YearCost)) * 100)}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
                      </div>
                    </div>

                    <div className="relative pt-1">
                      <div className="flex mb-1 items-center justify-between">
                        <span className="text-xs font-bold uppercase text-slate-900">Grid</span>
                        <span className="text-sm font-bold text-slate-900">${formatNumber(gridTotalUpfront, 0)}</span>
                      </div>
                      <div className="overflow-hidden h-4 text-xs flex rounded bg-slate-100">
                        <div style={{ width: `${Math.min(100, (gridTotalUpfront / Math.max(solarCost, gridTotalUpfront, gen20YearCost)) * 100)}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-slate-400"></div>
                      </div>
                    </div>

                    <div className="relative pt-1">
                      <div className="flex mb-1 items-center justify-between">
                        <span className="text-xs font-bold uppercase text-slate-900">Generator</span>
                        <span className="text-sm font-bold text-slate-900">${formatNumber(gen20YearCost, 0)}</span>
                      </div>
                      <div className="overflow-hidden h-4 text-xs flex rounded bg-slate-100">
                        <div style={{ width: `${Math.min(100, (gen20YearCost / Math.max(solarCost, gridTotalUpfront, gen20YearCost)) * 100)}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-slate-800"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded text-xs text-slate-600">
                    <strong>Note:</strong> Pure cost math doesn't capture reliability. A hybrid solar+generator setup is often the actual best real-world answer for critical redundancy.
                  </div>
                </div>

              </div>
              
              <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-slate-200">
                <Button onClick={() => window.print()} className="bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300 w-full">
                  <Printer className="mr-2 h-4 w-4" /> Print
                </Button>
                <Button onClick={() => navigator.clipboard.writeText(window.location.href)} className="bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300 w-full">
                  <Link2 className="mr-2 h-4 w-4" /> Copy Link
                </Button>
              </div>

            </div>
          </section>
        </div>
      </div>
      
      <CalculatorFooter
        howItWorks={[
          "Grid comparison: We calculate the upfront cost to extend power lines (distance × cost/foot) plus grid equipment. If solar is cheaper upfront, ROI is instant. Otherwise, we divide the extra solar cost by annual grid utility savings.",
          "Generator comparison: We calculate annual fuel cost based on your run time and fuel burn rate. We divide the extra upfront cost of solar by the annual fuel savings to find the payback period in years.",
          "20-Year Total: We compare the minimal ongoing cost of solar against 20 years of generator fuel and maintenance."
        ]}
        definitions={[
          { term: "Grid Extension", def: "Bringing utility power to a remote site. Often costs $10-$30+ per foot depending on terrain." },
          { term: "Instant ROI", def: "When the upfront cost of off-grid solar is actually less than the upfront cost of extending grid power." }
        ]}
        faqs={[
          { q: "Is solar really cheaper than a generator?", a: "Upfront, no. Over time, yes. A generator is cheap to buy but expensive to feed. Solar is expensive to buy but free to run." },
          { q: "What if I need 100% uptime?", a: "A hybrid system is best. Size solar for 90% of the year, and use a small auto-start generator for the 10% worst winter days." }
        ]}
        relatedLinks={[
          { to: "/pump-sizing", label: "Remote Pump Sizing" },
          { to: "/gate-sizing", label: "Electric Gate Sizing" }
        ]}
        disclaimer="Costs vary wildly by region. A real grid extension quote might include transformers ($3k-$5k) or trenching through rock. Generator costs here assume fuel only, ignoring oil changes, filters, and major overhauls every 5,000 hours."
      />
      
      {/* Worked Example */}
      <div className="mt-12 bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
        <h3 className="text-xl font-bold text-slate-900 mb-4">Worked Example: The Remote Pump</h3>
        <p className="text-slate-600 mb-4">
          Consider an off-grid cattle pump 1,500 feet from the nearest power pole.
        </p>
        <ul className="space-y-4 text-sm text-slate-700">
          <li className="flex items-start">
            <span className="font-mono bg-slate-100 px-2 py-1 rounded mr-3 text-slate-800">Grid:</span>
            <span>1,500 ft × $15/ft = $22,500 + $6,000 grid pump = <strong>$28,500 upfront</strong>.</span>
          </li>
          <li className="flex items-start">
            <span className="font-mono bg-slate-100 px-2 py-1 rounded mr-3 text-slate-800">Solar:</span>
            <span>Solar array, batteries, and DC pump = <strong>$8,000 upfront</strong>.</span>
          </li>
          <li className="flex items-start">
            <span className="font-mono bg-slate-100 px-2 py-1 rounded mr-3 text-slate-800">Verdict:</span>
            <span>Solar wins by $20,500 on day one. <strong>Instant ROI</strong>.</span>
          </li>
        </ul>
        <p className="text-slate-600 mt-6 pt-6 border-t border-slate-100">
          What if they used a generator instead? A $4,000 generator+pump setup burning 0.5 gal/hour for 10 hours a week at $3.50/gal costs about $910/year in fuel. The solar system ($8k) costs $4k more upfront, but pays for itself in just under 4.5 years in fuel savings—not counting generator maintenance and replacement. Over 20 years, the generator costs over $22,000.
        </p>
      </div>

    </div>
  );
}
