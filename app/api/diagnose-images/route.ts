import { NextResponse } from "next/server"
import { client, sanityConfigured } from "@/lib/sanity"

export async function GET() {
  const diagnostics = {
    timestamp: new Date().toISOString(),
    sanityConfigured,
    environmentVariables: {
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
        ? `✓ Set (${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID.substring(0, 8)}...)`
        : "✗ Missing",
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
      apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION
        ? `✓ Set (${process.env.NEXT_PUBLIC_SANITY_API_VERSION})`
        : "✗ Missing",
      token: process.env.SANITY_API_TOKEN ? `✓ Set (${process.env.SANITY_API_TOKEN.substring(0, 8)}...)` : "✗ Missing",
      // Add raw values for debugging
      rawApiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
      rawToken: process.env.SANITY_API_TOKEN ? "EXISTS" : "MISSING",
    },
    tests: [],
  }

  // Test 1: Basic Sanity connection
  try {
    if (client) {
      const basicTest = await client.fetch(`*[_type == "post"][0...1] {
        _id,
        title,
        image
      }`)

      diagnostics.tests.push({
        name: "Basic Sanity Connection",
        status: "✅ SUCCESS",
        result: `Found ${basicTest.length} posts`,
        data: basicTest,
      })

      // Test 2: Image field analysis
      if (basicTest.length > 0 && basicTest[0].image) {
        const imageField = basicTest[0].image

        diagnostics.tests.push({
          name: "Image Field Structure",
          status: "📊 ANALYSIS",
          result: "Image field found",
          data: {
            type: typeof imageField,
            structure: imageField,
            hasAsset: !!imageField.asset,
            hasAssetUrl: !!imageField.asset?.url,
            hasAssetRef: !!imageField.asset?._ref,
          },
        })

        // Test 3: URL generation
        try {
          let generatedUrl = null

          // Try direct asset URL
          if (imageField.asset?.url) {
            generatedUrl = imageField.asset.url
          }
          // Try building from reference
          else if (imageField.asset?._ref) {
            const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
            const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"
            const assetRef = imageField.asset._ref

            if (assetRef.startsWith("image-")) {
              const match = assetRef.match(/image-([a-f\d]+)-(\d+x\d+)-(\w+)/)
              if (match) {
                const [, id, dimensions, format] = match
                generatedUrl = `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}`
              }
            }
          }

          diagnostics.tests.push({
            name: "URL Generation",
            status: generatedUrl ? "✅ SUCCESS" : "❌ FAILED",
            result: generatedUrl || "Could not generate URL",
            data: {
              method: imageField.asset?.url ? "Direct URL" : "Built from reference",
              originalRef: imageField.asset?._ref,
            },
          })

          // Test 4: URL accessibility
          if (generatedUrl) {
            try {
              const response = await fetch(generatedUrl, { method: "HEAD" })
              diagnostics.tests.push({
                name: "Image URL Accessibility",
                status: response.ok ? "✅ SUCCESS" : "❌ FAILED",
                result: `HTTP ${response.status} - ${response.statusText}`,
                data: {
                  url: generatedUrl,
                  headers: Object.fromEntries(response.headers.entries()),
                },
              })
            } catch (error) {
              diagnostics.tests.push({
                name: "Image URL Accessibility",
                status: "❌ FAILED",
                result: "Network error",
                data: { error: error.message, url: generatedUrl },
              })
            }
          }
        } catch (error) {
          diagnostics.tests.push({
            name: "URL Generation",
            status: "❌ ERROR",
            result: error.message,
            data: { error },
          })
        }
      } else {
        diagnostics.tests.push({
          name: "Image Field Analysis",
          status: "⚠️ WARNING",
          result: "No posts with images found",
          data: null,
        })
      }
    } else {
      diagnostics.tests.push({
        name: "Basic Sanity Connection",
        status: "❌ FAILED",
        result: "Sanity client not configured",
        data: null,
      })
    }
  } catch (error) {
    diagnostics.tests.push({
      name: "Basic Sanity Connection",
      status: "❌ ERROR",
      result: error.message,
      data: { error },
    })
  }

  // Test 5: Environment variable validation
  const envIssues = []

  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    envIssues.push("Missing NEXT_PUBLIC_SANITY_PROJECT_ID")
  }

  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION
  if (apiVersion && (apiVersion.length > 20 || apiVersion.includes("_"))) {
    envIssues.push("NEXT_PUBLIC_SANITY_API_VERSION looks like a token, not a version")
  }

  diagnostics.tests.push({
    name: "Environment Variables",
    status: envIssues.length === 0 ? "✅ SUCCESS" : "⚠️ ISSUES",
    result: envIssues.length === 0 ? "All variables properly configured" : "Issues found",
    data: { issues: envIssues },
  })

  return NextResponse.json(diagnostics, {
    headers: { "Content-Type": "application/json" },
    status: 200,
  })
}
