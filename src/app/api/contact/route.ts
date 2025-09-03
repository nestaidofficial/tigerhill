import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 'your_resend_api_key_here');

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validate required fields
    if (!name || !email || !phone || !message) {
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

    // Validate phone format (basic validation)
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    // Send email notification using Resend
    try {
      const { data, error } = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: ['tigerhilltransport@gmail.com'],
        subject: `New Contact Form Submission from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f9;">
            <div style="background-color: #2f4550; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; font-size: 24px;">Tiger Hill Transport</h1>
              <p style="margin: 5px 0 0 0; opacity: 0.9;">New Contact Form Submission</p>
            </div>
            
            <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <h2 style="color: #2f4550; margin-top: 0;">Contact Form Details</h2>
              
              <div style="margin-bottom: 20px;">
                <strong style="color: #586f7c;">Name:</strong>
                <p style="margin: 5px 0; color: #2f4550;">${name}</p>
              </div>
              
              <div style="margin-bottom: 20px;">
                <strong style="color: #586f7c;">Email:</strong>
                <p style="margin: 5px 0; color: #2f4550;">${email}</p>
              </div>
              
              <div style="margin-bottom: 20px;">
                <strong style="color: #586f7c;">Phone:</strong>
                <p style="margin: 5px 0; color: #2f4550;">${phone}</p>
              </div>
              
              <div style="margin-bottom: 20px;">
                <strong style="color: #586f7c;">Message:</strong>
                <p style="margin: 5px 0; color: #2f4550; line-height: 1.6; white-space: pre-wrap;">${message}</p>
              </div>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #b8dbd9;">
                <p style="margin: 0; color: #586f7c; font-size: 14px;">
                  This message was sent from the Tiger Hill Transport website contact form.
                </p>
                <p style="margin: 5px 0 0 0; color: #586f7c; font-size: 14px;">
                  Time: ${new Date().toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        `,
      });

      if (error) {
        console.error('Resend error:', error);
        return NextResponse.json(
          { error: 'Failed to send email notification' },
          { status: 500 }
        );
      }

      console.log('Email sent successfully:', data);
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      // Don't fail the entire request if email fails
    }

    // Log the submission
    console.log('Contact form submission:', { name, email, phone, message });

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
