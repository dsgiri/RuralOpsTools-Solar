export interface LoadInput {
  watts: number;
  hoursPerDay: number;
  dutyCyclePercent: number;
}

export function calculateDailyEnergyWh(load: LoadInput): number {
  return load.watts * load.hoursPerDay * (load.dutyCyclePercent / 100);
}

export interface SolarArrayInput {
  dailyEnergyWh: number;
  peakSunHours: number;
  systemEfficiencyPercent: number; // usually 60-80% depending on losses
}

export function calculateArraySizeWatts(input: SolarArrayInput): number {
  if (input.peakSunHours <= 0 || input.systemEfficiencyPercent <= 0) return 0;
  return input.dailyEnergyWh / input.peakSunHours / (input.systemEfficiencyPercent / 100);
}

export interface BatteryStorageInput {
  dailyEnergyWh: number;
  daysOfAutonomy: number;
  depthOfDischargePercent: number; // e.g., 50 for lead-acid, 80 for lithium
  systemVoltage: number;
}

export function calculateBatteryCapacityAh(input: BatteryStorageInput): number {
  if (input.depthOfDischargePercent <= 0 || input.systemVoltage <= 0) return 0;
  const totalWh = input.dailyEnergyWh * input.daysOfAutonomy;
  const requiredUsableWh = totalWh / (input.depthOfDischargePercent / 100);
  return requiredUsableWh / input.systemVoltage;
}
