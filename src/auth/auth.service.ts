import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { FirebaseService } from '../firebase/firebase.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/auth.entity';
import { Repository } from 'typeorm';

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
  login(loginAuthDto: LoginAuthDto) {
    return 'This action adds a new auth';
  }

}
