#!/bin/bash

# AirStudio Backup & Restore Script
# Usage: ./backup.sh [backup|restore|list]

PROJECT_NAME="airstudio"
BACKUP_DIR="$HOME/Documents/backups/$PROJECT_NAME"
PROJECT_DIR="$PWD"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

backup() {
    echo -e "${YELLOW}🔄 Creating backup...${NC}"
    
    # Get current timestamp
    TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
    BACKUP_NAME="backup_${TIMESTAMP}"
    
    # Create backup
    cp -r "$PROJECT_DIR" "$BACKUP_DIR/$BACKUP_NAME"
    
    # Remove node_modules and .next from backup to save space
    rm -rf "$BACKUP_DIR/$BACKUP_NAME/node_modules"
    rm -rf "$BACKUP_DIR/$BACKUP_NAME/.next"
    
    echo -e "${GREEN}✅ Backup created: $BACKUP_NAME${NC}"
    echo -e "${GREEN}📁 Location: $BACKUP_DIR/$BACKUP_NAME${NC}"
    
    # Keep only last 5 backups
    cd "$BACKUP_DIR"
    ls -t | tail -n +6 | xargs -r rm -rf
    echo -e "${YELLOW}🧹 Cleaned old backups (keeping last 5)${NC}"
}

restore() {
    echo -e "${YELLOW}📋 Available backups:${NC}"
    list_backups
    
    echo -e "${YELLOW}Enter backup name to restore (or 'cancel'):${NC}"
    read -r backup_name
    
    if [ "$backup_name" = "cancel" ]; then
        echo -e "${RED}❌ Restore cancelled${NC}"
        exit 0
    fi
    
    if [ -d "$BACKUP_DIR/$backup_name" ]; then
        echo -e "${RED}⚠️  This will overwrite your current project. Continue? (y/N):${NC}"
        read -r confirm
        
        if [ "$confirm" = "y" ] || [ "$confirm" = "Y" ]; then
            # Backup current state before restore
            echo -e "${YELLOW}🔄 Creating safety backup of current state...${NC}"
            backup
            
            # Restore
            echo -e "${YELLOW}🔄 Restoring from $backup_name...${NC}"
            rm -rf "$PROJECT_DIR"/*
            cp -r "$BACKUP_DIR/$backup_name"/* "$PROJECT_DIR/"
            
            # Reinstall dependencies
            echo -e "${YELLOW}📦 Reinstalling dependencies...${NC}"
            npm install
            
            echo -e "${GREEN}✅ Restore completed!${NC}"
            echo -e "${GREEN}🚀 Run 'npm run dev' to start the server${NC}"
        else
            echo -e "${RED}❌ Restore cancelled${NC}"
        fi
    else
        echo -e "${RED}❌ Backup not found: $backup_name${NC}"
    fi
}

list_backups() {
    if [ -d "$BACKUP_DIR" ] && [ "$(ls -A $BACKUP_DIR)" ]; then
        echo -e "${GREEN}📁 Available backups:${NC}"
        ls -la "$BACKUP_DIR" | grep "^d" | awk '{print $9}' | grep -v "^\.$" | grep -v "^\.\.$" | sort -r
    else
        echo -e "${RED}❌ No backups found${NC}"
    fi
}

git_rollback() {
    echo -e "${YELLOW}🔄 Git rollback options:${NC}"
    echo "1. Rollback to stable version (v1.0-stable)"
    echo "2. Rollback to previous commit"
    echo "3. Show recent commits"
    echo "4. Cancel"
    
    read -r choice
    
    case $choice in
        1)
            echo -e "${YELLOW}🔄 Rolling back to stable version...${NC}"
            git checkout v1.0-stable
            npm install
            echo -e "${GREEN}✅ Rolled back to stable version!${NC}"
            ;;
        2)
            echo -e "${YELLOW}🔄 Rolling back to previous commit...${NC}"
            git reset --hard HEAD~1
            npm install
            echo -e "${GREEN}✅ Rolled back to previous commit!${NC}"
            ;;
        3)
            echo -e "${YELLOW}📋 Recent commits:${NC}"
            git log --oneline -10
            ;;
        4)
            echo -e "${RED}❌ Cancelled${NC}"
            ;;
        *)
            echo -e "${RED}❌ Invalid option${NC}"
            ;;
    esac
}

# Main script logic
case "$1" in
    backup)
        backup
        ;;
    restore)
        restore
        ;;
    list)
        list_backups
        ;;
    git)
        git_rollback
        ;;
    *)
        echo -e "${YELLOW}🛠️  AirStudio Backup & Restore Tool${NC}"
        echo ""
        echo "Usage: $0 [command]"
        echo ""
        echo "Commands:"
        echo "  backup   - Create a backup of current project"
        echo "  restore  - Restore from a backup"
        echo "  list     - List available backups"
        echo "  git      - Git rollback options"
        echo ""
        echo "Examples:"
        echo "  $0 backup"
        echo "  $0 restore"
        echo "  $0 git"
        ;;
esac 