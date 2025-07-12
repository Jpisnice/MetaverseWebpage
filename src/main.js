import './style.css';
import { setupPlanInteractions } from './orbits.js';
import { SplitText
 } from 'gsap/SplitText';
 import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(SplitText, ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  setupPlanInteractions();
  
  // Pin the hero section until Three.js scroll animation is complete
  ScrollTrigger.create({
    trigger: '.hero',
    start: 'top top',
    end: 'bottom bottom',
    pin: true,
    pinSpacing: true,
    scrub: 1,
    onUpdate: (self) => {
      // Optional: Add any additional logic during the pin
      console.log('Hero section pinned, progress:', self.progress);
    },
    onComplete: () => {
      // Animation complete, hero section will unpin
      console.log('Hero section animation complete');
    }
  });
  
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