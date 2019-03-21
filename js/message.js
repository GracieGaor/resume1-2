!function () {
  var view = document.querySelector('section.message')

  var model = {
    initAV: function () {
      var APP_ID = 'OfubKUvrAcigGkqWtKv8xxgX-gzGzoHsz'
      var APP_KEY = 'YFHwAulBQlpmYSU41HnFxTa7'
      AV.init({ appId: APP_ID, appKey: APP_KEY })
    },
    fetch: function () {
      var query = new AV.Query('Message')//获取并显示历史留言
      return query.find() //Promise对象
    },
    save: function (name, content) {
      var Message = AV.Object.extend('Message')
      var message = new Message();// 在表中创建一条数据
      return message.save({           //Promise对象
        'name': name,
        'content': content
      })
    }
  }

  var controller = {
    view: null,
    model: null,
    messageList: null,
    init: function (view, model) {
      this.view = view
      this.model = model
      this.messageList = view.querySelector('#messageList')
      this.form = view.querySelector('form')
      this.model.initAV()
      this.loadmessages()
      this.bindEvents()
    },
    loadmessages: function () {
      this.model.fetch().then
        ((messages) => {
          let array = messages.map((item) => item.attributes)
          array.forEach((item) => {
            let li = document.createElement('li')
            li.innerText = `${item.name} : ${item.content}`
            this.messageList.appendChild(li)
          })
        })
    },
    bindEvents: function () {
      this.form.addEventListener('submit', (e) => {
        e.preventDefault()
        this.saveMessage()
      })
    },
    saveMessage: function () {
      let myForm = this.form
      let content = myForm.querySelector('input[name=content]').value
      let name = myForm.querySelector('input[name=name]').value
      this.model.save(name, content).then(function (object) {
        let li = document.createElement('li')
        li.innerText = `${object.attributes.name} : ${object.attributes.content}`
        let messageList = document.querySelector('#messageList')
        messageList.appendChild(li)
        myForm.querySelector('input[name=content]').value = ''
      })
    }
  }
  controller.init(view, model)

}.call()

// // new构造函数
// function Human(options) {
//   this.name = options.name
//   this.city = options.city

// } // 构造函数结束

// Human.prototype.species = 'Human'
// Human.prototype.walk = function () { }
// Human.prototype.useTools = function () { }

// var human = new Human({ name: 'Frank', city: 'Hangzhou' })
// var human2 = new Human({ name: 'Jack', city: 'Hangzhou' })



