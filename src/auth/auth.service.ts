import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { FirebaseService } from '../firebase/firebase.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { VerifyAuthDto } from './dto/verify-auth.dto';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly firebaseService: FirebaseService
  ){}

  async create(createAuthDto: CreateAuthDto) {
    const {uid} = await this.firebaseService.create(createAuthDto);

    const useRegister = this.userRepository.create({
      email: createAuthDto.email,
      fullName: createAuthDto.fullName,
      firebaseUUID: uid,
    });

    await this.userRepository.save(useRegister);
    return useRegister;

  }

  async verify(verifyAuthDto: VerifyAuthDto) {
    const token = await this.firebaseService.verify(verifyAuthDto.token);
    if(!token)
      throw new UnauthorizedException('Security Token are not valid');
    
    const user = await this.userRepository.findOne({
      where: { email: verifyAuthDto.email},
      select: { email: true, firebaseUUID: true, fullName: true}
    });

    if (!user)
      throw new UnauthorizedException('Credentials are not valid');

    console.log(user);
    return user;
  }

}
