#!/usr/bin/env bash
# exit on error
set -o errexit

# Ensure we are in the correct directory (backend) regardless of execution path
cd "$(dirname "$0")"

pip install -r requirements.txt

python manage.py collectstatic --no-input
python manage.py migrate

if [[ -n "$DJANGO_SUPERUSER_USERNAME" && -n "$DJANGO_SUPERUSER_PASSWORD" && -n "$DJANGO_SUPERUSER_EMAIL" ]]; then
    echo "Attempting to create superuser..."
    python manage.py createsuperuser --noinput || echo "Superuser $DJANGO_SUPERUSER_USERNAME already exists."
fi
