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
