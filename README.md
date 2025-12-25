# Portfolio Website

A modern, minimalistic portfolio website built with Flask, HTML, CSS, and JavaScript.

## Features

- Clean, modern design
- Responsive layout
- Sidebar navigation with scroll progress
- Smooth scrolling
- Contact form with Flask backend
- Mouse-following gradient effects
- Fade-in animations on scroll

## Setup

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

## Project Structure

```
.
├── app.py                 # Flask application
├── requirements.txt        # Python dependencies
├── templates/
│   └── index.html        # Main HTML template
├── static/
│   ├── css/
│   │   └── style.css    # Stylesheet
│   └── js/
│       └── main.js      # JavaScript functionality
└── README.md
```

## Development

The application runs in debug mode by default. For production, set the `SECRET_KEY` environment variable and disable debug mode.

## Technologies

- **Backend**: Flask (Python)
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Design**: Modern, minimalistic, dark theme
