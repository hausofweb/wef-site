import { CogIcon } from "@sanity/icons/Cog";
import { defineField, defineType } from "sanity";

export const contactInfo = defineType({
  fields: [
    defineField({
      description:
        "Shown in the header and footer of every page, and used for the email link.",
      name: "email",
      title: "Email address",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      description:
        "Shown in the header and footer. Include the country code, e.g. +233 24 107 0309.",
      name: "phoneNumber",
      title: "Phone number",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      description:
        "Shown in the footer. Use a new line for each line of the address.",
      name: "fullAddress",
      rows: 3,
      title: "Address",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      description: 'A short motto, e.g. "Providing eyecare to the world!"',
      name: "taglineText",
      title: "Tagline",
      type: "string",
    }),
  ],
  icon: CogIcon,
  name: "contactInfo",
  preview: { prepare: () => ({ title: "Site Settings" }) },
  title: "Site Settings",
  type: "document",
});
