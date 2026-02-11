import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateLeadDto } from '@application/dtos/create-lead.dto';
import { ListLeadFiltersDto } from '@application/dtos/list-lead-filters.dto';
import { CreateLeadUseCase } from '@application/use-cases/create-lead.usecase';
import { GetLeadByIdUseCase } from '@application/use-cases/get-lead-by-id.usecase';
import { ListLeadsUseCase } from '@application/use-cases/list-leads.usecase';

@Controller('leads')
export class LeadController {
  constructor(
    private readonly createLeadUseCase: CreateLeadUseCase,
    private readonly getLeadByIdUseCase: GetLeadByIdUseCase,
    private readonly listLeadsUseCase: ListLeadsUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async create(@Body() dto: CreateLeadDto) {
    const lead = await this.createLeadUseCase.execute(dto);
    return lead.toJSON();
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async findAll(@Query() filters: ListLeadFiltersDto) {
    const leads = await this.listLeadsUseCase.execute(filters);
    return leads.map((lead) => lead.toJSON());
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const lead = await this.getLeadByIdUseCase.execute(id);
    return lead.toJSON();
  }
}
