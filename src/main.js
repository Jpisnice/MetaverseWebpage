import './style.css';
import { setupPlanInteractions } from './orbits.js';
import { SplitText
 } from 'gsap/SplitText';
 import { gsap } from 'gsap';

gsap.registerPlugin(SplitText);

document.addEventListener('DOMContentLoaded', () => {
  setupPlanInteractions();
  const text = new SplitText('.hero-text', {
    type: 'chars',
  });
  gsap.from(text.chars, {
    opacity: 0.1,
    duration: 0.5,
    ease: 'power2.inOut',
    stagger: 0.05,
  });
});