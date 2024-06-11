// Middleware function to check if user is authenticated
const withAuth = (req, res, next) => {
    // Check if user is logged in by checking session variable
    if (!req.session.logged_in) {
        // If user is not logged in, redirect to the login page
        res.redirect('/login');
    } else {
        // If user is logged in, proceed to the next middleware or route handler
        next();
    }
};

// Export
module.exports = withAuth;
