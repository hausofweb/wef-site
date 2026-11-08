import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { defineArrayMember, defineField, defineType } from "sanity";

export const article = defineType({
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      description: "The page this article is shown on",
      name: "section",
      options: {
        layout: "radio",
        list: [
          { title: "History", value: "history" },
          { title: "Vision & Mission", value: "visionAndMission" },
        ],
      },
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "author",
      type: "string",
    }),
    defineField({
      name: "content",
      of: [defineArrayMember({ type: "block" })],
      type: "array",
      validation: (rule) => rule.required(),
    }),
  ],
  icon: DocumentTextIcon,
  name: "article",
  preview: {
    select: { subtitle: "section", title: "title" },
  },
  type: "document",
});
