import { IsNumber, IsString } from "class-validator";

export class ChatNotificationDto {
    @IsString()
    message: string;
    @IsString()
    user: string;
    @IsNumber()
    timestamp: number;
}