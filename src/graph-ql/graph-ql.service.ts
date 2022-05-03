import { Injectable } from '@nestjs/common';
import { CreateGraphQlInput } from './dto/create-graph-ql.input';
import { UpdateGraphQlInput } from './dto/update-graph-ql.input';

@Injectable()
export class GraphQlService {
  create(createGraphQlInput: CreateGraphQlInput) {
    return 'This action adds a new graphQl';
  }

  findAll() {
    return `This action returns all graphQl`;
  }

  findOne(id: number) {
    return `This action returns a #${id} graphQl`;
  }

  update(id: number, updateGraphQlInput: UpdateGraphQlInput) {
    return `This action updates a #${id} graphQl`;
  }

  remove(id: number) {
    return `This action removes a #${id} graphQl`;
  }
}
