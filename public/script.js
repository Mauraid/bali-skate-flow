// Custom JavaScript for Skate Camp Bali 2025 Timetable
// Add any additional functionality here

document.addEventListener('DOMContentLoaded', function() {
    console.log('Skate Camp Bali 2025 Timetable loaded successfully!');
    
    // Add any custom interactions or analytics tracking here
    
    // Example: Track tab clicks for analytics
    // trackTabInteractions();
    
    // Example: Add keyboard shortcuts
    // addKeyboardShortcuts();
});

// Function to track user interactions (placeholder)
function trackTabInteractions() {
    // Add analytics tracking code here if needed
    console.log('Tab interaction tracking initialized');
}

// Function to add keyboard shortcuts (placeholder)
function addKeyboardShortcuts() {
    document.addEventListener('keydown', function(event) {
        // Example: Press 1, 2, 3 to switch tabs
        if (event.key === '1') {
            // Switch to ICP tab
            console.log('Switch to ICP Certification tab');
        } else if (event.key === '2') {
            // Switch to Path 1 tab
            console.log('Switch to Path 1 tab');
        } else if (event.key === '3') {
            // Switch to Kids tab
            console.log('Switch to Kids Path tab');
        }
    });
}

// Export functions if needed
window.SkateCampUtils = {
    trackTabInteractions,
    addKeyboardShortcuts
};