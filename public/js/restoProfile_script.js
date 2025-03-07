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


document.addEventListener("DOMContentLoaded", function () {
  // Toggle dropdown when clicking the ellipsis
  document.querySelectorAll(".reply-options-icon").forEach(icon => {
      icon.addEventListener("click", function () {
          const reviewId = this.dataset.reviewId;
          const dropdown = document.getElementById(`dropdown-${reviewId}`);

          // Hide all other dropdowns before showing this one
          document.querySelectorAll(".reply-options-dropdown").forEach(menu => {
              if (menu !== dropdown) menu.style.display = "none";
          });

          // Toggle current dropdown visibility
          dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
      });
  });

  // Hide dropdown when clicking outside
  document.addEventListener("click", function (event) {
      if (!event.target.closest(".ellipsis-container")) {
          document.querySelectorAll(".reply-options-dropdown").forEach(menu => {
              menu.style.display = "none";
          });
      }
  });

  // Handle Delete Reply Click
  document.querySelectorAll(".delete-reply-option").forEach(deleteLink => {
      deleteLink.addEventListener("click", async function (event) {
          event.preventDefault();
          
          const reviewId = this.dataset.reviewId;

          // Confirmation Alert
          const confirmDelete = confirm("Are you sure you want to delete this reply?");
          if (!confirmDelete) return;

          try {
              const response = await fetch(`/delete-reply/${reviewId}`, {
                  method: "DELETE",
              });

              if (response.ok) {
                  alert("Reply deleted successfully!");
                  location.reload(); // Refresh page after deletion
              } else {
                  alert("Failed to delete reply. Please try again.");
              }
          } catch (error) {
              console.error("Error deleting reply:", error);
              alert("An error occurred. Please try again.");
          }
      });
  });
});
