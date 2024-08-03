import { experimental_withState as withState } from "@astrojs/react/actions";
import { actions } from "astro:actions";
import { useActionState, useEffect } from "react";
import { TextArea } from "../components/inputs/textArea";
import { TextInput } from "../components/inputs/textInput";

export function ContactUsForm() {
    const [{ data, error }, action, pending] = useActionState(
        withState(actions.contactUsFormSubmission),
        {
            data: {
                payload: {
                    name: "",
                    email: "",
                    message: ""
                },
                success: false
            },
            error: undefined
        }
    );

    useEffect(() => { console.log({ data, error }) }, [data, error])

    return (
        <>
            <form action={action} className="flex flex-col items-center gap-4 border-2 border-solid border-gray-500 rounded-2xl p-4 shadow-xl shadow-sky-400/20 dark:shadow-sky-800/20 bg-slate-200 dark:bg-slate-700">
                <div className="flex flex-col gap-1 justify-center w-full">
                    <label
                        className="text-slate-800 dark:text-slate-300"
                        htmlFor="name"
                    >
                        Name:
                    </label>
                    <TextInput type="text" id="name" name="name" />
                    {error?.fields?.["name"] && <div className="text-red-500">{error?.fields?.["name"][0]}</div>}
                </div>
                <div className="flex flex-col gap-1 justify-center w-full">
                    <label
                        className="text-slate-800 dark:text-slate-300"
                        htmlFor="email"
                    >
                        Email:
                    </label>
                    <TextInput type="email" id="email" name="email" />
                    {error?.fields?.["email"] && <div className="text-red-500">{error?.fields?.["email"][0]}</div>}
                </div>
                <div className="flex flex-col gap-1 justify-center w-full">
                    <label
                        className="text-slate-800 dark:text-slate-300"
                        htmlFor="message"
                    >
                        Message:
                    </label>
                    <TextArea id="message" name="message"></TextArea>
                    {error?.fields?.["message"] && <div className="text-red-500">{error?.fields?.["message"][0]}</div>}
                </div>
                {data?.success && <div>Tank you for contacting us</div>}
                {error?.cause === "INTERNAL_SERVER_ERROR" && <div>Failed to submit form</div>}
                <button
                    className="font-bold text-lg bg-sky-500 dark:bg-sky-700 text-white dark:text-white rounded-xl p-2 w-1/6 shadow-xl shadow-sky-400/20 dark:shadow-sky-800/20"
                >
                    Send
                </button>
            </form>
        </>
    );
}
