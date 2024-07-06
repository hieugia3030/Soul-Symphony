/*:
 * @author Synrec/Kylestclair
 * @plugindesc v1.1.0 Preloads image and audio for the game on start
 * @url https://synrec.itch.io
 * @target MZ
 * 
 * @help
 * During playtesting, the plugin will create a list of image and audio
 * that was loaded to be preloaded on startup.
 * 
 * 
 * @param Bypass Load Confirm
 * @desc Bypass needing to use a confirm button
 * @type boolean
 * @default false
 * 
 * @param Skip Title
 * @desc Skips title if no save game
 * @type boolean
 * @default true
 * 
 * @param Loading Gauge
 * @desc Setup the loading gauge
 * @type struct<preloadGauge>
 * 
 * @param Preload Background
 * @desc Background Image used for the preload scene.
 * @type file
 * @dir img/system/
 * 
 * @param Preload Fonts
 * @desc Setup fonts to preload
 * @type struct<preloadFont>[]
 * @default []
 * 
 * @param General Settings
 * 
 * @param Ignored Directories
 * @parent General Settings
 * @desc These directories are ignored by the preloader
 * Format: main_dir/sub_dir/
 * @type text[]
 * @default []
 * 
 * @param Ignored Files
 * @parent General Settings
 * @desc These files are ignored by the preloader
 * @type struct<ignoreFile>[]
 * @default []
 * 
 */
/*~struct~preloadFont:
 * 
 * @param Font Name
 * @desc Name of the font
 * @type text
 * @default Font Name
 * 
 * @param Font URL
 * @desc mv: ./fonts/font_name.ttf
 * mz: font_name.ttf
 * @type text
 * @default ./fonts/font_name.ttf
 * 
 */
/*~struct~preloadGauge:
 * 
 * @param Position X
 * @desc Screen position of gauge
 * @type text
 * @default 0
 * 
 * @param Position Y
 * @desc Screen position of gauge
 * @type text
 * @default 0
 * 
 * @param Radius
 * @desc Size of the gauge
 * @type text
 * @default 1
 * 
 * @param Color
 * @desc Color of the gauge
 * Use 0xHex; eg: 0xffffff
 * @type text
 * @default 0xffffff
 * 
 * @param Complete Text
 * @desc Text when preload complete
 * @type text
 * @default Press OK To Continue
 * 
 * @param Text X
 * @parent Complete Text
 * @desc Position of text
 * @type text
 * @default 0
 * 
 * @param Text Y
 * @parent Complete Text
 * @desc Position of text
 * @type text
 * @default 0
 * @default 0
 * 
 * @param Text Font Face
 * @parent Complete Text
 * @desc Font face of text
 * @type text
 * @default sans-serif
 * 
 * @param Text Size
 * @parent Complete Text
 * @desc Size of text
 * @type text
 * @default 24
 * 
 * @param Text Outline Size
 * @parent Complete Text
 * @desc Size of text
 * @type text
 * @default 4
 * 
 * @param Text Color
 * @parent Complete Text
 * @desc Color of text
 * eg: #ffffff or rgba(255, 255, 255, 1)
 * @type text
 * @default #ffffff
 * 
 * @param Text Outline Color
 * @parent Complete Text
 * @desc Color of text
 * eg: #ffffff or rgba(255, 255, 255, 1)
 * @type text
 * @default rgba(0, 0, 0, 0.5)
 * 
 */
/*~struct~ignoreFile:
 * 
 * @param Name
 * @desc No function
 * @type text
 * @default FILE
 * 
 * @param Directory
 * @desc Directory file loaded from
 * Format: main_dir/sub_dir/
 * @type text
 * @default img/pictures/
 * 
 * @param File Name
 * @desc Include sub-directory names as well.
 * @type text
 * 
 */

const Syn_Preload = {};
Syn_Preload.Plugin = PluginManager.parameters(`Synrec_Preloader`);
Syn_Preload.SKIP_TITLE = eval(Syn_Preload.Plugin['Skip Title']);

