import { ExcelComponent } from '../../core/ExcelComponent';
import { $ } from '@core/DOM';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'],
      ...options,
    });
  }

  toHTML() {
    return `
      <div class="excel__formula-info">fx</div>
      <div id="formula-input" class="excel__formula-input" contenteditable="true" spellcheck="false"></div>
    `;
  }

  init() {
    super.init();

    this.$formula = this.$root.find('#formula-input');
    this.$on('table:select', $cell => {
      this.$formula.text($cell.data.value);
    });
  }

  storeChanged({ currentText }) {
    this.$formula.text(currentText);
  }

  onInput(e) {
    this.$emit('formula:input', $(e.target).text());
  }

  onKeydown(e) {
    const keys = ['Enter', 'Tab'];
    if (keys.includes(e.key)) {
      e.preventDefault();
      this.$emit('formula:done');
    }
  }
}
