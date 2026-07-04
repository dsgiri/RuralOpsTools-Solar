import * as React from "react"
import { cn } from "@/lib/utils"

export interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  valueDisplay?: string;
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, label, hint, valueDisplay, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <div className="flex flex-col w-full">
        {label && (
          <div className="flex justify-between items-end mb-2">
            <label htmlFor={inputId} className="block text-xs font-bold text-slate-500 uppercase peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{label}</label>
            {valueDisplay && <span className="text-sm font-mono font-bold text-slate-900">{valueDisplay}</span>}
          </div>
        )}
        <input
          id={inputId}
          type="range"
          className={cn(
            "w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900",
            className
          )}
          ref={ref}
          {...props}
        />
        {hint && <p className="text-[10px] text-slate-400 mt-2">{hint}</p>}
      </div>
    )
  }
)
Slider.displayName = "Slider"

export { Slider }
