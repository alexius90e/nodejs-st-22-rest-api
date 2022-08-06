import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Permission } from '../entities/permission.entity';

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsArray()
  public permissions: Permission[];
}
