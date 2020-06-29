import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import {AuthDto} from "./auth.dto";
import {plainToClass} from "class-transformer";
import {UserDto} from "../user/user.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({username} )
    if (user && user.checkPassword(password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(authDto: Partial<AuthDto>): Promise<AuthDto> {
    const user = plainToClass(User, authDto);
    const payload = {sub: user.id, username: user.username};
    return AuthDto.fromEntity(user, this.jwtService.sign(payload))

  }

  async register(newCredentials: Partial<UserDto>) : Promise<AuthDto> {
    const user = await this.userRepository.findOne({username: newCredentials.username})
    if (user) {
      throw new HttpException({username: `${newCredentials.username} already exists`}, HttpStatus.BAD_REQUEST)
    }
    if (newCredentials.password !== newCredentials.confirmPassword) {
      throw new HttpException({password: 'Passwords do not match'}, HttpStatus.BAD_REQUEST)
    }
    const newUser = plainToClass(UserDto, newCredentials);
    return await this.userRepository.save(newUser.toEntity()).then(user => {
      const payload = {sub: user.id, username: user.username}
      return AuthDto.fromEntity(user, this.jwtService.sign(payload))
    })
  }
}
