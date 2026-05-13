export type UserRole = 'admin' | 'user';

export interface AuthUser {
  id: number;
  workId: string;
  name: string;
  role: UserRole;
  status: string;
}

export interface AuthSession {
  token: string;
  user: AuthUser;
}

interface LoginResponse {
  token: string;
  user: AuthUser;
}

interface CurrentUserResponse {
  user: AuthUser;
}

const AUTH_STORAGE_KEY = 'ipra.auth.session';

export function loadAuthSession(): AuthSession | null {
  const serialized = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!serialized) {
    return null;
  }

  try {
    const parsed = JSON.parse(serialized) as Partial<AuthSession>;
    if (
      typeof parsed.token !== 'string' ||
      !parsed.user ||
      typeof parsed.user.workId !== 'string' ||
      typeof parsed.user.name !== 'string' ||
      typeof parsed.user.role !== 'string' ||
      typeof parsed.user.status !== 'string'
    ) {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      return null;
    }

    return parsed as AuthSession;
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
}

export function saveAuthSession(session: AuthSession) {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
}

export function clearAuthSession() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

export async function logoutAuthSession() {
  const session = loadAuthSession();

  try {
    if (session?.token) {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      });
    }
  } catch {
    // noop
  } finally {
    clearAuthSession();
  }
}

export function resolveRoleHome(role: UserRole) {
  return role === 'admin' ? '/admin/home' : '/home';
}

export async function loginWithCredentials(
  workId: string,
  password: string
): Promise<AuthSession> {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      workId,
      password,
    }),
  });

  const payload = (await response.json().catch(() => null)) as
    | LoginResponse
    | { message?: string }
    | null;

  if (!response.ok) {
    const message =
      payload && 'message' in payload && typeof payload.message === 'string'
        ? payload.message
        : '登录失败，请稍后再试';
    throw new Error(message);
  }

  return payload as LoginResponse;
}

export async function validateAuthSession(): Promise<AuthSession | null> {
  const session = loadAuthSession();
  if (!session?.token) {
    return null;
  }

  try {
    const response = await fetch('/api/auth/me', {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    });

    const payload = (await response.json().catch(() => null)) as
      | CurrentUserResponse
      | { message?: string }
      | null;

    if (!response.ok || !payload || !('user' in payload)) {
      clearAuthSession();
      return null;
    }

    const nextSession = {
      token: session.token,
      user: payload.user,
    };
    saveAuthSession(nextSession);

    return nextSession;
  } catch {
    clearAuthSession();
    return null;
  }
}
