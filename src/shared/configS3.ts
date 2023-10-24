import { S3 } from 'aws-sdk';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const bucketName = 'graduation-project-api';

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export const deleteAudio = (audioKeys: Array<{ Key: string }>) => {
  const deleteParam = {
    Bucket: bucketName,
    Delete: {
      //   Objects: [{ Key: 'a.txt' }, { Key: 'b.txt' }, { Key: 'c.txt' }],
      Objects: audioKeys,
    },
  };
  s3.deleteObjects(deleteParam, function (err, data) {
    if (err) console.log(err, err.stack);
    else console.log('delete', data);
  });
};
