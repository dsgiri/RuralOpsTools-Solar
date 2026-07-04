import * as React from "react"
import { cn } from "@/lib/utils"

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
  options: { value: string | number; label: string }[];
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, hint, options, id, ...props }, ref) => {
    const generatedId = React.useId();
    const selectId = id || generatedId;

    return (
      <div className="flex flex-col w-full">
        {label && <label htmlFor={selectId} className="block text-xs font-bold text-slate-500 uppercase mb-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{label}</label>}
        <div className="relative">
          <select
            id={selectId}
            className={cn(
              "w-full bg-white border border-slate-300 rounded px-4 py-2 font-mono text-lg outline-none appearance-none focus:border-slate-900 disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            ref={ref}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
            <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
        {hint && <p className="text-[10px] text-slate-400 mt-1">{hint}</p>}
      </div>
    )
  }
)
Select.displayName = "Select"

export { Select }
