import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class EventsQueueService {
    constructor(@InjectQueue('events')
                private readonly queue: Queue) {
    }

    async sendSpaceStatus(data?: any) {
        return await this.queue.add(
            'sendSpaceStatus',
            data,
            {
                removeOnComplete: true,
            }
        );
    }
}
