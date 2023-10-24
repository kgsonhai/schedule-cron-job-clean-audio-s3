import { Module } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ScheduleJobModule } from './module/schedule-job/schedule-job.module';
import { CleanAudioModule } from './module/clean-audio/cleanAudio.module';
import { mysqlOrmConfig } from './database/mysqlConfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(mysqlOrmConfig),
    ScheduleJobModule,
    CleanAudioModule,
  ],
})
export class AppModule {}
