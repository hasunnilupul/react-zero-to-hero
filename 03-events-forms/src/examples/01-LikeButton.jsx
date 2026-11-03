import { useState } from "react";

// Stand-in for a real API call.
function reportPost(postId) {
  console.log(`Reported post ${postId}`);
}

export function LikeButton({ postId }) {
  const [likes, setLikes] = useState(0);

  function handleClick(event) {
    console.log(event.type); // "click"
    console.log(event.currentTarget); // the <button> element
    setLikes((n) => n + 1);
  }

  return (
    <>
      {/* ✅ pass the function itself */}
      <button type="button" onClick={handleClick}>
        👍 {likes}
      </button>

      {/* ✅ need an argument? wrap it in an arrow function */}
      <button type="button" onClick={() => reportPost(postId)}>
        Report
      </button>

      {/* ❌ this CALLS reportPost on every render */}
      {/* <button onClick={reportPost(postId)}>Report</button> */}
    </>
  );
}

export default function LikeButtonDemo() {
  return (
    <div className="stack">
      <h2>Handling events</h2>
      <p>
        Click the buttons and watch the console. The like button logs the synthetic event; the
        report button passes an argument through an arrow function.
      </p>
      <div className="row">
        <LikeButton postId={42} />
      </div>
    </div>
  );
}
