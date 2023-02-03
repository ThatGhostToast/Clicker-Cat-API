"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

/**
 * Model for our users in the database
 * @export
 * @class User
 */
var User = /*#__PURE__*/function () {
  /**
   * Id of the user
   * @private
   * @type {number}
   * @memberof User
   */

  /**
   * The user's email
   * @private
   * @type {string}
   * @memberof User
   */

  /**
   * The user's password
   * @private
   * @type {string}
   * @memberof User
   */

  /**
   * The user's name
   * @private
   * @type {string}
   * @memberof User
   */

  /**
   * User Constructor
   * @constructor
   * @param id Id of the user
   * @param firstName The user's first name
   * @param lastName The user's last name
   * @param email The user's email
   * @param password The user's password
   * @param birthday The user's birthday
   * @param sex The user's sex
   * @param conditions The user's pre existing conditions
   * @param image The user's profile picture
   */
  function User(id, email, password, name) {
    (0, _classCallCheck2.default)(this, User);
    (0, _defineProperty2.default)(this, "id", -1);
    (0, _defineProperty2.default)(this, "email", "");
    (0, _defineProperty2.default)(this, "password", "");
    (0, _defineProperty2.default)(this, "name", "");
    this.id = id;
    this.email = email;
    this.password = password;
    this.name = name;
  }
  /**
   * Method to get the Id of the user
   *
   * @type {number}
   * @memberof User
   */


  (0, _createClass2.default)(User, [{
    key: "Id",
    get: function get() {
      return this.id;
    }
    /**
     * Method to set the Id of the user
     *
     * @memberof User
     */
    ,
    set: function set(value) {
      this.id = value;
    }
    /**
     * Method to get the name of the user
     *
     * @type {string}
     * @memberof User
     */

  }, {
    key: "Name",
    get: function get() {
      return this.name;
    }
    /**
     * Method to set the name of the user
     *
     * @memberof User
     */
    ,
    set: function set(value) {
      this.name = value;
    }
    /**
     * Method to get the email of the user
     *
     * @type {string}
     * @memberof User
     */

  }, {
    key: "Email",
    get: function get() {
      return this.email;
    }
    /**
     * Method to set the email of the user
     *
     * @memberof User
     */
    ,
    set: function set(value) {
      this.email = value;
    }
    /**
     * Method to get the user's password
     *
     * @type {string}
     * @memberof User
     */

  }, {
    key: "Password",
    get: function get() {
      return this.password;
    }
    /**
     * Method to set the user's password
     *
     * @memberof User
     */
    ,
    set: function set(value) {
      this.password = value;
    }
  }]);
  return User;
}();

