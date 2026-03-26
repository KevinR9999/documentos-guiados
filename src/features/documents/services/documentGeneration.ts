import { supabase } from '../../../lib/supabase';
import { ensureAnonymousSession } from '../../auth/ensureAnonymousSession';

export async function generateIdealClientDocument(sessionId: string) {
  const session = await ensureAnonymousSession();

  const accessToken = session.access_token;

  if (!accessToken) {
    throw new Error('No se encontro el access token del usuario actual.');
  }

  const { data, error } = await supabase.functions.invoke(
    'generate-ideal-client',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: { sessionId },
    }
  );

  if (error) {
    throw error;
  }

  return data;
}

export async function generateInventoryOfSelfDocument(sessionId: string) {
  const session = await ensureAnonymousSession();

  const accessToken = session.access_token;

  if (!accessToken) {
    throw new Error('No se encontro el access token del usuario actual.');
  }

  const { data, error } = await supabase.functions.invoke(
    'generate-inventory-of-self',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: { sessionId },
    }
  );

  if (error) {
    throw error;
  }

  return data;
}