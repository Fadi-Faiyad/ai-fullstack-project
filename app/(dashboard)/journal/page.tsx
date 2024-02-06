import EntryCard from "@/components/EntryCard"
import NewEntryCard from "@/components/NewEntryCard"
import Question from "@/components/Question"

import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import Link from "next/link"
import { qa } from "@/utils/ai"
import gg from "../imgUrl.jpg"
const getEntries = async () => {
  const user = await getUserByClerkId()
  const data = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      analysis: true,
    },
  })

  return data
}

const JournalPage = async () => {
  const data = await getEntries()
  return (
    <div 
    className=" pl-10 pr-10 lg:px-6 lg:py-8 h-full w-full bg-amber-50"  style={{ backgroundImage: 'url("../imgUrl.jpg")' }}>
      <h1 className="text-4xl mb-12 rounded-full text-center bg-amber-500 text-cyan-50 shadow-lg shadow-cyan-500/100	">Journals</h1>
      <div className="my-8  shadow-cyan-500/100">
        <Question />
      </div>
      <div className="h-full-screen w-full">
        <div className=" snap-center text-amber-500 border-amber-100"> <NewEntryCard /> </div>
        <div className=" grid grid-cols-2 gap-10 mt-4 h-[400px] overflow-y-scroll  lg:h-full lg:w-full lg:grid-cols-4 ">
        {data.map((entry) => (
          <div className="rounded-lg border-4 text-amber-500 border-amber-100 shadow-lg shadow-cyan-500/100" key={entry.id}>
            <Link className="bg-amber-500" href={`/journal/${entry.id}`}>
              <EntryCard entry={entry} />
            </Link>
          </div>
        ))}
        </div>
      </div>
    </div>
  )
}

export default JournalPage
