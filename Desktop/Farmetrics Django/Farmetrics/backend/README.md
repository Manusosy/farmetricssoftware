# Farmetrics Backend - Django REST API

Enterprise-grade farm monitoring and field operations management platform.

## 🚀 Project Status

### ✅ Completed

#### Phase 1: Foundation & Authentication (In Progress)

**Backend Setup:**
- ✅ Django 5.2.7 project initialized with production-ready structure
- ✅ Multi-environment settings (development, staging, production)
- ✅ Environment-based configuration using python-decouple
- ✅ Requirements files organized (base, development, production)
- ✅ Apps structure created (`core`, `accounts`, `organizations`)

**Multi-tenancy Foundation:**
- ✅ Organization model with subscription tiers
- ✅ OrganizationMembership model for user-organization relationships
- ✅ Organization middleware for context management
- ✅ Support for subdomain-based and header-based organization selection

**Authentication & User Management:**
- ✅ Custom User model with email-based authentication
- ✅ User model with extended fields (phone, employee_id, avatar, address)
- ✅ Role model for custom RBAC
- ✅ UserRole model for role assignments with expiration support
- ✅ PasswordResetToken model for secure password recovery
- ✅ User, Role, and UserRole serializers
- ✅ Login, Register, Password Reset serializers

**Core Infrastructure:**
- ✅ TimeStampedModel base class (UUID, created_at, updated_at)
- ✅ SoftDeleteModel with soft delete functionality
- ✅ Django Admin configurations for all models
- ✅ URL routing structure for API v1

### 🔄 In Progress

- API Views for authentication endpoints
- JWT token authentication setup
- Organization API endpoints

### 📋 Todo

- Region model with geospatial support
- Farmer module
- Farm module with PostGIS
- Visit tracking system
- Media module with EXIF extraction
- Request/approval workflows
- Notifications system
- Real-time messaging
- Analytics & dashboards
- Search functionality
- Audit logging
- Frontend (Next.js)
- Deployment configuration

## 📁 Project Structure

```
backend/
├── farmetrics/               # Project configuration
│   ├── settings/
│   │   ├── __init__.py
│   │   ├── base.py          # Base settings
│   │   ├── development.py    # Development settings
│   │   ├── production.py     # Production settings
│   │   └── staging.py        # Staging settings
│   ├── urls.py              # Main URL configuration
│   ├── asgi.py
│   └── wsgi.py
├── apps/
│   ├── core/                # Shared utilities and base models
│   │   ├── models.py        # TimeStampedModel, SoftDeleteModel
│   │   └── apps.py
│   ├── organizations/       # Multi-tenancy
│   │   ├── models.py        # Organization, OrganizationMembership
│   │   ├── middleware.py    # Organization context middleware
│   │   ├── admin.py
│   │   ├── urls.py
│   │   └── apps.py
│   └── accounts/            # Authentication & users
│       ├── models.py        # User, Role, UserRole, PasswordResetToken
│       ├── serializers.py   # All auth serializers
│       ├── admin.py
│       ├── urls.py
│       └── apps.py
├── requirements/
│   ├── base.txt            # Core dependencies
│   ├── development.txt      # Dev dependencies
│   └── production.txt       # Production dependencies
├── manage.py
├── .env.example
└── .gitignore
```

## 🛠️ Technology Stack

- **Framework**: Django 5.2.7
- **API**: Django REST Framework 3.16+
- **Database**: PostgreSQL 15+ with PostGIS (planned)
- **Cache/Queue**: Redis (planned)
- **Task Queue**: Celery (planned)
- **Authentication**: JWT (djangorestframework-simplejwt)
- **API Docs**: drf-spectacular (OpenAPI/Swagger)
- **Phone Numbers**: django-phonenumber-field

## 🔧 Setup Instructions

### Prerequisites

- Python 3.13+
- Virtual environment

### Installation

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create and activate virtual environment:**
   ```bash
   python -m venv venv
   
   # Windows
   .\venv\Scripts\Activate.ps1
   
   # Linux/Mac
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements/development.txt
   ```

4. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Run migrations:**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

6. **Create superuser:**
   ```bash
   python manage.py createsuperuser
   ```

7. **Run development server:**
   ```bash
   python manage.py runserver
   ```

## 📝 API Documentation

Once the server is running, access the API documentation at:

- **Swagger UI**: http://localhost:8000/api/docs/
- **ReDoc**: http://localhost:8000/api/redoc/
- **OpenAPI Schema**: http://localhost:8000/api/schema/

## 🔑 Environment Variables

See `.env.example` for all available environment variables.

Key variables:
- `DJANGO_ENVIRONMENT`: development/staging/production
- `SECRET_KEY`: Django secret key
- `DEBUG`: Debug mode (True/False)
- `ALLOWED_HOSTS`: Comma-separated list of allowed hosts
- `DB_*`: Database configuration
- `REDIS_URL`: Redis connection string
- `CORS_ALLOWED_ORIGINS`: Allowed CORS origins

## 🎯 API Endpoints (Planned)

### Authentication (`/api/v1/auth/`)
- POST `/register/` - User registration
- POST `/login/` - User login (returns JWT tokens)
- POST `/logout/` - User logout
- POST `/token/refresh/` - Refresh access token
- POST `/password/reset/` - Request password reset
- POST `/password/reset/confirm/` - Confirm password reset
- POST `/password/change/` - Change password
- GET `/profile/` - Get user profile
- PUT `/profile/update/` - Update user profile
- GET `/users/` - List users (admin)
- GET `/users/{id}/` - Get user detail
- GET `/roles/` - List roles
- POST `/roles/` - Create role
- GET `/roles/{id}/` - Get role detail

### Organizations (`/api/v1/organizations/`)
- GET `/` - List organizations
- POST `/create/` - Create organization
- GET `/{id}/` - Get organization detail
- PUT `/{id}/update/` - Update organization
- GET `/{id}/members/` - List organization members
- POST `/{id}/members/add/` - Add member to organization
- GET `/{id}/members/{membership_id}/` - Get membership detail

## 🚧 Next Steps

1. Complete authentication views
2. Add JWT authentication
3. Create organization API views
4. Set up PostgreSQL with PostGIS
5. Add Region model with geospatial support
6. Build Farmer and Farm modules
7. Initialize Next.js frontend project

## 📚 Models Overview

### User Model
- Email-based authentication
- Extended profile fields (phone, employee_id, avatar, address)
- MFA support
- Email/phone verification status
- Soft-linked to organizations via memberships

### Organization Model
- Multi-tenant support
- Subscription tiers (free, basic, professional, enterprise)
- JSON settings for flexible configuration
- Branding support (logo)

### Role Model
- Custom RBAC with granular permissions
- Organization-specific roles
- JSON-based permission storage
- System roles (cannot be deleted)

### OrganizationMembership Model
- Links users to organizations
- Defines user role within organization
- Tracks who invited the user
- Active/inactive status

## 🔒 Security Features

- JWT-based authentication
- Password validation and hashing
- Secure password reset with expiring tokens
- CORS configuration
- Rate limiting (configured)
- Security headers middleware
- Soft delete for data retention

## 📄 License

Enterprise Software - All Rights Reserved

## 👥 Team

Farmetrics Development Team

---

**Last Updated**: November 3, 2025
**Version**: 0.1.0-alpha
**Status**: Active Development

