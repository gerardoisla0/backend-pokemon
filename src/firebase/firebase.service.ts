import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAuthDto } from 'src/auth/dto/create-auth.dto';
import * as admin from 'firebase-admin';
import { decode } from 'punycode';

@Injectable()
export class FirebaseService {
  async create(createAuthDto: CreateAuthDto): Promise<admin.auth.UserRecord> {
    try{

     const userRecord = await admin.auth().createUser({
          email: createAuthDto.email,
          password: createAuthDto.password,
          displayName: createAuthDto.fullName,
      });

      console.log('Usuario Creado:',userRecord);
      return userRecord;

    }catch(error){
      this.handleErrors(error);
    }
  }

  async verify(token:string): Promise<any> {
    try{
      const decodeToken = await admin.auth().verifyIdToken(token);
      console.log(decodeToken);
      return decodeToken;
    }catch(error){
      this.handleErrors(error);
    }
  }

  private handleErrors(error: any){
    if(error.code === 'auth/email-already-exists'){
      throw new BadRequestException(error.errorInfo.message);
    }
    console.log(error.errorInfo.message);
    throw new InternalServerErrorException('Please check server logs');
  }
}
