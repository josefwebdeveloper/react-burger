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
export const request = async (url: string, options?: RequestInit): Promise<any> => {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            console.log(response)
        const error: Error = new Error(`Network response was not ok: ${response.status}`);
        throw error;
        }
        return await response.json();
    } catch (error) {
        console.log(error)
        if (error instanceof Error) {
        throw error;
        } else {
        throw new Error('An unknown error occurred');
        }
    }
}
