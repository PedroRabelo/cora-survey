import { IAnswer } from '../Answer';

type CheckboxProps = {
  questionId: number;
  answer: IAnswer;
  answerChanged: (questionId: number, value: string) => void;
}

export default function Checkbox({ questionId, answer, answerChanged }: CheckboxProps) {
  return (
    <div className="relative flex items-start">
      <div key={answer.id} className="flex items-center h-5">
        <input
          id={answer.id}
          aria-describedby="resposta"
          name={questionId.toString()}
          type="checkbox"
          value={answer.title}
          onChange={(e) => {
            answerChanged(questionId, e.target.value);
          }}
          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
        />
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor={answer.title} className="font-medium text-gray-700">
          {answer.title}
        </label>
      </div>
    </div>
  );
}
