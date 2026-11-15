import { DocumentIcon } from "@sanity/icons/Document";
import { defineArrayMember, defineField, defineType } from "sanity";

export const article = defineType({
  fields: [
    defineField({
      description: "The heading at the top of the page.",
      name: "title",
      title: "Page title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      hidden: true,
      name: "section",
      options: {
        list: [
          { title: "History", value: "history" },
          { title: "Vision & Mission", value: "visionAndMission" },
        ],
      },
      readOnly: true,
      type: "string",
    }),
    defineField({
      description: "Optional. The person who wrote this page.",
      name: "author",
      title: "Author",
      type: "string",
    }),
    defineField({
      description:
        "The body of the page. Use headings to break it into sections, and quotes to highlight a passage.",
      name: "content",
      of: [
        defineArrayMember({
          styles: [
            { title: "Paragraph", value: "normal" },
            { title: "Heading", value: "h2" },
            { title: "Subheading", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          type: "block",
        }),
      ],
      title: "Page content",
      type: "array",
      validation: (rule) => rule.required(),
    }),
  ],
  icon: DocumentIcon,
  name: "article",
  preview: { select: { title: "title" } },
  title: "About Us page",
  type: "document",
});
