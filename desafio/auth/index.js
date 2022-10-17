export function auth(req, res, next) {
    if (req.session.nombre) {
        next();
    } else {
        res.redirect('/login');
    }
}


