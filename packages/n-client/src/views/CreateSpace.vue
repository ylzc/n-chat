<template>
	<div style="display: flex;">
		<div>
			<div v-for="user in users" :key="user.id" @click="select(user)">
				{{user.name}}
			</div>
		</div>
		<div>
			<div>
				<div v-for="user in members" :key="user.id" @click="remove(user)">
					{{user.name}}
				</div>
			</div>
			<button @click="createSpace">ok</button>
		</div>
	</div>
</template>

<script lang="ts">
    import { CreateSpaceDto } from '@n-chat/common/es/dtos/create-space.dto';
    import { Component, Vue } from 'vue-property-decorator';
    import axios from 'axios';

    @Component({})
    export default class CreateSpace extends Vue {
        users: any[] = [];
        model = new CreateSpaceDto();
        members: any = {};

        remove() {

        }

        select(user: any) {
            this.$set(this.members, user.id, user);
        }

        async createSpace() {
            this.model.name = `Test:${Date.now()}`;
            this.model.members = Object.keys(this.members);
            await axios.post('/space/create', this.model);
        }

        async mounted() {
            const {data: users} = await axios.get('/user/list');
            this.users = users;
        }
    };
</script>

<style scoped>

</style>
