import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export default function Assumptions() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Methodology & Assumptions</h1>
        <p className="mt-2 text-slate-600">How we calculate these numbers and why we lean conservative.</p>
      </div>

      <div className="prose prose-slate max-w-none">
        <Card>
          <CardHeader>
            <CardTitle>Calculation Methodology</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-slate-600 leading-relaxed">
            <p>
              Our calculators use standard electrical engineering formulas for DC off-grid systems. 
              We do not use machine learning or opaque algorithms. The math is simple, linear, and visible.
            </p>
            
            <h3 className="text-lg font-bold text-slate-900 pt-4">Energy Load</h3>
            <p className="font-mono text-sm bg-slate-50 p-2 rounded border border-slate-200">
              Daily Energy (Wh) = Watts × Hours per Day × Duty Cycle
            </p>
            
            <h3 className="text-lg font-bold text-slate-900 pt-4">Solar Array Sizing</h3>
            <p className="font-mono text-sm bg-slate-50 p-2 rounded border border-slate-200">
              Array Size (W) = Daily Energy (Wh) / Peak Sun Hours / System Efficiency
            </p>
            <p className="text-sm">
              We default system efficiency to 75%. This accounts for:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Inverter/Charge controller losses (5-10%)</li>
              <li>Voltage drop across wiring (2-5%)</li>
              <li>Temperature coefficient degradation (panels lose efficiency when hot)</li>
              <li>Dust and minor shading</li>
            </ul>

            <h3 className="text-lg font-bold text-slate-900 pt-4">Battery Storage</h3>
            <p className="font-mono text-sm bg-slate-50 p-2 rounded border border-slate-200">
              Capacity (Ah) = (Daily Energy × Days of Autonomy) / Depth of Discharge / System Voltage
            </p>
            <p className="text-sm">
              We highly recommend designing for at least 3 days of autonomy (running with zero solar input). 
              For lead-acid (AGM/Gel) batteries, do not exceed 50% Depth of Discharge to preserve cycle life. 
              Lithium (LiFePO4) can handle 80% DoD.
            </p>
          </CardContent>
        </Card>

        <Card className="mt-8 border-yellow-400 bg-yellow-50">
          <CardHeader>
            <CardTitle className="text-yellow-900">Disclaimer for Field Use</CardTitle>
          </CardHeader>
          <CardContent className="text-yellow-800 text-sm">
            These calculators provide estimates for planning purposes. Environmental conditions (extended winter storms, shading, extreme cold affecting battery capacity) will impact actual performance. Always build a safety margin into remote field equipment where failure is not an option.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
