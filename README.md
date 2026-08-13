# UniConnect Marketplace

Build a modern, responsive web application called **UniConnect** based closely on the attached UI/UX reference images.

UniConnect is a **student-focused campus marketplace** where university/college students can buy and sell products such as books, stationery, electronics, fashion items, sports equipment, and project/lab equipment.

The application should closely reproduce the visual design shown in the reference screenshots while making the interface fully functional and responsive.

## 1. BRAND IDENTITY

Application name: **UniConnect**

Tagline:

**“Buy. Sell. Connect. Together.”**

Use the UniConnect logo shown in the reference images:

* Two human figures forming a heart-like shape.
* One figure should use the UniConnect blue.
* The other should use the UniConnect green.
* Include the shopping bag and handshake elements from the reference logo.
* Text should read **UniConnect**, with “Uni” in blue and “Connect” in green.

### Brand colours

Use the following visual style:

* Primary blue: dark/navy blue similar to the reference screenshots.
* Secondary green: bright green similar to the logo.
* White backgrounds.
* Light grey backgrounds for cards and input fields.
* Black/dark text.
* Green buttons where appropriate.
* Blue buttons for primary actions such as checkout/payment.

Keep the design clean, youthful, trustworthy and suitable for university students.

Use **Poppins or a similar modern sans-serif font** throughout the application.

---

# 2. APPLICATION STRUCTURE

Create the following pages/screens:

1. Splash Screen
2. Login
3. Create Account / Sign Up
4. Home / Marketplace Dashboard
5. Product Details
6. Shopping Cart
7. Checkout
8. Account/Profile
9. Search
10. Product Categories
11. Add Product / Sell Item
12. My Listings
13. Orders / Purchase History
14. Notifications

Use a consistent navigation system across all pages.

---

# 3. SPLASH SCREEN

Recreate the splash screen from the reference image.

The screen should contain:

* UniConnect logo prominently in the centre.
* UniConnect brand name.
* Tagline:
  **“Buy. Sell. Connect. Together.”**

Use a clean white background.

Add a subtle loading/transition effect before taking the user to the Login page.

---

# 4. LOGIN PAGE

Recreate the Login screen shown in the reference.

At the top:

* UniConnect logo.
* “Hi, Welcome!”
* “Login to continue”

Form fields:

* Email address
* Password

Additional options:

* Remember me checkbox.
* Forgot password link.

Primary button:

* **Log in**

Below the login button:

* Divider with “Or with”
* Continue with Facebook
* Continue with Google
* Continue with Instagram/social login icons

Also provide:
**“Don't have an account? Create an account”**

The login form should have rounded input fields and match the spacing and proportions shown in the reference design.

Implement basic form validation.

---

# 5. CREATE ACCOUNT / SIGN UP

Recreate the Sign Up screen from the reference image.

Heading:
**“Create an account!”**

Social registration buttons:

* Continue with Facebook
* Continue with Apple
* Continue with Google

Divider:
**Or**

Registration fields:

* Email address
* Password
* School

Terms checkbox:
“I agree to the Terms of Service and Privacy Policy.”

Button:
**Sign up**

Validate required fields before allowing registration.

After successful registration, take the user to the Home/Marketplace dashboard.

---

# 6. HOME / MARKETPLACE DASHBOARD

This is the main screen of UniConnect.

Recreate the layout shown in the reference.

### Header

Create a top navigation bar containing:

* UniConnect logo on the left.
* Search bar in the centre.
* Mail/message icon.
* Notification/bell icon.
* User/profile icon.

On mobile, make the navigation responsive.

### Hero section

Use a dark blue hero/banner area.

Display:

**FIND & SELL
EVERYTHING
ON CAMPUS**

Add a green button:

**Browse all products**

### Categories

Create category cards for:

* Books & Stationery
* Electronics & Gadgets
* Fashion & Accessories
* Sports & Fitness
* Project & Lab Equipment

Each category should have:

* Icon/image
* Category name
* Hover effect

Clicking a category should filter the available products.

### Recently Added

Create a product section titled:

**Recently Added**

Display product cards similar to the reference design.

Example products:

1. Scientific Calculator

   * Casio FX-991EX
   * R400

