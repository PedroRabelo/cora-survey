import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import { useContext, useEffect, useState } from "react";
import Form from "../../components/Form";
import FormHeader from "../../components/FormHeader";
import { IQuestion } from "../../components/Question";
import Steps from "../../components/Steps";
import { FormContext } from "../../contexts/FormContext";
import questionsData from "../../data/questions-habitos-vida.json";

const steps = [
  { id: "01", name: "Saúde geral", href: "first-step", status: "complete" },
  { id: "02", name: "Hábitos de vida", href: "second-step", status: "current" },
  { id: "03", name: "Saúde mental", href: "third-step", status: "next" },
];

export default function SecondStep() {
  const [questions, setQuestions] = useState<IQuestion[]>();

  const { saveAnswers, survey } = useContext(FormContext);

  useEffect(() => {
    setQuestions(questionsData);

    if (!survey) {
      Router.push("/");
    }
  }, [survey]);

  return (
    <>
      <Head>
        <title>Cora Saúde | Hábitos de Vida</title>
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
            <button
              type="submit"
              onClick={() => saveAnswers("third-step")}
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Próximo
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
