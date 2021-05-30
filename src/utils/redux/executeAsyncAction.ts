import {DispatchType} from '@utils/redux';


export const executeAsyncAction = (
    dispatch: DispatchType,
    executor: () => Promise<any>,
): Promise<any> => {
    // TODO: show loader
    return executor()
        .catch((error) => {
            // TODO: catch error
        })
        .then(() => {
            // TODO: hide loader
        });
};
