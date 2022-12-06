import fs from "fs"
import path from "path"
import matter from "gray-matter"

const postsDirectoryPath = path.join(process.cwd(), "data", "posts")

export const getPostsFiles = () => {
    return fs.readdirSync(postsDirectoryPath)
}

export const getPostData = (postIdentifier: string) => {
    const postSlug = postIdentifier.replace(/\.md$/, '')
    console.log(postSlug)
    const filePath = path.join(postsDirectoryPath, `${postSlug}.md`)
    const fileContent = fs.readFileSync(filePath, 'utf-8')

    const {data, content} = matter(fileContent)

    const postData = {
        data: {...data, slug: postSlug},
        content
    }

    return postData
}

export const getAllPosts = () => {
    const postsFiles = getPostsFiles()
    const allPostsData = postsFiles.map(pf => getPostData(pf))
    const postDataByLatest = allPostsData.sort((postA, postB) => {
        // @ts-ignore
        return postA.data.date > postB.data.date ? -1 : 1
    })

    return postDataByLatest
}

export const getFeaturedPosts = () => {
    const posts = getAllPosts()
    // @ts-ignore
    const featuredPosts = posts.filter(p => p.data.isFeatured)

    return featuredPosts
}

export const getPostBySlug = (slug: string) => {
    const postsData = getAllPosts()
    const foundPost = postsData.find(p => p.data.slug === slug)

    return foundPost
}