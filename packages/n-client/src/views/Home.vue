<template>
	<div class="home">
		<div>
			<div v-for="space in spaces" :key="space.id" @click="select(space)">
				{{space.name}}
			</div>
		</div>
		<div>
			<div v-for="ev in events" :key="ev.id" v-html="ev.content"></div>
			<div style="position: absolute;bottom: 0;">
				<chat-edit v-model="message.content"/>
				<button @click="send">ok</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
    import { NClient } from '@/client';
    import ChatEdit from '@/components/ChatEdit.vue';
    import { eventStore } from '@/store/event';
    import { EventTypes } from '@n-chat/common/es/utils/enums';
    import { CreateSpaceDto } from '@n-chat/common/es/dtos/create-space.dto';
    import { SendMessageDto } from '@n-chat/common/es/dtos/send-message.dto';
    import axios from 'axios';
    import uuid from 'uuid';
    import { Component, Vue } from 'vue-property-decorator';

    @Component({
        components: {ChatEdit}
    })
    export default class HomePage extends Vue {

        createSpaceDto: CreateSpaceDto = new CreateSpaceDto();
        message = new SendMessageDto();
        client!: NClient;
        spaces: any[] = [];
        activeId = '';

        get events() {
            return eventStore.events;
        }

        async select(space: any) {
            this.activeId = space.id;
            this.$router.push({name: 'home', query: {id: this.activeId}});
        }

        async getList() {
            const {data: chats} = await axios.get('/space/list-chat-space');
            const {data: spaces} = await axios.get(
                '/space/ids',
                {
                    params: {
                        ids: (chats as any[]).map(c => c.spaceId)
                    }
                }
            );
            this.spaces = spaces;
        }

        send() {
            const temp = this.message;
            temp.initId = uuid();
            temp.eventType = EventTypes.TEXT;
            temp.spaceId = this.activeId;
            this.client.sendMessage(temp);
        }

        async created() {
            this.activeId = this.$route.query.id as string;
            this.getList();
            this.client = new NClient('ws://172.18.0.127:3000', 'n-chat', eventStore);
        }
    }
</script>
<style lang="scss" scoped>
	.home {
		width: 100%;
		height: 100%;
		display: flex;
		/*align-items: center;*/
		/*justify-content: center;*/
	}
</style>
