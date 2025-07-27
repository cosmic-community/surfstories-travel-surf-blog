import { getPosts, getCategories } from '@/lib/cosmic'
import { Post, Category } from '@/types'
import PostCard from '@/components/PostCard'
import CategoryFilter from '@/components/CategoryFilter'
import Hero from '@/components/Hero'

export default async function HomePage() {
  const [posts, categories] = await Promise.all([
    getPosts(),
    getCategories()
  ])

  const typedPosts = posts as Post[]
  const typedCategories = categories as Category[]

  // Get featured post (first post)
  const featuredPost = typedPosts[0]
  const otherPosts = typedPosts.slice(1)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {featuredPost && <Hero post={featuredPost} />}

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Category Filter */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Explore Surf Stories
          </h2>
          <CategoryFilter categories={typedCategories} />
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherPosts.map((post) => (
            <PostCard key={post.id} post={post} showAuthor={true} />
          ))}
        </div>

        {/* No posts fallback */}
        {typedPosts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-500 text-lg">
              No surf stories available yet. Check back soon for amazing content!
            </div>
          </div>
        )}
      </div>
    </div>
  )
}