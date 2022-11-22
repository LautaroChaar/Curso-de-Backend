export function auth(req, res, next) {
    if(req.isAuthenticated()){
        next()
    } else {
        res.redirect('/api/login')
    }
}
