import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './controllers/app.controller';
import { SpaceController } from "./controllers/space.controller";
import { EventEntity } from "./entities/event.entity";
import { AppService } from './services/app.service';
import { ChatGateway } from './controllers/chat.gateway';
import { SpaceEntity } from './entities/space.entity';
import { UserEntity } from './entities/user.entity';
import { UserController } from './controllers/user.controller';
import { JwtStrategy } from "./services/jwt.strategy";
import { SpaceService } from "./services/space.service";
import { UserService } from "./services/user.service";

@Module({
	imports: [
		PassportModule,
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
				EventEntity
			],
			synchronize: true,
		}),
		TypeOrmModule.forFeature([
			SpaceEntity,
			UserEntity,
		]),
	],
	controllers: [
		AppController,
		UserController,
		SpaceController
	],
	providers: [
		AppService,
		ChatGateway,
		UserService,
		SpaceService,
		JwtStrategy
	],
})
export class AppModule {
}
