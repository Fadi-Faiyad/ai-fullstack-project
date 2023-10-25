//if the click on get started the get dircerted here
//---
//the NewUser well check the data base to see if you have a account
// if not you make one

import { prisma } from "@/utils/db"
import {  currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"

// if yes you get directed to Journlay

const createNewUser = async () => {
    const user = await currentUser()
    console.log(user)
  
    const match = await prisma.user.findUnique({
      where: {
        clerkId: user.id as string,
      },
    })
  
    if (!match) {
      await prisma.user.create({
        data: {
          clerkId: user.id,
          email: user?.emailAddresses[0].emailAddress,
        },
      })
    }
    redirect('/journal')
}


const NewUser = async () => {
    await createNewUser()

    return <div>....loading</div>
}

export default NewUser