const API_URL = "http://127.0.0.1:8000";

document.getElementById("commentForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const comments = document.getElementById("comments").value;

    const response = await fetch(`${API_URL}/add_comment/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, comments }),
    });

    if (response.ok) {
        alert("Comment added successfully!");
        document.getElementById("commentForm").reset();
        loadComments();
    } else {
        alert("Error adding comment. Try again.");
    }
});

async function loadComments() {
    const response = await fetch(`${API_URL}/all_comments/`);
    const comments = await response.json();
    const commentList = document.getElementById("commentList");
    commentList.innerHTML = "";

    Object.entries(comments).forEach(([id, comment]) => {
        const li = document.createElement("li");
        li.textContent = `${comment.username} (${comment.email}): ${comment.comments}`;
        commentList.appendChild(li);
    });
}

// Load comments on page load 
//load
document.addEventListener("DOMContentLoaded", loadComments);

