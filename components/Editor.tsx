'use client'

import { updateEntry } from "@/utils/api"
import Spinner from './Spinner'
import { useState } from "react"
import { useAutosave } from "react-autosave"


const Editor = ({ entry }) => {
    const [value, setValue] = useState(entry.content)
    const [isLoading, setIsLoading] = useState(false)
    const [analysis, setAnalysis] = useState(entry.analysis)


    const { mood, summary, color, subject, negative } = analysis
    const analysisData = [
        { name: 'Summary', value: summary },
        { name: 'Subject', value: subject },
        { name: 'Mood', value: mood },
        { name: 'Negative', value: negative ? 'True' : 'False' },
    ]
    useAutosave({
        data: value,
        onSave: async (_value) => {
            setIsLoading(true)
            const data = await updateEntry(entry.id, _value)
            setAnalysis(data.analysis)
            setIsLoading(false)

        },
    })
    return (
        <div className="w-full h-full grid grid-cols-3" >
            <div className="absolute left-50 bottom-50 p-2">
                {isLoading ? (
                    <Spinner />
                ) : (
                    <div className="w-[16px] h-[16px] rounded-full bg-red-500"></div>
                )}
            </div>
            <div className="col-span-2">

                <textarea
                    className="w-full h-full p-8 text-xl"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>


            <div className="border-l border-black/10">
                <div className=" px-6 py-10" style={{ backgroundColor: color }}>
                    <h2 className="text-2xl bg-white/25 text-amber-50">Analysis</h2>
                </div>
                <div className="">
                    <ul role="list" className="divide-y divide-gray-200">
                        {analysisData.map(item => (
                            <li
                                key={item.name}
                                className="px-2 py-4 flex items-center justify-between border-b border-t border-black/10 text-amber-50"
                            >
                                <span className="text-lg font-semibold">{item.name}</span>
                                <span>{item.value}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Editor