import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({
  collection: 'users',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class User {
  @Prop({ type: String, required: true, unique: true })
  id: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  encrypted_password: string;

  @Prop({ type: Date })
  email_confirmed_at?: Date;

  created_at?: Date;
  updated_at?: Date;
}


export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);