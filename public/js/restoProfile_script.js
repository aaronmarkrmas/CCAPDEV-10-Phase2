
    
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
    
    // Example usage of the addReviewPost function with replies
    addReviewPost(
      'images/user1_pfp.png',
      'John Doe',
      'Sandwich Corner',
      '2025-01-26',
      false,
      4,
      '"Great experience, will come again!"',
      1,
      "I tried the Grilled Chicken Pesto Sandwich, and it was absolutely amazing! The bread was perfectly toasted, with a golden crunch on the outside and a soft, fluffy inside. The chicken was tender and well-seasoned, and the pesto added a fresh, herby flavor that tied everything together beautifully. The portion size was just right, and the sandwich came with a side of crispy potato chips, which was a nice touch.",
      [
        { type: 'img', src: 'images/food1.png', alt: 'Sandwich Image 1' },
        { type: 'img', src: 'images/food2.png', alt: 'Sandwich Image 2' },
        { type: 'img', src: 'images/food3.png', alt: 'Chips Image' },
        { type: 'video', src: 'images/food4.mp4', alt: 'Review Video' },
      ],
      [
        {
          restoUser: 'images/pfp.png',
          restoUserName: 'Sandwich Corner',
          replyDatePosted: '2025-01-28',
          replyEdited: false,
          replyText: 'We appreciate your review!',
        },
      ]
    );
    
    addReviewPost('images/user2_pfp.png', 'Dawg Snoop', 'Sandwich Corner', '2025-01-25', true, 5, '"Absolutely amazing burgers!"', 2, "I tried the Grilled Chicken Pesto Sandwich, and it was absolutely amazing! The bread was perfectly toasted, with a golden crunch on the outside and a soft, fluffy inside.The chicken was tender and well-seasoned, and the pesto added a fresh, herby flavor that tied everything together beautifully. The portion size was just right, and the sandwich came with a side of crispy potato chips, which was a nice touch.",
      [
          { type: 'img', src: 'images/food1.png', alt: 'Sandwich Image 1' },
          { type: 'img', src: 'images/food2.png', alt: 'Sandwich Image 2' },
          { type: 'img', src: 'images/food3.png', alt: 'Chips Image' },
          { type: 'video', src: 'images/food4.mp4', alt: 'Review Video' },
      ]
    );
    addReviewPost('images/user3_pfp.png', 'Jane Smith', 'Sandwich Corner', '2025-01-25', true, 3, '"Very delicious fries!"', 3,  "I tried the Grilled Chicken Pesto Sandwich, and it was absolutely amazing! The bread was perfectly toasted, with a golden crunch on the outside and a soft, fluffy inside.The chicken was tender and well-seasoned, and the pesto added a fresh, herby flavor that tied everything together beautifully. The portion size was just right, and the sandwich came with a side of crispy potato chips, which was a nice touch.",
      [
          { type: 'img', src: 'images/food1.png', alt: 'Sandwich Image 1' },
          { type: 'img', src: 'images/food2.png', alt: 'Sandwich Image 2' },
          { type: 'img', src: 'images/food3.png', alt: 'Chips Image' },
          { type: 'video', src: 'images/food4.mp4', alt: 'Review Video' },
      ]
    );
    
    
    addReviewPost(
      'images/user5_pfp.png',
      'Jane Smith',
      'Pasta Haven',
      '2025-01-27',
      true,
      5,
      '"Best pasta Ive ever had!"',
      3,
      "I ordered the Truffle Mushroom Fettuccine, and it was phenomenal! The pasta was cooked to perfection, and the truffle sauce was rich and creamy without being overwhelming. The mushrooms were fresh and added a wonderful earthy taste. The portion size was generous, and the garlic bread on the side was a perfect complement. Definitely a must-try!",
      [
        { type: 'img', src: 'images/pasta1.png', alt: 'Truffle Mushroom Fettuccine' },
        { type: 'img', src: 'images/pasta2.png', alt: 'Garlic Bread' },
        { type: 'video', src: 'images/pasta3.mp4', alt: 'Pasta Review Video' },
      ],
      [
        {
          restoUser: 'images/pfp.png',
          restoUserName: 'Sandwich Corner',
          replyDatePosted: '2025-01-29',
          replyEdited: false,
          replyText: 'Thank you for your kind words! We hope to see you again soon!',
        },
      ]
    );
    
    addReviewPost(
      'images/user4_pfp.png',
      'Michael Lee',
      'Burger Bros',
      '2025-01-28',
      false,
      3,
      '"Decent burger, but nothing special."',
      2,
      "Tried the Double Cheese Smash Burger. The patty was juicy, but I felt the seasoning was lacking. The bun was soft, but a bit too greasy for my liking. The fries were crispy and well-seasoned, which was the highlight of my meal. Overall, it was an okay experience, but I’ve had better burgers elsewhere.",
      [
        { type: 'img', src: 'images/burger1.png', alt: 'Double Cheese Smash Burger' },
        { type: 'img', src: 'images/fries.png', alt: 'Crispy Fries' },
      ],
      [
        {
          restoUser: 'images/pfp.png',
          restoUserName: 'Sandwich Corner',
          replyDatePosted: '2025-01-30',
          replyEdited: false,
          replyText: 'Thanks for the feedback! Well work on improving our flavors!',
        },
      ]
    );
    