import React from "react";

export const getHeightFromDivToBottom = (containerRef:React.RefObject<any>) => {
  const rect = containerRef.current.getBoundingClientRect();
  return    window.innerHeight - rect.top-20;

}
