import { ChevronDown, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { getCategories } from "../features/category/api/category.service";
import { useEffect, useState } from "react";
import type { Category } from "../features/category/type";
import type { ArticleDetail } from "../features/article/type";

export type ArticleFormValues = {
    title: string;
    content: string;
    picture: string;
    status: "published" | "unpublished" | "draft";
    type: "article";
    timeToRead: number;
    author: string;
    categoryId: string;
};

type ArticleFormProps = {
    article?: ArticleDetail;
    onClose: () => void;
    onSubmit: (values: ArticleFormValues) => void | Promise<void>;
};

type FormValues = {
    title: string;
    content: string;
    picture: string;
    status: "published" | "unpublished" | "draft" | "";
    timeToRead: string;
    author: string;
    categoryId: string;
};

export default function ArticleForm({ article, onClose, onSubmit }: ArticleFormProps) {
    const [categories, setCategories] = useState<Category[]>([]);
    const default_image =
        "https://s3.ap-southeast-1.amazonaws.com/nurturewave-be-dev/uploads%2Fimages%2F0b8821d6-1a35-4986-af30-232f74a04b51_download+(2).jpeg";

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        defaultValues: {
            title:
                article?.title ?? "",

            author:
                article?.author ?? "",

            content:
                article?.content ?? "",

            status:
                article?.status ?? "",

            categoryId:
                article?.categoryId ?? "",

            timeToRead:
                article?.timeToRead?.toString() ?? "",

            picture:
                default_image,
        }
    });

    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await getCategories();
                setCategories(response.data.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchCategories();
    }, []);

    useEffect(() => {
        if (!article) return;

        reset({
            title: article.title,
            author: article.author,
            content: article.content,
            status: article.status,
            categoryId: article.categoryId,
            timeToRead: article.timeToRead.toString(),
            picture: default_image,
        });
    }, [article, reset]);

    const status = watch("status");
    const selectedCategory = watch("categoryId");

    async function handleSubmitArticle(values: FormValues) {
        if (!values.status) return;

        await onSubmit({
            title: values.title,
            content: values.content,
            picture: values.picture,
            status: values.status,
            type: "article",
            timeToRead: Number(values.timeToRead),
            author: values.author,
            categoryId: values.categoryId,
        });
    }

    return (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50">
            <form
                onSubmit={handleSubmit(handleSubmitArticle)}
                className="flex h-full w-[560px] max-w-[calc(100vw-24px)] flex-col bg-white"
            >
                <div className="flex h-[68px] items-center justify-between border-b border-[#D8D8D8] px-6">
                    <h2 className="text-[22px] font-medium text-[#111]">
                        {article ? "Edit Article" : "Create Article"}
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        className="cursor-pointer text-[#666] transition hover:text-[#4B00A7]"
                    >
                        <X size={28} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-5">
                    <div className="space-y-4">
                        <div>
                            <label className="mb-1.5 block text-[16px] text-[#111]">
                                Title <span className="text-[#E53935]">*</span>
                            </label>

                            <div>
                                <input
                                    {...register("title", {
                                        required: "Title is required",
                                    })}
                                    placeholder="Title"
                                    className="h-[48px] w-full rounded-md border border-[#BDBDBD] px-4 pr-16 text-[16px] outline-none placeholder:text-[#B7B7B7] focus:border-[#4B00A7]"
                                />
                            </div>

                            {errors.title && (
                                <p className="mt-1 text-sm text-[#E53935]">
                                    {errors.title.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-1.5 block text-[16px] text-[#111]">
                                Author <span className="text-[#E53935]">*</span>
                            </label>

                            <input
                                {...register("author", {
                                    required: "Author is required",
                                })}
                                placeholder="Author"
                                className="h-[48px] w-full rounded-md border border-[#BDBDBD] px-4 text-[16px] outline-none placeholder:text-[#B7B7B7] focus:border-[#4B00A7]"
                            />

                            {errors.author && (
                                <p className="mt-1 text-sm text-[#E53935]">
                                    {errors.author.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-1.5 block text-[16px] text-[#111]">
                                Status <span className="text-[#E53935]">*</span>
                            </label>

                            <div className="relative">
                                <select
                                    {...register("status", {
                                        required: "Status is required",
                                    })}
                                    className={`h-[48px] w-full appearance-none rounded-md border border-[#BDBDBD] px-4 text-[16px] outline-none focus:border-[#4B00A7] ${status ? "text-[#111]" : "text-[#B7B7B7]"
                                        }`}
                                >
                                    <option value="" disabled>
                                        Select Status
                                    </option>
                                    <option value="published">Published</option>
                                    <option value="unpublished">Unpublished</option>
                                    <option value="draft">Draft</option>
                                </select>

                                <div className="pointer-events-none absolute right-0 top-1/2 flex h-8 w-12 -translate-y-1/2 items-center justify-center border-l border-[#D8D8D8]">
                                    <ChevronDown size={22} className="text-[#B7B7B7]" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="mb-1.5 block text-[16px] text-[#111]">
                                Category <span className="text-[#E53935]">*</span>
                            </label>

                            <div className="relative">
                                <select
                                    {...register("categoryId", {
                                        required: "Category is required",
                                    })}
                                    className={`h-[48px] w-full appearance-none rounded-md border border-[#BDBDBD] px-4 text-[16px] outline-none focus:border-[#4B00A7] ${selectedCategory ? "text-[#111]" : "text-[#B7B7B7]"
                                        }`}
                                >
                                    <option value="" disabled>
                                        Select
                                    </option>

                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>

                                <div className="pointer-events-none absolute right-0 top-1/2 flex h-8 w-12 -translate-y-1/2 items-center justify-center border-l border-[#D8D8D8]">
                                    <ChevronDown size={22} className="text-[#B7B7B7]" />
                                </div>
                            </div>

                            {errors.categoryId && (
                                <p className="mt-1 text-sm text-[#E53935]">
                                    {errors.categoryId.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-1.5 block text-[16px] text-[#111]">
                                Duration (Ex: 3 mins) <span className="text-[#E53935]">*</span>
                            </label>

                            <input
                                {...register("timeToRead", {
                                    required: "Time to read",
                                })}
                                type="number"
                                placeholder="Time to read"
                                className="h-[48px] w-full rounded-md border border-[#BDBDBD] px-4 text-[16px] outline-none placeholder:text-[#B7B7B7] focus:border-[#4B00A7]"
                            />
                            {errors.timeToRead && (
                                <p className="mt-1 text-sm text-[#E53935]">
                                    {errors.timeToRead.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-1.5 block text-[16px] text-[#111]">
                                Image <span className="text-[#E53935]">*</span>
                            </label>

                            <div className="h-[220px] overflow-hidden rounded-md border border-[#BDBDBD]">
                                <img
                                    src={default_image}
                                    alt="Default article"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="mb-1.5 block text-[16px] text-[#111]">
                                Content <span className="text-[#E53935]">*</span>
                            </label>

                            <textarea
                                {...register("content", {
                                    required: "Content is required",
                                })}
                                className="h-[100px] w-full resize-none rounded-md border border-[#BDBDBD] px-4 py-3 text-[16px] outline-none placeholder:text-[#B7B7B7] focus:border-[#4B00A7]"
                            />
                            {errors.content && (
                                <p className="mt-1 text-sm text-[#E53935]">
                                    {errors.content.message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="border-t border-[#D8D8D8] bg-white px-3 py-3">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="h-[44px] w-full cursor-pointer rounded-md bg-[#4B00A7] text-[16px] font-semibold text-white transition hover:bg-[#3d0088] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isSubmitting
                            ? article
                                ? "Updating..."
                                : "Creating..."
                            : article
                                ? "Update"
                                : "Create"}
                    </button>
                </div>
            </form>
        </div>
    );
}