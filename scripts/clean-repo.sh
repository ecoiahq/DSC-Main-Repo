#!/bin/bash

echo "🧹 Starting repository cleanup..."

# Remove common temporary files and directories
echo "Removing temporary files..."
find . -name ".DS_Store" -type f -delete 2>/dev/null || true
find . -name "Thumbs.db" -type f -delete 2>/dev/null || true
find . -name "*.tmp" -type f -delete 2>/dev/null || true
find . -name "*.temp" -type f -delete 2>/dev/null || true

# Clean up log files
echo "Cleaning log files..."
find . -name "*.log" -type f -delete 2>/dev/null || true
find . -name "npm-debug.log*" -type f -delete 2>/dev/null || true
find . -name "yarn-debug.log*" -type f -delete 2>/dev/null || true
find . -name "yarn-error.log*" -type f -delete 2>/dev/null || true

# Remove editor backup files
echo "Removing editor backup files..."
find . -name "*~" -type f -delete 2>/dev/null || true
find . -name "*.swp" -type f -delete 2>/dev/null || true
find . -name "*.swo" -type f -delete 2>/dev/null || true

# Clean up any duplicate or backup files
echo "Removing backup files..."
find . -name "*.bak" -type f -delete 2>/dev/null || true
find . -name "*.backup" -type f -delete 2>/dev/null || true

# Remove any empty directories (except .git and node_modules)
echo "Removing empty directories..."
find . -type d -empty -not -path "./.git*" -not -path "./node_modules*" -delete 2>/dev/null || true

# Clean up any potential duplicate image files
echo "Checking for duplicate images..."
# This is a safe check that won't delete anything, just reports
if [ -d "public" ]; then
    echo "Public directory structure:"
    ls -la public/ 2>/dev/null || true
fi

echo "✅ Repository cleanup completed!"
echo "📊 Current directory size:"
du -sh . 2>/dev/null || echo "Size calculation not available"

echo ""
echo "🔍 Repository status:"
echo "- Temporary files: Removed"
echo "- Log files: Cleaned"
echo "- Backup files: Removed" 
echo "- Empty directories: Cleaned"
echo ""
echo "✨ Repository is now clean and optimized!"
