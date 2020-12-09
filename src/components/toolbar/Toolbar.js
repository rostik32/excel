import { ExcelComponent } from '../../core/ExcelComponent';

export class Toolbar extends ExcelComponent {
  static className = 'excel__toolbar';
  name = 'Toolbar';

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      ...options,
    });
  }

  onClick(e) {
    console.log(e.target);
  }

  toHTML() {
    return `
      <div class="excel__toolbar-button excel-btn">
        <span class="material-icons">
          format_align_left
        </span>
      </div>

      <div class="excel__toolbar-button excel-btn">
        <span class="material-icons">
          format_align_center
        </span>
      </div>

      <div class="excel__toolbar-button excel-btn">
        <span class="material-icons">
          format_align_right
        </span>
      </div>

      <div class="excel__toolbar-button excel-btn">
        <span class="material-icons">
          format_bold
        </span>
      </div>

      <div class="excel__toolbar-button excel-btn">
        <span class="material-icons">
          format_italic
        </span>
      </div>

      <div class="excel__toolbar-button excel-btn">
        <span class="material-icons">
          format_underline
        </span>
      </div>
    `;
  }
}
