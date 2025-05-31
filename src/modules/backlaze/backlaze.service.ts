import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class BacklazeService {
  private authToken: string;
  private apiUrl: string;

  async authorize(): Promise<void> {
    const encodedCredentials = Buffer.from(
      `${process.env.BACKBLAZE_APPLICATION_KEY_ID}:${process.env.BACKBLAZE_APPLICATION_KEY}`,
    ).toString('base64');

    const response = await axios.get('https://api.backblazeb2.com/b2api/v2/b2_authorize_account', {
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
      },
    });

    this.authToken = response.data.authorizationToken;
    this.apiUrl = response.data.apiUrl;
  }

  async uploadFile(file: Express.Multer.File): Promise<any> {
    await this.authorize();

    const uploadUrlResponse = await axios.post(
      `${this.apiUrl}/b2api/v2/b2_get_upload_url`,
      { bucketId: process.env.BACKBLAZE_BUCKET_ID },
      { headers: { Authorization: this.authToken } },
    );

    const uploadUrl = uploadUrlResponse.data.uploadUrl;
    const uploadAuthToken = uploadUrlResponse.data.authorizationToken;

    const uploadResponse = await axios.post(uploadUrl, file.buffer, {
      headers: {
        Authorization: uploadAuthToken,
        'X-Bz-File-Name': file.originalname,
        'Content-Type': file.mimetype,
        'Content-Length': file.size,
        'X-Bz-Content-Sha1': 'do_not_verify',
      },
    });
    console.log("🚀 ~ BacklazeService ~ uploadFile ~ uploadResponse:", uploadResponse)

    return uploadResponse.data;
  }

  async getFile(fileName: string): Promise<string> {
    await this.authorize();

    const downloadUrl = `${process.env.BACKBLAZE_BASE_URL}/file/${process.env.BACKBLAZE_BUCKET_NAME}/${fileName}`;
    console.log("🚀 ~ BacklazeService ~ getFile ~ downloadUrl:", downloadUrl)
    return downloadUrl;
  }
}
