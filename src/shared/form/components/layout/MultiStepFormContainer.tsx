import {
    Button, Card, Stack, Stepper, Step, StepLabel, Box,
    type ButtonProps, type CardProps, type StackProps
} from '@mui/material';
import { useState, useRef, useEffect, type ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { getAllErrorMessages } from '../../utilities';

interface StepConfig {
    label: string;
    component: ReactNode;
    fields: string[];
}

interface Props extends CardProps {
    steps: StepConfig[];
    submitText?: string;
    buttonProps?: ButtonProps;
    stackProps?: StackProps;
}

export function MultiStepFormContainer({ steps, submitText, sx, buttonProps, stackProps }: Props) {
    const { t } = useTranslation("common");
    const [activeStep, setActiveStep] = useState(0);
    const cardRef = useRef<HTMLDivElement>(null);

    const {
        trigger,
        formState: { isSubmitting, errors },
    } = useFormContext();

    const isUploading = Object.values(errors).some(err => err?.message === "uploading");

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            getAllErrorMessages(errors).forEach((err, index) => {
                setTimeout(() => toast.error(err), index * 100);
            });
        }
    }, [errors]);


    const handleNext = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const fieldsToValidate = steps[activeStep].fields;
        const isStepValid = await trigger(fieldsToValidate as any);

        if (isStepValid) {
            setActiveStep((prev) => prev + 1);
            cardRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setActiveStep((prev) => prev - 1);
    };

    const isLastStep = activeStep === steps.length - 1;

    return (
        <Card
            ref={cardRef}
            sx={{ p: { xs: 2, sm: 3 }, borderRadius: 4, ...sx }}
        >
            {/* Stepper Header */}
            <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
                {steps.map((step) => (
                    <Step key={step.label}>
                        <StepLabel>{step.label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <Stack spacing={{ xs: 2, md: 3 }} {...stackProps}>

                <Box>
                    {steps[activeStep].component}
                </Box>

                <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 2 }}>
                    {activeStep !== 0 && (
                        <Button
                            onClick={handleBack}
                            variant="outlined"
                            type="button"
                            sx={{ borderRadius: '50px', width: '150px' }}
                        >
                            {t("back")}
                        </Button>
                    )}

                    {!isLastStep ? (
                        <Button
                            onClick={handleNext}
                            variant="contained"
                            type="button"
                            sx={{ borderRadius: '50px', width: '150px' }}
                        >
                            {t("next")}
                        </Button>
                    ) : (
                        <Button
                            {...buttonProps}
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting || isUploading}
                            sx={{
                                width: '200px',
                                borderRadius: '50px',
                                p: 1,
                                ...buttonProps?.sx
                            }}
                        >
                            {submitText || t("submit")}
                        </Button>
                    )}
                </Stack>
            </Stack>
        </Card>
    );
}