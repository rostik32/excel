import { defaultStyles } from '../../constants';
import { parse } from '../../core/parse';
import { toInlineStyles } from '../../core/utils';

const CODES = {
  A: 65,
  Z: 90,
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function createCol({ col, index, width }) {
  return `
    <div
      class="column"
      data-type="resizable"
      data-col="${index}"
      style="width: ${width}"
    >
      ${col}
      <div class="col-resize resize" data-resize="col"></div>
    </div>
  `;
}

function createCell(state, row) {
  return function (_, col) {
    const width = getWidth(state.colState, col);
    const id = `${row}:${col}`;
    const data = state.dataState[id];
    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id],
    });
    return `
      <div
        class="cell"
        contenteditable="true"
        data-col="${col}"
        data-id="${id}"
        data-type="cell"
        data-value="${data || ''}"
        style="${styles}; width: ${width}"
      >
        ${parse(data) || ''}
      </div>
    `;
  };
}

function createRow(content = '', index = '', state) {
  const height = getHeight(state, index);
  const resize = index
    ? '<div class="row-resize" data-resize="row"></div>'
    : '';
  return `
    <div
      class="row"
      data-type="resizable"
      data-row="${index}"
      style="height: ${height}"
    >
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

function getHeight(state, index) {
  return (state[index] || DEFAULT_HEIGHT) + 'px';
}

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px';
}

function withWidthFrom(state) {
  return function (col, index) {
    return {
      col,
      index,
      width: getWidth(state.colState, index),
    };
  };
}

export function createTable(rowsCount = 30, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];
  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(withWidthFrom(state))
    .map(createCol)
    .join('');

  rows.push(createRow(cols, '', {}));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
      .fill('')
      .map(createCell(state, row))
      .join('');
    rows.push(createRow(cells, row + 1, state.rowState));
  }

  return rows.join('');
}
