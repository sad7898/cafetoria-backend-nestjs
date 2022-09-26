import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
  create(createReviewDto: CreateReviewDto, authorId: string, postId: string) {
    return 'This action adds a new review';
  }

  findAll() {
    return `This action returns all reviews`;
  }

  findOne(id: number) {
    return `This action returns a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
