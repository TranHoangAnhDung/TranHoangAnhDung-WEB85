// giao thức mặc định của node
import http from 'http';
// data học sinh
const listStudent = [
    {
        id: 1,
        fullName: "Jackie",
        age: 5,
        class: "5A"
    },
    {
        id: 2,
        fullName: "Juli MTP",
        age: 5,
        class: "5A"
    },
    {
        id: 3,
        fullName: "Denis",
        age: 5,
        class: "5B"
    },
]
const app = http.createServer((request, response) => {
    // get endpoint
    const endpoint = request.url;
    switch (endpoint) {
    // với base endpoint (base API), mặc định base endpoint sẽ là /
        case '/':
            response.end(`Hello MindX`);
            break;
    // với endpoint /students
        case '/students':
            // chỉ trả về string hoặc buffer nên phải chuyển về string để thành file json
            response.end(JSON.stringify(listStudent));
            break;
    // nếu không khớp bất kỳ một endpoint nào
        default:
            response.end(`Error, Notfound API!`);
            break;
    }
});

app.listen(8080, () => {
    console.log('Server is running!');
});