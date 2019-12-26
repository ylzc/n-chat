<template>
	<div style="display: flex;">
		<div>
			<div v-for="user in users" :key="user.id" @click="select(user)">
				{{user.name}}
			</div>
		</div>
		<div>
			<div>
				<div v-for="user in model.members" :key="user.id" @click="remove(user)">
					{{user.name}}
				</div>
			</div>
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

        remove() {

        }

        select(user: any) {
            if (!this.model.members) {
                this.model.members = [];
            }
            this.model.members.push(user);
        }

        async mounted() {
            const {data: users} = await axios.get('/user/list');
            this.users = users;
        }
    };
</script>

<style scoped>

</style>
