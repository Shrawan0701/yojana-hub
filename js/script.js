
let currentMethod = "official";

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("calcBtn").addEventListener("click", calculatePercentage);
});

function setMethod(method) {
  currentMethod = method;
  document.querySelectorAll(".method-card").forEach(card => card.classList.remove("active"));
  document.getElementById(method).classList.add("active");
}

function calculatePercentage() {
  const cgpa = parseFloat(document.getElementById("cgpa").value);
  const conversionResult = document.getElementById("conversionResult");

  if (isNaN(cgpa) || cgpa < 4 || cgpa > 10) {
    alert("⚠️ Please enter a valid CGPA between 4.00 and 10.00.");
    return;
  }

  let percentage = 0;

  // ✅ SPPU Official Formula
  if (currentMethod === "official") {
    if (cgpa >= 9.5) percentage = 20 * cgpa - 100;
    else if (cgpa >= 8.25) percentage = 12 * cgpa - 25;
    else if (cgpa >= 6.75) percentage = 10 * cgpa - 7.5;
    else if (cgpa >= 5.75) percentage = 5 * cgpa + 26.25;
    else if (cgpa >= 5.25) percentage = 10 * cgpa - 2.5;
    else if (cgpa >= 4.75) percentage = 10 * cgpa - 2.5;
    else if (cgpa >= 4.0) percentage = 6.6 * cgpa + 13.6;
  }

  // ✅ Simplified Formula
  else if (currentMethod === "simplified") {
    percentage = cgpa * 8.9;
  }

  // ✅ Alternative Formula
  else if (currentMethod === "alternative") {
    percentage = (cgpa - 0.75) * 10;
  }

  // Get Grade & Class
  const { grade, gradeDesc, degreeClass } = getGradeAndClass(cgpa);

  // Show Results
  document.getElementById("percentageResult").textContent = `${percentage.toFixed(2)}%`;
  document.getElementById("gradeResult").textContent = `${grade} (${gradeDesc})`;
  document.getElementById("classResult").textContent = degreeClass;

  conversionResult.style.display = "block";
}

// ✅ Determine Grade & Class from CGPA
function getGradeAndClass(cgpa) {
  let grade = "", gradeDesc = "", degreeClass = "";

  if (cgpa >= 9.5) {
    grade = "O"; gradeDesc = "Outstanding"; degreeClass = "First Class With Distinction";
  } else if (cgpa >= 8.25) {
    grade = "A+"; gradeDesc = "Excellent"; degreeClass = "First Class With Distinction";
  } else if (cgpa >= 6.75) {
    grade = "A"; gradeDesc = "Very Good"; degreeClass = "First Class";
  } else if (cgpa >= 5.75) {
    grade = "B+"; gradeDesc = "Good"; degreeClass = "Higher Second Class";
  } else if (cgpa >= 5.25) {
    grade = "B"; gradeDesc = "Above Average"; degreeClass = "Second Class";
  } else if (cgpa >= 4.75) {
    grade = "C"; gradeDesc = "Average"; degreeClass = "Pass Class";
  } else {
    grade = "D/P"; gradeDesc = "Pass"; degreeClass = "Pass Class";
  }

  return { grade, gradeDesc, degreeClass };
}

