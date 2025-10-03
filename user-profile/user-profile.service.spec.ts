import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from 'src/user/user.service';
import { UserProfile } from 'src/user-profile/entities/user-profile.entity';
import { User } from 'src/user/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('user service',()=>{
 let service:UserService;
 const userRepo={create:jest.fn(),
  save:jest.fn(),
  find:jest.fn(),
  findOne:jest.fn(),
  delete:jest.fn()};

 const profileRepo={create:jest.fn(),
  save:jest.fn(),
  find:jest.fn(),
  findOne:jest.fn(),
  delete:jest.fn()};

 beforeEach(async()=>{
  const module:TestingModule=await Test.createTestingModule({
   providers:[
    UserService,
    {provide:getRepositoryToken(User),useValue:userRepo},
    {provide:getRepositoryToken(UserProfile),useValue:profileRepo}
   ]
  }).compile();

  service=module.get(UserService);
 });

 it('service def',()=>{expect(service).toBeDefined()});

 it('create user',async()=>{
  const dto={name:'test'};
  userRepo.create.mockReturnValue(dto);
  userRepo.save.mockResolvedValue({id:1,...dto});
  const r=await service.create(dto as any);
  expect(userRepo.create).toHaveBeenCalledWith(dto);
  expect(userRepo.save).toHaveBeenCalledWith(dto);
  expect(r).toEqual({id:1,...dto});
 });

 it('find all users',async()=>{
  userRepo.find.mockResolvedValue([{id:1}]);
  const r=await service.findAll();
  expect(userRepo.find).toHaveBeenCalledWith({relations:['profile']});
  expect(r).toEqual([{id:1}]);
 });

 it('find user by id',async()=>{
  const user={id:1};
  userRepo.findOne.mockResolvedValue(user);
  const r=await service.findById(1);
  expect(userRepo.findOne).toHaveBeenCalledWith({where:{id:1},relations:['profile']});
  expect(r).toEqual(user);
 });

 it('find not found',async()=>{
  userRepo.findOne.mockResolvedValue(undefined);
  await expect(service.findById(1)).rejects.toThrow('User with id 1 not found');
 });

 it('update user',async()=>{
  const user={id:1,name:'old'};
  const dto={name:'new'};
  userRepo.findOne.mockResolvedValue(user);
  userRepo.save.mockResolvedValue({...user,...dto});
  const r=await service.update(1,dto as any);
  expect(r).toEqual({...user,...dto});
 });

 it('remove user',async()=>{
  profileRepo.delete.mockResolvedValue(undefined);
  userRepo.delete.mockResolvedValue(undefined);
  const r=await service.remove(1);
  expect(profileRepo.delete).toHaveBeenCalledWith(1);
  expect(userRepo.delete).toHaveBeenCalledWith(1);
  expect(r).toBe('User Deleted');
 });
});
