# AI Lottery Number Recommendation Site

## Overview

This is a Korean lottery number recommendation web application that uses AI-driven algorithms to generate lottery number combinations based on historical winning data. The application features a clean, utility-focused interface with engaging visual elements for lottery ball displays. Users can view the latest lottery results and generate AI-recommended number sets through an interactive, animated experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript and Vite as the build tool

**UI Component Library**: shadcn/ui (Radix UI primitives) with Tailwind CSS for styling
- Component system based on the "new-york" style variant
- Extensive use of Radix UI primitives for accessible, headless components
- Custom theming system with CSS variables for consistent design tokens

**State Management**: TanStack Query (React Query) v5 for server state management
- Centralized query client configuration with custom fetch wrappers
- Infinite stale time and disabled refetching by default for lottery data
- Custom error handling with 401 unauthorized behavior options

**Routing**: wouter for lightweight client-side routing

**Design System**:
- Typography: Inter font family loaded from Google Fonts
- Color scheme: HSL-based color system with CSS variable theming
- Custom lottery ball colors (yellow, blue, red, gray, green) based on number ranges
- Responsive layout with max-width containers and Tailwind spacing utilities
- Animation system using Tailwind's built-in utilities and CSS transitions

### Backend Architecture

**Runtime**: Node.js with Express.js framework

**Language**: TypeScript with ESNext module system

**API Design**: RESTful endpoints with clear separation of concerns
- `/api/lotto/latest` - GET endpoint for retrieving cached lottery results
- `/api/lotto/refresh` - POST endpoint for force-refreshing lottery data
- `/api/lotto/generate` - POST endpoint for AI number generation

**Data Validation**: Zod schema validation for runtime type safety
- Shared schemas between frontend and backend via `shared/schema.ts`
- Strict validation for lottery results and recommended numbers

**AI Algorithm**:
- Frequency-based weighted number generation
- Analyzes past 20 lottery draws (sample data in development)
- Combines historical frequency with randomization factor
- Ensures no duplicate numbers and proper sorting

**Web Scraping**: 
- Cheerio-based HTML parsing for lottery data from dhlottery.co.kr
- Axios for HTTP requests with custom user-agent headers
- Extracts round number, draw date, winning numbers, and bonus number

### Data Storage Solutions

**Current Implementation**: In-memory storage via `MemStorage` class
- Implements `IStorage` interface for potential future database integration
- Caches latest lottery results to minimize external API calls
- Maintains generation history (up to 100 entries)
- Volatile storage - resets on server restart

**Future Database Support**: Architecture designed for easy PostgreSQL integration
- Drizzle ORM configuration present in `drizzle.config.ts`
- Schema file structure ready at `shared/schema.ts`
- Connection via Neon serverless PostgreSQL driver

**Storage Interface**:
- `getLatestResult()` / `setLatestResult()` for lottery data caching
- `addGeneratedNumbers()` / `getGeneratedHistory()` for user generation tracking

### External Dependencies

**Third-Party Services**:
- **Lottery Data Source**: dhlottery.co.kr official Korean lottery website
  - Scrapes latest winning numbers and draw information
  - No official API available - relies on HTML parsing
  - Implements error handling for parsing failures

**UI Libraries**:
- **Radix UI**: Complete suite of accessible component primitives
  - Dialog, Popover, Toast, Tooltip, and 20+ other components
  - Provides keyboard navigation and ARIA attributes
- **Lucide React**: Icon library for consistent iconography

**Database (Configured but Not Active)**:
- **Neon Serverless PostgreSQL**: Connection string via `DATABASE_URL` environment variable
- **Drizzle ORM**: Type-safe database toolkit with PostgreSQL dialect
- **connect-pg-simple**: Session store for PostgreSQL (dependency present)

**Development Tools**:
- **Vite Plugins**: Development banner, error overlay, and cartographer (Replit-specific)
- **TSX**: TypeScript execution for development server
- **esbuild**: Production bundling for server code

**Build & Development**:
- Separate build processes for client (Vite) and server (esbuild)
- Client output: `dist/public`, Server output: `dist/index.js`
- Development mode with hot module replacement (HMR)
- Production mode with optimized bundles