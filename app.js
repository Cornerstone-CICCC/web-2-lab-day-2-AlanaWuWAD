$(function() {
    function getData(userId){
      console.log(userId)
      $.ajax({
        url:`https://dummyjson.com/users/${userId}`,
        type:'GET',
        
        success: function(response){
          $('.info__image').html(`
            <img src="${response.image}" />
            `)
          $('.info__content').html(`
            <h1>${response.firstName} ${response.lastName}</h1>
            <h3>Age: ${response.age}</h3>
            <h3>Email: ${response.email}</h3>
            <h3>Phone: ${response.phone}</h3>
            `)
          
          $('.posts').html(`
            <h3>${response.firstName}'s Posts</h3>
            `)
          $('.todos').html(`
            <h3>${response.firstName}'s To Dos</h3>
            `)

          getPost(userId) 
          $('.posts').off('click') //移除 $('.posts') 上已經綁定的所有 click 事件處理器。
          $('.posts').on('click',function(){
            console.log('click')
            $(this).children('ul').slideToggle()
          })     
          
          getTodo(userId)
          $('.todos').off('click')
          $('.todos').on('click',function(){
            $(this).children('ul').slideToggle()
          })  

        },
        error: function(err){
          console.error(err)
        }
      })
      
    }
    
    function getPost(userId){
      $.ajax({
        url:`https://dummyjson.com/users/${userId}/posts`,
        type:'GET',
        success: function(response){
          if(response.posts!=''){
            const postTitle = response.posts[0].title;
            const postBody = response.posts[0].body
  
            $('.posts').append(`
              <ul>
                <li>${postTitle}</li>
                <li>${postBody}</li>
              </ul>
              `)
          }else{
            $('.posts').append(`
              <ul>
              </ul>
              `)
          }
         
        },
        error: function(err){
          console.error(err)
        }
      })

    }

    function getTodo(userId){
      $.ajax({
        url:`https://dummyjson.com/users/${userId}/todos`,
        type:'GET',
        success: function(response){
          
          response.todos.forEach(todo => {
            console.log(todo.todo)
            $('.todos').append(`
              <ul>
                <li >${todo.todo}</li>
              </ul>
          `)
            
          });
        },
        error: function(err){
          console.error(err)
        }
      })
    }
    
    

    let userId = 1;
    getData(userId)
    $('header').children().first().on('click', function(){
      if(userId <= 1){
        userId = 1;
      }else{
        userId = userId - 1;
      }
      getData(userId)
    })
    $('header').children().first().next().on('click', function(){
      userId = userId + 1;
      getData(userId)
    })
   
})