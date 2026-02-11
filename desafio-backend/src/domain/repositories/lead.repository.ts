import { Lead } from '../entities/lead.entity';

export interface LeadFilters {
  nomeCompleto?: string;
  email?: string;
  codigoDaUnidadeConsumidora?: string;
}

export interface ILeadRepository {
  create(lead: Lead): Promise<void>;
  findById(id: string): Promise<Lead | null>;
  findByEmail(email: string): Promise<Lead | null>;
  findAll(filters?: LeadFilters): Promise<Lead[]>;
  existsByEmail(email: string): Promise<boolean>;
  existsByCodigoUnidade(codigo: string): Promise<boolean>;
}
