import React, {FC} from 'react';
import PostHeader from "./PostHeader/PostHeader";
import {Post} from "../../../types/posts";
import ReactMarkdown from "react-markdown";

import s from "./PostDetail.module.css"

const DUMMY_POST = {
    id: 'p1',
    title: 'First Post',
    slug: 'getting-started-with-nextjs',
    image: 'getting-started-nextjs.png',
    date: '2022-02-10',
    content: '# This is a first post'
}

const PostDetail: FC<{ post: Post}> = ({post}) => {
    if (!post) return <p>Post doesn&apos;t exist, please check url</p>

    const {data, content} = post
    const {title, slug, image, date} = data
    const imagePath = `/images/posts/${slug}/${image}`

    return (
        <article className={s.content}>
            <PostHeader title={title} image={imagePath}/>
            <ReactMarkdown>
                {content}
            </ReactMarkdown>
        </article>
    );
};

export default PostDetail;