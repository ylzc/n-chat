<template>
	<div class="home">
		<div>
			<input type="text" v-model="loginDto.account">
			<input type="text" v-model="loginDto.password">
		</div>
		<button @click="login">ok</button>
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
			await axios.post('/register', this.registerUserDto);
		}

		async login() {
			let {data} = await axios.post('/login', this.loginDto);
			localStorage.access_token = data.access_token;
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
