import { IAwake, IUpdate } from '@/utils';
import { Entity } from './entity';

export interface IComponent extends IAwake, IUpdate {
    Entity: Entity | null;
}
