import { defineField, defineType } from "sanity"

export default defineType({
  name: "article",
  title: "Article",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        {
          type: "block",
        },
        {
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: { type: "author" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: { type: "category" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured Article",
      type: "boolean",
      description: "Mark as featured to show on homepage",
      initialValue: false,
    }),
    defineField({
      name: "sportTags",
      title: "Sport Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Para Swimming", value: "para-swimming" },
          { title: "Wheelchair Basketball", value: "wheelchair-basketball" },
          { title: "Para Athletics", value: "para-athletics" },
          { title: "Para Archery", value: "para-archery" },
          { title: "Wheelchair Tennis", value: "wheelchair-tennis" },
          { title: "Para Cycling", value: "para-cycling" },
          { title: "Sitting Volleyball", value: "sitting-volleyball" },
          { title: "Wheelchair Rugby", value: "wheelchair-rugby" },
          { title: "Boccia", value: "boccia" },
          { title: "Goalball", value: "goalball" },
          { title: "ParalympicsGB", value: "paralympicsgb" },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "featuredImage",
    },
    prepare(selection) {
      const { author } = selection
      return { ...selection, subtitle: author && `by ${author}` }
    },
  },
})
