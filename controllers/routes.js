module.exports = app => {

    app.get('/', (req, res) => {
        //var currentUser = req.user;
        //console.log(req.user)
        res.render("home.handlebars");
    });
};
