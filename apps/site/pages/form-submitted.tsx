import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { getContactInfo } from "../lib/sanity";
import type { ContactInfo } from "../types";

interface Props {
  contactInfo: ContactInfo;
}

const FormSubmitted: NextPage<Props> = ({ contactInfo }) => (
  <div className="vh-100 d-flex flex-column">
    <Head>
      <title>Form Submitted - World Eye Foundation</title>
      <meta
        name="description"
        content="Form Submitted - World Eye Foundation"
      />
      <link rel="icon" href="/wef_icon.png" />
    </Head>
    <NavBar contactInfo={contactInfo} active="/form-submitted" />
    <div className="container py-5 text-center">
      <h1>We will be in touch!</h1>
      <h3>
        We have received your submission, and will get back to you in due time.
      </h3>
      <Link href="/">
        <a>
          <h3 className="py-5">Home</h3>
        </a>
      </Link>
    </div>
    <Footer contactInfo={contactInfo} active="/form-submitted" />
  </div>
);

export default FormSubmitted;

export const getStaticProps: GetStaticProps<Props> = async () => ({
  props: { contactInfo: await getContactInfo() },
  revalidate: 300,
});
