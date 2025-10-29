// Image preloading function
function preloadImage(url) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = resolve; // Continue even if image fails
        img.src = url;
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const loadingScreen = document.getElementById("loadingScreen");
    const container = document.querySelector(".container");
    const envelope = document.querySelector(".envelope-wrapper");
    const letterOverlay = document.querySelector(".letter-overlay");
    const closeLetter = document.querySelector(".close-letter");

    // Critical images (visible immediately) - load first
    const criticalImages = [
        'photos/Picsart_25-10-26_11-05-35-064.jpg',
        'photos/Picsart_25-10-26_10-17-00-665.png',
        'photos/Picsart_25-10-26_10-19-01-454 (2).png'
    ];

    // Background image can load later (less critical)
    const backgroundImage = 'photos/europeana-LZ10F9WaRFs-unsplash.jpg';

    // Load background in parallel (non-blocking)
    preloadImage(backgroundImage);

    // Create a timeout to ensure loading doesn't take too long (max 2 seconds)
    const maxLoadTime = new Promise(resolve => setTimeout(resolve, 2000));

    // Wait for critical images or timeout, whichever comes first
    Promise.race([
        Promise.all(criticalImages.map(preloadImage)),
        maxLoadTime
    ]).then(() => {
        // Hide loading screen quickly
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                if (container) {
                    container.style.opacity = '1';
                    container.style.transition = 'opacity 0.3s ease-in';
                }
            }, 150); // Reduced delay
        }
    });

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