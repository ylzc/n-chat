<template>
	<div class="home">

	</div>
</template>

<script lang="ts">
	import { Component, Vue } from "vue-property-decorator";
	import { RegisterUserDto } from "@n-chat/common/es/dtos/register-user.dto";
	import axios from 'axios';

	@Component({
		components: {}
	})
	export default class HomePage extends Vue {

		model = new RegisterUserDto();

		async submit() {
			await axios.post('/register', this.model);
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
