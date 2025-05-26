# Custom Instructions for Microsoft Build Word Showcase Project

## Project Overview

This is a React TypeScript application built with Vite, featuring a modern UI component library (shadcn/ui), and designed for community word submissions and showcase. The application creates an interactive word cloud where users can submit words and see them displayed with dynamic sizing based on popularity.

## Tech Stack & Dependencies

### Core Framework
- **React 18.3.1** with TypeScript
- **Vite** for build tooling and development server
- **React Router DOM** for navigation

### UI & Styling
- **Tailwind CSS** with custom configuration
- **shadcn/ui** component library with Radix UI primitives
- **Lucide React** for icons
- **CSS variables** for theming
- **Tailwind Animate** for animations

### Key Libraries
- **React Hook Form** with Zod validation
- **React Query (TanStack)** for data fetching
- **Local Storage** for data persistence
- **Sonner** for toast notifications

## Project Structure

```
src/
├── components/ui/          # shadcn/ui components
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions
├── pages/                  # Page components
├── App.tsx                 # Main app component
├── main.tsx               # Entry point
└── index.css              # Global styles
```

## Design System & UI Guidelines

### Color Palette
- **Primary**: Blue (#2563eb) to Indigo (#4338ca) gradients
- **Background**: Multi-layer gradients (slate-50, blue-50, indigo-50)
- **Text**: Gray scale with proper contrast ratios
- **Accents**: Dynamic HSL colors for word cloud items

### Component Patterns
1. **Card-based layouts** with backdrop blur and transparency
2. **Gradient backgrounds** for visual depth
3. **Hover animations** with scale transforms
4. **Glass morphism** effects with backdrop-blur
5. **Responsive design** with mobile-first approach

### Animation Guidelines
- **Transform hover effects**: scale(1.05) for interactive elements
- **Fade-in animations** for content loading
- **Pulse/bounce effects** for decorative elements
- **Smooth transitions** (duration-200, duration-300)

## Key Features & Components

### 1. Word Submission System
```typescript
interface WordData {
  text: string;
  count: number;
  x: number;
  y: number;
  id: string;
}
```

### 2. Dynamic Word Cloud
- Random positioning algorithm
- Dynamic font sizing based on submission count
- Opacity variations for visual hierarchy
- Hover tooltips with submission counts

### 3. Local Storage Persistence
- Automatic save/load of word data
- No backend required
- Data persists across sessions

### 4. Statistics Dashboard
- Real-time word count
- Total contributions tracking
- Most popular word highlighting

## Code Patterns & Conventions

### State Management
```typescript
const [words, setWords] = useState<WordData[]>([]);
const [inputWord, setInputWord] = useState('');
```

### Form Handling
```typescript
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  // Validation and processing logic
};
```

### Styling Patterns
```typescript
className="bg-gradient-to-br from-blue-600 to-indigo-600 
           hover:from-blue-700 hover:to-indigo-700 
           transform hover:scale-105 transition-all duration-200"
```

## Development Guidelines

### File Organization
- Use **PascalCase** for component files
- Use **camelCase** for utility files
- Group related components in directories
- Separate hooks, utilities, and components

### Component Structure
1. **Imports** (React, UI components, utilities)
2. **Interfaces/Types** definitions
3. **Component function** with proper TypeScript typing
4. **State declarations** with proper initial values
5. **Effects and handlers**
6. **Render logic** with proper JSX structure

### TypeScript Best Practices
- Define interfaces for all data structures
- Use proper typing for event handlers
- Leverage union types for variants
- Use generics where appropriate

### Responsive Design
- Mobile-first approach with Tailwind classes
- Grid layouts with responsive breakpoints
- Flexible spacing and sizing
- Touch-friendly interactive elements

## Replication Instructions

### 1. Initial Setup
```bash
# Create new Vite React TypeScript project
npm create vite@latest project-name -- --template react-ts
cd project-name

# Install core dependencies
npm install react-router-dom @tanstack/react-query
```

### 2. UI System Setup
```bash
# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Install shadcn/ui
npx shadcn-ui@latest init
```

### 3. Component Library
```bash
# Install required shadcn/ui components
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add card
npx shadcn-ui@latest add toast
```

### 4. Additional Dependencies
```bash
# Install icons and utilities
npm install lucide-react clsx tailwind-merge
npm install sonner class-variance-authority
```

### 5. Configuration Files
- Copy `tailwind.config.ts` with custom color scheme
- Copy `components.json` for shadcn/ui configuration
- Set up path aliases in `tsconfig.json`

## Key Implementation Patterns

### 1. Dynamic Positioning Algorithm
```typescript
const getRandomPosition = () => ({
  x: Math.random() * 80 + 10, // 10% to 90% of container
  y: Math.random() * 70 + 15, // 15% to 85% of container
});
```

### 2. Dynamic Styling Based on Data
```typescript
const getFontSize = (count: number) => {
  const baseSize = 16;
  const multiplier = Math.min(count * 0.5, 4);
  return baseSize + (count - 1) * 8 + multiplier * 4;
};
```

### 3. Local Storage Integration
```typescript
// Load on mount
useEffect(() => {
  const saved = localStorage.getItem('showcaseWords');
  if (saved) setWords(JSON.parse(saved));
}, []);

// Save on change
useEffect(() => {
  localStorage.setItem('showcaseWords', JSON.stringify(words));
}, [words]);
```

## Visual Design Principles

### 1. Microsoft Design Language
- Clean, modern interface
- Professional blue/indigo color scheme
- Consistent spacing and typography
- Corporate branding integration

### 2. Interactive Elements
- Clear visual feedback on hover
- Smooth transitions and animations
- Accessible color contrasts
- Touch-friendly sizing

### 3. Layout Structure
- Header with branding and statistics
- Centered content with maximum widths
- Card-based sections for organization
- Footer with corporate information

## Performance Considerations

### 1. Optimization Strategies
- Use `useCallback` for event handlers
- Implement `useMemo` for expensive calculations
- Lazy load components where appropriate
- Optimize images and assets

### 2. Bundle Optimization
- Tree-shake unused dependencies
- Code splitting for large applications
- Optimize Tailwind CSS output
- Use Vite's built-in optimizations

## Accessibility Guidelines

### 1. Keyboard Navigation
- Proper tab order for interactive elements
- Focus indicators for all focusable elements
- Keyboard shortcuts where appropriate

### 2. Screen Reader Support
- Semantic HTML structure
- Proper ARIA labels and descriptions
- Alt text for images and icons

### 3. Color and Contrast
- Maintain WCAG AA contrast ratios
- Don't rely solely on color for information
- Provide alternative text representations

## Extension Ideas

### 1. Enhanced Features
- Word categories and filtering
- Export functionality for word clouds
- Real-time collaboration features
- Admin dashboard for moderation

### 2. Technical Improvements
- Backend integration with API
- User authentication system
- Real-time updates with WebSockets
- Advanced analytics and reporting

### 3. UI Enhancements
- Dark mode support
- Custom themes and branding
- Advanced animation effects
- Mobile app version

## Troubleshooting Common Issues

### 1. Tailwind CSS Not Working
- Verify content paths in `tailwind.config.ts`
- Check if `@tailwind` directives are in `index.css`
- Ensure PostCSS configuration is correct

### 2. shadcn/ui Component Issues
- Verify `components.json` configuration
- Check path aliases in TypeScript config
- Ensure all dependencies are installed

### 3. Build Issues
- Check TypeScript errors in terminal
- Verify all imports have correct paths
- Ensure all dependencies are compatible

This custom instruction file serves as a complete guide for replicating the Microsoft Build Word Showcase project architecture, design patterns, and implementation details in other projects.
