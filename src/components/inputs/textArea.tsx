import type { HTMLProps } from "react";

type TextAreaProps = HTMLProps<HTMLTextAreaElement>;
export const TextArea = (props: TextAreaProps) => {
  return (
    <textarea
      {...props}
      className="apply border-slate-700 focus:border-slate-800 dark:border-slate-300 dark:focus:border-slate-500 border-[2px] border-solid px-3 py-2 rounded-xl m-0"
    />
  );
};
