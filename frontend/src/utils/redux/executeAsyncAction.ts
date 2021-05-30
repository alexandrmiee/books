import {DispatchType} from '@utils/redux';

export const executeAsyncAction = (
    _dispatch: DispatchType,
    executor: () => Promise<any>
): Promise<any> => executor();
// TODO: show loader
// .catch(error => {
// // TODO: catch error
// })
// .then(() => {
// // TODO: hide loader
// });
