'use client'

import Link from 'next/link'
import { Category } from '@/types'

interface CategoryFilterProps {
  categories: Category[];
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/categories/${category.slug}`}
          className="group"
        >
          <div 
            className="px-6 py-3 rounded-2xl text-white font-semibold hover:opacity-90 transition-opacity shadow-sm hover:shadow-md transform hover:scale-105 transition-transform duration-200"
            style={{ backgroundColor: category.metadata?.color || '#0ea5e9' }}
          >
            <div className="text-center">
              <h3 className="text-lg font-bold mb-1">
                {category.metadata?.name || category.title}
              </h3>
              {category.metadata?.description && (
                <p className="text-sm opacity-90">
                  {category.metadata.description}
                </p>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}