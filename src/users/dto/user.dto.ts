import { IsBoolean, IsInt, IsNotEmpty, IsString, Matches, Max, Min } from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  public login: string;

  @IsString()
  @Matches(/([0-9].*[a-zA-Z])|([a-zA-Z].*[0-9])/, {
    message: 'password must contain letters and numbers',
  })
  public password: string;

  @IsInt()
  @Min(4)
  @Max(130)
  public age: number;

  @IsBoolean()
  public isDeleted: boolean;
}
