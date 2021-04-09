import { Entity } from '@/utils';
import { Node } from '@/node';

// Note, we should call super.Awake() and super.Update() to allow
// abstract Entity to do its default work and awake and update components.
// We have none yet, but we will add some in future chapters.

export class Grid extends Entity {
    private _nodes: Node[] = [];

    get Nodes(): Node[] {
        return this._nodes;
    }

    Awake(): void {
        super.Awake();

        for (const node of this._nodes) {
            node.Awake();
        }
    }

    Update(deltaTime: number): void {
        super.Update(deltaTime);

        for (const node of this._nodes) {
            node.Update(deltaTime);
        }
    }
}
