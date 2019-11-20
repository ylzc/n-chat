<template>
	<div class="home">
		<button @click="createSpace">ok</button>
	</div>
</template>

<script lang="ts">
	import { CreateSpaceDto } from "@n-chat/common/es/dtos/create-space.dto";
	import { ListSpaceDto } from "@n-chat/common/es/dtos/list-space.dto";
	import { Component, Vue } from "vue-property-decorator";
	import axios from 'axios'

	@Component({
		components: {}
	})
	export default class HomePage extends Vue {

		createSpaceDto: CreateSpaceDto = new CreateSpaceDto();

		async createSpace() {
			this.createSpaceDto.name = new Date().valueOf() + '';
			this.createSpaceDto.members = [];
			this.createSpaceDto.owner = '';
			await axios.post('space/create', this.createSpaceDto)
		}

		async mounted() {
			await axios.get('space/list-user-in-members');
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
</style>
