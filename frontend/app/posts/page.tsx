import { Suspense } from 'react';
import PostViewer from '../Components/PostViewer';

export default function ViewPostPage() {
  return (
    <Suspense fallback={<p className="p-6">Loading post...</p>}>
      <PostViewer />
    </Suspense>
  );
}
