import * as React from "react"
import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-[8rem] w-full rounded-xl border bg-white px-4 py-3 text-base outline-none",
        "placeholder:text-muted-foreground/50",
        "transition-[border-color,box-shadow] duration-200 ease-out",
        "border-brand-forest/[0.14]",
        "focus-visible:border-brand-sage focus-visible:shadow-[0_0_0_3px_rgba(109,132,111,0.16)]",
        "aria-invalid:border-error-terracotta aria-invalid:shadow-[0_0_0_3px_var(--color-error-terracotta-ring)]",
        "disabled:cursor-not-allowed disabled:opacity-45",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
