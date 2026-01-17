"use server";
import nodemailer from "nodemailer";

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail", // Use your email service provider
  auth: {
    user: process.env.NEXT_PUBLIC_SMTP_USER_EMAIL,
    pass: process.env.NEXT_PUBLIC_SMTP_APP_PASSWORD,
  },
});

export async function sendWelcomeEmail(
  recipientEmail: string,
  otp: string
): Promise<void> {
  const mailOptions = {
    from: process.env.NEXT_PUBLIC_SMTP_USER_EMAIL,
    to: recipientEmail, // List of recipients
    subject: "Welcome to Techno-2026!", // Subject line
    html: `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8">
          <title>Welcome to Technorollix-2025!</title>
          <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; background-color: #f9f9f9; }
              .header { text-align: center; margin-bottom: 20px; }
              .footer { text-align: center; margin-top: 20px; font-size: 0.9em; color: #777; }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h1>Welcome to Technorollix-2025!</h1>
              </div>
              <p>Dear Participant,</p>
              <p>We are thrilled to have you join us for the Technorollix-2025 event. To complete your registration, please use the following One-Time Password (OTP):</p>
              <h2>${otp}</h2>
              <p>Please enter this OTP on the registration page to verify your email address and complete your registration.</p>
              <p>If you have any questions or need assistance, feel free to contact our support team.</p>
              <p>We look forward to seeing you at the event!</p>
              <p>Best regards,</p>
              <p>The Technorollix-2025 Team</p>
              <div class="footer">
                  <p>&copy; 2025 Technorollix. All rights reserved.</p>
              </div>
          </div>
      </body>
      </html>
    `,
  };

  // Send email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email: " + error);
  }
}

export async function sendResetPasswordEmail(
  recipientEmail: string,
  otp: string
): Promise<void> {
  const mailOptions = {
    from: process.env.NEXT_PUBLIC_SMTP_USER_EMAIL,
    to: recipientEmail,
    subject: "Reset Your Password - Technorollix-2026",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8">
          <title>Reset Your Password</title>
          <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; background-color: #f9f9f9; }
              .header { text-align: center; margin-bottom: 20px; }
              .footer { text-align: center; margin-top: 20px; font-size: 0.9em; color: #777; }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h1>Reset Your Password</h1>
              </div>
              <p>Dear User,</p>
              <p>We received a request to reset your password for your Technorollix-2025 account. To proceed, please use the following One-Time Password (OTP):</p>
              <h2>${otp}</h2>
              <p>Please enter this OTP on the password reset page to verify your identity. If you did not request a password reset, please ignore this email or contact support.</p>
              <p>Best regards,</p>
              <p>The Technorollix-2025 Team</p>
              <div class="footer">
                  <p>&copy; 2025 Technorollix. All rights reserved.</p>
              </div>
          </div>
      </body>
      </html>
    `,
  };

  // Send email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Reset password email sent: " + info.response);
  } catch (error) {
    console.error("Error sending reset password email: " + error);
  }
}
