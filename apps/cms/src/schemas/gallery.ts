import { ImagesIcon } from "@sanity/icons/Images";
import { defineArrayMember, defineField, defineType } from "sanity";

export const gallery = defineType({
  fields: [
    defineField({
      description:
        "Drag to reorder. Photos appear on the Gallery page in this order.",
      name: "images",
      of: [defineArrayMember({ options: { hotspot: true }, type: "image" })],
      options: { layout: "grid" },
      title: "Photos",
      type: "array",
    }),
  ],
  icon: ImagesIcon,
  name: "gallery",
  preview: { prepare: () => ({ title: "Gallery" }) },
  title: "Gallery",
  type: "document",
});
