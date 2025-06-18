import SiteHeader from "@/components/site-header"
import EnhancedFooter from "@/components/enhanced-footer"
import StreamyardIntegration from "@/components/streamyard-integration"

export default function StreamyardDemoPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-gradient-to-b from-gray-900 to-black py-12">
          <div className="container px-4 md:px-6">
            <div className="flex items-center gap-3">
              <div className="relative flex h-5 w-5 items-center justify-center rounded-full bg-red-600">
                <span className="absolute inline-flex h-4 w-4 animate-ping rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-400"></span>
              </div>
              <h1 className="text-3xl font-bold md:text-4xl">StreamYard Integration Demo</h1>
            </div>
            <p className="mt-2 max-w-2xl text-gray-300">
              This page demonstrates how StreamYard can be integrated with your Disability Sports Channel website.
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="container px-4 md:px-6">
            <StreamyardIntegration />

            <div className="mt-12 grid gap-8 md:grid-cols-2">
              <div className="rounded-lg bg-gray-900 p-6">
                <h2 className="mb-4 text-xl font-bold">Why Use StreamYard?</h2>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="mr-2 text-teal-400">✓</span>
                    <span>Professional broadcasts with minimal technical knowledge</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-teal-400">✓</span>
                    <span>Add logos, backgrounds, and overlays to your streams</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-teal-400">✓</span>
                    <span>Invite guests to join your broadcast remotely</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-teal-400">✓</span>
                    <span>Share screens and presentations during your broadcast</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-teal-400">✓</span>
                    <span>Stream to multiple platforms simultaneously</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg bg-gray-900 p-6">
                <h2 className="mb-4 text-xl font-bold">Technical Requirements</h2>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="mr-2 text-teal-400">✓</span>
                    <span>A computer with Chrome or Firefox browser</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-teal-400">✓</span>
                    <span>Webcam for presenter video (optional)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-teal-400">✓</span>
                    <span>Microphone for clear audio</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-teal-400">✓</span>
                    <span>Stable internet connection (5+ Mbps upload)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-teal-400">✓</span>
                    <span>StreamYard account (free or paid plan)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <EnhancedFooter />
    </div>
  )
}
