import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../user/schemas/user.schema";
import { Posts, PostSchema } from "./schema/post.schema";
import { UserPost } from "./user-post.controller";
import { UserPostService } from "./user-post.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Posts.name, schema: PostSchema }]),

    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserPostService],
  controllers: [UserPost],
})
export class UserPostModule {}
