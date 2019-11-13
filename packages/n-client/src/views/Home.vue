<template>
	<div class="home">
		<a-form class="home-form" :form="form" @submit="handleSubmit">
			<a-form-item label="Note" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
				<a-input v-decorator="rules[0]" v-model=""/>
			</a-form-item>
			<a-form-item label="Note" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
				<a-input v-decorator="rules[1]"/>
			</a-form-item>
			<a-form-item :wrapper-col="{ span: 12, offset: 5 }">
				<a-button type="primary" html-type="submit">
					Submit
				</a-button>
			</a-form-item>
		</a-form>
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from "vue-property-decorator";
	import { Button, Form, Input } from 'ant-design-vue'
	import { RegisterUserDto } from "@n-chat/common";

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

		rules = [
			['username', {rules: [{required: true, message: 'Please input your note!'}]}],
			['password', {rules: [{required: true, message: 'Please input your note!'}]}]
		];

		form = this.$form.createForm(this);

		handleSubmit() {

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
		width: 200px;
	}
</style>
