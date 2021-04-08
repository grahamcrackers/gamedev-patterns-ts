import { Entity } from '/utils';

export class Game extends Entity {
    private _lastTimestamp = 0;

    Update(): void {
        const deltaTime = Date.now() - this._lastTimestamp / 1000;

        // update all components
        super.Update(deltaTime);

        // update the lastTimestamp
        this._lastTimestamp = Date.now();

        // update loop on frame instead of cycle
        window.requestAnimationFrame(() => this.Update());
    }
}
