import { supabase } from '../../../lib/supabase';
import { ensureAnonymousSession } from '../../auth/ensureAnonymousSession';

export type DocumentSessionStatus = 'draft' | 'completed';

export type DocumentSessionRow = {
  id: string;
  user_id: string;
  flow_id: string;
  status: DocumentSessionStatus;
  current_step: number;
  title: string | null;
  answers: Record<string, string>;
  generated_content: unknown;
  rendered_content: string | null;
  created_at: string;
  updated_at: string;
};

type SaveDraftPayload = {
  currentStep: number;
  answers: Record<string, string>;
  status?: DocumentSessionStatus;
};

export async function getLatestDraftSession(flowId: string) {
  const session = await ensureAnonymousSession();

  const { data, error } = await supabase
    .from('document_sessions')
    .select('*')
    .eq('user_id', session.user.id)
    .eq('flow_id', flowId)
    .eq('status', 'draft')
    .order('updated_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data as DocumentSessionRow | null;
}

export async function createDraftSession(flowId: string, title?: string) {
  const session = await ensureAnonymousSession();

  const { data, error } = await supabase
    .from('document_sessions')
    .insert({
      user_id: session.user.id,
      flow_id: flowId,
      status: 'draft',
      current_step: 0,
      title: title ?? null,
      answers: {},
    })
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  return data as DocumentSessionRow;
}

export async function getOrCreateDraftSession(flowId: string, title?: string) {
  const existing = await getLatestDraftSession(flowId);

  if (existing) {
    return existing;
  }

  return createDraftSession(flowId, title);
}

export async function saveDraftSession(
  sessionId: string,
  payload: SaveDraftPayload
) {
  const { data, error } = await supabase
    .from('document_sessions')
    .update({
      current_step: payload.currentStep,
      answers: payload.answers,
      status: payload.status ?? 'draft',
    })
    .eq('id', sessionId)
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  return data as DocumentSessionRow;
}

export async function getDocumentSessionById(sessionId: string) {
  const { data, error } = await supabase
    .from('document_sessions')
    .select('*')
    .eq('id', sessionId)
    .single();

  if (error) {
    throw error;
  }

  return data as DocumentSessionRow;
}