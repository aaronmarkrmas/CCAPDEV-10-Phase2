function previewImage(event) {
    const input = event.target;
    const reader = new FileReader();

    reader.onload = function() {
        const preview = document.getElementById("profile-picture-preview");
        preview.src = reader.result;
    };

    if (input.files && input.files[0]) {
        reader.readAsDataURL(input.files[0]); // Read the selected image as a data URL
    }
}
  
  function updateProfile() {
    const username = document.getElementById("username").value;
    const description = document.getElementById("description").value;
    const profilePicture = document.getElementById("profile-picture-preview").src;
  
    if (!username || !description) {
      alert("Please fill out all fields.");
      return;
    }
  
    // Display updated profile data (in a real app, this would involve saving to a server)
    alert(`Profile updated!\n\nUsername: ${username}\nDescription: ${description}\nProfile Picture Updated.`);
  }
  

  document.getElementById("edit-profile-form").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(this); // Collect form data

    try {
        const response = await fetch(this.action, {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error("Failed to update profile");
        }

        // Redirect to restoProfile.ejs after successful update
        window.location.href = "/restaurant/<%= restaurant.email %>";
    } catch (error) {
        console.error("Error:", error);
        alert("Update failed. Please try again.");
    }
});
