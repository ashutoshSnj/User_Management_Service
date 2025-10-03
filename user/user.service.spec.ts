import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserProfile } from 'src/user-profile/entities/user-profile.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('user service',()=>{
 let service:UserService, 
 userRepo:Repository<User>,
  profileRepo:Repository<UserProfile>;

 beforeEach(async()=>{
  const module:TestingModule=await Test.createTestingModule({
   providers:[
    UserService,
    {provide:getRepositoryToken(User), useClass:Repository},
    {provide:getRepositoryToken(UserProfile), useClass:Repository}
   ]
  }).compile();

  service=module.get(UserService);
  userRepo=module.get(getRepositoryToken(User));
  profileRepo=module.get(getRepositoryToken(UserProfile));
 });

 it('def',()=>{
  expect(service).toBeDefined()
});

 it('create',async()=>
  {const r=await service.create({} as any);
 expect(r).toBeDefined()});

 it('find ',async()=>{jest.spyOn(userRepo,'findOne')
  .mockResolvedValue(undefined as any);
  await expect(service.findById(1)).
  rejects.toThrow(NotFoundException)});


 it('update ',async()=>{
  jest.spyOn(userRepo,'findOne').
  mockResolvedValue(undefined as any);await expect(service.update(1,{} as any))
  .rejects.toThrow(NotFoundException)});

 it('remove',async()=>{jest.spyOn(userRepo,'delete')
  .mockResolvedValue({} as any);jest.spyOn(profileRepo,'delete')
  .mockResolvedValue({} as any);const r=await service.remove(1);
  expect(r).toEqual('User Deleted')});
  
});
