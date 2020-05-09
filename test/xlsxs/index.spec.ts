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
        });
    });

    describe('# Read Existing Excel File', (): void => {
        let excel: Excel = new Excel('readSheet', 'readUser');
        let flag: boolean = false;

        beforeAll(
            async (): Promise<void> => {
                await excel.writeFileToExcel();
            },
        );

        it('Should be able to read file', async (): Promise<void> => {
            flag = excel.isFileExist(excel._fileName);
            expect(flag).toEqual(true);
            return;
        });
    });
});
