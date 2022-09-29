import { IAnswer } from '../Answer';
import { useState } from 'react';

type TextProps = {
  questionId: number;
  answer: IAnswer;
  answerChanged: (questionId: number, value: string) => void;
}

export default function Text({ questionId, answer, answerChanged }: TextProps) {
  const [text, setText] = useState("");

  function handleAnswerChange() {
    answerChanged(questionId, text);
  }

  return (
    <div key={answer.id}>
      <label htmlFor="text" className="sr-only">
        {answer.id}
      </label>
      <input
        type={answer.type}
        name={questionId.toString()}
        id={answer.id}
        value={text}
        onChange={e => setText(e.target.value)}
        onBlur={handleAnswerChange}
        className="block w-full border-0 border-b border-transparent bg-gray-100 focus:border-indigo-600 focus:ring-0 sm:text-sm"
        placeholder="Digite sua resposta"
      />
    </div>
  )
}
