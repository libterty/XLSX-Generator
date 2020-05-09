import axios from 'axios';
import awaitWrapper from '../../src/utils/await-wrapper';

describe('# Utils', (): void => {
    describe('# awaitWrapper function() ', (): void => {
        let successData, failureData;

        beforeAll(
            async (): Promise<void> => {
                const successAwait = jest.fn().mockImplementation((): Promise<object> => Promise.resolve({ hello: 'World' }));
                const failAwait = jest.fn().mockImplementationOnce((): Promise<object> => Promise.reject({ err: 'fail' }));
                successData = await awaitWrapper(successAwait());
                failureData = await awaitWrapper(failAwait());
            },
        );

        it('should be able to resovle async/await', (): void => {
            expect(successData[1]['hello']).toEqual('World');
        });

        it('should return catch for async/await', (): void => {
            expect(failureData[0]['err']).toEqual('fail');
        });
    });
});
