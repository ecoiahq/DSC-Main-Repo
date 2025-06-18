import { Skeleton } from "@/components/ui/skeleton"
import SiteHeader from "@/components/site-header"

export default function CheckoutLoading() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <SiteHeader />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-8">
            <Skeleton className="h-9 w-32 bg-gray-800" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="lg:col-span-2">
              <div className="border border-gray-800/50 bg-gradient-to-br from-gray-900 to-gray-900/50 backdrop-blur-sm rounded-xl p-8">
                <Skeleton className="h-8 w-64 bg-gray-800 mb-2" />
                <Skeleton className="h-5 w-80 bg-gray-800 mb-8" />

                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <Skeleton className="h-6 w-48 bg-gray-800" />
                      <Skeleton className="h-5 w-32 bg-gray-800" />
                    </div>

                    <div className="bg-gray-900/70 rounded-lg p-4 mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <Skeleton className="h-6 w-24 bg-gray-800" />
                        <div className="flex gap-1">
                          <Skeleton className="h-5 w-8 bg-gray-800 rounded" />
                          <Skeleton className="h-5 w-8 bg-gray-800 rounded" />
                          <Skeleton className="h-5 w-8 bg-gray-800 rounded" />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <Skeleton className="h-5 w-32 bg-gray-800 mb-1" />
                          <Skeleton className="h-10 w-full bg-gray-800" />
                        </div>

                        <div>
                          <Skeleton className="h-5 w-32 bg-gray-800 mb-1" />
                          <Skeleton className="h-10 w-full bg-gray-800" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Skeleton className="h-5 w-24 bg-gray-800 mb-1" />
                            <Skeleton className="h-10 w-full bg-gray-800" />
                          </div>

                          <div>
                            <Skeleton className="h-5 w-16 bg-gray-800 mb-1" />
                            <Skeleton className="h-10 w-full bg-gray-800" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Skeleton className="h-px w-full bg-gray-800" />

                  <div>
                    <Skeleton className="h-6 w-40 bg-gray-800 mb-4" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Skeleton className="h-5 w-24 bg-gray-800 mb-1" />
                        <Skeleton className="h-10 w-full bg-gray-800" />
                      </div>

                      <div>
                        <Skeleton className="h-5 w-32 bg-gray-800 mb-1" />
                        <Skeleton className="h-10 w-full bg-gray-800" />
                      </div>
                    </div>
                  </div>

                  <Skeleton className="h-12 w-full bg-gray-800 rounded-md" />
                  <Skeleton className="h-4 w-full bg-gray-800" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="border border-gray-800/50 bg-gradient-to-br from-gray-900 to-gray-900/50 backdrop-blur-sm rounded-xl p-6 sticky top-24">
                <Skeleton className="h-7 w-40 bg-gray-800 mb-6" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-5 w-32 bg-gray-800" />
                    <Skeleton className="h-5 w-16 bg-gray-800" />
                  </div>

                  <div className="flex items-center justify-between">
                    <Skeleton className="h-5 w-24 bg-gray-800" />
                    <Skeleton className="h-5 w-16 bg-gray-800" />
                  </div>

                  <Skeleton className="h-px w-full bg-gray-800" />

                  <div className="flex items-center justify-between">
                    <Skeleton className="h-6 w-32 bg-gray-800" />
                    <Skeleton className="h-6 w-20 bg-gray-800" />
                  </div>
                </div>

                <div className="mt-6">
                  <Skeleton className="h-5 w-full bg-gray-800 mb-2" />
                  <Skeleton className="h-5 w-3/4 bg-gray-800" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
