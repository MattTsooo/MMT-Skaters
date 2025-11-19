export function generateSelfEmailHTML(name, email, phone, lessonType, date, message) {
  return `
  <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { 
          font-family: Arial, sans-serif; 
          line-height: 1.6; 
          color: #333; 
        }

        .container { 
          max-width: 600px; 
          margin: 0 auto; 
          padding: 20px; 
        }

        .header { 
          background: linear-gradient(135deg, #4a90e2, #2c5aa0); 
          color: white; 
          padding: 30px; 
          text-align: center; 
          border-radius: 10px 10px 0 0; 
        }
        
        .content { 
          background: #f9f9f9; 
          padding: 30px; 
          border-radius: 0 0 10px 10px; 
        }

        .info-row { 
          margin: 15px 0; 
          padding: 15px; 
          background: white; 
          border-radius: 8px; 
          border-left: 4px solid #4a90e2; 
        }

        .label { 
          font-weight: bold; 
          color: #2c5aa0; 
          margin-bottom: 5px; 
        }

        .value { 
          color: #333; 
        }

        .message-box { 
          background: white; 
          padding: 20px; 
          border-radius: 8px; 
          margin-top: 20px; 
          border: 1px solid #e0e0e0; 
        }

        .footer { 
          text-align: center; 
          margin-top: 20px; 
          color: #666; 
          font-size: 12px; 
        }

      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0;">🎉 New Lesson Booking</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">MMT Skaters</p>
        </div>
        <div class="content">
          <p style="font-size: 16px; margin-top: 0;">You have a new lesson booking request!</p>
          
          <div class="info-row">
            <div class="label">Student Name</div>
            <div class="value">${name}</div>
          </div>
          
          <div class="info-row">
            <div class="label">Email Address</div>
            <div class="value"><a href="mailto:${email}" style="color: #4a90e2;">${email}</a></div>
          </div>
          
          ${phone ? `
          <div class="info-row">
            <div class="label">Phone Number</div>
            <div class="value"><a href="tel:${phone}" style="color: #4a90e2;">${phone}</a></div>
          </div>
          ` : ''}
          
          <div class="info-row">
            <div class="label">Experience Level</div>
            <div class="value">${lessonType}</div>
          </div>
          
          <div class="info-row">
            <div class="label">Preferred Date</div>
            <div class="value">${date}</div>
          </div>
          
          ${message ? `
          <div class="message-box">
            <div class="label">Student's Message</div>
            <div class="value" style="white-space: pre-line; margin-top: 10px;">${message}</div>
          </div>
          ` : ''}
          
          <div class="footer">
            <p>Respond to confirm their lesson booking</p>
          </div>
        </div>
      </div>
    </body>
    </html>
    `;
}

export function generateSelfEmailText(name, email, phone, lessonType, date, message) {
  return `
NEW LESSON BOOKING REQUEST
MMT Skaters

Student Information:
━━━━━━━━━━━━━━━━━━━━━━━
Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}` : ''}
Experience Level: ${lessonType}
Preferred Date: ${date}

${message ? `Student's Message:\n${message}` : 'No additional message provided.'}

