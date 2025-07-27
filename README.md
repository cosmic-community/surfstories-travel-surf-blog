# SurfStories - Travel Surf Blog

![App Preview](https://imgix.cosmicjs.com/4fea0fa0-6a9b-11f0-a051-23c10f41277a-photo-1530549387789-4c1017266635-1753587572880.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern travel surf blog built with Next.js 15 and powered by Cosmic. Discover amazing surf destinations, learn about surf culture, and get essential tips for your wave-riding journey.

## ✨ Features

- **Dynamic Blog Posts** - Browse surf stories with beautiful imagery and detailed content
- **Category Filtering** - Filter posts by Destinations, Surf Culture, or Beginner Tips
- **Author Profiles** - Learn about experienced surf writers and photographers
- **Responsive Design** - Optimized for all device sizes
- **SEO Optimized** - Meta tags and structured data for better discoverability
- **Wave Conditions** - Track wave sizes and best seasons for surf spots
- **Location Details** - Detailed information about surf destinations worldwide

## Clone this Bucket and Code Repository

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Bucket and Code Repository](https://img.shields.io/badge/Clone%20this%20Bucket-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=6885974bee2d058c7a57c0e6&clone_repository=6885a07aee2d058c7a57c0ff)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a content model for a travel surf blog with posts, authors, and categories."

### Code Generation Prompt

> Build a Next.js website that uses my existing objects in this bucket. set apiEnvironment: staging in cosmic config

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠 Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Cosmic** - Headless CMS for content management
- **React Markdown** - Markdown content rendering

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account and bucket

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up your environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Add your Cosmic credentials to `.env.local`:
   ```
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

5. Run the development server:
   ```bash
   bun dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🌐 Cosmic SDK Examples

### Fetching Posts with Author and Category Data

```typescript
import { cosmic } from '@/lib/cosmic'

// Get all posts with nested author and category data
const posts = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Access nested data directly
posts.objects.forEach(post => {
  console.log(`Post: ${post.title}`)
  console.log(`Author: ${post.metadata.author?.title}`)
  console.log(`Category: ${post.metadata.category?.title}`)
})
```

### Filtering Posts by Category

```typescript
// Get posts from a specific category
const destinationPosts = await cosmic.objects
  .find({ 
    type: 'posts',
    'metadata.category': 'category-id-here'
  })
  .depth(1)
```

### Getting a Single Post

```typescript
// Get individual post with all metadata
const post = await cosmic.objects
  .findOne({ 
    type: 'posts', 
    slug: 'post-slug'
  })
  .depth(1)
```

## 🎨 Cosmic CMS Integration

This application integrates with your Cosmic bucket structure:

- **Posts** - Surf stories with title, content, featured images, authors, categories, locations, wave conditions, and best seasons
- **Authors** - Writer profiles with names, bios, avatars, Instagram handles, and years of surfing experience  
- **Categories** - Content organization with names, descriptions, and color coding

The app uses the staging environment as requested and includes proper error handling for empty results and loading states.

## 🚀 Deployment Options

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Add environment variables in the Vercel dashboard
3. Deploy automatically on push to main branch

### Netlify

1. Connect your repository to Netlify  
2. Set build command to `bun run build`
3. Set publish directory to `.next`
4. Add environment variables in Netlify dashboard

### Environment Variables for Production

Set these in your hosting platform:

- `COSMIC_BUCKET_SLUG` - Your Cosmic bucket slug
- `COSMIC_READ_KEY` - Your Cosmic read key  
- `COSMIC_WRITE_KEY` - Your Cosmic write key (if needed for mutations)

<!-- README_END -->