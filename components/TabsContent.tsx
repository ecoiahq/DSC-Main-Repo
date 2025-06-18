import type React from "react"

interface TabsContentProps {
  value: string
  activeTab: string
  children: React.ReactNode
  className?: string
}

export default function TabsContent({ value, activeTab, children, className = "" }: TabsContentProps) {
  if (value !== activeTab) {
    return null
  }

  return <div className={`mt-4 ${className}`}>{children}</div>
}
