import Head from "next/head";
import Router from "next/router";
import { useContext, useEffect, useState } from "react";
import { Button } from "../../components/Button";
import Form from "../../components/Form";
import FormHeader from "../../components/FormHeader";
import { IQuestion } from "../../components/Question";
import Steps from "../../components/Steps";
import { FormContext } from "../../contexts/FormContext";
import questionsData from "../../data/questions-saude-mental.json";

const steps = [
  { id: "01", name: "Saúde geral", href: "first-step", status: "complete" },
  {
    id: "02",
    name: "Hábitos de vida",
    href: "second-step",
    status: "complete",
  },
  { id: "03", name: "Saúde mental", href: "third-step", status: "current" },
];

export default function ThirdStep() {
  const [questions, setQuestions] = useState<IQuestion[]>();

  const { saveAnswers, survey, isLoading } = useContext(FormContext);

  useEffect(() => {
    setQuestions(questionsData);

    if (!survey) {
      Router.push("/");
    }
  }, [survey]);

  return (
    <>
      <Head>
        <title>Cora Saúde | Saúde Mental</title>
        <link rel="icon" href="/favicon.ico" />

        <meta
          name="description"
          content="Vamos te ajudar a cuidar da sua saúde"
        />
      </Head>

      <div className="min-h-full bg-gray-100">
        <FormHeader />

        <div className="py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Steps steps={steps} />
          </div>
        </div>

        <Form questions={questions!!} />

        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end">
            <Button
              title="Próximo"
              type="submit"
              color="primary"
              disabled={isLoading}
              loading={isLoading}
              onClick={() => saveAnswers("finish")}
            />
          </div>
        </div>
      </div>
    </>
  );
}
