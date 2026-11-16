import axios from "axios";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { getContactInfo } from "../lib/sanity";
import type { ContactInfo } from "../types";

interface Props {
  contactInfo: ContactInfo;
}

const DonateComplete: NextPage<Props> = ({ contactInfo }) => {
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
    <div className="vh-100 d-flex flex-column">
      <Head>
        <title>Thank you! - World Eye Foundation</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Thank you for your support! - World Eye Foundation"
        />
      </Head>
      <NavBar contactInfo={contactInfo} active="" />
      <div className="d-flex flex-column justify-content-center container h-50 w-50 py-3">
        <h1 className="text-center">Thank you for your donation!</h1>
        <p className="pt-3 text-center">
          We are extremely thankful for your support. Sign up below to receive
          updates regarding our progress. Thank you again!
        </p>
        <form>
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
      <Footer contactInfo={contactInfo} active="" />
    </div>
  );
};

export default DonateComplete;

export const getStaticProps: GetStaticProps<Props> = async () => ({
  props: { contactInfo: await getContactInfo() },
  revalidate: 300,
});
