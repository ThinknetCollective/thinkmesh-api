#!/bin/bash

echo "Setting up MySQL database..."

# Check if MySQL is running
if ! pgrep -x "mysqld" > /dev/null; then
    echo "MySQL is not running. Please start MySQL first."
    echo "On macOS: brew services start mysql"
    echo "On Ubuntu: sudo service mysql start"
    echo "On Windows: Start MySQL service from Services"
    exit 1
fi

# Create database
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS meshnode_db; SHOW DATABASES;"

echo "Database setup completed!"
