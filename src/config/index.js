import { apiBaseUrl } from '../environment/environment'

export const BASE_URL = `${apiBaseUrl}/api`

export const BASE_URL_IMAGE_PATH = `${apiBaseUrl}/avatars`
export const BASE_URL_IMAGE_THUMBNAILS_PATH = `${apiBaseUrl}/thumbnails`

export const TOKEN_KEY = 'access_token';
export const USER_KEY = '_u_k';

export const routeAccess = {
  admin: [
    // 'a',
    'settings',
    'login',
    'unauthorized',
    'change-password',
    'verify',
    'forgot-password',
    'project-category',
    'task-category',
    'status',
    'document-type',
    'roles',
    'users'
  ],
  manager: [
    'p',
    'settings',
    'login',
    'unauthorized',
    'change-password',
    'verify',
    'forgot-password',
    'project',
    'task',
  ],
};
