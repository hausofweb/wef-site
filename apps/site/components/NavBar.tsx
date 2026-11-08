import Link from "next/link";

import type { ContactInfo } from "../types";
import NavDropdown from "./NavDropdown";
import NavLink from "./NavLink";

import styles from "/styles/components/NavBar.module.scss";

interface Props {
  active: string;
  contactInfo: ContactInfo;
}

const NavBar: React.FunctionComponent<Props> = ({ active, contactInfo }) => {
  const pages = [
    {
      link: "/",
      name: "Home",
    },
    {
      name: "About Us",
      sublinks: [
        {
          link: "/about-us/history",
          name: "History",
        },
        {
          link: "/about-us/vision-and-mission",
          name: "Vision and Mission",
        },
        {
          link: "/about-us/our-team",
          name: "Our Team",
        },
        {
          link: "/about-us/partners",
          name: "Partners",
        },
        {
          link: "/about-us/contact-us",
          name: "Contact Us",
        },
      ],
    },
    {
      name: "Our Work",
      sublinks: [
        {
          link: "/our-work/screenings",
          name: "Screenings",
        },
      ],
    },
    {
      link: "/gallery",
      name: "Gallery",
    },
    {
      name: "Get Involved",
      sublinks: [
        {
          link: "/donate",
          name: "Donate",
        },
        {
          link: "/about-us/contact-us",
          name: "Contact Us",
        },
      ],
    },
    {
      link: "/news",
      name: "News",
    },
  ];

  return (
    <div className="bg-light">
      {/* Header bar to navbar */}

      <div className="container-fluid d-lg-flex justify-content-between border-bottom align-items-center d-none fw-lighter py-3 text-black">
        <div className="d-flex justify-content-evenly col-6">
          <a
            href={`tel:${contactInfo.phoneNumber || ""}`}
            className="text-decoration-none text-black"
          >
            {contactInfo.phoneNumber || "+44 000 000 0000"}
          </a>
          <span>|</span>

          <a
            className="text-decoration-none text-black"
            href="mailto:test@test.com?subject=Touching Base with World Eye Foundation"
          >
            {contactInfo.email || "test@email.com"}
          </a>
          <span>|</span>
          <div className="d-flex justify-content-evenly">
            <a href="#" className="px-2">
              <i className="bi bi-facebook" />
            </a>
            <a href="#" className="px-2">
              <i className="bi bi-twitter" />
            </a>
            <a href="#" className="px-2">
              <i className="bi bi-linkedin" />
            </a>
            <a href="#" className="px-2">
              <i className="bi bi-google" />
            </a>
          </div>
        </div>
        <div>
          <a href="#emailInput" className="text-decoration-none text-black">
            Subscribe Now
          </a>
        </div>
      </div>

      {/* MAIN NAVBAR */}

      <nav className="navbar navbar-expand-lg navbar-light sticky-top shadow">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bolder fs-2" href="/">
            World Eye Foundation
          </Link>
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <div className="d-flex flex-column">
              <span className={styles.tealTogglerLine} />
              <span className={styles.tealTogglerLine} />
              <span className={styles.tealTogglerLine} />
            </div>
          </button>
          <div
            className="navbar-collapse justify-content-end text-secondary collapse"
            id="navbarNavAltMarkup"
          >
            {/* Navbar links */}

            {pages.map((e, i) => {
              if (e.sublinks) {
                return <NavDropdown key={i} links={e} active={active} />;
              }

              return (
                <NavLink
                  key={i}
                  title={e.name}
                  route={e.link}
                  active={active}
                />
              );
            })}

            <Link
              href="/donate"
              passHref
              className="col-sm-2 col-md-2 col-3 ms-3 p-2"
            >
              <button className="btn btn-primary">Donate</button>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
