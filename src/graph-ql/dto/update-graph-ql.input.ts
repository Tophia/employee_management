import { CreateGraphQlInput } from './create-graph-ql.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateGraphQlInput extends PartialType(CreateGraphQlInput) {
  id: number;
}
