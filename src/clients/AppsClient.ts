import { AxiosInstance } from 'axios';
import { App, MarketplaceApp, WorkspaceApp } from '../types';

export class AppsClient {
  constructor(private client: AxiosInstance) {}

  /**
   * List marketplace apps
   */
  async listMarketplace(category?: string): Promise<MarketplaceApp[]> {
    const { data } = await this.client.get('/marketplace/apps', {
      params: { category },
    });
    return data;
  }

  /**
   * Get marketplace app details
   */
  async getMarketplaceApp(appId: string): Promise<MarketplaceApp> {
    const { data } = await this.client.get(`/marketplace/apps/${appId}`);
    return data;
  }

  /**
   * List installed apps for workspace
   */
  async listInstalled(workspaceId: string): Promise<WorkspaceApp[]> {
    const { data } = await this.client.get(`/workspaces/${workspaceId}/apps`);
    return data;
  }

  /**
   * Install app to workspace
   */
  async install(workspaceId: string, appId: string): Promise<WorkspaceApp> {
    const { data } = await this.client.post(`/workspaces/${workspaceId}/apps/${appId}`);
    return data;
  }

  /**
   * Uninstall app from workspace
   */
  async uninstall(workspaceId: string, appId: string): Promise<void> {
    await this.client.delete(`/workspaces/${workspaceId}/apps/${appId}`);
  }

  /**
   * Update app permissions
   */
  async updatePermissions(
    workspaceId: string,
    appId: string,
    permissions: any
  ): Promise<WorkspaceApp> {
    const { data } = await this.client.patch(
      `/workspaces/${workspaceId}/apps/${appId}/permissions`,
      { permissions }
    );
    return data;
  }
}

