document.addEventListener('DOMContentLoaded', function() {
    const envelope = document.getElementById('envelope');
    const letter = document.getElementById('letter');
    const letterText = document.getElementById('letterText');
    
    let isOpen = false;
    
    // Function to open the envelope
    function openEnvelope() {
        if (isOpen) return;
        
        isOpen = true;
        envelope.classList.add('opening');
        envelope.classList.add('open');
        
        // Show letter after a short delay
        setTimeout(() => {
            letter.classList.add('open');
            envelope.classList.remove('opening');
        }, 300);
    }
    
    // Function to close the envelope
    function closeEnvelope() {
        if (!isOpen) return;
        
        isOpen = false;
        letter.classList.remove('open');
        
        // Close envelope after letter animation
        setTimeout(() => {
            envelope.classList.remove('open');
        }, 300);
    }
    
    // Click event for envelope
    envelope.addEventListener('click', function(e) {
        e.stopPropagation();
        if (!isOpen) {
            openEnvelope();
        }
    });
    
    // Click event for letter to close
    letter.addEventListener('click', function(e) {
        e.stopPropagation();
        if (isOpen) {
            closeEnvelope();
        }
    });
    
    // Click outside to close
    document.addEventListener('click', function(e) {
        if (isOpen && !envelope.contains(e.target) && !letter.contains(e.target)) {
            closeEnvelope();
        }
    });
    
    // Touch events for mobile
    envelope.addEventListener('touchstart', function(e) {
        e.preventDefault();
    });
    
    letter.addEventListener('touchstart', function(e) {
        e.preventDefault();
    });
    
    // Function to update letter content
    function updateLetterContent(content) {
        letterText.innerHTML = content;
    }
    
    // Make updateLetterContent available globally
    window.updateLetterContent = updateLetterContent;
    
    // Add some visual feedback
    envelope.addEventListener('mouseenter', function() {
        if (!isOpen) {
            envelope.style.transform = 'scale(1.02)';
        }
    });
    
    envelope.addEventListener('mouseleave', function() {
        if (!isOpen) {
            envelope.style.transform = 'scale(1)';
        }
    });
});
