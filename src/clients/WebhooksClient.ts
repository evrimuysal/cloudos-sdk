import { AxiosInstance } from 'axios';
import { Webhook, CreateWebhookData } from '../types';

export class WebhooksClient {
  constructor(private client: AxiosInstance) {}

  /**
   * List webhooks
   */
  async list(workspaceId: string): Promise<Webhook[]> {
    const { data } = await this.client.get(`/workspaces/${workspaceId}/webhooks`);
    return data;
  }

  /**
   * Create webhook
   */
  async create(workspaceId: string, webhookData: CreateWebhookData): Promise<Webhook> {
    const { data } = await this.client.post(
      `/workspaces/${workspaceId}/webhooks`,
      webhookData
    );
    return data;
  }

  /**
   * Get webhook
   */
  async get(workspaceId: string, webhookId: string): Promise<Webhook> {
    const { data } = await this.client.get(
      `/workspaces/${workspaceId}/webhooks/${webhookId}`
    );
    return data;
  }

  /**
   * Update webhook
   */
  async update(
    workspaceId: string,
    webhookId: string,
    updates: Partial<Webhook>
  ): Promise<Webhook> {
    const { data } = await this.client.patch(
      `/workspaces/${workspaceId}/webhooks/${webhookId}`,
      updates
    );
    return data;
  }

  /**
   * Delete webhook
   */
  async delete(workspaceId: string, webhookId: string): Promise<void> {
    await this.client.delete(`/workspaces/${workspaceId}/webhooks/${webhookId}`);
  }

  /**
   * Test webhook
   */
  async test(workspaceId: string, webhookId: string): Promise<any> {
    const { data } = await this.client.post(
      `/workspaces/${workspaceId}/webhooks/${webhookId}/test`
    );
    return data;
  }
}

