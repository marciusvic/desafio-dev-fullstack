import { DomainException } from '@shared/errors/domain.exception';

export class Consumo {
  constructor(
    public readonly consumoForaPontaEmKWH: number,
    public readonly mesDoConsumo: Date,
  ) {
    this.validate();
  }

  private validate(): void {
    if (this.consumoForaPontaEmKWH < 0) {
      throw new DomainException('Consumo não pode ser negativo');
    }

    if (!(this.mesDoConsumo instanceof Date) || isNaN(this.mesDoConsumo.getTime())) {
      throw new DomainException('Data do consumo inválida');
    }
  }

  toJSON() {
    return {
      consumoForaPontaEmKWH: this.consumoForaPontaEmKWH,
      mesDoConsumo: this.mesDoConsumo,
    };
  }
}
