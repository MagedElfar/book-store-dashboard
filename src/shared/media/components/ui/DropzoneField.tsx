import { Pause } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import ReplayIcon from "@mui/icons-material/Replay";
import { Box, Typography, Paper, IconButton, LinearProgress, useTheme, Stack } from "@mui/material";
import { useDropzone, type Accept } from "react-dropzone";
import { useTranslation } from "react-i18next";

import { CircularProgressWithLabel, SortableFileItem, SortableList } from "@/shared/components";

import { useFileUpload } from "../../hooks";

interface DropzoneFieldProps {
    name: string;
    multiple?: boolean;
    accept?: Accept;
    label?: string;
    maxSize?: number;
}

export function DropzoneField({ multiple = false, accept, label, name, maxSize }: DropzoneFieldProps) {
    const theme = useTheme();
    const { t } = useTranslation("common");

    const { files, handleDrop, handleCancelUpload, handleRemoveFile, handleRetry, handleReorder } =
        useFileUpload({ name, multiple, maxSize });

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: handleDrop, multiple, accept });

    const itemIds = files.map(f => f.url || f.preview || "");

    return (
        <Box>
            <Paper
                {...getRootProps()}
                sx={{
                    padding: 4,
                    minHeight: 120,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    border: `2px dashed ${theme.palette.mode === "dark" ? "#555" : "#ccc"}`,
                    borderRadius: 2,
                    cursor: "pointer",
                    transition: "all 0.2s",
                    backgroundColor: isDragActive
                        ? (theme.palette.mode === "dark" ? "#333" : "#f0f0f0")
                        : theme.palette.background.paper,
                }}
            >
                <input {...getInputProps()} />
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{label}</Typography>
                <Typography variant="body2">{t("dropzone.defaultMessage")}</Typography>
            </Paper>

            {files.length > 0 && (
                <SortableList itemIds={itemIds} onReorder={handleReorder}>
                    <Box mt={2} display="flex" flexDirection="column" gap={2}>
                        {files.map((fileObj, index) => {
                            const { file, preview, progress, status, url } = fileObj;

                            const isImage = file
                                ? file.type.startsWith("image/")
                                : (url?.toLowerCase().endsWith('.webp') || url?.match(/\.(jpeg|jpg|gif|png)$/i));

                            const uniqueId = url || preview || `temp-${index}`;

                            return (
                                <SortableFileItem disabled={!multiple} key={uniqueId} id={uniqueId}>
                                    <Paper
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            padding: 1.5,
                                            borderRadius: 2,
                                            backgroundColor: theme.palette.mode === "dark" ? "#2c2c2c" : "#f9f9f9",
                                        }}
                                    >
                                        <Box display="flex" alignItems="center" gap={2}>
                                            {isImage && preview && (
                                                <img src={preview} alt="preview" style={{ width: 60, height: 60, objectFit: "contain", borderRadius: 6 }} />
                                            )}
                                            <Box>
                                                <Typography variant="body2">{file?.name || "Uploaded File"}</Typography>
                                                {status === "uploading" && (
                                                    <Stack direction="row" alignItems="center" spacing={1}>
                                                        <LinearProgress variant="determinate" value={progress} sx={{ width: 100 }} />
                                                        <CircularProgressWithLabel value={progress} size={25} />
                                                    </Stack>
                                                )}
                                                {status === "error" && <Typography color="error" variant="caption">{t("dropzone.uploadFailed")}</Typography>}
                                            </Box>
                                        </Box>

                                        <Box>
                                            {status === "uploading" && (
                                                <IconButton color="warning" size="small" onClick={() => handleCancelUpload(index)}>
                                                    <Pause fontSize="small" />
                                                </IconButton>
                                            )}
                                            {status === "error" && (
                                                <IconButton color="warning" size="small" onClick={() => handleRetry(index)}>
                                                    <ReplayIcon fontSize="small" />
                                                </IconButton>
                                            )}
                                            <IconButton color="error" size="small" onClick={() => handleRemoveFile(index)}>
                                                <CloseIcon fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    </Paper>
                                </SortableFileItem>
                            );
                        })}
                    </Box>
                </SortableList>
            )}
        </Box>
    );
}