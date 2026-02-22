import { Grid } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useAuthorAutoComplete } from "@/features/authors";
import { useCategoryAutoComplete } from "@/features/categories";
import { useTagsAutoComplete } from "@/features/tags";
import { FormAutocomplete } from "@/shared/form";

import type { BookFormSchemaType } from "../../schema";

export function RelationsStep() {
    const { t } = useTranslation("book");
    const { watch } = useFormContext<BookFormSchemaType>()

    const { options: tagOptions, setIsTagsEnabled, setSearch: setTagSearch, ...tagsQuery } = useTagsAutoComplete();
    const { options: authorOptions, setIsAuthorsEnabled, setSearch: setAuthorSearch, ...authorsQuery } = useAuthorAutoComplete();
    const { options: categoryOptions, setIsCategoriesEnabled, setSearch: setCategorySearch, ...categoriesQuery } = useCategoryAutoComplete();

    return (
        <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
                <FormAutocomplete
                    name="author"
                    label={t("label.author")}
                    options={authorOptions}
                    loading={authorsQuery.isLoading}
                    onSearchChange={setAuthorSearch}
                    hasNextPage={authorsQuery.hasNextPage}
                    fetchNextPage={authorsQuery.fetchNextPage}
                    isFetchingNextPage={authorsQuery.isFetchingNextPage}
                    defaultValue={watch("author")}
                    onOpen={() => setIsAuthorsEnabled(true)}
                />
            </Grid>

            <Grid size={{ xs: 12 }}>
                <FormAutocomplete
                    multiple
                    name="categories"
                    label={t("label.categories")}
                    options={categoryOptions}
                    loading={categoriesQuery.isLoading}
                    onSearchChange={setCategorySearch}
                    hasNextPage={categoriesQuery.hasNextPage}
                    fetchNextPage={categoriesQuery.fetchNextPage}
                    isFetchingNextPage={categoriesQuery.isFetchingNextPage}
                    defaultValue={watch("categories")}
                    onOpen={() => setIsCategoriesEnabled(true)}
                />
            </Grid>

            <Grid size={{ xs: 12 }}>
                <FormAutocomplete
                    multiple
                    name="tags"
                    label={t("label.tags")}
                    options={tagOptions}
                    loading={tagsQuery.isLoading}
                    onSearchChange={setTagSearch}
                    hasNextPage={tagsQuery.hasNextPage}
                    fetchNextPage={tagsQuery.fetchNextPage}
                    isFetchingNextPage={tagsQuery.isFetchingNextPage}
                    defaultValue={watch("tags")}
                    onOpen={() => setIsTagsEnabled(true)}
                />
            </Grid>
        </Grid>
    );
}