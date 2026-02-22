# Setup & Usage Guide

## Quick Start

### 1. Install Dependencies

```bash
cd d:\Salmik-workspace\work-space1
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Routes

Navigate to these URLs to test the application:

### User Routes

- **Home Page**: `/`
  - Hero slider, featured products, categories, newsletter
- **Products Page**: `/products`
  - Filtering, sorting, search functionality
  - Click on product to view details
- **Product Detail**: `/product/[id]`
  - View product details, reviews, related products
  - Example: `/product/1`
- **Shopping Cart**: `/cart`
  - View items, adjust quantities, remove items
  - Proceed to checkout
- **Checkout**: `/checkout`
  - Fill shipping address
  - Select payment method
  - Place order
- **My Orders**: `/my-orders`
  - View order history
  - Track order status
  - (Requires login)
- **Login/Register**: `/login`
  - Create account or login
  - Mock authentication
- **About**: `/about`
  - Company information
- **Contact**: `/contact`
  - Contact form and details
- **Order Confirmation**: `/order-confirmation`
  - Order summary after placement

### Admin Routes

- **Dashboard**: `/admin`
  - Sales metrics, low stock alerts
- **Products Management**: `/admin/products`
  - View all products, add new products
- **Orders Management**: `/admin/orders`
  - View orders, update status
- **Customers**: `/admin/customers`
  - View customer list and stats

---

## Testing the Features

### Product Listing & Filtering

1. Go to `/products`
2. Try these filters:
   - Adjust price slider
   - Select a category
   - Choose rating filter
3. Use sort dropdown (Newest, Price, Rating)
4. Search in navbar

### Cart Functionality

1. Browse products
2. Click "Add to Cart" button
3. Go to `/cart` to view items
4. Adjust quantities or remove items
5. Note: Cart is saved to localStorage

### Checkout Flow

1. Add items to cart
2. Go to checkout
3. Fill in shipping address
4. Select payment method
5. Place order
6. View order confirmation at `/order-confirmation`

### Authentication

1. Go to `/login`
2. Click "Register" to create account
3. Fill in details and register
4. Login with credentials
5. Go to `/my-orders` to see your orders
6. Logout from navbar

### Admin Panel

1. Go to `/admin`
2. View dashboard metrics
3. Navigate to Products/Orders/Customers tabs
4. Try adding a product (form is functional)
5. Update order status in Orders section

---

## Data Persistence

### localStorage Keys

The app uses browser localStorage for:

```javascript
{
  "cart": [ /* cart items */ ],
  "user": { /* logged-in user */ },
  "orders": [ /* all orders */ ]
}
```

### To Clear Data

Open browser DevTools → Application → Clear localStorage

Default test data (products) loads from `/src/data/products.json`

---

## Component Overview

### Navigation Components

- **Navbar.js** - Sticky navigation with cart icon and search
- **Footer.js** - Footer with links and newsletter signup

### Page Sections

- **HeroSlider.js** - Auto-rotating banner (4 slides)
- **ProductCard.js** - Reusable product card component
- **FilterSidebar.js** - Price, category, rating filters
- **CategoriesSection.js** - 6 category showcase
- **NewsletterSection.js** - Email signup form
- **CartSummary.js** - Order summary with tax calculation
- **FeaturedSection.js** - Why choose us section
- **LoadingSpinner.js** - Loading state indicator

---

## Context API Usage

### 1. CartContext

```javascript
import { useCart } from "@/context/CartContext";

function MyComponent() {
  const { items, total, addToCart, removeFromCart } = useCart();
  // Use cart state and functions
}
```

### 2. AuthContext

```javascript
import { useAuth } from "@/context/AuthContext";

function MyComponent() {
  const { user, login, logout, register } = useAuth();
  // Use auth state and functions
}
```

### 3. ProductContext

```javascript
import { useProducts } from "@/context/ProductContext";

function MyComponent() {
  const { products, filteredProducts, filters, updateFilter } = useProducts();
  // Use products state and functions
}
```

---

## API Service Functions

### Products

```javascript
import { getProducts, getProductById, searchProducts } from "@/services/api";

getProducts(); // Get all 12 products
getProductById(1); // Get single product by ID
searchProducts("brush"); // Search by name/description
```

### Orders

```javascript
import { getOrders, createOrder, updateOrderStatus } from "@/services/api";

createOrder(orderData); // Create new order
getOrders(userId); // Get user's orders
updateOrderStatus(orderId, "shipped"); // Update status
```

### Admin

```javascript
import { getDashboardStats } from "@/services/api";

