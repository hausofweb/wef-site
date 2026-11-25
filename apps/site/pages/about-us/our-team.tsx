import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";

import BioCard from "../../components/BioCard";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import { getContactInfo, getProfiles } from "../../lib/sanity";
import type { Profile, ContactInfo } from "../../types";

interface Props {
  profiles: Profile[];
  contactInfo: ContactInfo;
}

const ourTeam: NextPage<Props> = ({ profiles, contactInfo }) => {
  const pgData = "";

  if (!profiles) {
    return (
      <div className="vh-100 d-flex flex-column">
        <Head>
          <title>Our Team - World Eye Foundation</title>
          <meta name="description" content="Our Team - World Eye Foundation" />
          <link rel="icon" href="/wef_icon.png" />
        </Head>
        <NavBar active="/about-us/our-team" contactInfo={contactInfo} />
        <h1 className="pt-3 text-center">Our Team</h1>
        <div className="display-3 pt-5 text-center">
          Unfortunately, this page is currently getting updated. Please check
          back soon.
        </div>

        <Footer contactInfo={contactInfo} active="/about-us/our-team" />
      </div>
    );
  }

  return (
    <div className="vh-100 d-flex flex-column">
      <Head>
        <title>Our Team - World Eye Foundation</title>
        <meta name="description" content="Our Team - World Eye Foundation" />
        <link rel="icon" href="/wef_icon.png" />
      </Head>

      <NavBar active="/about-us/our-team" contactInfo={contactInfo} />

      <div className="d-flex flex-column align-items-center py-3">
        <h1 className="pt-3 text-center">Our Team</h1>

        <div className="d-flex justify-content-evenly w-75 flex-wrap">
          {profiles.map((e, i) => (
            <BioCard Profile={e} key={i} />
          ))}
        </div>
      </div>

      <Footer contactInfo={contactInfo} active="/about-us/our-team" />
    </div>
  );
};

export default ourTeam;

export const getStaticProps: GetStaticProps<Props> = async () => ({
  props: {
    contactInfo: await getContactInfo(),
    profiles: await getProfiles("ourTeam"),
  },
  revalidate: 300,
});