2. Wireless Headphones

   * JBL WH-991EX
   * R500

3. MI Power Bank

   * 10 000mAh
   * Black
   * R500

Each product card should include:

* Product image
* Product name
* Short description
* Price
* View/Buy button

Products should be clickable and open the Product Details page.

---

# 7. PRODUCT DETAILS PAGE

Recreate the product details screen from the reference.

The page should contain:

* Product image.
* Product name.
* Price.
* Product description.
* Product specifications.
* Seller information.
* Add to cart button.
* Buy now button.

Example product:

**Beribes Bluetooth Headphones Over-Ear Headphone with Microphone**

Price:
**R600.00**

Product details:

* Material: ABS
* Colour: Black
* Size: One-size

Include a **“View more”** option for additional specifications.

### Customer Reviews

Create a Customer Reviews section.

Example:

**Sino K.**
Verified user

Review:
**“Very good product”**

Include star ratings.

---

# 8. SHOPPING CART

Create a Shopping Cart page matching the reference.

Display each selected product with:

* Product image.
* Product name.
* Quantity.
* Price.
* Remove button.

Example cart:

Bluetooth Headphones
1x
R600

Calculator
1x
R600

Show:

Subtotal
Shipping
Discount
Total

Add a **Discount Code** input with an **Apply** button.

Primary button:

**Pay Now**

Below the button display:

**Secure Checkout - SSL Encrypted**

---

# 9. CHECKOUT PAGE

Create a checkout screen matching the reference.

Heading:

**Check out**

### Shipping Information

Allow the user to select:

* Delivery
* Pickup

Form fields:

* Full name
* Email address
* Phone number
* Country
* City
* State
* Zip code

Terms checkbox:

“I have read and agree to the terms and conditions.”

Add a clear order summary.

Payment button:

**Pay Now**

After payment, display a successful order confirmation.

Example:

**Payment Successful!**

“Your order has been placed successfully.”

Provide:

* Order number
* Order summary
* Estimated delivery/pickup information
* Continue Shopping button

---

# 10. ACCOUNT / PROFILE PAGE

Recreate the account screen shown in the reference.

Display:

* User profile picture.
* User name.
* Email address.

Example:

Administrator
[sinokeben@gmail.com](mailto:sinokeben@gmail.com)

Create menu items:

* Account
* Billing info
* Settings
* Password
* Sign Out

Use suitable icons.

The profile page should allow the user to update:

* Profile picture
* Name
* Email
* School
* Phone number

---

# 11. SEARCH FUNCTIONALITY

The search bar must actually work.

Users should be able to search for products by:

* Product name.
* Category.
* Description.
* Seller.

Examples:

Searching for:
“calculator”

should display calculators.

Searching for:
“headphones”

should display headphones.

Display a friendly message when no products are found.

---

# 12. CATEGORY FILTERING

Allow users to browse products by category.

Categories:

* Books & Stationery
* Electronics & Gadgets
* Fashion & Accessories
* Sports & Fitness
* Project & Lab Equipment

Include sorting options:

* Price: Low to High
* Price: High to Low
* Newest
* Most Popular

---

# 13. SELL AN ITEM

Add a **Sell Item** / **Add Product** feature.

Users should be able to create a listing.

Form fields:

* Product name
* Category
* Price
* Description
* Condition
* Location/Campus
* Contact information
* Product images

Condition options:

* New
* Like New
* Good
* Fair

Button:

**Publish Listing**

After publishing, display the product in the marketplace.

---

# 14. MY LISTINGS

Create a page where sellers can manage their products.

Display:

* Product image.
* Product name.
* Price.
* Status.
* Date listed.

Statuses:

* Active
* Sold
* Pending

Allow users to:

* Edit listing.
* Delete listing.
* Mark item as sold.

---

# 15. ORDERS / PURCHASE HISTORY

Create an Orders page.

Display previous purchases with:

* Order number.
* Product.
* Date.
* Price.
* Order status.

Statuses:

* Processing
* Ready for Pickup
* Out for Delivery
* Completed
* Cancelled

Clicking an order should open its details.

---

# 16. NOTIFICATIONS

Create a notification page.

Examples:

