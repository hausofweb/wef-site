import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";

import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import ScreeningCard from "../../components/ScreeningCard";
import { getContactInfo, getScreenings } from "../../lib/sanity";
import type { Screening, ContactInfo } from "../../types";

interface Props {
  contactInfo: ContactInfo;
  screenings: Screening[];
}

const Screenings: NextPage<Props> = ({ contactInfo, screenings }) => (
  <div className="vh-100 d-flex flex-column">
    <Head>
      <title>Change Title - World Eye Foundation</title>
      <meta
        name="description"
        content="Change Description - World Eye Foundation"
      />
      <link rel="icon" href="/wef_icon.png" />
    </Head>

    {/* Change active link prop */}
    <NavBar contactInfo={contactInfo} active="/our-work/screenings" />

    <div className="display-2 py-3 text-center">Screenings</div>
    <div className="container">
      {screenings.map((screening) => (
        <ScreeningCard screening={screening} key={screening.id} />
      ))}
    </div>

    {/* Change active link prop */}
    <Footer contactInfo={contactInfo} active="/screenings" />
  </div>
);

export default Screenings;

export const getStaticProps: GetStaticProps<Props> = async () => ({
  props: {
    contactInfo: await getContactInfo(),
    screenings: await getScreenings(),
  },
  revalidate: 300,
});
