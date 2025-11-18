import { AxiosInstance } from 'axios';

export class StorageClient {
  constructor(private client: AxiosInstance) {}

  /**
   * Upload file
   */
  async upload(file: File | Buffer, folder?: string): Promise<{ key: string; url: string }> {
    const formData = new FormData();
    formData.append('file', file);

    const { data } = await this.client.post('/storage/upload', formData, {
      params: { folder },
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return data;
  }

  /**
   * Get signed URL for file
   */
  async getSignedUrl(key: string, expiresIn?: number): Promise<string> {
    const { data } = await this.client.get('/storage/signed-url', {
      params: { key, expiresIn },
    });
    return data.url;
  }

  /**
   * Get signed upload URL
   */
  async getSignedUploadUrl(
    filename: string,
    contentType: string,
    folder?: string
  ): Promise<{ url: string; key: string }> {
    const { data } = await this.client.get('/storage/signed-upload-url', {
      params: { filename, contentType, folder },
    });
    return data;
  }

  /**
   * Delete file
   */
  async delete(key: string): Promise<void> {
    await this.client.delete(`/storage/${key}`);
  }
}

