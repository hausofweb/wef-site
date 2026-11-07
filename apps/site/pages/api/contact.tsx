import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const contact = async (req: NextApiRequest, res: NextApiResponse) => {
  await axios
    .post(
      "https://api.airtable.com/v0/appAAeMZXtzd4hoMR/Contact%20Form",
      {
        records: [
          {
            fields: {
              Email: req.body.email,
              Message: req.body.message,
              Name: req.body.name,
            },
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      res.status(response.status).send(response.data);
    });
};

export default contact;
