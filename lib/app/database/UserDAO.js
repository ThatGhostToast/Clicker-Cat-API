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

var loggly = require('loggly');

var logger = loggly.createClient({
  token: "e24b11ec-704e-4859-b8b1-a838bd7f5e93",
  subdomain: "CloudComputingCLC",
  sendConsoleErrors: false,
  tag: "ClickerCatEvent-UserDAO"
});
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
      // Logging into loggly
      logger.log("Entering create() inside UserDAO.ts"); // Get pooled database connection and run queries   

      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(err, connection) {
          var result1, userId;
          return _regenerator.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  connection.release(); // Throw error if an error

                  if (err) {
                    logger.log(err);
                  }

                  if (!err) {
                    _context.next = 4;
                    break;
                  }

                  throw err;

                case 4:
                  // Use Promisfy Util to make an async function and insert User
                  connection.query = util.promisify(connection.query); // Database query assigned to a result variable

                  _context.next = 7;
                  return connection.query('INSERT INTO `Users` (EMAIL, PASSWORD, NAME) VALUES(?,?,?)', [user.Email, user.Password, user.Name]);

                case 7:
                  result1 = _context.sent;

                  // If no rows were affected then return -1 to indicate an error
                  if (result1.affectedRows != 1) {
                    logger.log("Creating new User failed");
                    callback(-1);
                  } //getting the id of the newly created User


                  userId = result1.insertId; // Logging into loggly

                  logger.log("Creating User Succeeded with an ID of " + userId);
                  logger.log("Exiting create() inside UserDAO.ts"); // Do a callback to return the results

                  callback(userId);

                case 13:
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
      logger.log("Entering findUsers() inside UserDAO.ts"); // List of Users to return

      var users = []; // Get a pooled connection to the database, run the query to get all the users, and return the List of Users

      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(err, connection) {
          var result1, x;
          return _regenerator.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  connection.release(); // Throw error if an error

                  if (err) {
                    logger.log(err);
                  }

                  if (!err) {
                    _context2.next = 4;
                    break;
                  }

                  throw err;

                case 4:
                  // Use Promisfy Util to make an async function and run query to get all users
                  connection.query = util.promisify(connection.query); // Database query assigned to a result variable

                  logger.log("Collecting users from the database...");
                  _context2.next = 8;
                  return connection.query('SELECT * FROM `Users`');

                case 8:
                  result1 = _context2.sent;

                  // Looping over the results and adding each user to the list
                  for (x = 0; x < result1.length; ++x) {
                    // Add user and its data to the list
                    users.push(new _Users.User(result1[x].ID, result1[x].EMAIL, result1[x].PASSWORD, result1[x].NAME, result1[x].ROLE));
                  }

                  logger.log("Users collected.");
                  logger.log("Exiting findUsers() inside UserDAO.ts"); // Do a callback to return the results

                  callback(users);

                case 13:
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
      // Logging into loggly
      logger.log("Entering findUserById() inside UserDAO.ts"); // User that's going to be returned

      var user; // Get pooled database connection and run queries   

      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(err, connection) {
          var result1, x;
          return _regenerator.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  connection.release(); // Throw error if an error

                  if (err) {
                    logger.log(err);
                  }

                  if (!err) {
                    _context3.next = 4;
                    break;
                  }

                  throw err;

                case 4:
                  // Use Promisfy Util to make an async function and run query to get all Users for search
                  connection.query = util.promisify(connection.query); // Database query assigned to a result variable

                  logger.log("Collecting user from the database...");
                  _context3.next = 8;
                  return connection.query("SELECT * FROM `Users` WHERE ID = ?", id);

                case 8:
                  result1 = _context3.sent;

                  // Assigning the result to the user model using a loop
                  for (x = 0; x < result1.length; ++x) {
                    // Get user from the database to return
                    user = new _Users.User(result1[x].ID, result1[x].EMAIL, result1[x].PASSWORD, result1[x].NAME, result1[x].ROLE);
                  }

                  logger.log("User collected"); // Logging into loggly

                  logger.log("Exiting findUserById() inside UserDAO.ts"); // Do a callback to return the results

                  callback(user);

                case 13:
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
      // Logging into loggly
      logger.log("Entering findUserByEmail() inside UserDAO.ts"); // User that's going to be returned

      var user; // Get pooled database connection and run queries   

      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(err, connection) {
          var result1, x;
          return _regenerator.default.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  connection.release(); // Throw error if an error

                  if (err) {
                    logger.log(err);
                  }

                  if (!err) {
                    _context4.next = 4;
                    break;
                  }

                  throw err;

                case 4:
                  // Use Promisfy Util to make an async function and run query to get all Users for search
                  connection.query = util.promisify(connection.query); // Database query assigned to a result variable

                  logger.log("Collecting user from the database...");
                  _context4.next = 8;
                  return connection.query("SELECT * FROM `Users` WHERE EMAIL = ?", email);

                case 8:
                  result1 = _context4.sent;

                  // Adding the result to the user model 
                  for (x = 0; x < result1.length; ++x) {
                    // Get user from the database to return
                    user = new _Users.User(result1[x].ID, result1[x].EMAIL, result1[x].PASSWORD, result1[x].NAME, result1[x].ROLE);
                  }

                  logger.log("User collected"); // Logging into loggly

                  logger.log("Exiting findUserByEmail() inside UserDAO.ts"); // Do a callback to return the results

                  callback(user);

                case 13:
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
      // Logging into loggly
      logger.log("Entering update() inside UserDAO.ts"); // Get pooled database connection and run queries   

      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref5 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(err, connection) {
          var changes, result1;
          return _regenerator.default.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  connection.release(); // Throw error if an error

                  if (err) {
                    logger.log(err);
                  }

                  if (!err) {
                    _context5.next = 4;
                    break;
                  }

                  throw err;

                case 4:
                  // Use Promisfy Util to make an async function and update User
                  changes = 0; // Use Promisfy Util to make an async function and insert User

                  connection.query = util.promisify(connection.query); // Database query assigned to a result variable

                  logger.log("Attempting to update user...");
                  _context5.next = 9;
                  return connection.query("UPDATE `Users` SET EMAIL=?, PASSWORD=?, NAME=?", [user.Email, user.Password, user.Name]);

                case 9:
                  result1 = _context5.sent;
                  // If any row was affected in the database, update the changes variable to reflect that
                  if (result1.changedRows != 0) ++changes; // Log Changes

                  console.log(changes);
                  logger.log("Changes made: " + changes); // Logging into loggly

                  logger.log("Exiting update() inside UserDAO.ts"); // Do a callback to return the results

                  callback(changes);

                case 15:
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
      // Logging into loggly
      logger.log("Entering delete() inside UserDAO.ts"); // Get pooled database connection and run queries   

      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref6 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6(err, connection) {
          var changes, result1;
          return _regenerator.default.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  connection.release(); // Throw error if an error

                  if (err) {
                    logger.log(err);
                  }

                  if (!err) {
                    _context6.next = 4;
                    break;
                  }

                  throw err;

                case 4:
                  // Use Promisfy Util to make an async function and run query to delete User
                  changes = 0; // Use Promisfy Util to make an async function and insert User

                  connection.query = util.promisify(connection.query); // Database query assigned to a result variable

                  logger.log("Attempting to delete user from the database...");
                  _context6.next = 9;
                  return connection.query('DELETE FROM `Users` WHERE ID=?', [userId]);

                case 9:
                  result1 = _context6.sent;
                  // Set the affected rows to the changes variable
                  changes = changes + result1.affectedRows; // Logging into loggly

                  logger.log("User's deleted: " + changes);
                  logger.log("Exiting delete() inside UserDAO.ts"); // Do a callback to return the results

                  callback(changes);

                case 14:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9kYXRhYmFzZS9Vc2VyREFPLnRzIl0sIm5hbWVzIjpbImxvZ2dseSIsInJlcXVpcmUiLCJsb2dnZXIiLCJjcmVhdGVDbGllbnQiLCJ0b2tlbiIsInN1YmRvbWFpbiIsInNlbmRDb25zb2xlRXJyb3JzIiwidGFnIiwiVXNlckRBTyIsImhvc3QiLCJwb3J0IiwidXNlcm5hbWUiLCJwYXNzd29yZCIsImluaXREYkNvbm5lY3Rpb24iLCJwb29sIiwidXNlciIsImNhbGxiYWNrIiwibG9nIiwiZ2V0Q29ubmVjdGlvbiIsImVyciIsImNvbm5lY3Rpb24iLCJyZWxlYXNlIiwicXVlcnkiLCJ1dGlsIiwicHJvbWlzaWZ5IiwiRW1haWwiLCJQYXNzd29yZCIsIk5hbWUiLCJyZXN1bHQxIiwiYWZmZWN0ZWRSb3dzIiwidXNlcklkIiwiaW5zZXJ0SWQiLCJ1c2VycyIsIngiLCJsZW5ndGgiLCJwdXNoIiwiVXNlciIsIklEIiwiRU1BSUwiLCJQQVNTV09SRCIsIk5BTUUiLCJST0xFIiwiaWQiLCJlbWFpbCIsImNoYW5nZXMiLCJjaGFuZ2VkUm93cyIsImNvbnNvbGUiLCJteXNxbCIsImNyZWF0ZVBvb2wiLCJkYXRhYmFzZSIsInNjaGVtYSIsImNvbm5lY3Rpb25MaW1pdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7OztBQUNBLElBQUlBLE1BQU0sR0FBR0MsT0FBTyxDQUFDLFFBQUQsQ0FBcEI7O0FBQ0EsSUFBSUMsTUFBTSxHQUFHRixNQUFNLENBQUNHLFlBQVAsQ0FBb0I7QUFBRUMsRUFBQUEsS0FBSyxFQUFDLHNDQUFSO0FBQWdEQyxFQUFBQSxTQUFTLEVBQUMsbUJBQTFEO0FBQStFQyxFQUFBQSxpQkFBaUIsRUFBRSxLQUFsRztBQUF5R0MsRUFBQUEsR0FBRyxFQUFDO0FBQTdHLENBQXBCLENBQWI7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7SUFDYUMsTztBQVNUO0FBQ0o7QUFDQTtBQUNBO0FB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QztBQUF3REMsUUFBQUEsUUFBUSxFQUFFLEtBQUtBLFFBQXZFO0FBQWlGcUMsUUFBQUEsUUFBUSxFQUFFLEtBQUtDLE1BQWhHO0FBQXdHQyxRQUFBQSxlQUFlLEVBQUU7QUFBekgsT0FBakIsQ0FBUDtBQUNIIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi9tb2RlbHMvVXNlcnNcIjtcbmltcG9ydCAqIGFzIG15c3FsIGZyb20gXCJteXNxbFwiO1xuaW1wb3J0ICogYXMgdXRpbCBmcm9tIFwidXRpbFwiO1xudmFyIGxvZ2dseSA9IHJlcXVpcmUoJ2xvZ2dseScpO1xudmFyIGxvZ2dlciA9IGxvZ2dseS5jcmVhdGVDbGllbnQoeyB0b2tlbjpcImUyNGIxMWVjLTcwNGUtNDg1OS1iOGIxLWE4MzhiZDdmNWU5M1wiLCBzdWJkb21haW46XCJDbG91ZENvbXB1dGluZ0NMQ1wiLCBzZW5kQ29uc29sZUVycm9yczogZmFsc2UsIHRhZzpcIkNsaWNrZXJDYXRFdmVudC1Vc2VyREFPXCIgfSk7XG5cbi8qXG5EQU8gZmlsZSB1c2VkIGZvciBjb25uZWN0aW5nIHRoZSBBUEkgdG8gdGhlIGRhdGFiYXNlXG5UaGlzIERBTyBoYW5kbGVzIHRoZSB1c2VycyB0YWJsZSBpbiBvdXIgZGF0YWJhc2VcbiovXG5leHBvcnQgY2xhc3MgVXNlckRBT1xue1xuICAgIHByaXZhdGUgaG9zdDpzdHJpbmcgPSBcImNsaWNrZXItY2F0LmNsa3pvc2N4ZnA3cC51cy13ZXN0LTEucmRzLmFtYXpvbmF3cy5jb21cIjtcbiAgICBwcml2YXRlIHBvcnQ6bnVtYmVyID0gMzMwNjtcbiAgICBwcml2YXRlIHVzZXJuYW1lOnN0cmluZyA9IFwiYWRtaW5cIjtcbiAgICBwcml2YXRlIHBhc3N3b3JkOnN0cmluZyA9IFwicGFzc3dvcmRcIjtcbiAgICBwcml2YXRlIHNjaGVtYTpzdHJpbmcgPSBcIkNsaWNrZXJDYXRcIjtcbiAgICBwcml2YXRlIHBvb2wgPSB0aGlzLmluaXREYkNvbm5lY3Rpb24oKTtcbiAgICBcbiAgICAvKipcbiAgICAgKiBOb24tZGVmYXVsdCBjb25zdHJ1Y3Rvci5cbiAgICAgKiBcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0gaG9zdCBEYXRhYmFzZSBIb3N0bmFtZVxuICAgICAqIEBwYXJhbSB1c2VybmFtZSBEYXRhYmFzZSBVc2VybmFtZVxuICAgICAqIEBwYXJhbSBwYXNzd29yZCBEYXRhYmFzZSBQYXNzd29yZFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGhvc3Q6c3RyaW5nLCBwb3J0Om51bWJlciwgdXNlcm5hbWU6c3RyaW5nLCBwYXNzd29yZDpzdHJpbmcpXG4gICAge1xuICAgICAgICAvLyBTZXQgYWxsIGNsYXNzIHByb3BlcnRpZXNcbiAgICAgICAgdGhpcy5ob3N0ID0gaG9zdDtcbiAgICAgICAgdGhpcy5wb3J0ID0gcG9ydDtcbiAgICAgICAgdGhpcy51c2VybmFtZSA9IHVzZXJuYW1lO1xuICAgICAgICB0aGlzLnBhc3N3b3JkID0gcGFzc3dvcmQ7XG4gICAgICAgIHRoaXMucG9vbCA9IHRoaXMuaW5pdERiQ29ubmVjdGlvbigpO1xuICAgIH1cblxuICAgICAvKipcbiAgICAgKiBDUlVEIG1ldGhvZCB0byBjcmVhdGUgYSBuZXcgdXNlci5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gdXNlciBVc2VyIHRvIGluc2VydC5cbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgQ2FsbGJhY2sgZnVuY3Rpb24gd2l0aCAtMSBpZiBhbiBlcnJvciBlbHNlIFVzZXIgSUQgY3JlYXRlZC4gIFxuICAgICAqL1xuICAgIHB1YmxpYyBjcmVhdGUodXNlcjpVc2VyLCBjYWxsYmFjazogYW55KVxuICAgIHtcbiAgICAgICAgLy8gTG9nZ2luZyBpbnRvIGxvZ2dseVxuICAgICAgICBsb2dnZXIubG9nKFwiRW50ZXJpbmcgY3JlYXRlKCkgaW5zaWRlIFVzZXJEQU8udHNcIik7XG4gICAgICAgIC8vIEdldCBwb29sZWQgZGF0YWJhc2UgY29ubmVjdGlvbiBhbmQgcnVuIHF1ZXJpZXMgICBcbiAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24oZXJyOmFueSwgY29ubmVjdGlvbjphbnkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xuXG4gICAgICAgICAgICAvLyBUaHJvdyBlcnJvciBpZiBhbiBlcnJvclxuICAgICAgICAgICAgaWYgKGVycil7bG9nZ2VyLmxvZyhlcnIpO31cbiAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVyclxuXG4gICAgICAgICAgICAvLyBVc2UgUHJvbWlzZnkgVXRpbCB0byBtYWtlIGFuIGFzeW5jIGZ1bmN0aW9uIGFuZCBpbnNlcnQgVXNlclxuICAgICAgICAgICAgY29ubmVjdGlvbi5xdWVyeSA9IHV0aWwucHJvbWlzaWZ5KGNvbm5lY3Rpb24ucXVlcnkpO1xuICAgICAgICAgICAgLy8gRGF0YWJhc2UgcXVlcnkgYXNzaWduZWQgdG8gYSByZXN1bHQgdmFyaWFibGVcbiAgICAgICAgICAgIGxldCByZXN1bHQxID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeSgnSU5TRVJUIElOVE8gYFVzZXJzYCAoRU1BSUwsIFBBU1NXT1JELCBOQU1FKSBWQUxVRVMoPyw/LD8pJywgW3VzZXIuRW1haWwsIHVzZXIuUGFzc3dvcmQsIHVzZXIuTmFtZV0pO1xuICAgICAgICAgICAgLy8gSWYgbm8gcm93cyB3ZXJlIGFmZmVjdGVkIHRoZW4gcmV0dXJuIC0xIHRvIGluZGljYXRlIGFuIGVycm9yXG4gICAgICAgICAgICBpZihyZXN1bHQxLmFmZmVjdGVkUm93cyAhPSAxKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coXCJDcmVhdGluZyBuZXcgVXNlciBmYWlsZWRcIik7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soLTEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL2dldHRpbmcgdGhlIGlkIG9mIHRoZSBuZXdseSBjcmVhdGVkIFVzZXJcbiAgICAgICAgICAgIGxldCB1c2VySWQgPSByZXN1bHQxLmluc2VydElkO1xuXG4gICAgICAgICAgICAvLyBMb2dnaW5nIGludG8gbG9nZ2x5XG4gICAgICAgICAgICBsb2dnZXIubG9nKFwiQ3JlYXRpbmcgVXNlciBTdWNjZWVkZWQgd2l0aCBhbiBJRCBvZiBcIiArIHVzZXJJZCk7XG4gICAgICAgICAgICBsb2dnZXIubG9nKFwiRXhpdGluZyBjcmVhdGUoKSBpbnNpZGUgVXNlckRBTy50c1wiKTtcbiAgICAgICAgICAgIC8vIERvIGEgY2FsbGJhY2sgdG8gcmV0dXJuIHRoZSByZXN1bHRzXG4gICAgICAgICAgICBjYWxsYmFjayh1c2VySWQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAgLyoqXG4gICAgICogQ1JVRCBtZXRob2QgdG8gcmV0dXJuIGFsbCBVc2Vycy5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgQ2FsbGJhY2sgZnVuY3Rpb24gd2l0aCBhbiBBcnJheSBvZiB0eXBlIFVzZXJzLlxuICAgICAqL1xuICAgIHB1YmxpYyBmaW5kVXNlcnMoY2FsbGJhY2s6IGFueSlcbiAgICB7XG4gICAgICAgIGxvZ2dlci5sb2coXCJFbnRlcmluZyBmaW5kVXNlcnMoKSBpbnNpZGUgVXNlckRBTy50c1wiKTtcbiAgICAgICAgLy8gTGlzdCBvZiBVc2VycyB0byByZXR1cm5cbiAgICAgICAgbGV0IHVzZXJzOlVzZXJbXSA9IFtdO1xuICAgICAgICBcbiAgICAgICAgLy8gR2V0IGEgcG9vbGVkIGNvbm5lY3Rpb24gdG8gdGhlIGRhdGFiYXNlLCBydW4gdGhlIHF1ZXJ5IHRvIGdldCBhbGwgdGhlIHVzZXJzLCBhbmQgcmV0dXJuIHRoZSBMaXN0IG9mIFVzZXJzXG4gICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uKGVycjphbnksIGNvbm5lY3Rpb246YW55KVxuICAgICAgICB7XG4gICAgICAgICAgICBjb25uZWN0aW9uLnJlbGVhc2UoKTtcblxuICAgICAgICAgICAgLy8gVGhyb3cgZXJyb3IgaWYgYW4gZXJyb3JcbiAgICAgICAgICAgIGlmIChlcnIpe2xvZ2dlci5sb2coZXJyKTt9XG4gICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XG5cbiAgICAgICAgICAgIC8vIFVzZSBQcm9taXNmeSBVdGlsIHRvIG1ha2UgYW4gYXN5bmMgZnVuY3Rpb24gYW5kIHJ1biBxdWVyeSB0byBnZXQgYWxsIHVzZXJzXG4gICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XG4gICAgICAgICAgICAvLyBEYXRhYmFzZSBxdWVyeSBhc3NpZ25lZCB0byBhIHJlc3VsdCB2YXJpYWJsZVxuICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkNvbGxlY3RpbmcgdXNlcnMgZnJvbSB0aGUgZGF0YWJhc2UuLi5cIik7XG4gICAgICAgICAgICBsZXQgcmVzdWx0MSA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoJ1NFTEVDVCAqIEZST00gYFVzZXJzYCcpO1xuICAgICAgICAgICAgLy8gTG9vcGluZyBvdmVyIHRoZSByZXN1bHRzIGFuZCBhZGRpbmcgZWFjaCB1c2VyIHRvIHRoZSBsaXN0XG4gICAgICAgICAgICBmb3IobGV0IHg9MDt4IDwgcmVzdWx0MS5sZW5ndGg7Kyt4KVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC8vIEFkZCB1c2VyIGFuZCBpdHMgZGF0YSB0byB0aGUgbGlzdFxuICAgICAgICAgICAgICAgIHVzZXJzLnB1c2gobmV3IFVzZXIocmVzdWx0MVt4XS5JRCwgcmVzdWx0MVt4XS5FTUFJTCwgcmVzdWx0MVt4XS5QQVNTV09SRCwgcmVzdWx0MVt4XS5OQU1FLCByZXN1bHQxW3hdLlJPTEUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxvZ2dlci5sb2coXCJVc2VycyBjb2xsZWN0ZWQuXCIpO1xuICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkV4aXRpbmcgZmluZFVzZXJzKCkgaW5zaWRlIFVzZXJEQU8udHNcIik7XG4gICAgICAgICAgICAvLyBEbyBhIGNhbGxiYWNrIHRvIHJldHVybiB0aGUgcmVzdWx0c1xuICAgICAgICAgICAgY2FsbGJhY2sodXNlcnMpO1xuICAgICAgICAgfSk7XG4gICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1ldGhvZCB0byBmaW5kIGEgdXNlciBieSB0aGVpciBJRFxuICAgICAqIFxuICAgICAqIEBwYXJhbSBpZCBJZCBvZiB0aGUgdXNlciBiZWluZyBzZWFyY2hlZFxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBDYWxsYmFjayBmdW5jdGlvbiB3aXRoIGFuIEFycmF5IG9mIHR5cGUgVXNlcnMuXG4gICAgICovXG4gICAgcHVibGljIGZpbmRVc2VyQnlJZChpZDpudW1iZXIsIGNhbGxiYWNrOiBhbnkpXG4gICAge1xuICAgICAgICAvLyBMb2dnaW5nIGludG8gbG9nZ2x5XG4gICAgICAgIGxvZ2dlci5sb2coXCJFbnRlcmluZyBmaW5kVXNlckJ5SWQoKSBpbnNpZGUgVXNlckRBTy50c1wiKTtcbiAgICAgICAgLy8gVXNlciB0aGF0J3MgZ29pbmcgdG8gYmUgcmV0dXJuZWRcbiAgICAgICAgbGV0IHVzZXI6VXNlcjtcblxuICAgICAgICAvLyBHZXQgcG9vbGVkIGRhdGFiYXNlIGNvbm5lY3Rpb24gYW5kIHJ1biBxdWVyaWVzICAgXG4gICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uKGVycjphbnksIGNvbm5lY3Rpb246YW55KVxuICAgICAgICB7XG4gICAgICAgICAgICBjb25uZWN0aW9uLnJlbGVhc2UoKTtcblxuICAgICAgICAgICAgLy8gVGhyb3cgZXJyb3IgaWYgYW4gZXJyb3JcbiAgICAgICAgICAgIGlmIChlcnIpe2xvZ2dlci5sb2coZXJyKTt9XG4gICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XG5cbiAgICAgICAgICAgIC8vIFVzZSBQcm9taXNmeSBVdGlsIHRvIG1ha2UgYW4gYXN5bmMgZnVuY3Rpb24gYW5kIHJ1biBxdWVyeSB0byBnZXQgYWxsIFVzZXJzIGZvciBzZWFyY2hcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcbiAgICAgICAgICAgIC8vIERhdGFiYXNlIHF1ZXJ5IGFzc2lnbmVkIHRvIGEgcmVzdWx0IHZhcmlhYmxlXG4gICAgICAgICAgICBsb2dnZXIubG9nKFwiQ29sbGVjdGluZyB1c2VyIGZyb20gdGhlIGRhdGFiYXNlLi4uXCIpO1xuICAgICAgICAgICAgbGV0IHJlc3VsdDEgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KFwiU0VMRUNUICogRlJPTSBgVXNlcnNgIFdIRVJFIElEID0gP1wiLCBpZCk7XG4gICAgICAgICAgICAvLyBBc3NpZ25pbmcgdGhlIHJlc3VsdCB0byB0aGUgdXNlciBtb2RlbCB1c2luZyBhIGxvb3BcbiAgICAgICAgICAgIGZvcihsZXQgeD0wO3ggPCByZXN1bHQxLmxlbmd0aDsrK3gpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy8gR2V0IHVzZXIgZnJvbSB0aGUgZGF0YWJhc2UgdG8gcmV0dXJuXG4gICAgICAgICAgICAgICAgdXNlciA9IG5ldyBVc2VyKHJlc3VsdDFbeF0uSUQsIHJlc3VsdDFbeF0uRU1BSUwsIHJlc3VsdDFbeF0uUEFTU1dPUkQsIHJlc3VsdDFbeF0uTkFNRSwgcmVzdWx0MVt4XS5ST0xFKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxvZ2dlci5sb2coXCJVc2VyIGNvbGxlY3RlZFwiKTtcbiAgICAgICAgICAgIC8vIExvZ2dpbmcgaW50byBsb2dnbHlcbiAgICAgICAgICAgIGxvZ2dlci5sb2coXCJFeGl0aW5nIGZpbmRVc2VyQnlJZCgpIGluc2lkZSBVc2VyREFPLnRzXCIpO1xuICAgICAgICAgICAgLy8gRG8gYSBjYWxsYmFjayB0byByZXR1cm4gdGhlIHJlc3VsdHNcbiAgICAgICAgICAgIGNhbGxiYWNrKHVzZXIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNZXRob2QgdG8gZmluZCBhIHVzZXIgYnkgdGhlaXIgRW1haWxcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gZW1haWwgZW1haWwgb2YgdGhlIHVzZXIgYmVpbmcgc2VhcmNoZWRcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgQ2FsbGJhY2sgZnVuY3Rpb24gd2l0aCBhbiBBcnJheSBvZiB0eXBlIFVzZXJzLlxuICAgICAqL1xuICAgIHB1YmxpYyBmaW5kVXNlckJ5RW1haWwoZW1haWw6c3RyaW5nLCBjYWxsYmFjazogYW55KVxuICAgIHtcbiAgICAgICAgLy8gTG9nZ2luZyBpbnRvIGxvZ2dseVxuICAgICAgICBsb2dnZXIubG9nKFwiRW50ZXJpbmcgZmluZFVzZXJCeUVtYWlsKCkgaW5zaWRlIFVzZXJEQU8udHNcIik7XG4gICAgICAgIC8vIFVzZXIgdGhhdCdzIGdvaW5nIHRvIGJlIHJldHVybmVkXG4gICAgICAgIGxldCB1c2VyOlVzZXI7XG5cbiAgICAgICAgLy8gR2V0IHBvb2xlZCBkYXRhYmFzZSBjb25uZWN0aW9uIGFuZCBydW4gcXVlcmllcyAgIFxuICAgICAgICB0aGlzLnBvb2wuZ2V0Q29ubmVjdGlvbihhc3luYyBmdW5jdGlvbihlcnI6YW55LCBjb25uZWN0aW9uOmFueSlcbiAgICAgICAge1xuICAgICAgICAgICAgY29ubmVjdGlvbi5yZWxlYXNlKCk7XG5cbiAgICAgICAgICAgIC8vIFRocm93IGVycm9yIGlmIGFuIGVycm9yXG4gICAgICAgICAgICBpZiAoZXJyKXtsb2dnZXIubG9nKGVycik7fVxuICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyO1xuXG4gICAgICAgICAgICAvLyBVc2UgUHJvbWlzZnkgVXRpbCB0byBtYWtlIGFuIGFzeW5jIGZ1bmN0aW9uIGFuZCBydW4gcXVlcnkgdG8gZ2V0IGFsbCBVc2VycyBmb3Igc2VhcmNoXG4gICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XG4gICAgICAgICAgICAvLyBEYXRhYmFzZSBxdWVyeSBhc3NpZ25lZCB0byBhIHJlc3VsdCB2YXJpYWJsZVxuICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkNvbGxlY3RpbmcgdXNlciBmcm9tIHRoZSBkYXRhYmFzZS4uLlwiKTtcbiAgICAgICAgICAgIGxldCByZXN1bHQxID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeShcIlNFTEVDVCAqIEZST00gYFVzZXJzYCBXSEVSRSBFTUFJTCA9ID9cIiwgZW1haWwpO1xuICAgICAgICAgICAgLy8gQWRkaW5nIHRoZSByZXN1bHQgdG8gdGhlIHVzZXIgbW9kZWwgXG4gICAgICAgICAgICBmb3IobGV0IHg9MDt4IDwgcmVzdWx0MS5sZW5ndGg7Kyt4KVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC8vIEdldCB1c2VyIGZyb20gdGhlIGRhdGFiYXNlIHRvIHJldHVyblxuICAgICAgICAgICAgICAgIHVzZXIgPSBuZXcgVXNlcihyZXN1bHQxW3hdLklELCByZXN1bHQxW3hdLkVNQUlMLCByZXN1bHQxW3hdLlBBU1NXT1JELCByZXN1bHQxW3hdLk5BTUUsIHJlc3VsdDFbeF0uUk9MRSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsb2dnZXIubG9nKFwiVXNlciBjb2xsZWN0ZWRcIik7XG4gICAgICAgICAgICAvLyBMb2dnaW5nIGludG8gbG9nZ2x5XG4gICAgICAgICAgICBsb2dnZXIubG9nKFwiRXhpdGluZyBmaW5kVXNlckJ5RW1haWwoKSBpbnNpZGUgVXNlckRBTy50c1wiKTtcbiAgICAgICAgICAgIC8vIERvIGEgY2FsbGJhY2sgdG8gcmV0dXJuIHRoZSByZXN1bHRzXG4gICAgICAgICAgICBjYWxsYmFjayh1c2VyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgICAvKipcbiAgICAgKiBDUlVEIG1ldGhvZCB0byB1cGRhdGUgYSBVc2VyLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB1c2VyIFVzZXIgdG8gdXBkYXRlLlxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBDYWxsYmFjayBmdW5jdGlvbiB3aXRoIG51bWJlciBvZiByb3dzIHVwZGF0ZWQuICBcbiAgICAgKi9cbiAgICBwdWJsaWMgdXBkYXRlKHVzZXI6VXNlciwgY2FsbGJhY2s6IGFueSlcbiAgICB7XG4gICAgICAgIC8vIExvZ2dpbmcgaW50byBsb2dnbHlcbiAgICAgICAgbG9nZ2VyLmxvZyhcIkVudGVyaW5nIHVwZGF0ZSgpIGluc2lkZSBVc2VyREFPLnRzXCIpO1xuICAgICAgICAvLyBHZXQgcG9vbGVkIGRhdGFiYXNlIGNvbm5lY3Rpb24gYW5kIHJ1biBxdWVyaWVzICAgXG4gICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uKGVycjphbnksIGNvbm5lY3Rpb246YW55KVxuICAgICAgICB7XG4gICAgICAgICAgICBjb25uZWN0aW9uLnJlbGVhc2UoKTtcblxuICAgICAgICAgICAgLy8gVGhyb3cgZXJyb3IgaWYgYW4gZXJyb3JcbiAgICAgICAgICAgIGlmIChlcnIpe2xvZ2dlci5sb2coZXJyKTt9XG4gICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XG4gXG4gICAgICAgICAgICAvLyBVc2UgUHJvbWlzZnkgVXRpbCB0byBtYWtlIGFuIGFzeW5jIGZ1bmN0aW9uIGFuZCB1cGRhdGUgVXNlclxuICAgICAgICAgICAgbGV0IGNoYW5nZXMgPSAwO1xuICAgICAgICAgICAgLy8gVXNlIFByb21pc2Z5IFV0aWwgdG8gbWFrZSBhbiBhc3luYyBmdW5jdGlvbiBhbmQgaW5zZXJ0IFVzZXJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcbiAgICAgICAgICAgIC8vIERhdGFiYXNlIHF1ZXJ5IGFzc2lnbmVkIHRvIGEgcmVzdWx0IHZhcmlhYmxlXG4gICAgICAgICAgICBsb2dnZXIubG9nKFwiQXR0ZW1wdGluZyB0byB1cGRhdGUgdXNlci4uLlwiKTtcbiAgICAgICAgICAgIGxldCByZXN1bHQxID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeShcIlVQREFURSBgVXNlcnNgIFNFVCBFTUFJTD0/LCBQQVNTV09SRD0/LCBOQU1FPT9cIiwgW3VzZXIuRW1haWwsIHVzZXIuUGFzc3dvcmQsIHVzZXIuTmFtZV0pO1xuICAgICAgICAgICAgLy8gSWYgYW55IHJvdyB3YXMgYWZmZWN0ZWQgaW4gdGhlIGRhdGFiYXNlLCB1cGRhdGUgdGhlIGNoYW5nZXMgdmFyaWFibGUgdG8gcmVmbGVjdCB0aGF0XG4gICAgICAgICAgICBpZihyZXN1bHQxLmNoYW5nZWRSb3dzICE9IDApXG4gICAgICAgICAgICAgICAgKytjaGFuZ2VzO1xuICAgICAgICAgICAgLy8gTG9nIENoYW5nZXNcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGNoYW5nZXMpO1xuICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkNoYW5nZXMgbWFkZTogXCIgKyBjaGFuZ2VzKTtcbiAgICAgICAgICAgIC8vIExvZ2dpbmcgaW50byBsb2dnbHlcbiAgICAgICAgICAgIGxvZ2dlci5sb2coXCJFeGl0aW5nIHVwZGF0ZSgpIGluc2lkZSBVc2VyREFPLnRzXCIpO1xuICAgICAgICAgICAgLy8gRG8gYSBjYWxsYmFjayB0byByZXR1cm4gdGhlIHJlc3VsdHNcbiAgICAgICAgICAgIGNhbGxiYWNrKGNoYW5nZXMpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAgLyoqXG4gICAgICogQ1JVRCBtZXRob2QgdG8gZGVsZXRlIGEgVXNlci5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gdXNlcklkIFVzZXIgSUQgdG8gZGVsZXRlLlxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBDYWxsYmFjayBmdW5jdGlvbiB3aXRoIG51bWJlciBvZiByb3dzIGRlbGV0ZWQuICBcbiAgICAgKiAqL1xuICAgIHB1YmxpYyBkZWxldGUodXNlcklkOm51bWJlciwgY2FsbGJhY2s6IGFueSlcbiAgICB7XG4gICAgICAgIC8vIExvZ2dpbmcgaW50byBsb2dnbHlcbiAgICAgICAgbG9nZ2VyLmxvZyhcIkVudGVyaW5nIGRlbGV0ZSgpIGluc2lkZSBVc2VyREFPLnRzXCIpO1xuICAgICAgICAvLyBHZXQgcG9vbGVkIGRhdGFiYXNlIGNvbm5lY3Rpb24gYW5kIHJ1biBxdWVyaWVzICAgXG4gICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uKGVycjphbnksIGNvbm5lY3Rpb246YW55KVxuICAgICAgICB7XG4gICAgICAgICAgICBjb25uZWN0aW9uLnJlbGVhc2UoKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gVGhyb3cgZXJyb3IgaWYgYW4gZXJyb3JcbiAgICAgICAgICAgIGlmIChlcnIpe2xvZ2dlci5sb2coZXJyKTt9XG4gICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XG5cbiAgICAgICAgICAgIC8vIFVzZSBQcm9taXNmeSBVdGlsIHRvIG1ha2UgYW4gYXN5bmMgZnVuY3Rpb24gYW5kIHJ1biBxdWVyeSB0byBkZWxldGUgVXNlclxuICAgICAgICAgICAgbGV0IGNoYW5nZXMgPSAwO1xuICAgICAgICAgICAgLy8gVXNlIFByb21pc2Z5IFV0aWwgdG8gbWFrZSBhbiBhc3luYyBmdW5jdGlvbiBhbmQgaW5zZXJ0IFVzZXJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcbiAgICAgICAgICAgIC8vIERhdGFiYXNlIHF1ZXJ5IGFzc2lnbmVkIHRvIGEgcmVzdWx0IHZhcmlhYmxlXG4gICAgICAgICAgICBsb2dnZXIubG9nKFwiQXR0ZW1wdGluZyB0byBkZWxldGUgdXNlciBmcm9tIHRoZSBkYXRhYmFzZS4uLlwiKTtcbiAgICAgICAgICAgIGxldCByZXN1bHQxID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeSgnREVMRVRFIEZST00gYFVzZXJzYCBXSEVSRSBJRD0/JywgW3VzZXJJZF0pO1xuICAgICAgICAgICAgLy8gU2V0IHRoZSBhZmZlY3RlZCByb3dzIHRvIHRoZSBjaGFuZ2VzIHZhcmlhYmxlXG4gICAgICAgICAgICBjaGFuZ2VzID0gY2hhbmdlcyArIHJlc3VsdDEuYWZmZWN0ZWRSb3dzO1xuXG4gICAgICAgICAgICAvLyBMb2dnaW5nIGludG8gbG9nZ2x5XG4gICAgICAgICAgICBsb2dnZXIubG9nKFwiVXNlcidzIGRlbGV0ZWQ6IFwiICsgY2hhbmdlcyk7XG4gICAgICAgICAgICBsb2dnZXIubG9nKFwiRXhpdGluZyBkZWxldGUoKSBpbnNpZGUgVXNlckRBTy50c1wiKTtcbiAgICAgICAgICAgIC8vIERvIGEgY2FsbGJhY2sgdG8gcmV0dXJuIHRoZSByZXN1bHRzXG4gICAgICAgICAgICBjYWxsYmFjayhjaGFuZ2VzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8qICoqKioqKioqKioqKioqKiogUHJpdmF0ZSBIZWxwZXIgTWV0aG9kcyAqKioqKioqKioqKioqKioqICovXG5cbiAgICAvKipcbiAgICAgKiBQcml2YXRlIGhlbHBlciBtZXRob2QgdG8gaW5pdGlhbGllIGEgRGF0YWJhc2UgQ29ubmVjdGlvblxuICAgICAqL1xuICAgIHByaXZhdGUgaW5pdERiQ29ubmVjdGlvbigpOmFueVxuICAgIHtcbiAgICAgICAgLy9SZXR1cm4gYSBkYXRhYmFzZSBjb25uZWN0aW9uXG4gICAgICAgIHJldHVybiBteXNxbC5jcmVhdGVQb29sKHtob3N0OiB0aGlzLmhvc3QsIHBvcnQ6IHRoaXMucG9ydCwgdXNlcjogdGhpcy51c2VybmFtZSwgcGFzc3dvcmQ6IHRoaXMucGFzc3dvcmQsIGRhdGFiYXNlOiB0aGlzLnNjaGVtYSwgY29ubmVjdGlvbkxpbWl0OiAxMH0pO1xuICAgIH1cbn1cbiJdfQ==