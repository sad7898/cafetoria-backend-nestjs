import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { FilterQuery, Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { CreatePostDto, PostFilterDto, PostQuery, UpdatePostDto } from './dto/post.dto';
import { Post, PostDocument } from './entities/post.entity';
import { FilterBuilder } from './filter';
import { Filter } from './post.interface';
import { faker } from '@faker-js/faker';
import { NotFoundError } from 'rxjs';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>, private userService: UserService) {}
  async create(createPostDto: CreatePostDto, userId: string) {
    const author = await this.userService.findById(userId);
    if (!author) throw new BadRequestException('User not found');
    return await this.postModel.create({ ...createPostDto, author });
  }

  async findAll({ tags, topic, sortKey }: PostFilterDto, page: number) {
    if (sortKey && !['created', 'topic'].includes(sortKey)) throw new BadRequestException('Invalid sort key');
    const filterBuilder = new FilterBuilder<PostDocument>().addMatchAll('tags', tags).addTextSearch(topic);
    const filter = filterBuilder.getFilter();
    const query = this.postModel.find(filter).populate('author', { name: 1, _id: 1 }).select({ topic: 1, author: 1, tags: 1, created: 1 });
    if (filter.$and?.filter((f) => f.$text).length) query.sort({ score: { $meta: 'textScore' } });
    else query.sort({ [sortKey || 'created']: sortKey === 'created' ? -1 : 1 });
    query.skip(page * 10).limit(10);
    return await query;
  }
  async findById(id: string) {
    const post = await this.postModel.findById(id).populate('author', { password: 0 });
    return post;
  }
  async seed() {
    const author = await this.userService.findById('6287658491a854c35dcdc069');
    const tags = ['Meat', 'Veggie', 'Fats', 'Carbohydrates'];
    const randomTags = () =>
      tags.filter(() => {
        const i = Math.round(Math.random());
        return !!i;
      });
    const posts = [];
    for (let i = 0; i < 100; i++) {
      posts.push({
        author,
        topic: faker.commerce.productName(),
        tags: randomTags(),
        text: 'this is just a recipe',
        created: new Date(),
      });
    }
    return await this.postModel.insertMany(posts);
  }

  async update(id: string, authorId: string, updatePostDto: UpdatePostDto) {
    const post = await this.postModel.findById(id).populate('author');
    if (!post) throw new BadRequestException('This post does not exist');
    if (post.author._id.toString() !== authorId) throw new ForbiddenException("You don't have permission to modify this post.");
    return await post.overwrite({ ...updatePostDto, author: post.author, created: new Date() });
  }

  async remove(id: string, authorId: string) {
    const post = await this.postModel.findById(id).populate('author');
    if (!post) throw new BadRequestException('This post does not exist');
    if (post.author._id.toString() !== authorId) throw new ForbiddenException("You don't have permission to modify this post.");
    return await post.deleteOne({ _id: id });
  }
}
