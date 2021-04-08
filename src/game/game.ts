import { Entity } from '../utils';

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
}
