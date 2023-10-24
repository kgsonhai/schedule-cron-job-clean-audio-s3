import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { CronExpressionCustom } from 'src/utils/common';
import { CleanAudioService } from '../clean-audio/cleanAudio.service';

@Injectable()
export class ScheduleJobService {
  constructor(private readonly cleanAudioService: CleanAudioService) {}

  @Cron(CronExpressionCustom.EVERY_DAY_AT_THAT_TIME)
  runCrawlAudioEveryDay() {
    this.cleanAudioService.handleDeleteAudio();
  }
}
