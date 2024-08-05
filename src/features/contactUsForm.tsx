import { actions, isInputError } from "astro:actions";
import { useState, type FormEvent } from "react";
import { TextArea } from "../components/inputs/textArea";
import { TextInput } from "../components/inputs/textInput";

export const formFieldsObject = {
    Name: "name",
    Email: "email",
    Message: "message",
} as const;
type ActionResponseType = Awaited<
    ReturnType<typeof actions.contactUsFormSubmission>
>;

export function ContactUsForm() {
    const [loading, setLoading] = useState<boolean>(false);
    const [submissionResponse, setSubmissionResponse] =
        useState<ActionResponseType | null>(null);

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formTarget = e.target as HTMLFormElement;
        const formData = new FormData(formTarget);
        // res -> {data, error} no error can be thrown here
        const res = await actions.contactUsFormSubmission(formData);
        setSubmissionResponse(res);
        if (res.data?.success) {
            formTarget.reset();
        }
        setLoading(false);
    };

    const inputValidationError =
        isInputError(submissionResponse?.error) && submissionResponse.error.fields;

    return (
        <form
            onSubmit={onSubmit}
            className="flex flex-col items-center gap-4 border-2 border-solid border-gray-500 rounded-2xl p-4 shadow-xl shadow-sky-400/20 dark:shadow-sky-800/20 bg-slate-200 dark:bg-slate-700"
        >
            <div className="flex flex-col gap-1 justify-center w-full">
                <label
                    className="text-slate-800 dark:text-slate-300"
                    htmlFor={formFieldsObject.Name}
                >
                    Name:
                </label>
                <TextInput
                    type="text"
                    id={formFieldsObject.Name}
                    name={formFieldsObject.Name}
                />
                {inputValidationError &&
                    inputValidationError?.[formFieldsObject.Name] && (
                        <div className="text-red-500">
                            {inputValidationError?.[formFieldsObject.Name]?.[0]}
                        </div>
                    )}
            </div>
            <div className="flex flex-col gap-1 justify-center w-full">
                <label
                    className="text-slate-800 dark:text-slate-300"
                    htmlFor={formFieldsObject.Email}
                >
                    Email:
                </label>
                <TextInput
                    type={formFieldsObject.Email}
                    id={formFieldsObject.Email}
                    name={formFieldsObject.Email}
                />
                {inputValidationError &&
                    inputValidationError?.[formFieldsObject.Email] && (
                        <div className="text-red-500">
                            {inputValidationError?.[formFieldsObject.Email]?.[0]}
                        </div>
                    )}
            </div>
            <div className="flex flex-col gap-1 justify-center w-full">
                <label
                    className="text-slate-800 dark:text-slate-300"
                    htmlFor={formFieldsObject.Message}
                >
                    Message:
                </label>
                <TextArea
                    id={formFieldsObject.Message}
                    name={formFieldsObject.Message}
                />
                {inputValidationError &&
                    inputValidationError?.[formFieldsObject.Message] && (
                        <div className="text-red-500">
                            {inputValidationError?.[formFieldsObject.Message]?.[0]}
                        </div>
                    )}
            </div>
            {submissionResponse?.error?.code === "TOO_MANY_REQUESTS" && (
                <div className="text-red-500">Rate limit exceeded</div>
            )}
            {!inputValidationError && // We don't want to show validation error twice
                submissionResponse?.error && (
                    <div className="text-red-500">
                        {`Failed to submit form, received error: ${submissionResponse.error.message}`}
                    </div>
                )}
            {submissionResponse?.data?.success && (
                <div className="text-green-500">Thank you for contacting us!</div>
            )}
            <button
                className="font-bold text-lg bg-sky-500 dark:bg-sky-700 text-white dark:text-white rounded-xl px-4 py-2 shadow-sky-400/20 dark:shadow-sky-800/20 disabled:opacity-50 hover:bg-sky-600 hover:dark:bg-sky-800 hover:text-gray-100 hover:shadow-sky-500/30 hover:dark:shadow-sky-900/30"
                disabled={loading}
            >
                Send
            </button>
        </form>
    );
}
