import type { CommentsResponseDTO } from "@/application/dto/comments-response-dto";
import type { PostCommentDTO } from "@/application/dto/post-comment-dto";
import type { PostMessageDTO } from "@/application/dto/post-message-dto";
import type { MessageDTO } from "@/application/dto/sent-message-dto";
import type { AxiosInstance } from "axios";

export class MessageRepository {
    private api: AxiosInstance;

    constructor(api: AxiosInstance) {
        this.api = api;
    }

    async postMessage(data: PostMessageDTO): Promise<void> {
        await this.api.post(`/messages`, data);
    }

    async getMessages(cd_mat: number, context: 'sent' | 'received'): Promise<MessageDTO[]> {
        const response = await this.api.get(`/student/${cd_mat.toString().trim()}/messages`, {
            params: { context }
        });
        return response.data;
    }
    
    async postComment(data: PostCommentDTO): Promise<void> {
        await this.api.post(`/messages/${data.messageId}/comments`, data);
    }

    async getMessageComments(messageId: number): Promise<CommentsResponseDTO[]> {
        const response = await this.api.get(`/messages/${messageId}/comments`);
        return response.data;
    }
}