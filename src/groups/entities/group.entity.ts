import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Permission } from '../data-access/permission.enum';

@Table
export class Group extends Model {
  @PrimaryKey
  @Column
  id: string;

  @Column({ unique: true })
  name: string;

  @Column(JSON.stringify(Object.keys(Permission)))
  permissions: Permission[];
}

const a = Object.keys(Permission);
