import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProfile } from './entities/user-profile.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { promises } from 'dns';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectRepository(UserProfile) private profileRepo: Repository<UserProfile>,
    @InjectRepository(User) private userRepo: Repository<User>
  ) {}

 async create(obj: CreateUserProfileDto):Promise<UserProfile> {
    const user=await this.userRepo.findOneBy({id:obj.userId});
    if(!user) throw new NotFoundException("User Not Found");
    const profile =this.profileRepo.create({...obj,user})
    return this.profileRepo.save(profile);
  }

   async findAll(): Promise<UserProfile[]> {
    return this.profileRepo.find({relations:['user']});
  }

  
 async findOne(id: number): Promise<UserProfile> {
    const profile = await this.profileRepo.findOne({where:{id},relations:['user'] });
    if (!profile) {
      throw new NotFoundException(`Profile with id ${id} not found`);
    }
    return profile;
  }

  async update(id: number, dto: UpdateUserProfileDto): Promise<UserProfile> {
    const profile = await this.profileRepo.findOne({where:{id},relations:['user']});
    if (!profile) {
      throw new NotFoundException(`Profile with id ${id} not found`);
    }
    Object.assign(profile, dto);
    return this.profileRepo.save(profile);
  }

  remove(id: number) {
    return this.profileRepo.delete(id);
  }
    async findByFirstName(firstName:string):Promise<UserProfile[]> {
    return this.profileRepo.find({where:{firstName},relations:['user']});
  }

  async findByLastName(lastName: string):Promise<UserProfile[]> {
    return this.profileRepo.find({where:{lastName},relations:['user']});
  }

  async findByAge(age: number): Promise<UserProfile[]> {
    return this.profileRepo.find({where:{age},relations:['user']});
  }


  async getProfilesByFirstNameNative(firstName: string):Promise<UserProfile[]> {
    return this.profileRepo.query('SELECT * FROM user_profile WHERE firstName = ?', [firstName]);
  }

  async getProfilesByAgeNative(age: number):Promise<UserProfile[]> {
    return this.profileRepo.query('SELECT * FROM user_profile WHERE age = ?', [age]);
  }
}
