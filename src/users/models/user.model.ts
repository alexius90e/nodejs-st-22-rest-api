import { BelongsToMany, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Group } from 'src/groups/models/group.model';
import { UserGroup } from 'src/shared/models/user-group.model';

@Table
export class User extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUIDV4,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({ unique: true })
  login: string;

  @Column
  password: string;

  @Column
  age: number;

  @Column
  isDeleted: boolean;

  @BelongsToMany(() => Group, () => UserGroup)
  groups: Group[];
}
