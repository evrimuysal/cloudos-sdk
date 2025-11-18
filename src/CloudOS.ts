import axios, { AxiosInstance } from 'axios';
import { AuthClient } from './clients/AuthClient';
import { WorkspacesClient } from './clients/WorkspacesClient';
import { AppsClient } from './clients/AppsClient';
import { StorageClient } from './clients/StorageClient';
import { AnalyticsClient } from './clients/AnalyticsClient';
import { NotificationsClient } from './clients/NotificationsClient';
import { WebhooksClient } from './clients/WebhooksClient';
import { CloudOSConfig } from './types';
import { CloudOSError } from './errors';

export class CloudOS {
  private client: AxiosInstance;
  private token: string | null = null;

  public auth: AuthClient;
  public workspaces: WorkspacesClient;
  public apps: AppsClient;
  public storage: StorageClient;
  public analytics: AnalyticsClient;
  public notifications: NotificationsClient;
  public webhooks: WebhooksClient;

  constructor(config: CloudOSConfig) {
    this.client = axios.create({
      baseURL: config.apiUrl || 'https://api.cloud-os.app',
      headers: {
        'Content-Type': 'application/json',
        ...(config.apiKey && { 'X-API-Key': config.apiKey }),
      },
    });

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        throw new CloudOSError(
          error.response?.data?.message || error.message,
          error.response?.status || 500,
          error.response?.data
        );
      }
    );

    // Initialize clients
    this.auth = new AuthClient(this.client);
    this.workspaces = new WorkspacesClient(this.client);
    this.apps = new AppsClient(this.client);
    this.storage = new StorageClient(this.client);
    this.analytics = new AnalyticsClient(this.client);
    this.notifications = new NotificationsClient(this.client);
    this.webhooks = new WebhooksClient(this.client);

    // Set token if provided
    if (config.token) {
      this.setToken(config.token);
    }
  }

  /**
   * Set authentication token
   */
  setToken(token: string): void {
    this.token = token;
    this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  /**
   * Clear authentication token
   */
  clearToken(): void {
    this.token = null;
    delete this.client.defaults.headers.common['Authorization'];
  }

  /**
   * Get current token
   */
  getToken(): string | null {
    return this.token;
  }
}

export default CloudOS;

