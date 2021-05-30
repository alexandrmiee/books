import {Action, ActionCreator} from './types';

function createAction<P>(type: string, payload: P): Action<P>;
function createAction<P>(type: string, payload?: P) {
    return payload !== undefined ? {type, payload} : {type};
}

function factory<P>(namespace: string, actionType: string): ActionCreator<P>;
function factory(namespace: string, actionType: string): ActionCreator {
    const type = `${namespace}/${actionType}`;
    const actionCreator = <P>(payload?: P) => createAction<P>(type, payload);
    actionCreator.toString = () => type;

    return actionCreator;
}

export function createActionFactory(namespace: string) {
    return <P = void>(type: string) => factory<P>(namespace, type);
}
