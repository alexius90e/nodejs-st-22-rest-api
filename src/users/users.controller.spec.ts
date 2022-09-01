import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { user } from './fixtures/user.fixture';
import { User } from './models/user.model';
import { UserDto } from './dto/user.dto';

jest.mock('./users.service');

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getAutoSuggestUsers', async () => {
    jest.spyOn(service, 'getAllUsers').mockImplementation(async () => [user]);
    const result: User[] = await controller.getAutoSuggestUsers({
      loginSubstring: user.login,
      limit: 1,
    });

    expect(result).toStrictEqual([user]);
  });

  it('getUserById', async () => {
    jest.spyOn(service, 'getUserById').mockImplementation(async () => user);
    const result: User = await controller.getUserById(user.id);

    expect(result).toBe(user);
  });

  it('createUser', async () => {
    jest.spyOn(service, 'createUser').mockImplementation(async () => user);
    const result: User = await controller.createUser(user as UserDto);

    expect(result).toBe(user);
  });

  it('updateUser', async () => {
    jest.spyOn(service, 'updateUser').mockImplementation(async () => user);
    const result: User = await controller.updateUser(user.id, user as UserDto);

    expect(result).toBe(user);
  });

  it('deleteUser', async () => {
    const countOfDeleted = 1;
    jest.spyOn(service, 'deleteUser').mockImplementation(async () => countOfDeleted);
    const result: number = await controller.deleteUser(user.id);

    expect(result).toBe(countOfDeleted);
  });
});
