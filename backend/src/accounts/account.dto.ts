import {
  MaxLength,
  IsNotEmpty,
  IsString,
  IsMongoId,
  IsBoolean,
  IsNumber,
} from 'class-validator';

export class AccountDto {
  @IsString()
  @IsMongoId()
  readonly _id: string;

  @IsString({ message: 'name must be a string' })
  @MaxLength(30)
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  readonly iban: string;

  @IsString()
  readonly bic: string;

  @IsString()
  readonly bank: string;

  @IsBoolean()
  readonly is_favorite: boolean;

  @IsNumber()
  balance: number;

  @IsNumber()
  timetable: number;

  @IsString()
  quality: string;

  @IsString()
  @IsMongoId()
  user_id: string;
}
