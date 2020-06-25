import axios from "axios";
import { handleClick } from "./deleteComment";

const commentNumber = document.getElementById("jsCommentNumber");
const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
// const commentAvatar = document.getElementById("jsUserAvatar");

const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

const addComment = (comment, newComment) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const userName = document.createElement("span");
  const leftColumn = document.createElement("div");
  const rightColumn = document.createElement("div");
  const textBox = document.createElement("div");
  const iconBox = document.createElement("div");
  const delBtn = document.createElement("button");
  const img = document.createElement("img");

  li.classList.add("comments");
  leftColumn.classList.add("comments__left-column");
  rightColumn.classList.add("comments__right-column");
  textBox.classList.add("comments__text-box");
  iconBox.classList.add("comments__icon");
  delBtn.classList.add("jsDelBtn");
  userName.classList.add("comments__userName");
  img.classList.add("comments__userAvatar");

  li.appendChild(leftColumn);
  leftColumn.appendChild(img);
  leftColumn.appendChild(userName);

  li.appendChild(rightColumn);
  rightColumn.appendChild(textBox);
  textBox.appendChild(span);
  rightColumn.appendChild(iconBox);
  iconBox.appendChild(delBtn);

  img.setAttribute("src", `/${newComment.creator.avatarUrl}`);
  userName.innerHTML = newComment.creator.name;

  delBtn.innerHTML = "×";
  delBtn.setAttribute("value", newComment._id);
  delBtn.addEventListener("click", handleClick);
  span.innerHTML = comment;
  commentList.prepend(li);
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
  const newComment = response.data;
  if (response.status === 200) {
    addComment(comment, newComment);
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
