import { Box, CircularProgress } from "@mui/material";

export function Loading() {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "#c4c4c4d1",
                zIndex: 10000,
            }}
        >
            <CircularProgress />
        </Box>
    );
}
