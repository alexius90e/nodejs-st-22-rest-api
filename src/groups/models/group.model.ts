import { BelongsToMany, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { UserGroup } from 'src/shared/models/user-group.model';
import { User } from 'src/users/models/user.model';
import { Permission } from '../data-access/permission.enum';

@Table
export class Group extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUIDV4,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({ unique: true })
  name: string;

  @Column(DataType.ARRAY(DataType.ENUM(...Object.keys(Permission))))
  permissions: Permission[];

  @BelongsToMany(() => User, () => UserGroup)
  users: User[];
}
