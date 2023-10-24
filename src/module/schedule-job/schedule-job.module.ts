import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ScheduleJobService } from './schedule-job.service';
import { CleanAudioModule } from '../clean-audio/cleanAudio.module';

@Module({
  imports: [ScheduleModule.forRoot(), CleanAudioModule],
  providers: [ScheduleJobService],
  exports: [ScheduleJobService],
})
export class ScheduleJobModule {}
