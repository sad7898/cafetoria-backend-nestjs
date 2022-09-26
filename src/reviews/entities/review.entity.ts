import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { Document } from 'mongoose';
import { PostDocument } from 'src/post/entities/post.entity';
import { User, UserDocument } from 'src/user/entities/user.entity';

export type ReviewDocument = Review & Document;

@Schema()
export class Review {
  @ApiProperty({ type: String })
  @Prop({ required: true })
  text: string;
  @ApiProperty({ type: String })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  author: UserDocument;
  @ApiProperty({type: String})
  @Prop({type: mongoose.Schema.Types.ObjectId,ref:"Post",required:true})
  postId: PostDocument
  @ApiProperty({ type: Date })
  @Prop({ required: true, default: new Date() })
  created: Date;
  @ApiProperty({type: Number})
  @Prop({required: true})
  rate: number
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
