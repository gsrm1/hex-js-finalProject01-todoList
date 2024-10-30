//初始陣列
let listData = [
  {
    text: '學習JavaScript',
    checked: '',
  },
  {
    text: '繳交TodoList作業',
    checked: 'checked',
  },
  {
    text: '找到一份前端工程師工作',
    checked: '',
  },
];
//渲染功能
const list = document.querySelector('#list');
function renderList(array) {
  let str = '';
  array.forEach(function (item, index) {
    str += ` <li data-listNumIndex="${index}"><label class="checkbox">
                <input type="checkbox" name="checkbox" ${item.checked}/>
                <span>${item.text}</span>
              </label>
              <a href="#" class="delete" data-deleteIndex="${index}"></a>
            </li> `;
  });
  list.innerHTML = str;
  const workingNum = document.querySelector('.list_footer p');
  let workingItems = listData.filter(function (item) {
    return item.checked == '';
  });
  workingNum.textContent = `${workingItems.length}個待完成項目`;
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
  todoInput.value = '';
  updateList();
}
//新增清單功能：送出方式（按鈕與鍵盤Enter）
const addBtn = document.querySelector('#btn_add');
addBtn.addEventListener('click', function (e) {
  saveTodo();
});
todoInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    saveTodo();
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
    updateList();
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
        updateList();
      }
    });
  }
});
//更新功能
let classifiedData = [];
function updateList() {
  if (toggleStatus == '全部') {
    classifiedData = listData;
  } else if (toggleStatus == '待完成') {
    classifiedData = listData.filter((item) => item.checked == '');
  } else if (toggleStatus == '已完成') {
    classifiedData = listData.filter((item) => item.checked == 'checked');
  }
  renderList(classifiedData);
}
//tab切換：切換tab樣式、紀錄選取tab頁簽的狀態
const tabUl = document.querySelector('#tab');
let toggleStatus = '全部';
tabUl.addEventListener('click', function (e) {
  toggleStatus = e.target.innerText;
  let tabLi = document.querySelectorAll('#tab li');
  tabLi.forEach(function (i) {
    i.classList.remove('active');
  });
  e.target.classList.add('active');
  updateList(); //使用分類完成狀態功能
});
//刪除已完成功能
const clearDoneList = document.querySelector('.list_footer a');
clearDoneList.addEventListener('click', function (e) {
  e.preventDefault();
  const deleteDoneConfirm = confirm('確定清除已完成項目嗎？');
    if (deleteDoneConfirm) {
      listData = listData.filter((item) => item.checked == '');
    }
  updateList();
});
