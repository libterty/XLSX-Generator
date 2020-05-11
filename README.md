# XLSX Generator

-   A Excel File Read and Write Module implemented base on exceljs module

## How to use

#### Install

```bash=
npm i xlsx-generator
```

#### Import

```javascript
import { ExcelFormatter } from 'xlsx-generator';
```

#### Init Instance

```javascript
const excel = new ExcelFormatter();
```

## Feature

#### Set WorkBook Creator

```javascript
const excel = new ExcelFormatter();
// parameter as a string or null
excel.SetWorkBookDefault('Author');
```

#### Write Data And Generate Excel File

```javascript
const excel = new ExcelFormatter();
// Example Header
const _header = [
    { header: 'Id', key: 'id', width: 10 },
    { header: 'Name', key: 'name', width: 25 },
    { header: 'Image', key: 'image', width: 50 },
];
// Example Data
const _data = [
    { id: 'test1', name: 'testUser1', image: 'file/file/test1.jpg' },
    { id: 'test2', name: 'testUser2', image: 'file/file/test2.jpg' },
    { id: 'test3', name: 'testUser3', image: 'file/file/test3.jpg' },
    { id: 'test4', name: 'testUser4', image: 'file/file/test4.jpg' },
];

// with fileName and sheetName
excel.WriteFileToExcel(_header, _data, 'mySheet', 'myFile');

// without fileName and sheetName
excel.WriteFileToExcel(_header, _data);
```

#### Read File From data and output as JSON Format

```javascript
const excel = new ExcelFormatter();

excel.ReadFileFromExcel('myFile', 'mySheet');
```

## LICENCE

NO LICENCE FREE TO CHANGE OR USE

## Author

-   11
