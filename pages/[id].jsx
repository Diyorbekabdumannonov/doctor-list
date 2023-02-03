import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { makeStyles } from "@mui/styles";
import { useRouter } from "next/router";
import clientPromise from '../lib/mongodb'
import { useEffect } from "react";
import { useRef } from "react";

const useStyles = makeStyles({
    profile: {
        width: '100px', height: '100px', borderRadius: '100px', marginRight: '20px', objectFit: 'cover'
    }
})

export default function PersonalInfo({ res }) {
    const classes = useStyles()
    const calendarRef = useRef()

    const router = useRouter()
    const user = res?.filter(e => e._id === router.query.id)[0]

    useEffect(() => {
        localStorage.setItem('id', JSON.stringify(router.query.id))
    }, [])

    const bookDoctor = async () => {
        const res = await fetch('http://localhost:3001/api/daily', {
            method: 'post'
        })
            .then(res => res.status === 200 ? router.push('/') : '')
    }

    useEffect(() => {
        console.log(calendarRef.current)
    }, [calendarRef])

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            marginY="40px"
            flexDirection='column'>
            {user ?
                <>
                    <Image
                        src={user.img}
                        alt="profile"
                        width={100}
                        height={100}
                        className={classes.profile}
                        style={{ borderRadius: '100px', objectFit: 'cover' }}
                    />
                    <Typography
                        variant='h5'
                        marginTop="10px">
                        {user.name}
                    </Typography>
                    <Typography
                        variant='body2'
                        color='#333'
                        fontWeight={600}>
                        {user.category}
                    </Typography>
                </>
                : ''
            }
            <Box width={1000}>
                <FullCalendar
                    ref={calendarRef}
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    selectable
                />
            </Box>
            <Box
                display="flex"
                gap="20px"
                marginTop="20px">
                <Button
                    onClick={() => {
                        router.push('/')
                    }}
                    variant="outlined">
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={bookDoctor}
                    color="info">
                    Book
                </Button>
            </Box>
        </Box>
    )
}

export async function getServerSideProps() {
    try {
        const client = await clientPromise;
        const db = client.db("doctor_list")
        const res = await db.collection('doctors').find()
            .toArray()
        return {
            props: { res: JSON.parse(JSON.stringify(res)) },
        }
    } catch (e) {
        return {
            props: {},
        }
    }
}
