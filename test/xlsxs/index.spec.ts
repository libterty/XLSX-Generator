import * as path from 'path';
import { nanoid } from 'nanoid';
import { ExcelFormatter } from '../../src/xlsxs/index';

describe('# Excel Instances', (): void => {
    describe('# Create New Excel File', (): void => {
        let excel = new ExcelFormatter();
        let testSheet: string = 'test-sheet';
        let fileName: string = '';

        beforeAll(() => {
            excel.SetWorkBookDefault('testUser');
        });

        it('should be able to create a test excel file', async (): Promise<void> => {
            const _header = [
                { header: 'Id', key: 'id', width: 10 },
                { header: 'Name', key: 'name', width: 25 },
                { header: 'Image', key: 'image', width: 50 },
            ];

            const _data = [
                { id: 'test1', name: 'testUser1', image: 'file/file/test1.jpg' },
                { id: 'test2', name: 'testUser2', image: 'file/file/test2.jpg' },
                { id: 'test3', name: 'testUser3', image: 'file/file/test3.jpg' },
                { id: 'test4', name: 'testUser4', image: 'file/file/test4.jpg' },
            ];

            fileName = `test-${nanoid(5)}`;

            const res = await excel.WriteFileToExcel(_header, _data, testSheet, fileName);
            expect(typeof res).toEqual('object');
            expect(res['status']).toEqual('success');
            expect(res['message']).toEqual(`Excel ${fileName}-output create success`);
        });

        it('should be able to read excel', async () => {
            try {
                const fakeJson = await excel.ReadFileFromExcel(`${fileName}-output`, testSheet);
                expect(fakeJson[0]['id']).toEqual('test1');
                expect(fakeJson[0]['name']).toEqual('testUser1');
                expect(fakeJson[1]['id']).toEqual('test2');
                expect(fakeJson[1]['name']).toEqual('testUser2');
                expect(fakeJson[2]['id']).toEqual('test3');
                expect(fakeJson[2]['name']).toEqual('testUser3');
                expect(fakeJson[3]['id']).toEqual('test4');
                expect(fakeJson[3]['name']).toEqual('testUser4');
                return;
            } catch (error) {
                throw new Error(error);
            }
        });
    });
});
