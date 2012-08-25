#library('ZenTweetUi');

#import('../shared/Domain.dart');
#import('dart:html');

class TweetPanel {
  
  Element main;
  
  TweetPanel.fromTweet(Tweet t){
    String html = "<div class='well well-small'><div>${t.author}</div><div>${t.text}</div></div>";
    main = new Element.html(html);
  }
  
  Element asWidget(){
    return main;
  }
}
