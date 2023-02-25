import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Res,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guards";
import { Request, Response } from "express";
import { User } from "./schemas/user.schema";

import { HttpStatus } from "@nestjs/common/enums";
import { JwtService } from "@nestjs/jwt";
import { ConfirmEmailDto } from "./dto/confirmEmail.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return null;
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.userService.remove(+id);
  }

  // @UseGuards(JwtAuthGuard)
  // @Get("me")
  // async me(@Req() req: Request, @Res() res: Response) {
  //   const userEmail = req.user["email"];
  //   const loginUser = await this.userService.findByEmail(userEmail);
  //   return res.status(HttpStatus.OK).json({
  //     message: "success",
  //     data: {
  //       firstName: loginUser.firstName,
  //       lastName: loginUser.lastName,
  //     },
  //   });
  // }

  // send email
  @Post("/create")
  async addUser(
    @Res() res,
    @Body() createUserDTO: CreateUserDto
  ): Promise<User> {
    if (await this.userService.doesUserExists(createUserDTO)) {
      return res.status(HttpStatus.CONFLICT).json({
        message: "User already exists",
      });
    }
    await this.userService.sendVerificationLink(
      createUserDTO.email,
      createUserDTO.firstName,
      createUserDTO.lastName,
      createUserDTO.password
    );
    return res.status(HttpStatus.OK).json({
      message: "Email has been sent, kindly activate your account ",
    });
  }

  //create user
  @Post("/signup")
  async register(
    @Res() res,
    @Body() ConfirmEmailDto: ConfirmEmailDto
  ): Promise<User> {
    await this.userService.decodeConfirmationToken(ConfirmEmailDto.token);

    return res.status(HttpStatus.CREATED).json({
      message: "Confirmed ",
    });
  }
}
