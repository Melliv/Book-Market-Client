import { Alert } from "@mui/material";

export default function Error({message = "Error"}: {message?: string}) {

    return <Alert severity="error">{message}</Alert>

}
