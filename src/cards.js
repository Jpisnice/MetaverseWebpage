import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    const leftCards = gsap.utils.toArray('.stats-column.left .stat-card');
    const rightCards = gsap.utils.toArray('.stats-column.right .stat-card');

    const xOffsets = {
        left: [-128, -64, 0], // Increased offsets
        right: [128, 64, 0]    // Increased offsets
    };

    leftCards.forEach((card, index) => {
        gsap.fromTo(card, {
            autoAlpha: 0,
            x: xOffsets.left[index] + 50,
            y: 50,
        }, {
            duration: 0.8,
            autoAlpha: 1,
            x: xOffsets.left[index],
            y: 0,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: card,
                start: 'top bottom-=100',
                toggleActions: 'play none none none',
            }
        });
    });

    rightCards.forEach((card, index) => {
        gsap.fromTo(card, {
            autoAlpha: 0,
            x: xOffsets.right[index] - 50,
            y: 50,
        }, {
            duration: 2,
            autoAlpha: 1,
            x: xOffsets.right[index],
            y: 0,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: card,
                start: 'top bottom-=100',
                toggleActions: 'play none none none',
            }
        });
    });
}); 