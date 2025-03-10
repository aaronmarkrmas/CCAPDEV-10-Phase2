

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

// <script>

// document.addEventListener("DOMContentLoaded", function() {
//     displayRating(<%= restaurant.rating %>);

//     const restaurantId = "<%= restaurant._id %>"; 
//     const customerEmail = "<%=loggedUserEmail %>"; // Get user email if logged in

//     // Add star rating click event
//     document.querySelectorAll(".star").forEach(star => {
//         star.addEventListener("click", function() {
//             const rating = this.getAttribute("data-value");
//             document.getElementById("ratingValue").value = rating;

//             // Highlight selected stars
//             document.querySelectorAll(".star").forEach(s => {
//                 s.style.color = s.getAttribute("data-value") <= rating ? "#FFD700" : "#ccc";
//             });
//         });
//     });

//     // Handle review form submission
//     document.getElementById("reviewForm").addEventListener("submit", async function(event) {
//         event.preventDefault(); // Prevent default form submission

//         const files = document.getElementById("media").files;
//         const base64Images = await Promise.all([...files].map(file => toBase64(file)));

//         const reviewData = {
//             title: document.getElementById("title").value,
//             review: document.getElementById("review").value,
//             rating: document.getElementById("ratingValue").value,
//             customerEmail: "<%= loggedUserEmail %>",
//             restaurantId: "<%= restaurant._id %>",
//             media: base64Images
//         };

//         const response = await fetch(`/${encodeURIComponent(customerEmail)}/profile/${restaurantId}/write`, {
// method: "POST",
// headers: {
//     "Content-Type": "application/json"
// },
// body: JSON.stringify(reviewData)
// });

//         const data = await response.json();
//         if (response.ok) {
//             alert("Review submitted successfully!");
//             location.reload();
//         } else {
//             alert("Error submitting review: " + data.error);
//         }
//     });

//  function toBase64(file) {
//   return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload = () => resolve(reader.result);
//         reader.onerror = error => reject(error);
//     });
// }

// document.getElementById("media").addEventListener("change", function (event) {
// const previewContainer = document.getElementById("mediaPreview");
// previewContainer.innerHTML = ""; // Clear previous previews

// const files = Array.from(event.target.files); // Get selected files

// if (files.length > 0) {
//     files.forEach((file, index) => {
//         const fileURL = URL.createObjectURL(file);
//         const previewWrapper = document.createElement("div");
//         previewWrapper.classList.add("preview-wrapper");

//         const previewElement = document.createElement(file.type.startsWith("video") ? "video" : "img");
//         previewElement.src = fileURL;
//         previewElement.classList.add("preview-item");

//         if (file.type.startsWith("video")) {
//             previewElement.controls = true; // Add controls for videos
//         }

//         // Create Remove Button
//         const removeButton = document.createElement("button");
//         removeButton.innerHTML = "❌";
//         removeButton.classList.add("remove-btn");
//         removeButton.addEventListener("click", () => {
//           document.getElementById("media").value = ""; 
//             previewWrapper.remove(); // Remove preview on click
           
//         });

//         // Append elements
//         previewWrapper.appendChild(previewElement);
//         previewWrapper.appendChild(removeButton);
//         previewContainer.appendChild(previewWrapper);
//     });
// }
// });

// });
// </script>
