import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Role } from 'src/auth/jwt.constant';
import { Post } from 'src/post/entities/post.entity';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  email: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }], required: false, default: [] })
  createdPosts: Post[];
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }], required: false, default: [] })
  likedPosts: Post[];

  @Prop({ required: true })
  roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
