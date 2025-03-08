document.addEventListener("DOMContentLoaded", async function () {
    const reviewsList = document.getElementById("reviews-list");
    const ratingStars = document.getElementById("rating-stars");
    const ratingNumber = document.getElementById("rating-number");
    const profilePhoto = document.getElementById("profile-photo");
    const editPfpButton = document.querySelector(".editpfp-button");

    // Get restaurant name from EJS-rendered data
    const restoName = document.getElementById("user-name").textContent.trim();

    // Fetch restaurant details from MongoDB
    /*async function fetchRestaurantData() {
        try {
            const response = await fetch(`/api/restaurants/${encodeURIComponent(restoName)}`);
            const data = await response.json();

            if (data) {
                updateReviews(data.reviews);
                updateRating(data.rating);
            }
        } catch (error) {
            console.error("Error fetching restaurant data:", error);
        }
    }*/
        async function fetchRestaurantData() {
            try {
                const response = await fetch(`/api/restaurants/${encodeURIComponent(restoName)}`);
                const data = await response.json();
        
                if (data && data.reviews && data.reviews.length > 0) {
                    updateReviews(data.reviews);
                    updateRating(data.rating);
                } else {
                    console.warn("No reviews found. Using sample reviews.");
        
                    const sampleReviews = [
                        {
                            customerName: "John Doe",
                            customerPfp: "/images/default-user.png",
                            date: new Date().toISOString(),
                            text: "Amazing food! The best experience I've had in a while.",
                            rating: 5
                        },
                        {
                            customerName: "Jane Smith",
                            customerPfp: "/images/default-user.png",
                            date: new Date().toISOString(),
                            text: "Good ambiance but the service was a bit slow.",
                            rating: 4
                        },
                        {
                            customerName: "Alex Johnson",
                            customerPfp: "/images/default-user.png",
                            date: new Date().toISOString(),
                            text: "Decent experience. Would come back again!",
                            rating: 3.5
                        }
                    ];
                    
                    updateReviews(sampleReviews);
                    updateRating(4.2);
                }
            } catch (error) {
                console.error("Error fetching restaurant data:", error);
            }
        }
        

    // Update Reviews Section
    /*function updateReviews(reviews) {
        reviewsList.innerHTML = ""; // Clear old reviews
        if (!reviews || reviews.length === 0) {
            reviewsList.innerHTML = "<p>No reviews yet.</p>";
            return;
        }

        reviews.forEach(review => {
            const reviewItem = document.createElement("div");
            reviewItem.classList.add("review-item");
            reviewItem.innerHTML = `
                <div class="review-header">
                    <img src="${review.customerPfp || '/images/default-user.png'}" class="reviewer-pfp" alt="Reviewer">
                    <h4>${review.customerName}</h4>
                    <span class="review-date">${new Date(review.date).toLocaleDateString()}</span>
                </div>
                <p class="review-text">${review.text}</p>
                <div class="review-rating">${generateStarRating(review.rating)}</div>
            `;
            reviewsList.appendChild(reviewItem);
        });
    }*/
        function updateReviews(reviews) {
            console.log("updateReviews called with:", reviews); // Debugging log
            reviewsList.innerHTML = ""; // Clear old reviews
        
            if (!reviews || reviews.length === 0) {
                console.warn("No reviews to display.");
                reviewsList.innerHTML = "<p>No reviews yet.</p>";
                return;
            }
        
            reviews.forEach(review => {
                const reviewItem = document.createElement("div");
                reviewItem.classList.add("review-item");
                reviewItem.innerHTML = `
                    <div class="review-header">
                        <img src="${review.customerPfp || '/images/default-user.png'}" class="reviewer-pfp" alt="Reviewer">
                        <h4>${review.customerName}</h4>
                        <span class="review-date">${new Date(review.date).toLocaleDateString()}</span>
                    </div>
                    <p class="review-text">${review.text}</p>
                    <div class="review-rating">${generateStarRating(review.rating)}</div>
                `;
                reviewsList.appendChild(reviewItem);
            });
        }
        
         
        

    // Generate Star Rating and Insert into UI
    function generateStarRating(rating) {
        let starsHTML = "";
        for (let i = 1; i <= 5; i++) {
            if (rating >= i) {
                starsHTML += `<i class="fa-solid fa-star" style="color: #FFD43B;"></i>`; // Full star
            } else if (rating > i - 1) {
                starsHTML += `<i class="fa-regular fa-star-half-stroke" style="color: #FFD43B;"></i>`; // Half star
            } else {
                starsHTML += `<i class="fa-light fa-star" style="color: #FFD43B;"></i>`; // Empty star
            }
        }
        return starsHTML;
    }

    // Update Rating Display
    function updateRating(rating) {
        if (!rating || isNaN(rating)) rating = 0;
        ratingStars.innerHTML = generateStarRating(rating);
        ratingNumber.textContent = rating.toFixed(1);
    }

    // Ensure Stars Load on Page Load
    if (ratingNumber) {
        updateRating(parseFloat(ratingNumber.innerText));
    }

    // Handle Profile Picture Update
    document.addEventListener("DOMContentLoaded", () => {
        const editProfileBtn = document.querySelector(".editpfp-button");
        
        if (editProfileBtn) {
            editProfileBtn.addEventListener("click", () => {
                const restoName = encodeURIComponent("<%= restaurant.restoName %>"); 
                window.location.href = `/restaurant/edit-profile?name=${restoName}`;
            });
        }
    });
    

    fetchRestaurantData();
});
