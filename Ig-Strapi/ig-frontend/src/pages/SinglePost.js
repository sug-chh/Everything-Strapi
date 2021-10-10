import axios from "axios";
import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { Post } from "../components/Post";
import { UserContext } from "../context/UserContext";
import { LikesContext } from "../context/LikesContext";
import { API_URL } from "../utils/api_url";

function SinglePost({ match, history }) {
  const id = match.params.id;
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [description, setDescription] = useState("");
  const { user } = useContext(UserContext);
  const { likesGiven, reloader } = useContext(LikesContext);
  const isPostAlreadyLiked = () => {
    return (
      likesGiven &&
      likesGiven.find((like) => like.post && like.post.id === Number(id))
    );
  };

  console.log("like_to_this_post_by_john", isPostAlreadyLiked());

  const getPost = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_URL}/posts/${id}`);
      setPost(data);
      setLoading(false);
    } catch (e) {
      console.log(e.response);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    console.log(id);
    const { data } = await axios.delete(`${API_URL}/posts/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.jwt}`,
      },
    });
    console.log(data);
    history.push("/");
  };

  const handleEditSubmit = async (e, id) => {
    e.preventDefault();
    const { data } = await axios.put(
      `${API_URL}/posts/${id}`,
      {
        description,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.jwt}`,
        },
      }
    );
    console.log(data);
    setEdit(false);
    getPost();
  };

  const handleLike = async (e, postId) => {
    e.preventDefault();

    const { data } = await axios.post(
      `${API_URL}/likes`,
      {
        post: Number(postId),
      },
      {
        headers: {
          Authorization: `Bearer ${user.jwt}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(data);
    getPost();
    reloader()
  };

  const removeLike = async (e, id) => {
    e.preventDefault();
    try {
      const { data } = await axios.delete(`${API_URL}/likes/${id}`, {
        headers: {
          Authorization: `Bearer ${user.jwt}`,
        },
      });
      getPost();
      console.log(data);
      reloader()
    } catch (e) {
      console.log(e.response);
    }
  };

  useEffect(() => {
    getPost();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {loading ? (
        <p>Loading....</p>
      ) : (
        <>
          {post.id ? (
            <>
              <Post key={post.id} post={post} />
              {user && (
                <>
                  <button onClick={() => handleDelete(post.id)}>Delete</button>
                  <button onClick={() => setEdit(!edit)}>Edit this post</button>
                  {!isPostAlreadyLiked() ? (
                    <button onClick={(e) => handleLike(e, post.id)}>
                      Like
                    </button>
                  ) : (
                    <button onClick={(e) => removeLike(e, post.id)}>
                      Remove Like
                    </button>
                  )}

                  {edit && (
                    <form onSubmit={(e) => handleEditSubmit(e, post.id)}>
                      <input
                        type="description"
                        value={description}
                        placeholder={"New Description"}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                      <button>Confirm</button>
                    </form>
                  )}
                </>
              )}
            </>
          ) : (
            <div
              style={{
                fontSize: "20px",
                textAlign: "center",
                display: "block",
                margin: "50px auto",
              }}
            >
              404 the Page doesn't seem to exist!
            </div>
          )}
        </>
      )}
    </>
  );
}

export default SinglePost;
