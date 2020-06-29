import {Body, Controller, Get, Post, Request, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import {JwtAuthGuard} from "./jwt-auth.guard";
import {AuthDto} from "./auth.dto";
import {UserDto} from "../user/user.dto";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }

  @Post('register')
  public async register(@Body() newCredentials: UserDto): Promise<UserDto> {
    // const newUserDto = UserDto.from(newCredentials)
    return this.authService.register(newCredentials);
  }
}
