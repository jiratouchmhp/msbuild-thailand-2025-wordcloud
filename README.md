# Microsoft Build Thailand 2025 - Word Showcase

A dynamic and interactive React application built for Microsoft Build Thailand 2025, where attendees can share words that inspired or motivated them during the event. The application features a beautiful word cloud visualization with real-time updates and community engagement.

## 🌟 Features

- **Interactive Word Cloud**: Dynamic visualization that grows larger as words gain popularity
- **Real-time Submissions**: Submit words instantly and see them appear in the showcase
- **Local Storage Persistence**: All submissions are saved locally and persist across sessions
- **Beautiful UI**: Modern glass morphism design with gradient backgrounds and smooth animations
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Statistics Dashboard**: View real-time metrics including total words, contributions, and most popular submissions
- **Hover Tooltips**: Interactive elements showing submission counts and details
- **Toast Notifications**: User-friendly feedback for all interactions

## 🎯 Purpose

This application was created for Microsoft Build Thailand 2025 to:
- Capture attendee inspiration and feedback
- Create a visual representation of community sentiment
- Foster engagement and interaction among participants
- Showcase the collective voice of the Microsoft developer community in Thailand

## 🚀 Tech Stack

### Core Framework
- **React 18.3.1** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development with full IntelliSense support
- **Vite** - Lightning-fast build tool and development server

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework with custom configuration
- **shadcn/ui** - High-quality accessible component library built on Radix UI
- **Lucide React** - Beautiful, customizable icons
- **CSS Variables** - Dynamic theming and color management
- **Tailwind Animate** - Smooth animations and transitions

### State Management & Data
- **React Hook Form** - Performant forms with minimal re-renders
- **Zod** - TypeScript-first schema validation
- **TanStack Query** - Powerful data synchronization for React
- **Local Storage API** - Client-side data persistence

### Additional Libraries
- **React Router DOM** - Declarative routing for React applications
- **Sonner** - Beautiful toast notifications
- **Class Variance Authority** - Type-safe component variants
- **clsx** - Utility for constructing className strings

## 📁 Project Structure

```
src/
├── components/ui/          # shadcn/ui components (buttons, cards, inputs, etc.)
├── hooks/                  # Custom React hooks
│   ├── use-mobile.tsx     # Mobile device detection
│   └── use-toast.ts       # Toast notification hook
├── lib/                   # Utility functions
│   └── utils.ts           # Common utilities and helpers
├── pages/                 # Page components
│   ├── Index.tsx          # Main application page
│   └── NotFound.tsx       # 404 error page
├── App.tsx                # Root application component
├── main.tsx               # Application entry point
└── index.css              # Global styles and Tailwind imports
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+
- npm, yarn

### Quick Start

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd microsoft-build-2025-showcase
   ```

2. **Install dependencies**
   ```bash
   # Using npm
   npm install
   
   # Using yarn
   yarn install
   

3. **Start development server**
   ```bash
   # Using npm
   npm run dev
   
   # Using yarn
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application running.

## 📱 Usage

### Submitting Words
1. Enter a word in the submission form that represents your Microsoft Build experience
2. Click "Submit Word" or press Enter
3. Your word will appear in the word cloud with dynamic positioning
4. If the same word is submitted multiple times, it grows larger and shows a count badge

### Viewing Statistics
- **Unique Words**: Total number of different words submitted
- **Total Contributions**: Sum of all word submissions (including duplicates)
- **Most Popular**: Highest count for any single word

### Interactive Features
- Hover over words in the cloud to see submission counts
- Words scale up on hover for better visibility
- Larger, more opaque words indicate higher popularity
- Smooth animations enhance the user experience

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#2563eb) to Indigo (#4338ca) gradients
- **Background**: Multi-layer gradients (slate-50, blue-50, indigo-50)
- **Text**: Gray scale with WCAG compliant contrast ratios
- **Accents**: Dynamic HSL colors for word cloud items

### Component Patterns
- **Glass Morphism**: Backdrop blur effects with transparency
- **Gradient Backgrounds**: Multi-directional gradients for depth
- **Hover Animations**: Scale transforms and color transitions
- **Card-based Layouts**: Consistent spacing and shadow patterns
- **Responsive Grid**: Mobile-first responsive design

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run build:dev    # Build in development mode
npm run preview      # Preview production build
npm run lint         # Run ESLint for code quality
```

## 🏗️ Build & Deployment

### Production Build
```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory, ready for deployment to any static hosting service.

### Deployment Options
- **Vercel**: Connect your repository for automatic deployments
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Use GitHub Actions for CI/CD
- **Azure Static Web Apps**: Deploy directly from GitHub

## 📊 Data Management

### Local Storage Schema
```typescript
interface WordData {
  text: string;      // The submitted word
  count: number;     // Number of times submitted
  x: number;         // X position (percentage)
  y: number;         // Y position (percentage)
  id: string;        // Unique identifier
}
```

### Data Persistence
- All word submissions are automatically saved to browser localStorage
- Data persists across browser sessions
- No backend required for basic functionality
- Can be extended with a database for multi-user synchronization

## 🔮 Future Enhancements

### Planned Features
- **Real-time Synchronization**: WebSocket integration for live updates across users
- **Word Categories**: Tagging and filtering system
- **Export Options**: Download word cloud as image or data
- **Admin Dashboard**: Moderation tools and analytics
- **User Authentication**: Personal word collections and profiles
- **Dark Mode**: Theme switching for better accessibility
- **Internationalization**: Multi-language support

### Technical Improvements
- **Backend Integration**: REST API for data persistence
- **Advanced Analytics**: Word trending and sentiment analysis
- **Performance Optimization**: Virtual scrolling for large datasets
- **Progressive Web App**: Offline functionality and mobile installation
- **SEO Optimization**: Server-side rendering with Next.js migration

## 🤝 Contributing

We welcome contributions from the Microsoft developer community! Here's how you can help:

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes following our coding standards
4. Write or update tests as needed
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Coding Standards
- Follow TypeScript best practices
- Use Prettier for code formatting
- Follow the existing component structure
- Add JSDoc comments for complex functions
- Ensure responsive design principles

## 🙏 Acknowledgments

- **Microsoft Thailand** for hosting Build 2025
- **shadcn/ui** for the beautiful component library
- **Tailwind CSS** for the utility-first CSS framework
- **React Community** for the amazing ecosystem
- **GitHub Copilot** for development assistance

---

Built with ❤️ for the Microsoft Developer Community in Thailand

**Connecting voices, inspiring innovation** 🚀