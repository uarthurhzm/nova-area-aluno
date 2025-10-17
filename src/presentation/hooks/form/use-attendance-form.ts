import { ATTENDANCE_REQUEST_SCHEMA } from "../../schemas/schemas";
import { useFormSetup } from "../use-form-setup";

export const useAttendanceForm = () => {
    const { form, handleSubmit } = useFormSetup({
        schema: ATTENDANCE_REQUEST_SCHEMA,
        defaultValues: {
            sector: "",
            subject: "",
            requestType: "",
            disciplineIds: [],
            documentId: "",
            description: "",
        },
        onSubmit: (data) => {
            console.log(data);
        }
    });

    return {
        form,
        handleSubmit
    }
}