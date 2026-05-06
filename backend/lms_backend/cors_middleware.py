"""
Custom CORS middleware as a fail-safe.
This ensures CORS headers are ALWAYS set correctly,
even if django-cors-headers has issues.
"""

import re

# Origins we trust
ALLOWED_ORIGIN_PATTERNS = [
    re.compile(r"^https://aideas-lms.*\.vercel\.app$"),
    re.compile(r"^https://.*kratos1911s-projects\.vercel\.app$"),
    re.compile(r"^http://localhost:\d+$"),
    re.compile(r"^http://127\.0\.0\.1:\d+$"),
]

EXACT_ORIGINS = {
    "https://aideas-lms.vercel.app",
}


def is_allowed_origin(origin):
    if not origin:
        return False
    if origin in EXACT_ORIGINS:
        return True
    for pattern in ALLOWED_ORIGIN_PATTERNS:
        if pattern.match(origin):
            return True
    return False


class ForceCORSMiddleware:
    """
    Sits at the very top of the middleware stack.
    If the request Origin is one we trust, inject the correct
    CORS headers on EVERY response — including preflight OPTIONS.
    """

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        origin = request.META.get("HTTP_ORIGIN", "")

        # Handle preflight OPTIONS immediately
        if request.method == "OPTIONS" and is_allowed_origin(origin):
            from django.http import HttpResponse

            response = HttpResponse(status=204)
            response["Access-Control-Allow-Origin"] = origin
            response["Access-Control-Allow-Credentials"] = "true"
            response["Access-Control-Allow-Methods"] = "GET, POST, PUT, PATCH, DELETE, OPTIONS"
            response["Access-Control-Allow-Headers"] = (
                "Accept, Authorization, Content-Type, Origin, "
                "X-CSRFToken, X-Requested-With"
            )
            response["Access-Control-Max-Age"] = "3600"
            return response

        response = self.get_response(request)

        if is_allowed_origin(origin):
            response["Access-Control-Allow-Origin"] = origin
            response["Access-Control-Allow-Credentials"] = "true"

        return response
