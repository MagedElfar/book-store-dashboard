import { supabaseClient } from "@/shared/lib";

import type { BookApiProvider, BookParams, BookRequestPayload } from "../types";


export const supabaseBookProvider: BookApiProvider = {

    createBook: async function (payload: BookRequestPayload) {

        const { images, tag_ids, category_ids, author_ids, ...bookData } = payload

        const { data: book, error: bookError } = await supabaseClient
            .from("books")
            .insert(bookData)
            .select()
            .single();

        if (bookError) throw new Error(bookError.message);
        const bookId = book.id;

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

        if (author_ids.length > 0) {
            const bookAuthors = author_ids.map(autId => ({
                book_id: bookId,
                author_id: autId
            }));
            const { error: authError } = await supabaseClient
                .from("book_authors")
                .insert(bookAuthors);

            if (authError) throw new Error(authError.message);
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
            book_authors (
                authors (
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
            authors: book.book_authors?.map((bc: any) => bc.authors).filter(Boolean) || [],

            categories: book.book_categories?.map((bc: any) => bc.categories).filter(Boolean) || [],

            tags: book.book_tags?.map((bt: any) => bt.tags).filter(Boolean) || [],

            book_images: book.book_images?.sort((a: any, b: any) => a.display_order - b.display_order) || []
        };
    },

    updateBook: async function (id: string, payload: Partial<BookRequestPayload>) {
        const { images, tag_ids, category_ids, author_ids, ...bookData } = payload;

        const { data: book, error: bookError } = await supabaseClient
            .from("books")
            .update(bookData)
            .eq("id", id)
            .select()
            .single();

        if (bookError) throw new Error(bookError.message);


        if (images) {
            await supabaseClient.from("book_images").delete().eq("book_id", id);

            if (images?.length > 0) {
                const imagesWithId = images.map(img => ({
                    ...img,
                    book_id: id
                }));
                const { error: imgError } = await supabaseClient
                    .from("book_images")
                    .insert(imagesWithId);
                if (imgError) throw new Error(imgError.message);
            }
        }


        if (category_ids) {
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
        }


        if (author_ids) {
            await supabaseClient.from("book_authors").delete().eq("book_id", id);
            if (author_ids.length > 0) {
                const bookAuthors = author_ids.map(autId => ({
                    book_id: id,
                    author_id: autId
                }));
                const { error: authError } = await supabaseClient
                    .from("book_authors")
                    .insert(bookAuthors);

                if (authError) throw new Error(authError.message);
            }
        }

        if (tag_ids) {
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
        }

        return book;
    },

    getBooks: async function (params?: BookParams) {
        const page = params?.page || 1;
        const pageSize = params?.limit || 10;
        const from = (page - 1) * pageSize;
        const to = from + pageSize - 1;

        let query = supabaseClient
            .from("books")
            .select(`
            *,
            book_categories${params?.category_id ? '!inner' : ''}(category_id),
            book_authors${params?.author_id ? '!inner' : ''}(author_id),
            book_tags${params?.tagId ? '!inner' : ''}(tag_id)
        `, { count: 'exact' });


        if (params?.search) {
            query = query.or(`title_en.ilike.%${params.search}%,title_ar.ilike.%${params.search}%`);
        }
        if (params?.author_id) {
            query = query.eq("book_authors.author_id", params.author_id);
        }

        if (params?.category_id) {
            query = query.eq("book_categories.category_id", params.category_id);
        }

        if (params?.tagId) {
            query = query.eq("book_tags.tag_id", params.tagId);
        }

        if (params?.is_active !== "") {
            query = query.eq("is_active", params?.is_active === "active");
        }


        const currentLang = params?.lang || "en";
        switch (params?.sortBy) {
            case "oldest":
                query = query.order("created_at", { ascending: true });
                break;
            case "price_high":
                query = query.order("price", { ascending: false });
                break;
            case "price_low":
                query = query.order("price", { ascending: true });
                break;
            case "alpha":
                query = query.order(`title_${currentLang}`, { ascending: true });
                break;
            case "newest":
            default:
                query = query.order("created_at", { ascending: false });
                break;
        }

        query = query.order("id", { ascending: false });

        const { data, error, count } = await query.range(from, to);

        if (error) throw new Error(error.message);


        return {
            items: data || [],
            total: count || 0
        };
    },

    getBooksStat: async function () {
        const { data, error } = await supabaseClient
            .rpc('get_book_statistics');

        if (error) {
            throw new Error(error.message);
        }

        const thisMonth = data.new_books_this_month || 0;
        const lastMonth = data.new_books_last_month || 0;

        let growth = 0;

        if (lastMonth > 0) {
            growth = ((thisMonth - lastMonth) / lastMonth) * 100;
        } else if (thisMonth > 0) {
            growth = 100;
        }

        return {
            ...data,
            growth_percentage: Math.round(growth)
        };
    },

    deleteBook: async function (id: string) {
        const { error } = await supabaseClient
            .from("books")
            .delete()
            .eq("id", id);

        if (error) throw new Error(error.message);
    },
};