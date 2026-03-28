#!/usr/bin/env bash
# exit on error
set -o errexit

# Ensure we are in the correct directory (backend) regardless of execution path
cd "$(dirname "$0")"

pip install -r requirements.txt

python manage.py collectstatic --no-input
python manage.py migrate
