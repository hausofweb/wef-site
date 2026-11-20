import type { GetStaticProps, NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import Script from "next/script";

import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { getContactInfo } from "../lib/sanity";
import type { ContactInfo } from "../types";

import styles from "../styles/Donate.module.scss";

// react-paystack reads `window` at import time, so it can't be server-rendered.
const DonateBlock = dynamic(() => import("../components/DonateBlock"), {
  ssr: false,
});

interface Props {
  contactInfo: ContactInfo;
}

const Donate: NextPage<Props> = ({ contactInfo }) => (
  <div>
    <Head>
      <title>Donate to WEF</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta
        name="description"
        content="Donate to Support World Eye Foundation"
      />
    </Head>
    <Script src="https://js.paystack.co/v1/inline.js" />
    <div className="vh-100 d-flex flex-column">
      <NavBar active="/donate" contactInfo={contactInfo} />
      <div className="align-self-center d-flex flex-column justify-content-center h-75">
        <DonateBlock />
      </div>
      <Footer active="donate" contactInfo={contactInfo} />
    </div>
  </div>
);

export default Donate;

export const getStaticProps: GetStaticProps<Props> = async () => ({
  props: { contactInfo: await getContactInfo() },
  revalidate: 300,
});
