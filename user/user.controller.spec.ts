import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('user controller',()=>{
 let controller:UserController, service:UserService;
 const mockService={
  create:jest.fn().mockResolvedValue({}),
  findAll:jest.fn().mockResolvedValue([]),
  findById:jest.fn().mockResolvedValue({}),
  update:jest.fn().mockResolvedValue({}),
  remove:jest.fn().mockResolvedValue('User Deleted')
 };

 beforeEach(async()=>{
  const module:TestingModule=await Test.createTestingModule({
   controllers:[UserController],
   providers:[{provide:UserService,useValue:mockService}]
  }).compile();

  controller=module.get(UserController);
  service=module.get(UserService);
 });

 it('controller should be defined',()=>{expect(controller).toBeDefined()});

 it('create user call',async()=>{
  const dto={name:'test'};
  await controller.create(dto as any);
  expect(service.create).toHaveBeenCalledWith(dto)
 });

 it('find all users',async()=>{
  await controller.findAll();
  expect(service.findAll).toHaveBeenCalled()
 });

 it('find user by id',async()=>{
  const id='1';
  await controller.findOne(id);
  expect(service.findById).toHaveBeenCalledWith(1)
 });

 it('update user call',async()=>{
  const id='1',dto={name:'updated'};
  await controller.update(id,dto as any);
  expect(service.update).toHaveBeenCalledWith(1,dto)
 });

 it('remove user call',async()=>{
  const id='1';
  await controller.remove(id);
  expect(service.remove).toHaveBeenCalledWith(1)
 });
});
