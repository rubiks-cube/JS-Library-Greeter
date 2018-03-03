(function(global, $){


    // "new" an object
    var Greeter = function(firstname, lastname, language){
        return new Greeter.init(firstname, lastname, language);
    }

    // hidden within the scope of IIFE & not directly accessible
    var supportedLanguages = ['en', 'es'];

    // informal greetings
    var greetings = {
        en: 'Hello',
        es: 'Hola'
    };
   
    // formal greetings
    var formalGreetings = {
        en: 'Regards',
        es: 'Saludos'
    };


    // logger messages
    var loggedMsgs = {
        en: 'Logged in',
        es: 'Inició sesión'
    };
    
    // prototype holds methods (to save memory)
    Greeter.prototype = {

        // 'this' refers to the calling object at execution time
        fullName: function (){
            return this.firstname + ' ' + this.lastname;
        },
        
        // check that it is a valid language
        validate: function(){
        // references the externally inaccessible 'supportedLanguages' within the closure
            if (supportedLanguages.indexOf(this.language) === -1) {
                throw 'Invalid language';
            }
        },


        // retrieve messages from object by referring to the properties using [] syntax
        greeting: function() {
            return greetings[this.language] + ' ' + this.firstname + '!';
        },

        formalGreeting: function(){
            return formalGreetings[this.language] + ', ' + this.fullName(); 
        },
       
        // chainable methods return their own containing object
        greet: function(formal){
            var msg;
            // if undefined or null it will be coerced to'false'
            if(formal) {
                msg = this.formalGreeting();
            } else {
                msg = this.greeting();
            }

            if(console){
                console.log(msg);
            }
           // 'this' refers to the calling object at the e3xecution time
           // makes the method chainable
            return this;
        },

        log: function(){
            if(console){
                console.log(loggedMsgs[this.language] + ':' + this.fullName());
            }
         // make chainable
            return this;
        },

        setLang: function (lang) {
            // set the language
            this.language = lang;
            //validate
            this.validate();
            // make chainable
            return this;
        },

        HtmlGreeting: function(selector, formal){
            if(!$){
                throw 'Jquery not loaded!!!';
            }
            if(!selector){
                throw 'No selector found!!';
            }
            var msg;
            // determin the message
            if(formal) {
                msg = this.formalGreeting();
            } else {
                msg = this.greeting();
            }
           
            // inject the message in choose place in the DOM
            $(selector).html(msg);
            // make chainable
            return this;
        }
    };
   
    // actual object is created here, allowing us to 'new' object without calling 'new'
    Greeter.init = function(firstname,  lastname, language){
        var self  =  this;
        self.firstname  = firstname ||  '';
        self.lastname   = lastname  || '';
        self.language  = language  || 'en';

        self.validate();
    }
    
    // For not having to use 'new' keyword
    Greeter.init.prototype = Greeter.prototype;

    // attach Greeter to global object, and provide shorthand 'G$'
    global.Greeter = global.G$ = Greeter;

}(window, jQuery));