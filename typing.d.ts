namespace NodeJS {
    interface ProcessEnv {
        BUCKET_NAME: string;
        S3_OBJECT_PREFIX: string;
        AWS_ACCESS_KEY_ID: string;
        AWS_SECRET_ACCESS_KEY: string;
        AWS_REGION: string;
    }
}