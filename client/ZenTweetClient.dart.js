function Isolate() {}
init();

var $$ = {};
var $ = Isolate.$isolateProperties;
$$.ExceptionImplementation = {"":
 ["_msg"],
 super: "Object",
 toString$0: function() {
  var t1 = this._msg;
  return t1 == null ? 'Exception' : 'Exception: ' + $.S(t1);
},
 is$Exception: true
};

$$.FutureImpl = {"":
 ["_completionListeners", "_exceptionHandlers", "_successListeners", "_exceptionHandled", "_stackTrace", "_exception", "_lib_value", "_isComplete"],
 super: "Object",
 _setException$2: function(exception, stackTrace) {
  if (exception == null)
    throw $.captureStackTrace($.IllegalArgumentException$(null));
  if (this._isComplete === true)
    throw $.captureStackTrace($.FutureAlreadyCompleteException$());
  this._exception = exception;
  this._stackTrace = stackTrace;
  this._complete$0();
},
 _setValue$1: function(value) {
  if (this._isComplete === true)
    throw $.captureStackTrace($.FutureAlreadyCompleteException$());
  this._lib_value = value;
  this._complete$0();
},
 _complete$0: function() {
  this._isComplete = true;
  try {
    if (!(this._exception == null))
      for (var t1 = $.iterator(this._exceptionHandlers); t1 .hasNext$0() === true;) {
        var handler = t1 .next$0();
        if ($.eqB(handler.call$1(this._exception), true)) {
          this._exceptionHandled = true;
          break;
        }
      }
    if (this.get$hasValue() === true)
      for (t1 = $.iterator(this._successListeners); t1 .hasNext$0() === true;) {
        var listener = t1 .next$0();
        listener.call$1(this.get$value());
      }
    else if (this._exceptionHandled !== true && $.gtB($.get$length(this._successListeners), 0))
      throw $.captureStackTrace(this._exception);
  }  finally {
    for (t1 = $.iterator(this._completionListeners); t1 .hasNext$0() === true;) {
      var listener0 = t1 .next$0();
      try {
        listener0 .call$1(this);
      }  catch (exception) {
        $.unwrapException(exception);
      }

    }
  }
},
 handleException$1: function(onException) {
  if (this._exceptionHandled === true)
    return;
  if (this._isComplete === true) {
    var t1 = this._exception;
    if (!(t1 == null))
      this._exceptionHandled = onException.call$1(t1);
  } else
    $.add$1(this._exceptionHandlers, onException);
},
 then$1: function(onSuccess) {
  if (this.get$hasValue() === true)
    onSuccess.call$1(this.get$value());
  else if (this.get$isComplete() !== true)
    $.add$1(this._successListeners, onSuccess);
  else if (this._exceptionHandled !== true)
    throw $.captureStackTrace(this._exception);
},
 get$hasValue: function() {
  return this.get$isComplete() === true && this._exception == null;
},
 get$isComplete: function() {
  return this._isComplete;
},
 get$stackTrace: function() {
  if (this.get$isComplete() !== true)
    throw $.captureStackTrace($.FutureNotCompleteException$());
  return this._stackTrace;
},
 get$value: function() {
  if (this.get$isComplete() !== true)
    throw $.captureStackTrace($.FutureNotCompleteException$());
  var t1 = this._exception;
  if (!(t1 == null))
    throw $.captureStackTrace(t1);
  return this._lib_value;
}
};

$$.CompleterImpl = {"":
 ["_futureImpl"],
 super: "Object",
 completeException$2: function(exception, stackTrace) {
  this._futureImpl._setException$2(exception, stackTrace);
},
 completeException$1: function(exception) {
  return this.completeException$2(exception,null)
},
 complete$1: function(value) {
  this._futureImpl._setValue$1(value);
},
 get$future: function() {
  return this._futureImpl;
}
};

$$.HashMapImplementation = {"":
 ["_numberOfDeleted", "_numberOfEntries", "_loadLimit", "_values", "_lib_keys?"],
 super: "Object",
 toString$0: function() {
  return $.Maps_mapToString(this);
},
 containsKey$1: function(key) {
  return !$.eqB(this._probeForLookup$1(key), -1);
},
 getValues$0: function() {
  var t1 = (({}));
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, (({E: 'V'})));
  t1 .i_1 = 0;
  this.forEach$1(new $.HashMapImplementation_getValues__(list, t1));
  return list;
},
 getKeys$0: function() {
  var t1 = (({}));
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, (({E: 'K'})));
  t1 .i_1 = 0;
  this.forEach$1(new $.HashMapImplementation_getKeys__(list, t1));
  return list;
},
 forEach$1: function(f) {
  var length$ = $.get$length(this._lib_keys);
  if (typeof length$ !== 'number')
    return this.forEach$1$bailout(1, f, length$);
  for (var i = 0; i < length$; ++i) {
    var key = $.index(this._lib_keys, i);
    if (!(key == null) && !(key === $.CTC10))
      f.call$2(key, $.index(this._values, i));
  }
},
 forEach$1$bailout: function(state, f, length$) {
  ;
  for (var i = 0; $.ltB(i, length$); ++i) {
    var key = $.index(this._lib_keys, i);
    if (!(key == null) && !(key === $.CTC10))
      f.call$2(key, $.index(this._values, i));
  }
},
 get$length: function() {
  return this._numberOfEntries;
},
 isEmpty$0: function() {
  return $.eq(this._numberOfEntries, 0);
},
 remove$1: function(key) {
  var index = this._probeForLookup$1(key);
  if ($.geB(index, 0)) {
    this._numberOfEntries = $.sub(this._numberOfEntries, 1);
    var value = $.index(this._values, index);
    $.indexSet(this._values, index, null);
    $.indexSet(this._lib_keys, index, $.CTC10);
    this._numberOfDeleted = $.add(this._numberOfDeleted, 1);
    return value;
  }
  return;
},
 operator$index$1: function(key) {
  var index = this._probeForLookup$1(key);
  if ($.ltB(index, 0))
    return;
  return $.index(this._values, index);
},
 operator$indexSet$2: function(key, value) {
  this._ensureCapacity$0();
  var index = this._probeForAdding$1(key);
  var t1 = this._lib_keys;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1 .constructor !== Array && !t1 .is$JavaScriptIndexingBehavior()))
    return this.operator$indexSet$2$bailout(1, key, value, index, t1);
  if (index !== (index | 0))
    throw $.iae(index);
  var t3 = t1 .length;
  if (index < 0 || index >= t3)
    throw $.ioore(index);
  if (!(t1[index] == null)) {
    if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1 .constructor !== Array && !t1 .is$JavaScriptIndexingBehavior()))
      return this.operator$indexSet$2$bailout(2, key, value, index, t1);
    t3 = t1 .length;
    if (index < 0 || index >= t3)
      throw $.ioore(index);
    var t4 = t1[index] === $.CTC10;
    t1 = t4;
  } else
    t1 = true;
  if (t1) {
    t1 = this._numberOfEntries;
    if (typeof t1 !== 'number')
      return this.operator$indexSet$2$bailout(3, key, value, t1, index);
    this._numberOfEntries = t1 + 1;
  }
  t1 = this._lib_keys;
  if (typeof t1 !== 'object' || t1 === null || (t1 .constructor !== Array || !!t1 .immutable$list) && !t1 .is$JavaScriptIndexingBehavior())
    return this.operator$indexSet$2$bailout(4, key, value, t1, index);
  t3 = t1 .length;
  if (index < 0 || index >= t3)
    throw $.ioore(index);
  t1[index] = key;
  t1 = this._values;
  if (typeof t1 !== 'object' || t1 === null || (t1 .constructor !== Array || !!t1 .immutable$list) && !t1 .is$JavaScriptIndexingBehavior())
    return this.operator$indexSet$2$bailout(5, value, t1, index, 0);
  var t5 = t1 .length;
  if (index < 0 || index >= t5)
    throw $.ioore(index);
  t1[index] = value;
},
 operator$indexSet$2$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var key = env0;
      var value = env1;
      index = env2;
      t1 = env3;
      break;
    case 2:
      key = env0;
      value = env1;
      index = env2;
      t1 = env3;
      break;
    case 3:
      key = env0;
      value = env1;
      t1 = env2;
      index = env3;
      break;
    case 4:
      key = env0;
      value = env1;
      t1 = env2;
      index = env3;
      break;
    case 5:
      value = env0;
      t1 = env1;
      index = env2;
      break;
  }
  switch (state) {
    case 0:
      this._ensureCapacity$0();
      var index = this._probeForAdding$1(key);
      var t1 = this._lib_keys;
    case 1:
      state = 0;
    case 2:
      if (state === 2 || state === 0 && !($.index(t1, index) == null))
        switch (state) {
          case 0:
            t1 = this._lib_keys;
          case 2:
            state = 0;
            var t3 = $.index(t1, index) === $.CTC10;
            t1 = t3;
        }
      else
        t1 = true;
    case 3:
      if (state === 3 || state === 0 && t1)
        switch (state) {
          case 0:
            t1 = this._numberOfEntries;
          case 3:
            state = 0;
            this._numberOfEntries = $.add(t1, 1);
        }
      t1 = this._lib_keys;
    case 4:
      state = 0;
      $.indexSet(t1, index, key);
      t1 = this._values;
    case 5:
      state = 0;
      $.indexSet(t1, index, value);
  }
},
 clear$0: function() {
  this._numberOfEntries = 0;
  this._numberOfDeleted = 0;
  var length$ = $.get$length(this._lib_keys);
  if (typeof length$ !== 'number')
    return this.clear$0$bailout(1, length$);
  for (var i = 0; i < length$; ++i) {
    $.indexSet(this._lib_keys, i, null);
    $.indexSet(this._values, i, null);
  }
},
 clear$0$bailout: function(state, length$) {
  ;
  for (var i = 0; $.ltB(i, length$); ++i) {
    $.indexSet(this._lib_keys, i, null);
    $.indexSet(this._values, i, null);
  }
},
 _grow$1: function(newCapacity) {
  var capacity = $.get$length(this._lib_keys);
  if (typeof capacity !== 'number')
    return this._grow$1$bailout(1, newCapacity, capacity, 0, 0);
  this._loadLimit = $.HashMapImplementation__computeLoadLimit(newCapacity);
  var oldKeys = this._lib_keys;
  if (typeof oldKeys !== 'string' && (typeof oldKeys !== 'object' || oldKeys === null || oldKeys.constructor !== Array && !oldKeys.is$JavaScriptIndexingBehavior()))
    return this._grow$1$bailout(2, newCapacity, oldKeys, capacity, 0);
  var oldValues = this._values;
  if (typeof oldValues !== 'string' && (typeof oldValues !== 'object' || oldValues === null || oldValues.constructor !== Array && !oldValues.is$JavaScriptIndexingBehavior()))
    return this._grow$1$bailout(3, newCapacity, oldKeys, oldValues, capacity);
  this._lib_keys = $.ListFactory_List(newCapacity);
  var t4 = $.ListFactory_List(newCapacity);
  $.setRuntimeTypeInfo(t4, (({E: 'V'})));
  this._values = t4;
  for (var i = 0; i < capacity; ++i) {
    var t1 = oldKeys.length;
    if (i < 0 || i >= t1)
      throw $.ioore(i);
    var key = oldKeys[i];
    if (key == null || key === $.CTC10)
      continue;
    t1 = oldValues.length;
    if (i < 0 || i >= t1)
      throw $.ioore(i);
    var value = oldValues[i];
    var newIndex = this._probeForAdding$1(key);
    $.indexSet(this._lib_keys, newIndex, key);
    $.indexSet(this._values, newIndex, value);
  }
  this._numberOfDeleted = 0;
},
 _grow$1$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var newCapacity = env0;
      capacity = env1;
      break;
    case 2:
      newCapacity = env0;
      oldKeys = env1;
      capacity = env2;
      break;
    case 3:
      newCapacity = env0;
      oldKeys = env1;
      oldValues = env2;
      capacity = env3;
      break;
  }
  switch (state) {
    case 0:
      var capacity = $.get$length(this._lib_keys);
    case 1:
      state = 0;
      this._loadLimit = $.HashMapImplementation__computeLoadLimit(newCapacity);
      var oldKeys = this._lib_keys;
    case 2:
      state = 0;
      var oldValues = this._values;
    case 3:
      state = 0;
      this._lib_keys = $.ListFactory_List(newCapacity);
      var t4 = $.ListFactory_List(newCapacity);
      $.setRuntimeTypeInfo(t4, (({E: 'V'})));
      this._values = t4;
      for (var i = 0; $.ltB(i, capacity); ++i) {
        var key = $.index(oldKeys, i);
        if (key == null || key === $.CTC10)
          continue;
        var value = $.index(oldValues, i);
        var newIndex = this._probeForAdding$1(key);
        $.indexSet(this._lib_keys, newIndex, key);
        $.indexSet(this._values, newIndex, value);
      }
      this._numberOfDeleted = 0;
  }
},
 _ensureCapacity$0: function() {
  var newNumberOfEntries = $.add(this._numberOfEntries, 1);
  if ($.geB(newNumberOfEntries, this._loadLimit)) {
    this._grow$1($.mul($.get$length(this._lib_keys), 2));
    return;
  }
  var numberOfFree = $.sub($.sub($.get$length(this._lib_keys), newNumberOfEntries), this._numberOfDeleted);
  if ($.gtB(this._numberOfDeleted, numberOfFree))
    this._grow$1($.get$length(this._lib_keys));
},
 _probeForLookup$1: function(key) {
  var hash = $.HashMapImplementation__firstProbe($.hashCode(key), $.get$length(this._lib_keys));
  for (var numberOfProbes = 1; true;) {
    var existingKey = $.index(this._lib_keys, hash);
    if (existingKey == null)
      return -1;
    if ($.eqB(existingKey, key))
      return hash;
    var numberOfProbes0 = numberOfProbes + 1;
    hash = $.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._lib_keys));
    numberOfProbes = numberOfProbes0;
  }
},
 _probeForAdding$1: function(key) {
  var hash = $.HashMapImplementation__firstProbe($.hashCode(key), $.get$length(this._lib_keys));
  if (hash !== (hash | 0))
    return this._probeForAdding$1$bailout(1, key, hash, 0, 0, 0);
  for (var numberOfProbes = 1, insertionIndex = -1; true;) {
    var t1 = this._lib_keys;
    if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1 .constructor !== Array && !t1 .is$JavaScriptIndexingBehavior()))
      return this._probeForAdding$1$bailout(2, key, hash, numberOfProbes, insertionIndex, t1);
    var t3 = t1 .length;
    if (hash < 0 || hash >= t3)
      throw $.ioore(hash);
    var existingKey = t1[hash];
    if (existingKey == null) {
      if (insertionIndex < 0)
        return hash;
      return insertionIndex;
    } else if ($.eqB(existingKey, key))
      return hash;
    else if (insertionIndex < 0 && $.CTC10 === existingKey)
      insertionIndex = hash;
    var numberOfProbes0 = numberOfProbes + 1;
    hash = $.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._lib_keys));
    if (hash !== (hash | 0))
      return this._probeForAdding$1$bailout(3, key, numberOfProbes0, insertionIndex, hash, 0);
    numberOfProbes = numberOfProbes0;
  }
},
 _probeForAdding$1$bailout: function(state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      var key = env0;
      hash = env1;
      break;
    case 2:
      key = env0;
      hash = env1;
      numberOfProbes = env2;
      insertionIndex = env3;
      t1 = env4;
      break;
    case 3:
      key = env0;
      numberOfProbes0 = env1;
      insertionIndex = env2;
      hash = env3;
      break;
  }
  switch (state) {
    case 0:
      var hash = $.HashMapImplementation__firstProbe($.hashCode(key), $.get$length(this._lib_keys));
    case 1:
      state = 0;
      var numberOfProbes = 1;
      var insertionIndex = -1;
    default:
      L0:
        while (true)
          switch (state) {
            case 0:
              if (!true)
                break L0;
              var t1 = this._lib_keys;
            case 2:
              state = 0;
              var existingKey = $.index(t1, hash);
              if (existingKey == null) {
                if ($.ltB(insertionIndex, 0))
                  return hash;
                return insertionIndex;
              } else if ($.eqB(existingKey, key))
                return hash;
              else if ($.ltB(insertionIndex, 0) && $.CTC10 === existingKey)
                insertionIndex = hash;
              var numberOfProbes0 = numberOfProbes + 1;
              hash = $.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._lib_keys));
            case 3:
              state = 0;
              numberOfProbes = numberOfProbes0;
          }
  }
},
 HashMapImplementation$0: function() {
  this._numberOfEntries = 0;
  this._numberOfDeleted = 0;
  this._loadLimit = $.HashMapImplementation__computeLoadLimit(8);
  this._lib_keys = $.ListFactory_List(8);
  var t1 = $.ListFactory_List(8);
  $.setRuntimeTypeInfo(t1, (({E: 'V'})));
  this._values = t1;
},
 is$Map: function() { return true; }
};

$$.HashSetImplementation = {"":
 ["_backingMap?"],
 super: "Object",
 toString$0: function() {
  return $.Collections_collectionToString(this);
},
 iterator$0: function() {
  var t1 = $.HashSetIterator$(this);
  $.setRuntimeTypeInfo(t1, (({E: 'E'})));
  return t1;
},
 get$length: function() {
  return $.get$length(this._backingMap);
},
 isEmpty$0: function() {
  return $.isEmpty(this._backingMap);
},
 filter$1: function(f) {
  var result = $.HashSetImplementation$();
  $.setRuntimeTypeInfo(result, (({E: 'E'})));
  $.forEach(this._backingMap, new $.HashSetImplementation_filter__(f, result));
  return result;
},
 forEach$1: function(f) {
  $.forEach(this._backingMap, new $.HashSetImplementation_forEach__(f));
},
 addAll$1: function(collection) {
  $.forEach(collection, new $.HashSetImplementation_addAll__(this));
},
 remove$1: function(value) {
  var t1 = this._backingMap;
  if (t1 .containsKey$1(value) !== true)
    return false;
  t1 .remove$1(value);
  return true;
},
 contains$1: function(value) {
  return this._backingMap.containsKey$1(value);
},
 add$1: function(value) {
  var t1 = this._backingMap;
  if (typeof t1 !== 'object' || t1 === null || (t1 .constructor !== Array || !!t1 .immutable$list) && !t1 .is$JavaScriptIndexingBehavior())
    return this.add$1$bailout(1, t1, value);
  if (value !== (value | 0))
    throw $.iae(value);
  var t3 = t1 .length;
  if (value < 0 || value >= t3)
    throw $.ioore(value);
  t1[value] = value;
},
 add$1$bailout: function(state, t1, value) {
  ;
  $.indexSet(t1, value, value);
},
 clear$0: function() {
  $.clear(this._backingMap);
},
 HashSetImplementation$0: function() {
  this._backingMap = $.HashMapImplementation$();
},
 is$Collection: function() { return true; }
};

$$.HashSetIterator = {"":
 ["_nextValidIndex", "_entries"],
 super: "Object",
 _advance$0: function() {
  var t1 = this._entries;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1 .constructor !== Array && !t1 .is$JavaScriptIndexingBehavior()))
    return this._advance$0$bailout(1, t1);
  var length$ = t1 .length;
  var entry = null;
  do {
    var t2 = this._nextValidIndex + 1;
    this._nextValidIndex = t2;
    if (t2 >= length$)
      break;
    t2 = this._nextValidIndex;
    if (t2 !== (t2 | 0))
      throw $.iae(t2);
    var t3 = t1 .length;
    if (t2 < 0 || t2 >= t3)
      throw $.ioore(t2);
    entry = t1[t2];
  } while (entry == null || entry === $.CTC10);
},
 _advance$0$bailout: function(state, t1) {
  ;
  var length$ = $.get$length(t1);
  var entry = null;
  do {
    var t2 = this._nextValidIndex + 1;
    this._nextValidIndex = t2;
    if ($.geB(t2, length$))
      break;
    entry = $.index(t1, this._nextValidIndex);
  } while (entry == null || entry === $.CTC10);
},
 next$0: function() {
  if (this.hasNext$0() !== true)
    throw $.captureStackTrace($.CTC2);
  var t1 = this._entries;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1 .constructor !== Array && !t1 .is$JavaScriptIndexingBehavior()))
    return this.next$0$bailout(1, t1);
  var t3 = this._nextValidIndex;
  if (t3 !== (t3 | 0))
    throw $.iae(t3);
  var t4 = t1 .length;
  if (t3 < 0 || t3 >= t4)
    throw $.ioore(t3);
  var res = t1[t3];
  this._advance$0();
  return res;
},
 next$0$bailout: function(state, t1) {
  ;
  var res = $.index(t1, this._nextValidIndex);
  this._advance$0();
  return res;
},
 hasNext$0: function() {
  var t1 = this._nextValidIndex;
  var t2 = this._entries;
  if (typeof t2 !== 'string' && (typeof t2 !== 'object' || t2 === null || t2 .constructor !== Array && !t2 .is$JavaScriptIndexingBehavior()))
    return this.hasNext$0$bailout(1, t1, t2);
  var t4 = t2 .length;
  if (t1 >= t4)
    return false;
  if (t1 !== (t1 | 0))
    throw $.iae(t1);
  if (t1 < 0 || t1 >= t4)
    throw $.ioore(t1);
  if (t2[t1] === $.CTC10)
    this._advance$0();
  return this._nextValidIndex < t2 .length;
},
 hasNext$0$bailout: function(state, t1, t2) {
  ;
  if ($.geB(t1, $.get$length(t2)))
    return false;
  if ($.index(t2, this._nextValidIndex) === $.CTC10)
    this._advance$0();
  return $.lt(this._nextValidIndex, $.get$length(t2));
},
 HashSetIterator$1: function(set_) {
  this._advance$0();
}
};

$$._DeletedKeySentinel = {"":
 [],
 super: "Object"
};

$$.KeyValuePair = {"":
 ["value=", "key?"],
 super: "Object"
};

$$.LinkedHashMapImplementation = {"":
 ["_map", "_lib_list"],
 super: "Object",
 toString$0: function() {
  return $.Maps_mapToString(this);
},
 clear$0: function() {
  $.clear(this._map);
  $.clear(this._lib_list);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 get$length: function() {
  return $.get$length(this._map);
},
 containsKey$1: function(key) {
  return this._map.containsKey$1(key);
},
 forEach$1: function(f) {
  $.forEach(this._lib_list, new $.LinkedHashMapImplementation_forEach__(f));
},
 getValues$0: function() {
  var t1 = (({}));
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, (({E: 'V'})));
  t1 .index_1 = 0;
  $.forEach(this._lib_list, new $.LinkedHashMapImplementation_getValues__(list, t1));
  return list;
},
 getKeys$0: function() {
  var t1 = (({}));
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, (({E: 'K'})));
  t1 .index_1 = 0;
  $.forEach(this._lib_list, new $.LinkedHashMapImplementation_getKeys__(list, t1));
  return list;
},
 remove$1: function(key) {
  var entry = this._map.remove$1(key);
  if (entry == null)
    return;
  entry.remove$0();
  return entry.get$element().get$value();
},
 operator$index$1: function(key) {
  var entry = $.index(this._map, key);
  if (entry == null)
    return;
  return entry.get$element().get$value();
},
 operator$indexSet$2: function(key, value) {
  var t1 = this._map;
  if (typeof t1 !== 'object' || t1 === null || (t1 .constructor !== Array || !!t1 .immutable$list) && !t1 .is$JavaScriptIndexingBehavior())
    return this.operator$indexSet$2$bailout(1, key, value, t1);
  if (t1 .containsKey$1(key) === true) {
    if (key !== (key | 0))
      throw $.iae(key);
    var t2 = t1 .length;
    if (key < 0 || key >= t2)
      throw $.ioore(key);
    t1[key].get$element().set$value(value);
  } else {
    t2 = this._lib_list;
    $.addLast(t2, $.KeyValuePair$(key, value));
    t2 = t2 .lastEntry$0();
    if (key !== (key | 0))
      throw $.iae(key);
    var t3 = t1 .length;
    if (key < 0 || key >= t3)
      throw $.ioore(key);
    t1[key] = t2;
  }
},
 operator$indexSet$2$bailout: function(state, key, value, t1) {
  ;
  if (t1 .containsKey$1(key) === true)
    $.index(t1, key).get$element().set$value(value);
  else {
    var t2 = this._lib_list;
    $.addLast(t2, $.KeyValuePair$(key, value));
    $.indexSet(t1, key, t2 .lastEntry$0());
  }
},
 LinkedHashMapImplementation$0: function() {
  this._map = $.HashMapImplementation$();
  var t1 = $.DoubleLinkedQueue$();
  $.setRuntimeTypeInfo(t1, (({E: 'KeyValuePair<K, V>'})));
  this._lib_list = t1;
},
 is$Map: function() { return true; }
};

$$.DoubleLinkedQueueEntry = {"":
 ["_lib_element?", "_next=", "_previous="],
 super: "Object",
 get$element: function() {
  return this._lib_element;
},
 previousEntry$0: function() {
  return this._previous._asNonSentinelEntry$0();
},
 _asNonSentinelEntry$0: function() {
  return this;
},
 remove$0: function() {
  var t1 = this._next;
  this._previous.set$_next(t1);
  t1 = this._previous;
  this._next.set$_previous(t1);
  this._next = null;
  this._previous = null;
  return this._lib_element;
},
 prepend$1: function(e) {
  var t1 = $.DoubleLinkedQueueEntry$(e);
  $.setRuntimeTypeInfo(t1, (({E: 'E'})));
  t1 ._link$2(this._previous, this);
},
 _link$2: function(p, n) {
  this._next = n;
  this._previous = p;
  p.set$_next(this);
  n.set$_previous(this);
},
 DoubleLinkedQueueEntry$1: function(e) {
  this._lib_element = e;
}
};

$$._DoubleLinkedQueueEntrySentinel = {"":
 ["_lib_element", "_next", "_previous"],
 super: "DoubleLinkedQueueEntry",
 get$element: function() {
  throw $.captureStackTrace($.CTC9);
},
 _asNonSentinelEntry$0: function() {
  return;
},
 remove$0: function() {
  throw $.captureStackTrace($.CTC9);
},
 _DoubleLinkedQueueEntrySentinel$0: function() {
  this._link$2(this, this);
}
};

$$.DoubleLinkedQueue = {"":
 ["_sentinel"],
 super: "Object",
 toString$0: function() {
  return $.Collections_collectionToString(this);
},
 iterator$0: function() {
  var t1 = $._DoubleLinkedQueueIterator$(this._sentinel);
  $.setRuntimeTypeInfo(t1, (({E: 'E'})));
  return t1;
},
 filter$1: function(f) {
  var other = $.DoubleLinkedQueue$();
  $.setRuntimeTypeInfo(other, (({E: 'E'})));
  var t1 = this._sentinel;
  var entry = t1 .get$_next();
  for (; !(entry == null ? t1 == null : entry === t1);) {
    var nextEntry = entry.get$_next();
    if (f.call$1(entry.get$_lib_element()) === true)
      other.addLast$1(entry.get$_lib_element());
    entry = nextEntry;
  }
  return other;
},
 forEach$1: function(f) {
  var t1 = this._sentinel;
  var entry = t1 .get$_next();
  for (; !(entry == null ? t1 == null : entry === t1);) {
    var nextEntry = entry.get$_next();
    f.call$1(entry.get$_lib_element());
    entry = nextEntry;
  }
},
 clear$0: function() {
  var t1 = this._sentinel;
  t1 .set$_next(t1);
  t1 .set$_previous(t1);
},
 isEmpty$0: function() {
  var t1 = this._sentinel;
  var t2 = t1 .get$_next();
  return t2 == null ? t1 == null : t2 === t1;
},
 get$length: function() {
  var t1 = (({}));
  t1 .counter_1 = 0;
  this.forEach$1(new $.DoubleLinkedQueue_length__(t1));
  return t1 .counter_1;
},
 lastEntry$0: function() {
  return this._sentinel.previousEntry$0();
},
 last$0: function() {
  return this._sentinel.get$_previous().get$element();
},
 first$0: function() {
  return this._sentinel.get$_next().get$element();
},
 get$first: function() { return new $.BoundClosure(this, 'first$0'); },
 removeFirst$0: function() {
  return this._sentinel.get$_next().remove$0();
},
 removeLast$0: function() {
  return this._sentinel.get$_previous().remove$0();
},
 addAll$1: function(collection) {
  for (var t1 = $.iterator(collection); t1 .hasNext$0() === true;)
    this.add$1(t1 .next$0());
},
 add$1: function(value) {
  this.addLast$1(value);
},
 addLast$1: function(value) {
  this._sentinel.prepend$1(value);
},
 DoubleLinkedQueue$0: function() {
  var t1 = $._DoubleLinkedQueueEntrySentinel$();
  $.setRuntimeTypeInfo(t1, (({E: 'E'})));
  this._sentinel = t1;
},
 is$Collection: function() { return true; }
};

$$._DoubleLinkedQueueIterator = {"":
 ["_currentEntry", "_sentinel"],
 super: "Object",
 next$0: function() {
  if (this.hasNext$0() !== true)
    throw $.captureStackTrace($.CTC2);
  this._currentEntry = this._currentEntry.get$_next();
  return this._currentEntry.get$element();
},
 hasNext$0: function() {
  var t1 = this._currentEntry.get$_next();
  var t2 = this._sentinel;
  return !(t1 == null ? t2 == null : t1 === t2);
},
 _DoubleLinkedQueueIterator$1: function(_sentinel) {
  this._currentEntry = this._sentinel;
}
};

$$.StringBufferImpl = {"":
 ["_lib_length", "_buffer"],
 super: "Object",
 toString$0: function() {
  if ($.get$length(this._buffer) === 0)
    return '';
  if ($.get$length(this._buffer) === 1)
    return $.index(this._buffer, 0);
  var result = $.StringBase_concatAll(this._buffer);
  $.clear(this._buffer);
  $.add$1(this._buffer, result);
  return result;
},
 clear$0: function() {
  var t1 = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(t1, (({E: 'String'})));
  this._buffer = t1;
  this._lib_length = 0;
  return this;
},
 addAll$1: function(objects) {
  for (var t1 = $.iterator(objects); t1 .hasNext$0() === true;)
    this.add$1(t1 .next$0());
  return this;
},
 add$1: function(obj) {
  var str = $.toString(obj);
  if (str == null || $.isEmpty(str) === true)
    return this;
  $.add$1(this._buffer, str);
  var t1 = this._lib_length;
  if (typeof t1 !== 'number')
    return this.add$1$bailout(1, str, t1);
  var t3 = $.get$length(str);
  if (typeof t3 !== 'number')
    return this.add$1$bailout(2, t1, t3);
  this._lib_length = t1 + t3;
  return this;
},
 add$1$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      str = env0;
      t1 = env1;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      var str = $.toString(obj);
      if (str == null || $.isEmpty(str) === true)
        return this;
      $.add$1(this._buffer, str);
      var t1 = this._lib_length;
    case 1:
      state = 0;
      var t3 = $.get$length(str);
    case 2:
      state = 0;
      this._lib_length = $.add(t1, t3);
      return this;
  }
},
 isEmpty$0: function() {
  return this._lib_length === 0;
},
 get$length: function() {
  return this._lib_length;
},
 StringBufferImpl$1: function(content$) {
  this.clear$0();
  this.add$1(content$);
}
};

