<template>
	<div class="home">
		<a-form class="home-form">
			<a-form-item label="account" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
				<a-input v-model="model.account"/>
			</a-form-item>
			<a-form-item label="name" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
				<a-input v-model="model.name"/>
			</a-form-item>
			<a-form-item label="password" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
				<a-input v-model="model.password"/>
			</a-form-item>
			<a-form-item :wrapper-col="{ span: 12, offset: 5 }">
				<a-button type="primary" @click="submit">
					Submit
				</a-button>
			</a-form-item>
		</a-form>
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from "vue-property-decorator";
	import { Button, Form, Input } from 'ant-design-vue'
	import { RegisterUserDto } from "@n-chat/common/es/dtos/register-user.dto";
	import axios from 'axios';

	@Component({
		components: {
			AForm: Form,
			AFormItem: Form.Item,
			AInput: Input,
			AButton: Button
		}
	})
	export default class HomePage extends Vue {
		model = new RegisterUserDto();

		async submit() {
			await axios.post('/register', this.model)
		}
	}
</script>
<style lang="scss" scoped>
	.home {
		background-color: deepskyblue;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.home-form {
		width: 300px;
		background-color: #fff;
	}
</style>
