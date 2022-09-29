import { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
import { prisma } from "../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { id } = req.query;
      const { formAnswers } = req.body;

      const answers: Prisma.SurveyAnswerCreateManyInput[] = [];

      formAnswers.map((ans: Prisma.SurveyAnswerCreateManyInput) => {
        return answers.push({
          surveyId: Number(id),
          questionId: ans.questionId,
          group: ans.group,
          answer: ans.answer,
          answerType: ans?.answerType,
          indicator: ans.indicator,
        });
      });

      await prisma.surveyAnswer.createMany({ data: answers });

      res.status(200).json({ message: "Answers created." });
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
