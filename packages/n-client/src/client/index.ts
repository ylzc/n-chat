import { SendMessageDto } from "@n-chat/common/es/dtos/send-message.dto";
import { EventInterface } from "@n-chat/common/types/event.interface";
import Io from 'socket.io-client'
import uuid from "uuid";

export class NClient {

	static readonly map = new Map();

	static get(id: string = 'default') {
		return this.map.get(id)
	}

	private readonly server!: string;
	private readonly io!: SocketIOClient.Socket;
	private status = false;
	private resolve!: any;
	private reject!: any;

	private ready: Promise<any> = new Promise((resolve, reject) => {
		this.resolve = resolve;
		this.reject = reject;
	});

	constructor(server: string, id: string = 'default') {
		if (NClient.get(id)) {
			return NClient.get(id)
		} else if (server) {
			this.server = server;
			this.io = Io(
				'ws://172.18.0.127:3000',
				{
					query: {
						token: localStorage.access_token,
					},
					upgrade: true,
					transports: ['websocket'],
				},
			);
			this.init();
		} else {
			console.error('server 是必传项');
		}
	}

	private messages: SendMessageDto[] = [];

	onReady() {
		return this.ready;
	}

	init() {
		const io = this.io;
		io.on('init', () => {
			this.onIoInit();
		});
		io.on('event', (event: EventInterface) => {
			this.onIoEvent(event);
		});
		io.on('error', (e: any) => {
			console.log(e);
		});
		io.on('disconnect', (e: any) => {
			console.log('disconnect', e);
		});
	}

	private onIoInit() {
		this.status = true;
		this.resolve();
		this.sendMessages().catch(console.error);
	}

	private onIoEvent(event: EventInterface) {
	}

	async sendMessage(data: SendMessageDto) {
		if (this.status) {
			this.io.emit('send-message', data);
		} else {
			this.messages.push(data);
		}
	}

	async sendMessages() {
		const messages = this.messages;
		this.messages = [];
		try {
			this.io.emit('sendMessages', messages);
		} catch (e) {
			this.messages = messages.concat(this.messages);
		}
	}

}
