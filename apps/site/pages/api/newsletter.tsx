import type { NextApiRequest, NextApiResponse } from "next";

const mailchimp = require("@mailchimp/mailchimp_marketing");
const md5 = require("md5");

const newsletter = async (req: NextApiRequest, res: NextApiResponse) => {
  const listID = process.env.MAILCHIMP_AUDIENCE_ID;
  mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: "us5",
  });

  const addUser = async (email, step) => {
    try {
      switch (step) {
        case 1: {
          await mailchimp.lists
            .updateListMember(listID, md5(email.toLowerCase()), {
              email_address: email,
              status: "subscribed",
            })
            .then((response) => {
              res.status(200).send(
                JSON.stringify({
                  info: "User added",
                })
              );
            });
          break;
        }

        case 2: {
          await mailchimp.lists
            .addListMember(listID, {
              email_address: email,
              status: "subscribed",
            })
            .then((reponse) => {
              res.status(200).send(
                JSON.stringify({
                  info: "User added",
                })
              );
            });
        }

        default: {
          break;
        }
      }
    } catch (error) {
      // Error adding email to list
      console.log(step);
      console.log(error);
      res
        .status(504)
        .send(JSON.stringify({ info: "Error adding user to email list." }));
    }
  };

  // User enters email
  const userEmail = req.body.email;

  // -> check if email exists on subscription
  try {
    const response = await mailchimp.lists.getListMember(
      listID,
      md5(userEmail.toLowerCase())
    );

    // -> if email does exist
    // -> if the email subscription status “subscribed”
    if (response.status == "subscribed") {
      // -> return to site, “user subscribed”
      res.status(200).send(JSON.stringify({ info: "User already subscribed" }));
    } else {
      // -> else
      // -> remove email from database, and resubscribe user to status pending and return to site “user pending
      try {
        const response = await mailchimp.lists.updateListMember(
          listID,
          md5(userEmail.toLowerCase()),
          {
            status: "unsubscribed",
          }
        );

        if (response.status == "unsubscribed") {
          addUser(userEmail, 1);
        }
      } catch {
        // Error removing contact
        res
          .status(504)
          .send(JSON.stringify({ info: "Error unsubscribing contact" }));
      }
    }
  } catch (error) {
    // -> if email does not exist
    if (error.status == 404) {
      // -> Add email to list
      addUser(userEmail, 2);
    } else {
      res.status(504).send(JSON.stringify({ error, info: "Server error" }));
    }
  }
};

export default newsletter;
