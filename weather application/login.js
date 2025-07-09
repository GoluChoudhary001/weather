// 3D Login System JavaScript - Optimized Version

// User management class
class UserManager {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('weatherAppUsers')) || [];
        this.currentUser = JSON.parse(localStorage.getItem('weatherAppCurrentUser')) || null;
        this.isGuest = localStorage.getItem('weatherAppIsGuest') === 'true';
    }

    // Register new user
    registerUser(name, email, password) {
        // Check if user already exists
        if (this.users.find(user => user.email === email)) {
            throw new Error('User with this email already exists');
        }

        // Validate password strength
        if (password.length < 6) {
            throw new Error('Password must be at least 6 characters long');
        }

        // Create new user
        const newUser = {
            id: Date.now().toString(),
            name: name,
            email: email,
            password: this.hashPassword(password),
            createdAt: new Date().toISOString(),
            preferences: {
                theme: 'light',
                defaultCity: 'London',
                units: 'metric',
                favoriteCities: []
            }
        };

        this.users.push(newUser);
        this.saveUsers();
        return newUser;
    }

    // Login user
    loginUser(email, password) {
        const user = this.users.find(u => u.email === email);
        
        if (!user) {
            throw new Error('User not found');
        }

        if (user.password !== this.hashPassword(password)) {
            throw new Error('Invalid password');
        }

        this.currentUser = user;
        this.isGuest = false;
        this.saveCurrentUser();
        return user;
    }

    // Logout user
    logout() {
        this.currentUser = null;
        this.isGuest = false;
        localStorage.removeItem('weatherAppCurrentUser');
        localStorage.removeItem('weatherAppIsGuest');
    }

    // Set guest mode
    setGuestMode() {
        this.currentUser = null;
        this.isGuest = true;
        localStorage.setItem('weatherAppIsGuest', 'true');
        localStorage.removeItem('weatherAppCurrentUser');
    }

    // Update user preferences
    updatePreferences(preferences) {
        if (this.currentUser) {
            this.currentUser.preferences = { ...this.currentUser.preferences, ...preferences };
            this.saveCurrentUser();
            this.saveUsers();
        }
    }

    // Simple password hashing (for demo purposes)
    hashPassword(password) {
        return btoa(password); // Base64 encoding (not secure for production)
    }

    // Save users to localStorage
    saveUsers() {
        localStorage.setItem('weatherAppUsers', JSON.stringify(this.users));
    }

    // Save current user to localStorage
    saveCurrentUser() {
        localStorage.setItem('weatherAppCurrentUser', JSON.stringify(this.currentUser));
    }

    // Get current user
    getCurrentUser() {
        return this.currentUser;
    }

    // Check if user is logged in
    isLoggedIn() {
        return this.currentUser !== null;
    }

    // Check if user is guest
    isGuestUser() {
        return this.isGuest;
    }
}

// Initialize user manager
const userManager = new UserManager();

// DOM elements for 3D design
const loginForm3D = document.getElementById('loginForm3D');
const registerForm3D = document.getElementById('registerForm3D');
const tabButtons3D = document.querySelectorAll('.tab-3d');

// Enhanced 3D tab switching functionality
function switchTab3D(tab) {
    // Update tab buttons
    tabButtons3D.forEach(btn => btn.classList.remove('active'));
    event.target.closest('.tab-3d').classList.add('active');

    // Show/hide forms with 3D animation
    if (tab === 'login') {
        registerForm3D.style.display = 'none';
        loginForm3D.style.display = 'block';
        loginForm3D.style.animation = 'slideInFromRight 0.5s ease-out';
    } else {
        loginForm3D.style.display = 'none';
        registerForm3D.style.display = 'block';
        registerForm3D.style.animation = 'slideInFromLeft 0.5s ease-out';
    }
}

// Enhanced 3D password toggle
function togglePassword3D(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.parentElement.querySelector('.toggle-password-3d i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
        icon.style.animation = 'iconPulse 0.3s ease';
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
        icon.style.animation = 'iconPulse 0.3s ease';
    }
    
    // Remove animation after it completes
    setTimeout(() => {
        icon.style.animation = '';
    }, 300);
}

