import * as React from "react"
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-12 w-full min-w-0 rounded-xl border bg-white px-4 py-3 text-base outline-none",
        "placeholder:text-muted-foreground/50",
        "transition-[border-color,box-shadow] duration-200 ease-out",
        "border-brand-forest/[0.14]",
        "focus-visible:border-brand-sage focus-visible:shadow-[0_0_0_3px_rgba(109,132,111,0.16)]",
        "aria-invalid:border-error-terracotta aria-invalid:shadow-[0_0_0_3px_var(--color-error-terracotta-ring)]",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-45",
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
        className
      )}
      {...props}
    />
  )
}

export { Input }
