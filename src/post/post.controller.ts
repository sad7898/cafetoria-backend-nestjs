import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  Query,
  UsePipes,
  ValidationPipe,
  HttpCode,
  Put,
  Headers,
} from '@nestjs/common';
import { PostService } from './post.service';
import { BulkPostResponse, CreatePostDto, IsLikedResponse, PostFilterDto, PostQuery, PostResponse, UpdatePostDto } from './dto/post.dto';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserGuard } from 'src/auth/jwt.guard';
import { UserService } from 'src/user/user.service';
@ApiTags('post')
@Controller('post')
@UsePipes(new ValidationPipe({ whitelist: true }))
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Post(':page')
  @ApiBody({ type: PostFilterDto })
  @HttpCode(200)
  @ApiResponse({ type: BulkPostResponse })
  async getAll(@Param('page') page: number, @Body() body: PostFilterDto): Promise<BulkPostResponse> {
    const posts = await this.postService.findAll(body, page);
    return posts;
  }

  @ApiBearerAuth()
  @UseGuards(UserGuard)
  @ApiBody({ type: CreatePostDto })
  @ApiResponse({ type: PostResponse })
  @Post()
  async create(@Body() createPostDto: CreatePostDto, @Req() req): Promise<PostResponse> {
    return await this.postService.create(createPostDto, req.user.id);
  }
  //TODO: remove before prod
  // @Get('seed')
  // async seed() {
  //   return await this.postService.seed();
  // }
  @Get(':id')
  async getById(@Param('id') id: string): Promise<PostResponse> {
    return await this.postService.findById(id);
  }
  @Get('/like/:id')
  @ApiBearerAuth()
  @ApiResponse({ type: IsLikedResponse })
  @UseGuards(UserGuard)
  async isPostLiked(@Param('id') id: string, @Req() req) {
    return this.postService.isPostLiked(id, req.user.id);
  }
  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(UserGuard)
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto, @Req() req) {
    return this.postService.update(id, req.user.id, updatePostDto);
  }
  @Put('/like/:id')
  @ApiBearerAuth()
  @UseGuards(UserGuard)
  like(@Param('id') id: string, @Req() req) {
    return this.postService.updateLikeCount(id, req.user.id);
  }
  @Delete(':id')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: string, @Req() req) {
    return this.postService.remove(id, req.user.id);
  }
}
