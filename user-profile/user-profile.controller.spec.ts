import { Test, TestingModule } from '@nestjs/testing';
import { UserProfileController } from './user-profile.controller';
import { UserProfileService } from './user-profile.service';

describe('userprofile controller',()=>{
 let controller:UserProfileController,
  service:UserProfileService;


  
 const mockService={
  create:jest.fn(),
  findAll:jest.fn(),
  findOne:jest.fn(),
  update:jest.fn(),
  remove:jest.fn()
 };

 beforeEach(async()=>{
  const module:TestingModule=await Test.createTestingModule({
   controllers:[UserProfileController],
   providers:[{provide:UserProfileService,useValue:mockService}]
  }).compile();

  controller=module.get(UserProfileController);
  service=module.get(UserProfileService);
 });

 it('controller should be defined',()=>{expect(controller).toBeDefined()});

 it('create userprofile call',async()=>{
  const dto={msg:'add data'};
  await controller.create(dto as any);
  expect(service.create).toHaveBeenCalledWith(dto)
 });

 it('find all userprofiles',async()=>{
  await controller.findAll();
  expect(service.findAll).toHaveBeenCalled()
 });

 it('find userprofile by id',async()=>{
  const id='1';
  await controller.findOne(id);
  expect(service.findOne).toHaveBeenCalledWith(1)
 });

 it('update userprofile call',async()=>{
  const id='1',dto={bio:'Updated Bio'};
  await controller.update(id,dto as any);
  expect(service.update).toHaveBeenCalledWith(1,dto)
 });

 it('remove userprofile call',async()=>{
  const id='1';
  await controller.remove(id);
  expect(service.remove).toHaveBeenCalledWith(1)
 });
});
