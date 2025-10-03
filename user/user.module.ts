import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserProfile } from 'src/user-profile/entities/user-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User,UserProfile])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
