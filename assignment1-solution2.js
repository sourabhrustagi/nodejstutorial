const http = require('http');

const server = http.createServer((req, res)=>{
    router(req, res);
});

const PORT = 3000;
server.listen(PORT);

const router = (req, res) =>{
    const method = req.method;

    if (method === 'GET'){
        onGet(req, res);
    }

    if(method === 'POST'){
        onPost(req, res);
    }

    res.statusCode = 400;
}

const onGet = (req, res) => {
    const url = req.url;

    switch(url){
        case '/':
            return onBaseGet(req, res);
        case '/users':
            return onUserGet(req, res);
        default:
            res.statusCode = 400;        
    }
}

const onPost = (req, res) => {
    const url = req.url;
    switch(url){
        case '/create-user':
            return onCreateUserPost(req, res);
        default:
            res.statusCode = 400;
    }
}

const onBaseGet = (req, res) =>{
    res.setHeader('Content-Type', 'text/html');

    res.write('<html>');
    res.write('<form action="/create-user" method="POST">');
    res.write('<input type="text" name="username">');
    res.write('<button type="submit">Create User</button>');
    res.write('</form>');
    res.write('</html>');
    res.end();
};

const onUserGet = (req, res) =>{
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<ul>');
    res.write('<li>Zian Khan</li>');
    res.write('<li>Sadiya Simran</li>');
    res.write('<li>Sameena Sultana</li>');
    res.write('</ul');
    res.write('</html>');

    res.end();
};

const onCreateUserPost = (req, res) =>{
    const body =[];

    req.on('data', (chunk)=>{
        body.push(chunk);
    });

    req.on('end', ()=>{
        const parsedBody = Buffer.concat(body).toString();

        const userName = parsedBody.split('=')[1];
        console.log(`User name: ${userName}`);
        res.statusCode = 302;
        res.setHeader('Location', '/users');
        res.end();
    });
};

module.exports = {
    router: router
};