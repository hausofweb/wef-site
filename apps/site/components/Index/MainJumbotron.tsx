import Image from "next/legacy/image";
import Link from "next/link";

import styles from "/styles/components/jumbotron.module.scss";

interface Props {
  contactInfo;
}

const MainJumbotron: React.FC<Props> = ({ contactInfo }) => {
  if (!contactInfo) {
    contactInfo = {
      mainText:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem vitae laborum eum officiis repudiandae! Earum voluptate natus qui, ut molestias, distinctio consequatur accusamus vitae incidunt repellat nisi molestiae? Quos, id.",
      phone: "+44 000 000 0000",
    };
  }

  return (
    <div className="container-fluid position-relative col-lg-12 col-10 my-3 rounded pb-3 shadow">
      <div className="d-none d-lg-block">
        <Image
          src="/h1_hero.png"
          alt="Boy smiling with notebook"
          width={1922}
          height={844}
        />
      </div>
      <div
        className={`${styles.heroImg} d-flex flex-column d-lg-block align-items-center`}
      >
        <h1
          className={`align-lg-left display-2 text-secondary fw-bolder ${styles.headerText}`}
        >
          Our Helping To
          <br />
          The World
        </h1>
        <p className="col-lg-8 col-sm-6 fw-lighter w-75 text-center">
          {contactInfo.taglineText}
        </p>
        <div className="d-flex align-items-center justify-content-center flex-column flex-md-row w-75">
          <button className="btn btn-primary px-4 py-2">
            <Link href="/donate" className="text-decoration-none text-white">
              Donate
            </Link>
          </button>
          <a
            className="text-secondary fw-lighter py-md-0 px-3 py-3"
            href={`tel:${contactInfo.phoneNumber}`}
          >
            <i className="bi bi-telephone text-secondary pe-1" />
            {contactInfo.phoneNumber}
          </a>
        </div>
      </div>
    </div>
  );
};

export default MainJumbotron;
