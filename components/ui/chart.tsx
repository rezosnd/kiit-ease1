"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"

import { cn } from "@/lib/utils"

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const

// Updated ChartConfig interface
interface ChartConfig {
  [key: string]: {
    label: string
    color: string
  }
}

// Removed old ChartConfig type and ChartContext related code

// Updated ChartContainer component
interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig
  children: React.ReactNode
}

export function ChartContainer({ config, children, ...props }: ChartContainerProps) {
  return (
    <div
      style={
        {
          "--chart-1": "var(--primary)",
          "--chart-2": "hsl(var(--muted-foreground))",
          "--chart-3": "hsl(var(--accent))",
          "--chart-4": "hsl(var(--secondary))",
          "--chart-5": "hsl(var(--destructive))",
        } as React.CSSProperties
      }
      {...props}
    >
      {children}
    </div>
  )
}

// Removed old ChartContainer component

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(([_, config]) => config.color)

  if (!colorConfig.length) {
    return null
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color = itemConfig.color
    return color ? `  --color-${key}: ${color};` : null
  })
  .join("\n")}
}
`,
          )
          .join("\n"),
      }}
    />
  )
}

// Removed old ChartStyle component

// Updated ChartTooltip component
interface ChartTooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function ChartTooltip({ children, ...props }: ChartTooltipProps) {
  return (
    <div className="rounded-lg border bg-background p-2 shadow-md" {...props}>
      {children}
    </div>
  )
}

// Removed old ChartTooltip component

// Updated ChartTooltipContent component
export function ChartTooltipContent() {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-[var(--color-count)]" />
        <div className="flex gap-1">
          <span className="text-xs text-muted-foreground">Count:</span>
          <span className="text-xs font-bold">{"{value}"}</span>
        </div>
      </div>
    </div>
  )
}

// Removed old ChartTooltipContent component

const ChartLegend = RechartsPrimitive.Legend

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> &
    Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
      hideIcon?: boolean
      nameKey?: string
    }
>(({ className, hideIcon = false, payload, verticalAlign = "bottom", nameKey }, ref) => {
  const useChart = () => {
    return React.useContext(ChartContext)
  }

  const { config } = useChart()

  if (!payload?.length) {
    return null
  }

  return (
    <div
      ref={ref}
      className={cn("flex items-center justify-center gap-4", verticalAlign === "top" ? "pb-3" : "pt-3", className)}
    >
      {payload.map((item) => {
        const key = `${nameKey || item.dataKey || "value"}`
        const itemConfig = getPayloadConfigFromPayload(config, item, key)

        return (
          <div
            key={item.value}
            className={cn("flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground")}
          >
            {itemConfig?.icon && !hideIcon ? (
              <itemConfig.icon />
            ) : (
              <div
                className="h-2 w-2 shrink-0 rounded-[2px]"
                style={{
                  backgroundColor: item.color,
                }}
              />
            )}
            {itemConfig?.label}
          </div>
        )
      })}
    </div>
  )
})
ChartLegendContent.displayName = "ChartLegend"

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(config: ChartConfig, payload: unknown, key: string) {
  if (typeof payload !== "object" || payload === null) {
    return undefined
  }

  const payloadPayload =
    "payload" in payload && typeof payload.payload === "object" && payload.payload !== null
      ? payload.payload
      : undefined

  let configLabelKey: string = key

  if (key in payload && typeof payload[key as keyof typeof payload] === "string") {
    configLabelKey = payload[key as keyof typeof payload] as string
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[key as keyof typeof payloadPayload] as string
  }

  return configLabelKey in config ? config[configLabelKey] : config[key as keyof typeof config]
}

export { ChartLegend, ChartLegendContent, ChartStyle }

import { createContext } from "react"

interface ChartContextProps {
  config: ChartConfig
}

const ChartContext = createContext<ChartContextProps>({
  config: {},
})

export const ChartProvider = ({
  config,
  children,
}: {
  config: ChartConfig
  children: React.ReactNode
}) => {
  return <ChartContext.Provider value={{ config }}>{children}</ChartContext.Provider>
}
