import Link from 'next/link'
import { PostCardProps } from '@/types'
import CategoryBadge from '@/components/CategoryBadge'
import WaveConditionBadge from '@/components/WaveConditionBadge'

export default function PostCard({ post, showAuthor = true, className = '' }: PostCardProps) {
  const featuredImage = post.metadata?.featured_image
  const category = post.metadata?.category
  const author = post.metadata?.author
  const location = post.metadata?.location
  const waveConditions = post.metadata?.wave_conditions

  return (
    <article className={`bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden group ${className}`}>
      <Link href={`/posts/${post.slug}`}>
        {/* Featured Image */}
        {featuredImage && (
          <div className="relative h-48 overflow-hidden">
            <img
              src={`${featuredImage.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
            {category && (
              <div className="absolute top-4 left-4">
                <CategoryBadge category={category} />
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          {post.metadata?.content && (
            <p className="text-gray-600 mb-4 line-clamp-3">
              {post.metadata.content.substring(0, 150)}...
            </p>
          )}

          {/* Post Meta */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {location && (
              <div className="flex items-center text-gray-500 text-sm">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
                {location}
              </div>
            )}
            {waveConditions && (
              <WaveConditionBadge condition={waveConditions} size="sm" />
            )}
          </div>

          {/* Author */}
          {showAuthor && author && (
            <div className="flex items-center">
              {author.metadata?.avatar && (
                <img
                  src={`${author.metadata.avatar.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                  alt={author.metadata.name || author.title}
                  className="w-8 h-8 rounded-full mr-3"
                />
              )}
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {author.metadata?.name || author.title}
                </p>
                {author.metadata?.years_surfing && (
                  <p className="text-xs text-gray-500">
                    {author.metadata.years_surfing} years surfing
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </Link>
    </article>
  )
}