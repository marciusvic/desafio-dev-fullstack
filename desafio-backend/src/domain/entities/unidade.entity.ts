import { DomainException } from '@shared/errors/domain.exception';
import { Consumo } from '../value-objects/consumo.vo';

export enum ModeloFasico {
  MONOFASICO = 'monofasico',
  BIFASICO = 'bifasico',
  TRIFASICO = 'trifasico',
}

export enum Enquadramento {
  AX = 'AX',
  B1 = 'B1',
  B2 = 'B2',
  B3 = 'B3',
}

export class Unidade {
  constructor(
    public readonly id: string,
    public readonly codigoDaUnidadeConsumidora: string,
    public readonly modeloFasico: ModeloFasico,
    public readonly enquadramento: Enquadramento,
    public readonly historicoDeConsumoEmKWH: Consumo[],
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.codigoDaUnidadeConsumidora || this.codigoDaUnidadeConsumidora.trim().length === 0) {
      throw new DomainException('Código da unidade consumidora é obrigatório');
    }

    if (!Object.values(ModeloFasico).includes(this.modeloFasico)) {
      throw new DomainException('Modelo fásico inválido');
    }

    if (!Object.values(Enquadramento).includes(this.enquadramento)) {
      throw new DomainException('Enquadramento inválido');
    }

    if (!this.historicoDeConsumoEmKWH || this.historicoDeConsumoEmKWH.length !== 12) {
      throw new DomainException('Histórico de consumo deve conter exatamente 12 meses');
    }
  }

  toJSON() {
    return {
      id: this.id,
      codigoDaUnidadeConsumidora: this.codigoDaUnidadeConsumidora,
      modeloFasico: this.modeloFasico,
      enquadramento: this.enquadramento,
      historicoDeConsumoEmKWH: this.historicoDeConsumoEmKWH.map((c) => c.toJSON()),
    };
  }
}
