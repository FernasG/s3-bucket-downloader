import { FileManager, S3Service } from "./libraries";

interface S3DownloaderConfig {
    bucketName: string;
    awsConfig: { crendentials: { accessKeyId: string; secretAccessKey: string; }, region: string };
}

export class S3BucketDownloader {
    private readonly bucketName: string;
    private readonly s3Service: S3Service;
    private readonly fileManager: FileManager;

    constructor(config: S3DownloaderConfig) {
        const { awsConfig, bucketName } = config;

        this.bucketName = bucketName;
        this.s3Service = new S3Service(awsConfig);
        this.fileManager = new FileManager();
    }

    public async download(prefix?: string): Promise<boolean> {
        const s3ListObject = await this.s3Service.listObjects({ Bucket: this.bucketName, Prefix: prefix });

        if (s3ListObject.$metadata.httpStatusCode !== 200) return false;

        const { Contents } = s3ListObject;

        if (!Contents) return false;

        for (const object of Contents) {
            const { Key } = object;

            if (!Key) continue;

            const s3GetObject = await this.s3Service.getObject({ Bucket: this.bucketName, Key });

            if (!s3GetObject || !s3GetObject.Body) continue;

            const bodyText = await s3GetObject.Body.transformToString();

            const filepath = prefix ? this.removePrefixFromObjectKey(Key, prefix) : Key;

            this.fileManager.writeFile(filepath, bodyText);
        }

        return true;
    }

    private removePrefixFromObjectKey(Key: string, prefix: string): string {
        let filepath = Key.replace(prefix, '');

        if (filepath.startsWith('/')) filepath = filepath.substring(1);

        return filepath;
    }
}