function FONT_CONFIG_PARSER_PRELOAD(obj){
    try{
        obj = JSON.parse(obj);
        return obj;
    }catch(e){
        return;
    }
}

try{
    Syn_Preload.PRELOAD_FONTS = JSON.parse(Syn_Preload.Plugin['Preload Fonts']).map((font_config)=>{
        return FONT_CONFIG_PARSER_PRELOAD(font_config);
    }).filter(Boolean)
}catch(e){
    Syn_Preload.PRELOAD_FONTS = [];
}

function IGNORE_FILE_PARSER_PRELOAD(obj){
    try{
        obj = JSON.parse(obj);
        return obj;
    }catch(e){
        return;
    }
}

try{
    Syn_Preload.IGNORED_FILES = JSON.parse(Syn_Preload.Plugin['Ignored Files']).map((file_data)=>{
        return IGNORE_FILE_PARSER_PRELOAD(file_data);
    }).filter(Boolean)
}catch(e){
    Syn_Preload.IGNORED_FILES = [];
}

try{
    Syn_Preload.IGNORED_FOLDERS = JSON.parse(Syn_Preload.Plugin['Ignored Directories']);
}catch(e){
    Syn_Preload.IGNORED_FOLDERS = [];
}

function PRELOAD_GAUGE_SETTINGS_PARSER_PRELOAD(obj){
    try{
        obj = JSON.parse(obj);
        return obj;
    }catch(e){
        const obj = {};
        obj['Position X'] = 0;
        obj['Position Y'] = 0;
        obj['Width'] = Graphics.width;
        obj['Height'] = Graphics.height;
        obj['Color'] = '0xffffff';
        return obj;
    }
}

Syn_Preload.PRELOAD_GAUGE_SETTINGS = PRELOAD_GAUGE_SETTINGS_PARSER_PRELOAD(Syn_Preload.Plugin['Loading Gauge']);
Syn_Preload.PRELOADER_GRAPHIC = Syn_Preload.Plugin['Preload Background'];
Syn_Preload.BYPASS_LOAD_CONFIRM = eval(Syn_Preload.Plugin['Bypass Load Confirm']);

function PRELOADER_IMAGE_LOADER(folder, filename){
    const is_mz = Utils.RPGMAKER_NAME == "MZ";
    if(is_mz){
        const url = folder + Utils.encodeURI(filename) + ".png";
        const bitmap = Bitmap.load(url);
        return bitmap;
    }else{
        const url = decodeURIComponent(folder + encodeURIComponent(filename) + ".png");
        const bitmap = Bitmap.load(url);
        return bitmap;
    }
}

function PRELOADER_AUDIO_LOADER(folder, filename){
    const is_mz = Utils.RPGMAKER_NAME == "MZ";
    if(is_mz){
        const audio_ext = AudioManager.audioFileExt();
        const audio_path = AudioManager._path;
        const url = audio_path + folder + Utils.encodeURI(filename) + audio_ext;
        const buffer = new WebAudio(url);
        return buffer;
    }else{
        const audio_ext = AudioManager.audioFileExt();
        const audio_path = AudioManager._path;
        const url = audio_path + folder + '/' + encodeURIComponent(filename) + audio_ext;
        const buffer = new WebAudio(url);
        return buffer;
    }
}

Syn_Preload_ScnMngr_UpdtMain = SceneManager.updateMain;
SceneManager.updateMain = function() {
    Syn_Preload_ScnMngr_UpdtMain.call(this, ...arguments);
    this.updatePreload();
}

SceneManager.updatePreload = function(){
    if(!$gameTemp)return;
    if(!ImageManager.isReady())return;
    const need_preload = $gameTemp._need_preload;
    if(!need_preload){
        if(this._running_preloader){
            this.updatePreloadScene(true);
            this._running_preloader = false;
        }
        if($gameTemp._confirm_preload){
            this._complete_preload = true;
        }
        return;
    }
    this._running_preloader = true;
    $gameTemp.updatePreloadList();
    this.updatePreloadScene(false);
}

