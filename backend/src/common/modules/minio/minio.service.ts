import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'minio';

@Injectable()
export class MinioService extends Client implements OnModuleInit {
  private readonly logger = new Logger(MinioService.name);
  private readonly defaultBucket: string;

  constructor(private readonly config: ConfigService) {
    const endPoint = config.getOrThrow<string>('MINIO_ENDPOINT');
    const port = config.get<number>('MINIO_PORT', 9000);
    const useSSL = config.get<string>('MINIO_USE_SSL', 'false') === 'true';

    super({
      endPoint,
      port,
      useSSL,
      accessKey: config.getOrThrow<string>('MINIO_APP_ACCESS_KEY'),
      secretKey: config.getOrThrow<string>('MINIO_APP_SECRET_KEY'),
    });

    this.defaultBucket = config.get<string>('MINIO_BUCKET', 'default');
  }

  async onModuleInit() {
    try {
      const exists = await this.bucketExists(this.defaultBucket);
      if (!exists) {
        await this.makeBucket(this.defaultBucket);
        this.logger.log(`Bucket "${this.defaultBucket}" created`);
      }
      this.logger.log(`Connected to MinIO at ${this.host}:${this.port}`);
    } catch (error) {
      this.logger.error('Failed to connect to MinIO', error);
      throw error;
    }
  }
}
