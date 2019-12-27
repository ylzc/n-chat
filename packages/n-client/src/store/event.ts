import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import store from './index';

@Module({
    store,
    name: 'n-chat-event',
    namespaced: true,
    dynamic: true
})
export class Event extends VuexModule {

    events: any[] = [];

    @Mutation
    init() {
        this.events = [];
    }

    @Mutation
    unshift(event: any) {
        this.events.unshift(event);
    }

    @Mutation
    push(event: any) {
        this.events.push(event);
    }

    @Mutation
    concat(events: any[]) {
        this.events = this.events.concat(events);
    }

}

export const eventStore = getModule(Event);