SceneManager.updatePreloadScene = function(show_window_layer){
    const scene = this._scene;
    if(!scene)return;
    const window_layer = scene._windowLayer;
    if(window_layer){
        window_layer.visible = show_window_layer;
    }
    if(!show_window_layer){
        this.drawScenePreloadPIXI();
    }else{
        this.eraseScenePreloadPIXI();
    }
}

SceneManager.drawScenePreloadPIXI = function(){
    const scene = this._scene;
    const gauge_settings = Syn_Preload.PRELOAD_GAUGE_SETTINGS;
    const cur = $gameTemp._current_preload;
    const max = $gameTemp._preload_length;
    const ratio = Math.min(1, Math.max(0, (cur / max)));
    if(!this._preload_sprite){
        const bitmap_name = Syn_Preload.PRELOADER_GRAPHIC;
        const sprite = new Sprite();
        if(bitmap_name){
            sprite.bitmap = ImageManager.loadSystem(bitmap_name);
        }
        scene.addChild(sprite);
        this._preload_sprite = sprite;
    }
    if(ratio <= 1){
        const x = eval(gauge_settings['Position X']) || 0;
        const y = eval(gauge_settings['Position Y']) || 0;
        const r = eval(gauge_settings['Radius']) || 1;
        const color = eval(gauge_settings['Color']);
        if(!this._preload_pixi_circ){
            this._preload_pixi_circ = new PIXI.Graphics();
            scene.addChild(this._preload_pixi_circ);
        }
        const loading_circ = this._preload_pixi_circ;
        loading_circ.clear();
        const ratio_arc = (Math.PI * 2) * ratio;
        const line_size = Math.ceil(Math.max(Graphics.width, Graphics.height) / 100);
        loading_circ.lineStyle(line_size, color);
        loading_circ.arc(x, y, r, 0, ratio_arc);
    }
    if(!Syn_Preload.BYPASS_LOAD_CONFIRM && ratio >= 1){
        const x = eval(gauge_settings['Text X']);
        const y = eval(gauge_settings['Text Y']);
        const text = (gauge_settings['Complete Text'] || "");
        if(!this._confirm_sprite){
            const sprite = new Sprite();
            const bitmap = new Bitmap(Graphics.width, Graphics.height);
            bitmap.fontFace = gauge_settings['Text Font Face'];
            bitmap.fontSize = eval(gauge_settings['Text Size']);
            bitmap.outlineWidth = eval(gauge_settings['Text Outline Size']);
            bitmap.textColor = gauge_settings['Text Color'];
            bitmap.outlineColor = gauge_settings['Text Outline Color'];
            bitmap.drawText(text, x, y, Graphics.width, Math.max(36, bitmap.fontSize));
            sprite.bitmap = bitmap;
            scene.addChild(sprite);
            this._confirm_sprite = sprite;
        }
    }
}

SceneManager.eraseScenePreloadPIXI = function(){
    if(this._preload_sprite){
        if(this._preload_sprite.parent){
            this._preload_sprite.parent.removeChild(this._preload_sprite);
            if(this._preload_sprite.destroy)this._preload_sprite.destroy();
            this._preload_sprite = null;
        }
    }
    if(this._preload_pixi_circ){
        if(this._preload_pixi_circ.parent){
            this._preload_pixi_circ.parent.removeChild(this._preload_pixi_circ);
            if(this._preload_pixi_circ.destroy)this._preload_pixi_circ.destroy();
            this._preload_pixi_circ = null;
        }
    }
    if(this._confirm_sprite){
        if(this._confirm_sprite.parent){
            this._confirm_sprite.parent.removeChild(this._confirm_sprite);
            if(this._confirm_sprite.destroy)this._confirm_sprite.destroy();
            this._confirm_sprite = null;
        }
    }
}

ImageManager.addPreloadedData = function(folder, filename, image){
    if(!this._preloaded_data)this._preloaded_data = {};
    if(!this._preloaded_data[folder]){
        this._preloaded_data[folder] = {};
    }
    const loaded_files = Object.keys(this._preloaded_data[folder]);
    if(loaded_files.some((name)=>{
        return name == filename;
    })){
        if(this._preloaded_data[folder][filename]){
            return;
        }
    }
    image.destroy = function(){this._paintOpacity = 0}
    this._preloaded_data[folder][filename] = image;
}

