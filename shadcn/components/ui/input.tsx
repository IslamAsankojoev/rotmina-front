import * as React from "react"

import { cn } from "@/shadcn/lib/utils"

function Input({ className, type = "text", ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Базовые стили: только нижняя граница, без скруглений и фона
        "w-full min-w-0 border-0 border-b border-b-muted-foreground bg-transparent px-0 py-2 text-base outline-none transition-colors placeholder:text-muted-foreground text-foreground",
        // Фокус: нижняя граница толще и цветная
        "focus:border-b-2 focus:border-b-ring",
        // Ошибка: красная нижняя граница
        "aria-invalid:border-b-destructive",
        // Disabled: серый текст и линия, курсор неактивен
        "disabled:text-muted-foreground disabled:border-b-muted-foreground disabled:bg-transparent disabled:cursor-not-allowed",
        className
      )}
      {...props}
    />
  )
}

export { Input }
