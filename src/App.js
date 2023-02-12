import "./App.css";
import Post from "./Post";
import { useState, useEffect } from "react";
import { db } from "./firebase";
import { onSnapshot, orderBy } from "firebase/firestore";
import { collection } from "firebase/firestore";
import Modal from "@mui/material/Modal";
import { Button, Input } from "@mui/material";
import { Box } from "@mui/system";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import ImageUpload from "./ImageUpload";
import InstagramEmbed from "react-instagram-embed";

function App() {
  const [posts, setPosts] = useState([
    // {
    //   imageUrl:
    //     "https://as2.ftcdn.net/v2/jpg/03/20/45/95/1000_F_320459521_BeH9lOrFRWkapRbqNByK5nJGZvBKy1K0.jpg",
    //   username: "aman_chandra199",
    //   caption: "Cbum Back Workout 🔥🥵",
    // },
    // {
    //   imageUrl:
    //     "https://images.freeimages.com/images/large-previews/3b2/prague-conference-center-1056491.jpg",
    //   username: "prajapati_kumar_vivek",
    //   caption: "Mujhe 5 min fridge dhudne me lg gya",
    // },
    // {
    //   imageUrl:
    //     "https://media.istockphoto.com/id/1341604942/photo/happy-beautiful-children-boys-playing-on-stone-staircase-in-old-french-town-taking-pictures.jpg?s=2048x2048&w=is&k=20&c=CzjyScYo9xxs2Asus4ScsWNBXG7u-nbEK3HE6EOdt4o=",
    //   username: "harshit_shukla",
    //   caption: "At 5 A.M. me and you",
    // },
    // {
    //   imageUrl:
    //     "https://pikwizard.com/photos/business-money-cash--d1337b20c2719bc52bae258e8577749c-m.jpg",
    //   username: "vishnu_7i_patel",
    //   caption: "Books and library",
    // },
  ]);

  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    onSnapshot(
      collection(db, "posts"),
      orderBy("timestamp", "desc"),
      (snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      }
    );
  }, []);
  // console.log(posts);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        console.log(user);
        setUser(user);
        updateProfile(auth.currentUser, {
          displayName: username,
        });
        const uid = user.uid;
      } else {
        // User is signed out
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user, username]);

  const logout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };
  const signUp = (event) => {
    event.preventDefault();
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        // ..
      });
    // setUsername("");
    // setEmail("");
    // setPassword("");
    setOpen(false);
  };

  const signIn = (e) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
    setOpenSignIn(false);
  };
  return (
    <div className="app">
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 700,
            bgcolor: "#D8D9CF",
            boxShadow: 24,
            p: 4,
            borderRadius: "10px",
          }}
        >
          <form className="app__signup">
            <center>
              <img
                className="app__headerImage"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEdwcSBVv9WuDbaP65gdw9ifwapkxK-b2G_Q&usqp=CAU"
                alt=""
              />
            </center>
            <Input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" onClick={signUp}>
              Sign Up
            </Button>
          </form>
        </Box>
      </Modal>

      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 700,
            bgcolor: "#D8D9CF",
            boxShadow: 24,
            p: 4,
            borderRadius: "10px",
          }}
        >
          <form className="app__signup">
            <center>
              <img
                className="app__headerImage"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEdwcSBVv9WuDbaP65gdw9ifwapkxK-b2G_Q&usqp=CAU"
                alt=""
              />
            </center>
            <Input
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" onClick={signIn}>
              Sign In
            </Button>
          </form>
        </Box>
      </Modal>
      <div className="app__header">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEdwcSBVv9WuDbaP65gdw9ifwapkxK-b2G_Q&usqp=CAU"
          alt=""
          className="app__headerImage"
        />
        {user ? (
          <Button onClick={logout}>Logout</Button>
        ) : (
          <div className="app__loginContainer">
            <Button onClick={() => setOpen(true)}>Sign Up</Button>
            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
          </div>
        )}
      </div>

      <div className="app__posts">
        <div className="app__postsLeft">
          {posts.map(({ id, post }) => (
            <Post
              key={id}
              postId={id}
              user={user}
              username={post.username}
              imageUrl={post.imageUrl}
              caption={post.caption}
            />
          ))}
        </div>
        <div className="app__postsRight">
          <InstagramEmbed
            url="https://instagr.am/p/Zw9o4/"
            clientAccessToken="123|456"
            maxWidth={320}
            hideCaption={false}
            containerTagName="div"
            protocol=""
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          />
        </div>
      </div>

      {user ? (
        <ImageUpload username={user.displayName} />
      ) : (
        <h3>Sorry! You need to Login to upload.</h3>
      )}
    </div>
  );
}

export default App;
