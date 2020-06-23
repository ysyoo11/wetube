import axios from "axios";
import { handleClick } from "./deleteComment";

const commentNumber = document.getElementById("jsCommentNumber");
const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");

const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

const addComment = (comment, commentId) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const btn = document.createElement("button");
  span.innerHTML = comment;
  btn.innerHTML = "×";
  btn.setAttribute("value", commentId);
  li.appendChild(span);
  span.appendChild(btn);
  commentList.prepend(li);
  btn.addEventListener("click", handleClick);
  increaseNumber();
};

const sendComment = async (comment) => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: "POST",
    data: {
      comment,
      // 이것은 comment라는 body에 들어갈 것이다. (참고 videoController Add Comment 부분)
    },
  });
  const commentId = response.data._id;
  if (response.status === 200) {
    addComment(comment, commentId);
  }
};

const handleSubmit = (event) => {
  // 새로고침 되길 원하지 않기 때문에 preventDefault
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};

function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
}

if (addCommentForm) {
  init();
}
