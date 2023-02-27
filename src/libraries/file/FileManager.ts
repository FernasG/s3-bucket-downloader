import * as fs from "fs";

export class FileManager {
    private readonly bucketFolder: string;
    
    constructor() {
        this.bucketFolder = `${process.cwd()}/bucket`;
    }

    public writeFile(path: string, content: string) {
        const pathArray = path.split('/');
        
        const filename = pathArray.pop();

        const localPath = this.getFolderPath(pathArray);

        if (!fs.existsSync(localPath)) this.createFolder(localPath);
        
        fs.writeFileSync(`${localPath}/${filename}`, content);
    }

    private createFolder(localPath: string) {
        fs.mkdirSync(localPath, { recursive: true });
    }

    private getFolderPath(pathArray: string[]): string {
        return `${this.bucketFolder}/${pathArray.join('/')}`;
    }
}