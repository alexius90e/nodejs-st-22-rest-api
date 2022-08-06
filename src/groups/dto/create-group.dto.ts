import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Permission } from '../data-access/permission.enum';

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsArray()
  public permissions: Permission[];
}
