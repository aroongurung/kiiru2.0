import React from 'react'
import { OnlyText as OnlyTextBlockType } from '../../payload-types'

type Props = {
    className?: string
} & OnlyTextBlockType

export const OnlyTextBlockComponent: React.FC<Props> = ({
    OnlyTextBox,
}) => {

    return (
        <section className="container mt-8">
                 <div className="bg-card rounded-xl border-border border p-4 flex flex-col gap-8 md:flex-row md:justify-between md:items-center">
                    <div className="max-w-[48rem] flex items-center">
                    {OnlyTextBox?.map((onlytextitem, index) => (
                        <div key={index} className="rounded-2xl overflow-hidden p-1">
                            <h3 className="text-xl font-bold mb-1 md:text-2xl">{onlytextitem.OnlyTextTitle}</h3>
                            <h4 className="text-gray-400 md:text-lg">{onlytextitem.OnlyTextDescription}</h4>
                        </div>
                    ))}
                    </div>
                </div>                   
        </section>
    )
}

export default OnlyTextBlockComponent
