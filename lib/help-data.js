export const helpCategories = [
  {
    id: 'orders-shipping',
    title: 'Orders & Shipping',
    icon: 'Package',
    description: 'Track, change, or cancel your ByteMart orders.',
    articles: ['tracking-order', 'shipping-times', 'canceling-order']
  },
  {
    id: 'returns-refunds',
    title: 'Returns & Refunds',
    icon: 'RefreshCw',
    description: 'Learn about our 30-day return policy and refund process.',
    articles: ['return-policy', 'how-to-return', 'refund-status']
  },
  {
    id: 'payments-promos',
    title: 'Payments & Promos',
    icon: 'CreditCard',
    description: 'Payment methods, discount codes, and billing help.',
    articles: ['payment-methods', 'discount-codes']
  },
  {
    id: 'seller-center',
    title: 'Seller Center',
    icon: 'Store',
    description: 'Everything you need to know about selling on ByteMart.',
    articles: ['become-seller', 'seller-onboarding-manual', 'listing-guidelines']
  }
];

export const helpArticles = {
  'tracking-order': {
    title: 'How to Track Your Order',
    description: 'Step-by-step guide on how to monitor your ByteMart delivery status.',
    category: 'orders-shipping',
    content: `
      <h2>Tracking Your ByteMart Order</h2>
      <p>Monitoring your delivery is easy. Follow these steps to see exactly where your package is:</p>
      
      <h3>1. Log into your account</h3>
      <p>Go to the ByteMart homepage and click on "Login". Enter your credentials to access your dashboard.</p>
      
      <h3>2. Visit "My Orders"</h3>
      <p>Once logged in, navigate to the <a href="/my-orders">My Orders</a> section. Here you will see a list of all your recent purchases.</p>
      
      <h3>3. View Tracking Details</h3>
      <p>Click on the "Track Order" button next to the specific order you are looking for. You will see real-time updates from our shipping partners.</p>
      
      <div class="note">
        <strong>Note:</strong> Tracking information may take up to 24 hours to appear after your order has been marked as "Shipped".
      </div>
    `
  },
  'return-policy': {
    title: 'ByteMart Return Policy',
    description: 'Clear and transparent return guidelines for all ByteMart customers.',
    category: 'returns-refunds',
    content: `
      <h2>Returns Made Simple</h2>
      <p>We want you to be 100% satisfied with your purchase. If you're not, we're here to help.</p>
      
      <h3>30-Day Window</h3>
      <p>Most items purchased on ByteMart can be returned within 30 days of delivery. The items must be in their original packaging and in the same condition as received.</p>
      
      <h3>Exclusions</h3>
      <ul>
        <li>Software and digital downloads.</li>
        <li>Personalized or custom-made items.</li>
        <li>Health and hygiene products (if opened).</li>
      </ul>
      
      <h3>How to Start a Return</h3>
      <p>Navigate to your order history, select the item you wish to return, and click "Request Return". We will provide a prepaid shipping label for eligible returns.</p>
    `
  },
  'become-seller': {
    title: 'How to Become a Seller',
    description: 'Join the ByteMart marketplace and start reaching millions of customers today.',
    category: 'seller-center',
    content: `
      <h2>Selling on ByteMart</h2>
      <p>Join our community of successful entrepreneurs. ByteMart provides the tools and reach you need to grow your business.</p>
      
      <h3>Steps to Get Started:</h3>
      <ol>
        <li><strong>Register:</strong> Visit the <a href="/seller">Seller Dashboard</a> and complete the registration form.</li>
        <li><strong>Verify:</strong> Provide your business documentation for identity and tax verification.</li>
        <li><strong>List:</strong> Use our easy-to-use product uploader to list your inventory.</li>
        <li><strong>Ship:</strong> When an order comes in, pack it up and ship it out!</li>
      </ol>
      
      <p>We charge a competitive commission only when you make a sale. No hidden monthly fees.</p>
    `
  },
  'seller-onboarding-manual': {
    title: 'Seller Onboarding Manual',
    description: 'The ultimate guide for new sellers to succeed on ByteMart.',
    category: 'seller-center',
    content: `
      <h2>ByteMart Seller Onboarding Manual</h2>
      <p>Welcome to the family! This manual will walk you through your first 30 days on ByteMart.</p>
      
      <h3>Phase 1: Setting Up Your Shop</h3>
      <p>Complete your profile with a professional logo and a compelling shop description. A trustworthy profile leads to 40% more conversions.</p>
      
      <h3>Phase 2: Product Photography</h3>
      <p>Use high-resolution images with white backgrounds. Ensure you show multiple angles of your product to give customers confidence.</p>
      
      <h3>Phase 3: SEO Optimization</h3>
      <p>Include keywords in your titles and descriptions. Think about what customers would type into the search bar (e.g., "Wireless Noise Cancelling Headphones").</p>
      
      <h3>Phase 4: Customer Service</h3>
      <p>Respond to customer inquiries within 24 hours. High response rates improve your ranking in search results.</p>
      
      <div class="tip">
        <strong>Pro Tip:</strong> Offer free shipping to become a "Top Rated Seller" and get featured on our homepage.
      </div>
    `
  },
  'payment-methods': {
    title: 'Accepted Payment Methods',
    description: 'Learn about the various ways you can pay for your ByteMart orders.',
    category: 'payments-promos',
    content: `
      <h2>Payment Options</h2>
      <p>We aim to make your checkout experience as smooth as possible. We currently accept the following payment methods:</p>
      
      <ul>
        <li><strong>Credit & Debit Cards:</strong> Visa, MasterCard, American Express, and Discover.</li>
        <li><strong>Digital Wallets:</strong> Apple Pay, Google Pay, and PayPal.</li>
        <li><strong>ByteMart Credits:</strong> Use credits from returns or gift cards directly at checkout.</li>
      </ul>
      
      <h3>Is my payment secure?</h3>
      <p>Yes. All transactions are encrypted using industry-standard SSL technology. We do not store your full credit card details on our servers.</p>
    `
  },
  'discount-codes': {
    title: 'Using Discount Codes',
    description: 'How to apply promo codes and save money on your ByteMart purchases.',
    category: 'payments-promos',
    content: `
      <h2>How to Use Promo Codes</h2>
      <p>Saving money is great! Here is how you can apply a discount code to your order:</p>
      
      <ol>
        <li>Add your favorite items to the cart.</li>
        <li>Proceed to the <strong>Checkout</strong> page.</li>
        <li>Look for the "Discount Code" field on the right side of the screen.</li>
        <li>Enter your code exactly as it appears and click "Apply".</li>
      </ol>
      
      <div class="note">
        <strong>Tip:</strong> Only one discount code can be used per order. Codes cannot be applied after an order has been placed.
      </div>
    `
  },
  'shipping-times': {
    title: 'Shipping Rates & Delivery Times',
    description: 'Detailed information about how long it takes for your ByteMart orders to arrive.',
    category: 'orders-shipping',
    content: `
      <h2>Shipping & Delivery</h2>
      <p>We work with global logistics partners to ensure your products reach you safely and quickly.</p>
      
      <h3>Delivery Estimates</h3>
      <ul>
        <li><strong>Standard Shipping:</strong> 5-7 business days (Free on orders over $50).</li>
        <li><strong>Express Shipping:</strong> 2-3 business days.</li>
        <li><strong>International Shipping:</strong> 10-15 business days depending on location.</li>
      </ul>
      
      <p>Delivery times are calculated from the day your order is shipped, not the day the order is placed.</p>
    `
  },
  'canceling-order': {
    title: 'Changing or Canceling an Order',
    description: 'Guide on how to modify or cancel your order before it ships.',
    category: 'orders-shipping',
    content: `
      <h2>Order Modifications</h2>
      <p>Need to make a change? If your order hasn't been shipped yet, you can still modify it.</p>
      
      <h3>How to Cancel</h3>
      <p>Go to <a href="/my-orders">My Orders</a>, select your order, and click "Cancel Order". If the button is not visible, it means the order is already being processed for shipping.</p>
      
      <h3>Changing Address</h3>
      <p>To change your shipping address after placing an order, please contact our support team immediately at support@bytemart.com.</p>
    `
  },
  'how-to-return': {
    title: 'How to Start a Return',
    description: 'Step-by-step instructions for returning a product to ByteMart.',
    category: 'returns-refunds',
    content: `
      <h2>Starting Your Return</h2>
      <ol>
        <li>Go to your <strong>Order History</strong>.</li>
        <li>Select the order containing the item you want to return.</li>
        <li>Click <strong>Return Item</strong> and select the reason for return.</li>
        <li>Print the provided shipping label and drop it off at the nearest carrier location.</li>
      </ol>
      <p>Once we receive and inspect the item, we will process your refund.</p>
    `
  },
  'refund-status': {
    title: 'Refund Processing Times',
    description: 'Information about when to expect your money back after a return.',
    category: 'returns-refunds',
    content: `
      <h2>Refund Timeline</h2>
      <p>After we receive your returned item, it usually takes 3-5 business days for our team to inspect it.</p>
      <p>Once approved, the refund will be issued to your original payment method. Depending on your bank, it may take 5-10 business days for the funds to appear in your account.</p>
    `
  },
  'listing-guidelines': {
    title: 'Product Listing Guidelines',
    description: 'Standards and requirements for listing products as a seller on ByteMart.',
    category: 'seller-center',
    content: `
      <h2>Seller Listing Standards</h2>
      <p>To maintain a high-quality marketplace, all listings must adhere to these rules:</p>
      <ul>
        <li><strong>Accurate Titles:</strong> Include brand, model, and key specs.</li>
        <li><strong>Clear Images:</strong> High-resolution, white background, no watermarks.</li>
        <li><strong>Honest Descriptions:</strong> Disclose any defects or missing accessories.</li>
        <li><strong>Correct Categorization:</strong> Ensure your product is in the right category.</li>
      </ul>
    `
  }
};

export const chatbotResponses = {
  greetings: ["Hello! I'm ByteBot. How can I help you today?", "Hi there! Looking for help with an order or interested in selling?"],
  topics: [
    { keywords: ['track', 'where', 'status', 'shipping'], response: "You can track your order in the 'My Orders' section. [Learn more here](/support/articles/tracking-order)." },
    { keywords: ['return', 'refund', 'back'], response: "We offer a 30-day return policy. You can start a return from your order history. [Read our policy](/support/articles/return-policy)." },
    { keywords: ['sell', 'seller', 'merchant', 'business'], response: "Interested in joining us? You can register as a seller on our dashboard. [Check the Seller Guide](/support/articles/become-seller)." },
    { keywords: ['payment', 'pay', 'card', 'paypal'], response: "We accept all major credit cards, PayPal, and Apple Pay. For billing issues, contact support@bytemart.com." }
  ],
  fallback: "I'm not sure I understand. Would you like to browse our Help Center or contact a human agent?"
};
