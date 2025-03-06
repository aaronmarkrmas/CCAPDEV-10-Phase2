function updateProfile(photo, name, email, tags, description, rating = 0) {
    document.getElementById("profile-photo").src = photo || "/images/default-pfp.png";
    document.getElementById("user-name").innerText = name;
    document.getElementById("user-email").innerText = email;
    document.getElementById("user-description").innerText = description || "No description available.";
  
    const tagsContainer = document.querySelector(".tags");
    tagsContainer.innerHTML = ""; // Clear existing tags
    if (Array.isArray(tags)) {
      tags.forEach((tag) => {
        const tagElement = document.createElement("span");
        tagElement.classList.add("tag");
        tagElement.innerText = tag;
        tagsContainer.appendChild(tagElement);
      });
    }
  
    displayRating(rating);
  }
  
  function displayRating(rating) {
    const starsContainer = document.getElementById("rating-stars");
    const ratingNumber = document.getElementById("rating-number");
    starsContainer.innerHTML = ""; // Clear existing stars
  
    const roundedRating = Math.floor(rating);
  
    for (let i = 0; i < 5; i++) {
      const star = document.createElement("i");
      star.className = i < roundedRating ? "fa-solid fa-star" : "fa-regular fa-star";
      star.style.color = i < roundedRating ? "#ffcd3c" : "#ccc";
      star.style.fontSize = "24px";
      starsContainer.appendChild(star);
    }
  
    ratingNumber.innerText = ` ${rating.toFixed(1)}`;
  }
  
  function addReviewPost(userPhoto, userName, restaurantName, date, edited, rating, postId, reviewText, media = [], reply) {
    const reviewsContainer = document.getElementById("reviews-container");
  
    const postContainer = document.createElement("div");
    postContainer.classList.add("review-post");
  
    postContainer.innerHTML = `
      <div class="review-post-details">
        <img class="review-user-photo" src="${userPhoto || "/images/default-user.png"}" alt="User Photo">
        <div class="review-info">
          <p class="review-user-name">${userName}</p>
          <p class="review-meta">${restaurantName} | ${date} ${edited ? "| Edited" : ""}</p>
          <div class="review-rating">${"★".repeat(Math.floor(rating))}</div>
        </div>
        ${reply ? `
          <div class="reply-options">
            <i class="fa-solid fa-ellipsis reply-options-icon" data-review-id="${postId}"></i>
            <div class="reply-dropdown hidden" id="dropdown-${postId}">
              <p class="edit-reply-option" onclick="editReply('${postId}')">Edit Reply</p>
              <p class="delete-reply-option" onclick="deleteReply('${postId}')">Delete Reply</p>
            </div>
          </div>
        ` : `<a href="/restaurant/${encodeURIComponent(restaurantName)}/review/${postId}/reply" class="reply-link">Reply</a>`}
      </div>
      <h1 class="review-title">Customer Review</h1>
      <p class="review-text">${reviewText}</p>
      <div class="media-section"></div>
    `;
  
    const mediaSection = postContainer.querySelector(".media-section");
    media.forEach((item) => {
      if (item.endsWith(".mp4")) {
        const video = document.createElement("video");
        video.src = item;
        video.controls = true;
        video.style.width = "100px";
        video.style.height = "100px";
        video.style.objectFit = "cover";
        video.style.borderRadius = "8px";
        mediaSection.appendChild(video);
      } else {
        const img = document.createElement("img");
        img.src = item;
        img.alt = "Media";
        img.style.width = "100px";
        img.style.height = "100px";
        img.style.objectFit = "cover";
        img.style.borderRadius = "8px";
        mediaSection.appendChild(img);
      }
    });
  
    if (reply) {
      const replyContainer = document.createElement("div");
      replyContainer.classList.add("reply-post");
      replyContainer.innerHTML = `
        <div class="review-post-details">
          <div class="reply-header">
            <p class="review-user-name">${reply.restoUserName}</p>
            <p class="review-meta">${new Date(reply.datePosted).toLocaleDateString()} ${reply.isEdited ? "| Edited" : ""}</p>
          </div>
        </div>
        <p class="review-text">${reply.replyText}</p>
      `;
      postContainer.appendChild(replyContainer);
    }
  
    reviewsContainer.appendChild(postContainer);
  }
  
  // Function to toggle the reply options dropdown
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".reply-options-icon").forEach((icon) => {
      icon.addEventListener("click", (event) => {
        const reviewId = event.target.getAttribute("data-review-id");
        const dropdown = document.getElementById(`dropdown-${reviewId}`);
        dropdown.classList.toggle("hidden");
      });
    });
  });
  
  // Function to delete a reply
  function deleteReply(reviewId) {
    fetch(`/restaurant/review/${reviewId}/delete-reply`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        alert("Reply deleted successfully!");
        location.reload();
      })
      .catch((error) => console.error("Error deleting reply:", error));
  }
  
  // Function to edit a reply (redirect to edit page)
  function editReply(reviewId) {
    window.location.href = `/restaurant/review/${reviewId}/edit-reply`;
  }
  