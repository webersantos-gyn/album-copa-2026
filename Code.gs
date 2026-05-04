/**
 * Backend Google Sheets para o app "Álbum Copa 2026".
 * Versão corrigida para receber POST de formulário oculto.
 */

const SHEET_STATE = 'estado_atual';
const SHEET_BACKUPS = 'backups';

function doGet(e) {
  e = e || { parameter: {} };

  const action = String(e.parameter.action || 'get');
  const callback = String(e.parameter.callback || '');

  let result;

  if (action === 'get') {
    result = getState_();
  } else {
    result = {
      ok: false,
      error: 'Ação GET inválida.'
    };
  }

  const json = JSON.stringify(result);

  if (callback) {
    return ContentService
      .createTextOutput(`${callback}(${json});`)
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }

  return ContentService
    .createTextOutput(json)
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  e = e || { parameter: {}, postData: null };

  const action = String((e.parameter && e.parameter.action) || 'save');

  if (action !== 'save') {
    return json_({
      ok: false,
      error: 'Ação POST inválida.'
    });
  }

  let raw = '';

  if (e.parameter && e.parameter.payload) {
    raw = e.parameter.payload;
  } else if (e.postData && e.postData.contents) {
    raw = e.postData.contents;
  }

  if (!raw) {
    return json_({
      ok: false,
      error: 'Payload vazio.'
    });
  }

  let payload;
  try {
    payload = JSON.parse(raw);
  } catch (err) {
    return json_({
      ok: false,
      error: 'JSON inválido: ' + err.message
    });
  }

  saveState_(payload);

  return json_({
    ok: true,
    savedAt: new Date().toISOString(),
    summary: payload.summary || {}
  });
}

function getState_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ensureSheet_(ss, SHEET_STATE, ['chave', 'valor']);

  const raw = sheet.getRange('B2').getValue();

  if (!raw) {
    return {
      ok: true,
      payload: null
    };
  }

  try {
    return {
      ok: true,
      payload: JSON.parse(raw)
    };
  } catch (err) {
    return {
      ok: false,
      error: 'Conteúdo inválido em estado_atual!B2: ' + err.message
    };
  }
}

function saveState_(payload) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const state = ensureSheet_(ss, SHEET_STATE, ['chave', 'valor']);
  state.getRange('A1').setValue('chave');
  state.getRange('B1').setValue('valor');
  state.getRange('A2').setValue('payload');
  state.getRange('B2').setValue(JSON.stringify(payload));
  state.autoResizeColumns(1, 2);

  const backups = ensureSheet_(ss, SHEET_BACKUPS, [
    'data_hora',
    'total',
    'tenho',
    'faltam',
    'repetidas',
    'payload'
  ]);

  const summary = payload.summary || {};

  backups.appendRow([
    new Date(),
    summary.total || '',
    summary.tenho || '',
    summary.faltam || '',
    summary.repetidas || '',
    JSON.stringify(payload)
  ]);

  pruneBackups_(backups, 60);
}

function ensureSheet_(ss, name, headers) {
  let sheet = ss.getSheetByName(name);

  if (!sheet) {
    sheet = ss.insertSheet(name);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
  } else {
    const currentHeaders = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
    const isEmptyHeader = currentHeaders.every(v => !v);
    if (isEmptyHeader) {
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    }
  }

  return sheet;
}

function pruneBackups_(sheet, maxRows) {
  const last = sheet.getLastRow();
  const keepHeader = 1;
  const maxTotalRows = maxRows + keepHeader;

  if (last > maxTotalRows) {
    const rowsToDelete = last - maxTotalRows;
    sheet.deleteRows(2, rowsToDelete);
  }
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Teste manual opcional.
 * Rode esta função pelo botão Executar para verificar se o script consegue gravar na planilha.
 */
function testeSalvar() {
  saveState_({
    app: 'album-copa-2026',
    teste: true,
    updatedAt: new Date().toISOString(),
    summary: {
      total: 994,
      tenho: 1,
      faltam: 993,
      repetidas: 0
    },
    data: []
  });
}
