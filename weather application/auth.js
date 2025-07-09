// Authentication System - Clean Version

// User state
let currentUser = null;
let isAuthenticated = false;

// Initialize authentication
function initializeAuth() {
    // Check for existing session
    const savedUser = localStorage.getItem('weatherAppUser');
    if (savedUser) {
        try {
            currentUser = JSON.parse(savedUser);
            isAuthenticated = true;
            updateUserInterface();
        } catch (error) {
            console.error('Error parsing saved user:', error);
            localStorage.removeItem('weatherAppUser');
        }
    }
}

// Update user interface based on authentication state
function updateUserInterface() {
    const userProfile = document.getElementById('userProfile');
    const loginBtn = document.getElementById('loginBtn');
    
    if (isAuthenticated && currentUser) {
        // Show user profile
        if (userProfile) {
            userProfile.style.display = 'flex';
            document.getElementById('userName').textContent = currentUser.name || 'User';
            document.getElementById('userStatus').textContent = 'Logged In';
        }
        
        // Hide login button
        if (loginBtn) {
            loginBtn.style.display = 'none';
        }
    } else {
        // Show login button
        if (loginBtn) {
            loginBtn.style.display = 'flex';
        }
        
        // Hide user profile
        if (userProfile) {
            userProfile.style.display = 'none';
        }
    }
}

// Show login prompt modal
function showLoginPrompt() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

// Close login modal
function closeLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Go to login page
function goToLogin() {
    closeLoginModal();
    window.location.href = 'login.html';
}

// Continue as guest
function continueAsGuest() {
    closeLoginModal();
    showSuccess('Continuing as guest user');
}

// Toggle user menu
function toggleUserMenu() {
    const dropdown = document.getElementById('userDropdown');
    if (dropdown) {
        dropdown.classList.toggle('show');
    }
}

// Show user profile
function showProfile() {
    alert('Profile page coming soon!');
}

// Show settings
function showSettings() {
    alert('Settings page coming soon!');
}

// Show favorites
function showFavorites() {
    alert('Favorites page coming soon!');
}

// Logout user
function logout() {
    currentUser = null;
    isAuthenticated = false;
    localStorage.removeItem('weatherAppUser');
    updateUserInterface();
    showSuccess('Logged out successfully');
}

// Get current user
function getCurrentUser() {
    return currentUser;
}

// Check if user is authenticated
function isUserAuthenticated() {
    return isAuthenticated;
}

// Initialize auth when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAuth();
    updateUserInterface();
});

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
    const dropdown = document.getElementById('userDropdown');
    const profileBtn = document.querySelector('.profile-btn');
    
    if (dropdown && profileBtn) {
        if (!profileBtn.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.remove('show');
        }
    }
}); 