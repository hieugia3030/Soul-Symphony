//=============================================================================
// SlowText.js                                                             
//=============================================================================

/*:
* @author Kino
* @plugindesc This plugin makes rpgmaker draw text at a slower speed.
*
* @param Text Speed 
* @desc The speed at which characters will be rendered
* @default 2
*
* @help
* Version: 1.02
* Version Log:
* Updated to work with Yanfly Message Core!
* Now you can change the text speed at will using escape characters
* inside the window.
* Example: \TS[30] updates the text speed to super slow 30.
* Note: The [30] will appear in the editor, but not in game.
* 
* Instructions:
* You set your text speed in the plugin menu.
* This is the speed that the characters will be drawn at.
*
* Contact me via forums; username: Kino.
* Hope this plugin helps and enjoy!
*/

var KR = KR || {};
KR.Plugins = KR.Plugins || {};


(function($) {
//=============================================================================
// Plugin Variables                                                             
//=============================================================================
  var parameters = PluginManager.parameters("SlowText");
  var textSpeed = Number(parameters["Text Speed"]) || 5;
  $.Plugins.SlowText = function () {

//=============================================================================
// Window Message                                                         
//=============================================================================
    var WindowMessage_Initialize = Window_Message.prototype.initialize;
    Window_Message.prototype.initialize = function() {
      this.originalTextSpeed = textSpeed;
      WindowMessage_Initialize.call(this);
    };

    Window_Message.prototype.processEscapeCharacter = function(code, textState) {
      switch (code) {
      case '$':
          this._goldWindow.open();
          break;
      case '.':
          this.startWait(15);
          break;
      case '|':
          this.startWait(60);
          break;
      case '!':
          this.startPause();
          break;
      case '>':
          this._lineShowFast = true;
          break;
      case '<':
          this._lineShowFast = false;
          break;
      case '^':
          this._pauseSkip = true;
          break;
      case 'TS':
          this.updateTextSpeed(this.obtainEscapeParam(textState));
          break;
      default:
          Window_Base.prototype.processEscapeCharacter.call(this, code, textState);
          break;
      }
    };

    Window_Message.prototype.updateTextSpeed = function(value) {
      textSpeed = value;
    };

    Window_Message.prototype.processNormalCharacter = function(textState) {
      Window_Base.prototype.processNormalCharacter.call(this, textState);
      this.startWait(textSpeed);
    };

    Window_Message.prototype.updateWait = function() {
      if (this._waitCount > 0 && !this._showFast) {
          this._waitCount--;
          return true;
      } else {
          this._waitCount = 0;
          return false;
      }
    };

    var WindowMessage_terminateMessage = Window_Message.prototype.terminateMessage;
    Window_Message.prototype.terminateMessage = function() {
      textSpeed = this.originalTextSpeed;
      WindowMessage_terminateMessage.call(this);
    };
  };

  $.Plugins.SlowText();
})(KR);