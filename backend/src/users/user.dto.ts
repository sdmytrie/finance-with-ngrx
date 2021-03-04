import {
  Length,
  MaxLength,
  IsNotEmpty,
  IsEmail,
  IsString,
  IsMongoId,
} from 'class-validator';

export class UserDto {
  @IsString()
  @IsMongoId()
  readonly _id: string;

  @IsString({ message: 'username must be a string' })
  @MaxLength(30)
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @Length(8, 30)
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  @MaxLength(30)
  readonly first_name: string;

  @IsString()
  @MaxLength(30)
  readonly last_name: string;
}
