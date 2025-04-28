import { getAllAppReviewApi } from '@/api/reviewService';
import FeedbackCardForAdmin from '@/components/Admin/Feedback/FeedbackCardForAdmin';
import ComponentSpinner from '@/components/common/ComponentSpinner';
import { ClientTestimonialsType } from '@/types/ClientTestimonialsType';
import React, { useEffect, useRef, useState, useCallback } from 'react';

type Props = {};

const FeedbackAdmin = (props: Props) => {
  const [reviews, setReviews] = useState<ClientTestimonialsType[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const isFetchingRef = useRef(false); // Prevent concurrent fetches

  const fetchAppReviews = useCallback(async (lastId?: string) => {
    if (isFetchingRef.current || (!hasMore && lastId)) return;

    isFetchingRef.current = true;
    try {
      setIsLoadingReviews(true);
      console.log('Fetching reviews with lastId:', lastId || 'undefined');
      const result = await getAllAppReviewApi(lastId ? lastId : '', 10);
      const newReviews = result.reviews;

      // Filter out duplicates based on _id
      setReviews((prev) => {
        const existingIds = new Set(prev.map((r) => r._id));
        const filteredReviews = newReviews.filter((r: ClientTestimonialsType) => !existingIds.has(r._id));
        return [...prev, ...filteredReviews];
      });

      // Update hasMore: if fewer than limit, no more data
      setHasMore(newReviews.length === 10);
      console.log('New reviews:', newReviews);
    } catch (error) {
      console.error('Error fetching app reviews:', error);
    } finally {
      setIsLoadingReviews(false);
      isFetchingRef.current = false;
    }
  }, [hasMore]);

  // Initial fetch
  useEffect(() => {
    console.log('Initial fetch triggered');
    fetchAppReviews();
  }, [fetchAppReviews]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (!observerRef.current || isLoadingReviews || !hasMore || reviews.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetchingRef.current) {
          const lastReview = reviews[reviews.length - 1];
          console.log('Observer triggered, fetching with lastId:', lastReview?._id);
          fetchAppReviews(lastReview?._id);
        }
      },
      { threshold: 0.5, rootMargin: '200px' } // Adjusted for better control
    );

    observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [reviews, isLoadingReviews, hasMore, fetchAppReviews]);

  const handleDelete = (_id: string) => {
    setReviews((prev) => prev.filter((review) => review._id !== _id));
  };

  return (
    <div className="flex min-h-lvh">
      <div className="bg-primary mt-10 mr-10 rounded-t-2xl px-4 py-4 flex-1">
        {isLoadingReviews && reviews.length === 0 ? (
          <ComponentSpinner />
        ) : reviews.length === 0 ? (
          <div className="text-center py-12">No Feedbacks available yet</div>
        ) : (
          <div className="mt-10 mb-5">
            <h2 className="text-lg font-medium mb-4 border-b border-b-gray-500 pb-5">
              All Feedbacks
            </h2>
            {reviews.map((review) => (
              <FeedbackCardForAdmin
                key={review._id}
                review={review}
                onDelete={handleDelete}
              />
            ))}
            <div ref={observerRef} className="h-10" />
            {isLoadingReviews && <ComponentSpinner />}
            {!hasMore && reviews.length > 0 && (
              <div className="text-center py-4">No more feedback to load</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackAdmin;