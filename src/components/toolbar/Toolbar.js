import { createToolbar } from './toolbar.template';
import { $ } from '@core/DOM';
import { ExcelStateComponent } from '../../core/ExcelStateComponents';
import { defaultStyles } from '../../constants';

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar';
  name = 'Toolbar';

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options,
    });
  }

  prepare() {
    this.initState(defaultStyles);
  }

  get template() {
    return createToolbar(this.state);
  }

  onClick(e) {
    const $target = $(e.target);
    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value);
      this.$emit('toolbar:applyStyle', value);
    }
  }

  storeChanged(changes) {
    this.setState(changes.currentStyles);
  }

  toHTML() {
    return this.template;
  }
}
