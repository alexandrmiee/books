import {AnyAction} from 'redux';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';

export type Action<P = void> = P extends void
    ? Readonly<{type: string}>
    : Readonly<{type: string, payload: P}>;

export type ActionCreator<P = void> = P extends void
    ? () => Action
    : (payload: P) => Action<P>;

export type HandlersMap = {
    [type: string]: Function
};

export type PromiseAction = Promise<AnyAction | void>;

export type AsyncActionType = ThunkAction<PromiseAction, any, undefined, AnyAction>;
export type DispatchType = ThunkDispatch<any, undefined, AnyAction>;
