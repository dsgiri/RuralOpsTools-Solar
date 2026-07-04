import { useState } from "react";
import { Printer, Link2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Slider } from "@/components/ui/Slider";
import { Select } from "@/components/ui/Select";
import { CalculatorFooter } from "@/components/CalculatorFooter";
import { formatNumber } from "@/lib/utils";
import { calculateDailyEnergyWh, calculateArraySizeWatts, calculateBatteryCapacityAh } from "@/lib/calculator";

export default function PumpSizing() {
  const [watts, setWatts] = useState<number>(300);
  const [hoursPerDay, setHoursPerDay] = useState<number>(6);
  const [peakSunHours, setPeakSunHours] = useState<number>(5);
  const [daysOfAutonomy, setDaysOfAutonomy] = useState<number>(2);
  const [systemVoltage, setSystemVoltage] = useState<number>(24);

  // Hardcode conservative defaults for pumps
  const dutyCycle = 100; // Pumps usually run continuously when active
  const efficiency = 65; // Lower efficiency to account for motor startup surge and pump losses
  const dod = 50; // Assume lead-acid/AGM is common in field

  const dailyEnergyWh = calculateDailyEnergyWh({
    watts: watts || 0,
    hoursPerDay: hoursPerDay || 0,
    dutyCyclePercent: dutyCycle,
  });

  const arraySizeWatts = calculateArraySizeWatts({
    dailyEnergyWh,
    peakSunHours: peakSunHours || 0,
    systemEfficiencyPercent: efficiency,
  });

  const batteryCapacityAh = calculateBatteryCapacityAh({
    dailyEnergyWh,
    daysOfAutonomy: daysOfAutonomy || 0,
    depthOfDischargePercent: dod,
    systemVoltage: systemVoltage || 1,
  });

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="flex justify-between items-end border-b border-slate-200 pb-2 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">System Sizing: Remote Pump</h1>
          <p className="mt-1 text-sm text-slate-500">Calculate array and battery needs for intermittent off-grid water pumping.</p>
        </div>
        <span className="text-xs text-slate-400 font-mono hidden sm:inline-block">v1.4.2</span>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-7 flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Pump Details</CardTitle>
              <CardDescription>Power draw and expected runtime.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Pump Power (Watts)"
                type="number"
                min="0"
                value={watts}
                onChange={(e) => setWatts(Number(e.target.value))}
                hint="Check the pump's spec sheet. A 1/2 HP pump is roughly 375W, but draws more during startup."
              />
              <Input
                label="Pumping Hours per Day"
                type="number"
                min="0"
                max="24"
                step="0.5"
                value={hoursPerDay}
                onChange={(e) => setHoursPerDay(Number(e.target.value))}
                hint="How long the pump runs daily to meet your water volume needs."
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Location & Reliability</CardTitle>
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
                label="Days of Autonomy (No Sun)"
                min="0"
                max="10"
                step="0.5"
                value={daysOfAutonomy}
                onChange={(e) => setDaysOfAutonomy(Number(e.target.value))}
                valueDisplay={`${daysOfAutonomy} days`}
                hint="How many days can the pump run from batteries alone during bad weather?"
              />
              <Select
                label="System Voltage"
                value={systemVoltage}
                onChange={(e) => setSystemVoltage(Number(e.target.value))}
                options={[
                  { value: 12, label: "12V (Small pumps)" },
                  { value: 24, label: "24V (Medium pumps)" },
                  { value: 48, label: "48V (Large surface/submersible)" },
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
                <div className="text-slate-400 text-xs uppercase mb-1">Estimated Daily Demand</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-mono font-bold">{formatNumber(dailyEnergyWh / 1000, 2)}</span>
                  <span className="text-lg text-slate-400">kWh/day</span>
                </div>
                <div className="text-xs text-slate-500 mt-1 font-mono">{formatNumber(dailyEnergyWh, 0)} Wh/day</div>
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
                  <div className="text-[10px] text-slate-500 mt-1 uppercase">@ {systemVoltage}V / {daysOfAutonomy} Days</div>
                </div>
              </div>

              <div className="border-t border-slate-800 pt-4">
                <div className="text-slate-400 text-[10px] uppercase mb-3">Under the Hood Assumptions</div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">System Efficiency</span>
                  <span className="text-sm font-mono font-bold bg-slate-700 px-2 rounded">{efficiency}%</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Battery Chemistry</span>
                  <span className="text-sm font-mono font-bold bg-slate-700 px-2 rounded">Lead-Acid / AGM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Max Depth of Discharge</span>
                  <span className="text-sm font-mono font-bold bg-slate-700 px-2 rounded">{dod}%</span>
                </div>
              </div>

              <div className="mt-4">
                <div className="bg-yellow-900/40 border border-yellow-800 p-3 rounded flex items-start gap-3">
                  <div className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-slate-900 font-bold text-xs">
                    !
                  </div>
                  <div>
                    <div className="text-xs font-bold text-yellow-400">Conservative Profile</div>
                    <div className="text-[11px] text-yellow-100/80 leading-tight">Pump motors have high startup surge currents. Efficiency is set conservatively to {efficiency}% to account for inverter/controller losses and motor inefficiency.</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
