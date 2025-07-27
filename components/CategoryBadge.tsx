import Link from 'next/link'
import { CategoryBadgeProps } from '@/types'

export default function CategoryBadge({ category, size = 'md' }: CategoryBadgeProps) {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  }

  const bgColor = category.metadata?.color || '#0ea5e9'
  
  return (
    <Link href={`/categories/${category.slug}`}>
      <span 
        className={`inline-flex items-center font-medium rounded-full text-white hover:opacity-90 transition-opacity ${sizeClasses[size]}`}
        style={{ backgroundColor: bgColor }}
      >
        {category.metadata?.name || category.title}
      </span>
    </Link>
  )
}