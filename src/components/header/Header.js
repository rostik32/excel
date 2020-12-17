import { ExcelComponent } from '../../core/ExcelComponent';
import { $ } from '@core/DOM';
import { changeTitle } from '../../redux/actions';
import { defaultTitle } from '../../constants';
import { debounce } from '../../core/utils';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options,
    });
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300);
  }

  onInput(e) {
    console.log('suka');
    const $target = $(e.target);
    this.$dispatch(changeTitle($target.text()));
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle;
    return `
      <input type="text" class="excel__header-input" value="${title}">

      <div>
        <div class="excel__header-button excel-btn">
          <span class="material-icons">
            delete
          </span>
        </div>

        <div class="excel__header-button excel-btn">
          <span class="material-icons">
            exit_to_app
          </span>
        </div>
      </div>
    `;
  }
}
