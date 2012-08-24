#library("domain");

class Tweet {
  String author;
  String text;

  Tweet(this.author, this.text);

  Map mapify(){
    return {'author' : author, 'text': text};
  }
}
