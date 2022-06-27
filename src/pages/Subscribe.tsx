import { useNavigate } from "react-router-dom";
import { useState, FormEvent } from "react";

import imageCode from '../assets/images/code-mockup.png';

import { Logo } from "../components/Logo";
import { useCreateSubscriberMutation, useGetLessonsQuery } from "../graphql/generated";

export function Subscribe() {
  const { data } = useGetLessonsQuery();
  const slug = data && data.lessons && data.lessons.length ? data.lessons[0].slug : '';
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [createSubscriber, { loading }] = useCreateSubscriberMutation();

  async function handleSubscribe(event: FormEvent) {
    event?.preventDefault();

    await createSubscriber({
      variables: {
        name,
        email
      }
    });

    navigate(`/event/lesson/${slug}`);
  }

  return (
    <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center">
      <div className="w-full max-w-[1100px] flex flex-col md:flex-row items-center justify-between mt-20 mx-auto">
        <div className="max-w-[640px] px-8 mb-8 text-center md:text-left md:px-0 md:mb-0">
          <div className="flex items-center justify-center md:justify-start">
            <Logo />
          </div>

          <h1 className="mt-8 text-3xl md:text-[2.5rem] leading-tight">
            Construa uma <strong className="text-blue-500">aplicação completa</strong>, do zero,
            com <strong className="text-blue-500">React JS</strong>
          </h1>
          <p className="mt-4 text-sm md:text-base text-gray-200 leading-relaxed">
            Em apenas uma semana você vai dominar na prática uma das tecnologias mais utilizadas e com alta demanda para acessar as melhores oportunidades do mercado.
          </p>
        </div>

        <div className="p-8 bg-gray-700 border border-gray-500 rounded">
          <strong className="text-2xl mb-6 block">Inscreva-se gratuitamente</strong>

          <form onSubmit={handleSubscribe} className="flex flex-col gap-2 w-full">
            <input
              className="bg-gray-900 rounded px-5 h-14"
              type="text"
              onChange={event => setName(event.target.value)}
              placeholder="Seu nome completo"
            />

            <input
              className="bg-gray-900 rounded px-5 h-14"
              type="text"
              onChange={event => setEmail(event.target.value)}
              placeholder="Seu e-mail"
            />

            <button
              className="mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition:colors disabled:opacity-50" 
              disabled={loading}
              type="submit">
              Garantir minha vaga
            </button>
          </form>
        </div>
      </div>

      <img src={imageCode} alt="Code" />
    </div>
  );
}