import { Test, TestingModule } from '@nestjs/testing';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { Group } from './models/group.model';
import { group } from './fixtures/group.fixture';
import { UpdateGroupDto } from './dto/update-group.dto';
import { async } from 'rxjs';

jest.mock('./groups.service');

describe('GroupsController', () => {
  let controller: GroupsController;
  let service: GroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupsController],
      providers: [GroupsService],
    }).compile();

    controller = module.get<GroupsController>(GroupsController);
    service = module.get<GroupsService>(GroupsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('createGroup', async () => {
    jest.spyOn(service, 'create').mockImplementation(async () => group);

    const result: Group = await controller.createGroup(group as CreateGroupDto);

    expect(result).toBe(group);
  });

  it('findAllGroups', async () => {
    jest.spyOn(service, 'findAll').mockImplementation(async () => [group]);

    const result: Group[] = await controller.findAllGroups();

    expect(result).toStrictEqual([group]);
  });

  it('findOneGroup', async () => {
    jest.spyOn(service, 'findOne').mockImplementation(async () => group);

    const result: Group = await controller.findOneGroup(group.id);

    expect(result).toBe(group);
  });

  it('updateGroup', async () => {
    jest.spyOn(service, 'update').mockImplementation(async () => group);

    const result: Group = await controller.updateGroup(group.id, group as UpdateGroupDto);

    expect(result).toBe(group);
  });

  it('removeGroup', async () => {
    const countOfDeleted = 1;

    jest.spyOn(service, 'remove').mockImplementation(async () => countOfDeleted);

    const result: number = await controller.removeGroup(group.id);

    expect(result).toBe(countOfDeleted);
  });

  it('addUsersToGroup', async () => {
    jest.spyOn(service, 'addUsersToGroup').mockImplementation(async () => undefined);

    const result = await controller.addUsersToGroup(group.id, [group.id]);

    expect(result).toBe(undefined);
  });
});
