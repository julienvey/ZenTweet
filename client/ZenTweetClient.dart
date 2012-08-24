#library('ZenTweetClient');

#import('dart:html');
#import('dart:json');
#import('../shared/Domain.dart');

TweetInput tweetInput;
DivElement tweetButtonZone;
TweetCharsLeft tweetCharsLeft;
TweetButton tweetButton;
TweetConnection connection;

void main() {
   tweetInput =  new TweetInput(query("#tweetInput"));
   tweetButtonZone = query("#tweetButtonZone");
   DivElement tweetZone = query("#tweetZone");
   tweetButton = new TweetButton(query("#tweetButton"));
   tweetCharsLeft = new TweetCharsLeft(query("#tweetCharsLeft"));

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

class TweetInput extends View<TextAreaElement> {
  TweetInput(TextAreaElement element) : super(element);

  bind() {
    element.on.focus.add((e) {
      element.placeholder = "";
      element.rows = 3;
      tweetButtonZone.hidden = false;
    });

    element.on.blur.add((e) {
      if(element.value.length == 0){
        element.placeholder = "Écrire un nouveau tweet...";
        element.rows = 1;
        element.value = "";
        tweetButtonZone.hidden = true;
      }
    });

    element.on.input.add((e) {
      _computeCharsLeft();
      _manageButtonVisibility();
    });
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
}

class TweetConnection {
  WebSocket webSocket;
  String url;

  TweetConnection(this.url) {
    _init();
  }

  send(String from, String message) {
    var encoded = JSON.stringify({'f': from, 'm': message});
    _sendEncodedMessage(encoded);
  }

  _receivedEncodedMessage(String encodedMessage) {
    Map message = JSON.parse(encodedMessage);
    if (message['f'] != null) {
      print("${message['m']} ${message['f']}");
    }
  }

  _sendEncodedMessage(String encodedMessage) {
    if (webSocket != null && webSocket.readyState == WebSocket.OPEN) {
      webSocket.send(encodedMessage);
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


