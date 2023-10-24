import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CleanAudioService } from './cleanAudio.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [CleanAudioService],
  exports: [CleanAudioService],
})
export class CleanAudioModule {}
