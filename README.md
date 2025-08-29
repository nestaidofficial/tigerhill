# Professional Trucking Company Website

A modern, responsive single-page website for a Driver/Owner Operator built with Next.js, Tailwind CSS, and Shadcn UI.

## Features

- **Hero Section** - Professional introduction with call-to-action
- **About Section** - Detailed information about services and experience
- **Credentials Section** - Display of all necessary certifications and documents
- **Contact Form** - Easy-to-use contact form for potential clients
- **Responsive Design** - Mobile-friendly layout that works on all devices
- **Modern UI** - Clean, professional design using Shadcn UI components

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn UI** - Beautiful, accessible component library
- **Lucide React** - Modern icon library

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd trucking-website
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and theme
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main page component
├── components/
│   └── ui/                  # Shadcn UI components
└── lib/
    └── utils.ts             # Utility functions
```

## Customization

### Updating Content

1. **Personal Information**: Update the name, contact details, and personal information in `src/app/page.tsx`
2. **Services**: Modify the services list in the About section
3. **Credentials**: Update the credentials array to match your actual certifications
4. **Styling**: Customize colors and styling in `src/app/globals.css`

### Contact Form

The contact form currently shows an alert on submission. To implement actual email functionality:

1. Add an email service (like SendGrid, Resend, or Nodemailer)
2. Create an API route in `src/app/api/contact/route.ts`
3. Update the `handleSubmit` function in the main page component

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

The project can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For questions or support, please contact the developer or create an issue in the repository.
# Tiger Hill Transport - Professional Trucking Website
