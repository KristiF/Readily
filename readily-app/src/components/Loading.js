import { Container, CircularProgress } from "@mui/material"

export default function Loading(props) {
    return(
        <div>
            <Container sx={{position: "fixed", top: "50%", left: "50%"}}>
                <CircularProgress/>
            </Container>
        </div>
    )
}