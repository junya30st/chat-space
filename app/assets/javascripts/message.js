$(function(){
    function buildHTML(message){
        var imagehtml = message.image ? `<image class="message__text__image" src=${message.image}>` : "" ;
        var html = `<div class="message">
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
        $('.input-box__text').val("");
        $('.chat').animate({ scrollTop: $('.chat')[0].scrollHeight});
      })
      .fail(function(){
        alert('error');
      });
      return false;
    });
});