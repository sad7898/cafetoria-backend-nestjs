import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put, Req, NotFoundException, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, SignInDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserGuard } from 'src/auth/jwt.guard';
import { AuthService } from 'src/auth/auth.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/auth/jwt.constant';
import { plainToInstance } from 'class-transformer';
import { Profile } from './dto/get-user.dto';
import { User } from './entities/user.entity';

@ApiTags('user')
@Controller('user')
@UsePipes(new ValidationPipe({ whitelist: true }))
export class UserController {
  constructor(private readonly userService: UserService) {}
  @ApiBearerAuth()
  @UseGuards(UserGuard)
  @Get()
  async getProfile(@Req() req) {
    const user = await this.userService.findById(req.user.id);
    if (!user) throw new NotFoundException('User does not exist');
    return plainToInstance<Profile, User>(Profile, user, { excludeExtraneousValues: true });
  }
  @Get(':username')
  async findOne(@Param('username') username: string) {
    const user = await this.userService.findOne(username);
    if (!user) throw new NotFoundException('User does not exist');
    return plainToInstance<Profile, User>(Profile, user, { excludeExtraneousValues: true });
  }
  @Post('signup')
  @ApiBody({ type: CreateUserDto })
  async register(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.userService.create(createUserDto);
    return plainToInstance<Profile, User>(Profile, newUser, { excludeExtraneousValues: true });
  }
  @Post('login')
  @ApiBody({ type: SignInDto })
  async login(@Body() signInDto: SignInDto) {
    const credentials = await this.userService.login(signInDto);
    return { ...credentials, user: plainToInstance<Profile, User>(Profile, credentials.user, { excludeExtraneousValues: true }) };
  }
  @ApiBearerAuth()
  @UseGuards(UserGuard)
  @ApiBody({ type: UpdateUserDto })
  @Put()
  async update(@Body() updateUserDto: UpdateUserDto, @Req() req) {
    const updatedUser = await this.userService.update(updateUserDto, req.user.id);
    return plainToInstance<Profile, User>(Profile, updatedUser, { excludeExtraneousValues: true });
  }
}
