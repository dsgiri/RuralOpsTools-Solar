import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    hint?: string;
  }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, hint, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <div className="flex flex-col w-full">
        {label && <label htmlFor={inputId} className="block text-xs font-bold text-slate-500 uppercase mb-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{label}</label>}
        <input
          id={inputId}
          type={type}
          className={cn(
            "w-full bg-white border border-slate-300 rounded px-4 py-2 font-mono text-lg outline-none focus:border-slate-900 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        {hint && <p className="text-[10px] text-slate-400 mt-1">{hint}</p>}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
