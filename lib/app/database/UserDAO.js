"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserDAO = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _Users = require("../models/Users");

var mysql = _interopRequireWildcard(require("mysql"));

var util = _interopRequireWildcard(require("util"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/*
DAO file used for connecting the API to the database
This DAO handles the users table in our database
*/
var UserDAO = /*#__PURE__*/function () {
  /**
   * Non-default constructor.
   * 
   * @constructor
   * @param host Database Hostname
   * @param username Database Username
   * @param password Database Password
   */
  function UserDAO(host, port, username, password) {
    (0, _classCallCheck2.default)(this, UserDAO);
    (0, _defineProperty2.default)(this, "host", "clicker-cat.clkzoscxfp7p.us-west-1.rds.amazonaws.com");
    (0, _defineProperty2.default)(this, "port", 3306);
    (0, _defineProperty2.default)(this, "username", "admin");
    (0, _defineProperty2.default)(this, "password", "password");
    (0, _defineProperty2.default)(this, "schema", "ClickerCat");
    (0, _defineProperty2.default)(this, "pool", this.initDbConnection());
    // Set all class properties
    this.host = host;
    this.port = port;
    this.username = username;
    this.password = password;
    this.pool = this.initDbConnection();
  }
  /**
  * CRUD method to create a new user.
  * 
  * @param user User to insert.
  * @param callback Callback function with -1 if an error else User ID created.  
  */


  (0, _createClass2.default)(UserDAO, [{
    key: "create",
    value: function create(user, callback) {
      // Get pooled database connection and run queries   
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(err, connection) {
          var result1, userId;
          return _regenerator.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!err) {
                    _context.next = 2;
                    break;
                  }

                  throw err;

                case 2:
                  // Use Promisfy Util to make an async function and insert User
                  connection.query = util.promisify(connection.query); // Database query assigned to a result variable

                  _context.next = 5;
                  return connection.query('INSERT INTO `Users` (EMAIL, PASSWORD, NAME) VALUES(?,?,?)', [user.Email, user.Password, user.Name]);

                case 5:
                  result1 = _context.sent;
                  // If no rows were affected then return -1 to indicate an error
                  if (result1.affectedRows != 1) callback(-1); //getting the id of the newly created User

                  userId = result1.insertId; // Do a callback to return the results

                  callback(userId);

                case 9:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }());
    }
    /**
    * CRUD method to return all Users.
    * 
    * @param callback Callback function with an Array of type Users.
    */

  }, {
    key: "findUsers",
    value: function findUsers(callback) {
      // List of Users to return
      var users = []; // Get a pooled connection to the database, run the query to get all the users, and return the List of Users

      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(err, connection) {
          var result1, x;
          return _regenerator.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  if (!err) {
                    _context2.next = 2;
                    break;
                  }

                  throw err;

                case 2:
                  // Use Promisfy Util to make an async function and run query to get all users
                  connection.query = util.promisify(connection.query); // Database query assigned to a result variable

                  _context2.next = 5;
                  return connection.query('SELECT * FROM `Users`');

                case 5:
                  result1 = _context2.sent;

                  // Looping over the results and adding each user to the list
                  for (x = 0; x < result1.length; ++x) {
                    // Add user and its data to the list
                    users.push(new _Users.User(result1[x].ID, result1[x].EMAIL, result1[x].PASSWORD, result1[x].NAME, result1[x].ROLE));
                  } // Do a callback to return the results


                  callback(users);

                case 8:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        return function (_x3, _x4) {
          return _ref2.apply(this, arguments);
        };
      }());
    }
    /**
     * Method to find a user by their ID
     * 
     * @param id Id of the user being searched
     * @param callback Callback function with an Array of type Users.
     */

  }, {
    key: "findUserById",
    value: function findUserById(id, callback) {
      // User that's going to be returned
      var user; // Get pooled database connection and run queries   

      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(err, connection) {
          var result1, x;
          return _regenerator.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  if (!err) {
                    _context3.next = 2;
                    break;
                  }

                  throw err;

                case 2:
                  // Use Promisfy Util to make an async function and run query to get all Users for search
                  connection.query = util.promisify(connection.query); // Database query assigned to a result variable

                  _context3.next = 5;
                  return connection.query("SELECT * FROM `Users` WHERE ID = ?", id);

                case 5:
                  result1 = _context3.sent;

                  // Assigning the result to the user model using a loop
                  for (x = 0; x < result1.length; ++x) {
                    // Get user from the database to return
                    user = new _Users.User(result1[x].ID, result1[x].EMAIL, result1[x].PASSWORD, result1[x].NAME, result1[x].ROLE);
                  } // Do a callback to return the results


                  callback(user);

                case 8:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }));

        return function (_x5, _x6) {
          return _ref3.apply(this, arguments);
        };
      }());
    }
    /**
     * Method to find a user by their Email
     * 
     * @param email email of the user being searched
     * @param callback Callback function with an Array of type Users.
     */

  }, {
    key: "findUserByEmail",
    value: function findUserByEmail(email, callback) {
      // User that's going to be returned
      var user; // Get pooled database connection and run queries   

      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(err, connection) {
          var result1, x;
          return _regenerator.default.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  if (!err) {
                    _context4.next = 2;
                    break;
                  }

                  throw err;

                case 2:
                  // Use Promisfy Util to make an async function and run query to get all Users for search
                  connection.query = util.promisify(connection.query); // Database query assigned to a result variable

                  _context4.next = 5;
                  return connection.query("SELECT * FROM `Users` WHERE EMAIL = ?", email);

                case 5:
                  result1 = _context4.sent;

                  // Adding the result to the user model 
                  for (x = 0; x < result1.length; ++x) {
                    // Get user from the database to return
                    user = new _Users.User(result1[x].ID, result1[x].EMAIL, result1[x].PASSWORD, result1[x].NAME, result1[x].ROLE);
                  } // Do a callback to return the results


                  callback(user);

                case 8:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4);
        }));

        return function (_x7, _x8) {
          return _ref4.apply(this, arguments);
        };
      }());
    }
    /**
    * CRUD method to update a User.
    * 
    * @param user User to update.
    * @param callback Callback function with number of rows updated.  
    */

  }, {
    key: "update",
    value: function update(user, callback) {
      // Get pooled database connection and run queries   
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref5 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(err, connection) {
          var changes, result1;
          return _regenerator.default.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  if (!err) {
                    _context5.next = 2;
                    break;
                  }

                  throw err;

                case 2:
                  // Use Promisfy Util to make an async function and update User
                  changes = 0; // Use Promisfy Util to make an async function and insert User

                  connection.query = util.promisify(connection.query); // Database query assigned to a result variable

                  _context5.next = 6;
                  return connection.query("UPDATE `Users` SET EMAIL=?, PASSWORD=?, NAME=?", [user.Email, user.Password, user.Name]);

                case 6:
                  result1 = _context5.sent;
                  // If any row was affected in the database, update the changes variable to reflect that
                  if (result1.changedRows != 0) ++changes; // Log Changes

                  console.log(changes); // Do a callback to return the results

                  callback(changes);

                case 10:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5);
        }));

        return function (_x9, _x10) {
          return _ref5.apply(this, arguments);
        };
      }());
    }
    /**
    * CRUD method to delete a User.
    * 
    * @param userId User ID to delete.
    * @param callback Callback function with number of rows deleted.  
    * */

  }, {
    key: "delete",
    value: function _delete(userId, callback) {
      // Get pooled database connection and run queries   
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref6 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6(err, connection) {
          var changes, result1;
          return _regenerator.default.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  if (!err) {
                    _context6.next = 2;
                    break;
                  }

                  throw err;

                case 2:
                  // Use Promisfy Util to make an async function and run query to delete User
                  changes = 0; // Use Promisfy Util to make an async function and insert User

                  connection.query = util.promisify(connection.query); // Database query assigned to a result variable

                  _context6.next = 6;
                  return connection.query('DELETE FROM `Users` WHERE ID=?', [userId]);

                case 6:
                  result1 = _context6.sent;
                  // Set the affected rows to the changes variable
                  changes = changes + result1.affectedRows; // Do a callback to return the results

                  callback(changes);

                case 9:
                case "end":
                  return _context6.stop();
              }
            }
          }, _callee6);
        }));

        return function (_x11, _x12) {
          return _ref6.apply(this, arguments);
        };
      }());
    } //* **************** Private Helper Methods **************** */

    /**
     * Private helper method to initialie a Database Connection
     */

  }, {
    key: "initDbConnection",
    value: function initDbConnection() {
      //Return a database connection
      return mysql.createPool({
        host: this.host,
        port: this.port,
        user: this.username,
        password: this.password,
        database: this.schema,
        connectionLimit: 10
      });
    }
  }]);
  return UserDAO;
}();

