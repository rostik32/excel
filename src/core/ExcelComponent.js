import { DOMListener } from './DOMListener';

export class ExcelComponent extends DOMListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.unsubscribes = [];

    this.prepare();
  }

  // настраиваем наш компонент до init
  prepare() {}

  // Возвращает шаблон компонента
  toHTML() {
    return '';
  }

  // уведомляем слушателей про событие event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  // подписываемся на событие event
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubscribes.push(unsub);
  }

  // инициализируем компонент
  // добавляем DOM слушатели
  init() {
    this.initDOMListeners();
  }

  // Удаляем компонент и слушатели
  destroy() {
    this.removeDOMListeners();
    this.unsubscribes.forEach(unsub => unsub());
  }
}
