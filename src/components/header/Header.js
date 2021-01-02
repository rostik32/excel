import { ExcelComponent } from '../../core/ExcelComponent';
import { $ } from '@core/DOM';
import { changeTitle } from '../../redux/actions';
import { defaultTitle } from '../../constants';
import { debounce, storage } from '../../core/utils';
import { ActiveRoute } from '../../core/routes/ActiveRoute';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options,
    });
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300);
  }

  onInput(e) {
    const $target = $(e.target);
    this.$dispatch(changeTitle($target.text()));
  }

  onClick(e) {
    const $target = $(e.target);
    if ($target.data.button === 'remove') {
      const design = confirm('Вы действительно хотите удалить эту таблицу?');

      if (design) {
        localStorage.removeItem('excel:' + ActiveRoute.param);
        ActiveRoute.navigate('');
      }
    } else if ($target.data.button === 'exit') {
      ActiveRoute.navigate('');
    }
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle;
    return `
      <input type="text" class="excel__header-input" value="${title}">

      <div>
        <div class="excel__header-button excel-btn" data-button="remove">
          <span class="material-icons">
            delete
          </span>
        </div>

        <div class="excel__header-button excel-btn" data-button="exit">
          <span class="material-icons">
            exit_to_app
          </span>
        </div>
      </div>
    `;
  }
}
