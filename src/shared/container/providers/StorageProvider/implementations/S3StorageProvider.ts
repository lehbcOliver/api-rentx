import {S3} from 'aws-sdk';
import {resolve} from 'path';
import { IStorageProvider } from '../IStorageProvider';
import upload from '../../../../../config/upload';
import fs from 'fs';
import mime from 'mime';

class S3StorageProvider implements IStorageProvider {
	private client: S3;

	constructor(){
		this.client = new S3({
			region: 'sa-east-1'
		});
	}
	async save(file: string, folder: string): Promise<string> {
		const originalname = resolve(upload.tmpFolder, file);
		const fileContent = await fs.promises.readFile(originalname);
		const ContentType = mime.getType(originalname);

		await this.client.putObject({
			Bucket: 'nomeBucket/folder',
			key: file,
			ACL: 'public-read',
			Body: fileContent,
			ContentType,
		}).promise();

		await fs.promises.unlink(originalname);
		return file;
	}
	async delete(file: string, folder: string): Promise<void> {
		await this.client.deleteObject({
			Bucket: 'nomeBucket/foder',
			key: file
		}).promise();
	}

}

export {S3StorageProvider};