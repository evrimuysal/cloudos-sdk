import { AxiosInstance } from 'axios';
import { Notification } from '../types';

export class NotificationsClient {
  constructor(private client: AxiosInstance) {}

  /**
   * List notifications
   */
  async list(): Promise<Notification[]> {
    const { data } = await this.client.get('/notifications');
    return data;
  }

  /**
   * Mark notification as read
   */
  async markAsRead(notificationId: string): Promise<void> {
    await this.client.patch(`/notifications/${notificationId}/read`);
  }

  /**
   * Mark all notifications as read
   */
  async markAllAsRead(): Promise<void> {
    await this.client.patch('/notifications/read-all');
  }
}

