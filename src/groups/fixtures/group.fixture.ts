import { Group } from '../models/group.model';
import { Permission } from '../data-access/permission.enum';

export const group: Group = {
  id: 'ff238a73-50ff-47a1-8789-6253a715bdc9',
  name: 'My Group 3',
  permissions: [Permission.WRITE, Permission.READ],
} as Group;
