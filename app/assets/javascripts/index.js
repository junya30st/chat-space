$(document).on('turbolinks:load', function() { 
  var search_list = $("#user-search-result");
  var add_user = $(".chat-group-users");

  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`

    $(search_list).append(html)
  };

  function appendErrMsgToHTML(){
    var html =``
    $(search_list).append(html)
  };

  function appendMenber(id, name){
    var html = `<div class='chat-group-user clearfix js-chat-member id="chat-group-user-${id}"'>
                  <input name='group[user_ids][]' type='hidden' value='${id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn' data-user-id='${id}' data-user-name='${name}'>削除</div>
                </div>`
    $(add_user).append(html)
  }

  $('#user-search-field').on("keyup", function(){
    var input = $('#user-search-field').val();
    $.ajax({
      type: 'GET',
      url:'/users',
      data: {name: input},
      dataType: 'json'
    })
    .done(function(users){
      $('#user-search-result').empty();
      if (users.length !== 0){
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else{
        appendErrMsgToHTML("一致するユーザーはいません");
      }
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました');
    })
  })
  $(document).on("click",".chat-group-user__btn--add", function(e){
    e.preventDefault();
    var id = $(this).attr('data-user-id');
    var name = $(this).attr('data-user-name');
    appendMenber(id, name);
    $(this).parent().remove();
  })
  $(document).on("click",".chat-group-user__btn--remove.js-remove-btn", function(){
    console.log(this)
    $(this).parent().remove();
  })
})