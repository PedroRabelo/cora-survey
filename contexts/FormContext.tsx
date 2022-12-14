import Router from "next/router";
import { createContext, ReactNode, useEffect, useState } from "react";
import axios from 'axios';

interface IQuestionAnswer {
  questionId: number;
  group: string;
  answer: string;
  indicator?: string;
  answerType: string | undefined;
}

interface ISurvey {
  id: number;
  guestId: number;
}

type GuestData = {
  name: string;
  email: string;
  birthDate: string;
  gender: string;
};

type FormContextData = {
  pushAnswer(answer: IQuestionAnswer): void;
  formAnswers: IQuestionAnswer[];
  createSurvey(guest: GuestData): Promise<void>;
  survey?: ISurvey;
  saveAnswers(nextStep: string): void;
  isLoading: boolean;
};

type FormProviderProps = {
  children: ReactNode;
};

export const FormContext = createContext({} as FormContextData);

export function FormProvider({ children }: FormProviderProps) {
  const formAnswers: IQuestionAnswer[] = [];

  const [survey, setSurvey] = useState<ISurvey>();
  const [isLoading, setIsLoading] = useState(false);

  function pushAnswer(answer: IQuestionAnswer) {
    setIsLoading(true);
    const questionIndex = formAnswers.findIndex(
      (ans) => ans.questionId == answer.questionId
    );

    if (questionIndex >= 0) {
      const formAnswer = formAnswers[questionIndex];
      if (formAnswer.answerType === "array") {
        if (formAnswer.answer.includes(answer.answer)) {
          // Se a reposta já foi adicionada numa pergunta do tipo array preciso verificar se já existe para remover
          // quando for a ação de desmarcar a opção.
          const answers: string[] =
            formAnswers[questionIndex].answer.split(",");

          formAnswers[questionIndex].answer = answers
            .splice(
              answers.findIndex((a) => a === answer.answer),
              1
            )
            .toString();
        } else {
          formAnswers[questionIndex].answer = formAnswer.answer.concat(
            ", ",
            answer.answer
          );
        }
      } else {
        formAnswers[questionIndex] = answer;
      }
    } else {
      // setFormAnswers((prevState => [answer, ...prevState]));
      formAnswers.push(answer);
    }
    setIsLoading(false);
  }

  async function createSurvey(guestData: GuestData) {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/surveys", guestData);

      const { id, guestId } = response.data;

      setSurvey({
        id,
        guestId,
      });

      await Router.push("/form/first-step");

      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
      throw new Error(err.response.data.message);
    }
  }

  async function saveAnswers(nextStep: string) {
    try {
      setIsLoading(true);
      await axios.post(`/api/survey/${survey?.id}/answers`, {
        formAnswers,
      });

      await Router.push(`/form/${nextStep}`);
      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
      throw new Error(err.response.data.message);
    }
  }

  return (
    <FormContext.Provider
      value={{ pushAnswer, formAnswers, createSurvey, survey, saveAnswers, isLoading }}
    >
      {children}
    </FormContext.Provider>
  );
}
