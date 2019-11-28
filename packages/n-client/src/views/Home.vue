<template>
	<div class="home">
		{{message.content}}
		<chat-edit v-model="message.content"></chat-edit>
		<button @click="send">ok</button>
	</div>
</template>

<script lang="ts">
	import { NClient } from "@/client";
	import ChatEdit from "@/components/ChatEdit.vue";
	import { EventTypes } from "@n-chat/common/es/utils/enums";
	import { CreateSpaceDto } from "@n-chat/common/es/dtos/create-space.dto";
	import { SendMessageDto } from "@n-chat/common/es/dtos/send-message.dto";
	import axios from 'axios'
	import uuid from "uuid";
	import { Component, Vue } from "vue-property-decorator";

	@Component({
		components: {ChatEdit}
	})
	export default class HomePage extends Vue {

		createSpaceDto: CreateSpaceDto = new CreateSpaceDto();
		message = new SendMessageDto();
		client!: NClient;

		async createSpace() {
			this.createSpaceDto.name = new Date().valueOf() + '';
			this.createSpaceDto.members = [];
			this.createSpaceDto.owner = '';
			await axios.post('space/create', this.createSpaceDto)
		}

		send() {
			const temp = this.message;
			temp.initId = uuid();
			// temp.content = 'hello ' + new Date().valueOf();
			temp.eventType = EventTypes.TEXT;
			temp.spaceId = '25c7a75c-3aee-42c7-9004-c2093fc44f35';
			this.client.sendMessage(temp);
		}

		async created() {
			// await axios.get('space/list-id-by-user');
			this.client = new NClient('ws://172.18.0.127:3000');
		}
	}
</script>
<style lang="scss" scoped>
	.home {
		width: 100%;
		height: 100%;
		/*display: flex;*/
		/*align-items: center;*/
		/*justify-content: center;*/
	}
</style>
