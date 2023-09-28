const elementsIn = document.querySelectorAll('.element-in');
const elementsOut = document.querySelectorAll('.element-out');
const proceedBtn = document.getElementById('proceedBtn');
let currentIndex = 0;

proceedBtn.addEventListener('click', () => {
    if (currentIndex >= elementsIn.length) {
        currentIndex = 0; // Reset the index to loop through the elements
    }

    // Toggle the animation classes for the current elements
    elementsIn[currentIndex].classList.toggle('element-in-animate');
    elementsOut[currentIndex].classList.toggle('element-out-animate');

    // Move to the next elements for the next click
    currentIndex++;
});
