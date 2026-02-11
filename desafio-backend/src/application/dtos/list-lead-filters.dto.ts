import { IsOptional, IsString } from 'class-validator';

export class ListLeadFiltersDto {
  @IsOptional()
  @IsString()
  nomeCompleto?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  codigoDaUnidadeConsumidora?: string;
}
