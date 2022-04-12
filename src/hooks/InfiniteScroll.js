import { useEffect, useState } from "react";

const useInfiniteScroll = (callback, matchDatasPiece) => {
  //callback은 실행될 함수가 들어와야 함.
  //matchDatasPiece는 조건문 작성을 위해 받아옴.
  const [target, setTarget] = useState(null);

  useEffect(() => {
    let observer;
    const onIntersect = ([entry], observer) => {
      if (entry.isIntersecting) {
        // observer.unobserve(entry.target);
        if (matchDatasPiece.length < 100) {
          callback();
        }
        // observer.observe(entry.target);
      }
    };

    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.9,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target, callback, matchDatasPiece]);

  return setTarget;
};

export default useInfiniteScroll;
