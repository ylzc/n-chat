import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { ChatGateway } from './controllers/chat.gateway';
import { SpaceEntity } from './entities/space.entity';
import { UserEntity } from './entities/user.entity';
import { UserController } from './controllers/user.controller';

@Module({
	imports: [
		JwtModule.register({
			secret: 'yel',
		}),
		TypeOrmModule.forRoot({
			type: 'postgres',
			username: 'postgres',
			database: 'postgres',
			entities: [
				SpaceEntity,
				UserEntity,
			],
			synchronize: true,
		}),
		TypeOrmModule.forFeature([
			SpaceEntity,
			UserEntity,
		]),
	],
	controllers: [AppController, UserController],
	providers: [AppService, ChatGateway],
})
export class AppModule {
}