$$.JSSyntaxRegExp = {"":
 ["ignoreCase?", "multiLine?", "pattern?"],
 super: "Object",
 allMatches$1: function(str) {
  $.checkString(str);
  return $._AllMatchesIterable$(this, str);
},
 hasMatch$1: function(str) {
  return $.regExpTest(this, $.checkString(str));
},
 firstMatch$1: function(str) {
  var m = $.regExpExec(this, $.checkString(str));
  if (m == null)
    return;
  var matchStart = $.regExpMatchStart(m);
  var matchEnd = $.add(matchStart, $.get$length($.index(m, 0)));
  return $.MatchImplementation$(this.pattern, str, matchStart, matchEnd, m);
},
 JSSyntaxRegExp$_globalVersionOf$1: function(other) {
  $.regExpAttachGlobalNative(this);
},
 is$JSSyntaxRegExp: true
};

$$.MatchImplementation = {"":
 ["_groups", "_end", "_start", "str", "pattern?"],
 super: "Object",
 operator$index$1: function(index) {
  return this.group$1(index);
},
 group$1: function(index) {
  return $.index(this._groups, index);
}
};

$$._AllMatchesIterable = {"":
 ["_str", "_re"],
 super: "Object",
 iterator$0: function() {
  return $._AllMatchesIterator$(this._re, this._str);
}
};

$$._AllMatchesIterator = {"":
 ["_done", "_next=", "_str", "_re"],
 super: "Object",
 hasNext$0: function() {
  if (this._done === true)
    return false;
  else if (!(this._next == null))
    return true;
  this._next = this._re.firstMatch$1(this._str);
  if (this._next == null) {
    this._done = true;
    return false;
  } else
    return true;
},
 next$0: function() {
  if (this.hasNext$0() !== true)
    throw $.captureStackTrace($.CTC2);
  var next = this._next;
  this._next = null;
  return next;
}
};

$$.ListIterator = {"":
 ["list", "i"],
 super: "Object",
 next$0: function() {
  if (this.hasNext$0() !== true)
    throw $.captureStackTrace($.NoMoreElementsException$());
  var value = ((this.list[this.i]));
  var t1 = this.i;
  if (typeof t1 !== 'number')
    return this.next$0$bailout(1, t1, value);
  this.i = t1 + 1;
  return value;
},
 next$0$bailout: function(state, t1, value) {
  ;
  this.i = $.add(t1, 1);
  return value;
},
 hasNext$0: function() {
  var t1 = this.i;
  if (typeof t1 !== 'number')
    return this.hasNext$0$bailout(1, t1);
  return t1 < ((this.list.length));
},
 hasNext$0$bailout: function(state, t1) {
  ;
  return $.lt(t1, ((this.list.length)));
}
};

$$.StackTrace = {"":
 ["stack"],
 super: "Object",
 toString$0: function() {
  var t1 = this.stack;
  return !(t1 == null) ? t1 : '';
}
};

$$.Closure = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Closure';
}
};

$$.ConstantMap = {"":
 ["_keys?", "_jsObject", "length?"],
 super: "Object",
 clear$0: function() {
  return this._throwImmutable$0();
},
 remove$1: function(key) {
  return this._throwImmutable$0();
},
 operator$indexSet$2: function(key, val) {
  return this._throwImmutable$0();
},
 _throwImmutable$0: function() {
  throw $.captureStackTrace($.CTC3);
},
 toString$0: function() {
  return $.Maps_mapToString(this);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 getValues$0: function() {
  var result = [];
  $.forEach(this._keys, new $.ConstantMap_getValues_anon(this, result));
  return result;
},
 getKeys$0: function() {
  return this._keys;
},
 forEach$1: function(f) {
  $.forEach(this._keys, new $.ConstantMap_forEach_anon(this, f));
},
 operator$index$1: function(key) {
  if (this.containsKey$1(key) !== true)
    return;
  return $.jsPropertyAccess(this._jsObject, key);
},
 containsKey$1: function(key) {
  if ($.eqB(key, '__proto__'))
    return false;
  return $.jsHasOwnProperty(this._jsObject, key);
},
 is$Map: function() { return true; }
};

$$.MetaInfo = {"":
 ["set?", "tags", "tag?"],
 super: "Object"
};

$$.StringMatch = {"":
 ["pattern?", "str", "_lib0_start"],
 super: "Object",
 group$1: function(group_) {
  if (!$.eqB(group_, 0))
    throw $.captureStackTrace($.IndexOutOfRangeException$(group_));
  return this.pattern;
},
 operator$index$1: function(g) {
  return this.group$1(g);
}
};

$$.Object = {"":
 [],
 super: "",
 toString$0: function() {
  return $.Primitives_objectToString(this);
}
};

$$.IndexOutOfRangeException = {"":
 ["_value"],
 super: "Object",
 toString$0: function() {
  return 'IndexOutOfRangeException: ' + $.S(this._value);
},
 is$Exception: true
};

$$.IllegalAccessException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Attempt to modify an immutable object';
},
 is$Exception: true
};

$$.NoSuchMethodException = {"":
 ["_existingArgumentNames", "_arguments", "_functionName", "_receiver"],
 super: "Object",
 toString$0: function() {
  var sb = $.StringBufferImpl$('');
  var t1 = this._arguments;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1 .constructor !== Array && !t1 .is$JavaScriptIndexingBehavior()))
    return this.toString$0$bailout(1, sb, t1);
  var i = 0;
  for (; i < t1 .length; ++i) {
    if (i > 0)
      sb.add$1(', ');
    var t2 = t1 .length;
    if (i < 0 || i >= t2)
      throw $.ioore(i);
    sb.add$1(t1[i]);
  }
  t1 = this._existingArgumentNames;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1 .constructor !== Array && !t1 .is$JavaScriptIndexingBehavior()))
    return this.toString$0$bailout(2, t1, sb);
  var actualParameters = sb.toString$0();
  sb = $.StringBufferImpl$('');
  for (i = 0; i < t1 .length; ++i) {
    if (i > 0)
      sb.add$1(', ');
    t2 = t1 .length;
    if (i < 0 || i >= t2)
      throw $.ioore(i);
    sb.add$1(t1[i]);
  }
  var formalParameters = sb.toString$0();
  t1 = this._functionName;
  return 'NoSuchMethodException: incorrect number of arguments passed to method named \'' + $.S(t1) + '\'\nReceiver: ' + $.S(this._receiver) + '\n' + 'Tried calling: ' + $.S(t1) + '(' + $.S(actualParameters) + ')\n' + 'Found: ' + $.S(t1) + '(' + $.S(formalParameters) + ')';
},
 toString$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      sb = env0;
      t1 = env1;
      break;
    case 2:
      t1 = env0;
      sb = env1;
      break;
  }
  switch (state) {
    case 0:
      var sb = $.StringBufferImpl$('');
      var t1 = this._arguments;
    case 1:
      state = 0;
      var i = 0;
      for (; $.ltB(i, $.get$length(t1)); ++i) {
        if (i > 0)
          sb.add$1(', ');
        sb.add$1($.index(t1, i));
      }
      t1 = this._existingArgumentNames;
    case 2:
      state = 0;
      if (t1 == null)
        return 'NoSuchMethodException : method not found: \'' + $.S(this._functionName) + '\'\n' + 'Receiver: ' + $.S(this._receiver) + '\n' + 'Arguments: [' + $.S(sb) + ']';
      else {
        var actualParameters = sb.toString$0();
        sb = $.StringBufferImpl$('');
        for (i = 0; $.ltB(i, $.get$length(t1)); ++i) {
          if (i > 0)
            sb.add$1(', ');
          sb.add$1($.index(t1, i));
        }
        var formalParameters = sb.toString$0();
        t1 = this._functionName;
        return 'NoSuchMethodException: incorrect number of arguments passed to method named \'' + $.S(t1) + '\'\nReceiver: ' + $.S(this._receiver) + '\n' + 'Tried calling: ' + $.S(t1) + '(' + $.S(actualParameters) + ')\n' + 'Found: ' + $.S(t1) + '(' + $.S(formalParameters) + ')';
      }
  }
},
 is$Exception: true
};

$$.ObjectNotClosureException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Object is not closure';
},
 is$Exception: true
};

$$.IllegalArgumentException = {"":
 ["_arg"],
 super: "Object",
 toString$0: function() {
  return 'Illegal argument(s): ' + $.S(this._arg);
},
 is$Exception: true
};

$$.StackOverflowException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Stack Overflow';
},
 is$Exception: true
};

$$.FormatException = {"":
 ["message?"],
 super: "Object",
 toString$0: function() {
  return 'FormatException: ' + $.S(this.message);
},
 is$Exception: true
};

$$.NullPointerException = {"":
 ["arguments", "functionName"],
 super: "Object",
 get$exceptionName: function() {
  return 'NullPointerException';
},
 toString$0: function() {
  var t1 = this.functionName;
  if (t1 == null)
    return this.get$exceptionName();
  else
    return $.S(this.get$exceptionName()) + ' : method: \'' + $.S(t1) + '\'\n' + 'Receiver: null\n' + 'Arguments: ' + $.S(this.arguments);
},
 is$Exception: true
};

$$.NoMoreElementsException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'NoMoreElementsException';
},
 is$Exception: true
};

$$.EmptyQueueException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'EmptyQueueException';
},
 is$Exception: true
};

$$.UnsupportedOperationException = {"":
 ["_message"],
 super: "Object",
 toString$0: function() {
  return 'UnsupportedOperationException: ' + $.S(this._message);
},
 is$Exception: true
};

$$.IllegalJSRegExpException = {"":
 ["_errmsg", "_pattern"],
 super: "Object",
 toString$0: function() {
  return 'IllegalJSRegExpException: \'' + $.S(this._pattern) + '\' \'' + $.S(this._errmsg) + '\'';
},
 is$Exception: true
};

$$.FutureNotCompleteException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Exception: future has not been completed';
},
 is$Exception: true
};

$$.FutureAlreadyCompleteException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Exception: future already completed';
},
 is$Exception: true
};

$$.View = {"":
 ["element?"],
 super: "Object",
 _setClass$1: function(className) {
  $.indexSet(this.element.get$attributes(), 'class', className);
},
 bind$0: function() {
},
 View$1: function(element) {
  this.bind$0();
}
};

$$.AlertField = {"":
 ["element"],
 super: "View",
 alert$2: function(type, text) {
  var t1 = this.element;
  t1 .set$hidden(false);
  t1 .set$innerHTML(text);
  switch (type) {
    case 'SUCCESS':
      $.indexSet(t1 .get$attributes(), 'class', 'alert alert-success');
      break;
    case 'INFO':
      $.indexSet(t1 .get$attributes(), 'class', 'alert alert-info');
      break;
    case 'ERROR':
      $.indexSet(t1 .get$attributes(), 'class', 'alert alert-error');
      break;
    default:
      $.indexSet(t1 .get$attributes(), 'class', 'alert');
  }
}
};

$$.TweetInput = {"":
 ["element"],
 super: "View",
 getTweetValue$0: function() {
  return this.element.get$value();
},
 _computeCharsLeft$0: function() {
  var t1 = $.tweetCharsLeft;
  var t2 = this.element;
  var t3 = $.get$length(t2 .get$value());
  if (typeof t3 !== 'number')
    throw $.iae(t3);
  t1 .setCharsLeft$1(140 - t3);
  if ($.geB($.get$length(t2 .get$value()), 130))
    $.tweetCharsLeft.superWarn$0();
  else if ($.geB($.get$length(t2 .get$value()), 120))
    $.tweetCharsLeft.warn$0();
  else
    $.clear($.tweetCharsLeft);
},
 _manageButtonVisibility$0: function() {
  var t1 = this.element;
  if ($.gtB($.get$length(t1 .get$value()), 0) && $.leB($.get$length(t1 .get$value()), 140))
    $.tweetButton.enable$0();
  else
    $.tweetButton.disable$0();
},
 reset$0: function() {
  this.element.set$value('');
  this._manageBlur$0();
  this._computeCharsLeft$0();
  this._manageButtonVisibility$0();
},
 _manageBlur$0: function() {
  var t1 = this.element;
  if ($.eqB($.get$length(t1 .get$value()), 0)) {
    t1 .set$placeholder('\xc9crire un nouveau tweet...');
    t1 .set$rows(1);
    t1 .set$value('');
    $.tweetButtonZone.set$hidden(true);
  }
},
 bind$0: function() {
  var t1 = this.element;
  $.add$1(t1 .get$on().get$focus(), new $.TweetInput_bind_anon(this));
  $.add$1(t1 .get$on().get$blur(), new $.TweetInput_bind_anon0(this));
  $.add$1(t1 .get$on().get$input(), new $.TweetInput_bind_anon1(this));
}
};

$$.TweetCharsLeft = {"":
 ["element"],
 super: "View",
 setCharsLeft$1: function(charsLeft) {
  var t1 = $.S(charsLeft) + ' ';
  this.element.set$innerHTML(t1);
},
 _setClass$1: function(className) {
  $.indexSet(this.element.get$attributes(), 'class', className);
},
 clear$0: function() {
  this._setClass$1('');
},
 superWarn$0: function() {
  this._setClass$1('superwarn');
},
 warn$0: function() {
  this._setClass$1('warn');
}
};

$$.TweetButton = {"":
 ["element"],
 super: "View",
 bind$0: function() {
  $.add$1(this.element.get$on().get$click(), new $.TweetButton_bind_anon());
},
 disable$0: function() {
  this._setClass$1('btn disabled');
},
 enable$0: function() {
  this._setClass$1('btn btn-info');
}
};

$$.TweetFeed = {"":
 ["element"],
 super: "View",
 setTweets$1: function(tweets) {
  $.forEach(tweets, new $.TweetFeed_setTweets_anon(this));
}
};

$$.TweetConnection = {"":
 ["url", "webSocket"],
 super: "Object",
 _init$1: function(retrySeconds) {
  var t1 = (({}));
  t1 .encounteredError_1 = false;
  $.print('Connecting to Web socket');
  this.webSocket = $._WebSocketFactoryProvider_WebSocket(this.url);
  $.add$1(this.webSocket.get$on().get$open(), new $.TweetConnection__init_anon());
  $.add$1(this.webSocket.get$on().get$close(), new $.TweetConnection__init_anon0(this, retrySeconds, t1));
  $.add$1(this.webSocket.get$on().get$error(), new $.TweetConnection__init_anon1(this, retrySeconds, t1));
  $.add$1(this.webSocket.get$on().get$message(), new $.TweetConnection__init_anon2(this));
},
 _init$0: function() {
  return this._init$1(2)
},
 _sendEncodedMessage$1: function(encodedMessage) {
  var t1 = this.webSocket;
  if (!(t1 == null) && $.eqB(t1 .get$readyState(), 1)) {
    this.webSocket.send$1(encodedMessage);
    $.alertField.alert$2('SUCCESS', 'Tweet envoy\xe9');
  } else
    $.print('WebSocket not connected, message ' + $.S(encodedMessage) + ' not sent');
},
 getTweetList$1: function(json) {
  var messages = $.JSON_parse(json);
  var tweets = $.ListFactory_List(null);
  $.forEach(messages, new $.TweetConnection_getTweetList_anon(tweets));
  return tweets;
},
 _receivedEncodedMessage$1: function(encodedMessage) {
  var tweets = this.getTweetList$1(encodedMessage);
  $.tweetFeed.setTweets$1(tweets);
},
 sendTweet$2: function(from, message) {
  this._sendEncodedMessage$1($.JSON_stringify($.makeLiteralMap(['author', from, 'text', message])));
},
 TweetConnection$1: function(url) {
  this._init$0();
}
};

$$._AbstractWorkerEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$error: function() {
  return this.operator$index$1('error');
}
};

$$._AudioContextEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$complete: function() {
  return this.operator$index$1('complete');
},
 complete$1: function(arg0) { return this.get$complete().call$1(arg0); }
};

$$._BatteryManagerEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._BodyElementEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl",
 get$message: function() {
  return this.operator$index$1('message');
},
 get$focus: function() {
  return this.operator$index$1('focus');
},
 get$error: function() {
  return this.operator$index$1('error');
},
 get$blur: function() {
  return this.operator$index$1('blur');
}
};

$$._DOMApplicationCacheEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$error: function() {
  return this.operator$index$1('error');
}
};

$$._DedicatedWorkerContextEventsImpl = {"":
 ["_ptr"],
 super: "_WorkerContextEventsImpl",
 get$message: function() {
  return this.operator$index$1('message');
}
};

$$._DocumentEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl",
 get$reset: function() {
  return this.operator$index$1('reset');
},
 reset$0: function() { return this.get$reset().call$0(); },
 get$input: function() {
  return this.operator$index$1('input');
},
 get$focus: function() {
  return this.operator$index$1('focus');
},
 get$error: function() {
  return this.operator$index$1('error');
},
 get$click: function() {
  return this.operator$index$1('click');
},
 get$blur: function() {
  return this.operator$index$1('blur');
}
};

$$.FilteredElementList = {"":
 ["_childNodes", "_node"],
 super: "Object",
 last$0: function() {
  return $.last(this.get$_filtered());
},
 indexOf$2: function(element, start) {
  return $.indexOf$2(this.get$_filtered(), element, start);
},
 getRange$2: function(start, rangeLength) {
  return $.getRange(this.get$_filtered(), start, rangeLength);
},
 iterator$0: function() {
  return $.iterator(this.get$_filtered());
},
 operator$index$1: function(index) {
  return $.index(this.get$_filtered(), index);
},
 get$length: function() {
  return $.get$length(this.get$_filtered());
},
 isEmpty$0: function() {
  return $.isEmpty(this.get$_filtered());
},
 filter$1: function(f) {
  return $.filter(this.get$_filtered(), f);
},
 removeLast$0: function() {
  var result = this.last$0();
  if (!(result == null))
    result.remove$0();
  return result;
},
 clear$0: function() {
  $.clear(this._childNodes);
},
 removeRange$2: function(start, rangeLength) {
  $.forEach($.getRange(this.get$_filtered(), start, rangeLength), new $.FilteredElementList_removeRange_anon());
},
 addLast$1: function(value) {
  this.add$1(value);
},
 addAll$1: function(collection) {
  $.forEach(collection, this.get$add());
},
 add$1: function(value) {
  $.add$1(this._childNodes, value);
},
 get$add: function() { return new $.BoundClosure0(this, 'add$1'); },
 set$length: function(newLength) {
  var len = $.get$length(this);
  if ($.geB(newLength, len))
    return;
  else if ($.ltB(newLength, 0))
    throw $.captureStackTrace($.CTC8);
  this.removeRange$2($.sub(newLength, 1), $.sub(len, newLength));
},
 operator$indexSet$2: function(index, value) {
  this.operator$index$1(index).replaceWith$1(value);
},
 forEach$1: function(f) {
  $.forEach(this.get$_filtered(), f);
},
 get$first: function() {
  for (var t1 = $.iterator(this._childNodes); t1 .hasNext$0() === true;) {
    var t2 = t1 .next$0();
    if (typeof t2 === 'object' && t2 !== null && t2 .is$Element())
      return t2;
  }
  return;
},
 first$0: function() { return this.get$first().call$0(); },
 get$_filtered: function() {
  return $.ListFactory_List$from($.filter(this._childNodes, new $.FilteredElementList__filtered_anon()));
},
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._ChildrenElementList = {"":
 ["_childElements", "_element?"],
 super: "Object",
 last$0: function() {
  return this._element.get$$$dom_lastElementChild();
},
 removeLast$0: function() {
  var result = this.last$0();
  if (!(result == null))
    this._element.$dom_removeChild$1(result);
  return result;
},
 clear$0: function() {
  this._element.set$text('');
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 getRange$2: function(start, rangeLength) {
  return $._FrozenElementList$_wrap($._Lists_getRange(this, start, rangeLength, []));
},
 addAll$1: function(collection) {
  for (var t1 = $.iterator(collection), t2 = this._element; t1 .hasNext$0() === true;)
    t2 .$dom_appendChild$1(t1 .next$0());
},
 iterator$0: function() {
  return $.iterator(this._toList$0());
},
 addLast$1: function(value) {
  return this.add$1(value);
},
 add$1: function(value) {
  this._element.$dom_appendChild$1(value);
  return value;
},
 set$length: function(newLength) {
  throw $.captureStackTrace($.CTC7);
},
 operator$indexSet$2: function(index, value) {
  this._element.$dom_replaceChild$2(value, $.index(this._childElements, index));
},
 operator$index$1: function(index) {
  return $.index(this._childElements, index);
},
 get$length: function() {
  return $.get$length(this._childElements);
},
 isEmpty$0: function() {
  return this._element.get$$$dom_firstElementChild() == null;
},
 filter$1: function(f) {
  var output = [];
  this.forEach$1(new $._ChildrenElementList_filter_anon(f, output));
  return $._FrozenElementList$_wrap(output);
},
 forEach$1: function(f) {
  for (var t1 = $.iterator(this._childElements); t1 .hasNext$0() === true;)
    f.call$1(t1 .next$0());
},
 get$first: function() {
  return this._element.get$$$dom_firstElementChild();
},
 first$0: function() { return this.get$first().call$0(); },
 _toList$0: function() {
  var t1 = this._childElements;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1 .constructor !== Array && !t1 .is$JavaScriptIndexingBehavior()))
    return this._toList$0$bailout(1, t1);
  var output = $.ListFactory_List(t1 .length);
  for (var len = t1 .length, i = 0; i < len; ++i) {
    var t2 = t1 .length;
    if (i < 0 || i >= t2)
      throw $.ioore(i);
    var t3 = t1[i];
    var t4 = output.length;
    if (i < 0 || i >= t4)
      throw $.ioore(i);
    output[i] = t3;
  }
  return output;
},
 _toList$0$bailout: function(state, t1) {
  ;
  var output = $.ListFactory_List($.get$length(t1));
  for (var len = $.get$length(t1), i = 0; $.ltB(i, len); ++i) {
    var t2 = $.index(t1, i);
    var t3 = output.length;
    if (i < 0 || i >= t3)
      throw $.ioore(i);
    output[i] = t2;
  }
  return output;
},
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._FrozenElementList = {"":
 ["_nodeList"],
 super: "Object",
 last$0: function() {
  return $.last(this._nodeList);
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC7);
},
 clear$0: function() {
  throw $.captureStackTrace($.CTC7);
},
 indexOf$2: function(element, start) {
  return $.indexOf$2(this._nodeList, element, start);
},
 getRange$2: function(start, rangeLength) {
  return $._FrozenElementList$_wrap($.getRange(this._nodeList, start, rangeLength));
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC7);
},
 iterator$0: function() {
  return $._FrozenElementListIterator$(this);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC7);
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC7);
},
 set$length: function(newLength) {
  $.set$length(this._nodeList, newLength);
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.CTC7);
},
 operator$index$1: function(index) {
  return $.index(this._nodeList, index);
},
 get$length: function() {
  return $.get$length(this._nodeList);
},
 isEmpty$0: function() {
  return $.isEmpty(this._nodeList);
},
 filter$1: function(f) {
  var out = $._ElementList$([]);
  for (var t1 = this.iterator$0(); t1 .hasNext$0() === true;) {
    var t2 = t1 .next$0();
    if (f.call$1(t2) === true)
      out.add$1(t2);
  }
  return out;
},
 forEach$1: function(f) {
  for (var t1 = this.iterator$0(); t1 .hasNext$0() === true;)
    f.call$1(t1 .next$0());
},
 get$first: function() {
  return $.index(this._nodeList, 0);
},
 first$0: function() { return this.get$first().call$0(); },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._FrozenElementListIterator = {"":
 ["_index", "_list"],
 super: "Object",
 hasNext$0: function() {
  var t1 = this._index;
  if (typeof t1 !== 'number')
    return this.hasNext$0$bailout(1, t1, 0);
  var t3 = $.get$length(this._list);
  if (typeof t3 !== 'number')
    return this.hasNext$0$bailout(2, t1, t3);
  return t1 < t3;
},
 hasNext$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._index;
    case 1:
      state = 0;
      var t3 = $.get$length(this._list);
    case 2:
      state = 0;
      return $.lt(t1, t3);
  }
},
 next$0: function() {
  if (this.hasNext$0() !== true)
    throw $.captureStackTrace($.CTC2);
  var t1 = this._list;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1 .constructor !== Array && !t1 .is$JavaScriptIndexingBehavior()))
    return this.next$0$bailout(1, t1, 0);
  var t3 = this._index;
  if (typeof t3 !== 'number')
    return this.next$0$bailout(2, t1, t3);
  this._index = t3 + 1;
  if (t3 !== (t3 | 0))
    throw $.iae(t3);
  var t5 = t1 .length;
  if (t3 < 0 || t3 >= t5)
    throw $.ioore(t3);
  return t1[t3];
},
 next$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      if (this.hasNext$0() !== true)
        throw $.captureStackTrace($.CTC2);
      var t1 = this._list;
    case 1:
      state = 0;
      var t3 = this._index;
    case 2:
      state = 0;
      this._index = $.add(t3, 1);
      return $.index(t1, t3);
  }
}
};

$$._ElementList = {"":
 ["_list"],
 super: "_ListWrapper",
 getRange$2: function(start, rangeLength) {
  return $._ElementList$($._ListWrapper.prototype.getRange$2 .call(this, start, rangeLength));
},
 filter$1: function(f) {
  return $._ElementList$($._ListWrapper.prototype.filter$1 .call(this, f));
},
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._ElementAttributeMap = {"":
 ["_element?"],
 super: "Object",
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 get$length: function() {
  return $.get$length(this._element.get$$$dom_attributes());
},
 getValues$0: function() {
  var attributes = this._element.get$$$dom_attributes();
  if (typeof attributes !== 'string' && (typeof attributes !== 'object' || attributes === null || attributes.constructor !== Array && !attributes.is$JavaScriptIndexingBehavior()))
    return this.getValues$0$bailout(1, attributes);
  var values = $.ListFactory_List(attributes.length);
  $.setRuntimeTypeInfo(values, (({E: 'String'})));
  for (var len = attributes.length, i = 0; i < len; ++i) {
    var t1 = attributes.length;
    if (i < 0 || i >= t1)
      throw $.ioore(i);
    var t2 = attributes[i].get$value();
    var t3 = values.length;
    if (i < 0 || i >= t3)
      throw $.ioore(i);
    values[i] = t2;
  }
  return values;
},
 getValues$0$bailout: function(state, attributes) {
  ;
  var values = $.ListFactory_List($.get$length(attributes));
  $.setRuntimeTypeInfo(values, (({E: 'String'})));
  for (var len = $.get$length(attributes), i = 0; $.ltB(i, len); ++i) {
    var t1 = $.index(attributes, i).get$value();
    var t2 = values.length;
    if (i < 0 || i >= t2)
      throw $.ioore(i);
    values[i] = t1;
  }
  return values;
},
 getKeys$0: function() {
  var attributes = this._element.get$$$dom_attributes();
  if (typeof attributes !== 'string' && (typeof attributes !== 'object' || attributes === null || attributes.constructor !== Array && !attributes.is$JavaScriptIndexingBehavior()))
    return this.getKeys$0$bailout(1, attributes);
  var keys = $.ListFactory_List(attributes.length);
  $.setRuntimeTypeInfo(keys, (({E: 'String'})));
  for (var len = attributes.length, i = 0; i < len; ++i) {
    var t1 = attributes.length;
    if (i < 0 || i >= t1)
      throw $.ioore(i);
    var t2 = attributes[i].get$name();
    var t3 = keys.length;
    if (i < 0 || i >= t3)
      throw $.ioore(i);
    keys[i] = t2;
  }
  return keys;
},
 getKeys$0$bailout: function(state, attributes) {
  ;
  var keys = $.ListFactory_List($.get$length(attributes));
  $.setRuntimeTypeInfo(keys, (({E: 'String'})));
  for (var len = $.get$length(attributes), i = 0; $.ltB(i, len); ++i) {
    var t1 = $.index(attributes, i).get$name();
    var t2 = keys.length;
    if (i < 0 || i >= t2)
      throw $.ioore(i);
    keys[i] = t1;
  }
  return keys;
},
 forEach$1: function(f) {
  var attributes = this._element.get$$$dom_attributes();
  if (typeof attributes !== 'string' && (typeof attributes !== 'object' || attributes === null || attributes.constructor !== Array && !attributes.is$JavaScriptIndexingBehavior()))
    return this.forEach$1$bailout(1, f, attributes);
  for (var len = attributes.length, i = 0; i < len; ++i) {
    var t1 = attributes.length;
    if (i < 0 || i >= t1)
      throw $.ioore(i);
    var item = attributes[i];
    f.call$2(item.get$name(), item.get$value());
  }
},
 forEach$1$bailout: function(state, f, attributes) {
  ;
  for (var len = $.get$length(attributes), i = 0; $.ltB(i, len); ++i) {
    var item = $.index(attributes, i);
    f.call$2(item.get$name(), item.get$value());
  }
},
 clear$0: function() {
  var attributes = this._element.get$$$dom_attributes();
  if (typeof attributes !== 'string' && (typeof attributes !== 'object' || attributes === null || attributes.constructor !== Array && !attributes.is$JavaScriptIndexingBehavior()))
    return this.clear$0$bailout(1, attributes);
  for (var i = attributes.length - 1; i >= 0; --i) {
    var t1 = attributes.length;
    if (i < 0 || i >= t1)
      throw $.ioore(i);
    this.remove$1(attributes[i].get$name());
  }
},
 clear$0$bailout: function(state, attributes) {
  ;
  for (var i = $.sub($.get$length(attributes), 1); $.geB(i, 0); i = $.sub(i, 1))
    this.remove$1($.index(attributes, i).get$name());
},
 remove$1: function(key) {
  var t1 = this._element;
  var value = t1 .$dom_getAttribute$1(key);
  t1 .$dom_removeAttribute$1(key);
  return value;
},
 operator$indexSet$2: function(key, value) {
  this._element.$dom_setAttribute$2(key, $.S(value));
},
 operator$index$1: function(key) {
  return this._element.$dom_getAttribute$1(key);
},
 containsKey$1: function(key) {
  return this._element.$dom_hasAttribute$1(key);
},
 is$Map: function() { return true; }
};

$$._ElementEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$reset: function() {
  return this.operator$index$1('reset');
},
 reset$0: function() { return this.get$reset().call$0(); },
 get$input: function() {
  return this.operator$index$1('input');
},
 get$focus: function() {
  return this.operator$index$1('focus');
},
 get$error: function() {
  return this.operator$index$1('error');
},
 get$click: function() {
  return this.operator$index$1('click');
},
 get$blur: function() {
  return this.operator$index$1('blur');
}
};

$$._EventSourceEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$open: function() {
  return this.operator$index$1('open');
},
 get$message: function() {
  return this.operator$index$1('message');
},
 get$error: function() {
  return this.operator$index$1('error');
}
};

$$._EventsImpl = {"":
 ["_ptr"],
 super: "Object",
 operator$index$1: function(type) {
  return $._EventListenerListImpl$(this._ptr, type);
}
};

$$._EventListenerListImpl = {"":
 ["_type", "_ptr"],
 super: "Object",
 _remove$2: function(listener, useCapture) {
  this._ptr.$dom_removeEventListener$3(this._type, listener, useCapture);
},
 _add$2: function(listener, useCapture) {
  this._ptr.$dom_addEventListener$3(this._type, listener, useCapture);
},
 remove$2: function(listener, useCapture) {
  this._remove$2(listener, useCapture);
  return this;
},
 remove$1: function(listener) {
  return this.remove$2(listener,false)
},
 add$2: function(listener, useCapture) {
  this._add$2(listener, useCapture);
  return this;
},
 add$1: function(listener) {
  return this.add$2(listener,false)
}
};

$$._FileReaderEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$error: function() {
  return this.operator$index$1('error');
}
};

$$._FileWriterEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$error: function() {
  return this.operator$index$1('error');
}
};

$$._FrameSetElementEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl",
 get$message: function() {
  return this.operator$index$1('message');
},
 get$focus: function() {
  return this.operator$index$1('focus');
},
 get$error: function() {
  return this.operator$index$1('error');
},
 get$blur: function() {
  return this.operator$index$1('blur');
}
};

