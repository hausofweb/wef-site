import type { GetStaticProps } from "next";

import Footer from "../components/Footer";
import Header from "../components/Header";
import MainJumbotron from "../components/Index/MainJumbotron";
import NavBar from "../components/NavBar";
import { getContactInfo } from "../lib/sanity";
import type { ContactInfo } from "../types";

import styles from "../styles/Home.module.scss";

interface Props {
  contactInfo: ContactInfo;
}

export default function Home({ contactInfo }: Props) {
  return (
    <div className={styles.container}>
      <Header title="World Eye Foundation" description="World Eye Foundation" />
      <div className="vh-100 d-flex flex-column">
        <NavBar active="/" contactInfo={contactInfo} />

        <MainJumbotron contactInfo={contactInfo} />

        <Footer active="home" contactInfo={contactInfo} />
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => ({
  props: { contactInfo: await getContactInfo() },
  revalidate: 300,
});
