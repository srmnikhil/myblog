import React, { useEffect, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RTE } from "../index"
import appwriteService from "../../appwrite/post"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active",
        }
    })
    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData.userData);
    const submit = async (data) => {
        try {
            let fileId;
            // Handle image upload
            if (data.image[0]) {
                const file = await appwriteService.uploadImage(data.image[0]);
                if (file) {
                    fileId = file.$id;
                    // If updating an existing post, delete the old image
                    if (post) {
                        await appwriteService.deleteFile(post.image);
                    }
                }
            }

            // Prepare post data
            const postData = {
                ...data,
                image: fileId || post?.image, // Keep existing image if no new file is uploaded
                userId: userData.$id,
            };

            // Create or update post
            if (post) {
                // If updating, call updatePost
                const documentId = await appwriteService.updatePost(post.$id, postData);
                if (documentId) {
                    navigate(`/post/${documentId}`); // Navigate using the returned documentId
                }
            } else {
                // If creating, call createPost
                const documentId = await appwriteService.createPost(postData);
                if (documentId) {
                    navigate(`/post/${documentId}`); // Navigate using the returned documentId
                }
            }
        } catch (error) {
            console.log("Error occurred while submitting the post", error);
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            const slug = value.toLowerCase().replace(/ /g, '-');
            setValue("slug", slug);
            return slug;
        }
        return "";
    }, [setValue]);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                slugTransform(value.title);
            }
        });
        return () => {
            subscription.unsubscribe();
        }
    }, [watch, slugTransform]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", {required: !post})}
                />
                {post && post.image && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.image)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

export default PostForm;
