import { utils, WorkBook, WorkSheet, write } from 'xlsx';
import * as path from 'path';
import { writeFile } from 'fs-extra';
import awaitWrapper from '../utils/await-wrapper';

/**
 * Create an instance of Excel
 * Including method allow to `read` and `write`
 *
 * Declaring with providing `workSheetName` and `currentUser`
 * @param {workSheetName: string} `worksheet identity`
 * @param {currentUser} `providing ur username if not provided it will set to default value`
 * @returns {constructor}
 */
export class Excel {
    private readonly workBook?: WorkBook;
    private readonly workSheet?: WorkSheet;
    private readonly currentTime: number = new Date().getTime();
    private readonly sheetTitles: Array<string | Array<string>> = ['image', 'name', ['groupA', 'groupB'], 'date'];
    public readonly _currentUser: string = 'defaultUser';
    public readonly _workSheetName: string = 'Default';
    public readonly _fileName: string = `iSAP_${this._currentUser}_${this.currentTime}`;

    constructor(workSheetName: string, currentUser: string) {
        this.workBook = utils.book_new();
        this.workSheet = utils.aoa_to_sheet([this.sheetTitles], { cellDates: true });
        this._workSheetName = workSheetName;
        this._currentUser = currentUser;
        this.appendSheet(this.workBook, this.workSheet, this._workSheetName); // init sheet
    }

    /**
     * create excel _workSheetName
     * @param {workBook: WorkBook} `A dictionary of the worksheets in workbook`
     * @param {workSheet: WorkSheet} `Indexing with a string map to an object`
     * @param {workSheetName: string} `worksheet identity`
     */
    private appendSheet(workBook: WorkBook, workSheet: WorkSheet, workSheetName: string): void {
        utils.book_append_sheet(workBook, workSheet, workSheetName);
    }

    /**
     * create new Excel File
     * @param workBook inherit WorkBook
     * @param fileName inherit _fileName
     * @returns {Promise<void>}
     */
    public async writeFileToExcel({ workBook = this.workBook, fileName = this._fileName }: { workBook?: WorkBook; fileName?: string } = {}): Promise<string | boolean> {
        const result = write(workBook, { bookType: 'xlsx', type: 'buffer', compression: true });
        const _writeFile = writeFile(`./${fileName}.xlsx`, result);
        await awaitWrapper(_writeFile);
        return this.isFileExist(this._fileName);
    }

    private isFileExist(fileName: string): string | boolean {
        return fileName ? path.join(__dirname, `${fileName}.xlsx`) : false;
    }
}
