import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/legacy/image";

import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { getContactInfo, getGallery } from "../lib/sanity";
import type { ContactInfo, Image as GalleryImage } from "../types";

interface Props {
  contactInfo: ContactInfo;
  gallery: GalleryImage[];
}

const Gallery: NextPage<Props> = ({ contactInfo, gallery }) => (
  <div className="vh-100 d-flex flex-column">
    <Head>
      <title>Gallery- World Eye Foundation</title>
      <meta name="description" content="Gallery - World Eye Foundation" />
      <link rel="icon" href="/wef_icon.png" />
    </Head>

    <NavBar contactInfo={contactInfo} active="/gallery" />

    <div className="display-4 py-3 text-center">Gallery</div>

    <div className="container">
      <div className="row">
        {gallery.map((image) => (
          <div
            key={image.id}
            className="col-md-6 col-lg-4"
            style={{ width: "20em" }}
          >
            <Image
              width={image.width}
              height={image.height}
              src={image.url}
              alt={image.id}
            />
          </div>
        ))}
      </div>
    </div>

    <Footer contactInfo={contactInfo} active="gallery" />
  </div>
);

export default Gallery;

export const getStaticProps: GetStaticProps<Props> = async () => ({
  props: { contactInfo: await getContactInfo(), gallery: await getGallery() },
  revalidate: 300,
});
