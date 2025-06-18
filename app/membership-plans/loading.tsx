import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-teal-500 mx-auto mb-4" />
        <p className="text-teal-400 text-lg font-medium">Loading membership plans...</p>
        <p className="text-gray-400 text-sm mt-2">Just a moment while we prepare your options</p>
      </div>
    </div>
  )
}
