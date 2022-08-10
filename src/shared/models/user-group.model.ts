import { ForeignKey, Model, Table } from 'sequelize-typescript';
import { Group } from 'src/groups/models/group.model';
import { User } from 'src/users/models/user.model';

@Table
export class UserGroup extends Model {
  @ForeignKey(() => User)
  userId: string;

  @ForeignKey(() => Group)
  groupId: string;
}
