import { EnvelopeIcon } from "@sanity/icons/Envelope";
import { defineField, defineType } from "sanity";

export const contactInfo = defineType({
  fields: [
    defineField({
      name: "email",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "phoneNumber",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "fullAddress",
      rows: 3,
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      description: "Shown under the logo in the navigation bar",
      name: "taglineText",
      type: "string",
    }),
  ],
  icon: EnvelopeIcon,
  name: "contactInfo",
  title: "Contact Info",
  type: "document",
});
