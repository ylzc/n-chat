import { RegisterUserDto } from "@n-chat/common";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MoreThan, Repository } from "typeorm";
import { UserEntity } from "../entities/user.entity";
import pg from 'password-generator';
import crypto from 'crypto';

@Injectable()
export class UserService {

	@InjectRepository(UserEntity)
	protected readonly repo: Repository<UserEntity>;

	async list() {
		return await this.repo.find();
	}

	async create(data: RegisterUserDto) {
		try {
			const user = this.repo.create();
			user.account = data.account;
			// user.password = data.password;
			user.salt = pg();
			user.password = crypto.createHash('md5')
				.update(data.password + user.salt, 'utf8')
				.digest('hex');
			user.name = data.name;
			return await user.save();
		} catch (e) {
			throw new HttpException('创建用户失败', HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	async findByAccount(account: string) {
		return await this.repo.findOne({
			account
		})
	}

	checkPassword(password: string, user: UserEntity) {
		const md5 = crypto.createHash('md5')
			.update(password + user.salt, 'utf8')
			.digest('hex');
		return user.password === md5;
	}

	async syncUser(updateTime: number) {
		return await this.repo.find({
			where: {
				updateTime: MoreThan(new Date(updateTime || 0))
			}
		})
	}
}