$$._IDBDatabaseEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$error: function() {
  return this.operator$index$1('error');
}
};

$$._IDBRequestEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$error: function() {
  return this.operator$index$1('error');
}
};

$$._IDBTransactionEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$error: function() {
  return this.operator$index$1('error');
},
 get$complete: function() {
  return this.operator$index$1('complete');
},
 complete$1: function(arg0) { return this.get$complete().call$1(arg0); }
};

$$._IDBVersionChangeRequestEventsImpl = {"":
 ["_ptr"],
 super: "_IDBRequestEventsImpl"
};

$$._InputElementEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl"
};

$$._JavaScriptAudioNodeEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._MediaElementEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl"
};

$$._MediaStreamEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._MediaStreamTrackEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._MediaStreamTrackListEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._MessagePortEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$message: function() {
  return this.operator$index$1('message');
}
};

$$._ChildNodeListLazy = {"":
 ["_this"],
 super: "Object",
 operator$index$1: function(index) {
  return $.index(this._this.get$$$dom_childNodes(), index);
},
 get$length: function() {
  return $.get$length(this._this.get$$$dom_childNodes());
},
 getRange$2: function(start, rangeLength) {
  return $._NodeListWrapper$($._Lists_getRange(this, start, rangeLength, []));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 filter$1: function(f) {
  return $._NodeListWrapper$($._Collections_filter(this, [], f));
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 iterator$0: function() {
  return $.iterator(this._this.get$$$dom_childNodes());
},
 operator$indexSet$2: function(index, value) {
  this._this.$dom_replaceChild$2(value, this.operator$index$1(index));
},
 clear$0: function() {
  this._this.set$text('');
},
 removeLast$0: function() {
  var result = this.last$0();
  if (!(result == null))
    this._this.$dom_removeChild$1(result);
  return result;
},
 addAll$1: function(collection) {
  for (var t1 = $.iterator(collection), t2 = this._this; t1 .hasNext$0() === true;)
    t2 .$dom_appendChild$1(t1 .next$0());
},
 addLast$1: function(value) {
  this._this.$dom_appendChild$1(value);
},
 add$1: function(value) {
  this._this.$dom_appendChild$1(value);
},
 last$0: function() {
return this._this.lastChild;
},
 get$first: function() {
return this._this.firstChild;
},
 first$0: function() { return this.get$first().call$0(); },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._ListWrapper = {"":
 [],
 super: "Object",
 get$first: function() {
  return $.index(this._list, 0);
},
 first$0: function() { return this.get$first().call$0(); },
 getRange$2: function(start, rangeLength) {
  return $.getRange(this._list, start, rangeLength);
},
 last$0: function() {
  return $.last(this._list);
},
 removeLast$0: function() {
  return $.removeLast(this._list);
},
 clear$0: function() {
  return $.clear(this._list);
},
 indexOf$2: function(element, start) {
  return $.indexOf$2(this._list, element, start);
},
 addAll$1: function(collection) {
  return $.addAll(this._list, collection);
},
 addLast$1: function(value) {
  return $.addLast(this._list, value);
},
 add$1: function(value) {
  return $.add$1(this._list, value);
},
 set$length: function(newLength) {
  $.set$length(this._list, newLength);
},
 operator$indexSet$2: function(index, value) {
  $.indexSet(this._list, index, value);
},
 operator$index$1: function(index) {
  return $.index(this._list, index);
},
 get$length: function() {
  return $.get$length(this._list);
},
 isEmpty$0: function() {
  return $.isEmpty(this._list);
},
 filter$1: function(f) {
  return $.filter(this._list, f);
},
 forEach$1: function(f) {
  return $.forEach(this._list, f);
},
 iterator$0: function() {
  return $.iterator(this._list);
},
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._NodeListWrapper = {"":
 ["_list"],
 super: "_ListWrapper",
 getRange$2: function(start, rangeLength) {
  return $._NodeListWrapper$($.getRange(this._list, start, rangeLength));
},
 filter$1: function(f) {
  return $._NodeListWrapper$($.filter(this._list, f));
},
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._NotificationEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$error: function() {
  return this.operator$index$1('error');
},
 get$close: function() {
  return this.operator$index$1('close');
},
 close$0: function() { return this.get$close().call$0(); },
 get$click: function() {
  return this.operator$index$1('click');
}
};

$$._PeerConnection00EventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$open: function() {
  return this.operator$index$1('open');
}
};

$$._SVGElementInstanceEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$reset: function() {
  return this.operator$index$1('reset');
},
 reset$0: function() { return this.get$reset().call$0(); },
 get$input: function() {
  return this.operator$index$1('input');
},
 get$focus: function() {
  return this.operator$index$1('focus');
},
 get$error: function() {
  return this.operator$index$1('error');
},
 get$click: function() {
  return this.operator$index$1('click');
},
 get$blur: function() {
  return this.operator$index$1('blur');
}
};

$$._SharedWorkerContextEventsImpl = {"":
 ["_ptr"],
 super: "_WorkerContextEventsImpl"
};

$$._SpeechRecognitionEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$error: function() {
  return this.operator$index$1('error');
}
};

$$._TextTrackEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._TextTrackCueEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._TextTrackListEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._WebSocketEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$open: function() {
  return this.operator$index$1('open');
},
 get$message: function() {
  return this.operator$index$1('message');
},
 get$error: function() {
  return this.operator$index$1('error');
},
 get$close: function() {
  return this.operator$index$1('close');
},
 close$0: function() { return this.get$close().call$0(); }
};

$$._WindowEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$reset: function() {
  return this.operator$index$1('reset');
},
 reset$0: function() { return this.get$reset().call$0(); },
 get$message: function() {
  return this.operator$index$1('message');
},
 get$input: function() {
  return this.operator$index$1('input');
},
 get$focus: function() {
  return this.operator$index$1('focus');
},
 get$error: function() {
  return this.operator$index$1('error');
},
 get$click: function() {
  return this.operator$index$1('click');
},
 get$blur: function() {
  return this.operator$index$1('blur');
}
};

$$._WorkerEventsImpl = {"":
 ["_ptr"],
 super: "_AbstractWorkerEventsImpl",
 get$message: function() {
  return this.operator$index$1('message');
}
};

$$._WorkerContextEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$error: function() {
  return this.operator$index$1('error');
}
};

$$._XMLHttpRequestEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$error: function() {
  return this.operator$index$1('error');
}
};

$$._XMLHttpRequestUploadEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$error: function() {
  return this.operator$index$1('error');
}
};

$$._DOMWindowCrossFrameImpl = {"":
 ["_window"],
 super: "Object",
 close$0: function() {
  return $._DOMWindowCrossFrameImpl__close(this._window);
},
 get$close: function() { return new $.BoundClosure(this, 'close$0'); },
 blur$0: function() {
  return $._DOMWindowCrossFrameImpl__blur(this._window);
},
 get$blur: function() { return new $.BoundClosure(this, 'blur$0'); },
 focus$0: function() {
  return $._DOMWindowCrossFrameImpl__focus(this._window);
},
 get$focus: function() { return new $.BoundClosure(this, 'focus$0'); }
};

$$._IDBOpenDBRequestEventsImpl = {"":
 ["_ptr"],
 super: "_IDBRequestEventsImpl"
};

$$._FixedSizeListIterator = {"":
 ["_length", "_pos", "_array"],
 super: "_VariableSizeListIterator",
 hasNext$0: function() {
  var t1 = this._length;
  if (typeof t1 !== 'number')
    return this.hasNext$0$bailout(1, t1, 0);
  var t3 = this._pos;
  if (typeof t3 !== 'number')
    return this.hasNext$0$bailout(2, t1, t3);
  return t1 > t3;
},
 hasNext$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._length;
    case 1:
      state = 0;
      var t3 = this._pos;
    case 2:
      state = 0;
      return $.gt(t1, t3);
  }
}
};

$$._VariableSizeListIterator = {"":
 [],
 super: "Object",
 next$0: function() {
  if (this.hasNext$0() !== true)
    throw $.captureStackTrace($.CTC2);
  var t1 = this._array;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1 .constructor !== Array && !t1 .is$JavaScriptIndexingBehavior()))
    return this.next$0$bailout(1, t1, 0);
  var t3 = this._pos;
  if (typeof t3 !== 'number')
    return this.next$0$bailout(2, t1, t3);
  this._pos = t3 + 1;
  if (t3 !== (t3 | 0))
    throw $.iae(t3);
  var t5 = t1 .length;
  if (t3 < 0 || t3 >= t5)
    throw $.ioore(t3);
  return t1[t3];
},
 next$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      if (this.hasNext$0() !== true)
        throw $.captureStackTrace($.CTC2);
      var t1 = this._array;
    case 1:
      state = 0;
      var t3 = this._pos;
    case 2:
      state = 0;
      this._pos = $.add(t3, 1);
      return $.index(t1, t3);
  }
},
 hasNext$0: function() {
  var t1 = $.get$length(this._array);
  if (typeof t1 !== 'number')
    return this.hasNext$0$bailout(1, t1, 0);
  var t3 = this._pos;
  if (typeof t3 !== 'number')
    return this.hasNext$0$bailout(2, t3, t1);
  return t1 > t3;
},
 hasNext$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t3 = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = $.get$length(this._array);
    case 1:
      state = 0;
      var t3 = this._pos;
    case 2:
      state = 0;
      return $.gt(t1, t3);
  }
}
};

$$._MessageTraverserVisitedMap = {"":
 [],
 super: "Object",
 cleanup$0: function() {
},
 reset$0: function() {
},
 operator$indexSet$2: function(object, info) {
},
 operator$index$1: function(object) {
  return;
}
};

$$._MessageTraverser = {"":
 [],
 super: "Object",
 _dispatch$1: function(x) {
  if ($._MessageTraverser_isPrimitive(x) === true)
    return this.visitPrimitive$1(x);
  if (typeof x === 'object' && x !== null && (x.constructor === Array || x.is$List()))
    return this.visitList$1(x);
  if (typeof x === 'object' && x !== null && x.is$Map())
    return this.visitMap$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$SendPort)
    return this.visitSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$SendPortSync)
    return this.visitSendPortSync$1(x);
  throw $.captureStackTrace('Message serialization: Illegal value ' + $.S(x) + ' passed');
},
 traverse$1: function(x) {
  if ($._MessageTraverser_isPrimitive(x) === true)
    return this.visitPrimitive$1(x);
  var t1 = this._visited;
  t1 .reset$0();
  var result = null;
  try {
    result = this._dispatch$1(x);
  }  finally {
    t1 .cleanup$0();
  }
  return result;
}
};

$$._Copier = {"":
 [],
 super: "_MessageTraverser",
 visitMap$1: function(map) {
  var t1 = (({}));
  var t2 = this._visited;
  t1 .copy_1 = $.index(t2, map);
  var t3 = t1 .copy_1;
  if (!(t3 == null))
    return t3;
  t1 .copy_1 = $.HashMapImplementation$();
  $.indexSet(t2, map, t1 .copy_1);
  $.forEach(map, new $._Copier_visitMap_anon(this, t1));
  return t1 .copy_1;
},
 visitList$1: function(list) {
  if (typeof list !== 'string' && (typeof list !== 'object' || list === null || list.constructor !== Array && !list.is$JavaScriptIndexingBehavior()))
    return this.visitList$1$bailout(1, list);
  var t1 = this._visited;
  var copy = t1 .operator$index$1(list);
  if (!(copy == null))
    return copy;
  var len = list.length;
  copy = $.ListFactory_List(len);
  t1 .operator$indexSet$2(list, copy);
  for (var i = 0; i < len; ++i) {
    t1 = list.length;
    if (i < 0 || i >= t1)
      throw $.ioore(i);
    var t2 = this._dispatch$1(list[i]);
    var t3 = copy.length;
    if (i < 0 || i >= t3)
      throw $.ioore(i);
    copy[i] = t2;
  }
  return copy;
},
 visitList$1$bailout: function(state, list) {
  ;
  var t1 = this._visited;
  var copy = $.index(t1, list);
  if (!(copy == null))
    return copy;
  var len = $.get$length(list);
  copy = $.ListFactory_List(len);
  $.indexSet(t1, list, copy);
  for (var i = 0; $.ltB(i, len); ++i) {
    t1 = this._dispatch$1($.index(list, i));
    var t2 = copy.length;
    if (i < 0 || i >= t2)
      throw $.ioore(i);
    copy[i] = t1;
  }
  return copy;
},
 visitPrimitive$1: function(x) {
  return x;
}
};

$$._Serializer = {"":
 [],
 super: "_MessageTraverser",
 _serializeList$1: function(list) {
  if (typeof list !== 'string' && (typeof list !== 'object' || list === null || list.constructor !== Array && !list.is$JavaScriptIndexingBehavior()))
    return this._serializeList$1$bailout(1, list);
  var len = list.length;
  var result = $.ListFactory_List(len);
  for (var i = 0; i < len; ++i) {
    var t1 = list.length;
    if (i < 0 || i >= t1)
      throw $.ioore(i);
    var t2 = this._dispatch$1(list[i]);
    var t3 = result.length;
    if (i < 0 || i >= t3)
      throw $.ioore(i);
    result[i] = t2;
  }
  return result;
},
 _serializeList$1$bailout: function(state, list) {
  ;
  var len = $.get$length(list);
  var result = $.ListFactory_List(len);
  for (var i = 0; $.ltB(i, len); ++i) {
    var t1 = this._dispatch$1($.index(list, i));
    var t2 = result.length;
    if (i < 0 || i >= t2)
      throw $.ioore(i);
    result[i] = t1;
  }
  return result;
},
 visitMap$1: function(map) {
  var t1 = this._visited;
  var copyId = $.index(t1, map);
  if (!(copyId == null))
    return ['ref', copyId];
  var id = this._nextFreeRefId;
  this._nextFreeRefId = id + 1;
  $.indexSet(t1, map, id);
  return ['map', id, this._serializeList$1(map.getKeys$0()), this._serializeList$1(map.getValues$0())];
},
 visitList$1: function(list) {
  var t1 = this._visited;
  var copyId = $.index(t1, list);
  if (!(copyId == null))
    return ['ref', copyId];
  var id = this._nextFreeRefId;
  this._nextFreeRefId = id + 1;
  $.indexSet(t1, list, id);
  return ['list', id, this._serializeList$1(list)];
},
 visitPrimitive$1: function(x) {
  return x;
}
};

$$._Deserializer = {"":
 [],
 super: "Object",
 _deserializeMap$1: function(x) {
  var result = $.HashMapImplementation$();
  var id = $.index(x, 1);
  $.indexSet(this._deserialized, id, result);
  var keys = $.index(x, 2);
  if (typeof keys !== 'string' && (typeof keys !== 'object' || keys === null || keys.constructor !== Array && !keys.is$JavaScriptIndexingBehavior()))
    return this._deserializeMap$1$bailout(1, x, result, keys);
  var values = $.index(x, 3);
  if (typeof values !== 'string' && (typeof values !== 'object' || values === null || values.constructor !== Array && !values.is$JavaScriptIndexingBehavior()))
    return this._deserializeMap$1$bailout(2, values, result, keys);
  var len = keys.length;
  for (var i = 0; i < len; ++i) {
    var t1 = keys.length;
    if (i < 0 || i >= t1)
      throw $.ioore(i);
    var key = this._deserializeHelper$1(keys[i]);
    var t2 = values.length;
    if (i < 0 || i >= t2)
      throw $.ioore(i);
    result.operator$indexSet$2(key, this._deserializeHelper$1(values[i]));
  }
  return result;
},
 _deserializeMap$1$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var x = env0;
      result = env1;
      keys = env2;
      break;
    case 2:
      values = env0;
      result = env1;
      keys = env2;
      break;
  }
  switch (state) {
    case 0:
      var result = $.HashMapImplementation$();
      var id = $.index(x, 1);
      $.indexSet(this._deserialized, id, result);
      var keys = $.index(x, 2);
    case 1:
      state = 0;
      var values = $.index(x, 3);
    case 2:
      state = 0;
      var len = $.get$length(keys);
      for (var i = 0; $.ltB(i, len); ++i)
        result.operator$indexSet$2(this._deserializeHelper$1($.index(keys, i)), this._deserializeHelper$1($.index(values, i)));
      return result;
  }
},
 _deserializeList$1: function(x) {
  var id = $.index(x, 1);
  var dartList = $.index(x, 2);
  if (typeof dartList !== 'object' || dartList === null || (dartList.constructor !== Array || !!dartList.immutable$list) && !dartList.is$JavaScriptIndexingBehavior())
    return this._deserializeList$1$bailout(1, dartList, id);
  $.indexSet(this._deserialized, id, dartList);
  var len = dartList.length;
  for (var i = 0; i < len; ++i) {
    var t1 = dartList.length;
    if (i < 0 || i >= t1)
      throw $.ioore(i);
    var t2 = this._deserializeHelper$1(dartList[i]);
    var t3 = dartList.length;
    if (i < 0 || i >= t3)
      throw $.ioore(i);
    dartList[i] = t2;
  }
  return dartList;
},
 _deserializeList$1$bailout: function(state, dartList, id) {
  ;
  $.indexSet(this._deserialized, id, dartList);
  var len = $.get$length(dartList);
  for (var i = 0; $.ltB(i, len); ++i)
    $.indexSet(dartList, i, this._deserializeHelper$1($.index(dartList, i)));
  return dartList;
},
 _deserializeRef$1: function(x) {
  var id = $.index(x, 1);
  return $.index(this._deserialized, id);
},
 _deserializeHelper$1: function(x) {
  if ($._Deserializer_isPrimitive(x) === true)
    return x;
  switch ($.index(x, 0)) {
    case 'ref':
      return this._deserializeRef$1(x);
    case 'list':
      return this._deserializeList$1(x);
    case 'map':
      return this._deserializeMap$1(x);
    case 'sendport':
      return this.deserializeSendPort$1(x);
    default:
      throw $.captureStackTrace('Unexpected serialized object');
  }
},
 deserialize$1: function(x) {
  if ($._Deserializer_isPrimitive(x) === true)
    return x;
  this._deserialized = $.HashMapImplementation$();
  return this._deserializeHelper$1(x);
}
};

$$._Manager = {"":
 ["managers?", "mainManager?", "isolates?", "supportsWorkers", "isWorker?", "fromCommandLine?", "topEventLoop?", "rootContext=", "currentContext=", "nextManagerId", "currentManagerId?", "nextIsolateId="],
 super: "Object",
 maybeCloseWorker$0: function() {
  if ($.isEmpty(this.isolates) === true)
    this.mainManager.postMessage$1($._serializeMessage($.makeLiteralMap(['command', 'close'])));
},
 _nativeInitWorkerMessageHandler$0: function() {
    $globalThis.onmessage = function (e) {
      _IsolateNatives._processWorkerMessage(this.mainManager, e);
    }
  
},
 _nativeDetectEnvironment$0: function() {
    this.isWorker = $isWorker;
    this.supportsWorkers = $supportsWorkers;
    this.fromCommandLine = typeof(window) == 'undefined';
  
},
 get$needSerialization: function() {
  return this.get$useWorkers();
},
 get$useWorkers: function() {
  return this.supportsWorkers;
},
 _Manager$0: function() {
  this._nativeDetectEnvironment$0();
  this.topEventLoop = $._EventLoop$();
  this.isolates = $.HashMapImplementation$();
  this.managers = $.HashMapImplementation$();
  if (this.isWorker === true) {
    this.mainManager = $._MainManagerStub$();
    this._nativeInitWorkerMessageHandler$0();
  }
}
};

$$._IsolateContext = {"":
 ["isolateStatics", "ports?", "id?"],
 super: "Object",
 unregister$1: function(portId) {
  var t1 = this.ports;
  t1 .remove$1(portId);
  if ($.isEmpty(t1) === true)
    $._globalState().get$isolates().remove$1(this.id);
},
 register$2: function(portId, port) {
  var t1 = this.ports;
  if (t1 .containsKey$1(portId) === true)
    throw $.captureStackTrace($.ExceptionImplementation$('Registry: ports must be registered only once.'));
  $.indexSet(t1, portId, port);
  $.indexSet($._globalState().get$isolates(), this.id, this);
},
 lookup$1: function(portId) {
  return $.index(this.ports, portId);
},
 _setGlobals$0: function() {
$setGlobals(this);
},
 eval$1: function(code) {
  var old = $._globalState().get$currentContext();
  $._globalState().set$currentContext(this);
  this._setGlobals$0();
  var result = null;
  try {
    result = code.call$0();
  }  finally {
    var t1 = old;
    $._globalState().set$currentContext(t1);
    t1 = old;
    if (!(t1 == null))
      t1 ._setGlobals$0();
  }
  return result;
},
 initGlobals$0: function() {
$initGlobals(this);
},
 _IsolateContext$0: function() {
  var t1 = $._globalState();
  var t2 = t1 .get$nextIsolateId();
  t1 .set$nextIsolateId($.add(t2, 1));
  this.id = t2;
  this.ports = $.HashMapImplementation$();
  this.initGlobals$0();
}
};

$$._EventLoop = {"":
 ["events"],
 super: "Object",
 run$0: function() {
  if ($._globalState().get$isWorker() !== true)
    this._runHelper$0();
  else
    try {
      this._runHelper$0();
    }  catch (exception) {
      var t1 = $.unwrapException(exception);
      var e = t1;
      var trace = $.getTraceFromException(exception);
      $._globalState().get$mainManager().postMessage$1($._serializeMessage($.makeLiteralMap(['command', 'error', 'msg', $.S(e) + '\n' + $.S(trace)])));
    }

},
 _runHelper$0: function() {
  if (!($._window() == null))
    new $._EventLoop__runHelper_next(this).call$0();
  else
    for (; this.runIteration$0() === true;)
      ;
},
 runIteration$0: function() {
  var event$ = this.dequeue$0();
  if (event$ == null) {
    if ($._globalState().get$isWorker() === true)
      $._globalState().maybeCloseWorker$0();
    else if (!($._globalState().get$rootContext() == null) && $._globalState().get$isolates().containsKey$1($._globalState().get$rootContext().get$id()) === true && $._globalState().get$fromCommandLine() === true && $.isEmpty($._globalState().get$rootContext().get$ports()) === true)
      throw $.captureStackTrace($.ExceptionImplementation$('Program exited with open ReceivePorts.'));
    return false;
  }
  event$.process$0();
  return true;
},
 dequeue$0: function() {
  var t1 = this.events;
  if ($.isEmpty(t1) === true)
    return;
  return t1 .removeFirst$0();
},
 enqueue$3: function(isolate, fn, msg) {
  $.addLast(this.events, $._IsolateEvent$(isolate, fn, msg));
}
};

$$._IsolateEvent = {"":
 ["message?", "fn", "isolate"],
 super: "Object",
 process$0: function() {
  this.isolate.eval$1(this.fn);
}
};

$$._MainManagerStub = {"":
 [],
 super: "Object",
 postMessage$1: function(msg) {
$globalThis.postMessage(msg);
},
 get$id: function() {
  return 0;
}
};

$$._JsSerializer = {"":
 ["_nextFreeRefId", "_visited"],
 super: "_Serializer",
 visitBufferingSendPort$1: function(port) {
  if (!(port.get$_port() == null))
    return this.visitSendPort$1(port.get$_port());
  else
    throw $.captureStackTrace('internal error: must call _waitForPendingPorts to ensure all ports are resolved at this point.');
},
 visitWorkerSendPort$1: function(port) {
  return ['sendport', port.get$_workerId(), port.get$_isolateId(), port.get$_receivePortId()];
},
 visitNativeJsSendPort$1: function(port) {
  return ['sendport', $._globalState().get$currentManagerId(), port.get$_isolateId(), port.get$_receivePort().get$_id()];
},
 visitSendPort$1: function(x) {
  if (typeof x === 'object' && x !== null && !!x.is$_NativeJsSendPort)
    return this.visitNativeJsSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_WorkerSendPort)
    return this.visitWorkerSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_BufferingSendPort)
    return this.visitBufferingSendPort$1(x);
  throw $.captureStackTrace('Illegal underlying port ' + $.S(x));
},
 _JsSerializer$0: function() {
  this._visited = $._JsVisitedMap$();
}
};

$$._JsCopier = {"":
 ["_visited"],
 super: "_Copier",
 visitBufferingSendPort$1: function(port) {
  if (!(port.get$_port() == null))
    return this.visitSendPort$1(port.get$_port());
  else
    throw $.captureStackTrace('internal error: must call _waitForPendingPorts to ensure all ports are resolved at this point.');
},
 visitWorkerSendPort$1: function(port) {
  return $._WorkerSendPort$(port.get$_workerId(), port.get$_isolateId(), port.get$_receivePortId());
},
 visitNativeJsSendPort$1: function(port) {
  return $._NativeJsSendPort$(port.get$_receivePort(), port.get$_isolateId());
},
 visitSendPort$1: function(x) {
  if (typeof x === 'object' && x !== null && !!x.is$_NativeJsSendPort)
    return this.visitNativeJsSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_WorkerSendPort)
    return this.visitWorkerSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_BufferingSendPort)
    return this.visitBufferingSendPort$1(x);
  throw $.captureStackTrace('Illegal underlying port ' + $.S(this.get$p()));
},
 _JsCopier$0: function() {
  this._visited = $._JsVisitedMap$();
}
};

$$._JsDeserializer = {"":
 ["_deserialized"],
 super: "_Deserializer",
 deserializeSendPort$1: function(x) {
  var managerId = $.index(x, 1);
  var isolateId = $.index(x, 2);
  var receivePortId = $.index(x, 3);
  if ($.eqB(managerId, $._globalState().get$currentManagerId())) {
    var isolate = $.index($._globalState().get$isolates(), isolateId);
    if (isolate == null)
      return;
    return $._NativeJsSendPort$(isolate.lookup$1(receivePortId), isolateId);
  } else
    return $._WorkerSendPort$(managerId, isolateId, receivePortId);
}
};

$$._JsVisitedMap = {"":
 ["tagged"],
 super: "Object",
 _getAttachedInfo$1: function(o) {
return o['__MessageTraverser__attached_info__'];
},
 _setAttachedInfo$2: function(o, info) {
o['__MessageTraverser__attached_info__'] = info;
},
 _clearAttachedInfo$1: function(o) {
o['__MessageTraverser__attached_info__'] = (void 0);
},
 cleanup$0: function() {
  var length$ = $.get$length(this.tagged);
  if (typeof length$ !== 'number')
    return this.cleanup$0$bailout(1, length$);
  var i = 0;
  for (; i < length$; ++i)
    this._clearAttachedInfo$1($.index(this.tagged, i));
  this.tagged = null;
},
 cleanup$0$bailout: function(state, length$) {
  ;
  var i = 0;
  for (; $.ltB(i, length$); ++i)
    this._clearAttachedInfo$1($.index(this.tagged, i));
  this.tagged = null;
},
 reset$0: function() {
  this.tagged = $.ListFactory_List(null);
},
 operator$indexSet$2: function(object, info) {
  $.add$1(this.tagged, object);
  this._setAttachedInfo$2(object, info);
},
 operator$index$1: function(object) {
  return this._getAttachedInfo$1(object);
}
};

$$._BaseSendPort = {"":
 ["_isolateId?"],
 super: "Object",
 call$1: function(message) {
  var completer = $.CompleterImpl$();
  var port = $._ReceivePortImpl$();
  this.send$2(message, port.toSendPort$0());
  port.receive$1(new $._BaseSendPort_call_anon(port, completer));
  return completer.get$future();
},
 _checkReplyTo$1: function(replyTo) {
  if (!(replyTo == null) && !(typeof replyTo === 'object' && replyTo !== null && !!replyTo.is$_NativeJsSendPort) && !(typeof replyTo === 'object' && replyTo !== null && !!replyTo.is$_WorkerSendPort) && !(typeof replyTo === 'object' && replyTo !== null && !!replyTo.is$_BufferingSendPort))
    throw $.captureStackTrace($.ExceptionImplementation$('SendPort.send: Illegal replyTo port type'));
},
 is$SendPort: true
};

$$._NativeJsSendPort = {"":
 ["_receivePort?", "_isolateId"],
 super: "_BaseSendPort",
 hashCode$0: function() {
  return this._receivePort.get$_id();
},
 operator$eq$1: function(other) {
  return typeof other === 'object' && other !== null && !!other.is$_NativeJsSendPort && $.eqB(this._receivePort, other._receivePort);
},
 send$2: function(message, replyTo) {
  $._waitForPendingPorts([message, replyTo], new $._NativeJsSendPort_send_anon(this, message, replyTo));
},
 send$1: function(message) {
  return this.send$2(message,null)
},
 is$_NativeJsSendPort: true,
 is$SendPort: true
};

$$._WorkerSendPort = {"":
 ["_receivePortId?", "_workerId?", "_isolateId"],
 super: "_BaseSendPort",
 hashCode$0: function() {
  return $.xor($.xor($.shl(this._workerId, 16), $.shl(this._isolateId, 8)), this._receivePortId);
},
 operator$eq$1: function(other) {
  if (typeof other === 'object' && other !== null && !!other.is$_WorkerSendPort)
    var t1 = $.eqB(this._workerId, other._workerId) && $.eqB(this._isolateId, other._isolateId) && $.eqB(this._receivePortId, other._receivePortId);
  else
    t1 = false;
  return t1;
},
 send$2: function(message, replyTo) {
  $._waitForPendingPorts([message, replyTo], new $._WorkerSendPort_send_anon(this, message, replyTo));
},
 send$1: function(message) {
  return this.send$2(message,null)
},
 is$_WorkerSendPort: true,
 is$SendPort: true
};

$$._ReceivePortImpl = {"":
 ["_callback?", "_id?"],
 super: "Object",
 toSendPort$0: function() {
  return $._NativeJsSendPort$(this, $._globalState().get$currentContext().get$id());
},
 close$0: function() {
  this._callback = null;
  $._globalState().get$currentContext().unregister$1(this._id);
},
 get$close: function() { return new $.BoundClosure(this, 'close$0'); },
 receive$1: function(onMessage) {
  this._callback = onMessage;
},
 _callback$2: function(arg0, arg1) { return this._callback.call$2(arg0, arg1); },
 _ReceivePortImpl$0: function() {
  $._globalState().get$currentContext().register$2(this._id, this);
}
};

$$._PendingSendPortFinder = {"":
 ["ports?", "_visited"],
 super: "_MessageTraverser",
 visitSendPort$1: function(port) {
  if (typeof port === 'object' && port !== null && !!port.is$_BufferingSendPort && port.get$_port() == null)
    $.add$1(this.ports, port.get$_futurePort());
},
 visitMap$1: function(map) {
  var t1 = this._visited;
  if (!($.index(t1, map) == null))
    return;
  $.indexSet(t1, map, true);
  $.forEach(map.getValues$0(), new $._PendingSendPortFinder_visitMap_anon(this));
},
 visitList$1: function(list) {
  var t1 = this._visited;
  if (!($.index(t1, list) == null))
    return;
  $.indexSet(t1, list, true);
  $.forEach(list, new $._PendingSendPortFinder_visitList_anon(this));
},
 visitPrimitive$1: function(x) {
},
 _PendingSendPortFinder$0: function() {
  this._visited = $._JsVisitedMap$();
}
};

$$._Timer = {"":
 ["_handle", "_once"],
 super: "Object",
 _Timer$repeating$2: function(milliSeconds, callback) {
  this._handle = $._window().setInterval$2(new $.anon0(this, callback), milliSeconds);
},
 _Timer$2: function(milliSeconds, callback) {
  this._handle = $._window().setTimeout$2(new $.anon(this, callback), milliSeconds);
}
};

