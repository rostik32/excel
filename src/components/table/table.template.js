const CODES = {
  A: 65,
  Z: 90,
};

function createCol(col, index) {
  return `
    <div class="column" data-type="resizable" data-col="${index}">
      ${col}
      <div class="col-resize resize" data-resize="col"></div>
    </div>
  `;
}

function createCell(_, col) {
  return `
    <div class="cell" contenteditable="true" data-col="${col}"></div>
  `;
}

function createRow(content = '', index = '') {
  const resize = index
    ? '<div class="row-resize" data-resize="row"></div>'
    : '';
  return `
    <div class="row" data-type="resizable">
      <div class="row-info">
        ${index}
        ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `;
}

function toChar(_, i) {
  return String.fromCharCode(CODES.A + i);
}

export function createTable(rowsCount = 30) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];
  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(createCol)
    .join('');

  const cells = new Array(colsCount).fill('').map(createCell).join('');

  rows.push(createRow(cols));

  for (let i = 0; i < rowsCount; i++) {
    rows.push(createRow(cells, i + 1));
  }

  return rows.join('');
}
