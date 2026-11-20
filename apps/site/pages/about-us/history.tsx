import type { GetStaticProps, NextPage } from "next";
import { PortableText } from "next-sanity";
import Head from "next/head";

import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import { portableTextComponents } from "../../components/portable-text";
import { getArticle, getContactInfo } from "../../lib/sanity";
import type { Article, ContactInfo } from "../../types";

interface Props {
  contactInfo: ContactInfo;
  article: Article;
}

const history: NextPage<Props> = ({ article, contactInfo }) => (
  <div className="vh-100 d-flex flex-column">
    <Head>
      <meta name="description" content="History - World Eye Foundation" />
      <link rel="icon" href="/wef_icon.png" />
      <title>History - World Eye Foundation</title>
    </Head>
    <NavBar active="/about-us/history" contactInfo={contactInfo} />
    <div className="container">
      <h1 className="pt-3 text-center">{article.title}</h1>
      <p className="text-muted text-end">
        Last updated: {new Date(article.updatedAt).toLocaleDateString()}
      </p>
      <PortableText
        components={portableTextComponents}
        value={article.content}
      />
    </div>

    <Footer active="/about-us/history" contactInfo={contactInfo} />
  </div>
);

export default history;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const article = await getArticle("history");

  if (!article) {
    return { notFound: true, revalidate: 300 };
  }

  return {
    props: { article, contactInfo: await getContactInfo() },
    revalidate: 300,
  };
};
