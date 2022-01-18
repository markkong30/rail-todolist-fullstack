let toggle_complete = false;
let toggle_active = false;
let toggle_all = true;

const updateList = () => {
    indexTasks(function (response) {
      
        // Use .filter first then .map
//         var htmlString = response.filter(function(task) {
//           if (toggle_all) {
//               return true;
//           }
//           if (toggle_complete) {
//               return task.completed;
//           }
//           if (toggle_active) {
//               return !task.completed;
//           }
//         }).map(function(task) {
//             return "<div class='col-8 mb-3 p-2 border rounded task' data-id='" + task.id + "'> \
//                   " + task.content + "</div>" + "<div class='inline-block ml-4'><button class='btn btn-primary btn-sm remove' data-id='" + task.id + "'>Remove</button>" +
//                   "<input type='checkbox' class='border-radius ml-3 check' data-id='" + task.id + "' " + (task.completed ? 'checked' : '') + " />" +
//                   "</div>"
//                   ;
//         })
        
        if (toggle_all) {
            var htmlString = response.tasks.map(function(task) {
                return "<div class='col-8 mb-3 p-2 border rounded task' data-id='" + task.id + "'> \
                  " + task.content + "</div>" + "<div class='inline-block ml-4'><button class='btn btn-primary btn-sm remove' data-id='" + task.id + "'>Remove</button>" +
                  "<input type='checkbox' class='border-radius ml-3 check' data-id='" + task.id + "' " + (task.completed ? 'checked' : '') + " />" +
                  "</div>"
                  ;
              });
            } else if (toggle_complete) {
                var htmlString = response.tasks.filter(function(task) {
                    return task.completed
                }).map(function(task) {
                    return "<div class='col-8 mb-3 p-2 border rounded task' data-id='" + task.id + "'> \
                      " + task.content + "</div>" + "<div class='inline-block ml-4'><button class='btn btn-primary btn-sm remove' data-id='" + task.id + "'>Remove</button>" +
                      "<input type='checkbox' class='border-radius ml-3 check' data-id='" + task.id + "'checked />"
                      "</div>"
                      ;
                  });
            } else if (toggle_active) {
                var htmlString = response.tasks.filter(function(task) {
                    return !task.completed
                }).map(function(task) {
                    return "<div class='col-8 mb-3 p-2 border rounded task' data-id='" + task.id + "'> \
                      " + task.content + "</div>" + "<div class='inline-block ml-4'><button class='btn btn-primary btn-sm remove' data-id='" + task.id + "'>Remove</button>" +
                      "<input type='checkbox' class='border-radius ml-3 check' data-id='" + task.id + "' />"
                      "</div>"
                      ;
                  });
            }
            $("#tasks").html(htmlString);
        }
    );
}

$(document).on("turbolinks:load", function () {
    if ($('.static_pages.index').length > 0) {
      updateList();
    }
  });

  
  $(document).on('click', 'button.remove', function () {
      const id = $(this).data('id');

      deleteTask(id, function () {
          updateList();
      });
  });

  $(document).on('submit', '#addtask', function (e) {
    e.preventDefault();
    const content = $('#add_task_input').val();
  
    postTask(content, function () {
      updateList();
    });
    $('#add_task_input').val('');
  });

  $(document).on('change', '.check', function () {
      const id = $(this).data('id');
      const completed = $(this).prop('checked');

      if (completed) {
        markComplete(id, function () {
            updateList();
        });
      } else {
        markActive(id, function () {
            updateList();
        })
      }   
      
  })

$(document).on("click", "#toggleAll", function () {
    toggle_active = toggle_complete = false;
    toggle_all = true;
    updateList();
});

$(document).on("click", "#toggleComplete", function () {
    toggle_active = toggle_all = false;
    toggle_complete = true;
    updateList();
});

$(document).on("click", "#toggleActive", function () {
    toggle_all = toggle_complete = false;
    toggle_active = true;
    updateList();
});
