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

function createCell(row) {
  return function (_, col) {
    return `
      <div
        class="cell"
        contenteditable="true"
        data-col="${col}"
        data-id="${row}:${col}"
        data-type="cell"
      >1
      </div>
    `;
  };
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

  rows.push(createRow(cols));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount).fill('').map(createCell(row)).join('');
    rows.push(createRow(cells, row + 1));
  }

  return rows.join('');
}
