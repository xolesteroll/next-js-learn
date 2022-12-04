import React, {FC} from 'react';
import Link from "next/link";
import Image from "next/legacy/image";
import {Post} from "../../../types/posts";

import s from "./PostItem.module.css"

const PostItem: FC<{post: Post}> = ({post}) => {
    const {title, image, excerpt, date, slug} = post
    const imagePath = `/images/posts/${slug}/${image}`
    const postPath = `/posts/${slug}`
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })

    return (
        <li className={s.post}>
            <Link href={postPath}>
                <div className={s.image}>
                    <Image src={imagePath} alt={title} width={300} height={200} layout="responsive"/>
                </div>
                <div className={s.content}>
                    <h3>{title}</h3>
                    <time>{formattedDate}</time>
                    <p>{excerpt}</p>
                </div>
            </Link>
        </li>

    );
};

export default PostItem;