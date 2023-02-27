import {
    GetObjectCommand,
    GetObjectCommandInput,
    GetObjectCommandOutput,
    ListObjectsCommand,
    ListObjectsCommandInput,
    ListObjectsCommandOutput,
    S3Client,
    S3ClientConfig
} from "@aws-sdk/client-s3";

export class S3Service {
    private readonly client: S3Client;

    constructor(config: S3ClientConfig) {
        this.client = new S3Client(config);
    }

    public async getObject(input: GetObjectCommandInput): Promise<GetObjectCommandOutput> {
        return this.client.send(new GetObjectCommand(input)).catch(err => err);
    }

    public async listObjects(input: ListObjectsCommandInput): Promise<ListObjectsCommandOutput> {
        return this.client.send(new ListObjectsCommand(input)).catch(err => err);
    }
}