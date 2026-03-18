import Popover from '../src/Popover';

describe('Popover', () => {
  let btn;

  beforeEach(() => {
    btn = document.createElement('button');
    btn.className = 'btn';
    btn.dataset.title = 'Popover title';
    btn.dataset.content = 'And here\'s some amazing content. It\'s very engaging. Right?';
    document.body.append(btn);
    
    //Мокаем getBoundingClientRect для кнопки
    btn.getBoundingClientRect = jest.fn(() => ({
      top: 200,
      left: 200,
      width: 100,
      height: 40,
      bottom: 240,
      right: 300
    }));
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should show popover with correct content', () => {
    const popover = new Popover(btn);
    popover.show();

    const popoverEl = document.querySelector('.popover');
    const header = popoverEl.querySelector('.popover-header');
    const body = popoverEl.querySelector('.popover-body');

    const expected = {
      title: 'Popover title',
      content: 'And here\'s some amazing content. It\'s very engaging. Right?',
      hasHeader: true,
      hasBody: true
    };

    const actual = {
      title: header.textContent,
      content: body.textContent,
      hasHeader: !!header,
      hasBody: !!body
    };

    expect(actual).toEqual(expected);
  });

  test('should toggle popover on button click', () => {
    const popover = new Popover(btn);

    btn.click();
    const afterFirstClick = {
      exists: !!document.querySelector('.popover')
    };
    expect(afterFirstClick).toEqual({ exists: true });

    btn.click();
    const afterSecondClick = {
      exists: !!document.querySelector('.popover')
    };
    expect(afterSecondClick).toEqual({ exists: false });
  });

  test('should position popover centered above button', () => {
    const popover = new Popover(btn);
    popover.show();

    const popoverEl = document.querySelector('.popover');
    
    // Мокаем ширину popover
    popoverEl.getBoundingClientRect = jest.fn(() => ({
      width: 200, 
      height: 80
    }));

    // Пересчитываем позицию
    popover.position();


    const expectedLeft = 150;
    
    const actualLeft = parseInt(popoverEl.style.left);
    
    expect(actualLeft).toBe(expectedLeft);
    expect(parseInt(popoverEl.style.top)).toBeLessThan(200); 
  });
});