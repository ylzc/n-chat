import axios from 'axios';
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
    rightConcat(events: any[]) {
        events.forEach(event => {
            let ev = this.eventFilter.get(event.initId);
            if (!ev) {
                this.eventFilter.set(event.initId, event);
                this.events.push(event);
            }
            else {
                ev = Object.assign(ev, event);
            }
        });
    }

    @Action({rawError: true})
    async changeChat(activeId: string) {
        this.changeActiveId(activeId);
        const {data} = await axios.get('chat/list', {
            params: {
                spaceId: 'c7d746a7-ecdc-4d49-ac0f-2ea36c7e5bf9',
                step: 20,
                type: false
            }
        });
        this.rightConcat((data as any[]).reverse());
    }

}

export const eventStore = getModule(Event);
