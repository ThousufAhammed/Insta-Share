const profileImages = [
  'https://randomuser.me/api/portraits/women/44.jpg',
  'https://randomuser.me/api/portraits/men/32.jpg',
  'https://randomuser.me/api/portraits/women/68.jpg',
  'https://randomuser.me/api/portraits/men/75.jpg',
]

const posts = [
  {
    post_id: 'demo-post-1',
    user_id: 'user-1',
    user_name: 'maya',
    profile_pic: profileImages[0],
    post_details: {
      image_url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
      caption: 'Quiet morning coffee and a good book.',
    },
    likes_count: 128,
    comments: [
      {user_id: 'user-2', user_name: 'arjun', comment: 'That view is perfect.'},
      {user_id: 'user-3', user_name: 'leah', comment: 'Saving this place for later.'},
    ],
    created_at: '2 hours ago',
  },
  {
    post_id: 'demo-post-2',
    user_id: 'user-2',
    user_name: 'arjun',
    profile_pic: profileImages[1],
    post_details: {
      image_url: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=1200&q=80',
      caption: 'New running shoes, same weekend route.',
    },
    likes_count: 87,
    comments: [{user_id: 'user-1', user_name: 'maya', comment: 'Fresh pair!'}],
    created_at: '8 hours ago',
  },
  {
    post_id: 'demo-post-3',
    user_id: 'user-3',
    user_name: 'leah',
    profile_pic: profileImages[2],
    post_details: {
      image_url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
      caption: 'Camping under an unreal sky.',
    },
    likes_count: 246,
    comments: [
      {user_id: 'user-4', user_name: 'noah', comment: 'The stars look unreal.'},
      {user_id: 'user-1', user_name: 'maya', comment: 'Dream trip.'},
    ],
    created_at: '1 day ago',
  },
]

const stories = [
  {
    user_id: 'user-1',
    user_name: 'maya',
    story_url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
  },
  {
    user_id: 'user-2',
    user_name: 'arjun',
    story_url: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80',
  },
  {
    user_id: 'user-3',
    user_name: 'leah',
    story_url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
  },
  {
    user_id: 'user-4',
    user_name: 'noah',
    story_url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
  },
]

const buildProfile = userId => {
  const userPosts = posts.filter(post => post.user_id === userId)
  const firstPost = userPosts[0] || posts[0]
  const story = stories.find(item => item.user_id === userId) || stories[0]

  return {
    id: userId,
    user_id: userId,
    user_name: firstPost.user_name,
    profile_pic: firstPost.profile_pic,
    user_bio: 'Sharing small moments from everyday life.',
    followers_count: 1840,
    following_count: 312,
    posts_count: userPosts.length,
    stories: [{id: `${userId}-story`, image: story.story_url}],
    posts: userPosts.map(post => ({
      id: post.post_id,
      image: post.post_details.image_url,
    })),
  }
}

const myProfile = {
  id: 'demo-user',
  user_id: 'demo-user',
  user_name: 'demo_user',
  profile_pic: 'https://randomuser.me/api/portraits/men/15.jpg',
  user_bio: 'Demo account ready for exploring Insta Share.',
  followers_count: 920,
  following_count: 180,
  posts_count: 3,
  stories: stories.slice(0, 3).map((story, index) => ({id: `my-story-${index}`, image: story.story_url})),
  posts: posts.map(post => ({id: post.post_id, image: post.post_details.image_url})),
}

const delay = result =>
  new Promise(resolve => {
    window.setTimeout(() => resolve(result), 250)
  })

export const demoCredentials = {
  username: 'demo',
  password: 'demo123',
}

export const loginWithMockApi = async ({username, password}) => {
  if (username === demoCredentials.username && password === demoCredentials.password) {
    return delay({jwt_token: 'mock-jwt-token'})
  }

  throw new Error('Use demo / demo123 for the local demo account')
}

export const fetchFromMockApi = async path => {
  const [pathname, queryString = ''] = path.split('?')
  const searchParams = new URLSearchParams(queryString)

  if (pathname === '/insta-share/stories') {
    return delay({users_stories: stories})
  }

  if (pathname === '/insta-share/posts') {
    const search = searchParams.get('search')?.trim().toLowerCase()
    const filteredPosts = search
      ? posts.filter(
          post =>
            post.post_details.caption.toLowerCase().includes(search) ||
            post.user_name.toLowerCase().includes(search),
        )
      : posts

    return delay({posts: filteredPosts})
  }

  if (pathname === '/insta-share/my-profile') {
    return delay({profile: myProfile})
  }

  if (pathname.startsWith('/insta-share/users/')) {
    const userId = pathname.replace('/insta-share/users/', '')
    return delay({user_details: buildProfile(userId)})
  }

  if (/^\/insta-share\/posts\/.+\/like$/.test(pathname)) {
    return delay({message: 'Post like updated'})
  }

  throw new Error('Demo API route not found')
}
