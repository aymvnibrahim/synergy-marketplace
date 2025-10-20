// UI.js

// Key for storing the dark mode state
const DARK_MODE_STORAGE_KEY = 'isDarkMode';

/**
 * Toggles dark mode for the entire site by adding or removing 
 * the 'dark-mode' class on the document body.
 */
export function toggleDarkMode() {
  const body = document.body;
  
  // 1. Toggle the class on the <body>
  body.classList.toggle('dark-mode');
  
  // 2. Update localStorage to remember the preference
  const isCurrentlyDark = body.classList.contains('dark-mode');
  localStorage.setItem(DARK_MODE_STORAGE_KEY, isCurrentlyDark);
  
  // You might want to update the button text/icon here as well
  // For example: darkModeToggleButton.textContent = isCurrentlyDark ? 'Light Mode' : 'Dark Mode';
}

/**
 * Checks localStorage on page load and applies the saved dark mode setting.
 */
function applySavedDarkMode() {
    const isDarkModeSaved = localStorage.getItem(DARK_MODE_STORAGE_KEY) === 'true';

    if (isDarkModeSaved) {
        document.body.classList.add('dark-mode');
    }
}

// Apply the saved mode immediately when the script runs (on page load)
applySavedDarkMode();

/**
 * Sets up the event listener for the dark mode button.
 * NOTE: You must call this function after the button is available in the DOM.
 * @param {string} buttonSelector - The CSS selector for the dark mode toggle button.
 */
export function setupDarkModeToggle(buttonSelector) {
    const darkModeToggleButton = document.querySelector(buttonSelector);

    if (darkModeToggleButton) {
        // Your requested event listener structure
        darkModeToggleButton.addEventListener('click', () => {
            toggleDarkMode();
        });
    }
}