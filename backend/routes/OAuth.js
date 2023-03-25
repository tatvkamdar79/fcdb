const passport =require('passport')
module.exports = (app) => {
    app.get("/checkout", (req, res) => {
        console.log("checkout");
    }
    )
    app.get('/auth/google',passport.authenticate('google',{
        scope:['profile','email']
    }));

    app.get('/auth/google/callback' ,passport.authenticate('google'),(req, res, next) => {
        res.redirect('http://localhost:3000');
    });
    app.get("/api/logout",(req,res) => {
        req.logout();
        res.send(req.user);
    })

}
