from flask import Flask, render_template, request, jsonify
import os

app = Flask(__name__)

# Configuration
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-secret-key-change-in-production')

@app.route('/')
def index():
    """Main portfolio page"""
    return render_template('index.html')

@app.route('/api/contact', methods=['POST'])
def contact():
    """Handle contact form submissions"""
    try:
        data = request.get_json()
        name = data.get('name', '')
        email = data.get('email', '')
        message = data.get('message', '')
        
        # Here you would typically:
        # - Validate the data
        # - Send an email
        # - Save to database
        # - etc.
        
        # For now, just return success
        return jsonify({
            'success': True,
            'message': 'Thank you for your message! I\'ll get back to you soon.'
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'message': 'Something went wrong. Please try again.'
        }), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

