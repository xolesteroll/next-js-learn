import React, {FC, ReactNode} from 'react';
import PostHeader from "./PostHeader/PostHeader";
import {Post} from "../../../types/posts";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
// @ts-ignore
import atomDark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark"
// @ts-ignore
import {PrismLight as SyntaxHighlighter} from "react-syntax-highlighter"
// @ts-ignore
import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript"

import s from "./PostDetail.module.css"

SyntaxHighlighter.registerLanguage('js', js)

const PostDetail: FC<{ post: Post}> = ({post}) => {
    if (!post) return <p>Post doesn&apos;t exist, please check url</p>

    const {data, content} = post
    const {title, slug, image, date} = data
    const imagePath = `/images/posts/${slug}/${image}`

    const customComponents = {
        // img(image) {
        //   console.log('image', image.src)
        //   return (
        //     < Image
        //       src={`/images/posts/${post.slug}/${image.src}`}
        //       alt={image.alt}
        //       width={600}
        //       height={300}
        //     />
        //   );
        // },
        p(paragraph: any) {
            const { node } = paragraph;
            if (node.children[0].tagName === 'img') {
                const image = node.children[0];
                return (
                    <div className={s.image}>
                        < Image
                            src={`/images/posts/${slug}/${image.properties.src}`}
                            alt={image.alt}
                            width={600}
                            height={300}
                        />
                    </div>
                );
            }
            return <p>{paragraph.children}</p>;
        },
        code(code: any) {
            const {className, children} = code
            // const language = className.split('-')[1]
            return <SyntaxHighlighter style={atomDark}>
                {children[0]}
            </SyntaxHighlighter>
        }
    }

    return (
        <article className={s.content}>
            <PostHeader title={title} image={imagePath}/>
            <ReactMarkdown components={customComponents}>
                {content}
            </ReactMarkdown>
        </article>
    );
};

export default PostDetail;