import { IComponent } from '@/utils';
import { Node } from '@/node';

export class NodeDrawComponent implements IComponent {
    Entity: Node;

    Awake(): void {
        throw new Error('Method not implemented.');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Update(deltaTime: number): void {
        throw new Error('Method not implemented.');
    }
}
