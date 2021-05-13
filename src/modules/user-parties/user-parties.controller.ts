import { Controller, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserPartiesService } from './user-parties.service';
import { UserParty } from './user-party.model';
import { SaveUserPartyResDto } from './dto/responses/save-user-party-res.dto';
import { GetPartyParamDto } from './dto/params/get-party-param.dto';

@ApiTags('User Parties')
@Controller('/v1/user-parties')
@UseGuards(AuthGuard('jwt'))
export class UserPartiesController {
  constructor(private readonly userPartiesService: UserPartiesService) {}

  @ApiOperation({ summary: 'Create user party' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Add new user party to database', type: SaveUserPartyResDto })
  @Post('/:id')
  public async create(@Param() param: GetPartyParamDto): Promise<SaveUserPartyResDto> {
    const newUserParty: UserParty = await this.userPartiesService.create(param.id);
    return new SaveUserPartyResDto(newUserParty);
  }
}
