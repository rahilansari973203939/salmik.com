# Shiny Hub - Ecommerce Platform

A complete full-stack ecommerce platform for hair care products built with Next.js 14, React, Tailwind CSS, and Context API.

## Features Implemented

### 🛍️ User-Facing Features

#### 1. **Home Page**

- Hero Slider (4 auto-rotating slides)
- Featured Products Grid (8 cards with discount badges)
- Categories Section (6 categories with icons)
- Newsletter Signup Section
- Features Section (Free Shipping, Secure Payment, etc.)
- Footer with links and contact info

#### 2. **Product Listing**

- Filter Sidebar
  - Price Range Slider (₹100-₹2000)
  - Category Filter (Brushes, Sprays, Oils, Masks, Serums, Kits)
  - Rating Filter (3+⭐, 4+⭐, All)
- Sort Dropdown (Newest, Price Low-High, Price High-Low, Top Rated)
- Search Bar (in Navbar)
- 3-Column Grid Layout (responsive)
- Product Cards with:
  - Image with discount badge
  - Rating & Reviews count
  - Price with MRP strikethrough
  - Add to Cart button with feedback

#### 3. **Product Detail Page**

- Image Gallery with thumbnails
- Product Title & Description
- Price details with savings amount
- Features list with checkmarks
- Size selector (Small, Medium, Large)
- Quantity selector (+/-)
- Add to Cart & Buy Now buttons
- Reviews section (5 reviews)
- Related Products (4 items)
- Stock status indicator

#### 4. **Shopping Cart**

- Cart Items Display
  - Product image, name, price
  - Quantity adjustment (+/-)
  - Remove item button
- Subtotal calculation
- Cart persistence (localStorage)
- Empty cart message with link to shop
- Proceed to Checkout button

#### 5. **Checkout**

- Shipping Address Form
  - Full Name, Email, Phone
  - Address, City, State, ZIP
- Payment Method Selection
  - Credit/Debit Card
  - Razorpay
  - Cash on Delivery
- Order Summary with tax calculation
- Order placement with confirmation

#### 6. **My Orders**

- Order history list
- Order details (ID, Date, Total, Status)
- Order progress tracker
- Order items display
- Status badges (Pending, Shipped, Delivered)

#### 7. **Authentication**

- Login page
- Register page
- Email/Password authentication
- Mock OTP flow (ready for real implementation)
- User session persistence

#### 8. **Static Pages**

- About page with company info and values
- Contact page with form and contact details
- Order Confirmation page with summary

---

### 👨‍💼 Admin Panel (/admin route)

#### 1. **Dashboard**

- Key Metrics Cards
  - Total Sales (₹ amount)
  - Today's Orders (count)
  - Total Orders (count)
  - Low Stock Alerts (count)
- Sales Chart (placeholder)
- Low Stock Products Alert

#### 2. **Products Management**

- Products table with all items
- Stock status indicators
- Add Product Form
  - Name, Price, Stock, Category inputs
  - Image upload support
- Edit/Delete actions
- Stock level highlighting

#### 3. **Orders Management**

- Orders table with details
- Order ID, Customer, Total, Date
- Status dropdown (Pending, Shipped, Delivered)
- View & Invoice buttons
- Real-time status updates

#### 4. **Customers Management**

- Customers list table
- Customer details (Name, Email, Orders count, Total Spent)
- View Orders & Block customer actions

---

## Technical Stack

### Frontend

- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **State Management**: Context API
  - CartContext: Shopping cart management
  - AuthContext: User authentication
  - ProductContext: Products & filtering

### Backend (Mock)

- **API**: API service with localStorage
- **Data**: Mock JSON products
- **Database**: localStorage for persistence

### Features

- Responsive Design (Mobile-first)
- Sticky Navbar
- Real-time Cart Updates
- Search & Filter
- Mock Razorpay Integration
- Loading Spinners
- Toast Notifications (ready)
- Dark Mode Ready (Tailwind config)

---

## Folder Structure

```
project-root/
├── app/                          # Next.js App Router
│   ├── layout.js                 # Root layout with providers
│   ├── page.js                   # Home page
│   ├── providers.js              # Context providers
│   ├── products/                 # Product listing route
│   ├── product/[id]/             # Product detail route
│   ├── cart/                     # Cart page route
│   ├── checkout/                 # Checkout page route
│   ├── my-orders/                # My orders page route
│   ├── login/                    # Auth page route
│   ├── about/                    # About page route
│   ├── contact/                  # Contact page route
│   ├── order-confirmation/       # Confirmation page route
│   ├── admin/                    # Admin panel routes
│   │   ├── page.js               # Dashboard
│   │   ├── products/
│   │   ├── orders/
│   │   └── customers/
│   ├── globals.css               # Global styles
│   └── layout.css                # Layout styles
│
├── src/
│   ├── components/               # Reusable components
│   │   ├── Navbar.js
│   │   ├── Footer.js
│   │   ├── ProductCard.js
│   │   ├── FilterSidebar.js
│   │   ├── HeroSlider.js
│   │   ├── CartSummary.js
│   │   ├── CategoriesSection.js
│   │   ├── NewsletterSection.js
│   │   ├── FeaturedSection.js
│   │   └── LoadingSpinner.js
│   │
│   ├── pages/                    # Page components
│   │   ├── home.js
│   │   ├── products.js
│   │   ├── product-detail.js
│   │   ├── cart.js
│   │   ├── checkout.js
│   │   ├── my-orders.js
│   │   ├── login.js
│   │   ├── about.js
│   │   ├── contact.js
│   │   ├── order-confirmation.js
│   │   ├── admin-dashboard.js
│   │   ├── admin-products.js
│   │   ├── admin-orders.js
│   │   └── admin-customers.js
│   │
│   ├── context/                  # Context API
│   │   ├── CartContext.js
│   │   ├── AuthContext.js
│   │   └── ProductContext.js
│   │
│   ├── services/                 # API services
│   │   └── api.js
│   │
│   ├── hooks/                    # Custom hooks (ready for use)
│   │
│   ├── data/                     # Mock data
│   │   └── products.json
│   │
│   └── utils/                    # Utilities (ready for use)
│
├── public/                       # Static assets
│   └── images/                   # Product images
│
├── package.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

---

## Getting Started

### Installation

```bash
npm install
```

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm run start
```

