import { supabase } from '../../lib/supabase';

export async function ensureAnonymousSession() {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) {
    throw sessionError;
  }

  if (session) {
    return session;
  }

  const { data, error } = await supabase.auth.signInAnonymously();

  if (error) {
    throw error;
  }

  if (!data.session) {
    throw new Error('No se pudo crear la sesion anonima.');
  }

  return data.session;
}