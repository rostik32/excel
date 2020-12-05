const CODES = {
  A: 65,
  Z: 90,
};

function createCol(col) {
  return `
    <div class="column">
      ${col}
    </div>
  `;
}

function createCell(content) {
  return `
    <div class="cell" contenteditable="true">${content}</div>
  `;
}

function createRow(content = '', index = '') {
  return `
    <div class="row">
      <div class="row-info">${index}</div>
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
