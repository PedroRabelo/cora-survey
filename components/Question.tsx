import Answer, { IAnswer } from "./Answer";

export interface IQuestion {
  id: number;
  group: string;
  title: string;
  subtitle: string;
  answerType?: string;
  answers: IAnswer[];
}

type QuestionProps = {
  question: IQuestion;
};

export default function Question({ question }: QuestionProps) {
  return (
    <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
      <div className="bg-white px-4 py-1 border-b border-gray-200 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {question.title}
        </h3>
        <span className="text-sm text-gray-400">{question.subtitle}</span>
      </div>
      <fieldset className="flex flex-1 flex-col mt-4">
        {question.answers.map((answer) => (
          <Answer
            key={answer.id}
            answer={answer}
            questionId={question.id}
            answerType={question?.answerType}
            group={question.group}
          />
        ))}
      </fieldset>
    </div>
  );
}
