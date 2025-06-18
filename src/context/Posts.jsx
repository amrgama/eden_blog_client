import { createContext, useContext, useState, useEffect } from "react";
import { getPostsByQuery } from "../features/posts/postsServices";

const PostsContext = createContext();

export const PostsContextProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const postsData = await getPostsByQuery({author: "6825c9bcd1afbd4c0ea13e68", limit: 20, skip: 0});
            if (postsData?.posts) {
                setPosts(postsData.posts);
                window.localStorage.setItem("posts", JSON.stringify(postsData.posts));
            }
            setLoading(false);
        } catch (err) {
            console.log("err", err);
            setError(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <PostsContext.Provider value={{ posts, loading, error, fetchPosts }}>
            {children}
        </PostsContext.Provider>
    );
};

export const usePosts = () => useContext(PostsContext);

export default PostsContext;