#!/bin/bash

# API Testing Script for MeshNodes
echo "í·ª Testing MeshNodes API..."

BASE_URL="http://localhost:3000/api/v1"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

print_test() {
    echo -e "${BLUE}Testing:${NC} $1"
}

print_success() {
    echo -e "${GREEN}âœ“${NC} $1"
}

print_error() {
    echo -e "${RED}âœ—${NC} $1"
}

# Test 1: Register a user
print_test "User Registration"
REGISTER_RESPONSE=$(curl -s -X POST $BASE_URL/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }')

echo "Registration Response: $REGISTER_RESPONSE"

# Extract token from response
TOKEN=$(echo $REGISTER_RESPONSE | grep -o '"access_token":"[^"]*' | cut -d'"' -f4)

if [ ! -z "$TOKEN" ]; then
    print_success "User registered successfully"
    echo "Token: $TOKEN"
else
    print_error "Registration failed"
    exit 1
fi

# Test 2: Login
print_test "User Login"
LOGIN_RESPONSE=$(curl -s -X POST $BASE_URL/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }')

echo "Login Response: $LOGIN_RESPONSE"
print_success "Login test completed"

# Test 3: Create MeshNode
print_test "Creating MeshNode"
CREATE_RESPONSE=$(curl -s -X POST $BASE_URL/mesh-nodes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title": "Climate Change Solutions",
    "description": "Discussing innovative approaches to combat climate change",
    "category": "Environment",
    "tags": ["climate", "sustainability", "innovation"],
    "status": "ACTIVE"
  }')

echo "Create MeshNode Response: $CREATE_RESPONSE"
print_success "MeshNode creation test completed"

# Test 4: Get all MeshNodes
print_test "Getting all MeshNodes"
GET_ALL_RESPONSE=$(curl -s -H "Authorization: Bearer $TOKEN" $BASE_URL/mesh-nodes)
echo "Get All Response: $GET_ALL_RESPONSE"
print_success "Get all MeshNodes test completed"

# Test 5: Get MeshNode by ID
print_test "Getting MeshNode by ID"
GET_ONE_RESPONSE=$(curl -s -H "Authorization: Bearer $TOKEN" $BASE_URL/mesh-nodes/1)
echo "Get One Response: $GET_ONE_RESPONSE"
print_success "Get MeshNode by ID test completed"

echo -e "${GREEN}í¾‰ All API tests completed!${NC}"
