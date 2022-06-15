import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { Document } from 'mongoose';
import { User, UserDocument } from 'src/user/entities/user.entity';

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @ApiProperty({ type: String })
  @Prop({ required: true })
  topic: string;
  @ApiProperty({ type: String })
  @Prop({ required: true })
  text: string;
  @ApiProperty({ type: String })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  author: UserDocument;
  @ApiProperty({ type: Date })
  @Prop({ required: true, default: new Date() })
  created: Date;
  @ApiProperty({ type: [String] })
  @Prop()
  tags: string[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
