import { RegisterUserDto } from "@n-chat/common";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "../entities/user.entity";

@Injectable()
export class UserService extends TypeOrmCrudService<UserEntity> {

	@InjectRepository(UserEntity)
	protected readonly repo: Repository<UserEntity>;

	async create(data: RegisterUserDto) {
		const user = this.repo.create();
		user.account = data.account;
		user.password = data.password;
		user.name = data.name;
		return await user.save();
	}

	async findByAccount(account: string) {
		return await this.repo.findOne({
			account
		})
	}
}
