import { DomainException } from '@shared/errors/domain.exception';
import { Email } from '../value-objects/email.vo';
import { Telefone } from '../value-objects/telefone.vo';
import { Unidade } from './unidade.entity';

export class Lead {
  constructor(
    public readonly id: string,
    public readonly nomeCompleto: string,
    public readonly email: Email,
    public readonly telefone: Telefone,
    public readonly unidades: Unidade[],
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.nomeCompleto || this.nomeCompleto.trim().length < 3) {
      throw new DomainException('Nome completo deve ter pelo menos 3 caracteres');
    }

    if (!this.unidades || this.unidades.length === 0) {
      throw new DomainException('Lead deve ter pelo menos uma unidade');
    }
  }

  toJSON() {
    return {
      id: this.id,
      nomeCompleto: this.nomeCompleto,
      email: this.email.getValue(),
      telefone: this.telefone.getValue(),
      unidades: this.unidades.map((u) => u.toJSON()),
    };
  }
}
