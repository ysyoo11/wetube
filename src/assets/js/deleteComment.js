import axios from "axios";
import "./addComment";

const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const delBtn = document.getElementsByClassName("jsDelBtn");

const decreaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

const delComment = (event) => {
  const li = event.target.closest("li");
  li.remove();

  decreaseNumber();
};

export const handleClick = async (event) => {
  const commentId = event.target.value;
  const response = await axios({
    url: `/api/${commentId}/comment-delete`,
    method: "POST",
  });
  if (response.status === 200) {
    delComment(event);
  }
};

export function init() {
  for (let i = 0; i < delBtn.length; i++) {
    delBtn[i].innerHTML = "×";
    delBtn[i].addEventListener("click", handleClick);
  }
}

if (commentList) {
  init();
}
