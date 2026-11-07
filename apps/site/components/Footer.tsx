import axios from "axios";
import Link from "next/link";
import { useState } from "react";

import type { ContactInfo } from "../types";

import styles from "../../styles/components/Footer.module.scss";

interface Props {
  active: string;
  contactInfo?: ContactInfo;
}

const Footer: React.FunctionComponent<Props> = ({ active, contactInfo }) => {
  const [email, setEmail] = useState("");
  const [disabled, setDisabled] = useState(false);

  const onClickHandler = async (e) => {
    // Prevent default button action
    e.preventDefault();
    setDisabled(true);

    // Form submit operation
    try {
      await axios
        .post("/api/newsletter", {
          email,
        })
        .then((response) => {
          if (response.status == 200) {
            switch (response.data.info) {
              case "User already subscribed": {
                setEmail("");
                document
                  .querySelector("#emailErrorText")
                  .classList.remove("d-none");
                setDisabled(false);
                break;
              }

              case "User added": {
                setEmail("");
                document
                  .querySelector("#confirmationText")
                  .classList.remove("d-none");
                setDisabled(false);
                break;
              }

              default: {
                break;
              }
            }
          }
        });
    } catch (error) {
      console.log(error);
      // Clear input field
      setEmail("");
      // Display error message and contactInform to try again
      document.querySelector("#serverErrorText").classList.remove("d-none");
      setDisabled(false);
    }
  };

  const onChangeHandler = (e) => {
    if (e.target.name == "emailAddress") {
      setEmail(e.target.value);
    }
  };

  return (
    <footer className="bg-dark mt-auto">
      <div className="d-flex flex-column flex-md-row align-items-center align-items-md-start justify-content-evenly text-light flex-wrap p-4">
        <p className="fs-1 flex-shrink-0 text-center">
          World Eye <br /> Foundation
        </p>
        <div className="d-flex flex-column justify-content-evenly">
          <p className="fs-5">Contact Us</p>
          <ul className="list-unstyled fw-light">
            <li className="py-2" style={{ width: "12rem" }}>
              {contactInfo.fullAddress}
            </li>
            <li className="py-2">{contactInfo.phoneNumber}</li>
            <li className="py-2">{contactInfo.email}</li>
          </ul>
        </div>
        <div className="d-flex flex-column justify-content-evenly">
          <p className="fs-5">Important Links</p>
          <ul className="list-unstyled fw-light">
            <Link
              href="/about-us/history"
              passHref
              className="text-reset text-decoration-none"
            >
              <li
                className={`footer-link py-2 ${
                  active == "about" ? "active" : null
                }`}
                id="about-us"
              >
                About Us
              </li>
            </Link>
            <Link
              href="/volunteering"
              className="text-reset text-decoration-none"
            >
              <li
                className={`footer-link py-2 ${
                  active == "volunteering" ? "active" : null
                }`}
                id="get-involved"
              >
                Get Involved
              </li>
            </Link>
            <Link
              href="/donate"
              passHref
              className="text-reset text-decoration-none"
            >
              <li
                className={`footer-link py-2 ${
                  active == "donate" ? "active" : null
                }`}
                id="donate"
              >
                Donate
              </li>
            </Link>
            <Link
              href="/about-us/contact-us"
              passHref
              className="text-reset text-decoration-none"
            >
              <li
                className={`footer-link py-2 ${
                  active == "contact" ? "active" : null
                }`}
                id="contact-us"
              >
                Contact Us
              </li>
            </Link>
          </ul>
        </div>
        <div className="d-flex flex-column justify-content-evenly">
          <div className="fs-5 pb-2">Newsletter</div>
          <div className="fw-light pb-3">
            Sign up for updates of our upcoming projects
            <div
              className="fw-normal text-primary d-none pt-2 text-center"
              id="confirmationText"
            >
              Sign up complete!
              <br /> Check your email to confirm sign up.
            </div>
            <div
              className="fw-normal text-warning d-none pt-2 text-center"
              id="serverErrorText"
            >
              There was an error with the sign up! <br />
              Please refresh the page and try again.
            </div>
            <div
              className="fw-normal text-warning d-none pt-2 text-center"
              id="emailErrorText"
            >
              You&apos;re already a member! <br />
              Enter a different email or unsubscribe and resubscribe.
            </div>
          </div>
          <form>
            <div className="input-group">
              <input
                type="email"
                className="form-control col-6"
                name="emailAddress"
                id="emailInput"
                placeholder="Email address"
                value={email}
                required
                onChange={onChangeHandler}
              />
              <button
                className="btn btn-primary"
                type="submit"
                onClick={onClickHandler}
                disabled={disabled}
              >
                <i className="bi bi-envelope" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
