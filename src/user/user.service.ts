import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { GlobalStatus } from 'shared/enum/global-status.enum';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoleUser } from './enum/role-user.enum';
import { StatusUser } from './enum/status-user.enum';
import { ResponseUser } from './interface/response.interface';
import { checkPassword, hashPassword } from 'utils/bcrypt';
import { LoginUser } from './dto/login-user.dto';
import { TokenPayload } from 'shared/interface/token-payload.interface';
import { createToken } from 'utils/jwt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async register(registerUser: Prisma.UserCreateInput): Promise<ResponseUser> {
    const { password } = registerUser;
    const hashingPassword = await hashPassword(password);
    const data = await this.prisma.user.create({
      data: {
        ...registerUser,
        password: hashingPassword,
        role: RoleUser.SISWA,
        status: StatusUser.UNCOMPLETE,
      },
    });
    const res: ResponseUser = {
      status: GlobalStatus.SUCCESS,
      message: `Success create user`,
      data,
    };
    return res;
  }

  async login(loginUser: LoginUser) {
    const { email, password } = loginUser;
    const found = await this.prisma.user.findUnique({
      where: { email: email },
    });
    if (!found) throw new UnauthorizedException('Email/Password anda salah');
    const isMatch = await checkPassword(password, found.password);
    if (!isMatch) throw new UnauthorizedException('Email/Password anda salah');
    const tokenPayload: TokenPayload = {
      id: found.id,
      email: found.email,
      role: found.role,
      status: found.status,
    };
    const token = createToken(tokenPayload);
    return {
      status: GlobalStatus.SUCCESS,
      message: 'Berhasil Login',
      content: { token },
    };
  }
}
