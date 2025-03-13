import Profile from '@/components/dashboard/profile'
import { auth } from '@/lib/auth'
import React from 'react'

const ProfilePage = async () => {
    const session = await auth()

    return (
        <Profile session={session} />
    )
}

export default ProfilePage