"use strict";
var Imported = Imported || {};
Imported.MZPlusQuickStart = 'MZPlusQuickStart';
//=============================================================================
// MZPlusQuickStart.js
//-----------------------------------------------------------------------------
// 8/20/2020 - Version 1.1 - added dev only mode
// 8/20/2020 - Version 1.0 - release
//=============================================================================

var MZPlus = MZPlus || {};
MZPlus.QuickStart = MZPlus.QuickStart || {};
/*:
* @plugindesc <MZPlusQuickStart> Skips the title for fast testing. Credit to Quasi.
* @author Anisoft || Version 1.0.1
* @target MZ
* @orderAfter MZPlus

* @param Dev Mode Only
* @text Dev Mode Only
* @type boolean
* @default true
*/
($=> {
    const filter = $plugins.filter(function (p) {
        return p.description.contains('<MZPlusQuickStart>') && p.status;
    })[0];
    const params = filter.parameters;
    if (!params) {
        console.warn("Failed to load parameters, Remove and Re-add the plugin to reset them")
    }
    $.devMode = params['Dev Mode Only'] === 'true'

})(MZPlus.QuickStart);

($ => {
    const Alias_start = $.start;
    $.start = function () {
        if (!MZPlus.QuickStart.devMode || Utils.isOptionValid("test")) {
            this.checkPlayerLocation();
            DataManager.setupNewGame();
            SceneManager.goto(Scene_Map);
            this.resizeScreen();
            this.updateDocumentTitle();
        } else {
            Alias_start.call(this);
        }
    };
})(Scene_Boot.prototype);
