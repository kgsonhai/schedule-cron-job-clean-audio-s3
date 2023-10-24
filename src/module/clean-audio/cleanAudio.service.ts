import { Injectable } from '@nestjs/common';
import { deleteAudio } from 'src/shared/configS3';
import { DataSource } from 'typeorm';

@Injectable()
export class CleanAudioService {
  constructor(private readonly dataSource: DataSource) {}
  async hasDataOnYesterday() {
    const sql = `
        SELECT *
        FROM scores
        INNER JOIN sessions ON sessions.id = scores.session_id
        WHERE DATE(sessions.finished_time) = DATE(CURRENT_DATE - INTERVAL 1 DAY);
      `;

    const result = await this.dataSource.query(sql);
    return result.length > 0;
  }

  private async getAudioBefore2days() {
    const sql = `
        SELECT *
        FROM scores
        INNER JOIN sessions ON sessions.id = scores.session_id
        WHERE DATE(sessions.finished_time) <= DATE(CURRENT_DATE - INTERVAL 2 DAY);    
      `;

    const result = await this.dataSource.query(sql);
    return result;
  }

  async handleDeleteAudio() {
    console.log('call handle delete audio');
    if (!(await this.hasDataOnYesterday())) return;
    console.log('inprogess handle delete audio every day');
    const audios = (await this.getAudioBefore2days()) || [];
    const customAudios = audios
      .map((article) => ({
        Key: `${article.article_id}.mp3`,
      }))
      .filter(Boolean);

    if (customAudios.length && this.hasDataOnYesterday)
      deleteAudio(customAudios);
  }
}
