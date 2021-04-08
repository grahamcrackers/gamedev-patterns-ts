import { IComponent } from './component.h';
import { IUpdate } from './update.h';
type constr<T> = { new (...args: unknown[]): T };

/***
 * An Entity should:
 * 1. Add a component to itself
 * 2. Remove the component from itself
 * 3. Return component by it's type if it was added
 * 4. Answer the question "is this component added or not?"
 **/
export abstract class Entity implements IUpdate {
    /** allow descendants access to the components array */
    protected _components: IComponent[] = [];

    // provide readonly access for components
    get Components(): IComponent[] {
        return this._components;
    }

    Update(deltaTime: number): void {
        for (const component of this._components) {
            component.Update(deltaTime);
        }
    }

    /** adds a component to the component array and sets a reference to the entity */
    AddComponent(component: IComponent): void {
        this._components.push(component);
        component.Entity = this;
    }

    /** expects a type (read: class) and then returns component of that type. type must implement IComponent */
    GetComponent<C extends IComponent>(constr: constr<C>): C {
        for (const component of this._components) {
            if (component instanceof constr) {
                return component as C;
            }
        }

        throw new Error(`Component ${constr.name} not found on Entity ${this.constructor.name}`);
    }

    /** expects a type (read: class) and then returns boolean. type must implement IComponent */
    HasComponent<C extends IComponent>(constr: constr<C>): boolean {
        for (const component of this._components) {
            if (component instanceof constr) {
                return true;
            }
        }

        return false;
    }

    /** will remove a component from the components array */
    RemoveComponent<C extends IComponent>(constr: constr<C>): void {
        let toRemove: IComponent | undefined;
        let index: number | undefined;

        for (let i = 0; i < this._components.length; i++) {
            const component = this._components[i];
            if (component instanceof constr) {
                toRemove = component;
                index = i;
                break;
            }
        }

        if (toRemove && index) {
            toRemove.Entity = null;
            this._components.splice(index, 1);
        }
    }
}
