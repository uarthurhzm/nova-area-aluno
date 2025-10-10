import type { StudentReservedBook } from "@/application/dto/student-reserved-book";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import { useLibraryService } from "./use-library-service";

export const useCancelReservation = () => {
    const { userData } = useAuth();
    const libraryService = useLibraryService();
    const { showSuccess, showError } = useToast();

    const cancelReservation = async (reserve: StudentReservedBook) => {
        if (!userData) return;
        try {
            await libraryService.cancelReservation(reserve.ID);
            showSuccess("Reserva cancelada com sucesso.");
        } catch (error) {
            showError("Erro ao cancelar a reserva.");
        }
    }

    return { cancelReservation };
}