# Loungerie Amapá Garden Shopping

## Overview

This is a modern React website for Loungerie, a sophisticated lingerie store located in Amapá Garden Shopping in Macapá, Brazil. The site showcases the brand's two main product lines (Básica and Fashion), provides store information, and includes customer engagement features. Built as a single-page application with a focus on elegant design and user experience, the website serves as the digital presence for this physical retail location.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React 18** with TypeScript for type safety and modern component patterns
- **Vite** as the build tool for fast development and optimized production builds
- **React Router** for client-side routing with a single main page and 404 handling
- **Tailwind CSS** with custom design system for styling, featuring brand-specific colors (magenta-pink, elegant-black, soft-magenta)
- **Radix UI** components for accessible, unstyled UI primitives
- **TanStack Query** for server state management and data fetching

### Component Structure
- Modular component architecture with clear separation of concerns
- Reusable UI components in `/src/components/ui/` following shadcn/ui patterns
- Feature-specific components for different website sections (Hero, About, Location, etc.)
- Custom carousel implementations for image galleries
- Responsive design with mobile-first approach

### State Management
- React hooks for local component state
- TanStack Query for server state and API interactions
- Context API for global state where needed (theme, user preferences)

### Styling System
- Custom CSS variables for brand colors and design tokens
- Tailwind utility classes with custom extensions
- Playfair Display serif font for headings, Inter for body text
- Gradient utilities and elegant visual effects
- Dark/light theme support through CSS custom properties

### Data Layer
- API integration with ELEVEA analytics platform for tracking and feedback
- Netlify Functions for serverless API endpoints
- Google Apps Script integration for data persistence
- Real-time status checking and site blocking capabilities

### Analytics & Tracking
- Custom analytics implementation through ELEVEA platform
- Page view tracking, lead capture, and feedback collection
- WhatsApp integration for customer communication
- SEO optimization with meta tags and structured data

## External Dependencies

### Core Framework & Build Tools
- **React 18** - Frontend framework
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety and developer experience

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Headless UI component library
- **Lucide React** - Icon library
- **class-variance-authority** - CSS class variant management

### State & Data Management
- **TanStack React Query** - Server state management
- **React Hook Form** - Form state management
- **React Router DOM** - Client-side routing

### Analytics & Integrations
- **ELEVEA Analytics Platform** - Custom analytics and tracking system
- **Google Apps Script** - Backend data storage and processing
- **Netlify Functions** - Serverless API endpoints
- **Netlify Blobs** - Data storage solution

### Image & Media
- **Embla Carousel** - Carousel/slider functionality with autoplay
- Custom image optimization and lazy loading

### Development Tools
- **ESLint** - Code linting with TypeScript support
- **PostCSS** - CSS processing with Tailwind
- **Lovable Tagger** - Development component tagging (dev mode only)

### Deployment & Hosting
- **Netlify** - Static site hosting with edge functions
- **Edge Functions** - Site blocking and status management
- Custom domain and CDN configuration