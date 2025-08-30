# Tiger Hill Transport LLC - Professional Trucking Website

A modern, responsive single-page website for Tiger Hill Transport built with Next.js, Tailwind CSS, and Shadcn UI.

## Features

- **Hero Section** - Professional introduction with trucking image
- **About Section** - Detailed information about services and experience
- **Credentials Section** - Display of all necessary certifications
- **Contact Form** - Email notifications to Gmail on form submission
- **Responsive Design** - Mobile-friendly layout
- **Modern UI** - Clean, professional design

## Email Notifications Setup

This website includes email notifications that send contact form submissions directly to your Gmail.

### Setup Instructions:

1. **Sign up for Resend** (Free tier available):
   - Go to [https://resend.com](https://resend.com)
   - Create an account
   - Get your API key from the dashboard

2. **Configure Environment Variables**:
   - Copy `.env.local.example` to `.env.local`
   - Replace `your_resend_api_key_here` with your actual Resend API key
   - Replace `your-email@gmail.com` in `src/app/api/contact/route.ts` with your Gmail address

3. **Verify Your Domain** (Optional):
   - For production, verify your domain with Resend
   - Update the "from" email address in the API route

### Email Features:
- **Professional HTML Template** - Branded email design
- **Form Data** - Name, email, and message included
- **Timestamp** - When the form was submitted
- **Error Handling** - Graceful fallback if email fails

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn UI** - Beautiful, accessible component library
- **Resend** - Email delivery service
- **Lucide React** - Modern icon library

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Resend account (for email notifications)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/nestaidofficial/tigerhill.git
cd tigerhill
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
# Edit .env.local with your Resend API key
```

4. Update email settings:
   - Edit `src/app/api/contact/route.ts`
   - Replace `your-email@gmail.com` with your Gmail address

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Customization

### Updating Content:
- **Personal Information**: Update contact details in `src/app/page.tsx`
- **Services**: Modify the services list in the About section
- **Credentials**: Update the credentials array to match your certifications
- **Styling**: Customize colors in `src/app/globals.css`

### Email Configuration:
- **Recipient**: Change the "to" email address in the API route
- **Template**: Modify the HTML email template for branding
- **Subject**: Customize the email subject line

## Deployment

### Vercel (Recommended):
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Support

For questions or support, please contact the developer or create an issue in the repository.
