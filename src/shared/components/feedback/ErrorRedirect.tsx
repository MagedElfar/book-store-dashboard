import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import { Box, Button, Card, CardContent, Stack, Typography } from "@mui/material"
import { useNavigate } from "react-router";

interface Props {
    title: string
    content: string,
    btnText: string,
    redirectPath?: string
    rest?: () => void
}

export function ErrorRedirect({ title, content, btnText, redirectPath, rest }: Props) {

    const navigate = useNavigate()

    const handelRedirect = () => {
        if (redirectPath) {
            navigate(redirectPath)
            return
        }

        rest?.()
    }
    return <Box
        sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "background.default",
            height: "100%"
        }}
    >
        <Card
            sx={{
                maxWidth: 420,
                width: "100%",
                textAlign: "center",
                borderRadius: 3,
                boxShadow: 3,
            }}
        >
            <CardContent sx={{ p: 4 }}>
                <Stack spacing={3} alignItems="center">
                    <ErrorOutlineRoundedIcon
                        color="error"
                        sx={{ fontSize: 72 }}
                    />

                    <Typography variant="h5">
                        {title}
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ whiteSpace: "pre-line" }}
                    >
                        {content}
                    </Typography>

                    <Button
                        color="error"
                        variant="contained"
                        fullWidth
                        onClick={handelRedirect}
                    >
                        {btnText}
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    </Box >
}
