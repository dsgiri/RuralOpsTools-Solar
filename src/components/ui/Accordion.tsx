import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

export function Accordion({ children, className }: { children: React.ReactNode, className?: string }) {
  return <div className={cn("space-y-2", className)}>{children}</div>
}

export function AccordionItem({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <details className="group border border-slate-200 rounded bg-white [&_summary::-webkit-details-marker]:hidden">
      <summary className="flex cursor-pointer items-center justify-between p-4 font-bold text-sm text-slate-900">
        {title}
        <ChevronDown className="h-5 w-5 transition duration-300 group-open:-rotate-180 text-slate-500" />
      </summary>
      <div className="px-4 pb-4 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
        {children}
      </div>
    </details>
  )
}
