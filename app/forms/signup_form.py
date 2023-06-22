from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')

def user_length(form, field):
    username = field.data
    if len(username) < 6:
        raise ValidationError('Username must be 5 or more characters')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def valid_email(form, field):
    email = field.data
    if "@" not in email:
        raise ValidationError('Please enter a valid email')
    email_list = email.split('@')
    if len(email_list) > 2:
        raise ValidationError('Please enter a valid email')
    period_list1 = email_list[0].split('.')
    period_list2 = email_list[1].split('.')
    if len(period_list2) != 2:
        raise ValidationError('Please enter a valid email')
    for string in period_list1:
        if string.isalnum():
            pass
        else:
            raise ValidationError('Please do not include any special characters')
    
    for string in period_list2:
        if string.isalnum():
            pass
        else:
            raise ValidationError('Please do not include any special characters')
def password_len(form, field):
    password = field.data
    if len(password) < 6:
        raise ValidationError('Password must be at least 6 characters')



class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists, user_length])
    email = StringField('email', validators=[DataRequired(), user_exists, valid_email])
    password = StringField('password', validators=[DataRequired(), password_len])