import { Pause } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import ReplayIcon from "@mui/icons-material/Replay";
import { Box, Typography, Paper, IconButton, LinearProgress, useTheme, Stack } from "@mui/material";
import { useDropzone, type Accept } from "react-dropzone";
import { useTranslation } from "react-i18next";

import { CircularProgressWithLabel } from "@/shared/components";

import { useFileUpload } from "../../hooks";

interface DropzoneFieldProps {
    name: string;
    multiple?: boolean;
    accept?: Accept;
    label?: string;
    maxSize?: number; // الحجم الأقصى بالبايت (اختياري)
}

export function DropzoneField({
    multiple = false,
    accept,
    label,
    name,
    maxSize
}: DropzoneFieldProps) {
    const theme = useTheme();
    const { t } = useTranslation("common");

    const { files, handleDrop, handleCancelUpload, handleRemoveFile, handleRetry } = useFileUpload({ name, multiple, maxSize });

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: handleDrop, multiple, accept });

    return (
        <Box>
            {/* Dropzone Area */}
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
                        ? theme.palette.mode === "dark"
                            ? "#333"
                            : "#f0f0f0"
                        : theme.palette.background.paper,
                    "&:hover": {
                        backgroundColor: theme.palette.mode === "dark" ? "#2c2c2c" : "#fafafa",
                    },
                }}
            >
                <input {...getInputProps()} />
                <Typography variant="subtitle1" sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>
                    {label}
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>
                    {t("dropzone.defaultMessage", "You can drag & drop files here or click to select")}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, color: theme.palette.text.secondary }}>
                    {multiple
                        ? t("dropzone.multiple", "You can select multiple files")
                        : t("dropzone.single", "Select a single file")}
                </Typography>
                <Typography variant="caption" sx={{ mt: 0.5, color: theme.palette.text.secondary }}>
                    {t("dropzone.supported", "Supported formats: {{formats}}", { formats: accept ? Object.keys(accept).join(", ") : "all" })}
                </Typography>
            </Paper>

            {/* Preview & Remove List */}
            {files.length > 0 && (
                <Box mt={2} display="flex" flexDirection="column" gap={2}>
                    {files.map((fileObj, index) => {
                        const { file, preview, progress, status, url } = fileObj;
                        const isImage = file ? file.type.startsWith("image/") : !!preview;

                        return (
                            <Paper
                                key={index}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    padding: 1.5,
                                    borderRadius: 2,
                                    backgroundColor: theme.palette.mode === "dark" ? "#2c2c2c" : "#f9f9f9",
                                    boxShadow: theme.shadows[1],
                                }}
                            >
                                <Box display="flex" alignItems="center" gap={2}>
                                    {isImage && preview && (
                                        <img
                                            src={preview}
                                            alt={file?.name}
                                            style={{
                                                width: 60,
                                                height: 60,
                                                objectFit: "cover",
                                                borderRadius: 6,
                                                border: `1px solid ${theme.palette.divider}`,
                                            }}
                                        />
                                    )}
                                    <Box>
                                        <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
                                            {file?.name} {file?.size > 0 && `${(file.size / 1024).toFixed(1)} KB`}
                                        </Typography>
                                        {status === "uploading" &&
                                            <Stack direction="row" alignItems="center" spacing={1}>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={progress}
                                                    sx={{ flex: 1, height: 6, borderRadius: 1 }}
                                                />
                                                <CircularProgressWithLabel
                                                    variant="determinate"
                                                    value={progress}
                                                    size={30}
                                                />
                                            </Stack>
                                        }
                                        {status === "error" && <Typography color="error" variant="caption">{t("dropzone.uploadFailed", "Upload failed")}</Typography>}
                                        {status === "success" && url && <Typography variant="caption" color="success.main">{t("dropzone.uploadSuccess", "Uploaded")}</Typography>}
                                    </Box>
                                </Box>

                                <Box>
                                    {status === "uploading" && (
                                        <IconButton color="warning" size="small" onClick={() => handleCancelUpload(index)} title="Cancel">
                                            <Pause fontSize="small" />
                                        </IconButton>
                                    )}

                                    {status === "error" && (
                                        <IconButton color="warning" size="small" onClick={() => handleRetry(index)} title={t("dropzone.retry", "Retry")}>
                                            <ReplayIcon fontSize="small" />
                                        </IconButton>
                                    )}

                                    {status !== "uploading" && (
                                        <IconButton color="error" size="small" onClick={() => handleRemoveFile(index)}>
                                            <CloseIcon fontSize="small" />
                                        </IconButton>
                                    )}
                                </Box>
                            </Paper>
                        );
                    })}
                </Box>
            )}
        </Box>
    );
}
