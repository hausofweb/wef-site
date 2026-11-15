import { UserIcon } from "@sanity/icons/User";
import { defineField, defineType } from "sanity";

export const profile = defineType({
  fields: [
    defineField({
      name: "name",
      title: "Full name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      description: 'Their role, e.g. "Founder" or "Optometrist".',
      name: "position",
      title: "Role",
      type: "string",
    }),
    defineField({
      description: "Square photos look best on the profile card.",
      name: "profilePicture",
      options: { hotspot: true },
      title: "Photo",
      type: "image",
      validation: (rule) => rule.required(),
    }),
    defineField({
      description:
        "A sentence or two shown under their name on the profile card.",
      name: "smallProfileBlurb",
      rows: 4,
      title: "Short bio",
      type: "text",
    }),
    defineField({
      description: "Which page this person appears on.",
      name: "sectionOfSite",
      options: {
        layout: "radio",
        list: [
          { title: "Our Team", value: "ourTeam" },
          { title: "Partners", value: "partners" },
        ],
      },
      title: "Show on",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
  icon: UserIcon,
  name: "profile",
  orderings: [
    { by: [{ direction: "asc", field: "name" }], name: "name", title: "Name" },
  ],
  preview: {
    select: { media: "profilePicture", subtitle: "position", title: "name" },
  },
  title: "Person",
  type: "document",
});
