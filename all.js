//一、初始陣列(使用localStorage儲存資料在瀏覽器)
let todoData = localStorage.getItem('todoData'); //從updateList內取資料
todoData = todoData
  ? JSON.parse(todoData)
  : [
      { text: '學習JavaScript', id: new Date().getTime(), checked: '' },
      {
        text: '繳交TodoList作業',
        id: new Date().getTime() + 1,
        checked: 'checked',
      },
      {
        text: '找到一份前端工程師工作',
        id: new Date().getTime() + 2,
        checked: '',
      },
    ];
//二、新增Todo
const addBtn = document.querySelector('#addBTN');
const inputText = document.querySelector('#inputText');
addBtn.addEventListener('click', function (e) {
  addTodo();
});
inputText.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    addTodo();
  }
});
function addTodo() {
  const todo = {
    text: inputText.value,
    id: new Date().getTime(),
    checked: '',
  };
  if (todo.text === '' || todo.text.trim() === '') {
    return alert('請輸入待辦事項！');
  }
  todoData.unshift(todo);
  inputText.value = '';
  updateList();
}
//三、渲染
const todoList = document.querySelector('#todoList');
function renderList(array) {
  let str = '';
  array.forEach(function (item) {
    str += `<li data-id="${item.id}">
    <label class="checkbox">
    <input type="checkbox" name="checkbox" ${item.checked}/>
    <span>${item.text}</span>
    </label>
    <a href="#" class="delete" ></a>
    </li>`;
  });
  todoList.innerHTML = str;
}
//四、tab切換
const tab = document.querySelector('#tab');
const tabLi = document.querySelectorAll('#tab li');
let toggleStatus = 'all';
tab.addEventListener('click', changeTab);
function changeTab(e) {
  toggleStatus = e.target.dataset.tab;
  tabLi.forEach(function (item) {
    item.classList.remove('active');
  });
  e.target.classList.add('active');
  updateList();
}
//五、刪除個別清單 & 切換checked狀態
todoList.addEventListener('click', deleteAndChecked);
function deleteAndChecked(e) {
  let id = e.target.closest('li').dataset.id;
  if (e.target.classList.value === 'delete') {
    e.preventDefault();
    todoData = todoData.filter((item) => item.id != id);
  } else {
    todoData.forEach(function (item, index) {
      if (item.id == id) {//id為字串需轉型故使用一般相等比較運算子
        if (todoData[index].checked === 'checked') {
          todoData[index].checked = '';
        } else {
          todoData[index].checked = 'checked';
        }
      }
    });
  }
  updateList();
}
//六、切換tab後更新清單
function updateList() {
  let showData = [];
  if (toggleStatus === 'all') {
    showData = todoData;
  } else if (toggleStatus === 'work') {
    showData = todoData.filter((item) => item.checked === '');
  } else {
    showData = todoData.filter((item) => item.checked === 'checked');
  }
  const workNum = document.querySelector('#workNum');
  let todoLength = todoData.filter((item) => item.checked === '');
  workNum.textContent = todoLength.length;
  renderList(showData);
  localStorage.setItem('todoData', JSON.stringify(todoData)); //提交資料到localStorage
  //stringify方法將JavaScript值轉換成JSON字串(String)
}
//七、印出初始清單
updateList();
//八、切換tab到"全部"
function switchTabToAll() {
  toggleStatus = 'all';
  tabLi.forEach(function (item) {
    item.classList.remove('active');
  });
  tabFirstLi.classList.add('active'); //一鍵刪除後切換tab到"全部"
  updateList();
}
//九、一鍵清除已完成清單
const deleteBTN = document.querySelector('#deleteBTN');
const tabFirstLi = document.querySelector('#tab li');
deleteBTN.addEventListener('click', function (e) {
  e.preventDefault();
  if (confirm('確定清除所有已完成嗎？')) {
    todoData = todoData.filter((item) => item.checked != 'checked');
    switchTabToAll();
  }
});
//十、清除localStorage儲存資料恢復預設清單
const clearLocalStorageBTN = document.querySelector('#clearLocalStorageBTN');
clearLocalStorageBTN.addEventListener('click', function (e) {
  if (confirm('確定清除儲存資料恢復預設內容嗎？')) {
    localStorage.removeItem('todoData');
    todoData = [
      { text: '學習JavaScript', id: new Date().getTime(), checked: '' },
      {
        text: '繳交TodoList作業',
        id: new Date().getTime() + 1,
        checked: 'checked',
      },
      {
        text: '找到一份前端工程師工作',
        id: new Date().getTime() + 2,
        checked: '',
      },
    ];
    switchTabToAll();
    alert('已清除儲存資料並恢復預設內容');
  }
});
