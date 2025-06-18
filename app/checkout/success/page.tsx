import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Success!",
  description: "Thank you for your order!",
}

export default async function SuccessPage({
  searchParams,
}: { searchParams: { [key: string]: string | string[] | undefined } }) {
  // Remove any test-specific logic here.
  // For example, if there was a check for test=true in the URL parameters, remove that logic.

  // Example of removing test-specific logic:
  // const isTest = searchParams.get("test") === "true";
  // if (isTest) {
  //   // Remove this entire block or modify it to remove test-specific behavior
  //   console.log("Test mode detected, skipping certain steps.");
  // }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold">Thank you for your order!</h1>
      <p className="text-lg mt-4">Your order has been placed successfully.</p>
      {/* You can add more details here, such as order confirmation number, etc. */}
    </div>
  )
}
