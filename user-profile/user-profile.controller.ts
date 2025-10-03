import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';

@Controller('user-profile')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}
  @Post()
  create(@Body() createUserProfileDto: CreateUserProfileDto) {
    return this.userProfileService.create(createUserProfileDto);
  }

  @Get()
  findAll() {
    return this.userProfileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userProfileService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserProfileDto: UpdateUserProfileDto) {
    return this.userProfileService.update(+id, updateUserProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userProfileService.remove(+id);
  }
    @Get('firstName/:firstName')
  findByFirstName(@Param('firstName') firstName: string) {
    return this.userProfileService.findByFirstName(firstName);
  }

  @Get('lastName/:lastName')
  findByLastName(@Param('lastName') lastName: string) {
    return this.userProfileService.findByLastName(lastName);
  }

  @Get('age/:age')
  findByAge(@Param('age') age: number) {
    return this.userProfileService.findByAge(age);
  }

  @Get('native/firstName/:firstName')
  getProfilesByFirstNameNative(@Param('firstName') firstName: string) {
    return this.userProfileService.
    getProfilesByFirstNameNative(firstName);
  }

  @Get('native/age/:age')
  getProfilesByAgeNative(@Param('age') age: number) {
    return this.userProfileService.getProfilesByAgeNative(age);
  
}
}
