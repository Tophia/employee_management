import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GraphQlService } from './graph-ql.service';
import { CreateGraphQlInput } from './dto/create-graph-ql.input';
import { UpdateGraphQlInput } from './dto/update-graph-ql.input';

@Resolver('GraphQl')
export class GraphQlResolver {
  constructor(private readonly graphQlService: GraphQlService) {}

  @Mutation('createGraphQl')
  create(@Args('createGraphQlInput') createGraphQlInput: CreateGraphQlInput) {
    return this.graphQlService.create(createGraphQlInput);
  }

  @Query('graphQl')
  findAll() {
    return this.graphQlService.findAll();
  }

  @Query('graphQl')
  findOne(@Args('id') id: number) {
    return this.graphQlService.findOne(id);
  }

  @Mutation('updateGraphQl')
  update(@Args('updateGraphQlInput') updateGraphQlInput: UpdateGraphQlInput) {
    return this.graphQlService.update(updateGraphQlInput.id, updateGraphQlInput);
  }

  @Mutation('removeGraphQl')
  remove(@Args('id') id: number) {
    return this.graphQlService.remove(id);
  }
}
