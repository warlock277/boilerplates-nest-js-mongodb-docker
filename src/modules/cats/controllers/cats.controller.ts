import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CreateCatsDto } from '../dtos';
import { CatsService } from '@modules/cats/services';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TOKEN_NAME } from '@common/constants';
import { Permissions } from '@common/decorators';
import {
  RequestLoggingInterceptor,
  ResponseTransformInterceptor,
} from '@common/interceptors/http';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@ApiTags('cats')
@ApiBearerAuth(TOKEN_NAME)
@Controller('admin/cats')
@UseInterceptors(RequestLoggingInterceptor, ResponseTransformInterceptor)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @ApiOperation({ description: 'Create a Cat' })
  @Post('/')
  async create(@Body() createCatsDto: CreateCatsDto, @Req() req: any) {
    return {
      ...(await this.catsService.create(
        createCatsDto,
      )),
      success: true,
      message: 'Cat created successfully',
    };
  }

  @ApiOperation({ description: 'Fetch Cats list' })
  @Get('/')
  async findAll(@Query() filter: any) {
    return {
      ...(await this.catsService.allCats(filter)),
      success: true,
      message: 'Cats fetched successfully',
    };
  }

  @ApiOperation({ description: 'Fetch Cats details by ID' })
  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return {
      ...(await this.catsService.findOneById(id)),
      success: true,
      message: 'Cat fetched successfully',
    };
  }

  @ApiOperation({ description: 'Update Cats details by ID' })
  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateCatsDto: any,
  ) {
    return {
      ...(await this.catsService.update(
        id,
        updateCatsDto,
      )),
      success: true,
      message: 'Cats updated successfully',
    };
  }
}
