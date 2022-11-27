import React from 'react';
import {useRouter} from "next/router";

const BlogPostPage = () => {
    const router = useRouter()
    const {slug} = router.query
    console.log(slug)
    console.log(router.query)

    return (
        <div>
            <h1>The blog post {slug}</h1>
        </div>
    );
};

export default BlogPostPage;