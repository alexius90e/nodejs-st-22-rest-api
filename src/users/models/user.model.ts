import { BelongsToMany, Column, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Group } from 'src/groups/models/group.model';
import { UserGroup } from 'src/shared/models/user-group.model';

@Table
export class User extends Model {
  @PrimaryKey
  @Column
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
  groups: Group[]
}
