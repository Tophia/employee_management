/* eslint-disable prettier/prettier */
import { Title } from '../../../models/title.model';
import { TITLE_REPOSITORY } from '../../../core/constants';

export const titleProviders = [
    {
        provide: TITLE_REPOSITORY,
        useValue: Title,
    },
];
