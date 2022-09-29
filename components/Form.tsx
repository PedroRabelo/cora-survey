import Question, { IQuestion } from "./Question";

type FormProps = {
  questions: IQuestion[];
};

export default function Form({ questions }: FormProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <form className="space-y-6 divide-y divide-gray-200">
        {questions?.length &&
          questions.map((question) => (
            <Question question={question} key={question.id} />
          ))}
      </form>
    </div>
  );
}
