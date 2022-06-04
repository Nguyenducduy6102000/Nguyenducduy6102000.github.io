$(function() {

    //CRUD Application(creat - read - update - delete)

    //localStorage.setItem('todo','this is todo')
    //kiem tra LocoStorage co to do chua 
    const todos = JSON.parse(localStorage.getItem("todos")) || [{
            id: 1,
            content: "Shopping",
            isDone: true,
        },
        {
            id: 2,
            content: "having dinner with GF",
            isDone: false,

        },
        {
            id: 3,
            content: "laudry",
            isDone: false,

        },
        {
            id: 4,
            content: "play game with my buddy",
            isDone: true,

        },
    ]


    //Load du lieu tu todos ra giao dien

    // . appendTO:  load content ben trong selecter

    /* $(`
      <li>
          <p>Helllooo1 <span>Delete</span></p>
      </li>
      `).appendTo(".todo-list ul");
    $(`<li>
          <p>Helllooo2 <span>Delete</span></p>
      </li> 
      `).appendTo(".todo-list ul"); */


    renderTodos(todos);


    let selectedTodo = null;
    // Click Thêm dữ liệu - CREAT
    $(".add-todo").click(function(e) {
        e.preventDefault();
        //khi click vao icon +, thi add noi dung vao mang


        let inputValue = $("input.todo").val(); // lay gia tri nhap vao tu input
        if (inputValue) { // nếu gía trị đó khác rỗng thì tiếp tục
            if (selectedTodo) {
                selectedTodo.content = inputValue;
                let index = todos.findIndex(val => val.id === selectedTodo.id);
                todos.splice(index, 1, selectedTodo);
                localStorage.setItem('todos', JSON.stringify(todos));
                selectedTodo = null;
            } else {
                todos.unshift({ // thêm phần tửtử vào đầu mảng todos
                    id: +Math.random().toFixed(2), // lam trong 2 cu so
                    content: inputValue,
                    isDone: false,
                });
            }

            // Luu vao Local Storage

            //JSON.stringfy chuyen objiec -> sring
            localStorage.setItem('todos', JSON.stringify(todos));

            renderTodos(todos); // xuất lại mảng todos ra giao diện
        } else {
            alert("Input is empty") // nếu mảng đó rỗng thì alert
        }
        $("input.todo").val(""); // mỗi lần nhập xong thì ô input sẽ xóa hêt
    });


    // Show lại dữ liệu - READ

    function renderTodos(todos) {
        //cleat tat cac ca element con
        $(".todo-list ul").empty();

        // load  lai du lieu tu todos ra giao dien
        todos.map((val) => { // tạo mảng mới bằng độ dài mảng cũ them 2 phan tu checked va style
            let checked = "";
            let style = "";

            if (val.isDone === true) { // neu isDone ban dau la true thi them nd vao 2 pt do
                style = "text-decoration: line-through";
                checked = "checked";
            }
            $(`
            <li>
                <p data-isdone="${val.isDone}" data-dataid="${val.id}">
                <input type="checkbox" ${checked}>
                <i style="${style}">${val.content}</i>
                <span data-todoid=${val.id} class="btn-delete">Delete</span>
                <span data-todoid=${val.id} class="btn-update">Update</span></p>
            </li>
            `).appendTo(".todo-list ul");
        });
    }

    // click xóa dữ liệu - DELETE
    /* $(".todo-list").on("click", ".btn-delete", function(e) {
        e.preventDefault();

        // lấy giá trị id của todoid
        let id = $(this).data("todoid");
        //console.log(id);

        // tim vi tri xuat hien dau tien cua thang co id mun delete
        let index = todos.findIndex(val => val.id === id);
        //console.log(index);

        todos.splice(index, 1)

        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodos(todos);
    }); */


    // click update - UPDATE
    /* $(".todo-list").on("click", ".btn-update", function(e) {
        e.preventDefault();

        let id = $(this).data("todoid");

        // phan biet findIndex, indexOf, find...
        // tra ve vi tri xuat hien dau tien cua todo co id muon update
        selectedTodo = todos.find(val => val.id === id);
        //console.log(selectedTodo);
        $("input.todo").val(selectedTodo.content);

    }); */


    // click input
    $(".todo-list").on("click", "input", function(e) {

        let check = $(this).parent().data("isdone"); // tao bien check (check nhan 1 trong 2 gt: true or false)
        let id = $(this).parent().data("dataid"); // lay id cho ta click
        let index = todos.findIndex((val) => val.id == id); // lay vi tri index voi id tren
        console.log(check);
        if (check) {
            todos[index].isDone = false; // neu true doi lai isDone o mang thanh false
            $(this).parent().children("i").css('text-decoration', 'none'); // 
            $(this).parent().data("isdone", false); // isdone ngay p doi thanh false
        } else {
            todos[index].isDone = true;
            $(this).parent().children("i").css('text-decoration', 'line-through');
            $(this).parent().data("isdone", true);
        }
        localStorage.setItem('todos', JSON.stringify(todos));
    });

});