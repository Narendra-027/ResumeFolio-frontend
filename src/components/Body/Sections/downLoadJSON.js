// export const downloadResumeJSON = async () => {
//     const response = await fetch("http://localhost:5000/api/resume/generate-pdf");
//     const blob = await response.blob();
  
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "resume.pdf";
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//   };
  
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// export const downloadResumePDF = () => {
//   const resumeElement = document.getElementById("resume"); // Ensure your resume container has this ID
//   const pdf = new jsPDF("p", "mm", "a4"); // Portrait mode, millimeters, A4 size

//   pdf.html(resumeElement, {
//     callback: function (pdf) {
//       pdf.save("resume.pdf"); // Download the PDF
//     },
//     x: 10, // Margin from left
//     y: 10, // Margin from top
//     width: 190, // Width of the content
//     windowWidth: resumeElement.scrollWidth, // Adjust width for responsiveness
//   });
// };

  