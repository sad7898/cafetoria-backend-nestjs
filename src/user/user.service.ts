import { BadRequestException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto, SignInDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { Profile } from './dto/get-user.dto';
import { Role } from 'src/auth/jwt.constant';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private authService: AuthService) {}
  async create(dto: CreateUserDto): Promise<User> {
    const existingUser = await this.userModel.findOne({ $or: [{ name: dto.username }, { email: dto.email }] });
    if (existingUser) {
      if (existingUser.email === dto.email) throw new BadRequestException('This email is already taken');
      else throw new BadRequestException('This username is already taken');
    }
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT));
    const passwordHash = await bcrypt.hash(dto.password, salt);
    return await this.userModel.create({ name: dto.username, email: dto.email, password: passwordHash, roles: [Role.user] });
  }
  async login(dto: SignInDto) {
    const existingUser = await this.userModel.findOne({ $and: [{ $or: [{ name: dto.userId }, { email: dto.userId }] }] });
    if (existingUser && (await bcrypt.compare(dto.password, existingUser.password))) {
      return { token: this.authService.signJwt(existingUser, existingUser._id.toString()), user: existingUser };
    }
    throw new UnauthorizedException('User ID or password is incorrect');
  }

  async findOne(username: string) {
    const user = await this.userModel.findOne({ name: username });
    return user;
  }
  async findById(id: string) {
    const user = await this.userModel.findById(id, { password: 0 });
    return user;
  }
  async update(dto: UpdateUserDto, id: string) {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException('User does not exist');
    const existingUser = await this.userModel.findOne({ $or: [{ name: dto.username }, { email: dto.email }] });
    if (existingUser) {
      if (existingUser.email === dto.email) throw new BadRequestException('This email is already taken');
      else throw new BadRequestException('This username is already taken');
    }
    const updatedUser = await user.overwrite({ ...dto, name: dto.username, password: user.password, posts: user.posts });
    return updatedUser;
  }
}
