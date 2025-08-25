# Serverless Contact Form Backend - Deployment Guide

## 🚀 Overview

This serverless backend uses **Supabase Edge Functions** with **EmailJS** to handle contact form submissions. No separate Node.js server required!

## 📋 Prerequisites

1. **Supabase Account**: [Sign up at supabase.com](https://supabase.com)
2. **EmailJS Account**: [Sign up at emailjs.com](https://emailjs.com)

## 🔧 Setup Instructions

### Step 1: Connect to Supabase
1. Click the **"Connect to Supabase"** button in the top right of your Bolt interface
2. This will automatically:
   - Deploy the Edge Function
   - Create the database table
   - Set up environment variables

### Step 2: Configure EmailJS

#### 2.1 Create EmailJS Service
1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Click **"Add New Service"**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions
5. Note your **Service ID**

#### 2.2 Create Email Template
1. Go to **"Email Templates"** in EmailJS dashboard
2. Click **"Create New Template"**
3. Use this template structure:

```html
Subject: New Contact Form Submission: {{subject}}

Hello,

You have received a new contact form submission:

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
Reply directly to: {{reply_to}}
```

4. Note your **Template ID**

#### 2.3 Get User ID
1. Go to **"Account"** in EmailJS dashboard
2. Find your **User ID** (also called Public Key)

### Step 3: Set Environment Variables

Add these to your Supabase project:

1. Go to your Supabase project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:

```bash
EMAILJS_SERVICE_ID=your_service_id_here
EMAILJS_TEMPLATE_ID=your_template_id_here
EMAILJS_USER_ID=your_user_id_here
```

### Step 4: Test the Integration

The Edge Function is automatically deployed and available at:
```
https://your-project-id.supabase.co/functions/v1/contact-form
```

## 📊 Database Schema

The `contact_submissions` table includes:
- `id` (UUID, primary key)
- `name` (text, required)
- `email` (text, required)
- `subject` (text, required)
- `message` (text, required)
- `submitted_at` (timestamp)
- `ip_address` (text, optional)
- `created_at` (timestamp)

## 🔒 Security Features

- ✅ Input validation (all fields required, email format)
- ✅ Row Level Security (RLS) enabled
- ✅ CORS headers configured
- ✅ IP address logging
- ✅ SQL injection protection
- ✅ Rate limiting (built into Supabase)

## 🧪 Testing

### Test with curl:
```bash
curl -X POST https://your-project-id.supabase.co/functions/v1/contact-form \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Subject",
    "message": "Test message"
  }'
```

### Expected Response:
```json
{
  "success": true,
  "message": "Form submitted successfully",
  "data": {
    "id": "uuid-here",
    "submitted_at": "2025-01-20T10:30:00Z",
    "email_sent": true
  }
}
```

## 🐛 Troubleshooting

### Common Issues:

1. **Email not sending**
   - Check EmailJS credentials in environment variables
   - Verify EmailJS service is active
   - Check EmailJS dashboard for error logs

2. **Database errors**
   - Ensure Supabase connection is active
   - Check if migration ran successfully
   - Verify RLS policies are set correctly

3. **CORS issues**
   - Edge Function includes proper CORS headers
   - No additional configuration needed

4. **Validation errors**
   - All fields (name, email, subject, message) are required
   - Email must be in valid format

### Debug Steps:

1. **Check Edge Function logs**:
   - Go to Supabase Dashboard → Edge Functions → Logs

2. **Check database**:
   - Go to Supabase Dashboard → Table Editor → contact_submissions

3. **Test EmailJS directly**:
   - Use EmailJS test feature in their dashboard

## 📈 Monitoring

- **Database**: Monitor submissions in Supabase Table Editor
- **Edge Function**: Check logs in Supabase Dashboard
- **EmailJS**: Monitor email delivery in EmailJS dashboard

## 🔄 Updates

The Edge Function is automatically deployed. Any changes to the function code will be deployed when you reconnect to Supabase or redeploy your project.

## 💡 Tips

1. **EmailJS Free Tier**: 200 emails/month
2. **Supabase Free Tier**: 50,000 requests/month
3. **Custom Domain**: Configure in Supabase settings if needed
4. **Backup**: Export contact submissions regularly from Supabase

Your serverless contact form backend is now ready! 🎉