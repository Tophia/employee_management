import { Test, TestingModule } from '@nestjs/testing';
import { GraphQlResolver } from './graph-ql.resolver';
import { GraphQlService } from './graph-ql.service';

describe('GraphQlResolver', () => {
  let resolver: GraphQlResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GraphQlResolver, GraphQlService],
    }).compile();

    resolver = module.get<GraphQlResolver>(GraphQlResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
