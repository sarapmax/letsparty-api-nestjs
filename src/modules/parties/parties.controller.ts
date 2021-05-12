import { Body, Controller, Delete, Get, HttpStatus, Param, Put, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddPartyBodyDto } from './dto/bodies/add-party-body.dto';
import { UpdatePartyBodyDto } from './dto/bodies/update-party-body.dto';
import { GetPartyParamDto } from './dto/params/get-party-param.dto';
import { DeletePartyResDto } from './dto/responses/delete-party-res.dto';
import { GetPartyResDto } from './dto/responses/get-party-res.dto';
import { PartiesService } from './parties.service';
import { SavePartyResDto } from './dto/responses/save-party-res.dto';
import { RECORD_UPDATED } from 'src/constants';
import { Party } from './party.model';

@ApiTags('Parties')
@Controller('/v1/parties')
@UseGuards(AuthGuard('jwt'))
export class PartiesController {
  constructor(private readonly partiesService: PartiesService) {}

  @ApiOperation({ summary: 'Get all parties' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Get all parties from database', type: [GetPartyResDto] })
  @Get('/')
  public async findAll(): Promise<GetPartyResDto[]> {
    const parties: Party[] = await this.partiesService.findAll();
    return parties.map((party: Party): GetPartyResDto => new GetPartyResDto(party));
  }

  @ApiOperation({ summary: 'Get specific party' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Search party by id and return it\'s values', type: GetPartyResDto })
  @Get('/:id')
  public async findOne(@Param() param: GetPartyParamDto): Promise<GetPartyResDto> {
    const party: Party = await this.partiesService.findOne(param.id);

    return new GetPartyResDto(party);
  }

  @ApiOperation({ summary: 'Create party' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Add new party to database', type: SavePartyResDto })
  @Post('/')
  public async create(@Body() body: AddPartyBodyDto): Promise<SavePartyResDto> {
    const newParty: Party = await this.partiesService.create(body);
    return new SavePartyResDto(newParty);
  }

  @ApiOperation({ summary: 'Update party' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Search party by id and update it\'s values', type: SavePartyResDto })
  @Put('/:id')
  public async update(@Param() param: GetPartyParamDto, @Body() body: UpdatePartyBodyDto): Promise<SavePartyResDto> {
    const updatedParty: Party = await this.partiesService.update(param.id, body);
    return new SavePartyResDto(updatedParty, RECORD_UPDATED);
  }

  @ApiOperation({ summary: 'Delete specific party' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Search party by id and delete it', type: DeletePartyResDto })
  @Delete('/:id')
  public async destroy(@Param() param: GetPartyParamDto): Promise<DeletePartyResDto> {
    await this.partiesService.destroy(param.id);
    return new DeletePartyResDto();
  }
}
