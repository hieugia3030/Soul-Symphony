// ==================================================
// Cae_CustomEscCodes.js
// ==================================================

/*:
 * @plugindesc v1.3 - Define custom escape sequences for messages!
 * @author Caethyril
 *
 * @help Plugin commands:
 *    None.
 *
 * Help:
 *    A message escape sequence comprises several parts.
 *    This plugin refers to these parts as follows:
 *     - escape code: identifies the sequence type (case-insensitive).
 *                    Use letters a-z and/or A-Z for this.
 *                    The code can be more than one character long.
 *               e.g. the V in \V[x]
 *               e.g. TINT in \TINT[a,b,c,d,e]
 *     -   arguments: refine the result based on these values.
 *                    Separate multiple arguments with a comma.
 *               e.g. the x in \V[x]
 *               e.g. the x and y in \A<x,y>
 *     -  delimiters: signal the start/end of the arguments section.
 *               e.g. []
 *               e.g. <>
 *     -    replacer: determines the escape sequence's effect.
 *                    This is JavaScript! See below for examples~
 *                    Evaluated in the current window's context.
 *                    Matched arguments are referenced as
 *                        arguments[1], arguments[2], etc.
 *                    (Note that "arguments" is not, in itself, an array.)
 *
 *    "Convert" codes are replaced before the message starts.
 *      - default examples: \V[x], \N[x], \P[x], \G
 *    "Process" codes are replaced when they would be displayed.
 *      - default examples: \C[x], \I[x], \!, \$
 *
 * Replacer function examples:
 *   "Convert" type:
 *    1) Random greeting (no arguments):
 *         var hi = ['Hi','Hey','Hello','Greetings','Welcome'];
 *         var r = Math.randomInt(hi.length);
 *         return hi[r] + ' ' + $gameParty.leader().name();
 *
 *    2) Repetition (2 arguments, Text and Integer):
 *         var res = '';
 *         var txt = arguments[1] || '';
 *         var num = parseInt(arguments[2], 10) || 0;
 *         for (var n = num; n > 0; n--) res += txt;
 *         return res;
 *
 *   "Process" type:
 *    1) Play sound effect (no arguments)
 *         var se = {};
 *         se.name = 'Bell1';
 *         se.volume = 20;
 *         se.pitch = 100;
 *         se.pan = 0;
 *         AudioManager.playSe(se);
 *
 *    2) Tint screen (5 arguments, all Integers)
 *         var args = [arguments[1], arguments[2], arguments[3],
 *                     arguments[4], arguments[5]];
 *         args = args.map(function(a) { return parseInt(a, 10); });
 *         var tone = args.slice(0, 4);  // r,g,b,sat
 *         var duration = args[4];       // frames
 *         $gameScreen.startTint(tone, duration);
 *
 *    3) Wait for x frames (1 argument, Integer):
 *         this.startWait(parseInt(arguments[1]));
 * 
 *    4) Call common event ID x (1 argument, Integer):
 *         var ev = $dataCommonEvents[parseInt(arguments[1], 10)];
 *         if (ev) {
 *            var pt = SceneManager._scene instanceof Scene_Map ?
 *                     $gameMap._interpreter : $gameTroop._interpreter;
 *            var id = pt.isOnCurrentMap() ? pt.eventId() : 0;
 *            pt.setupChild(ev.list, id);
 *         }
 *
 *    Note that only the convert functions require a return value.
 *
 * Caution: you can mess things up by putting codes one after another, e.g.
 *         \G\N[1] --> \GHarold --> (no such code!) --> (blank)
 *    You can stop this by putting a zero-width space (U+200B) between them. ^_^
 *    Be careful with zero-width spaces, though...they're difficult to spot. o_o'
 *
 * Compatibility:
 *    Aliases:
 *       Window_Base: convertEscapeCharacters, processEscapeCharacter
 *
 * Terms of use:
 *    Free to use and modify.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Update log:
 *   1.3: Compatibility fix for YEP_MessageCore word-wrap width-check.
 *   1.2: Fix: Added bind for "convert" replacer functions to retain context.
 *   1.1: Fix: Text-type argument matches are now non-greedy.
 *   1.0: Initial release.
 *
 * @param Convert Escape Codes
 * @text Convert Escape Codes
 * @type struct<CaeEscCodeType>[]
 * @desc A list of codes that get replaced before the message starts.
 * @default []
 *
 * @param Process Escape Codes
 * @text Process Escape Codes
 * @type struct<CaeEscCodeType>[]
 * @desc A list of codes that get processed when the message reaches that point.
 * @default []
 *
 * @param Argument Separator
 * @text Argument Separator
 * @type text
 * @desc String expected between consecutive arguments.
 * Will default to a comma , if left blank.
 * @default ,
 */
// ==================================================
/*~struct~CaeEscCodeType:
 * @param Code
 * @text Code
 * @type text
 * @desc The part that appears after the \
 * E.g. the V in \V[x].
 * @default
 *
 * @param Arguments
 * @text Arguments
 * @type combo[]
 * @option Integer
 * @option Text
 * @desc A list of the argument types for this escape sequence.
 * Accepts custom regex (capturing parentheses will be added).
 * @default
 *
 * @param Delimiters
 * @text Delimiters
 * @type combo
 * @option []
 * @option <>
 * @option {}
 * @option ()
 * @option
 * @desc The brackets enclosing the arguments.
 * Ignored if there are no arguments.
 * @default []
 *
 * @param Replacer
 * @text Replacer
 * @type note
 * @desc JavaScript function evaluated when the escape sequence is matched.
 * @default "return;"
 */

