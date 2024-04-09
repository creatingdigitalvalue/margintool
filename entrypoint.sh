#!/bin/bash
set -e

# Run PostgreSQL initialization script
psql -U postgres -d margintool -a -f ./init.sql

# Start PostgreSQL
exec "$@"