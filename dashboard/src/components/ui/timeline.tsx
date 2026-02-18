// src/components/ui/timeline.tsx
import * as React from "react"
import { cn } from "@/lib/utils"

const Timeline = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("space-y-8", className)} {...props} />
  )
)
Timeline.displayName = "Timeline"

const TimelineItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("relative flex gap-6 pb-2", className)} {...props} />
  )
)
TimelineItem.displayName = "TimelineItem"

const TimelineSeparator = ({ className }: { className?: string }) => (
  <div className="flex flex-col items-center">
    <div className="h-2.5 w-2.5 rounded-full bg-primary" />
    <div className={cn("flex-1 w-px bg-border", className)} />
  </div>
)

const TimelineContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-1 pt-0.5", className)} {...props} />
  )
)
TimelineContent.displayName = "TimelineContent"

export { Timeline, TimelineItem, TimelineSeparator, TimelineContent }