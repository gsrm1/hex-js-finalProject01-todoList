//初始陣列
let listData = [
  {
    text: '學習JavaScript',
    checked: '',
  },
  {
    text: '完成TodoList作業',
    checked: '',
  },
];

//渲染功能
const list = document.querySelector('#list');
const workingNum = document.querySelector('.list_footer p');

function renderList() {
  let str = '';
  let listNum = 0;
  listData.forEach(function (item, index) {
    str += ` <li data-listNumIndex="${index}"><label class="checkbox">
                <input type="checkbox" name="checkbox" ${item.checked}/>
                <span>${item.text}</span>
              </label>
              <a href="#" class="delete" data-deleteIndex="${index}"></a>
            </li> `;
  });
  list.innerHTML = str;

  listNum = listData.filter(function (item) {
    return item.checked == '';
  });
  workingNum.textContent = `${listNum.length}個待完成項目`;
}
renderList(listData);

//新增清單功能：提醒未輸入、將輸入內容帶入初始陣列
const todoInput = document.querySelector('#todoInput');
function saveTodo() {
  if (todoInput.value == '' || todoInput.value.trim() == '') {
    return alert('請輸入待辦事項！');
  }
  const newTodo = {
    text: '',
    checked: '',
  };
  newTodo.text = todoInput.value;
  listData.push(newTodo);
  renderList();
}
//新增清單功能：送出方式（按鈕與鍵盤Enter）
const addBtn = document.querySelector('#btn_add');
addBtn.addEventListener('click', function (e) {
  saveTodo();
  todoInput.value = '';
});
todoInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    saveTodo();
    todoInput.value = '';
  }
});

//刪除 & 標示待完成
list.addEventListener('click', function (e) {
  if (e.target.getAttribute('class') === 'delete') {
    e.preventDefault();
    const deleteByIndex = e.target.getAttribute('data-deleteIndex');
    const deleteConfirm = confirm('確定刪除該事項嗎？');
    if (deleteConfirm) {
      listData.splice(deleteByIndex, 1);
    }
    renderList(listData);
  } else {
    let listNumIndex = e.target.closest('li').getAttribute('data-listNumIndex');
    listData.forEach(function (item, index) {
      if (index == listNumIndex) {
        //問題：比較子不能使用'==='
        if (listData[index].checked == 'checked') {
          listData[index].checked = '';
        } else {
          listData[index].checked = 'checked';
        }
        // classifyTodo();
      }
    });
  }
});

//tab切換：切換tab樣式、紀錄選取tab頁簽的狀態
const tabUl = document.querySelector('#tab');
let toggleStatus = 'all';

tabUl.addEventListener('click', changeTab);
function changeTab(e) {
  let tabLi = document.querySelectorAll('#tab li');
  tabLi.forEach(function (item) {
    item.classList.remove('active');
  });
  e.target.classList.add('active');
  toggleStatus = e.target.getAttribute('data-tab');
  classifyTodo(); //使用分類完成狀態功能
}

//分類完成狀態功能
function classifyTodo() {
  let classifiedListData = [];
  if (toggleStatus == 'all') {
    classifiedListData = listData;
  } else if (toggleStatus == 'working') {
    classifiedListData = listData.filter(function (item) {
      return item.checked == '';
    });
  } else if (toggleStatus == 'done') {
    classifiedListData = listData.filter(function (item) {
      return item.checked == 'checked';
    });
  }
  renderList(classifiedListData)
  console.log(classifiedListData);
  
}

const clearDoneList = document.querySelector('.list_footer a');
