"""
Staging-specific Django settings for Farmetrics project.
Similar to production but with some relaxed settings for testing.
"""

from .production import *

# Allow more verbose logging in staging
LOGGING['handlers']['console']['level'] = 'INFO'
LOGGING['loggers']['apps']['level'] = 'INFO'

# Sentry environment
if SENTRY_DSN:
    import sentry_sdk
    sentry_sdk.init(
        dsn=SENTRY_DSN,
        environment='staging',
    )

# Lower HSTS time for staging (easier to debug)
SECURE_HSTS_SECONDS = 3600  # 1 hour

print("🚀 Running in STAGING mode")