getDashboardStats(); // Get dashboard metrics
```

---

## Styling & Customization

### Tailwind Colors

```
Primary: brand (#CF942D)
Dark: brand-dark (#B8811F)
Light: brand-light (#FFF4E6)
Background: cream
```

### Custom Shadows

```
shadow-soft // Custom brand shadow
```

### Responsive Breakpoints

```
sm: 640px
md: 768px
lg: 1024px
```

---

## Common Tasks

### Add New Product

1. Go to `/admin/products`
2. Click "+ Add Product"
3. Fill in form (Name, Price, Stock, Category)
4. Save (mock implementation)

### Update Order Status

1. Go to `/admin/orders`
2. Click status dropdown
3. Select new status (Pending, Shipped, Delivered)
4. Status updates in real-time

### Modify Product Data

Edit `/src/data/products.json` directly:

```json
{
  "id": 1,
  "name": "Product Name",
  "category": "brushes",
  "price": 599,
  "mrp": 999,
  "rating": 4.2,
  "reviews": 45,
  "stock": 25
}
```

---

## Troubleshooting

### Issue: Products not in cart after page refresh

**Solution**: Check that localStorage is enabled in browser settings

### Issue: Routes not found (404)

**Solution**: Ensure you're using correct route format (`/product/1` not `/products/1`)

### Issue: Components not loading

**Solution**: Check browser console for errors, ensure all imports are correct

### Issue: Cart empty on new visit

**Solution**: This is expected - use login to persist orders across sessions

---

## Environment Setup

### Node Version

- Requires Node.js 16+ (Next.js 14 requirement)

### Package Manager

- npm or yarn

### Browser Support

- Chrome, Firefox, Safari (latest versions)
- Responsive on mobile devices

---

## Build for Production

```bash
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000)

---

## Next Steps

### To Add Real Backend:

1. Replace mock API with actual endpoints
2. Add environment variables for API URLs
3. Update Context API to call real endpoints
4. Add error handling for network requests

### To Add Payment Integration:

1. Sign up for Razorpay
2. Add Razorpay SDK to checkout page
3. Create payment endpoint on backend
4. Update order status after successful payment

### To Add Email Notifications:

1. Set up email service (SendGrid, Nodemailer)
2. Create email templates for orders
3. Send confirmation emails on order creation
4. Send status update emails

---

## File Structure Reference

```
✅ Context API Setup
├── CartContext.js (shopping cart state)
├── AuthContext.js (user authentication)
└── ProductContext.js (products & filtering)

✅ Reusable Components (9 total)
├── Navbar.js
├── Footer.js
├── ProductCard.js
├── FilterSidebar.js
├── HeroSlider.js
├── CartSummary.js
├── CategoriesSection.js
├── NewsletterSection.js
└── LoadingSpinner.js

✅ Page Components (9 pages + 4 admin pages)
├── Home
├── Products Listing
├── Product Detail
├── Cart
├── Checkout
├── My Orders
├── Login/Register
├── About
├── Contact
├── Admin Dashboard
├── Admin Products
├── Admin Orders
└── Admin Customers

✅ Services
├── API service with 15+ functions
└── Mock data with 12 products

✅ Utilities
├── Constants (routes, prices, categories)
├── Helper functions (format, validate, storage)
└── Custom hooks (useLocalStorage, useFetch)
```

---

## Performance Tips

1. **Use Image Optimization**: Replace placeholder images with optimized versions
2. **Implement Pagination**: Add pagination to product listing
3. **Lazy Load Components**: Use React.lazy() for heavy components
4. **Optimize Bundle**: Tree-shake unused code
5. **Cache API Responses**: Add caching layer to reduce API calls

---

## Security Notes

⚠️ **Current Implementation**:

- Uses localStorage (client-side only)
- No backend authentication
- Suitable for demo/learning purposes

✅ **For Production**:

- Implement JWT authentication
- Add HTTPS
- Validate on backend
- Use secure cookies for auth tokens
- Add CSRF protection
- Implement rate limiting

---

## Support & Resources

- **Next.js Docs**: https://nextjs.org/docs
- **React Docs**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com
- **JavaScript**: https://developer.mozilla.org/en-US/docs/Web/JavaScript

---

## Checklist for Launch

- [ ] All routes working
- [ ] Cart persisting correctly
- [ ] Search and filters functional
- [ ] Admin panel accessible
- [ ] Mobile responsiveness verified
- [ ] Images optimized
- [ ] Error handling in place
- [ ] Performance tested
- [ ] Accessibility checked
- [ ] SEO metadata added

---

Good luck building! 🚀