$$._JsonParser = {"":
 ["position", "length?", "json"],
 super: "Object",
 _error$1: function(message) {
  throw $.captureStackTrace(message);
},
 _token$0: function() {
  for (var t1 = this.json; true;) {
    if ($.geB(this.position, $.get$length(this)))
      return;
    var char$ = $.charCodeAt(t1, this.position);
    var token = $.index($._JsonParser_tokens, char$);
    if (token === 32) {
      this.position = $.add(this.position, 1);
      continue;
    }
    if (token == null)
      return 0;
    return token;
  }
},
 _nextChar$0: function() {
  var t1 = this.position;
  if (typeof t1 !== 'number')
    return this._nextChar$0$bailout(1, t1, 0);
  this.position = t1 + 1;
  t1 = this.position;
  if (typeof t1 !== 'number')
    return this._nextChar$0$bailout(2, t1, 0);
  var t3 = $.get$length(this);
  if (typeof t3 !== 'number')
    return this._nextChar$0$bailout(3, t3, t1);
  if (t1 >= t3)
    return 0;
  return $.charCodeAt(this.json, this.position);
},
 _nextChar$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      break;
    case 3:
      t3 = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.position;
    case 1:
      state = 0;
      this.position = $.add(t1, 1);
      t1 = this.position;
    case 2:
      state = 0;
      var t3 = $.get$length(this);
    case 3:
      state = 0;
      if ($.geB(t1, t3))
        return 0;
      return $.charCodeAt(this.json, this.position);
  }
},
 _char$0: function() {
  var t1 = this.position;
  if (typeof t1 !== 'number')
    return this._char$0$bailout(1, t1, 0);
  var t3 = $.get$length(this);
  if (typeof t3 !== 'number')
    return this._char$0$bailout(2, t1, t3);
  if (t1 >= t3)
    this._error$1('Unexpected end of JSON stream');
  return $.charCodeAt(this.json, this.position);
},
 _char$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.position;
    case 1:
      state = 0;
      var t3 = $.get$length(this);
    case 2:
      state = 0;
      if ($.geB(t1, t3))
        this._error$1('Unexpected end of JSON stream');
      return $.charCodeAt(this.json, this.position);
  }
},
 _isToken$1: function(tokenKind) {
  var t1 = this._token$0();
  if (typeof t1 !== 'number')
    return this._isToken$1$bailout(1, tokenKind, t1);
  return t1 === tokenKind;
},
 _isToken$1$bailout: function(state, tokenKind, t1) {
  ;
  return $.eq(t1, tokenKind);
},
 _isDigit$1: function(char$) {
  if (typeof char$ !== 'number')
    return this._isDigit$1$bailout(1, char$);
  return char$ >= 48 && char$ <= 57;
},
 _isDigit$1$bailout: function(state, char$) {
  ;
  return $.geB(char$, 48) && $.leB(char$, 57);
},
 _parseNumber$0: function() {
  if (this._isToken$1(45) !== true)
    this._error$1('Expected number literal');
  var startPos = this.position;
  var char$ = this._char$0();
  if (char$ === 45)
    char$ = this._nextChar$0();
  if (char$ === 48)
    char$ = this._nextChar$0();
  else if (this._isDigit$1(char$) === true) {
    char$ = this._nextChar$0();
    for (; this._isDigit$1(char$) === true;)
      char$ = this._nextChar$0();
  } else
    this._error$1('Expected digit when parsing number');
  if (char$ === 46) {
    char$ = this._nextChar$0();
    if (this._isDigit$1(char$) === true) {
      char$ = this._nextChar$0();
      for (; this._isDigit$1(char$) === true;)
        char$ = this._nextChar$0();
      var isInt = false;
    } else {
      this._error$1('Expected digit following comma');
      isInt = true;
    }
  } else
    isInt = true;
  if (char$ === 101 || char$ === 69) {
    char$ = this._nextChar$0();
    if (char$ === 45 || char$ === 43)
      char$ = this._nextChar$0();
    if (this._isDigit$1(char$) === true) {
      char$ = this._nextChar$0();
      for (; this._isDigit$1(char$) === true;)
        char$ = this._nextChar$0();
      isInt = false;
    } else
      this._error$1('Expected digit following \'e\' or \'E\'');
  }
  var number = $.substring$2(this.json, startPos, this.position);
  if (isInt)
    return $.Math_parseInt(number);
  else
    return $.Math_parseDouble(number);
},
 _parseString$0: function() {
  if (this._isToken$1(34) !== true)
    this._error$1('Expected string literal');
  this.position = $.add(this.position, 1);
  var charCodes = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(charCodes, (({E: 'int'})));
  for (var t1 = this.json; true;) {
    var c = this._char$0();
    if ($.eqB(c, 34)) {
      this.position = $.add(this.position, 1);
      break;
    }
    if ($.eqB(c, 92)) {
      this.position = $.add(this.position, 1);
      if ($.eqB(this.position, $.get$length(this)))
        this._error$1('\\ at the end of input');
      switch (this._char$0()) {
        case 34:
          c = 34;
          break;
        case 92:
          c = 92;
          break;
        case 47:
          c = 47;
          break;
        case 98:
          c = 8;
          break;
        case 110:
          c = 10;
          break;
        case 114:
          c = 13;
          break;
        case 102:
          c = 12;
          break;
        case 116:
          c = 9;
          break;
        case 117:
          if ($.gtB($.add(this.position, 5), $.get$length(this)))
            this._error$1('Invalid unicode esacape sequence');
          var codeString = $.substring$2(t1, $.add(this.position, 1), $.add(this.position, 5));
          try {
            c = $.Math_parseInt('0x' + $.S(codeString));
          }  catch (exception) {
            $.unwrapException(exception);
            this._error$1('Invalid unicode esacape sequence');
          }

          this.position = $.add(this.position, 4);
          break;
        default:
          this._error$1('Invalid esacape sequence in string literal');
      }
    }
    charCodes.push(c);
    this.position = $.add(this.position, 1);
  }
  return $.Strings_String$fromCharCodes(charCodes);
},
 _parseList$0: function() {
  var list = [];
  this.position = $.add(this.position, 1);
  if (this._isToken$1(93) !== true) {
    for (; true;) {
      $.add$1(list, this._parseValue$0());
      if (this._isToken$1(44) !== true)
        break;
      this.position = $.add(this.position, 1);
    }
    if (this._isToken$1(93) !== true)
      this._error$1('Expected \']\' at end of list');
  }
  this.position = $.add(this.position, 1);
  return list;
},
 _parseObject$0: function() {
  var object = $.makeLiteralMap([]);
  if (typeof object !== 'object' || object === null || (object.constructor !== Array || !!object.immutable$list) && !object.is$JavaScriptIndexingBehavior())
    return this._parseObject$0$bailout(1, object);
  this.position = $.add(this.position, 1);
  if (this._isToken$1(125) !== true) {
    for (; true;) {
      var key = this._parseString$0();
      if (this._isToken$1(58) !== true)
        this._error$1('Expected \':\' when parsing object');
      this.position = $.add(this.position, 1);
      var t1 = this._parseValue$0();
      if (key !== (key | 0))
        throw $.iae(key);
      var t2 = object.length;
      if (key < 0 || key >= t2)
        throw $.ioore(key);
      object[key] = t1;
      if (this._isToken$1(44) !== true)
        break;
      this.position = $.add(this.position, 1);
    }
    if (this._isToken$1(125) !== true)
      this._error$1('Expected \'}\' at end of object');
  }
  this.position = $.add(this.position, 1);
  return object;
},
 _parseObject$0$bailout: function(state, object) {
  ;
  this.position = $.add(this.position, 1);
  if (this._isToken$1(125) !== true) {
    for (; true;) {
      var key = this._parseString$0();
      if (this._isToken$1(58) !== true)
        this._error$1('Expected \':\' when parsing object');
      this.position = $.add(this.position, 1);
      $.indexSet(object, key, this._parseValue$0());
      if (this._isToken$1(44) !== true)
        break;
      this.position = $.add(this.position, 1);
    }
    if (this._isToken$1(125) !== true)
      this._error$1('Expected \'}\' at end of object');
  }
  this.position = $.add(this.position, 1);
  return object;
},
 _expectKeyword$2: function(word, value) {
  for (var i = 0; i < word.length; ++i) {
    if (!$.eqB(this._char$0(), $.charCodeAt(word, i)))
      this._error$1('Expected keyword \'' + word + '\'');
    this.position = $.add(this.position, 1);
  }
  return value;
},
 _parseValue$0: function() {
  var token = this._token$0();
  if (token == null)
    this._error$1('Nothing to parse');
  switch (token) {
    case 34:
      return this._parseString$0();
    case 45:
      return this._parseNumber$0();
    case 110:
      return this._expectKeyword$2('null', null);
    case 102:
      return this._expectKeyword$2('false', false);
    case 116:
      return this._expectKeyword$2('true', true);
    case 123:
      return this._parseObject$0();
    case 91:
      return this._parseList$0();
    default:
      this._error$1('Unexpected token');
  }
},
 _parseToplevel$0: function() {
  var result = this._parseValue$0();
  if (!(this._token$0() == null))
    this._error$1('Junk at the end of JSON input');
  return result;
},
 _JsonParser$_internal$1: function(json) {
  if (!($._JsonParser_tokens == null))
    return;
  var t1 = $.ListFactory_List(126);
  $.setRuntimeTypeInfo(t1, (({E: 'int'})));
  $._JsonParser_tokens = t1;
  $.indexSet($._JsonParser_tokens, 9, 32);
  $.indexSet($._JsonParser_tokens, 10, 32);
  $.indexSet($._JsonParser_tokens, 13, 32);
  $.indexSet($._JsonParser_tokens, 32, 32);
  $.indexSet($._JsonParser_tokens, 48, 45);
  $.indexSet($._JsonParser_tokens, 49, 45);
  $.indexSet($._JsonParser_tokens, 50, 45);
  $.indexSet($._JsonParser_tokens, 51, 45);
  $.indexSet($._JsonParser_tokens, 52, 45);
  $.indexSet($._JsonParser_tokens, 53, 45);
  $.indexSet($._JsonParser_tokens, 54, 45);
  $.indexSet($._JsonParser_tokens, 55, 45);
  $.indexSet($._JsonParser_tokens, 56, 45);
  $.indexSet($._JsonParser_tokens, 57, 45);
  $.indexSet($._JsonParser_tokens, 45, 45);
  $.indexSet($._JsonParser_tokens, 123, 123);
  $.indexSet($._JsonParser_tokens, 125, 125);
  $.indexSet($._JsonParser_tokens, 91, 91);
  $.indexSet($._JsonParser_tokens, 93, 93);
  $.indexSet($._JsonParser_tokens, 34, 34);
  $.indexSet($._JsonParser_tokens, 58, 58);
  $.indexSet($._JsonParser_tokens, 44, 44);
  $.indexSet($._JsonParser_tokens, 110, 110);
  $.indexSet($._JsonParser_tokens, 116, 116);
  $.indexSet($._JsonParser_tokens, 102, 102);
}
};

$$.JsonUnsupportedObjectType = {"":
 [],
 super: "Object"
};

$$.JsonStringifier = {"":
 ["_seen", "_sb?"],
 super: "Object",
 _stringify$1: function(object) {
  var t1 = (({}));
  if (typeof object === 'number') {
    $.add$1(this._sb, $.JsonStringifier__numberToString(object));
    return;
  } else if (object === true) {
    $.add$1(this._sb, 'true');
    return;
  } else if (object === false) {
    $.add$1(this._sb, 'false');
    return;
  } else if (object == null) {
    $.add$1(this._sb, 'null');
    return;
  } else if (typeof object === 'string') {
    t1 = this._sb;
    $.add$1(t1, '"');
    $.JsonStringifier__escape(t1, object);
    $.add$1(t1, '"');
    return;
  } else if (typeof object === 'object' && object !== null && (object.constructor === Array || object.is$List())) {
    if (typeof object !== 'object' || object === null || object.constructor !== Array && !object.is$JavaScriptIndexingBehavior())
      return this._stringify$1$bailout(1, object, object);
    this._checkCycle$1(object);
    var t2 = this._sb;
    $.add$1(t2, '[');
    t1 = object.length;
    if (t1 > 0) {
      if (0 >= t1)
        throw $.ioore(0);
      this._stringify$1(object[0]);
      for (var i = 1; i < object.length; ++i) {
        $.add$1(t2, ',');
        t1 = object.length;
        if (i < 0 || i >= t1)
          throw $.ioore(i);
        this._stringify$1(object[i]);
      }
    }
    $.add$1(t2, ']');
    $.removeLast(this._seen);
    return;
  } else if (typeof object === 'object' && object !== null && object.is$Map()) {
    this._checkCycle$1(object);
    t2 = this._sb;
    $.add$1(t2, '{');
    t1 .first_1 = true;
    object.forEach$1(new $.JsonStringifier__stringify_anon(this, t1));
    $.add$1(t2, '}');
    $.removeLast(this._seen);
    return;
  } else
    throw $.captureStackTrace($.CTC12);
},
 _stringify$1$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      var object = env0;
      object = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = (({}));
    case 1:
      if (state === 0 && typeof object === 'number') {
        $.add$1(this._sb, $.JsonStringifier__numberToString(object));
        return;
      } else
        switch (state) {
          case 0:
          case 1:
            if (state === 0 && object === true) {
              $.add$1(this._sb, 'true');
              return;
            } else
              switch (state) {
                case 0:
                case 1:
                  if (state === 0 && object === false) {
                    $.add$1(this._sb, 'false');
                    return;
                  } else
                    switch (state) {
                      case 0:
                      case 1:
                        if (state === 0 && object == null) {
                          $.add$1(this._sb, 'null');
                          return;
                        } else
                          switch (state) {
                            case 0:
                            case 1:
                              if (state === 0 && typeof object === 'string') {
                                t1 = this._sb;
                                $.add$1(t1, '"');
                                $.JsonStringifier__escape(t1, object);
                                $.add$1(t1, '"');
                                return;
                              } else
                                switch (state) {
                                  case 0:
                                  case 1:
                                    if (state === 1 || state === 0 && typeof object === 'object' && object !== null && (object.constructor === Array || object.is$List()))
                                      switch (state) {
                                        case 0:
                                        case 1:
                                          state = 0;
                                          this._checkCycle$1(object);
                                          var t2 = this._sb;
                                          $.add$1(t2, '[');
                                          if ($.gtB($.get$length(object), 0)) {
                                            this._stringify$1($.index(object, 0));
                                            for (var i = 1; $.ltB(i, $.get$length(object)); ++i) {
                                              $.add$1(t2, ',');
                                              this._stringify$1($.index(object, i));
                                            }
                                          }
                                          $.add$1(t2, ']');
                                          $.removeLast(this._seen);
                                          return;
                                      }
                                    else if (typeof object === 'object' && object !== null && object.is$Map()) {
                                      this._checkCycle$1(object);
                                      t2 = this._sb;
                                      $.add$1(t2, '{');
                                      t1 .first_1 = true;
                                      object.forEach$1(new $.JsonStringifier__stringify_anon(this, t1));
                                      $.add$1(t2, '}');
                                      $.removeLast(this._seen);
                                      return;
                                    } else
                                      throw $.captureStackTrace($.CTC12);
                                }
                          }
                    }
              }
        }
  }
},
 _checkCycle$1: function(object) {
  for (var t1 = this._seen, i = 0; i < t1 .length; ++i) {
    var t2 = t1 .length;
    if (i < 0 || i >= t2)
      throw $.ioore(i);
    var t3 = t1[i];
    if (t3 == null ? object == null : t3 === object)
      throw $.captureStackTrace('Cyclic structure');
  }
  $.add$1(t1, object);
}
};

$$.Tweet = {"":
 ["text=", "author?"],
 super: "Object",
 Tweet$fromMap$1: function(map) {
  this.author = $.index(map, 'author');
  this.text = $.index(map, 'text');
}
};

$$.TweetPanel = {"":
 ["main"],
 super: "Object",
 asWidget$0: function() {
  return this.main;
},
 TweetPanel$fromTweet$1: function(t) {
  this.main = $._ElementFactoryProvider_Element$html('<div class=\'well well-small\'><div><strong>' + $.S(t.get$author()) + '</strong></div><div>' + $.S(t.get$text()) + '</div></div>');
}
};

$$.TweetConnection__init_anon = {"":
 [],
 super: "Closure",
 call$1: function(e) {
  $.print('Connected');
}
};

$$.TweetConnection__init_anon0 = {"":
 ["this_3", "retrySeconds_2", "box_0"],
 super: "Closure",
 call$1: function(e) {
  $.print('web socket closed, retrying in ' + $.S(this.retrySeconds_2) + ' seconds');
  if (this.box_0 .encounteredError_1 !== true) {
    var t1 = $.window();
    var t2 = new $.TweetConnection__init_anon4(this.this_3, this.retrySeconds_2);
    var t3 = this.retrySeconds_2;
    if (typeof t3 !== 'number')
      throw $.iae(t3);
    t1 .setTimeout$2(t2, 1000 * t3);
  }
  this.box_0 .encounteredError_1 = true;
}
};

$$.TweetConnection__init_anon4 = {"":
 ["this_5", "retrySeconds_4"],
 super: "Closure",
 call$0: function() {
  return this.this_5 ._init$1($.mul(this.retrySeconds_4, 2));
}
};

$$.TweetConnection__init_anon1 = {"":
 ["this_7", "retrySeconds_6", "box_0"],
 super: "Closure",
 call$1: function(e) {
  $.print('Error connecting to ws');
  if (this.box_0 .encounteredError_1 !== true) {
    var t1 = $.window();
    var t2 = new $.TweetConnection__init_anon3(this.this_7, this.retrySeconds_6);
    var t3 = this.retrySeconds_6;
    if (typeof t3 !== 'number')
      throw $.iae(t3);
    t1 .setTimeout$2(t2, 1000 * t3);
  }
  this.box_0 .encounteredError_1 = true;
}
};

$$.TweetConnection__init_anon3 = {"":
 ["this_9", "retrySeconds_8"],
 super: "Closure",
 call$0: function() {
  return this.this_9 ._init$1($.mul(this.retrySeconds_8, 2));
}
};

$$.TweetConnection__init_anon2 = {"":
 ["this_10"],
 super: "Closure",
 call$1: function(e) {
  $.print('received message ' + $.S(e.get$data()));
  this.this_10 ._receivedEncodedMessage$1(e.get$data());
}
};

$$.Maps__emitMap_anon = {"":
 ["result_3", "box_0", "visiting_2"],
 super: "Closure",
 call$2: function(k, v) {
  if (this.box_0 .first_1 !== true)
    $.add$1(this.result_3, ', ');
  this.box_0 .first_1 = false;
  $.Collections__emitObject(k, this.result_3, this.visiting_2);
  $.add$1(this.result_3, ': ');
  $.Collections__emitObject(v, this.result_3, this.visiting_2);
}
};

$$.ConstantMap_forEach_anon = {"":
 ["this_1", "f_0"],
 super: "Closure",
 call$1: function(key) {
  return this.f_0 .call$2(key, $.index(this.this_1, key));
}
};

$$.invokeClosure_anon = {"":
 ["closure_0"],
 super: "Closure",
 call$0: function() {
  return this.closure_0 .call$0();
}
};

$$.invokeClosure_anon0 = {"":
 ["closure_2", "arg1_1"],
 super: "Closure",
 call$0: function() {
  return this.closure_2 .call$1(this.arg1_1);
}
};

$$.invokeClosure_anon1 = {"":
 ["closure_5", "arg1_4", "arg2_3"],
 super: "Closure",
 call$0: function() {
  return this.closure_5 .call$2(this.arg1_4, this.arg2_3);
}
};

$$.TweetFeed_setTweets_anon = {"":
 ["this_0"],
 super: "Closure",
 call$1: function(e) {
  $.add$1(this.this_0 .get$element().get$nodes(), $.TweetPanel$fromTweet(e).asWidget$0());
}
};

$$.FilteredElementList__filtered_anon = {"":
 [],
 super: "Closure",
 call$1: function(n) {
  return typeof n === 'object' && n !== null && n.is$Element();
}
};

$$._ChildrenElementList_filter_anon = {"":
 ["f_1", "output_0"],
 super: "Closure",
 call$1: function(element) {
  if (this.f_1 .call$1(element) === true)
    $.add$1(this.output_0, element);
}
};

$$.FilteredElementList_removeRange_anon = {"":
 [],
 super: "Closure",
 call$1: function(el) {
  return el.remove$0();
}
};

$$.TweetConnection_getTweetList_anon = {"":
 ["tweets_0"],
 super: "Closure",
 call$1: function(e) {
  $.print($.S($.index(e, 'author')) + ' ' + $.S($.index(e, 'text')));
  $.add$1(this.tweets_0, $.Tweet$fromMap(e));
}
};

$$.DoubleLinkedQueue_length__ = {"":
 ["box_0"],
 super: "Closure",
 call$1: function(element) {
  var counter = $.add(this.box_0 .counter_1, 1);
  this.box_0 .counter_1 = counter;
}
};

$$.LinkedHashMapImplementation_forEach__ = {"":
 ["f_0"],
 super: "Closure",
 call$1: function(entry) {
  this.f_0 .call$2(entry.get$key(), entry.get$value());
}
};

$$.TweetInput_bind_anon = {"":
 ["this_0"],
 super: "Closure",
 call$1: function(e) {
  this.this_0 .get$element().set$placeholder('');
  this.this_0 .get$element().set$rows(3);
  $.tweetButtonZone.set$hidden(false);
}
};

$$.TweetInput_bind_anon0 = {"":
 ["this_1"],
 super: "Closure",
 call$1: function(e) {
  this.this_1 ._manageBlur$0();
}
};

$$.TweetInput_bind_anon1 = {"":
 ["this_2"],
 super: "Closure",
 call$1: function(e) {
  this.this_2 ._computeCharsLeft$0();
  this.this_2 ._manageButtonVisibility$0();
}
};

$$.TweetButton_bind_anon = {"":
 [],
 super: "Closure",
 call$1: function(e) {
  $.connection.sendTweet$2('Julien', $.tweetInput.getTweetValue$0());
  $.tweetInput.reset$0();
}
};

$$.JsonStringifier__stringify_anon = {"":
 ["this_2", "box_0"],
 super: "Closure",
 call$2: function(key, value) {
  var t1 = this.box_0 .first_1 !== true;
  var t2 = this.this_2;
  if (t1)
    $.add$1(t2 .get$_sb(), ',"');
  else
    $.add$1(t2 .get$_sb(), '"');
  $.JsonStringifier__escape(this.this_2 .get$_sb(), key);
  $.add$1(this.this_2 .get$_sb(), '":');
  this.this_2 ._stringify$1(value);
  this.box_0 .first_1 = false;
}
};

$$.HashSetImplementation_addAll__ = {"":
 ["this_0"],
 super: "Closure",
 call$1: function(value) {
  this.this_0 .add$1(value);
}
};

$$.HashSetImplementation_forEach__ = {"":
 ["f_0"],
 super: "Closure",
 call$2: function(key, value) {
  this.f_0 .call$1(key);
}
};

$$.HashSetImplementation_filter__ = {"":
 ["f_1", "result_0"],
 super: "Closure",
 call$2: function(key, value) {
  if (this.f_1 .call$1(key) === true)
    $.add$1(this.result_0, key);
}
};

$$.startRootIsolate_anon = {"":
 [],
 super: "Closure",
 call$0: function() {
  return $._setTimerFactoryClosure($._timerFactory);
}
};

$$._BaseSendPort_call_anon = {"":
 ["port_1", "completer_0"],
 super: "Closure",
 call$2: function(value, ignoreReplyTo) {
  this.port_1 .close$0();
  var t1 = typeof value === 'object' && value !== null && !!value.is$Exception;
  var t2 = this.completer_0;
  if (t1)
    t2 .completeException$1(value);
  else
    t2 .complete$1(value);
}
};

$$._WorkerSendPort_send_anon = {"":
 ["this_2", "message_1", "replyTo_0"],
 super: "Closure",
 call$0: function() {
  this.this_2 ._checkReplyTo$1(this.replyTo_0);
  var workerMessage = $._serializeMessage($.makeLiteralMap(['command', 'message', 'port', this.this_2, 'msg', this.message_1, 'replyTo', this.replyTo_0]));
  if ($._globalState().get$isWorker() === true)
    $._globalState().get$mainManager().postMessage$1(workerMessage);
  else
    $.index($._globalState().get$managers(), this.this_2 .get$_workerId()).postMessage$1(workerMessage);
}
};

$$._waitForPendingPorts_anon = {"":
 ["callback_0"],
 super: "Closure",
 call$1: function(_) {
  return this.callback_0 .call$0();
}
};

$$.Futures_wait_anon = {"":
 ["completer_5", "pos_4", "box_0", "result_3", "values_2"],
 super: "Closure",
 call$1: function(value) {
  $.indexSet(this.values_2, this.pos_4, value);
  var remaining = $.sub(this.box_0 .remaining_1, 1);
  this.box_0 .remaining_1 = remaining;
  if ($.eqB(remaining, 0) && this.result_3 .get$isComplete() !== true)
    this.completer_5 .complete$1(this.values_2);
}
};

$$.Futures_wait_anon0 = {"":
 ["future_8", "completer_7", "result_6"],
 super: "Closure",
 call$1: function(exception) {
  if (this.result_6 .get$isComplete() !== true)
    this.completer_7 .completeException$2(exception, this.future_8 .get$stackTrace());
  return true;
}
};

$$._PendingSendPortFinder_visitList_anon = {"":
 ["this_0"],
 super: "Closure",
 call$1: function(e) {
  return this.this_0 ._dispatch$1(e);
}
};

$$._PendingSendPortFinder_visitMap_anon = {"":
 ["this_0"],
 super: "Closure",
 call$1: function(e) {
  return this.this_0 ._dispatch$1(e);
}
};

$$._StorageImpl_getValues_anon = {"":
 ["values_0"],
 super: "Closure",
 call$2: function(k, v) {
  return $.add$1(this.values_0, v);
}
};

$$.ConstantMap_getValues_anon = {"":
 ["this_1", "result_0"],
 super: "Closure",
 call$1: function(key) {
  return $.add$1(this.result_0, $.index(this.this_1, key));
}
};

$$.LinkedHashMapImplementation_getValues__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 call$1: function(entry) {
  var t1 = this.list_2;
  var t2 = this.box_0 .index_1;
  var index = $.add(t2, 1);
  this.box_0 .index_1 = index;
  $.indexSet(t1, t2, entry.get$value());
}
};

$$.HashMapImplementation_getValues__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 call$2: function(key, value) {
  var t1 = this.list_2;
  var t2 = this.box_0 .i_1;
  var i = $.add(t2, 1);
  this.box_0 .i_1 = i;
  $.indexSet(t1, t2, value);
}
};

$$._NativeJsSendPort_send_anon = {"":
 ["this_5", "message_4", "replyTo_3"],
 super: "Closure",
 call$0: function() {
  var t1 = (({}));
  this.this_5 ._checkReplyTo$1(this.replyTo_3);
  var isolate = $.index($._globalState().get$isolates(), this.this_5 .get$_isolateId());
  if (isolate == null)
    return;
  if (this.this_5 .get$_receivePort().get$_callback() == null)
    return;
  var shouldSerialize = !($._globalState().get$currentContext() == null) && !$.eqB($._globalState().get$currentContext().get$id(), this.this_5 .get$_isolateId());
  t1 .msg_1 = this.message_4;
  t1 .reply_2 = this.replyTo_3;
  if (shouldSerialize) {
    t1 .msg_1 = $._serializeMessage(t1 .msg_1);
    t1 .reply_2 = $._serializeMessage(t1 .reply_2);
  }
  $._globalState().get$topEventLoop().enqueue$3(isolate, new $._NativeJsSendPort_send_anon0(this.this_5, t1, shouldSerialize), 'receive ' + $.S(this.message_4));
}
};

$$._NativeJsSendPort_send_anon0 = {"":
 ["this_7", "box_0", "shouldSerialize_6"],
 super: "Closure",
 call$0: function() {
  if (!(this.this_7 .get$_receivePort().get$_callback() == null)) {
    if (this.shouldSerialize_6 === true) {
      var msg = $._deserializeMessage(this.box_0 .msg_1);
      this.box_0 .msg_1 = msg;
      var reply = $._deserializeMessage(this.box_0 .reply_2);
      this.box_0 .reply_2 = reply;
    }
    var t1 = this.this_7 .get$_receivePort();
    var t2 = this.box_0;
    t1 ._callback$2(t2 .msg_1, t2 .reply_2);
  }
}
};

$$._StorageImpl_getKeys_anon = {"":
 ["keys_0"],
 super: "Closure",
 call$2: function(k, v) {
  return $.add$1(this.keys_0, k);
}
};

$$.LinkedHashMapImplementation_getKeys__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 call$1: function(entry) {
  var t1 = this.list_2;
  var t2 = this.box_0 .index_1;
  var index = $.add(t2, 1);
  this.box_0 .index_1 = index;
  $.indexSet(t1, t2, entry.get$key());
}
};

$$.HashMapImplementation_getKeys__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 call$2: function(key, value) {
  var t1 = this.list_2;
  var t2 = this.box_0 .i_1;
  var i = $.add(t2, 1);
  this.box_0 .i_1 = i;
  $.indexSet(t1, t2, key);
}
};

$$._Copier_visitMap_anon = {"":
 ["this_2", "box_0"],
 super: "Closure",
 call$2: function(key, val) {
  $.indexSet(this.box_0 .copy_1, this.this_2 ._dispatch$1(key), this.this_2 ._dispatch$1(val));
}
};

$$._EventLoop__runHelper_next = {"":
 ["this_0"],
 super: "Closure",
 call$0: function() {
  if (this.this_0 .runIteration$0() !== true)
    return;
  $._window().setTimeout$2(this, 0);
}
};

$$.anon = {"":
 ["this_1", "callback_0"],
 super: "Closure",
 call$0: function() {
  return this.callback_0 .call$1(this.this_1);
}
};

$$.anon0 = {"":
 ["this_1", "callback_0"],
 super: "Closure",
 call$0: function() {
  return this.callback_0 .call$1(this.this_1);
}
};

$$.BoundClosure = {'':
 ['self', 'target'],
 'super': 'Closure',
call$0: function() { return this.self[this.target](); }
};
$$.BoundClosure0 = {'':
 ['self', 'target'],
 'super': 'Closure',
call$1: function(p0) { return this.self[this.target](p0); }
};
$$.BoundClosure1 = {'':
 ['self', 'target'],
 'super': 'Closure',
call$2: function(p0, p1) { return this.self[this.target](p0, p1); },
 call$0: function() {
  return this.call$2(null,null)
},
 call$1: function(code) {
  return this.call$2(code,null)
}
};
$$.BoundClosure2 = {'':
 ['self', 'target'],
 'super': 'Closure',
call$3: function(p0, p1, p2) { return this.self[this.target](p0, p1, p2); },
 call$2: function(url,name$) {
  return this.call$3(url,name$,null)
}
};
$$.BoundClosure3 = {'':
 ['self', 'target'],
 'super': 'Closure',
call$5: function(p0, p1, p2, p3, p4) { return this.self[this.target](p0, p1, p2, p3, p4); },
 call$2: function(method,url) {
  return this.call$5(method,url,null,null,null)
}
};
$.MatchImplementation$ = function(pattern, str, _start, _end, _groups) {
  return new $.MatchImplementation(_groups, _end, _start, str, pattern);
};

$._InputElementEventsImpl$ = function(_ptr) {
  return new $._InputElementEventsImpl(_ptr);
};

$.startsWith = function(receiver, other) {
  if (!(typeof receiver === 'string'))
    return receiver.startsWith$1(other);
  $.checkString(other);
  var length$ = $.get$length(other);
  if ($.gtB(length$, receiver.length))
    return false;
  return (other == (receiver.substring(0, length$)));
};

