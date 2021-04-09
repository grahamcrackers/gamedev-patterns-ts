import { Entity } from '@/utils';
import { Settings } from '@/settings';
export class Game extends Entity {
    private _lastTimestamp = 0;

    Entities: Entity[] = [];

    Awake(): void {
        super.Awake();

        // awake all children
        for (const entity of this.Entities) {
            entity.Awake();
        }

        // make sure Update starts after all entities are awaken
        window.requestAnimationFrame(() => {
            // set initial timestamp
            this._lastTimestamp = Date.now();

            // start update loop
            this.Update();
        });

        this.DirtyDraw();
    }

    Update(): void {
        const deltaTime = Date.now() - this._lastTimestamp / 1000;

        // update all components
        super.Update(deltaTime);

        // update all children
        for (const entity of this.Entities) {
            entity.Update(deltaTime);
        }

        // update the lastTimestamp
        this._lastTimestamp = Date.now();

        // update loop on frame instead of cycle
        window.requestAnimationFrame(() => this.Update());
    }

    private DirtyDraw(): void {
        // create and attach Canvas to the DOM
        const canvas = document.createElement('canvas');

        // calculate canvas size
        const { nodeSize: size, nodeOffset: offset, dimension, color } = Settings.grid;
        const canvasSize = (size + offset) * dimension + offset;
        canvas.setAttribute('width', canvasSize.toString());
        canvas.setAttribute('height', canvasSize.toString());
        document.body.appendChild(canvas);

        for (let y = 0; y < dimension; y++) {
            for (let x = 0; x < dimension; x++) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const ctx = canvas.getContext('2d')!;
                ctx.beginPath();
                ctx.fillStyle = color;
                ctx.rect((size + offset) * x, (size + offset) * y, size, size);
                ctx.fill();
            }
        }
    }
}
