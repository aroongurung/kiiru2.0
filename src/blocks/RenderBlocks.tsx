import React, { Fragment } from 'react'
import type { Page } from '@/payload-types'

// Import components
import { ArchiveBlock as ArchiveBlockComponent } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock as CallToActionBlockComponent } from '@/blocks/CallToAction/Component'
import { ContentBlock as ContentBlockComponent } from '@/blocks/Content/Component'
import { FormBlock as FormBlockComponent } from '@/blocks/Form/Component'
import { MediaBlock as MediaBlockComponent } from '@/blocks/MediaBlock/Component'
import { CoverAdBlockComponent } from '@/blocks/CoverAdBlock/Component'
import ServicesBlockComponent from './ServiceBlock/Component'
import OnlyTextBlockComponent from './OnlyText/Component'
import QuizBlockComponent from './Quiz/Component'
import SurveyBlockComponent from './Survey/Component'


// Create a more generic type for block components
type GenericBlockComponent = React.FC<any>

// Component mapping with more flexible typing
const blockComponents: Record<string, GenericBlockComponent> = {
  archive: ArchiveBlockComponent,
  content: ContentBlockComponent,
  cta: CallToActionBlockComponent,
  formBlock: FormBlockComponent,
  mediaBlock: MediaBlockComponent,
  coverAdBlock: CoverAdBlockComponent,
  services: ServicesBlockComponent,
  onlytext: OnlyTextBlockComponent,
  quiz : QuizBlockComponent,
  survey: SurveyBlockComponent,
  
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = ({ blocks }) => {
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (!hasBlocks) return null

  return (
    <Fragment>
      {blocks.map((block, index) => {
        const { blockType } = block

        // Type-safe component lookup with fallback
        const Component = blockType 
          ? blockComponents[blockType] 
          : null

        if (Component) {
          return (
            <div className="my-16" key={index}>
              <Component {...block} />
            </div>
          )
        }

        return null
      })}
    </Fragment>
  )
}