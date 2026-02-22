import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

import { mapAuthorToOption } from '@/features/authors';
import { mapCategoryToOption } from '@/features/categories/utilities';
import { mapTagToOption } from '@/features/tags';
import { paths } from '@/shared/constants';
import { AppFormProvider } from '@/shared/form';
import { MultiStepFormContainer } from '@/shared/form';
import type { SupportedLang } from '@/shared/types';
import { errorMapper, slugify } from '@/shared/utilities';

import { useCreateBook, useUpdateBook } from '../hooks';
import { BookFormSchema, type BookFormSchemaType } from '../schema';
import type { Book, BookRequestPayload } from '../types';

import { BasicInfoStep, MediaStep, PricingSpecStep, RelationsStep } from './../components';

interface Props {
    book?: Book;
}

export function BookForm({ book }: Props) {
    const { t, i18n } = useTranslation("book");
    const navigate = useNavigate();
    const lang = i18n.language as SupportedLang

    const { mutateAsync: createBook } = useCreateBook()
    const { mutateAsync: updateBook } = useUpdateBook()


    const defaultValues = {
        title_ar: book?.title_ar || "",
        title_en: book?.title_en || "",
        slug: book?.slug || "",
        sku: book?.sku || "",
        description_ar: book?.description_ar || "",
        description_en: book?.description_en || "",
        price: book?.price ?? 0,
        sale_price: book?.sale_price || null,
        stock: book?.stock ?? 0,
        pages: book?.pages ?? 0,
        publisher: book?.publisher || "",
        published_year: book?.published_year || null,
        cover_image: book?.cover_image || "",
        images: book?.book_images?.map(img => img.image_url) || [],
        authors: book?.authors?.map(a => mapAuthorToOption(lang, a)) || [],
        categories: book?.categories?.map(c => mapCategoryToOption(lang, c)) || [],
        tags: book?.tags?.map(t => mapTagToOption(lang, t)) || [],
        is_active: book?.is_active ?? true,
        isbn: book?.isbn || null
    }


    const methods = useForm<BookFormSchemaType>({
        resolver: zodResolver(BookFormSchema(t)),
        defaultValues
    });

    const { setValue, control } = methods;
    const titleEnValue = useWatch({ control, name: 'title_en' });

    useEffect(() => {
        if (titleEnValue) {
            setValue('slug', slugify(titleEnValue), { shouldValidate: true });
        }
    }, [titleEnValue, setValue, book]);

    const onsubmit = async (data: BookFormSchemaType) => {
        const { categories, images, tags, authors, ...bookData } = data;

        const payLoad: BookRequestPayload = {
            ...bookData,
            tag_ids: tags?.map(t => t.value) || [],
            category_ids: categories.map(c => c.value),
            author_ids: authors.map(a => a.value),
            images: images.map((img, index) => ({
                display_order: index,
                image_url: img
            }))
        } as BookRequestPayload

        try {
            if (book) {
                await updateBook({ id: book.id, data: payLoad })
                navigate(paths.dashboard.books.details(book.id));
                toast.success(t("feedback.successSave"));
                return
            }
            await createBook(payLoad)
            navigate(paths.dashboard.books.root);
            toast.success(t("feedback.successSave"));
        } catch (error) {
            errorMapper(error).forEach(err => toast.error(err));
        }
    };

    const steps = [
        {
            label: t("steps.basicInfo"),
            fields: ['title_ar', 'title_en', 'slug', 'sku', 'description_ar', 'description_en'],
            component: <BasicInfoStep />
        },
        {
            label: t("steps.pricing"),
            fields: ['price', 'sale_price', 'stock', 'pages', 'publisher', 'published_year'],
            component: <PricingSpecStep />
        },
        {
            label: t("steps.relations"),
            fields: ['author_id', 'category_ids'],
            component: <RelationsStep />
        },
        {
            label: t("steps.media"),
            fields: ['cover_image', 'images'],
            component: <MediaStep />
        },
    ];

    return (
        <AppFormProvider<BookFormSchemaType> methods={methods} onSubmit={onsubmit}>
            <MultiStepFormContainer
                steps={steps}
                submitText={book ? t("actions.editBook") : t("actions.createBook")}
            />
        </AppFormProvider>
    );
}