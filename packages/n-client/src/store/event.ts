import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import store from './index';

@Module({
    store,
    name: 'n-chat-event',
    namespaced: true,
    dynamic: true
})
export class Event extends VuexModule {

    activeId = '';

    events: any[] = [];

    eventFilter: Map<string, any> = new Map();

    @Mutation
    changeActiveId(activeId: string) {
        if (this.activeId !== activeId) {
            this.events = [];
            this.eventFilter = new Map();
            this.activeId = activeId;
        }
    }

    @Mutation
    initEvents() {
        this.events = [];
        this.eventFilter = new Map();
    }

    @Mutation
    unshift(event: any) {
        this.events.unshift(event);
    }

    @Mutation
    push(event: any) {
        let ev = this.eventFilter.get(event.initId);
        if (!ev) {
            this.eventFilter.set(event.initId, event);
            this.events.push(event);
        }
        else {
            ev = Object.assign(ev, event);
        }
    }

    @Mutation
    concat(events: any[]) {
        this.events = this.events.concat(events);
    }

}

export const eventStore = getModule(Event);
