# Supabase Magic Link Authentication Setup

This project now supports Supabase magic link authentication for email-based login.

## Setup Instructions

### 1. Create a Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new account or sign in
3. Create a new project
4. Wait for the project to be set up

### 2. Get Your Supabase Credentials
1. In your Supabase dashboard, go to Settings > API
2. Copy your Project URL and anon (public) key

### 3. Configure Environment Variables
1. Create a `.env.local` file in the root directory
2. Add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Configure Email Settings (Optional)
By default, Supabase sends emails from their domain. To customize:
1. Go to Authentication > Settings in your Supabase dashboard
2. Configure your SMTP settings under "SMTP Settings"
3. Customize email templates under "Email Templates"

### 5. Test the Magic Link
1. Run `npm run dev`
2. Go to the login page
3. Enter your email address
4. Click "Send Magic Link"
5. Check your email and click the verification link

## How It Works

1. **Login**: User enters email and clicks "Send Magic Link"
2. **Email Sent**: Supabase sends a secure login link to the user's email
3. **Verification**: User clicks the link in their email
4. **Redirect**: User is redirected to `/auth/callback` for processing
5. **Authentication**: The app verifies the session and logs the user in
6. **Dashboard**: User is redirected to the dashboard

## Files Modified

- `src/lib/supabase.ts` - Supabase client configuration
- `src/app/page.tsx` - Login page with magic link functionality
- `src/app/auth/callback/page.tsx` - Auth callback handler
- `src/context/user-context.tsx` - Enhanced user context with Supabase auth
- `.env.local.example` - Environment variables template

## Security Features

- ✅ Secure email-based authentication
- ✅ No passwords to manage
- ✅ Built-in session management
- ✅ Automatic token refresh
- ✅ Secure redirect handling
