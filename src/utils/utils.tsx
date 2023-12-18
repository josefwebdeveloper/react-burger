import React from "react";

export const getHeightFromDivToBottom = (containerRef:React.RefObject<any>) => {
  const rect = containerRef.current.getBoundingClientRect();
  return    window.innerHeight - rect.top-20;

}
export const getImageNameFromUrl=(url: string): string =>{
  // Extract the part of the URL after the last '/'
  const lastSlashIndex = url.lastIndexOf('/');
  let imageName = url.substring(lastSlashIndex + 1);

  // If there's a query string, remove it
  const queryParamIndex = imageName.indexOf('?');
  if (queryParamIndex !== -1) {
    imageName = imageName.substring(0, queryParamIndex);
  }

  return imageName;
}
