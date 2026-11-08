import { ImagesIcon } from "@sanity/icons/Images";
import { defineArrayMember, defineField, defineType } from "sanity";

export const gallery = defineType({
  fields: [
    defineField({
      name: "images",
      of: [defineArrayMember({ options: { hotspot: true }, type: "image" })],
      options: { layout: "grid" },
      type: "array",
    }),
  ],
  icon: ImagesIcon,
  name: "gallery",
  title: "Gallery",
  type: "document",
});
