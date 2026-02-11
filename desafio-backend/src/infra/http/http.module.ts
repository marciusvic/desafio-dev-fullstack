import { Module } from '@nestjs/common';
import { LeadController } from './controllers/lead.controller';
import { CreateLeadUseCase } from '@application/use-cases/create-lead.usecase';
import { GetLeadByIdUseCase } from '@application/use-cases/get-lead-by-id.usecase';
import { ListLeadsUseCase } from '@application/use-cases/list-leads.usecase';

@Module({
  controllers: [LeadController],
  providers: [
    {
      provide: CreateLeadUseCase,
      useFactory: (leadRepository) => new CreateLeadUseCase(leadRepository),
      inject: ['ILeadRepository'],
    },
    {
      provide: GetLeadByIdUseCase,
      useFactory: (leadRepository) => new GetLeadByIdUseCase(leadRepository),
      inject: ['ILeadRepository'],
    },
    {
      provide: ListLeadsUseCase,
      useFactory: (leadRepository) => new ListLeadsUseCase(leadRepository),
      inject: ['ILeadRepository'],
    },
  ],
})
export class HttpModule {}
