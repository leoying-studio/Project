module.exports={
    ip:"127.0.0.1",
    db:"blog",
    port:27017,
    session: {
        secret: 'user',
        key: 'user',
        maxAge: 720000
    },
    nodePort: 3000,
    mongodb: 'mongodb://127.0.0.1:27017/blog',
    baseUrl: 'http://localhost:3000'
};