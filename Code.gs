/**
 * Backend Google Sheets para o app "Álbum Copa 2026".
 *
 * Como usar:
 * 1. Crie uma planilha no Google Sheets.
 * 2. Vá em Extensões > Apps Script.
 * 3. Cole este código no arquivo Code.gs.
 * 4. Clique em Implantar > Nova implantação.
 * 5. Tipo: App da Web.
 * 6. Executar como: você.
 * 7. Quem pode acessar: qualquer pessoa com o link.
 * 8. Copie a URL terminada em /exec e cole no app.
 */

const SHEET_STATE = 'estado_atual';
const SHEET_BACKUPS = 'backups';

function doGet(e) {
  const action = String(e.parameter.action || 'get');
  const callback = String(e.parameter.callback || '');

  let result;
  if (action === 'get') {
    result = getState_();
  } else {
    result = { ok: false, error: 'Ação GET inválida.' };
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
  const action = String(e.parameter.action || 'save');

  if (action !== 'save') {
    return json_({ ok: false, error: 'Ação POST inválida.' });
  }

  const raw = e.parameter.payload;
  if (!raw) {
    return json_({ ok: false, error: 'Payload vazio.' });
  }

  const payload = JSON.parse(raw);
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
    return { ok: true, payload: null };
  }

  return {
    ok: true,
    payload: JSON.parse(raw)
  };
}

function saveState_(payload) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const state = ensureSheet_(ss, SHEET_STATE, ['chave', 'valor']);
  state.getRange('A2').setValue('payload');
  state.getRange('B2').setValue(JSON.stringify(payload));

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