exports.UserDAO = UserDAO;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9kYXRhYmFzZS9Vc2VyREFPLnRzIl0sIm5hbWVzIjpbIlVzZXJEQU8iLCJob3N0IiwicG9ydCIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJpbml0RGJDb25uZWN0aW9uIiwicG9vbCIsInVzZXIiLCJjYWxsYmFjayIsImdldENvbm5lY3Rpb24iLCJlcnIiLCJjb25uZWN0aW9uIiwicXVlcnkiLCJ1dGlsIiwicHJvbWlzaWZ5IiwiRW1haWwiLCJQYXNzd29yZCIsIk5hbWUiLCJyZXN1bHQxIiwiYWZmZWN0ZWRSb3dzIiwidXNlcklkIiwiaW5zZXJ0SWQiLCJ1c2VycyIsIngiLCJsZW5ndGgiLCJwdXNoIiwiVXNlciIsIklEIiwiRU1BSUwiLCJQQVNTV09SRCIsIk5BTUUiLCJST0xFIiwiaWQiLCJlbWFpbCIsImNoYW5nZXMiLCJjaGFuZ2VkUm93cyIsImNvbnNvbGUiLCJsb2ciLCJteXNxbCIsImNyZWF0ZVBvb2wiLCJkYXRhYmFzZSIsInNjaGVtYSIsImNvbm5lY3Rpb25MaW1pdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0lBRWFBLE87QUFTVDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0ksbUJBQVlDLElBQVosRUFBeUJDLElBQXpCLEVBQXNDQyxRQUF0QyxFQUF1REMsUUFBdkQsRUFDQTtBQUFBO0FBQUEsZ0RBaEJzQixzREFnQnRCO0FBQUEsZ0RBZnNCLElBZXRCO0FBQUEsb0RBZDBCLE9BYzFCO0FBQUEsb0RBYjBCLFVBYTFCO0FBQUEsa0RBWndCLFlBWXhCO0FBQUEsZ0RBWGUsS0FBS0MsZ0JBQUwsRUFXZjtBQUNJO0FBQ0EsU0FBS0osSUFBTCxHQUFZQSxJQUFaO0FBQ0EsU0FBS0MsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQkEsUUFBaEI7QUFDQSxTQUFLQyxRQUFMLEdBQWdCQSxR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QUFBQSxVQUFVLENBQUNDLEtBQVgsR0FBbUJDLElBQUksQ0FBQ0MsU0FBTCxDQUFlSCxVQUFVLENBQUNDLEtBQTFCLENBQW5CLENBUm9CLENBU3BCOztBQVRvQjtBQUFBLHlCQVVBRCxVQUFVLENBQUNDLEtBQVgsQ0FBaUIsZ0NBQWpCLEVBQW1ELENBQUNRLE1BQUQsQ0FBbkQsQ0FWQTs7QUFBQTtBQVVoQkYsa0JBQUFBLE9BVmdCO0FBV3BCO0FBQ0FnQixrQkFBQUEsT0FBTyxHQUFHQSxPQUFPLEdBQUdoQixPQUFPLENBQUNDLFlBQTVCLENBWm9CLENBY3BCOztBQUNBWCxrQkFBQUEsUUFBUSxDQUFDMEIsT0FBRCxDQUFSOztBQWZvQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUF4Qjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQWlCSCxLLENBRUQ7O0FBRUE7QUFDSjtBQUNBOzs7O1dBQ0ksNEJBQ0E7QUFDSTtBQUNBLGFBQU9JLEtBQUssQ0FBQ0MsVUFBTixDQUFpQjtBQUFDdEMsUUFBQUEsSUFBSSxFQUFFLEtBQUtBLElBQVo7QUFBa0JDLFFBQUFBLElBQUksRUFBRSxLQUFLQSxJQUE3QjtBQUFtQ0ssUUFBQUEsSUFBSSxFQUFFLEtBQUtKLFFBQTlDO0FBQXdEQyxRQUFBQSxRQUFRLEVBQUUsS0FBS0EsUUFBdkU7QUFBaUZvQyxRQUFBQSxRQUFRLEVBQUUsS0FBS0MsTUFBaEc7QUFBd0dDLFFBQUFBLGVBQWUsRUFBRTtBQUF6SCxPQUFqQixDQUFQO0FBQ0giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uL21vZGVscy9Vc2Vyc1wiO1xuaW1wb3J0ICogYXMgbXlzcWwgZnJvbSBcIm15c3FsXCI7XG5pbXBvcnQgKiBhcyB1dGlsIGZyb20gXCJ1dGlsXCI7XG5cbi8qXG5EQU8gZmlsZSB1c2VkIGZvciBjb25uZWN0aW5nIHRoZSBBUEkgdG8gdGhlIGRhdGFiYXNlXG5UaGlzIERBTyBoYW5kbGVzIHRoZSB1c2VycyB0YWJsZSBpbiBvdXIgZGF0YWJhc2VcbiovXG5cbmV4cG9ydCBjbGFzcyBVc2VyREFPXG57XG4gICAgcHJpdmF0ZSBob3N0OnN0cmluZyA9IFwiY2xpY2tlci1jYXQuY2xrem9zY3hmcDdwLnVzLXdlc3QtMS5yZHMuYW1hem9uYXdzLmNvbVwiO1xuICAgIHByaXZhdGUgcG9ydDpudW1iZXIgPSAzMzA2O1xuICAgIHByaXZhdGUgdXNlcm5hbWU6c3RyaW5nID0gXCJhZG1pblwiO1xuICAgIHByaXZhdGUgcGFzc3dvcmQ6c3RyaW5nID0gXCJwYXNzd29yZFwiO1xuICAgIHByaXZhdGUgc2NoZW1hOnN0cmluZyA9IFwiQ2xpY2tlckNhdFwiO1xuICAgIHByaXZhdGUgcG9vbCA9IHRoaXMuaW5pdERiQ29ubmVjdGlvbigpO1xuICAgIFxuICAgIC8qKlxuICAgICAqIE5vbi1kZWZhdWx0IGNvbnN0cnVjdG9yLlxuICAgICAqIFxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSBob3N0IERhdGFiYXNlIEhvc3RuYW1lXG4gICAgICogQHBhcmFtIHVzZXJuYW1lIERhdGFiYXNlIFVzZXJuYW1lXG4gICAgICogQHBhcmFtIHBhc3N3b3JkIERhdGFiYXNlIFBhc3N3b3JkXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoaG9zdDpzdHJpbmcsIHBvcnQ6bnVtYmVyLCB1c2VybmFtZTpzdHJpbmcsIHBhc3N3b3JkOnN0cmluZylcbiAgICB7XG4gICAgICAgIC8vIFNldCBhbGwgY2xhc3MgcHJvcGVydGllc1xuICAgICAgICB0aGlzLmhvc3QgPSBob3N0O1xuICAgICAgICB0aGlzLnBvcnQgPSBwb3J0O1xuICAgICAgICB0aGlzLnVzZXJuYW1lID0gdXNlcm5hbWU7XG4gICAgICAgIHRoaXMucGFzc3dvcmQgPSBwYXNzd29yZDtcbiAgICAgICAgdGhpcy5wb29sID0gdGhpcy5pbml0RGJDb25uZWN0aW9uKCk7XG4gICAgfVxuXG4gICAgIC8qKlxuICAgICAqIENSVUQgbWV0aG9kIHRvIGNyZWF0ZSBhIG5ldyB1c2VyLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB1c2VyIFVzZXIgdG8gaW5zZXJ0LlxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBDYWxsYmFjayBmdW5jdGlvbiB3aXRoIC0xIGlmIGFuIGVycm9yIGVsc2UgVXNlciBJRCBjcmVhdGVkLiAgXG4gICAgICovXG4gICAgcHVibGljIGNyZWF0ZSh1c2VyOlVzZXIsIGNhbGxiYWNrOiBhbnkpXG4gICAge1xuICAgICAgICAvLyBHZXQgcG9vbGVkIGRhdGFiYXNlIGNvbm5lY3Rpb24gYW5kIHJ1biBxdWVyaWVzICAgXG4gICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uKGVycjphbnksIGNvbm5lY3Rpb246YW55KVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBUaHJvdyBlcnJvciBpZiBhbiBlcnJvclxuICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyO1xuXG4gICAgICAgICAgICAvLyBVc2UgUHJvbWlzZnkgVXRpbCB0byBtYWtlIGFuIGFzeW5jIGZ1bmN0aW9uIGFuZCBpbnNlcnQgVXNlclxuICAgICAgICAgICAgY29ubmVjdGlvbi5xdWVyeSA9IHV0aWwucHJvbWlzaWZ5KGNvbm5lY3Rpb24ucXVlcnkpO1xuICAgICAgICAgICAgLy8gRGF0YWJhc2UgcXVlcnkgYXNzaWduZWQgdG8gYSByZXN1bHQgdmFyaWFibGVcbiAgICAgICAgICAgIGxldCByZXN1bHQxID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeSgnSU5TRVJUIElOVE8gYFVzZXJzYCAoRU1BSUwsIFBBU1NXT1JELCBOQU1FKSBWQUxVRVMoPyw/LD8pJywgW3VzZXIuRW1haWwsIHVzZXIuUGFzc3dvcmQsIHVzZXIuTmFtZV0pO1xuICAgICAgICAgICAgLy8gSWYgbm8gcm93cyB3ZXJlIGFmZmVjdGVkIHRoZW4gcmV0dXJuIC0xIHRvIGluZGljYXRlIGFuIGVycm9yXG4gICAgICAgICAgICBpZihyZXN1bHQxLmFmZmVjdGVkUm93cyAhPSAxKVxuICAgICAgICAgICAgICAgY2FsbGJhY2soLTEpO1xuXG4gICAgICAgICAgICAvL2dldHRpbmcgdGhlIGlkIG9mIHRoZSBuZXdseSBjcmVhdGVkIFVzZXJcbiAgICAgICAgICAgIGxldCB1c2VySWQgPSByZXN1bHQxLmluc2VydElkO1xuXG4gICAgICAgICAgICAvLyBEbyBhIGNhbGxiYWNrIHRvIHJldHVybiB0aGUgcmVzdWx0c1xuICAgICAgICAgICAgY2FsbGJhY2sodXNlcklkKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgIC8qKlxuICAgICAqIENSVUQgbWV0aG9kIHRvIHJldHVybiBhbGwgVXNlcnMuXG4gICAgICogXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIENhbGxiYWNrIGZ1bmN0aW9uIHdpdGggYW4gQXJyYXkgb2YgdHlwZSBVc2Vycy5cbiAgICAgKi9cbiAgICBwdWJsaWMgZmluZFVzZXJzKGNhbGxiYWNrOiBhbnkpXG4gICAge1xuICAgICAgICAvLyBMaXN0IG9mIFVzZXJzIHRvIHJldHVyblxuICAgICAgICBsZXQgdXNlcnM6VXNlcltdID0gW107XG4gICAgICAgIFxuICAgICAgICAvLyBHZXQgYSBwb29sZWQgY29ubmVjdGlvbiB0byB0aGUgZGF0YWJhc2UsIHJ1biB0aGUgcXVlcnkgdG8gZ2V0IGFsbCB0aGUgdXNlcnMsIGFuZCByZXR1cm4gdGhlIExpc3Qgb2YgVXNlcnNcbiAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24oZXJyOmFueSwgY29ubmVjdGlvbjphbnkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIFRocm93IGVycm9yIGlmIGFuIGVycm9yXG4gICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XG5cbiAgICAgICAgICAgIC8vIFVzZSBQcm9taXNmeSBVdGlsIHRvIG1ha2UgYW4gYXN5bmMgZnVuY3Rpb24gYW5kIHJ1biBxdWVyeSB0byBnZXQgYWxsIHVzZXJzXG4gICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XG4gICAgICAgICAgICAvLyBEYXRhYmFzZSBxdWVyeSBhc3NpZ25lZCB0byBhIHJlc3VsdCB2YXJpYWJsZVxuICAgICAgICAgICAgbGV0IHJlc3VsdDEgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KCdTRUxFQ1QgKiBGUk9NIGBVc2Vyc2AnKTtcbiAgICAgICAgICAgIC8vIExvb3Bpbmcgb3ZlciB0aGUgcmVzdWx0cyBhbmQgYWRkaW5nIGVhY2ggdXNlciB0byB0aGUgbGlzdFxuICAgICAgICAgICAgZm9yKGxldCB4PTA7eCA8IHJlc3VsdDEubGVuZ3RoOysreClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvLyBBZGQgdXNlciBhbmQgaXRzIGRhdGEgdG8gdGhlIGxpc3RcbiAgICAgICAgICAgICAgICB1c2Vycy5wdXNoKG5ldyBVc2VyKHJlc3VsdDFbeF0uSUQsIHJlc3VsdDFbeF0uRU1BSUwsIHJlc3VsdDFbeF0uUEFTU1dPUkQsIHJlc3VsdDFbeF0uTkFNRSwgcmVzdWx0MVt4XS5ST0xFKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIERvIGEgY2FsbGJhY2sgdG8gcmV0dXJuIHRoZSByZXN1bHRzXG4gICAgICAgICAgICBjYWxsYmFjayh1c2Vycyk7XG4gICAgICAgICB9KTtcbiAgICAgfVxuXG4gICAgLyoqXG4gICAgICogTWV0aG9kIHRvIGZpbmQgYSB1c2VyIGJ5IHRoZWlyIElEXG4gICAgICogXG4gICAgICogQHBhcmFtIGlkIElkIG9mIHRoZSB1c2VyIGJlaW5nIHNlYXJjaGVkXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIENhbGxiYWNrIGZ1bmN0aW9uIHdpdGggYW4gQXJyYXkgb2YgdHlwZSBVc2Vycy5cbiAgICAgKi9cbiAgICBwdWJsaWMgZmluZFVzZXJCeUlkKGlkOm51bWJlciwgY2FsbGJhY2s6IGFueSlcbiAgICB7XG4gICAgICAgIC8vIFVzZXIgdGhhdCdzIGdvaW5nIHRvIGJlIHJldHVybmVkXG4gICAgICAgIGxldCB1c2VyOlVzZXI7XG5cbiAgICAgICAgLy8gR2V0IHBvb2xlZCBkYXRhYmFzZSBjb25uZWN0aW9uIGFuZCBydW4gcXVlcmllcyAgIFxuICAgICAgICB0aGlzLnBvb2wuZ2V0Q29ubmVjdGlvbihhc3luYyBmdW5jdGlvbihlcnI6YW55LCBjb25uZWN0aW9uOmFueSlcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gVGhyb3cgZXJyb3IgaWYgYW4gZXJyb3JcbiAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVycjtcblxuICAgICAgICAgICAgLy8gVXNlIFByb21pc2Z5IFV0aWwgdG8gbWFrZSBhbiBhc3luYyBmdW5jdGlvbiBhbmQgcnVuIHF1ZXJ5IHRvIGdldCBhbGwgVXNlcnMgZm9yIHNlYXJjaFxuICAgICAgICAgICAgY29ubmVjdGlvbi5xdWVyeSA9IHV0aWwucHJvbWlzaWZ5KGNvbm5lY3Rpb24ucXVlcnkpO1xuICAgICAgICAgICAgLy8gRGF0YWJhc2UgcXVlcnkgYXNzaWduZWQgdG8gYSByZXN1bHQgdmFyaWFibGVcbiAgICAgICAgICAgIGxldCByZXN1bHQxID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeShcIlNFTEVDVCAqIEZST00gYFVzZXJzYCBXSEVSRSBJRCA9ID9cIiwgaWQpO1xuICAgICAgICAgICAgLy8gQXNzaWduaW5nIHRoZSByZXN1bHQgdG8gdGhlIHVzZXIgbW9kZWwgdXNpbmcgYSBsb29wXG4gICAgICAgICAgICBmb3IobGV0IHg9MDt4IDwgcmVzdWx0MS5sZW5ndGg7Kyt4KVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC8vIEdldCB1c2VyIGZyb20gdGhlIGRhdGFiYXNlIHRvIHJldHVyblxuICAgICAgICAgICAgICAgIHVzZXIgPSBuZXcgVXNlcihyZXN1bHQxW3hdLklELCByZXN1bHQxW3hdLkVNQUlMLCByZXN1bHQxW3hdLlBBU1NXT1JELCByZXN1bHQxW3hdLk5BTUUsIHJlc3VsdDFbeF0uUk9MRSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBEbyBhIGNhbGxiYWNrIHRvIHJldHVybiB0aGUgcmVzdWx0c1xuICAgICAgICAgICAgY2FsbGJhY2sodXNlcik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1ldGhvZCB0byBmaW5kIGEgdXNlciBieSB0aGVpciBFbWFpbFxuICAgICAqIFxuICAgICAqIEBwYXJhbSBlbWFpbCBlbWFpbCBvZiB0aGUgdXNlciBiZWluZyBzZWFyY2hlZFxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBDYWxsYmFjayBmdW5jdGlvbiB3aXRoIGFuIEFycmF5IG9mIHR5cGUgVXNlcnMuXG4gICAgICovXG4gICAgcHVibGljIGZpbmRVc2VyQnlFbWFpbChlbWFpbDpzdHJpbmcsIGNhbGxiYWNrOiBhbnkpXG4gICAge1xuICAgICAgICAvLyBVc2VyIHRoYXQncyBnb2luZyB0byBiZSByZXR1cm5lZFxuICAgICAgICBsZXQgdXNlcjpVc2VyO1xuXG4gICAgICAgIC8vIEdldCBwb29sZWQgZGF0YWJhc2UgY29ubmVjdGlvbiBhbmQgcnVuIHF1ZXJpZXMgICBcbiAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24oZXJyOmFueSwgY29ubmVjdGlvbjphbnkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIFRocm93IGVycm9yIGlmIGFuIGVycm9yXG4gICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XG5cbiAgICAgICAgICAgIC8vIFVzZSBQcm9taXNmeSBVdGlsIHRvIG1ha2UgYW4gYXN5bmMgZnVuY3Rpb24gYW5kIHJ1biBxdWVyeSB0byBnZXQgYWxsIFVzZXJzIGZvciBzZWFyY2hcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcbiAgICAgICAgICAgIC8vIERhdGFiYXNlIHF1ZXJ5IGFzc2lnbmVkIHRvIGEgcmVzdWx0IHZhcmlhYmxlXG4gICAgICAgICAgICBsZXQgcmVzdWx0MSA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoXCJTRUxFQ1QgKiBGUk9NIGBVc2Vyc2AgV0hFUkUgRU1BSUwgPSA/XCIsIGVtYWlsKTtcbiAgICAgICAgICAgIC8vIEFkZGluZyB0aGUgcmVzdWx0IHRvIHRoZSB1c2VyIG1vZGVsIFxuICAgICAgICAgICAgZm9yKGxldCB4PTA7eCA8IHJlc3VsdDEubGVuZ3RoOysreClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvLyBHZXQgdXNlciBmcm9tIHRoZSBkYXRhYmFzZSB0byByZXR1cm5cbiAgICAgICAgICAgICAgICB1c2VyID0gbmV3IFVzZXIocmVzdWx0MVt4XS5JRCwgcmVzdWx0MVt4XS5FTUFJTCwgcmVzdWx0MVt4XS5QQVNTV09SRCwgcmVzdWx0MVt4XS5OQU1FLCByZXN1bHQxW3hdLlJPTEUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gRG8gYSBjYWxsYmFjayB0byByZXR1cm4gdGhlIHJlc3VsdHNcbiAgICAgICAgICAgIGNhbGxiYWNrKHVzZXIpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgIC8qKlxuICAgICAqIENSVUQgbWV0aG9kIHRvIHVwZGF0ZSBhIFVzZXIuXG4gICAgICogXG4gICAgICogQHBhcmFtIHVzZXIgVXNlciB0byB1cGRhdGUuXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIENhbGxiYWNrIGZ1bmN0aW9uIHdpdGggbnVtYmVyIG9mIHJvd3MgdXBkYXRlZC4gIFxuICAgICAqL1xuICAgIHB1YmxpYyB1cGRhdGUodXNlcjpVc2VyLCBjYWxsYmFjazogYW55KVxuICAgIHtcbiAgICAgICAgIC8vIEdldCBwb29sZWQgZGF0YWJhc2UgY29ubmVjdGlvbiBhbmQgcnVuIHF1ZXJpZXMgICBcbiAgICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uKGVycjphbnksIGNvbm5lY3Rpb246YW55KVxuICAgICAgICAge1xuICAgICAgICAgICAgIC8vIFRocm93IGVycm9yIGlmIGFuIGVycm9yXG4gICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XG4gXG4gICAgICAgICAgICAgLy8gVXNlIFByb21pc2Z5IFV0aWwgdG8gbWFrZSBhbiBhc3luYyBmdW5jdGlvbiBhbmQgdXBkYXRlIFVzZXJcbiAgICAgICAgICAgIGxldCBjaGFuZ2VzID0gMDtcbiAgICAgICAgICAgIC8vIFVzZSBQcm9taXNmeSBVdGlsIHRvIG1ha2UgYW4gYXN5bmMgZnVuY3Rpb24gYW5kIGluc2VydCBVc2VyXG4gICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XG4gICAgICAgICAgICAvLyBEYXRhYmFzZSBxdWVyeSBhc3NpZ25lZCB0byBhIHJlc3VsdCB2YXJpYWJsZVxuICAgICAgICAgICAgbGV0IHJlc3VsdDEgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KFwiVVBEQVRFIGBVc2Vyc2AgU0VUIEVNQUlMPT8sIFBBU1NXT1JEPT8sIE5BTUU9P1wiLCBbdXNlci5FbWFpbCwgdXNlci5QYXNzd29yZCwgdXNlci5OYW1lXSk7XG4gICAgICAgICAgICAvLyBJZiBhbnkgcm93IHdhcyBhZmZlY3RlZCBpbiB0aGUgZGF0YWJhc2UsIHVwZGF0ZSB0aGUgY2hhbmdlcyB2YXJpYWJsZSB0byByZWZsZWN0IHRoYXRcbiAgICAgICAgICAgIGlmKHJlc3VsdDEuY2hhbmdlZFJvd3MgIT0gMClcbiAgICAgICAgICAgICAgICArK2NoYW5nZXM7XG4gICAgICAgICAgICAvLyBMb2cgQ2hhbmdlc1xuICAgICAgICAgICAgY29uc29sZS5sb2coY2hhbmdlcyk7XG4gICAgICAgICAgICAvLyBEbyBhIGNhbGxiYWNrIHRvIHJldHVybiB0aGUgcmVzdWx0c1xuICAgICAgICAgICAgY2FsbGJhY2soY2hhbmdlcyk7XG4gICAgICAgICB9KTtcbiAgICAgfVxuXG4gICAgIC8qKlxuICAgICAqIENSVUQgbWV0aG9kIHRvIGRlbGV0ZSBhIFVzZXIuXG4gICAgICogXG4gICAgICogQHBhcmFtIHVzZXJJZCBVc2VyIElEIHRvIGRlbGV0ZS5cbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgQ2FsbGJhY2sgZnVuY3Rpb24gd2l0aCBudW1iZXIgb2Ygcm93cyBkZWxldGVkLiAgXG4gICAgICogKi9cbiAgICBwdWJsaWMgZGVsZXRlKHVzZXJJZDpudW1iZXIsIGNhbGxiYWNrOiBhbnkpXG4gICAge1xuICAgICAgICAvLyBHZXQgcG9vbGVkIGRhdGFiYXNlIGNvbm5lY3Rpb24gYW5kIHJ1biBxdWVyaWVzICAgXG4gICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uKGVycjphbnksIGNvbm5lY3Rpb246YW55KVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBUaHJvdyBlcnJvciBpZiBhbiBlcnJvclxuICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XG5cbiAgICAgICAgICAgIC8vIFVzZSBQcm9taXNmeSBVdGlsIHRvIG1ha2UgYW4gYXN5bmMgZnVuY3Rpb24gYW5kIHJ1biBxdWVyeSB0byBkZWxldGUgVXNlclxuICAgICAgICAgICAgbGV0IGNoYW5nZXMgPSAwO1xuICAgICAgICAgICAgLy8gVXNlIFByb21pc2Z5IFV0aWwgdG8gbWFrZSBhbiBhc3luYyBmdW5jdGlvbiBhbmQgaW5zZXJ0IFVzZXJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcbiAgICAgICAgICAgIC8vIERhdGFiYXNlIHF1ZXJ5IGFzc2lnbmVkIHRvIGEgcmVzdWx0IHZhcmlhYmxlXG4gICAgICAgICAgICBsZXQgcmVzdWx0MSA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoJ0RFTEVURSBGUk9NIGBVc2Vyc2AgV0hFUkUgSUQ9PycsIFt1c2VySWRdKTtcbiAgICAgICAgICAgIC8vIFNldCB0aGUgYWZmZWN0ZWQgcm93cyB0byB0aGUgY2hhbmdlcyB2YXJpYWJsZVxuICAgICAgICAgICAgY2hhbmdlcyA9IGNoYW5nZXMgKyByZXN1bHQxLmFmZmVjdGVkUm93cztcblxuICAgICAgICAgICAgLy8gRG8gYSBjYWxsYmFjayB0byByZXR1cm4gdGhlIHJlc3VsdHNcbiAgICAgICAgICAgIGNhbGxiYWNrKGNoYW5nZXMpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyogKioqKioqKioqKioqKioqKiBQcml2YXRlIEhlbHBlciBNZXRob2RzICoqKioqKioqKioqKioqKiogKi9cblxuICAgIC8qKlxuICAgICAqIFByaXZhdGUgaGVscGVyIG1ldGhvZCB0byBpbml0aWFsaWUgYSBEYXRhYmFzZSBDb25uZWN0aW9uXG4gICAgICovXG4gICAgcHJpdmF0ZSBpbml0RGJDb25uZWN0aW9uKCk6YW55XG4gICAge1xuICAgICAgICAvL1JldHVybiBhIGRhdGFiYXNlIGNvbm5lY3Rpb25cbiAgICAgICAgcmV0dXJuIG15c3FsLmNyZWF0ZVBvb2woe2hvc3Q6IHRoaXMuaG9zdCwgcG9ydDogdGhpcy5wb3J0LCB1c2VyOiB0aGlzLnVzZXJuYW1lLCBwYXNzd29yZDogdGhpcy5wYXNzd29yZCwgZGF0YWJhc2U6IHRoaXMuc2NoZW1hLCBjb25uZWN0aW9uTGltaXQ6IDEwfSk7XG4gICAgfVxufVxuIl19