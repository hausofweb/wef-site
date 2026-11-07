import { UserIcon } from "@sanity/icons/User";
import { defineField, defineType } from "sanity";

export const profile = defineType({
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "position",
      type: "string",
    }),
    defineField({
      name: "sectionOfSite",
      options: {
        layout: "radio",
        list: [
          { title: "Our Team", value: "ourTeam" },
          { title: "Partners", value: "partners" },
        ],
      },
      title: "Section of site",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "profilePicture",
      options: { hotspot: true },
      type: "image",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "smallProfileBlurb",
      rows: 4,
      type: "text",
    }),
  ],
  icon: UserIcon,
  name: "profile",
  preview: {
    select: { media: "profilePicture", subtitle: "position", title: "name" },
  },
  type: "document",
});
