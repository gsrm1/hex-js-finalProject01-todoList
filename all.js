const listData = [
  {
    text: '把冰箱發霉的檸檬拿去丟',
    id: '',
    checked: '',
  },
];
const list = document.querySelector('.list');
const todoInput = document.querySelector('.todoInput');
const btn_add = document.querySelector('.btn_add');

//渲染用函式
function renderList() {
  let str = '';
  listData.forEach(function (item, index) {
    str += ` <li><label class="checkbox" data-index="${index}" for="">
                <input type="checkbox" />
                <span>${item.text}</span>
              </label>
              <a href="#" class="delete" data-index="${index}"></a></li> `;
  });
  list.innerHTML = str;
}

//儲存用函式
function saveTodo() {
  if (todoInput.value === '' || todoInput.value.trim() === '') {
    return alert('請輸入待辦事項！');
  }
  const newTodo = {
    text: '',
    id: '',
    checked: '',
  };
  newTodo.text = todoInput.value;
  listData.push(newTodo);
  renderList();
}

//送出待辦
btn_add.addEventListener('click', function (e) {
  saveTodo();
  todoInput.value = '';
});

todoInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    saveTodo();
    todoInput.value = '';
  }
});

//刪除功能
list.addEventListener('click', function (e) {
  if (e.target.getAttribute('class') !== 'delete') {
    return;
  }
  let indexToDelete = e.target.getAttribute('data-index');
  let deleteConfirm = confirm('確定放到"已完成"區嗎？');
  if (deleteConfirm) {
    listData.splice(indexToDelete, 1);
  }
  renderList();
});
