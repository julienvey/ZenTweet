#library('ZenTweetClient');

#import('dart:html');
#import('dart:json');
#import('shared/Domain.dart');
#import('UiLibrary.dart');

TweetInput tweetInput;
DivElement tweetButtonZone;
TweetCharsLeft tweetCharsLeft;
TweetButton tweetButton;
TweetConnection connection;
TweetFeed tweetFeed;
AlertField alertField;

void main() {
   tweetInput =  new TweetInput(query("#tweetInput"));
   tweetButtonZone = query("#tweetButtonZone");
   DivElement tweetZone = query("#tweetZone");
   tweetButton = new TweetButton(query("#tweetButton"));
   tweetCharsLeft = new TweetCharsLeft(query("#tweetCharsLeft"));
   tweetFeed = new TweetFeed(query("#tweetFeed"));
   alertField = new AlertField(query("#alertFieldContainer"));
   
   connection = new TweetConnection("ws://127.0.0.1:1337/ws");
}

abstract class View<T extends Element> {
  final T element;

  View(this.element) {
    bind();
  }

  void bind() { }

  _setClass(String className){
    element.attributes["class"] = className;
  }
}

class AlertField extends View<DivElement> {
  AlertField(DivElement element) : super(element){
  }
  
  alert(String type, String text) {
    if(element.nodes.length > 0){
      element.nodes.clear();
    }
    DivElement alertFieldDiv = new Element.html("<div id='alertField' class='alert'><button type='button' class='close' data-dismiss='alert'>×</button><span id='alertFieldText'></span></div>");
    
    Element textField = alertFieldDiv.query("#alertFieldText");
    textField.innerHTML = text;
    switch(type){
      case 'SUCCESS' :
        alertFieldDiv.attributes['class'] = "alert alert-success fade in";
        break;
      case 'INFO' :
        alertFieldDiv.attributes['class'] = "alert alert-info fade in";
        break;
      case 'ERROR' :
        alertFieldDiv.attributes['class'] = "alert alert-error fade in";
        break;
      default :
        alertFieldDiv.attributes['class'] = "alert";
    }
    element.nodes.add(alertFieldDiv);
    window.setTimeout(() {
      alertFieldDiv.remove();      
    }, 3000);
  }
}

class TweetInput extends View<TextAreaElement> {
  TweetInput(TextAreaElement element) : super(element);

  bind() {
    element.on.focus.add((e) {
      element.placeholder = "";
      element.rows = 3;
      tweetButtonZone.hidden = false;
    });

    element.on.blur.add((e) {
      _manageBlur();
    });

    element.on.input.add((e) {
      _computeCharsLeft();
      _manageButtonVisibility();
    });
  }
  
  void _manageBlur() {
    if(element.value.length == 0){
      element.placeholder = "Écrire un nouveau tweet...";
      element.rows = 1;
      element.value = "";
      tweetButtonZone.hidden = true;
    }
  }
  
  reset() {
    element.value = "";
    _manageBlur();
    _computeCharsLeft();
    _manageButtonVisibility();
  }

  void _manageButtonVisibility() {
     if(element.value.length > 0 && element.value.length <= 140){
      tweetButton.enable();
    } else {
      tweetButton.disable();
    }
  }

  void _computeCharsLeft() {
    tweetCharsLeft.setCharsLeft(140 - element.value.length);
    if(element.value.length >= 130){
      tweetCharsLeft.superWarn();
    } else if(element.value.length >= 120){
      tweetCharsLeft.warn();
    } else {
      tweetCharsLeft.clear();
    }
  }
  
  String getTweetValue(){ 
    return element.value;
  }
}

class TweetCharsLeft extends View<SpanElement> {
  TweetCharsLeft(SpanElement element) : super(element);

  warn() {
    _setClass("warn");
  }

  superWarn() {
    _setClass("superwarn");
  }

  clear(){
    _setClass("");
  }

  _setClass(String className){
    element.attributes["class"] = className;
  }

  setCharsLeft(int charsLeft){
    element.innerHTML = "$charsLeft ";
  }
}

class TweetButton extends View<ButtonElement> {
  TweetButton(ButtonElement element) : super(element);

  enable(){
    _setClass("btn btn-info");
  }

  disable(){
    _setClass("btn disabled");
  }
  
  bind(){
    element.on.click.add((e) {
      // FIXME send the author name instead of constant string
      connection.sendTweet("Julien", tweetInput.getTweetValue());
      tweetInput.reset();
    });
  }
}

class TweetFeed extends View<DivElement> {
  TweetFeed(DivElement element) : super(element);
  
  setTweets(List<Tweet> tweets){
    element.nodes.clear();
    tweets.forEach((e) {
      element.nodes.add(new TweetPanel.fromTweet(e).asWidget());
    });
  }
}

class TweetConnection {
  WebSocket webSocket;
  String url;
  
  List<Tweet> _allTweets;

  TweetConnection(this.url) {
    _allTweets = new List();
    _init();
  }

  sendTweet(String from, String message) {
    var encoded = JSON.stringify([{'author': from, 'text': message}]);
    _sendEncodedMessage(encoded);
  }
  
  _receivedEncodedMessage(String encodedMessage) {
    List<Tweet> tweets = getTweetList(encodedMessage);
    List<Tweet> tweetsToFeed = new List();
    tweetsToFeed.addAll(tweets);
    tweetsToFeed.addAll(_allTweets);
    
    _allTweets = tweetsToFeed;
    
    tweetFeed.setTweets(_allTweets);
    
  }
  
  List<Tweet> getTweetList(String json) {
    List<Map> messages = JSON.parse(json);
    List<Tweet> tweets = new List();
    messages.forEach((e) {
        print("${e['author']} ${e['text']}");
        tweets.add(new Tweet.fromMap(e));
    });
    return tweets;
  }

  _sendEncodedMessage(String encodedMessage) {
    if (webSocket != null && webSocket.readyState == WebSocket.OPEN) {
      webSocket.send(encodedMessage);
      alertField.alert('SUCCESS', "Tweet envoyé avec succès");
    } else {
      print('WebSocket not connected, message $encodedMessage not sent');
    }
  }

  _init([int retrySeconds = 2]) {
    bool encounteredError = false;
    print("Connecting to Web socket");
    webSocket = new WebSocket(url);

    webSocket.on.open.add((e) {
      print('Connected');
    });

    webSocket.on.close.add((e) {
      print('web socket closed, retrying in $retrySeconds seconds');
      if (!encounteredError) {
        window.setTimeout(() => _init(retrySeconds*2), 1000*retrySeconds);
      }
      encounteredError = true;
    });

    webSocket.on.error.add((e) {
      print("Error connecting to ws");
      if (!encounteredError) {
        window.setTimeout(() => _init(retrySeconds*2), 1000*retrySeconds);
      }
      encounteredError = true;
    });

    webSocket.on.message.add((MessageEvent e) {
      print('received message ${e.data}');
      _receivedEncodedMessage(e.data);
    });
  }
}


