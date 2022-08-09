import { Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Permission } from '../data-access/permission.enum';

@Table
export class Group extends Model {
  @PrimaryKey
  @Column
  id: string;

  @Column({ unique: true })
  name: string;

  @Column(DataType.ARRAY(DataType.ENUM(...Object.keys(Permission))))
  permissions: Permission[];
}
