import Image from 'next/image';
import { Button, Link, Typography, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    line: {
        cursor: 'pointer', display: "flex", alignItems: "center", padding: '10px 20px', textDecoration: 'none', color: '#333', textDecoration: 'none', fontSize: '18px', fontWeight: '600'
    },
    profile: {
        width: '50px', height: '50px', borderRadius: '100px', marginRight: '20px', objectFit: 'cover'
    },
    hr: {
        width: '1px', height: '25px', background: '#999', border: "none", marginRight: '20px'
    },
    w20: {
        width: '20%'
    }
})


export default function TableList({ user }) {
    const classes = useStyles()
    return <Link
        href={`/${user._id}`}
        className={classes.line}>
        <Image
            src={user.img}
            alt="profile"
            width={50}
            height={50}
            className={classes.profile} />
        {['name', 'category', 'country', 'phone'].map(userInfo => {
            return <>
                <Typography
                    key={userInfo}
                    className={classes.w20}
                    color="#333">
                    {user[userInfo]}
                </Typography>
                <hr className={classes.hr} />
            </>
        })}
        <Box
            className={classes.w20}
            display="flex"
            justifyContent='center'>
            {user?.booked ?
                <Button
                    variant="contained"
                    color='success'>
                    Booked at {user.booked}
                </Button>
                : <Button
                    variant="contained"
                    color='success'>
                    Book
                </Button>}
        </Box>
    </Link>
}