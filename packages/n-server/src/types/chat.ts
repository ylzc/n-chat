import { EventEntity } from "../entities/event.entity";

export type SpaceMessages = { [spaceId: string]: EventEntity[] }

export type HandleMessages = [EventEntity[], SpaceMessages]
