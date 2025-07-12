# UI Task - Interactive Web Page

This project is a responsive and animated web page created as part of a UI development task. It features a hero section with text animation, animated cards, a features section with hover effects, a unique circular plan display, and other custom animations involving 3D elements.


## Implemented Features

Based on the codebase, the following features have been implemented:

- **3D Animated Background:** A dynamic background rendered with Three.js, featuring animated objects that float across the screen, adding depth and interactivity.
- **Hero Section:**
    - **Animated Heading:** The main title uses GSAP's `SplitText` for a character-by-character fade-in animation.
    - **Sticky Scrolling:** The hero section remains pinned during scroll, creating an immersive transition into the page content.
    - **Animated Stat Cards:** Six cards flank the central hero image, animating into view with a subtle upward motion and fade effect.
- **Interactive Plans Section:**
    - **Circular Orbit Animation:** Investment plans are displayed as "planets" that continuously rotate in concentric orbits.
    - **Hover Interaction:** Hovering over a planet pauses its orbit and displays its corresponding details in a central card.
- **Features Section:**
    - **Hover Effects:** Four feature cards with icons and titles that have custom scaling and shadow animations on hover.
- **About Section:** An informational section with a certificate image and descriptive text.
- **Smooth Scrolling:** Implemented for a smoother navigation experience throughout the page.

## Responsive Design

The application is designed to be fully responsive, ensuring a great user experience on all screen sizes. Key responsive design decisions include:

- **Fluid Typography and Sizing:** `clamp()` is used for the hero background image to ensure it scales smoothly across different viewport sizes.
- **Adaptive Navigation Bar:**
    - On tablets (screens < 992px), the contact information in the header is hidden to save space.
    - On mobile devices (screens < 600px), the navigation bar transforms into a stacked, centered layout for easy access.
- **Flexible Layouts:**
    - The **Features Section** adapts from a four-column layout on desktops to a two-column layout on tablets, and finally a single-column layout on mobile phones using Flexbox wrapping.
    - The overall structure uses responsive units and media queries to reflow content gracefully.


## Setup and Running the Project

To get a local copy up and running, follow these simple steps.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Jpisnice/MetaverseWebpage.git
    cd MetaverseWebpage
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Build for production:**
    It is recommended to build the project to see the final, optimized version.
    ```bash
    npm run build
    ```

4.  **Preview the production build:**
    This command starts a local server to preview the contents of the `dist` directory.
    ```bash
    npm run preview
    ```

## Project Structure

```
/
├── public/             # Static assets
├── src/                # Source files
│   ├── cards.js        # Logic for hero section stat cards
│   ├── main.js         # Main entry point, GSAP animations
│   ├── orbits.js       # Logic for the circular plans animation
│   ├── smooth-scroll.js # Smooth scrolling implementation
│   ├── style.css       # Main stylesheet with responsive design
│   └── threejs-setup.js # Three.js scene setup
├── index.html          # Main HTML file
├── package.json        # Project metadata and dependencies
└── vite.config.js      # Vite configuration
```
