import Io from 'socket.io-client'
import uuid from "uuid";

export class NClient {

	static readonly map = new Map();

	static get(id: string = 'default') {
		return this.map.get(id)
	}

	private readonly server!: string;
	private readonly io!: SocketIOClient.Socket;

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

	init() {
		this.io.on('event', () => {
			console.log(arguments)
		});
		this.io.on('error', () => {
			this.io.close();
		});
	}

}
