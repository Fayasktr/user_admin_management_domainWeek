const isLogin=(req,res,next)=>{
    if(req.session.admin){
        return next();
    }
    res.redirect('/adminSide/login');
}

const adminAuthentic= {isLogin}
export default adminAuthentic;