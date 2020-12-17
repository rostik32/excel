function createButton(options) {
  const meta = `
    data-type="button"
    data-value='${JSON.stringify(options.value)}'
  `;
  return `
    <div class="excel__toolbar-button excel-btn ${
      options.isActive ? 'active' : ''
    }"
      ${meta}
    >
      <span class="material-icons" ${meta}>
        ${options.icon}
      </span>
    </div>
  `;
}

export function createToolbar(state) {
  const buttons = [
    {
      icon: 'format_align_left',
      isActive: state['textAlign'] === 'left',
      value: { textAlign: 'left' },
    },
    {
      icon: 'format_align_center',
      isActive: state['textAlign'] === 'center',
      value: { textAlign: 'center' },
    },
    {
      icon: 'format_align_right',
      isActive: state['textAlign'] === 'right',
      value: { textAlign: 'right' },
    },
    {
      icon: 'format_bold',
      isActive: state['fontWeight'] === 'bold',
      value: { fontWeight: state['fontWeight'] === 'bold' ? 'normal' : 'bold' },
    },
    {
      icon: 'format_italic',
      isActive: state['fontStyle'] === 'italic',
      value: {
        fontStyle: state['fontStyle'] === 'italic' ? 'normal' : 'italic',
      },
    },
    {
      icon: 'format_underline',
      isActive: state['textDecoration'] === 'underline',
      value: {
        textDecoration:
          state['textDecoration'] === 'underline' ? 'none' : 'underline',
      },
    },
  ];

  return buttons.map(createButton).join('');
}
