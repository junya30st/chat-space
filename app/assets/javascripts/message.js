$(document).on('turbolinks:load', function() {
    function buildHTML(message){
        var imagehtml = message.image ? `<image class="message__text__image" src=${message.image}>` : "" ;
        var html = `<div class="message" data-id="${message.id}">
                      <div class="message__upper-info">
                        <div class="message__upper-info__user">
                          ${message.user_name}
                        </div>
                        <div class="message__upper-info__date">
                          ${message.date}
                        </div>
                      </div>
                      <div class="message__text">
                        <p class="message__text__content">
                          ${message.content}
                        </p>
                      </div>
                        ${imagehtml}
                    </div>`
        return html;
    };
    $('#new_message').on('submit', function(e){
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action');

      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })

      .done(function(data){
        var html = buildHTML(data);
        $('.chat').append(html);
        $('form')[0].reset();
        $('.chat').animate({ scrollTop: $('.chat')[0].scrollHeight},'fast');
      })

      .fail(function(){
        alert('error');
      });      
      return false;
    });

    var reloadMessages = function() {
      if (window.location.href.match(/\/groups\/\d+\/messages/)){
      //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
        let last_message_id = $(".message").last().data('id');

        $.ajax({
          url: 'api/messages',
          type: 'get',
          dataType: 'json',
          data: {id: last_message_id}
        })
        .done(function(messages) {

          var insertHTML = '';
          messages.forEach(function(message){
          insertHTML = buildHTML(message);
          $('.chat').append(insertHTML);
          $('.chat').animate({scrollTop: $('.chat')[0].scrollHeight},'fast');
          })
        })
        .fail(function() {
        });
    };
  };
  setInterval(reloadMessages, 3000);
});