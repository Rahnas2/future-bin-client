

import { getCollectorReviewsApi } from '@/api/reviewService';
import ComponentSpinner from '@/components/common/ComponentSpinner';
import CollectorReviewHistory from '@/components/common/Feedback/CollectorReviewHistory';
import { IRootState } from '@/redux/slices';
import { ClientTestimonialsType } from '@/types/ClientTestimonialsType';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';


const CollectorFeedback = () => {
  const [feedbacks, setFeedbacks] = useState<ClientTestimonialsType[]>([]);
  const [isLoadingFeedbacks, setIsLoadingFeedbacks] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const isFetchingRef = useRef(false);
  const { collector } = useSelector((state: IRootState) => state.collector);

  const fetchFeedbacks = useCallback(
    async (lastId?: string) => {
      if (!collector?._id || isFetchingRef.current || (!hasMore && lastId)) return;

      isFetchingRef.current = true;
      try {
        setIsLoadingFeedbacks(true);
        console.log('Fetching collector reviews with lastId:', lastId || 'undefined');
        const result = await getCollectorReviewsApi(collector._id, lastId ? lastId : '', 10);
        const newFeedbacks = result.reviews;

        // Filter out duplicates based on _id
        setFeedbacks((prev) => {
          const existingIds = new Set(prev.map((f) => f._id));
          const filteredFeedbacks = newFeedbacks.filter(
            (f: ClientTestimonialsType) => !existingIds.has(f._id)
          );
          return [...prev, ...filteredFeedbacks];
        });

        // Update hasMore
        setHasMore(newFeedbacks.length === 10);
        console.log('New feedbacks:', newFeedbacks);
      } catch (error) {
        console.error('Error fetching collector reviews:', error);
      } finally {
        setIsLoadingFeedbacks(false);
        isFetchingRef.current = false;
      }
    },
    [collector?._id, hasMore]
  );

  // Initial fetch
  useEffect(() => {
    if (collector?._id) {
      console.log('Initial fetch triggered for collector:', collector._id);
      fetchFeedbacks();
    }
  }, [collector?._id, fetchFeedbacks]);

  // Intersection Observer
  useEffect(() => {
    if (!observerRef.current || isLoadingFeedbacks || !hasMore || feedbacks.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetchingRef.current) {
          const lastFeedback = feedbacks[feedbacks.length - 1];
          console.log('Observer triggered, fetching with lastId:', lastFeedback?._id);
          fetchFeedbacks(lastFeedback?._id);
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
  }, [feedbacks, isLoadingFeedbacks, hasMore, fetchFeedbacks]);

  return (
    <div className="flex min-h-lvh">
      <div className="bg-primary mt-10 mr-10 rounded-t-2xl px-4 py-4 flex-1">
        {isLoadingFeedbacks && feedbacks.length === 0 ? (
          <ComponentSpinner />
        ) : feedbacks.length === 0 ? (
          <div className="p-6 rounded-lg text-center text-gray-500">
            No Feedbacks About You
          </div>
        ) : (
          <div className="mt-10">
            <h2 className="text-lg font-medium mb-4 border-b border-b-gray-500 pb-5">
              All Feedbacks
            </h2>
            <CollectorReviewHistory reviews={feedbacks} />
            <div ref={observerRef} className="h-10" />
            {isLoadingFeedbacks && <ComponentSpinner />}
            {!hasMore && feedbacks.length > 0 && (
              <div className="text-center py-4">No more feedback to load</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectorFeedback;