import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddUserPartyBodyDto } from './dto/bodies/add-user-party-body.dto';
import { UserPartiesService } from './user-parties.service';
import { UserParty } from './user-party.model';
import { SaveUserPartyResDto } from './dto/responses/save-user-party-res.dto';

@ApiTags('User Parties')
@Controller('/v1/user-parties')
@UseGuards(AuthGuard('jwt'))
export class UserPartiesController {
  constructor(private readonly userPartiesService: UserPartiesService) {}

  @ApiOperation({ summary: 'Create user party' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Add new user party to database', type: SaveUserPartyResDto })
  @Post('/')
  public async create(@Body() body: AddUserPartyBodyDto): Promise<SaveUserPartyResDto> {
    const newUserParty: UserParty = await this.userPartiesService.create(body);
    return new SaveUserPartyResDto(newUserParty);
  }
}
