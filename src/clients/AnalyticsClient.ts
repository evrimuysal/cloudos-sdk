import { AxiosInstance } from 'axios';

export class AnalyticsClient {
  constructor(private client: AxiosInstance) {}

  /**
   * Get workspace analytics
   */
  async getWorkspaceAnalytics(workspaceId: string, period: string = '7d'): Promise<any> {
    const { data } = await this.client.get(`/workspaces/${workspaceId}/analytics`, {
      params: { period },
    });
    return data;
  }

  /**
   * Get app usage stats
   */
  async getAppUsageStats(workspaceId: string, appId: string): Promise<any> {
    const { data } = await this.client.get(`/workspaces/${workspaceId}/apps/${appId}/stats`);
    return data;
  }
}

