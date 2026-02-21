import { supabaseClient } from "@/shared/lib";

import type { BookApiProvider, BookRequestPayload } from "../types";


export const supabaseBookProvider: BookApiProvider = {

    createBook: async function (payload: BookRequestPayload) {

        const { images, tag_ids, category_ids, ...bookData } = payload

        const { data: book, error: bookError } = await supabaseClient
            .from("books")
            .insert(bookData)
            .select()
            .single();

        if (bookError) throw new Error(bookError.message);
        const bookId = book.id;

        // add book images
        if (images.length > 0) {
            const imagesWithId = images.map(img => ({
                ...img,
                book_id: bookId
            }));
            const { error: imgError } = await supabaseClient
                .from("book_images")
                .insert(imagesWithId);

            if (imgError) throw new Error(imgError.message);
        }

        // add book categories
        if (category_ids.length > 0) {
            const bookCategories = category_ids.map(catId => ({
                book_id: bookId,
                category_id: catId
            }));
            const { error: catError } = await supabaseClient
                .from("book_categories")
                .insert(bookCategories);

            if (catError) throw new Error(catError.message);
        }

        // add book tags
        if (tag_ids.length > 0) {
            const bookTags = tag_ids.map(tagId => ({
                book_id: bookId,
                tag_id: tagId
            }));
            const { error: tagError } = await supabaseClient
                .from("book_tags")
                .insert(bookTags);

            if (tagError) throw new Error(tagError.message);
        }

        return book
    },

    getBookById: async function (id: string) {
        const { data: book, error } = await supabaseClient
            .from("books")
            .select(`
            *,
            author:authors (
                id,
                name_en,
                name_ar,
                image_url,
                bio_en,
                bio_ar
            ),
            book_images (
                id,
                book_id,
                image_url,
                display_order
            ),
            book_categories (
                categories (
                    id,
                    name_en,
                    name_ar
                )
            ),
            book_tags (
                tags (
                    id,
                    name_en,
                    name_ar
                )
            )
        `)
            .eq("id", id)
            .order("display_order", { foreignTable: "book_images", ascending: true })
            .single();

        if (error) throw new Error(error.message);

        return {
            ...book,
            author: Array.isArray(book.author) ? book.author[0] : book.author,

            categories: book.book_categories?.map((bc: any) => bc.categories).filter(Boolean) || [],

            tags: book.book_tags?.map((bt: any) => bt.tags).filter(Boolean) || []
        };
    },
    updateBook: async function (id: string, payload: BookRequestPayload) {
        const { images, tag_ids, category_ids, ...bookData } = payload;

        const { data: book, error: bookError } = await supabaseClient
            .from("books")
            .update(bookData)
            .eq("id", id)
            .select()
            .single();

        if (bookError) throw new Error(bookError.message);

        await supabaseClient.from("book_images").delete().eq("book_id", id);
        if (images.length > 0) {
            const imagesWithId = images.map(img => ({
                ...img,
                book_id: id
            }));
            const { error: imgError } = await supabaseClient
                .from("book_images")
                .insert(imagesWithId);
            if (imgError) throw new Error(imgError.message);
        }

        await supabaseClient.from("book_categories").delete().eq("book_id", id);
        if (category_ids.length > 0) {
            const bookCategories = category_ids.map(catId => ({
                book_id: id,
                category_id: catId
            }));
            const { error: catError } = await supabaseClient
                .from("book_categories")
                .insert(bookCategories);
            if (catError) throw new Error(catError.message);
        }

        await supabaseClient.from("book_tags").delete().eq("book_id", id);
        if (tag_ids.length > 0) {
            const bookTags = tag_ids.map(tagId => ({
                book_id: id,
                tag_id: tagId
            }));
            const { error: tagError } = await supabaseClient
                .from("book_tags")
                .insert(bookTags);
            if (tagError) throw new Error(tagError.message);
        }

        return book;
    },
};