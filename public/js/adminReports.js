document.addEventListener("DOMContentLoaded", () => {
  const tableView = document.getElementById("table-view");
  const detailsView = document.getElementById("details-view");

  const tableButton = document.getElementById("view-table");
  const detailsButton = document.getElementById("view-details");

  tableButton.addEventListener("click", () => {
      tableView.style.display = "block";
      detailsView.style.display = "none";
      tableButton.classList.add("active-view");
      detailsButton.classList.remove("active-view");
  });

  detailsButton.addEventListener("click", () => {
      tableView.style.display = "none";
      detailsView.style.display = "block";
      detailsButton.classList.add("active-view");
      tableButton.classList.remove("active-view");
  });
});
