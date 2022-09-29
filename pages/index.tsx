import { yupResolver } from "@hookform/resolvers/yup";
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useContext, useState } from 'react';
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { Button } from "../components/Button";
import { FormContext } from '../contexts/FormContext';

const sexos = [
  { id: "f", title: "Feminino" },
  { id: "m", title: "Masculino" },
];

type GuestFormData = {
  name: string;
  email: string;
  birthDate: string;
  gender: string;
};

const guestFormSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  birthDate: yup.string().required("Data nascimento obrigatória"),
});

const Home: NextPage = () => {
  const [error, setError] = useState("");

  const { createSurvey, isLoading } = useContext(FormContext);

  const { register, handleSubmit, formState } = useForm<GuestFormData>({
    resolver: yupResolver(guestFormSchema),
  });

  const { errors } = formState;

  const handleStartSurvey: SubmitHandler<GuestFormData> = async (values) => {
    try {
      await createSurvey(values);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="relative overflow-hidden">
      <Head>
        <title>Cora Saúde | Questionário</title>
        <link rel="icon" href="/favicon.ico" />

        <meta
          name="description"
          content="Vamos te ajudar a cuidar da sua saúde"
        ></meta>
      </Head>

      <div
        className="hidden sm:block sm:absolute sm:inset-0"
        aria-hidden="true"
      >
        <svg
          className="absolute bottom-0 right-0 transform translate-x-1/2 mb-48 text-gray-700 lg:top-0 lg:mt-28 lg:mb-0 xl:transform-none xl:translate-x-0"
          width={364}
          height={384}
          viewBox="0 0 364 384"
          fill="none"
        >
          <defs>
            <pattern
              id="eab71dd9-9d7a-47bd-8044-256344ee00d0"
              x={0}
              y={0}
              width={20}
              height={20}
              patternUnits="userSpaceOnUse"
            >
              <rect x={0} y={0} width={4} height={4} fill="currentColor" />
            </pattern>
          </defs>
          <rect
            width={364}
            height={384}
            fill="url(#eab71dd9-9d7a-47bd-8044-256344ee00d0)"
          />
        </svg>
      </div>
      <div className="relative pt-6 pb-16 sm:pb-12">
        <div
          className="relative max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6"
          aria-label="logo"
        >
          <div className="flex items-center flex-1">
            <div className="flex items-center justify-between w-full md:w-auto">
              <Image
                className="h-8 w-auto sm:h-10"
                src="/assets/img/logo-cora.svg"
                width={236}
                height={56}
                alt="Cora Saúde logo"
              />
            </div>
          </div>
        </div>

        <main className="mt-12 sm:mt-16">
          <div className="mx-auto max-w-7xl">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="px-4 sm:px-6 sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:flex lg:items-center">
                <div>
                  <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-indigo-400 sm:mt-5 sm:leading-none lg:mt-6 lg:text-5xl xl:text-6xl">
                    <span className="md:block">
                      Olá, vamos conhecer melhor sua saúde?
                    </span>{" "}
                  </h1>
                  <p className="mt-3 text-base text-gray-700 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                    Precisamos fazer algumas perguntas para conhecermos seus
                    hábitos de vida e como está sua saúde hoje, para que
                    possamos te entregar a melhor experiência.
                  </p>
                </div>
              </div>
              <div className="mt-16 sm:mt-24 lg:mt-0 lg:col-span-6">
                <div className="bg-indigo-100 sm:max-w-md sm:w-full sm:mx-auto sm:rounded-lg sm:overflow-hidden">
                  <div className="px-4 py-8 sm:px-10">
                    <div className="flex justify-center text-sm">
                      <p className="text-xl font-medium text-gray-700">
                        Vamos começar?
                      </p>
                    </div>

                    <div className="mt-6">
                      <form
                        className="space-y-6"
                        onSubmit={handleSubmit(handleStartSurvey)}
                        noValidate
                      >
                        <div>
                          <label htmlFor="name" className="sr-only">
                            Nome
                          </label>
                          <input
                            id="name"
                            type="text"
                            autoComplete="name"
                            placeholder="Nome completo"
                            className="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                            {...register("name")}
                          />
                        </div>

                        <div>
                          <label htmlFor="email" className="sr-only">
                            Email
                          </label>
                          <input
                            id="email"
                            type="text"
                            autoComplete="email"
                            placeholder="Email"
                            className="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                            {...register("email")}
                          />
                        </div>

                        <div>
                          <label htmlFor="birthDate" className="sr-only">
                            Data nascimento
                          </label>
                          <input
                            id="birthDate"
                            type="date"
                            placeholder="Data de nascimento"
                            autoComplete="none"
                            className="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                            {...register("birthDate")}
                          />
                        </div>

                        <div>
                          <fieldset className="mt-4">
                            <legend className="sr-only">Sexo</legend>
                            <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                              {sexos.map((sexo) => (
                                <div
                                  key={sexo.id}
                                  className="flex items-center"
                                >
                                  <input
                                    id={sexo.id}
                                    type="radio"
                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                    value={sexo.title}
                                    {...register("gender")}
                                  />
                                  <label
                                    htmlFor={sexo.id}
                                    className="ml-3 block text-sm font-medium text-gray-700"
                                  >
                                    {sexo.title}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </fieldset>
                        </div>

                        <div className="flex justify-center items-center">
                          <Button
                            title="Começar"
                            color="primary"
                            type="submit"
                            disabled={isLoading}
                            loading={isLoading}
                          />
                        </div>
                        <div className="flex-col">
                          <p className="text-red-500">
                            {errors.name?.message}
                          </p>
                          <p className="text-red-500 mt-2">
                            {errors.email?.message}
                          </p>
                          <p className="text-red-500 mt-2">
                            {errors.birthDate?.message}
                          </p>
                          <p className="text-red-500 mt-2">{error}</p>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="px-4 py-6 bg-indigo-50 border-t-2 border-gray-200 sm:px-10">
                    <p className="text-xs leading-5 text-gray-500">
                      Preenchendo o questionário, você está aceitando nossos{" "}
                      <a
                        href="#"
                        className="font-medium text-gray-900 hover:underline"
                      >
                        Termos
                      </a>
                      {" e "}
                      <a
                        href="#"
                        className="font-medium text-gray-900 hover:underline"
                      >
                        Política de Privacidade
                      </a>
                      {""}.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Home
