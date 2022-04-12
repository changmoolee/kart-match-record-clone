import { useEffect, useState } from "react";

const useInfiniteScroll = (callback, matchDatasPiece, matchDatas) => {
  //callback은 실행될 함수가 들어와야 함.
  //matchDatasPiece는 조건문 작성을 위해 받아옴.
  const [target, setTarget] = useState(null);

  useEffect(() => {
    const onIntersect = ([entry], observer) => {
      if (entry.isIntersecting) {
        // observer.unobserve(entry.target);
        if (matchDatasPiece.length < matchDatas.length) {
          callback();
        }
        // observer.observe(entry.target);
      }
    };
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.9,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target, matchDatasPiece, matchDatas]);

  return setTarget;
};

export default useInfiniteScroll;
