import { AxiosInstance } from 'axios';
import { User, LoginCredentials, RegisterData } from '../types';

export class AuthClient {
  constructor(private client: AxiosInstance) {}

  /**
   * Login with email and password
   */
  async login(credentials: LoginCredentials): Promise<{ token: string; user: User }> {
    const { data } = await this.client.post('/auth/login', credentials);
    return data;
  }

  /**
   * Register new user
   */
  async register(userData: RegisterData): Promise<{ token: string; user: User }> {
    const { data } = await this.client.post('/auth/register', userData);
    return data;
  }

  /**
   * Get current user
   */
  async getCurrentUser(): Promise<User> {
    const { data } = await this.client.get('/auth/me');
    return data;
  }

  /**
   * Logout
   */
  async logout(): Promise<void> {
    await this.client.post('/auth/logout');
  }
}