// Enhanced form validation for 3D design
function validateForm3D(formType) {
    const errors = [];
    
    if (formType === 'login') {
        const email = document.getElementById('loginEmail3D').value.trim();
        const password = document.getElementById('loginPassword3D').value;
        
        if (!email) errors.push('Email is required');
        if (!password) errors.push('Password is required');
        if (email && !isValidEmail(email)) errors.push('Please enter a valid email');
        
    } else if (formType === 'register') {
        const name = document.getElementById('registerName3D').value.trim();
        const email = document.getElementById('registerEmail3D').value.trim();
        const password = document.getElementById('registerPassword3D').value;
        const confirmPassword = document.getElementById('confirmPassword3D').value;
        const agreeTerms = document.getElementById('agreeTerms3D').checked;
        
        if (!name) errors.push('Name is required');
        if (!email) errors.push('Email is required');
        if (!password) errors.push('Password is required');
        if (!confirmPassword) errors.push('Please confirm your password');
        if (email && !isValidEmail(email)) errors.push('Please enter a valid email');
        if (password && password.length < 6) errors.push('Password must be at least 6 characters');
        if (password && confirmPassword && password !== confirmPassword) errors.push('Passwords do not match');
        if (!agreeTerms) errors.push('You must agree to the terms and conditions');
    }
    
    return errors;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Enhanced 3D error message display
function showError3D(message, formType) {
    // Remove existing error messages
    const existingErrors = document.querySelectorAll('.error-message-3d');
    existingErrors.forEach(error => error.remove());
    
    // Remove error classes
    const inputs = document.querySelectorAll('.input-wrapper');
    inputs.forEach(input => input.classList.remove('error'));
    
    // Add error message with 3D animation
    const form = formType === 'login' ? loginForm3D : registerForm3D;
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message-3d';
    errorDiv.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${message}`;
    form.appendChild(errorDiv);
    
    // Add error class to form
    form.classList.add('invalid');
    
    // Add error class to specific input if available
    const errorInput = form.querySelector('input[type="email"], input[type="password"], input[type="text"]');
    if (errorInput) {
        errorInput.closest('.input-wrapper').classList.add('error');
    }
    
    // Remove error after 5 seconds
    setTimeout(() => {
        errorDiv.remove();
        form.classList.remove('invalid');
        inputs.forEach(input => input.classList.remove('error'));
    }, 5000);
}

// Enhanced 3D success message
function showSuccess3D(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message-3d';
    successDiv.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #27ae60, #2ecc71);
        color: white;
        padding: 20px 25px;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(39, 174, 96, 0.3);
        z-index: 1000;
        animation: slideInFromRight 0.5s ease, successPulse 2s ease-in-out infinite;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
    `;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.style.animation = 'slideOutToRight 0.5s ease';
        setTimeout(() => {
            successDiv.remove();
        }, 500);
    }, 3000);
}

// Handle 3D login form submission
loginForm3D.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const button = this.querySelector('.btn-3d');
    const originalContent = button.querySelector('.btn-content').innerHTML;
    
    // Show loading state with 3D animation
    button.classList.add('loading');
    button.querySelector('.btn-content').innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
    
    try {
        // Validate form
        const errors = validateForm3D('login');
        if (errors.length > 0) {
            throw new Error(errors[0]);
        }
        
        const email = document.getElementById('loginEmail3D').value.trim();
        const password = document.getElementById('loginPassword3D').value;
        
        // Attempt login
        const user = userManager.loginUser(email, password);
        
        // Remember me functionality
        const rememberMe = document.getElementById('rememberMe3D').checked;
        if (rememberMe) {
            localStorage.setItem('weatherAppRememberMe', 'true');
        }
        
        showSuccess3D('Login successful! Redirecting...');
        
        // Add 3D card animation before redirect
        const card = document.querySelector('.card-3d');
        card.style.animation = 'cardSuccess 1s ease-in-out';
        
        // Redirect to main app after delay
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
        
    } catch (error) {
        showError3D(error.message, 'login');
    } finally {
        // Reset button
        button.classList.remove('loading');
        button.querySelector('.btn-content').innerHTML = originalContent;
    }
});

// Handle 3D register form submission
registerForm3D.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const button = this.querySelector('.btn-3d');
    const originalContent = button.querySelector('.btn-content').innerHTML;
    
    // Show loading state with 3D animation
    button.classList.add('loading');
    button.querySelector('.btn-content').innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
    
    try {
        // Validate form
        const errors = validateForm3D('register');
        if (errors.length > 0) {
            throw new Error(errors[0]);
        }
        
        const name = document.getElementById('registerName3D').value.trim();
        const email = document.getElementById('registerEmail3D').value.trim();
        const password = document.getElementById('registerPassword3D').value;
        
        // Register user
        const user = userManager.registerUser(name, email, password);
        
        showSuccess3D('Account created successfully! Redirecting...');
        
        // Add 3D card animation before redirect
        const card = document.querySelector('.card-3d');
        card.style.animation = 'cardSuccess 1s ease-in-out';
        
        // Redirect to main app after delay
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
        
    } catch (error) {
        showError3D(error.message, 'register');
    } finally {
        // Reset button
        button.classList.remove('loading');
        button.querySelector('.btn-content').innerHTML = originalContent;
    }
});

