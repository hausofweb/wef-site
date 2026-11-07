import type { GetStaticProps, NextPage } from "next";
import { PortableText } from "next-sanity";
import Head from "next/head";
import React from "react";

import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import { portableTextComponents } from "../../components/portable-text";
import { getArticle, getContactInfo } from "../../lib/sanity";
import type { Article, ContactInfo } from "../../types";

interface Props {
  contactInfo: ContactInfo;
  article: Article;
}

const visionAndMission: NextPage<Props> = ({ article, contactInfo }) => (
  <div className="vh-100 d-flex flex-column">
    <Head>
      <title>Vision & Mission - World Eye Foundation</title>
      <meta
        name="description"
        content="Vision and Mission - World Eye Foundation"
      />
      <link rel="icon" href="/wef_icon.png" />
    </Head>
    <NavBar active="/about-us/vision-and-mission" contactInfo={contactInfo} />
    <div className="container">
      <h1 className="py-3 text-center">{article.title}</h1>
      <PortableText
        components={portableTextComponents}
        value={article.content}
      />
    </div>

    <Footer contactInfo={contactInfo} active="/about-us/vision-and-mission" />
  </div>
);

export default visionAndMission;

export const getStaticProps: GetStaticProps<Props> = async () => ({
  props: {
    article: await getArticle("visionAndMission"),
    contactInfo: await getContactInfo(),
  },
  revalidate: 300,
});
