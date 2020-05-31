import * as fs from 'fs-extra';
import * as path from 'path';
import * as Excel from 'exceljs';
import { coral } from 'color-name';

export class ExcelFormatter {
    private _workBook: Excel.Workbook = undefined;
    constructor() {
        this._workBook = new Excel.Workbook();
    }

    /**
     * Define JSON Schema by header
     */
    private _outStructure: object = {};
    public GetWorkSheetHeader(): object {
        return this._outStructure;
    }
    private SetWorkSheetHeader(headers: object[]) {
        headers.forEach((header) => {
            this._outStructure[header['key']] = '';
        });
    }

    /**
     * Set WorkBook Default Information
     * @param {string} creator
     */
    public SetWorkBookDefault(creator?: string): void {
        this._workBook.creator = creator || 'defaultUser';
        this._workBook.properties.date1904 = true;
    }

    /**
     *  Write Data to Excel
     * @param {object[]} - header: worksheet title object array
     * @param {object[]} - data: worksheet row data
     * @param {string | null} - worksheet name
     * @param {string | null} - workbook fileName
     * @returns {object | void} - status
     */
    public async WriteFileToExcel(header: Object[], data: Object[]): Promise<object>;
    public async WriteFileToExcel(header: Object[], data: Object[], sheetName: string, fileName: string): Promise<object>;
    public async WriteFileToExcel(header: object[], data: object[], sheetName?: string, fileName?: string): Promise<object> {
        try {
            const time: string = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}-${new Date().getMinutes()}`;
            sheetName = sheetName || 'default-sheet';
            fileName = `${fileName}-output-${time}` || `excel-output-${time}`;
            // WorkSheet name must to be created
            const workSheet = this._workBook.addWorksheet(sheetName);
            // define Header of all columns
            workSheet.columns = header;
            // declare output Structure
            this.SetWorkSheetHeader(header);
            // Import data

            for (let i = 0; i < data.length; i++) {
                workSheet.addRow(data[i]);

                if (data[i]['image']) {
                    const _image = data[i]['image'];
                    let image = this._workBook.addImage({
                        base64: `data:image/jpeg;base64, ${_image}`,
                        extension: 'jpeg',
                    });
                    workSheet.addImage(image, `C${i + 2}:C${i + 2}`);
                } else if (data[i]['image1'] && data[i]['image2']) {
                    const _imageFirst = data[i]['image1'];
                    const _imageSecond = data[i]['image2'];
                    let image1 = this._workBook.addImage({
                        base64: `data:image/jpeg;base64, ${_imageFirst}`,
                        extension: 'jpeg',
                    });
                    let image2 = this._workBook.addImage({
                        base64: `data:image/jpeg;base64, ${_imageSecond}`,
                        extension: 'jpeg',
                    });
                    workSheet.addImage(image1, `C${i + 2}:C${i + 2}`);
                    workSheet.addImage(image2, `D${i + 2}:D${i + 2}`);
                }
            }

            await this._workBook.xlsx.writeFile(`${fileName}.xlsx`);

            return {
                status: 'success',
                message: `Excel ${fileName} create success`,
            };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    /**
     *  Read File from Excel and construct data to JSON
     * @param {string} - workbook name
     * @param {string} - worksheet name
     */
    public async ReadFileFromExcel(fileName: string, sheetName: string, headers?: Object[]): Promise<object[]> {
        try {
            // find and load workbook first
            const _path: string = path.join(__dirname, `../../${fileName}.xlsx`);
            const wb = await this._workBook.xlsx.readFile(_path);
            // import sheet
            const sheet = wb.getWorksheet(sheetName);
            // data processing define
            let map = this.GetWorkSheetHeader();

            if (Object.keys(map).length <= 0) {
                this.SetWorkSheetHeader(headers);
                map = this.GetWorkSheetHeader();
            }

            const mapKeys: string[] = Object.keys(map);
            let cols = [];
            let results = [];

            sheet.eachRow({ includeEmpty: true }, (row, rowNum) => {
                // remove header of the excel;
                if (rowNum !== 1) {
                    cols.push(row.values);
                }
            });

            cols.forEach((col, index, array) => {
                let newCols = col.slice(1);
                // map data
                let temp = {};
                newCols.forEach((val, index, array) => {
                    // remove default undefined where generated by exceljs
                    temp[mapKeys[index]] = val;
                });
                results.push(temp);
            });

            return results;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