* “Your order has been confirmed.”
* “Your item has been sold.”
* “Your listing has received a new message.”
* “Your order is ready for pickup.”

Use notification icons and timestamps.

---

# 17. MESSAGING

The envelope icon in the header should open a messaging interface.

Students should be able to communicate with sellers/buyers.

Create:

* Conversation list.
* Chat window.
* Message input.
* Send button.

Example conversation:

Buyer:
“Hi, is the calculator still available?”

Seller:
“Yes, it is available.”

---

# 18. RESPONSIVE DESIGN

The original design is based heavily on mobile/iPhone layouts, so the application must be **mobile-first**.

Make sure it works correctly on:

* iPhone/mobile screens.
* Tablets.
* Desktop/laptop screens.

On mobile:

* Use a bottom navigation bar where appropriate.
* Make cards fit the screen.
* Keep buttons easy to tap.
* Make forms vertically stacked.
* Make the search bar responsive.

On desktop:

* Use a wider marketplace layout.
* Display products in a grid.
* Use a sidebar or expanded navigation where appropriate.

---

# 19. FUNCTIONALITY

Do not create a static mockup only.

Make the main interactions functional.

Implement:

* Login/sign up flow.
* Navigation between pages.
* Search.
* Category filtering.
* Product details.
* Add to cart.
* Remove from cart.
* Update quantity.
* Checkout.
* Discount code.
* Product listings.
* Add product.
* Edit/delete product.
* Profile management.
* Orders.
* Notifications.
* Messaging.
* Sign out.

Use realistic sample data if a backend/database is not available.

Persist important data using localStorage or an appropriate frontend data store so that refreshing the page does not immediately remove the user's cart/listings.

---

# 20. UI/UX REQUIREMENTS

Follow the provided reference screenshots closely.

Important design characteristics:

* Clean white backgrounds.
* Navy/dark blue primary areas.
* UniConnect green accents.
* Rounded cards and input fields.
* Simple modern icons.
* Clear typography.
* Strong visual hierarchy.
* Consistent spacing.
* Mobile-friendly layout.
* Professional but youthful student-oriented appearance.

Do not unnecessarily change the brand identity or redesign the interface into a completely different style.

The reference screenshots should be treated as the **main visual design source**.

---

# 21. TECHNOLOGY

Use a modern frontend stack suitable for Lovable.

Recommended:

* React
* TypeScript
* Tailwind CSS
* Lucide React icons
* Responsive CSS
* Local storage or Supabase if a backend is required

Structure the project into reusable components.

Examples:

* Navbar
* SearchBar
* ProductCard
* CategoryCard
* Button
* Input
* CartItem
* ProductGrid
* ReviewCard
* ProfileMenu
* NotificationItem

Avoid putting everything into one large component.

---

# 22. SAMPLE PRODUCT DATA

Include realistic sample campus marketplace products such as:

* Scientific Calculator — R400
* Wireless Headphones — R500
* MI Power Bank 10 000mAh — R500
* Accounting Textbook — R250
* Laptop Stand — R350
* Engineering Drawing Set — R300
* Hoodie — R280
* Football Boots — R700
* Lab Coat — R200
* USB Flash Drive — R150

Use appropriate placeholder/product images.

---

# 23. NAVIGATION

The application should have a clear navigation structure.

Main navigation:

**Home | Categories | Sell | Cart | Messages | Profile**

On mobile, use a bottom navigation bar where appropriate.

The UniConnect logo should always take the user back to Home.

---

# 24. IMPORTANT IMPLEMENTATION INSTRUCTION

First recreate the **visual appearance** of the provided UniConnect screenshots as accurately as possible.

Then implement the interactions and functionality.

Do not replace the design with a generic ecommerce template.

The final result should look like a polished **student campus marketplace**, not a generic online store.

The overall user journey should be:

**Splash Screen → Login/Sign Up → Home → Search/Browse → Product Details → Add to Cart → Checkout → Payment Confirmation**

For sellers:

**Home → Sell Item → Create Listing → My Listings → Manage Product**

Make the application feel production-ready, modern, accessible and easy for students to use.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/6ce9a6a3-6dd4-45f9-95f8-5ad27819053e).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
