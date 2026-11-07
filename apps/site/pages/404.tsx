import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";

import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { getContactInfo } from "../lib/sanity";
import type { ContactInfo } from "../types";

interface Props {
  contactInfo: ContactInfo;
}

const Custom404: NextPage<Props> = ({ contactInfo }) => (
  <div className="vh-100 d-flex flex-column">
    <Head>
      <title>Page Not Found</title>
      <meta
        name="description"
        content="Page Not Found - World Eye Foundation"
      />
      <link rel="icon" href="/wef_icon.png" />
    </Head>

    <NavBar contactInfo={contactInfo} active="" />

    <div className="py-5 text-center">
      <h1 className="display-3">Sorry, this page was not found!</h1>
      <h3>Navigate above to another page.</h3>
    </div>

    <Footer contactInfo={contactInfo} active="" />
  </div>
);

export default Custom404;

export const getStaticProps: GetStaticProps<Props> = async () => ({
  props: { contactInfo: await getContactInfo() },
  revalidate: 300,
});
