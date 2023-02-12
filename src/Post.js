import React, { useState, useEffect } from "react";
import "./Post.css";
import { Avatar } from "@mui/material";
import {
  addDoc,
  collection,
  doc,
  increment,
  onSnapshot,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";
import { db } from "./firebase";
import { getAuth } from "firebase/auth";

const Post = ({ postId, user, username, imageUrl, caption }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = onSnapshot(
        collection(db, "posts", postId, "comments"),
        (snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        }
      );
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (event) => {
    event.preventDefault();
    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user.uid;
    const username = user.displayName;
    const timestamp = serverTimestamp();

    addDoc(collection(db, "posts", postId, "comments"), {
      text: comment,
      username: user.displayName,
      timestamp: timestamp,
    });
    setComment("");
  };

  return (
    <div className="post">
      <div className="post__header">
        <Avatar className="post__avatar" src={imageUrl} alt={username} />
        <h3>{username}</h3>
      </div>
      <img className="post__image" src={imageUrl} alt="" />
      <h4 className="post__text">
        <strong>{username}</strong> {caption}
      </h4>

      {user && (
        <form className="post__commentBox">
          <input
            type="text"
            className="post__input"
            placeholder="add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="post__button"
            type="submit"
            onClick={postComment}
            disabled={!comment}
          >
            Post
          </button>
        </form>
      )}
      <div className="post__comments">
        {comments.map((comment) => (
          <p>
            <strong>{comment.username}</strong> {comment.text}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Post;
