document.addEventListener("DOMContentLoaded", function () {
  const monsterStoryElement = document.getElementById("monster-story");
  const trainingImage = document.getElementById("training-image");
  const trainingStoryElement = document.getElementById("training-story");

  if (monsterStoryElement) {
    typeWriter(monsterStoryElement, trainingImage, trainingStoryElement);
  }

  document
    .getElementById("read-more-btn")
    .addEventListener("click", function () {
      stopTyping();
      showFullText();
    });
});

let typingInterval;
function stopTyping() {
  clearInterval(typingInterval);
}

function showFullText() {
  const monsterStoryElement = document.getElementById("monster-story");
  const trainingStoryElement = document.getElementById("training-story");

  monsterStoryElement.textContent = monsterStory;
  trainingStoryElement.textContent = trainingImportance;

  const trainingImage = document.getElementById("training-image");
  trainingImage.classList.remove("hidden");
  trainingImage.style.opacity = 1;
}

let i = 0;
const monsterStory = `There once was a man who brought home a beautiful puppy. At first, life was filled with joy, but he didn’t know how to care for his dog. He neglected its basic needs, allowing bad behaviors to grow. Without proper care and attention, the puppy turned into a wild, unmanageable monster, barking relentlessly and damaging everything in sight.`;

const trainingImportance = `Training your dog is just as important as exercising your own body and mind. Imagine skipping workouts and how your body feels sluggish. Dogs need physical exercise and mental stimulation to thrive, just like humans. Structured training helps them channel energy, build confidence, and live harmoniously with their owners.`;

function typeWriter(monsterStoryElement, trainingImage, trainingStoryElement) {
  if (i < monsterStory.length) {
    monsterStoryElement.textContent += monsterStory.charAt(i);
    i++;
    typingInterval = setTimeout(
      () =>
        typeWriter(monsterStoryElement, trainingImage, trainingStoryElement),
      30
    );
  } else {
    setTimeout(() => {
      trainingImage.classList.remove("hidden");
      trainingImage.style.opacity = 1;
      typeWriterTraining(trainingStoryElement);
    }, 1000);
  }
}

let j = 0;
function typeWriterTraining(trainingStoryElement) {
  if (j < trainingImportance.length) {
    trainingStoryElement.textContent += trainingImportance.charAt(j);
    j++;
    typingInterval = setTimeout(
      () => typeWriterTraining(trainingStoryElement),
      30
    );
  }
}
