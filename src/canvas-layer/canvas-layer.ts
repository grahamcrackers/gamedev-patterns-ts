import { Canvas, Vector2D } from '@/utils';
import { Settings } from '@/settings';

/** though neither `Canvas` nor `CanvasLayer` are singletons, static `CanvasLayer` ensures `Canvas` is instantiated only once */
export class CanvasLayer {
    private static _background: Canvas;

    private constructor() {
        /* make it unaccessible */
    }

    public static get Background(): Canvas {
        if (!this._background) {
            const { nodeSize, nodeOffset, dimension } = Settings.grid;

            const size = (nodeSize + nodeOffset) * dimension + nodeOffset;
            this._background = new Canvas(new Vector2D(size, size));
            this._background.Awake();
        }

        return this._background;
    }
}
