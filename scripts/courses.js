// Toggle the menu when the hamburger icon is clicked
document.getElementById("hamburger").addEventListener("click", function () {
  document.getElementById("nav").classList.toggle("active");
});

// Close the menu when a menu item is clicked
const menuItems = document.querySelectorAll("#menu a");
menuItems.forEach((item) => {
  item.addEventListener("click", function () {
    document.getElementById("nav").classList.remove("active");
  });
});

// Close the menu if the user clicks outside of it
document.addEventListener("click", function (event) {
  const nav = document.getElementById("nav");
  if (
    !nav.contains(event.target) &&
    !document.getElementById("hamburger").contains(event.target)
  ) {
    nav.classList.remove("active");
  }
});

// Array for courses
const courses = [
  {
    subject: "CSE",
    number: 110,
    title: "Introduction to Programming",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.",
    technology: ["Python"],
    completed: true,
  },
  {
    subject: "WDD",
    number: 130,
    title: "Web Fundamentals",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.",
    technology: ["HTML", "CSS"],
    completed: true,
  },
  {
    subject: "CSE",
    number: 111,
    title: "Programming with Functions",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.",
    technology: ["Python"],
    completed: false,
  },
  {
    subject: "CSE",
    number: 210,
    title: "Programming with Classes",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.",
    technology: ["C#"],
    completed: true,
  },
  {
    subject: "WDD",
    number: 131,
    title: "Dynamic Web Fundamentals",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.",
    technology: ["HTML", "CSS", "JavaScript"],
    completed: true,
  },
  {
    subject: "WDD",
    number: 231,
    title: "Frontend Web Development I",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.",
    technology: ["HTML", "CSS", "JavaScript"],
    completed: false,
  },
];

// Filter courses based on the subject
function filterCourses(subject) {
  let filteredCourses;
  if (subject === "all") {
    filteredCourses = courses;
  } else {
    filteredCourses = courses.filter((course) => course.subject === subject);
  }
  displayCourses(filteredCourses);
  updateTotalCredits(filteredCourses); 
}

// Display courses dynamically
function displayCourses(coursesList) {
  const coursesContainer = document.getElementById("courses");
  coursesContainer.innerHTML = ""; 

  // Render each course dynamically
  coursesList.forEach((course) => {
    const courseCard = document.createElement("div");
    courseCard.classList.add("course-card");
    if (course.completed) {
      courseCard.classList.add("completed");
    }

    courseCard.innerHTML = `
            <h3>${course.subject} ${course.number}</h3>
            <p>${course.title}</p>
        `;

    coursesContainer.appendChild(courseCard);
  });
}

// Update total credits dynamically
function updateTotalCredits(coursesList) {
  const totalCredits = coursesList.reduce(
    (total, course) => total + course.credits,
    0
  );
  document.getElementById("credits-value").textContent = totalCredits;
}

// Initial display with all courses
filterCourses("all");

// Modal with course details
function showModal(course) {
  const modal = document.getElementById("courseModal");
  document.getElementById(
    "modalSubjectNumber"
  ).textContent = `${course.subject} ${course.number}`;
  document.getElementById("modalTitle").textContent = course.title;
  document.getElementById("modalCredits").textContent = course.credits;
  document.getElementById("modalDescription").textContent = course.description;
  document.getElementById("modalCertificate").textContent = course.certificate;
  document.getElementById("modalTechnology").textContent =
    course.technology.join(", ");

  modal.showModal();
}

// Dialog Code 
document.getElementById("closeModal").addEventListener("click", function () {
  document.getElementById("courseModal").close();
});

document
  .getElementById("courseModal")
  .addEventListener("click", function (event) {
    if (event.target.tagName === "DIALOG") {
      event.target.close();
    }
  });

function displayCourses(coursesList) {
  const coursesContainer = document.getElementById("courses");
  coursesContainer.innerHTML = ""; 

  coursesList.forEach((course) => {
    const courseCard = document.createElement("div");
    courseCard.classList.add("course-card");
    if (course.completed) {
      courseCard.classList.add("completed");
    }

    courseCard.innerHTML = `
            <h3>${course.subject} ${course.number}</h3>
            <p>${course.title}</p>
        `;

    courseCard.addEventListener("click", function () {
      showModal(course);
    });

    coursesContainer.appendChild(courseCard);
  });
}
