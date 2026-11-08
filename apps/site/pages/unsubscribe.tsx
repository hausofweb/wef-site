import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";

import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { getContactInfo } from "../lib/sanity";
import type { ContactInfo } from "../types";

interface Props {
  contactInfo: ContactInfo;
}

const Unsubscribe: NextPage<Props> = ({ contactInfo }) => (
  <div className="vh-100 d-flex flex-column">
    <Head>
      <title>Unsubscribe from Newsletter - World Eye Foundation</title>
      <meta name="description" content="Unsubscribe - World Eye Foundation" />
      <link rel="icon" href="/wef_icon.png" />
    </Head>

    <NavBar contactInfo={contactInfo} active="/unsubscribe" />

    <div className="" />

    <Footer contactInfo={contactInfo} active="/unsubscribe" />
  </div>
);

export default Unsubscribe;

export const getStaticProps: GetStaticProps<Props> = async () => ({
  props: { contactInfo: await getContactInfo() },
  revalidate: 300,
});
