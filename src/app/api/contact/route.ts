import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // TODO: Implement actual email sending logic here
    // Example with a service like SendGrid, Resend, or Nodemailer:
    /*
         const emailData = {
       to: 'john.smith@trucking.com',
       from: 'noreply@trucking.com',
       subject: `New Contact Form Submission from ${name}`,
       text: `
         Name: ${name}
         Email: ${email}
         Message: ${message}
       `,
     };
    
    // Send email using your preferred service
    await sendEmail(emailData);
    */

    // For now, just log the data
    console.log('Contact form submission:', { name, email, message });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your message! We\'ll get back to you soon.' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
