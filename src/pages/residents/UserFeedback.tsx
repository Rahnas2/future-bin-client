import { getUserReviewsAboutCollectorsApi } from '@/api/reviewService';
import ComponentSpinner from '@/components/common/ComponentSpinner';
import CollectorReviewHistory from '@/components/common/Feedback/CollectorReviewHistory';
import UserServiceFeedback from '@/components/User/Feedback/UserServiceFeedback';
import SideNav from '@/components/UserDash/SideNav';
import { ClientTestimonialsType } from '@/types/ClientTestimonialsType';
import React, { useEffect, useRef, useState, useCallback } from 'react';

type Props = {};

const UserFeedback = (props: Props) => {
  const [collectorsReviews, setCollectorsReviews] = useState<ClientTestimonialsType[]>([]);
  const [isLoadingCollectorsReviews, setIsLoadingCollectorsReviews] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const isFetchingRef = useRef(false);

  const fetchCollectorsReviews = useCallback(async (lastId?: string) => {
    if (isFetchingRef.current || (!hasMore && lastId)) return;

    isFetchingRef.current = true;
    try {
      setIsLoadingCollectorsReviews(true);
      console.log('Fetching user reviews with lastId:', lastId || 'undefined');
      const result = await getUserReviewsAboutCollectorsApi(lastId ? lastId : '', 10);
      const newReviews = result.reviews;

      // Filter out duplicates based on _id
      setCollectorsReviews((prev) => {
        const existingIds = new Set(prev.map((r) => r._id));
        const filteredReviews = newReviews.filter(
          (r: ClientTestimonialsType) => !existingIds.has(r._id)
        );
        return [...prev, ...filteredReviews];
      });

      // Update hasMore
      setHasMore(newReviews.length === 10);
      console.log('New reviews:', newReviews);
    } catch (error) {
      console.error('Error fetching user reviews:', error);
    } finally {
      setIsLoadingCollectorsReviews(false);
      isFetchingRef.current = false;
    }
  }, [hasMore]);

  // Initial fetch
  useEffect(() => {
    console.log('Initial fetch triggered');
    fetchCollectorsReviews();
  }, [fetchCollectorsReviews]);

  // Intersection Observer
  useEffect(() => {
    if (!observerRef.current || isLoadingCollectorsReviews || !hasMore || collectorsReviews.length === 0)
      return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetchingRef.current) {
          const lastReview = collectorsReviews[collectorsReviews.length - 1];
          console.log('Observer triggered, fetching with lastId:', lastReview?._id);
          fetchCollectorsReviews(lastReview?._id);
        }
      },
      { threshold: 0.5, rootMargin: '200px' }
    );

    observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [collectorsReviews, isLoadingCollectorsReviews, hasMore, fetchCollectorsReviews]);

  return (
    <div className="flex gap-4 px-10">
      <SideNav />
      <div className="flex-1 py-15 px-8 bg-seconday rounded-lg shadow-sm">
        {isLoadingCollectorsReviews && collectorsReviews.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <ComponentSpinner />
          </div>
        ) : (
          <div className="space-y-8">
            {/* User feedback about future bin */}
            <UserServiceFeedback />

            {/* User reviewed collectors history */}
            <div className="mt-10">
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">Collectors Review</h2>
              {collectorsReviews.length > 0 ? (
                <>
                  <CollectorReviewHistory reviews={collectorsReviews} />
                  <div ref={observerRef} className="h-10" />
                  {isLoadingCollectorsReviews && <ComponentSpinner />}
                  {!hasMore && collectorsReviews.length > 0 && (
                    <div className="text-center py-4">No more reviews to load</div>
                  )}
                </>
              ) : (
                <div className="p-6 rounded-lg text-center text-gray-500">
                  You haven't added any reviews for collectors yet
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserFeedback;