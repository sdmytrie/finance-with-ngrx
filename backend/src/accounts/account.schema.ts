import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from 'src/users/user.schema';
import * as mongoose from 'mongoose';

export type AccountDocument = Account & Document;

@Schema()
export class Account {
  @Prop({ required: true })
  name: string;

  @Prop()
  iban: string;

  @Prop()
  bic: string;

  @Prop()
  bank: string;

  @Prop()
  is_favorite: boolean;

  @Prop()
  balance: number;

  @Prop()
  timetable: number;

  @Prop()
  quality: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user_id: User;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
