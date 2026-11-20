import { EyeOpenIcon } from "@sanity/icons/EyeOpen";
import { defineArrayMember, defineField, defineType } from "sanity";

export const screening = defineType({
  fields: [
    defineField({
      description:
        'Where or what the screening was, e.g. "Jukwa" or "Eye Care Outreach at Akotokyir". Shown as the heading above its photos.',
      name: "location",
      title: "Location or event",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      description:
        "Drag to reorder. Photos appear on the Screenings page in this order.",
      name: "photos",
      of: [defineArrayMember({ options: { hotspot: true }, type: "image" })],
      options: { layout: "grid" },
      title: "Photos",
      type: "array",
    }),
  ],
  icon: EyeOpenIcon,
  name: "screening",
  preview: {
    prepare: ({ media, photos, title }) => ({
      media,
      subtitle: `${photos?.length ?? 0} photos`,
      title,
    }),
    select: { media: "photos.0", photos: "photos", title: "location" },
  },
  title: "Screening",
  type: "document",
});
