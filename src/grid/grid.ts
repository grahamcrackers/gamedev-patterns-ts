import { Entity, Vector2D } from '@/utils';
import { Node } from '@/node';
import { Settings } from '@/settings';

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

        // prepare children
        this.InitNodes();

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

    private InitNodes(): void {
        const { nodeSize: size, nodeOffset: offset, dimension, color } = Settings.grid;
        for (let y = 0; y < dimension; y++) {
            for (let x = 0; x < dimension; x++) {
                const start = new Vector2D(x * (size + offset) + offset, y * (size + offset) + offset);
                const end = new Vector2D(start.x + size, start.y + size);
                const index = new Vector2D(x, y);

                const node = new Node(start, end, index);
                this._nodes.push(node);
            }
        }
    }
}
