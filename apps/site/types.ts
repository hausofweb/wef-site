import type { PortableTextBlock } from "next-sanity";

export interface Article {
  author: Author;
  content: PortableTextBlock[];
  section: "history" | "visionAndMission";
  title: string;
  updatedAt: string;
}

export interface Author {
  name: string;
}

export interface ContactInfo {
  email: string;
  fullAddress: string;
  phoneNumber: string;
  taglineText: string;
}

export interface Pages {
  pages: Page[];
}

export interface Page {
  link?: string;
  name: string;
  sublinks?: Sublink[];
}

export interface Sublink {
  link: string;
  name: string;
}

export interface Image {
  height: number;
  id: string;
  url: string;
  width: number;
}

export interface Profile {
  name: string;
  position: string;
  profilePicture: Image;
  sectionOfSite: "ourTeam" | "partners";
  smallProfileBlurb: string;
}

export interface Screening {
  id: string;
  location: string;
  photosFromScreening: Image[];
}
