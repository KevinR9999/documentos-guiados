export type SharedAccessSession = {
  username: string;
  expiresAt: number;
};

const STORAGE_KEY = 'astucia_shared_access';

export function saveSharedAccess(session: SharedAccessSession) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export function getSharedAccess(): SharedAccessSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as SharedAccessSession;

    if (
      !parsed ||
      typeof parsed.username !== 'string' ||
      typeof parsed.expiresAt !== 'number'
    ) {
      clearSharedAccess();
      return null;
    }

    return parsed;
  } catch {
    clearSharedAccess();
    return null;
  }
}

export function hasValidSharedAccess() {
  const session = getSharedAccess();
  if (!session) return false;

  const stillValid = session.expiresAt > Date.now();

  if (!stillValid) {
    clearSharedAccess();
    return false;
  }

  return true;
}

export function clearSharedAccess() {
  localStorage.removeItem(STORAGE_KEY);
}