import { NextResponse } from "next/server"
import { createClient } from "next-sanity"

export async function GET() {
  try {
    console.log("🔍 Full Sanity Debug Starting...")

    // Create client with your project ID
    const client = createClient({
      projectId: "b69czsvq",
      dataset: "production",
      apiVersion: "2023-05-03",
      useCdn: false,
    })

    // 1. Test basic connection
    console.log("1️⃣ Testing basic connection...")
    const basicTest = await client.fetch(`*[_type == "post" || _type == "article"][0...3] {
      _id,
      _type,
      title
    }`)

    // 2. Get all document types
    console.log("2️⃣ Getting all document types...")
    const allTypes = await client.fetch(`*[] {
      _type
    } | order(_type) | {
      "type": _type
    }`)
    const uniqueTypes = [...new Set(allTypes.map((item: any) => item.type))]

    // 3. Check for articles specifically
    console.log("3️⃣ Checking for articles...")
    const articlesRaw = await client.fetch(`*[_type == "article"] {
      _id,
      title,
      slug,
      category,
      "categoryRaw": category,
      "categoryExpanded": category->{
        _id,
        _type,
        title,
        name
      }
    }`)

    // 4. Check for posts specifically
    console.log("4️⃣ Checking for posts...")
    const postsRaw = await client.fetch(`*[_type == "post"] {
      _id,
      title,
      slug,
      category,
      "categoryRaw": category,
      "categoryExpanded": category->{
        _id,
        _type,
        title,
        name
      }
    }`)

    // 5. Check all categories
    console.log("5️⃣ Checking all categories...")
    const categoriesRaw = await client.fetch(`*[_type == "category"] {
      _id,
      title,
      name,
      slug
    }`)

    // 6. Look for your specific articles by title
    console.log("6️⃣ Looking for specific articles...")
    const specificByTitle = await client.fetch(`*[
      title match "*Dan Brooke*" ||
      title match "*Patrick Anderson*" ||
      title match "*IPC Classification*"
    ] {
      _id,
      _type,
      title,
      slug,
      category,
      "categoryExpanded": category->{
        _id,
        _type,
        title,
        name
      }
    }`)

    // 7. Try different query approaches
    console.log("7️⃣ Trying different query approaches...")
    const allContent = await client.fetch(`*[_type == "post" || _type == "article"] | order(_updatedAt desc) [0...10] {
      _id,
      _type,
      _createdAt,
      _updatedAt,
      title,
      slug,
      category,
      "categoryRef": category._ref,
      "categoryExpanded": category->{
        _id,
        _type,
        title,
        name,
        slug
      },
      publishedAt,
      featured
    }`)

    return NextResponse.json({
      success: true,
      debug: {
        basicTest,
        uniqueTypes,
        articlesCount: articlesRaw?.length || 0,
        postsCount: postsRaw?.length || 0,
        categoriesCount: categoriesRaw?.length || 0,
        articlesRaw,
        postsRaw,
        categoriesRaw,
        specificByTitle,
        allContent,
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("❌ Full debug error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 },
    )
  }
}
