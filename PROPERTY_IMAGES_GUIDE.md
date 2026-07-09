# Property Description and Images Feature

## Overview
Each property now has its own description, images gallery, and contact information. Properties are displayed with full details and a professional image gallery.

## Features Implemented

### 1. Dynamic Property Pages
- **Route**: `/imovel/[id]` - View individual property details
  - Full description of the property
  - Image gallery with lightbox
  - Property specifications (bedrooms, bathrooms, area, etc.)
  - Owner contact information
  - Address and location details

- **Route**: `/casas` - Browse all properties
  - Grid view of available properties
  - Quick stats (price, bedrooms, bathrooms)
  - Click to view full details

### 2. Image Management
Each property can have multiple images with:
- Cover image support
- Custom sort order
- Alt text for accessibility
- Full URL storage

### 3. Image Gallery Features
- Lightbox view for full-size images
- Navigate between images with prev/next buttons
- See current image count (e.g., "1/12")
- Responsive design

## How to Use

### Setup
1. Configure the API URL in `frontend/.env.local`:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   ```

2. Start the backend (NestJS):
   ```bash
   cd backend
   npm install
   npm run start:dev
   ```

3. Start the frontend (Next.js):
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

### Creating a Property with Images

**Step 1: Create a Property**
```bash
curl -X POST http://localhost:3000/api/properties \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Casa Espaçosa em Maputo",
    "slug": "casa-espacosa-maputo",
    "description": "Imóvel disponível para arrendamento\n5 mins da estrada principal\nImóvel espaçoso e cómodo\n2000 MZN por mês",
    "type": "HOUSE",
    "purpose": "RENT",
    "price": 2000,
    "currency": "MZN",
    "bedrooms": 2,
    "bathrooms": 2,
    "address": "Rua Principal, Maputo",
    "city": "Maputo",
    "district": "Mafalala",
    "province": "Gaza"
  }'
```

**Step 2: Upload Images**
```bash
curl -X POST http://localhost:3000/api/properties/{propertyId}/images \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com/image1.jpg",
    "altText": "Sala de estar",
    "isCover": true,
    "sortOrder": 0
  }'
```

### Viewing Properties
- Visit `/casas` to see all properties
- Click on any property to see full details with images
- Click "12 Fotos" button to open lightbox gallery
- Navigate through images with arrow buttons

### Managing Images

**Get all images for a property:**
```bash
GET /api/properties/{propertyId}/images
```

**Add an image:**
```bash
POST /api/properties/{propertyId}/images
Body: {
  "url": "https://example.com/image.jpg",
  "altText": "Description",
  "isCover": false,
  "sortOrder": 1
}
```

**Update an image:**
```bash
PATCH /api/properties/{propertyId}/images/{imageId}
Body: {
  "isCover": true,
  "sortOrder": 0
}
```

**Delete an image:**
```bash
DELETE /api/properties/{propertyId}/images/{imageId}
```

## Database Schema

### PropertyImage Model
```prisma
model PropertyImage {
  id         String   @id @default(uuid())
  url        String       // Image URL
  altText    String?      // Alt text for accessibility
  isCover    Boolean  @default(false)  // Mark as cover image
  sortOrder  Int      @default(0)      // Display order
  createdAt  DateTime @default(now())

  propertyId String
  property   Property @relation(fields: [propertyId], references: [id], onDelete: Cascade)

  @@index([propertyId])
  @@index([isCover])
}
```

## Frontend Components

### API Utilities (`frontend/lib/api.ts`)
- `getProperty(id)` - Fetch property with all images and details
- `getProperties(filters)` - List all published properties
- Type definitions for `Property`, `PropertyImage`, `PropertyOwner`

### Pages
- `app/imovel/[id]/page.tsx` - Property detail with gallery
- `app/casas/page.tsx` - Properties listing

## Notes
- Properties must have `status: 'PUBLISHED'` to appear in listings
- Images are returned ordered by `sortOrder` ascending
- Cover images can be filtered by `isCover: true`
- All image management requires JWT authentication
- Images are stored as URLs (not uploaded to server directly)

## Future Enhancements
- Direct image upload to server storage
- Image optimization/resizing
- Video support for properties
- Virtual tours
- 360° photography support
