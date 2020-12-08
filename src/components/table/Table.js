import { ExcelComponent } from '../../core/ExcelComponent';
import { shouldResize } from './table.functions';
import { resizeHandler } from './table.resize';
import { createTable } from './table.template';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
    });
  }

  toHTML() {
    return createTable();
  }

  onMousedown(e) {
    if (shouldResize(e)) {
      resizeHandler(this.$root, e);
    }
  }
}
