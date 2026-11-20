import type { PortableTextComponents } from "next-sanity";

export const portableTextComponents: PortableTextComponents = {
  block: {
    blockquote: ({ children }) => (
      <div className="blockquote text-black-50">{children}</div>
    ),
  },
};
