// Image preloading function
function preloadImages(imageUrls) {
    const promises = imageUrls.map(url => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = reject;
            img.src = url;
        });
    });
    return Promise.all(promises);
}

document.addEventListener("DOMContentLoaded", () => {
    const loadingScreen = document.getElementById("loadingScreen");
    const container = document.querySelector(".container");
    const envelope = document.querySelector(".envelope-wrapper");
    const letterOverlay = document.querySelector(".letter-overlay");
    const closeLetter = document.querySelector(".close-letter");

    // List of images to preload
    const imagesToPreload = [
        'photos/europeana-LZ10F9WaRFs-unsplash.jpg',
        'photos/Picsart_25-10-26_11-05-35-064.jpg',
        'photos/Picsart_25-10-26_10-17-00-665.png',
        'photos/Picsart_25-10-26_10-19-01-454 (2).png'
    ];

    // Preload all images
    preloadImages(imagesToPreload)
        .then(() => {
            // All images loaded, hide loading screen
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
            }, 300); // Small delay for smooth transition
        })
        .catch((error) => {
            console.error("Error loading images:", error);
            // Still hide loading screen even if some images fail
            if (loadingScreen) {
                loadingScreen.style.display = 'none';
                if (container) {
                    container.style.opacity = '1';
                    container.style.transition = 'opacity 0.5s ease-in';
                }
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