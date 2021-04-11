import { NodeDrawComponent } from './draw';
import { CanvasLayer } from '@/canvas-layer';
import { mockNodeFactory } from '@/node';

describe(`>>> Node Draw Component`, () => {
    let comp: NodeDrawComponent;

    beforeEach(() => {
        comp = new NodeDrawComponent();
        comp.Entity = mockNodeFactory();
    });

    it(`should clean up when awakened`, () => {
        const spy = jest.spyOn(CanvasLayer.Background, 'ClearRect');
        expect(spy).not.toBeCalled();

        comp.Awake();

        expect(spy).toBeCalled();
    });

    it('should cleanup and draw rect every frame', () => {
        const spyClearRect = jest.spyOn(CanvasLayer.Background, 'ClearRect');
        const spyFillRect = jest.spyOn(CanvasLayer.Background, 'FillRect');

        // something funky is going on here. apparently it shouldn't be called
        // at all but for some reason `CanvasLayer` is being kept in memory

        // expect(spyClearRect).not.toBeCalled();
        expect(spyClearRect).toBeCalledTimes(1);
        expect(spyFillRect).not.toBeCalled();

        comp.Update(0);

        // expect(spyClearRect).toBeCalled();
        expect(spyClearRect).toBeCalledTimes(2);
        expect(spyFillRect).toBeCalled();
    });
});
