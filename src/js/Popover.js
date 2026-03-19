export default class Popover {
  constructor(btn) {
    this.btn = btn;
    this.popover = null;
    this.btn.addEventListener('click', () => this.toggle());
  }

  toggle() {
    if (this.popover) {
      this.popover.remove();
      this.popover = null;
    } else {
      this.show();
    }
  }

  show() {
    this.popover = document.createElement('div');
    this.popover.className = 'popover';
    
    const header = document.createElement('div');
    header.className = 'popover-header';
    header.textContent = this.btn.dataset.title;
    
    const body = document.createElement('div');
    body.className = 'popover-body';
    body.textContent = this.btn.dataset.content;
    
    this.popover.append(header, body);
    document.body.append(this.popover);
    
    this.position();
  }

  position() {
    const btnRect = this.btn.getBoundingClientRect();
    const popRect = this.popover.getBoundingClientRect();
    
    const left = btnRect.left + (btnRect.width / 2) - (popRect.width / 2);
    const top = btnRect.top - popRect.height - 10;
    
    this.popover.style.left = left + window.scrollX + 'px';
    this.popover.style.top = top + window.scrollY + 'px';
  }
}