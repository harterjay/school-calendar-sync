# Riptonic Design System Style Guide

A comprehensive style guide for creating consistent, professional interfaces across projects using the Riptonic design system.

**Quick Start**: This guide provides copy-paste ready code snippets for rapid prototyping. All examples work with Tailwind CSS or vanilla CSS.

## Table of Contents
- [Quick Setup](#quick-setup)
- [Color Palette](#color-palette)
- [Typography](#typography)
- [Layout & Spacing](#layout--spacing)
- [Visual Hierarchy & Page Structure](#visual-hierarchy--page-structure)
- [Components](#components)
- [Effects & Gradients](#effects--gradients)
- [Usage Guidelines](#usage-guidelines)

## Quick Setup

### For Tailwind CSS v4 (Recommended)

**1. Install Tailwind CSS v4:**
```bash
npm install tailwindcss@next @tailwindcss/postcss@next
```

**2. Create `postcss.config.mjs`:**
```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

**3. Update your `globals.css`** (see CSS Variables Setup section below for full code)

**Note:** Tailwind v4 uses CSS-based configuration via the `@theme` directive in your CSS file instead of a JavaScript config file. No `tailwind.config.js` file is needed.

### For Tailwind CSS v3 (Legacy)

**1. Install Tailwind CSS v3:**
```bash
npm install tailwindcss@^3 postcss autoprefixer
```

**2. Create `tailwind.config.js`:**
```js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        accent: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
  plugins: [],
}
```

**3. Create `postcss.config.js`:**
```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### CSS Variables Setup

#### For Tailwind CSS v4

Add this to your `globals.css`:

```css
@import "tailwindcss";

@theme {
  /* Riptonic Color System */
  --color-primary-50: #f8fafc;
  --color-primary-100: #f1f5f9;
  --color-primary-200: #e2e8f0;
  --color-primary-300: #cbd5e1;
  --color-primary-400: #94a3b8;
  --color-primary-500: #64748b;
  --color-primary-600: #475569;
  --color-primary-700: #334155;
  --color-primary-800: #1e293b;
  --color-primary-900: #0f172a;

  --color-accent-50: #eff6ff;
  --color-accent-100: #dbeafe;
  --color-accent-200: #bfdbfe;
  --color-accent-300: #93c5fd;
  --color-accent-400: #60a5fa;
  --color-accent-500: #3b82f6;
  --color-accent-600: #2563eb;
  --color-accent-700: #1d4ed8;
  --color-accent-800: #1e40af;
  --color-accent-900: #1e3a8a;

  --color-success-50: #f0fdf4;
  --color-success-100: #dcfce7;
  --color-success-200: #bbf7d0;
  --color-success-300: #86efac;
  --color-success-400: #4ade80;
  --color-success-500: #22c55e;
  --color-success-600: #16a34a;
  --color-success-700: #15803d;
  --color-success-800: #166534;
  --color-success-900: #14532d;

  /* Font Family */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  /* Border Radius */
  --radius-xl: 0.75rem;
  --radius-2xl: 1rem;
  --radius-3xl: 1.5rem;

  /* Spacing */
  --spacing-18: 4.5rem;
  --spacing-88: 22rem;

  /* Shadows */
  --shadow-sm: 0 4px 12px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 8px 25px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 20px 40px rgba(0, 0, 0, 0.15);
  --shadow-accent: 0 8px 25px rgba(59, 130, 246, 0.25);
}

:root {
  --background: #f8fafc;
  --foreground: #334155;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0f172a;
    --foreground: #f1f5f9;
  }
}

body {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%);
  min-height: 100vh;
  color: #334155;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Professional Loading Spinner */
.spinner {
  width: 1.75rem;
  height: 1.75rem;
  border: 3px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  border-top-color: #ffffff;
  animation: spin 1s linear infinite;
}

.spinner-accent {
  width: 1.75rem;
  height: 1.75rem;
  border: 3px solid rgba(59, 130, 246, 0.2);
  border-radius: 50%;
  border-top-color: #3b82f6;
  animation: spin 1s linear infinite;
}

.spinner-sm {
  width: 1rem;
  height: 1rem;
  border-width: 2px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-slide-in {
  animation: slideIn 0.3s ease-out;
}

.animate-slide-up {
  animation: slideUp 0.3s ease-out;
}

.animate-scale-in {
  animation: scaleIn 0.2s ease-out;
}
```

#### For Tailwind CSS v3 (Legacy)

Add this to your `globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* Colors */
  --primary-50: #f8fafc;
  --primary-100: #f1f5f9;
  --primary-200: #e2e8f0;
  --primary-300: #cbd5e1;
  --primary-400: #94a3b8;
  --primary-500: #64748b;
  --primary-600: #475569;
  --primary-700: #334155;
  --primary-800: #1e293b;
  --primary-900: #0f172a;

  --accent-500: #3b82f6;
  --accent-600: #2563eb;
  --accent-700: #1d4ed8;

  /* Spacing */
  --space-unit: 0.25rem; /* 4px base */

  /* Effects */
  --shadow-sm: 0 4px 12px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 8px 25px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 20px 40px rgba(0, 0, 0, 0.15);
  --shadow-accent: 0 8px 25px rgba(59, 130, 246, 0.25);

  /* Transitions */
  --transition-fast: 0.15s ease;
  --transition-base: 0.3s ease;
  --transition-slow: 0.5s ease;
}
```

## Color Palette

### Primary Colors (Slate Palette)
The foundation of the design system, used for text, borders, and backgrounds.

```css
/* Primary Slate Scale */
--primary-50: #f8fafc    /* Light backgrounds, subtle borders */
--primary-100: #f1f5f9   /* Card backgrounds, input backgrounds */
--primary-200: #e2e8f0   /* Borders, dividers */
--primary-300: #cbd5e1   /* Disabled states, placeholders */
--primary-400: #94a3b8   /* Muted text, icons */
--primary-500: #64748b   /* Secondary text */
--primary-600: #475569   /* Primary text */
--primary-700: #334155   /* Headers, emphasized text */
--primary-800: #1e293b   /* Dark headers, hero sections */
--primary-900: #0f172a   /* Code blocks, deep backgrounds */
```

### Accent Colors (Blue Palette)
Used for interactive elements, call-to-actions, and brand accents.

```css
/* Accent Blue Scale */
--accent-50: #eff6ff     /* Light blue backgrounds */
--accent-100: #dbeafe    /* Hover states for light elements */
--accent-200: #bfdbfe    /* Border accents */
--accent-300: #93c5fd    /* Disabled buttons */
--accent-400: #60a5fa    /* Secondary buttons */
--accent-500: #3b82f6    /* Primary buttons, links */
--accent-600: #2563eb    /* Button hover states */
--accent-700: #1d4ed8    /* Active states */
--accent-800: #1e40af    /* Dark button variants */
--accent-900: #1e3a8a    /* Deep accent elements */
```

### Success Colors (Green Palette)
Used for positive states, confirmations, and success indicators.

```css
/* Success Green Scale */
--success-50: #f0fdf4    /* Success backgrounds */
--success-100: #dcfce7   /* Light success states */
--success-200: #bbf7d0   /* Success borders */
--success-300: #86efac   /* Success icons */
--success-400: #4ade80   /* Success buttons */
--success-500: #22c55e   /* Primary success color */
--success-600: #16a34a   /* Success hover states */
--success-700: #15803d   /* Active success states */
--success-800: #166534   /* Dark success variants */
--success-900: #14532d   /* Deep success elements */
```

## Typography

### Font Stack
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

### Text Scales

#### Display Text (Hero Headlines)
```css
.text-display {
  font-size: 3rem;      /* 48px */
  font-weight: 700;     /* Bold */
  line-height: 1.1;     /* Tight leading */
  letter-spacing: -0.025em;
}

.text-display-lg {
  font-size: 4rem;      /* 64px */
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.025em;
}
```

#### Headings
```css
.text-h1 {
  font-size: 2.5rem;    /* 40px */
  font-weight: 700;
  line-height: 1.2;
}

.text-h2 {
  font-size: 2rem;      /* 32px */
  font-weight: 600;
  line-height: 1.25;
}

.text-h3 {
  font-size: 1.5rem;    /* 24px */
  font-weight: 600;
  line-height: 1.3;
}

.text-h4 {
  font-size: 1.25rem;   /* 20px */
  font-weight: 600;
  line-height: 1.4;
}
```

#### Body Text
```css
.text-body-lg {
  font-size: 1.125rem;  /* 18px */
  line-height: 1.6;
  font-weight: 400;
}

.text-body {
  font-size: 1rem;      /* 16px */
  line-height: 1.5;
  font-weight: 400;
}

.text-body-sm {
  font-size: 0.875rem;  /* 14px */
  line-height: 1.4;
  font-weight: 400;
}

.text-caption {
  font-size: 0.75rem;   /* 12px */
  line-height: 1.3;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

## Layout & Spacing

### Container System
```css
.container-sm { max-width: 640px; }   /* Small content */
.container-md { max-width: 768px; }   /* Medium content */
.container-lg { max-width: 1024px; }  /* Large content */
.container-xl { max-width: 1280px; }  /* Extra large content */
.container-2xl { max-width: 1536px; } /* Maximum width */
```

### Spacing Scale
Based on a 4px base unit for consistent spacing.

```css
/* Spacing tokens */
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
```

### Grid System
- Use CSS Grid or Flexbox for layouts
- 12-column grid for complex layouts
- 4px baseline grid for vertical rhythm

## Visual Hierarchy & Page Structure

### Page Layout Pattern

Standard page structure with proper spacing and hierarchy:

```jsx
// Tailwind + React Example
<div className="min-h-screen bg-gradient-to-br from-primary-50 via-primary-100 to-primary-200">
  {/* Hero Section */}
  <section className="pt-20 pb-16 px-6">
    <div className="max-w-4xl mx-auto text-center space-y-6">
      <h1 className="text-5xl md:text-6xl font-bold text-primary-800 tracking-tight">
        Your Hero Headline
      </h1>
      <p className="text-xl text-primary-600 max-w-2xl mx-auto">
        Supporting text that explains the value proposition
      </p>
      <div className="flex gap-4 justify-center pt-4">
        <button className="px-8 py-4 bg-gradient-to-r from-accent-500 to-accent-600 text-white font-semibold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
          Primary Action
        </button>
        <button className="px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl border-2 border-primary-200 hover:border-accent-500 hover:text-accent-600 transition-all duration-300">
          Secondary Action
        </button>
      </div>
    </div>
  </section>

  {/* Main Content Section */}
  <section className="pb-20 px-6">
    <div className="max-w-6xl mx-auto">
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg border border-primary-200/50 p-8 md:p-12">
        {/* Your main content here */}
      </div>
    </div>
  </section>
</div>
```

### Hero Section Patterns

#### Large Hero with Gradient Background
```html
<!-- Tailwind HTML -->
<div class="bg-gradient-to-br from-primary-800 via-primary-700 to-primary-600 text-white">
  <div class="max-w-6xl mx-auto px-6 py-24 md:py-32">
    <div class="max-w-3xl">
      <h1 class="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
        Transform Your Data
      </h1>
      <p class="text-xl md:text-2xl text-primary-100 mb-8 leading-relaxed">
        Professional tools for modern data workflows
      </p>
      <button class="px-8 py-4 bg-white text-primary-800 font-semibold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
        Get Started Free
      </button>
    </div>
  </div>
</div>
```

#### Compact Hero with Card
```html
<div class="bg-gradient-to-br from-primary-50 to-primary-100 py-16 px-6">
  <div class="max-w-4xl mx-auto text-center">
    <h1 class="text-4xl md:text-5xl font-bold text-primary-800 mb-4">
      Your Tool Name
    </h1>
    <p class="text-lg text-primary-600 mb-8">
      One-line description of what it does
    </p>
  </div>
</div>
```

### Content Section Patterns

#### Two-Column Feature Section
```html
<section class="py-20 px-6">
  <div class="max-w-6xl mx-auto">
    <div class="grid md:grid-cols-2 gap-8">
      <!-- Feature Card -->
      <div class="bg-white rounded-2xl p-8 border-2 border-primary-200 hover:border-accent-500 hover:shadow-lg transition-all duration-300">
        <div class="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mb-4">
          <!-- Icon -->
          <svg class="w-6 h-6 text-accent-600">...</svg>
        </div>
        <h3 class="text-2xl font-semibold text-primary-800 mb-3">
          Feature Title
        </h3>
        <p class="text-primary-600 leading-relaxed">
          Description of the feature and its benefits
        </p>
      </div>

      <!-- Repeat for more features -->
    </div>
  </div>
</section>
```

#### Form Section with Side-by-Side Layout
```html
<div class="max-w-6xl mx-auto px-6">
  <div class="grid md:grid-cols-2 gap-8">
    <!-- Instructions Column -->
    <div class="space-y-6">
      <h2 class="text-3xl font-bold text-primary-800">
        How It Works
      </h2>
      <div class="space-y-4">
        <div class="flex gap-4">
          <div class="w-8 h-8 bg-accent-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
            1
          </div>
          <div>
            <h3 class="font-semibold text-primary-800 mb-1">First Step</h3>
            <p class="text-primary-600">Description of the step</p>
          </div>
        </div>
        <!-- More steps -->
      </div>
    </div>

    <!-- Form Column -->
    <div class="bg-white rounded-2xl p-8 border-2 border-primary-200 shadow-lg">
      <form class="space-y-6">
        <!-- Form fields -->
      </form>
    </div>
  </div>
</div>
```

### Spacing Hierarchy Rules

**Vertical Spacing (Top to Bottom)**:
- Between page sections: `py-16` to `py-24` (4-6rem)
- Between section header and content: `mb-12` (3rem)
- Between major content blocks: `mb-8` (2rem)
- Between related items: `mb-4` or `space-y-4` (1rem)
- Between form fields: `space-y-6` (1.5rem)
- Inside cards/containers: `p-8` or `p-12` (2-3rem)

**Horizontal Spacing**:
- Page margins: `px-6` on mobile, `max-w-*` + `mx-auto` for centering
- Between buttons: `gap-4` (1rem)
- Between cards: `gap-6` or `gap-8` (1.5-2rem)
- Inside cards: `px-8` (2rem)

**Container Max Widths**:
- Text content: `max-w-4xl` (768px) - for readability
- Forms: `max-w-3xl` (672px)
- Full layouts: `max-w-6xl` (1152px) or `max-w-7xl` (1280px)
- Wide dashboards: `max-w-screen-2xl` (1536px)

### Typography Hierarchy in Context

**Hero Section**:
- Headline: `text-5xl md:text-7xl font-bold text-primary-800`
- Subheadline: `text-xl md:text-2xl text-primary-600`

**Content Sections**:
- Section title: `text-3xl font-bold text-primary-800 mb-8`
- Card title: `text-2xl font-semibold text-primary-800 mb-3`
- Body text: `text-base text-primary-600 leading-relaxed`
- Small text: `text-sm text-primary-500`

**Interactive Elements**:
- Button text: `font-semibold` (600 weight)
- Link text: `text-accent-600 hover:text-accent-700 font-medium`
- Labels: `text-sm font-medium text-primary-700 mb-2`

## Components

### Buttons

All button examples with both Tailwind and CSS approaches.

#### Primary Button

**Tailwind Version** (Recommended):
```jsx
<button className="px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white font-semibold rounded-xl shadow-lg shadow-accent-500/30 hover:shadow-xl hover:shadow-accent-500/40 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
  Primary Action
</button>
```

**CSS Version**:
```css
.btn-primary {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  border: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
}
```

#### Secondary Button

**Tailwind Version**:
```jsx
<button className="px-6 py-3 bg-white text-primary-600 font-semibold rounded-xl border-2 border-primary-200 hover:border-accent-500 hover:text-accent-600 hover:shadow-md transition-all duration-300">
  Secondary Action
</button>
```

**CSS Version**:
```css
.btn-secondary {
  background: white;
  color: #475569;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  border: 2px solid #e2e8f0;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  border-color: #3b82f6;
  color: #3b82f6;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
}
```

#### Ghost Button

**Tailwind Version**:
```jsx
<button className="px-6 py-3 text-primary-600 font-medium hover:bg-primary-50 rounded-xl transition-colors duration-200">
  Ghost Action
</button>
```

#### Danger Button

**Tailwind Version**:
```jsx
<button className="px-6 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 hover:shadow-lg transition-all duration-300">
  Delete
</button>
```

#### Button Sizes

```jsx
{/* Large */}
<button className="px-8 py-4 text-lg ...">Large Button</button>

{/* Medium (Default) */}
<button className="px-6 py-3 text-base ...">Medium Button</button>

{/* Small */}
<button className="px-4 py-2 text-sm ...">Small Button</button>
```

#### Loading Button State

**Tailwind Version**:
```jsx
<button disabled className="px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white font-semibold rounded-xl relative">
  <span className="opacity-0">Processing</span>
  <div className="absolute inset-0 flex items-center justify-center">
    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  </div>
</button>
```

### Cards

#### Basic Card

**Tailwind Version**:
```jsx
<div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg border border-primary-200/50 p-8">
  <h3 className="text-2xl font-semibold text-primary-800 mb-4">
    Card Title
  </h3>
  <p className="text-primary-600 leading-relaxed">
    Card content goes here
  </p>
</div>
```

**CSS Version**:
```css
.card {
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(8px);
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(226, 232, 240, 0.5);
}
```

#### Interactive Card (Hover Effect)

**Tailwind Version**:
```jsx
<div className="bg-white rounded-2xl p-6 border-2 border-primary-200 hover:border-accent-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
  <div className="flex items-start gap-4">
    <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center flex-shrink-0">
      {/* Icon */}
    </div>
    <div>
      <h3 className="text-xl font-semibold text-primary-800 mb-2">
        Card Title
      </h3>
      <p className="text-primary-600">
        Description text
      </p>
    </div>
  </div>
</div>
```

**CSS Version**:
```css
.card-interactive {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  border: 2px solid #e2e8f0;
  transition: all 0.3s ease;
  cursor: pointer;
}

.card-interactive:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  border-color: #3b82f6;
}
```

#### Dashboard Stats Card

**Tailwind Version**:
```jsx
<div className="bg-white rounded-2xl p-6 border-2 border-primary-200 shadow-sm">
  <div className="flex items-center justify-between mb-4">
    <h3 className="text-sm font-medium text-primary-500 uppercase tracking-wide">
      Total Users
    </h3>
    <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center">
      <svg className="w-5 h-5 text-accent-600">...</svg>
    </div>
  </div>
  <div className="flex items-baseline gap-2">
    <span className="text-4xl font-bold text-primary-800">
      2,847
    </span>
    <span className="text-sm font-medium text-green-600">
      +12.5%
    </span>
  </div>
  <p className="text-sm text-primary-500 mt-2">
    vs. last month
  </p>
</div>
```

#### Card with Gradient Border

**Tailwind Version**:
```jsx
<div className="relative p-[2px] bg-gradient-to-r from-accent-500 to-purple-500 rounded-2xl">
  <div className="bg-white rounded-2xl p-6">
    <h3 className="text-xl font-semibold text-primary-800 mb-2">
      Premium Feature
    </h3>
    <p className="text-primary-600">
      Content with a gradient border effect
    </p>
  </div>
</div>
```

### Forms

#### Input Fields

**Complete Form Field Example (Tailwind)**:
```jsx
<div className="space-y-2">
  <label htmlFor="email" className="block text-sm font-medium text-primary-700">
    Email Address
  </label>
  <input
    type="email"
    id="email"
    className="w-full px-4 py-3 bg-primary-50 border-2 border-primary-200 rounded-lg text-primary-800 placeholder-primary-400 focus:outline-none focus:border-accent-500 focus:bg-white focus:ring-4 focus:ring-accent-500/10 transition-all duration-200"
    placeholder="you@example.com"
  />
  <p className="text-sm text-primary-500">
    We'll never share your email
  </p>
</div>
```

**Input with Error State**:
```jsx
<div className="space-y-2">
  <label htmlFor="password" className="block text-sm font-medium text-primary-700">
    Password
  </label>
  <input
    type="password"
    id="password"
    className="w-full px-4 py-3 bg-primary-50 border-2 border-red-300 rounded-lg text-primary-800 focus:outline-none focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10 transition-all duration-200"
    placeholder="Enter password"
  />
  <p className="text-sm text-red-600 flex items-center gap-1">
    <svg className="w-4 h-4" fill="currentColor">...</svg>
    Password must be at least 8 characters
  </p>
</div>
```

**Input with Success State**:
```jsx
<input
  type="text"
  className="w-full px-4 py-3 bg-primary-50 border-2 border-green-300 rounded-lg text-primary-800 focus:outline-none focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10 transition-all duration-200"
/>
```

**CSS Version**:
```css
.input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #f8fafc;
}

.input:focus {
  outline: none;
  border-color: #3b82f6;
  background: white;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
```

#### Textarea

**Tailwind Version**:
```jsx
<textarea
  rows="4"
  className="w-full px-4 py-3 bg-primary-50 border-2 border-primary-200 rounded-lg text-primary-800 placeholder-primary-400 focus:outline-none focus:border-accent-500 focus:bg-white focus:ring-4 focus:ring-accent-500/10 transition-all duration-200 resize-none"
  placeholder="Enter your message..."
/>
```

#### Select Dropdown

**Tailwind Version**:
```jsx
<select className="w-full px-4 py-3 bg-primary-50 border-2 border-primary-200 rounded-lg text-primary-800 focus:outline-none focus:border-accent-500 focus:bg-white focus:ring-4 focus:ring-accent-500/10 transition-all duration-200 appearance-none cursor-pointer">
  <option>Select an option</option>
  <option>Option 1</option>
  <option>Option 2</option>
</select>
```

#### Checkbox

**Tailwind Version**:
```jsx
<label className="flex items-center gap-3 cursor-pointer group">
  <input
    type="checkbox"
    className="w-5 h-5 rounded border-2 border-primary-300 text-accent-500 focus:ring-4 focus:ring-accent-500/20 transition-all cursor-pointer"
  />
  <span className="text-primary-700 group-hover:text-primary-900">
    I agree to the terms and conditions
  </span>
</label>
```

#### Radio Buttons

**Tailwind Version**:
```jsx
<div className="space-y-3">
  <label className="flex items-center gap-3 cursor-pointer group">
    <input
      type="radio"
      name="plan"
      className="w-5 h-5 border-2 border-primary-300 text-accent-500 focus:ring-4 focus:ring-accent-500/20 cursor-pointer"
    />
    <div>
      <span className="font-medium text-primary-800 group-hover:text-primary-900">
        Free Plan
      </span>
      <p className="text-sm text-primary-500">
        Basic features
      </p>
    </div>
  </label>

  <label className="flex items-center gap-3 cursor-pointer group">
    <input
      type="radio"
      name="plan"
      className="w-5 h-5 border-2 border-primary-300 text-accent-500 focus:ring-4 focus:ring-accent-500/20 cursor-pointer"
    />
    <div>
      <span className="font-medium text-primary-800 group-hover:text-primary-900">
        Pro Plan
      </span>
      <p className="text-sm text-primary-500">
        All features included
      </p>
    </div>
  </label>
</div>
```

#### Complete Form Example

**Tailwind Version**:
```jsx
<form className="space-y-6">
  {/* Text Input */}
  <div className="space-y-2">
    <label htmlFor="name" className="block text-sm font-medium text-primary-700">
      Full Name
    </label>
    <input
      type="text"
      id="name"
      className="w-full px-4 py-3 bg-primary-50 border-2 border-primary-200 rounded-lg text-primary-800 placeholder-primary-400 focus:outline-none focus:border-accent-500 focus:bg-white focus:ring-4 focus:ring-accent-500/10 transition-all duration-200"
      placeholder="John Doe"
    />
  </div>

  {/* Email Input */}
  <div className="space-y-2">
    <label htmlFor="email" className="block text-sm font-medium text-primary-700">
      Email Address
    </label>
    <input
      type="email"
      id="email"
      className="w-full px-4 py-3 bg-primary-50 border-2 border-primary-200 rounded-lg text-primary-800 placeholder-primary-400 focus:outline-none focus:border-accent-500 focus:bg-white focus:ring-4 focus:ring-accent-500/10 transition-all duration-200"
      placeholder="you@example.com"
    />
  </div>

  {/* Submit Button */}
  <button
    type="submit"
    className="w-full px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white font-semibold rounded-xl shadow-lg shadow-accent-500/30 hover:shadow-xl hover:shadow-accent-500/40 hover:-translate-y-0.5 transition-all duration-300"
  >
    Submit Form
  </button>
</form>
```

#### Upload Areas

**Standard Upload Area (Tailwind)**:
```jsx
<div className="bg-primary-50 border-2 border-dashed border-primary-300 rounded-xl p-8 text-center hover:border-accent-500 hover:bg-primary-100 transition-all duration-300 cursor-pointer">
  <div className="flex flex-col items-center gap-3">
    <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center">
      <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
    </div>
    <div>
      <p className="font-semibold text-primary-800">
        Click to upload or drag and drop
      </p>
      <p className="text-sm text-primary-500 mt-1">
        CSV, XLSX, or JSON (MAX. 10MB)
      </p>
    </div>
  </div>
</div>
```

**Upload Area - Success State**:
```jsx
<div className="bg-green-50 border-2 border-solid border-green-300 rounded-xl p-8 text-center">
  <div className="flex flex-col items-center gap-3">
    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <div>
      <p className="font-semibold text-primary-800">
        File uploaded successfully
      </p>
      <p className="text-sm text-primary-600 mt-1">
        data.csv (2.4 MB)
      </p>
    </div>
  </div>
</div>
```

**Compact Upload Area** (for adding more files):
```jsx
<div className="bg-primary-50 border-2 border-dashed border-primary-300 rounded-lg p-4 hover:border-accent-500 hover:bg-accent-50 hover:scale-102 transition-all duration-300 cursor-pointer">
  <div className="flex items-center justify-center gap-2">
    <svg className="w-5 h-5 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
    <span className="text-sm font-medium text-primary-700">
      Add Another File
    </span>
  </div>
</div>
```

**CSS Version**:
```css
.upload-area {
  background: #f8fafc;
  border: 2px dashed #cbd5e1;
  border-radius: 0.75rem;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
}

.upload-area:hover {
  border-color: #3b82f6;
  background: #f1f5f9;
}

.upload-area.uploaded {
  border-color: #22c55e;
  background: #f0fdf4;
  border-style: solid;
}
```

### Notifications & Alerts

#### Alert Messages

**Success Alert (Tailwind)**:
```jsx
<div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-4 animate-slide-in">
  <div className="flex items-start gap-3">
    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <div className="flex-1">
      <h4 className="font-semibold text-green-800 mb-1">
        Success!
      </h4>
      <p className="text-sm text-green-700">
        Your changes have been saved successfully.
      </p>
    </div>
    <button className="text-green-600 hover:text-green-800">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</div>
```

**Error Alert (Tailwind)**:
```jsx
<div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4">
  <div className="flex items-start gap-3">
    <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </div>
    <div className="flex-1">
      <h4 className="font-semibold text-red-800 mb-1">
        Error
      </h4>
      <p className="text-sm text-red-700">
        There was a problem processing your request.
      </p>
    </div>
    <button className="text-red-600 hover:text-red-800">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</div>
```

**Warning Alert (Tailwind)**:
```jsx
<div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-4">
  <div className="flex items-start gap-3">
    <div className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    </div>
    <div className="flex-1">
      <h4 className="font-semibold text-yellow-800 mb-1">
        Warning
      </h4>
      <p className="text-sm text-yellow-700">
        This action cannot be undone.
      </p>
    </div>
  </div>
</div>
```

**Info Alert (Tailwind)**:
```jsx
<div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
  <div className="flex items-start gap-3">
    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <div className="flex-1">
      <h4 className="font-semibold text-blue-800 mb-1">
        Information
      </h4>
      <p className="text-sm text-blue-700">
        You have 3 pending invitations.
      </p>
    </div>
  </div>
</div>
```

#### Sticky Error Notification (Fixed Position)

**Tailwind Version**:
```jsx
<div className="fixed top-4 right-4 z-50 max-w-md bg-red-50 border-2 border-red-200 rounded-xl shadow-2xl shadow-red-500/20 backdrop-blur-sm">
  {/* Header */}
  <div
    className="bg-red-100 px-4 py-3 rounded-t-xl cursor-pointer hover:bg-red-200 transition-colors duration-200"
    onClick={() => setIsCollapsed(!isCollapsed)}
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">3</span>
        </div>
        <span className="font-semibold text-red-800">
          3 Errors Found
        </span>
      </div>
      <svg
        className={`w-5 h-5 text-red-600 transition-transform duration-200 ${isCollapsed ? 'rotate-180' : ''}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>

  {/* Content */}
  <div className={`max-h-80 overflow-y-auto transition-all duration-300 ${isCollapsed ? 'max-h-0' : ''}`}>
    <div className="p-4 space-y-3">
      <div className="text-sm text-red-700">
        <p className="font-medium">Error 1: Invalid format</p>
        <p className="text-red-600 mt-1">Details about the error...</p>
      </div>
      {/* More errors */}
    </div>
  </div>
</div>
```

**CSS Version**:
```css
.sticky-notification {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 50;
  max-width: 28rem;
  background: #fef2f2;
  border: 2px solid #fecaca;
  border-radius: 0.75rem;
  box-shadow: 0 20px 40px rgba(239, 68, 68, 0.15);
  backdrop-filter: blur(8px);
}

.sticky-notification-header {
  background: #fee2e2;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem 0.75rem 0 0;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.sticky-notification-header:hover {
  background: #fecaca;
}

.sticky-notification-content {
  max-height: 20rem;
  overflow-y: auto;
  transition: max-height 0.3s ease;
}

.sticky-notification-content.collapsed {
  max-height: 0;
  overflow: hidden;
}
```

#### Toast Notification

**Tailwind Version**:
```jsx
<div className="fixed bottom-4 right-4 bg-primary-800 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-slide-up">
  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
  <p className="font-medium">
    Processing complete!
  </p>
  <button className="ml-4 hover:bg-primary-700 rounded-lg p-1 transition-colors">
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>
</div>
```

#### Animation Classes

Add these to your CSS:
```css
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-in {
  animation: slideIn 0.3s ease-out;
}

.animate-slide-up {
  animation: slideUp 0.3s ease-out;
}
```

### Modals & Dialogs

#### Modal Overlay

**Tailwind Version**:
```jsx
{/* Backdrop */}
<div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4">
  {/* Modal */}
  <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden animate-scale-in">
    {/* Header */}
    <div className="px-6 py-4 border-b border-primary-200 flex items-center justify-between">
      <h3 className="text-xl font-semibold text-primary-800">
        Modal Title
      </h3>
      <button className="text-primary-400 hover:text-primary-600 transition-colors">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    {/* Content */}
    <div className="px-6 py-6 overflow-y-auto max-h-[calc(90vh-140px)]">
      <p className="text-primary-600 leading-relaxed">
        Modal content goes here...
      </p>
    </div>

    {/* Footer */}
    <div className="px-6 py-4 bg-primary-50 border-t border-primary-200 flex gap-3 justify-end">
      <button className="px-4 py-2 text-primary-600 font-medium hover:bg-primary-100 rounded-lg transition-colors">
        Cancel
      </button>
      <button className="px-4 py-2 bg-gradient-to-r from-accent-500 to-accent-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all">
        Confirm
      </button>
    </div>
  </div>
</div>
```

Add this animation to your CSS:
```css
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-scale-in {
  animation: scaleIn 0.2s ease-out;
}
```

### Tables

**Data Table (Tailwind)**:
```jsx
<div className="overflow-x-auto rounded-xl border border-primary-200 shadow-sm">
  <table className="w-full">
    <thead className="bg-primary-50 border-b border-primary-200">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-primary-700 uppercase tracking-wider">
          Name
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-primary-700 uppercase tracking-wider">
          Email
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-primary-700 uppercase tracking-wider">
          Status
        </th>
        <th className="px-6 py-3 text-right text-xs font-medium text-primary-700 uppercase tracking-wider">
          Actions
        </th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-primary-200">
      <tr className="hover:bg-primary-50 transition-colors">
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-800">
          John Doe
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-600">
          john@example.com
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
            Active
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <button className="text-accent-600 hover:text-accent-700">Edit</button>
        </td>
      </tr>
      {/* More rows */}
    </tbody>
  </table>
</div>
```

**Compact Table** (for file previews):
```jsx
<div className="max-h-48 overflow-auto rounded-lg border border-primary-200 bg-white">
  <table className="w-full text-sm">
    <thead className="bg-primary-50 sticky top-0 border-b border-primary-200">
      <tr>
        <th className="px-4 py-2 text-left font-medium text-primary-700">Column 1</th>
        <th className="px-4 py-2 text-left font-medium text-primary-700">Column 2</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-primary-100">
      <tr className="hover:bg-primary-50">
        <td className="px-4 py-2 text-primary-800">Data 1</td>
        <td className="px-4 py-2 text-primary-600">Data 2</td>
      </tr>
      {/* More rows */}
    </tbody>
  </table>
</div>
```

### Badges & Pills

**Status Badges (Tailwind)**:
```jsx
{/* Success */}
<span className="px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
  Active
</span>

{/* Warning */}
<span className="px-3 py-1 text-xs font-semibold text-yellow-700 bg-yellow-100 rounded-full">
  Pending
</span>

{/* Error */}
<span className="px-3 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded-full">
  Failed
</span>

{/* Info */}
<span className="px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">
  New
</span>

{/* Neutral */}
<span className="px-3 py-1 text-xs font-semibold text-primary-700 bg-primary-100 rounded-full">
  Draft
</span>
```

**Notification Badge**:
```jsx
<button className="relative p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
</button>
```

**Count Badge**:
```jsx
<button className="relative px-4 py-2 text-primary-600 font-medium hover:bg-primary-50 rounded-lg transition-colors">
  Messages
  <span className="ml-2 px-2 py-0.5 text-xs font-bold text-white bg-accent-500 rounded-full">
    12
  </span>
</button>
```

### Loading States

**Skeleton Loader (Tailwind)**:
```jsx
<div className="animate-pulse space-y-4">
  {/* Header skeleton */}
  <div className="h-8 bg-primary-200 rounded w-1/4" />

  {/* Content skeletons */}
  <div className="space-y-3">
    <div className="h-4 bg-primary-200 rounded w-full" />
    <div className="h-4 bg-primary-200 rounded w-5/6" />
    <div className="h-4 bg-primary-200 rounded w-4/6" />
  </div>

  {/* Card skeleton */}
  <div className="bg-white rounded-xl p-6 border border-primary-200">
    <div className="h-6 bg-primary-200 rounded w-1/3 mb-4" />
    <div className="space-y-2">
      <div className="h-4 bg-primary-200 rounded w-full" />
      <div className="h-4 bg-primary-200 rounded w-2/3" />
    </div>
  </div>
</div>
```

**Inline Spinner (Tailwind)**:
```jsx
<div className="flex items-center gap-2 text-primary-600">
  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
  <span>Loading...</span>
</div>
```

**Progress Bar (Tailwind)**:
```jsx
<div className="w-full">
  <div className="flex justify-between text-sm mb-2">
    <span className="text-primary-700 font-medium">Uploading...</span>
    <span className="text-primary-600">65%</span>
  </div>
  <div className="w-full bg-primary-200 rounded-full h-2 overflow-hidden">
    <div className="bg-gradient-to-r from-accent-500 to-accent-600 h-full rounded-full transition-all duration-300" style={{width: '65%'}} />
  </div>
</div>
```

### Sample Data & Demo Components

#### Sample Data Loader

**Tailwind Version**:
```jsx
<div className="bg-gradient-to-br from-accent-100 to-accent-200 border-2 border-accent-300 rounded-2xl p-6">
  <div className="flex items-start gap-4">
    <div className="w-12 h-12 bg-accent-600 rounded-xl flex items-center justify-center text-white flex-shrink-0">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    </div>
    <div className="flex-1">
      <h3 className="font-semibold text-primary-800 mb-2">
        Try with Sample Data
      </h3>
      <p className="text-sm text-primary-600 mb-4">
        Load example datasets to see how it works
      </p>
      <button className="px-4 py-2 bg-accent-600 text-white font-medium rounded-lg hover:bg-accent-700 transition-colors">
        Load Sample Data
      </button>
    </div>
  </div>
</div>
```

**Free Usage Badge**:
```jsx
<div className="bg-green-50 border border-green-200 rounded-lg px-3 py-2 flex items-center gap-2">
  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
  <span className="text-sm font-medium text-green-700">
    Free usage - doesn't count toward limits
  </span>
</div>
```

**CSS Version**:
```css
.sample-data-container {
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
  border: 1px solid #93c5fd;
  border-radius: 1rem;
  padding: 1.5rem;
}

.sample-data-icon {
  width: 3rem;
  height: 3rem;
  background: #2563eb;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.free-usage-badge {
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 0.5rem;
  padding: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.free-usage-badge .icon {
  color: #16a34a;
  width: 1rem;
  height: 1rem;
}
```

## Effects & Gradients

### Background Gradients
```css
/* Professional gradient for main backgrounds */
.bg-gradient-professional {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%);
}

/* Hero section gradient */
.bg-gradient-hero {
  background: linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%);
}

/* Accent gradient for buttons and highlights */
.bg-gradient-accent {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
}
```

### Shadows
```css
/* Subtle shadow for cards */
.shadow-subtle {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

/* Medium shadow for interactive elements */
.shadow-medium {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

/* Strong shadow for modals and overlays */
.shadow-strong {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

/* Colored shadows for accent elements */
.shadow-accent {
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.25);
}
```

### Backdrop Effects
```css
.backdrop-blur {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.backdrop-blur-strong {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
```

### Loading States & Spinners

#### Professional Loading Spinner
```css
.spinner {
  width: 1.75rem;
  height: 1.75rem;
  border: 3px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  border-top-color: #ffffff;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.spinner-accent {
  border: 3px solid rgba(59, 130, 246, 0.2);
  border-top-color: #3b82f6;
}
```

#### Loading Button States
```css
.btn-loading {
  position: relative;
  color: transparent;
  pointer-events: none;
}

.btn-loading::after {
  content: "";
  position: absolute;
  width: 1rem;
  height: 1rem;
  top: 50%;
  left: 50%;
  margin-left: -0.5rem;
  margin-top: -0.5rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #ffffff;
  animation: spin 1s linear infinite;
}
```

### File Preview Components

#### File Preview Cards
```css
.file-preview-card {
  background: #f8fafc;
  border-radius: 0.5rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;
}

.file-preview-card:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
}

.file-preview-table {
  max-height: 12rem;
  overflow: auto;
  background: white;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
}

.file-preview-table thead {
  background: #f8fafc;
  position: sticky;
  top: 0;
  border-bottom: 1px solid #e2e8f0;
}
```

## Quick Reference Cheat Sheet

### Most Common Patterns

**Page Background**:
```jsx
className="min-h-screen bg-gradient-to-br from-primary-50 via-primary-100 to-primary-200"
```

**Main Content Container**:
```jsx
className="max-w-6xl mx-auto px-6 py-20"
```

**Card**:
```jsx
className="bg-white rounded-2xl p-8 border-2 border-primary-200 shadow-lg"
```

**Primary Button**:
```jsx
className="px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white font-semibold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
```

**Secondary Button**:
```jsx
className="px-6 py-3 bg-white text-primary-600 font-semibold rounded-xl border-2 border-primary-200 hover:border-accent-500 hover:text-accent-600 transition-all duration-300"
```

**Input Field**:
```jsx
className="w-full px-4 py-3 bg-primary-50 border-2 border-primary-200 rounded-lg text-primary-800 placeholder-primary-400 focus:outline-none focus:border-accent-500 focus:bg-white focus:ring-4 focus:ring-accent-500/10 transition-all duration-200"
```

**Label**:
```jsx
className="block text-sm font-medium text-primary-700 mb-2"
```

**Hero Headline**:
```jsx
className="text-5xl md:text-7xl font-bold text-primary-800 tracking-tight"
```

**Section Title**:
```jsx
className="text-3xl font-bold text-primary-800 mb-8"
```

**Card Title**:
```jsx
className="text-2xl font-semibold text-primary-800 mb-3"
```

**Body Text**:
```jsx
className="text-base text-primary-600 leading-relaxed"
```

**Success Badge**:
```jsx
className="px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full"
```

**Grid Layout (2 columns)**:
```jsx
className="grid md:grid-cols-2 gap-8"
```

**Flexbox with Gap**:
```jsx
className="flex items-center gap-4"
```

**Hover Effect Card**:
```jsx
className="hover:border-accent-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
```

### Color Reference Quick Guide

**Text Colors**:
- Primary heading: `text-primary-800`
- Secondary text: `text-primary-600`
- Muted text: `text-primary-500`
- Link: `text-accent-600 hover:text-accent-700`

**Backgrounds**:
- Page: `bg-gradient-to-br from-primary-50 via-primary-100 to-primary-200`
- Card: `bg-white`
- Input: `bg-primary-50`
- Button: `bg-gradient-to-r from-accent-500 to-accent-600`

**Borders**:
- Default: `border-primary-200`
- Hover: `border-accent-500`
- Error: `border-red-300`
- Success: `border-green-300`

### Spacing Quick Guide

**Padding**:
- Card: `p-8` (2rem)
- Button: `px-6 py-3` (1.5rem / 0.75rem)
- Input: `px-4 py-3` (1rem / 0.75rem)

**Margin/Gap**:
- Between sections: `mb-20` or `py-20` (5rem)
- Between cards: `gap-8` (2rem)
- Between form fields: `space-y-6` (1.5rem)
- Between related items: `gap-4` (1rem)

### Border Radius Quick Guide

- Small elements (badges, inputs): `rounded-lg` (0.5rem)
- Buttons: `rounded-xl` (0.75rem)
- Cards: `rounded-2xl` (1rem)
- Large cards: `rounded-3xl` (1.5rem)

### Shadow Quick Guide

- Subtle: `shadow-sm`
- Medium: `shadow-lg`
- Strong: `shadow-2xl`
- Colored (accent): `shadow-lg shadow-accent-500/30`

## Transition & Animation Patterns

### Standard Transitions

Use these consistent transition patterns throughout your application:

```jsx
// Button/Interactive elements
className="transition-all duration-300"

// Fast interactions (hovers, focus)
className="transition-colors duration-200"

// Smooth transforms
className="transition-transform duration-300"

// Combined (most common)
className="transition-all duration-300 ease-out"
```

### Common Hover Effects

**Lift Effect**:
```jsx
className="hover:-translate-y-1 transition-transform duration-300"
```

**Subtle Lift with Shadow**:
```jsx
className="hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
```

**Scale Effect**:
```jsx
className="hover:scale-105 transition-transform duration-300"
```

**Border Color Change**:
```jsx
className="border-2 border-primary-200 hover:border-accent-500 transition-colors duration-300"
```

**Background Change**:
```jsx
className="hover:bg-primary-50 transition-colors duration-200"
```

### Focus States

Always include focus states for accessibility:

```jsx
// Input focus
className="focus:outline-none focus:border-accent-500 focus:ring-4 focus:ring-accent-500/10 transition-all duration-200"

// Button focus
className="focus:outline-none focus:ring-4 focus:ring-accent-500/20"

// Link focus
className="focus:outline-none focus:underline"
```

## Usage Guidelines

### Do's ✅
- **Use the primary (slate) palette for text and UI elements**
- **Apply accent (blue) colors for interactive elements and CTAs**
- **Maintain consistent spacing using the 4px base unit (space-4, space-6, space-8)**
- **Use gradients sparingly - primarily for hero sections and primary buttons**
- **Apply subtle shadows and backdrop blur for depth**
- **Keep rounded corners consistent**: `rounded-lg` (inputs), `rounded-xl` (buttons), `rounded-2xl` (cards)
- **Use sticky notifications for critical error states that need persistent visibility**
- **Implement loading states with professional spinners and smooth transitions**
- **Provide clear visual feedback for sample vs. user data (free usage indicators)**
- **Use compact upload areas for secondary/additional file uploads**
- **Maintain consistent file preview patterns with hover states**
- **Always include focus states for keyboard navigation**
- **Use semantic HTML and ARIA labels for accessibility**
- **Test on mobile - use responsive classes (md:, lg:)**

### Don'ts ❌
- ❌ Don't mix multiple accent colors in the same interface
- ❌ Avoid using pure black (#000) or pure white (#fff) text (use palette colors)
- ❌ Don't create custom shadows outside the defined system
- ❌ Avoid excessive gradients or effects that distract from content
- ❌ Don't use inconsistent border radius values
- ❌ Don't place error messages only at the top of long forms - use sticky notifications
- ❌ Avoid blocking loading states without progress indicators
- ❌ Don't make sample data look identical to user data - clearly differentiate
- ❌ Never hide important upload errors from user view
- ❌ Don't use transitions longer than 500ms (feels sluggish)
- ❌ Avoid animating on scroll unless necessary
- ❌ Don't skip hover states on interactive elements

### Accessibility Notes
- Maintain WCAG AA contrast ratios (4.5:1 for normal text, 3:1 for large text)
- Primary-600 and above provide sufficient contrast on white backgrounds
- Primary-400 and below should only be used for non-essential text
- Always test color combinations for accessibility compliance

### Implementation Best Practices

**Starting a New Project**:
1. Copy the Tailwind config from the Quick Setup section
2. Add CSS variables to your globals.css
3. Start with the page layout pattern (hero + content sections)
4. Use the component templates as starting points
5. Reference the Quick Reference Cheat Sheet for common patterns

**Working with Claude Code**:
- Provide this style guide as context when asking for UI components
- Reference specific component examples by name (e.g., "Use the Interactive Card pattern")
- Mention color values explicitly (e.g., "Use accent-600 for the button")
- Specify spacing patterns (e.g., "Use gap-8 between cards")

**Customization Tips**:
- To change the primary color, update the `primary` palette in Tailwind config
- To change the accent color, update the `accent` palette
- Maintain the same color scale structure (50-900) for consistency
- Test contrast ratios when changing colors

This style guide works best with:
- **Tailwind CSS v3+** with the provided configuration
- **CSS Custom Properties** for theme consistency
- **Modern browsers** with backdrop-filter support
- **Responsive design** principles
- **React** or any JavaScript framework

### File Structure
```
styles/
├── globals.css          # Base styles and CSS variables
├── components/          # Component-specific styles
├── utilities/           # Utility classes
└── themes/             # Theme variations
```

## Design System Features (2025)

### Component Patterns Implemented

**Error Management System**:
- Fixed-position error alerts that stay visible during scroll
- Dual error display for context + visibility
- Auto-collapse with manual override
- Individual error dismissal

**Enhanced Upload Experience**:
- Progressive upload with "Add More Files" functionality
- Compact upload areas for secondary uploads
- File management with removal capability
- Clear visual state tracking

**Sample Data Integration**:
- One-click loading for demo datasets
- Template downloads (individual or bulk)
- Usage exemption indicators
- State tracking for free usage

**Loading & Feedback States**:
- Progressive loading messages
- Professional spinners with consistent styling
- Success animations with auto-dismiss
- Error persistence for critical issues

### Technical Implementation Notes
- All components follow the established color palette and spacing system
- Loading states use the defined spinner animations and color variants
- Error components leverage semantic color patterns
- Sample data components use accent gradients for differentiation
- File previews maintain consistent table styling with sticky headers
- All interactive elements include hover and focus states
- Mobile-first responsive design approach

## Getting Started Checklist

When starting a new design with Claude Code, follow this checklist:

### Initial Setup (Tailwind v4)
- [ ] Install Tailwind CSS v4: `npm install tailwindcss@next @tailwindcss/postcss@next`
- [ ] Create `postcss.config.mjs` with the `@tailwindcss/postcss` plugin
- [ ] Add `@import "tailwindcss"` and `@theme` configuration to `globals.css`
- [ ] Restart dev server and verify styles are loading

### Initial Setup (Tailwind v3 - Legacy)
- [ ] Install Tailwind CSS v3: `npm install tailwindcss@^3 postcss autoprefixer`
- [ ] Create `tailwind.config.js` with custom color palette and theme extensions
- [ ] Create `postcss.config.js` with tailwindcss and autoprefixer
- [ ] Add `@tailwind` directives and CSS variables to `globals.css`

### Design Implementation
- [ ] Set up the base page layout with gradient background
- [ ] Create your hero section using the provided patterns
- [ ] Build your main content area with proper max-width container
- [ ] Use component templates from this guide (buttons, cards, forms)
- [ ] Test on mobile and add responsive breakpoints (md:, lg:)
- [ ] Verify color contrast for accessibility
- [ ] Add loading states for async operations
- [ ] Implement error handling with appropriate notifications
- [ ] Test keyboard navigation and focus states
- [ ] Review spacing consistency throughout

---

*This comprehensive style guide is designed to create consistent, professional, and accessible user interfaces. Reference this document when working with Claude Code to ensure design consistency across all your projects. Last updated: January 2025*