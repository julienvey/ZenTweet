#library("domain");

class Tweet {
  String author;
  String text;

  Tweet(this.author, this.text);

  Tweet.fromMap(Map map){
    author = map['author'];
    text = map['text'];
  }
  
  Map mapify(){
    return {'author' : author, 'text': text};
  }
  
  
}