$.getRange = function(receiver, start, length$) {
  if ($.isJsArray(receiver) !== true)
    return receiver.getRange$2(start, length$);
  if (0 === length$)
    return [];
  $.checkNull(start);
  $.checkNull(length$);
  if (!(typeof start === 'number' && start === (start | 0)))
    throw $.captureStackTrace($.IllegalArgumentException$(start));
  if (!(typeof length$ === 'number' && length$ === (length$ | 0)))
    throw $.captureStackTrace($.IllegalArgumentException$(length$));
  var t1 = length$ < 0;
  if (t1)
    throw $.captureStackTrace($.IllegalArgumentException$(length$));
  if (start < 0)
    throw $.captureStackTrace($.IndexOutOfRangeException$(start));
  var end = start + length$;
  if ($.gtB(end, $.get$length(receiver)))
    throw $.captureStackTrace($.IndexOutOfRangeException$(length$));
  if (t1)
    throw $.captureStackTrace($.IllegalArgumentException$(length$));
  return (receiver.slice(start, end));
};

$._Lists_getRange = function(a, start, length$, accumulator) {
  if (typeof a !== 'string' && (typeof a !== 'object' || a === null || a.constructor !== Array && !a.is$JavaScriptIndexingBehavior()))
    return $._Lists_getRange$bailout(1, a, start, length$, accumulator);
  if (typeof start !== 'number')
    return $._Lists_getRange$bailout(1, a, start, length$, accumulator);
  if ($.ltB(length$, 0))
    throw $.captureStackTrace($.IllegalArgumentException$('length'));
  if (start < 0)
    throw $.captureStackTrace($.IndexOutOfRangeException$(start));
  if (typeof length$ !== 'number')
    throw $.iae(length$);
  var end = start + length$;
  if (end > a.length)
    throw $.captureStackTrace($.IndexOutOfRangeException$(end));
  for (var i = start; i < end; ++i) {
    if (i !== (i | 0))
      throw $.iae(i);
    var t1 = a.length;
    if (i < 0 || i >= t1)
      throw $.ioore(i);
    $.add$1(accumulator, a[i]);
  }
  return accumulator;
};

$.eqB = function(a, b) {
  if ((a == null))
    return (b == null);
  if ((b == null))
    return false;
  if ((typeof a === "object"))
    if ((!!a.operator$eq$1))
      return a.operator$eq$1(b) === true;
  return (a === b);
};

$.FutureAlreadyCompleteException$ = function() {
  return new $.FutureAlreadyCompleteException();
};

$.set$length = function(receiver, newLength) {
  if ($.isJsArray(receiver) === true) {
    $.checkNull(newLength);
    if (!(typeof newLength === 'number' && newLength === (newLength | 0)))
      throw $.captureStackTrace($.IllegalArgumentException$(newLength));
    if (newLength < 0)
      throw $.captureStackTrace($.IndexOutOfRangeException$(newLength));
    $.checkGrowable(receiver, 'set length');
    (receiver.length = newLength);
  } else
    receiver.set$length(newLength);
  return newLength;
};

$._Device_userAgent = function() {
  return $.window().get$navigator().get$userAgent();
};

$.checkNum = function(value) {
  if (!(typeof value === 'number')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$(value));
  }
  return value;
};

$.convertDartClosureToJS = function(closure, arity) {
  if (closure == null)
    return;
  var function$ = ((closure.$identity));
  if ((!!function$))
    return function$;
  function$ = ((function() {
    return ($.invokeClosure.call$5)(closure, $._currentIsolate(), arity, arguments[0], arguments[1]);
  }));
  (closure.$identity = function$);
  return function$;
};

$._TextTrackListEventsImpl$ = function(_ptr) {
  return new $._TextTrackListEventsImpl(_ptr);
};

$.StackTrace$ = function(stack) {
  return new $.StackTrace(stack);
};

$._MediaStreamTrackEventsImpl$ = function(_ptr) {
  return new $._MediaStreamTrackEventsImpl(_ptr);
};

$.ObjectNotClosureException$ = function() {
  return new $.ObjectNotClosureException();
};

$._JsVisitedMap$ = function() {
  return new $._JsVisitedMap(null);
};

$.isJsArray = function(value) {
  return !(value == null) && ((value.constructor === Array));
};

$.Primitives_objectTypeName = function(object) {
  var name$ = $.constructorNameFallback(object);
  if ($.eqB(name$, 'Object')) {
    var decompiled = (((String(object.constructor)).match(/^\s*function\s*(\S*)\s*\(/)[1]));
    if (typeof decompiled === 'string')
      name$ = decompiled;
  }
  return $.charCodeAt(name$, 0) === 36 ? $.substring$1(name$, 1) : name$;
};

$.clear = function(receiver) {
  if ($.isJsArray(receiver) !== true)
    return receiver.clear$0();
  $.set$length(receiver, 0);
};

$.HashSetIterator$ = function(set_) {
  var t1 = new $.HashSetIterator(-1, set_.get$_backingMap().get$_lib_keys());
  t1 .HashSetIterator$1(set_);
  return t1;
};

$._fillStatics = function(context) {
  $globals = context.isolateStatics;
  $static_init();

};

$.print = function(obj) {
  $.Primitives_printString(obj);
};

$.forEach = function(receiver, f) {
  if ($.isJsArray(receiver) !== true)
    return receiver.forEach$1(f);
  else
    return $.Collections_forEach(receiver, f);
};

$.Collections_forEach = function(iterable, f) {
  for (var t1 = $.iterator(iterable); t1 .hasNext$0() === true;)
    f.call$1(t1 .next$0());
};

$.ListIterator$ = function(list) {
  return new $.ListIterator(list, 0);
};

$._JavaScriptAudioNodeEventsImpl$ = function(_ptr) {
  return new $._JavaScriptAudioNodeEventsImpl(_ptr);
};

$.StackOverflowException$ = function() {
  return new $.StackOverflowException();
};

$._DOMWindowCrossFrameImpl__close = function(win) {
win.close()
};

$._Collections_forEach = function(iterable, f) {
  for (var t1 = $.iterator(iterable); t1 .hasNext$0() === true;)
    f.call$1(t1 .next$0());
};

$._IDBTransactionEventsImpl$ = function(_ptr) {
  return new $._IDBTransactionEventsImpl(_ptr);
};

$.dynamicFunction = function(name$) {
  var f = ((Object.prototype[name$]));
  if (!(f == null) && ((!!f.methods)))
    return (f.methods);
  var methods = (({}));
  var dartMethod = ((Object.getPrototypeOf($.CTC14)[name$]));
  if (!(dartMethod == null))
    (methods['Object'] = dartMethod);
  var bind = ((function() {return ($.dynamicBind.call$4)(this, name$, methods, Array.prototype.slice.call(arguments));}));
  (bind.methods = methods);
  $.defineProperty(((Object.prototype)), name$, bind);
  return methods;
};

$.ListFactory_List$from = function(other) {
  var result = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(result, (({E: 'E'})));
  var iterator = $.iterator(other);
  for (; iterator.hasNext$0() === true;)
    result.push(iterator.next$0());
  return result;
};

$._Timer$repeating = function(milliSeconds, callback) {
  var t1 = new $._Timer(null, false);
  t1 ._Timer$repeating$2(milliSeconds, callback);
  return t1;
};

$._DOMWindowCrossFrameImpl__focus = function(win) {
win.focus()
};

$._EventSourceEventsImpl$ = function(_ptr) {
  return new $._EventSourceEventsImpl(_ptr);
};

$.toDouble = function(receiver) {
  if (!(typeof receiver === 'number'))
    return receiver.toDouble$0();
  return receiver;
};

$._ElementFactoryProvider_Element$html = function(html) {
  var match = $.CTC4 .firstMatch$1(html);
  if (!(match == null)) {
    var tag = $.toLowerCase(match.group$1(1));
    var parentTag = $.CTC6 .containsKey$1(tag) === true ? $.CTC6 .operator$index$1(tag) : 'div';
  } else {
    parentTag = 'div';
    tag = null;
  }
  var temp = $._ElementFactoryProvider_Element$tag(parentTag);
  temp.set$innerHTML(html);
  if ($.eqB($.get$length(temp.get$elements()), 1))
    var element = temp.get$elements().get$first();
  else if ($.eqB(parentTag, 'html') && $.eqB($.get$length(temp.get$elements()), 2)) {
    var t1 = temp.get$elements();
    element = $.index(t1, $.eqB(tag, 'head') ? 0 : 1);
  } else
    throw $.captureStackTrace($.IllegalArgumentException$('HTML had ' + $.S($.get$length(temp.get$elements())) + ' ' + 'top level elements but 1 expected'));
  element.remove$0();
  return element;
};

$.buildDynamicMetadata = function(inputTable) {
  if (typeof inputTable !== 'string' && (typeof inputTable !== 'object' || inputTable === null || inputTable.constructor !== Array && !inputTable.is$JavaScriptIndexingBehavior()))
    return $.buildDynamicMetadata$bailout(1, inputTable, 0, 0, 0, 0, 0, 0);
  var result = [];
  for (var i = 0; t1 = inputTable.length, i < t1; ++i) {
    if (i < 0 || i >= t1)
      throw $.ioore(i);
    var tag = $.index(inputTable[i], 0);
    var t2 = inputTable.length;
    if (i < 0 || i >= t2)
      throw $.ioore(i);
    var tags = $.index(inputTable[i], 1);
    var set = $.HashSetImplementation$();
    $.setRuntimeTypeInfo(set, (({E: 'String'})));
    var tagNames = $.split(tags, '|');
    if (typeof tagNames !== 'string' && (typeof tagNames !== 'object' || tagNames === null || tagNames.constructor !== Array && !tagNames.is$JavaScriptIndexingBehavior()))
      return $.buildDynamicMetadata$bailout(2, inputTable, result, tagNames, tag, i, tags, set);
    for (var j = 0; t1 = tagNames.length, j < t1; ++j) {
      if (j < 0 || j >= t1)
        throw $.ioore(j);
      set.add$1(tagNames[j]);
    }
    $.add$1(result, $.MetaInfo$(tag, tags, set));
  }
  return result;
  var t1;
};

$._FrozenElementList$_wrap = function(_nodeList) {
  return new $._FrozenElementList(_nodeList);
};

$.Math_parseDouble = function(str) {
  return $.MathNatives_parseDouble(str);
};

$.MathNatives_parseDouble = function(str) {
  $.checkString(str);
  var ret = ((parseFloat(str)));
  if (ret === 0)
    var t1 = $.startsWith(str, '0x') === true || $.startsWith(str, '0X') === true;
  else
    t1 = false;
  if (t1)
    ret = ((parseInt(str)));
  if ($.isNaN(ret) === true && !$.eqB(str, 'NaN') && !$.eqB(str, '-NaN'))
    throw $.captureStackTrace($.FormatException$(str));
  return ret;
};

$.captureStackTrace = function(ex) {
  if (ex == null)
    ex = $.CTC0;
  var jsError = ((new Error()));
  (jsError.dartException = ex);
  (jsError.toString = ($.toStringWrapper.call$0));
  return jsError;
};

$.ge$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true)
    return (a >= b);
  return a.operator$ge$1(b);
};

$.floor = function(receiver) {
  if (!(typeof receiver === 'number'))
    return receiver.floor$0();
  return (Math.floor(receiver));
};

$.getFunctionForTypeNameOf = function() {
  if (!(((typeof(navigator))) === 'object'))
    return $.typeNameInChrome;
  var userAgent = ((navigator.userAgent));
  if ($.contains$1(userAgent, $.CTC13) === true)
    return $.typeNameInChrome;
  else if ($.contains$1(userAgent, 'Firefox') === true)
    return $.typeNameInFirefox;
  else if ($.contains$1(userAgent, 'MSIE') === true)
    return $.typeNameInIE;
  else if ($.contains$1(userAgent, 'Opera') === true)
    return $.typeNameInOpera;
  else if ($.contains$1(userAgent, 'Safari') === true)
    return $.typeNameInSafari;
  else
    return $.constructorNameFallback;
};

$._WebSocketEventsImpl$ = function(_ptr) {
  return new $._WebSocketEventsImpl(_ptr);
};

$.JSON_stringify = function(object) {
  return $.JsonStringifier_stringify(object);
};

$.shr = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    a = ((a));
    b = ((b));
    if (b < 0)
      throw $.captureStackTrace($.IllegalArgumentException$(b));
    if (a > 0) {
      if (b > 31)
        return 0;
      return (a >>> b);
    }
    if (b > 31)
      b = 31;
    return ((a >> b) >>> 0);
  }
  return a.operator$shr$1(b);
};

$.JsonStringifier__hexDigit = function(x) {
  if ($.ltB(x, 10)) {
    if (typeof x !== 'number')
      throw $.iae(x);
    var t1 = 48 + x;
  } else {
    if (typeof x !== 'number')
      throw $.iae(x);
    t1 = 87 + x;
  }
  return t1;
};

$.JsonStringifier_stringify = function(object) {
  var output = $.StringBufferImpl$('');
  $.JsonStringifier$_internal(output)._stringify$1(object);
  return output.toString$0();
};

$._XMLHttpRequestEventsImpl$ = function(_ptr) {
  return new $._XMLHttpRequestEventsImpl(_ptr);
};

$.indexSet$slow = function(a, index, value) {
  if ($.isJsArray(a) === true) {
    if (!(typeof index === 'number' && index === (index | 0)))
      throw $.captureStackTrace($.IllegalArgumentException$(index));
    if (index < 0 || $.geB(index, $.get$length(a)))
      throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    $.checkMutable(a, 'indexed set');
    (a[index] = value);
    return;
  }
  a.operator$indexSet$2(index, value);
};

$.and = function(a, b) {
  if ($.checkNumbers(a, b) === true)
    return ((a & b) >>> 0);
  return a.operator$and$1(b);
};

$._deserializeMessage = function(message) {
  if ($._globalState().get$needSerialization() === true)
    return $._JsDeserializer$().deserialize$1(message);
  else
    return message;
};

$._MediaStreamEventsImpl$ = function(_ptr) {
  return new $._MediaStreamEventsImpl(_ptr);
};

$.setRuntimeTypeInfo = function(target, typeInfo) {
  if (!(target == null))
    (target.builtin$typeInfo = typeInfo);
};

$.hashCode = function(receiver) {
  if (typeof receiver === 'number')
    return (receiver & 0x1FFFFFFF);
  if (!(typeof receiver === 'string'))
    return receiver.hashCode$0();
  var length$ = ((receiver.length));
  for (var hash = 0, i = 0; i < length$; ++i) {
    var hash0 = 536870911 & hash + ((receiver.charCodeAt(i)));
    var hash1 = 536870911 & hash0 + ((524287 & hash0 << 10));
    hash1 = (hash1 ^ $.shr(hash1, 6)) >>> 0;
    hash = hash1;
  }
  hash0 = 536870911 & hash + ((67108863 & hash << 3));
  hash0 = (hash0 ^ $.shr(hash0, 11)) >>> 0;
  return 536870911 & hash0 + ((16383 & hash0 << 15));
};

$.FutureImpl_FutureImpl$immediate = function(value) {
  var res = $.FutureImpl$();
  res._setValue$1(value);
  return res;
};

$.mul$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true)
    return (a * b);
  return a.operator$mul$1(b);
};

$._setTimerFactoryClosure = function(closure) {
  $._TimerFactory__factory = closure;
};

$._AllMatchesIterator$ = function(re, _str) {
  return new $._AllMatchesIterator(false, null, _str, $.JSSyntaxRegExp$_globalVersionOf(re));
};

$._waitForPendingPorts = function(message, callback) {
  var finder = $._PendingSendPortFinder$();
  finder.traverse$1(message);
  $.Futures_wait(finder.ports).then$1(new $._waitForPendingPorts_anon(callback));
};

$.gt = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? ((a > b)) : $.gt$slow(a, b);
};

$.isEmpty = function(receiver) {
  if (typeof receiver === 'string' || $.isJsArray(receiver) === true)
    return (receiver.length === 0);
  return receiver.isEmpty$0();
};

$._IsolateContext$ = function() {
  var t1 = new $._IsolateContext(null, null, null);
  t1 ._IsolateContext$0();
  return t1;
};

$.charCodeAt = function(receiver, index) {
  if (typeof receiver === 'string') {
    if (!(typeof index === 'number'))
      throw $.captureStackTrace($.IllegalArgumentException$(index));
    if (index < 0)
      throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    if (index >= receiver.length)
      throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    return (receiver.charCodeAt(index));
  } else
    return receiver.charCodeAt$1(index);
};

$.getTypeNameOf = function(obj) {
  if ($._getTypeNameOf == null)
    $._getTypeNameOf = $.getFunctionForTypeNameOf();
  return $._getTypeNameOf.call$1(obj);
};

$.ListFactory_List = function(length$) {
  return $.Primitives_newList(length$);
};

$._JsCopier$ = function() {
  var t1 = new $._JsCopier($._MessageTraverserVisitedMap$());
  t1 ._JsCopier$0();
  return t1;
};

$.contains$1 = function(receiver, other) {
  if (!(typeof receiver === 'string'))
    return receiver.contains$1(other);
  return $.contains$2(receiver, other, 0);
};

$.mul = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? ((a * b)) : $.mul$slow(a, b);
};

$._browserPrefix = function() {
  if ($._cachedBrowserPrefix == null)
    if ($._Device_isFirefox() === true)
      $._cachedBrowserPrefix = '-moz-';
    else
      $._cachedBrowserPrefix = '-webkit-';
  return $._cachedBrowserPrefix;
};

$._EventsImpl$ = function(_ptr) {
  return new $._EventsImpl(_ptr);
};

$._BodyElementEventsImpl$ = function(_ptr) {
  return new $._BodyElementEventsImpl(_ptr);
};

$.Math_parseInt = function(str) {
  return $.MathNatives_parseInt(str);
};

$.MathNatives_parseInt = function(str) {
  $.checkString(str);
  if (!((/^\s*[+-]?(?:0[xX][abcdefABCDEF0-9]+|\d+)\s*$/.test(str))))
    throw $.captureStackTrace($.FormatException$(str));
  var trimmed = $.trim(str);
  if ($.gtB($.get$length(trimmed), 2))
    var t1 = $.eqB($.index(trimmed, 1), 'x') || $.eqB($.index(trimmed, 1), 'X');
  else
    t1 = false;
  if (!t1)
    if ($.gtB($.get$length(trimmed), 3))
      t1 = $.eqB($.index(trimmed, 2), 'x') || $.eqB($.index(trimmed, 2), 'X');
    else
      t1 = false;
  else
    t1 = true;
  var base = t1 ? 16 : 10;
  var ret = ((parseInt(trimmed, base)));
  if ($.isNaN(ret) === true)
    throw $.captureStackTrace($.FormatException$(str));
  return ret;
};

$.add$1 = function(receiver, value) {
  if ($.isJsArray(receiver) === true) {
    $.checkGrowable(receiver, 'add');
    (receiver.push(value));
    return;
  }
  return receiver.add$1(value);
};

$._Timer$ = function(milliSeconds, callback) {
  var t1 = new $._Timer(null, true);
  t1 ._Timer$2(milliSeconds, callback);
  return t1;
};

$.get$length = function(receiver) {
  if (typeof receiver === 'string' || $.isJsArray(receiver) === true)
    return (receiver.length);
  else
    return receiver.get$length();
};

$.TweetFeed$ = function(element) {
  var t1 = new $.TweetFeed(element);
  t1 .View$1(element);
  return t1;
};

$.AlertField$ = function(element) {
  var t1 = new $.AlertField(element);
  t1 .View$1(element);
  return t1;
};

$.isNaN = function(receiver) {
  if (typeof receiver === 'number')
    return (isNaN(receiver));
  else
    return receiver.isNaN$0();
};

$.JSON_parse = function(json) {
  return $._JsonParser_parse(json);
};

$.regExpMakeNative = function(regExp, global) {
  var pattern = regExp.get$pattern();
  var multiLine = regExp.get$multiLine();
  var ignoreCase = regExp.get$ignoreCase();
  $.checkString(pattern);
  var sb = $.StringBufferImpl$('');
  if (multiLine === true)
    $.add$1(sb, 'm');
  if (ignoreCase === true)
    $.add$1(sb, 'i');
  if (global === true)
    $.add$1(sb, 'g');
  try {
    return (new RegExp(pattern, $.toString(sb)));
  }  catch (exception) {
    var t1 = $.unwrapException(exception);
    var e = t1;
    throw $.captureStackTrace($.IllegalJSRegExpException$(pattern, ((String(e)))));
  }

};

$._JsonParser_parse = function(json) {
  return $._JsonParser$_internal(json)._parseToplevel$0();
};

$.main = function() {
  $.tweetInput = $.TweetInput$($.query('#tweetInput'));
  $.tweetButtonZone = $.query('#tweetButtonZone');
  $.query('#tweetZone');
  $.tweetButton = $.TweetButton$($.query('#tweetButton'));
  $.tweetCharsLeft = $.TweetCharsLeft$($.query('#tweetCharsLeft'));
  $.tweetFeed = $.TweetFeed$($.query('#tweetFeed'));
  $.alertField = $.AlertField$($.query('#alertField'));
  $.connection = $.TweetConnection$('ws://127.0.0.1:1337/ws');
};

$.ceil = function(receiver) {
  if (!(typeof receiver === 'number'))
    return receiver.ceil$0();
  return (Math.ceil(receiver));
};

$.TweetInput$ = function(element) {
  var t1 = new $.TweetInput(element);
  t1 .View$1(element);
  return t1;
};

$.dynamicBind = function(obj, name$, methods, arguments$) {
  var tag = $.getTypeNameOf(obj);
  var method = ((methods[tag]));
  if (method == null && !($._dynamicMetadata0() == null))
    for (var i = 0; $.ltB(i, $.get$length($._dynamicMetadata0())); ++i) {
      var entry = $.index($._dynamicMetadata0(), i);
      if ($.contains$1(entry.get$set(), tag) === true) {
        method = ((methods[entry.get$tag()]));
        if (!(method == null))
          break;
      }
    }
  if (method == null)
    method = ((methods['Object']));
  var proto = ((Object.getPrototypeOf(obj)));
  if (method == null)
    method = ((function () {if (Object.getPrototypeOf(this) === proto) {($.throwNoSuchMethod.call$3)(this, name$, Array.prototype.slice.call(arguments));} else {return Object.prototype[name$].apply(this, arguments);}}));
  if ((!proto.hasOwnProperty(name$)))
    $.defineProperty(proto, name$, method);
  return (method.apply(obj, arguments$));
};

$._FrozenElementListIterator$ = function(_list) {
  return new $._FrozenElementListIterator(0, _list);
};

$.iterator = function(receiver) {
  if ($.isJsArray(receiver) === true)
    return $.ListIterator$(receiver);
  return receiver.iterator$0();
};

$.Maps_mapToString = function(m) {
  var result = $.StringBufferImpl$('');
  $.Maps__emitMap(m, result, $.ListFactory_List(null));
  return result.toString$0();
};

$._NativeJsSendPort$ = function(_receivePort, isolateId) {
  return new $._NativeJsSendPort(_receivePort, isolateId);
};

$.UnsupportedOperationException$ = function(_message) {
  return new $.UnsupportedOperationException(_message);
};

$.invokeClosure = function(closure, isolate, numberOfArguments, arg1, arg2) {
  if ($.eqB(numberOfArguments, 0))
    return $._callInIsolate(isolate, new $.invokeClosure_anon(closure));
  else if ($.eqB(numberOfArguments, 1))
    return $._callInIsolate(isolate, new $.invokeClosure_anon0(closure, arg1));
  else if ($.eqB(numberOfArguments, 2))
    return $._callInIsolate(isolate, new $.invokeClosure_anon1(closure, arg1, arg2));
  else
    throw $.captureStackTrace($.ExceptionImplementation$('Unsupported number of arguments for wrapped closure'));
};

$.removeLast = function(receiver) {
  if ($.isJsArray(receiver) === true) {
    $.checkGrowable(receiver, 'removeLast');
    if ($.get$length(receiver) === 0)
      throw $.captureStackTrace($.IndexOutOfRangeException$(-1));
    return (receiver.pop());
  }
  return receiver.removeLast$0();
};

$.MetaInfo$ = function(tag, tags, set) {
  return new $.MetaInfo(set, tags, tag);
};

$._DOMWindowCrossFrameImpl__blur = function(win) {
win.blur()
};

$.geB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? ((a >= b)) : $.ge$slow(a, b) === true;
};

$.addLast = function(receiver, value) {
  if ($.isJsArray(receiver) !== true)
    return receiver.addLast$1(value);
  $.checkGrowable(receiver, 'addLast');
  (receiver.push(value));
};

$.StringMatch$ = function(_start, str, pattern) {
  return new $.StringMatch(pattern, str, _start);
};

$.ioore = function(index) {
  throw $.captureStackTrace($.IndexOutOfRangeException$(index));
};

$._JsDeserializer$ = function() {
  return new $._JsDeserializer(null);
};

$._ChildNodeListLazy$ = function(_this) {
  return new $._ChildNodeListLazy(_this);
};

$.add = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? ((a + b)) : $.add$slow(a, b);
};

$.JsonStringifier__numberToString = function(x) {
  if (typeof x === 'number' && x === (x | 0))
    return $.toString(x);
  else if (typeof x === 'number')
    return $.toString(x);
  else
    return $.toString($.toDouble(x));
};

$._callInIsolate = function(isolate, function$) {
  isolate.eval$1(function$);
  $._globalState().get$topEventLoop().run$0();
};

$.Primitives_printString = function(string) {
  if ((typeof dartPrint == "function")) {
    (dartPrint(string));
    return;
  }
  if ((typeof console == "object")) {
    (console.log(string));
    return;
  }
  if ((typeof write == "function")) {
    (write(string));
    (write("\n"));
  }
};

$.leB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? ((a <= b)) : $.le$slow(a, b) === true;
};

$.regExpAttachGlobalNative = function(regExp) {
  (regExp._re = $.regExpMakeNative(regExp, true));
};

$._IDBRequestEventsImpl$ = function(_ptr) {
  return new $._IDBRequestEventsImpl(_ptr);
};

$.dynamicSetMetadata = function(inputTable) {
  var t1 = $.buildDynamicMetadata(inputTable);
  $._dynamicMetadata(t1);
};

$.typeNameInFirefox = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if ($.eqB(name$, 'Window'))
    return 'DOMWindow';
  if ($.eqB(name$, 'Document'))
    return 'HTMLDocument';
  if ($.eqB(name$, 'XMLDocument'))
    return 'Document';
  if ($.eqB(name$, 'WorkerMessageEvent'))
    return 'MessageEvent';
  return name$;
};

$._WorkerEventsImpl$ = function(_ptr) {
  return new $._WorkerEventsImpl(_ptr);
};

$.ExceptionImplementation$ = function(msg) {
  return new $.ExceptionImplementation(msg);
};

$._DOMWindowCrossFrameImpl$ = function(_window) {
  return new $._DOMWindowCrossFrameImpl(_window);
};

$.sub$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true)
    return (a - b);
  return a.operator$sub$1(b);
};

$.Collections_collectionToString = function(c) {
  var result = $.StringBufferImpl$('');
  $.Collections__emitCollection(c, result, $.ListFactory_List(null));
  return result.toString$0();
};

$._SharedWorkerContextEventsImpl$ = function(_ptr) {
  return new $._SharedWorkerContextEventsImpl(_ptr);
};

$.indexOf$2 = function(receiver, element, start) {
  if ($.isJsArray(receiver) === true) {
    if (!(typeof start === 'number' && start === (start | 0)))
      throw $.captureStackTrace($.IllegalArgumentException$(start));
    return $.Arrays_indexOf(receiver, element, start, ((receiver.length)));
  } else if (typeof receiver === 'string') {
    $.checkNull(element);
    if (!(typeof start === 'number' && start === (start | 0)))
      throw $.captureStackTrace($.IllegalArgumentException$(start));
    if (!(typeof element === 'string'))
      throw $.captureStackTrace($.IllegalArgumentException$(element));
    if (start < 0)
      return -1;
    return (receiver.indexOf(element, start));
  }
  return receiver.indexOf$2(element, start);
};

$.typeNameInIE = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if ($.eqB(name$, 'Window'))
    return 'DOMWindow';
  if ($.eqB(name$, 'Document')) {
    if ((!!obj.xmlVersion))
      return 'Document';
    return 'HTMLDocument';
  }
  if ($.eqB(name$, 'CanvasPixelArray'))
    return 'Uint8ClampedArray';
  if ($.eqB(name$, 'HTMLDDElement'))
    return 'HTMLElement';
  if ($.eqB(name$, 'HTMLDTElement'))
    return 'HTMLElement';
  if ($.eqB(name$, 'HTMLTableDataCellElement'))
    return 'HTMLTableCellElement';
  if ($.eqB(name$, 'HTMLTableHeaderCellElement'))
    return 'HTMLTableCellElement';
  if ($.eqB(name$, 'HTMLPhraseElement'))
    return 'HTMLElement';
  if ($.eqB(name$, 'MSStyleCSSProperties'))
    return 'CSSStyleDeclaration';
  if ($.eqB(name$, 'MouseWheelEvent'))
    return 'WheelEvent';
  return name$;
};

$.trim = function(receiver) {
  if (!(typeof receiver === 'string'))
    return receiver.trim$0();
  return (receiver.trim());
};

$._TextTrackEventsImpl$ = function(_ptr) {
  return new $._TextTrackEventsImpl(_ptr);
};

$.Tweet$fromMap = function(map) {
  var t1 = new $.Tweet(null, null);
  t1 .Tweet$fromMap$1(map);
  return t1;
};

$.DoubleLinkedQueue$ = function() {
  var t1 = new $.DoubleLinkedQueue(null);
  t1 .DoubleLinkedQueue$0();
  return t1;
};

$.Primitives_newList = function(length$) {
  if (length$ == null)
    return (new Array());
  if (!(typeof length$ === 'number' && length$ === (length$ | 0)) || length$ < 0)
    throw $.captureStackTrace($.IllegalArgumentException$(length$));
  var result = ((new Array(length$)));
  (result.fixed$length = true);
  return result;
};

$._globalState = function() {
return $globalState;
};

$._globalState0 = function(val) {
$globalState = val;
};

$.substring$2 = function(receiver, startIndex, endIndex) {
  if (!(typeof receiver === 'string'))
    return receiver.substring$2(startIndex, endIndex);
  $.checkNum(startIndex);
  var length$ = receiver.length;
  if (endIndex == null)
    endIndex = length$;
  $.checkNum(endIndex);
  if ($.ltB(startIndex, 0))
    throw $.captureStackTrace($.IndexOutOfRangeException$(startIndex));
  if ($.gtB(startIndex, endIndex))
    throw $.captureStackTrace($.IndexOutOfRangeException$(startIndex));
  if ($.gtB(endIndex, length$))
    throw $.captureStackTrace($.IndexOutOfRangeException$(endIndex));
  return $.substringUnchecked(receiver, startIndex, endIndex);
};

$.StringBufferImpl$ = function(content$) {
  var t1 = new $.StringBufferImpl(null, null);
  t1 .StringBufferImpl$1(content$);
  return t1;
};

$.window = function() {
return window;
};

$.TweetPanel$fromTweet = function(t) {
  var t1 = new $.TweetPanel(null);
  t1 .TweetPanel$fromTweet$1(t);
  return t1;
};

