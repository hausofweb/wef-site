import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { ReactElement } from "react";

import BioCard from "../../components/BioCard";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import { getContactInfo, getProfiles } from "../../lib/sanity";
import type { Profile, ContactInfo } from "../../types";

interface Props {
  contactInfo: ContactInfo;
  profiles: Profile[];
}

const partners: NextPage<Props> = ({ profiles, contactInfo }) => {
  if (profiles.length > 0) {
    return (
      <div className="vh-100 d-flex flex-column">
        <Head>
          <title>Partners - World Eye Foundation</title>
          <meta name="description" content="Partners - World Eye Foundation" />
          <link rel="icon" href="/wef_icon.png" />
        </Head>

        <NavBar active="/about-us/partners" contactInfo={contactInfo} />
        <h1 className="pt-3 text-center">Partners</h1>
        <div className="d-flex justify-content-evenly flex-wrap">
          {profiles.map((e, i) => (
            <BioCard Profile={e} key={i} />
          ))}
        </div>

        <Footer contactInfo={contactInfo} active="/about-us/partners" />
      </div>
    );
  }

  return (
    <div className="vh-100 d-flex flex-column">
      <Head>
        <title>Partners - World Eye Foundation</title>
        <meta name="description" content="Partners - World Eye Foundation" />
        <link rel="icon" href="/wef_icon.png" />
      </Head>

      <NavBar active="/about-us/partners" contactInfo={contactInfo} />
      <h1 className="pt-3 text-center">Partners</h1>
      <div className="display-3 pt-5 text-center">
        Unfortunately, this page is currently getting updated. Please check back
        soon.
      </div>

      <Footer contactInfo={contactInfo} active="/about-us/partners" />
    </div>
  );
};

export default partners;

export const getStaticProps: GetStaticProps<Props> = async () => ({
  props: {
    contactInfo: await getContactInfo(),
    profiles: await getProfiles("partners"),
  },
  revalidate: 300,
});
