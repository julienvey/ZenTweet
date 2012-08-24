#library('zenserver');

#import('dart:io');
#import('dart:json');
#import('shared/Domain.dart');

List<Tweet> tweets;

main() {
  tweets = new List();
  tweets.add(new Tweet("Julien", "Coucou"));
  tweets.add(new Tweet("Julien2", "Salut"));

  var script = new File(new Options().script);
  var directory = script.directorySync();
  _startHttpServer("${directory.path}/client", 1337);
}

_startHttpServer(String basePath, int port) {
  HttpServer server = new HttpServer();

  WebSocketHandler wsHandler = new WebSocketHandler();
  wsHandler.onOpen = new TweetFeedHandler().onOpen;

  server.defaultRequestHandler = new ServerDefaultRequestHandler(basePath).onRequest;
  server.addRequestHandler((req) => req.path == "/ws", wsHandler.onRequest);
  server.onError = (error) => print(error);
  server.listen('127.0.0.1', port);
  print('listening for connections on $port');
}

class TweetFeedHandler {

  Set<WebSocketConnection> connections;

  TweetFeedHandler() : connections = new Set<WebSocketConnection>();

  onOpen(WebSocketConnection conn) {
    print('new ws conn');
    connections.add(conn);

    List<String> tweetMapList = new List();
    tweets.forEach((e) {
      tweetMapList.add(e.mapify());
    });
    conn.send(JSON.stringify(tweetMapList));

    conn.onClosed = (int status, String reason) {
      print('conn is closed');
      connections.remove(conn);
    };

    conn.onMessage = (message) {
      print('new ws msg: $message');
      connections.forEach((connection) {
        if (conn != connection) {
          print('queued msg to be sent');
          queue(() => connection.send(message));
        }
      });
      time('send to isolate', () => log.log(message));
    };

    conn.onError = (e) {
      print("problem w/ conn");
      connections.remove(conn); // onClosed isn't being called ??
    };
  }
}

class ServerDefaultRequestHandler {
  final String basePath;

  ServerDefaultRequestHandler(this.basePath);

  onRequest(HttpRequest request, HttpResponse response) {
    final String path = request.path == '/' ? '/index.html' : request.path;
    final File file = new File('${basePath}${path}');
    file.exists().then((found) {
      if (found) {
        file.fullPath().then((String fullPath) {
          if (!fullPath.startsWith(basePath)) {
            _pageNotFound(response);
          } else {
            file.openInputStream().pipe(response.outputStream);
          }
        });
      } else {
        _pageNotFound(response);
      }
    });
  }

  _pageNotFound(HttpResponse response) {
    response.statusCode = HttpStatus.NOT_FOUND;
    response.outputStream.close();
  }
}

