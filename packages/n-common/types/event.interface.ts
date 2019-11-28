import { EventTypes } from "../utils/enums";

export interface EventInterface {
	id: string;
	eventType: EventTypes;
	content: string;
	createTime: number;
	updateTime: number;
	creator: { id: string };
	initId: string;
	space: { id: string };
}
