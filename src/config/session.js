import session from 'express-session';

const sessionConfig=session({
    secret:'secret_key',
    resave:false,
    saveUninitialized:true,
    cookie: { maxAge: 60 * 60 * 1000 }
})


export default sessionConfig;