# Testing Property Images Feature

## Prerequisites
1. Backend running on `http://localhost:3000`
2. Database with some properties
3. JWT token for authentication (if needed)

## Test Scenarios

### 1. List all published properties with images
```bash
curl -X GET http://localhost:3000/api/properties \
  -H "Content-Type: application/json"
```

**Expected Response:**
```json
[
  {
    "id": "property-uuid",
    "title": "Casa Espaçosa",
    "description": "Descrição da casa...",
    "price": 2000,
    "currency": "MZN",
    "bedrooms": 2,
    "bathrooms": 2,
    "city": "Maputo",
    "images": [
      {
        "id": "image-uuid",
        "url": "https://example.com/image1.jpg",
        "altText": "Sala de estar",
        "isCover": true,
        "sortOrder": 0
      }
    ],
    "owner": {
      "id": "owner-uuid",
      "name": "Samuel Tembe",
      "phone": "+258821410299"
    }
  }
]
```

### 2. Get property details with all images
```bash
curl -X GET http://localhost:3000/api/properties/{propertyId} \
  -H "Content-Type: application/json"
```

### 3. Add image to property
```bash
curl -X POST http://localhost:3000/api/properties/{propertyId}/images \
  -H "Authorization: Bearer {JWT_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com/images/sala.jpg",
    "altText": "Sala de estar espaçosa",
    "isCover": true,
    "sortOrder": 0
  }'
```

### 4. Get all images for a property
```bash
curl -X GET http://localhost:3000/api/properties/{propertyId}/images \
  -H "Content-Type: application/json"
```

### 5. Update image metadata
```bash
curl -X PATCH http://localhost:3000/api/properties/{propertyId}/images/{imageId} \
  -H "Authorization: Bearer {JWT_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "isCover": false,
    "sortOrder": 2
  }'
```

### 6. Delete image
```bash
curl -X DELETE http://localhost:3000/api/properties/{propertyId}/images/{imageId} \
  -H "Authorization: Bearer {JWT_TOKEN}" \
  -H "Content-Type: application/json"
```

## Frontend Testing

### 1. View property list
- Navigate to `http://localhost:3000/casas`
- Should display grid of properties with cover images

### 2. View property details
- Click on any property
- Should navigate to `/imovel/{propertyId}`
- Display full description
- Show all images

### 3. Test image gallery
- On property page, click "12 Fotos" button
- Should open lightbox view
- Can navigate with arrow buttons
- Counter shows "1/12" format
- Close button at top right

## Sample Property Data

If no properties exist, create one:

```bash
# 1. Create property
curl -X POST http://localhost:3000/api/properties \
  -H "Authorization: Bearer {JWT_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Apartamento T2 em Maputo",
    "slug": "apartamento-t2-maputo",
    "description": "Imóvel moderno e bem localizado\nPróximo de escolas e comércio\n2 quartos, 2 banheiros\n2500 MZN por mês",
    "type": "APARTMENT",
    "purpose": "RENT",
    "status": "PUBLISHED",
    "price": 2500,
    "currency": "MZN",
    "bedrooms": 2,
    "bathrooms": 2,
    "address": "Avenida Julius Nyerere, Maputo",
    "city": "Maputo",
    "district": "Polana",
    "province": "Maputo"
  }'

# 2. Save the returned ID as {propertyId}

# 3. Add images
curl -X POST http://localhost:3000/api/properties/{propertyId}/images \
  -H "Authorization: Bearer {JWT_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://via.placeholder.com/800x600?text=Sala+de+Estar",
    "altText": "Sala de estar",
    "isCover": true,
    "sortOrder": 0
  }'

curl -X POST http://localhost:3000/api/properties/{propertyId}/images \
  -H "Authorization: Bearer {JWT_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://via.placeholder.com/800x600?text=Quarto+1",
    "altText": "Primeiro quarto",
    "isCover": false,
    "sortOrder": 1
  }'

curl -X POST http://localhost:3000/api/properties/{propertyId}/images \
  -H "Authorization: Bearer {JWT_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://via.placeholder.com/800x600?text=Cozinha",
    "altText": "Cozinha equipada",
    "isCover": false,
    "sortOrder": 2
  }'
```

## Troubleshooting

### Images not showing in frontend
1. Check `NEXT_PUBLIC_API_URL` in `.env.local`
2. Verify backend is running on correct port
3. Check browser console for errors
4. Verify property has `status: 'PUBLISHED'`

### 401 Unauthorized on image operations
1. Include valid JWT token in `Authorization` header
2. Make sure user is the property owner (or admin)

### Images not appearing in lightbox
1. Check image URLs are valid and publicly accessible
2. Verify CORS is enabled in backend
3. Check browser console for network errors

### Property not found error
1. Verify property ID is correct UUID
2. Check property status is 'PUBLISHED'
3. Ensure database connection is working
