import { Injectable } from '@nestjs/common';
import { Lead } from '@domain/entities/lead.entity';
import { ILeadRepository, LeadFilters } from '@domain/repositories/lead.repository';

@Injectable()
export class ListLeadsUseCase {
  constructor(private readonly leadRepository: ILeadRepository) {}

  async execute(filters?: LeadFilters): Promise<Lead[]> {
    return await this.leadRepository.findAll(filters);
  }
}
