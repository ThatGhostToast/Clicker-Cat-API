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
   * The user's role
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
  function User(id, email, password, name, role) {
    (0, _classCallCheck2.default)(this, User);
    (0, _defineProperty2.default)(this, "id", -1);
    (0, _defineProperty2.default)(this, "email", "");
    (0, _defineProperty2.default)(this, "password", "");
    (0, _defineProperty2.default)(this, "name", "");
    (0, _defineProperty2.default)(this, "role", "");
    this.id = id;
    this.email = email;
    this.password = password;
    this.name = name;
    this.role = role;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9tb2RlbHMvVXNlcnMudHMiXSwibmFtZXMiOlsiVXNlciIsImlkIiwiZW1haWwiLCJwYXNzd29yZCIsIm5hbWUiLCJyb2xlIiwidmFsdWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7SUFDYUEsSTtBQUNUO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBR0k7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUdJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBR0k7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSSxnQkFBWUMsRUFBWixFQUF3QkMsS0FBeEIsRUFBc0NDLFFBQXRDLEVBQXdEQyxJQUF4RCxFQUFzRUMsSUFBdEUsRUFDQTtBQUFBO0FBQUEsOENBL0NxQixDQUFDLENBK0N0QjtBQUFBLGlEQXhDd0IsRUF3Q3hCO0FBQUEsb0RBaEMyQixFQWdDM0I7QUFBQSxnREF4QnVCLEVBd0J2QjtBQUFBLGdEQWhCdUIsRUFnQnZCO0FBQ0ksU0FBS0osRUFBTCxHQUFVQSxFQUFWO0FBQ0EsU0FBS0MsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQkEsUUFBaEI7QUFDQSxTQUFLQyxJQUFMLEdBQVlBLElBQVo7QUFDQSxTQUFLQyxJQUFMLEdBQVlBLElBQVo7QUFDSDtBQUVBO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7U0FDSyxlQUNBO0FBQ0gsYUFBTyxLQUFLSixFQUFaO0FBQ0E7QUFDRztBQUNMO0FBQ0E7QUFDQTtBQUNBOztTQUNLLGFBQWNLLEtBQWQsRUFDQTtBQUNILFdBQUtMLEVBQUwsR0FBVUssS0FBVjtBQUNBO0FBRUc7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O1NBQ0ssZUFDQTtBQUNILGFBQU8sS0FBS0YsSUFBWjtBQUNBO0FBQ0c7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7U0FDSyxhQUFnQkUsS0FBaEIsRUFDQTtBQUNILFdBQUtGLElBQUwsR0FBWUUsS0FBWjtBQUNBO0FBRUc7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O1NBQ0ssZUFDQTtBQUNILGFBQU8sS0FBS0osS0FBWjtBQUNBO0FBQ0c7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7U0FDSyxhQUFpQkksS0FBakIsRUFDQTtBQUNILFdBQUtKLEtBQUwsR0FBYUksS0FBYjtBQUNBO0FBRUc7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O1NBQ0ssZUFDQTtBQUNILGFBQU8sS0FBS0gsUUFBWjtBQUNBO0FBQ0c7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7U0FDSyxhQUFvQkcsS0FBcEIsRUFDQTtBQUNILFdBQUtILFFBQUwsR0FBZ0JHLEtBQWhCO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIE1vZGVsIGZvciBvdXIgdXNlcnMgaW4gdGhlIGRhdGFiYXNlXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgVXNlclxuICovXG5leHBvcnQgY2xhc3MgVXNlciB7XG4gICAgLyoqXG4gICAgICogSWQgb2YgdGhlIHVzZXJcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICogQG1lbWJlcm9mIFVzZXJcbiAgICAgKi9cbiAgICBwcml2YXRlIGlkOiBudW1iZXIgPSAtMTtcbiAgICAvKipcbiAgICAgKiBUaGUgdXNlcidzIGVtYWlsXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqIEBtZW1iZXJvZiBVc2VyXG4gICAgICovXG4gICAgcHJpdmF0ZSBlbWFpbDogc3RyaW5nID0gXCJcIjtcblxuICAgIC8qKlxuICAgICAqIFRoZSB1c2VyJ3MgcGFzc3dvcmRcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICogQG1lbWJlcm9mIFVzZXJcbiAgICAgKi9cbiAgICBwcml2YXRlIHBhc3N3b3JkOiBzdHJpbmcgPSBcIlwiO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHVzZXIncyBuYW1lXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqIEBtZW1iZXJvZiBVc2VyXG4gICAgICovXG4gICAgcHJpdmF0ZSBuYW1lOiBzdHJpbmcgPSBcIlwiO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHVzZXIncyByb2xlXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqIEBtZW1iZXJvZiBVc2VyXG4gICAgICovXG4gICAgcHJpdmF0ZSByb2xlOiBzdHJpbmcgPSBcIlwiO1xuXG4gICAgLyoqXG4gICAgICogVXNlciBDb25zdHJ1Y3RvclxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSBpZCBJZCBvZiB0aGUgdXNlclxuICAgICAqIEBwYXJhbSBmaXJzdE5hbWUgVGhlIHVzZXIncyBmaXJzdCBuYW1lXG4gICAgICogQHBhcmFtIGxhc3ROYW1lIFRoZSB1c2VyJ3MgbGFzdCBuYW1lXG4gICAgICogQHBhcmFtIGVtYWlsIFRoZSB1c2VyJ3MgZW1haWxcbiAgICAgKiBAcGFyYW0gcGFzc3dvcmQgVGhlIHVzZXIncyBwYXNzd29yZFxuICAgICAqIEBwYXJhbSBiaXJ0aGRheSBUaGUgdXNlcidzIGJpcnRoZGF5XG4gICAgICogQHBhcmFtIHNleCBUaGUgdXNlcidzIHNleFxuICAgICAqIEBwYXJhbSBjb25kaXRpb25zIFRoZSB1c2VyJ3MgcHJlIGV4aXN0aW5nIGNvbmRpdGlvbnNcbiAgICAgKiBAcGFyYW0gaW1hZ2UgVGhlIHVzZXIncyBwcm9maWxlIHBpY3R1cmVcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihpZDogbnVtYmVyLCBlbWFpbDogc3RyaW5nLHBhc3N3b3JkOiBzdHJpbmcsIG5hbWU6IHN0cmluZywgcm9sZTogc3RyaW5nKVxuICAgIHtcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgICAgICB0aGlzLmVtYWlsID0gZW1haWw7XG4gICAgICAgIHRoaXMucGFzc3dvcmQgPSBwYXNzd29yZDtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5yb2xlID0gcm9sZTtcbiAgICB9XG5cbiAgICAgLyoqXG4gICAgICAqIE1ldGhvZCB0byBnZXQgdGhlIElkIG9mIHRoZSB1c2VyXG4gICAgICAqXG4gICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICAqIEBtZW1iZXJvZiBVc2VyXG4gICAgICAqL1xuICAgICBwdWJsaWMgZ2V0IElkKCk6IG51bWJlciAgXG4gICAgIHtcblx0XHRyZXR1cm4gdGhpcy5pZDtcblx0fVxuICAgICAvKipcbiAgICAgICogTWV0aG9kIHRvIHNldCB0aGUgSWQgb2YgdGhlIHVzZXJcbiAgICAgICpcbiAgICAgICogQG1lbWJlcm9mIFVzZXJcbiAgICAgICovXG4gICAgIHB1YmxpYyBzZXQgSWQodmFsdWU6IG51bWJlciApIFxuICAgICB7XG5cdFx0dGhpcy5pZCA9IHZhbHVlO1xuXHR9XG5cbiAgICAgLyoqXG4gICAgICAqIE1ldGhvZCB0byBnZXQgdGhlIG5hbWUgb2YgdGhlIHVzZXJcbiAgICAgICpcbiAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICogQG1lbWJlcm9mIFVzZXJcbiAgICAgICovXG4gICAgIHB1YmxpYyBnZXQgTmFtZSgpOiBzdHJpbmcgIFxuICAgICB7XG5cdFx0cmV0dXJuIHRoaXMubmFtZTtcblx0fVxuICAgICAvKipcbiAgICAgICogTWV0aG9kIHRvIHNldCB0aGUgbmFtZSBvZiB0aGUgdXNlclxuICAgICAgKlxuICAgICAgKiBAbWVtYmVyb2YgVXNlclxuICAgICAgKi9cbiAgICAgcHVibGljIHNldCBOYW1lKHZhbHVlOiBzdHJpbmcgKSBcbiAgICAge1xuXHRcdHRoaXMubmFtZSA9IHZhbHVlO1xuXHR9XG5cbiAgICAgLyoqXG4gICAgICAqIE1ldGhvZCB0byBnZXQgdGhlIGVtYWlsIG9mIHRoZSB1c2VyXG4gICAgICAqXG4gICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAqIEBtZW1iZXJvZiBVc2VyXG4gICAgICAqL1xuICAgICBwdWJsaWMgZ2V0IEVtYWlsKCk6IHN0cmluZyAgXG4gICAgIHtcblx0XHRyZXR1cm4gdGhpcy5lbWFpbDtcblx0fVxuICAgICAvKipcbiAgICAgICogTWV0aG9kIHRvIHNldCB0aGUgZW1haWwgb2YgdGhlIHVzZXJcbiAgICAgICpcbiAgICAgICogQG1lbWJlcm9mIFVzZXJcbiAgICAgICovXG4gICAgIHB1YmxpYyBzZXQgRW1haWwodmFsdWU6IHN0cmluZyApIFxuICAgICB7XG5cdFx0dGhpcy5lbWFpbCA9IHZhbHVlO1xuXHR9XG5cbiAgICAgLyoqXG4gICAgICAqIE1ldGhvZCB0byBnZXQgdGhlIHVzZXIncyBwYXNzd29yZFxuICAgICAgKlxuICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgKiBAbWVtYmVyb2YgVXNlclxuICAgICAgKi9cbiAgICAgcHVibGljIGdldCBQYXNzd29yZCgpOiBzdHJpbmcgIFxuICAgICB7XG5cdFx0cmV0dXJuIHRoaXMucGFzc3dvcmQ7XG5cdH1cbiAgICAgLyoqXG4gICAgICAqIE1ldGhvZCB0byBzZXQgdGhlIHVzZXIncyBwYXNzd29yZFxuICAgICAgKlxuICAgICAgKiBAbWVtYmVyb2YgVXNlclxuICAgICAgKi9cbiAgICAgcHVibGljIHNldCBQYXNzd29yZCh2YWx1ZTogc3RyaW5nKSBcbiAgICAge1xuXHRcdHRoaXMucGFzc3dvcmQgPSB2YWx1ZTtcblx0fVxuXG59XG4iXX0=