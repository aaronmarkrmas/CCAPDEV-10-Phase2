document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.getElementById("add-btn");
  const deleteBtn = document.getElementById("delete-btn");

  // ADD TAG FUNCTIONALITY
  addBtn.addEventListener("click", async () => {
      const tagInput = document.getElementById("add-tag");
      const tag = tagInput.value.trim();

      if (!tag) {
          alert("Tag cannot be empty!");
          return;
      }

      try {
          const response = await fetch("/admin/tags/add", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ tag }), // Send tag data
          });

          if (response.ok) {
              alert("Tag added successfully!");
              location.reload(); // Refresh page to show new tag
          } else {
              const errorText = await response.text();
              alert("Error: " + errorText);
          }
      } catch (error) {
          console.error("Error adding tag:", error);
      }
  });

  // DELETE TAG FUNCTIONALITY
  deleteBtn.addEventListener("click", async () => {
      const selectedTag = document.getElementById("delete-tag").value;

      if (!selectedTag) {
          alert("Please select a tag to delete.");
          return;
      }

      if (!confirm(`Are you sure you want to delete "${selectedTag}"?`)) return;

      try {
          const response = await fetch("/admin/tags/delete", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ tag: selectedTag }),
          });

          if (response.ok) {
              alert("Tag deleted successfully!");
              location.reload();
          } else {
              const errorText = await response.text();
              alert("Error: " + errorText);
          }
      } catch (error) {
          console.error("Error deleting tag:", error);
      }
  });
});
