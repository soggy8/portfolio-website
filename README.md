# Portfolio Website

A modern, minimalistic portfolio website built with Flask, HTML, CSS, and JavaScript. Features bilingual support (English/Macedonian).

## Features

- Clean, modern dark theme design
- Responsive layout
- **Bilingual support** (English / Macedonian) with language toggle
- Sidebar navigation with scroll progress
- Smooth scrolling
- Contact form with Flask backend
- Mouse-following gradient effects
- Fade-in animations on scroll
- Achievements & Awards showcase
- Projects portfolio
- Skills grid

## Quick Start

### Option 1: Docker Compose (Recommended)

```bash
# Production mode
docker-compose up -d

# Development mode (with hot reload)
docker-compose --profile dev up portfolio-dev
```

The website will be available at:
- **Production**: http://localhost:5000
- **Development**: http://localhost:5001

### Option 2: Manual Setup

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Run the Flask application:
```bash
python app.py
```

3. Open your browser and navigate to:
```
http://localhost:5000
```

## Docker Commands

```bash
# Build and start in background
docker-compose up -d --build

# View logs
docker-compose logs -f portfolio

# Stop containers
docker-compose down

# Rebuild after changes
docker-compose up -d --build --force-recreate
```

## Project Structure

```
.
├── app.py                  # Flask application
├── Dockerfile              # Docker image configuration
├── docker-compose.yml      # Docker Compose services
├── requirements.txt        # Python dependencies
├── templates/
│   └── index.html          # Main HTML template
├── static/
│   ├── css/
│   │   └── style.css       # Stylesheet
│   ├── js/
│   │   ├── main.js         # JavaScript functionality
│   │   └── translations.js # EN/MK translations
│   └── img/
│       └── profilna.png    # Profile image
└── README.md
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `SECRET_KEY` | Flask secret key | `dev-secret-key-change-in-production` |
| `FLASK_ENV` | Environment mode | `production` |

## Technologies

- **Backend**: Flask (Python), Gunicorn
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Design**: Modern, minimalistic, dark theme
- **Containerization**: Docker, Docker Compose
- **Font**: JetBrains Mono

## Author

**Andrej Trendov** - Full-stack Developer & Electronics Enthusiast
- Email: atrendov1@gmail.com
- GitHub: [@soggy8](https://github.com/soggy8)
