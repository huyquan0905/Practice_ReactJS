import React, { useEffect, useRef, useState } from "react";

const withLazyLoad = (WrappedComponent, loadMoreData) => {
  return (props) => {
    const observerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            loadMoreData();
          }
        },
        { threshold: 1.0 } 
      );
      if (observerRef.current) {
        observer.observe(observerRef.current);
      }

      return () => observer.disconnect();
    });

    return (
      <div>
        <WrappedComponent {...props} />
        <div ref={observerRef} style={{ height: "1px", marginTop: "10px" }} />
      </div>
    );
  };
};

export default withLazyLoad;
