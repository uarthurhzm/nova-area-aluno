import type { LibraryCollectionsResponseDTO } from "@/application/dto/library-collections-response-dto";
import { BOOK_SEARCH_SCHEMA } from "../schemas/schemas";
import { useFormSetup } from "./use-form-setup";
import { useLibraryService } from "./use-library-service";
import { useState } from "react";

export const useBookSearchForm = () => {
    const libraryService = useLibraryService();

    const [results, setResults] = useState<LibraryCollectionsResponseDTO[]>([]);

    const form = useFormSetup({
        schema: BOOK_SEARCH_SCHEMA,
        defaultValues: {
            searchOption: "NM_ACV",
            mediaOption: "0",
            searchQuery: "",
        },
        onSubmit: async (data) => {
            try {
                const results = await libraryService.getAllCollections(data);
                setResults(results);
            } catch (error) {
                console.error("Error searching books:", error);
            }
        }
    })

    return { ...form, results };
}