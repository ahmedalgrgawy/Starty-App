import { client } from '@/sanity/lib/client'
import { STARTUPS_BY_AUTHOR_QUERY } from '@/sanity/lib/queries'
import React from 'react'
import StartUpCard, { StartupTypeCard } from './StartUpCard'

const UserStartups = async ({ id }: { id: string }) => {

    const startups = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, { id })

    return (
        <>
            {startups.length > 0 ? (
                startups.map((st: StartupTypeCard) => {
                    return (
                        <StartUpCard key={st._id} post={st} />
                    )
                })
            ) : (
                <p className='no-result'>
                    No Posts Yet
                </p>
            )}
        </>
    )
}

export default UserStartups