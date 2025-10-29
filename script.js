document.addEventListener("DOMContentLoaded", () => {
    const envelope = document.querySelector(".envelope-wrapper");
    const letterOverlay = document.querySelector(".letter-overlay");
    const closeLetter = document.querySelector(".close-letter");

    console.log("Elements found:", {envelope, letterOverlay, closeLetter});

    if (!envelope || !letterOverlay || !closeLetter) {
        console.error("Missing elements!");
        return;
    }

    envelope.addEventListener("click", (e) => {
        console.log("Envelope clicked!");
        e.stopPropagation();
        envelope.classList.add("flap");
        // Wait for flap animation, then show letter
        setTimeout(() => {
            console.log("Adding active class to letter overlay");
            letterOverlay.classList.add("active");
        }, 700);
    });

    closeLetter.addEventListener("click", (e) => {
        console.log("Close button clicked");
        e.stopPropagation();
        letterOverlay.classList.remove("active");
        setTimeout(() => {
            envelope.classList.remove("flap");
        }, 300);
    });

    // Close letter when clicking on overlay background
    letterOverlay.addEventListener("click", (e) => {
        if (e.target === letterOverlay) {
            console.log("Overlay background clicked");
            letterOverlay.classList.remove("active");
            setTimeout(() => {
                envelope.classList.remove("flap");
            }, 300);
        }
    });
});