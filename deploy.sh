#!/bin/bash

# Configuration
APP_NAME="vid.bd"
PORT=3070

echo "🚀 Starting deployment for $APP_NAME..."

# 1. Pull latest code
echo "📥 Pulling latest changes from Git..."
git pull origin main
if [ $? -ne 0 ]; then
    echo "❌ Git pull failed. Deployment aborted."
    exit 1
fi

# 2. Install dependencies
echo "📦 Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ NPM install failed. Deployment aborted."
    exit 1
fi

# 3. Build the project
echo "🛠 Building the project..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Build failed! Keeping the previous version running."
    echo "⚠️ Please check the error logs above."
    exit 1
fi

# 4. Restart/Reload with PM2
echo "🔄 Restarting service with PM2 on port $PORT..."

# Check if the process is already running in PM2
pm2 describe $APP_NAME > /dev/null
RUNNING=$?

if [ $RUNNING -eq 0 ]; then
    echo "✅ Application is already running. Performing zero-downtime reload..."
    pm2 reload $APP_NAME
else
    echo "✨ Application not found in PM2. Starting new process..."
    pm2 start npm --name "$APP_NAME" -- start -- -p $PORT
fi

echo "🎉 Deployment successful! $APP_NAME is running on port $PORT."
pm2 save
