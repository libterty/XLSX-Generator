import { readFile } from 'fs-extra';
import * as path from 'path';
import { Excel } from '../../src/xlsxs/index';
import awaitWrapper from '../../src/utils/await-wrapper';

describe('# Excel Instances', (): void => {
    describe('# Create New Excel File', (): void => {
        let excel: Excel;
        beforeAll(() => (excel = new Excel('testSheet', 'testUser')));

        it('Should be able to create new file', async (): Promise<void> => {
            const result = await awaitWrapper(excel.writeFileToExcel());
            const _file = excel;
            expect(result).not.toBeUndefined;
            expect(typeof result[1]).toEqual('string');
        });
    });
});
