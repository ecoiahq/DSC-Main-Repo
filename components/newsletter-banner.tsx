import { Button } from "@/components/ui/button"

export default function NewsletterBanner() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-r from-gray-900 to-black py-8 border-y border-gray-800">
      {/* Full-width background image */}
      <div className="absolute inset-0 w-full h-full opacity-30">
        <div
          className="h-full w-full bg-cover bg-center"
          style={{
            backgroundImage: "url('/paralympic-stadium.png')",
          }}
        ></div>
      </div>

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60"></div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold text-white md:text-3xl">ParaSports Essential</h2>
          <p className="mt-2 text-gray-300 max-w-2xl">
            Get the latest ParaSport analysis and big moments, delivered to your inbox every weekday
          </p>
          <Button className="mt-4 bg-teal-600 font-medium text-white hover:bg-teal-700">Sign up here</Button>
        </div>
      </div>
    </section>
  )
}
