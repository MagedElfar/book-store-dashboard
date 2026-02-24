import { Stack, Typography, Divider, Alert } from "@mui/material";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useBookAutoComplete, type Book } from "@/features/books";
import { FormAutocomplete, type OptionValue } from "@/shared/form";

import type { OrderListFormType } from "../../schema";
import OrderItemRow from "../ui/OrderItemRow";


export function OrderItemsStep() {
    const { t } = useTranslation("order");
    const { control, watch, setValue, formState: { errors } } = useFormContext<OrderListFormType>();

    const tempBook = watch("tempBook") || null

    const { fields, append, remove, update } = useFieldArray({
        control,
        name: "items",
    });

    const { options, setSearch, setIsBooksEnabled, ...bookQuery } = useBookAutoComplete();

    const handleSelectProduct = (option: OptionValue<Book>) => {

        if (!option || Array.isArray(option)) return;

        const book = option.data as Book;

        const existingIndex = fields.findIndex((f) => f.bookId === option.value);

        if (existingIndex > -1) {
            const currentQty = watch(`items.${existingIndex}.quantity`) as number;

            update(existingIndex, {
                ...fields[existingIndex],
                quantity: currentQty + 1,
            });
        } else {
            append({
                bookId: option.value,
                price: book?.sale_price ?? book.price,
                item: option,
                quantity: 1,
            });
        }

        setValue("tempBook", null)
    };

    return (
        <Stack data-test="items" spacing={3}>
            {errors.items?.message && (
                <Alert severity="error" sx={{ borderRadius: 2, mb: 2 }}>
                    {String(errors.items.message)}
                </Alert>
            )}

            {Array.isArray(errors.items) && errors.items.map((err, index) => (
                err?.message ? (
                    <Alert key={index} severity="error" sx={{ borderRadius: 2, mb: 1 }}>
                        {index + 1}: {err.message}
                    </Alert>
                ) : null
            ))}
            <Stack spacing={2}>
                <Typography variant="subtitle2" color="primary" sx={{ mb: 1.5 }}>
                    {t("fields.addProducts")}
                </Typography>

                <FormAutocomplete<Book>
                    name="tempBook"
                    label={t("fields.books")}
                    options={options}
                    loading={bookQuery.isLoading}
                    onSearchChange={setSearch}
                    hasNextPage={bookQuery.hasNextPage}
                    fetchNextPage={bookQuery.fetchNextPage}
                    isFetchingNextPage={bookQuery.isFetchingNextPage}
                    defaultValue={tempBook}
                    onOpen={() => setIsBooksEnabled(true)}
                    handleSelect={handleSelectProduct}

                />
            </Stack>

            <Divider />

            <Stack spacing={1.5}>
                {fields.length > 0 ? (
                    fields.map((field, index) => (
                        <OrderItemRow
                            key={field.id}
                            index={index}
                            onRemove={() => remove(index)}
                        />
                    ))
                ) : (
                    <Alert severity="info" sx={{ borderRadius: 2 }}>
                        {t("messages.noItemsYet")}
                    </Alert>
                )}
            </Stack>

        </Stack>
    );
}