━━━━━━━━━━━━━━━━━━━━━━━
Respond to confirm their booking
  `;
}


export function generateCustomerEmailHTML(name, lessonType, date) {
  return `
  <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { 
          font-family: Arial, sans-serif; 
          line-height: 1.6; color: #333; 
        }

        .container { 
          max-width: 600px; 
          margin: 0 auto; 
          padding: 20px; 
          }
          
        .header { 
          background: linear-gradient(135deg, #4a90e2, #2c5aa0); 
          color: white; padding: 40px 30px; 
          text-align: center; 
          border-radius: 10px 10px 0 0; 
          }

        .content { 
          background: #f9f9f9; 
          padding: 40px 30px; 
          border-radius: 0 0 10px 10px; 
          }

        .info-box { 
          background: white; 
          padding: 25px; 
          border-radius: 8px; 
          margin: 20px 0; 
          border-left: 4px solid #4a90e2; 
          }

        .highlight { 
          color: #4a90e2; 
          font-weight: bold; 
          }

        .section { 
          margin: 25px 0; 
          }

        .next-steps { 
          background: #e3f2fd; 
          padding: 20px; 
          border-radius: 8px; 
          margin: 20px 0;
          }

        .footer { 
          text-align: center; 
          margin-top: 30px; 
          padding-top: 20px; 
          border-top: 1px solid #e0e0e0; 
          color: #666; 
          font-size: 13px; 
          }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0; font-size: 28px;">Lesson Request Received!</h1>
          <p style="margin: 15px 0 0 0; font-size: 16px; opacity: 0.9;">We're excited to skate with you</p>
        </div>
        
        <div class="content">
          <p style="font-size: 16px; margin-top: 0;">Hi <span class="highlight">${name}</span>,</p>
          
          <p>Thank you for booking with <strong>MMT Skaters</strong>! We've received your lesson request and can't wait to help you achieve your skating goals.</p>
          
          <div class="info-box">
            <h3 style="margin-top: 0; color: #2c5aa0;">Your Booking Details</h3>
            <p style="margin: 10px 0;"><strong>Experience Level:</strong> ${lessonType}</p>
            <p style="margin: 10px 0;"><strong>Requested Date:</strong> ${date}</p>
          </div>
          
          <div class="next-steps">
            <h3 style="margin-top: 0; color: #2c5aa0;">What to Expect Next?</h3>
            <ol style="padding-left: 20px; margin: 10px 0;">
              <li style="margin: 8px 0;">We'll review your preferred date and check our availability</li>
              <li style="margin: 8px 0;">Melody or Megan will reach out within <strong>24-48 hours</strong> to confirm your lesson</li>
              <li style="margin: 8px 0;">We'll finalize the time, location, and any preparation you'll need</li>
            </ol>
          </div>
          
          <div class="section">
            <h3 style="color: #2c5aa0;">Tips to Prepare</h3>
            <ul style="padding-left: 20px;">
              <li>Dress warmly in layers</li>
              <li>Bring gloves and comfortable clothing that allows movement</li>
              <li>If you have your own skates, bring them! Otherwise we can advise on rentals</li>
              <li>Arrive 10 minutes early to get settled</li>
            </ul>
          </div>
          
          <div class="section">
            <p style="margin-top: 20px;">See you on the ice soon!</p>
            <p style="margin-top: 30px;"><strong>— Melody & Megan</strong><br>
            <span style="color: #666; font-size: 14px;">MMT Skaters</span></p>
          </div>
          
          <div class="footer">
            <p><strong>Contact Us:</strong> <a href="mailto:mmtskaters@gmail.com" style="color: #4a90e2; text-decoration: none;">mmtskaters@gmail.com</a></p>
            <p style="margin-top: 10px;">Follow us on Instagram: <a href="https://www.instagram.com/mmt_skaters/" style="color: #4a90e2; text-decoration: none;">@mmt_skaters</a></p>
          </div>
        </div>
      </div>
    </body>
    </html>`;
}

export function generateCustomerEmailText(name, lessonType, date) {
  return `
LESSON REQUEST RECEIVED!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Hi ${name},

Thank you for booking with MMT Skaters! We've received your lesson request and can't wait to help you achieve your skating goals.

YOUR BOOKING DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Experience Level: ${lessonType}
Requested Date: ${date}

WHAT TO EXPECT NEXT?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. We'll review your preferred date and check our availability
2. Melody or Megan will reach out within 24-48 hours to confirm your lesson
3. We'll finalize the time, location, and any preparation you'll need

TIPS TO PREPARE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Dress warmly in layers
• Bring gloves and comfortable clothing that allows movement
• If you have your own skates, bring them! Otherwise we can advise on rentals
• Arrive 10 minutes early to get settled

See you on the ice soon! 

— Melody & Megan
MMT Skaters

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Contact: mmtskaters@gmail.com
Instagram: @mmt_skaters
  `;
}