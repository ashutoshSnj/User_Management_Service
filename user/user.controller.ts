import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
  
  @Get('username/:username')
  findByUsername(@Param('username') username: string) {
    return this.userService.findByUsername(username);
  }

  @Get('email/:email')
  findByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Get('role/:role')
  findByRole(@Param('role') role: string) {
    return this.userService.findByRole(role);
  }

  @Get('search')
  findByEmailOrUsername(@Query('q') search: string) {
    return this.userService.findByEmailOrUsername(search);
  }

  @Get('native/email/:email')
  getUserByEmailNative(@Param('email') email: string) {
    return this.userService.getUserByEmailNative(email);
  }

  @Get('native/role/:role')
  getUsersWithRoleNative(@Param('role') role: string) {
    return this.userService.getUsersWithRoleNative(role);
  }
}


