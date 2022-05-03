import { Test, TestingModule } from '@nestjs/testing';
import { GraphQlService } from './graph-ql.service';

describe('GraphQlService', () => {
  let service: GraphQlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GraphQlService],
    }).compile();

    service = module.get<GraphQlService>(GraphQlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
