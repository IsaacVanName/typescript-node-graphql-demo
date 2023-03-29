import * as fs from 'fs';

export class GraphQLFile {
    private _filename: string = '';
    private _filepath: string = '';
    protected definition: string = '';

    constructor(partialFilePath: string) {
        let extension:string = '.graphql';

        this._filepath = `./graphql/schema/${partialFilePath}${extension}`;
        this._filename = `${partialFilePath}${extension}`.replace(/[^]+\//g, ''); // remove any leading paths

        this.readFileContents();
    }

    public readFileContents(): string {
        try {
            this.definition = fs.readFileSync(this._filepath, 'utf8');
        }
        catch (e) {
            // Normally, I would send this to a log as an error. This is a quick example, though, so don't criticize too much. :)
            console.log(e.message);
        }

        return this.definition; // doesn't have to have a return value, but letting it be multipurpose
    }

    public get filename(): string {
        return this._filename;
    }

    public get filepath(): string {
        return this._filepath;
    }

    public toString(): string {
        return this.definition || '';
    }
}