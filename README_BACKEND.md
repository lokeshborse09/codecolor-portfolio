# Contact Form Backend Setup

This backend handles contact form submissions with the following features:
- ✅ Saves form data to Supabase database
- ✅ Sends email notifications
- ✅ Validates all input data
- ✅ Returns proper success/error responses
- ✅ CORS enabled for frontend integration

## Setup Instructions

### 1. Database Setup
The migration file `supabase/migrations/create_contact_submissions.sql` will automatically create the required table when you connect to Supabase.

### 2. Environment Variables
Copy `.env.example` to `.env` and configure:

```bash
# Email settings (choose one method)

# Method 1: SMTP (Gmail example)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password  # Use App Password for Gmail
FROM_EMAIL=your_email@gmail.com
TO_EMAIL=where_to_receive_notifications@gmail.com

# Method 2: EmailJS (easier setup)
EMAILJS_SERVICE_ID=your_service_id
EMAILJS_TEMPLATE_ID=your_template_id
EMAILJS_USER_ID=your_user_id
```

### 3. Gmail Setup (if using SMTP)
1. Enable 2-Factor Authentication
2. Generate an App Password: Google Account → Security → App passwords
3. Use the App Password in `SMTP_PASS`

### 4. EmailJS Setup (Alternative)
1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create a service (Gmail, Outlook, etc.)
3. Create an email template
4. Get your Service ID, Template ID, and User ID

### 5. Edge Function Deployment
The edge function is automatically deployed to Supabase. No manual deployment needed.

## API Endpoint

**URL:** `https://your-project.supabase.co/functions/v1/contact-form`
**Method:** POST
**Headers:** 
- `Content-Type: application/json`
- `Authorization: Bearer YOUR_SUPABASE_ANON_KEY`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "Hello, I'd like to discuss a project..."
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Form submitted successfully",
  "data": {
    "id": "uuid",
    "submitted_at": "2025-01-20T10:30:00Z",
    "email_sent": true
  }
}
```

**Error Response:**
```json
{
  "error": "Validation failed",
  "details": ["Name is required", "Valid email is required"]
}
```

## Database Schema

The `contact_submissions` table includes:
- `id` (UUID, primary key)
- `name` (text, required)
- `email` (text, required)
- `subject` (text, required)
- `message` (text, required)
- `submitted_at` (timestamp)
- `ip_address` (text, optional)
- `created_at` (timestamp)

## Security Features

- ✅ Input validation (all fields required, email format)
- ✅ Row Level Security (RLS) enabled
- ✅ Service role policies for database access
- ✅ CORS headers configured
- ✅ IP address logging for security
- ✅ SQL injection protection via Supabase client

## Testing

You can test the endpoint using curl:

```bash
curl -X POST https://your-project.supabase.co/functions/v1/contact-form \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_SUPABASE_ANON_KEY" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Subject",
    "message": "Test message"
  }'
```

## Troubleshooting

1. **Email not sending**: Check SMTP credentials and ensure Gmail App Password is used
2. **Database errors**: Verify Supabase connection and table exists
3. **CORS issues**: Ensure proper headers are set in the edge function
4. **Validation errors**: Check that all required fields are provided and email is valid

The frontend form is already integrated and will show success/error messages automatically.