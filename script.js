// Preload images in background for faster display
function preloadImage(url) {
    const img = new Image();
    img.src = url;
}

document.addEventListener("DOMContentLoaded", () => {
    const loadingScreen = document.getElementById("loadingScreen");
    const container = document.querySelector(".container");
    const envelope = document.querySelector(".envelope-wrapper");
    const letterOverlay = document.querySelector(".letter-overlay");
    const closeLetter = document.querySelector(".close-letter");

    // Preload all images in background (non-blocking)
    const allImages = [
        'photos/Picsart_25-10-26_11-05-35-064.jpg',
        'photos/Picsart_25-10-29_15-01-29-723.png',
        'photos/Picsart_25-10-26_10-19-01-454 (2).png',
        'photos/europeana-LZ10F9WaRFs-unsplash.jpg'
    ];
    
    // Load images in background without blocking
    allImages.forEach(preloadImage);

    // Show loading screen for 2.5 seconds
    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                if (container) {
                    container.style.opacity = '1';
                    container.style.transition = 'opacity 0.5s ease-in';
                }
            }, 300);
        }
    }, 2500); // 2.5 seconds

    if (!envelope || !letterOverlay || !closeLetter) {
        console.error("Missing elements!");
        return;
    }

    envelope.addEventListener("click", (e) => {
        e.stopPropagation();
        envelope.classList.add("flap");
        // Wait for flap animation, then show letter
        setTimeout(() => {
            letterOverlay.classList.add("active");
        }, 700);
    });

    closeLetter.addEventListener("click", (e) => {
        e.stopPropagation();
        letterOverlay.classList.remove("active");
        setTimeout(() => {
            envelope.classList.remove("flap");
        }, 300);
    });

    // Close letter when clicking on overlay background
    letterOverlay.addEventListener("click", (e) => {
        if (e.target === letterOverlay) {
            letterOverlay.classList.remove("active");
            setTimeout(() => {
                envelope.classList.remove("flap");
            }, 300);
        }
    });
});