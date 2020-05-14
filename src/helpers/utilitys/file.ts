import * as Fs from 'fs';
import * as Path from 'path';
import { execFile } from 'child_process';
import * as Enum from '../../enums';

export namespace File {
    /**
     * Assets path
     */
    export const assetsPath: string = RealPath('./workspace/custom/assets');

    /**
     * Get real path
     * @param file
     */
    export function RealPath(file: string): string {
        let realpath: string = Path.resolve(file);
        return realpath;
    }

    /**
     * Get file path
     * @param filename
     */
    export function GetPath(filename: string): string {
        filename = filename.replace(/\/|\\/g, '/');
        let path: string = filename.substr(0, filename.lastIndexOf('/'));
        return RealPath(path);
    }

    /**
     * Create folder
     * @param path
     */
    export function CreateFolder(path: string): void {
        try {
            let realpath: string = RealPath(path);
            let realpaths: string[] = realpath.split(/\/|\\/g);

            realpaths.reduce((previousValue, currentValue, currentIndex, array) => {
                let sum: string = `${previousValue}/${currentValue}`;
                if (!Fs.existsSync(sum)) {
                    Fs.mkdirSync(sum);
                }

                return sum;
            });
        } catch (e) {
            throw e;
        }
    }

    /**
     * Read floder all files
     * @param path
     */
    export function ReadFolder(path: string): string[] {
        try {
            CreateFolder(path);
            let files: string[] = Fs.readdirSync(path);

            return files;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Write file
     * @param filename
     * @param data
     */
    export function WriteFile(filename: string, data: any): void {
        try {
            CreateFolder(GetPath(filename));
            let realpath: string = RealPath(filename);

            Fs.writeFileSync(realpath, data);
        } catch (e) {
            throw e;
        }
    }

    /**
     * Append file
     * @param filename
     * @param data
     */
    export function AppendFile(filename: string, data: any): void {
        try {
            CreateFolder(GetPath(filename));
            let realpath: string = RealPath(filename);

            Fs.appendFileSync(realpath, data);
        } catch (e) {
            throw e;
        }
    }

    /**
     * Write base64 data to file
     * @param filename
     * @param image
     */
    export function WriteBase64File(filename: string, data: string) {
        try {
            CreateFolder(GetPath(filename));
            let realpath: string = RealPath(filename);

            let regex = /data:.*;base64, */;
            data = data.replace(regex, '');

            let buffer: Buffer = Buffer.from(data, Enum.EEncoding.base64);

            WriteFile(realpath, buffer);
        } catch (e) {
            throw e;
        }
    }

    /**
     * Read file
     * @param filename
     */
    export function ReadFile(filename: string): Buffer {
        try {
            CreateFolder(GetPath(filename));
            let realpath: string = RealPath(filename);

            let buffer: Buffer = Fs.readFileSync(realpath);

            return buffer;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Delete file
     * @param filename
     */
    export function DeleteFile(filename: string): void {
        try {
            CreateFolder(GetPath(filename));
            let realpath: string = RealPath(filename);

            Fs.unlinkSync(realpath);
        } catch (e) {
            throw e;
        }
    }

    /**
     * Delete folder
     * @param path
     * @param recursive
     */
    export function DeleteFolder(path: string, recursive: boolean = true): void {
        try {
            CreateFolder(path);

            if (recursive) {
                let files = ReadFolder(path);
                files.forEach((value, index, array) => {
                    DeleteFile(`${path}/${value}`);
                });
            }

            Fs.rmdirSync(path);
        } catch (e) {
            throw e;
        }
    }

    /**
     * Copy filename1 to filename2
     * @param filename1
     * @param filename2
     */
    export function CopyFile(filename1: string, filename2: string): void {
        try {
            CreateFolder(GetPath(filename1));
            let realpath1: string = RealPath(filename1);

            CreateFolder(GetPath(filename2));
            let realpath2: string = RealPath(filename2);

            Fs.copyFileSync(realpath1, realpath2);
        } catch (e) {
            throw e;
        }
    }

    /**
     * Get file status
     * @param filename
     */
    export function GetFileStatus(filename: string): Fs.Stats {
        CreateFolder(GetPath(filename));
        let realpath: string = RealPath(filename);

        let status = Fs.statSync(realpath);

        return status;
    }

    /**
     * Get file alive
     * @param filename
     */
    export function GetFileAlive(filename: string): boolean {
        CreateFolder(GetPath(filename));
        let realpath: string = RealPath(filename);

        try {
            Fs.accessSync(realpath);

            return true;
        } catch (e) {
            return false;
        }
    }

    /**
     * File path to url
     * @param filename
     */
    export function Path2Url(filename: string): string {
        let realpath: string = RealPath(filename);
        realpath = realpath.replace(assetsPath, '').replace(/\\/g, '/').replace(/^\//, '');

        return realpath;
    }
}
