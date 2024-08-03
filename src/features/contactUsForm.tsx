import { experimental_withState as withState } from "@astrojs/react/actions";
import { actions } from "astro:actions";
import { useActionState, useEffect } from "react";
import { TextArea } from "../components/inputs/textArea";
import { TextInput } from "../components/inputs/textInput";

export function ContactUsForm() {
    const [state, action, pending] = useActionState(
        withState(actions.contactUsFormSubmission),
        {
            data: {
                NOTION_INTEGRATION_TOKEN: ""
            },
            error: undefined
        }
    );


    useEffect(() => {
        console.log({ state, pending })
    }, [state, pending])

    return (
        <form action={action} className="apply flex flex-col items-center gap-4 border-2 border-solid border-gray-500 rounded-2xl p-4 shadow-xl shadow-sky-400/20 dark:shadow-sky-800/20 bg-slate-200 dark:bg-slate-700">
            <div className="apply flex flex-col gap-1 justify-center w-full">
                <label
                    className="apply text-slate-800 dark:text-slate-300"
                    htmlFor="name"
                >
                    Name:
                </label>
                <TextInput type="text" id="name" name="name" />
            </div>
            <div className="apply flex flex-col gap-1 justify-center w-full">
                <label
                    className="apply text-slate-800 dark:text-slate-300"
                    htmlFor="email"
                >
                    Email:
                </label>
                <TextInput type="email" id="email" name="email" />
            </div>
            <div className="apply flex flex-col gap-1 justify-center w-full">
                <label
                    className="apply text-slate-800 dark:text-slate-300"
                    htmlFor="message"
                >
                    Message:
                </label>
                <TextArea id="message" name="message"></TextArea>
            </div>
            <button
                className="apply font-bold text-lg bg-sky-500 dark:bg-sky-700 text-white dark:text-white rounded-xl p-2 w-1/6 shadow-xl shadow-sky-400/20 dark:shadow-sky-800/20"
            >
                Send
            </button>
        </form>
    );
}
