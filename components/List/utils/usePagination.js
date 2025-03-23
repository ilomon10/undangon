import { useState, useCallback, useMemo } from "react";

export function usePagination({ initialSkip = 0, initialLimit = 10 } = {}) {
  const [skip, setSkip] = useState(initialSkip);
  const [limit, setLimit] = useState(initialLimit);
  const [total, setTotal] = useState(null);

  // Derived states for navigation
  const canPrev = useMemo(() => skip > 0, [skip]);
  const canNext = useMemo(
    () => total === null || skip + limit < total,
    [skip, limit, total]
  );

  const nextPage = useCallback(() => {
    if (canNext) {
      setSkip((prevSkip) => prevSkip + limit);
    }
  }, [canNext, limit]);

  const prevPage = useCallback(() => {
    if (canPrev) {
      setSkip((prevSkip) => Math.max(0, prevSkip - limit));
    }
  }, [canPrev, limit]);

  const resetPagination = useCallback(() => {
    setSkip(initialSkip);
    setLimit(initialLimit);
    setTotal(null);
  }, [initialSkip, initialLimit]);

  // Function to update total after fetching data
  const updateTotal = useCallback((newTotal) => {
    setTotal(newTotal);
  }, []);

  return {
    skip,
    limit,
    total,
    canPrev,
    canNext,
    setLimit, // Allow changing limit dynamically
    nextPage,
    prevPage,
    resetPagination,
    updateTotal, // Use this after fetching data
  };
}
