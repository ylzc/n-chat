import { getModule, Module, VuexModule } from "vuex-module-decorators";
import store from './index';

@Module({
	store,
	name: 'n-chat-user',
	namespaced: true,
	dynamic: true
})
export class User extends VuexModule {

}

export const userStore = getModule(User);
