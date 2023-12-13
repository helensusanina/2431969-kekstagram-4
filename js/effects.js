import {imagePreview} from './form.js';

const MAX_BLUR_VALUE = 3;
const MAX_BRIGHTNESS_VALUE = 3;
const MIN_BRIGHTNESS_VALUE = 1;
const MAX_VALUE_EFFECT= 100;
const MIN_VALUE_EFFECT = 0;
const MAX_GRAYSCALE_EFFECT = 1;
const MAX_SEPIA_EFFECT = 1;
const EFFECTS_STEP = 0.1;

const SLIDER = {
  MIN: 0,
  MAX: 100,
  STEP: 0.1
};

const slider = document.querySelector('.effect-level__slider');
const sliderWrapper = document.querySelector('.effect-level');
const effectValue = document.querySelector('.effect-level__value');
const effectList = document.querySelector('.effects__list');

const Effects = {
  chrome: {
    filter: 'grayscale',
    units: '',

    options: {
      range: {
        min: MIN_VALUE_EFFECT,
        max: MAX_GRAYSCALE_EFFECT,
      },
      start: MAX_GRAYSCALE_EFFECT,
      step: EFFECTS_STEP,
    }
  },
  sepia: {
    filter: 'sepia',
    units: '',

    options: {
      range: {
        min: MIN_VALUE_EFFECT,
        max: MAX_SEPIA_EFFECT,
      },
      start: MAX_SEPIA_EFFECT,
      step: EFFECTS_STEP,
    }
  },
  marvin: {
    filter: 'invert',
    units: '%',

    options: {
      range: {
        min: MIN_VALUE_EFFECT,
        max: MAX_VALUE_EFFECT,
      },
      start: MAX_VALUE_EFFECT,
      step: EFFECTS_STEP,
    }
  },
  phobos: {
    filter: 'blur',
    units: 'px',

    options: {
      range: {
        min: MIN_VALUE_EFFECT,
        max: MAX_BLUR_VALUE,
      },
      start: MAX_BLUR_VALUE,
      step: EFFECTS_STEP,
    }
  },
  heat: {
    filter: 'brightness',
    units: '',

    options: {
      range: {
        min: MIN_BRIGHTNESS_VALUE,
        max: MAX_BRIGHTNESS_VALUE ,
      },
      start: MAX_BRIGHTNESS_VALUE ,
      step: EFFECTS_STEP,
    }
  }
};

const initEffects = () => {
  const sliderConfig = {
    start: SLIDER.MAX,
    step: SLIDER.STEP,

    range: {
      min: SLIDER.MIN,
      max: SLIDER.MAX
    },

    connect: 'lower',

    format: {
      to: (value) => Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1),
      from: (value) => parseFloat(value)
    }
  };

  noUiSlider.create(slider, sliderConfig);
};


const onFilterButtonChange = (evt) => {
  const evtHandler = evt.target.value;

  if (evtHandler === 'none') {
    sliderWrapper.classList.add('hidden');
    imagePreview.style.filter = 'none';
    imagePreview.removeAttribute('class');
  }

  else {
    sliderWrapper.classList.remove('hidden');

    imagePreview.setAttribute('class', `effects__preview--${evtHandler}`);
    slider.noUiSlider.updateOptions(Effects[evtHandler].options);
    slider.noUiSlider.on('update', (values, handle) => {
      effectValue.value = values[handle];
      imagePreview.style.filter = `${Effects[evtHandler].filter}(${effectValue.value}${Effects[evtHandler].units})`;
    });
  }
};


export {onFilterButtonChange, initEffects, effectList, sliderWrapper};
