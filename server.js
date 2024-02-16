const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

let todos = [
    { id: 1, title: '떡국 먹기', done: false},
    { id: 2, title: '세뱃돈 받기', done: false}
];

app.use(cors()); // 최상위에 있어야 함, 밑에 있으면 외부에 데이터를 못 갖고 옴
app.use(express.json()); // express에 있는 json 형태를 body 파싱함

// To-Do 목록 조회
app.get('/todos', (req, res) => {
    res.json(todos);    
});

// To-Do 생성
app.post('/todos', (req, res) => {
    const existingIds = new Set(todos.map(todo => todo.id));
    let newId = 1;
    while (existingIds.has(newId)) {
        newId++;
    }
    const todo = {id : newId, ...req.body, done: false}; // ...은 자바스크립트에서 복사 명령어
    todos.push(todo);
    res.json(todo);
    console.log(`${todo.id}가 생성되었습니다.`)
});

// To-Do 상태
app.put('/todos/:id', (req, res) => {
    const {id} = req.params;
    todos = todos.map(todo => todo.id === id ? { ...todo, ...req.body } : todo);
    res.json({ message: 'Todo가 업데이트 되었습니다.'});
});

// To-Do 삭제
app.delete('/todos/:id', (req, res) => {
    const {id} = req.params;
    todos = todos.filter(todo => todo.id != id);
    res.json({ message: 'Todo가 삭제되었습니다.'});
});

app.listen(port, () => {
    console.log(`${port} 포트에서 서버 가동중`);
});