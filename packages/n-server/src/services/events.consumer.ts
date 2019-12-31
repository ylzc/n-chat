import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('events')
export class EventsConsumer {

    @Process('sendSpaceStatus')
    async sendSpaceStatus(job: Job<unknown>) {
        return {
            time: Date.now()
        };
    }

}
