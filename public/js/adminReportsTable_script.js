function addReportRow(reportedBy, postId, reason) {
    const tableBody = document.querySelector('.table-container table tbody');

    const row = document.createElement('tr');

    const reportedByCell = document.createElement('td');
    reportedByCell.innerText = reportedBy;
    reportedByCell.style.textAlign = 'center';

    const postIdCell = document.createElement('td');
    postIdCell.innerText = postId;
    postIdCell.style.textAlign = 'center';

    const reasonCell = document.createElement('td');
    reasonCell.innerText = reason;
    reasonCell.style.textAlign = 'center';

    row.appendChild(reportedByCell);
    row.appendChild(postIdCell);
    row.appendChild(reasonCell);

    tableBody.appendChild(row);
}


for (const report of reportsData) {
    addReportRow(report.reportedBy, report.postId, report.reason);
}