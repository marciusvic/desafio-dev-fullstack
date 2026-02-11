import { Injectable } from '@nestjs/common';
import { Lead } from '@domain/entities/lead.entity';
import { ILeadRepository } from '@domain/repositories/lead.repository';
import { NotFoundException } from '@shared/errors/not-found.exception';

@Injectable()
export class GetLeadByIdUseCase {
  constructor(private readonly leadRepository: ILeadRepository) {}

  async execute(id: string): Promise<Lead> {
    const lead = await this.leadRepository.findById(id);

    if (!lead) {
      throw new NotFoundException('Lead não encontrado');
    }

    return lead;
  }
}
