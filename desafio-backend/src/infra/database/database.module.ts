import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { LeadPrismaRepository } from './prisma/lead.prisma.repository';

@Global()
@Module({
  providers: [
    PrismaService,
    {
      provide: 'ILeadRepository',
      useClass: LeadPrismaRepository,
    },
  ],
  exports: [PrismaService, 'ILeadRepository'],
})
export class DatabaseModule {}