var Imported = Imported || {};
Imported.Cae_CustomEscCodes = 1.3;

var CAE = CAE || {};
CAE.CustomEscCodes = CAE.CustomEscCodes || {};

(function(_) {

'use strict';

	const PLUGIN_NAME = 'Cae_CustomEscCodes';
	const ERR_PRE     = PLUGIN_NAME + '.js ';
	const ERR_NOPARAM = ERR_PRE + 'could not find its parameters!\nCheck the plugin is named correctly and try again.';

	const RX_SPACE = '(?:\\s*)';	// optional* (?:non-captured) \spacing
	const ZERO_SPC = '\u200b';	// zero-width space - messes up \v[\v[x]] with auto-insertion, can't really do much. Y-Y

// ================== Parameter stuff ================== //

	_.params = PluginManager.parameters(PLUGIN_NAME);
	if (!_.params) throw new Error(ERR_NOPARAM);

	// "constants"; not truly constant, for moddability
	_.argDelim = RX_SPACE + '\\' + (String(_.params['Argument Separator'] || '').trim() || ',');
	_.rxFlags = 'gi';

	// ~~~~~~~~~~~ Utility ~~~~~~~~~~~ //

	// For compatibility with YEP_MessageCore word-wrap
	// Process replacer functions will execute iff this function returns falsy
	_.isCheckWrapMode = function() { return this._checkWordWrapMode; };

	// Argument delimiter parser (expects input = two-character string)
	_.rxDelim = function(input, isOpening) {
		var res = (input || '')[isOpening ? 0 : 1];
		return res ? '\\' + res : '';
	};

	// String-forming methods for regular expression generation
	_.mkRegExp = {
		args: function(p) {
			let res = '';
			if (Array.isArray(p.Arguments) && p.Arguments.length) {
				res += _.rxDelim(p.Delimiters, true);
				res += RX_SPACE;
				p.Arguments.forEach(function(arg, ix) {
					res += '(' + arg + ')';
					if (ix + 1 < p.Arguments.length) {
						res += _.argDelim;
					}
					res += RX_SPACE;
				});
				res += _.rxDelim(p.Delimiters, false);
			}
			return res;
		},
		full: function(p) {
			let res = '\x1b' + p.Code;
			res += _.mkRegExp.args(p);	// remote map method, do not use "this"
			return res;
		},
		clean: function(p) {
			return p;	// p.replace(/\\/gi, '\\\\');
		}
	};

	// Make function based on parameter value
	_.mkFunc = function(p) {
		let res = p.Replacer;
		return new Function(res);
	};

	// ~~~~~~ Parameter parsing ~~~~~~ //

	// Main string -> internal object parameter parsers/generators
	_.extractParam = {
		comm: function(pName) {
			let o = {};
			o.codes = JSON.parse(_.params[pName] || '[]').map(JSON.parse);
			o.codes.forEach(_.parseParam);
			o.replx = o.codes.map(_.mkFunc);
			return o;
		},
		conv: function(pName) {
			let o = this.comm(pName);
			o.regex = o.codes.map(_.mkRegExp.full).map(_.mkRegExp.clean);
			return o;
		},
		proc: function(pName) {
			let o = this.comm(pName);
			o.regex = o.codes.map(_.mkRegExp.args).map(_.mkRegExp.clean);
			return o;
		}
	};

	// Parse/validate string properties
	_.parseParam = function(p) {
		p.Code = p.Code.trim();
		p.Arguments = JSON.parse(p.Arguments || '[]').map(function(a) {
			switch(a.toUpperCase()) {
				case 'INTEGER': return '[\\-]?\\d+';	// optional minus sign
				case 'TEXT': return '.*?';		// non-greedy match
				default: return a;
			}
		});
		p.Delimiters = p.Delimiters.trim();
		p.Replacer = JSON.parse(p.Replacer);
	};

	// Parse params on script load
	_.c = _.extractParam.conv('Convert Escape Codes');
	_.r = _.extractParam.proc('Process Escape Codes');

// ==================== Alterations ==================== //

	// Convert custom escape codes as well (pre-message)
	_.Window_Base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
	Window_Base.prototype.convertEscapeCharacters = function(text) {
		text = _.Window_Base_convertEscapeCharacters.call(this, text);
		_.c.codes.forEach(function(o, ix) {
			text = text.replace(new RegExp(_.c.regex[ix], _.rxFlags), _.c.replx[ix].bind(this));
		}, this);
		return text;
	};

	// Process custom escape codes as well (mid-text)
	_.Window_Base_processEscapeCharacter = Window_Base.prototype.processEscapeCharacter;
	Window_Base.prototype.processEscapeCharacter = function(code, textState) {
		let ix = -1;
		_.r.codes.some(function(o, n) {
			if (code.toUpperCase() === o.Code.toUpperCase()) {
				ix = n;
				return true;
			}
			return false;
		});
		if (ix >= 0) {
			let arr = [];
			let rgx = _.r.regex[ix];
			if (rgx) {
				let rx = new RegExp('^' + rgx, _.rxFlags);
				arr = rx.exec(textState.text.slice(textState.index)) || [''];
				textState.index += arr[0].length;
			}
			if (!_.isCheckWrapMode.call(this)) _.r.replx[ix].apply(this, arr);
		} else {
			_.Window_Base_processEscapeCharacter.call(this, code, textState);
		}
	};
	
})(CAE.CustomEscCodes);