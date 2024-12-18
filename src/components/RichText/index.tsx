import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { DefaultNodeTypes, SerializedBlockNode, SerializedLinkNode } from '@payloadcms/richtext-lexical'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import {
  JSXConvertersFunction,
  RichText as RichTextWithoutBlocks,
} from '@payloadcms/richtext-lexical/react'

import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'

import type {
  BannerBlock as BannerBlockProps,
  CallToActionBlock as CTABlockProps,
  MediaBlock as MediaBlockProps,
} from '@/payload-types'
import { BannerBlock } from '@/blocks/Banner/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { cn } from '@/utilities/cn'
import Link from 'next/link'
import React from 'react'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<CTABlockProps | MediaBlockProps | BannerBlockProps | CodeBlockProps>

// Custom type to include additional link properties
interface ExtendedSerializedLinkNode extends SerializedLinkNode {
  linkType?: 'internal' | 'external';
  doc?: {
    relationTo: string;
    value: {
      id: string;
      slug?: string;
    };
  };
  url?: string;
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  blocks: {
    banner: ({ node }) => <BannerBlock className="col-start-2 mb-4" {...node.fields} />,
    mediaBlock: ({ node }) => (
      <MediaBlock
        className="col-start-1 col-span-3"
        imgClassName="m-0"
        {...node.fields}
        captionClassName="mx-auto max-w-[48rem]"
        enableGutter={false}
        disableInnerContainer={true}
      />
    ),
    code: ({ node }) => <CodeBlock className="col-start-2" {...node.fields} />,
    cta: ({ node }) => <CallToActionBlock {...node.fields} />,
  },
  link: (converterProps) => {
    const node = converterProps.node as ExtendedSerializedLinkNode;

    // Convert SerializedLexicalNode children to React children
    const children = React.Children.toArray(
      node.children.map((child: any) => {
        // If child has text, render it directly
        if (child.text) return child.text;
        // Add more complex child rendering if needed
        return null;
      }).filter(Boolean)
    );

    // Handle internal links
    if (node.linkType === 'internal' && node.doc) {
      const { relationTo, value } = node.doc;
      
      // Custom routing logic
      const getInternalHref = (collection: string, doc: { id: string; slug?: string }) => {
        switch (collection) {
          case 'pages':
            return doc.slug ? `/${doc.slug}` : `/page/${doc.id}`;
          case 'posts':
            return doc.slug ? `/posts/${doc.slug}` : `/post/${doc.id}`;
          case 'categories':
            return doc.slug ? `/categories/${doc.slug}` : `/category/${doc.id}`;
          default:
            return '/';
        }
      };

      const href = getInternalHref(relationTo, value);

      return (
        <Link href={href}>
          {children}
        </Link>
      );
    }

    // Handle external links
    if (node.linkType === 'external' && node.url) {
      return (
        <a href={node.url}>
          {children}
        </a>
      );
    }

    // Fallback
    return <>{children}</>;
  }
})

type Props = {
  data: SerializedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props
  return (
    <RichTextWithoutBlocks
      converters={jsxConverters}
      className={cn(
        {
          'container ': enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose md:prose-md dark:prose-invert ': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}