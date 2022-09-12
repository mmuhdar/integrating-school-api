import { Body, Controller, Post } from '@nestjs/common';
import { LoginUser } from './dto/login-user.dto';
import { RegisterUser } from './dto/register-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/register')
  async register(@Body() registerUser: RegisterUser) {
    return this.userService.register(registerUser);
  }

  @Post('/login')
  async login(@Body() loginUser: LoginUser) {
    return this.userService.login(loginUser);
  }
}
