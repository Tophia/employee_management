import { Module } from '@nestjs/common';
import { GraphQlService } from './graph-ql.service';
import { GraphQlResolver } from './graph-ql.resolver';

@Module({
  providers: [GraphQlResolver, GraphQlService]
})
export class GraphQlModule {}
