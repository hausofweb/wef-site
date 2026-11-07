import { EyeOpenIcon } from "@sanity/icons/EyeOpen";
import { defineArrayMember, defineField, defineType } from "sanity";

export const screening = defineType({
  fields: [
    defineField({
      name: "location",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "photos",
      of: [defineArrayMember({ options: { hotspot: true }, type: "image" })],
      options: { layout: "grid" },
      type: "array",
    }),
  ],
  icon: EyeOpenIcon,
  name: "screening",
  preview: {
    select: { media: "photos.0", title: "location" },
  },
  type: "document",
});