ImageManager.callPreloadData = function(folder, filename){
    if(!this._preloaded_data)this._preloaded_data = {};
    if(!this._preloaded_data[folder])return null;
    if(!this._preloaded_data[folder][filename])return null;
    return this._preloaded_data[folder][filename];
}

Syn_Preload_ImgMngr_LoadBitmp = ImageManager.loadBitmap;
ImageManager.loadBitmap = function(folder, filename) {
    const base = Syn_Preload_ImgMngr_LoadBitmp.call(this, ...arguments);
    const preloaded = this.callPreloadData(folder, filename);
    if(preloaded){
        preloaded._paintOpacity = 255;
        return preloaded;
    }
    if (filename && $gameTemp) {
        const ignored_folders = $gameTemp.imageBannedPreloadList();
        if(ignored_folders.includes(folder))return base;
        const obj = {folder: folder, file: filename};
        const ignored_files = $gameTemp.imageIgnoredPreloadList();
        if(ignored_files.some((file_data)=>{
            const dir = file_data.folder;
            const name = file_data.file;
            return(
                obj.folder == dir &&
                obj.file == name
            )
        }))return base;
        this.addPreloadedData(folder, filename, base);
        const whole_list = $gameTemp.preloadList();
        const image_list = whole_list['Image'] || {};
        if(!Array.isArray(image_list[folder])){
            image_list[folder] = [];
        }
        const dir_imgage_list = image_list[folder];
        if(dir_imgage_list.includes(filename)){
            return base;
        }
        dir_imgage_list.push(filename);
        $gameTemp.setPreloadList(whole_list);
    }
    return base;
}


AudioManager.addPreloadedData = function(folder, filename, audio){
    if(!this._preloaded_data)this._preloaded_data = {};
    if(!this._preloaded_data[folder]){
        this._preloaded_data[folder] = {};
    }
    const loaded_files = Object.keys(this._preloaded_data[folder]);
    if(loaded_files.some((name)=>{
        return name == filename;
    }))return;
    audio.destroy = function(){this.stop()}
    this._preloaded_data[folder][filename] = audio;
}

AudioManager.callPreloadData = function(folder, filename){
    if(!this._preloaded_data)this._preloaded_data = {};
    if(!this._preloaded_data[folder])return null;
    if(!this._preloaded_data[folder][filename])return null;
    return this._preloaded_data[folder][filename];
}

Syn_Preload_AudMngr_CrtBufr = AudioManager.createBuffer;
AudioManager.createBuffer = function(folder, name) {
    const base = Syn_Preload_AudMngr_CrtBufr.call(this, ...arguments);
    const preloaded = this.callPreloadData(folder, name);
    if(preloaded){
        return preloaded;
    }
    if(name && $gameTemp){
        const ignored_folders = $gameTemp.audioBannedPreloadList();
        if(ignored_folders.includes(folder))return base;
        const obj = {folder: `audio/${folder}`, file: name};
        const ignored_files = $gameTemp.audioIgnoredPreloadList();
        if(ignored_files.some((file_data)=>{
            const dir = file_data['Directory'];
            const name = file_data['File Name'];
            return(
                obj.folder == dir &&
                obj.file == name
            )
        })){
            return base;
        }
        this.addPreloadedData(folder, name, base);
        const whole_list = $gameTemp.preloadList();
        const audio_list = whole_list['Audio'] || {};
        if(!Array.isArray(audio_list[folder])){
            audio_list[folder] = [];
        }
        const dir_audio_list = audio_list[folder];
        if(dir_audio_list.includes(name)){
            return base;
        }
        dir_audio_list.push(name);
        $gameTemp.setPreloadList(whole_list);
    }
    return base;
}

