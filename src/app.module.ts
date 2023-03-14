import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AdminModule } from "./admin/admin.module";
import { AdminAuthModule } from "./admin-auth/admin-auth.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { EditUserModule } from "./editUser/editUser.module";
import { ResetModule } from "./reset/reset.module";
import { QuickViewModule } from "./quick-view/quick-view.module";
import { LikeModule } from "./like/like.module";
import { CollectModule } from "./collect/collect.module";
import { UserPostModule } from "./user-post/user-post.module";

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL),
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    AdminModule,
    AdminAuthModule,
    UserModule,
    AuthModule,
    EditUserModule,
    ResetModule,
    UserPostModule,
  ],
})
export class AppModule {}
