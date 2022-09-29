import { useContext } from "react";
import { FormContext } from "../contexts/FormContext";
import Checkbox from "./AnswerTypes/Checkbox";
import Option from "./AnswerTypes/Option";
import Select from "./AnswerTypes/Select";
import Text from "./AnswerTypes/Text";

export interface IAnswer {
  id: string;
  type: string;
  title: string;
  indicator: string;
  data?: string | undefined;
}

type AnswerProps = {
  questionId: number;
  answer: IAnswer;
  answerType?: string;
  group: string;
};

export default function Answer({
  questionId,
  answer,
  answerType,
  group
}: AnswerProps) {
  const { pushAnswer } = useContext(FormContext);

  const answerChanged = (questionId: number, value: string) => {
    pushAnswer({
      questionId,
      group,
      answer: value,
      indicator: answer.indicator,
      answerType,
    });
  };

  function renderAnswerType() {
    if (answer.type === "number" || answer.type === "text") {
      return (
        <Text
          questionId={questionId}
          answer={answer}
          answerChanged={answerChanged}
        />
      );
    } else if (answer.type === "radio") {
      return (
        <Option
          questionId={questionId}
          answer={answer}
          answerChanged={answerChanged}
        />
      );
    } else if (answer.type === "select") {
      return (
        <Select
          questionId={questionId}
          answer={answer}
          answerChanged={answerChanged}
        />
      );
    } else if (answer.type === "checkbox") {
      return (
        <Checkbox
          questionId={questionId}
          answer={answer}
          answerChanged={answerChanged}
        />
      );
    }
  }

  return (
    <div key={answer.id} className="space-y-4 mt-3">
      {renderAnswerType()}
    </div>
  );
}