$.JsonStringifier__escape = function(sb, s) {
  var length$ = $.get$length(s);
  var charCodes = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(charCodes, (({E: 'int'})));
  for (var needsEscape = false, i = 0; $.ltB(i, length$); ++i) {
    var charCode = $.charCodeAt(s, i);
    if ($.ltB(charCode, 32)) {
      charCodes.push(92);
      switch (charCode) {
        case 8:
          charCodes.push(98);
          break;
        case 9:
          charCodes.push(116);
          break;
        case 10:
          charCodes.push(110);
          break;
        case 12:
          charCodes.push(102);
          break;
        case 13:
          charCodes.push(114);
          break;
        default:
          charCodes.push(117);
          charCodes.push($.JsonStringifier__hexDigit($.and($.shr(charCode, 12), 15)));
          charCodes.push($.JsonStringifier__hexDigit($.and($.shr(charCode, 8), 15)));
          charCodes.push($.JsonStringifier__hexDigit($.and($.shr(charCode, 4), 15)));
          charCodes.push($.JsonStringifier__hexDigit($.and(charCode, 15)));
          break;
      }
      needsEscape = true;
    } else if ($.eqB(charCode, 34) || $.eqB(charCode, 92)) {
      charCodes.push(92);
      charCodes.push(charCode);
      needsEscape = true;
    } else
      charCodes.push(charCode);
  }
  $.add$1(sb, needsEscape ? $.Strings_String$fromCharCodes(charCodes) : s);
};

$.HashMapImplementation$ = function() {
  var t1 = new $.HashMapImplementation(null, null, null, null, null);
  t1 .HashMapImplementation$0();
  return t1;
};

$._SVGElementInstanceEventsImpl$ = function(_ptr) {
  return new $._SVGElementInstanceEventsImpl(_ptr);
};

$._JsonParser$_internal = function(json) {
  var t1 = new $._JsonParser(0, $.get$length(json), json);
  t1 ._JsonParser$_internal$1(json);
  return t1;
};

$._FixedSizeListIterator$ = function(array) {
  return new $._FixedSizeListIterator($.get$length(array), 0, array);
};

$.JSSyntaxRegExp$_globalVersionOf = function(other) {
  var t1 = other.get$pattern();
  var t2 = other.get$multiLine();
  t1 = new $.JSSyntaxRegExp(other.get$ignoreCase(), t2, t1);
  t1 .JSSyntaxRegExp$_globalVersionOf$1(other);
  return t1;
};

$._FileReaderEventsImpl$ = function(_ptr) {
  return new $._FileReaderEventsImpl(_ptr);
};

$._MainManagerStub$ = function() {
  return new $._MainManagerStub();
};

$.regExpTest = function(regExp, str) {
  return ($.regExpGetNative(regExp).test(str));
};

$.HashMapImplementation__nextProbe = function(currentProbe, numberOfProbes, length$) {
  return $.and($.add(currentProbe, numberOfProbes), $.sub(length$, 1));
};

$.makeLiteralMap = function(keyValuePairs) {
  var iterator = $.iterator(keyValuePairs);
  var result = $.LinkedHashMapImplementation$();
  for (; iterator.hasNext$0() === true;)
    result.operator$indexSet$2(iterator.next$0(), iterator.next$0());
  return result;
};

$.StringBase_concatAll = function(strings) {
  return $.stringJoinUnchecked($.StringBase__toJsStringArray(strings), '');
};

$.StringBase_createFromCharCodes = function(charCodes) {
  $.checkNull(charCodes);
  if ($.isJsArray(charCodes) !== true) {
    if (!(typeof charCodes === 'object' && charCodes !== null && (charCodes.constructor === Array || charCodes.is$List())))
      throw $.captureStackTrace($.IllegalArgumentException$(charCodes));
    var charCodes0 = $.ListFactory_List$from(charCodes);
    charCodes = charCodes0;
  }
  return $.Primitives_stringFromCharCodes(charCodes);
};

$.CompleterImpl$ = function() {
  return new $.CompleterImpl($.FutureImpl$());
};

$.HashSetImplementation$ = function() {
  var t1 = new $.HashSetImplementation(null);
  t1 .HashSetImplementation$0();
  return t1;
};

$.NoMoreElementsException$ = function() {
  return new $.NoMoreElementsException();
};

$._WindowEventsImpl$ = function(_ptr) {
  return new $._WindowEventsImpl(_ptr);
};

$._EventListenerListImpl$ = function(_ptr, _type) {
  return new $._EventListenerListImpl(_type, _ptr);
};

$.gt$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true)
    return (a > b);
  return a.operator$gt$1(b);
};

$.iae = function(argument) {
  throw $.captureStackTrace($.IllegalArgumentException$(argument));
};

$._DOMApplicationCacheEventsImpl$ = function(_ptr) {
  return new $._DOMApplicationCacheEventsImpl(_ptr);
};

$.typeNameInChrome = function(obj) {
  var name$ = ((obj.constructor.name));
  if (name$ === 'Window')
    return 'DOMWindow';
  if (name$ === 'CanvasPixelArray')
    return 'Uint8ClampedArray';
  if (name$ === 'WebKitMutationObserver')
    return 'MutationObserver';
  return name$;
};

$.Collections__emitCollection = function(c, result, visiting) {
  $.add$1(visiting, c);
  var isList = typeof c === 'object' && c !== null && (c.constructor === Array || c.is$List());
  $.add$1(result, isList ? '[' : '{');
  for (var t1 = $.iterator(c), first = true; t1 .hasNext$0() === true;) {
    var t2 = t1 .next$0();
    if (!first)
      $.add$1(result, ', ');
    $.Collections__emitObject(t2, result, visiting);
    first = false;
  }
  $.add$1(result, isList ? ']' : '}');
  $.removeLast(visiting);
};

$.FilteredElementList$ = function(node) {
  return new $.FilteredElementList(node.get$nodes(), node);
};

$._document = function() {
return document;
};

$.HashMapImplementation__computeLoadLimit = function(capacity) {
  return $.tdiv($.mul(capacity, 3), 4);
};

$._WebSocketFactoryProvider_WebSocket = function(url) {
return new WebSocket(url);
};

$._FrameSetElementEventsImpl$ = function(_ptr) {
  return new $._FrameSetElementEventsImpl(_ptr);
};

$.StringBase__toJsStringArray = function(strings) {
  if (typeof strings !== 'object' || strings === null || (strings.constructor !== Array || !!strings.immutable$list) && !strings.is$JavaScriptIndexingBehavior())
    return $.StringBase__toJsStringArray$bailout(1, strings);
  $.checkNull(strings);
  var length$ = strings.length;
  if ($.isJsArray(strings) === true) {
    for (var i = 0; i < length$; ++i) {
      var t1 = strings.length;
      if (i < 0 || i >= t1)
        throw $.ioore(i);
      var string = strings[i];
      $.checkNull(string);
      if (!(typeof string === 'string'))
        throw $.captureStackTrace($.IllegalArgumentException$(string));
    }
    var array = strings;
  } else {
    array = $.ListFactory_List(length$);
    for (i = 0; i < length$; ++i) {
      t1 = strings.length;
      if (i < 0 || i >= t1)
        throw $.ioore(i);
      string = strings[i];
      $.checkNull(string);
      if (!(typeof string === 'string'))
        throw $.captureStackTrace($.IllegalArgumentException$(string));
      t1 = array.length;
      if (i < 0 || i >= t1)
        throw $.ioore(i);
      array[i] = string;
    }
  }
  return array;
};

$.IllegalJSRegExpException$ = function(_pattern, _errmsg) {
  return new $.IllegalJSRegExpException(_errmsg, _pattern);
};

$._IDBDatabaseEventsImpl$ = function(_ptr) {
  return new $._IDBDatabaseEventsImpl(_ptr);
};

$._timerFactory = function(millis, callback, repeating) {
  return repeating === true ? $._Timer$repeating(millis, callback) : $._Timer$(millis, callback);
};

$.allMatches = function(receiver, str) {
  if (!(typeof receiver === 'string'))
    return receiver.allMatches$1(str);
  $.checkString(str);
  return $.allMatchesInStringUnchecked(receiver, str);
};

$.toStringForNativeObject = function(obj) {
  return 'Instance of ' + $.S($.getTypeNameOf(obj));
};

$.query = function(selector) {
  return $._document().query$1(selector);
};

$.split = function(receiver, pattern) {
  if (!(typeof receiver === 'string'))
    return receiver.split$1(pattern);
  $.checkNull(pattern);
  return $.stringSplitUnchecked(receiver, pattern);
};

$.constructorNameFallback = function(obj) {
  var constructor$ = ((obj.constructor));
  if (((typeof(constructor$))) === 'function') {
    var name$ = ((constructor$.name));
    if (((typeof(name$))) === 'string' && $.isEmpty(name$) !== true && !(name$ === 'Object') && !(name$ === 'Function.prototype'))
      return name$;
  }
  var string = ((Object.prototype.toString.call(obj)));
  return $.substring$2(string, 8, string.length - 1);
};

$.FormatException$ = function(message) {
  return new $.FormatException(message);
};

$.ltB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? ((a < b)) : $.lt$slow(a, b) === true;
};

$._ChildrenElementList$_wrap = function(element) {
  return new $._ChildrenElementList(element.get$$$dom_children(), element);
};

$.tdiv = function(a, b) {
  if ($.checkNumbers(a, b) === true)
    return $.truncate(((a)) / ((b)));
  return a.operator$tdiv$1(b);
};

$.filter = function(receiver, predicate) {
  if ($.isJsArray(receiver) !== true)
    return receiver.filter$1(predicate);
  else
    return $.Collections_filter(receiver, [], predicate);
};

$.unwrapException = function(ex) {
  if (("dartException" in ex))
    return (ex.dartException);
  var message = ((ex.message));
  if ((ex instanceof TypeError)) {
    var type = ((ex.type));
    var name$ = ((ex.arguments ? ex.arguments[0] : ""));
    if ($.eqB(type, 'property_not_function') || $.eqB(type, 'called_non_callable') || $.eqB(type, 'non_object_property_call') || $.eqB(type, 'non_object_property_load'))
      if (typeof name$ === 'string' && $.startsWith(name$, 'call$') === true)
        return $.ObjectNotClosureException$();
      else
        return $.NullPointerException$(null, $.CTC);
    else if ($.eqB(type, 'undefined_method'))
      if (typeof name$ === 'string' && $.startsWith(name$, 'call$') === true)
        return $.ObjectNotClosureException$();
      else
        return $.NoSuchMethodException$('', name$, [], null);
    if (typeof message === 'string')
      if ($.endsWith(message, 'is null') === true || $.endsWith(message, 'is undefined') === true || $.endsWith(message, 'is null or undefined') === true)
        return $.NullPointerException$(null, $.CTC);
      else if ($.endsWith(message, 'is not a function') === true)
        return $.NoSuchMethodException$('', '<unknown>', [], null);
    return $.ExceptionImplementation$(typeof message === 'string' ? message : '');
  }
  if ((ex instanceof RangeError)) {
    if (typeof message === 'string' && $.contains$1(message, 'call stack') === true)
      return $.StackOverflowException$();
    return $.IllegalArgumentException$('');
  }
  if ((typeof InternalError == 'function' && ex instanceof InternalError))
    if (typeof message === 'string' && message === 'too much recursion')
      return $.StackOverflowException$();
  return ex;
};

$.Collections_filter = function(source, destination, f) {
  for (var t1 = $.iterator(source); t1 .hasNext$0() === true;) {
    var t2 = t1 .next$0();
    if (f.call$1(t2) === true)
      $.add$1(destination, t2);
  }
  return destination;
};

$.checkNumbers = function(a, b) {
  if (typeof a === 'number')
    if (typeof b === 'number')
      return true;
    else {
      $.checkNull(b);
      throw $.captureStackTrace($.IllegalArgumentException$(b));
    }
  return false;
};

$._MediaStreamTrackListEventsImpl$ = function(_ptr) {
  return new $._MediaStreamTrackListEventsImpl(_ptr);
};

$._Collections_filter = function(source, destination, f) {
  for (var t1 = $.iterator(source); t1 .hasNext$0() === true;) {
    var t2 = t1 .next$0();
    if (f.call$1(t2) === true)
      $.add$1(destination, t2);
  }
  return destination;
};

$._NodeListWrapper$ = function(list) {
  return new $._NodeListWrapper(list);
};

$._ReceivePortImpl$ = function() {
  var t1 = $._ReceivePortImpl__nextFreeId;
  $._ReceivePortImpl__nextFreeId = $.add(t1, 1);
  t1 = new $._ReceivePortImpl(null, t1);
  t1 ._ReceivePortImpl$0();
  return t1;
};

$.NoSuchMethodException$ = function(_receiver, _functionName, _arguments, existingArgumentNames) {
  return new $.NoSuchMethodException(existingArgumentNames, _arguments, _functionName, _receiver);
};

$.stringJoinUnchecked = function(array, separator) {
  return (array.join(separator));
};

$._WorkerSendPort$ = function(_workerId, isolateId, _receivePortId) {
  return new $._WorkerSendPort(_receivePortId, _workerId, isolateId);
};

$.S = function(value) {
  var res = $.toString(value);
  if (!(typeof res === 'string'))
    throw $.captureStackTrace($.IllegalArgumentException$(value));
  return res;
};

$.checkString = function(value) {
  if (!(typeof value === 'string')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$(value));
  }
  return value;
};

$._DoubleLinkedQueueIterator$ = function(_sentinel) {
  var t1 = new $._DoubleLinkedQueueIterator(null, _sentinel);
  t1 ._DoubleLinkedQueueIterator$1(_sentinel);
  return t1;
};

$._Lists_indexOf = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object' || a === null || a.constructor !== Array && !a.is$JavaScriptIndexingBehavior()))
    return $._Lists_indexOf$bailout(1, a, element, startIndex, endIndex);
  if (typeof endIndex !== 'number')
    return $._Lists_indexOf$bailout(1, a, element, startIndex, endIndex);
  if ($.geB(startIndex, a.length))
    return -1;
  if ($.ltB(startIndex, 0))
    startIndex = 0;
  if (typeof startIndex !== 'number')
    return $._Lists_indexOf$bailout(2, a, element, startIndex, endIndex);
  for (var i = startIndex; i < endIndex; ++i) {
    if (i !== (i | 0))
      throw $.iae(i);
    var t1 = a.length;
    if (i < 0 || i >= t1)
      throw $.ioore(i);
    if ($.eqB(a[i], element))
      return i;
  }
  return -1;
};

$._ElementFactoryProvider_Element$tag = function(tag) {
return document.createElement(tag)
};

$.Arrays_indexOf = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object' || a === null || a.constructor !== Array && !a.is$JavaScriptIndexingBehavior()))
    return $.Arrays_indexOf$bailout(1, a, element, startIndex, endIndex);
  if (typeof endIndex !== 'number')
    return $.Arrays_indexOf$bailout(1, a, element, startIndex, endIndex);
  if ($.geB(startIndex, a.length))
    return -1;
  if ($.ltB(startIndex, 0))
    startIndex = 0;
  if (typeof startIndex !== 'number')
    return $.Arrays_indexOf$bailout(2, a, element, startIndex, endIndex);
  for (var i = startIndex; i < endIndex; ++i) {
    if (i !== (i | 0))
      throw $.iae(i);
    var t1 = a.length;
    if (i < 0 || i >= t1)
      throw $.ioore(i);
    if ($.eqB(a[i], element))
      return i;
  }
  return -1;
};

$.startRootIsolate = function(entry) {
  var t1 = $._Manager$();
  $._globalState0(t1);
  if ($._globalState().get$isWorker() === true)
    return;
  var rootContext = $._IsolateContext$();
  $._globalState().set$rootContext(rootContext);
  $._fillStatics(rootContext);
  $._globalState().set$currentContext(rootContext);
  if (!($._window() == null))
    rootContext.eval$1(new $.startRootIsolate_anon());
  rootContext.eval$1(entry);
  $._globalState().get$topEventLoop().run$0();
};

$.stringSplitUnchecked = function(receiver, pattern) {
  if (typeof pattern === 'string')
    return (receiver.split(pattern));
  else if (typeof pattern === 'object' && pattern !== null && !!pattern.is$JSSyntaxRegExp)
    return (receiver.split($.regExpGetNative(pattern)));
  else
    throw $.captureStackTrace('StringImplementation.split(Pattern) UNIMPLEMENTED');
};

$.lt$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true)
    return (a < b);
  return a.operator$lt$1(b);
};

$.Collections__emitObject = function(o, result, visiting) {
  if (typeof o === 'object' && o !== null && (o.constructor === Array || o.is$Collection()))
    if ($.Collections__containsRef(visiting, o) === true)
      $.add$1(result, typeof o === 'object' && o !== null && (o.constructor === Array || o.is$List()) ? '[...]' : '{...}');
    else
      $.Collections__emitCollection(o, result, visiting);
  else if (typeof o === 'object' && o !== null && o.is$Map())
    if ($.Collections__containsRef(visiting, o) === true)
      $.add$1(result, '{...}');
    else
      $.Maps__emitMap(o, result, visiting);
  else
    $.add$1(result, o == null ? 'null' : o);
};

$.throwNoSuchMethod = function(obj, name$, arguments$) {
  throw $.captureStackTrace($.NoSuchMethodException$(obj, name$, arguments$, null));
};

$._DedicatedWorkerContextEventsImpl$ = function(_ptr) {
  return new $._DedicatedWorkerContextEventsImpl(_ptr);
};

$.truncate = function(receiver) {
  if (!(typeof receiver === 'number'))
    return receiver.truncate$0();
  return receiver < 0 ? $.ceil(receiver) : $.floor(receiver);
};

$.TweetConnection$ = function(url) {
  var t1 = new $.TweetConnection(url, null);
  t1 .TweetConnection$1(url);
  return t1;
};

$.Strings_String$fromCharCodes = function(charCodes) {
  return $.StringBase_createFromCharCodes(charCodes);
};

$.substringUnchecked = function(receiver, startIndex, endIndex) {
  return (receiver.substring(startIndex, endIndex));
};

$._EventLoop$ = function() {
  var t1 = $.DoubleLinkedQueue$();
  $.setRuntimeTypeInfo(t1, (({E: '_IsolateEvent'})));
  return new $._EventLoop(t1);
};

$.Primitives_stringFromCharCodes = function(charCodes) {
  for (var t1 = $.iterator(charCodes); t1 .hasNext$0() === true;) {
    var t2 = t1 .next$0();
    if (!(typeof t2 === 'number' && t2 === (t2 | 0)))
      throw $.captureStackTrace($.IllegalArgumentException$(t2));
  }
  return (String.fromCharCode.apply(null, charCodes));
};

$.toLowerCase = function(receiver) {
  if (!(typeof receiver === 'string'))
    return receiver.toLowerCase$0();
  return (receiver.toLowerCase());
};

$._AudioContextEventsImpl$ = function(_ptr) {
  return new $._AudioContextEventsImpl(_ptr);
};

$._TextTrackCueEventsImpl$ = function(_ptr) {
  return new $._TextTrackCueEventsImpl(_ptr);
};

$.typeNameInSafari = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if ($.eqB(name$, 'Window'))
    return 'DOMWindow';
  if ($.eqB(name$, 'CanvasPixelArray'))
    return 'Uint8ClampedArray';
  if ($.eqB(name$, 'WebKitMutationObserver'))
    return 'MutationObserver';
  return name$;
};

$._ElementAttributeMap$ = function(_element) {
  return new $._ElementAttributeMap(_element);
};

$.endsWith = function(receiver, other) {
  if (!(typeof receiver === 'string'))
    return receiver.endsWith$1(other);
  $.checkString(other);
  var receiverLength = receiver.length;
  var otherLength = $.get$length(other);
  if ($.gtB(otherLength, receiverLength))
    return false;
  if (typeof otherLength !== 'number')
    throw $.iae(otherLength);
  return $.eq(other, $.substring$1(receiver, receiverLength - otherLength));
};

$.contains$2 = function(receiver, other, startIndex) {
  if (!(typeof receiver === 'string'))
    return receiver.contains$2(other, startIndex);
  $.checkNull(other);
  return $.stringContainsUnchecked(receiver, other, startIndex);
};

$.regExpExec = function(regExp, str) {
  var result = (($.regExpGetNative(regExp).exec(str)));
  if ((result === null))
    return;
  return result;
};

$.addAll = function(receiver, collection) {
  if ($.isJsArray(receiver) !== true)
    return receiver.addAll$1(collection);
  var iterator = $.iterator(collection);
  for (; iterator.hasNext$0() === true;)
    $.add$1(receiver, iterator.next$0());
};

$.regExpMatchStart = function(m) {
  return (m.index);
};

$._WorkerContextEventsImpl$ = function(_ptr) {
  return new $._WorkerContextEventsImpl(_ptr);
};

$._ElementEventsImpl$ = function(_ptr) {
  return new $._ElementEventsImpl(_ptr);
};

$._dynamicMetadata = function(table) {
  ($dynamicMetadata = table);
};

$._dynamicMetadata0 = function() {
  if (((typeof($dynamicMetadata))) === 'undefined') {
    var t1 = [];
    $._dynamicMetadata(t1);
  }
  return ($dynamicMetadata);
};

$.toString = function(value) {
  if ((typeof value == "object" && value !== null))
    if ($.isJsArray(value) === true)
      return $.Collections_collectionToString(value);
    else
      return value.toString$0();
  if ((value === 0 && (1 / value) < 0))
    return '-0.0';
  if (value == null)
    return 'null';
  if ((typeof value == "function"))
    return 'Closure';
  return (String(value));
};

$.allMatchesInStringUnchecked = function(needle, haystack) {
  var result = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(result, (({E: 'Match'})));
  var length$ = $.get$length(haystack);
  var patternLength = $.get$length(needle);
  if (patternLength !== (patternLength | 0))
    return $.allMatchesInStringUnchecked$bailout(1, needle, haystack, length$, patternLength, result);
  for (var startIndex = 0; true;) {
    var position = $.indexOf$2(haystack, needle, startIndex);
    if ($.eqB(position, -1))
      break;
    result.push($.StringMatch$(position, haystack, needle));
    var endIndex = $.add(position, patternLength);
    if ($.eqB(endIndex, length$))
      break;
    else
      startIndex = $.eqB(position, endIndex) ? $.add(startIndex, 1) : endIndex;
  }
  return result;
};

$._SpeechRecognitionEventsImpl$ = function(_ptr) {
  return new $._SpeechRecognitionEventsImpl(_ptr);
};

$.add$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true)
    return (a + b);
  return a.operator$add$1(b);
};

$.jsHasOwnProperty = function(jsObject, property) {
  return (jsObject.hasOwnProperty(property));
};

$.IllegalArgumentException$ = function(arg) {
  return new $.IllegalArgumentException(arg);
};

$._AllMatchesIterable$ = function(_re, _str) {
  return new $._AllMatchesIterable(_str, _re);
};

$._PendingSendPortFinder$ = function() {
  var t1 = $._MessageTraverserVisitedMap$();
  t1 = new $._PendingSendPortFinder([], t1);
  t1 ._PendingSendPortFinder$0();
  return t1;
};

$.Futures_wait = function(futures) {
  var t1 = (({}));
  if (typeof futures !== 'string' && (typeof futures !== 'object' || futures === null || futures.constructor !== Array && !futures.is$JavaScriptIndexingBehavior()))
    return $.Futures_wait$bailout(1, futures, t1);
  if ($.isEmpty(futures) === true) {
    t1 = $.FutureImpl_FutureImpl$immediate($.CTC);
    $.setRuntimeTypeInfo(t1, (({T: 'List'})));
    return t1;
  }
  var completer = $.CompleterImpl$();
  $.setRuntimeTypeInfo(completer, (({T: 'List'})));
  var result = completer.get$future();
  t1 .remaining_1 = futures.length;
  var values = $.ListFactory_List(futures.length);
  for (var i = 0; t2 = futures.length, i < t2; ++i) {
    if (i < 0 || i >= t2)
      throw $.ioore(i);
    var future = futures[i];
    future.then$1(new $.Futures_wait_anon(completer, i, t1, result, values));
    future.handleException$1(new $.Futures_wait_anon0(future, completer, result));
  }
  return result;
  var t2;
};

$.checkNull = function(object) {
  if (object == null)
    throw $.captureStackTrace($.NullPointerException$(null, $.CTC));
  return object;
};

$._PeerConnection00EventsImpl$ = function(_ptr) {
  return new $._PeerConnection00EventsImpl(_ptr);
};

$._AbstractWorkerEventsImpl$ = function(_ptr) {
  return new $._AbstractWorkerEventsImpl(_ptr);
};

$.indexSet = function(a, index, value) {
  if ((a.constructor === Array && !a.immutable$list)) {
    var key = ((index >>> 0));
    if (key === index && key < ((a.length))) {
      (a[key] = value);
      return;
    }
  }
  $.indexSet$slow(a, index, value);
};

$.index$slow = function(a, index) {
  if (typeof a === 'string' || $.isJsArray(a) === true) {
    if (!(typeof index === 'number' && index === (index | 0))) {
      if (!(typeof index === 'number'))
        throw $.captureStackTrace($.IllegalArgumentException$(index));
      if (!($.truncate(index) === index))
        throw $.captureStackTrace($.IllegalArgumentException$(index));
    }
    if ($.ltB(index, 0) || $.geB(index, $.get$length(a)))
      throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    return (a[index]);
  }
  return a.operator$index$1(index);
};

$.Collections__containsRef = function(c, ref) {
  for (var t1 = $.iterator(c); t1 .hasNext$0() === true;) {
    var t2 = t1 .next$0();
    if (t2 == null ? ref == null : t2 === ref)
      return true;
  }
  return false;
};

$._MediaElementEventsImpl$ = function(_ptr) {
  return new $._MediaElementEventsImpl(_ptr);
};

$._MessagePortEventsImpl$ = function(_ptr) {
  return new $._MessagePortEventsImpl(_ptr);
};

$.getTraceFromException = function(exception) {
  return $.StackTrace$(((exception.stack)));
};

$._IsolateEvent$ = function(isolate, fn, message) {
  return new $._IsolateEvent(message, fn, isolate);
};

$.jsPropertyAccess = function(jsObject, property) {
  return (jsObject[property]);
};

$.HashMapImplementation__firstProbe = function(hashCode, length$) {
  return $.and(hashCode, $.sub(length$, 1));
};

$.Maps__emitMap = function(m, result, visiting) {
  var t1 = (({}));
  $.add$1(visiting, m);
  $.add$1(result, '{');
  t1 .first_1 = true;
  $.forEach(m, new $.Maps__emitMap_anon(result, t1, visiting));
  $.add$1(result, '}');
  $.removeLast(visiting);
};

$._Deserializer_isPrimitive = function(x) {
  return x == null || typeof x === 'string' || typeof x === 'number' || typeof x === 'boolean';
};

$._MessageTraverser_isPrimitive = function(x) {
  return x == null || typeof x === 'string' || typeof x === 'number' || typeof x === 'boolean';
};

$._BatteryManagerEventsImpl$ = function(_ptr) {
  return new $._BatteryManagerEventsImpl(_ptr);
};

$._Device_isFirefox = function() {
  return $.contains$2($._Device_userAgent(), 'Firefox', 0);
};

$._IDBOpenDBRequestEventsImpl$ = function(_ptr) {
  return new $._IDBOpenDBRequestEventsImpl(_ptr);
};

$.checkMutable = function(list, reason) {
  if ((!!(list.immutable$list)))
    throw $.captureStackTrace($.UnsupportedOperationException$(reason));
};

$.checkGrowable = function(list, reason) {
  if ((!!(list.fixed$length)))
    throw $.captureStackTrace($.UnsupportedOperationException$(reason));
};

$._serializeMessage = function(message) {
  if ($._globalState().get$needSerialization() === true)
    return $._JsSerializer$().traverse$1(message);
  else
    return $._JsCopier$().traverse$1(message);
};

$.index = function(a, index) {
  if ((typeof a == "string" || a.constructor === Array)) {
    var key = ((index >>> 0));
    if (key === index && key < ((a.length)))
      return (a[key]);
  }
  return $.index$slow(a, index);
};

$.IndexOutOfRangeException$ = function(_value) {
  return new $.IndexOutOfRangeException(_value);
};

$.le$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true)
    return (a <= b);
  return a.operator$le$1(b);
};

$.KeyValuePair$ = function(key, value) {
  return new $.KeyValuePair(value, key);
};

$.JsonStringifier$_internal = function(_sb) {
  return new $.JsonStringifier([], _sb);
};

$._DocumentEventsImpl$ = function(_ptr) {
  return new $._DocumentEventsImpl(_ptr);
};

$.typeNameInOpera = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if ($.eqB(name$, 'Window'))
    return 'DOMWindow';
  return name$;
};

$.xor = function(a, b) {
  if ($.checkNumbers(a, b) === true)
    return ((a ^ b) >>> 0);
  return a.operator$xor$1(b);
};

$.substring$1 = function(receiver, startIndex) {
  if (!(typeof receiver === 'string'))
    return receiver.substring$1(startIndex);
  return $.substring$2(receiver, startIndex, null);
};

$._window = function() {
  return ((typeof window != "undefined")) ? ((window)) : null;
};

$._IDBVersionChangeRequestEventsImpl$ = function(_ptr) {
  return new $._IDBVersionChangeRequestEventsImpl(_ptr);
};

$._MessageTraverserVisitedMap$ = function() {
  return new $._MessageTraverserVisitedMap();
};

$.FutureNotCompleteException$ = function() {
  return new $.FutureNotCompleteException();
};

$.last = function(receiver) {
  if ($.isJsArray(receiver) !== true)
    return receiver.last$0();
  return $.index(receiver, $.sub($.get$length(receiver), 1));
};

$._JsSerializer$ = function() {
  var t1 = new $._JsSerializer(0, $._MessageTraverserVisitedMap$());
  t1 ._JsSerializer$0();
  return t1;
};

$.eq = function(a, b) {
  if ((a == null))
    return (b == null);
  if ((b == null))
    return false;
  if ((typeof a === "object"))
    if ((!!a.operator$eq$1))
      return a.operator$eq$1(b);
  return (a === b);
};

$._XMLHttpRequestUploadEventsImpl$ = function(_ptr) {
  return new $._XMLHttpRequestUploadEventsImpl(_ptr);
};

$.LinkedHashMapImplementation$ = function() {
  var t1 = new $.LinkedHashMapImplementation(null, null);
  t1 .LinkedHashMapImplementation$0();
  return t1;
};

$.NullPointerException$ = function(functionName, arguments$) {
  return new $.NullPointerException(arguments$, functionName);
};

$._DoubleLinkedQueueEntrySentinel$ = function() {
  var t1 = new $._DoubleLinkedQueueEntrySentinel(null, null, null);
  t1 .DoubleLinkedQueueEntry$1(null);
  t1 ._DoubleLinkedQueueEntrySentinel$0();
  return t1;
};

$.FutureImpl$ = function() {
  var t1 = [];
  var t2 = [];
  return new $.FutureImpl([], t2, t1, false, null, null, null, false);
};

$._DOMWindowCrossFrameImpl__createSafe = function(w) {
  var t1 = $.window();
  if (w == null ? t1 == null : w === t1)
    return w;
  else
    return $._DOMWindowCrossFrameImpl$(w);
};

$.toStringWrapper = function() {
  return $.toString(((this.dartException)));
};

$._ElementList$ = function(list) {
  return new $._ElementList(list);
};

$.gtB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? ((a > b)) : $.gt$slow(a, b) === true;
};

$.TweetButton$ = function(element) {
  var t1 = new $.TweetButton(element);
  t1 .View$1(element);
  return t1;
};

$.stringContainsUnchecked = function(receiver, other, startIndex) {
  if (typeof other === 'string')
    return !($.indexOf$2(receiver, other, startIndex) === -1);
  else if (typeof other === 'object' && other !== null && !!other.is$JSSyntaxRegExp)
    return other.hasMatch$1($.substring$1(receiver, startIndex));
  else
    return $.iterator($.allMatches(other, $.substring$1(receiver, startIndex))).hasNext$0();
};