---

## API & Data Management

### Mock Products

- 12 pre-loaded hair care products
- Categories: Brushes, Sprays, Oils, Masks, Serums, Kits
- Price range: ₹199 - ₹899
- Ratings: 4.0 - 4.7 ⭐
- Stock levels: 18 - 60 units

### localStorage Keys

- `cart`: Shopping cart items
- `user`: Logged-in user data
- `orders`: Order history
- `allUsers`: All registered users

### API Functions

#### Products

- `getProducts()` - Get all products
- `getProductById(id)` - Get single product
- `getCategories()` - Get all categories
- `searchProducts(query)` - Search products
- `filterProducts(filters)` - Apply filters

#### Orders

- `getOrders(userId)` - Get user's orders
- `createOrder(orderData)` - Create new order
- `updateOrderStatus(orderId, status)` - Update order status
- `getTrackingInfo(orderId)` - Get tracking details

#### Admin

- `getDashboardStats()` - Dashboard metrics
- `getCustomers()` - All customers list

---

## Context API Usage

### CartContext

```javascript
const {
  items,
  total,
  itemCount,
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
} = useCart();
```

### AuthContext

```javascript
const { user, isLoading, register, login, logout } = useAuth();
```

### ProductContext

```javascript
const {
  products,
  filteredProducts,
  isLoading,
  filters,
  sortBy,
  updateFilter,
  setSortBy,
  getProductById,
  getRelatedProducts,
} = useProducts();
```

---

## Styling

### Tailwind Configuration

- Custom colors:
  - `brand`: #CF942D (Primary)
  - `brand-dark`: #B8811F (Dark variant)
  - `brand-light`: #FFF4E6 (Light variant)
- Custom shadows: `shadow-soft`
- Responsive breakpoints: sm (640px), md (768px), lg (1024px)

### Color Scheme

- Primary: Golden Orange (#CF942D)
- Background: Cream White (#FFF4E6)
- Text: Dark Gray (#333333)
- Accents: Green, Red, Blue for status

---

## Key Features Implementation

### 1. Shopping Cart Persistence

- Auto-saves to localStorage
- Loads on app startup
- Updates in real-time

### 2. Smart Filtering

- Multiple filters (category, price, rating)
- Search integration
- Combined filtering logic
- Real-time updates

### 3. State Management

- Context API for global state
- Optimized with useReducer (Cart)
- Minimal re-renders
- Clean provider pattern

### 4. Responsive Design

- Mobile-first approach
- Tailwind breakpoints
- Flexible grid layouts
- Sticky header

---

## Ready-to-Implement Features

### Can be quickly added:

1. **Real Payment Integration** - Razorpay SDK
2. **Email Notifications** - SendGrid/Nodemailer
3. **Database** - MongoDB/PostgreSQL with Prisma
4. **Authentication** - NextAuth.js OAuth
5. **Image Upload** - Cloudinary integration
6. **Analytics** - Google Analytics
7. **Dark Mode** - Toggle with localStorage
8. **Reviews & Ratings** - User-submitted reviews
9. **Wishlist** - Saved products
10. **Recommendations** - ML-based suggestions

---

## Testing

Components are ready for testing with:

- React Testing Library
- Jest
- Cypress (E2E)

---

## Future Enhancements

- [ ] Real database integration
- [ ] Real payment gateway (Razorpay)
- [ ] Email notifications
- [ ] SMS OTP verification
- [ ] Advanced analytics
- [ ] ML-based recommendations
- [ ] Wishlist feature
- [ ] Product reviews system
- [ ] Inventory management
- [ ] Multi-language support

---

## Troubleshooting

### Cart not saving?

- Check browser localStorage is enabled
- Clear browser cache and reload

### Products not loading?

- Ensure JSON import is correct
- Check API service is properly connected

### Routes not working?

- Verify Next.js routing structure
- Check dynamic route [id] syntax

---

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Other Platforms

- Netlify
- AWS Amplify
- DigitalOcean

---

## License

MIT

---

## Support

For issues and feature requests, please create an issue in the repository.

---

## Credits

Built with Next.js 14, React 18, and Tailwind CSS.
Designed for hair care ecommerce platforms.
