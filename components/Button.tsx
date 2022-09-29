import { ButtonHTMLAttributes, SVGProps } from "react";
import MoonLoader from "react-spinners/MoonLoader";

type Props = {
  icon?: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  title: String;
  color: "primary" | "secondary";
  loading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function Button({ ...props }: Props) {
  return (
    <button
      type={props.type}
      className={classNames(
        props.disabled ? "bg-indigo-300 text-white cursor-not-allowed" :
          props.color === "primary"
            ? "focus:ring-indigo-500 text-white bg-indigo-600 hover:bg-indigo-700"
            : "text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:ring-indigo-500",
        "inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
      )}
      {...props}
    >
      {props.loading && <MoonLoader color="#3654eb" size={22} className="-ml-1 mr-2 h-5 w-5" />}

      {props.icon && (
        <props.icon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
      )}
      {props.title}
    </button>
  );
}