exports.User = User;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9tb2RlbHMvVXNlcnMudHMiXSwibmFtZXMiOlsiVXNlciIsImlkIiwiZW1haWwiLCJwYXNzd29yZCIsIm5hbWUiLCJ2YWx1ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtJQUNhQSxJO0FBQ1Q7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBR0k7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUdJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0ksZ0JBQVlDLEVBQVosRUFBd0JDLEtBQXhCLEVBQXNDQyxRQUF0QyxFQUF3REMsSUFBeEQsRUFDQTtBQUFBO0FBQUEsOENBdkNxQixDQUFDLENBdUN0QjtBQUFBLGlEQWhDd0IsRUFnQ3hCO0FBQUEsb0RBeEIyQixFQXdCM0I7QUFBQSxnREFoQnVCLEVBZ0J2QjtBQUNJLFNBQUtILEVBQUwsR0FBVUEsRUFBVjtBQUNBLFNBQUtDLEtBQUwsR0FBYUEsS0FBYjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0EsU0FBS0MsSUFBTCxHQUFZQSxJQUFaO0FBQ0g7QUFHQTtBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O1NBQ0ssZUFDQTtBQUNILGFBQU8sS0FBS0gsRUFBWjtBQUNBO0FBQ0c7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7U0FDSyxhQUFjSSxLQUFkLEVBQ0E7QUFDSCxXQUFLSixFQUFMLEdBQVVJLEtBQVY7QUFDQTtBQUVHO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztTQUNLLGVBQ0E7QUFDSCxhQUFPLEtBQUtELElBQVo7QUFDQTtBQUNHO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O1NBQ0ssYUFBZ0JDLEtBQWhCLEVBQ0E7QUFDSCxXQUFLRCxJQUFMLEdBQVlDLEtBQVo7QUFDQTtBQUVHO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztTQUNLLGVBQ0E7QUFDSCxhQUFPLEtBQUtILEtBQVo7QUFDQTtBQUNHO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O1NBQ0ssYUFBaUJHLEtBQWpCLEVBQ0E7QUFDSCxXQUFLSCxLQUFMLEdBQWFHLEtBQWI7QUFDQTtBQUVHO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztTQUNLLGVBQ0E7QUFDSCxhQUFPLEtBQUtGLFFBQVo7QUFDQTtBQUNHO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O1NBQ0ssYUFBb0JFLEtBQXBCLEVBQ0E7QUFDSCxXQUFLRixRQUFMLEdBQWdCRSxLQUFoQjtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBNb2RlbCBmb3Igb3VyIHVzZXJzIGluIHRoZSBkYXRhYmFzZVxuICogQGV4cG9ydFxuICogQGNsYXNzIFVzZXJcbiAqL1xuZXhwb3J0IGNsYXNzIFVzZXIge1xuICAgIC8qKlxuICAgICAqIElkIG9mIHRoZSB1c2VyXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqIEBtZW1iZXJvZiBVc2VyXG4gICAgICovXG4gICAgcHJpdmF0ZSBpZDogbnVtYmVyID0gLTE7XG4gICAgLyoqXG4gICAgICogVGhlIHVzZXIncyBlbWFpbFxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKiBAbWVtYmVyb2YgVXNlclxuICAgICAqL1xuICAgIHByaXZhdGUgZW1haWw6IHN0cmluZyA9IFwiXCI7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgdXNlcidzIHBhc3N3b3JkXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqIEBtZW1iZXJvZiBVc2VyXG4gICAgICovXG4gICAgcHJpdmF0ZSBwYXNzd29yZDogc3RyaW5nID0gXCJcIjtcblxuICAgIC8qKlxuICAgICAqIFRoZSB1c2VyJ3MgbmFtZVxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKiBAbWVtYmVyb2YgVXNlclxuICAgICAqL1xuICAgIHByaXZhdGUgbmFtZTogc3RyaW5nID0gXCJcIjtcblxuICAgIC8qKlxuICAgICAqIFVzZXIgQ29uc3RydWN0b3JcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0gaWQgSWQgb2YgdGhlIHVzZXJcbiAgICAgKiBAcGFyYW0gZmlyc3ROYW1lIFRoZSB1c2VyJ3MgZmlyc3QgbmFtZVxuICAgICAqIEBwYXJhbSBsYXN0TmFtZSBUaGUgdXNlcidzIGxhc3QgbmFtZVxuICAgICAqIEBwYXJhbSBlbWFpbCBUaGUgdXNlcidzIGVtYWlsXG4gICAgICogQHBhcmFtIHBhc3N3b3JkIFRoZSB1c2VyJ3MgcGFzc3dvcmRcbiAgICAgKiBAcGFyYW0gYmlydGhkYXkgVGhlIHVzZXIncyBiaXJ0aGRheVxuICAgICAqIEBwYXJhbSBzZXggVGhlIHVzZXIncyBzZXhcbiAgICAgKiBAcGFyYW0gY29uZGl0aW9ucyBUaGUgdXNlcidzIHByZSBleGlzdGluZyBjb25kaXRpb25zXG4gICAgICogQHBhcmFtIGltYWdlIFRoZSB1c2VyJ3MgcHJvZmlsZSBwaWN0dXJlXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoaWQ6IG51bWJlciwgZW1haWw6IHN0cmluZyxwYXNzd29yZDogc3RyaW5nLCBuYW1lOiBzdHJpbmcpXG4gICAge1xuICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICAgIHRoaXMuZW1haWwgPSBlbWFpbDtcbiAgICAgICAgdGhpcy5wYXNzd29yZCA9IHBhc3N3b3JkO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIH1cblxuXG4gICAgIC8qKlxuICAgICAgKiBNZXRob2QgdG8gZ2V0IHRoZSBJZCBvZiB0aGUgdXNlclxuICAgICAgKlxuICAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAgKiBAbWVtYmVyb2YgVXNlclxuICAgICAgKi9cbiAgICAgcHVibGljIGdldCBJZCgpOiBudW1iZXIgIFxuICAgICB7XG5cdFx0cmV0dXJuIHRoaXMuaWQ7XG5cdH1cbiAgICAgLyoqXG4gICAgICAqIE1ldGhvZCB0byBzZXQgdGhlIElkIG9mIHRoZSB1c2VyXG4gICAgICAqXG4gICAgICAqIEBtZW1iZXJvZiBVc2VyXG4gICAgICAqL1xuICAgICBwdWJsaWMgc2V0IElkKHZhbHVlOiBudW1iZXIgKSBcbiAgICAge1xuXHRcdHRoaXMuaWQgPSB2YWx1ZTtcblx0fVxuXG4gICAgIC8qKlxuICAgICAgKiBNZXRob2QgdG8gZ2V0IHRoZSBuYW1lIG9mIHRoZSB1c2VyXG4gICAgICAqXG4gICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAqIEBtZW1iZXJvZiBVc2VyXG4gICAgICAqL1xuICAgICBwdWJsaWMgZ2V0IE5hbWUoKTogc3RyaW5nICBcbiAgICAge1xuXHRcdHJldHVybiB0aGlzLm5hbWU7XG5cdH1cbiAgICAgLyoqXG4gICAgICAqIE1ldGhvZCB0byBzZXQgdGhlIG5hbWUgb2YgdGhlIHVzZXJcbiAgICAgICpcbiAgICAgICogQG1lbWJlcm9mIFVzZXJcbiAgICAgICovXG4gICAgIHB1YmxpYyBzZXQgTmFtZSh2YWx1ZTogc3RyaW5nICkgXG4gICAgIHtcblx0XHR0aGlzLm5hbWUgPSB2YWx1ZTtcblx0fVxuXG4gICAgIC8qKlxuICAgICAgKiBNZXRob2QgdG8gZ2V0IHRoZSBlbWFpbCBvZiB0aGUgdXNlclxuICAgICAgKlxuICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgKiBAbWVtYmVyb2YgVXNlclxuICAgICAgKi9cbiAgICAgcHVibGljIGdldCBFbWFpbCgpOiBzdHJpbmcgIFxuICAgICB7XG5cdFx0cmV0dXJuIHRoaXMuZW1haWw7XG5cdH1cbiAgICAgLyoqXG4gICAgICAqIE1ldGhvZCB0byBzZXQgdGhlIGVtYWlsIG9mIHRoZSB1c2VyXG4gICAgICAqXG4gICAgICAqIEBtZW1iZXJvZiBVc2VyXG4gICAgICAqL1xuICAgICBwdWJsaWMgc2V0IEVtYWlsKHZhbHVlOiBzdHJpbmcgKSBcbiAgICAge1xuXHRcdHRoaXMuZW1haWwgPSB2YWx1ZTtcblx0fVxuXG4gICAgIC8qKlxuICAgICAgKiBNZXRob2QgdG8gZ2V0IHRoZSB1c2VyJ3MgcGFzc3dvcmRcbiAgICAgICpcbiAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICogQG1lbWJlcm9mIFVzZXJcbiAgICAgICovXG4gICAgIHB1YmxpYyBnZXQgUGFzc3dvcmQoKTogc3RyaW5nICBcbiAgICAge1xuXHRcdHJldHVybiB0aGlzLnBhc3N3b3JkO1xuXHR9XG4gICAgIC8qKlxuICAgICAgKiBNZXRob2QgdG8gc2V0IHRoZSB1c2VyJ3MgcGFzc3dvcmRcbiAgICAgICpcbiAgICAgICogQG1lbWJlcm9mIFVzZXJcbiAgICAgICovXG4gICAgIHB1YmxpYyBzZXQgUGFzc3dvcmQodmFsdWU6IHN0cmluZykgXG4gICAgIHtcblx0XHR0aGlzLnBhc3N3b3JkID0gdmFsdWU7XG5cdH1cblxufVxuIl19