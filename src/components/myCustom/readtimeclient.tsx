// ReadTimeClient.tsx
'use client'

import React from 'react'

type ContentBlock = {
  type: string;
  children?: Array<{
    type: string;
    version: number;
    text?: string;
    children?: Array<{ text: string }>;
    [k: string]: unknown;
  }>;
}

interface ReadTimeClientProps {
  content: { root: ContentBlock };
}

const ReadTimeClient: React.FC<ReadTimeClientProps> = ({ content }) => {
  const calculateReadTime = (content: { root: ContentBlock }): number => {
    let numWords = 0;

    if (!content?.root || !content.root.children) return 1;

    const countWordsInChildren = (children: Array<any>) => {
      for (let child of children) {
        if (child.text) {
          numWords += child.text.split(' ').filter((r) => r !== "").length;
        }
        if (child.children) {
          countWordsInChildren(child.children);
        }
      }
    };

    countWordsInChildren(content.root.children);

    const timeToReadMinutes = Math.ceil(numWords / 200);
    return timeToReadMinutes;
  };

  const readTimeNum = content && 'root' in content ? calculateReadTime(content) : 0;

  return (
    <div className="text-sm">
      <span>{readTimeNum} mins read</span>
    </div>
  );
};

export default ReadTimeClient;