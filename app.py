import os
import logging
from datetime import datetime
from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from werkzeug.middleware.proxy_fix import ProxyFix

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Set up database base class
class Base(DeclarativeBase):
    pass

# Initialize SQLAlchemy
db = SQLAlchemy(model_class=Base)

# Create the Flask app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "dev-secret-key")
app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1, x_host=1)

# Configure SQLite database
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DATABASE_URL", "sqlite:///society_management.db")
app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {
    "pool_recycle": 300,
    "pool_pre_ping": True,
}
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Initialize the app with the database extension
db.init_app(app)

# Import models after db initialization to avoid circular imports
from models import Contact

# Create all database tables
with app.app_context():
    db.create_all()

# Route for landing page
@app.route('/')
def index():
    return render_template('index.html')

# Route for features page
@app.route('/features')
def features():
    return render_template('features.html')

# Route for pricing page
@app.route('/pricing')
def pricing():
    return render_template('pricing.html')

# Route for contact page
@app.route('/contact')
def contact():
    return render_template('contact.html')

# Route for demo page
@app.route('/demo')
def demo():
    return render_template('demo.html')

# Route for form submission
@app.route('/submit', methods=['POST'])
def submit_form():
    try:
        # Get form data
        name = request.form.get('name')
        email = request.form.get('email')
        message = request.form.get('message')

        # Validate form data
        if not name or not email or not message:
            flash('Please fill in all required fields.', 'danger')
            return redirect(url_for('index'))

        # Create new contact
        new_contact = Contact(
            name=name,
            email=email,
            message=message,
            submission_date=datetime.now()
        )

        # Save to database
        db.session.add(new_contact)
        db.session.commit()

        # Show success message
        flash('Thank you for your message! We will get back to you soon.', 'success')
        return redirect(url_for('index'))

    except Exception as e:
        logging.error(f"Error processing form: {str(e)}")
        flash('An error occurred while submitting your message. Please try again.', 'danger')
        return redirect(url_for('index'))

# API endpoint for getting all contacts (admin purpose)
@app.route('/api/contacts', methods=['GET'])
def get_contacts():
    try:
        contacts = Contact.query.order_by(Contact.submission_date.desc()).all()
        result = []
        for contact in contacts:
            result.append({
                'id': contact.id,
                'name': contact.name,
                'email': contact.email,
                'message': contact.message,
                'submission_date': contact.submission_date.strftime('%Y-%m-%d %H:%M:%S')
            })
        return jsonify({"contacts": result})
    except Exception as e:
        logging.error(f"Error retrieving contacts: {str(e)}")
        return jsonify({"error": "Failed to retrieve contacts"}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
