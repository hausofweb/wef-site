import { article } from "./article";
import { contactInfo } from "./contact-info";
import { gallery } from "./gallery";
import { profile } from "./profile";
import { screening } from "./screening";

export const singletonTypes = [contactInfo, gallery];

export const schemaTypes = [...singletonTypes, article, profile, screening];
