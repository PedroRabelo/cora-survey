import { IAnswer } from '../Answer';

type OptionProps = {
  questionId: number;
  answer: IAnswer;
  answerChanged: (questionId: number, value: string) => void;
}

export default function Option({ questionId, answer, answerChanged }: OptionProps) {
  return (
    <div className="space-y-4">
      <div key={answer.id} className="flex items-center">
        <input
          type="radio"
          id={answer.id}
          name={questionId.toString()}
          value={answer.title}
          onChange={(e) => {
            answerChanged(questionId, e.target.value);
          }}
          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
        />
        <label htmlFor={answer.title} className="ml-3 block text-sm font-medium text-gray-700">
          {answer.title}
        </label>
      </div>
    </div>
  );
}
