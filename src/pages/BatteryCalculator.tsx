import { useState } from "react";
import { Printer, Link2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Slider } from "@/components/ui/Slider";
import { Select } from "@/components/ui/Select";
import { CalculatorFooter } from "@/components/CalculatorFooter";
import { formatNumber } from "@/lib/utils";
import { calculateBatteryCapacityAh } from "@/lib/calculator";

export default function BatteryCalculator() {
  const [dailyEnergyWh, setDailyEnergyWh] = useState<number>(1000);
  const [daysOfAutonomy, setDaysOfAutonomy] = useState<number>(3);
  const [dod, setDod] = useState<number>(50);
  const [systemVoltage, setSystemVoltage] = useState<number>(12);

  const batteryCapacityAh = calculateBatteryCapacityAh({
    dailyEnergyWh: dailyEnergyWh || 0,
    daysOfAutonomy: daysOfAutonomy || 0,
    depthOfDischargePercent: dod || 0,
    systemVoltage: systemVoltage || 1,
  });

  const totalCapacityWh = batteryCapacityAh * systemVoltage;

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="flex justify-between items-end border-b border-slate-200 pb-2 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">System Sizing: Battery Bank</h1>
          <p className="mt-1 text-sm text-slate-500">Determine the battery capacity needed to run your load without sun.</p>
        </div>
        <span className="text-xs text-slate-400 font-mono hidden sm:inline-block">v1.4.2</span>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-7 flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Storage Requirements</CardTitle>
              <CardDescription>Daily usage and runtime expectations.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Daily Energy Usage (Wh)"
                type="number"
                min="0"
                value={dailyEnergyWh}
                onChange={(e) => setDailyEnergyWh(Number(e.target.value))}
                hint="Total watt-hours consumed in a 24-hour period."
              />
              <Slider
                label="Days of Autonomy"
                min="0"
                max="10"
                step="0.5"
                value={daysOfAutonomy}
                onChange={(e) => setDaysOfAutonomy(Number(e.target.value))}
                valueDisplay={`${daysOfAutonomy} days`}
                hint="How many days the system should run with zero solar input (typically 2-5 days)."
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Battery Specifications</CardTitle>
              <CardDescription>Chemistry and system design assumptions.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select
                label="System Voltage"
                value={systemVoltage}
                onChange={(e) => setSystemVoltage(Number(e.target.value))}
                options={[
                  { value: 12, label: "12V (Small loads, gates)" },
                  { value: 24, label: "24V (Medium loads, small pumps)" },
                  { value: 48, label: "48V (Large loads, heavy pumps)" },
                ]}
              />
              <Select
                label="Target Depth of Discharge (DoD)"
                value={dod}
                onChange={(e) => setDod(Number(e.target.value))}
                hint="Lower DoD extends battery life."
                options={[
                  { value: 30, label: "30% (Conservative Lead-Acid)" },
                  { value: 50, label: "50% (Standard Lead-Acid/AGM)" },
                  { value: 80, label: "80% (Lithium/LiFePO4)" },
                  { value: 100, label: "100% (Theoretical max)" },
                ]}
              />
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-5">
          <section className="sticky top-24 flex flex-col gap-4 bg-slate-900 text-white p-6 rounded-lg">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-800 pb-2">Recommended Sizing</h2>
            
            <div className="flex flex-col gap-6">
              <div>
                <div className="text-slate-400 text-xs uppercase mb-1">Total Energy Storage</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-mono font-bold">{formatNumber(totalCapacityWh / 1000, 2)}</span>
                  <span className="text-lg text-slate-400">kWh</span>
                </div>
                <div className="text-xs text-slate-500 mt-1 font-mono">{formatNumber(totalCapacityWh, 0)} Wh</div>
              </div>

              <div className="bg-slate-800 p-4 rounded">
                <div className="text-slate-400 text-[10px] uppercase mb-1">Required Battery Capacity</div>
                <div className="text-2xl font-mono font-bold">{formatNumber(batteryCapacityAh, 0)}<span className="text-sm font-normal ml-1">Ah</span></div>
                <div className="text-[10px] text-slate-500 mt-1 uppercase">@ {systemVoltage}V</div>
              </div>

              <div className="mt-4">
                <div className="bg-slate-800/50 border border-slate-700 p-3 rounded flex items-start gap-3">
                  <div className="w-5 h-5 bg-slate-600 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-white font-bold text-xs">
                    ?
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-300">Why so large?</div>
                    <div className="text-[11px] text-slate-400 leading-tight">To get {formatNumber(dailyEnergyWh * daysOfAutonomy, 0)} Wh of usable energy without dropping below {dod}% capacity, the total bank size must be larger than your actual usage.</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-slate-800">
                <Button onClick={() => window.print()} className="bg-slate-800 text-white hover:bg-slate-700 border border-slate-700 w-full">
                  <Printer className="mr-2 h-4 w-4" /> Print
                </Button>
                <Button onClick={() => navigator.clipboard.writeText(window.location.href)} className="bg-slate-800 text-white hover:bg-slate-700 border border-slate-700 w-full">
                  <Link2 className="mr-2 h-4 w-4" /> Copy Link
                </Button>
              </div>

            </div>
          </section>
        </div>
      </div>

      <CalculatorFooter
        howItWorks={[
          "We take your daily energy usage and multiply it by the required days of autonomy.",
          "We divide that total energy requirement by your Target Depth of Discharge (DoD) to ensure the battery is never completely drained.",
          "Finally, we divide the required Watt-hours by the system voltage to get the capacity in Amp-hours (Ah)."
        ]}
        definitions={[
          { term: "Days of Autonomy", def: "The number of consecutive days the battery can supply power without any recharge from the sun." },
          { term: "Depth of Discharge (DoD)", def: "The percentage of the battery that can be safely used. Lead-acid batteries degrade quickly if drained past 50%." }
        ]}
        faqs={[
          { q: "Can I just buy a battery rated for exactly my daily usage?", a: "No. If you drain a battery to 0% every day, it will die very quickly (especially lead-acid). You must oversize it to protect its lifespan." }
        ]}
        relatedLinks={[
          { to: "/solar-calculator", label: "Solar Array Sizing" },
          { to: "/gate-sizing", label: "Electric Gate Sizing" }
        ]}
      />
    </div>
  );
}
