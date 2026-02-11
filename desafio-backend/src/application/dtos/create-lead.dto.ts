import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsArray,
  ValidateNested,
  ArrayMinSize,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ConsumoDto {
  @IsNotEmpty({ message: 'Consumo fora ponta é obrigatório' })
  consumoForaPontaEmKWH: number;

  @IsNotEmpty({ message: 'Mês do consumo é obrigatório' })
  mesDoConsumo: Date;
}

export class InformacaoDaFaturaDto {
  @IsNotEmpty({ message: 'Código da unidade consumidora é obrigatório' })
  @IsString()
  codigoDaUnidadeConsumidora: string;

  @IsNotEmpty({ message: 'Modelo fásico é obrigatório' })
  @IsString()
  modeloFasico: string;

  @IsNotEmpty({ message: 'Enquadramento é obrigatório' })
  @IsString()
  enquadramento: string;

  @IsArray({ message: 'Histórico de consumo deve ser um array' })
  @ArrayMinSize(12, { message: 'Histórico de consumo deve conter exatamente 12 meses' })
  @ValidateNested({ each: true })
  @Type(() => ConsumoDto)
  historicoDeConsumoEmKWH: ConsumoDto[];
}

export class CreateLeadDto {
  @IsNotEmpty({ message: 'Nome completo é obrigatório' })
  @IsString()
  @MinLength(3, { message: 'Nome completo deve ter pelo menos 3 caracteres' })
  nomeCompleto: string;

  @IsNotEmpty({ message: 'Email é obrigatório' })
  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @IsNotEmpty({ message: 'Telefone é obrigatório' })
  @IsString()
  telefone: string;

  @IsArray({ message: 'Informações da fatura deve ser um array' })
  @ArrayMinSize(1, { message: 'Deve haver pelo menos uma fatura' })
  @ValidateNested({ each: true })
  @Type(() => InformacaoDaFaturaDto)
  informacoesDaFatura: InformacaoDaFaturaDto[];
}
