import { useState } from "react";
import { Printer, Link2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Slider } from "@/components/ui/Slider";
import { CalculatorFooter } from "@/components/CalculatorFooter";
import { formatNumber } from "@/lib/utils";
import { calculateDailyEnergyWh, calculateArraySizeWatts, calculateBatteryCapacityAh } from "@/lib/calculator";

export default function GateSizing() {
  const [motorWatts, setMotorWatts] = useState<number>(150);
  const [standbyWatts, setStandbyWatts] = useState<number>(2);
  const [openingsPerDay, setOpeningsPerDay] = useState<number>(20);
  const [secondsPerOpening, setSecondsPerOpening] = useState<number>(30);
  const [peakSunHours, setPeakSunHours] = useState<number>(4);
  const [daysOfAutonomy, setDaysOfAutonomy] = useState<number>(5);
  const [panelWattage, setPanelWattage] = useState<number>(20);

  // Constants
  const systemVoltage = 12; // Most gate motors are 12V or 24V, 12V is common for small solar setups
  const efficiency = 70; 
  const dod = 50; // Lead acid AGM standard

  // Calculations
  const activeHoursPerDay = (openingsPerDay * secondsPerOpening) / 3600;
  const standbyHoursPerDay = 24 - activeHoursPerDay;

  const activeEnergyWh = calculateDailyEnergyWh({
    watts: motorWatts || 0,
    hoursPerDay: activeHoursPerDay,
    dutyCyclePercent: 100,
  });

  const standbyEnergyWh = calculateDailyEnergyWh({
    watts: standbyWatts || 0,
    hoursPerDay: standbyHoursPerDay,
    dutyCyclePercent: 100,
  });

  const totalDailyEnergyWh = activeEnergyWh + standbyEnergyWh;

  const arraySizeWatts = calculateArraySizeWatts({
    dailyEnergyWh: totalDailyEnergyWh,
    peakSunHours: peakSunHours || 0,
    systemEfficiencyPercent: efficiency,
  });

  const batteryCapacityAh = calculateBatteryCapacityAh({
    dailyEnergyWh: totalDailyEnergyWh,
    daysOfAutonomy: daysOfAutonomy || 0,
    depthOfDischargePercent: dod,
    systemVoltage: systemVoltage,
  });

  const suggestedPanels = panelWattage > 0 ? Math.ceil(arraySizeWatts / panelWattage) : 0;

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="flex justify-between items-end border-b border-slate-200 pb-2 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">System Sizing: Electric Gate</h1>
          <p className="mt-1 text-sm text-slate-500">Gate motors have high draw but run for seconds. Standby power is the hidden load.</p>
        </div>
        <span className="text-xs text-slate-400 font-mono hidden sm:inline-block">v1.4.2</span>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-7 flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Usage Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Motor Draw (Watts)"
                type="number"
                min="0"
                value={motorWatts}
                onChange={(e) => setMotorWatts(Number(e.target.value))}
                hint="Power drawn while the gate is moving."
              />
              <Input
                label="Standby Draw (Watts)"
                type="number"
                min="0"
                step="0.5"
                value={standbyWatts}
                onChange={(e) => setStandbyWatts(Number(e.target.value))}
                hint="Power used 24/7 by the receiver, sensors, and controller."
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Cycles per Day"
                  type="number"
                  min="0"
                  value={openingsPerDay}
                  onChange={(e) => setOpeningsPerDay(Number(e.target.value))}
                  hint="Open + close = 1 cycle."
                />
                <Input
                  label="Seconds per Cycle"
                  type="number"
                  min="0"
                  value={secondsPerOpening}
                  onChange={(e) => setSecondsPerOpening(Number(e.target.value))}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Environment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Peak Sun Hours"
                type="number"
                min="0"
                step="0.1"
                value={peakSunHours}
                onChange={(e) => setPeakSunHours(Number(e.target.value))}
              />
              <Slider
                label="Days of Autonomy"
                min="0"
                max="14"
                step="1"
                value={daysOfAutonomy}
                onChange={(e) => setDaysOfAutonomy(Number(e.target.value))}
                valueDisplay={`${daysOfAutonomy} days`}
                hint="Gates often need higher autonomy (5-7 days) for winter reliability."
              />
              <Input
                label="Panel Wattage Available"
                type="number"
                min="0"
                value={panelWattage}
                onChange={(e) => setPanelWattage(Number(e.target.value))}
                hint="Standard small panels are 10W, 20W, or 50W."
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
                  <span className="text-4xl font-mono font-bold">{formatNumber(totalDailyEnergyWh, 1)}</span>
                  <span className="text-lg text-slate-400">Wh/day</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800 p-4 rounded">
                  <div className="text-slate-400 text-[10px] uppercase mb-1">Solar Array Size</div>
                  <div className="text-2xl font-mono font-bold">{formatNumber(arraySizeWatts, 0)}<span className="text-sm font-normal ml-1">W</span></div>
                  <div className="text-[10px] text-slate-500 mt-1 uppercase">Min. Recommended</div>
                </div>
                <div className="bg-slate-800 p-4 rounded">
                  <div className="text-slate-400 text-[10px] uppercase mb-1">Battery Storage</div>
                  <div className="text-2xl font-mono font-bold">{formatNumber(batteryCapacityAh, 0)}<span className="text-sm font-normal ml-1">Ah</span></div>
                  <div className="text-[10px] text-slate-500 mt-1 uppercase">@ 12V / {daysOfAutonomy} Days</div>
                </div>
              </div>

              <div className="border-t border-slate-800 pt-4">
                <div className="text-slate-400 text-[10px] uppercase mb-3">Energy Breakdown</div>
                <div className="flex h-3 w-full overflow-hidden rounded bg-slate-800 mb-3">
                  <div 
                    className="bg-yellow-500" 
                    style={{ width: `${totalDailyEnergyWh > 0 ? (activeEnergyWh / totalDailyEnergyWh) * 100 : 0}%` }} 
                    title="Active Energy"
                  />
                  <div 
                    className="bg-slate-600" 
                    style={{ width: `${totalDailyEnergyWh > 0 ? (standbyEnergyWh / totalDailyEnergyWh) * 100 : 0}%` }}
                    title="Standby Energy"
                  />
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-yellow-500"></span>Active (Motor)</span>
                  <span className="text-sm font-mono font-bold bg-slate-700 px-2 rounded">{formatNumber(activeEnergyWh, 1)} Wh</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-slate-600"></span>Standby (24/7)</span>
                  <span className="text-sm font-mono font-bold bg-slate-700 px-2 rounded">{formatNumber(standbyEnergyWh, 1)} Wh</span>
                </div>
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
          "We calculate the active load (when the gate is moving) and the standby load (24/7 draw of sensors and receivers).",
          "We add these together to get total daily energy demand.",
          "We size the solar panel to replenish this energy during peak sun hours, and size the battery to provide 5-7 days of autonomy."
        ]}
        definitions={[
          { term: "Standby Draw", def: "The continuous power consumed by the gate's radio receiver, photo-eyes, and controller board." },
          { term: "Active Load", def: "The peak power consumed by the motor when actively opening or closing." }
        ]}
        faqs={[
          { q: "Why is standby power so important?", a: "Because standby power runs 24/7. A 2W receiver uses 48Wh per day. A 150W motor running for 1 minute a day uses only 2.5Wh. Standby is the real load." }
        ]}
        relatedLinks={[
          { to: "/battery-calculator", label: "Battery Storage Calculator" },
          { to: "/pump-sizing", label: "Remote Pump Sizing" }
        ]}
      />
    </div>
  );
}
