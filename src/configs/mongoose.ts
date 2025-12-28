import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
	constructor(private readonly configService: ConfigService) {}

	createMongooseOptions(): MongooseModuleOptions {
		const mongooseOption = {
			uri: this.configService.get<string>('MONGODB_URI'),
			user: this.configService.get<string>('MONGODB_USER'),
			pass: this.configService.get<string>('MONGODB_PASS'),
		};

		const mongodbName = this.configService.get<string>('MONGODB_DBNAME');
		if (mongodbName) mongooseOption['dbName'] = mongodbName;
		return mongooseOption;
	}
}