$.defineProperty = function(obj, property, value) {
  (Object.defineProperty(obj, property,
      {value: value, enumerable: false, writable: true, configurable: true}));
};

$.Primitives_objectToString = function(object) {
  return 'Instance of \'' + $.S($.Primitives_objectTypeName(object)) + '\'';
};

$.shl = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    a = ((a));
    b = ((b));
    if (b < 0)
      throw $.captureStackTrace($.IllegalArgumentException$(b));
    if (b > 31)
      return 0;
    return ((a << b) >>> 0);
  }
  return a.operator$shl$1(b);
};

$._currentIsolate = function() {
  return $._globalState().get$currentContext();
};

$.lt = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? ((a < b)) : $.lt$slow(a, b);
};

$._FileWriterEventsImpl$ = function(_ptr) {
  return new $._FileWriterEventsImpl(_ptr);
};

$._Manager$ = function() {
  var t1 = new $._Manager(null, null, null, null, null, null, null, null, null, 1, 0, 0);
  t1 ._Manager$0();
  return t1;
};

$._NotificationEventsImpl$ = function(_ptr) {
  return new $._NotificationEventsImpl(_ptr);
};

$.regExpGetNative = function(regExp) {
  var r = ((regExp._re));
  return r == null ? ((regExp._re = $.regExpMakeNative(regExp, false))) : r;
};

$.TweetCharsLeft$ = function(element) {
  var t1 = new $.TweetCharsLeft(element);
  t1 .View$1(element);
  return t1;
};

$.sub = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? ((a - b)) : $.sub$slow(a, b);
};

$.DoubleLinkedQueueEntry$ = function(e) {
  var t1 = new $.DoubleLinkedQueueEntry(null, null, null);
  t1 .DoubleLinkedQueueEntry$1(e);
  return t1;
};

$._Lists_indexOf$bailout = function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var a = env0;
      var element = env1;
      var startIndex = env2;
      var endIndex = env3;
      break;
    case 2:
      a = env0;
      element = env1;
      startIndex = env2;
      endIndex = env3;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      if ($.geB(startIndex, $.get$length(a)))
        return -1;
      if ($.ltB(startIndex, 0))
        startIndex = 0;
    case 2:
      state = 0;
      for (var i = startIndex; $.ltB(i, endIndex); i = $.add(i, 1))
        if ($.eqB($.index(a, i), element))
          return i;
      return -1;
  }
};

$.Arrays_indexOf$bailout = function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var a = env0;
      var element = env1;
      var startIndex = env2;
      var endIndex = env3;
      break;
    case 2:
      a = env0;
      element = env1;
      startIndex = env2;
      endIndex = env3;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      if ($.geB(startIndex, $.get$length(a)))
        return -1;
      if ($.ltB(startIndex, 0))
        startIndex = 0;
    case 2:
      state = 0;
      for (var i = startIndex; $.ltB(i, endIndex); i = $.add(i, 1))
        if ($.eqB($.index(a, i), element))
          return i;
      return -1;
  }
};

$._Lists_getRange$bailout = function(state, a, start, length$, accumulator) {
  ;
  if ($.ltB(length$, 0))
    throw $.captureStackTrace($.IllegalArgumentException$('length'));
  if ($.ltB(start, 0))
    throw $.captureStackTrace($.IndexOutOfRangeException$(start));
  var end = $.add(start, length$);
  if ($.gtB(end, $.get$length(a)))
    throw $.captureStackTrace($.IndexOutOfRangeException$(end));
  for (var i = start; $.ltB(i, end); i = $.add(i, 1))
    $.add$1(accumulator, $.index(a, i));
  return accumulator;
};

$.StringBase__toJsStringArray$bailout = function(state, strings) {
  ;
  $.checkNull(strings);
  var length$ = $.get$length(strings);
  if ($.isJsArray(strings) === true) {
    for (var i = 0; $.ltB(i, length$); ++i) {
      var string = $.index(strings, i);
      $.checkNull(string);
      if (!(typeof string === 'string'))
        throw $.captureStackTrace($.IllegalArgumentException$(string));
    }
    var array = strings;
  } else {
    array = $.ListFactory_List(length$);
    for (i = 0; $.ltB(i, length$); ++i) {
      string = $.index(strings, i);
      $.checkNull(string);
      if (!(typeof string === 'string'))
        throw $.captureStackTrace($.IllegalArgumentException$(string));
      var t1 = array.length;
      if (i < 0 || i >= t1)
        throw $.ioore(i);
      array[i] = string;
    }
  }
  return array;
};

$.buildDynamicMetadata$bailout = function(state, env0, env1, env2, env3, env4, env5, env6) {
  switch (state) {
    case 1:
      var inputTable = env0;
      break;
    case 2:
      inputTable = env0;
      result = env1;
      tagNames = env2;
      tag = env3;
      i = env4;
      tags = env5;
      set = env6;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var result = [];
      var i = 0;
    case 2:
      L0:
        while (true)
          switch (state) {
            case 0:
              if (!$.ltB(i, $.get$length(inputTable)))
                break L0;
              var tag = $.index($.index(inputTable, i), 0);
              var tags = $.index($.index(inputTable, i), 1);
              var set = $.HashSetImplementation$();
              $.setRuntimeTypeInfo(set, (({E: 'String'})));
              var tagNames = $.split(tags, '|');
            case 2:
              state = 0;
              for (var j = 0; $.ltB(j, $.get$length(tagNames)); ++j)
                set.add$1($.index(tagNames, j));
              $.add$1(result, $.MetaInfo$(tag, tags, set));
              ++i;
          }
      return result;
  }
};

$.allMatchesInStringUnchecked$bailout = function(state, needle, haystack, length$, patternLength, result) {
  ;
  for (var startIndex = 0; true;) {
    var position = $.indexOf$2(haystack, needle, startIndex);
    if ($.eqB(position, -1))
      break;
    result.push($.StringMatch$(position, haystack, needle));
    var endIndex = $.add(position, patternLength);
    if ($.eqB(endIndex, length$))
      break;
    else
      startIndex = $.eqB(position, endIndex) ? $.add(startIndex, 1) : endIndex;
  }
  return result;
};

$.Futures_wait$bailout = function(state, futures, t1) {
  ;
  if ($.isEmpty(futures) === true) {
    t1 = $.FutureImpl_FutureImpl$immediate($.CTC);
    $.setRuntimeTypeInfo(t1, (({T: 'List'})));
    return t1;
  }
  var completer = $.CompleterImpl$();
  $.setRuntimeTypeInfo(completer, (({T: 'List'})));
  var result = completer.get$future();
  t1 .remaining_1 = $.get$length(futures);
  var values = $.ListFactory_List($.get$length(futures));
  for (var i = 0; $.ltB(i, $.get$length(futures)); ++i) {
    var future = $.index(futures, i);
    future.then$1(new $.Futures_wait_anon(completer, i, t1, result, values));
    future.handleException$1(new $.Futures_wait_anon0(future, completer, result));
  }
  return result;
};

$._timerFactory.call$3 = $._timerFactory;
$._timerFactory.$name = "_timerFactory";
$.dynamicBind.call$4 = $.dynamicBind;
$.dynamicBind.$name = "dynamicBind";
$.toStringWrapper.call$0 = $.toStringWrapper;
$.toStringWrapper.$name = "toStringWrapper";
$.typeNameInFirefox.call$1 = $.typeNameInFirefox;
$.typeNameInFirefox.$name = "typeNameInFirefox";
$.typeNameInSafari.call$1 = $.typeNameInSafari;
$.typeNameInSafari.$name = "typeNameInSafari";
$.constructorNameFallback.call$1 = $.constructorNameFallback;
$.constructorNameFallback.$name = "constructorNameFallback";
$.typeNameInChrome.call$1 = $.typeNameInChrome;
$.typeNameInChrome.$name = "typeNameInChrome";
$.typeNameInIE.call$1 = $.typeNameInIE;
$.typeNameInIE.$name = "typeNameInIE";
$.invokeClosure.call$5 = $.invokeClosure;
$.invokeClosure.$name = "invokeClosure";
$.throwNoSuchMethod.call$3 = $.throwNoSuchMethod;
$.throwNoSuchMethod.$name = "throwNoSuchMethod";
$.typeNameInOpera.call$1 = $.typeNameInOpera;
$.typeNameInOpera.$name = "typeNameInOpera";
Isolate.$finishClasses($$);
$$ = {};
Isolate.makeConstantList = function(list) {
  list.immutable$list = true;
  list.fixed$length = true;
  return list;
};
$.CTC = Isolate.makeConstantList([]);
$.CTC1 = new Isolate.$isolateProperties.ConstantMap(Isolate.$isolateProperties.CTC, {}, 0);
$.CTC7 = new Isolate.$isolateProperties.UnsupportedOperationException('');
$.CTC12 = new Isolate.$isolateProperties.JsonUnsupportedObjectType();
$.CTC10 = new Isolate.$isolateProperties._DeletedKeySentinel();
$.CTC11 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '^#[_a-zA-Z]\\w*$');
$.CTC14 = new Isolate.$isolateProperties.Object();
$.CTC4 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '<(\\w+)');
$.CTC5 = Isolate.makeConstantList(['body', 'head', 'caption', 'td', 'colgroup', 'col', 'tr', 'tbody', 'tfoot', 'thead', 'track']);
$.CTC13 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, 'Chrome|DumpRenderTree');
$.CTC3 = new Isolate.$isolateProperties.IllegalAccessException();
$.CTC8 = new Isolate.$isolateProperties.IllegalArgumentException('Invalid list length');
$.CTC6 = new Isolate.$isolateProperties.ConstantMap(Isolate.$isolateProperties.CTC5, {'body': 'html', 'head': 'html', 'caption': 'table', 'td': 'tr', 'colgroup': 'table', 'col': 'colgroup', 'tr': 'tbody', 'tbody': 'table', 'tfoot': 'table', 'thead': 'table', 'track': 'audio'}, 11);
$.CTC0 = new Isolate.$isolateProperties.NullPointerException(Isolate.$isolateProperties.CTC, null);
$.CTC2 = new Isolate.$isolateProperties.NoMoreElementsException();
$.CTC9 = new Isolate.$isolateProperties.EmptyQueueException();
$.connection = null;
$._ReceivePortImpl__nextFreeId = 1;
$.tweetCharsLeft = null;
$._TimerFactory__factory = null;
$._cachedBrowserPrefix = null;
$.alertField = null;
$._JsonParser_tokens = null;
$.tweetButton = null;
$.tweetButtonZone = null;
$._getTypeNameOf = null;
$.tweetInput = null;
$.tweetFeed = null;
var $ = null;
Isolate.$finishClasses($$);
$$ = {};
Isolate = Isolate.$finishIsolateConstructor(Isolate);
var $ = new Isolate();
$.$defineNativeClass = function(cls, fields, methods) {
  var generateGetterSetter = function(field, prototype) {
  var len = field.length;
  var lastChar = field[len - 1];
  var needsGetter = lastChar == '?' || lastChar == '=';
  var needsSetter = lastChar == '!' || lastChar == '=';
  if (needsGetter || needsSetter) field = field.substring(0, len - 1);
  if (needsGetter) {
    var getterString = "return this." + field + ";";
    prototype["get$" + field] = new Function(getterString);
  }
  if (needsSetter) {
    var setterString = "this." + field + " = v;";
    prototype["set$" + field] = new Function("v", setterString);
  }
  return field;
};
  for (var i = 0; i < fields.length; i++) {
    generateGetterSetter(fields[i], methods);
  }
  for (var method in methods) {
    $.dynamicFunction(method)[cls] = methods[method];
  }
};

(function(table) {
  for (var key in table) {
    $.defineProperty(Object.prototype, key, table[key]);
  }
})({
 is$Element: function() { return false; },
 is$List: function() { return false; },
 is$Map: function() { return false; },
 is$JavaScriptIndexingBehavior: function() { return false; },
 is$Collection: function() { return false; },
 toString$0: function() { return $.toStringForNativeObject(this); }
});

$.$defineNativeClass('AbstractWorker', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return (this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return (this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
  {
  return $._AbstractWorkerEventsImpl$(this);
}
  } else {
    return Object.prototype.get$on.call(this);
  }

}
});

$.$defineNativeClass('HTMLAnchorElement', ["name?"], {
 toString$0: function() {
  return (this.toString());
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('WebKitAnimation', ["name?"], {
});

$.$defineNativeClass('WebKitAnimationList', ["length?"], {
});

$.$defineNativeClass('HTMLAppletElement', ["name?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLAreaElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('Attr', ["value=", "name?"], {
});

$.$defineNativeClass('AudioBuffer', ["length?"], {
});

$.$defineNativeClass('AudioContext', [], {
 get$on: function() {
  return $._AudioContextEventsImpl$(this);
}
});

$.$defineNativeClass('HTMLAudioElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('AudioParam', ["value=", "name?"], {
});

$.$defineNativeClass('HTMLBRElement', [], {
 clear$0: function() { return this.clear.call$0(); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLBaseElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLBaseFontElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('BatteryManager', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return (this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return (this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 get$on: function() {
  return $._BatteryManagerEventsImpl$(this);
}
});

$.$defineNativeClass('HTMLBodyElement', [], {
 get$on: function() {
  return $._BodyElementEventsImpl$(this);
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLButtonElement', ["value=", "name?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('WebKitCSSKeyframesRule', ["name?"], {
});

$.$defineNativeClass('WebKitCSSMatrix', [], {
 toString$0: function() {
  return (this.toString());
}
});

$.$defineNativeClass('CSSRuleList', ["length?"], {
});

$.$defineNativeClass('CSSStyleDeclaration', ["length?"], {
 get$filter: function() {
  return this.getPropertyValue$1($.S($._browserPrefix()) + 'filter');
},
 filter$1: function(arg0) { return this.get$filter().call$1(arg0); },
 get$clear: function() {
  return this.getPropertyValue$1('clear');
},
 clear$0: function() { return this.get$clear().call$0(); },
 getPropertyValue$1: function(propertyName) {
  return (this.getPropertyValue(propertyName));
}
});

$.$defineNativeClass('CSSValueList', ["length?"], {
});

$.$defineNativeClass('HTMLCanvasElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('CharacterData', ["length?", "data?"], {
});

$.$defineNativeClass('ClientRectList', ["length?"], {
});

$.$defineNativeClass('CompositionEvent', ["data?"], {
});

_ConsoleImpl = (typeof console == 'undefined' ? {} : console);
_ConsoleImpl.group$1 = function(arg) {
  return (this.group(arg));
};
_ConsoleImpl.error$1 = function(arg) {
  return (this.error(arg));
};
_ConsoleImpl.get$error = function() { return new $.BoundClosure0(this, 'error$1'); };
$.$defineNativeClass('HTMLContentElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLDListElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('DOMApplicationCache', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return (this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return (this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 get$on: function() {
  return $._DOMApplicationCacheEventsImpl$(this);
}
});

$.$defineNativeClass('DOMError', ["name?"], {
});

$.$defineNativeClass('DOMException', ["name?", "message?"], {
 toString$0: function() {
  return (this.toString());
}
});

$.$defineNativeClass('DOMFileSystem', ["name?"], {
});

$.$defineNativeClass('DOMFileSystemSync', ["name?"], {
});

$.$defineNativeClass('DOMMimeTypeArray', ["length?"], {
});

$.$defineNativeClass('DOMPlugin', ["name?", "length?"], {
});

$.$defineNativeClass('DOMPluginArray', ["length?"], {
});

$.$defineNativeClass('DOMSelection', [], {
 toString$0: function() {
  return (this.toString());
}
});

$.$defineNativeClass('DOMSettableTokenList', ["value="], {
});

$.$defineNativeClass('DOMStringList', ["length?"], {
 contains$1: function(string) {
  return (this.contains(string));
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, (({T: 'String'})));
  return t1;
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('DOMTokenList', ["length?"], {
 toString$0: function() {
  return (this.toString());
},
 remove$1: function(token) {
  return (this.remove(token));
},
 contains$1: function(token) {
  return (this.contains(token));
},
 add$1: function(token) {
  return (this.add(token));
}
});

$.$defineNativeClass('DataTransferItemList', ["length?"], {
 clear$0: function() {
  return (this.clear());
},
 add$2: function(data_OR_file, type) {
  return (this.add(data_OR_file,type));
},
 add$1: function(data_OR_file) {
  return this.add(data_OR_file);
}
});

$.$defineNativeClass('DedicatedWorkerContext', [], {
 postMessage$2: function(message, messagePorts) {
  return (this.postMessage(message,messagePorts));
},
 postMessage$1: function(message) {
  return this.postMessage(message);
},
 get$on: function() {
  return $._DedicatedWorkerContextEventsImpl$(this);
}
});

$.$defineNativeClass('HTMLDetailsElement', ["open?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLDirectoryElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLDivElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLDocument', ["readyState?"], {
 query$1: function(selectors) {
  if ($.CTC11 .hasMatch$1(selectors) === true)
    return this.$dom_getElementById$1($.substring$1(selectors, 1));
  return this.$dom_querySelector$1(selectors);
},
 $dom_querySelector$1: function(selectors) {
  return (this.querySelector(selectors));
},
 $dom_getElementById$1: function(elementId) {
  return (this.getElementById(elementId));
},
 get$on: function() {
  return $._DocumentEventsImpl$(this);
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('DocumentFragment', [], {
 $dom_querySelector$1: function(selectors) {
  return (this.querySelector(selectors));
},
 get$on: function() {
  return $._ElementEventsImpl$(this);
},
 set$hidden: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Hidden can\'t be set for document fragments.'));
},
 click$0: function() {
},
 get$click: function() { return new $.BoundClosure(this, 'click$0'); },
 focus$0: function() {
},
 get$focus: function() { return new $.BoundClosure(this, 'focus$0'); },
 blur$0: function() {
},
 get$blur: function() { return new $.BoundClosure(this, 'blur$0'); },
 get$attributes: function() {
  return $.CTC1;
},
 get$parent: function() {
  return;
},
 get$$$dom_lastElementChild: function() {
  return $.last(this.get$elements());
},
 get$$$dom_firstElementChild: function() {
  return this.get$elements().first$0();
},
 get$id: function() {
  return '';
},
 set$innerHTML: function(value) {
  if (Object.getPrototypeOf(this).hasOwnProperty('set$innerHTML')) {
  {
  $.clear(this.get$nodes());
  var e = $._ElementFactoryProvider_Element$tag('div');
  e.set$innerHTML(value);
  var nodes = $.ListFactory_List$from(e.get$nodes());
  $.addAll(this.get$nodes(), nodes);
}
  } else {
    return Object.prototype.set$innerHTML.call(this, value);
  }

},
 query$1: function(selectors) {
  return this.$dom_querySelector$1(selectors);
},
 get$elements: function() {
  if (this._elements == null)
    this._elements = $.FilteredElementList$(this);
  return this._elements;
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('DocumentType', ["name?"], {
});

$.$defineNativeClass('Element', ["innerHTML!", "id?", "hidden!"], {
 $dom_setAttribute$2: function(name, value) {
  return (this.setAttribute(name,value));
},
 $dom_removeAttribute$1: function(name) {
  return (this.removeAttribute(name));
},
 $dom_querySelector$1: function(selectors) {
  return (this.querySelector(selectors));
},
 $dom_hasAttribute$1: function(name) {
  return (this.hasAttribute(name));
},
 $dom_getAttribute$1: function(name) {
  return (this.getAttribute(name));
},
 focus$0: function() {
  return (this.focus());
},
 get$focus: function() { return new $.BoundClosure(this, 'focus$0'); },
 blur$0: function() {
  return (this.blur());
},
 get$blur: function() { return new $.BoundClosure(this, 'blur$0'); },
 get$$$dom_lastElementChild: function() {
return this.lastElementChild;
},
 get$$$dom_firstElementChild: function() {
return this.firstElementChild;
},
 click$0: function() {
  return (this.click());
},
 get$click: function() { return new $.BoundClosure(this, 'click$0'); },
 get$$$dom_children: function() {
return this.children;
},
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
  {
  return $._ElementEventsImpl$(this);
}
  } else {
    return Object.prototype.get$on.call(this);
  }

},
 query$1: function(selectors) {
  return this.$dom_querySelector$1(selectors);
},
 get$elements: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$elements')) {
  {
  return $._ChildrenElementList$_wrap(this);
}
  } else {
    return Object.prototype.get$elements.call(this);
  }

},
 set$elements: function(value) {
  if (Object.getPrototypeOf(this).hasOwnProperty('set$elements')) {
  {
  var elements = this.get$elements();
  $.clear(elements);
  $.addAll(elements, value);
}
  } else {
    return Object.prototype.set$elements.call(this, value);
  }

},
 get$attributes: function() {
  return $._ElementAttributeMap$(this);
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLEmbedElement', ["name?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('Entry', ["name?"], {
 remove$2: function(successCallback, errorCallback) {
  return (this.remove($.convertDartClosureToJS(successCallback, 0),$.convertDartClosureToJS(errorCallback, 1)));
},
 remove$1: function(successCallback) {
  successCallback = $.convertDartClosureToJS(successCallback, 0);
  return this.remove(successCallback);
}
});

$.$defineNativeClass('EntryArray', ["length?"], {
});

$.$defineNativeClass('EntryArraySync', ["length?"], {
});

$.$defineNativeClass('EntrySync', ["name?"], {
 remove$0: function() {
  return (this.remove());
}
});

$.$defineNativeClass('ErrorEvent', ["message?"], {
});

$.$defineNativeClass('EventException', ["name?", "message?"], {
 toString$0: function() {
  return (this.toString());
}
});

$.$defineNativeClass('EventSource', ["readyState?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return (this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 close$0: function() {
  return (this.close());
},
 get$close: function() { return new $.BoundClosure(this, 'close$0'); },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return (this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 get$on: function() {
  return $._EventSourceEventsImpl$(this);
}
});

$.$defineNativeClass('EventTarget', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_removeEventListener$3')) {
  {
  return (this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
}
  } else {
    return Object.prototype.$dom_removeEventListener$3.call(this, type, listener, useCapture);
  }

},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
  {
  return (this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
}
  } else {
    return Object.prototype.$dom_addEventListener$3.call(this, type, listener, useCapture);
  }

},
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
  {
  return $._EventsImpl$(this);
}
  } else {
    return Object.prototype.get$on.call(this);
  }

}
});

$.$defineNativeClass('HTMLFieldSetElement', ["name?", "elements?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('File', ["name?"], {
});

$.$defineNativeClass('FileException', ["name?", "message?"], {
 toString$0: function() {
  return (this.toString());
}
});

$.$defineNativeClass('FileList', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, (({T: 'File'})));
  return t1;
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('FileReader', ["readyState?", "error?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return (this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return (this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 get$on: function() {
  return $._FileReaderEventsImpl$(this);
}
});

$.$defineNativeClass('FileWriter', ["readyState?", "length?", "error?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return (this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return (this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 get$on: function() {
  return $._FileWriterEventsImpl$(this);
}
});

$.$defineNativeClass('FileWriterSync', ["length?"], {
});

$.$defineNativeClass('Float32Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, (({T: 'num'})));
  return t1;
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Float64Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, (({T: 'num'})));
  return t1;
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLFontElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLFormElement', ["name?", "length?"], {
 reset$0: function() {
  return (this.reset());
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLFrameElement', ["name?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLFrameSetElement', ["rows!"], {
 get$on: function() {
  return $._FrameSetElementEventsImpl$(this);
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('Gamepad', ["id?"], {
});

$.$defineNativeClass('GamepadList', ["length?"], {
});

$.$defineNativeClass('HTMLHRElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLAllCollection', ["length?"], {
});

$.$defineNativeClass('HTMLCollection', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, (({T: 'Node'})));
  return t1;
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLOptionsCollection', [], {
 remove$1: function(index) {
  return (this.remove(index));
},
 set$length: function(value) {
this.length = value;
},
 get$length: function() {
return this.length;
},
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLHeadElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLHeadingElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('History', ["length?"], {
});

$.$defineNativeClass('HTMLHtmlElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('IDBCursor', ["key?"], {
});

$.$defineNativeClass('IDBCursorWithValue', ["value?"], {
});

$.$defineNativeClass('IDBDatabase', ["name?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return (this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 close$0: function() {
  return (this.close());
},
 get$close: function() { return new $.BoundClosure(this, 'close$0'); },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return (this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 get$on: function() {
  return $._IDBDatabaseEventsImpl$(this);
}
});

$.$defineNativeClass('IDBDatabaseException', ["name?", "message?"], {
 toString$0: function() {
  return (this.toString());
}
});

$.$defineNativeClass('IDBFactory', [], {
 open$1: function(name) {
  return (this.open(name));
},
 get$open: function() { return new $.BoundClosure0(this, 'open$1'); }
});

$.$defineNativeClass('IDBIndex', ["name?"], {
});

$.$defineNativeClass('IDBObjectStore', ["name?"], {
 clear$0: function() {
  return (this.clear());
},
 add$2: function(value, key) {
  return (this.add(value,key));
},
 add$1: function(value) {
  return this.add(value);
}
});

$.$defineNativeClass('IDBRequest', ["readyState?", "error?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_removeEventListener$3')) {
  {
  return (this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
}
  } else {
    return Object.prototype.$dom_removeEventListener$3.call(this, type, listener, useCapture);
  }

},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
  {
  return (this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
}
  } else {
    return Object.prototype.$dom_addEventListener$3.call(this, type, listener, useCapture);
  }

},
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
  {
  return $._IDBRequestEventsImpl$(this);
}
  } else {
    return Object.prototype.get$on.call(this);
  }

}
});

$.$defineNativeClass('IDBTransaction', ["error?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return (this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return (this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 get$on: function() {
  return $._IDBTransactionEventsImpl$(this);
}
});

