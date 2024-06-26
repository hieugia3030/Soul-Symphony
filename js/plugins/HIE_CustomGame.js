//1076 rmmz_scenes.js

//=============================================================================
// RPG Maker MZ - Custom Game
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Custom game config for my game.
 * @author Tran Trung Hieu
 *
 * @help HIE_CustomGame.js
 *
 * This plugin changes the layout of the menu screen.
 * It only show ITEM, SAVE, OPTIONS, TO TITLE.
 * 
 * This also disable Dashing in game
 *
 * It does not provide plugin commands.
 */

/*:ja
 * @target MZ
 * @plugindesc メニュー画面のレイアウトを変更します。
 * @author Tran Trung Hieu
 *
 * @help HIE_CustomGame.js
 *
 * このプラグインは、メニュー画面のレイアウトを変更します。
 * コマンドを上側に、ステータスを下側に配置します。
 *
 * プラグインコマンドはありません。
 */

(() => {
    // Change Default Config
    ConfigManager.touchUI = false;

    Window_Base.prototype.createTextState = function (text, x, y, width) {
        const rtl = Utils.containsArabic(text);
        const textState = {};
        textState.ogText = text;
        textState.text = this.convertEscapeCharacters(text);
        textState.index = 0;
        textState.x = rtl ? x + width : x;
        textState.y = y;
        textState.width = width;
        textState.height = this.calcTextHeight(textState);
        textState.startX = textState.x;
        textState.startY = textState.y;
        textState.rtl = rtl;
        textState.buffer = this.createTextBuffer(rtl);
        textState.drawing = true;
        textState.outputWidth = 0;
        textState.outputHeight = 0;
        return textState;
    };

    Window_Base.prototype.convertEscapeCharacters = function (text) {
        /* eslint no-control-regex: 0 */
        text = text.replace(/\\/g, "\x1b");
        text = text.replace(/\x1b\x1b/g, "\\");
        while (text.match(/\x1bV\[(\d+)\]/gi)) {
            text = text.replace(/\x1bV\[(\d+)\]/gi, (_, p1) =>
                $gameVariables.value(parseInt(p1))
            );
        }
        text = text.replace(/\x1bN\[(\d+)\]/gi, (_, p1) =>
            this.actorName(parseInt(p1))
        );
        text = text.replace(/\x1bP\[(\d+)\]/gi, (_, p1) =>
            this.partyMemberName(parseInt(p1))
        );
        text = text.replace(/\x1bG/gi, TextManager.currencyUnit);

        // remove \silience tag
        text = text.replace(/\x1bsilience/gi, "");

        return text;
    };

    Scene_MenuBase.prototype.commandWindowHeight = function () {
        return this.calcWindowHeight(3, true);
    };

    // Scene_Menu.prototype.commandWindowRect = function() {
    //     const ww = Graphics.boxWidth;
    //     const wh = this.commandWindowHeight();
    //     const wx = 0;
    //     const wy = this.mainAreaTop();
    //     return new Rectangle(wx, wy, ww, wh);
    // };

    Scene_Menu.prototype.create = function () {
        Scene_MenuBase.prototype.create.call(this);
        this.createCommandWindow();
    };

    Scene_Menu.prototype.commandWindowRect = function () {
        const ww = this.mainCommandWidth();
        const wh = this.commandWindowHeight();
        const wx = (Graphics.boxWidth - ww) / 2;
        const wy = (Graphics.boxHeight - this.mainAreaTop() - wh) / 2;
        console.log(this.mainAreaTop() + " " + wh + " " + wy);
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_Menu.prototype.createCommandWindow = function () {
        const rect = this.commandWindowRect();
        const commandWindow = new Window_MenuCommand(rect);
        commandWindow.setHandler("item", this.commandItem.bind(this));
        commandWindow.setHandler("options", this.commandOptions.bind(this));
        // commandWindow.setHandler("save", this.commandSave.bind(this));
        commandWindow.setHandler("gameEnd", this.commandGameEnd.bind(this));
        commandWindow.setHandler("cancel", this.popScene.bind(this));
        this.addWindow(commandWindow);
        this._commandWindow = commandWindow;
    };

    Window_MenuCommand.prototype.makeCommandList = function () {
        this.makeCustomCommandList();
    };

    Window_MenuCommand.prototype.makeCustomCommandList = function () {
        const enabled = true;
        this.addCommand(TextManager.item, "item", enabled);
        this.addCommand(TextManager.options, "options", enabled);
        this.addCommand(TextManager.gameEnd, "gameEnd", enabled);

    };

    Scene_Menu.prototype.start = function () {
        Scene_MenuBase.prototype.start.call(this);
    };

    Game_Player.prototype.updateDashing = function () { };

    Window_Options.prototype.addGeneralOptions = function () { };

    Scene_Options.prototype.maxCommands = function () {
        return 5;
    };
    })();
