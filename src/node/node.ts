import { Entity } from '@/utils';
import { NodeDrawComponent } from './components';

export class Node extends Entity {
    Awake(): void {
        this.AddComponent(new NodeDrawComponent());

        super.Awake();
    }
}
