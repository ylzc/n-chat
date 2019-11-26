<template>
	<div class="home">
		<div>
			<input type="text" v-model="loginDto.account">
			<input type="text" v-model="loginDto.password">
		</div>
		<button @click="login">ok</button>
		<button @click="submit">re</button>
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from "vue-property-decorator";
	import { RegisterUserDto } from "@n-chat/common/es/dtos/register-user.dto";
	import { LoginDto } from "@n-chat/common/es/dtos/login.dto";
	import axios from 'axios';

	@Component({
		components: {}
	})
	export default class LoginPage extends Vue {

		registerUserDto: RegisterUserDto = new RegisterUserDto();
		loginDto: LoginDto = new LoginDto();

		async submit() {
			let r = this.registerUserDto;
			r.password = 'admin';
			r.name = 'admin';
			r.account = 'admin';
			await axios.post('/register', r);
		}

		async login() {
			let {data} = await axios.post('/login', this.loginDto);
			localStorage.access_token = data.access_token;
			await this.$router.push('/')
		}

	}
</script>
<style lang="scss" scoped>
	.home {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.home-form {
		width: 300px;
	}
</style>
