import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/user/entities/user.entity';

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @Prop({ required: true })
  topic: string;

  @Prop({ required: true })
  text: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  author: User;

  @Prop({ required: true, default: new Date() })
  created: Date;

  @Prop()
  tags: string[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
