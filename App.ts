import { S3BucketDownloader } from "./src/S3BucketDownloader";

(async () => {
    const config = {
        bucketName: process.env.BUCKET_NAME,
        awsConfig: {
            crendentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
            },
            region: process.env.AWS_REGION
        }
    };

    const prefix = process.env.S3_OBJECT_PREFIX;

    await new S3BucketDownloader(config).download(prefix);
})();