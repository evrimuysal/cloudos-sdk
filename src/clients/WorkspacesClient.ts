import { AxiosInstance } from 'axios';
import { Workspace, WorkspaceMember, CreateWorkspaceData } from '../types';

export class WorkspacesClient {
  constructor(private client: AxiosInstance) {}

  /**
   * List all workspaces for current user
   */
  async list(): Promise<Workspace[]> {
    const { data } = await this.client.get('/workspaces');
    return data;
  }

  /**
   * Get workspace by ID
   */
  async get(workspaceId: string): Promise<Workspace> {
    const { data } = await this.client.get(`/workspaces/${workspaceId}`);
    return data;
  }

  /**
   * Create new workspace
   */
  async create(workspaceData: CreateWorkspaceData): Promise<Workspace> {
    const { data } = await this.client.post('/workspaces', workspaceData);
    return data;
  }

  /**
   * Update workspace
   */
  async update(workspaceId: string, updates: Partial<Workspace>): Promise<Workspace> {
    const { data } = await this.client.patch(`/workspaces/${workspaceId}`, updates);
    return data;
  }

  /**
   * Delete workspace
   */
  async delete(workspaceId: string): Promise<void> {
    await this.client.delete(`/workspaces/${workspaceId}`);
  }

  /**
   * Get workspace members
   */
  async getMembers(workspaceId: string): Promise<WorkspaceMember[]> {
    const { data } = await this.client.get(`/workspaces/${workspaceId}/members`);
    return data;
  }

  /**
   * Invite member to workspace
   */
  async inviteMember(
    workspaceId: string,
    email: string,
    role: string
  ): Promise<WorkspaceMember> {
    const { data } = await this.client.post(`/workspaces/${workspaceId}/members`, {
      email,
      role,
    });
    return data;
  }

  /**
   * Update member role
   */
  async updateMemberRole(
    workspaceId: string,
    userId: string,
    role: string
  ): Promise<WorkspaceMember> {
    const { data } = await this.client.patch(
      `/workspaces/${workspaceId}/members/${userId}`,
      { role }
    );
    return data;
  }

  /**
   * Remove member from workspace
   */
  async removeMember(workspaceId: string, userId: string): Promise<void> {
    await this.client.delete(`/workspaces/${workspaceId}/members/${userId}`);
  }
}