Syn_Preload_ScnBoot_Strt = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function() {
    SoundManager.preloadImportantSounds();
    if(
        !DataManager.isBattleTest() &&
        !DataManager.isEventTest() &&
        Syn_Preload.SKIP_TITLE &&
        !this.hasSaveFile()
    ){
        Scene_Base.prototype.start.call(this);
        this.checkPlayerLocation();
        DataManager.setupNewGame();
        SceneManager.goto(Scene_Map);
        if(this.resizeScreen)this.resizeScreen();
        this.updateDocumentTitle();
    }else{
        Syn_Preload_ScnBoot_Strt.call(this);
    }
}

Scene_Boot.prototype.hasSaveFile = function(){
    const is_mz = Utils.RPGMAKER_NAME === "MZ";
    const max = DataManager.maxSavefiles();
    for(let i = 0; i < max; i++){
        const exists = is_mz ? DataManager.savefileExists(i) : StorageManager.exists(i);
        if(exists){
            return true;
        }
    }
    return false;
}

Syn_Preload_ScnBse_IsBsy = Scene_Base.prototype.isBusy;
Scene_Base.prototype.isBusy = function() {
    const base = Syn_Preload_ScnBse_IsBsy.call(this, ...arguments);
    if(!$gameTemp)return base;
    const need_preload = $gameTemp._need_preload;
    if(!need_preload)return base;
    return (
        base || 
        SceneManager._running_preloader || 
        !SceneManager._complete_preload ||
        !$gameTemp._confirm_preload
    );
}

// Syn_Preload_ScnBse_IsRdy = Scene_Base.prototype.isReady;
// Scene_Base.prototype.isReady = function() {
//     const base = Syn_Preload_ScnBse_IsRdy.call(this, ...arguments);
//     return (
//         base &&
//         SceneManager._running_preloader && 
//         !$gameTemp._need_preload
//     );
// }

Game_Temp.prototype.setPreloadList = function(list){
    if(!list)return;
    this._preloader_list = list;
    this.savePreloadList();
}

Game_Temp.prototype.preloadList = function(){
    if(!this._preloader_list){
        this.initializePreloader();
    }
    return this._preloader_list;
}

Game_Temp.prototype.imagePreloadList = function(){
    const whole_list = this.preloadList();
    return whole_list['Image'];
}

Game_Temp.prototype.audioPreloadList = function(){
    const whole_list = this.preloadList();
    return whole_list['Audio'];
}

Game_Temp.prototype.imageIgnoredPreloadList = function(){
    const whole_list = this.preloadList();
    return whole_list['Image File Ignored'];
}

Game_Temp.prototype.audioIgnoredPreloadList = function(){
    const whole_list = this.preloadList();
    return whole_list['Audio File Ignored'];
}

Game_Temp.prototype.imageBannedPreloadList = function(){
    const whole_list = this.preloadList();
    return whole_list['Image Folder Ignored'];
}

Game_Temp.prototype.audioBannedPreloadList = function(){
    const whole_list = this.preloadList();
    return whole_list['Audio Folder Ignored'];
}

Game_Temp.prototype.savePreloadList = function(){
    const is_mz = Utils.RPGMAKER_NAME == "MZ";
    const file_name = `Preload_JSON`;
    if(is_mz){
        const preload_list = this.preloadList();
        const preload_json = JSON.stringify(preload_list);
        StorageManager.saveObject(file_name, preload_json);
    }else{
        const preload_list = this.preloadList();
        const preload_json = JSON.stringify(preload_list);
        StorageManager.save(file_name, preload_json);
    }
}

Game_Temp.prototype.loadPreloadList = function(){
    const is_mz = Utils.RPGMAKER_NAME == "MZ";
    const file_name = `Preload_JSON`;
    if(is_mz){
        const file_exists = StorageManager.exists(file_name);
        if(file_exists){
            StorageManager.loadObject(file_name)
            .then((file)=>{
                const list = JSON.parse(file);
                $gameTemp.setPreloadList(list);
                $gameTemp.resyncBanIgnoreLists();
                $gameTemp._preloadReady = true;
            })
            .catch((e)=>{
                console.error(e);
            })
        }else{
            this._preloadReady = true;
        }
    }else{
        const list = StorageManager.load(file_name);
        if(list){
            const parsed_list = JSON.parse(list);
            this.setPreloadList(parsed_list);
            this.resyncBanIgnoreLists();
            this._preloadReady = true;
        }else{
            this._preloadReady = true;
        }
    }
}

