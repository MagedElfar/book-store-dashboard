import { Button, Card, Stack, type ButtonProps, type CardProps, type StackProps } from '@mui/material'
import { useEffect, useRef, type ReactNode } from 'react'
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { getAllErrorMessages, getFirstErrorPath } from '../../utilities';

interface Props extends CardProps {
    children: ReactNode,
    submitText?: string
    buttonProps?: ButtonProps,
    stackProps?: StackProps
}

export function FormContainer({ children, submitText, sx, buttonProps, stackProps }: Props) {
    const { t } = useTranslation("common");
    const cardRef = useRef<HTMLDivElement>(null);

    const {
        formState: { isSubmitting, errors },
    } = useFormContext();

    const isUploading = Object.values(errors).some(err => err?.message === "uploading");

    // useEffect(() => {
    //     if (isSubmitSuccessful) {
    //         cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    //     }
    // }, [isSubmitSuccessful]);

    useEffect(() => {
        const firstErrorPath = getFirstErrorPath(errors)?.split('.')?.[0];

        getAllErrorMessages(errors).forEach((err, index) => {
            setTimeout(() => toast.error(err), index * 100);
        });

        if (firstErrorPath) {
            const fieldElement =
                document.querySelector(`[name="${firstErrorPath}"]`) ||
                document.querySelector(`[name="${firstErrorPath.replace('.', '\\.')}"]`) ||
                document.querySelector(`[data-test="${CSS.escape(firstErrorPath)}"]`);

            if (fieldElement) {
                fieldElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                });

                fieldElement.classList.add('error-shake');

                setTimeout(() => {
                    (fieldElement as HTMLElement).focus?.();
                    fieldElement.classList.remove('error-shake');
                }, 400);
            }
        }
    }, [errors]);

    return (
        <Card
            ref={cardRef}
            sx={{
                p: { xs: 2, sm: 3 },
                borderRadius: 4,
                ...sx
            }}
        >
            <Stack spacing={{ xs: 2, md: 3 }} {...stackProps}>
                {children}
                <Button
                    {...buttonProps}
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting || isUploading}
                    loading={isSubmitting}
                    sx={{
                        width: '250px',
                        borderRadius: '50px',
                        p: 1,
                        ...buttonProps?.sx
                    }}
                >
                    {submitText || t("submit")}
                </Button>
            </Stack>
        </Card>
    )
}
