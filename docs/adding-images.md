How to add images to this project

1) Where to put images
- Add image files into `src/assets`.
- Prefer lower-case names without spaces (e.g., `burger.jpg`, `pizza.png`).
- Keep originals in a safe place; you can optimize copies for the web.

2) Recommended formats
- Photos: JPG or WebP (smaller file sizes). Use JPG for compatibility, WebP for better compression.
- Logos / simple graphics: PNG or SVG.

3) Two ways to use images in components

A. Static import (recommended for bundling and cache busting)
- Example (in a TSX file):

  import logo from '../assets/logo.JPG';

  <img src={logo} alt="Logo" />

- Works with Vite and TypeScript. The import resolves to a URL string.

B. Dynamic / external URLs
- If your image URL is an external link or comes from an API, you can pass it directly to components:

  const meal = { image: 'https://example.com/photo.jpg' };
  <MealCard meal={meal} />

- For local images without import, you can also reference `/src/assets/filename.jpg` but importing is preferred.

4) Example: Replace slider images in `src/pages/HomePage.tsx`
- Current imports (top of file):

  import slider1 from '../assets/slider_1.JPG';
  import slider3 from '../assets/slider_3.JPG';

- You can add your new images to `src/assets` and then import them similarly:

  import my1 from '../assets/my-photo-1.jpg';
  import my2 from '../assets/placeholder1.svg';

  const sliderImages = [my1, my2, slider3];

5) Optimizing images
- Resize to the actual display size (for large hero sliders use ~1200px wide).
- Compress using tools like Squoosh or `imagemin`.
- Consider `srcset` or picture element for responsive images (advanced).

6) Troubleshooting
- If an imported image fails, ensure the path is correct and you restarted the dev server if necessary.
- Webpack/Vite will show build-time errors for missing files.

7) Quick checklist before commit
- Filenames: lowercase, no spaces
- Remove large originals from repo if not needed, add to .gitignore and use optimized copies

That's it — add photos to `src/assets` and import them where needed! Feel free to tell me which images you'd like wired into the slider or meal cards and I can update the code for you.