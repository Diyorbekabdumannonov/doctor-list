import { Box, Typography } from '@mui/material';
import TableList from './tableList'

export default function MainPage({ users }) {
    return (
        <Box
            padding='40px 100px'>
            <Typography
                variant='h4'
                textAlign={'center'}>
                Welcome To Our Doctor List App
            </Typography>
            <Box
                display="flex"
                flexDirection="column"
                boxShadow="0px 0px 10px 1px #0bff63"
                borderRadius="20px"
                marginY="40px"
                paddingY="20px">
                {users?.map(user => {
                    return <Box key={user._id}>
                        <TableList
                            user={user} />
                    </Box>
                })}
            </Box>
        </Box>
    )
}