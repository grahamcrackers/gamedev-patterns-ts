import { IComponent } from '@/utils';
import { Node } from '@/node';
import { Settings } from '@/settings';

export class NodeDrawComponent implements IComponent {
    Entity: Node;

    Awake(): void {
        // create and attach Canvas to the DOM
        const canvas = document.createElement('canvas');
        const { nodeSize: size, nodeOffset: offset, dimension, color } = Settings.grid;
        const canvasSize = (size + offset) * dimension + offset;
        canvas.setAttribute('width', canvasSize.toString());
        canvas.setAttribute('height', canvasSize.toString());
        document.body.appendChild(canvas);

        // add to grid
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const ctx = canvas.getContext('2d')!;
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.rect(this.Entity.Start.x, this.Entity.Start.y, this.Entity.Size.x, this.Entity.Size.x);
        ctx.fill();
    }

    Update(deltaTime: number): void {
        // throw new Error('Method not implemented.');
    }
}