Game_Temp.prototype.resyncBanIgnoreLists = function(){
    const image_match_checker = /^(img\/)(?:.+)/gm;
    const audio_match_checker = /^(audio\/)(?:.+)/gm;
    const ignored_folders = JsonEx.makeDeepCopy(Syn_Preload.IGNORED_FOLDERS);
    const preload_list = this.preloadList();
    const image_folder_list = preload_list['Image'] || {};
    const audio_folder_list = preload_list['Audio'] || {};
    const img_fldr_list = [];
    const aud_fldr_list = [];
    if(ignored_folders.length > 0){
        for(let i = 0; i < ignored_folders.length; i++){
            const del_fldr = ignored_folders[i];
            const aud_string = del_fldr.split('/')[1].concat('/');
            if(del_fldr.match(image_match_checker)){
                img_fldr_list.push(del_fldr);
                delete image_folder_list[del_fldr];
            }
            if(del_fldr.match(audio_match_checker)){
                aud_fldr_list.push(aud_string);
                delete audio_folder_list[aud_string];
            }
        }
    }
    preload_list['Image Folder Ignored'] = img_fldr_list;
    preload_list['Audio Folder Ignored'] = aud_fldr_list;
    preload_list['Image'] = image_folder_list;
    preload_list['Audio'] = audio_folder_list;
    const ignored_files = JsonEx.makeDeepCopy(Syn_Preload.IGNORED_FILES);
    if(ignored_files.length > 0){
        const image_list = [];
        const audio_list = [];
        ignored_files.forEach((file_data)=>{
            const file_dir = file_data['Directory'];
            if(file_dir.match(image_match_checker)){
                image_list.push(file_data);
            }
            if(file_dir.match(audio_match_checker)){
                audio_list.push(file_data);
            }
        })
        preload_list['Image File Ignored'] = image_list;
        preload_list['Audio File Ignored'] = audio_list;
        image_list.forEach((file_data)=>{
            const chk_dir = file_data['Directory'];
            const img_dir = preload_list['Image'][chk_dir];
            if(Array.isArray(img_dir)){
                const index = img_dir.indexOf(file_data['File Name']);
                if(index >= 0){
                    img_dir.splice(index, 1);
                }
                preload_list['Image'][chk_dir] = img_dir;
            }else{
                delete preload_list['Image'][chk_dir];
            }
        })
        audio_list.forEach((file_data)=>{
            let chk_dir = file_data['Directory'];
            if(chk_dir[0] == "/"){
                chk_dir = chk_dir.substring(1);
            }
            const dir_index_slash = chk_dir.indexOf("/") + 1;
            if(dir_index_slash > 0){
                chk_dir = chk_dir.substring(dir_index_slash);
            }
            const aud_dir = preload_list['Audio'][chk_dir];
            if(Array.isArray(aud_dir)){
                const index = aud_dir.indexOf(file_data['File Name']);
                if(index >= 0){
                    aud_dir.splice(index, 1);
                }
                preload_list['Audio'][chk_dir] = aud_dir;
            }else{
                delete preload_list['Audio'][chk_dir];
            }
        })
    }
    this.setPreloadList(preload_list);
}

Game_Temp.prototype.generateImageList = function(){
    const list = [];
    const image_preload_list = this.imagePreloadList();
    const folder_keys = Object.keys(image_preload_list);
    for(const folder_name of folder_keys){
        const folder_list = image_preload_list[folder_name];
        for(let i = 0; i < folder_list.length; i++){
            const file_name = folder_list[i];
            const preload_obj = {folder: folder_name, file: file_name};
            list.push(preload_obj);
        }
    }
    this._image_preloads = list;
}

