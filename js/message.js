var APP_ID = 'OfubKUvrAcigGkqWtKv8xxgX-gzGzoHsz';
var APP_KEY = 'YFHwAulBQlpmYSU41HnFxTa7';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

var query = new AV.Query('Message')//获取并显示历史留言
query.find().then(function (messages) {
  let array = messages.map((item) => item.attributes)
  array.forEach((item) => {
    let li = document.createElement('li')
    li.innerText = `${item.name} : ${item.content}`
    let messageList = document.querySelector('#messageList')
    messageList.appendChild(li)
  })
})

let myForm = document.querySelector('#postMessageForm')

myForm.addEventListener('submit', function (e) {
  e.preventDefault()
  let content = myForm.querySelector('input[name=content]').value
  let name = myForm.querySelector('input[name=name]').value
  console.log(name)
  var Message = AV.Object.extend('Message')
  var message = new Message();// 在表中创建一条数据
  message.save({
    'name': name,
    'content': content   //数据内容是words：hello world，保存
  }).then(function (object) {  //如果保存成功，则运行 alert('')
    let li = document.createElement('li')
    li.innerText = `${object.attributes.name} : ${object.attributes.content}`
    let messageList = document.querySelector('#messageList')
    messageList.appendChild(li)
    myForm.querySelector('input[name=content]').value = ''

  })
})


// var TestObject = AV.Object.extend('TestObject');//创建一个TestObject表
// var testObject = new TestObject();// 在表中创建一条数据
// testObject.save({
//   words: 'Hello World!'   //数据内容是words：hello world，保存
// }).then(function(object) {  //如果保存成功，则运行 alert('')
//   alert('LeanCloud Rocks!');
// })