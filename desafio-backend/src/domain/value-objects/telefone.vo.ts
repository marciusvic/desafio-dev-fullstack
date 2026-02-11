import { DomainException } from '@shared/errors/domain.exception';

export class Telefone {
  private readonly value: string;

  constructor(telefone: string) {
    const cleaned = this.clean(telefone);
    if (!this.isValid(cleaned)) {
      throw new DomainException('Telefone inválido. Deve conter entre 10 e 11 dígitos');
    }
    this.value = cleaned;
  }

  private clean(telefone: string): string {
    return telefone.replace(/\D/g, '');
  }

  private isValid(telefone: string): boolean {
    return telefone.length >= 10 && telefone.length <= 11;
  }

  getValue(): string {
    return this.value;
  }

  getFormatted(): string {
    if (this.value.length === 11) {
      return `(${this.value.substring(0, 2)}) ${this.value.substring(2, 7)}-${this.value.substring(7)}`;
    }
    return `(${this.value.substring(0, 2)}) ${this.value.substring(2, 6)}-${this.value.substring(6)}`;
  }
}
