import { Injectable } from '@nestjs/common';
import { Lead } from '@domain/entities/lead.entity';
import { Unidade, ModeloFasico, Enquadramento } from '@domain/entities/unidade.entity';
import { Email } from '@domain/value-objects/email.vo';
import { Telefone } from '@domain/value-objects/telefone.vo';
import { Consumo } from '@domain/value-objects/consumo.vo';
import { ILeadRepository, LeadFilters } from '@domain/repositories/lead.repository';
import { PrismaService } from './prisma.service';

@Injectable()
export class LeadPrismaRepository implements ILeadRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(lead: Lead): Promise<void> {
    await this.prisma.lead.create({
      data: {
        id: lead.id,
        nomeCompleto: lead.nomeCompleto,
        email: lead.email.getValue(),
        telefone: lead.telefone.getValue(),
        unidades: {
          create: lead.unidades.map((unidade) => ({
            id: unidade.id,
            codigoDaUnidadeConsumidora: unidade.codigoDaUnidadeConsumidora,
            modeloFasico: unidade.modeloFasico,
            enquadramento: unidade.enquadramento,
            historicoDeConsumo: {
              create: unidade.historicoDeConsumoEmKWH.map((consumo) => ({
                consumoForaPontaEmKWH: consumo.consumoForaPontaEmKWH,
                mesDoConsumo: consumo.mesDoConsumo,
              })),
            },
          })),
        },
      },
    });
  }

  async findById(id: string): Promise<Lead | null> {
    const leadData = await this.prisma.lead.findUnique({
      where: { id },
      include: {
        unidades: {
          include: {
            historicoDeConsumo: {
              orderBy: {
                mesDoConsumo: 'desc',
              },
            },
          },
        },
      },
    });

    if (!leadData) {
      return null;
    }

    return this.toDomain(leadData);
  }

  async findByEmail(email: string): Promise<Lead | null> {
    const leadData = await this.prisma.lead.findUnique({
      where: { email },
      include: {
        unidades: {
          include: {
            historicoDeConsumo: {
              orderBy: {
                mesDoConsumo: 'desc',
              },
            },
          },
        },
      },
    });

    if (!leadData) {
      return null;
    }

    return this.toDomain(leadData);
  }

  async findAll(filters?: LeadFilters): Promise<Lead[]> {
    const where: any = {};

    if (filters?.nomeCompleto) {
      where.nomeCompleto = {
        contains: filters.nomeCompleto,
      };
    }

    if (filters?.email) {
      where.email = {
        contains: filters.email,
      };
    }

    if (filters?.codigoDaUnidadeConsumidora) {
      where.unidades = {
        some: {
          codigoDaUnidadeConsumidora: {
            contains: filters.codigoDaUnidadeConsumidora,
          },
        },
      };
    }

    const leadsData = await this.prisma.lead.findMany({
      where,
      include: {
        unidades: {
          include: {
            historicoDeConsumo: {
              orderBy: {
                mesDoConsumo: 'desc',
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return leadsData.map((leadData) => this.toDomain(leadData));
  }

  async existsByEmail(email: string): Promise<boolean> {
    const count = await this.prisma.lead.count({
      where: { email },
    });
    return count > 0;
  }

  async existsByCodigoUnidade(codigo: string): Promise<boolean> {
    const count = await this.prisma.unidade.count({
      where: { codigoDaUnidadeConsumidora: codigo },
    });
    return count > 0;
  }

  private toDomain(leadData: any): Lead {
    const email = new Email(leadData.email);
    const telefone = new Telefone(leadData.telefone);

    const unidades = leadData.unidades.map((unidadeData: any) => {
      const historicoConsumo = unidadeData.historicoDeConsumo.map(
        (consumoData: any) =>
          new Consumo(consumoData.consumoForaPontaEmKWH, new Date(consumoData.mesDoConsumo)),
      );

      return new Unidade(
        unidadeData.id,
        unidadeData.codigoDaUnidadeConsumidora,
        unidadeData.modeloFasico as ModeloFasico,
        unidadeData.enquadramento as Enquadramento,
        historicoConsumo,
      );
    });

    return new Lead(leadData.id, leadData.nomeCompleto, email, telefone, unidades);
  }
}
