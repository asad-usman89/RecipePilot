// Helper function to get the correct redirect URL based on environment
export function getAuthRedirectUrl(): string {
  // In production (Vercel), use the deployment URL
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/auth/callback`;
  }
  
  // Fallback for server-side rendering
  const baseUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : process.env.NODE_ENV === 'production'
    ? 'https://your-app-name.vercel.app' // Replace with your actual domain
    : 'http://localhost:9002';
    
  return `${baseUrl}/auth/callback`;
}

// Helper to get the site URL
export function getSiteUrl(): string {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  
  return process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : process.env.NODE_ENV === 'production'
    ? 'https://your-app-name.vercel.app' // Replace with your actual domain
    : 'http://localhost:9002';
}
