import React, { useCallback, useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import debounce from "../Library/debounce";
import styled from "@emotion/styled";
import { Box } from "@chakra-ui/react";

const ScrollContainer = styled(Box)`
  overflow-y: scroll;
  max-height: 100%;
  height: 100%;
  box-sizing: border-box;
`;

export default function InfiniteScroll({ next, children, items }) {
  const scrollRef = useRef(null);
  const [index, setIndex] = useState(items ? items.length : 0);

  const getNext = useCallback(() => {
    next(index);
  }, [index, next]);

  const onScroll = debounce(() => {
    const height = getContainerHeight(scrollRef.current);
    if (shouldFetch(height)) {
      setIndex(items.length);
    }
  }, 250);

  function shouldFetch(height) {
    return (
      scrollRef.current.scrollTop + scrollRef.current.clientHeight >
      height - 500
    );
  }

  useEffect(() => {
    getNext();
  }, [getNext]);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    scrollContainer.addEventListener("scroll", onScroll);
    return function cleanup() {
      scrollContainer.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  useEffect(() => {
    setIndex(0);
  }, []);

  return <ScrollContainer ref={scrollRef}>{children}</ScrollContainer>;
}

function getContainerHeight(element) {
  return Math.max(element.scrollHeight, element.offsetHeight);
}
