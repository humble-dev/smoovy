import {
  ElementParallaxItem, ParallaxController, VectorParallaxItem,
} from '../../src';

// Create visible element
const element = document.createElement('div');

// Create parallax item
const state = { x: 100, y: 300, width: 300, height: 300 };
const controller = new ParallaxController();
const vectorItem = new VectorParallaxItem({
  speed: { x: 0, y: 0.2 },
  state: () => state,
  on: {
    update: (position, progress) => {
      element.textContent = `${position.y.toFixed(2)}`;
      element.style.transform = `
        rotate(${360 * progress.y}deg)
      `;
    }
  }
});

const elementItem1 = new ElementParallaxItem(
  document.querySelector('.box1') as HTMLElement,
  {
    speed: 0.3,
    translate: false,
    culling: false,
    on: {
      update: (position, progress) =>  {
        document.querySelector('.box1') .textContent = `${progress.y * 100}%`;
      }
    }
  }
);

const elementItem2 = new ElementParallaxItem(
  document.querySelector('.box2') as HTMLElement,
  {
    speed: 0.9
  }
);

const elementItem3 = new ElementParallaxItem(
  document.querySelector('.box3') as HTMLElement,
  {
    speed: 0.5,
    mapShift: (shift) => {
      shift.x = shift.y;
      shift.y = 0;

      return shift;
    }
  }
);

controller.add(vectorItem);
controller.add(elementItem1);
controller.add(elementItem2);
controller.add(elementItem3);

element.style.position = 'absolute';
element.style.left = `${state.x}px`;
element.style.top = `${state.y}px`;
element.style.width = `${state.width}px`;
element.style.height = `${state.height}px`;
element.style.backgroundColor = '#7f8fa6';
element.style.textAlign = `center`;
element.style.lineHeight = `${state.height}px`;

document.body.append(element);

window.addEventListener('scroll', () => {
  controller.update({
    scrollPosX: window.scrollX,
    scrollPosY: window.scrollY,
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
    contentWidth: document.body.offsetWidth,
    contentHeight: document.body.offsetHeight
  });
});
