import { actions } from "astro:actions";
import { useState, type FormEvent } from "react";
import { TextArea } from "../components/inputs/textArea";
import { TextInput } from "../components/inputs/textInput";
import { getErrorMessage } from "../utils/errorParser";

export const FormFieldsObject = {
    Name: "name",
    Email: "email",
    Message: "message",
} as const;
type AllFormFieldsNames = (typeof FormFieldsObject)[keyof typeof FormFieldsObject];
type ValidationError = Record<AllFormFieldsNames, string[]>;

export function ContactUsForm() {
    const [submissionError, setSubmissionError] = useState<string | null>(null);
    const [validationError, setValidationError] = useState<ValidationError | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [formSubmittedSuccessfully, setFormSubmittedSuccessfully] = useState(false);

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)
        setValidationError(null)
        setSubmissionError(null)
        setFormSubmittedSuccessfully(false)
        try {
            const formTarget = e.target as HTMLFormElement
            const formData = new FormData(formTarget);
            const res = await actions.contactUsFormSubmission(formData)
            // Actions validation error type are broken (https://github.com/withastro/astro/issues/11611)
            // so we need to check if fields in res.error to prevent TS from complaining.
            if (res.error?.type === "AstroActionInputError" && "fields" in res.error) {
                setValidationError(res.error.fields as ValidationError)
            } else if (res.error?.message) {
                setSubmissionError(res.error.message)
            } if (res.data?.success) {
                setFormSubmittedSuccessfully(true);
                formTarget.reset()
            }
        } catch (error) {
            console.error({ error })
            setSubmissionError(getErrorMessage(error))
        }
        setLoading(false)
    }

    return (
        <form onSubmit={onSubmit} className="flex flex-col items-center gap-4 border-2 border-solid border-gray-500 rounded-2xl p-4 shadow-xl shadow-sky-400/20 dark:shadow-sky-800/20 bg-slate-200 dark:bg-slate-700">
            <div>This is a client component, we can choose to prerender it on the server</div>
            <div>Or to statically generate the entire page, and sent the JS needed to render this part</div>
            <div>{`SEO - right click -> view page source -> search SEO`}</div>
            <div className="flex flex-col gap-1 justify-center w-full">
                <label
                    className="text-slate-800 dark:text-slate-300"
                    htmlFor={FormFieldsObject.Name}
                >
                    Name:
                </label>
                <TextInput type="text" id={FormFieldsObject.Name} name={FormFieldsObject.Name} />
                {validationError?.[FormFieldsObject.Name] && <div className="text-red-500">{validationError?.["name"][0]}</div>}
            </div>
            <div className="flex flex-col gap-1 justify-center w-full">
                <label
                    className="text-slate-800 dark:text-slate-300"
                    htmlFor={FormFieldsObject.Email}
                >
                    Email:
                </label>
                <TextInput type={FormFieldsObject.Email} id={FormFieldsObject.Email} name={FormFieldsObject.Email} />
                {validationError?.[FormFieldsObject.Email] && <div className="text-red-500">{validationError?.["email"][0]}</div>}
            </div>
            <div className="flex flex-col gap-1 justify-center w-full">
                <label
                    className="text-slate-800 dark:text-slate-300"
                    htmlFor={FormFieldsObject.Message}
                >
                    Message:
                </label>
                <TextArea id={FormFieldsObject.Message} name={FormFieldsObject.Message}></TextArea>
                {validationError?.[FormFieldsObject.Message] && <div className="text-red-500">{validationError?.["message"][0]}</div>}
            </div>
            {submissionError && <div className="text-red-500">{`Failed to submit form: ${submissionError}`}</div>}
            {formSubmittedSuccessfully && <div className="text-green-500">Thank you for contacting us!</div>}
            <button
                className="font-bold text-lg bg-sky-500 dark:bg-sky-700 text-white dark:text-white rounded-xl p-2 w-1/6 shadow-xl shadow-sky-400/20 dark:shadow-sky-800/20 disabled:opacity-50"
                disabled={loading}
            >
                Send
            </button>
        </form>
    );
}
