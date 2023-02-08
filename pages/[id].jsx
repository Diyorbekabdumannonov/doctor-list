import { Box, Button, Modal, Typography } from "@mui/material";
import Image from "next/image";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { makeStyles } from "@mui/styles";
import { useRouter } from "next/router";
import clientPromise from '../lib/mongodb'
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import { useState } from "react";
import { useEffect, useRef } from "preact/hooks";

const useStyles = makeStyles({
    profile: {
        width: '100px', height: '100px', borderRadius: '100px', marginRight: '20px', objectFit: 'cover'
    },
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        background: 'white',
        boxShadow: 24,
        padding: 10,
    },
    timeBox: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '10px 0'
    }
})

export default function PersonalInfo({ res }) {
    const classes = useStyles()
    const router = useRouter()
    const user = res?.filter(e => e._id === router.query.id)[0]
    const [date, setDate] = useState()
    const [open, setOpen] = useState(false)
    const [errors, setErrors] = useState(false)

    const bookDoctor = async (date) => {
        const res = await fetch('http://localhost:3000/api/daily', {
            headers: {
                _id: user._id,
                time: date
            }
        })
            .then(res => res.status === 200 ? router.push('/') : '')
    }

    const setDateAndTime = (e) => {
        const currentDate = date
        const startTime = e.target.parentElement.parentElement.querySelector('input').value
        const endTime = e.target.parentElement.parentElement.querySelector('#inp').value
        if (!endTime || !startTime || endTime < startTime) {
            setErrors(true)
        }
        else {
            bookDoctor(currentDate + ' ' + startTime + ' ' + endTime)
            setOpen(false)
        }
    }

    const handleChange = (e) => {
        const endTime = e.target.parentElement.parentElement.children[1].children[1]
        if (e.target.value) {
            setErrors(false)
            endTime.disabled = false
        }
    }

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            marginY="40px"
            flexDirection='column'>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={classes.modal}>
                    <Box className={classes.timeBox}>
                        <Typography id="modal-modal-title" variant="h6">
                            Start Time
                        </Typography>
                        <input type="time" onChange={handleChange} />
                    </Box>
                    <Box className={classes.timeBox}>
                        <Typography id="modal-modal-title" variant="h6">
                            End Time
                        </Typography>
                        <input type="time" id="inp" disabled />
                    </Box>
                    {errors && <Typography variant="span" color="red">Something went wrong</Typography>}
                    <Box display="flex" alignItems="center" justifyContent="center">
                        <Button variant="contained" onClick={setDateAndTime}>Ok</Button>
                    </Box>
                </Box>
            </Modal>
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
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    dateClick={(info) => {
                        setOpen(true)
                        setDate(info.dateStr)
                    }}
                />
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
