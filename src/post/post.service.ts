import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';
import { Post, PostDocument } from './entities/post.entity';
import { Filter } from './post.interface';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>, private userService: UserService) {}
  async create(createPostDto: CreatePostDto, userId: string) {
    const author = await this.userService.findById(userId);
    if (!author) throw new BadRequestException('User not found');
    return await this.postModel.create({ ...createPostDto, author });
  }

  async findAll({ tags, topic }: Filter, skip: number, limit = 10) {
    return 'yes';
  }
  async findById(id: number) {
    const post = await this.postModel.findById(id).populate({ path: 'author' });
    return post;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
