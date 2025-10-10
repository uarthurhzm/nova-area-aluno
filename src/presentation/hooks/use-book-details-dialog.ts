import { useAuth } from "@/presentation/contexts/AuthContext";
import { useToast } from "@/presentation/contexts/ToastContext";
import { useLibraryService } from "./use-library-service";
import type { BookDetailsResponseDTO } from "@/application/dto/book-details-response-dto";

export const useBookDetailsDialog = () => {
    const { userData } = useAuth();
    const libraryService = useLibraryService();
    const { showSuccess, showError } = useToast();

    const handleReserve = async (example: BookDetailsResponseDTO) => {
        if (!userData) return;

        try {
            await libraryService.postReserve({
                CD_ACV: example.CD_ACV,
                CD_MAT: userData.CD_MAT,
                NR_TOMBO: example.NR_TOMBO
            });
            showSuccess("Livro reservado com sucesso!");
        } catch (error) {
            showError("Erro ao reservar livro");
            console.error(`Erro ao reservar livro: ${error}`);
        }
    };

    return { handleReserve };
};