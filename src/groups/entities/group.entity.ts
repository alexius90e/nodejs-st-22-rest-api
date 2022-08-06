import {
  Column,
  IsArray,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Permission } from './permission.entity';

@Table
export class Group extends Model {
  @PrimaryKey
  @Column
  id: string;

  @Column({ unique: true })
  name: string;

  permissions: Permission[];
}
