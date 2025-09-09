$(document).ready(function() {
      let saved = getCookie("todos");
      if (saved) {
        let todos = JSON.parse(saved);
        todos.forEach(text => addTodo(text, false));
      }

      $("#newBtn").click(function() {
        let text = prompt("Enter new TO DO:");
        if (text && text.trim() !== "") {
          addTodo(text.trim(), true);
        }
      });
    });

    function addTodo(text, save) {
      let $div = $("<div></div>")
        .addClass("todo")
        .text(text)
        .click(function() {
          if (confirm("Do you want to remove this TO DO?")) {
            $(this).remove();
            saveTodos();
          }
        });

      $("#ft_list").prepend($div);

      if (save) saveTodos();
    }

    function saveTodos() {
      let todos = [];
      $("#ft_list .todo").each(function() {
        todos.push($(this).text());
      });
      setCookie("todos", JSON.stringify(todos), 7);
    }

    function setCookie(name, value, days) {
      let d = new Date();
      d.setTime(d.getTime() + (days*24*60*60*1000));
      let expires = "expires="+ d.toUTCString();
      document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    function getCookie(name) {
      let cname = name + "=";
      let decoded = decodeURIComponent(document.cookie);
      let ca = decoded.split(';');
      for(let c of ca) {
        while (c.charAt(0) === ' ') c = c.substring(1);
        if (c.indexOf(cname) === 0) {
          return c.substring(cname.length, c.length);
        }
      }
      return "";
    }