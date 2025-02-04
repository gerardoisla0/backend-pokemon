import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { FirebaseService } from '../firebase/firebase.service';
import { ChatNotificationDto } from './dto/chat-notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    private readonly firebaseService: FirebaseService
  ){}
  async notify(createNotificationDto: CreateNotificationDto) {
     const payLoad = {
      title: 'Notificación DM2',
      body: createNotificationDto.message
     }

     try{
        await this.firebaseService.sendNotification(createNotificationDto.token, payLoad);
     } catch(error){
      console.log('Error enviando notificacion', error);
     }
  }

  async message(chatNotificationDto: ChatNotificationDto) {
    return this.firebaseService.sendMessage(chatNotificationDto.user,chatNotificationDto.message, chatNotificationDto.timestamp);
  }

}
