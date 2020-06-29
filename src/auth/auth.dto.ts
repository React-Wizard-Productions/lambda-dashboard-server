import { User } from '../entities/user.entity';
import {IsNotEmpty} from "class-validator";

export class AuthDto implements Readonly<AuthDto> {
  id: string;
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  confirmPassword: string
  @IsNotEmpty()
  firstName: string;
  @IsNotEmpty()
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
  message: string;
  token: string;
  name: string

  public static from(dto: Partial<AuthDto>) {
    const newEvent = new AuthDto();
    newEvent.message = dto.message;
    newEvent.token = dto.token;
    newEvent.name = dto.name
    return newEvent;
  }

  public static fromEntity(user: User, token: string) {
    return this.from({
      message: `Welcome to dashboard ${user.username}!`,
      token,
      name: `${user.firstName} ${user.lastName}`
    })
  }

  public toEntity() {
    const user = new User();
    user.id = this.id;
    user.username = this.username;
    user.password = this.password
    user.hashPassword()
    user.firstName = this.firstName
    user.lastName = this.lastName
    user.createdAt = this.createdAt
    user.updatedAt = new Date()
    return user
  }
}
