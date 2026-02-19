import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { Box, Button, Card, CardContent, Stack, Typography } from "@mui/material"
import { useNavigate } from "react-router";

interface Props {
    title: string
    content: string,
    btnText: string,
    redirectPath: string
}

export function SuccessRedirect({ title, content, btnText, redirectPath }: Props) {

    const navigate = useNavigate()

    const handelRedirect = () => {
        navigate(redirectPath)
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
                    <CheckCircleRoundedIcon
                        color="success"
                        sx={{ fontSize: 72 }}
                    />

                    <Typography variant="h5">
                        {title}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        {content}
                    </Typography>

                    <Button
                        variant="contained"
                        color="success"
                        fullWidth
                        onClick={handelRedirect}
                    >
                        {btnText}
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    </Box>
}
