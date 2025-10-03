import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { promises } from 'dns';
import { UserProfile } from 'src/user-profile/entities/user-profile.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userrepo:Repository<User>,
  @InjectRepository(UserProfile) private profilrepo:Repository<UserProfile>){}

  create(obj: CreateUserDto):Promise<User> {
    const user=this.userrepo.create(obj);
    return this.userrepo.save(user);
  }

  async findAll(): Promise<User[]> {
  return this.userrepo.find({relations:["profile"]});
}

async findById(id: number): Promise<User> {
 const user = await this.userrepo.findOne({ where: { id }, relations: ['profile'] });
  if (!user) {
    throw new NotFoundException(`User with id ${id} not found`);
  }
  return user;
}

  async update(id: number, updateUserDto: UpdateUserDto):Promise<User> {
   const user= await this.userrepo.findOne({where:{id}});
   if (!user) {
    throw new NotFoundException(`User with id ${id} not found`);
  }
    Object.assign(user,updateUserDto);
   return this.userrepo.save(user);
  }

 async remove(id: number) {
  this.profilrepo.delete(id);
   await this.userrepo.delete(id)
    return "User Deleted";
  }
  
  
  async findByUsername(username: string): Promise<User|null> {
    return this.userrepo.findOne({where:{username}
      ,relations:['profile'] });
  }

 
  async findByEmail(email: string):Promise<User|null> {
    return this.userrepo.findOne
    ({where:{email},relations:['profile']});
  }


  async findByRole(role: string):Promise<User[]> {
    return this.userrepo.find({where:{role},
      relations:['profile'] });
  }

  
  async findByEmailOrUsername(search:string):Promise<User[]> {
    return this.userrepo.find({
      where:[{email:search }, {username:search }],
      relations:['profile'],
    });
  }
  async getUserByEmailNative(email:string):Promise<User[]> {
    return this.userrepo.query
    ('SELECT * FROM user WHERE email = ?',[email]);
  }

  async getUsersWithRoleNative(role: string):Promise<User[]> {
    return this.userrepo.query('SELECT * FROM user WHERE role = ?',[role]);
  }

}
