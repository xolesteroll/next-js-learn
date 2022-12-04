import React, {FC} from 'react';
import PostHeader from "./PostHeader/PostHeader";
import {Post} from "../../../types/posts";

const PostDetail: FC<{post: Post}> = ({post}) => {
    const {title, slug, excerpt, image, date} = post
    const imagePath = `/images/post/${slug}/${image}`

    return (
        <article>
            <PostHeader title={title} image={imagePath}/>
        </article>
    );
};

export default PostDetail;