import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { name, email, birthDate, gender } = req.body;

      const data: Prisma.SurveyCreateInput = {
        guest: {
          connectOrCreate: {
            where: {
              email,
            },
            create: {
              name,
              email,
              birthDate: birthDate && new Date(birthDate),
              gender,
            },
          },
        },
      };

      const survey = await prisma?.survey.create({ data });
      res.status(200).json(survey);
    } catch (e) {
      res.status(500).json({ message: "Something went wrong" });
      console.log(e);
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}
