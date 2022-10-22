import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './entities/post.entity';
import { UserModule } from 'src/user/user.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    UserModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 30,
    }),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
