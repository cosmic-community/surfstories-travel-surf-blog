import Link from 'next/link'
import { Post } from '@/types'
import CategoryBadge from '@/components/CategoryBadge'
import AuthorCard from '@/components/AuthorCard'

interface HeroProps {
  post: Post;
}

export default function Hero({ post }: HeroProps) {
  const featuredImage = post.metadata?.featured_image
  const category = post.metadata?.category
  const author = post.metadata?.author

  return (
    <div className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Background Image */}
      {featuredImage && (
        <img
          src={`${featuredImage.imgix_url}?w=1920&h=1080&fit=crop&auto=format,compress`}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            {/* Category Badge */}
            {category && (
              <div className="mb-6">
                <CategoryBadge category={category} />
              </div>
            )}
            
            {/* Title */}
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>
            
            {/* Excerpt */}
            {post.metadata?.content && (
              <p className="text-xl text-white/90 mb-8 max-w-2xl leading-relaxed">
                {post.metadata.content.substring(0, 200)}...
              </p>
            )}
            
            {/* CTA Button */}
            <div className="mb-8">
              <Link
                href={`/posts/${post.slug}`}
                className="inline-flex items-center px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-colors duration-200"
              >
                Read Full Story
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            
            {/* Author */}
            {author && (
              <div className="flex items-center">
                <AuthorCard author={author} showBio={false} className="bg-white/10 backdrop-blur-sm" />
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  )
}