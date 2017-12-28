$(document).ready(function() {
  $.getJSON('/api/todos').then(addTodos);
  $('#todoInput').keypress(function(e) {
    if (e.which === 13) {
      createTodo();
    }
  });
  $('.tasks').on('click', 'li', function() {
    updateTodo($(this));
  });
  $('.tasks').on('click', 'span', function(e) {
    e.stopPropagation();
    removeTodo($(this).parent());
  });
});

function addTodos(todos) {
  todos.forEach(function(todo) {
    addTodo(todo);
  });
}

function addTodo(todo) {
  var newTodo = $(
    '<li class="task">' + todo.name + '<span class="delete">X</span></li>'
  );
  newTodo.data('id', todo._id);
  newTodo.data('completed', todo.completed);

  if (todo.completed) {
    newTodo.addClass('done');
  }
  $('.tasks').append(newTodo);
}

function createTodo() {
  var userInput = $('#todoInput').val();
  $.post('/api/todos', { name: userInput })
    .then(function(newTodo) {
      addTodo(newTodo);
      $('#todoInput').val('');
    })
    .catch(function(err) {
      console.log(err);
    });
}

function removeTodo(todo) {
  var idToDelete = todo.data('id');
  var deleteUrl = 'api/todos/' + idToDelete;
  $.ajax({
    method: 'DELETE',
    url: deleteUrl
  })
    .then(function(data) {
      todo.remove();
    })
    .catch(function(err) {
      console.log(err);
    });
}

function updateTodo(todo) {
  var updateUrl = '/api/todos/' + todo.data('id');
  var isDone = !todo.data('completed');
  var updateData = { completed: isDone };
  $.ajax({
    method: 'PUT',
    url: updateUrl,
    data: updateData
  }).then(function(updatedTodo) {
    todo.toggleClass('done');
    todo.data('completed', isDone);
  });
}
