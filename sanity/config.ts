import { defineConfig } from "sanity"
import { deskTool } from "sanity/desk"
import { visionTool } from "@sanity/vision"
import { schemaTypes } from "./schemas"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"

// Only export config if environment variables are set
export default projectId
  ? defineConfig({
      name: "default",
      title: "Disability Sports Channel",
      projectId,
      dataset,
      plugins: [deskTool(), visionTool()],
      schema: {
        types: schemaTypes,
      },
    })
  : defineConfig({
      name: "default",
      title: "Disability Sports Channel - Not Configured",
      projectId: "placeholder",
      dataset: "production",
      plugins: [],
      schema: { types: [] },
    })
