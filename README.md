# AI-Powered Recipe Generator

A modern web application that generates personalized recipes using AI based on your available ingredients and dietary preferences.

---

## 🔗 Live Demo

🌐 [View the App on Vercel](https://recipe-pilot-ht6napn4v-asad-usman89s-projects.vercel.app/)

---

## 🌟 Features

- **Magic Link Authentication** - Secure email-based login via Supabase
- **AI Recipe Generation** - Powered by n8n workflows and OpenAI
- **Dietary Preferences** - Support for vegan, keto, gluten-free, and more
- **Recipe Management** - Save, share, and download your favorite recipes
- **Responsive Design** - Beautiful UI that works on all devices
- **Recipe History** - Track and revisit your generated recipes

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 13, TypeScript, Tailwind CSS, ShadCN UI
- **Authentication**: Supabase (Magic Links)
- **Backend**: n8n for AI workflows
- **Database**: MongoDB for recipe storage
- **AI**: OpenAI GPT for recipe generation
- **Deployment**: Vercel

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- Supabase account
- n8n instance
- MongoDB database

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd recipe-generator
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Fill in your environment variables:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# n8n Webhook
N8N_WEBHOOK_URL=your_n8n_webhook_url

# MongoDB
MONGODB_URI=your_mongodb_connection_string
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

---

## 🏗️ Project Structure

```
├── app/                 # Next.js 13 app directory
│   ├── api/            # API routes
│   ├── dashboard/      # Dashboard page
│   ├── generate/       # Recipe generation page
│   ├── recipe/         # Recipe display pages
│   ├── saved/          # Saved recipes page
│   └── layout.tsx      # Root layout
├── components/         # Reusable components
│   ├── auth/          # Authentication components
│   ├── layout/        # Layout components
│   └── ui/            # ShadCN UI components
├── lib/               # Utilities and configurations
└── public/            # Static assets
```

---

## 🔧 Configuration

### Supabase Setup

1. Create a new Supabase project
2. Enable Email Auth with Magic Links
3. Disable email confirmation (optional)
4. Copy your project URL and anon key

### n8n Workflow

Create an n8n workflow that:
1. Receives ingredients and dietary preferences
2. Formats a prompt for OpenAI
3. Calls OpenAI API to generate recipe
4. Returns structured recipe data

### MongoDB Schema

```javascript
// Users collection (handled by Supabase)
{
  id: UUID,
  email: string,
  created_at: timestamp
}

// Recipes collection
{
  _id: ObjectId,
  user_id: string,
  ingredients_input: string,
  dietary_preference: string,
  generated_recipe: {
    title: string,
    cookTime: string,
    servings: number,
    ingredients: string[],
    instructions: string[],
    nutrition: object
  },
  created_at: timestamp,
  is_saved: boolean
}
```

---

## 🎨 Design System

The application uses a modern, food-themed design with:

- **Colors**: Primary blue, accent orange, warm neutrals
- **Typography**: Inter font family with consistent sizing
- **Components**: ShadCN UI for consistency
- **Responsive**: Mobile-first approach
- **Animations**: Subtle transitions and micro-interactions

---

## 📱 User Flow

1. **Landing** - User enters email for magic link
2. **Authentication** - Magic link login via Supabase
3. **Dashboard** - Overview of recent recipes
4. **Generate** - Input ingredients and preferences
5. **Recipe** - View generated recipe with actions
6. **Saved** - Manage saved recipes collection

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the project wiki

---

## 🚀 Deployment

Deploy to Vercel:

1. Connect your GitHub repository
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

The application is optimized for Vercel's platform with:
- Static site generation where possible
- API routes for backend functionality
- Automatic deployments from Git

---

## 👨‍💻 Author

**Asad Ur Rehman**  
BS Computer Science, FAST NUCES Karachi 
🌐 Connect: [www.linkedin.com/in/asad-ur-rehman-5b8112267](https://www.linkedin.com/in/asad-ur-rehman-5b8112267/)  
💬 Passionate about clean UI, purposeful tech, and continuous learning  

> _“It’s not about how fast you move, but how consistently you do — even small steps each day build unstoppable progress.”_
