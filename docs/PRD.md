# Product Requirements Document (PRD)

**Product Name:** RecipePilot  
**Type:** AI-Powered Recipe Generator Web App  
**Date:** July 30, 2025  
**Owner:** Asad Ur Rehman  

## 1. Executive Summary

RecipePilot is an AI-powered, web-based application that provides personalized recipe generation powered by Google AI/Genkit. It offers two modes of input: ingredient-based and dish name-based generation. Users receive structured recipe outputs with nutritional data, cooking instructions, and embedded YouTube video tutorials from curated sources. The application is designed for modern home cooks who want a personalized, interactive, and educational cooking experience.

## 2. Problem Statement & Market Opportunity

**Problem:**
- Home cooks often struggle with finding new meal ideas, especially when limited by available ingredients.
- Traditional recipe platforms lack personalization and interactivity.
- There is a lack of integration between recipe discovery and learning through cooking videos.

**Market Opportunity:**
- Rising global trend in home cooking and health-conscious eating.
- Increased demand for AI-powered personalization in food tech.
- Large user base on platforms like YouTube for cooking content — combining both offers a unique edge.

## 3. User Personas & Use Cases

**Persona 1: Sara, 24, Student**  
Wants to cook quick meals with whatever ingredients are available in her hostel.
- **Use Case:** Enters random fridge ingredients and gets simple recipes with easy-to-follow videos.

**Persona 2: Ahmed, 38, Working Professional**  
Prefers healthy food and tracks his protein intake.
- **Use Case:** Searches dish names and customizes preferences for nutrition and serving size.

**Persona 3: Fatima, 52, Home Cook**  
Enjoys exploring new cuisines but prefers Urdu/Hindi cooking tutorials.
- **Use Case:** Gets regional recipes with local YouTube tutorials.

## 4. Feature Requirements

### Current Features:
• Ingredient and dish-name based AI recipe generation  
• Cooking instructions, nutritional values, serving scaling  
• Magic link login via Supabase Auth  
• Save and favorite recipes  
• Embedded YouTube cooking videos  
• Responsive UI with Tailwind and shadcn/ui  

### Future Roadmap:
• Multilingual support (Urdu, Hindi, Spanish)  
• Meal planning calendar integration  
• Grocery list auto-generation  
• In-app video playback  
• AI chatbot assistant for cooking Q&A  
• Collaborative cooking mode for friends  

## 5. Technical Requirements

**Frontend:**
- Next.js (15.3.3), TypeScript, React 18
- Tailwind CSS + shadcn/ui for design
- React Context API for state management

**Backend:**
- Supabase for Auth & user data
- MongoDB for video recipe storage (curated videos)

**AI Layer:**
- Google AI/Genkit for recipe generation logic
- Connected via n8n for workflow automation

**Deployment:**
- Vercel CI/CD pipeline with production environment configs

## 6. Success Metrics & KPIs

• Magic link signups: 1,000 in 30 days  
• Average session time > 4 minutes  
• Recipe saves per user > 3  
• Recipe generation success rate > 95%  
• YouTube video click-through rate > 40%  

## 7. Go-to-Market Strategy

• Soft launch among university students and home cooks in Pakistan and India  
• Partnership with local cooking YouTubers for video curation and promotion  
• SEO optimization around ingredient searches  
• Shareable recipe links on WhatsApp and Instagram  

## 8. Competitive Analysis

| Competitor | Features | Gaps |
|------------|----------|------|
| Yummly | Recipe suggestion | No video tutorials |
| Tasty | Video-based recipes | No AI personalization |
| ChatGPT Recipes | AI recipe generation | No UI, no video integration |
| **RecipePilot** | **AI + video + multi-cuisine** | **Unique blend of all three** |

## 9. Risk Assessment

| Risk | Mitigation Strategy |
|------|-------------------|
| Recipe generation failure | Fallback templates + error messages |
| Video content copyright issues | Use public/collaborative content only |
| Supabase service limits | Upgrade to paid tier based on traffic |
| User churn | Onboarding, personalized reminders, favorites sync |

## 10. Timeline & Milestones

| Milestone | Date | Push to |
|-----------|------|---------|
| PRD + wireframes | Day 15 | /RecipePilot/docs/ |
| Backend & DB setup | Day 18 | /RecipePilot/api/ |
| Frontend UI | Day 21 | /RecipePilot/app/ |
| AI logic + testing | Day 24 | /RecipePilot/ai/ |
| Public demo live | Day 27 | — |
| Docs + Loom walkthrough | Day 29 | README.md |
| Final Demo Day | Day 30 | GitHub + Live Presentation |
