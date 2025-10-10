import type { AxiosInstance } from "axios";
import { MessageRepository } from "../repositories/message-repository";
import type { PostMessageDTO } from "@/application/dto/post-message-dto";
import type { MessageDTO } from "@/application/dto/sent-message-dto";
import type { PostCommentDTO } from "@/application/dto/post-comment-dto";
import type { CommentsResponseDTO } from "@/application/dto/comments-response-dto";

export class MessageService {
    private messageRepository: MessageRepository;

    constructor(api: AxiosInstance) {
        this.messageRepository = new MessageRepository(api);
    }

    async postMessage(data: PostMessageDTO): Promise<void> {
        await this.messageRepository.postMessage(data);
    }

    async getMessages(cd_mat: number, context: 'sent' | 'received'): Promise<MessageDTO[]> {
        return await this.messageRepository.getMessages(cd_mat, context);
    }

    async postComment(data: PostCommentDTO): Promise<void> {
        await this.messageRepository.postComment(data);
    }

    async getMessageComments(messageId: number): Promise<CommentsResponseDTO[]> {
        return await this.messageRepository.getMessageComments(messageId);
    }


}