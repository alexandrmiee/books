import * as React from 'react';
import {bindActionCreators, ActionCreator} from 'redux';
import {useDispatch} from 'react-redux';

/*
 * useActions - замена mapDispatchToProps, делает bindActionCreators к одному или массиву action
 * @param actions - массив экшенов
 * @param dependencies - зависимости
 */
export function useActions<T = any>(
    actions: ActionCreator<any> | ActionCreator<any>[],
    dependencies: any[] = []
): ActionCreator<any>[] {
    const dispatch = useDispatch();
    return React.useMemo(
        () => {
            if (Array.isArray(actions)) {
                return actions.map(action => bindActionCreators(action, dispatch));
            }
            return [bindActionCreators(actions, dispatch)];
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [dispatch, ...dependencies]
    );
}
