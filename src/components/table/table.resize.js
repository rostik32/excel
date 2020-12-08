import { $ } from '@core/DOM';

export function resizeHandler($root, e) {
  const $resizer = $(e.target);
  const type = $resizer.data.resize;
  const $parent = $resizer.closest('[data-type="resizable"]');
  const coords = $parent.getCoords();
  const index = $parent.data.col;
  const sideProp = type === 'col' ? 'bottom' : 'right';
  let value;

  $resizer.css({
    opacity: 1,
    [sideProp]: '-5000px',
  });

  document.onmousemove = e => {
    if (type === 'col') {
      const delta = e.pageX - coords.right;
      value = delta + coords.width;
      $resizer.css({ right: -delta + 'px' });
    } else {
      const delta = e.clientY - coords.bottom;
      value = delta + coords.height;
      $resizer.css({ bottom: -delta + 'px' });
    }
  };

  document.onmouseup = e => {
    document.onmousemove = null;
    document.onmouseup = null;

    $resizer.css({
      opacity: 0,
      right: 0,
      bottom: 0,
    });

    if (type === 'col') {
      $root
        .findAll(`[data-col="${index}"]`)
        .forEach(col => (col.style.width = value + 'px'));
    }

    if (type === 'row') {
      $parent.css({
        height: value + 'px',
      });
    }
  };
}
