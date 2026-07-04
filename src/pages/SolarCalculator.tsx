import { useState } from "react";
import { Printer, Link2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Slider } from "@/components/ui/Slider";
import { CalculatorFooter } from "@/components/CalculatorFooter";
import { formatNumber } from "@/lib/utils";
import { calculateDailyEnergyWh, calculateArraySizeWatts } from "@/lib/calculator";

export default function SolarCalculator() {
  const [watts, setWatts] = useState<number>(100);
  const [hoursPerDay, setHoursPerDay] = useState<number>(24);
  const [dutyCycle, setDutyCycle] = useState<number>(100);
  const [peakSunHours, setPeakSunHours] = useState<number>(4.5);
  const [efficiency, setEfficiency] = useState<number>(75);
  const [panelWattage, setPanelWattage] = useState<number>(100);

  const dailyEnergyWh = calculateDailyEnergyWh({
    watts: watts || 0,
    hoursPerDay: hoursPerDay || 0,
    dutyCyclePercent: dutyCycle || 0,
  });

  const arraySizeWatts = calculateArraySizeWatts({
    dailyEnergyWh,
    peakSunHours: peakSunHours || 0,
    systemEfficiencyPercent: efficiency || 0,
  });

  const suggestedPanels = panelWattage > 0 ? Math.ceil(arraySizeWatts / panelWattage) : 0;

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="flex justify-between items-end border-b border-slate-200 pb-2 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">System Sizing: General Array</h1>
          <p className="mt-1 text-sm text-slate-500">Calculate the recommended solar array size for your daily energy load.</p>
        </div>
        <span className="text-xs text-slate-400 font-mono hidden sm:inline-block">v1.4.2</span>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-7 flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Load Profile</CardTitle>
              <CardDescription>Define the power draw and runtime.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Load Wattage (W)"
                type="number"
                min="0"
                value={watts}
                onChange={(e) => setWatts(Number(e.target.value))}
                hint="Power drawn when the equipment is running."
              />
              <Input
                label="Hours Active Per Day"
                type="number"
                min="0"
                max="24"
                step="0.5"
                value={hoursPerDay}
                onChange={(e) => setHoursPerDay(Number(e.target.value))}
                hint="How many hours a day is the equipment turned on?"
              />
              <Slider
                label="Duty Cycle (%)"
                min="0"
                max="100"
                value={dutyCycle}
                onChange={(e) => setDutyCycle(Number(e.target.value))}
                valueDisplay={`${dutyCycle}%`}
                hint="Percentage of the active time it actually draws power."
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Environment & System</CardTitle>
              <CardDescription>Local conditions and losses.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Slider
                label="Peak Sun Hours"
                min="0"
                max="10"
                step="0.1"
                value={peakSunHours}
                onChange={(e) => setPeakSunHours(Number(e.target.value))}
                valueDisplay={`${peakSunHours} hrs`}
                hint="Average effective full-sun hours per day for your location."
              />
              <Slider
                label="System Efficiency (%)"
                min="0"
                max="100"
                value={efficiency}
                onChange={(e) => setEfficiency(Number(e.target.value))}
                valueDisplay={`${efficiency}%`}
                hint="Accounts for wiring, controller, and inverter losses (typically 65-80%)."
              />
              <Input
                label="Expected Panel Wattage (W)"
                type="number"
                min="0"
                value={panelWattage}
                onChange={(e) => setPanelWattage(Number(e.target.value))}
                hint="Wattage of the solar panels you plan to use."
              />
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-5">
          <section className="sticky top-24 flex flex-col gap-4 bg-slate-900 text-white p-6 rounded-lg">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-800 pb-2">Recommended Sizing</h2>
            
            <div className="flex flex-col gap-6">
              <div>
                <div className="text-slate-400 text-xs uppercase mb-1">Estimated Daily Demand</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-mono font-bold">{formatNumber(dailyEnergyWh / 1000, 2)}</span>
                  <span className="text-lg text-slate-400">kWh/day</span>
                </div>
                <div className="text-xs text-slate-500 mt-1 font-mono">{formatNumber(dailyEnergyWh, 0)} Wh/day</div>
              </div>

              <div className="bg-slate-800 p-4 rounded">
                <div className="text-slate-400 text-[10px] uppercase mb-1">Solar Array Size</div>
                <div className="text-2xl font-mono font-bold">{formatNumber(arraySizeWatts, 0)}<span className="text-sm font-normal ml-1">W</span></div>
                <div className="text-[10px] text-slate-500 mt-1 uppercase">Min. Recommended</div>
              </div>

              <div className="border-t border-slate-800 pt-4">
                <div className="text-slate-400 text-[10px] uppercase mb-3">Hardware Estimates</div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Panels ({panelWattage}W Standard)</span>
                  <span className="text-sm font-mono font-bold bg-slate-700 px-2 rounded">{suggestedPanels} Units</span>
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
          "First, we calculate your daily energy demand by multiplying load wattage by daily active hours and duty cycle.",
          "Next, we divide that daily energy by the peak sun hours in your location.",
          "Finally, we apply a system efficiency loss factor to determine the total raw solar array wattage required."
        ]}
        definitions={[
          { term: "Peak Sun Hours", def: "The equivalent hours per day when solar irradiance reaches 1,000 W/m²." },
          { term: "Duty Cycle", def: "The percentage of time the load is actively drawing power while turned 'on'." },
          { term: "System Efficiency", def: "Accounts for losses in wiring, charge controllers, and inverters." }
        ]}
        faqs={[
          { q: "Why is the recommended array size larger than my load?", a: "Because the sun only shines for a few hours a day, the array must harvest a full day's worth of energy in that short window, while also overcoming system inefficiencies." }
        ]}
        relatedLinks={[
          { to: "/battery-calculator", label: "Battery Storage Calculator" },
          { to: "/pump-sizing", label: "Remote Pump Sizing" }
        ]}
      />
    </div>
  );
}
