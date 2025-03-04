function displayRating(rating) {
      const starsContainer = document.getElementById('rating-stars');
      const ratingNumber = document.getElementById('rating-number');
      starsContainer.innerHTML = ''; // Clear existing stars
    
      // Round down to the nearest integer
      const roundedRating = Math.floor(rating);
    
      // Add filled stars
      for (let i = 0; i < roundedRating; i++) {
        const star = document.createElement('i');
        star.className = 'fa-solid fa-star';
        star.style.color = '#ffcd3c';
        star.style.fontSize = '24px';
        starsContainer.appendChild(star);
      }
    
      // Add empty stars
      for (let i = roundedRating; i < 5; i++) {
        const star = document.createElement('i');
        star.className = 'fa-regular fa-star';
        star.style.color = '#ccc';
        star.style.fontSize = '24px';
        starsContainer.appendChild(star);
      }
    
      // Display the rating number next to stars
      ratingNumber.innerText = ` ${rating.toFixed(1)}`; // Format to 1 decimal place
    }

    function redirectToEditProfile() {
    const email = "<%= encodeURIComponent(restaurant._id) %>"; // Ensure email is correctly encoded
    window.location.href = `/restaurant/${email}/updateProfile`;
    }
    
    function addReviewPost(
      userPhoto,
      userName,
      restaurantName,
      date,
      edited,
      rating,
      title,
      postId,
      reviewText,
      media = [],
      replyData = []
    ) {
      const reviewsContainer = document.getElementById('reviews-container');
    
      const postContainer = document.createElement('div');
      postContainer.classList.add('review-post');
    
      if(replyData != "") {
        postContainer.innerHTML = `
            <div class="review-post-details">
              <img class="review-user-photo" src="${userPhoto}" alt="User Photo">
              <div class="review-info">
                <p class="review-user-name">${userName}</p>
                <p class="review-meta">${restaurantName} | ${date} ${edited ? '| Edited' : ''}</p>
                <div class="review-rating">${'★'.repeat(Math.floor(rating))}</div>
              </div>
            </div>
            <h1 class="review-title">${title}</h1>
            <p class="review-text">${reviewText}</p>
            <div class="media-section"></div> <!-- Media Section -->
            <div class="reply-container">
                <div class="replies"></div>
            </div>
        `;
      }
      else {
        postContainer.innerHTML = `
          <div class="review-post-details">
            <img class="review-user-photo" src="${userPhoto}" alt="User Photo">
            <div class="review-info">
              <p class="review-user-name">${userName}</p>
              <p class="review-meta">${restaurantName} | ${date} ${edited ? '| Edited' : ''}</p>
              <div class="review-rating">${'★'.repeat(Math.floor(rating))}</div>
            </div>
          </div>
          <h1 class="review-title">${title}</h1>
          <p class="review-text">${reviewText}</p>
          <div class="media-section"></div> <!-- Media Section -->
          <div class="reply-container">
              <a href="resto_reply.html" class="reply-link">Reply</a>
              <div class="replies"></div>
          </div>
      `;
      }
    
      // Add media (photos/videos)
      const mediaSection = postContainer.querySelector('.media-section');
      media.forEach((item) => {
        if (item.type === 'img') {
          const anchor = document.createElement('a');
          anchor.href = item.src;
          anchor.target = '_blank';
          anchor.rel = 'noopener noreferrer';
    
          const img = document.createElement('img');
          img.src = item.src;
          img.alt = item.alt || 'Media';
          img.style.width = '100px';
          img.style.height = '100px';
          img.style.objectFit = 'cover';
          img.style.borderRadius = '8px';
          anchor.appendChild(img);
    
          mediaSection.appendChild(anchor);
        } else if (item.type === 'video') {
          const video = document.createElement('video');
          video.src = item.src;
          video.controls = true;
          video.style.width = '100px';
          video.style.height = '100px';
          video.style.objectFit = 'cover';
          video.style.borderRadius = '8px';
          mediaSection.appendChild(video);
        }
      });
    
      // Add replies
      const repliesContainer = postContainer.querySelector('.replies');
      replyData.forEach((reply, index) => {
        const replyContainer = document.createElement('div');
        replyContainer.classList.add('reply-post');
    
        replyContainer.innerHTML = `
          <div class="review-post-details">
            <div class="reply-header">
              <img class="review-user-photo" src="${reply.restoUser}" alt="User Photo">
              <div class="review-info">
                <p class="review-user-name">${reply.restoUserName}</p>
                <p class="review-meta">${reply.replyDatePosted} ${
                  reply.replyEdited ? '| Edited' : ''
                }</p>
              </div>
              <i class="fa-solid fa-ellipsis reply-options-icon" data-reply-id="${index}"></i>
            </div>
          </div>
          <p class="review-text">${reply.replyText}</p>
        `;
    
        // Add click listener for edit functionality
        const optionsIcon = replyContainer.querySelector('.reply-options-icon');
        optionsIcon.addEventListener('click', () => {
          alert(`Edit reply with ID: ${index}`); // Replace with actual edit logic
        });
    
        repliesContainer.appendChild(replyContainer);
      });
    
      reviewsContainer.appendChild(postContainer);
    }

document.addEventListener("DOMContentLoaded", async function () {
    const restaurantId = "<%= restaurant.email %>"; // ✅ Use unencoded email

    try {
        const response = await fetch(`/reviews/${restaurantId}`);
        if (!response.ok) throw new Error("Failed to fetch reviews");

        const reviews = await response.json();
        console.log("Fetched Reviews:", reviews);

        if (!reviews.length) {
            document.getElementById("reviews-container").innerHTML = "<p>No reviews yet.</p>";
            return;
        }

        const reviewsList = document.getElementById("reviews-list");
        reviewsList.innerHTML = ""; // Clear existing reviews

        reviews.forEach(review => {
            addReviewPost(
                "/images/default-user.png", // Default profile pic
                review.customerName,
                "Restaurant Name",
                new Date(review.datePosted).toLocaleDateString(),
                review.edited || false,
                review.rating,
                review.reviewText,
                review._id
            );
        });
    } catch (error) {
        console.error("Error loading reviews:", error);
    }
});
