# Society Management System

## Overview

This is a web-based Society Management System built with Flask and SQLAlchemy, designed to streamline residential community management operations. The application provides comprehensive tools for financial management, maintenance requests, resident communication, and amenity bookings for housing societies and residential complexes.

## System Architecture

### Backend Architecture
- **Framework**: Flask (Python web framework)
- **Database ORM**: SQLAlchemy with Flask-SQLAlchemy extension
- **Database**: SQLite (configured, with PostgreSQL support ready via psycopg2-binary)
- **Web Server**: Gunicorn for production deployment
- **Session Management**: Flask's built-in session handling with configurable secret key

### Frontend Architecture
- **Template Engine**: Jinja2 (Flask's default)
- **CSS Framework**: Bootstrap 5 with custom Replit dark theme
- **Icons**: Font Awesome 6.0
- **JavaScript**: Vanilla JavaScript for interactive features and form validation
- **Responsive Design**: Mobile-first approach with Bootstrap grid system

### Application Structure
```
├── app.py              # Main Flask application and configuration
├── main.py             # Entry point for the application
├── models.py           # Database models and schema definitions
├── templates/          # HTML templates
├── static/            # Static assets (CSS, JS, images)
└── pyproject.toml     # Python dependencies
```

## Key Components

### Database Models
1. **Contact**: Handles contact form submissions with email validation
2. **User**: User management with role-based access (residents, admins)
3. **Society**: Society information and registration details
4. **MaintenanceRequest**: Maintenance ticket system with status tracking

### Core Features
1. **Landing Pages**: Home, features, demo, pricing, and contact pages
2. **Contact Management**: Form submission and inquiry handling
3. **User Authentication**: Role-based access control system
4. **Maintenance System**: Request tracking and status management
5. **Society Management**: Multi-society support with registration numbers

### Static Assets
- **Custom CSS**: Homedwell branding with teal color scheme
- **Logo**: SVG-based responsive logo design
- **JavaScript**: Form validation and scroll animations
- **Images**: Hero backgrounds and branding assets

## Data Flow

1. **Request Handling**: Flask routes process incoming HTTP requests
2. **Template Rendering**: Jinja2 templates generate dynamic HTML responses
3. **Database Operations**: SQLAlchemy ORM manages database interactions
4. **Static Assets**: Served directly by Flask during development, optimized for production
5. **Form Processing**: User inputs validated and stored via SQLAlchemy models

## External Dependencies

### Python Packages
- **Flask**: Web framework and core functionality
- **SQLAlchemy**: Database ORM and migrations
- **Gunicorn**: WSGI HTTP server for production
- **psycopg2-binary**: PostgreSQL database adapter
- **email-validator**: Email validation with DNS checking
- **Werkzeug**: WSGI utilities and proxy support

### Frontend Libraries
- **Bootstrap**: CSS framework via CDN
- **Font Awesome**: Icon library via CDN
- **Custom Replit Theme**: Dark theme optimization

### Infrastructure
- **Replit Nix**: Package management and environment setup
- **PostgreSQL**: Database server (available but using SQLite currently)
- **OpenSSL**: Secure communication support

## Deployment Strategy

### Development Environment
- **Replit Integration**: Configured for seamless Replit development
- **Hot Reload**: Automatic application restart on code changes
- **Debug Mode**: Enhanced error reporting and development tools

### Production Configuration
- **Gunicorn**: Production WSGI server with auto-scaling
- **Port Configuration**: External port 80 mapping to internal port 5000
- **Environment Variables**: Configurable database URL and session secrets
- **Proxy Support**: ProxyFix middleware for proper header handling

### Database Strategy
- **SQLite**: Default development database (file-based)
- **PostgreSQL**: Production-ready option via environment variable
- **Connection Pooling**: Configured for production reliability
- **Schema Management**: Automatic table creation on startup

## Changelog

- June 21, 2025: Initial setup
- June 21, 2025: Removed Demo section, replaced with Google form "Book Demo" links
- June 21, 2025: Updated branding to bold "Homedwell Properties" throughout site
- June 21, 2025: Updated contact details with authentic business information (phone numbers: 9137873473, 9167476162; address: Chinchpokli Mumbai)
- June 23, 2025: Removed "Get Started" button from navigation
- June 23, 2025: Removed Pricing section and pricing navigation completely

## User Preferences

Preferred communication style: Simple, everyday language.