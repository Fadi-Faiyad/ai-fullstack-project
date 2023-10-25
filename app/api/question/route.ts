import { qa } from "@/utils/ai"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { NextResponse } from "next/server"


// were are request something from post 
export const POST = async (request) => {
    const { question } = await request.json()
    const user = await getUserByClerkId()

    const entries = await prisma.journalEntry.findMany({
        where: {
            userId: user.id,
        },
        // we want to select the thing the Ai should check 
        //so we dont have a long wait request
        select: {
            content: true,
            createdAt: true,
        },
    })

    const answer = await qa(question, entries)

    return NextResponse.json({ data: answer })
}