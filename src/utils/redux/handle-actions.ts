import {Action, HandlersMap} from './types';

export function actionNameBuilder(namespace: string, key: string) {
    return `${namespace}/${key}`;
}

export function handleActions(namespace: string) {
    return (handlersMap: HandlersMap, defaultState: any, globalHandlersMap: HandlersMap = {}) => {
        const handlerKeys = Object.keys(handlersMap);
        const handlers: HandlersMap = handlerKeys.reduce((acc, key) => {
            const action = handlersMap[key];
            return {
                ...acc,
                [actionNameBuilder(namespace, key)]: action,
            };
        }, {...globalHandlersMap});

        return (state: Object = defaultState, action: Action) => {
            const handler = handlers[action.type];
            if (handler) {
                return handler(state, action);
            }

            return state;
        };
    };
}
