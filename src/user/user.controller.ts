import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserGuard } from 'src/auth/jwt.guard';
import { AuthService } from 'src/auth/auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/auth/jwt.constant';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  @ApiBearerAuth()
  @UseGuards(UserGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }
  @Get('jwt')
  findOne() {
    return this.authService.signJwt({ name: 'hewwo', roles: [Role.user], password: 'heewwo', email: 'asdasas', posts: [] });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
