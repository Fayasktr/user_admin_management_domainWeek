import session from 'express-session';

const sessionConfig=session({
    secret:'secret_key',
    resave:false,
    saveUninitialized:false
})


export default sessionConfig;