$.$defineNativeClass('IDBVersionChangeRequest', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return (this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return (this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 get$on: function() {
  return $._IDBVersionChangeRequestEventsImpl$(this);
}
});

$.$defineNativeClass('HTMLIFrameElement', ["name?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('ImageData', ["data?"], {
});

$.$defineNativeClass('HTMLImageElement', ["name?"], {
 complete$1: function(arg0) { return this.complete.call$1(arg0); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLInputElement', ["value=", "placeholder!", "pattern?", "name?"], {
 get$on: function() {
  return $._InputElementEventsImpl$(this);
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('Int16Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, (({T: 'int'})));
  return t1;
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Int32Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, (({T: 'int'})));
  return t1;
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Int8Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, (({T: 'int'})));
  return t1;
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('JavaScriptAudioNode', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return (this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return (this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 get$on: function() {
  return $._JavaScriptAudioNodeEventsImpl$(this);
}
});

$.$defineNativeClass('HTMLKeygenElement', ["name?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLLIElement', ["value="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLLabelElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLLegendElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLLinkElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('LocalMediaStream', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return (this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return (this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
}
});

$.$defineNativeClass('Location', [], {
 toString$0: function() {
  return (this.toString());
}
});

$.$defineNativeClass('HTMLMapElement', ["name?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLMarqueeElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('MediaController', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return (this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return (this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
}
});

$.$defineNativeClass('HTMLMediaElement', ["readyState?", "error?"], {
 get$on: function() {
  return $._MediaElementEventsImpl$(this);
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('MediaKeyEvent', ["message?"], {
});

$.$defineNativeClass('MediaList', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, (({T: 'String'})));
  return t1;
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('MediaStream', ["readyState?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_removeEventListener$3')) {
  {
  return (this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
}
  } else {
    return Object.prototype.$dom_removeEventListener$3.call(this, type, listener, useCapture);
  }

},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
  {
  return (this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
}
  } else {
    return Object.prototype.$dom_addEventListener$3.call(this, type, listener, useCapture);
  }

},
 get$on: function() {
  return $._MediaStreamEventsImpl$(this);
}
});

$.$defineNativeClass('MediaStreamList', ["length?"], {
});

$.$defineNativeClass('MediaStreamTrack', ["readyState?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return (this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return (this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 get$on: function() {
  return $._MediaStreamTrackEventsImpl$(this);
}
});

$.$defineNativeClass('MediaStreamTrackList', ["length?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return (this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 remove$1: function(track) {
  return (this.remove(track));
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return (this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 add$1: function(track) {
  return (this.add(track));
},
 get$on: function() {
  return $._MediaStreamTrackListEventsImpl$(this);
}
});

$.$defineNativeClass('HTMLMenuElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('MessageEvent', ["ports?", "data?"], {
});

$.$defineNativeClass('MessagePort', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return (this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 postMessage$2: function(message, messagePorts) {
  return (this.postMessage(message,messagePorts));
},
 postMessage$1: function(message) {
  return this.postMessage(message);
},
 close$0: function() {
  return (this.close());
},
 get$close: function() { return new $.BoundClosure(this, 'close$0'); },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return (this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 get$on: function() {
  return $._MessagePortEventsImpl$(this);
}
});

$.$defineNativeClass('HTMLMetaElement', ["name?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLMeterElement', ["value="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLModElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('NamedNodeMap', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, (({T: 'Node'})));
  return t1;
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Navigator', ["userAgent?"], {
});

$.$defineNativeClass('Node', [], {
 $dom_replaceChild$2: function(newChild, oldChild) {
  return (this.replaceChild(newChild,oldChild));
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return (this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 $dom_removeChild$1: function(oldChild) {
  return (this.removeChild(oldChild));
},
 contains$1: function(other) {
  return (this.contains(other));
},
 $dom_appendChild$1: function(newChild) {
  return (this.appendChild(newChild));
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return (this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 set$text: function(value) {
this.textContent = value;
},
 get$text: function() {
return this.textContent;
},
 get$parent: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$parent')) {
  {
return this.parentNode;
}
  } else {
    return Object.prototype.get$parent.call(this);
  }

},
 get$$$dom_childNodes: function() {
return this.childNodes;
},
 get$$$dom_attributes: function() {
return this.attributes;
},
 replaceWith$1: function(otherNode) {
  try {
    var parent$ = this.get$parent();
    parent$.$dom_replaceChild$2(otherNode, this);
  }  catch (exception) {
    $.unwrapException(exception);
  }

  return this;
},
 remove$0: function() {
  if (!(this.get$parent() == null))
    this.get$parent().$dom_removeChild$1(this);
  return this;
},
 get$nodes: function() {
  return $._ChildNodeListLazy$(this);
}
});

$.$defineNativeClass('NodeIterator', [], {
 filter$1: function(arg0) { return this.filter.call$1(arg0); }
});

$.$defineNativeClass('NodeList', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 getRange$2: function(start, rangeLength) {
  return $._NodeListWrapper$($._Lists_getRange(this, start, rangeLength, []));
},
 get$first: function() {
  return this.operator$index$1(0);
},
 first$0: function() { return this.get$first().call$0(); },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 filter$1: function(f) {
  return $._NodeListWrapper$($._Collections_filter(this, [], f));
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 operator$indexSet$2: function(index, value) {
  this._parent.$dom_replaceChild$2(value, this.operator$index$1(index));
},
 clear$0: function() {
  this._parent.set$text('');
},
 removeLast$0: function() {
  var result = this.last$0();
  if (!(result == null))
    this._parent.$dom_removeChild$1(result);
  return result;
},
 addAll$1: function(collection) {
  for (var t1 = $.iterator(collection), t2 = this._parent; t1 .hasNext$0() === true;)
    t2 .$dom_appendChild$1(t1 .next$0());
},
 addLast$1: function(value) {
  this._parent.$dom_appendChild$1(value);
},
 add$1: function(value) {
  this._parent.$dom_appendChild$1(value);
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, (({T: 'Node'})));
  return t1;
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Notification', ["tag?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return (this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 close$0: function() {
  return (this.close());
},
 get$close: function() { return new $.BoundClosure(this, 'close$0'); },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return (this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 get$on: function() {
  return $._NotificationEventsImpl$(this);
}
});

$.$defineNativeClass('HTMLOListElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLObjectElement', ["name?", "data?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLOptGroupElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLOptionElement', ["value="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLOutputElement', ["value=", "name?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLParagraphElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLParamElement', ["value=", "name?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('PeerConnection00', ["readyState?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return (this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 close$0: function() {
  return (this.close());
},
 get$close: function() { return new $.BoundClosure(this, 'close$0'); },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return (this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 get$on: function() {
  return $._PeerConnection00EventsImpl$(this);
}
});

$.$defineNativeClass('PositionError', ["message?"], {
});

$.$defineNativeClass('HTMLPreElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('ProcessingInstruction', ["data?"], {
});

$.$defineNativeClass('HTMLProgressElement', ["value="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLQuoteElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('RadioNodeList', ["value="], {
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Range', [], {
 toString$0: function() {
  return (this.toString());
}
});

$.$defineNativeClass('RangeException', ["name?", "message?"], {
 toString$0: function() {
  return (this.toString());
}
});

$.$defineNativeClass('SQLError', ["message?"], {
});

$.$defineNativeClass('SQLException', ["message?"], {
});

$.$defineNativeClass('SQLResultSetRowList', ["length?"], {
});

$.$defineNativeClass('SVGAElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAltGlyphDefElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAltGlyphElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAltGlyphItemElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAngle', ["value="], {
});

$.$defineNativeClass('SVGAnimateColorElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAnimateElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAnimateMotionElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAnimateTransformElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAnimationElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGCircleElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGClipPathElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGComponentTransferFunctionElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGCursorElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGDefsElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGDescElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGDocument', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGElement', [], {
 get$id: function() {
return this.id;
},
 set$innerHTML: function(svg) {
  var container = $._ElementFactoryProvider_Element$tag('div');
  container.set$innerHTML('<svg version="1.1">' + $.S(svg) + '</svg>');
  this.set$elements(container.get$elements().get$first().get$elements());
},
 set$elements: function(value) {
  var elements = this.get$elements();
  $.clear(elements);
  $.addAll(elements, value);
},
 get$elements: function() {
  return $.FilteredElementList$(this);
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGElementInstance', [], {
 get$on: function() {
  return $._SVGElementInstanceEventsImpl$(this);
}
});

$.$defineNativeClass('SVGElementInstanceList', ["length?"], {
});

$.$defineNativeClass('SVGEllipseElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGException', ["name?", "message?"], {
 toString$0: function() {
  return (this.toString());
}
});

$.$defineNativeClass('SVGFEBlendElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEColorMatrixElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEComponentTransferElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFECompositeElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEConvolveMatrixElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEDiffuseLightingElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEDisplacementMapElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEDistantLightElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEDropShadowElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFloodElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFuncAElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFuncBElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFuncGElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFuncRElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEGaussianBlurElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEImageElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEMergeElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEMergeNodeElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEMorphologyElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEOffsetElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEPointLightElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFESpecularLightingElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFESpotLightElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFETileElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFETurbulenceElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFilterElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceFormatElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceNameElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceSrcElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceUriElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGForeignObjectElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGGElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGGlyphElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGGlyphRefElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGGradientElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGHKernElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGImageElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGLength', ["value="], {
});

$.$defineNativeClass('SVGLengthList', [], {
 clear$0: function() {
  return (this.clear());
}
});

$.$defineNativeClass('SVGLineElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGLinearGradientElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGMPathElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGMarkerElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGMaskElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGMetadataElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGMissingGlyphElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGNumber', ["value="], {
});

$.$defineNativeClass('SVGNumberList', [], {
 clear$0: function() {
  return (this.clear());
}
});

$.$defineNativeClass('SVGPathElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGPathSegList', [], {
 clear$0: function() {
  return (this.clear());
}
});

$.$defineNativeClass('SVGPatternElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGPointList', [], {
 clear$0: function() {
  return (this.clear());
}
});

$.$defineNativeClass('SVGPolygonElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGPolylineElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGRadialGradientElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGRectElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGSVGElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGScriptElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGSetElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGStopElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGStringList', [], {
 clear$0: function() {
  return (this.clear());
}
});

$.$defineNativeClass('SVGStyleElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGSwitchElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGSymbolElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTRefElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTSpanElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTextContentElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTextElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTextPathElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTextPositioningElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTitleElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTransformList', [], {
 clear$0: function() {
  return (this.clear());
}
});

$.$defineNativeClass('SVGUseElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGVKernElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGViewElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLScriptElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLSelectElement', ["value=", "name?", "length="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLShadowElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('ShadowRoot', ["innerHTML!"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SharedWorkerContext', ["name?"], {
 get$on: function() {
  return $._SharedWorkerContextEventsImpl$(this);
}
});

$.$defineNativeClass('SourceBufferList', ["length?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return (this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return (this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
}
});

$.$defineNativeClass('HTMLSourceElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLSpanElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SpeechGrammarList', ["length?"], {
});

$.$defineNativeClass('SpeechInputResultList', ["length?"], {
});

$.$defineNativeClass('SpeechRecognition', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return (this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return (this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 get$on: function() {
  return $._SpeechRecognitionEventsImpl$(this);
}
});

$.$defineNativeClass('SpeechRecognitionError', ["message?"], {
});

$.$defineNativeClass('SpeechRecognitionResult', ["length?"], {
});

$.$defineNativeClass('SpeechRecognitionResultList', ["length?"], {
});

$.$defineNativeClass('Storage', [], {
 $dom_setItem$2: function(key, data) {
  return (this.setItem(key,data));
},
 $dom_removeItem$1: function(key) {
  return (this.removeItem(key));
},
 $dom_key$1: function(index) {
  return (this.key(index));
},
 $dom_getItem$1: function(key) {
  return (this.getItem(key));
},
 $dom_clear$0: function() {
  return (this.clear());
},
 get$$$dom_length: function() {
return this.length;
},
 isEmpty$0: function() {
  return this.$dom_key$1(0) == null;
},
 get$length: function() {
  return this.get$$$dom_length();
},
 getValues$0: function() {
  var values = [];
  this.forEach$1(new $._StorageImpl_getValues_anon(values));
  return values;
},
 getKeys$0: function() {
  var keys = [];
  this.forEach$1(new $._StorageImpl_getKeys_anon(keys));
  return keys;
},
 forEach$1: function(f) {
  for (var i = 0; true; ++i) {
    var key = this.$dom_key$1(i);
    if (key == null)
      return;
    f.call$2(key, this.operator$index$1(key));
  }
},
 clear$0: function() {
  return this.$dom_clear$0();
},
 remove$1: function(key) {
  var value = this.operator$index$1(key);
  this.$dom_removeItem$1(key);
  return value;
},
 operator$indexSet$2: function(key, value) {
  return this.$dom_setItem$2(key, value);
},
 operator$index$1: function(key) {
  return this.$dom_getItem$1(key);
},
 containsKey$1: function(key) {
  return !(this.$dom_getItem$1(key) == null);
},
 is$Map: function() { return true; }
});

$.$defineNativeClass('StorageEvent', ["key?"], {
});

$.$defineNativeClass('HTMLStyleElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('StyleSheetList', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, (({T: 'StyleSheet'})));
  return t1;
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLTableCaptionElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableCellElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableColElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableRowElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableSectionElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTextAreaElement', ["value=", "rows!", "placeholder!", "name?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('TextEvent', ["data?"], {
});

$.$defineNativeClass('TextTrack', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return (this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return (this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 get$on: function() {
  return $._TextTrackEventsImpl$(this);
}
});

$.$defineNativeClass('TextTrackCue', ["text=", "id?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return (this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return (this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 get$on: function() {
  return $._TextTrackCueEventsImpl$(this);
}
});

$.$defineNativeClass('TextTrackCueList', ["length?"], {
});

$.$defineNativeClass('TextTrackList', ["length?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return (this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return (this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 get$on: function() {
  return $._TextTrackListEventsImpl$(this);
}
});

$.$defineNativeClass('TimeRanges', ["length?"], {
});

$.$defineNativeClass('HTMLTitleElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('TouchList', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, (({T: 'Touch'})));
  return t1;
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLTrackElement', ["readyState?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('TreeWalker', [], {
 filter$1: function(arg0) { return this.filter.call$1(arg0); }
});

$.$defineNativeClass('HTMLUListElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('Uint16Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, (({T: 'int'})));
  return t1;
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint32Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, (({T: 'int'})));
  return t1;
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint8Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, (({T: 'int'})));
  return t1;
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint8ClampedArray', [], {
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLUnknownElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLVideoElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('WebGLActiveInfo', ["name?"], {
});

$.$defineNativeClass('WebKitNamedFlow', ["name?"], {
});

$.$defineNativeClass('WebSocket', ["readyState?"], {
 send$1: function(data) {
  return (this.send(data));
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return (this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 close$2: function(code, reason) {
  return (this.close(code,reason));
},
 close$0: function() {
  return this.close();
},
 get$close: function() { return new $.BoundClosure1(this, 'close$2'); },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return (this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 get$on: function() {
  return $._WebSocketEventsImpl$(this);
}
});

$.$defineNativeClass('DOMWindow', ["navigator?", "name?", "length?"], {
 setTimeout$2: function(handler, timeout) {
  return (this.setTimeout($.convertDartClosureToJS(handler, 0),timeout));
},
 setInterval$2: function(handler, timeout) {
  return (this.setInterval($.convertDartClosureToJS(handler, 0),timeout));
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return (this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 focus$0: function() {
  return (this.focus());
},
 get$focus: function() { return new $.BoundClosure(this, 'focus$0'); },
 close$0: function() {
  return (this.close());
},
 get$close: function() { return new $.BoundClosure(this, 'close$0'); },
 blur$0: function() {
  return (this.blur());
},
 get$blur: function() { return new $.BoundClosure(this, 'blur$0'); },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return (this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 get$on: function() {
  return $._WindowEventsImpl$(this);
},
 open$3: function(url, name$, options) {
  if (options == null)
    return $._DOMWindowCrossFrameImpl__createSafe(this._open2$2(url, name$));
  else
    return $._DOMWindowCrossFrameImpl__createSafe(this._open3$3(url, name$, options));
},
 get$open: function() { return new $.BoundClosure2(this, 'open$3'); },
 _open3$3: function(url, name, options) {
return this.open(url, name, options);
},
 _open2$2: function(url, name) {
return this.open(url, name);
}
});

$.$defineNativeClass('Worker', [], {
 postMessage$2: function(message, messagePorts) {
  return (this.postMessage(message,messagePorts));
},
 postMessage$1: function(message) {
  return this.postMessage(message);
},
 get$on: function() {
  return $._WorkerEventsImpl$(this);
}
});

$.$defineNativeClass('WorkerContext', ["navigator?"], {
 setTimeout$2: function(handler, timeout) {
  return (this.setTimeout($.convertDartClosureToJS(handler, 0),timeout));
},
 setInterval$2: function(handler, timeout) {
  return (this.setInterval($.convertDartClosureToJS(handler, 0),timeout));
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return (this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 close$0: function() {
  return (this.close());
},
 get$close: function() { return new $.BoundClosure(this, 'close$0'); },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return (this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
  {
  return $._WorkerContextEventsImpl$(this);
}
  } else {
    return Object.prototype.get$on.call(this);
  }

}
});

$.$defineNativeClass('WorkerLocation', [], {
 toString$0: function() {
  return (this.toString());
}
});

$.$defineNativeClass('WorkerNavigator', ["userAgent?"], {
});

$.$defineNativeClass('XMLHttpRequest', ["readyState?"], {
 send$1: function(data) {
  return (this.send(data));
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return (this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 open$5: function(method, url, async, user, password) {
  return (this.open(method,url,async,user,password));
},
 get$open: function() { return new $.BoundClosure3(this, 'open$5'); },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return (this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 get$on: function() {
  return $._XMLHttpRequestEventsImpl$(this);
}
});

$.$defineNativeClass('XMLHttpRequestException', ["name?", "message?"], {
 toString$0: function() {
  return (this.toString());
}
});

$.$defineNativeClass('XMLHttpRequestUpload', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return (this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return (this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture));
},
 get$on: function() {
  return $._XMLHttpRequestUploadEventsImpl$(this);
}
});

$.$defineNativeClass('XPathException', ["name?", "message?"], {
 toString$0: function() {
  return (this.toString());
}
});

$.$defineNativeClass('XSLTProcessor', [], {
 reset$0: function() {
  return (this.reset());
}
});

$.$defineNativeClass('IDBOpenDBRequest', [], {
 get$on: function() {
  return $._IDBOpenDBRequestEventsImpl$(this);
}
});

$.$defineNativeClass('Worker', [], {
 postMessage$1: function(msg) {
return this.postMessage(msg);
},
 get$id: function() {
return this.id;
}
});

$.$defineNativeClass('DOMWindow', [], {
 setInterval$2: function(handler, timeout) {
  return (this.setInterval($.convertDartClosureToJS(handler, 0),timeout));
},
 setTimeout$2: function(handler, timeout) {
  return (this.setTimeout($.convertDartClosureToJS(handler, 0),timeout));
}
});

// 304 dynamic classes.
// 320 classes
// 27 !leaf
(function(){
  var v0/*class(_SVGTextPositioningElementImpl)*/ = 'SVGTextPositioningElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement';
  var v1/*class(_SVGTextContentElementImpl)*/ = [v0/*class(_SVGTextPositioningElementImpl)*/,v0/*class(_SVGTextPositioningElementImpl)*/,'SVGTextContentElement|SVGTextPathElement|SVGTextPathElement'].join('|');
  var v2/*class(_SVGGradientElementImpl)*/ = 'SVGGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGRadialGradientElement|SVGLinearGradientElement';
  var v3/*class(_SVGComponentTransferFunctionElementImpl)*/ = 'SVGComponentTransferFunctionElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement';
  var v4/*class(_SVGAnimationElementImpl)*/ = 'SVGAnimationElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement';
  var v5/*class(_SVGElementImpl)*/ = [v1/*class(_SVGTextContentElementImpl)*/,v2/*class(_SVGGradientElementImpl)*/,v3/*class(_SVGComponentTransferFunctionElementImpl)*/,v4/*class(_SVGAnimationElementImpl)*/,v1/*class(_SVGTextContentElementImpl)*/,v2/*class(_SVGGradientElementImpl)*/,v3/*class(_SVGComponentTransferFunctionElementImpl)*/,v4/*class(_SVGAnimationElementImpl)*/,'SVGElement|SVGViewElement|SVGVKernElement|SVGUseElement|SVGTitleElement|SVGSymbolElement|SVGSwitchElement|SVGStyleElement|SVGStopElement|SVGScriptElement|SVGSVGElement|SVGRectElement|SVGPolylineElement|SVGPolygonElement|SVGPatternElement|SVGPathElement|SVGMissingGlyphElement|SVGMetadataElement|SVGMaskElement|SVGMarkerElement|SVGMPathElement|SVGLineElement|SVGImageElement|SVGHKernElement|SVGGlyphRefElement|SVGGlyphElement|SVGGElement|SVGForeignObjectElement|SVGFontFaceUriElement|SVGFontFaceSrcElement|SVGFontFaceNameElement|SVGFontFaceFormatElement|SVGFontFaceElement|SVGFontElement|SVGFilterElement|SVGFETurbulenceElement|SVGFETileElement|SVGFESpotLightElement|SVGFESpecularLightingElement|SVGFEPointLightElement|SVGFEOffsetElement|SVGFEMorphologyElement|SVGFEMergeNodeElement|SVGFEMergeElement|SVGFEImageElement|SVGFEGaussianBlurElement|SVGFEFloodElement|SVGFEDropShadowElement|SVGFEDistantLightElement|SVGFEDisplacementMapElement|SVGFEDiffuseLightingElement|SVGFEConvolveMatrixElement|SVGFECompositeElement|SVGFEComponentTransferElement|SVGFEColorMatrixElement|SVGFEBlendElement|SVGEllipseElement|SVGDescElement|SVGDefsElement|SVGCursorElement|SVGClipPathElement|SVGCircleElement|SVGAltGlyphItemElement|SVGAltGlyphDefElement|SVGAElement|SVGViewElement|SVGVKernElement|SVGUseElement|SVGTitleElement|SVGSymbolElement|SVGSwitchElement|SVGStyleElement|SVGStopElement|SVGScriptElement|SVGSVGElement|SVGRectElement|SVGPolylineElement|SVGPolygonElement|SVGPatternElement|SVGPathElement|SVGMissingGlyphElement|SVGMetadataElement|SVGMaskElement|SVGMarkerElement|SVGMPathElement|SVGLineElement|SVGImageElement|SVGHKernElement|SVGGlyphRefElement|SVGGlyphElement|SVGGElement|SVGForeignObjectElement|SVGFontFaceUriElement|SVGFontFaceSrcElement|SVGFontFaceNameElement|SVGFontFaceFormatElement|SVGFontFaceElement|SVGFontElement|SVGFilterElement|SVGFETurbulenceElement|SVGFETileElement|SVGFESpotLightElement|SVGFESpecularLightingElement|SVGFEPointLightElement|SVGFEOffsetElement|SVGFEMorphologyElement|SVGFEMergeNodeElement|SVGFEMergeElement|SVGFEImageElement|SVGFEGaussianBlurElement|SVGFEFloodElement|SVGFEDropShadowElement|SVGFEDistantLightElement|SVGFEDisplacementMapElement|SVGFEDiffuseLightingElement|SVGFEConvolveMatrixElement|SVGFECompositeElement|SVGFEComponentTransferElement|SVGFEColorMatrixElement|SVGFEBlendElement|SVGEllipseElement|SVGDescElement|SVGDefsElement|SVGCursorElement|SVGClipPathElement|SVGCircleElement|SVGAltGlyphItemElement|SVGAltGlyphDefElement|SVGAElement'].join('|');
  var v6/*class(_MediaElementImpl)*/ = 'HTMLMediaElement|HTMLVideoElement|HTMLAudioElement|HTMLVideoElement|HTMLAudioElement';
  var v7/*class(_ElementImpl)*/ = [v5/*class(_SVGElementImpl)*/,v6/*class(_MediaElementImpl)*/,v5/*class(_SVGElementImpl)*/,v6/*class(_MediaElementImpl)*/,'Element|HTMLUnknownElement|HTMLUListElement|HTMLTrackElement|HTMLTitleElement|HTMLTextAreaElement|HTMLTableSectionElement|HTMLTableRowElement|HTMLTableElement|HTMLTableColElement|HTMLTableCellElement|HTMLTableCaptionElement|HTMLStyleElement|HTMLSpanElement|HTMLSourceElement|HTMLShadowElement|HTMLSelectElement|HTMLScriptElement|HTMLQuoteElement|HTMLProgressElement|HTMLPreElement|HTMLParamElement|HTMLParagraphElement|HTMLOutputElement|HTMLOptionElement|HTMLOptGroupElement|HTMLObjectElement|HTMLOListElement|HTMLModElement|HTMLMeterElement|HTMLMetaElement|HTMLMenuElement|HTMLMarqueeElement|HTMLMapElement|HTMLLinkElement|HTMLLegendElement|HTMLLabelElement|HTMLLIElement|HTMLKeygenElement|HTMLInputElement|HTMLImageElement|HTMLIFrameElement|HTMLHtmlElement|HTMLHeadingElement|HTMLHeadElement|HTMLHRElement|HTMLFrameSetElement|HTMLFrameElement|HTMLFormElement|HTMLFontElement|HTMLFieldSetElement|HTMLEmbedElement|HTMLDivElement|HTMLDirectoryElement|HTMLDetailsElement|HTMLDListElement|HTMLContentElement|HTMLCanvasElement|HTMLButtonElement|HTMLBodyElement|HTMLBaseFontElement|HTMLBaseElement|HTMLBRElement|HTMLAreaElement|HTMLAppletElement|HTMLAnchorElement|HTMLElement|HTMLUnknownElement|HTMLUListElement|HTMLTrackElement|HTMLTitleElement|HTMLTextAreaElement|HTMLTableSectionElement|HTMLTableRowElement|HTMLTableElement|HTMLTableColElement|HTMLTableCellElement|HTMLTableCaptionElement|HTMLStyleElement|HTMLSpanElement|HTMLSourceElement|HTMLShadowElement|HTMLSelectElement|HTMLScriptElement|HTMLQuoteElement|HTMLProgressElement|HTMLPreElement|HTMLParamElement|HTMLParagraphElement|HTMLOutputElement|HTMLOptionElement|HTMLOptGroupElement|HTMLObjectElement|HTMLOListElement|HTMLModElement|HTMLMeterElement|HTMLMetaElement|HTMLMenuElement|HTMLMarqueeElement|HTMLMapElement|HTMLLinkElement|HTMLLegendElement|HTMLLabelElement|HTMLLIElement|HTMLKeygenElement|HTMLInputElement|HTMLImageElement|HTMLIFrameElement|HTMLHtmlElement|HTMLHeadingElement|HTMLHeadElement|HTMLHRElement|HTMLFrameSetElement|HTMLFrameElement|HTMLFormElement|HTMLFontElement|HTMLFieldSetElement|HTMLEmbedElement|HTMLDivElement|HTMLDirectoryElement|HTMLDetailsElement|HTMLDListElement|HTMLContentElement|HTMLCanvasElement|HTMLButtonElement|HTMLBodyElement|HTMLBaseFontElement|HTMLBaseElement|HTMLBRElement|HTMLAreaElement|HTMLAppletElement|HTMLAnchorElement|HTMLElement'].join('|');
  var v8/*class(_DocumentFragmentImpl)*/ = 'DocumentFragment|ShadowRoot|ShadowRoot';
  var v9/*class(_DocumentImpl)*/ = 'HTMLDocument|SVGDocument|SVGDocument';
  var v10/*class(_CharacterDataImpl)*/ = 'CharacterData|Text|CDATASection|CDATASection|Comment|Text|CDATASection|CDATASection|Comment';
  var v11/*class(_WorkerContextImpl)*/ = 'WorkerContext|SharedWorkerContext|DedicatedWorkerContext|SharedWorkerContext|DedicatedWorkerContext';
  var v12/*class(_NodeImpl)*/ = [v7/*class(_ElementImpl)*/,v8/*class(_DocumentFragmentImpl)*/,v9/*class(_DocumentImpl)*/,v10/*class(_CharacterDataImpl)*/,v7/*class(_ElementImpl)*/,v8/*class(_DocumentFragmentImpl)*/,v9/*class(_DocumentImpl)*/,v10/*class(_CharacterDataImpl)*/,'Node|ProcessingInstruction|Notation|EntityReference|Entity|DocumentType|Attr|ProcessingInstruction|Notation|EntityReference|Entity|DocumentType|Attr'].join('|');
  var v13/*class(_MediaStreamImpl)*/ = 'MediaStream|LocalMediaStream|LocalMediaStream';
  var v14/*class(_IDBRequestImpl)*/ = 'IDBRequest|IDBOpenDBRequest|IDBVersionChangeRequest|IDBOpenDBRequest|IDBVersionChangeRequest';
  var v15/*class(_AbstractWorkerImpl)*/ = 'AbstractWorker|Worker|SharedWorker|Worker|SharedWorker';
  var table = [
    // [dynamic-dispatch-tag, tags of classes implementing dynamic-dispatch-tag]
    ['SVGTextPositioningElement', v0/*class(_SVGTextPositioningElementImpl)*/],
    ['SVGTextContentElement', v1/*class(_SVGTextContentElementImpl)*/],
    ['AbstractWorker', v15/*class(_AbstractWorkerImpl)*/],
    ['Uint8Array', 'Uint8Array|Uint8ClampedArray|Uint8ClampedArray'],
    ['AudioParam', 'AudioParam|AudioGain|AudioGain'],
    ['WorkerContext', v11/*class(_WorkerContextImpl)*/],
    ['CSSValueList', 'CSSValueList|WebKitCSSFilterValue|WebKitCSSTransformValue|WebKitCSSFilterValue|WebKitCSSTransformValue'],
    ['CharacterData', v10/*class(_CharacterDataImpl)*/],
    ['DOMTokenList', 'DOMTokenList|DOMSettableTokenList|DOMSettableTokenList'],
    ['HTMLDocument', v9/*class(_DocumentImpl)*/],
    ['DocumentFragment', v8/*class(_DocumentFragmentImpl)*/],
    ['SVGGradientElement', v2/*class(_SVGGradientElementImpl)*/],
    ['SVGComponentTransferFunctionElement', v3/*class(_SVGComponentTransferFunctionElementImpl)*/],
    ['SVGAnimationElement', v4/*class(_SVGAnimationElementImpl)*/],
    ['SVGElement', v5/*class(_SVGElementImpl)*/],
    ['HTMLMediaElement', v6/*class(_MediaElementImpl)*/],
    ['Element', v7/*class(_ElementImpl)*/],
    ['Entry', 'Entry|FileEntry|DirectoryEntry|FileEntry|DirectoryEntry'],
    ['EntrySync', 'EntrySync|FileEntrySync|DirectoryEntrySync|FileEntrySync|DirectoryEntrySync'],
    ['Node', v12/*class(_NodeImpl)*/],
    ['MediaStream', v13/*class(_MediaStreamImpl)*/],
    ['IDBRequest', v14/*class(_IDBRequestImpl)*/],
    ['EventTarget', [v11/*class(_WorkerContextImpl)*/,v12/*class(_NodeImpl)*/,v13/*class(_MediaStreamImpl)*/,v14/*class(_IDBRequestImpl)*/,v15/*class(_AbstractWorkerImpl)*/,v11/*class(_WorkerContextImpl)*/,v12/*class(_NodeImpl)*/,v13/*class(_MediaStreamImpl)*/,v14/*class(_IDBRequestImpl)*/,v15/*class(_AbstractWorkerImpl)*/,'EventTarget|XMLHttpRequestUpload|XMLHttpRequest|DOMWindow|WebSocket|TextTrackList|TextTrackCue|TextTrack|SpeechRecognition|SourceBufferList|Performance|PeerConnection00|Notification|MessagePort|MediaStreamTrackList|MediaStreamTrack|MediaController|IDBTransaction|IDBDatabase|FileWriter|FileReader|EventSource|DOMApplicationCache|BatteryManager|AudioContext|XMLHttpRequestUpload|XMLHttpRequest|DOMWindow|WebSocket|TextTrackList|TextTrackCue|TextTrack|SpeechRecognition|SourceBufferList|Performance|PeerConnection00|Notification|MessagePort|MediaStreamTrackList|MediaStreamTrack|MediaController|IDBTransaction|IDBDatabase|FileWriter|FileReader|EventSource|DOMApplicationCache|BatteryManager|AudioContext'].join('|')],
    ['HTMLCollection', 'HTMLCollection|HTMLOptionsCollection|HTMLOptionsCollection'],
    ['IDBCursor', 'IDBCursor|IDBCursorWithValue|IDBCursorWithValue'],
    ['NodeList', 'NodeList|RadioNodeList|RadioNodeList']];
$.dynamicSetMetadata(table);
})();

var $globalThis = $;
var $globalState;
var $globals;
var $isWorker;
var $supportsWorkers;
var $thisScriptUrl;
function $static_init(){};

function $initGlobals(context) {
  context.isolateStatics = new Isolate();
}
function $setGlobals(context) {
  $ = context.isolateStatics;
  $globalThis = $;
}
$.main.call$0 = $.main
if (typeof document != 'undefined' && document.readyState != 'complete') {
  document.addEventListener('readystatechange', function () {
    if (document.readyState == 'complete') {
      $.startRootIsolate($.main);
    }
  }, false);
} else {
  $.startRootIsolate($.main);
}
function init() {
Isolate.$isolateProperties = {};
Isolate.$defineClass = function(cls, fields, prototype) {
  var generateGetterSetter = function(field, prototype) {
  var len = field.length;
  var lastChar = field[len - 1];
  var needsGetter = lastChar == '?' || lastChar == '=';
  var needsSetter = lastChar == '!' || lastChar == '=';
  if (needsGetter || needsSetter) field = field.substring(0, len - 1);
  if (needsGetter) {
    var getterString = "return this." + field + ";";
    prototype["get$" + field] = new Function(getterString);
  }
  if (needsSetter) {
    var setterString = "this." + field + " = v;";
    prototype["set$" + field] = new Function("v", setterString);
  }
  return field;
};
  var constructor;
  if (typeof fields == 'function') {
    constructor = fields;
  } else {
    var str = "function " + cls + "(";
    var body = "";
    for (var i = 0; i < fields.length; i++) {
      if (i != 0) str += ", ";
      var field = fields[i];
      field = generateGetterSetter(field, prototype);
      str += field;
      body += "this." + field + " = " + field + ";\n";
    }
    str += ") {" + body + "}\n";
    str += "return " + cls + ";";
    constructor = new Function(str)();
  }
  constructor.prototype = prototype;
  return constructor;
};
var supportsProto = false;
var tmp = Isolate.$defineClass('c', ['f?'], {}).prototype;
if (tmp.__proto__) {
  tmp.__proto__ = {};
  if (typeof tmp.get$f !== "undefined") supportsProto = true;
}
Isolate.$pendingClasses = {};
Isolate.$finishClasses = function(collectedClasses) {
  for (var cls in collectedClasses) {
    if (Object.prototype.hasOwnProperty.call(collectedClasses, cls)) {
      var desc = collectedClasses[cls];
      Isolate.$isolateProperties[cls] = Isolate.$defineClass(cls, desc[''], desc);
      if (desc['super'] !== "") Isolate.$pendingClasses[cls] = desc['super'];
    }
  }
  var pendingClasses = Isolate.$pendingClasses;
  Isolate.$pendingClasses = {};
  var finishedClasses = {};
  function finishClass(cls) {
    if (finishedClasses[cls]) return;
    finishedClasses[cls] = true;
    var superclass = pendingClasses[cls];
    if (!superclass) return;
    finishClass(superclass);
    var constructor = Isolate.$isolateProperties[cls];
    var superConstructor = Isolate.$isolateProperties[superclass];
    var prototype = constructor.prototype;
    if (supportsProto) {
      prototype.__proto__ = superConstructor.prototype;
      prototype.constructor = constructor;
    } else {
      function tmp() {};
      tmp.prototype = superConstructor.prototype;
      var newPrototype = new tmp();
      constructor.prototype = newPrototype;
      newPrototype.constructor = constructor;
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      for (var member in prototype) {
        if (member == '' || member == 'super') continue;
        if (hasOwnProperty.call(prototype, member)) {
          newPrototype[member] = prototype[member];
        }
      }
    }
  }
  for (var cls in pendingClasses) finishClass(cls);
};
Isolate.$finishIsolateConstructor = function(oldIsolate) {
  var isolateProperties = oldIsolate.$isolateProperties;
  var isolatePrototype = oldIsolate.prototype;
  var str = "{\n";
  str += "var properties = Isolate.$isolateProperties;\n";
  for (var staticName in isolateProperties) {
    if (Object.prototype.hasOwnProperty.call(isolateProperties, staticName)) {
      str += "this." + staticName + "= properties." + staticName + ";\n";
    }
  }
  str += "}\n";
  var newIsolate = new Function(str);
  newIsolate.prototype = isolatePrototype;
  isolatePrototype.constructor = newIsolate;
  newIsolate.$isolateProperties = isolateProperties;
  return newIsolate;
};
}
