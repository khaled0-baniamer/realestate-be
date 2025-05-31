import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/create-auth.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(data: LoginDto) {
    const { email, password } = data;
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException(`User with Email ${email} not found`);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    const payload = { userId: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signup(data: CreateUserDto) {
    const { email, password } = data;
    const user = await this.usersService.findOneByEmail(email);

    if (user) {
      throw new BadRequestException(`Email ${email} already exists`);
    }

    const hashedPassword = await bcrypt.hash(password, 10); 
    const newUser = await this.usersService.create({
      ...data,
      password: hashedPassword,
    });

    const payload = { userId: newUser.id };
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      user: newUser,
      access_token: accessToken,
    };
  }
}
