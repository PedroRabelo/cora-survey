import { useEffect, useState } from 'react';
import { IAnswer } from '../Answer';

import specialties from "../../data/specialties.json";

type SelectProps = {
  questionId: number;
  answer: IAnswer;
  answerChanged: (questionId: number, value: string) => void;
}

export default function Select({questionId, answer, answerChanged}: SelectProps) {
  const [selectData, setSelectData] = useState<any[]>([]);
  const [selected, setSelected] = useState('');

  useEffect(() => {
    if (answer.data === "specialty") {
      setSelectData(specialties)
    }
  }, [answer.data]);

  function handleAnswerChange() {
    answerChanged(questionId, selected);
  }

  return (
    <div>
      <select
        id={answer.id}
        name={questionId.toString()}
        value={selected}
        onChange={e => setSelected(e.target.value)}
        onBlur={handleAnswerChange}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option>Selecione uma opção</option>
        {
          selectData.map((p) =>
            <option key={p.id}>{p.name}</option>
          )
        }
      </select>
    </div>
  )
}
