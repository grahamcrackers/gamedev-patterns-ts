import { Grid } from './grid';
import { Node } from '@/node';
import { Settings } from '@/settings';

describe(`>>> Grid`, () => {
    const { dimension } = Settings.grid;
    const nodeCount = dimension * dimension;

    let grid: Grid;

    beforeEach(() => {
        grid = new Grid();
    });

    it(`should awake and update all children`, () => {
        const spyNodeAwake = jest.spyOn(Node.prototype, 'Awake');
        const spyNodeUpdate = jest.spyOn(Node.prototype, 'Update');

        expect(spyNodeAwake).not.toBeCalled();
        expect(spyNodeUpdate).not.toBeCalled();

        grid.Awake();
        expect(spyNodeAwake).toBeCalledTimes(nodeCount);

        grid.Update(0);
        expect(spyNodeAwake).toBeCalledTimes(nodeCount);
    });
});
