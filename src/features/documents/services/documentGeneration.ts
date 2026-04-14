import { supabase } from '../../../lib/supabase';

type PersistGeneratedContentParams = {
  userId: string;
  accessToken: string;
  sessionId: string;
  module: string;
  scriptType: string;
  result: unknown;
};

function extractGeneratedContentText(result: any): string {
  const candidates = [
    result?.generated_script,
    result?.generatedScript,
    result?.script,
    result?.document,
    result?.content,
    result?.text,
    result?.result,
    result?.output,
    result?.finalDocument,
    result?.final_document,
    result?.generated_document,
    result?.generatedDocument,
    result?.data?.generated_script,
    result?.data?.generatedScript,
    result?.data?.script,
    result?.data?.document,
    result?.data?.content,
    result?.data?.text,
    result?.data?.result,
    result?.data?.output,
    result?.data?.generated_document,
    result?.data?.generatedDocument,
  ];

  const firstString = candidates.find(
    (value) => typeof value === 'string' && value.trim().length > 0
  );

  if (firstString) {
    return firstString.trim();
  }

  try {
    return JSON.stringify(result, null, 2);
  } catch {
    return String(result ?? '');
  }
}

async function getAuthenticatedSession() {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    throw error;
  }

  if (!session?.access_token) {
    throw new Error('No se encontro el access token del usuario actual.');
  }

  return session;
}

async function persistGeneratedContentBestEffort({
  userId,
  accessToken,
  sessionId,
  module,
  scriptType,
  result,
}: PersistGeneratedContentParams) {
  try {
    const rawScript = extractGeneratedContentText(result);

    if (!rawScript.trim()) {
      console.warn('No se encontro texto utilizable para guardar en generated_scripts.');
      return;
    }

    const { data: savedScript, error: saveError } = await supabase
      .from('generated_scripts')
      .insert({
        user_id: userId,
        module,
        script_type: scriptType,
        input_context: {
          sessionId,
          source: 'documentGenerationService',
          original_result: result,
        },
        raw_script: rawScript,
      })
      .select('id')
      .single();

    if (saveError) {
      console.error('Error guardando contenido en generated_scripts:', saveError);
      return;
    }

    if (!savedScript?.id) {
      console.warn('No se obtuvo scriptId despues de guardar el contenido.');
      return;
    }

    const { error: promoteError } = await supabase.functions.invoke(
      'promote-script-to-global',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: { scriptId: savedScript.id },
      }
    );

    if (promoteError) {
      console.error('Error promoviendo contenido a aprendizaje global:', promoteError);
    }
  } catch (error) {
    console.error('Error inesperado al persistir el contenido generado:', error);
  }
}

export async function generateIdealClientDocument(sessionId: string) {
  const session = await getAuthenticatedSession();

  const accessToken = session.access_token;
  const userId = session.user?.id;

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

  if (userId) {
    await persistGeneratedContentBestEffort({
      userId,
      accessToken,
      sessionId,
      module: 'ideal_client_manifesto',
      scriptType: 'ideal_client_document',
      result: data,
    });
  } else {
    console.warn('No se encontro userId para guardar el documento de cliente ideal.');
  }

  return data;
}

export async function generateInventoryOfSelfDocument(sessionId: string) {
  const session = await getAuthenticatedSession();

  const accessToken = session.access_token;
  const userId = session.user?.id;

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

  if (userId) {
    await persistGeneratedContentBestEffort({
      userId,
      accessToken,
      sessionId,
      module: 'inventory_of_self',
      scriptType: 'inventory_of_self_document',
      result: data,
    });
  } else {
    console.warn('No se encontro userId para guardar el documento de inventario del ser.');
  }

  return data;
}

export async function generateReelsShortDocument(sessionId: string) {
  const session = await getAuthenticatedSession();

  const accessToken = session.access_token;
  const userId = session.user?.id;

  const { data, error } = await supabase.functions.invoke(
    'generate-reels-short',
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

  if (userId) {
    await persistGeneratedContentBestEffort({
      userId,
      accessToken,
      sessionId,
      module: 'reels_scripts',
      scriptType: 'short',
      result: data,
    });
  } else {
    console.warn('No se encontro userId para guardar el guion corto.');
  }

  return data;
}

export async function generateReelsAdvancedDocument(sessionId: string) {
  const session = await getAuthenticatedSession();

  const accessToken = session.access_token;
  const userId = session.user?.id;

  const { data, error } = await supabase.functions.invoke(
    'generate-reels-advanced',
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

  if (userId) {
    await persistGeneratedContentBestEffort({
      userId,
      accessToken,
      sessionId,
      module: 'reels_scripts',
      scriptType: 'advanced',
      result: data,
    });
  } else {
    console.warn('No se encontro userId para guardar el guion avanzado.');
  }

  return data;
}

export async function generateStrategicManifestoDocument(sessionId: string) {
  const session = await getAuthenticatedSession();

  const accessToken = session.access_token;
  const userId = session.user?.id;

  const { data, error } = await supabase.functions.invoke(
    'generate-strategic-manifesto',
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

  if (userId) {
    await persistGeneratedContentBestEffort({
      userId,
      accessToken,
      sessionId,
      module: 'strategic_manifesto',
      scriptType: 'strategic_manifesto_document',
      result: data,
    });
  } else {
    console.warn('No se encontro userId para guardar el manifiesto estrategico.');
  }

  return data;
}