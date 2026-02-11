import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Lead } from '@domain/entities/lead.entity';
import { Unidade, ModeloFasico, Enquadramento } from '@domain/entities/unidade.entity';
import { Email } from '@domain/value-objects/email.vo';
import { Telefone } from '@domain/value-objects/telefone.vo';
import { Consumo } from '@domain/value-objects/consumo.vo';
import { ILeadRepository } from '@domain/repositories/lead.repository';
import { ConflictException } from '@shared/errors/conflict.exception';
import { CreateLeadDto } from '../dtos/create-lead.dto';

@Injectable()
export class CreateLeadUseCase {
  constructor(private readonly leadRepository: ILeadRepository) {}

  async execute(dto: CreateLeadDto): Promise<Lead> {
    // Validar email único
    const emailExists = await this.leadRepository.existsByEmail(dto.email);
    if (emailExists) {
      throw new ConflictException('Email já cadastrado');
    }

    // Validar códigos de unidade únicos
    for (const fatura of dto.informacoesDaFatura) {
      const codigoExists = await this.leadRepository.existsByCodigoUnidade(
        fatura.codigoDaUnidadeConsumidora,
      );
      if (codigoExists) {
        throw new ConflictException(
          `Código da unidade consumidora ${fatura.codigoDaUnidadeConsumidora} já existe`,
        );
      }
    }

    // Criar value objects
    const email = new Email(dto.email);
    const telefone = new Telefone(dto.telefone);

    // Criar unidades
    const unidades = dto.informacoesDaFatura.map((fatura) => {
      const historicoConsumo = fatura.historicoDeConsumoEmKWH.map(
        (consumo) => new Consumo(consumo.consumoForaPontaEmKWH, new Date(consumo.mesDoConsumo)),
      );

      return new Unidade(
        randomUUID(),
        fatura.codigoDaUnidadeConsumidora,
        fatura.modeloFasico as ModeloFasico,
        fatura.enquadramento as Enquadramento,
        historicoConsumo,
      );
    });

    // Criar lead
    const lead = new Lead(randomUUID(), dto.nomeCompleto, email, telefone, unidades);

    // Persistir
    await this.leadRepository.create(lead);

    return lead;
  }
}
