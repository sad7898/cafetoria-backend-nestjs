import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put, Req, NotFoundException, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, SignInDto, SignInResponse, SignUpResponse } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserGuard } from 'src/auth/jwt.guard';
import { AuthService } from 'src/auth/auth.service';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/auth/jwt.constant';
import { plainToInstance } from 'class-transformer';
import { Profile } from './dto/get-user.dto';
import { User } from './entities/user.entity';
import { PostResponse } from 'src/post/dto/post.dto';

@ApiTags('user')
@Controller('user')
@UsePipes(new ValidationPipe({ whitelist: true }))
export class UserController {
  constructor(private readonly userService: UserService) {}
  @ApiBearerAuth()
  @UseGuards(UserGuard)
  @ApiResponse({ type: Profile })
  @Get()
  async getProfile(@Req() req): Promise<Profile> {
    const user = await this.userService.findById(req.user.id);
    if (!user) throw new NotFoundException('User does not exist');
    return plainToInstance<Profile, User>(Profile, user, { excludeExtraneousValues: true });
  }
  @ApiBearerAuth()
  @UseGuards(UserGuard)
  @ApiResponse({ type: [PostResponse] })
  @Get('likedPosts')
  async getLikedPosts(@Req() req) {
    return this.userService.getLikedPosts(req.user.id);
  }
  @ApiBearerAuth()
  @UseGuards(UserGuard)
  @ApiResponse({ type: [PostResponse] })
  @Get('createdPosts')
  async getCreatedPosts(@Req() req) {
    return this.userService.getCreatedPosts(req.user.id);
  }
  @Get(':username')
  @ApiResponse({ type: Profile })
  async findOne(@Param('username') username: string): Promise<Profile> {
    const user = await this.userService.findOne(username);
    if (!user) throw new NotFoundException('User does not exist');
    return plainToInstance<Profile, User>(Profile, user, { excludeExtraneousValues: true });
  }
  @Post('signup')
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ type: SignUpResponse })
  async register(@Body() createUserDto: CreateUserDto): Promise<SignUpResponse> {
    const newUser = await this.userService.create(createUserDto);
    return { success: !!newUser };
  }
  @Post('login')
  @ApiBody({ type: SignInDto })
  @ApiResponse({ type: SignInResponse })
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