// Enhanced 3D guest mode
function continueAsGuest3D() {
    userManager.setGuestMode();
    showSuccess3D('Welcome! You can now use the weather app as a guest.');
    
    // Add 3D card animation
    const card = document.querySelector('.card-3d');
    card.style.animation = 'cardGuest 1s ease-in-out';
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

// Social login handlers for 3D design
document.querySelector('.social-btn-3d.google').addEventListener('click', function(e) {
    e.preventDefault();
    showError3D('Google login not implemented yet. Please use email/password or continue as guest.', 'login');
});

document.querySelector('.social-btn-3d.facebook').addEventListener('click', function(e) {
    e.preventDefault();
    showError3D('Facebook login not implemented yet. Please use email/password or continue as guest.', 'login');
});

// Forgot password handler for 3D design
document.querySelector('.forgot-link-3d').addEventListener('click', function(e) {
    e.preventDefault();
    showError3D('Password reset functionality not implemented yet. Please contact support.', 'login');
});

// Terms and conditions handler for 3D design
document.querySelector('.terms-link-3d').addEventListener('click', function(e) {
    e.preventDefault();
    alert('Terms and Conditions:\n\n1. This is a demo application\n2. User data is stored locally\n3. No real authentication is implemented\n4. For demonstration purposes only');
});

// Check if user is already logged in
window.addEventListener('load', function() {
    if (userManager.isLoggedIn() || userManager.isGuestUser()) {
        // User is already logged in, redirect to main app
        window.location.href = 'index.html';
    }
});

// Add enhanced 3D CSS animations
const enhanced3DStyles = document.createElement('style');
enhanced3DStyles.textContent = `
    @keyframes slideInFromRight {
        from {
            opacity: 0;
            transform: translateX(50px) rotateY(-10deg);
        }
        to {
            opacity: 1;
            transform: translateX(0) rotateY(0deg);
        }
    }
    
    @keyframes slideInFromLeft {
        from {
            opacity: 0;
            transform: translateX(-50px) rotateY(10deg);
        }
        to {
            opacity: 1;
            transform: translateX(0) rotateY(0deg);
        }
    }
    
    @keyframes slideOutToRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
    
    @keyframes iconPulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.2);
        }
    }
    
    @keyframes cardSuccess {
        0% {
            transform: scale(1) rotateX(0deg);
        }
        50% {
            transform: scale(1.05) rotateX(5deg);
        }
        100% {
            transform: scale(1) rotateX(0deg);
        }
    }
    
    @keyframes cardGuest {
        0% {
            transform: scale(1) rotateY(0deg);
        }
        50% {
            transform: scale(1.05) rotateY(5deg);
        }
        100% {
            transform: scale(1) rotateY(0deg);
        }
    }
    
    @keyframes successPulse {
        0%, 100% {
            box-shadow: 0 10px 30px rgba(39, 174, 96, 0.3);
        }
        50% {
            box-shadow: 0 15px 40px rgba(39, 174, 96, 0.5);
        }
    }
    
    /* Enhanced input focus effects */
    .input-wrapper:focus-within {
        transform: translateY(-3px) scale(1.02);
        box-shadow: 0 15px 35px rgba(102, 126, 234, 0.3);
    }
    
    /* Enhanced button hover effects */
    .btn-3d:hover {
        transform: translateY(-3px) scale(1.02);
    }
    
    /* Enhanced tab hover effects */
    .tab-3d:hover {
        transform: translateY(-2px) scale(1.05);
    }
    
    /* Enhanced social button hover effects */
    .social-btn-3d:hover {
        transform: translateY(-3px) scale(1.05);
    }
    
    /* Loading animation enhancement */
    .btn-3d.loading {
        background: linear-gradient(135deg, #667eea, #764ba2);
        animation: loadingPulse 1.5s ease-in-out infinite;
    }
    
    @keyframes loadingPulse {
        0%, 100% {
            opacity: 0.8;
            transform: scale(1);
        }
        50% {
            opacity: 1;
            transform: scale(1.02);
        }
    }
`;
document.head.appendChild(enhanced3DStyles); 