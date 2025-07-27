import Link from 'next/link'
import { AuthorCardProps } from '@/types'

export default function AuthorCard({ author, showBio = false, className = '' }: AuthorCardProps) {
  const avatar = author.metadata?.avatar
  const name = author.metadata?.name || author.title
  const bio = author.metadata?.bio
  const instagram = author.metadata?.instagram
  const yearsSurfing = author.metadata?.years_surfing

  return (
    <div className={`flex items-start space-x-4 ${className}`}>
      {/* Avatar */}
      {avatar && (
        <Link href={`/authors/${author.slug}`}>
          <img
            src={`${avatar.imgix_url}?w=120&h=120&fit=crop&auto=format,compress`}
            alt={name}
            className="w-12 h-12 rounded-full object-cover hover:opacity-90 transition-opacity"
          />
        </Link>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <Link href={`/authors/${author.slug}`}>
          <h4 className="font-semibold text-gray-900 hover:text-primary-600 transition-colors">
            {name}
          </h4>
        </Link>
        
        {/* Meta Info */}
        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
          {yearsSurfing && (
            <span>{yearsSurfing} years surfing</span>
          )}
          {instagram && (
            <a 
              href={`https://instagram.com/${instagram.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-600 transition-colors"
            >
              {instagram}
            </a>
          )}
        </div>

        {/* Bio */}
        {showBio && bio && (
          <p className="mt-3 text-gray-600 text-sm leading-relaxed">
            {bio}
          </p>
        )}
      </div>
    </div>
  )
}