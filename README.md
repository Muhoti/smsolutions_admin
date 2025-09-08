# SMSolutions Business Website

A professional, modern business website for SMSolutions's web and mobile application development services. Built with React.js and integrated with a powerful Node.js API.

## 🚀 Features

- **Modern UI/UX**: Beautiful, responsive design with smooth animations
- **API Integration**: Seamlessly connected to the SMSolutions API
- **Real-time Data**: Dynamic content loading from the backend
- **Contact Form**: Professional contact form with validation
- **Portfolio Showcase**: Dynamic project display with filtering
- **Testimonials**: Client testimonials with carousel
- **Admin Dashboard**: Secure admin panel for content management
- **Mobile Responsive**: Optimized for all devices

## 🛠️ Tech Stack

- **Frontend**: React.js, Framer Motion, React Router
- **Styling**: CSS3 with CSS Variables, Responsive Design
- **State Management**: React Context API
- **Forms**: React Hook Form with validation
- **Notifications**: React Hot Toast
- **API Client**: Axios with interceptors
- **Animations**: AOS (Animate On Scroll), Framer Motion

## 📦 Installation

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Environment Setup**
   Create a `.env` file in the root directory:

   ```env
   REACT_APP_API_URL=http://localhost:3003/api
   REACT_APP_SITE_NAME=SMSolutions
   REACT_APP_SITE_DESCRIPTION=Professional Web & Mobile App Development
   REACT_APP_CONTACT_EMAIL=strongmuhoti@gmail.com
   REACT_APP_CONTACT_PHONE=+254 707 809 592
   REACT_APP_CONTACT_LOCATION=Nairobi, Kenya
   ```

3. **Start Development Server**

   ```bash
   npm start
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

## 🌐 API Integration

The website is configured to work with the SMSolutions API running on port 3003. Make sure your API server is running before starting the frontend.

### API Endpoints Used:

- `/api/projects` - Portfolio projects
- `/api/testimonials` - Client testimonials
- `/api/contact` - Contact form submissions
- `/api/auth` - Admin authentication
- `/api/admin` - Admin dashboard data

## 📱 Pages & Components

### Pages:

- **Home** (`/`) - Landing page with hero, services, portfolio, testimonials
- **About** (`/about`) - About page with experience and skills
- **Services** (`/services`) - Detailed services offered
- **Portfolio** (`/portfolio`) - Full portfolio showcase
- **Contact** (`/contact`) - Contact form and information
- **Admin** (`/admin`) - Admin dashboard (protected)

### Key Components:

- **Hero Section** - Eye-catching landing area
- **Services Section** - Service offerings with icons
- **Portfolio Section** - Project showcase with filtering
- **Testimonials Section** - Client reviews carousel
- **Contact Form** - Professional contact form
- **Stats Section** - Key metrics and achievements

## 🎨 Design Features

- **Color Scheme**: Professional purple and blue gradient
- **Typography**: Clean, modern Inter font family
- **Animations**: Smooth scroll animations and hover effects
- **Responsive**: Mobile-first design approach
- **Accessibility**: WCAG compliant components
- **Performance**: Optimized images and lazy loading

## 🔧 Customization

### Colors

Update CSS variables in `src/App.css`:

```css
:root {
  --primary-color: #6366f1;
  --primary-dark: #4f46e5;
  --secondary-color: #f59e0b;
  /* ... */
}
```

### Content

- Update contact information in `src/pages/Contact.js`
- Modify services in `src/components/sections/Services.js`
- Update hero content in `src/components/sections/Hero.js`

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Netlify

1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Deploy!

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Bundle Size**: Optimized with code splitting
- **Loading Speed**: < 3 seconds on 3G
- **SEO**: Meta tags and structured data

## 🔒 Security

- **API Security**: JWT token authentication
- **Form Validation**: Client and server-side validation
- **XSS Protection**: Sanitized inputs
- **CSRF Protection**: Secure form submissions

## 📈 Analytics

The website is ready for Google Analytics integration. Add your tracking ID to the environment variables.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For support or questions:

- Email: strongmuhoti@gmail.com
- Phone: +254 707 809 592

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ by SMSolutions**
