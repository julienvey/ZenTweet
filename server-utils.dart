#library('server-utils');

#import('dart:isolate');

// runs the callback on the event loop at the next opportunity
queue(callback()) {
  new Timer(0, (t) => callback());
}