Game_Temp.prototype.generateAudioList = function(){
    const list = [];
    const audio_preload_list = this.audioPreloadList();
    const folder_keys = Object.keys(audio_preload_list);
    for(const folder_name of folder_keys){
        const folder_list = audio_preload_list[folder_name];
        for(let i = 0; i < folder_list.length; i++){
            const file_name = folder_list[i];
            const preload_obj = {folder: folder_name, file: file_name};
            list.push(preload_obj);
        }
    }
    this._audio_preloads = list;
}

Game_Temp.prototype.initializePreloader = function(){
    this._preloader_list = {};
    this._preloader_list['Image'] = {};
    this._preloader_list['Audio'] = {};
    this._preloader_list['Image File Ignored'] = [];
    this._preloader_list['Audio File Ignored'] = [];
    this._preloader_list['Image Folder Ignored'] = [];
    this._preloader_list['Audio Folder Ignored'] = [];
}

Syn_Preload_GmTemp_Init = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
    Syn_Preload_GmTemp_Init.call(this, ...arguments);
    this.executePreload();
}

Game_Temp.prototype.executePreload = function(){
    this.initializePreloader();
    this.loadPreloadList();
    const preloaded = SceneManager._complete_preload;
    if(preloaded)return;
    this._need_preload = true;
}

Game_Temp.prototype.updatePreloadList = function(){
    if(this.updatePreloadFonts())return;
    if(this.updateGenerateList())return;
    if(this.updateAudioPreload())return;
    if(this.updateImagePreload())return;
    if(this.updateConfirmPreload())return;
    this._preload_complete = true;
    delete this._need_preload;
}

Game_Temp.prototype.updatePreloadFonts = function(){
    if(this._preloadedFonts)return;
    const is_mz = Utils.RPGMAKER_NAME == "MZ";
    const font_data = Syn_Preload.PRELOAD_FONTS;
    if(is_mz){
        font_data.forEach((font_config)=>{
            const name = font_config['Font Name'];
            const url = font_config['Font URL']
            FontManager.load(name, url);
        })
    }else{
        font_data.forEach((font_config)=>{
            const name = font_config['Font Name'];
            const url = font_config['Font URL']
            Graphics.loadFont(name, url);
        })
    }
    this._preloadedFonts = true;
}

Game_Temp.prototype.updateGenerateList = function(){
    if(!this._preloadReady)return true;
    if(this._preloadListReady)return false;
    this.generateImageList();
    this.generateAudioList();
    this._current_preload = 0;
    this._preload_length = this._image_preloads.length + this._audio_preloads.length;
    this._preloadListReady = true;
    return false;
}

Game_Temp.prototype.updateImagePreload = function(){
    if(this.checkReservedImages())return true;
    const preload_data = this._image_preloads;
    for(let i = 0; i < 5; i++){
        const file_data = preload_data.shift();
        if(file_data){
            const folder = file_data.folder;
            const filename = file_data.file;
            const check_bitmap = PRELOADER_IMAGE_LOADER(folder, filename);
            const obj = {
                bitmap: check_bitmap,
                attempts: 0,
                folder:folder,
                file:filename
            }
            this.reserveLoadImage(obj);
        }
        this._current_preload++;
        if(this._current_preload >= preload_data.length)break;
    }
    return !(this._current_preload >= preload_data.length);
}

Game_Temp.prototype.checkReservedImages = function(obj){
    if(!Array.isArray(this._reserve_preload_images))this._reserve_preload_images = [];
    const rsvp_images = this._reserve_preload_images;
    if(rsvp_images.length <= 0)return false;
    rsvp_images.forEach((img_obj)=>{
        const bitmap = img_obj.bitmap;
        const attempts = img_obj.attempts;
        const folder = img_obj.folder;
        const file = img_obj.file;
        if(bitmap.isError() && attempts < 3){
            const is_mz = Utils.RPGMAKER_NAME == "MZ";
            if(is_mz){
                bitmap.retry();
            }else{
                bitmap.decode();
            }
            img_obj.attempts++;
        }else if(bitmap.isReady()){
            ImageManager.loadBitmap(folder, file);
            img_obj.delete = true;
        }else if(bitmap.isError() && attempts >= 3){
            const preload_list = $gameTemp.preloadList();
            const image_folder_list = preload_list['Image'];
            const image_folder = image_folder_list[folder];
            if(Array.isArray(image_folder)){
                const file_index = image_folder.indexOf(file);
                if(file_index >= 0){
                    image_folder.splice(file_index, 1);
                }
                if(image_folder.length <= 0){
                    delete image_folder_list[folder];
                    preload_list['Image'] = image_folder_list;
                }
                $gameTemp.setPreloadList(preload_list);
            }
            img_obj.delete = true;
        }
    })
    for(let i = 0; i < rsvp_images.length; i++){
        const img_obj = rsvp_images[i];
        if(img_obj){
            if(img_obj.delete){
                rsvp_images.splice(i, 1);
            }
        }else{
            rsvp_images.splice(i, 1);
            i--;
        }
    }
}

