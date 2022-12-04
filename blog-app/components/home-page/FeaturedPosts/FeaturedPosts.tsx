import React, {FC} from 'react';

import s from "./FeaturedPosts.module.css"
import PostsGrid from "../../posts/PostsGrid/PostsGrid";
import {Post} from "../../../types/posts";

const FeaturedPosts: FC<{posts: [Post] | []}> = ({posts}) => {
    return (
        <section className={s.latest}>
            <h2>Featured Posts</h2>
            <PostsGrid posts={posts} />
        </section>
    );
};

export default FeaturedPosts;