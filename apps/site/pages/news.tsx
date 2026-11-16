import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";

import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { getContactInfo } from "../lib/sanity";
import type { ContactInfo } from "../types";

interface Props {
  contactInfo: ContactInfo;
}

const News: NextPage<Props> = ({ contactInfo }) => (
  <div className="vh-100 d-flex flex-column">
    <Head>
      <title>News - World Eye Foundation</title>
      <meta name="description" content="News - World Eye Foundation" />
      <link rel="icon" href="/wef_icon.png" />
    </Head>

    <NavBar contactInfo={contactInfo} active="/news" />

    <div className="display-4 py-3 text-center">News</div>

    <div className="display-4 text-center">
      Please check back later for a news update.
    </div>

    <Footer contactInfo={contactInfo} active="news" />
  </div>
);

export default News;

export const getStaticProps: GetStaticProps<Props> = async () => ({
  props: { contactInfo: await getContactInfo() },
  revalidate: 300,
});
