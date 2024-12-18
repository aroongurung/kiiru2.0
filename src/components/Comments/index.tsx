import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Comment } from '../../payload-types'
import CommentForm from './CommentForm'

// Utility function to get relative time
function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffMinutes > 0) return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
  return 'just now';
}

type Props = {
  postId: number | string
  className?: string
}

export const Comments: React.FC<Props> = async ({ postId, className }) => {
  const payload = await getPayload({ config: configPromise })
  const { docs: comments } = await payload.find({
    collection: 'comments',
    where: {
      post: {
        equals: postId,
      },
      isApproved: {
        equals: true,
      },
    },
    sort: '-createdAt',
    depth: 0,
  })

  return (
    <div className={`py-8 ${className || ''}`}>
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      
      {/* Display existing comments */}
      <div className="space-y-4 mb-8">
        {(comments as Comment[]).map((comment) => {
          const formattedDate = new Date(comment.createdAt).toLocaleDateString();
          const relativeTime = getRelativeTime(comment.createdAt);

          return (
            <div key={comment.id} className="p-4 border rounded">
              <div className='flex justify-between items-center mb-2'>
                <div className="font-medium">{comment.author?.name}</div>
                <div className='flex gap-4'>
                  <div className="text-sm text-gray-500 mb-2">
                    {relativeTime}
                  </div>
                  <div className="text-sm text-gray-500 mb-2">
                    {formattedDate}
                  </div>
                </div>
              </div>
              <div><p>{comment.content}</p></div>
            </div>
          )
        })}
        {comments.length === 0 && (
          <p className="text-gray-500">No comments yet. Be the first to comment!</p>
        )}
      </div>

      {/* Comment form */}
      <CommentForm postId={postId} />
    </div>
  )
}

export default Comments