Game_Temp.prototype.reserveLoadImage = function(obj){
    if(!Array.isArray(this._reserve_preload_images))this._reserve_preload_images = [];
    this._reserve_preload_images.push(obj);
}

Game_Temp.prototype.updateAudioPreload = function(){
    if(this.checkReservedAudios())return true;
    const preload_data = this._audio_preloads;
    for(let i = 0; i < 5; i++){
        const file_data = preload_data.shift();
        if(file_data){
            const folder = file_data.folder;
            const filename = file_data.file;
            const check_audio = PRELOADER_AUDIO_LOADER(folder, filename);
            const obj = {
                audio: check_audio,
                attempts: 0,
                folder:folder,
                file:filename
            }
            this.reserveLoadAudio(obj);
        }
        this._current_preload++;
    }
    const index = this._current_preload - this._image_preloads.length;
    return !(index >= preload_data.length);
}

Game_Temp.prototype.checkReservedAudios = function(obj){
    if(!Array.isArray(this._reserve_preload_audios))this._reserve_preload_audios = [];
    const rsvp_audios = this._reserve_preload_audios;
    if(rsvp_audios.length <= 0)return false;
    rsvp_audios.forEach((aud_obj)=>{
        const audio = aud_obj.audio;
        const attempts = aud_obj.attempts;
        const folder = aud_obj.folder;
        const file = aud_obj.file;
        if(audio.isError() && attempts < 3){
            const is_mz = Utils.RPGMAKER_NAME == "MZ";
            if(is_mz){
                audio.retry();
                aud_obj.attempts++;
            }else{
                aud_obj.attempts = 3;
            }
        }else if(audio.isReady()){
            AudioManager.createBuffer(folder, file);
            aud_obj.delete = true;
        }else if(audio.isError() && attempts >= 3){
            const preload_list = $gameTemp.preloadList();
            const audio_folder_list = preload_list['Audio'];
            const audio_folder = audio_folder_list[folder];
            if(Array.isArray(audio_folder)){
                const file_index = audio_folder.indexOf(file);
                if(file_index >= 0){
                    audio_folder.splice(file_index, 1);
                }
                if(audio_folder.length <= 0){
                    delete audio_folder_list[folder];
                    preload_list['Audio'] = audio_folder_list;
                    $gameTemp.setPreloadList(preload_list);
                }
            }
            aud_obj.delete = true;
        }
    })
    for(let i = 0; i < rsvp_audios.length; i++){
        const aud_obj = rsvp_audios[i];
        if(aud_obj){
            if(aud_obj.delete){
                rsvp_audios.splice(i, 1);
            }
        }else{
            rsvp_audios.splice(i, 1);
            i--;
        }
    }
}

Game_Temp.prototype.reserveLoadAudio = function(obj){
    if(!Array.isArray(this._reserve_preload_audios))this._reserve_preload_audios = [];
    this._reserve_preload_audios.push(obj);
}

Game_Temp.prototype.updateConfirmPreload = function(){
    if(!this._confirm_preload){
        if(
            Input.isTriggered('ok') ||
            Input.isTriggered('cancel') ||
            TouchInput.isTriggered() ||
            TouchInput.isCancelled() ||
            Syn_Preload.BYPASS_LOAD_CONFIRM
        ){
            this._confirm_preload = true;
            return false;
        }
    }
    return true;
}