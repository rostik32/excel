import { ExcelComponent } from '../../core/ExcelComponent';
import { isCell, matrix, nextSelector, shouldResize } from './table.functions';
import { resizeHandler } from './table.resize';
import { createTable } from './table.template';
import { TableSelection } from './TableSelection';
import { $ } from '@core/DOM';
import * as actions from '@/redux/actions';
import { defaultStyles } from '../../constants';
import { parse } from '../../core/parse';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });
  }

  toHTML() {
    return createTable(20, this.store.getState());
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();

    this.selectCell(this.$root.find('[data-id="0:0"]'));

    this.$on('formula:input', text => {
      this.selection.current.attr('data-value', text).text(parse(text));
      this.updateTextInStore(text);
    });

    this.$on('formula:done', () => {
      this.selection.current.focus();
    });

    this.$on('toolbar:applyStyle', value => {
      this.selection.applyStyle(value);
      this.$dispatch(
        actions.applyStyle({
          value,
          ids: this.selection.selectedIds,
        })
      );
    });
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell);
    const styles = $cell.getStyle(Object.keys(defaultStyles));
    this.$dispatch(actions.changeStyles(styles));
    console.log('styles', styles);
  }

  async resizeTable(e) {
    try {
      const data = await resizeHandler(this.$root, e);
      this.$dispatch(actions.tableResize(data));
      console.log('table resize');
    } catch (error) {
      console.warn('resize error', error.message);
    }
  }

  onMousedown(e) {
    if (shouldResize(e)) {
      this.resizeTable(e);
    } else if (isCell(e)) {
      const $target = $(e.target);
      if (e.shiftKey) {
        const $cells = matrix($target, this.selection.current).map(id =>
          this.$root.find(`[data-id="${id}"]`)
        );
        this.selection.selectGroup($cells);
      } else {
        this.selectCell($target);
      }
    }
  }

  onKeydown(e) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown',
    ];

    const { key } = e;
    if (keys.includes(key) && !e.shiftKey) {
      e.preventDefault();
      const id = this.selection.current.id(true);
      const $next = this.$root.find(nextSelector(key, id));

      this.selectCell($next);
    }
  }

  updateTextInStore(value) {
    this.$dispatch(
      actions.changeText({
        id: this.selection.current.id(),
        value: value,
      })
    );
  }

  onInput(e) {
    // this.$emit('table:input', $(e.target));
    this.updateTextInStore($(e.target).text());
  }
}
