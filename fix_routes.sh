#!/bin/bash

# Function to fix a route file
fix_route() {
    file=$1
    echo "Fixing $file..."
    
    sed -i 's/{ params }: { params: { id: string } }/{ params }: { params: Promise<{ id: string }> }/g' "$file"
    sed -i '/const { id } = await params;/!b' "$file"
    
    # Add the await if not present
    if ! grep -q "const { id } = await params;" "$file"; then
        sed -i '/{ params }: { params: Promise<{ id: string }> }/a\  const { id } = await params;' "$file"
    fi
    
    sed -i 's/where: { id: params\.id }/where: { id }/g' "$file"
}

# Fix all route files
find ./app/api -name "route.ts" -type f | while read file; do
    if grep -q "params: { id: string }" "$file"; then
        fix_route "$file"
    fi
done

echo "Done!"
