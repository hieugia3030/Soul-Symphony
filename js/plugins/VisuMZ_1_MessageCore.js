//=============================================================================
// VisuStella MZ - Message Core
// VisuMZ_1_MessageCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_MessageCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MessageCore = VisuMZ.MessageCore || {};
VisuMZ.MessageCore.version = 1.49;

//=============================================================================
/*:
* @target MZ
* @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.49] [MessageCore]
* @author VisuStella
* @url http://www.yanfly.moe/wiki/Message_Core_VisuStella_MZ
* @orderAfter VisuMZ_0_CoreEngine
*
* @help
* ============================================================================
* Introduction
* ============================================================================
*
* The Message Core plugin extends and builds upon the message functionality of
* RPG Maker MZ and allows you, the game dev, to customize the workflow for
* your game's message system.
*
* Features include all (but not limited to) the following:
*
* * Control over general message settings.
* * Auto-Color key words and/or database entries.
* * Increases the text codes available to perform newer functions/effects.
* * Ability for you to implement custom Text Code actions.
* * Ability for you to implement custom Text code string replacements.
* * Invoke a macro system to speed up the dev process.
* * Add a Text Speed option to the Options menu.
* * Add the ever so useful Word Wrap to your message system.
* * Extend the choice selection process to your liking.
* * The ability to enable/disable as well as show/hide certain choices.
*
* ============================================================================
* Requirements
* ============================================================================
*
* This plugin is made for RPG Maker MZ. This will not work in other iterations
* of RPG Maker.
*
* ------ Tier 1 ------
*
* This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
* value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
* that your plugins will have the best compatibility with the rest of the
* VisuStella MZ library.
*
* ============================================================================
* Major Changes
* ============================================================================
*
* This plugin adds some new hard-coded features to RPG Maker MZ's functions.
* The following is a list of them.
*
* ---
* 
* Dim Background Extension
* 
* Before, when using the Dim Background as a part of a Show Text event, its
* size is only the same as the message window's width itself. This looked
* really ugly because it had hard edges cutting off while gradients are seen
* elsewhere. To make it look better, we extended the dimmed background to span
* the width of the screen instead.
* 
* ---
* 
* Extended Messages
* 
* If you decide to expand the size of the message window to allow for more
* rows to be displayed, you can type in the data for them by chaining together
* Show Message events. They will take data from each other and display them in
* the same message window as long as there are enough rows.
* 
* ---
*
* Extended Choice Lists
* 
* Choice lists can be extended by just chaining one Choice List event after
* the other in succession along the same indentation. They do not extend if
* there is any event other than a Choice List option between them on the same
* indentation level.
*
* ---
*
* ============================================================================
* Text Language Information
* ============================================================================
*
* As of Message Core version 1.46, Text Language has been added. 
* 
* The "Text Language" feature allows your players to switch between different
* languages for your game to allow people from around the globe to enjoy what
* story you have to tell.
* 
* Disclaimers: This is not an automatic translation tool. Translations made
* through the "Text Language" feature of the VisuStella MZ Message Core
* will require manual input by the game developer.
*
* ---
* 
* === How to Enable Switching ===
* 
* Text Language is NOT enabled by default. Here's what you have to do:
* 
* #1. Open up the Message Core's Plugin Parameters
* #2. Plugin Parameters > Text Language Settings > Enable Switching?
* #3. Change the "Enable Switching?" parameter setting to "true".
* #4. Adjust any other settings as needed.
* #5. Save the Plugin Parameter changes.
* #6. Save your game.
* 
* Now, it's time to get the CSV file that will contain all of the text used to
* translate your game's script.
* 
* #1. Play test your game. Make sure Play test mode is NOT disabled.
* #2. A popup will appear asking to create a language CSV file.
* #3. Click "OK" and let the plugin do its thing.
* #4. The project's /data/ folder will appear with Language.csv made.
* #5. The plugin will then ask you to restart your game.
* 
* ---
* 
* === How to Edit the Language CSV ===
* 
* The Language CSV is structured as a normal CSV file would be, which also
* means it can be modified in programs like Microsoft Excel or Google Sheets.
* We recommend using either of those programs to modify the text.
* 
* We do not recommend modifying the CSV file in programs like notepad directly
* due to the way certain things like commas (,) are handled and how easy it is
* to be error-prone.
* 
* The table will appear something like this at first:
* 
*     Key        English    Chinese    Japanese     Korean
*     Greeting   Hello      你好       こんにちは    안녕하세요
*     Farewell   Good-bye   再见       さようなら    안녕히
*     Wow        Wow        哇         ワオ          와우
* 
* The "Key" column refers to the reference key used to determine which lines
* will be inserted into the text. The columns with the languages will utilize
* the respective phrases for that language.
* 
* You can remove columns containing languages that you aren't planning to
* translate for your game.
* 
* ---
* 
* === Things to Keep in Mind ===
* 
* When adding text to the CSV file via the spreadsheet editor (Excel or Google
* Sheets), there's a few things to keep in mind.
* 
* ---
* 
* ==== Line Breaks ====
* 
* When you want to insert line breaks into the translated phrases, use the
* <br> text code. This is best used for text that is to be transferred into
* the message window or help window.
* 
* ==== Text Codes ====
* 
* Text codes like \C[2] can be inserted normally. However, they only work in
* windows that support text codes, such as the message window or help window.
* Otherwise, the text codes will not transfer over properly.
* 
* ==== Semicolons ====
* 
* Due to the nature of the CSV file, we used the semicolon (;) as the
* separator. As such, semicolons should not be used in the text entries.
* Though some sentences will work with the semicolon, not all of them will. If
* you do want to use a semicolon, use the text code <semicolon> instead.
* 
*   Example:
* 
*   "The pancakes were delicious<semicolon> they were fluffy and sweet."
* 
* Other variations of the semicolon text code are <semi> and <semi-colon>.
* The <semicolon> text code and variants only work with the Language CSV and
* are ignored otherwise when typed in a regular message box entry.
* 
* ---
* 
* ==== Macros and Language Switches ====
* 
* For those using both text macros and text language switches, macros will be
* converted to text before language switches as it allows for better text
* transitions that way.
* 
* ---
* 
* === How to Use the Reference Keys ===
* 
* Remember the "Key" column and the reference keys? Those are used to
* determine which lines will be inserted into the text for the message window
* and just about any other window. However, there's a specific way these keys
* must be used in order for them to work.
* 
* The "text code" format works like this. Use any of the following:
* 
*   \tl{keyName}
*   \translate{keyName}
*   \loc{keyName}
*   \locale{keyName}
*   \localize{keyName}
* 
* or for those coming from different translation plugins but want to switch
* over to the VisuStella MZ Message Core's translation system:
* 
*   ${keyName}
* 
* For example, to use one of the default keys made with the Language CSV:
* 
*   \tl{Greeting}
* 
* This will yield "Hello" in English, "你好" in Chinese, "こんにちは" in
* Japanese, and "안녕하세요" in Korean.
* 
* Key names are not case sensitive and any trailing spaces will be removed
* from them in order to make sure the CSV table is stable to reference any
* translated text from.
* 
* You can insert these language "text codes" into item names, skill names,
* etc. as well as system entries like for Attack, Defense, etc.
* 
* ---
*
* ============================================================================
* Available Text Codes
* ============================================================================
*
* The following are text codes that you may use with this plugin. Some of
* these are original text codes provided by RPG Maker MZ, while others are
* new text codes added through this plugin. You may even add your own text
* codes through the plugin parameters.
*
* === RPG Maker MZ Text Codes ===
*
* The following are text codes that come with RPG Maker MZ. These text codes
* cannot be edited through the Plugin Parameters.
*
* ---
*
* ------------------   -------------------------------------------------------
* Text Code            Effect (Global)
* ------------------   -------------------------------------------------------
* \V[x]                Replaced by the value of variable 'x'.
* \N[x]                Replaced by the name of actor 'x'.
* \P[x]                Replaced by the name of party member 'x'.
* \C[x]                Draw the subsequent text with window skin color 'x'.
* \I[x]                Draw icon 'x'.
*
* \PX[x]               Moves text x position to 'x'.
* \PY[x]               Moves text y position to 'y'.
*
* \G                   Replaced by the currency unit.
*
* \{                   Increase the text font size by one step.
* \}                   Decrease the text font size by one step.
* \FS[x]               Changes the text font size to 'x'.
*
* \\                   Replaced by the backslash character.
*
* ---
*
* ------------------   -------------------------------------------------------
* Text Code            Effect (Message Window Only)
* ------------------   -------------------------------------------------------
* \$                   Opens the gold window.
* \.                   Waits a 1/4 second.
* \|                   Waits a full second.
* \!                   Waits for button input.
* \>                   Display remaining text on same line all at once.
* \<                   Cancel the effect that displays text all at once.
* \^                   Do not wait for input after displaying text to move on.
*
* ---
*
* === Message Core Hard-Coded Text Codes ===
*
* The following text codes are hard-coded into VisuStella MZ Message Core's
* code. These text codes cannot be edited through the Plugin Parameters.
* 
* ---
*
* ------------------   -------------------------------------------------------
* Text Code            Effect (Global)
* ------------------   -------------------------------------------------------
* <b>                  Makes subsequent text bold.
* </b>                 Removes bold from subsequent text.
* <i>                  Makes subsequent text italic.
* </i>                 Removes italic from subsequent text.
* 
* <left>               Makes subsequent text left-aligned. *Note1*
* </left>              Removes left-alignment for subsequent text.
* <center>             Makes subsequent text center-aligned. *Note1*
* </center>            Removes center-alignment for subsequent text.
* <right>              Makes subsequent text right-aligned. *Note1*
* </right>             Removes right-alignment for subsequent text.
*
* Note1: Use at line-start. Does not work with Word Wrap.
*
* <ColorLock>          Text codes can't change text color for subsequent text.
* </ColorLock>         Removes Color Lock property.
*
* <WordWrap>           Enables Word Wrap for this window. *Note2*
* </WordWrap>          Disables Word Wrap for this window. *Note2*
* <br>                 Adds a line break. Requires Word Wrap enabled.
* <line break>         Adds a line break. Requires Word Wrap enabled.
*
* Note2: Some windows cannot use Word Wrap such as the Choice Window.
* Word Wrap also cannot be used together with <left>, <center>, or <right> and
* will disable itself if text alignment text codes are detected.
*
* \picture<x>          Draws picture x (filename) at current text position.
* \CenterPicture<x>    Draws picture x (filename) centered at the window.
*
* ---
*
* ------------------   -------------------------------------------------------
* Text Code            Effect (Message Window Only)
* ------------------   -------------------------------------------------------
* \CommonEvent[x]      Runs common event x when text code is reached.
* \Wait[x]             Makes the message wait x frames before continuing.
* 
* <Next Page>          Ends the current message page at this line. This is
*                      used for messages when rows are at 5 or above and the
*                      message lines don't match the amount. This is used to
*                      prevent grabbing message windows from following message
*                      events. Any lines following <Next Page> in the same
*                      message event will be ignored.
* 
* <Auto>               Resizes message window dimensions to fit text. *Note3*
* <Auto Width>         Resizes message window width to fit text. *Note3*
* <Auto Height>        Resizes message window height to fit text. *Note3*
* 
* <Auto Actor: x>      Resizes message window and positions it over actor x
*                      sprite's head. *Note3*
* <Auto Party: x>      Resizes message window and positions it over party
*                      member x sprite's head. *Note3*
* <Auto Player>        Map-Only. Resizes message window and positions it over
*                      the player sprite's head. *Note3*
* <Auto Event: x>      Map-Only. Resizes message window and positions it over
*                      event x sprite's head. *Note3*
* <Auto Enemy: x>      Battle-Only. Resizes message window and positions it
*                      over enemy x sprite's head. *Note3*
*
* Note3: Upon using these text codes, the message window's settings will be
* reset for the upcoming message. These effects do not work with Word Wrap.
*
* ---
*
* ----------------------------   ---------------------------------------------
* Text Code                      Effect (Battle Only)
* ----------------------------   ---------------------------------------------
* <Current Battle Target>        Replaces text code with the current target of
*                                an action in battle.
* <Current Battle User>          Replaces text code with the currently active
*                                user in battle.
* <Current Battle Action>        Replaces text code with the current battle
*                                action's name with an icon in front.
* <Current Battle Action Name>   Replaces text code with the current battle
*                                action's name without an icon.
* 
* If there is no battle, no target, no user, or no action, then the text code
* will just be replaced with no text.
* 
* These text codes are NOT recommended to be used inside of Help Descriptions.
* They are best used with "Show Text" event commands.
*
* ---
*
* -----------------------------  ---------------------------------------------
* Text Code                      Effect (Choice Window Only)
* -----------------------------  ---------------------------------------------
* <Show>                         Choice is always shown.
* <Show Switch: x>               Choice shown if switch x is ON.
* <Show Switches: x,x,x>         Choice shown if the x switches are all ON.
* <Show All Switches: x,x,x>     Choice shown if the x switches are all ON.
* <Show Any Switches: x,x,x>     Choice shown if any of x switches are ON.
*
* <Hide>                         Choice is always hidden.
* <Hide Switch: x>               Choice hidden if switch x is ON.
* <Hide Switches: x,x,x>         Choice hidden if the x switches are all ON.
* <Hide All Switches: x,x,x>     Choice hidden if the x switches are all ON.
* <Hide Any Switches: x,x,x>     Choice hidden if any of x switches are ON.
*
* <Enable>                       Choice is always enabled.
* <Enable Switch: x>             Choice enabled if switch x is ON.
* <Enable Switches: x,x,x>       Choice enabled if the x switches are all ON.
* <Enable All Switches: x,x,x>   Choice enabled if the x switches are all ON.
* <Enable Any Switches: x,x,x>   Choice enabled if any of x switches are ON.
*
* <Disable>                      Choice is always disabled.
* <Disable Switch: x>            Choice disabled if switch x is ON.
* <Disable Switches: x,x,x>      Choice disabled if the x switches are all ON.
* <Disable All Switches: x,x,x>  Choice disabled if the x switches are all ON.
* <Disable Any Switches: x,x,x>  Choice disabled if any of x switches are ON.
* 
* <Choice Width: x>              Sets the minimum text area width to x.
*                                Applies to whole choice window.
* <Choice Indent: x>             Sets the indent to x value. Applies to
*                                current choice selection only.
* 
* <BgColor: x>                   Requires VisuMZ_0_CoreEngine! Sets background
*                                color of this choice to 'x' text color. This
*                                will be combined with a fading
* <BgColor: x,y>                 Requires VisuMZ_0_CoreEngine! Sets background
*                                color of this choice to 'x' to 'y' gradient
*                                text color.
* <BgColor: #rrggbb>             Requires VisuMZ_0_CoreEngine! Sets background
*                                color of this choice to '#rrggbb' color using
*                                hex color values.
* <BgColor: #rrggbb, #rrggbb>    Requires VisuMZ_0_CoreEngine! Sets background
*                                color of this choice to '#rrggbb' gradient
*                                using hex color values.
* 
* <Help> text </Help>            Makes a help window appear and have it show
*                                'text' in its contents. The help window will
*                                disappear if no text is displayed.
* 
* <Shuffle>                      Shuffles the order of all choices. Any cancel
*                                shortcuts other than "Branch" will be undone.
* <Shuffle: x>                   Shuffles the order of all choices and only
*                                x number of them will appear. Any cancel
*                                shortcuts other than "Branch" will be undone.
*                                Hidden choices do not count towards x number.
*
* ---
*
* -----------------------------  ---------------------------------------------
* Text Code                      Background Effects (Choice Window Only)
* -----------------------------  ---------------------------------------------
* 
* <BgImg: filename>              Creates a background image from img/pictures/
*                                stretched across the choice rectangle.
* <BgImg LowerLeft: filename>    Creates a background image from img/pictures/
*                                scaled to the lower left of choice rect.
* <BgImg LowerCenter: filename>  Creates a background image from img/pictures/
*                                scaled to the lower center of choice rect.
* <BgImg LowerRight: filename>   Creates a background image from img/pictures/
*                                scaled to the lower right of choice rect.
* <BgImg MidLeft: filename>      Creates a background image from img/pictures/
*                                scaled to the middle left of choice rect.
* <BgImg Center: filename>       Creates a background image from img/pictures/
*                                scaled to the center of choice rect.
* <BgImg MidRight: filename>     Creates a background image from img/pictures/
*                                scaled to the middle right of choice rect.
* <BgImg UpperLeft: filename>    Creates a background image from img/pictures/
*                                scaled to the upper left of choice rect.
* <BgImg UpperCenter: filename>  Creates a background image from img/pictures/
*                                scaled to the upper center of choice rect.
* <BgImg UpperRight: filename>   Creates a background image from img/pictures/
*                                scaled to the upper right of choice rect.
* 
* *Note:* For the <BgImg: filename> text code variants, even if the background
* image is smaller than the choice contents, it will overscale to match its
* choice rectangle dimensions.
* 
* *Note:* Using a background image will clear the dimmed background rectangle
* that is normally behind each selectable choice.
* 
* *Note:* Each choice can only have one background image but can use a
* combination of one background and one foreground image.
* 
* *Note:* Images in the background will appear behind the select cursor.
*
* ---
*
* -----------------------------  ---------------------------------------------
* Text Code                      Foreground Effects (Choice Window Only)
* -----------------------------  ---------------------------------------------
* 
* <FgImg: filename>              Creates a foreground image from img/pictures/
*                                stretched across the choice rectangle.
* <FgImg LowerLeft: filename>    Creates a foreground image from img/pictures/
*                                scaled to the lower left of choice rect.
* <FgImg LowerCenter: filename>  Creates a foreground image from img/pictures/
*                                scaled to the lower center of choice rect.
* <FgImg LowerRight: filename>   Creates a foreground image from img/pictures/
*                                scaled to the lower right of choice rect.
* <FgImg MidLeft: filename>      Creates a foreground image from img/pictures/
*                                scaled to the middle left of choice rect.
* <FgImg Center: filename>       Creates a foreground image from img/pictures/
*                                scaled to the center of choice rect.
* <FgImg MidRight: filename>     Creates a foreground image from img/pictures/
*                                scaled to the middle right of choice rect.
* <FgImg UpperLeft: filename>    Creates a foreground image from img/pictures/
*                                scaled to the upper left of choice rect.
* <FgImg UpperCenter: filename>  Creates a foreground image from img/pictures/
*                                scaled to the upper center of choice rect.
* <FgImg UpperRight: filename>   Creates a foreground image from img/pictures/
*                                scaled to the upper right of choice rect.
* 
* *Note:* For the <FgImg: filename> text code variants, unlike the background
* variant, the foreground image will not overscale past its original size.
* Instead, it will maintain its original size or be smaller, so long as it can
* be scaled to exist within the choice rectangle unless it is intended to be
* stretched by using the <FgImg: filename> variant.
* 
* *Note:* Text is then written on top of the foreground image.
* 
* *Note:* Each choice can only have one foreground image but can use a
* combination of one background and one foreground image.
* 
* *Note:* Images in the foreground will appear behind the select cursor.
*
* ---
*
* -----------------  ---------------------------------------------------------
* Text Code          Effect (Name Window Only)
* -----------------  ---------------------------------------------------------
* <Left>             Positions the name box window to the left.
* <Center>           Positions the name box window to the center.
* <Right>            Positions the name box window to the right.
* <Position: x>      Replace 'x' with a number from 0 to 10. This positions
*                    the name box window on the screen relative to the
*                    position of the value 'x' represents.
* \NormalBG          Changes background type of window to normal type.
* \DimBG             Changes background type of window to dim type.
* \TransparentBG     Changes background type of window to transparent type.
*
* ---
* 
* -------------------------------   ------------------------------------------
* Text Code                         Effect (Message Window Only)
* -------------------------------   ------------------------------------------
* 
* <Position: x, y, width, height>   Forces the message window to exact listed
*                                   coordinates and dimensions. Replace each
*                                   of the arguments with numbers. *Note*
* 
* <Coordinates: x, y>               Forces the message window to the exact
*                                   listed coordinates. Replace each of the
*                                   arguments with numbers. *Note*
* 
* <Dimensions: width, height>       Forces the message window size to the
*                                   exact listed dimensions. Replace each of
*                                   the arguments with numbers. *Note*
* 
* <Offset: +x, +y>                  Quickly adjust the message window offset
* <Offset: -x, -y>                  values to the x and y amounts. The values
* <Offset: +x, -y>                  will replace the previous offset settings
* <Offset: -x, +y>                  if there were any.
* 
* *NOTE* These text codes do not work with Word Wrap.
* 
* ---
* 
* ------------------   -------------------------------------------------------
* Text Code            Effect (Requires VisuMZ_0_CoreEngine)
* ------------------   -------------------------------------------------------
* <Up Button>          Display's VisuMZ_0_CoreEngine's button assist text.
* <Left Button>        Display's VisuMZ_0_CoreEngine's button assist text.
* <Right Button>       Display's VisuMZ_0_CoreEngine's button assist text.
* <Down Button>        Display's VisuMZ_0_CoreEngine's button assist text.
* 
* <Ok Button>          Display's VisuMZ_0_CoreEngine's button assist text.
* <Cancel Button>      Display's VisuMZ_0_CoreEngine's button assist text.
* <Shift Button>       Display's VisuMZ_0_CoreEngine's button assist text.
* <Menu Button>        Display's VisuMZ_0_CoreEngine's button assist text.
* <Page Up Button>     Display's VisuMZ_0_CoreEngine's button assist text.
* <Page Down Button>   Display's VisuMZ_0_CoreEngine's button assist text.
* 
* ---
* 
* === Random Text Pool ===
* 
* <RNG> text1 | text2 | text3 </RNG>
* 
* Using the above text code format in a Show Message entry, you can get a
* random result out of the various inserted texts. Use "|" (without quotes) as
* a separator between text entries. You can have unlimited entries. The result
* will have any excess white space trimmed.
* 
* This text code cannot be inserted into a macro and parsed properly.
* 
* ---
*
* === Message Core Customizable Text Codes ===
*
* The following text codes can be altered through the Message Core's various
* Plugin Parameters to adjust replacements and actions.
*
* ---
*
* ------------------   -------------------------------------------------------
* Text Code            Effect (Global)
* ------------------   -------------------------------------------------------
* \Class[x]            Draws class x's icon (if have) and name.
* \ClassName[x]        Draws class x's name only.
*
* \Skill[x]            Draws skill x's icon (if have) and name.
* \SkillName[x]        Draws skill x's name only.
*
* \Item[x]             Draws item x's icon (if have) and name.
* \ItemName[x]         Draws item x's name only.
* \ItemQuantity[x]     Inserts the number of item x's owned by the party.
*
* \Weapon[x]           Draws weapon x's icon (if have) and name.
* \WeaponName[x]       Draws weapon x's name only.
* \WeaponQuantity[x]   Inserts the number of weapon x's owned by the party.
*
* \Armor[x]            Draws armor x's icon (if have) and name.
* \ArmorName[x]        Draws armor x's name only.
* \ArmorQuantity[x]    Inserts the number of armor x's owned by the party.
*
* \LastGainObj         Draws the icon + name of the last party-gained object.
* \LastGainObjName     Draws the name of the last party-gained object.
* \LastGainObjQuantity Inserts the quantity of the last party-gained object.
*
* \State[x]            Draws state x's icon (if have) and name.
* \StateName[x]        Draws state x's name only.
*
* \Enemy[x]            Draws enemy x's icon (if have) and name.
* \EnemyName[x]        Draws enemy x's name only.
*
* \Troop[x]            Draws troop x's icon (if have) and name.
* \TroopName[x]        Draws troop x's name only.
*
* \TroopMember[x]      Draws troop member x's icon (if have) and name. *Note1*
* \TroopNameMember[x]  Draws troop member x's name only. *Note1*
* 
* Note1: Only works in battle.
*
* \NormalBG            Changes background type of window to normal type.
* \DimBG               Changes background type of window to dim type.
* \TransparentBG       Changes background type of window to transparent type.
*
* \FontChange<x>       Changes font face to x font name.
* \ResetFont           Resets font settings.
*
* \ResetColor          Resets color settings.
* \HexColor<x>         Changes text color to x hex color (ie. #123abc).
* \OutlineColor[x]     Changes outline color to text color x.
* \OutlineHexColor<x>  Changes outline color to x hex color (ie. #123abc).
* \OutlineWidth[x]     Changes outline width to x thickness.
* 
* \WindowMoveTo<?>     Moves window to exact coordinates. *Note2*
* \WindowMoveBy<?>     Moves window by relative values. *Note2*
* \WindowReset         Resets window position to original position.
*
* Note2: Replace '?' with the following format:
*   targetX, targetY, targetWidth, targetHeight, duration, easingType
*   Only targetX and targetY are required arguments. These will only alter the
*   window dimensions when the text has arrived at that point. They will not
*   alter the window preemptively. This is not used as a window positioner.
*   Use the <Position: x, y, width, height> text code for that.
*
* ---
*
* ------------------   -------------------------------------------------------
* Text Code            Effect (Message Window Only)
* ------------------   -------------------------------------------------------
* \ActorFace[x]        Inserts actor x's face into the Message Window.
* \PartyFace[x]        Inserts party member x's face into the Message Window.
* \ChangeFace<x,y>     Changes message face to x filename, y index.
* \FaceIndex[x]        Changes message face index to x.
*
* \TextDelay[x]        Sets delay in frames between characters to x frames.
* 
* Note: These text codes only work with the Message Window. Keep in mind that
*   even if some windows might look like the Message Window, it may not
*   necessarily be one.
* 
* ---
* 
* As these text codes can be added, removed, and/or altered, their functions
* may or may not be the same depending on how you've altered them. VisuStella
* is not responsible for any errors caused by changes made to pre-made text
* codes nor any new text codes they did not make.
* 
* ============================================================================
* Plugin Commands
* ============================================================================
*
* The following are Plugin Commands that come with this plugin. They can be
* accessed through the Plugin Command event command.
*
* ---
* 
* === Message Plugin Commands ===
* 
* ---
*
* Message: Properties
*   Change the various properties of the Message Window.
*
*   Rows:
*   - Change the number of Message Window rows.
*   - Leave at 0 to keep it unchanged.
*
*   Width: 
*   - Change the Message Window width in pixels.
*   - Leave at 0 to keep it unchanged.
*
*   Word Wrap:
*   - Enable or disable Word Wrap for the Message Window?
*
* ---
* 
* Message: X/Y Offsets
* - Change the X and Y Offsets of the Message Window.
* - The offset value(s) will be saved and stored.
* 
*   Offset X:
*   - Offset Message Window horizontally.
*   - Negative: Left; Positive: Right
*   - Message Window coordinates are still restricted via clamping.
* 
*   Offset Y:
*   - Offset Message Window vertically.
*   - Negative: Up; Positive: Down
*   - Message Window coordinates are still restricted via clamping.
* 
* ---
* 
* === Choice Plugin Commands ===
* 
* ---
* 
* Choices: Distance
* - Change the distance from choice window to the message window.
* 
*   Distance:
*   - Change distance between the choice and message windows.
*   - Default distance is 0.
*   - Use negative to center align with remaining space.
* 
* ---
*
* Choices: Properties
* - Change the properties found in the Show Choices event command.
*
*   Line Height:
*   - Change the line height for the show choices.
*   - Leave at 0 to keep this unchanged.
* 
*   Minimum Choice Width:
*   - What is the minimum width size for each choice?
*   - 96 is the default width.
*
*   Max Rows:
*   - Maximum number of choice rows to be displayed.
*   - Leave at 0 to keep this unchanged.
*
*   Max Columns:
*   - Maximum number of choice columns to be displayed.
*   - Leave at 0 to keep this unchanged.
*
*   Text Alignment:
*   - Text alignment for Show Choice window.
*
* ---
* 
* === Select Plugin Commands ===
* 
* ---
* 
* Select: Weapon
* - Opens the Event Select Item Window to let the player pick a weapon to
*   choose from.
* - Can be opened while the Message Window is open.
* 
*   Variable ID:
*   - This variable will be used to record the ID of the selected weapon.
*   - It will result in 0 otherwise.
* 
*   Weapon Type ID:
*   - Reduce all the weapons to a specific weapon type.
*   - Leave at 0 to not use filters.
* 
* ---
* 
* Select: Armor
* - Opens the Event Select Item Window to let the player pick an armor to
*   choose from.
* - Can be opened while the Message Window is open.
* 
*   Variable ID:
*   - This variable will be used to record the ID of the selected armor.
*   - It will result in 0 otherwise.
* 
*   Armor Type ID:
*   - Reduce all the armors to a specific armor type.
*   - Leave at 0 to not use filters.
* 
*   Equip Type ID:
*   - Reduce all the armors to a specific equip type.
*   - Leave at 0 to not use filters.
* 
* ---
* 
* Select: Skill
* - Opens the Event Select Item Window to let the player pick a skill to
*   choose from.
* - Requires VisuMZ_1_SkillsStatesCore!
* - Can be opened while the Message Window is open.
* - Skills will not be listed if they are hidden by the actor.
* - Skills will not be listed if the actor lacks access to their Skill Type.
* 
*   Variable ID:
*   - This variable will be used to record the ID of the selected skill.
*   - It will result in 0 otherwise.
* 
*   Actor ID:
*   - Select an actor to get the skill list from.
*   - Use 0 to select from the party leader.
* 
*   Skill Type ID:
*   - Reduce all the skills to a specific skill type.
*   - Leave at 0 to not use filters.
* 
* ---
* 
* === Picture Plugin Commands ===
* 
* ---
* 
* Picture: Change Text
* - Change text for target picture(s) to show.
* - You may use text codes.
* - Text will adapt to picture's properties.
* - Settings will be erased if picture is erased.
* 
*   Picture ID(s):
*   - The ID(s) of the picture(s) to set text to.
* 
*   Padding:
*   - How much padding from the sides should there be?
* 
*   Text:
* 
*     Upper Left:
*     Upper Center:
*     Upper Right:
*     Middle Left:
*     Middle Center:
*     Middle Right:
*     Lower Left:
*     Lower Center:
*     Lower Right:
*     - The text that's aligned to this picture's side.
*     - You may use text codes.
* 
* ---
* 
* Picture: Erase Text
* - Erase all text for target picture(s).
* 
*   Picture ID(s):
*   - The ID(s) of the picture(s) to erase text for.
* 
* ---
* 
* Picture: Refresh Text
* - Refreshes the text used for all on-screen pictures.
* - To be used if any dynamic text codes are updated like \n[x].
* 
* ---
*
* ============================================================================
* Plugin Parameters: General Settings
* ============================================================================
*
* General settings involving the message system. These settings range from
* adjust how the Message Window looks to more intricate settings like how
* some of the default text codes work.
*
* ---
*
* Message Window
*
*   Default Rows:
*   - Default number of rows to display for the Message Window.
*
*   Default Width:
*   - Default Message Window width in pixels.
*
*   Fast Forward Key:
*   - This is the key used for fast forwarding messages.
*   - WARNING: If this key is the same as the dash button, this will clear out
*     any held down inputs upon triggering an event  to prevent players from
*     skipping potentially useful information stored in messages. If you do
*     not want the input to be cleared, use a different key.
*
*   Text Delay:
*   - How many frames to wait between characters drawn?
*   - Use 0 for instant.
* 
*   Offset X:
*   Offset Y:
*   - Offset Message Window horizontally or vertically.
*   - Horizontal: Left; Positive: Right
*   - Veritcal: Negative: Up; Positive: Down
* 
*   Stretch Dimmed BG:
*   - Stretch dimmed window background to fit the whole screen.
* 
*   Default Outline Width:
*   - Changes the default outline width to this many pixels thick.
* 
*   Each Message Start:
*   Each Message End:
*   - This is text that is added at the start/end of each message.
*   - You may use text codes.
*   - Keep in mind that if a message extends to a different page (due to word
*     wrap, excess lines, etc), that does not mean the starting text will
*     be added to where the next page begins or the ending text will be added
*     where the previous page ends.
*   - Can be used for things like adding "<center>" to the start of each 
*     message without having to type it every time.
*
* ---
*
* Name Box Window
*
*   Default Color:
*   - Default color for the Name Box Window's text.
*
*   Offset X:
*   - How much to offset the name box window X by
*     (as long as it doesn't go offscreen).
*
*   Offset Y:
*   - How much to offset the name box window Y by
*     (as long as it doesn't go offscreen).
*
* ---
*
* Choice List Window
*
*   Line Height:
*   - What is the default line height for Show Choices?
* 
*   Minimum Choice Width:
*   - What is the minimum choice width for each choice?
*   - 96 is the default width.
*
*   Max Rows:
*   - Maximum number of rows to visibly display?
*
*   Max Columns:
*   - Maximum number of columns to visibly display?
*
*   Text Alignment:
*   - Default alignment for Show Choice window.
*
* ---
*
* Default Text Codes
*
*   Relative \PX \PY:
*   - Make \PX[x] and \PY[x] adjust relative starting position than
*     exact coordinates.
*
*   \{ Maximum:
*   - Determine the maximum size that \{ can reach.
*
*   \} Minimum:
*   - Determine the minimum size that \} can reach.
*
*   \{ Change \}
*   - How much does \{ and \} change font size by?
*
* ---
*
* ============================================================================
* Plugin Parameters: Auto-Color Settings
* ============================================================================
*
* For certain windows such as the Message Window, Help Window, and Choice
* Window, Auto-Color is enabled to automatically highlight and color certain
* database entries, keywords, and just about anything you, the game dev, wants
* to be automatically colored. This is done to avoid typing out \C[6]Jack\C[0]
* every time Jack's name is written out as it will be automatically colored in
* those specific windows.
*
* The Plugin Parameters will give you full reign over which database entries
* and keywords you want to be automatically colored as long as they follow a
* few rules:
* 
* -----------------
* Auto-Color Rules:
* -----------------
*
* 1. Database names and keywords are case sensitive.
*    This means if "Potion" is a marked keyword, typing out "potion" will not
*    prompt the auto-color to highlight "potion". You must add the lowercase
*    version of the word into the keyword list if you want it to count.
*
* 2. Database names and keywords are exact size (for Roman languages)
*    This means if "Potion" is a marked keyword, typing out "potions" will not
*    prompt the auto-color to highlight "potions". You must type out all of
*    the variations of the words you want affected into the keyword list to
*    prompt the auto-color highlight.
* 
*    This does not apply to Japanese, Korean, or Chinese languages.
*
* 3. Possessive cases and other language symbols aren't counted.
*    Symbols such as periods, commas, quotes, parentheses, and similar symbols
*    do no count towards Rule 2. This means if "Potion" is a marked keyword,
*    the typing out "(Potion)" will still highlight the "Potion" part of the
*    word according to the auto-color.
* 
* 4. Names with special characters like !, ?, [, ], etc. will be ignored.
*    These cause conflicts with how auto-colors are detected.
*
* ---
*
* Database Highlighting
*
*   Actors:
*   Classes:
*   Skills:
*   Items:
*   Weapons:
*   Armors:
*   Enemies:
*   States:
*   - Any usage of a the selected database entry's name is auto-colored with
*     the text code number.
*   - Use 0 to not auto-color.
*
* ---
*
* Word Highlighting
*
*   \C[x]: Color
*   - These are lists of all the words that will be automatically colored with
*     the x text color.
*
* ---
*
* ============================================================================
* Plugin Parameters: Custom Font Manager
* ============================================================================
*
* Custom fonts that aren't the message or number fonts cannot be used without
* registration. If you try to use custom fonts in RPG Maker MZ without
* registering their font family first, you will find out that they will not
* work. These plugin parameters allow you to register your game's custom fonts
* here.
* 
* ---
* 
* Settings:
* 
*   Font Family:
*   - This will be what's used by RPG Maker MZ and plugins to reference this
*     specific font.
*   - NO filename extensions!
* 
*   Filename:
*   - What is the filename of the custom font you would like to use?
*   - Located inside the project's "fonts" folder.
* 
* ---
* 
* Examples:
* 
*   Font Family: WildWords
*   Filename: WildWords-Regular.ttf
* 
* How you would use this in other plugins as a preface to the font face or
* font family would be to use "WildWords" as the font face/family name. Then
* RPG Maker MZ will use its own innate FontManager to refer that to the
* "WildWords-Regular.ttf" file found in the game's "fonts" folder.
* 
* ---
*
* ============================================================================
* Plugin Parameters: Text Code Actions
* ============================================================================
*
* Text codes are used for one of two things: performing actions or replacing
* themselves with text data. This Plugin Parameter will focus on the aspect of
* performing actions. These actions can be done through each JavaScript or by
* a common event (if it is used in the Message Window). Adequate knowledge of
* both is recommended before attempting to modify and/or add new Text Code
* Actions to the Plugin Parameters.
*
* Each of the Text Code Actions are formatted in such a way:
*
* ---
*
* Text Code Action
*
*   Match:
*   - This is what needs to be matched in order for this text code to work.
*   - This is the primary text marker after the \ in a text code.
*   - In \N[x], this would be the 'N'.
*
*   Type:
*   - The type of parameter to obtain (none, number, or string).
*   - This is the way the text code determines the condition type.
*   - In \N[x], this would be the '[x]'.
*
*   Common Event:
*   - Select a common event to run when this text code is used in a message.
*
*   JS: Action:
*   - JavaScript code used to perform an action when this text code appears.
*
* ---
*
* ============================================================================
* Plugin Parameters: Text Code Replacements
* ============================================================================
*
* Text codes are used for one of two things: performing actions or replacing
* themselves with text data. This Plugin Parameter will focus on the aspect of
* replacing the text codes with text data. Text data can be replaced with
* an exact exchange of text or dynamically through JavaScript. Adding a new
* Text Code Replacement is done through the Plugin Parameters.
*
* Each of the Text Code Replacements are formatted in such a way:
*
* ---
*
* Text Code Replacement
*
*   Match:
*   - This is what needs to be matched in order for this text code to work.
*   - This is the primary text marker after the \ in a text code.
*   - In \N[x], this would be the 'N'.
*
*   Type:
*   - The type of parameter to obtain (none, number, or string).
*   - This is the way the text code determines the condition type.
*   - In \N[x], this would be the '[x]'.
*
*   STR: Text:
*   - The text that will appear if this match appears.
*     If this has a value, ignore the JS: Text version.
*
*   JS: Text:
*   - JavaScript code used to determine the text that will appear if this
*     match appears.
*
* ---
*
* ============================================================================
* Plugin Parameters: Text Macros
* ============================================================================
*
* Text macros are used in similar fashion to text codes replacements to
* replace themselves with text data. The primary difference is that macros are
* made in a different format with no conditional argument modifiers (ie the
* [x] that follows a text code).
*
* To use a text macro, type in the matching keyword between two [brackets] and
* it will be replaced by the string data or run the JavaScript code found in
* the Plugin Parameter settings.
*
* For example, if you have the text macro "Leader", made to return the party
* leader's name, you can type in [Leader] in the Message Window and it will be
* replaced with the party leader's name. The output can also output text codes
* into the resulting text.
* 
* This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
* Use the method stated before with the brackets to [MacroName] instead.
*
* Each of the Text Macros are formatted in such a way:
*
* ---
*
* Text Macro
*
*   Match:
*   - This is what needs to be matched in order for this macro to work.
*   - In [Leader], this would be the 'Leader' text.
*
*   STR: Text:
*   - The replacement text that will appear from the macro.
*   - If this has a value, ignore the JS: Text version.
*
*   JS: Text:
*   - JavaScript code used to determine the text that will appear if this
*     macro appears.
*
* ---
*
* ============================================================================
* Plugin Parameters: Text Language Settings
* ============================================================================
*
* The "Text Language" feature allows your players to switch between different
* languages for your game to allow people from around the globe to enjoy what
* story you have to tell.
* 
* Disclaimers: This is not an automatic translation tool. Translations made
* through the "Text Language" feature of the VisuStella MZ Message Core
* will require manual input by the game developer.
* 
* See the "Text Language Information" for more information.
*
* ---
* 
* Main Settings:
* 
*   Enable Switching?:
*   - Enable language switching settings for this plugin?
* 
*   CSV Filename:
*   - What is the filename of the CSV file to read from?
*   - Located within the project's /data/ folder.
* 
* ---
* 
* Options:
* 
*   Add Option?:
*   - Add the 'Text Language' option to the Options menu?
* 
*   Adjust Window Height:
*   - Automatically adjust the options window height?
* 
*   Option Name:
*   - Command name of the option.
* 
* ---
* 
* Languages:
* 
*   Default Language:
*   - What is the default language used for this game?
* 
*   Supported Languages:
*   - What are all the supported languages supported by this game's
*     script?
*   - Remove any that aren't translated.
* 
* ---
* 
* Language Names:
* 
*   Bengali:
*   Chinese (Simplified):
*   Chinese (Traditional):
*   Czech:
*   Danish:
*   Dutch:
*   English:
*   Finnish:
*   French:
*   German:
*   Greek:
*   Hindi:
*   Hungarian:
*   Indonesian:
*   Italian:
*   Japanese:
*   Korean:
*   Norwegian:
*   Polish:
*   Portuguese:
*   Romanian:
*   Russian:
*   Slovak:
*   Spanish:
*   Swedish:
*   Tamil:
*   Thai:
*   Turkish:
*   - How does this language appear in the in-game options?
* 
* ---
*
* ============================================================================
* Plugin Parameters: Text Speed Option Settings
* ============================================================================
*
* Modern RPG's on the market have the option to adjust the message speed rate
* for players. These Plugin Parameters allow you to add that option to the
* Options Menu as well.
*
* ---
*
* Text Speed Option Settings
*
*   Add Option?:
*   - Add the 'Text Speed' option to the Options menu?
*
*   Adjust Window Height:
*   - Automatically adjust the options window height?
*
*   Option Name:
*   - Command name of the option.
*
*   Default Value:
*   - 1 - 10, slowest to fastest.
*   - 11 is instant value.
*
*   Instant Speed:
*   - Text to show "instant" text.
*
* ---
* 
* ============================================================================
* Plugin Parameters: Word Wrap Settings
* ============================================================================
*
* Word wrap is a property that will cause any overflowing text to wrap around
* and move into the next line. This property can only be enabled inside text
* that accept text codes, such as the Message Window and Help Window. However,
* word wrap is disabled for the Choice Window due to the nature of the Choice
* Window's base properties.
*
* Word wrap can be enabled or disabled in three ways. One is by using the text
* code <WordWrap> to enable it or </WordWrap> to disable it. The second method
* is by enabling it with the Plugin Command: 'Message: Properties'. The third
* method is by enabling it by default with the Plugin Parameters.
* 
* Word wrap only supports left-to-right alphabetical languages that utilize
* spaces.
* 
* Word Wrap also cannot be used together with <left>, <center>, or <right> and
* will disable itself if text alignment text codes are detected.
* 
* As of the v1.44 update, some Asian languages such as Chinese and Japanese
* are now supported for word wrap. Korean language is only supported if spaces
* are used.
* 
* ---
*
* Enable Word Wrap
*
*   Message Window:
*   - Automatically enable Word Wrap for this window?
*
*   Help Window:
*   - Automatically enable Word Wrap for this window?
*
* ---
*
* Rules
*
*   Link Break -> Space:
*   - Convert manually placed (non tagged) line breaks with spaces?
*   - Line breaks must be inserted using the <br> text code.
*
*   Tight Wrap:
*   - If a face graphic is present in a message, word wrap will be tighter.
* 
*   End Padding:
*   - Add extra padding to your window to make text wrap further away from the
*     end of the window.
*   - This will default to 0.
*
* ---
*
* ============================================================================
* Terms of Use
* ============================================================================
*
* 1. These plugins may be used in free or commercial games provided that they
* have been acquired through legitimate means at VisuStella.com and/or any
* other official approved VisuStella sources. Exceptions and special
* circumstances that may prohibit usage will be listed on VisuStella.com.
* 
* 2. All of the listed coders found in the Credits section of this plugin must
* be given credit in your games or credited as a collective under the name:
* "VisuStella".
* 
* 3. You may edit the source code to suit your needs, so long as you do not
* claim the source code belongs to you. VisuStella also does not take
* responsibility for the plugin if any changes have been made to the plugin's
* code, nor does VisuStella take responsibility for user-provided custom code
* used for custom control effects including advanced JavaScript notetags
* and/or plugin parameters that allow custom JavaScript code.
* 
* 4. You may NOT redistribute these plugins nor take code from this plugin to
* use as your own. These plugins and their code are only to be downloaded from
* VisuStella.com and other official/approved VisuStella sources. A list of
* official/approved sources can also be found on VisuStella.com.
*
* 5. VisuStella is not responsible for problems found in your game due to
* unintended usage, incompatibility problems with plugins outside of the
* VisuStella MZ library, plugin versions that aren't up to date, nor
* responsible for the proper working of compatibility patches made by any
* third parties. VisuStella is not responsible for errors caused by any
* user-provided custom code used for custom control effects including advanced
* JavaScript notetags and/or plugin parameters that allow JavaScript code.
*
* 6. If a compatibility patch needs to be made through a third party that is
* unaffiliated with VisuStella that involves using code from the VisuStella MZ
* library, contact must be made with a member from VisuStella and have it
* approved. The patch would be placed on VisuStella.com as a free download
* to the public. Such patches cannot be sold for monetary gain, including
* commissions, crowdfunding, and/or donations.
*
* ============================================================================
* Credits
* ============================================================================
* 
* If you are using this plugin, credit the following people in your game:
* 
* Team VisuStella
* * Yanfly
* * Arisu
* * Olivia
* * Irina
*
* ============================================================================
* Changelog
* ============================================================================
* 
* Version 1.49: May 16, 2024
* * Bug Fixes!
* ** Fixed a problem where using text codes to get database object names did
*    not apply translated text.
* * Feature Update!
* ** Added a failsafe for when Choice List Window doesn't have any viable
*    options (due to being hidden or disabled). Update made by Irina.
* ** Added a failsafe for Language CSV when empty rows are added.
* ** Updated some default Text Code actions in order to make sure they're only
*    used by the Message Window and not anything else. Update made by Irina.
* 
* Version 1.48: April 18, 2024
* * Bug Fixes!
* ** Added fail safe for help description checks parsing from objects without
*    help descriptions normally. Fix made by Irina.
* 
* Version 1.47: February 15, 2024
* * Documentation Update!
* ** Help file updated for new features.
* * New Features!
* ** New Plugin Parameters added by Irina:
* *** Plugin Parameters > Custom Font Manager
* **** Register custom fonts here.
* **** Custom fonts that aren't the message or number fonts cannot be used
*      without registration.
* **** See help file for more information.
* 
* Version 1.46: January 18, 2024
* * Bug Fixes!
* ** Fixed a bug where script calls used to create message choices would not
*    work properly. Fix made by Irina.
* * Documentation Update!
* ** Help file updated for new features.
* * New Features!
* ** Text Language Switching added by Irina:
* *** Plugin Parameters > Text Language Settings
* **** The "Text Language" feature allows your players to switch between
*      different languages for your game to allow people from around the globe
*      to enjoy what story you have to tell.
* **** Disclaimers: This is not an automatic translation tool. Translations
*      made through the "Text Language" feature of the VisuStella MZ Message
*      Core will require manual input by the game developer.
* **** Read more about it in detail within the "Text Language Information"
*      section in the help file.
* ** New Plugin Parameter added by Irina:
* *** Choices: Distance
* **** Change the distance from choice window to the message window.
* ** New parameter added to Plugin Command "Choices: Properties" by Irina:
* *** Minimum Choice Width
* **** What is the minimum width size for each choice?
* ** New Plugin Parameter for "Message Window" added by Irina:
* *** Parameters > Message Window: Choice List Window> Minimum Choice Width
* **** What is the minimum width size for each choice?
* ** New Text Codes for Choice Window added by Irina:
* *** <BgImg: filename> and variants
* *** <FgImg: filename> and variants
* **** These text codes allow adding a background or foreground image to a
*      choice rectangle in stretched/scaled size.
* 
* Version 1.45: December 14, 2023
* * Bug Fixes!
* ** Punctuation was, for some reason, excluded when using Wordwrap with
*    Japanese and Chinese languages. This should be fixed now. Fixed by Irina.
* * Documentation Update!
* ** Help file updated for new features.
* ** Added clarity to the <left>, <center>, and <right> being unable to be
*    used together with word wrap.
* *** Word Wrap also cannot be used together with <left>, <center>, or <right>
*     and will disable itself if text alignment text codes are detected.
* * Feature Update!
* ** Wordwrap <br> now works properly with Japanese and Chinese languages.
* * New Features!
* ** New Plugin Parameters added by Irina:
* *** Plugin Parameters > General Settings > Each Message Start
* *** Plugin Parameters > General Settings > Each Message End
* **** This is text that is added at the start/end of each message.
* **** Keep in mind that if a message extends to a different page (due to word
*      wrap, excess lines, etc), that does not mean the starting text will
*      be added to where the next page begins or the ending text will be added
*      where the previous page ends.
* **** Can be used for things like adding "<center>" to the start of each 
*      message without having to type it every time.
* 
* Version 1.44: October 12, 2023
* * Documentation Update!
* ** Help file updated for new features.
* ** Updated "Plugin Parameters: Word Wrap Settings" section:
* *** As of the v1.44 update, some Asian languages such as Chinese and
*     Japanese are now supported for word wrap. Korean language is only
*     supported if spaces are used.
* * Feature Update!
* ** Word Wrap is now supported for Japanese and Chinese languages.
* ** Feature updated by Irina and sponsored by AndyL.
* * New Features!
* ** New text codes added by Irina for "Show Choices" event command.
* *** <Shuffle>
* **** Shuffles the order of all choices. Any cancel shortcuts other than
*      "Branch" will be undone.
* *** <Shuffle: x>
* **** Shuffles the order of all choices and only x number of them appear. Any
*      cancel shortcuts other than "Branch" will be undone. Hidden choices do
*      not count towards x number.
* 
* Version 1.43: April 13, 2023
* * Compatibility Update!
* ** Fixed incompatibilities with auto message positioning with the Map Zoom
*    plugin. Update made by Irina.
* 
* Version 1.42: March 16, 2023
* * Bug Fixes!
* ** Fixed some text codes that would capture way too much data than intended.
*    Fix made by Irina.
* * Documentation Update!
* ** Help file updated for new features.
* * New Features!
* ** New text code added by Irina for Show Choice Window only:
* *** <Help> text </Help>
* **** Makes a help window appear and have it show 'text' in its contents.
* **** The help window will disappear if no text is displayed.
* ** New Plugin Commands added by Arisu:
* *** Select: Weapon
* *** Select: Armor
* *** Select: Skill
* **** Opens the Event Select Item Window to let the player pick a weapon,
*      armor, or skill to choose from. The selected object will have its ID
*      recorded in a variable. These can be opened while the Message Window is
*      opened just like the event "Select Item".
* 
* Version 1.41: December 15, 2022
* * Compatibility Update!
* ** Added compatibility functionality for future plugins.
* * Documentation Update!
* ** Help file updated for new features.
* * New Features!
* ** New text codes added by Irina!
* *** For the Choice Window Only text codes:
* **** <BgColor: x>
* **** <BgColor: x, y>
* **** <BgColor: #rrggbb>
* **** <BgColor: #rrggbb, #rrggbb>
* ***** Requires VisuMZ_0_CoreEngine! Sets the background color of this choice
*       to 'x' text color, 'x' to 'y' gradient text color, or using '#rrggbb'
*       hex color values.
* 
* Version 1.40: November 3, 2022
* * Documentation Update!
* ** Help file updated for new features.
* * New Feature!
* ** New text code added by Irina:
* *** <RNG> text1 | text2 | text3 </RNG>
* **** Using the above text code format in a Show Message entry, you can get a
*      random result out of the various inserted texts. Use "|" (without
*      quotes) as a separator between text entries. You can have unlimited
*      entries. The result will have any excess white space trimmed.
* **** This text code cannot be inserted into a macro and parsed properly.
* 
* Version 1.39: September 22, 2022
* * Bug Fixes!
* ** Macros now support quotes (' and ") in the STR: Text. Fix made by Irina.
* 
* Version 1.38: July 21, 2022
* * Optimization Update!
* ** Plugin should run more optimized.
* 
* Version 1.37: June 9, 2022
* * Documentation Update!
* ** Help file updated for new features.
* * Feature Update!
* ** Picture texts with \v[x] text codes are now updated automatically.
* ** This is the only dynamic text code that updates this way for optimization
*    purposes and to prevent overabundant CPU usage.
* ** Everything else will require the new Plugin Command.
* * New Features!
* ** New Plugin Command added by Irina:
* *** Picture: Refresh Text
* **** Refreshes the text used for all on-screen pictures.
* **** To be used if any dynamic text codes are updated like \n[x].
* * New Features!
* ** New text codes added by Arisu and sponsored by
*    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
* *** <Up Button>, <Left Button>, <Right Button>, <Down Button>
* *** <Ok Button>, <Cancel Button>, <Shift Button>, <Menu Button>
* *** <Page Up Button>, <Page Down Button>
* **** Display's VisuMZ_0_CoreEngine's button assist text.
* 
* Version 1.36: April 7, 2022
* * Feature Update!
* ** Auto size related text codes should now automatically disable word wrap
*    effects as they should have before. Update made by Irina.
* 
* Version 1.35: March 31, 2022
* * Bug Fixes!
* ** Bug fixed where if autosizing is used and it goes from a message that is
*    shorter to longer, an extra key press is needed. This should no longer be
*    the case. Fix made by Irina.
* 
* Version 1.34: February 24, 2022
* * Documentation Update!
* ** Help file updated for new features.
* * New Features!
* ** New Choice Window Text Codes made by Irina and sponsored by AndyL:
* *** <Choice Width: x>
* **** Sets the minimum text area width to x. Applies to whole choice window.
* *** <Choice Indent: x>
* **** Sets the indent to x value. Applies to current choice selection only.
* 
* Version 1.33: February 10, 2022
* * Documentation Update!
* ** Help file updated for new features.
* * New Features!
* ** New Plugin Commands added by Irina:
* *** Picture: Change Text
* **** This new plugin command allows you to place text on top of pictures
*      (usually in the form of empty pages or cards) to function as stationary
*      or other uses. Text codes are allowed.
* **** Text codes are supported.
* *** Picture: Erase Text
* **** Removes text from target picture(s).
* 
* Version 1.32: January 20, 2022
* * Bug Fixes!
* ** Extra Show Choice notetags will now be properly hidden. Fix by Irina.
* * Compatibility Update!
* ** Self Switches are now made compatible with work with Show Choices. Update
*    made by Irina.
* 
* Version 1.31: December 9, 2021
* * Documentation Update!
* ** Help file updated for new features.
* * New Features!
* ** New hard-coded message-only text code added by Irina:
* *** <Next Page>
* **** Ends the current message page at this line. This is used for messages
*      when rows are at 5 or above and the message lines don't match the
*      amount. This is used to prevent grabbing message windows from following
*      message events. Any lines following <Next Page> in the same message
*      event will be ignored.
* 
* Version 1.30: November 11, 2021
* * Documentation Update!
* ** Help file updated for new features.
* ** Help file updated for removed "Center Window X" bit.
* * Feature Update!
* ** Message: Properties now has "Center Window X?" removed
* *** Changes will now be automatically centered.
* *** This change is made for the new Plugin Command added for offsets which
*     more or less replaces them.
* * New Features!
* ** New Plugin Command added by Irina and sponsored by Puddor:
* *** Message: X/Y Offsets
* **** Change the X and Y Offsets of the Message Window.
* **** The offset value(s) will be saved and stored.
* ** New Plugin Parameters added by Irina and sponsored by Puddor:
* *** Plugin Parameters > General Settings > Message Window > Offset X
* *** Plugin Parameters > General Settings > Message Window > Offset Y
* **** Allows you to offset the horizontal and/or vertical positions of the
*      message window accordingly.
* ** New Text Codes added by Irina and sponsored by Puddor:
* *** <Offset: +x, +y>
* *** <Offset: -x, -y>
* *** <Offset: +x, -y>
* *** <Offset: -x, +y>
* **** Quickly adjust the message window offset values to the x and y amounts.
*      The values will replace the previous offset settings if there were any.
* 
* Version 1.29: October 21, 2021
* * Feature Update
* ** Word Wrap flags are now properly adjusted when converting macros and
*    adding bypasses towards regular messages. Update by Irina.
* 
* Version 1.28: October 14, 2021
* * Compatibility Update
* ** Added compatibility functionality for future plugins.
* 
* Version 1.27: October 7, 2021
* * Optimization Update!
* ** Plugin should run more optimized.
* 
* Version 1.26: September 3, 2021
* * Bug Fixes!
* ** Macros should now work properly with any \x<n> based text codes.
*    Fix made by Irina.
* 
* Version 1.25: August 27, 2021
* * Feature Update!
* ** Macros should now work with the <WordWrap> text code. Update by Irina.
* 
* Version 1.24: August 20, 2021
* * Feature Update!
* ** Macros should now work with window placement and resize options.
*    Update made by Irina.
* ** Macros should now work with choice-related enable and visibility options.
*    Update made by Irina.
* 
* Version 1.23: July 16, 2021
* * Documentation Update!
* ** Help file updated for new features.
* * New Features!
* ** New Plugin Parameter added by Irina:
* *** Plugin Parameters > Word Wrap Settings > End Padding
* **** Add extra padding to your window to make text wrap further away from
*      the end of the window. This will default to 0.
* 
* Version 1.22: July 2, 2021
* * Documentation Update!
* ** Help file updated for new features.
* * New Features!
* ** New Text Codes added by Irina and sponsored by AndyL:
* *** <Current Battle Target>
* *** <Current Battle User>
* **** Replaces the text code with the current target or current user's name
*      in-battle. Otherwise, returns nothing.
* **** Not recommended to be used inside of Help Descriptions. They are best
*      used with "Show Text" event commands.
* *** <Current Battle Action>
* *** <Current Battle Action Name>
* **** Replaces the text code with the current battle action's name with the
*      icon or without it respectively. Otherwise, returns nothing.
* **** Not recommended to be used inside of Help Descriptions. They are best
*      used with "Show Text" event commands.
* 
* Version 1.21: June 4, 2021
* * Documentation Update!
* ** Added extra note to the new <Position: x, y, width, height> text codes
*    that they do not work with Word Wrap.
* * Feature Update!
* ** Added fail safe for preventing Common Events that don't exist from being
*    ran at all by the Message Window. Added by Arisu.
* 
* Version 1.20: May 28, 2021
* * Documentation Update!
* ** Help file updated for new features.
* ** Added additional clarity for \WindowMoveTo<?> and \WindowMoveBy<?> and
*    \WindowReset text codes with "Note 2".
* *** Replace '?' with the following format: targetX, targetY, targetWidth,
*     targetHeight, duration, easingType. Only targetX and targetY are
*     required arguments. These will only alter the window dimensions when the
*     text has arrived at that point. They will not alter the window
*     preemptively. This is not used as a window positioner. Use the
*     <Position: x, y, width, height> text code for that.
* * New Features!
* ** New hard-coded text codes added for Message Window Only. Added by Irina.
* *** <Position: x, y, width, height>
* *** <Coordinates: x, y>
* *** <Dimensions: width, height>
* 
* Version 1.19: May 14, 2021
* * Feature Updates!
* ** <br> line breaks can now be used by Show Choices. Make sure that there is
*    enough room to contain the text through Plugin Commands. Update by Irina.
* 
* Version 1.18: April 30, 2021
* * Bug Fixes!
* ** Moving windows with 0 duration via text code should now instantly move
*    the windows to the desired location with no delay. Fix made by Olivia.
* 
* Version 1.17: April 9, 2021
* * Feature Update!
* ** <Auto> text codes for message windows will round up calculations for the
*    message width to the nearest even number for better calculations.
* 
* Version 1.16: April 2, 2021
* * Bug Fixes!
* ** \CommonEvent[x] text code will no longer run upon message window size
*    calculation. Fix made by Arisu.
* * Documentation Update!
* ** Added further clarification for "Text Macros" section.
* *** This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
*     Use the method stated before with the brackets to [MacroName] instead.
* 
* Version 1.15: March 5, 2021
* * Bug Fixes!
* ** Hidden choices by switches will no longer count towards the maximum line
*    count for Show Choice options. Fix made by Irina.
* 
* Version 1.14: February 12, 2021
* * Bug Fixes!
* ** Auto positioned messages in battle will no longer cover the battler in
*    question. Fix made by Irina.
* 
* Version 1.13: February 5, 2021
* * Bug Fixes!
* ** Choice List Window with a dimmed background should now have a more
*    consistent sized dim sprite. Fix made by Irina.
* 
* Version 1.12: January 22, 2021
* * Feature Update!
* ** Name Box Window Default Color is now disabled by default to 0 because
*    users do not understand why their names are showing up yellow and did not
*    bother reading the documentation. If users want this feature turned on,
*    they will have to do it manually from now on. Update made by Irina.
* 
* Version 1.11: January 15, 2021
* * Optimization Update!
* ** Plugin should run more optimized.
* 
* Version 1.10: January 8, 2021
* * Bug Fixes!
* ** <Auto Actor: x> and <Auto Party: x> text codes should now work properly.
*    Fix made by Irina.
* * Feature Update!
* ** Auto Color Plugin Parameters now have their default settings set to 0.
*    This is due to an influx of "bug reports" from users who do not
*    understand how this feature works, and the VisuStella team has decided it
*    is better for the feature to default to an inactive state until users
*    decide to search and utilize it themselves. Update made by Irina.
* 
* Version 1.09: January 1, 2021
* * Feature Update!
* ** Auto-color no longer applies to database names that are only numbers.
*    Auto-color entries that are only numbers will also be ignored. This is to
*    prevent breaking the text code parsing. Update made by Yanfly.
* 
* Version 1.08: November 15, 2020
* * Documentation Update!
* ** Some text codes left for the Name Box Window have been accidentally left
*    out. These text codes allow for the positioning of the Name Box Window.
*    Also, added to this section are the \NormalBG, \DimBG, and \TransparentBG
*    text codes since people have been asking for how to change the name box
*    window's background, but have skimmed over those text codes in different
*    sections of the help file.
* * Optimization Update!
* ** Plugin should run more optimized.
* 
* Version 1.07: November 8, 2020
* * Bug Fixes!
* ** When using auto size functions, the message pause symbol will no longer
*    appear semi-transparent the whole time. Fix made by Irina.
* 
* Version 1.06: October 25, 2020
* * Documentation Update!
* ** Added a warning message to the Fast Forward Key plugin parameter:
* *** WARNING: If this key is the same as the dash button, this will clear out
*     any held down inputs upon triggering an event  to prevent players from
*     skipping potentially useful information stored in messages. If you do
*     not want the input to be cleared, use a different key.
* ** Updated help file for new features.
* * Feature Update!
* ** The default Fast Forward Key setting has now been changed from "Shift" to
*    "Page Down". Change made by Yanfly
* * New Feature!
* ** New Plugin Parameter added by Irina.
* *** Plugin Parameters > General > Default Outline Width
* **** Changes the default outline width to this many pixels thick.
* 
* Version 1.06: September 27, 2020
* * Bug Fixes!
* ** Setting an actor's autocolor will now disable it from \N[x] and \P[x]
*    text codes. Fix made by Irina.
* 
* Version 1.05: September 20, 2020
* * Bug Fixes!
* ** Auto Position text codes not place positions properly if the screen width
*    and height differ from the box width and box height. Fix made by Irina.
* 
* Version 1.04: September 13, 2020
* * Bug Fixes!
* ** Word wrap no longer affects specific battle messages. Fix made by Irina.
* ** Word wrap now updates properly after using the 'Message: Properties'
*    Plugin Command. Fix made by Arisu.
* 
* Version 1.03: September 6, 2020
* * Bug Fixes!
* ** Autoplacement of the name box window now takes its offset Y setting into
*    account before sending it to the bottom of the message window. Fix made
*    by Yanfly.
* ** Added automatic feature setting to turn off word wrap when using the
*    auto-size and auto-position text codes. This is because the auto-size and
*    auto-position effects don't work properly with Word Wrap based on how
*    they both clash when adjusting the window settings. Fix made by Irina.
* ** New message pages after auto-sizing no longer put out empty messages.
*    Fix made by Irina and Shiro.
* * Documentation Update!
* ** Extended the note for auto-size and auto-position text codes to include
*    that they do not work with Word Wrap. Added by Irina.
* 
* Version 1.02: August 30, 2020
* * New Features!
* ** Added new hard-coded text codes for auto-sizing and auto-positioning:
* *** <Auto>, <Auto Width>, <Auto Height>
* *** <Auto Actor: x>, <Auto Party: x>, <Auto Enemy: x>
* *** <Auto Player>, <Auto Actor: x>, <Auto Party: x>, <Auto Event: x>
* **** New features added by Irina.
* 
* Version 1.01: August 23, 2020
* * Bug Fixes!
* ** </Wordwrap> now works.
* ** \ActorFace[x] text code now fixed.
* *** Users updating from version 1.00 will need to fix this problem by either
*     removing the plugin from the Plugin Manager list and reinstalling it, or
*     going to Plugin Parameters > Text Code Replacements > ActorFace >
*     JS: Text > and changing "$gameActors.actor(1)" to
*     "$gameActors.actor(actorId)"
* ** Actors with empty names would cause auto hightlight problems. Fixed!
* ** Auto-colors now ignore names with special characters like !, ?, [, ], and
*    so on.
* ** Line break spacing fixed.
* * New Features!
* ** Wordwrap now works with <left>, <center> and <right> alignment tags.
*
* Version 1.00: August 20, 2020
* * Finished Plugin!
*
* ============================================================================
* End of Helpfile
* ============================================================================
*
* @ --------------------------------------------------------------------------
*
* @command Separator_Begin
* @text -
* @desc -
*
* @ --------------------------------------------------------------------------
*
* @command MessageWindowProperties
* @text Message: Properties
* @desc Change the various properties of the Message Window.
*
* @arg Rows:num
* @text Rows
* @type number
* @min 0
* @desc Change the number of Message Window rows.
* Leave at 0 to keep it unchanged.
* @default 4
*
* @arg Width:num
* @text Width
* @type number
* @min 0
* @desc Change the Message Window width in pixels.
* Leave at 0 to keep it unchanged.
* @default 816
*
* @arg WordWrap:str
* @text Word Wrap
* @type select
* @option No Change
* @value No Change
* @option Enable
* @value true
* @option Disable
* @value false
* @desc Enable or disable Word Wrap for the Message Window?
* @default No Change
*
* @ --------------------------------------------------------------------------
*
* @command MessageWindowXyOffsets
* @text Message: X/Y Offsets
* @desc Change the X and Y Offsets of the Message Window.
* The offset value(s) will be saved and stored.
*
* @arg OffsetX:eval
* @text Offset X
* @desc Offset Message Window horizontally.
* Negative: Left; Positive: Right
* @default +0
*
* @arg OffsetY:eval
* @text Offset Y
* @desc Offset Message Window vertically.
* Negative: Up; Positive: Down
* @default +0
*
* @ --------------------------------------------------------------------------
*
* @command Separator_Choice
* @text -
* @desc -
*
* @ --------------------------------------------------------------------------
*
* @command ChoiceWindowDistance
* @text Choices: Distance
* @desc Change the distance from choice window to the message window.
*
* @arg Distance:eval
* @text Distance
* @desc Change distance between the choice and message windows.
* Default distance is 0. Use negative to center align.
* @default +0
*
* @ --------------------------------------------------------------------------
*
* @command ChoiceWindowProperties
* @text Choices: Properties
* @desc Change the properties found in the Show Choices event command.
*
* @arg LineHeight:num
* @text Choice Line Height
* @type number
* @min 0
* @desc Change the line height for the show choices.
* Leave at 0 to keep this unchanged.
* @default 36
*
* @arg MinWidth:num
* @text Minimum Choice Width
* @type number
* @min 0
* @desc What is the minimum width size for each choice?
* 96 is the default width.
* @default 96
*
* @arg MaxRows:num
* @text Max Rows
* @type number
* @min 0
* @desc Maximum number of choice rows to be displayed.
* Leave at 0 to keep this unchanged.
* @default 8
*
* @arg MaxCols:num
* @text Max Columns
* @type number
* @min 0
* @desc Maximum number of choice columns to be displayed.
* Leave at 0 to keep this unchanged.
* @default 1
*
* @arg TextAlign:str
* @text Text Alignment
* @type select
* @option Default
* @value default
* @option Left
* @value left
* @option Center
* @value center
* @option Right
* @value right
* @desc Text alignment for Show Choice window.
* @default default
*
* @ --------------------------------------------------------------------------
*
* @command Separator_Select
* @text -
* @desc -
*
* @ --------------------------------------------------------------------------
*
* @command SelectWeapon
* @text Select: Weapon
* @desc Opens the Event Select Item Window to let the player
* pick a weapon to choose from.
*
* @arg VariableID:num
* @text Variable ID
* @type number
* @min 0
* @desc This variable will be used to record the ID of the
* selected weapon. It will result in 0 otherwise.
* @default 1
*
* @arg WeaponTypeID:num
* @text Weapon Type ID
* @type number
* @min 0
* @max 100
* @desc Reduce all the weapons to a specific weapon type.
* Leave at 0 to not use filters.
* @default 0
*
* @ --------------------------------------------------------------------------
*
* @command SelectArmor
* @text Select: Armor
* @desc Opens the Event Select Item Window to let the player
* pick an armor to choose from.
*
* @arg VariableID:num
* @text Variable ID
* @type number
* @min 0
* @desc This variable will be used to record the ID of the
* selected armor. It will result in 0 otherwise.
* @default 1
*
* @arg ArmorTypeID:num
* @text Armor Type ID
* @type number
* @min 0
* @max 100
* @desc Reduce all the armors to a specific armor type.
* Leave at 0 to not use filters.
* @default 0
*
* @arg EquipTypeID:num
* @text Equip Type ID
* @type number
* @min 0
* @max 100
* @desc Reduce all the armors to a specific equip type.
* Leave at 0 to not use filters.
* @default 0
*
* @ --------------------------------------------------------------------------
*
* @command SelectSkill
* @text Select: Skill
* @desc Opens the Event Select Item Window to let the player
* pick a skill to choose from. Requires VisuMZ_1_SkillsStatesCore!
*
* @arg VariableID:num
* @text Variable ID
* @type number
* @min 0
* @desc This variable will be used to record the ID of the
* selected skill. It will result in 0 otherwise.
* @default 1
*
* @arg ActorID:num
* @text Actor ID
* @type actor
* @desc Select an actor to get the skill list from.
* Use 0 to select from the party leader.
* @default 0
*
* @arg SkillTypeID:num
* @text Skill Type ID
* @type number
* @min 0
* @max 100
* @desc Reduce all the skills to a specific skill type.
* Leave at 0 to not use filters.
* @default 0
*
* @ --------------------------------------------------------------------------
*
* @command Separator_Picture
* @text -
* @desc -
*
* @ --------------------------------------------------------------------------
*
* @command PictureTextChange
* @text Picture: Change Text
* @desc Change text for target picture(s) to show.
* You may use text codes.
*
* @arg PictureIDs:arraynum
* @text Picture ID(s)
* @type number[]
* @min 1
* @max 100
* @desc The ID(s) of the picture(s) to set text to.
* @default ["1"]
*
* @arg Padding:eval
* @text Padding
* @parent PictureIDs:arraynum
* @desc How much padding from the sides should there be?
* @default $gameSystem.windowPadding()
* 
* @arg Text
*
* @arg upperleft:json
* @text Upper Left
* @parent Text
* @type note
* @desc The text that's aligned to this picture's side.
* You may use text codes.
* @default ""
*
* @arg up:json
* @text Upper Center
* @parent Text
* @type note
* @desc The text that's aligned to this picture's side.
* You may use text codes.
* @default ""
*
* @arg upperright:json
* @text Upper Right
* @parent Text
* @type note
* @desc The text that's aligned to this picture's side.
* You may use text codes.
* @default ""
*
* @arg left:json
* @text Middle Left
* @parent Text
* @type note
* @desc The text that's aligned to this picture's side.
* You may use text codes.
* @default ""
*
* @arg center:json
* @text Middle Center
* @parent Text
* @type note
* @desc The text that's aligned to this picture's side.
* You may use text codes.
* @default ""
*
* @arg right:json
* @text Middle Right
* @parent Text
* @type note
* @desc The text that's aligned to this picture's side.
* You may use text codes.
* @default ""
*
* @arg lowerleft:json
* @text Lower Left
* @parent Text
* @type note
* @desc The text that's aligned to this picture's side.
* You may use text codes.
* @default ""
*
* @arg down:json
* @text Lower Center
* @parent Text
* @type note
* @desc The text that's aligned to this picture's side.
* You may use text codes.
* @default ""
*
* @arg lowerright:json
* @text Lower Right
* @parent Text
* @type note
* @desc The text that's aligned to this picture's side.
* You may use text codes.
* @default ""
*
* @ --------------------------------------------------------------------------
*
* @command PictureTextErase
* @text Picture: Erase Text
* @desc Erase all text for target picture(s).
*
* @arg PictureIDs:arraynum
* @text Picture ID(s)
* @type number[]
* @min 1
* @max 100
* @desc The ID(s) of the picture(s) to erase text for.
* @default ["1"]
*
* @ --------------------------------------------------------------------------
*
* @command PictureTextRefresh
* @text Picture: Refresh Text
* @desc Refreshes the text used for all on-screen pictures.
* To be used if any dynamic text codes are updated like \n[x].
*
* @ --------------------------------------------------------------------------
*
* @command Separator_End
* @text -
* @desc -
*
* @ --------------------------------------------------------------------------
*
* @ ==========================================================================
* @ Plugin Parameters
* @ ==========================================================================
*
* @param BreakHead
* @text --------------------------
* @default ----------------------------------
*
* @param MessageCore
* @default Plugin Parameters
*
* @param ATTENTION
* @default READ THE HELP FILE
*
* @param BreakSettings
* @text --------------------------
* @default ----------------------------------
*
* @param General:struct
* @text General Settings
* @type struct<General>
* @desc General settings involving the message system.
* @default {"MessageWindow":"","MessageRows:num":"4","MessageWidth:num":"816","FastForwardKey:str":"pagedown","MessageTextDelay:num":"1","StretchDimmedBg:eval":"true","DefaultOutlineWidth:num":"3","NameBoxWindow":"","NameBoxWindowDefaultColor:num":"0","NameBoxWindowOffsetX:num":"0","NameBoxWindowOffsetY:num":"0","ChoiceListWindow":"","ChoiceWindowLineHeight:num":"36","ChoiceWindowMaxRows:num":"8","ChoiceWindowMaxCols:num":"1","ChoiceWindowTextAlign:str":"default","DefaultTextCodes":"","RelativePXPY:eval":"true","FontBiggerCap:eval":"108","FontSmallerCap:eval":"12","FontChangeValue:eval":"12"}
*
* @param AutoColor:struct
* @text Auto-Color Settings
* @type struct<AutoColor>
* @desc Automatically color certain keywords a specific way.
* @default {"DatabaseHighlighting":"","Actors:str":"0","Classes:str":"0","Skills:str":"0","Items:str":"0","Weapons:str":"0","Armors:str":"0","Enemies:str":"0","States:str":"0","WordHighlighting":"","TextColor1:arraystr":"[]","TextColor2:arraystr":"[]","TextColor3:arraystr":"[]","TextColor4:arraystr":"[]","TextColor5:arraystr":"[]","TextColor6:arraystr":"[]","TextColor7:arraystr":"[]","TextColor8:arraystr":"[]","TextColor9:arraystr":"[]","TextColor10:arraystr":"[]","TextColor11:arraystr":"[]","TextColor12:arraystr":"[]","TextColor13:arraystr":"[]","TextColor14:arraystr":"[]","TextColor15:arraystr":"[]","TextColor16:arraystr":"[]","TextColor17:arraystr":"[]","TextColor18:arraystr":"[]","TextColor19:arraystr":"[]","TextColor20:arraystr":"[]","TextColor21:arraystr":"[]","TextColor22:arraystr":"[]","TextColor23:arraystr":"[]","TextColor24:arraystr":"[]","TextColor25:arraystr":"[]","TextColor26:arraystr":"[]","TextColor27:arraystr":"[]","TextColor28:arraystr":"[]","TextColor29:arraystr":"[]","TextColor30:arraystr":"[]","TextColor31:arraystr":"[]"}
*
* @param CustomFonts:arraystruct
* @text Custom Font Manager
* @type struct<CustomFont>[]
* @desc Register custom fonts here. Custom fonts that aren't the
* message or number fonts cannot be used without this.
* @default []
*
* @param TextCodeActions:arraystruct
* @text Text Code Actions
* @type struct<TextCodeAction>[]
* @desc Text codes that perform actions.
* @default ["{\"Match:str\":\"ChangeFace\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (this instanceof Window_Message) {\\\\n    if (textState.drawing) {\\\\n        const filename = data[0].trim();\\\\n        const index = parseInt(data[1] || '0');\\\\n        $gameMessage.setFaceImage(filename, index);\\\\n        this.loadMessageFace();\\\\n        const rtl = $gameMessage.isRTL();\\\\n        const width = ImageManager.faceWidth;\\\\n        const height = this.innerHeight;\\\\n        const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n        this.contents.clearRect(x, 0, width, height);\\\\n        this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n    }\\\\n}\\\"\"}","{\"Match:str\":\"FaceIndex\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst index = this.obtainEscapeParam(textState);\\\\nif (this instanceof Window_Message) {\\\\n    if (textState.drawing) {\\\\n        const filename = $gameMessage.faceName();\\\\n        $gameMessage.setFaceImage(filename, index);\\\\n        this.loadMessageFace();\\\\n        const rtl = $gameMessage.isRTL();\\\\n        const width = ImageManager.faceWidth;\\\\n        const height = this.innerHeight;\\\\n        const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n        this.contents.clearRect(x, 0, width, height);\\\\n        this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n    }\\\\n}\\\"\"}","{\"Match:str\":\"TextDelay\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst delay = this.obtainEscapeParam(textState);\\\\nif (this instanceof Window_Message) {\\\\n    if (textState.drawing && this.constructor === Window_Message) {\\\\n        this.setTextDelay(delay);\\\\n    }\\\\n}\\\"\"}","{\"Match:str\":\"NormalBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(0);\\\\n}\\\"\"}","{\"Match:str\":\"DimBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(1);\\\\n}\\\"\"}","{\"Match:str\":\"TransparentBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(2);\\\\n}\\\"\"}","{\"Match:str\":\"FontChange\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst fontName = this.obtainEscapeString(textState);\\\\nthis.contents.fontFace = fontName;\\\"\"}","{\"Match:str\":\"ResetFont\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetFontSettings();\\\"\"}","{\"Match:str\":\"ResetColor\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetTextColor();\\\"\"}","{\"Match:str\":\"HexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeTextColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineColor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst colorIndex = this.obtainEscapeParam(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(ColorManager.textColor(colorIndex));\\\\n}\\\"\"}","{\"Match:str\":\"OutlineHexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineWidth\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst width = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    this.contents.outlineWidth = width;\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveTo\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : this.x;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : this.y;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : this.width;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : this.height;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveTo(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveBy\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : 0;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : 0;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : 0;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : 0;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveBy(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowReset\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    const frames = 20;\\\\n    const easingType = 0;\\\\n    this.resetRect(frames, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"heart\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"3\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst index = this.obtainEscapeParam(textState);\\\"\"}"]
*
* @param TextCodeReplace:arraystruct
* @text Text Code Replacements
* @type struct<TextCodeReplace>[]
* @desc Text codes that replace themselves with text.
* @default ["{\"Match:str\":\"ActorFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const actorId = parseInt(arguments[1]);\\\\nconst actor = $gameActors.actor(actorId);\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"PartyFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const index = parseInt(arguments[1]) - 1;\\\\nconst actor = $gameParty.members()[index];\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"Class\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ClassIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"ClassName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Skill\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"SkillIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"SkillName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Item\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"ItemName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"Weapon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"WeaponName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"Armor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"ArmorName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"State\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"StateIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"StateName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"LastGainObj\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = true;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjIcon\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"return this.lastGainedObjectIcon();\\\"\"}","{\"Match:str\":\"LastGainObjName\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = false;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjQuantity\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"return this.lastGainedObjectQuantity();\\\"\"}","{\"Match:str\":\"Enemy\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"EnemyName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Troop\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMember\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMemberName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}"]
*
* @param TextMacros:arraystruct
* @text Text Code Macros
* @type struct<TextMacro>[]
* @desc Macros that are used to quickly write batches of text.
* Format style: [MacroName]
* @default ["{\"Match:str\":\"Example Macro\",\"TextStr:str\":\"This is the text that will be displayed when you type [Example Macro].\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}","{\"Match:str\":\"Leader\",\"TextStr:str\":\"\\\\P[1]\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}"]
*
* @param Localization:struct
* @text Text Language Settings
* @type struct<Localization>
* @desc Text Language settings for this plugin.
* @default {"Main":"","Enable:eval":"false","CsvFilename:str":"Languages.csv","Options":"","AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Text Language","Localized":"","DefaultLocale:str":"English","Languages:arraystr":"[\"Bengali\",\"Chinese(Simplified)\",\"Chinese(Traditional)\",\"Czech\",\"Danish\",\"Dutch\",\"English\",\"Finnish\",\"French\",\"German\",\"Greek\",\"Hindi\",\"Hungarian\",\"Indonesian\",\"Italian\",\"Japanese\",\"Korean\",\"Norwegian\",\"Polish\",\"Portuguese\",\"Romanian\",\"Russian\",\"Slovak\",\"Spanish\",\"Swedish\",\"Tamil\",\"Thai\",\"Turkish\"]","LangNames":"","Bengali:str":"বাংলা","Chinese(Simplified):str":"简体中文","Chinese(Traditional):str":"繁體中文","Czech:str":"Čeština","Danish:str":"Dansk","Dutch:str":"Nederlands","English:str":"English","Finnish:str":"Suomi","French:str":"Français","German:str":"Deutsch","Greek:str":"Ελληνικά","Hindi:str":"हिन्दी","Hungarian:str":"Magyar","Indonesian:str":"Bahasa Indo","Italian:str":"Italiano","Japanese:str":"日本語","Korean:str":"한국어","Norwegian:str":"Norsk","Polish:str":"Polski","Portuguese:str":"Português","Romanian:str":"Română","Russian:str":"Русский","Slovak:str":"Slovenčina","Spanish:str":"Español","Swedish:str":"Svenska","Tamil:str":"தமிழ்","Thai:str":"ไทย","Turkish:str":"Türkçe"}
*
* @param TextSpeed:struct
* @text Text Speed Option Settings
* @type struct<TextSpeed>
* @desc Text Speed Options Menu settings.
* @default {"AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Text Speed","Default:num":"10","Instant:str":"Instant"}
*
* @param WordWrap:struct
* @text Word Wrap Settings
* @type struct<WordWrap>
* @desc Settings involving Word Wrap.
* @default {"EnableWordWrap":"","MessageWindow:eval":"false","HelpWindow:eval":"false","Rules":"","LineBreakSpace:eval":"true","TightWrap:eval":"false","EndPadding:num":"0"}
*
* @param BreakEnd1
* @text --------------------------
* @default ----------------------------------
*
* @param End Of
* @default Plugin Parameters
*
* @param BreakEnd2
* @text --------------------------
* @default ----------------------------------
*
*/
/* ----------------------------------------------------------------------------
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param MessageWindow
 * @text Message Window
 *
 * @param MessageRows:num
 * @text Default Rows
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default number of rows to display for the Message Window.
 * @default 4
 *
 * @param MessageWidth:num
 * @text Default Width
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default Message Window width in pixels.
 * @default 816
 *
 * @param FastForwardKey:str
 * @text Fast Forward Key
 * @parent MessageWindow
 * @type combo
 * @option none
 * @option tab
 * @option shift
 * @option control
 * @option pageup
 * @option pagedown
 * @desc This is the key used for fast forwarding messages.
 * @default pagedown
 *
 * @param MessageTextDelay:num
 * @text Text Delay
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc How many frames to wait between characters drawn?
 * Use 0 for instant.
 * @default 1
 *
 * @param MsgWindowOffsetX:num
 * @text Offset X
 * @parent MessageWindow
 * @desc Offset Message Window horizontally.
 * Negative: Left; Positive: Right
 * @default +0
 *
 * @param MsgWindowOffsetY:num
 * @text Offset Y
 * @parent MessageWindow
 * @desc Offset Message Window vertically.
 * Negative: Up; Positive: Down
 * @default +0
 *
 * @param StretchDimmedBg:eval
 * @text Stretch Dimmed BG
 * @parent MessageWindow
 * @type boolean
 * @on Stretch
 * @off Don't
 * @desc Stretch dimmed window background to fit the whole screen.
 * @default true
 *
 * @param DefaultOutlineWidth:num
 * @text Default Outline Width
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc Changes the default outline width to this many pixels thick.
 * @default 3
 *
 * @param EachMessageStart:json
 * @text Each Message Start
 * @parent MessageWindow
 * @type note
 * @desc This is text that is added at the start of each message.
 * You may use text codes.
 * @default ""
 *
 * @param EachMessageEnd:json
 * @text Each Message End
 * @parent MessageWindow
 * @type note
 * @desc This is text that is added at the end of each message.
 * You may use text codes.
 * @default ""
 *
 * @param NameBoxWindow
 * @text Name Box Window
 *
 * @param NameBoxWindowDefaultColor:num
 * @text Default Color
 * @parent NameBoxWindow
 * @min 0
 * @max 31
 * @desc Default color for the Name Box Window's text.
 * @default 0
 *
 * @param NameBoxWindowOffsetX:num
 * @text Offset X
 * @parent NameBoxWindow
 * @desc How much to offset the name box window X by (as long as it doesn't go offscreen).
 * @default +0
 *
 * @param NameBoxWindowOffsetY:num
 * @text Offset Y
 * @parent NameBoxWindow
 * @desc How much to offset the name box window Y by (as long as it doesn't go offscreen).
 * @default +0
 *
 * @param ChoiceListWindow
 * @text Choice List Window
 *
 * @param ChoiceWindowLineHeight:num
 * @text Line Height
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc What is the default line height for Show Choices?
 * @default 36
 *
 * @param ChoiceWindowMinWidth:num
 * @text Minimum Choice Width
 * @parent ChoiceListWindow
 * @type number
 * @min 0
 * @desc What is the minimum choice width for each choice?
 * 96 is the default width.
 * @default 96
 *
 * @param ChoiceWindowMaxRows:num
 * @text Max Rows
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of rows to visibly display?
 * @default 8
 *
 * @param ChoiceWindowMaxCols:num
 * @text Max Columns
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of columns to visibly display?
 * @default 1
 *
 * @param ChoiceWindowTextAlign:str
 * @text Text Alignment
 * @parent ChoiceListWindow
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Default alignment for Show Choice window.
 * @default default
 *
 * @param DefaultTextCodes
 * @text Default Text Codes
 *
 * @param RelativePXPY:eval
 * @text Relative \PX \PY
 * @parent DefaultTextCodes
 * @type boolean
 * @on Better
 * @off Normal
 * @desc Make \PX[x] and \PY[x] adjust relative starting position than exact coordinates.
 * @default true
 *
 * @param FontBiggerCap:eval
 * @text \{ Maximum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the maximum size that \{ can reach.
 * @default 108
 *
 * @param FontSmallerCap:eval
 * @text \} Minimum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the minimum size that \} can reach.
 * @default 12
 *
 * @param FontChangeValue:eval
 * @text \{ Change \}
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc How much does \{ and \} change font size by?
 * @default 12
 *
 */
/* ----------------------------------------------------------------------------
 * Auto Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutoColor:
 *
 * @param DatabaseHighlighting
 * @text Database Highlighting
 *
 * @param Actors:str
 * @text Actors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Actor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Classes:str
 * @text Classes
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Class's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Skills:str
 * @text Skills
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Skill's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Items:str
 * @text Items
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Item's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Weapons:str
 * @text Weapons
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Weapon's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Armors:str
 * @text Armors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Armor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Enemies:str
 * @text Enemies
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Enemy's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param States:str
 * @text States
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a State's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param WordHighlighting
 * @text Word Highlighting
 *
 * @param TextColor1:arraystr
 * @text \C[1]: Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor2:arraystr
 * @text \C[2]: Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor3:arraystr
 * @text \C[3]: Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor4:arraystr
 * @text \C[4]: Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor5:arraystr
 * @text \C[5]: Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor6:arraystr
 * @text \C[6]: Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor7:arraystr
 * @text \C[7]: Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor8:arraystr
 * @text \C[8]: Light Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor9:arraystr
 * @text \C[9]: Dark Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor10:arraystr
 * @text \C[10]: Dark Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor11:arraystr
 * @text \C[11]: Dark Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor12:arraystr
 * @text \C[12]: Dark Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor13:arraystr
 * @text \C[13]: Dark Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor14:arraystr
 * @text \C[14]: Solid Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor15:arraystr
 * @text \C[15]: Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor16:arraystr
 * @text \C[16]: System Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor17:arraystr
 * @text \C[17]: Crisis Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor18:arraystr
 * @text \C[18]: Dead Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor19:arraystr
 * @text \C[19]: Outline Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor20:arraystr
 * @text \C[20]: HP Orange 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor21:arraystr
 * @text \C[21]: HP Orange 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor22:arraystr
 * @text \C[22]: MP Blue 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor23:arraystr
 * @text \C[23]: MP Blue 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor24:arraystr
 * @text \C[24]: Param Up Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor25:arraystr
 * @text \C[25]: Param Down Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor26:arraystr
 * @text \C[26]: System Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor27:arraystr
 * @text \C[27]: System Pink
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor28:arraystr
 * @text \C[28]: TP Green 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor29:arraystr
 * @text \C[29]: TP Green 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor30:arraystr
 * @text \C[30]: EXP Purple 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor31:arraystr
 * @text \C[31]: EXP Purple 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Font Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomFont:
 *
 * @param FontFamily:str
 * @text Font Family
 * @desc This will be what's used by RPG Maker MZ and plugins to
 * reference this specific font. NO filename extensions!
 * @default Unnamed
 *
 * @param Filename:str
 * @text Filename
 * @desc What is the filename of the custom font you would like to use?
 * Located inside the project's "fonts" folder.
 * @default Unnamed.ttf
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Actions
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeAction:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param CommonEvent:num
 * @text Common Event
 * @type common_event
 * @desc Select a common event to run when this text code is used in a message.
 * @default 0
 *
 * @param ActionJS:func
 * @text JS: Action
 * @type note
 * @desc JavaScript code used to perform an action when this text code appears.
 * @default "const textState = arguments[0];"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Replacements
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeReplace:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The text that will appear if this match appears.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this match appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Macro
 * ----------------------------------------------------------------------------
 */
/*~struct~TextMacro:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this macro to work.
 * @default Key
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The replacement text that will appear from the macro.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this macro appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Localization Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Localization:
 *
 * @param Main
 * @text Main Settings
 *
 * @param Enable:eval
 * @text Enable Switching?
 * @parent Main
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc Enable language switching settings for this plugin?
 * @default false
 *
 * @param CsvFilename:str
 * @text CSV Filename
 * @parent Main
 * @desc What is the filename of the CSV file to read from?
 * Located within the project's /data/ folder.
 * @default Languages.csv
 *
 * @param Options
 * @text Options
 *
 * @param AddOption:eval
 * @text Add Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Language' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @parent Options
 * @desc Command name of the option.
 * @default Text Language
 *
 * @param Localized
 * @text Languages
 *
 * @param DefaultLocale:str
 * @text Default Language
 * @parent Localized
 * @type select
 * @option Bengali
 * @option Chinese(Simplified)
 * @option Chinese(Traditional)
 * @option Czech
 * @option Danish
 * @option Dutch
 * @option English
 * @option Finnish
 * @option French
 * @option German
 * @option Greek
 * @option Hindi
 * @option Hungarian
 * @option Indonesian
 * @option Italian
 * @option Japanese
 * @option Korean
 * @option Norwegian
 * @option Polish
 * @option Portuguese
 * @option Romanian
 * @option Russian
 * @option Slovak
 * @option Spanish
 * @option Swedish
 * @option Tamil
 * @option Thai
 * @option Turkish
 * @desc What is the default language used for this game?
 * @default English
 *
 * @param Languages:arraystr
 * @text Supported Languages
 * @parent Localized
 * @type select[]
 * @option Bengali
 * @option Chinese(Simplified)
 * @option Chinese(Traditional)
 * @option Czech
 * @option Danish
 * @option Dutch
 * @option English
 * @option Finnish
 * @option French
 * @option German
 * @option Greek
 * @option Hindi
 * @option Hungarian
 * @option Indonesian
 * @option Italian
 * @option Japanese
 * @option Korean
 * @option Norwegian
 * @option Polish
 * @option Portuguese
 * @option Romanian
 * @option Russian
 * @option Slovak
 * @option Spanish
 * @option Swedish
 * @option Tamil
 * @option Thai
 * @option Turkish
 * @desc What are all the supported languages supported by this
 * game's script? Remove any that aren't translated.
 * @default ["Bengali","Chinese(Simplified)","Chinese(Traditional)","Czech","Danish","Dutch","English","Finnish","French","German","Greek","Hindi","Hungarian","Indonesian","Italian","Japanese","Korean","Norwegian","Polish","Portuguese","Romanian","Russian","Slovak","Spanish","Swedish","Tamil","Thai","Turkish"]
 *
 * @param LangNames
 * @text Language Names
 *
 * @param Bengali:str
 * @text Bengali
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default বাংলা
 * 
 * @param Chinese(Simplified):str
 * @text Chinese (Simplified)
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default 简体中文
 * 
 * @param Chinese(Traditional):str
 * @text Chinese (Traditional)
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default 繁體中文
 * 
 * @param Czech:str
 * @text Czech
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Čeština
 * 
 * @param Danish:str
 * @text Danish
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Dansk
 * 
 * @param Dutch:str
 * @text Dutch
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Nederlands
 * 
 * @param English:str
 * @text English
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default English
 * 
 * @param Finnish:str
 * @text Finnish
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Suomi
 * 
 * @param French:str
 * @text French
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Français
 * 
 * @param German:str
 * @text German
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Deutsch
 * 
 * @param Greek:str
 * @text Greek
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Ελληνικά
 * 
 * @param Hindi:str
 * @text Hindi
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default हिन्दी
 * 
 * @param Hungarian:str
 * @text Hungarian
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Magyar
 * 
 * @param Indonesian:str
 * @text Indonesian
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Bahasa Indo
 * 
 * @param Italian:str
 * @text Italian
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Italiano
 * 
 * @param Japanese:str
 * @text Japanese
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default 日本語
 * 
 * @param Korean:str
 * @text Korean
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default 한국어
 * 
 * @param Norwegian:str
 * @text Norwegian
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Norsk
 * 
 * @param Polish:str
 * @text Polish
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Polski
 * 
 * @param Portuguese:str
 * @text Portuguese
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Português
 * 
 * @param Romanian:str
 * @text Romanian
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Română
 * 
 * @param Russian:str
 * @text Russian
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Русский
 * 
 * @param Slovak:str
 * @text Slovak
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Slovenčina
 * 
 * @param Spanish:str
 * @text Spanish
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Español
 * 
 * @param Swedish:str
 * @text Swedish
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Svenska
 * 
 * @param Tamil:str
 * @text Tamil
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default தமிழ்
 * 
 * @param Thai:str
 * @text Thai
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default ไทย
 * 
 * @param Turkish:str
 * @text Turkish
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Türkçe
 *
 */
/* ----------------------------------------------------------------------------
 * Text Speed Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TextSpeed:
 *
 * @param AddOption:eval
 * @text Add Option?
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Text Speed' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @desc Command name of the option.
 * @default Text Speed
 *
 * @param Default:num
 * @text Default Value
 * @type number
 * @min 1
 * @max 11
 * @desc 1 - 10, slowest to fastest.
 * 11 is instant value.
 * @default 10
 *
 * @param Instant:str
 * @text Instant Speed
 * @desc Text to show "instant" text.
 * @default Instant
 *
 */
/* ----------------------------------------------------------------------------
 * Word Wrap Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~WordWrap:
 *
 * @param EnableWordWrap
 * @text Enable Word Wrap
 *
 * @param MessageWindow:eval
 * @text Message Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param HelpWindow:eval
 * @text Help Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param Rules
 * @text Rules
 *
 * @param LineBreakSpace:eval
 * @text Link Break -> Space
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Convert manually placed (non tagged) line breaks with spaces?
 * @default true
 *
 * @param TightWrap:eval
 * @text Tight Wrap
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc If a face graphic is present in a message, word wrap will be tighter.
 * @default false
 *
 * @param EndPadding:num
 * @text End Padding
 * @parent Rules
 * @type number
 * @desc Add extra padding to your window to make text wrap further away from the end of the window.
 * @default 0
 *
 */
//=============================================================================

const _0x137c0c = _0x5c59; (function (_0x178871, _0x5e3fe4) { const _0x525231 = _0x5c59, _0x4146aa = _0x178871(); while (!![]) { try { const _0x988eb = parseInt(_0x525231(0x265)) / 0x1 + -parseInt(_0x525231(0xd5)) / 0x2 * (parseInt(_0x525231(0x4b5)) / 0x3) + parseInt(_0x525231(0x315)) / 0x4 * (parseInt(_0x525231(0x1bd)) / 0x5) + parseInt(_0x525231(0x203)) / 0x6 * (-parseInt(_0x525231(0x1a7)) / 0x7) + parseInt(_0x525231(0x1c7)) / 0x8 + -parseInt(_0x525231(0xfb)) / 0x9 + parseInt(_0x525231(0x307)) / 0xa; if (_0x988eb === _0x5e3fe4) break; else _0x4146aa['push'](_0x4146aa['shift']()); } catch (_0x29f99b) { _0x4146aa['push'](_0x4146aa['shift']()); } } }(_0x5b3a, 0x4af2f)); function _0x5b3a() { const _0x134eed = ['setMessageWindowXyOffsets', 'ParseClassNotetags', 'Japanese', '_list', 'Ουάου', '_pictureTextWidth', 'bitmap', 'Items', '_scene', 'textSizeExTextAlignment', 'setPictureText', 'updateForcedPlacement', 'Wow', 'CYnHO', 'itemChoiceActorId', 'updatePictureText', 'mvZAb', 'drawTextEx', 'item', 'test', 'Window_Message_needsNewPage', '_autoPosRegExp', 'नमस्ते', 'Ciao', 'French', 'upper\x20center', 'FUNC', 'AdjustRect', 'setupShuffleChoices', 'registerResetRect', 'moveTo', 'defeat', 'updateRelativePosition', 'itemChoiceWtypeId', 'ksOux', 'purple', 'CSV\x20file\x20is\x20now\x20created\x20and\x20stored\x20in\x20data\x20folder.\x0a', 'drawSkillCost', 'isBreakShowTextCommands', '_pictureTextSprite', 'anyPictureTextChanges', 'General', 'IGmEP', 'zoomScale', 'MNhRr', 'Hungarian', 'makeFontSmaller', 'lower\x20left', 'Window_EventItem_includes', 'EwnZJ', 'canMove', 'parseChoiceText', 'MDYAD', 'floor', 'DefaultOutlineWidth', 'FontSmallerCap', 'statusText', 'outLineColor', 'drawChoiceLocationImage', 'randomInt', '379662xKfdiX', 'cwfGI', 'addChoiceDistance', 'deactivate', 'CnbhO', 'DQLFq', 'EquipTypeID', 'RQpon', 'messageCoreTextSpeed', 'icHtD', 'MessageCore', 'cAWPh', 'Scene_Boot_loadGameFonts', 'itemBackColor2', 'actor', 'erasePictureTextBuffer', 'Hello', 'convertMessageCoreEscapeActions', 'Window_Base_processEscapeCharacter', 'openness', 'ArmorTypeID', 'false', 'stretchDimmerSprite', '\x1bBOLD[0]', '\x1bCOLORLOCK[0]', 'down\x20right', 'battle\x20actor', 'iconIndex', '_lastGainedItemData', 'processEscapeCharacter', 'Window_MessageLog', 'FwemF', 'hide', 'Game_Interpreter_setupChoices', 'convertBackslashCharacters', '_moveDuration', 'prepareForcedPositionEscapeCharacters', 'isWeapon', ')))', '_lastPluginCommandInterpreter', 'NonSupportedTextCodes', 'afwOa', 'iPBcZ', 'event', 'process_VisuMZ_MessageCore_TextCodes_Action', 'MessageWidth', 'Game_Map_initialize', 'gHPHI', 'ParseStateNotetags', 'hasPictureText', 'helpWordWrap', 'rDXHH', '_itemChoiceActorId', 'NameBoxWindowDefaultColor', 'clear', 'wDGfx', 'applyDatabaseAutoColor', '_autoColorActorNames', 'Window_ChoiceList_updatePlacement', 'changeTextSpeed', 'processPreviousColor', 'add', 'VariableID', 'Bengali', 'Greeting', '_currentAutoSize', 'getTextAlignment', '_textDelayCount', 'processCustomWait', 'exit', 'convertNewPageTextStateMacros', '\x1bBOLD[1]', 'itemChoiceActor', 'Spanish', 'onChoice', 'setSkillChoice', 'Window_Options_changeVolume', 'setWaitMode', '#707070', 'match', 'drawing', 'Width', 'RelativePXPY', 'center', 'AddAutoColor', 'ConfigManager_applyData', '<RIGHT>', 'sQPOy', 'setMessageWindowWidth', 'dimColor2', 'easeOut', 'CommonEvent', 'addMessageCoreTextSpeedCommand', 'eraseAllPictureTexts', 'onNewPageMessageCore', 'updateChoiceListHelpWindowPlacement', '<%1>', 'Name', 'message', 'battle\x20party', 'itemChoiceEtypeId', '_itemChoiceAtypeId', 'battleUserName', 'upper\x20right', 'realPictureId', 'VisuMZ_0_CoreEngine', 'up-right', 'innerWidth', 'up\x20left', 'Languages.csv', 'Вау', 'lower\x20center', '_messageOffsetY', 'messageCoreLocalization', 'atypeId', 'Bonjour', 'Bitmap_drawText', 'applyMoveEasing', 'CreateAutoColorFor', 'process_VisuMZ_MessageCore_TextMacros', 'Window_Base_processControlCharacter', '_nameBoxWindow', 'textSizeEx', 'ParseSkillNotetags', '_helpWindow', 'bSZvD', 'choices', 'EVTXQ', '_itemChoiceEtypeId', 'length', '_itemChoiceWtypeId', 'down-center', 'mwVBS', 'Game_System_initialize', 'pEicW', 'Merhaba', 'LdIcg', 'Window_ChoiceList_callCancelHandler', 'COLORLOCK', 'systemColor', 'trim', 'OffsetY', 'clearCommandList', 'toLowerCase', 'PictureTextErase', 'processFontChangeBold', 'updateNameBoxMove', 'updateTransform', 'lastGainedObjectName', 'ParseWeaponNotetags', 'Zwwxw', '8qHMhPO', 'CPnkc', 'setChoiceListMaxColumns', 'process_VisuMZ_MessageCore_AutoColor', 'updateMessageCommonEvents', 'createTextState', 'MaxCols', 'orange', 'makeFontBigger', 'getChoiceMessageDistance', 'faceName', '\x1bWrapBreak[0]', '_messageCommonEvents', '\x1bTEXTALIGNMENT[3]', 'processStoredAutoColorChanges', 'list', 'setTextAlignment', 'isOptionValid', 'remove', 'SelectArmor', 'resetRect', 'ChoiceWindowDistance', 'makeDeepCopy', 'CheckCompatibility', 'CENTERPICTURE', 'requestChoiceForegroundImage', '\x5c%1', 'plCHK', 'map\x20event', 'currentCommand', 'outputWidth', 'autoPositionOffsetX', 'surprise', 'easeIn', 'changeVisuMzTextLocale', 'addCommand', 'iwPrM', 'MaxRows', '2453391yCNDxC', 'return\x20\x27', 'setChoiceListMinChoiceWidth', 'padding', 'makeCommandListScriptCall', 'isSkillHidden', 'createChoiceListHelpWindow', 'updateAutoPosition', 'upper\x20left', 'charAt', 'setMessageWindowWordWrap', 'uppercenter', 'Adiós', 'Chinese(Traditional)', '</RIGHT>', '_autoPositionTarget', 'Window_Message_processEscapeCharacter', 'OSHKl', 'substring', 'MinWidth', 'ciCJL', 'Unnamed.ttf', '_pictureTextHeight', 'biGNq', 'NUxPF', 'isAutoColorAffected', 'VisuMZ_1_EventsMoveCore', 'wRbeG', 'ZSCOv', 'TextColor%1', 'convertButtonAssistEscapeCharacters', 'erasePicture', 'lower-left', 'Ha\x20det', '_moveTargetWidth', 'Window_Message_terminateMessage', 'reduce', 'messageWordWrap', 'oYwsk', 'clearPictureTextRefresh', 'loadGameFonts', 'middleright', 'down-right', 'xBwkr', 'getMessageWindowXyOffsets', 'down-left', 'apply', '_spriteset', 'powerUpColor', 'isPlaytest', 'ParseAddedText', 'itemBackColor1', 'choiceTextAlign', 'addGeneralOptions', 'textSizeExWordWrap', '_wordWrap', 'databaseObjectName', 'pagedown', '_commonEventId', 'qsjEt', 'textLocale', 'addMessageCoreLocalizationCommand', 'setHelpWindowWordWrap', 'setPositionType', '_moveEasingType', 'setLastGainedItemData', 'Sprite_Picture_update', 'ARRAYNUM', 'setChoiceListLineHeight', 'setMessageWindowRows', 'map', 'convertVariableEscapeCharacters', '#fbaf5d', 'type', 'outlineWidth', 'contents', 'Wauw', 'clearChoiceHelpDescriptions', 'getChoiceListMinChoiceWidth', '</CENTER>', 'windowX', 'requestPictureTextRefreshAll', 'Game_Map_setupEvents', 'show', 'kuQxo', 'quantity', 'skill', 'Arrivederci', 'setSpeakerName', 'commandName', 'Window_Help_refresh', 'SWITCHES', 'data/', 'Window_Base_changeTextColor', 'LineBreakSpace', 'maxCommands', 'initTextAlignement', 'ZyRhE', 'white', 'ว้าว', 'prepareAutoSizeEscapeCharacters', 'fontItalic', 'updateDimensions', '안녕하세요', 'textWidth', '<BR>', 'CreateAutoColorRegExpListEntries', 'Zbohom', 'EachMessageStart', 'max', 'NameBoxWindowOffsetX', 'innerHeight', 'mainFontSize', 'in\x20order\x20for\x20VisuMZ_1_MessageCore\x20to\x20work.', 'Window_Base_textSizeEx', '_messageOffsetX', '#fff799', '_pictureTextCache', 'eDKvp', 'splice', 'join', '_choices', 'isInputting', 'isChoiceWindow', 'clearFlags', 'outputHeight', 'Good-bye', 'mainFontFace', 'MessageRows', 'Window_Message_isTriggered', 'map\x20player', 'convertTextMacros', '_scriptCall', 'tuMPq', 'GjuZy', 'black', 'HIDE', '_pictureId', 'qhzyj', 'clearAllPictureTexts', 'English', 'Polish', 'getInputButtonString', 'returnPreservedFontSettings', 'ஆஹா', 'Window_NameBox_updatePlacement', 'grey', 'DataManager_loadDatabase', 'Adeus', 'processFsTextCode', 'launchMessageCommonEvent', 'upperright', 'addMessageCoreCommands', '_messagePositionReset', 'cybjp', '_autoSizeRegexp', 'getSkillTypes', 'Game_Party_gainItem', 'getCurrentLanguage', 'application/csv', 'Window_Base_processAllText', 'makeCommandList', 'processMessageCoreEscapeActions', 'CsvFilename', 'yellow', 'battleActionName', 'ALL', 'UNDEFINED!', 'PictureTextChange', 'VisuMZ_3_ActSeqCamera', 'callOkHandler', '\x1bi[%1]', '14ojQlqh', 'isVolumeSymbol', 'WRAPJPBREAK', 'Game_Message_setChoices', 'WeeJt', 'TextManager_message', 'ChoiceWindowProperties', 'La\x20revedere', '_refreshPauseSign', 'processWrapBreak', '_indent', 'registerCommand', 'hHqOX', 'Window_Options_isVolumeSymbol', 'cbJLr', 'BGLZC', 'さようなら', '#6dcff6', 'yhupi', 'liypk', 'attachPictureText', 'JDMGo', '4175VfMxrL', '안녕히\x20가세요', 'contentsBack', 'messageRows', 'Game_Party_initialize', 'convertMessageCoreEscapeReplacements', 'follower', 'Window_Message_synchronizeNameBox', 'HPHQn', 'HXLVh', '3786336iLEzzv', 'Guau', 'PBXMc', 'Γειά\x20σου', 'fXpQV', 'হ্যালো', 'status', 'isBusy', 'updateBitmap', 'Tamil', 'upperleft', 'isOpen', 'createLocalizationCsvFile', 'drawMessageFace', 'WordWrap', 'AtWqK', 'Auf\x20Wiedersehen', 'PictureTextRefresh', 'startY', 'strokeRect', 'paintOpacity', 'VJKuk', 'postConvertEscapeCharacters', 'close', 'वाह', 'Au\x20revoir', 'cancel', '_maxShuffleChoices', 'up-center', 'UMPAz', 'down', 'vUntk', 'JcfHz', 'yQPio', 'startPause', 'ceil', 'Default', 'isSceneBattle', 'Danish', 'processDrawCenteredPicture', '</WORDWRAP>', '_subject', 'right', 'powerDownColor', 'convertLockColorsEscapeCharacters', '%1,\x20does\x20not\x20support\x20attempted\x20text\x20code\x20usage.', 'PICTURE', 'bXxmX', 'move', '_forcedPosition', 'split', 'ParseLocalizationCsv', 'updateAutoSizePosition', 'getMessageWindowRows', 'Waouh', '_pictureTextRefresh', 'index', 'loadDatabase', '</I>', 'ANY', '788094LwgxvW', 'SiHKL', 'makeCommandListShuffle', 'getLastGainedItemData', 'obtainItem', '_moveTargetHeight', 'armor', 'wtsHX', 'iwtmj', 'khaTp', 'STR', 'currentExt', 'taczI', '_textMacroFound', 'drawTextTopAligned', '_target', 'HFrAO', 'VcDJO', 'command357', 'SHOW', 'Window_Options_statusText', 'processNewLine', 'onload', '_pictureTextBuffer', 'ActionJS', 'start\x20.\x5cdata', 'left', 'push', 'XHRyE', '_choiceListHelpWindow', 'convertFontSettingsEscapeCharacters', 'VisuMZ_1_SkillsStatesCore', 'ওহে', 'changePaintOpacity', 'open\x20.\x5cdata', 'xpnpT', 'openLocalizationFolder', '_eventId', '_pictureTextWindow', 'yes', 'Window_Options_addGeneralOptions', 'textCodeCheck', 'AUokY', 'min', '$dataLocalization', 'Uau', 'setChoiceListHelpWindow', 'Hei', 'gradientFillRect', 'uJZJd', 'updateXyOffsets', 'default', 'upcenter', 'hVEev', 'setupNumInput', 'tsnFc', 'centered', 'OpzBA', 'child_process', 'Wah', 'newPage', 'true', 'none', 'instantTextSpeed', 'terminateMessage', 'ENABLE', 'isPressed', '_itemChoiceItypeId', 'calcMoveEasing', '\x1bTEXTALIGNMENT[1]', 'TPVnl', 'processDrawPicture', 'name', 'isWordWrapEnabled', 'fontFace', 'Turkish', '_action', '<LEFT>', 'ConfigManager_makeData', 'lowerleft', 'loadPicture', 'choiceCols', 'clearPictures', '_choiceCancelType', 'TextSpeed', 'fontBold', 'drawItemNumber', 'Enable', '%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.', 'SelectSkill', 'Bitmap_drawTextTopAligned', 'lowerright', 'getPictureText', '_wholeMoveDuration', 'midleft', 'updateMove', 'calcWindowHeight', 'obtainGold', '312618NbDRDg', 'format', 'বিদায়', 'onProcessCharacter', 'TextCodeActions', 'isContinuePrepareShowTextCommands', 'lastGainedObjectIcon', 'processFontChangeItalic', 'Armors', '\x1bi[%1]%2', 'setBackground', 'PictureIDs', '%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.', 'JSON', 'update', 'duMWK', 'bCPhN', 'Portuguese', 'writeFileSync', 'flushTextState', 'downleft', 'TextJS', 'GET', 'includes', 'rzPYm', 'messageWidth', 'AutoColorRegExp', 'Hej', 'WRAPBREAK', 'toUpperCase', 'Window_Base_initialize', 'setupItemChoice', 'autoPositionOffsetY', 'Filename', 'Key', 'tFbvi', 'dHGxv', 'processActorNameAutoColorChanges', 'textSizeExRaw', 'addLoadListener', 'VisuMZ_4_ExtraEnemyDrops\x20needs\x20to\x20be\x20updated\x20', '\x1bI[%1]', 'Game_Map_updateEvents', 'getLanguageName', '_itemChoiceVariableId', 'loadMessageFace', 'applyData', 'TEXTALIGNMENT', 'placeCancelButton', 'BLztI', 'visible', 'responseText', 'maxCols', 'Farewell', 'bind', 'menu', 'rIkwH', 'getChoiceListMaxRows', 'start', 'choiceAlignText', 'registerActorNameAutoColorChanges', '#a186be', 'processAutoColorWords', 'skills', 'blue', 'Window_Message_updatePlacement', 'setChoiceListTextAlign', 'zdQot', 'callCancelHandler', '<WORDWRAP>', 'ShuffleArray', 'getPictureTextBuffer', 'Window_ChoiceList_windowX', 'choiceRows', 'Hoşça\x20kal', 'bgfYt', 'Undefined', 'XjDKY', 'messageWindowRect', '%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.', 'inBattle', 'startWait', 'pageup', 'Scene_Boot_onDatabaseLoaded', '#ffc8e0', 'Olá', '#c69c6d', 'random', 'Norwegian', '_choiceIndexArray', 'convertButtonAssistText', 'JuDGt', '_messageWindow', 'WORD_WRAP_PADDING', 'RZkvv', 'CSV\x20file\x20cannot\x20be\x20created.\x0aPlease\x20enter\x20Playtest\x20mode.\x0a', 'adjustShowChoiceDefault', 'preemptive', 'German', 'onLocalizationXhrError', 'Window_Base_processNewLine', 'blt', 'messagePositionReset', 'preConvertEscapeCharacters', 'setChoices', 'onDatabaseLoaded', 'initialize', 'LnEOU', 'LineHeight', 'isVisuMzLocalizationEnabled', 'initMessageCore', 'getMessageWindowWidth', 'பிரியாவிடை', 'IrmBs', 'clearRect', 'Hallo', 'emerge', 'OffsetX', '\x1bC[%1]%2\x1bPREVCOLOR[0]', 'setHelpWindow', '[0]', 'lrfTG', 'processAllText', 'normalColor', '_textAlignment', 'こんにちは', 'processCharacter', 'KGZmp', 'slice', 'createChoiceListWindow', 'TextMacros', '#ffffff', 'loadLocalization', 'nDGbn', 'isCommandEnabled', 'kXNUg', 'nuSIr', '\x1bITALIC[0]', 'Näkemiin', 'Sprite_Picture_updateBitmap', 'IhfvZ', 'Dutch', 'addContinuousShowTextCommands', 'prepareShowTextFollowups', 'parse', '_cancelButton', 'setupChoices', 'filter', '_relativePosition', 'outlineColor', '_textColorStack', 'yohCp', 'EVAL', 'crisis', 'ChoiceWindowTextAlign', 'UJFFl', 'BOLD', 'Window_Message_clearFlags', 'Weapons', 'TkqSY', 'call', 'setWordWrap', '5116590DBmiLW', '_pictureText', '_index', 'STRUCT', 'xLrGQ', 'green', 'text', 'substr', 'Classes', 'Languages', 'ParseEnemyNotetags', 'WeaponTypeID', 'isSkillTypeMatchForUse', 'nPLVe', '244WfBSIw', 'weapon', 'code', 'processTextAlignmentX', 'gray', 'ARRAYSTR', 'HsflE', 'Game_Screen_clearPictures', 'ChoiceWindowMaxRows', 'drawPictureTextZone', 'Game_Map_refresh', 'open', 'system', 'drawItemContents', 'XQBCb', 'HnnAX', 'overrideMimeType', 'Привет', 'isChoiceVisible', 'drawItem', 'convertChoiceMacros', 'FontChangeValue', 'Cześć', '_moveTargetY', 'midright', 'synchronizeNameBox', 'switchOutTextForLocalization', 'leader', 'description', 'DISABLE', 'faceWidth', 'setChoiceListMaxRows', 'Sbohem', '_textDelay', 'Skills', 'Slovak', 'requestPictureTextRefresh', 'choiceLineHeight', 'CSV\x20file\x20has\x20not\x20been\x20made.\x0a', 'ParseArmorNotetags', 'maxLines', 'anchor', 'processTextAlignmentChange', 'choiceMinWidth', 'postFlushTextState', 'itemRect', 'NameBoxWindowOffsetY', 'AutoColor', '_moveTargetX', 'ITELN', 'onerror', 'updateOverlappingY', 'up\x20right', 'pink', 'Hola', 'isHelpWindowWordWrap', 'setupEvents', 'brown', 'xFoAN', 'processCommonEvent', 'addedWidth', 'COMMONEVENT', 'MessageWindow', 'processControlCharacter', 'isRunning', 'resetPositionX', 'nCANb', 'BtdDG', 'AddOption', 'Italian', 'middlecenter', 'jZOaS', 'FastForwardKey', 'addExtraShowChoices', 'shift', '_MessageCoreSettings', 'Game_Screen_erasePicture', 'EachMessageEnd', 'ySqHU', 'nextEventCode', 'makeItemList', 'middleleft', 'Ahoj', 'xfvKt', 'setPictureTextBuffer', 'choiceDistance', 'itemRectWithPadding', 'requestChoiceBackgroundImage', 'Please\x20restart\x20the\x20game.', 'isChoiceEnabled', 'iMAOQ', 'convertTextAlignmentEscapeCharacters', 'NUM', 'MsgWindowOffsetX', 'convertBaseEscapeCharacters', 'Sopbj', 'getChoiceListTextAlign', '_dimmerSprite', 'PREVCOLOR', 'upper-left', 'StretchDimmedBg', 'CustomFonts', 'upper-right', 'RFumv', 'setColorLock', 'setTextDelay', 'version', 'adjustShowChoiceCancel', 'isMessageWindowWordWrap', 'scale', '\x1bTEXTALIGNMENT[0]', 'Match', 'round', 'defaultColor', 'UaMCz', 'Enemies', 'addChildAt', 'upright', 'forEach', 'needsPictureTextRefresh', '\x1bTEXTALIGNMENT[2]', 'itemChoiceAtypeId', 'replace', 'Greek', 'xCgpV', 'preFlushTextState', 'setArmorChoice', 'ActorID', 'LgayD', 'processColorLock', 'loadCustomFontsMessageCore', 'WAIT', 'processPxTextCode', 'ZJVhr', 'indexOf', 'jXXNf', '<CENTER>', 'Hejdå', 'EndPadding', 'onLocalizationXhrLoad', 'changeVolume', 'qCazN', 'makeData', 'Romanian', 'registerSelfEvent', 'Hindi', 'addWrapBreakAfterPunctuation', 'visuMzTextLocaleStatusText', 'activate', 'qDTHH', 'partyMemberName', 'SplitJpCnCharacters', 'map\x20party', 'convertHardcodedEscapeReplacements', 'prepareShowTextPluginCommandFollowups', 'TextCodeReplace', 'Game_Interpreter_PluginCommand', '\x1bCOLORLOCK[1]', 'windowPadding', 'prototype', 'changeValue', 'textCodeResult', 'dwOAV', 'setup', 'red', 'Scene_Message_createChoiceListWindow', 'refresh', 'SortObjectByKeyLength', 'Instant', 'getChoiceIndent', 'Type', '_resetRect', 'updateHelp', 'map\x20actor', 'dCGcd', 'getStartingChoiceWidth', 'textSpeed', 'mskRv', 'BXnmp', 'Zefnw', 'Would\x20you\x20like\x20the\x20plugin\x20to\x20create\x20the\x20base\x20CSV\x20file?\x0a\x0a', 'Russian', 'ARRAYSTRUCT', 'oOVQt', 'downcenter', '_macroBypassWordWrap', 'doQsC', 'สวัสดี', 'clamp', 'processPyTextCode', 'makeSkillList', 'isRTL', 'choiceIndexArray', 'ConvertTextAutoColorRegExpFriendly', 'DgESa', '_itemChoiceStypeId', 'sort', 'MESSAGE_CORE_PLUGIN_NAME', 'UKahH', 'updatePlacement', 'processAutoSize', 'setLastPluginCommandInterpreter', 'lineHeight', 'nNBOk', 'getPreservedFontSettings', 'every', 'height', 'getChoiceListLineHeight', 'resetWordWrap', 'Distance', 'followers', 'textSpeedStatusText', 'lower\x20right', 'Padding', 'getChoiceListMaxColumns', 'Halo', 'hRiSk', 'Window_ItemList_drawItemNumber', 'rtl', 'currencyUnit', '_pictures', 'addedHeight', 'Czech', 'mainModule', 'SelectWeapon', 'WXhDP', 'வணக்கம்', 'startX', 'textColor', 'resetTextColor', 'drawPictureText', 'fontSize', 'SkillTypeID', 'getConfigValue', 'enabled', 'ParseAllNotetags', 'FmdyR', 'OQlDe', 'isTriggered', 'ConvertParams', 'clampPlacementPosition', '_autoSizeCheck', 'VMWzX', 'escapeStart', 'battleTargetName', 'processAutoPosition', 'VisuMZ_4_ExtraEnemyDrops', 'clearActorNameAutoColor', 'refreshDimmerBitmap', 'applyChoiceHelpDescriptions', 'ParseItemNotetags', 'parameters', 'parseLocalizedText', 'FontFamily', 'updateEvents', 'Scene_Options_maxCommands', '_choiceListWindow', '_colorLock', 'Qgnbd', 'CWbJP', '_targets', 'resizePictureText', '_interpreter', 'updateOffsetPosition', 'KgXRJ', 'Finnish', 'KVPbB', 'MessageTextDelay', 'choiceListHelpWindowRect', 'Localization', 'drawBackPicture', 'value', 'YxAQC', 'MessageWindowProperties', 'gainItem', 'maxChoiceWidth', 'HsnMx', '\x1bWrapJpBreak[0]', 'setRelativePosition', '_centerMessageWindow', 'tleSM', 'commandSymbol', 'up\x20center', 'obtainEscapeParam', 'contentsHeight', 'changeOutlineColor', 'boxWidth', 'drawBackCenteredPicture', 'some', 'Window_NameBox_refresh', 'convertEscapeCharacters', 'getLanguageAt', 'isArmor', 'choiceCancelType', 'itemHeight', 'drawCustomBackgroundColor', 'isSceneMap', 'prepareShowTextCommand', 'Chinese(Simplified)', 'choice', 'States', 'TextStr', 'String_format', 'Window_ChoiceList', 'DefaultLocale', 'lastGainedObjectQuantity', 'createContents', '_data', 'getRandomTextFromPool', 'convertShowChoiceEscapeCodes', 'adjustShowChoiceExtension', 'processFailsafeChoice', 'return\x200', 'setFaceImage', 'obtainEscapeString', 'prepareWordWrapEscapeCharacters', 'Window_Base_update', 'Settings', 'changeTextColor', 'itemPadding', 'boxHeight', 'constructor', 'isColorLocked', 'anchorPictureText', 'UyNWC', 'GEeQU', 'messageCoreWindowX', 'windowWidth', '</LEFT>', 'Wgiho', 'getPictureTextData', 'zZNaj', 'needsNewPage', 'CreateAutoColorRegExpLists', 'MoojQ', 'VMAKK', 'members', '#acacac', 'getLocalizedText', 'mRJsR', 'stringify', 'itemChoiceItypeId', 'maxShuffleChoices', 'FontBiggerCap', 'ChoiceWindowMinWidth', 'width', '\x1bTEXTALIGNMENT', 'process_VisuMZ_MessageCore_TextCodes_Replace', 'Actors', '_choiceHelpDescriptions', 'pcaDR', 'itemChoiceStypeId', 'setWeaponChoice', 'send', 'obtainExp', '</B>']; _0x5b3a = function () { return _0x134eed; }; return _0x5b3a(); } var label = _0x137c0c(0x4bf), tier = tier || 0x0, dependencies = [], pluginData = $plugins[_0x137c0c(0x2f8)](function (_0x69d159) { const _0xabe04f = _0x137c0c; return _0x69d159[_0xabe04f(0x1cd)] && _0x69d159[_0xabe04f(0x331)][_0xabe04f(0x27c)]('[' + label + ']'); })[0x0]; VisuMZ[label][_0x137c0c(0x452)] = VisuMZ[label][_0x137c0c(0x452)] || {}, VisuMZ['ConvertParams'] = function (_0x214dab, _0x7846fd) { const _0x29f3d9 = _0x137c0c; for (const _0x41cee7 in _0x7846fd) { if (_0x29f3d9(0x363) !== _0x29f3d9(0x363)) this['y'] = _0x59d219[_0x29f3d9(0x4ae)]((_0x36f1cc - this[_0x29f3d9(0x3e3)] - _0x1624de) / 0x2); else { if (_0x41cee7[_0x29f3d9(0x504)](/(.*):(.*)/i)) { if ('dHGxv' === _0x29f3d9(0x289)) { const _0x54a2da = String(RegExp['$1']), _0x488271 = String(RegExp['$2'])['toUpperCase']()[_0x29f3d9(0xca)](); let _0x581442, _0x1580ae, _0x40e887; switch (_0x488271) { case _0x29f3d9(0x371): _0x581442 = _0x7846fd[_0x41cee7] !== '' ? Number(_0x7846fd[_0x41cee7]) : 0x0; break; case _0x29f3d9(0x13e): _0x1580ae = _0x7846fd[_0x41cee7] !== '' ? JSON[_0x29f3d9(0x2f5)](_0x7846fd[_0x41cee7]) : [], _0x581442 = _0x1580ae[_0x29f3d9(0x141)](_0xdffceb => Number(_0xdffceb)); break; case _0x29f3d9(0x2fd): _0x581442 = _0x7846fd[_0x41cee7] !== '' ? eval(_0x7846fd[_0x41cee7]) : null; break; case 'ARRAYEVAL': _0x1580ae = _0x7846fd[_0x41cee7] !== '' ? JSON[_0x29f3d9(0x2f5)](_0x7846fd[_0x41cee7]) : [], _0x581442 = _0x1580ae[_0x29f3d9(0x141)](_0x3b5dc1 => eval(_0x3b5dc1)); break; case _0x29f3d9(0x272): _0x581442 = _0x7846fd[_0x41cee7] !== '' ? JSON[_0x29f3d9(0x2f5)](_0x7846fd[_0x41cee7]) : ''; break; case 'ARRAYJSON': _0x1580ae = _0x7846fd[_0x41cee7] !== '' ? JSON[_0x29f3d9(0x2f5)](_0x7846fd[_0x41cee7]) : [], _0x581442 = _0x1580ae[_0x29f3d9(0x141)](_0x4dd36f => JSON[_0x29f3d9(0x2f5)](_0x4dd36f)); break; case _0x29f3d9(0x493): _0x581442 = _0x7846fd[_0x41cee7] !== '' ? new Function(JSON[_0x29f3d9(0x2f5)](_0x7846fd[_0x41cee7])) : new Function(_0x29f3d9(0x44d)); break; case 'ARRAYFUNC': _0x1580ae = _0x7846fd[_0x41cee7] !== '' ? JSON[_0x29f3d9(0x2f5)](_0x7846fd[_0x41cee7]) : [], _0x581442 = _0x1580ae[_0x29f3d9(0x141)](_0x4c3b43 => new Function(JSON[_0x29f3d9(0x2f5)](_0x4c3b43))); break; case _0x29f3d9(0x20d): _0x581442 = _0x7846fd[_0x41cee7] !== '' ? String(_0x7846fd[_0x41cee7]) : ''; break; case _0x29f3d9(0x31a): _0x1580ae = _0x7846fd[_0x41cee7] !== '' ? JSON['parse'](_0x7846fd[_0x41cee7]) : [], _0x581442 = _0x1580ae['map'](_0x478f29 => String(_0x478f29)); break; case _0x29f3d9(0x30a): _0x40e887 = _0x7846fd[_0x41cee7] !== '' ? JSON['parse'](_0x7846fd[_0x41cee7]) : {}, _0x214dab[_0x54a2da] = {}, VisuMZ['ConvertParams'](_0x214dab[_0x54a2da], _0x40e887); continue; case _0x29f3d9(0x3cb): _0x1580ae = _0x7846fd[_0x41cee7] !== '' ? JSON[_0x29f3d9(0x2f5)](_0x7846fd[_0x41cee7]) : [], _0x581442 = _0x1580ae['map'](_0x3ae167 => VisuMZ['ConvertParams']({}, JSON[_0x29f3d9(0x2f5)](_0x3ae167))); break; default: continue; }_0x214dab[_0x54a2da] = _0x581442; } else { const _0xcbcdeb = _0x57442c[_0x29f3d9(0x4bf)][_0x29f3d9(0x251)][_0x29f3d9(0x305)](this); return _0xd0cda1[_0x29f3d9(0x2d2)]() && (_0xcbcdeb[_0x29f3d9(0x137)] = this[_0x29f3d9(0x137)]), _0xcbcdeb[_0x29f3d9(0x3c5)] = this[_0x29f3d9(0x3c5)], _0xcbcdeb; } } } } return _0x214dab; }, (_0x4adb59 => { const _0x5e8e4e = _0x137c0c, _0x231524 = _0x4adb59[_0x5e8e4e(0x24b)]; for (const _0x8f2679 of dependencies) { if (!Imported[_0x8f2679]) { if (_0x5e8e4e(0x429) !== _0x5e8e4e(0x15c)) { alert(_0x5e8e4e(0x271)['format'](_0x231524, _0x8f2679)), SceneManager[_0x5e8e4e(0x4fa)](); break; } else { const _0xbc0c8b = _0x779b2a[_0x5e8e4e(0x46b)](); _0x2ca95c = _0x4bc7e5[_0x5e8e4e(0x1ea)](_0x3fe2bb[_0x5e8e4e(0x22e)](_0xbc0c8b, _0xdd430f['length']) / this[_0x5e8e4e(0x299)]()); } } } const _0x27a5c1 = _0x4adb59['description']; if (_0x27a5c1[_0x5e8e4e(0x504)](/\[Version[ ](.*?)\]/i)) { if (_0x5e8e4e(0x34f) === _0x5e8e4e(0x34f)) { const _0x58f97f = Number(RegExp['$1']); if (_0x58f97f !== VisuMZ[label][_0x5e8e4e(0x37f)]) { if (_0x5e8e4e(0x4a3) !== _0x5e8e4e(0x4a3)) { if (_0x5573ac) { let _0x3fa973 = this[_0x5e8e4e(0x3f1)][_0x5e8e4e(0x39b)](_0x532660); this[_0x5e8e4e(0x339)](_0x3fa973); } } else alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x5e8e4e(0x266)](_0x231524, _0x58f97f)), SceneManager[_0x5e8e4e(0x4fa)](); } } else { let _0x1349bd = this['_pictures']['indexOf'](_0x4f362c); this[_0x5e8e4e(0x339)](_0x1349bd); } } if (_0x27a5c1[_0x5e8e4e(0x504)](/\[Tier[ ](\d+)\]/i)) { const _0x4ae270 = Number(RegExp['$1']); if (_0x4ae270 < tier) { if (_0x5e8e4e(0x136) !== _0x5e8e4e(0x136)) return _0x55a6be[_0x5e8e4e(0x29e)](); else alert(_0x5e8e4e(0x2b4)[_0x5e8e4e(0x266)](_0x231524, _0x4ae270, tier)), SceneManager[_0x5e8e4e(0x4fa)](); } else { if (_0x5e8e4e(0x23a) !== _0x5e8e4e(0xf0)) tier = Math[_0x5e8e4e(0x168)](_0x4ae270, tier); else { const _0x7fff41 = _0x166f25['choicePositionType'](); if (_0x7fff41 === 0x1) return (_0x2484a3[_0x5e8e4e(0x433)] - this[_0x5e8e4e(0x45c)]()) / 0x2; else return _0x7fff41 === 0x2 ? this[_0x5e8e4e(0x2c1)]['x'] + this[_0x5e8e4e(0x2c1)]['width'] - this[_0x5e8e4e(0x45c)]() : this[_0x5e8e4e(0x2c1)]['x']; } } } VisuMZ[_0x5e8e4e(0x404)](VisuMZ[label][_0x5e8e4e(0x452)], _0x4adb59[_0x5e8e4e(0x410)]); })(pluginData), PluginManager['registerCommand'](pluginData[_0x137c0c(0x24b)], _0x137c0c(0xea), _0x5609cb => { const _0x44ba97 = _0x137c0c; VisuMZ['ConvertParams'](_0x5609cb, _0x5609cb); const _0x10f0de = Number(_0x5609cb[_0x44ba97(0x3e6)]) || 0x0; $gameSystem['setChoiceMessageDistance'](_0x10f0de); }), PluginManager[_0x137c0c(0x1b2)](pluginData[_0x137c0c(0x24b)], _0x137c0c(0x1ad), _0x4301f3 => { const _0x44e4b0 = _0x137c0c; VisuMZ[_0x44e4b0(0x404)](_0x4301f3, _0x4301f3); const _0x410e14 = _0x4301f3[_0x44e4b0(0x2d1)] || $gameSystem[_0x44e4b0(0x3e4)]() || 0x1, _0x15abea = _0x4301f3[_0x44e4b0(0x10e)] ?? 0x60, _0x3294ba = _0x4301f3[_0x44e4b0(0xfa)] || $gameSystem[_0x44e4b0(0x29e)]() || 0x1, _0xa64a1c = _0x4301f3[_0x44e4b0(0xdb)] || $gameSystem[_0x44e4b0(0x3eb)]() || 0x1, _0x556750 = _0x4301f3['TextAlign'][_0x44e4b0(0xcd)]() || _0x44e4b0(0x236); $gameSystem[_0x44e4b0(0x13f)](_0x410e14), $gameSystem[_0x44e4b0(0xfd)](_0x15abea), $gameSystem[_0x44e4b0(0x334)](_0x3294ba), $gameSystem[_0x44e4b0(0xd7)](_0xa64a1c), $gameSystem[_0x44e4b0(0x2a7)](_0x556750); }), PluginManager[_0x137c0c(0x1b2)](pluginData[_0x137c0c(0x24b)], _0x137c0c(0x426), _0x1cc25c => { const _0x5e99d8 = _0x137c0c; VisuMZ['ConvertParams'](_0x1cc25c, _0x1cc25c); const _0x1362ce = _0x1cc25c['Rows'] || $gameSystem[_0x5e99d8(0x1fc)]() || 0x1, _0x2a2a46 = _0x1cc25c[_0x5e99d8(0x506)] || $gameSystem[_0x5e99d8(0x2d4)]() || 0x1; $gameTemp[_0x5e99d8(0x42c)] = !![]; const _0x89e34f = _0x1cc25c[_0x5e99d8(0x1d5)][_0x5e99d8(0xcd)](); $gameSystem[_0x5e99d8(0x140)](_0x1362ce), $gameSystem[_0x5e99d8(0x96)](_0x2a2a46);[_0x5e99d8(0x240), _0x5e99d8(0x4ca)][_0x5e99d8(0x27c)](_0x89e34f) && $gameSystem[_0x5e99d8(0x105)](eval(_0x89e34f)); const _0x5aaff6 = SceneManager[_0x5e99d8(0x481)][_0x5e99d8(0x2c1)]; if (_0x5aaff6) { if ('tleSM' !== _0x5e99d8(0x42d)) { const _0x57cb50 = this[_0x5e99d8(0x421)](), _0x1729fc = new _0x3c50cf(_0x57cb50); _0x1729fc[_0x5e99d8(0x4d5)](), this[_0x5e99d8(0x415)][_0x5e99d8(0x2dc)](_0x1729fc), this[_0x5e99d8(0x2c1)]['setChoiceListHelpWindow'](_0x1729fc), this['addWindow'](_0x1729fc), this['_choiceListHelpWindow'] = _0x1729fc; } else _0x5aaff6['resetWordWrap'](), _0x5aaff6[_0x5e99d8(0x161)](), _0x5aaff6[_0x5e99d8(0x447)](); } }), PluginManager['registerCommand'](pluginData[_0x137c0c(0x24b)], 'MessageWindowXyOffsets', _0x5949b5 => { const _0x523abf = _0x137c0c; VisuMZ[_0x523abf(0x404)](_0x5949b5, _0x5949b5), $gameSystem['setMessageWindowXyOffsets'](_0x5949b5[_0x523abf(0x2da)], _0x5949b5[_0x523abf(0xcb)]); const _0x32e76d = SceneManager[_0x523abf(0x481)][_0x523abf(0x2c1)]; _0x32e76d && (_0x32e76d['resetWordWrap'](), _0x32e76d[_0x523abf(0x161)](), _0x32e76d[_0x523abf(0x447)]()); }), PluginManager[_0x137c0c(0x1b2)](pluginData[_0x137c0c(0x24b)], _0x137c0c(0x3f5), _0x241bbe => { const _0x22c48c = _0x137c0c; VisuMZ[_0x22c48c(0x404)](_0x241bbe, _0x241bbe), $gameMessage[_0x22c48c(0x475)](_0x241bbe[_0x22c48c(0x4f3)] || 0x0, _0x241bbe[_0x22c48c(0x312)] || 0x0); const _0x1963df = $gameTemp['getLastPluginCommandInterpreter'](); if (_0x1963df) _0x1963df['setWaitMode']('message'); }), PluginManager[_0x137c0c(0x1b2)](pluginData['name'], 'SelectArmor', _0x1ceb34 => { const _0x26cc82 = _0x137c0c; VisuMZ[_0x26cc82(0x404)](_0x1ceb34, _0x1ceb34), $gameMessage['setArmorChoice'](_0x1ceb34[_0x26cc82(0x4f3)] || 0x0, _0x1ceb34['ArmorTypeID'] || 0x0, _0x1ceb34[_0x26cc82(0x4bb)] || 0x0); const _0x3d9f28 = $gameTemp['getLastPluginCommandInterpreter'](); if (_0x3d9f28) _0x3d9f28[_0x26cc82(0x502)](_0x26cc82(0xa0)); }), PluginManager[_0x137c0c(0x1b2)](pluginData[_0x137c0c(0x24b)], _0x137c0c(0x25c), _0x4590e5 => { const _0x2e6c9c = _0x137c0c; VisuMZ[_0x2e6c9c(0x404)](_0x4590e5, _0x4590e5), $gameMessage[_0x2e6c9c(0x500)](_0x4590e5[_0x2e6c9c(0x4f3)] || 0x0, _0x4590e5['ActorID'] || 0x0, _0x4590e5[_0x2e6c9c(0x3fd)] || 0x0); const _0x52f91d = $gameTemp['getLastPluginCommandInterpreter'](); if (_0x52f91d) _0x52f91d[_0x2e6c9c(0x502)]('message'); }), PluginManager[_0x137c0c(0x1b2)](pluginData['name'], _0x137c0c(0x1a3), _0x342f7d => { const _0x165b04 = _0x137c0c; VisuMZ[_0x165b04(0x404)](_0x342f7d, _0x342f7d); const _0x4fa673 = _0x342f7d[_0x165b04(0x270)] || [], _0x117296 = _0x342f7d[_0x165b04(0x3ea)] || 0x0, _0x128e70 = [_0x165b04(0x1d1), 'up', _0x165b04(0x192), _0x165b04(0x21d), _0x165b04(0x508), _0x165b04(0x1f1), _0x165b04(0x252), 'down', _0x165b04(0x25e)]; for (const _0x59a922 of _0x4fa673) { if ('TzVSJ' !== _0x165b04(0x4ad)) { $gameScreen['setPictureTextBuffer'](_0x59a922, _0x117296); for (const _0x2036a5 of _0x128e70) { if (_0x165b04(0x274) !== _0x165b04(0x3f6)) { if (_0x342f7d[_0x2036a5] === undefined) continue; $gameScreen[_0x165b04(0x483)](_0x59a922, _0x342f7d[_0x2036a5], _0x2036a5); } else _0x3bb810[_0x165b04(0x4bf)][_0x165b04(0x18e)][_0x165b04(0x305)](this), this['loadLocalization'](); } } else { const _0x473962 = _0x14adaf[_0x165b04(0x137)] || 'English'; return this['getLanguageName'](_0x473962); } } }), PluginManager[_0x137c0c(0x1b2)](pluginData[_0x137c0c(0x24b)], _0x137c0c(0xce), _0x2942a8 => { const _0x63d87e = _0x137c0c; VisuMZ[_0x63d87e(0x404)](_0x2942a8, _0x2942a8); const _0xd2214c = _0x2942a8[_0x63d87e(0x270)] || []; for (const _0x358db8 of _0xd2214c) { if ('AvZwL' === 'AvZwL') $gameScreen['eraseAllPictureTexts'](_0x358db8), $gameScreen[_0x63d87e(0x4c4)](_0x358db8); else return this[_0x63d87e(0xc0)] || 0x0; } }), PluginManager['registerCommand'](pluginData[_0x137c0c(0x24b)], _0x137c0c(0x1d8), _0x5a6bda => { const _0x1b0ce0 = _0x137c0c; $gameScreen[_0x1b0ce0(0x14c)](); }), VisuMZ[_0x137c0c(0x4bf)][_0x137c0c(0x2b8)] = Scene_Boot['prototype'][_0x137c0c(0x2ce)], Scene_Boot['prototype'][_0x137c0c(0x2ce)] = function () { const _0x32ce05 = _0x137c0c; VisuMZ['MessageCore']['Scene_Boot_onDatabaseLoaded']['call'](this), VisuMZ[_0x32ce05(0x4bf)]['CheckCompatibility'](), this[_0x32ce05(0x4e1)](), this[_0x32ce05(0x470)](), this[_0x32ce05(0xb5)](), this[_0x32ce05(0xd8)](); }, VisuMZ['MessageCore']['CheckCompatibility'] = function () { const _0x2bfdec = _0x137c0c; if (Imported[_0x2bfdec(0x40b)] && VisuMZ['ExtraEnemyDrops'][_0x2bfdec(0x37f)] < 1.09) { if (_0x2bfdec(0x37c) !== 'WDLwx') { let _0xa9ce3a = ''; _0xa9ce3a += _0x2bfdec(0x28d), _0xa9ce3a += _0x2bfdec(0x16c), alert(_0xa9ce3a), SceneManager[_0x2bfdec(0x4fa)](); } else this['_lastGainedItemData'][_0x2bfdec(0x144)] = 0x2; } }, VisuMZ['MessageCore'][_0x137c0c(0x3bc)] = function (_0x2b2b3e) { const _0x4d8faf = _0x137c0c, _0x2bedb7 = VisuMZ[_0x4d8faf(0x4bf)][_0x4d8faf(0x452)][_0x2b2b3e]; _0x2bedb7['sort']((_0x41eae8, _0x5e873a) => { const _0x14db1f = _0x4d8faf; if (!_0x41eae8 || !_0x5e873a) return -0x1; return _0x5e873a[_0x14db1f(0x384)][_0x14db1f(0xbf)] - _0x41eae8[_0x14db1f(0x384)][_0x14db1f(0xbf)]; }); }, Scene_Boot['prototype']['process_VisuMZ_MessageCore_TextCodes_Action'] = function () { const _0x4a295e = _0x137c0c; VisuMZ['MessageCore'][_0x4a295e(0x3bc)]('TextCodeActions'); for (const _0x4c8025 of VisuMZ[_0x4a295e(0x4bf)][_0x4a295e(0x452)]['TextCodeActions']) { if (_0x4a295e(0x1ab) === 'WeeJt') { _0x4c8025[_0x4a295e(0x384)] = _0x4c8025[_0x4a295e(0x384)][_0x4a295e(0x282)](), _0x4c8025['textCodeCheck'] = new RegExp('\x1b' + _0x4c8025[_0x4a295e(0x384)], 'gi'), _0x4c8025[_0x4a295e(0x3b6)] = '\x1b' + _0x4c8025['Match']; if (_0x4c8025[_0x4a295e(0x3bf)] === '') _0x4c8025[_0x4a295e(0x3b6)] += _0x4a295e(0x2dd); } else { _0x5a3a6e = _0x5afa22[_0x4a295e(0x38f)](/\x1b!/g, ''), _0x337303 = _0x12a08e['replace'](/\x1b\|/g, ''), _0x45a147 = _0x2b6f59[_0x4a295e(0x38f)](/\x1b\./g, ''); const _0x229d9e = this[_0x4a295e(0xda)](_0x220332, 0x0, 0x0, 0x0), _0x5a9e14 = this['getPreservedFontSettings'](); return _0x229d9e[_0x4a295e(0x505)] = ![], this[_0x4a295e(0x2df)](_0x229d9e), this['returnPreservedFontSettings'](_0x5a9e14), { 'width': _0x229d9e[_0x4a295e(0xf3)], 'height': _0x229d9e['outputHeight'] }; } } }, Scene_Boot[_0x137c0c(0x3b4)][_0x137c0c(0x470)] = function () { const _0x50ee0c = _0x137c0c; VisuMZ['MessageCore'][_0x50ee0c(0x3bc)]('TextCodeReplace'); for (const _0x3980d4 of VisuMZ[_0x50ee0c(0x4bf)][_0x50ee0c(0x452)][_0x50ee0c(0x3b0)]) { _0x3980d4[_0x50ee0c(0x22c)] = new RegExp('\x1b' + _0x3980d4[_0x50ee0c(0x384)] + _0x3980d4[_0x50ee0c(0x3bf)], 'gi'); if (_0x3980d4[_0x50ee0c(0x442)] !== '' && _0x3980d4['TextStr'] !== _0x50ee0c(0x2b1)) _0x3980d4['textCodeResult'] = new Function(_0x50ee0c(0xfc) + _0x3980d4[_0x50ee0c(0x442)][_0x50ee0c(0x38f)](/\\/g, '\x1b') + '\x27'); else { if ('PPGnP' !== 'QFwGl') _0x3980d4['textCodeResult'] = _0x3980d4['TextJS']; else return ![]; } } }, Scene_Boot['prototype']['process_VisuMZ_MessageCore_TextMacros'] = function () { const _0x5ad190 = _0x137c0c; for (const _0x14efbf of VisuMZ[_0x5ad190(0x4bf)][_0x5ad190(0x452)][_0x5ad190(0x2e7)]) { _0x14efbf[_0x5ad190(0x22c)] = new RegExp('\x5c[' + _0x14efbf[_0x5ad190(0x384)] + '\x5c]', 'gi'); if (_0x14efbf[_0x5ad190(0x442)] !== '' && _0x14efbf[_0x5ad190(0x442)] !== _0x5ad190(0x2b1)) { let _0x1f4ce6 = _0x14efbf[_0x5ad190(0x442)]; _0x1f4ce6 = _0x1f4ce6[_0x5ad190(0x38f)](/\\/g, '\x1b'), _0x1f4ce6 = _0x1f4ce6[_0x5ad190(0x38f)]('\x27', '\x5c\x27'), _0x1f4ce6 = _0x1f4ce6[_0x5ad190(0x38f)]('\x22', '\x5c\x22'), _0x14efbf[_0x5ad190(0x3b6)] = new Function(_0x5ad190(0xfc) + _0x1f4ce6 + '\x27'); } else _0x14efbf[_0x5ad190(0x3b6)] = _0x14efbf['TextJS']; } }, Scene_Boot[_0x137c0c(0x3b4)]['process_VisuMZ_MessageCore_AutoColor'] = function () { const _0x5b7804 = _0x137c0c, _0x69a288 = VisuMZ[_0x5b7804(0x4bf)]['Settings'][_0x5b7804(0x344)]; !VisuMZ[_0x5b7804(0x400)] && (_0x5b7804(0x2b2) === _0x5b7804(0x2b2) ? (VisuMZ[_0x5b7804(0x4bf)][_0x5b7804(0x509)]($dataClasses, _0x69a288[_0x5b7804(0x30f)]), VisuMZ[_0x5b7804(0x4bf)][_0x5b7804(0x509)]($dataSkills, _0x69a288['Skills']), VisuMZ['MessageCore']['AddAutoColor']($dataItems, _0x69a288[_0x5b7804(0x480)]), VisuMZ['MessageCore']['AddAutoColor']($dataWeapons, _0x69a288[_0x5b7804(0x303)]), VisuMZ[_0x5b7804(0x4bf)][_0x5b7804(0x509)]($dataArmors, _0x69a288[_0x5b7804(0x26d)]), VisuMZ[_0x5b7804(0x4bf)][_0x5b7804(0x509)]($dataEnemies, _0x69a288[_0x5b7804(0x388)]), VisuMZ[_0x5b7804(0x4bf)][_0x5b7804(0x509)]($dataStates, _0x69a288[_0x5b7804(0x441)])) : (this['width'] = _0x2b8403['min'](this['width'], _0x2601d1['width']), this['height'] = _0x22f82a[_0x5b7804(0x22e)](this['height'], _0x564c25['height']))), VisuMZ['MessageCore']['CreateAutoColorRegExpLists'](); }, VisuMZ[_0x137c0c(0x4bf)]['AutoColorBypassList'] = ['V', 'N', 'P', 'C', 'I', 'PX', 'PY', 'G', '{', '}', '<', '>', 'FS', '\x5c', '$', '.', '|', '!', '<', '>', '^', '<B>', _0x137c0c(0x478), '<I>', _0x137c0c(0x201), _0x137c0c(0x250), _0x137c0c(0x45d), _0x137c0c(0x39d), _0x137c0c(0x14a), _0x137c0c(0x94), _0x137c0c(0x109), '<COLORLOCK>', '</COLORLOCK>', '(((', _0x137c0c(0x4db), _0x137c0c(0x2aa), _0x137c0c(0x1ef), _0x137c0c(0x164), '<LINE\x20BREAK>', _0x137c0c(0x1f5), 'CENTERPICTURE', _0x137c0c(0x352), 'WAIT', _0x137c0c(0x216), _0x137c0c(0x183), _0x137c0c(0x244), _0x137c0c(0x332), 'SWITCH', _0x137c0c(0x156), _0x137c0c(0x1a1), _0x137c0c(0x202)], VisuMZ[_0x137c0c(0x4bf)][_0x137c0c(0x509)] = function (_0x552c53, _0x91a615) { const _0x4d05e0 = _0x137c0c; if (_0x91a615 <= 0x0) return; const _0x30fc5a = _0x552c53; for (const _0x41a529 of _0x30fc5a) { if (!_0x41a529) continue; VisuMZ[_0x4d05e0(0x4bf)]['CreateAutoColorFor'](_0x41a529, _0x91a615); } }, VisuMZ[_0x137c0c(0x4bf)][_0x137c0c(0x462)] = function () { const _0x48a327 = _0x137c0c; VisuMZ[_0x48a327(0x4bf)]['AutoColorRegExp'] = []; for (let _0x9cb0aa = 0x1; _0x9cb0aa <= 0x1f; _0x9cb0aa++) { if ('AtWqK' === _0x48a327(0x1d6)) { const _0x559ee1 = _0x48a327(0x118)[_0x48a327(0x266)](_0x9cb0aa), _0x230224 = VisuMZ[_0x48a327(0x4bf)]['Settings'][_0x48a327(0x344)][_0x559ee1]; _0x230224[_0x48a327(0x3d9)]((_0x32fb6f, _0x501eb3) => { const _0x2b18fb = _0x48a327; if (!_0x32fb6f || !_0x501eb3) return -0x1; return _0x501eb3[_0x2b18fb(0xbf)] - _0x32fb6f[_0x2b18fb(0xbf)]; }), this['CreateAutoColorRegExpListEntries'](_0x230224, _0x9cb0aa); } else { const _0x5ba5d8 = this['itemRectWithPadding'](_0x127448), _0x5f324f = this['choiceAlignText'](), _0x33eac3 = _0x5f324f + this[_0x48a327(0x154)](_0x189f5b); this[_0x48a327(0x224)](this[_0x48a327(0x2eb)](_0x2ea1be)); const _0x247b55 = this[_0x48a327(0xb8)](_0x33eac3)[_0x48a327(0x3e3)], _0x4b191c = _0x5ba5d8['x'] + this['getChoiceIndent'](_0x33eac3), _0x3d4d17 = _0x43fb55[_0x48a327(0x168)](_0x5ba5d8['y'], _0x5ba5d8['y'] + _0x2c68e2[_0x48a327(0x385)]((_0x5ba5d8[_0x48a327(0x3e3)] - _0x247b55) / 0x2)); this[_0x48a327(0x48a)](_0x33eac3, _0x4b191c, _0x3d4d17, _0x5ba5d8[_0x48a327(0x46e)]), this['changeChoiceBackgroundColor'](_0x275b48), this[_0x48a327(0x36c)](_0x101b8a, _0x33eac3, _0x5ba5d8); } } }, VisuMZ[_0x137c0c(0x4bf)][_0x137c0c(0x165)] = function (_0x89e152, _0x5040c4) { const _0x285b03 = _0x137c0c; for (const _0x28bebd of _0x89e152) { if (_0x28bebd['length'] <= 0x0) continue; if (/^\d+$/[_0x285b03(0x48c)](_0x28bebd)) continue; let _0x161c24 = VisuMZ['MessageCore'][_0x285b03(0x3d6)](_0x28bebd); if (_0x28bebd[_0x285b03(0x504)](/[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g)) var _0x22ee1d = new RegExp(_0x161c24, 'i'); else var _0x22ee1d = new RegExp('\x5cb' + _0x161c24 + '\x5cb', 'g'); VisuMZ[_0x285b03(0x4bf)][_0x285b03(0x27f)][_0x285b03(0x21e)]([_0x22ee1d, '\x1bC[%1]%2\x1bPREVCOLOR[0]'['format'](_0x5040c4, _0x28bebd)]); } }, VisuMZ[_0x137c0c(0x4bf)]['ConvertTextAutoColorRegExpFriendly'] = function (_0x4fcafb) { const _0x57bf9 = _0x137c0c; return _0x4fcafb = _0x4fcafb[_0x57bf9(0x38f)](/(\W)/gi, (_0x610ac4, _0xd354a2) => _0x57bf9(0xef)[_0x57bf9(0x266)](_0xd354a2)), _0x4fcafb; }, VisuMZ['MessageCore'][_0x137c0c(0x47a)] = VisuMZ[_0x137c0c(0x47a)], VisuMZ[_0x137c0c(0x47a)] = function (_0x5d15b6) { const _0x5f4527 = _0x137c0c; VisuMZ['MessageCore'][_0x5f4527(0x47a)][_0x5f4527(0x305)](this, _0x5d15b6); const _0x4bad6a = VisuMZ[_0x5f4527(0x4bf)][_0x5f4527(0x452)][_0x5f4527(0x344)]; VisuMZ['MessageCore'][_0x5f4527(0xb4)](_0x5d15b6, _0x4bad6a[_0x5f4527(0x30f)]); }, VisuMZ[_0x137c0c(0x4bf)][_0x137c0c(0xb9)] = VisuMZ[_0x137c0c(0xb9)], VisuMZ[_0x137c0c(0xb9)] = function (_0x57785f) { const _0x3776b3 = _0x137c0c; VisuMZ[_0x3776b3(0x4bf)][_0x3776b3(0xb9)]['call'](this, _0x57785f); const _0x4a1653 = VisuMZ[_0x3776b3(0x4bf)][_0x3776b3(0x452)][_0x3776b3(0x344)]; VisuMZ[_0x3776b3(0x4bf)]['CreateAutoColorFor'](_0x57785f, _0x4a1653['Skills']); }, 0x7, VisuMZ[_0x137c0c(0x4bf)][_0x137c0c(0x40f)] = VisuMZ[_0x137c0c(0x40f)], VisuMZ[_0x137c0c(0x40f)] = function (_0x4578a8) { const _0x223b7e = _0x137c0c; VisuMZ[_0x223b7e(0x4bf)][_0x223b7e(0x40f)][_0x223b7e(0x305)](this, _0x4578a8); const _0x31253e = VisuMZ[_0x223b7e(0x4bf)][_0x223b7e(0x452)][_0x223b7e(0x344)]; VisuMZ['MessageCore'][_0x223b7e(0xb4)](_0x4578a8, _0x31253e[_0x223b7e(0x480)]); }, VisuMZ[_0x137c0c(0x4bf)][_0x137c0c(0xd3)] = VisuMZ[_0x137c0c(0xd3)], VisuMZ[_0x137c0c(0xd3)] = function (_0x3bae2a) { const _0x1b2b3d = _0x137c0c; VisuMZ[_0x1b2b3d(0x4bf)]['ParseWeaponNotetags'][_0x1b2b3d(0x305)](this, _0x3bae2a); const _0x1301fd = VisuMZ['MessageCore'][_0x1b2b3d(0x452)][_0x1b2b3d(0x344)]; VisuMZ['MessageCore'][_0x1b2b3d(0xb4)](_0x3bae2a, _0x1301fd[_0x1b2b3d(0x303)]); }, VisuMZ[_0x137c0c(0x4bf)][_0x137c0c(0x33c)] = VisuMZ[_0x137c0c(0x33c)], VisuMZ[_0x137c0c(0x33c)] = function (_0x2cff81) { const _0x1fc039 = _0x137c0c; VisuMZ[_0x1fc039(0x4bf)]['ParseArmorNotetags'][_0x1fc039(0x305)](this, _0x2cff81); const _0x5f3dae = VisuMZ[_0x1fc039(0x4bf)][_0x1fc039(0x452)]['AutoColor']; VisuMZ[_0x1fc039(0x4bf)][_0x1fc039(0xb4)](_0x2cff81, _0x5f3dae[_0x1fc039(0x26d)]); }, VisuMZ[_0x137c0c(0x4bf)][_0x137c0c(0x311)] = VisuMZ[_0x137c0c(0x311)], VisuMZ[_0x137c0c(0x311)] = function (_0x1ef438) { const _0x50cf53 = _0x137c0c; VisuMZ[_0x50cf53(0x4bf)]['ParseEnemyNotetags'][_0x50cf53(0x305)](this, _0x1ef438); const _0x4b8f57 = VisuMZ[_0x50cf53(0x4bf)][_0x50cf53(0x452)][_0x50cf53(0x344)]; VisuMZ['MessageCore'][_0x50cf53(0xb4)](_0x1ef438, _0x4b8f57[_0x50cf53(0x388)]); }, VisuMZ['MessageCore'][_0x137c0c(0x4e5)] = VisuMZ[_0x137c0c(0x4e5)], VisuMZ[_0x137c0c(0x4e5)] = function (_0x4bdbc7) { const _0x4db3dc = _0x137c0c; VisuMZ['MessageCore'][_0x4db3dc(0x4e5)][_0x4db3dc(0x305)](this, _0x4bdbc7); const _0xa71e79 = VisuMZ[_0x4db3dc(0x4bf)][_0x4db3dc(0x452)][_0x4db3dc(0x344)]; VisuMZ[_0x4db3dc(0x4bf)][_0x4db3dc(0xb4)](_0x4bdbc7, _0xa71e79['States']); }, VisuMZ['MessageCore'][_0x137c0c(0xb4)] = function (_0x1c5b33, _0x7c7ab9) { const _0xd7b044 = _0x137c0c; if (_0x7c7ab9 <= 0x0) return; const _0x247b4a = VisuMZ[_0xd7b044(0x4bf)]['Settings'][_0xd7b044(0x344)]['TextColor' + _0x7c7ab9]; let _0x1d549e = _0x1c5b33[_0xd7b044(0x24b)][_0xd7b044(0xca)](); if (/^\d+$/[_0xd7b044(0x48c)](_0x1d549e)) return; if (VisuMZ[_0xd7b044(0x4bf)]['AutoColorBypassList'][_0xd7b044(0x27c)](_0x1d549e[_0xd7b044(0x282)]())) return; _0x1d549e = _0x1d549e[_0xd7b044(0x38f)](/\\I\[(\d+)\]/gi, ''), _0x1d549e = _0x1d549e[_0xd7b044(0x38f)](/\x1bI\[(\d+)\]/gi, ''); if (_0x1d549e['length'] <= 0x0) return; if (_0x1d549e[_0xd7b044(0x504)](/-----/i)) return; _0x247b4a[_0xd7b044(0x21e)](_0x1d549e); }, VisuMZ[_0x137c0c(0x4bf)][_0x137c0c(0x4c1)] = Scene_Boot[_0x137c0c(0x3b4)][_0x137c0c(0x123)], Scene_Boot[_0x137c0c(0x3b4)]['loadGameFonts'] = function () { const _0x2256c9 = _0x137c0c; VisuMZ[_0x2256c9(0x4bf)][_0x2256c9(0x4c1)][_0x2256c9(0x305)](this), this[_0x2256c9(0x397)](); }, Scene_Boot[_0x137c0c(0x3b4)][_0x137c0c(0x397)] = function () { const _0x3f0c74 = _0x137c0c, _0x3815a0 = VisuMZ['MessageCore'][_0x3f0c74(0x452)][_0x3f0c74(0x37a)] || []; for (const _0x4cf897 of _0x3815a0) { if (!_0x4cf897) continue; const _0x1fdb41 = _0x4cf897[_0x3f0c74(0x412)]; if (_0x1fdb41[_0x3f0c74(0xca)]() === '') continue; if (_0x1fdb41[_0x3f0c74(0xcd)]()[_0x3f0c74(0xca)]() === 'unnamed') continue; const _0x883778 = _0x4cf897[_0x3f0c74(0x286)]; if (_0x883778 === _0x3f0c74(0x110)) continue; FontManager['load'](_0x1fdb41, _0x883778); } }, VisuMZ[_0x137c0c(0x4bf)][_0x137c0c(0x18e)] = DataManager[_0x137c0c(0x200)], DataManager[_0x137c0c(0x200)] = function () { const _0x43cbd5 = _0x137c0c; VisuMZ[_0x43cbd5(0x4bf)]['DataManager_loadDatabase'][_0x43cbd5(0x305)](this), this['loadLocalization'](); }, DataManager[_0x137c0c(0x2e9)] = function () { const _0x436f8e = _0x137c0c; if (!TextManager[_0x436f8e(0x2d2)]()) return; const _0x2e901d = VisuMZ['MessageCore'][_0x436f8e(0x452)][_0x436f8e(0x422)], _0x1e42bd = _0x2e901d[_0x436f8e(0x19e)] || ''; if (!_0x1e42bd) return; const _0x218121 = _0x436f8e(0x22f), _0x47136c = new XMLHttpRequest(), _0x4d7573 = _0x436f8e(0x157) + _0x1e42bd; window[_0x218121] = null, _0x47136c[_0x436f8e(0x320)](_0x436f8e(0x27b), _0x4d7573), _0x47136c[_0x436f8e(0x325)](_0x436f8e(0x19a)), _0x47136c[_0x436f8e(0x219)] = () => this[_0x436f8e(0x3a0)](_0x47136c, _0x218121), _0x47136c[_0x436f8e(0x347)] = () => this[_0x436f8e(0x2c8)](), _0x47136c[_0x436f8e(0x476)](); }, DataManager[_0x137c0c(0x3a0)] = function (_0x5630c7, _0x21e3d9) { const _0x45c323 = _0x137c0c; if (_0x5630c7[_0x45c323(0x1cd)] >= 0x190) return; const _0x5e3f53 = _0x5630c7[_0x45c323(0x298)]; window[_0x21e3d9] = VisuMZ[_0x45c323(0x4bf)][_0x45c323(0x1fa)](_0x5e3f53); }, VisuMZ[_0x137c0c(0x4bf)]['ParseLocalizationCsv'] = function (_0x50c611) { const _0x2fd06d = _0x137c0c, _0x285152 = _0x50c611[_0x2fd06d(0x1f9)]('\x0a'), _0x30a78d = _0x285152[0x0]['split'](';'), _0x556a77 = {}; return _0x285152['slice'](0x1)[_0x2fd06d(0x38b)](_0xcf755a => { const _0x18ae67 = _0x2fd06d; if (_0x18ae67(0x1e6) !== 'vUntk') return _0x49b2ec; else { let _0x340aa1 = [], _0x3e5160 = '', _0x2f36fd = ![]; for (let _0x2968f5 = 0x0; _0x2968f5 < _0xcf755a['length']; _0x2968f5++) { let _0x5b593d = _0xcf755a[_0x2968f5]; if (_0x5b593d === '\x22') 'NnwnV' !== _0x18ae67(0x300) ? _0x2f36fd && _0xcf755a[_0x2968f5 + 0x1] === '\x22' ? (_0x3e5160 += _0x5b593d, _0x2968f5++) : _0x18ae67(0x23c) !== 'FCyJb' ? _0x2f36fd = !_0x2f36fd : this[_0x18ae67(0x9a)]() : _0x1ebd67 -= _0x2b5bb8; else _0x5b593d === ';' && !_0x2f36fd ? (_0x340aa1[_0x18ae67(0x21e)](_0x3e5160), _0x3e5160 = '') : _0x3e5160 += _0x5b593d; } if (_0x3e5160) _0x340aa1['push'](_0x3e5160); if (!_0x340aa1[0x0]) _0x340aa1[0x0] = ''; const _0x390d9f = _0x340aa1[0x0]['replace'](/^"|"$/g, '')['toLowerCase']()[_0x18ae67(0xca)](); _0x556a77[_0x390d9f] = _0x30a78d[_0x18ae67(0x2e5)](0x1)[_0x18ae67(0x11f)]((_0x5b5df8, _0x16d329, _0x2c6fc1) => { const _0x3619d4 = _0x18ae67; if (_0x3619d4(0x112) !== _0x3619d4(0x112)) this['_itemChoiceVariableId'] = _0x57117d, this[_0x3619d4(0x246)] = 'skill', this[_0x3619d4(0x4e9)] = _0xe44527, this['_itemChoiceStypeId'] = _0x216c35; else return _0x5b5df8[_0x16d329] = (_0x340aa1[_0x2c6fc1 + 0x1] || '')[_0x3619d4(0x38f)](/^"|"$/g, ''), _0x5b5df8; }, {}); } }), _0x556a77; }, DataManager[_0x137c0c(0x2c8)] = function () { const _0x1a3668 = _0x137c0c; let _0x115f22 = ''; _0x115f22 += 'You\x20do\x20not\x20have\x20a\x20language\x20CSV\x20set\x20up.\x0a', _0x115f22 += _0x1a3668(0x3c9); if (confirm(_0x115f22)) { if (_0x1a3668(0x464) === _0x1a3668(0x464)) Utils['isOptionValid'](_0x1a3668(0x48c)) ? (_0x115f22 = 'CSV\x20file\x20is\x20now\x20created\x20and\x20stored\x20in\x20data\x20folder.\x0a', alert(_0x115f22), this['createLocalizationCsvFile'](), this['openLocalizationFolder'](), _0x115f22 = '') : 'eAiin' !== _0x1a3668(0x3c3) ? _0x115f22 = _0x1a3668(0x2c4) : _0x317fe2 += _0x3074aa; else return _0x2b176e[_0x1a3668(0x3b4)]['preConvertEscapeCharacters'][_0x1a3668(0x305)](this, _0x443109); } else _0x115f22 = _0x1a3668(0x33b); _0x115f22 += _0x1a3668(0x36d), alert(_0x115f22), SceneManager['exit'](); }, DataManager['createLocalizationCsvFile'] = function () { const _0x10c66e = _0x137c0c, _0x10bfea = [_0x10c66e(0x287), _0x10c66e(0x187), _0x10c66e(0x4f4), _0x10c66e(0x43f), _0x10c66e(0x108), _0x10c66e(0x3f3), _0x10c66e(0x1ed), _0x10c66e(0x2f2), _0x10c66e(0x41e), _0x10c66e(0x491), _0x10c66e(0x2c7), _0x10c66e(0x390), _0x10c66e(0x3a6), _0x10c66e(0x4a6), 'Indonesian', _0x10c66e(0x35a), _0x10c66e(0x47b), 'Korean', _0x10c66e(0x2bd), _0x10c66e(0x188), _0x10c66e(0x276), _0x10c66e(0x3a4), _0x10c66e(0x3ca), _0x10c66e(0x338), _0x10c66e(0x4fe), 'Swedish', _0x10c66e(0x1d0), 'Thai', _0x10c66e(0x24e)], _0x3afe13 = [_0x10c66e(0x4f5), _0x10c66e(0x4c5), _0x10c66e(0x1cc), '你好', '你好', _0x10c66e(0x367), _0x10c66e(0x280), _0x10c66e(0x2d8), 'Hei', _0x10c66e(0xb1), _0x10c66e(0x2d8), _0x10c66e(0x1ca), _0x10c66e(0x48f), 'Szia', _0x10c66e(0x3ec), _0x10c66e(0x490), _0x10c66e(0x2e2), _0x10c66e(0x162), _0x10c66e(0x232), _0x10c66e(0x32b), _0x10c66e(0x2ba), 'Salut', _0x10c66e(0x326), _0x10c66e(0x367), _0x10c66e(0x34b), _0x10c66e(0x280), _0x10c66e(0x3f7), _0x10c66e(0x3d0), _0x10c66e(0xc5)], _0x9ad256 = [_0x10c66e(0x29a), _0x10c66e(0x179), _0x10c66e(0x267), '再见', '再見', _0x10c66e(0x335), 'Farvel', 'Tot\x20ziens', _0x10c66e(0x2ef), _0x10c66e(0x1e0), _0x10c66e(0x1d7), 'Αντίο', 'अलविदा', 'Viszontlátásra', 'Selamat\x20tinggal', _0x10c66e(0x152), _0x10c66e(0x1b7), _0x10c66e(0x1be), _0x10c66e(0x11c), 'Do\x20widzenia', _0x10c66e(0x18f), _0x10c66e(0x1ae), 'До\x20свидания', _0x10c66e(0x166), _0x10c66e(0x107), _0x10c66e(0x39e), _0x10c66e(0x2d5), 'ลาก่อน', _0x10c66e(0x2af)], _0x16a125 = [_0x10c66e(0x485), _0x10c66e(0x485), _0x10c66e(0x223), '哇', '哇', 'Ó', 'Wow', _0x10c66e(0x147), 'Vau', _0x10c66e(0x1fd), 'Wow', _0x10c66e(0x47d), _0x10c66e(0x1df), 'Hűha', _0x10c66e(0x23e), _0x10c66e(0x485), 'ワオ', '와우', 'Oi', 'O', _0x10c66e(0x230), 'Uau', _0x10c66e(0xac), 'Ó', _0x10c66e(0x1c8), 'Oj', _0x10c66e(0x18b), _0x10c66e(0x15e), 'Vay'], _0x19ec80 = [_0x10bfea, _0x3afe13, _0x9ad256, _0x16a125], _0x1c5f54 = _0x19ec80['map'](_0x3da9d5 => _0x3da9d5['join'](';'))[_0x10c66e(0x173)]('\x0a'), _0x1aa10a = VisuMZ['MessageCore'][_0x10c66e(0x452)][_0x10c66e(0x422)], _0x495a36 = _0x1aa10a[_0x10c66e(0x19e)] || _0x10c66e(0xab), _0x48df5c = require('path'), _0x1eef0c = _0x48df5c['dirname'](process[_0x10c66e(0x3f4)]['filename']), _0x21b9ec = _0x48df5c[_0x10c66e(0x173)](_0x1eef0c, _0x10c66e(0x157)), _0x36c8fb = _0x21b9ec + _0x495a36, _0x317b6e = require('fs'); return _0x317b6e[_0x10c66e(0x277)](_0x36c8fb, _0x1c5f54), _0x36c8fb; }, DataManager[_0x137c0c(0x227)] = function () { const _0x33a7f6 = _0x137c0c, { exec: _0x424027 } = require(_0x33a7f6(0x23d)); _0x424027(_0x33a7f6(0x21c)), _0x424027(_0x33a7f6(0x225)); }, SceneManager[_0x137c0c(0x1ec)] = function () { const _0x5ae482 = _0x137c0c; return this[_0x5ae482(0x481)] && this[_0x5ae482(0x481)][_0x5ae482(0x456)] === Scene_Battle; }, SceneManager[_0x137c0c(0x43d)] = function () { const _0x34b064 = _0x137c0c; return this[_0x34b064(0x481)] && this[_0x34b064(0x481)][_0x34b064(0x456)] === Scene_Map; }, ConfigManager[_0x137c0c(0x137)] = VisuMZ[_0x137c0c(0x4bf)]['Settings']['Localization'][_0x137c0c(0x445)] || _0x137c0c(0x187), ConfigManager['textSpeed'] = VisuMZ[_0x137c0c(0x4bf)]['Settings'][_0x137c0c(0x257)][_0x137c0c(0x1eb)], VisuMZ['MessageCore'][_0x137c0c(0x251)] = ConfigManager[_0x137c0c(0x3a3)], ConfigManager[_0x137c0c(0x3a3)] = function () { const _0x4c248b = _0x137c0c, _0x112a9d = VisuMZ[_0x4c248b(0x4bf)][_0x4c248b(0x251)]['call'](this); return TextManager[_0x4c248b(0x2d2)]() && (_0x4c248b(0xc2) !== _0x4c248b(0xc2) ? (this[_0x4c248b(0x472)] = {}, this[_0x4c248b(0xba)] && (this[_0x4c248b(0xba)][_0x4c248b(0x4eb)](), this[_0x4c248b(0xba)][_0x4c248b(0x4d5)]())) : _0x112a9d[_0x4c248b(0x137)] = this['textLocale']), _0x112a9d[_0x4c248b(0x3c5)] = this[_0x4c248b(0x3c5)], _0x112a9d; }, VisuMZ[_0x137c0c(0x4bf)]['ConfigManager_applyData'] = ConfigManager[_0x137c0c(0x293)], ConfigManager[_0x137c0c(0x293)] = function (_0x1c74fa) { const _0x5c8ba5 = _0x137c0c; VisuMZ[_0x5c8ba5(0x4bf)][_0x5c8ba5(0x50a)][_0x5c8ba5(0x305)](this, _0x1c74fa), TextManager[_0x5c8ba5(0x2d2)]() && (_0x5c8ba5(0x137) in _0x1c74fa ? this[_0x5c8ba5(0x137)] = String(_0x1c74fa['textLocale']) : this[_0x5c8ba5(0x137)] = VisuMZ[_0x5c8ba5(0x4bf)][_0x5c8ba5(0x452)][_0x5c8ba5(0x422)][_0x5c8ba5(0x445)] || _0x5c8ba5(0x187)), _0x5c8ba5(0x3c5) in _0x1c74fa ? this[_0x5c8ba5(0x3c5)] = Number(_0x1c74fa['textSpeed'])['clamp'](0x1, 0xb) : _0x5c8ba5(0x30b) === _0x5c8ba5(0x1c6) ? _0x440eae = !![] : this[_0x5c8ba5(0x3c5)] = VisuMZ['MessageCore'][_0x5c8ba5(0x452)][_0x5c8ba5(0x257)][_0x5c8ba5(0x1eb)]; }, TextManager[_0x137c0c(0xaf)] = VisuMZ[_0x137c0c(0x4bf)]['Settings'][_0x137c0c(0x422)][_0x137c0c(0x9f)], TextManager['messageCoreTextSpeed'] = VisuMZ[_0x137c0c(0x4bf)][_0x137c0c(0x452)][_0x137c0c(0x257)]['Name'], TextManager[_0x137c0c(0x242)] = VisuMZ['MessageCore']['Settings'][_0x137c0c(0x257)][_0x137c0c(0x3bd)], VisuMZ[_0x137c0c(0x4bf)][_0x137c0c(0x1ac)] = TextManager[_0x137c0c(0xa0)], TextManager[_0x137c0c(0xa0)] = function (_0x5d4a8a) { const _0xb0d29 = _0x137c0c, _0x55b79d = ['levelUp', _0xb0d29(0x2d9), _0xb0d29(0x2c6), _0xb0d29(0xf5), 'victory', _0xb0d29(0x498), _0xb0d29(0x408), _0xb0d29(0x477), _0xb0d29(0x264), _0xb0d29(0x207)]; let _0x100132 = VisuMZ[_0xb0d29(0x4bf)][_0xb0d29(0x1ac)][_0xb0d29(0x305)](this, _0x5d4a8a); return _0x55b79d[_0xb0d29(0x27c)](_0x5d4a8a) && (_0x100132 = '</WORDWRAP>' + _0x100132), _0x100132; }, TextManager[_0x137c0c(0x2d2)] = function () { const _0x454374 = _0x137c0c; return VisuMZ[_0x454374(0x4bf)]['Settings'][_0x454374(0x422)][_0x454374(0x25a)]; }, TextManager['parseLocalizedText'] = function (_0x1fce00) { const _0xd544e1 = _0x137c0c; if (!this['isVisuMzLocalizationEnabled']()) return _0x1fce00; return _0x1fce00 = String(_0x1fce00)['replace'](/\$(?:\[|\<|\{)(.*?)(?:\]|\>|\})/gi, (_0x33b497, _0x55674e) => this[_0xd544e1(0x467)](String(_0x55674e))), _0x1fce00 = String(_0x1fce00)[_0xd544e1(0x38f)](/\\(?:KEY|TL|TRANSLATE|LOC|LOCALIZE|LOCALE)(?:\[|\<|\{)(.*?)(?:\]|\>|\})/gi, (_0x24cc2a, _0x505e22) => this[_0xd544e1(0x467)](String(_0x505e22))), _0x1fce00 = String(_0x1fce00)['replace'](/\x1b(?:KEY|TL|TRANSLATE|LOC|LOCALIZE|LOCALE)(?:\[|\<|\{)(.*?)(?:\]|\>|\})/gi, (_0x243271, _0x270fa7) => this['getLocalizedText'](String(_0x270fa7))), _0x1fce00; }, TextManager[_0x137c0c(0x467)] = function (_0x57fb88) { const _0x1cb301 = _0x137c0c; if (!$dataLocalization) return ''; const _0x161d6f = $dataLocalization[_0x57fb88['toLowerCase']()[_0x1cb301(0xca)]()]; if (!_0x161d6f) return; const _0x59517a = ConfigManager[_0x1cb301(0x137)] || _0x1cb301(0x187); let _0x4d6e34 = _0x161d6f[_0x59517a] || _0x1cb301(0x1a2); return _0x4d6e34 = _0x4d6e34[_0x1cb301(0x38f)](/\\/g, '\x1b'), _0x4d6e34 = _0x4d6e34[_0x1cb301(0x38f)](/<SEMI(?:|-COLON|COLON)>/gi, ';'), _0x4d6e34; }, TextManager[_0x137c0c(0x290)] = function (_0x51462e) { const _0x556a2d = _0x137c0c; return VisuMZ[_0x556a2d(0x4bf)][_0x556a2d(0x452)][_0x556a2d(0x422)][_0x51462e] || ''; }, TextManager[_0x137c0c(0x199)] = function () { const _0x5ccf9d = _0x137c0c, _0x3a5fd5 = ConfigManager['textLocale'] || 'English'; return this[_0x5ccf9d(0x290)](_0x3a5fd5); }, TextManager[_0x137c0c(0x438)] = function (_0xff77a7) { const _0x5b9425 = _0x137c0c, _0x21d042 = VisuMZ['MessageCore'][_0x5b9425(0x452)]['Localization'][_0x5b9425(0x310)] || []; let _0x2044d7 = _0x21d042['indexOf'](ConfigManager[_0x5b9425(0x137)] || _0x5b9425(0x187)); _0x2044d7 += _0xff77a7; const _0x300fbc = _0x21d042[_0x2044d7] || ''; return this[_0x5b9425(0x290)](_0x300fbc); }, Game_Temp[_0x137c0c(0x3b4)]['setLastPluginCommandInterpreter'] = function (_0x300836) { const _0x11ffe6 = _0x137c0c; this[_0x11ffe6(0x4dc)] = _0x300836; }, Game_Temp[_0x137c0c(0x3b4)]['getLastPluginCommandInterpreter'] = function () { const _0x15ff5d = _0x137c0c; return this[_0x15ff5d(0x4dc)]; }, VisuMZ[_0x137c0c(0x4bf)][_0x137c0c(0x3b1)] = Game_Interpreter[_0x137c0c(0x3b4)][_0x137c0c(0x215)], Game_Interpreter[_0x137c0c(0x3b4)][_0x137c0c(0x215)] = function (_0x13f0c6) { const _0x5f4b98 = _0x137c0c; return $gameTemp[_0x5f4b98(0x3de)](this), VisuMZ[_0x5f4b98(0x4bf)][_0x5f4b98(0x3b1)][_0x5f4b98(0x305)](this, _0x13f0c6); }, VisuMZ[_0x137c0c(0x4bf)][_0x137c0c(0xc3)] = Game_System['prototype'][_0x137c0c(0x2cf)], Game_System['prototype'][_0x137c0c(0x2cf)] = function () { const _0x4fec6e = _0x137c0c; VisuMZ['MessageCore'][_0x4fec6e(0xc3)][_0x4fec6e(0x305)](this), this[_0x4fec6e(0x2d3)](); }, Game_System[_0x137c0c(0x3b4)]['initMessageCore'] = function () { const _0x4d813f = _0x137c0c, _0x2f401b = VisuMZ['MessageCore']['Settings'][_0x4d813f(0x4a2)], _0x5c55b4 = VisuMZ[_0x4d813f(0x4bf)][_0x4d813f(0x452)][_0x4d813f(0x1d5)]; this[_0x4d813f(0x360)] = { 'messageRows': _0x2f401b[_0x4d813f(0x17b)], 'messageWidth': _0x2f401b[_0x4d813f(0x4e2)], 'messageWordWrap': _0x5c55b4[_0x4d813f(0x353)], 'helpWordWrap': _0x5c55b4['HelpWindow'], 'choiceLineHeight': _0x2f401b['ChoiceWindowLineHeight'], 'choiceMinWidth': _0x2f401b[_0x4d813f(0x46d)] ?? 0x60, 'choiceRows': _0x2f401b[_0x4d813f(0x31d)], 'choiceCols': _0x2f401b['ChoiceWindowMaxCols'], 'choiceTextAlign': _0x2f401b[_0x4d813f(0x2ff)], 'choiceDistance': 0x0 }, this[_0x4d813f(0x16e)] === undefined && (this[_0x4d813f(0x16e)] = _0x2f401b[_0x4d813f(0x372)], this[_0x4d813f(0xae)] = _0x2f401b['MsgWindowOffsetY']); }, Game_System[_0x137c0c(0x3b4)]['getMessageWindowRows'] = function () { const _0x1cba96 = _0x137c0c; if (this[_0x1cba96(0x360)] === undefined) this[_0x1cba96(0x2d3)](); if (this['_MessageCoreSettings'][_0x1cba96(0x1c0)] === undefined) this[_0x1cba96(0x2d3)](); return this[_0x1cba96(0x360)][_0x1cba96(0x1c0)]; }, Game_System[_0x137c0c(0x3b4)]['setMessageWindowRows'] = function (_0x4763cc) { const _0xd41b93 = _0x137c0c; if (this[_0xd41b93(0x360)] === undefined) this['initMessageCore'](); if (this[_0xd41b93(0x360)][_0xd41b93(0x1c0)] === undefined) this[_0xd41b93(0x2d3)](); this[_0xd41b93(0x360)][_0xd41b93(0x1c0)] = _0x4763cc || 0x1; }, Game_System[_0x137c0c(0x3b4)][_0x137c0c(0x2d4)] = function () { const _0x14d36c = _0x137c0c; if (this[_0x14d36c(0x360)] === undefined) this[_0x14d36c(0x2d3)](); if (this[_0x14d36c(0x360)][_0x14d36c(0x27e)] === undefined) this[_0x14d36c(0x2d3)](); return this[_0x14d36c(0x360)][_0x14d36c(0x27e)]; }, Game_System[_0x137c0c(0x3b4)][_0x137c0c(0x96)] = function (_0x13f55e) { const _0x3fc09c = _0x137c0c; if (this[_0x3fc09c(0x360)] === undefined) this[_0x3fc09c(0x2d3)](); if (this['_MessageCoreSettings'][_0x3fc09c(0x27e)] === undefined) this[_0x3fc09c(0x2d3)](); _0x13f55e = Math[_0x3fc09c(0x1ea)](_0x13f55e); if (_0x13f55e % 0x2 !== 0x0) _0x13f55e += 0x1; this[_0x3fc09c(0x360)][_0x3fc09c(0x27e)] = _0x13f55e || 0x2; }, Game_System['prototype'][_0x137c0c(0x381)] = function () { const _0x190c7a = _0x137c0c; if (this[_0x190c7a(0x360)] === undefined) this['initMessageCore'](); if (this['_MessageCoreSettings'][_0x190c7a(0x120)] === undefined) this[_0x190c7a(0x2d3)](); return this[_0x190c7a(0x360)][_0x190c7a(0x120)]; }, Game_System[_0x137c0c(0x3b4)][_0x137c0c(0x105)] = function (_0x50ded2) { const _0x529ca0 = _0x137c0c; if (this['_MessageCoreSettings'] === undefined) this['initMessageCore'](); if (this[_0x529ca0(0x360)][_0x529ca0(0x120)] === undefined) this[_0x529ca0(0x2d3)](); this['_MessageCoreSettings'][_0x529ca0(0x120)] = _0x50ded2; }, Game_System['prototype'][_0x137c0c(0x127)] = function () { const _0x366198 = _0x137c0c; if (this[_0x366198(0x16e)] === undefined) { const _0xf8fc73 = VisuMZ[_0x366198(0x4bf)]['Settings'][_0x366198(0x4a2)]; this[_0x366198(0x16e)] = _0xf8fc73[_0x366198(0x372)], this['_messageOffsetY'] = _0xf8fc73['MsgWindowOffsetY']; } return { 'x': this[_0x366198(0x16e)] || 0x0, 'y': this['_messageOffsetY'] || 0x0 }; }, Game_System['prototype'][_0x137c0c(0x479)] = function (_0x57ab22, _0x116827) { const _0x5cd266 = _0x137c0c; if (this[_0x5cd266(0x360)] === undefined) this[_0x5cd266(0x2d3)](); this['_messageOffsetX'] = _0x57ab22, this['_messageOffsetY'] = _0x116827; }, Game_System[_0x137c0c(0x3b4)][_0x137c0c(0x34c)] = function () { const _0x59941d = _0x137c0c; if (this['_MessageCoreSettings'] === undefined) this[_0x59941d(0x2d3)](); if (this[_0x59941d(0x360)][_0x59941d(0x4e7)] === undefined) this['initMessageCore'](); return this[_0x59941d(0x360)][_0x59941d(0x4e7)]; }, Game_System[_0x137c0c(0x3b4)][_0x137c0c(0x139)] = function (_0x4fa17a) { const _0x5b1042 = _0x137c0c; if (this[_0x5b1042(0x360)] === undefined) this['initMessageCore'](); if (this[_0x5b1042(0x360)][_0x5b1042(0x4e7)] === undefined) this[_0x5b1042(0x2d3)](); this[_0x5b1042(0x360)]['helpWordWrap'] = _0x4fa17a; }, Game_System[_0x137c0c(0x3b4)][_0x137c0c(0x3e4)] = function () { const _0x4bf2cb = _0x137c0c; if (this[_0x4bf2cb(0x360)] === undefined) this[_0x4bf2cb(0x2d3)](); if (this[_0x4bf2cb(0x360)][_0x4bf2cb(0x33a)] === undefined) this[_0x4bf2cb(0x2d3)](); return this[_0x4bf2cb(0x360)][_0x4bf2cb(0x33a)]; }, Game_System[_0x137c0c(0x3b4)][_0x137c0c(0x13f)] = function (_0x59e465) { const _0x6502ae = _0x137c0c; if (this[_0x6502ae(0x360)] === undefined) this['initMessageCore'](); if (this['_MessageCoreSettings'][_0x6502ae(0x33a)] === undefined) this['initMessageCore'](); this[_0x6502ae(0x360)][_0x6502ae(0x33a)] = _0x59e465 || 0x1; }, Game_System[_0x137c0c(0x3b4)][_0x137c0c(0x149)] = function () { const _0x3f91d9 = _0x137c0c; if (this[_0x3f91d9(0x360)] === undefined) this['initMessageCore'](); return this[_0x3f91d9(0x360)][_0x3f91d9(0x340)] ?? 0x60; }, Game_System[_0x137c0c(0x3b4)][_0x137c0c(0xfd)] = function (_0x1674fc) { const _0x4ac8bf = _0x137c0c; if (this[_0x4ac8bf(0x360)] === undefined) this[_0x4ac8bf(0x2d3)](); this[_0x4ac8bf(0x360)][_0x4ac8bf(0x340)] = _0x1674fc || 0x0; }, Game_System[_0x137c0c(0x3b4)][_0x137c0c(0x29e)] = function () { const _0x7f418e = _0x137c0c; if (this['_MessageCoreSettings'] === undefined) this['initMessageCore'](); if (this[_0x7f418e(0x360)]['choiceRows'] === undefined) this['initMessageCore'](); return this['_MessageCoreSettings'][_0x7f418e(0x2ae)]; }, Game_System[_0x137c0c(0x3b4)]['setChoiceListMaxRows'] = function (_0x15070a) { const _0x256579 = _0x137c0c; if (this['_MessageCoreSettings'] === undefined) this['initMessageCore'](); if (this[_0x256579(0x360)][_0x256579(0x2ae)] === undefined) this[_0x256579(0x2d3)](); this[_0x256579(0x360)][_0x256579(0x2ae)] = _0x15070a || 0x1; }, Game_System['prototype'][_0x137c0c(0x3eb)] = function () { const _0x2bec25 = _0x137c0c; if (this[_0x2bec25(0x360)] === undefined) this[_0x2bec25(0x2d3)](); if (this[_0x2bec25(0x360)]['choiceCols'] === undefined) this[_0x2bec25(0x2d3)](); return this[_0x2bec25(0x360)]['choiceCols']; }, Game_System[_0x137c0c(0x3b4)][_0x137c0c(0xd7)] = function (_0x3f53ba) { const _0x2b7933 = _0x137c0c; if (this['_MessageCoreSettings'] === undefined) this['initMessageCore'](); if (this[_0x2b7933(0x360)][_0x2b7933(0x254)] === undefined) this[_0x2b7933(0x2d3)](); this[_0x2b7933(0x360)][_0x2b7933(0x254)] = _0x3f53ba || 0x1; }, Game_System[_0x137c0c(0x3b4)][_0x137c0c(0x375)] = function () { const _0x4371ee = _0x137c0c; if (this[_0x4371ee(0x360)] === undefined) this['initMessageCore'](); if (this[_0x4371ee(0x360)]['choiceTextAlign'] === undefined) this['initMessageCore'](); return this[_0x4371ee(0x360)][_0x4371ee(0x12f)]; }, Game_System[_0x137c0c(0x3b4)][_0x137c0c(0x2a7)] = function (_0x449eb0) { const _0x2c0134 = _0x137c0c; if (this[_0x2c0134(0x360)] === undefined) this[_0x2c0134(0x2d3)](); if (this[_0x2c0134(0x360)][_0x2c0134(0x12f)] === undefined) this[_0x2c0134(0x2d3)](); this[_0x2c0134(0x360)][_0x2c0134(0x12f)] = _0x449eb0['toLowerCase'](); }, Game_System['prototype'][_0x137c0c(0xde)] = function () { const _0x504b57 = _0x137c0c; if (this[_0x504b57(0x360)] === undefined) this[_0x504b57(0x2d3)](); return this[_0x504b57(0x360)][_0x504b57(0x36a)] || 0x0; }, Game_System[_0x137c0c(0x3b4)]['setChoiceMessageDistance'] = function (_0x6701f3) { const _0x1abdc9 = _0x137c0c; if (this['_MessageCoreSettings'] === undefined) this['initMessageCore'](); this[_0x1abdc9(0x360)][_0x1abdc9(0x36a)] = _0x6701f3 || 0x0; }, Game_Message[_0x137c0c(0x3b4)]['setWeaponChoice'] = function (_0xebfc6c, _0xc1990d) { const _0x49a910 = _0x137c0c; this[_0x49a910(0x291)] = _0xebfc6c, this[_0x49a910(0x246)] = _0x49a910(0x316), this[_0x49a910(0xc0)] = _0xc1990d, this[_0x49a910(0xbe)] = 0x0; }, Game_Message[_0x137c0c(0x3b4)][_0x137c0c(0x49a)] = function () { const _0x46ffe2 = _0x137c0c; return this[_0x46ffe2(0xc0)] || 0x0; }, Game_Message[_0x137c0c(0x3b4)][_0x137c0c(0x393)] = function (_0x5e80b8, _0x17d453, _0x1b4e90) { const _0x113fd6 = _0x137c0c; this[_0x113fd6(0x291)] = _0x5e80b8, this['_itemChoiceItypeId'] = _0x113fd6(0x209), this[_0x113fd6(0xa3)] = _0x17d453, this[_0x113fd6(0xbe)] = _0x1b4e90; }, Game_Message[_0x137c0c(0x3b4)][_0x137c0c(0x38e)] = function () { const _0x3930bd = _0x137c0c; return this[_0x3930bd(0xa3)] || 0x0; }, Game_Message['prototype'][_0x137c0c(0xa2)] = function () { const _0x364711 = _0x137c0c; return this[_0x364711(0xbe)] || 0x0; }, Game_Message[_0x137c0c(0x3b4)][_0x137c0c(0x500)] = function (_0x2cf4b2, _0x40bb03, _0x4d07f7) { const _0x18b021 = _0x137c0c; this[_0x18b021(0x291)] = _0x2cf4b2, this['_itemChoiceItypeId'] = _0x18b021(0x151), this['_itemChoiceActorId'] = _0x40bb03, this['_itemChoiceStypeId'] = _0x4d07f7; }, Game_Message[_0x137c0c(0x3b4)][_0x137c0c(0x487)] = function () { return this['_itemChoiceActorId'] || 0x0; }, Game_Message[_0x137c0c(0x3b4)][_0x137c0c(0x4fd)] = function () { const _0x308321 = _0x137c0c; return $gameActors[_0x308321(0x4c3)](this[_0x308321(0x487)]()) || $gameParty[_0x308321(0x330)]() || null; }, Game_Message[_0x137c0c(0x3b4)][_0x137c0c(0x474)] = function () { const _0x2f2249 = _0x137c0c; return this[_0x2f2249(0x3d8)] || 0x0; }, VisuMZ['MessageCore'][_0x137c0c(0x1aa)] = Game_Message['prototype'][_0x137c0c(0x2cd)], Game_Message[_0x137c0c(0x3b4)][_0x137c0c(0x2cd)] = function (_0x4f2fc4, _0x3ca34c, _0x58141c) { const _0xf001fa = _0x137c0c; this[_0xf001fa(0x17f)] = !![], VisuMZ[_0xf001fa(0x4bf)][_0xf001fa(0x1aa)][_0xf001fa(0x305)](this, _0x4f2fc4, _0x3ca34c, _0x58141c); }, Game_Message[_0x137c0c(0x3b4)][_0x137c0c(0x495)] = function () { const _0xa62417 = _0x137c0c; this[_0xa62417(0x17f)] = ![], this[_0xa62417(0x2be)] = []; const _0x32ab2d = this[_0xa62417(0x174)][_0xa62417(0xbf)]; this[_0xa62417(0x1e2)] = _0x32ab2d; let _0x2b6ed7 = ![]; for (let _0x3c938c = 0x0; _0x3c938c < _0x32ab2d; _0x3c938c++) { let _0x319090 = this[_0xa62417(0x174)][_0x3c938c]; _0x319090[_0xa62417(0x504)](/<SHUFFLE>/gi) && (_0x2b6ed7 = !![], _0x319090 = _0x319090[_0xa62417(0x38f)](/<SHUFFLE>/gi, '')), _0x319090[_0xa62417(0x504)](/<SHUFFLE:[ ](\d+)>/gi) && (_0x2b6ed7 = !![], this[_0xa62417(0x1e2)] = Math[_0xa62417(0x22e)](Number(RegExp['$1']), this['_maxShuffleChoices']), _0x319090 = _0x319090[_0xa62417(0x38f)](/<SHUFFLE:[ ](\d+)>/gi, '')), _0x319090[_0xa62417(0x504)](/<SHUFFLE: VAR[ ](\d+)>/gi) && (_0x2b6ed7 = !![], this[_0xa62417(0x1e2)] = Math[_0xa62417(0x22e)]($gameVariables[_0xa62417(0x424)](Number(RegExp['$1'])) || 0x1, this[_0xa62417(0x1e2)]), _0x319090 = _0x319090[_0xa62417(0x38f)](/<SHUFFLE:[ ]VAR (\d+)>/gi, '')), this[_0xa62417(0x2be)][_0xa62417(0x21e)](_0x3c938c), this['_choices'][_0x3c938c] = _0x319090; } if (_0x2b6ed7) { this[_0xa62417(0x2be)] = VisuMZ[_0xa62417(0x4bf)][_0xa62417(0x2ab)](this[_0xa62417(0x2be)]); if (this[_0xa62417(0x43a)]() !== -0x2) this[_0xa62417(0x256)] = -0x1; } }, VisuMZ['MessageCore']['ShuffleArray'] = function (_0x1fa628) { const _0x71af96 = _0x137c0c; var _0x1f7a1b, _0xf27ed3, _0x3d1d23; for (_0x3d1d23 = _0x1fa628[_0x71af96(0xbf)] - 0x1; _0x3d1d23 > 0x0; _0x3d1d23--) { _0x1f7a1b = Math[_0x71af96(0x4ae)](Math[_0x71af96(0x2bc)]() * (_0x3d1d23 + 0x1)), _0xf27ed3 = _0x1fa628[_0x3d1d23], _0x1fa628[_0x3d1d23] = _0x1fa628[_0x1f7a1b], _0x1fa628[_0x1f7a1b] = _0xf27ed3; } return _0x1fa628; }, Game_Message[_0x137c0c(0x3b4)][_0x137c0c(0x3d5)] = function () { const _0x5eec26 = _0x137c0c; if (!this['_choiceIndexArray']) this[_0x5eec26(0x495)](); return this[_0x5eec26(0x2be)]; }, Game_Message['prototype'][_0x137c0c(0x46b)] = function () { const _0x3d0e55 = _0x137c0c; if (this[_0x3d0e55(0x1e2)] === undefined) this[_0x3d0e55(0x495)](); return this[_0x3d0e55(0x1e2)]; }, VisuMZ[_0x137c0c(0x4bf)][_0x137c0c(0x31c)] = Game_Screen[_0x137c0c(0x3b4)][_0x137c0c(0x255)], Game_Screen['prototype']['clearPictures'] = function () { const _0x340afa = _0x137c0c; VisuMZ[_0x340afa(0x4bf)]['Game_Screen_clearPictures'][_0x340afa(0x305)](this), this[_0x340afa(0x186)](); }, Game_Screen[_0x137c0c(0x3b4)]['clearAllPictureTexts'] = function () { const _0x58373c = _0x137c0c; this[_0x58373c(0x308)] = [], this['_pictureTextBuffer'] = [], this[_0x58373c(0x1fe)] = []; }, Game_Screen[_0x137c0c(0x3b4)][_0x137c0c(0x45f)] = function (_0x38a25d) { const _0x31397a = _0x137c0c; if (this[_0x31397a(0x308)] === undefined) this[_0x31397a(0x186)](); const _0x71234d = this[_0x31397a(0xa6)](_0x38a25d); return this['_pictureText'][_0x71234d] = this['_pictureText'][_0x71234d] || {}, this[_0x31397a(0x308)][_0x71234d]; }, Game_Screen['prototype'][_0x137c0c(0x25f)] = function (_0x52f390, _0x265f3f) { const _0x387925 = _0x137c0c; return _0x265f3f = _0x265f3f[_0x387925(0xcd)]()[_0x387925(0xca)](), this[_0x387925(0x45f)](_0x52f390)[_0x265f3f] || ''; }, Game_Screen[_0x137c0c(0x3b4)]['setPictureText'] = function (_0x3692d9, _0x5e1fdf, _0x454fc0) { const _0x1448f0 = _0x137c0c; _0x454fc0 = _0x454fc0['toLowerCase']()['trim'](), this['getPictureTextData'](_0x3692d9)[_0x454fc0] = _0x5e1fdf || '', this[_0x1448f0(0x339)](_0x3692d9, !![]); }, Game_Screen[_0x137c0c(0x3b4)][_0x137c0c(0x9b)] = function (_0x4140c1) { const _0x3973ef = _0x137c0c; if (this[_0x3973ef(0x308)] === undefined) this[_0x3973ef(0x186)](); const _0x2f2445 = this[_0x3973ef(0xa6)](_0x4140c1); this['_pictureText'][_0x2f2445] = null, this['requestPictureTextRefresh'](_0x4140c1, !![]); }, Game_Screen[_0x137c0c(0x3b4)][_0x137c0c(0x2ac)] = function (_0x41b499) { const _0x30c85f = _0x137c0c; if (this[_0x30c85f(0x308)] === undefined) this['clearAllPictureTexts'](); const _0x3c848b = this[_0x30c85f(0xa6)](_0x41b499); return this[_0x30c85f(0x21a)][_0x3c848b] || 0x0; }, Game_Screen[_0x137c0c(0x3b4)][_0x137c0c(0x369)] = function (_0x425759, _0x4792ee) { const _0xc8f6c5 = _0x137c0c; if (this[_0xc8f6c5(0x308)] === undefined) this[_0xc8f6c5(0x186)](); const _0x2e2b1b = this[_0xc8f6c5(0xa6)](_0x425759); this[_0xc8f6c5(0x21a)][_0x2e2b1b] = Math[_0xc8f6c5(0x168)](0x0, _0x4792ee); }, Game_Screen[_0x137c0c(0x3b4)][_0x137c0c(0x4c4)] = function (_0x472d98) { const _0x1628a9 = _0x137c0c; if (this[_0x1628a9(0x308)] === undefined) this['clearAllPictureTexts'](); const _0xee659d = this[_0x1628a9(0xa6)](_0x472d98); this[_0x1628a9(0x21a)][_0xee659d] = undefined; }, VisuMZ[_0x137c0c(0x4bf)][_0x137c0c(0x361)] = Game_Screen[_0x137c0c(0x3b4)][_0x137c0c(0x11a)], Game_Screen[_0x137c0c(0x3b4)][_0x137c0c(0x11a)] = function (_0x6f7cf5) { const _0x1f760d = _0x137c0c; VisuMZ[_0x1f760d(0x4bf)]['Game_Screen_erasePicture']['call'](this, _0x6f7cf5), this[_0x1f760d(0x9b)](_0x6f7cf5), this[_0x1f760d(0x4c4)](_0x6f7cf5), this[_0x1f760d(0x339)](_0x6f7cf5, !![]); }, Game_Screen['prototype']['requestPictureTextRefreshAll'] = function () { const _0x5e30d9 = _0x137c0c; for (const _0xa158cb of this[_0x5e30d9(0x3f1)]) { if (_0x5e30d9(0x2e4) !== _0x5e30d9(0x2d6)) { if (_0xa158cb) { if (_0x5e30d9(0x486) === _0x5e30d9(0x473)) { if (!this[_0x5e30d9(0x297)]) return; this[_0x5e30d9(0x41a)](), this[_0x5e30d9(0x458)](), this[_0x5e30d9(0x3fb)](), this['attachPictureText'](); } else { let _0x130934 = this['_pictures'][_0x5e30d9(0x39b)](_0xa158cb); this[_0x5e30d9(0x339)](_0x130934); } } } else { if (!this['_pictureTextWindow']) return; if (!this[_0x5e30d9(0x4a0)]) return; this['_pictureTextSprite']['bitmap'] = this['_pictureTextWindow'][_0x5e30d9(0x146)]; } } }, Game_Screen[_0x137c0c(0x3b4)][_0x137c0c(0x339)] = function (_0x2cb18d, _0x3b6fc6) { const _0x21a369 = _0x137c0c; this[_0x21a369(0x1fe)] = this[_0x21a369(0x1fe)] || []; if (this[_0x21a369(0x4e6)](_0x2cb18d) || _0x3b6fc6) { if (_0x21a369(0x39c) === _0x21a369(0x39a)) { if (_0x3b6cf4['parameters'][0x1] >= 0x0) { var _0x460895 = _0x106ecf[_0x21a369(0x410)][0x1] + _0x467449; this[_0x21a369(0x47c)][_0x428383][_0x21a369(0x410)][0x1] = _0x460895; } else _0x58e101['parameters'][0x1] === -0x2 && (this[_0x21a369(0x47c)][_0x55dbf6][_0x21a369(0x410)][0x1] = _0x3130d1[_0x21a369(0x410)][0x1]); } else this[_0x21a369(0x1fe)][_0x21a369(0x21e)](_0x2cb18d); } }, Game_Screen[_0x137c0c(0x3b4)][_0x137c0c(0x38c)] = function (_0x412690) { const _0x20f94c = _0x137c0c; return this[_0x20f94c(0x1fe)] = this[_0x20f94c(0x1fe)] || [], this[_0x20f94c(0x1fe)][_0x20f94c(0x27c)](_0x412690); }, Game_Screen[_0x137c0c(0x3b4)][_0x137c0c(0x122)] = function (_0x48f223) { const _0x4d74aa = _0x137c0c; this[_0x4d74aa(0x1fe)] = this[_0x4d74aa(0x1fe)] || [], this[_0x4d74aa(0x1fe)][_0x4d74aa(0xe7)](_0x48f223); }, Game_Screen[_0x137c0c(0x3b4)]['hasPictureText'] = function (_0xe203) { const _0x520da4 = _0x137c0c, _0x2ae933 = [_0x520da4(0x1d1), 'up', _0x520da4(0x192), _0x520da4(0x21d), _0x520da4(0x508), _0x520da4(0x1f1), _0x520da4(0x252), _0x520da4(0x1e5), _0x520da4(0x25e)]; return _0x2ae933['some'](_0x39d305 => this['getPictureText'](_0xe203, _0x39d305) !== ''); }, VisuMZ[_0x137c0c(0x4bf)][_0x137c0c(0x1c1)] = Game_Party[_0x137c0c(0x3b4)][_0x137c0c(0x2cf)], Game_Party[_0x137c0c(0x3b4)][_0x137c0c(0x2cf)] = function () { const _0x356704 = _0x137c0c; VisuMZ[_0x356704(0x4bf)]['Game_Party_initialize'][_0x356704(0x305)](this), this['initMessageCore'](); }, Game_Party['prototype']['initMessageCore'] = function () { const _0x4a30c7 = _0x137c0c; this[_0x4a30c7(0x4d1)] = { 'type': 0x0, 'id': 0x0, 'quantity': 0x0 }; }, Game_Party[_0x137c0c(0x3b4)]['getLastGainedItemData'] = function () { const _0x238757 = _0x137c0c; if (this['_lastGainedItemData'] === undefined) this['initMessageCore'](); return this[_0x238757(0x4d1)]; }, Game_Party[_0x137c0c(0x3b4)][_0x137c0c(0x13c)] = function (_0x4d7555, _0x492a07) { const _0x266f6a = _0x137c0c; if (this[_0x266f6a(0x4d1)] === undefined) this[_0x266f6a(0x2d3)](); if (!_0x4d7555) return; if (DataManager['isItem'](_0x4d7555)) this[_0x266f6a(0x4d1)][_0x266f6a(0x144)] = 0x0; else { if (DataManager[_0x266f6a(0x4da)](_0x4d7555)) { if ('tuMPq' === _0x266f6a(0x180)) this[_0x266f6a(0x4d1)][_0x266f6a(0x144)] = 0x1; else return _0x6a964a['VisuMZ_0_CoreEngine'] && (_0x4d68b4 = _0x3893cd[_0x266f6a(0x38f)](/<Up (?:KEY|BUTTON)>/gi, this[_0x266f6a(0x2bf)]('up')), _0x359308 = _0x528ebe[_0x266f6a(0x38f)](/<Left (?:KEY|BUTTON)>/gi, this[_0x266f6a(0x2bf)]('left')), _0x74371d = _0x32630b['replace'](/<Right (?:KEY|BUTTON)>/gi, this[_0x266f6a(0x2bf)](_0x266f6a(0x1f1))), _0x28f7e6 = _0x3fc737[_0x266f6a(0x38f)](/<Down (?:KEY|BUTTON)>/gi, this[_0x266f6a(0x2bf)]('down')), _0x5ddcd0 = _0x106edc['replace'](/<Ok (?:KEY|BUTTON)>/gi, this[_0x266f6a(0x2bf)]('ok')), _0x51b7fb = _0x568b0f[_0x266f6a(0x38f)](/<Cancel (?:KEY|BUTTON)>/gi, this[_0x266f6a(0x2bf)](_0x266f6a(0x1e1))), _0x5b4fda = _0x987b84['replace'](/<Menu (?:KEY|BUTTON)>/gi, this['convertButtonAssistText'](_0x266f6a(0x29c))), _0x1ff847 = _0x5bb8d1[_0x266f6a(0x38f)](/<Shift (?:KEY|BUTTON)>/gi, this['convertButtonAssistText'](_0x266f6a(0x35f))), _0x57f046 = _0x1f8c20['replace'](/<(?:PAGEUP|PAGE UP) (?:KEY|BUTTON)>/gi, this[_0x266f6a(0x2bf)]('pageup')), _0x2e2940 = _0x3b3bdc[_0x266f6a(0x38f)](/<(?:PAGEDOWN|PAGEDN|PAGE DOWN) (?:KEY|BUTTON)>/gi, this[_0x266f6a(0x2bf)](_0x266f6a(0x134)))), _0x4e0001; } else { if (DataManager[_0x266f6a(0x439)](_0x4d7555)) { if (_0x266f6a(0x126) !== _0x266f6a(0x126)) return this['_textAlignment']; else this[_0x266f6a(0x4d1)][_0x266f6a(0x144)] = 0x2; } } } this['_lastGainedItemData']['id'] = _0x4d7555['id'], this['_lastGainedItemData'][_0x266f6a(0x150)] = _0x492a07; }, VisuMZ[_0x137c0c(0x4bf)][_0x137c0c(0x198)] = Game_Party['prototype'][_0x137c0c(0x427)], Game_Party[_0x137c0c(0x3b4)][_0x137c0c(0x427)] = function (_0x25b734, _0x170157, _0x30deb3) { const _0x41d5e7 = _0x137c0c; VisuMZ[_0x41d5e7(0x4bf)][_0x41d5e7(0x198)][_0x41d5e7(0x305)](this, _0x25b734, _0x170157, _0x30deb3), _0x170157 > 0x0 && this['setLastGainedItemData'](_0x25b734, _0x170157); }, VisuMZ[_0x137c0c(0x4bf)][_0x137c0c(0x4e3)] = Game_Map[_0x137c0c(0x3b4)][_0x137c0c(0x2cf)], Game_Map[_0x137c0c(0x3b4)][_0x137c0c(0x2cf)] = function () { const _0x34e51b = _0x137c0c; VisuMZ[_0x34e51b(0x4bf)]['Game_Map_initialize'][_0x34e51b(0x305)](this), this[_0x34e51b(0xe1)] = []; }, VisuMZ['MessageCore'][_0x137c0c(0x14d)] = Game_Map['prototype'][_0x137c0c(0x34d)], Game_Map['prototype'][_0x137c0c(0x34d)] = function () { const _0x2eae12 = _0x137c0c; VisuMZ[_0x2eae12(0x4bf)][_0x2eae12(0x14d)]['call'](this), this[_0x2eae12(0xe1)] = []; }, VisuMZ[_0x137c0c(0x4bf)]['Game_Map_updateEvents'] = Game_Map[_0x137c0c(0x3b4)][_0x137c0c(0x413)], Game_Map[_0x137c0c(0x3b4)][_0x137c0c(0x413)] = function () { const _0x188e13 = _0x137c0c; VisuMZ[_0x188e13(0x4bf)][_0x188e13(0x28f)][_0x188e13(0x305)](this), this['updateMessageCommonEvents'](); }, Game_Map['prototype']['addMessageCommonEvent'] = function (_0x53003d) { const _0x41720f = _0x137c0c; if (!$dataCommonEvents[_0x53003d]) return; this[_0x41720f(0xe1)] = this[_0x41720f(0xe1)] || []; const _0x4f80b7 = this['_interpreter'][_0x41720f(0x228)], _0x671626 = new Game_MessageCommonEvent(_0x53003d, _0x4f80b7); this['_messageCommonEvents'][_0x41720f(0x21e)](_0x671626); }, Game_Map[_0x137c0c(0x3b4)][_0x137c0c(0xd9)] = function () { const _0x39656e = _0x137c0c; this[_0x39656e(0xe1)] = this['_messageCommonEvents'] || []; for (const _0x1d5f1e of this[_0x39656e(0xe1)]) { !_0x1d5f1e['_interpreter'] ? this[_0x39656e(0xe1)]['remove'](_0x1d5f1e) : _0x1d5f1e[_0x39656e(0x273)](); } }, VisuMZ[_0x137c0c(0x4bf)][_0x137c0c(0x31f)] = Game_Map[_0x137c0c(0x3b4)][_0x137c0c(0x3bb)], Game_Map[_0x137c0c(0x3b4)][_0x137c0c(0x3bb)] = function () { const _0x4c228b = _0x137c0c; VisuMZ[_0x4c228b(0x4bf)][_0x4c228b(0x31f)]['call'](this), $gameScreen['requestPictureTextRefreshAll'](); }, Game_Interpreter[_0x137c0c(0x3da)] = pluginData[_0x137c0c(0x24b)], Game_Interpreter['prototype']['command101'] = function (_0x3c1547) { const _0x2d2a57 = _0x137c0c; if ($gameMessage[_0x2d2a57(0x1ce)]()) return ![]; return this[_0x2d2a57(0x43e)](_0x3c1547), this[_0x2d2a57(0x2f3)](_0x3c1547), this[_0x2d2a57(0x2f4)](_0x3c1547), this['setWaitMode'](_0x2d2a57(0xa0)), !![]; }, Game_Interpreter[_0x137c0c(0x3b4)][_0x137c0c(0x43e)] = function (_0x42fd7d) { const _0x25f02c = _0x137c0c; $gameMessage[_0x25f02c(0x44e)](_0x42fd7d[0x0], _0x42fd7d[0x1]), $gameMessage[_0x25f02c(0x26f)](_0x42fd7d[0x2]), $gameMessage[_0x25f02c(0x13a)](_0x42fd7d[0x3]), $gameMessage[_0x25f02c(0x153)](_0x42fd7d[0x4]); }, Game_Interpreter[_0x137c0c(0x3b4)][_0x137c0c(0x2f3)] = function (_0x8a0543) { const _0x23989d = _0x137c0c; while (this[_0x23989d(0x26a)]()) { this[_0x23989d(0x309)]++; if (this[_0x23989d(0xf2)]()[_0x23989d(0x317)] === 0x191) { if (_0x23989d(0x14f) !== _0x23989d(0x14f)) return this[_0x23989d(0x132)]; else { let _0x7c9045 = this['currentCommand']()[_0x23989d(0x410)][0x0]; _0x7c9045 = VisuMZ[_0x23989d(0x4bf)][_0x23989d(0x12d)](_0x7c9045), $gameMessage[_0x23989d(0x4f2)](_0x7c9045); } } if (this[_0x23989d(0x49f)]()) { if ('sgTpa' === 'xFZdE') _0x432091[_0x23989d(0x4bf)][_0x23989d(0x451)][_0x23989d(0x305)](this), this[_0x23989d(0x262)](); else break; } } }, Game_Interpreter[_0x137c0c(0x3b4)]['isContinuePrepareShowTextCommands'] = function () { const _0x2408a6 = _0x137c0c; if (this['nextEventCode']() === 0x65 && $gameSystem['getMessageWindowRows']() > 0x4) { if (_0x2408a6(0x3c7) !== 'mJrDI') return !![]; else { let _0x4a7962 = _0x1fdbb0[_0x2408a6(0x46e)] + _0xfb1d80[_0x2408a6(0x3b3)]() * 0x2 + 0x6; const _0x225681 = _0x4c274b['faceName']() !== '', _0x199aaa = _0x57f236['faceWidth'], _0x3dbdae = 0x14; _0x4a7962 += _0x225681 ? _0x199aaa + _0x3dbdae : 0x4; if (_0x4a7962 % 0x2 !== 0x0) _0x4a7962 += 0x1; _0x547484['setMessageWindowWidth'](_0x4a7962); } } else return this[_0x2408a6(0x364)]() === 0x191; }, VisuMZ[_0x137c0c(0x4bf)][_0x137c0c(0x12d)] = function (_0xe8ce01) { const _0x3a801d = _0x137c0c, _0x5a2622 = VisuMZ[_0x3a801d(0x4bf)]['Settings']['General']; return _0xe8ce01 = (_0x5a2622[_0x3a801d(0x167)] || '') + _0xe8ce01 + (_0x5a2622[_0x3a801d(0x362)] || ''), _0xe8ce01 = _0xe8ce01['replace'](/<(?:NEXT PAGE|NEXTPAGE)>/gi, ''), _0xe8ce01 = _0xe8ce01[_0x3a801d(0x38f)](/<(?:RNG|RAND|RANDOM)>(.*?)<\/(?:RNG|RAND|RANDOM)>/gi, (_0xeb61b8, _0x45144f) => this[_0x3a801d(0x449)](_0x45144f)), _0xe8ce01; }, VisuMZ[_0x137c0c(0x4bf)][_0x137c0c(0x449)] = function (_0x44b6d8) { const _0x3a28e4 = _0x137c0c, _0x35aa2c = _0x44b6d8[_0x3a28e4(0x1f9)]('|')[_0x3a28e4(0x141)](_0x356077 => _0x356077[_0x3a28e4(0xca)]())['remove']('')[_0x3a28e4(0xe7)](null); return _0x35aa2c[Math[_0x3a28e4(0x4b4)](_0x35aa2c[_0x3a28e4(0xbf)])]; }, Game_Interpreter[_0x137c0c(0x3b4)][_0x137c0c(0x49f)] = function () { const _0x284c72 = _0x137c0c; if (this[_0x284c72(0xf2)]() && this[_0x284c72(0xf2)]()['parameters'][0x0][_0x284c72(0x504)](/<(?:NEXT PAGE|NEXTPAGE)>/gi)) return !![]; return $gameMessage['_texts'][_0x284c72(0xbf)] >= $gameSystem[_0x284c72(0x1fc)]() && this[_0x284c72(0x364)]() !== 0x191; }, Game_Interpreter['prototype']['prepareShowTextFollowups'] = function (_0x5a30ca) { const _0x4937aa = _0x137c0c; switch (this[_0x4937aa(0x364)]()) { case 0x66: this[_0x4937aa(0x309)]++, this[_0x4937aa(0x2f7)](this[_0x4937aa(0xf2)]()[_0x4937aa(0x410)]); break; case 0x67: this[_0x4937aa(0x309)]++, this[_0x4937aa(0x239)](this[_0x4937aa(0xf2)]()[_0x4937aa(0x410)]); break; case 0x68: this['_index']++, this[_0x4937aa(0x284)](this[_0x4937aa(0xf2)]()['parameters']); break; case 0x165: const _0x4325a3 = this[_0x4937aa(0x47c)][this[_0x4937aa(0x309)] + 0x1], _0x2e17c6 = _0x4325a3[_0x4937aa(0x410)]; if (_0x2e17c6[0x0] === Game_Interpreter['MESSAGE_CORE_PLUGIN_NAME']) { if (_0x4937aa(0x45a) === 'nkTlz') { const _0x3a9937 = _0xa42a7e[_0x4937aa(0x253)](_0x405286), _0x54fc1d = this[_0x4937aa(0x2a0)](), _0x4e0540 = _0x54fc1d + this['commandName'](_0x4db241), _0x25ec25 = this['itemRectWithPadding'](_0xea37c0); _0x3a9937[_0x4937aa(0x28c)](this[_0x4937aa(0x4b3)][_0x4937aa(0x29b)](this, _0x571f48, !![], _0x4e0540, _0x25ec25, _0x3a9937)); return; } else this[_0x4937aa(0x3af)](_0x2e17c6); } break; } }, VisuMZ[_0x137c0c(0x4bf)][_0x137c0c(0x4d6)] = Game_Interpreter['prototype'][_0x137c0c(0x2f7)], Game_Interpreter[_0x137c0c(0x3b4)][_0x137c0c(0x2f7)] = function (_0x4873f5) { const _0x44537e = _0x137c0c; _0x4873f5 = this['addContinuousShowChoices'](), VisuMZ[_0x44537e(0x4bf)]['Game_Interpreter_setupChoices']['call'](this, _0x4873f5), $gameMessage['setupShuffleChoices'](); }, Game_Interpreter[_0x137c0c(0x3b4)]['addContinuousShowChoices'] = function () { const _0x2f5b33 = _0x137c0c, _0x1e4ff0 = this['_index'], _0x391ee4 = []; let _0x2acf09 = 0x0; this[_0x2f5b33(0x309)]++; while (this[_0x2f5b33(0x309)] < this[_0x2f5b33(0x47c)][_0x2f5b33(0xbf)]) { if (this['currentCommand']()['indent'] === this[_0x2f5b33(0x1b1)]) { if (_0x2f5b33(0x3c8) === _0x2f5b33(0x3a2)) { if (!_0x4804a3[_0x2f5b33(0x4da)](_0x5816d1)) return ![]; const _0x458c6e = _0x58ce4f[_0x2f5b33(0x49a)](); if (_0x458c6e > 0x0) { if (_0x1677be['wtypeId'] !== _0x458c6e) return ![]; } return !![]; } else { if (this[_0x2f5b33(0xf2)]()[_0x2f5b33(0x317)] === 0x194 && this['nextEventCode']() !== 0x66) break; else { if (this[_0x2f5b33(0xf2)]()[_0x2f5b33(0x317)] === 0x66) _0x2f5b33(0x2f1) === _0x2f5b33(0x323) ? (this[_0x2f5b33(0xba)]['setText'](this[_0x2f5b33(0x472)][_0x550296]), this[_0x2f5b33(0xba)][_0x2f5b33(0x14e)]()) : (this[_0x2f5b33(0x44b)](_0x2acf09, this['currentCommand'](), _0x1e4ff0), this[_0x2f5b33(0x309)] -= 0x2); else this[_0x2f5b33(0xf2)]()[_0x2f5b33(0x317)] === 0x192 && (this['currentCommand']()[_0x2f5b33(0x410)][0x0] = _0x2acf09, _0x2acf09++); } } } this[_0x2f5b33(0x309)]++; } return this['_index'] = _0x1e4ff0, this[_0x2f5b33(0xf2)]()[_0x2f5b33(0x410)]; }, Game_Interpreter['prototype'][_0x137c0c(0x44b)] = function (_0x30963d, _0x7f8e67, _0x323eeb) { const _0x2bea4c = _0x137c0c; this[_0x2bea4c(0x2c5)](_0x30963d, _0x7f8e67, _0x323eeb), this[_0x2bea4c(0x380)](_0x30963d, _0x7f8e67, _0x323eeb), this[_0x2bea4c(0x35e)](_0x7f8e67, _0x323eeb); }, Game_Interpreter[_0x137c0c(0x3b4)]['adjustShowChoiceDefault'] = function (_0x2c839d, _0x22b07a, _0x3908e1) { const _0x2f94ad = _0x137c0c; if (_0x22b07a[_0x2f94ad(0x410)][0x2] < 0x0) return; const _0xc31205 = _0x22b07a[_0x2f94ad(0x410)][0x2] + _0x2c839d; this[_0x2f94ad(0x47c)][_0x3908e1][_0x2f94ad(0x410)][0x2] = _0xc31205; }, Game_Interpreter[_0x137c0c(0x3b4)][_0x137c0c(0x380)] = function (_0x55fc8b, _0x2a680d, _0x217d77) { const _0x4fa2ab = _0x137c0c; if (_0x2a680d[_0x4fa2ab(0x410)][0x1] >= 0x0) { var _0x5ad748 = _0x2a680d['parameters'][0x1] + _0x55fc8b; this[_0x4fa2ab(0x47c)][_0x217d77][_0x4fa2ab(0x410)][0x1] = _0x5ad748; } else _0x2a680d['parameters'][0x1] === -0x2 && (_0x4fa2ab(0x29d) !== _0x4fa2ab(0x31b) ? this[_0x4fa2ab(0x47c)][_0x217d77][_0x4fa2ab(0x410)][0x1] = _0x2a680d[_0x4fa2ab(0x410)][0x1] : (this['_helpWindow'][_0x4fa2ab(0x4eb)](), this[_0x4fa2ab(0xba)][_0x4fa2ab(0x4d5)]())); }, Game_Interpreter[_0x137c0c(0x3b4)][_0x137c0c(0x35e)] = function (_0x586613, _0xd33480) { const _0x21c65c = _0x137c0c; for (const _0x562abe of _0x586613[_0x21c65c(0x410)][0x0]) { this['_list'][_0xd33480][_0x21c65c(0x410)][0x0]['push'](_0x562abe); } this[_0x21c65c(0x47c)][_0x21c65c(0x172)](this[_0x21c65c(0x309)] - 0x1, 0x2); }, Game_Interpreter[_0x137c0c(0x3b4)][_0x137c0c(0x3af)] = function (_0x5c6487) { const _0x432364 = _0x137c0c, _0x54c3e0 = _0x5c6487[0x1]; if (_0x54c3e0 === 'SelectWeapon') { if (_0x432364(0x4df) !== 'UIeCy') this[_0x432364(0x309)]++, this[_0x432364(0x475)](_0x5c6487); else return _0x1ed161[_0x432364(0xb3)](_0x4bfece, this[_0x432364(0x13b)]); } else { if (_0x54c3e0 === _0x432364(0xe8)) this[_0x432364(0x309)]++, this['setArmorChoice'](_0x5c6487); else _0x54c3e0 === _0x432364(0x25c) && Imported[_0x432364(0x222)] && (this[_0x432364(0x309)]++, this['setSkillChoice'](_0x5c6487)); } }, Game_Interpreter[_0x137c0c(0x3b4)]['setWeaponChoice'] = function (_0x515e77) { const _0x26a40a = _0x137c0c, _0x5b9b04 = JSON[_0x26a40a(0x2f5)](JSON['stringify'](_0x515e77[0x3])); VisuMZ[_0x26a40a(0x404)](_0x5b9b04, _0x5b9b04), $gameMessage[_0x26a40a(0x475)](_0x5b9b04[_0x26a40a(0x4f3)] || 0x0, _0x5b9b04['WeaponTypeID'] || 0x0); }, Game_Interpreter[_0x137c0c(0x3b4)][_0x137c0c(0x393)] = function (_0x5d03f5) { const _0x4db883 = _0x137c0c, _0x386fa1 = JSON['parse'](JSON[_0x4db883(0x469)](_0x5d03f5[0x3])); VisuMZ[_0x4db883(0x404)](_0x386fa1, _0x386fa1), $gameMessage[_0x4db883(0x393)](_0x386fa1[_0x4db883(0x4f3)] || 0x0, _0x386fa1[_0x4db883(0x4c9)] || 0x0, _0x386fa1[_0x4db883(0x4bb)] || 0x0); }, Game_Interpreter[_0x137c0c(0x3b4)]['setSkillChoice'] = function (_0x55b685) { const _0x2c199a = _0x137c0c, _0x39a514 = JSON[_0x2c199a(0x2f5)](JSON[_0x2c199a(0x469)](_0x55b685[0x3])); VisuMZ[_0x2c199a(0x404)](_0x39a514, _0x39a514), $gameMessage[_0x2c199a(0x500)](_0x39a514[_0x2c199a(0x4f3)] || 0x0, _0x39a514[_0x2c199a(0x394)] || 0x0, _0x39a514['SkillTypeID'] || 0x0); }; function Game_MessageCommonEvent() { const _0x21e903 = _0x137c0c; this[_0x21e903(0x2cf)](...arguments); } function _0x5c59(_0xf93e3e, _0x4debfa) { const _0x5b3ab4 = _0x5b3a(); return _0x5c59 = function (_0x5c59a0, _0x57cca9) { _0x5c59a0 = _0x5c59a0 - 0x94; let _0x422cf9 = _0x5b3ab4[_0x5c59a0]; return _0x422cf9; }, _0x5c59(_0xf93e3e, _0x4debfa); } Game_MessageCommonEvent['prototype'][_0x137c0c(0x2cf)] = function (_0x3c8eaa, _0x2b2e5a) { const _0x94ab8a = _0x137c0c; this[_0x94ab8a(0x135)] = _0x3c8eaa, this['_eventId'] = _0x2b2e5a || 0x0, this[_0x94ab8a(0x3bb)](); }, Game_MessageCommonEvent[_0x137c0c(0x3b4)]['event'] = function () { return $dataCommonEvents[this['_commonEventId']]; }, Game_MessageCommonEvent['prototype'][_0x137c0c(0xe4)] = function () { return this['event']()['list']; }, Game_MessageCommonEvent[_0x137c0c(0x3b4)][_0x137c0c(0x3bb)] = function () { const _0x226f40 = _0x137c0c; this[_0x226f40(0x41b)] = new Game_Interpreter(), this['_interpreter'][_0x226f40(0x3b8)](this['list'](), this['_eventId']); }, Game_MessageCommonEvent[_0x137c0c(0x3b4)][_0x137c0c(0x273)] = function () { const _0x34f1e2 = _0x137c0c; this['_interpreter'] && (this[_0x34f1e2(0x41b)][_0x34f1e2(0x355)]() ? this[_0x34f1e2(0x41b)][_0x34f1e2(0x273)]() : _0x34f1e2(0x4b9) === 'NGAHn' ? (this[_0x34f1e2(0x15b)](), this[_0x34f1e2(0x3e5)](), this[_0x34f1e2(0x496)](_0x2140db)) : this[_0x34f1e2(0x4eb)]()); }, Game_MessageCommonEvent['prototype'][_0x137c0c(0x4eb)] = function () { const _0xb35b25 = _0x137c0c; this[_0xb35b25(0x41b)] = null; }, Scene_Message[_0x137c0c(0x3b4)][_0x137c0c(0x2b3)] = function () { const _0x301120 = _0x137c0c, _0x2375d8 = Math['min'](Graphics[_0x301120(0x46e)], $gameSystem[_0x301120(0x2d4)]()), _0x25f918 = $gameSystem[_0x301120(0x1fc)](), _0x3973e8 = this[_0x301120(0x263)](_0x25f918, ![]), _0x3028df = (Graphics[_0x301120(0x433)] - _0x2375d8) / 0x2, _0x59156f = 0x0; return new Rectangle(_0x3028df, _0x59156f, _0x2375d8, _0x3973e8); }, VisuMZ[_0x137c0c(0x4bf)][_0x137c0c(0x3ba)] = Scene_Message[_0x137c0c(0x3b4)][_0x137c0c(0x2e6)], Scene_Message[_0x137c0c(0x3b4)]['createChoiceListWindow'] = function () { const _0x3d8f5a = _0x137c0c; VisuMZ[_0x3d8f5a(0x4bf)][_0x3d8f5a(0x3ba)][_0x3d8f5a(0x305)](this), this['createChoiceListHelpWindow'](); }, Scene_Message[_0x137c0c(0x3b4)][_0x137c0c(0x101)] = function () { const _0x44c295 = _0x137c0c, _0x5af174 = this[_0x44c295(0x421)](), _0x1a6db5 = new Window_Help(_0x5af174); _0x1a6db5[_0x44c295(0x4d5)](), this[_0x44c295(0x415)][_0x44c295(0x2dc)](_0x1a6db5), this[_0x44c295(0x2c1)][_0x44c295(0x231)](_0x1a6db5), this['addWindow'](_0x1a6db5), this[_0x44c295(0x220)] = _0x1a6db5; }, Scene_Message['prototype'][_0x137c0c(0x421)] = function () { const _0xfd1211 = _0x137c0c, _0x26d80a = 0x0, _0x5edc72 = 0x0, _0x580ad8 = Graphics[_0xfd1211(0x433)], _0x2e07d2 = this[_0xfd1211(0x263)](0x2, ![]); return new Rectangle(_0x26d80a, _0x5edc72, _0x580ad8, _0x2e07d2); }, Window_Message[_0x137c0c(0x3b4)][_0x137c0c(0x231)] = function (_0x326d9b) { const _0x150b01 = _0x137c0c; this[_0x150b01(0x220)] = _0x326d9b; }, Window_Message[_0x137c0c(0x3b4)][_0x137c0c(0x9d)] = function () { const _0xa389d = _0x137c0c; if (!this[_0xa389d(0x220)]) return; const _0x5dcc4b = this[_0xa389d(0x220)]; _0x5dcc4b && (_0x5dcc4b['y'] = this['y'] > 0x0 ? 0x0 : Graphics[_0xa389d(0x455)] - _0x5dcc4b[_0xa389d(0x3e3)]); }, VisuMZ[_0x137c0c(0x4bf)][_0x137c0c(0x414)] = Scene_Options[_0x137c0c(0x3b4)][_0x137c0c(0x15a)], Scene_Options[_0x137c0c(0x3b4)][_0x137c0c(0x15a)] = function () { const _0x8ea11f = _0x137c0c; let _0x2bc52e = VisuMZ['MessageCore']['Scene_Options_maxCommands'][_0x8ea11f(0x305)](this); const _0x2c9c68 = VisuMZ[_0x8ea11f(0x4bf)]['Settings']; if (_0x2c9c68[_0x8ea11f(0x257)][_0x8ea11f(0x494)]) { _0x2c9c68['Localization'][_0x8ea11f(0x359)] && TextManager[_0x8ea11f(0x2d2)]() && (_0x8ea11f(0x1e4) !== _0x8ea11f(0x1e4) ? _0x48403a = _0x19a2d5(_0x38fe12['$2'])[_0x8ea11f(0xca)]() : _0x2bc52e++); if (_0x2c9c68[_0x8ea11f(0x257)][_0x8ea11f(0x359)]) _0x2bc52e++; } return _0x2bc52e; }, VisuMZ[_0x137c0c(0x4bf)][_0x137c0c(0x2f0)] = Sprite_Picture[_0x137c0c(0x3b4)][_0x137c0c(0x1cf)], Sprite_Picture[_0x137c0c(0x3b4)][_0x137c0c(0x1cf)] = function () { const _0x239e5d = _0x137c0c; VisuMZ['MessageCore']['Sprite_Picture_updateBitmap'][_0x239e5d(0x305)](this), this['createPictureText'](); }, VisuMZ[_0x137c0c(0x4bf)]['Sprite_Picture_update'] = Sprite_Picture[_0x137c0c(0x3b4)][_0x137c0c(0x273)], Sprite_Picture[_0x137c0c(0x3b4)][_0x137c0c(0x273)] = function () { const _0x133a47 = _0x137c0c; VisuMZ[_0x133a47(0x4bf)][_0x133a47(0x13d)][_0x133a47(0x305)](this), this[_0x133a47(0x488)](); }, Sprite_Picture[_0x137c0c(0x3b4)][_0x137c0c(0x488)] = function () { const _0x53c10b = _0x137c0c; if (!this[_0x53c10b(0x297)]) return; this[_0x53c10b(0x41a)](), this[_0x53c10b(0x458)](), this[_0x53c10b(0x3fb)](), this['attachPictureText'](); }, Sprite_Picture[_0x137c0c(0x3b4)]['createPictureText'] = function () { const _0x599c70 = _0x137c0c; if (this[_0x599c70(0x229)]) return; if (this['_pictureTextSprite']) return; const _0x5c6ebe = new Rectangle(0x0, 0x0, 0x0, 0x0); this[_0x599c70(0x229)] = new Window_Base(_0x5c6ebe), this[_0x599c70(0x229)]['padding'] = 0x0, this[_0x599c70(0x4a0)] = new Sprite(), this[_0x599c70(0x389)](this['_pictureTextSprite'], 0x0), this[_0x599c70(0x47e)] = 0x0, this[_0x599c70(0x111)] = 0x0, this['_pictureTextCache'] = {}; }, Sprite_Picture['prototype'][_0x137c0c(0x41a)] = function () { const _0x5af1a5 = _0x137c0c; if (!this[_0x5af1a5(0x229)]) return; if (this['_pictureTextWidth'] === this[_0x5af1a5(0x46e)] && this[_0x5af1a5(0x111)] === this[_0x5af1a5(0x3e3)]) return; this[_0x5af1a5(0x47e)] = this[_0x5af1a5(0x46e)], this[_0x5af1a5(0x111)] = this['height'], this[_0x5af1a5(0x170)] = {}, this[_0x5af1a5(0x229)][_0x5af1a5(0x1f7)](0x0, 0x0, this[_0x5af1a5(0x46e)], this[_0x5af1a5(0x3e3)]); }, Sprite_Picture[_0x137c0c(0x3b4)][_0x137c0c(0x458)] = function () { const _0x31c295 = _0x137c0c; if (!this[_0x31c295(0x4a0)]) return; this['_pictureTextSprite'][_0x31c295(0x33e)]['x'] = this[_0x31c295(0x33e)]['x'], this[_0x31c295(0x4a0)]['anchor']['y'] = this[_0x31c295(0x33e)]['y']; }, Sprite_Picture[_0x137c0c(0x3b4)][_0x137c0c(0x3fb)] = function () { const _0x243945 = _0x137c0c; if (!this[_0x243945(0x229)]) return; if (!this[_0x243945(0x4a1)]()) return; const _0x4fbd1e = [_0x243945(0x1d1), 'up', _0x243945(0x192), _0x243945(0x21d), 'center', 'right', _0x243945(0x252), _0x243945(0x1e5), _0x243945(0x25e)]; this[_0x243945(0x229)][_0x243945(0x447)](); for (const _0x5477f0 of _0x4fbd1e) { this[_0x243945(0x31e)](_0x5477f0); } }, Sprite_Picture['prototype'][_0x137c0c(0x4a1)] = function () { const _0x2a7a34 = _0x137c0c; if ($gameScreen[_0x2a7a34(0x38c)](this['_pictureId'])) return !![]; const _0x44315b = [_0x2a7a34(0x1d1), 'up', 'upperright', _0x2a7a34(0x21d), _0x2a7a34(0x508), _0x2a7a34(0x1f1), _0x2a7a34(0x252), 'down', _0x2a7a34(0x25e)]; for (const _0x587021 of _0x44315b) { if (_0x2a7a34(0x1b3) === 'dLKTf') _0x4385f1[_0x2a7a34(0x4bf)][_0x2a7a34(0x4ef)][_0x2a7a34(0x305)](this), this[_0x2a7a34(0x4b7)](), this[_0x2a7a34(0x405)](); else { const _0x57d39b = $gameScreen[_0x2a7a34(0x25f)](this[_0x2a7a34(0x184)], _0x587021); if (this[_0x2a7a34(0x170)][_0x587021] === _0x57d39b) continue; return !![]; } } return ![]; }, Sprite_Picture[_0x137c0c(0x3b4)][_0x137c0c(0x31e)] = function (_0x57b0ca) { const _0x569f43 = _0x137c0c; $gameScreen[_0x569f43(0x122)](this[_0x569f43(0x184)]); const _0x432e5d = $gameScreen[_0x569f43(0x25f)](this[_0x569f43(0x184)], _0x57b0ca); this[_0x569f43(0x170)][_0x57b0ca] = _0x432e5d; const _0x1312eb = this['_pictureTextWindow'][_0x569f43(0xb8)](_0x432e5d); let _0x34e5bc = $gameScreen['getPictureTextBuffer'](this['_pictureId']), _0x340a9e = _0x34e5bc, _0xea3f4a = _0x34e5bc; if (['up', 'center', _0x569f43(0x1e5)]['includes'](_0x57b0ca)) 'DQLFq' !== _0x569f43(0x4ba) ? _0x2db8b6 = _0x569f43(0x33b) : _0x340a9e = Math[_0x569f43(0x4ae)]((this[_0x569f43(0x46e)] - _0x1312eb[_0x569f43(0x46e)]) / 0x2); else[_0x569f43(0x192), _0x569f43(0x1f1), _0x569f43(0x25e)][_0x569f43(0x27c)](_0x57b0ca) && (_0x340a9e = Math[_0x569f43(0x4ae)](this[_0x569f43(0x46e)] - _0x1312eb[_0x569f43(0x46e)] - _0x34e5bc)); if ([_0x569f43(0x21d), _0x569f43(0x508), _0x569f43(0x1f1)]['includes'](_0x57b0ca)) _0xea3f4a = Math[_0x569f43(0x4ae)]((this[_0x569f43(0x3e3)] - _0x1312eb[_0x569f43(0x3e3)]) / 0x2); else['lowerleft', _0x569f43(0x1e5), _0x569f43(0x25e)][_0x569f43(0x27c)](_0x57b0ca) && (_0x569f43(0x113) === _0x569f43(0x113) ? _0xea3f4a = Math['floor'](this[_0x569f43(0x3e3)] - _0x1312eb['height'] - _0x34e5bc) : (_0x58b5e9 = _0x2aa74a[_0x569f43(0x38f)](/[\n\r]+/g, '\x20'), _0x16f3b0 = _0xe729dd[_0x569f43(0x38f)](/<(?:BR|LINEBREAK)>/gi, '\x20\x0a'))); this[_0x569f43(0x229)][_0x569f43(0x48a)](_0x432e5d, _0x340a9e, _0xea3f4a); }, Sprite_Picture[_0x137c0c(0x3b4)][_0x137c0c(0x1bb)] = function () { const _0x403a1e = _0x137c0c; if (!this[_0x403a1e(0x229)]) return; if (!this[_0x403a1e(0x4a0)]) return; this[_0x403a1e(0x4a0)][_0x403a1e(0x47f)] = this[_0x403a1e(0x229)]['contents']; }, VisuMZ['MessageCore'][_0x137c0c(0x283)] = Window_Base[_0x137c0c(0x3b4)][_0x137c0c(0x2cf)], Window_Base['prototype']['initialize'] = function (_0x3089ef) { const _0x19c3f0 = _0x137c0c; this[_0x19c3f0(0x2d3)](_0x3089ef), VisuMZ[_0x19c3f0(0x4bf)]['Window_Base_initialize'][_0x19c3f0(0x305)](this, _0x3089ef); }, Window_Base[_0x137c0c(0x3b4)][_0x137c0c(0x2d3)] = function (_0x4f34c7) { const _0x383e77 = _0x137c0c; this['initTextAlignement'](), this[_0x383e77(0x3e5)](), this[_0x383e77(0x496)](_0x4f34c7); }, Window_Base['prototype']['initTextAlignement'] = function () { const _0x1aaeca = _0x137c0c; this[_0x1aaeca(0xe5)](_0x1aaeca(0x236)); }, Window_Base[_0x137c0c(0x3b4)][_0x137c0c(0xe5)] = function (_0x4e1d1f) { const _0x5a1a75 = _0x137c0c; this[_0x5a1a75(0x2e1)] = _0x4e1d1f; }, Window_Base[_0x137c0c(0x3b4)][_0x137c0c(0x4f7)] = function () { const _0xaffd89 = _0x137c0c; return this[_0xaffd89(0x2e1)]; }, VisuMZ[_0x137c0c(0x4bf)][_0x137c0c(0x16d)] = Window_Base['prototype'][_0x137c0c(0xb8)], Window_Base[_0x137c0c(0x3b4)][_0x137c0c(0xb8)] = function (_0xe3d7db) { const _0x58cdd6 = _0x137c0c; return this[_0x58cdd6(0x3e5)](), VisuMZ[_0x58cdd6(0x4bf)][_0x58cdd6(0x16d)][_0x58cdd6(0x305)](this, _0xe3d7db); }, Window_Base[_0x137c0c(0x3b4)][_0x137c0c(0x28b)] = function (_0x24391) { const _0x1eb11a = _0x137c0c; return VisuMZ[_0x1eb11a(0x4bf)]['Window_Base_textSizeEx'][_0x1eb11a(0x305)](this, _0x24391); }, VisuMZ[_0x137c0c(0x4bf)][_0x137c0c(0x19b)] = Window_Base['prototype'][_0x137c0c(0x2df)], Window_Base['prototype']['processAllText'] = function (_0x589db1) { const _0x288977 = _0x137c0c; VisuMZ[_0x288977(0x4bf)][_0x288977(0x19b)][_0x288977(0x305)](this, _0x589db1); if (_0x589db1[_0x288977(0x505)]) this['setTextAlignment'](_0x288977(0x236)); }, Window_Base[_0x137c0c(0x3b4)][_0x137c0c(0x3e5)] = function () { const _0x582399 = _0x137c0c; this[_0x582399(0x306)](![]); }, Window_Base[_0x137c0c(0x3b4)][_0x137c0c(0x24c)] = function () { const _0x3e4202 = _0x137c0c; return this[_0x3e4202(0x132)]; }, Window_Base[_0x137c0c(0x3b4)][_0x137c0c(0x306)] = function (_0x229e72) { const _0x510bf9 = _0x137c0c; return this[_0x510bf9(0x132)] = _0x229e72, ''; }, Window_Base['prototype']['registerResetRect'] = function (_0x4c28e7) { const _0x3f697a = _0x137c0c; this[_0x3f697a(0x3c0)] = JsonEx[_0x3f697a(0xeb)](_0x4c28e7); }, Window_Base[_0x137c0c(0x3b4)]['resetFontSettings'] = function () { const _0x10445b = _0x137c0c; this[_0x10445b(0x146)][_0x10445b(0x24d)] = $gameSystem[_0x10445b(0x17a)](), this[_0x10445b(0x146)]['fontSize'] = $gameSystem[_0x10445b(0x16b)](), this[_0x10445b(0x146)][_0x10445b(0x258)] = ![], this[_0x10445b(0x146)]['fontItalic'] = ![], this[_0x10445b(0x3fa)](); }, Window_Base[_0x137c0c(0x3b4)][_0x137c0c(0x3fa)] = function () { const _0x19e0e7 = _0x137c0c; this['changeTextColor'](ColorManager['normalColor']()), this[_0x19e0e7(0x432)](ColorManager[_0x19e0e7(0x2fa)]()); const _0x248146 = VisuMZ[_0x19e0e7(0x4bf)]['Settings'][_0x19e0e7(0x4a2)]; _0x248146[_0x19e0e7(0x4af)] === undefined && (_0x248146[_0x19e0e7(0x4af)] = 0x3), this[_0x19e0e7(0x146)][_0x19e0e7(0x145)] = _0x248146[_0x19e0e7(0x4af)], this[_0x19e0e7(0x37d)](![]); }, Window_Base['prototype'][_0x137c0c(0x37d)] = function (_0x17e731) { const _0x307d6e = _0x137c0c; this[_0x307d6e(0x416)] = _0x17e731; }, Window_Base[_0x137c0c(0x3b4)][_0x137c0c(0x457)] = function () { const _0x3535f2 = _0x137c0c; return this[_0x3535f2(0x416)]; }, Window_Base['prototype']['isAutoColorAffected'] = function () { return ![]; }, Window_Base[_0x137c0c(0x3b4)][_0x137c0c(0x3e1)] = function () { const _0x59e455 = _0x137c0c, _0xc3be16 = [_0x59e455(0x24d), _0x59e455(0x3fc), _0x59e455(0x258), _0x59e455(0x160), _0x59e455(0x3f9), _0x59e455(0x4b2), 'outlineWidth', _0x59e455(0x1db)]; let _0x3d4a7d = {}; for (const _0x2685e0 of _0xc3be16) { _0x3d4a7d[_0x2685e0] = this[_0x59e455(0x146)][_0x2685e0]; } return _0x3d4a7d; }, Window_Base[_0x137c0c(0x3b4)][_0x137c0c(0x18a)] = function (_0x4dd28e) { const _0x35719a = _0x137c0c; for (const _0xe236a5 in _0x4dd28e) { this[_0x35719a(0x146)][_0xe236a5] = _0x4dd28e[_0xe236a5]; } }, VisuMZ[_0x137c0c(0x4bf)][_0x137c0c(0x451)] = Window_Base['prototype'][_0x137c0c(0x273)], Window_Base[_0x137c0c(0x3b4)]['update'] = function () { const _0x3dece0 = _0x137c0c; VisuMZ[_0x3dece0(0x4bf)][_0x3dece0(0x451)][_0x3dece0(0x305)](this), this['updateMove'](); }, Window_Base[_0x137c0c(0x3b4)][_0x137c0c(0x4ab)] = function () { return ![]; }, Window_Base[_0x137c0c(0x3b4)]['updateMove'] = function () { const _0x52c294 = _0x137c0c; this['_moveDuration'] > 0x0 && (_0x52c294(0x296) === _0x52c294(0x238) ? this['_lastPluginCommandInterpreter'] = _0x511e36 : (this[_0x52c294(0x4ab)]() && (this['x'] = this[_0x52c294(0xb3)](this['x'], this['_moveTargetX']), this['y'] = this['applyMoveEasing'](this['y'], this['_moveTargetY']), this[_0x52c294(0x46e)] = this[_0x52c294(0xb3)](this[_0x52c294(0x46e)], this[_0x52c294(0x11d)]), this[_0x52c294(0x3e3)] = this[_0x52c294(0xb3)](this['height'], this[_0x52c294(0x208)]), this[_0x52c294(0x405)]()), this['_moveDuration']--)); }, Window_Base[_0x137c0c(0x3b4)]['clampPlacementPosition'] = function (_0x48ac65, _0x1c8223) { const _0x736cea = _0x137c0c; !_0x48ac65 && (this['width'] = Math[_0x736cea(0x22e)](this[_0x736cea(0x46e)], Graphics[_0x736cea(0x46e)]), this['height'] = Math[_0x736cea(0x22e)](this[_0x736cea(0x3e3)], Graphics[_0x736cea(0x3e3)])); if (!_0x1c8223) { const _0x497ba6 = -(Math[_0x736cea(0x4ae)](Graphics[_0x736cea(0x46e)] - Graphics['boxWidth']) / 0x2), _0x3a17ae = _0x497ba6 + Graphics[_0x736cea(0x46e)] - this['width'], _0x438dad = -(Math[_0x736cea(0x4ae)](Graphics[_0x736cea(0x3e3)] - Graphics['boxHeight']) / 0x2), _0x3b7f0f = _0x438dad + Graphics[_0x736cea(0x3e3)] - this[_0x736cea(0x3e3)]; this['x'] = this['x'][_0x736cea(0x3d1)](_0x497ba6, _0x3a17ae), this['y'] = this['y'][_0x736cea(0x3d1)](_0x438dad, _0x3b7f0f); } }, Window_Base[_0x137c0c(0x3b4)][_0x137c0c(0xb3)] = function (_0x127707, _0x2f8aa6) { const _0x15b4a1 = _0x137c0c, _0x11fd5a = this[_0x15b4a1(0x4d8)], _0x15e1f0 = this[_0x15b4a1(0x260)], _0x103919 = this[_0x15b4a1(0x247)]((_0x15e1f0 - _0x11fd5a) / _0x15e1f0), _0x34e8ff = this['calcMoveEasing']((_0x15e1f0 - _0x11fd5a + 0x1) / _0x15e1f0), _0x41cd10 = (_0x127707 - _0x2f8aa6 * _0x103919) / (0x1 - _0x103919); return _0x41cd10 + (_0x2f8aa6 - _0x41cd10) * _0x34e8ff; }, Window_Base[_0x137c0c(0x3b4)][_0x137c0c(0x247)] = function (_0x37e589) { const _0x4e6f20 = _0x137c0c, _0x814d8f = 0x2; switch (this[_0x4e6f20(0x13b)]) { case 0x0: return _0x37e589; case 0x1: return this[_0x4e6f20(0xf6)](_0x37e589, _0x814d8f); case 0x2: return this[_0x4e6f20(0x98)](_0x37e589, _0x814d8f); case 0x3: return this['easeInOut'](_0x37e589, _0x814d8f); default: if (Imported[_0x4e6f20(0xa7)]) { if ('zgfMU' === 'lXBWE') _0x1513e4('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x4e6f20(0x266)](_0xebc55c, _0x9410f2)), _0x41e525[_0x4e6f20(0x4fa)](); else return VisuMZ[_0x4e6f20(0xb3)](_0x37e589, this['_moveEasingType']); } else { if (_0x4e6f20(0x213) === _0x4e6f20(0x213)) return _0x37e589; else _0x232b91['textCodeResult'] = new _0x550e6d('return\x20\x27' + _0x419704['TextStr'][_0x4e6f20(0x38f)](/\\/g, '\x1b') + '\x27'); } } }, Window_Base[_0x137c0c(0x3b4)][_0x137c0c(0x497)] = function (_0x387b74, _0x7a35d0, _0x37cf81, _0x4a2edb, _0x35d5f2, _0x45bc7e) { const _0x28d87d = _0x137c0c; this[_0x28d87d(0x345)] = _0x387b74, this['_moveTargetY'] = _0x7a35d0, this[_0x28d87d(0x11d)] = _0x37cf81 || this[_0x28d87d(0x46e)], this[_0x28d87d(0x208)] = _0x4a2edb || this[_0x28d87d(0x3e3)], this[_0x28d87d(0x4d8)] = _0x35d5f2 || 0x1; if (this[_0x28d87d(0x4d8)] <= 0x0) this[_0x28d87d(0x4d8)] = 0x1; this[_0x28d87d(0x260)] = this['_moveDuration'], this[_0x28d87d(0x13b)] = _0x45bc7e || 0x0; if (_0x35d5f2 <= 0x0) this[_0x28d87d(0x262)](); }, Window_Base['prototype']['moveBy'] = function (_0x5efe6, _0x52438c, _0x264e44, _0x5b50b7, _0x9e6d2, _0x2ebb6f) { const _0x554fc2 = _0x137c0c; this[_0x554fc2(0x345)] = this['x'] + _0x5efe6, this[_0x554fc2(0x32c)] = this['y'] + _0x52438c, this[_0x554fc2(0x11d)] = this[_0x554fc2(0x46e)] + (_0x264e44 || 0x0), this['_moveTargetHeight'] = this[_0x554fc2(0x3e3)] + (_0x5b50b7 || 0x0), this[_0x554fc2(0x4d8)] = _0x9e6d2 || 0x1; if (this['_moveDuration'] <= 0x0) this[_0x554fc2(0x4d8)] = 0x1; this[_0x554fc2(0x260)] = this[_0x554fc2(0x4d8)], this[_0x554fc2(0x13b)] = _0x2ebb6f || 0x0; if (_0x9e6d2 <= 0x0) this[_0x554fc2(0x262)](); }, Window_Base[_0x137c0c(0x3b4)][_0x137c0c(0xe9)] = function (_0x43ea7d, _0x547f3e) { const _0x1738e4 = _0x137c0c; this['moveTo'](this[_0x1738e4(0x3c0)]['x'], this['_resetRect']['y'], this[_0x1738e4(0x3c0)][_0x1738e4(0x46e)], this[_0x1738e4(0x3c0)][_0x1738e4(0x3e3)], _0x43ea7d, _0x547f3e); }, VisuMZ[_0x137c0c(0x4bf)][_0x137c0c(0x158)] = Window_Base[_0x137c0c(0x3b4)][_0x137c0c(0x453)], Window_Base[_0x137c0c(0x3b4)][_0x137c0c(0x453)] = function (_0x4a9439) { const _0x3eb636 = _0x137c0c; if (this['isColorLocked']()) return; _0x4a9439 = _0x4a9439['replace'](/\,/g, ''), this[_0x3eb636(0x2fb)] = this[_0x3eb636(0x2fb)] || [], this['_textColorStack']['unshift'](this[_0x3eb636(0x146)]['textColor']), VisuMZ[_0x3eb636(0x4bf)]['Window_Base_changeTextColor'][_0x3eb636(0x305)](this, _0x4a9439); }, Window_Base[_0x137c0c(0x3b4)][_0x137c0c(0x4f1)] = function (_0x48212a) { const _0x4285ce = _0x137c0c; this[_0x4285ce(0x430)](_0x48212a); if (this[_0x4285ce(0x457)]()) return; if (_0x48212a[_0x4285ce(0x505)]) { if (_0x4285ce(0x395) !== _0x4285ce(0x2ec)) this[_0x4285ce(0x2fb)] = this[_0x4285ce(0x2fb)] || [], this[_0x4285ce(0x146)]['textColor'] = this[_0x4285ce(0x2fb)][_0x4285ce(0x35f)]() || ColorManager[_0x4285ce(0x2e0)](); else { const _0x1a216d = this[_0x4285ce(0x2c1)], _0x4cc1e0 = _0x1a216d ? _0x1a216d['y'] : 0x0, _0x1f985b = _0x1a216d ? _0x1a216d[_0x4285ce(0x3e3)] : 0x0, _0x162107 = _0x3810ad[_0x4285ce(0x455)] / 0x2; return _0x4cc1e0 < _0x162107 && _0x4cc1e0 + _0x1f985b > _0x162107 ? 0x4 : _0x404fff[_0x4285ce(0x29e)](); } } }, Window_Base['prototype'][_0x137c0c(0x437)] = function (_0x434aec) { const _0x85e48a = _0x137c0c; return _0x434aec = this[_0x85e48a(0x17e)](_0x434aec), _0x434aec = this[_0x85e48a(0x4d7)](_0x434aec), _0x434aec = this[_0x85e48a(0x142)](_0x434aec), _0x434aec = this[_0x85e48a(0x119)](_0x434aec), _0x434aec = this[_0x85e48a(0x2cc)](_0x434aec), _0x434aec = this[_0x85e48a(0x44a)](_0x434aec), _0x434aec = this[_0x85e48a(0x221)](_0x434aec), _0x434aec = this['convertTextAlignmentEscapeCharacters'](_0x434aec), _0x434aec = this['convertLockColorsEscapeCharacters'](_0x434aec), _0x434aec = this[_0x85e48a(0x373)](_0x434aec), _0x434aec = this[_0x85e48a(0x3ae)](_0x434aec), _0x434aec = this[_0x85e48a(0x4c6)](_0x434aec), _0x434aec = this[_0x85e48a(0x1c2)](_0x434aec), _0x434aec = this['postConvertEscapeCharacters'](_0x434aec), _0x434aec = this['convertVariableEscapeCharacters'](_0x434aec), _0x434aec = this[_0x85e48a(0x2a3)](_0x434aec), _0x434aec = this[_0x85e48a(0x450)](_0x434aec), _0x434aec; }, Window_Base[_0x137c0c(0x3b4)][_0x137c0c(0x17e)] = function (_0x5ee05d) { const _0x62b08e = _0x137c0c; this[_0x62b08e(0x210)] = ![]; for (const _0x1753e7 of VisuMZ[_0x62b08e(0x4bf)][_0x62b08e(0x452)][_0x62b08e(0x2e7)]) { if ('BmttO' !== _0x62b08e(0x4e4)) _0x5ee05d && _0x5ee05d['match'](_0x1753e7[_0x62b08e(0x22c)]) && (this[_0x62b08e(0x210)] = !![], _0x5ee05d = _0x5ee05d[_0x62b08e(0x38f)](_0x1753e7[_0x62b08e(0x22c)], _0x1753e7[_0x62b08e(0x3b6)][_0x62b08e(0x29b)](this))); else { if (this[_0x62b08e(0x3ce)]) return _0x29e739; return _0x89a538['prototype'][_0x62b08e(0x450)][_0x62b08e(0x305)](this, _0x2207bb); } } return _0x5ee05d || ''; }, Window_Base[_0x137c0c(0x3b4)]['convertBackslashCharacters'] = function (_0x3481ab) { const _0x56de31 = _0x137c0c; return _0x3481ab = _0x3481ab[_0x56de31(0x38f)](/\\/g, '\x1b'), _0x3481ab = _0x3481ab[_0x56de31(0x38f)](/\x1b\x1b/g, '\x5c'), _0x3481ab; }, Window_Base[_0x137c0c(0x3b4)][_0x137c0c(0x142)] = function (_0x1f4d7e) { const _0x275261 = _0x137c0c; for (; ;) { if ('PyJAO' === 'PyJAO') { if (_0x1f4d7e[_0x275261(0x504)](/\\V\[(\d+)\]/gi)) _0x1f4d7e = _0x1f4d7e[_0x275261(0x38f)](/\\V\[(\d+)\]/gi, (_0x41d3fb, _0x3cd69c) => this[_0x275261(0x4d7)](String($gameVariables[_0x275261(0x424)](parseInt(_0x3cd69c))))); else { if (_0x1f4d7e['match'](/\x1bV\[(\d+)\]/gi)) _0x1f4d7e = _0x1f4d7e['replace'](/\x1bV\[(\d+)\]/gi, (_0x1ed954, _0x1fa3a1) => this['convertBackslashCharacters'](String($gameVariables['value'](parseInt(_0x1fa3a1))))); else { if (_0x275261(0x2de) !== _0x275261(0x459)) break; else { const _0x5353a1 = _0x5604c5['$1']['split'](',')[_0x275261(0x141)](_0x261a59 => _0x3febfb(_0x261a59) || 0x0); if (_0x5353a1[_0x275261(0x3e2)](_0x29e15c => !_0x3ce63e[_0x275261(0x424)](_0x29e15c))) return ![]; } } } } else { const _0x55ea9c = this[_0x275261(0x4d8)], _0x49fc7e = this[_0x275261(0x260)], _0x594ea5 = this[_0x275261(0x247)]((_0x49fc7e - _0x55ea9c) / _0x49fc7e), _0x59792f = this[_0x275261(0x247)]((_0x49fc7e - _0x55ea9c + 0x1) / _0x49fc7e), _0x3f8413 = (_0x134ed0 - _0x291a5d * _0x594ea5) / (0x1 - _0x594ea5); return _0x3f8413 + (_0x64f2c7 - _0x3f8413) * _0x59792f; } } return _0x1f4d7e; }, Window_Base[_0x137c0c(0x3b4)]['convertButtonAssistEscapeCharacters'] = function (_0x1602bd) { const _0x267bb5 = _0x137c0c; if (Imported[_0x267bb5(0xa7)]) { if ('zTktp' === 'zTktp') _0x1602bd = _0x1602bd['replace'](/<Up (?:KEY|BUTTON)>/gi, this[_0x267bb5(0x2bf)]('up')), _0x1602bd = _0x1602bd[_0x267bb5(0x38f)](/<Left (?:KEY|BUTTON)>/gi, this[_0x267bb5(0x2bf)](_0x267bb5(0x21d))), _0x1602bd = _0x1602bd['replace'](/<Right (?:KEY|BUTTON)>/gi, this[_0x267bb5(0x2bf)](_0x267bb5(0x1f1))), _0x1602bd = _0x1602bd['replace'](/<Down (?:KEY|BUTTON)>/gi, this[_0x267bb5(0x2bf)]('down')), _0x1602bd = _0x1602bd[_0x267bb5(0x38f)](/<Ok (?:KEY|BUTTON)>/gi, this['convertButtonAssistText']('ok')), _0x1602bd = _0x1602bd[_0x267bb5(0x38f)](/<Cancel (?:KEY|BUTTON)>/gi, this[_0x267bb5(0x2bf)](_0x267bb5(0x1e1))), _0x1602bd = _0x1602bd[_0x267bb5(0x38f)](/<Menu (?:KEY|BUTTON)>/gi, this[_0x267bb5(0x2bf)](_0x267bb5(0x29c))), _0x1602bd = _0x1602bd[_0x267bb5(0x38f)](/<Shift (?:KEY|BUTTON)>/gi, this[_0x267bb5(0x2bf)](_0x267bb5(0x35f))), _0x1602bd = _0x1602bd['replace'](/<(?:PAGEUP|PAGE UP) (?:KEY|BUTTON)>/gi, this[_0x267bb5(0x2bf)](_0x267bb5(0x2b7))), _0x1602bd = _0x1602bd[_0x267bb5(0x38f)](/<(?:PAGEDOWN|PAGEDN|PAGE DOWN) (?:KEY|BUTTON)>/gi, this['convertButtonAssistText'](_0x267bb5(0x134))); else return _0x5c91f3['prototype'][_0x267bb5(0x17e)][_0x267bb5(0x305)](this, _0x3a6ca9); } return _0x1602bd; }, Window_Base[_0x137c0c(0x3b4)][_0x137c0c(0x2bf)] = function (_0x3f530e) { const _0x5f22d6 = _0x137c0c; let _0x245190 = TextManager[_0x5f22d6(0x189)](_0x3f530e) || ''; return _0x245190 = this[_0x5f22d6(0x4d7)](_0x245190), _0x245190 = this[_0x5f22d6(0x142)](_0x245190), _0x245190['trim'](); }, Window_Base[_0x137c0c(0x3b4)]['preConvertEscapeCharacters'] = function (_0x4e2636) { const _0x545e0e = _0x137c0c; return _0x4e2636 = this[_0x545e0e(0x32f)](_0x4e2636), this[_0x545e0e(0x2a1)](), _0x4e2636; }, Window_Base[_0x137c0c(0x3b4)][_0x137c0c(0x32f)] = function (_0x4eb516) { const _0x56aa1a = _0x137c0c; return _0x4eb516 = TextManager[_0x56aa1a(0x411)](_0x4eb516), _0x4eb516; }, VisuMZ[_0x137c0c(0x4bf)][_0x137c0c(0x443)] = String[_0x137c0c(0x3b4)][_0x137c0c(0x266)], String[_0x137c0c(0x3b4)]['format'] = function () { const _0x14018e = _0x137c0c; let _0xa5a2ad = this; return _0xa5a2ad = TextManager[_0x14018e(0x411)](_0xa5a2ad), VisuMZ[_0x14018e(0x4bf)][_0x14018e(0x443)][_0x14018e(0x129)](_0xa5a2ad, arguments); }, VisuMZ[_0x137c0c(0x4bf)][_0x137c0c(0xb2)] = Bitmap['prototype']['drawText'], Bitmap['prototype']['drawText'] = function (_0x3471e7, _0x3dcd31, _0x3bb839, _0x1855a1, _0x3a2e87, _0x418553) { const _0xba9685 = _0x137c0c; _0x3471e7 = TextManager['parseLocalizedText'](_0x3471e7), VisuMZ[_0xba9685(0x4bf)]['Bitmap_drawText'][_0xba9685(0x305)](this, _0x3471e7, _0x3dcd31, _0x3bb839, _0x1855a1, _0x3a2e87, _0x418553); }, VisuMZ['MessageCore'][_0x137c0c(0x25d)] = Bitmap[_0x137c0c(0x3b4)][_0x137c0c(0x211)], Bitmap['prototype'][_0x137c0c(0x211)] = function (_0x45a456, _0x2294b5, _0x21f0d0, _0x372ed9, _0xa12c33, _0x5ecbef) { const _0x263ffc = _0x137c0c; _0x45a456 = TextManager[_0x263ffc(0x411)](_0x45a456), VisuMZ['MessageCore'][_0x263ffc(0x25d)][_0x263ffc(0x305)](this, _0x45a456, _0x2294b5, _0x21f0d0, _0x372ed9, _0xa12c33, _0x5ecbef); }, Window_Base['prototype']['postConvertEscapeCharacters'] = function (_0x20b01c) { return _0x20b01c; }, Window_Base[_0x137c0c(0x3b4)][_0x137c0c(0x44a)] = function (_0x395067) { const _0x56afe0 = _0x137c0c; if (this[_0x56afe0(0x176)]()) { if (_0x56afe0(0x407) === _0x56afe0(0x121)) { for (const _0x2877a2 of _0x24cfde['parameters'][0x0]) { this[_0x56afe0(0x47c)][_0x1b01a7][_0x56afe0(0x410)][0x0][_0x56afe0(0x21e)](_0x2877a2); } this['_list'][_0x56afe0(0x172)](this[_0x56afe0(0x309)] - 0x1, 0x2); } else _0x395067 = _0x395067[_0x56afe0(0x38f)](/<(?:SHOW|HIDE|DISABLE|ENABLE)>/gi, ''), _0x395067 = _0x395067[_0x56afe0(0x38f)](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:SWITCH|SWITCHES):[ ](.*?)>/gi, ''), _0x395067 = _0x395067[_0x56afe0(0x38f)](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:ALL|ANY)[ ](?:SWITCH|SWITCHES):[ ](.*?)>/gi, ''), _0x395067 = _0x395067[_0x56afe0(0x38f)](/<CHOICE WIDTH:[ ](\d+)>/gi, ''), _0x395067 = _0x395067[_0x56afe0(0x38f)](/<CHOICE INDENT:[ ](\d+)>/gi, ''), _0x395067 = _0x395067[_0x56afe0(0x38f)](/<(?:BGCOLOR|BG COLOR):[ ](.*?)>/gi, ''), _0x395067 = _0x395067[_0x56afe0(0x38f)](/<(?:FG|BG)(?:| )(?:IMG|IMAGE|PIC|PICTURE):[ ](.*?)>/gi, ''), _0x395067 = _0x395067[_0x56afe0(0x38f)](/<(?:FG|BG)(?:IMG|IMAGE|PIC|PICTURE)[ ]*(.*?):[ ](.*?)>/gi, ''); } return _0x395067; }, Window_Base['prototype'][_0x137c0c(0x176)] = function () { const _0x3ed263 = _0x137c0c, _0x3a7f0b = [_0x3ed263(0x444), _0x3ed263(0x4d3)]; return _0x3a7f0b[_0x3ed263(0x27c)](this[_0x3ed263(0x456)][_0x3ed263(0x24b)]); }, Window_Base[_0x137c0c(0x3b4)][_0x137c0c(0x221)] = function (_0x55dc2f) { const _0x4fd0be = _0x137c0c; return _0x55dc2f = _0x55dc2f['replace'](/<B>/gi, _0x4fd0be(0x4fc)), _0x55dc2f = _0x55dc2f[_0x4fd0be(0x38f)](/<\/B>/gi, _0x4fd0be(0x4cc)), _0x55dc2f = _0x55dc2f[_0x4fd0be(0x38f)](/<I>/gi, '\x1bITALIC[1]'), _0x55dc2f = _0x55dc2f[_0x4fd0be(0x38f)](/<\/I>/gi, _0x4fd0be(0x2ee)), _0x55dc2f; }, Window_Base[_0x137c0c(0x3b4)][_0x137c0c(0x370)] = function (_0x1186a9) { const _0x2807bb = _0x137c0c; return _0x1186a9 = _0x1186a9[_0x2807bb(0x38f)](/<LEFT>/gi, _0x2807bb(0x248)), _0x1186a9 = _0x1186a9['replace'](/<\/LEFT>/gi, _0x2807bb(0x383)), _0x1186a9 = _0x1186a9[_0x2807bb(0x38f)](/<CENTER>/gi, '\x1bTEXTALIGNMENT[2]'), _0x1186a9 = _0x1186a9[_0x2807bb(0x38f)](/<\/CENTER>/gi, _0x2807bb(0x383)), _0x1186a9 = _0x1186a9[_0x2807bb(0x38f)](/<RIGHT>/gi, '\x1bTEXTALIGNMENT[3]'), _0x1186a9 = _0x1186a9[_0x2807bb(0x38f)](/<\/RIGHT>/gi, _0x2807bb(0x383)), _0x1186a9; }, Window_Base[_0x137c0c(0x3b4)][_0x137c0c(0x1f3)] = function (_0x2e7af6) { const _0x48d1dd = _0x137c0c; return _0x2e7af6 = _0x2e7af6[_0x48d1dd(0x38f)](/<COLORLOCK>/gi, _0x48d1dd(0x3b2)), _0x2e7af6 = _0x2e7af6['replace'](/<\/COLORLOCK>/gi, _0x48d1dd(0x4cd)), _0x2e7af6 = _0x2e7af6[_0x48d1dd(0x38f)](/\(\(\(/gi, '\x1bCOLORLOCK[1]'), _0x2e7af6 = _0x2e7af6[_0x48d1dd(0x38f)](/\)\)\)/gi, _0x48d1dd(0x4cd)), _0x2e7af6; }, Window_Base['prototype'][_0x137c0c(0x373)] = function (_0x4e8d4d) { const _0x316cc5 = _0x137c0c; return _0x4e8d4d = _0x4e8d4d['replace'](/\x1bN\[(\d+)\]/gi, (_0x587914, _0x5bebca) => this['actorName'](parseInt(_0x5bebca))), _0x4e8d4d = _0x4e8d4d['replace'](/\x1bP\[(\d+)\]/gi, (_0x16e1ff, _0x1d2166) => this[_0x316cc5(0x3ab)](parseInt(_0x1d2166))), _0x4e8d4d = _0x4e8d4d[_0x316cc5(0x38f)](/\x1bG/gi, TextManager[_0x316cc5(0x3f0)]), _0x4e8d4d; }, Window_Base[_0x137c0c(0x3b4)][_0x137c0c(0x3ae)] = function (_0x3f8de5) { const _0x5b9797 = _0x137c0c; return _0x3f8de5 = _0x3f8de5[_0x5b9797(0x38f)](/\<(?:BATTLE|CURRENT BATTLE) TARGET\>/gi, this[_0x5b9797(0x409)]()), _0x3f8de5 = _0x3f8de5[_0x5b9797(0x38f)](/\<(?:BATTLE|CURRENT BATTLE) (?:USER|SUBJECT)\>/gi, this[_0x5b9797(0xa4)]()), _0x3f8de5 = _0x3f8de5[_0x5b9797(0x38f)](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION)\>/gi, this[_0x5b9797(0x1a0)](!![])), _0x3f8de5 = _0x3f8de5[_0x5b9797(0x38f)](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION) NAME\>/gi, this[_0x5b9797(0x1a0)](![])), _0x3f8de5; }, Window_Base[_0x137c0c(0x3b4)]['battleTargetName'] = function () { const _0x4aa628 = _0x137c0c; if (!SceneManager[_0x4aa628(0x1ec)]()) return ''; if (BattleManager[_0x4aa628(0x212)]) return BattleManager[_0x4aa628(0x212)][_0x4aa628(0x24b)](); if (BattleManager[_0x4aa628(0x419)][0x0]) return BattleManager[_0x4aa628(0x419)][0x0][_0x4aa628(0x24b)](); return ''; }, Window_Base[_0x137c0c(0x3b4)]['battleUserName'] = function () { const _0x4207bb = _0x137c0c; if (!SceneManager[_0x4207bb(0x1ec)]()) return ''; let _0x1d95b4 = null; return _0x1d95b4 = BattleManager[_0x4207bb(0x1f0)], !_0x1d95b4 && BattleManager[_0x4207bb(0x175)]() && (_0x4207bb(0x358) !== _0x4207bb(0x358) ? (_0x4c8d54['text'] = this['prepareWordWrapEscapeCharacters'](_0x83a748['text']), this[_0x4207bb(0x3ce)] = !![]) : _0x1d95b4 = BattleManager[_0x4207bb(0x4c3)]()), _0x1d95b4 ? _0x1d95b4[_0x4207bb(0x24b)]() : ''; }, Window_Base[_0x137c0c(0x3b4)][_0x137c0c(0x1a0)] = function (_0x5b03e0) { const _0x2d2f92 = _0x137c0c; if (!SceneManager[_0x2d2f92(0x1ec)]()) return ''; let _0x121000 = BattleManager[_0x2d2f92(0x24f)] || null; !_0x121000 && BattleManager['isInputting']() && (_0x121000 = BattleManager['inputtingAction']()); if (_0x121000 && _0x121000[_0x2d2f92(0x48b)]()) { if (_0x2d2f92(0x3d7) !== _0x2d2f92(0x3d7)) { _0x1a7b99[_0x2d2f92(0x4bf)][_0x2d2f92(0x311)][_0x2d2f92(0x305)](this, _0x4260c1); const _0xdff3d0 = _0x57cf42[_0x2d2f92(0x4bf)][_0x2d2f92(0x452)][_0x2d2f92(0x344)]; _0x332d26['MessageCore']['CreateAutoColorFor'](_0x3af121, _0xdff3d0[_0x2d2f92(0x388)]); } else { let _0x2e4a02 = ''; if (_0x5b03e0) _0x2e4a02 += _0x2d2f92(0x28e)[_0x2d2f92(0x266)](_0x121000['item']()[_0x2d2f92(0x4d0)]); return _0x2e4a02 += _0x121000[_0x2d2f92(0x48b)]()[_0x2d2f92(0x24b)], _0x2e4a02; } } return ''; }, Window_Base[_0x137c0c(0x3b4)][_0x137c0c(0x4c6)] = function (_0x444aa1) { const _0x20e81c = _0x137c0c; for (const _0x5f2f36 of VisuMZ[_0x20e81c(0x4bf)][_0x20e81c(0x452)][_0x20e81c(0x269)]) { _0x444aa1['match'](_0x5f2f36[_0x20e81c(0x22c)]) && (_0x444aa1 = _0x444aa1['replace'](_0x5f2f36[_0x20e81c(0x22c)], _0x5f2f36[_0x20e81c(0x3b6)]), _0x444aa1 = this[_0x20e81c(0x142)](_0x444aa1)); } return _0x444aa1; }, Window_Base[_0x137c0c(0x3b4)][_0x137c0c(0x1c2)] = function (_0x1a8343) { const _0x59fcbe = _0x137c0c; for (const _0x18c75c of VisuMZ[_0x59fcbe(0x4bf)][_0x59fcbe(0x452)][_0x59fcbe(0x3b0)]) { _0x1a8343[_0x59fcbe(0x504)](_0x18c75c[_0x59fcbe(0x22c)]) && (_0x59fcbe(0x425) !== 'YxAQC' ? this[_0x59fcbe(0x4ee)] = [] : (_0x1a8343 = _0x1a8343[_0x59fcbe(0x38f)](_0x18c75c[_0x59fcbe(0x22c)], _0x18c75c[_0x59fcbe(0x3b6)][_0x59fcbe(0x29b)](this)), _0x1a8343 = this[_0x59fcbe(0x142)](_0x1a8343))); } return _0x1a8343; }, Window_Base[_0x137c0c(0x3b4)]['actorName'] = function (_0x26fbc9) { const _0x10bf7c = _0x137c0c, _0x137344 = _0x26fbc9 >= 0x1 ? $gameActors['actor'](_0x26fbc9) : null, _0xca2d9d = _0x137344 ? _0x137344['name']() : '', _0x127e47 = Number(VisuMZ['MessageCore'][_0x10bf7c(0x452)]['AutoColor'][_0x10bf7c(0x471)]); return this[_0x10bf7c(0x114)]() && _0x127e47 !== 0x0 ? _0x10bf7c(0x2db)[_0x10bf7c(0x266)](_0x127e47, _0xca2d9d) : _0x10bf7c(0x1e7) === _0x10bf7c(0x20c) ? _0x3d63a4 : _0xca2d9d; }, Window_Base[_0x137c0c(0x3b4)][_0x137c0c(0x3ab)] = function (_0x179b25) { const _0xca8899 = _0x137c0c, _0x33771f = _0x179b25 >= 0x1 ? $gameParty['members']()[_0x179b25 - 0x1] : null, _0x1ace28 = _0x33771f ? _0x33771f[_0xca8899(0x24b)]() : '', _0x34313f = Number(VisuMZ['MessageCore'][_0xca8899(0x452)]['AutoColor'][_0xca8899(0x471)]); if (this['isAutoColorAffected']() && _0x34313f !== 0x0) { if (_0xca8899(0x401) !== _0xca8899(0xc6)) return _0xca8899(0x2db)[_0xca8899(0x266)](_0x34313f, _0x1ace28); else !_0x5bb91f[_0xca8899(0x41b)] ? this[_0xca8899(0xe1)]['remove'](_0x3cbf73) : _0x137ee5[_0xca8899(0x273)](); } else { if (_0xca8899(0xd6) === 'CPnkc') return _0x1ace28; else { const _0x298b0c = this[_0xca8899(0x42e)](_0x1cb6ca); if (_0x298b0c === _0xca8899(0x137)) return this[_0xca8899(0x3a8)](); if (_0x298b0c === _0xca8899(0x3c5)) return this[_0xca8899(0x3e8)](); return _0x9cc65[_0xca8899(0x4bf)]['Window_Options_statusText'][_0xca8899(0x305)](this, _0x17a85d); } } }, Window_Base[_0x137c0c(0x3b4)][_0x137c0c(0x2a3)] = function (_0x7f7bc3) { const _0x7c7097 = _0x137c0c; return this[_0x7c7097(0x114)]() && (_0x7f7bc3 = this[_0x7c7097(0xe3)](_0x7f7bc3), _0x7f7bc3 = this['processActorNameAutoColorChanges'](_0x7f7bc3)), _0x7f7bc3; }, Window_Base[_0x137c0c(0x3b4)][_0x137c0c(0xe3)] = function (_0x3460ab) { const _0x423d77 = _0x137c0c; for (autoColor of VisuMZ[_0x423d77(0x4bf)]['AutoColorRegExp']) { if ('sBsEA' !== _0x423d77(0x181)) _0x3460ab = _0x3460ab[_0x423d77(0x38f)](autoColor[0x0], autoColor[0x1]); else return _0x563e8e['actor'](this['itemChoiceActorId']()) || _0x1cfa9b['leader']() || null; } return _0x3460ab; }, Window_Base[_0x137c0c(0x3b4)][_0x137c0c(0x40c)] = function () { const _0x287c80 = _0x137c0c; this[_0x287c80(0x4ee)] = []; }, Window_Base[_0x137c0c(0x3b4)][_0x137c0c(0x2a1)] = function () { const _0x21b9bf = _0x137c0c; this[_0x21b9bf(0x40c)](); const _0x3b903c = VisuMZ[_0x21b9bf(0x4bf)][_0x21b9bf(0x452)][_0x21b9bf(0x344)], _0x5cd167 = _0x3b903c[_0x21b9bf(0x471)]; if (_0x5cd167 <= 0x0) return; for (const _0x13aa91 of $gameActors[_0x21b9bf(0x448)]) { if (!_0x13aa91) continue; const _0x5a7dd5 = _0x13aa91[_0x21b9bf(0x24b)](); if (_0x5a7dd5[_0x21b9bf(0xca)]()[_0x21b9bf(0xbf)] <= 0x0) continue; if (/^\d+$/[_0x21b9bf(0x48c)](_0x5a7dd5)) continue; if (_0x5a7dd5[_0x21b9bf(0x504)](/-----/i)) continue; let _0x1a409e = VisuMZ[_0x21b9bf(0x4bf)]['ConvertTextAutoColorRegExpFriendly'](_0x5a7dd5); const _0x3f12fd = new RegExp('\x5cb' + _0x1a409e + '\x5cb', 'g'), _0x35b0ff = '\x1bC[%1]%2\x1bPREVCOLOR[0]'[_0x21b9bf(0x266)](_0x5cd167, _0x5a7dd5); this[_0x21b9bf(0x4ee)]['push']([_0x3f12fd, _0x35b0ff]); } }, Window_Base[_0x137c0c(0x3b4)][_0x137c0c(0x28a)] = function (_0x1e4892) { const _0x59f368 = _0x137c0c; this['_autoColorActorNames'] === undefined && this[_0x59f368(0x2a1)](); for (autoColor of this[_0x59f368(0x4ee)]) { if (_0x59f368(0x214) !== _0x59f368(0x1ba)) _0x1e4892 = _0x1e4892[_0x59f368(0x38f)](autoColor[0x0], autoColor[0x1]); else { const _0x2d163c = _0x771c66(_0x265209['$1']); _0x2d163c !== _0x444bcd[_0x10a960][_0x59f368(0x37f)] && (_0x3ee447(_0x59f368(0x25b)[_0x59f368(0x266)](_0x1630ad, _0x2d163c)), _0x2e6952[_0x59f368(0x4fa)]()); } } return _0x1e4892; }, Window_Base[_0x137c0c(0x3b4)][_0x137c0c(0x133)] = function (_0xf9e936, _0x12c054, _0x4a7235) { const _0x10fd53 = _0x137c0c; if (!_0xf9e936) return ''; const _0x543f9f = _0xf9e936[_0x12c054]; let _0x340475 = ''; if (_0x543f9f && _0x4a7235 && _0x543f9f[_0x10fd53(0x4d0)]) { const _0x2ce92b = _0x10fd53(0x26e); _0x340475 = _0x2ce92b[_0x10fd53(0x266)](_0x543f9f[_0x10fd53(0x4d0)], _0x543f9f['name']); } else _0x543f9f ? _0x340475 = _0x543f9f[_0x10fd53(0x24b)] : _0x340475 = ''; return _0x340475 = TextManager[_0x10fd53(0x411)](_0x340475), this[_0x10fd53(0x114)]() && ('taczI' === _0x10fd53(0x20f) ? _0x340475 = this['applyDatabaseAutoColor'](_0x340475, _0xf9e936) : _0x326b5c[_0x10fd53(0xe6)](_0x10fd53(0x48c)) ? (_0x38ccbe = _0x10fd53(0x49d), _0x227c81(_0x27f60d), this[_0x10fd53(0x1d3)](), this[_0x10fd53(0x227)](), _0x1c8fd9 = '') : _0x43328f = 'CSV\x20file\x20cannot\x20be\x20created.\x0aPlease\x20enter\x20Playtest\x20mode.\x0a'), _0x340475; }, Window_Base[_0x137c0c(0x3b4)][_0x137c0c(0x26b)] = function () { const _0x5bb18a = _0x137c0c, _0x462446 = $gameParty[_0x5bb18a(0x206)](); if (_0x462446['id'] < 0x0) return ''; let _0x2f10fa = null; if (_0x462446[_0x5bb18a(0x144)] === 0x0) _0x2f10fa = $dataItems[_0x462446['id']]; if (_0x462446[_0x5bb18a(0x144)] === 0x1) _0x2f10fa = $dataWeapons[_0x462446['id']]; if (_0x462446[_0x5bb18a(0x144)] === 0x2) _0x2f10fa = $dataArmors[_0x462446['id']]; if (!_0x2f10fa) return ''; return _0x5bb18a(0x1a6)['format'](_0x2f10fa[_0x5bb18a(0x4d0)]); }, Window_Base[_0x137c0c(0x3b4)][_0x137c0c(0xd2)] = function (_0x8715e3) { const _0x4c8207 = _0x137c0c, _0x394093 = $gameParty['getLastGainedItemData'](); if (_0x394093['id'] < 0x0) return ''; let _0x4f4478 = null; if (_0x394093[_0x4c8207(0x144)] === 0x0) _0x4f4478 = $dataItems[_0x394093['id']]; if (_0x394093[_0x4c8207(0x144)] === 0x1) _0x4f4478 = $dataWeapons[_0x394093['id']]; if (_0x394093['type'] === 0x2) _0x4f4478 = $dataArmors[_0x394093['id']]; if (!_0x4f4478) return ''; return _0x8715e3 ? _0x4c8207(0x26e)['format'](_0x4f4478[_0x4c8207(0x4d0)], _0x4f4478[_0x4c8207(0x24b)]) : _0x4f4478[_0x4c8207(0x24b)]; }, Window_Base[_0x137c0c(0x3b4)][_0x137c0c(0x446)] = function () { const _0x9b1c54 = _0x137c0c, _0x260d2a = $gameParty[_0x9b1c54(0x206)](); if (_0x260d2a['id'] <= 0x0) return ''; return _0x260d2a[_0x9b1c54(0x150)]; }, Window_Base[_0x137c0c(0x3b4)][_0x137c0c(0x4ed)] = function (_0xc1c44f, _0x488fcf) { const _0x53919a = _0x137c0c, _0x128463 = VisuMZ[_0x53919a(0x4bf)][_0x53919a(0x452)][_0x53919a(0x344)]; let _0x519fc6 = 0x0; if (_0x488fcf === $dataActors) _0x519fc6 = _0x128463[_0x53919a(0x471)]; if (_0x488fcf === $dataClasses) _0x519fc6 = _0x128463['Classes']; if (_0x488fcf === $dataSkills) _0x519fc6 = _0x128463[_0x53919a(0x337)]; if (_0x488fcf === $dataItems) _0x519fc6 = _0x128463[_0x53919a(0x480)]; if (_0x488fcf === $dataWeapons) _0x519fc6 = _0x128463[_0x53919a(0x303)]; if (_0x488fcf === $dataArmors) _0x519fc6 = _0x128463[_0x53919a(0x26d)]; if (_0x488fcf === $dataEnemies) _0x519fc6 = _0x128463[_0x53919a(0x388)]; if (_0x488fcf === $dataStates) _0x519fc6 = _0x128463['States']; return _0x519fc6 > 0x0 && (_0xc1c44f = _0x53919a(0x2db)[_0x53919a(0x266)](_0x519fc6, _0xc1c44f)), _0xc1c44f; }, Window_Base[_0x137c0c(0x3b4)][_0x137c0c(0x450)] = function (_0xa1f218) { const _0x5b828e = _0x137c0c; if (_0xa1f218[_0x5b828e(0x27c)](_0x5b828e(0x46f))) return _0x5b828e(0x20a) === 'wtsHX' ? (this['setWordWrap'](![]), _0xa1f218 = _0xa1f218[_0x5b828e(0x38f)](/<(?:BR|LINEBREAK)>/gi, '\x20\x0a'), _0xa1f218) : (this[_0x5b828e(0x3dd)](_0x4d9f46, !![], ![]), this['processAutoPosition'](_0x5b828e(0x241)), ''); _0xa1f218 = _0xa1f218[_0x5b828e(0x38f)](/<(?:WORDWRAP|WORD WRAP)>/gi, (_0x219a53, _0x50d5f7) => this[_0x5b828e(0x306)](!![])), _0xa1f218 = _0xa1f218[_0x5b828e(0x38f)](/<(?:NOWORDWRAP|NO WORD WRAP)>/gi, (_0x33d5fa, _0x20e34b) => this[_0x5b828e(0x306)](![])), _0xa1f218 = _0xa1f218[_0x5b828e(0x38f)](/<\/(?:WORDWRAP|WORD WRAP)>/gi, (_0x121e41, _0xdeaf96) => this[_0x5b828e(0x306)](![])); if (_0xa1f218[_0x5b828e(0x504)](Window_Message[_0x5b828e(0x196)])) this[_0x5b828e(0x306)](![]); else _0xa1f218[_0x5b828e(0x504)](Window_Message[_0x5b828e(0x48e)]) && this[_0x5b828e(0x306)](![]); if (!this[_0x5b828e(0x24c)]()) return _0xa1f218 = _0xa1f218[_0x5b828e(0x38f)](/<(?:BR|LINEBREAK)>/gi, '\x20\x0a'), _0xa1f218; if (_0xa1f218[_0x5b828e(0xbf)] <= 0x0) return _0xa1f218; if (_0xa1f218[_0x5b828e(0x504)](/[\u3040-\u30FF\u4E00-\u9FFF]/g)) { if (_0x5b828e(0x3cf) !== _0x5b828e(0x3cf)) { const _0x1c6f29 = _0x3c65e0['loadPicture'](_0x43867c); _0x1c6f29[_0x5b828e(0x28c)](this[_0x5b828e(0x4b3)][_0x5b828e(0x29b)](this, _0x5c9f3d, ![], _0x393a78, _0x3973cc, _0x1c6f29)); } else _0xa1f218 = VisuMZ[_0x5b828e(0x4bf)]['SplitJpCnCharacters'](_0xa1f218)[_0x5b828e(0x173)](''); } return VisuMZ[_0x5b828e(0x4bf)][_0x5b828e(0x452)][_0x5b828e(0x1d5)][_0x5b828e(0x159)] ? _0x5b828e(0x20b) === _0x5b828e(0x20b) ? (_0xa1f218 = _0xa1f218[_0x5b828e(0x38f)](/[\n\r]+/g, '\x20'), _0xa1f218 = _0xa1f218[_0x5b828e(0x38f)](/<(?:BR|LINEBREAK)>/gi, '\x20\x0a')) : (_0x1e68b4[_0x5b828e(0x17f)] ? this[_0x5b828e(0xff)]() : this[_0x5b828e(0x205)](), this[_0x5b828e(0x148)](), this['applyChoiceHelpDescriptions']()) : (_0xa1f218 = _0xa1f218['replace'](/[\n\r]+/g, ''), _0xa1f218 = _0xa1f218[_0x5b828e(0x38f)](/<(?:BR|LINEBREAK)>/gi, '\x0a')), _0xa1f218 = this[_0x5b828e(0x3a7)](_0xa1f218), _0xa1f218 = _0xa1f218[_0x5b828e(0x1f9)]('\x20')[_0x5b828e(0x173)](_0x5b828e(0xe0)), _0xa1f218 = _0xa1f218[_0x5b828e(0x38f)](/<(?:BR|LINEBREAK)>/gi, '\x0a'), _0xa1f218 = _0xa1f218[_0x5b828e(0x38f)](/<LINE\x1bWrapBreak[0]BREAK>/gi, '\x0a'), _0xa1f218; }, VisuMZ[_0x137c0c(0x4bf)][_0x137c0c(0x3ac)] = function (_0x4b196d) { const _0x1bb04f = _0x137c0c; let _0x51e988 = [], _0x23b187 = ''; while (_0x4b196d[_0x1bb04f(0xbf)] > 0x0) { const _0x117db7 = _0x4b196d[_0x1bb04f(0x104)](0x0); _0x4b196d = _0x4b196d[_0x1bb04f(0x2e5)](0x1), _0x117db7[_0x1bb04f(0x504)](/[\u3040-\u30FF\u4E00-\u9FFF]/g) ? (_0x23b187[_0x1bb04f(0xbf)] > 0x0 && (_0x51e988[_0x1bb04f(0x21e)](_0x23b187), _0x23b187 = ''), _0x51e988['push'](_0x117db7 + _0x1bb04f(0x42a))) : _0x23b187 += _0x117db7; } if (_0x23b187[_0x1bb04f(0xbf)] > 0x0) { if ('ndMUJ' !== 'ndMUJ') { this['_moveTargetX'] = _0x172c75, this[_0x1bb04f(0x32c)] = _0x3e486d, this[_0x1bb04f(0x11d)] = _0x363886 || this['width'], this[_0x1bb04f(0x208)] = _0x177871 || this[_0x1bb04f(0x3e3)], this['_moveDuration'] = _0x574b91 || 0x1; if (this[_0x1bb04f(0x4d8)] <= 0x0) this[_0x1bb04f(0x4d8)] = 0x1; this['_wholeMoveDuration'] = this['_moveDuration'], this[_0x1bb04f(0x13b)] = _0x5dee4f || 0x0; if (_0x3fc6bf <= 0x0) this[_0x1bb04f(0x262)](); } else _0x51e988[_0x1bb04f(0x21e)](_0x23b187), _0x23b187 = ''; } return _0x51e988; }, Window_Base[_0x137c0c(0x3b4)][_0x137c0c(0x3a7)] = function (_0x1408dc) { return _0x1408dc; }, VisuMZ['MessageCore'][_0x137c0c(0x2c9)] = Window_Base[_0x137c0c(0x3b4)]['processNewLine'], Window_Base[_0x137c0c(0x3b4)][_0x137c0c(0x218)] = function (_0x35827e) { const _0x454cff = _0x137c0c; VisuMZ[_0x454cff(0x4bf)][_0x454cff(0x2c9)]['call'](this, _0x35827e), this[_0x454cff(0x318)](_0x35827e); }, VisuMZ[_0x137c0c(0x4bf)][_0x137c0c(0xb6)] = Window_Base[_0x137c0c(0x3b4)][_0x137c0c(0x354)], Window_Base[_0x137c0c(0x3b4)][_0x137c0c(0x354)] = function (_0x15bf14, _0x3df80a) { const _0x12d94e = _0x137c0c; VisuMZ[_0x12d94e(0x4bf)][_0x12d94e(0xb6)]['call'](this, _0x15bf14, _0x3df80a); if (_0x3df80a === _0x12d94e(0xe0)) { if (_0x12d94e(0x391) === _0x12d94e(0x1c5)) { _0x57c034[_0x12d94e(0x4bf)][_0x12d94e(0x27f)] = []; for (let _0x29d892 = 0x1; _0x29d892 <= 0x1f; _0x29d892++) { const _0x130ad0 = _0x12d94e(0x118)['format'](_0x29d892), _0x3f9e55 = _0x1d85e7[_0x12d94e(0x4bf)][_0x12d94e(0x452)]['AutoColor'][_0x130ad0]; _0x3f9e55[_0x12d94e(0x3d9)]((_0x41f696, _0x408ee6) => { const _0x22afd7 = _0x12d94e; if (!_0x41f696 || !_0x408ee6) return -0x1; return _0x408ee6[_0x22afd7(0xbf)] - _0x41f696[_0x22afd7(0xbf)]; }), this[_0x12d94e(0x165)](_0x3f9e55, _0x29d892); } } else this[_0x12d94e(0x1b0)](_0x15bf14); } else { if (_0x3df80a === _0x12d94e(0x42a)) { if (_0x12d94e(0x2c0) === _0x12d94e(0x2c0)) this[_0x12d94e(0x1b0)](_0x15bf14, !![]); else { if (!this[_0x12d94e(0x229)]) return; if (this[_0x12d94e(0x47e)] === this[_0x12d94e(0x46e)] && this[_0x12d94e(0x111)] === this[_0x12d94e(0x3e3)]) return; this['_pictureTextWidth'] = this['width'], this[_0x12d94e(0x111)] = this[_0x12d94e(0x3e3)], this['_pictureTextCache'] = {}, this[_0x12d94e(0x229)][_0x12d94e(0x1f7)](0x0, 0x0, this[_0x12d94e(0x46e)], this[_0x12d94e(0x3e3)]); } } } }, Window_Base[_0x137c0c(0x3b4)][_0x137c0c(0x44f)] = function (_0x3ab452) { const _0x546812 = _0x137c0c; var _0x1e73c4 = /^\<(.*?)\>/['exec'](_0x3ab452[_0x546812(0x30d)][_0x546812(0x2e5)](_0x3ab452['index'])); return _0x1e73c4 ? (_0x3ab452['index'] += _0x1e73c4[0x0][_0x546812(0xbf)], String(_0x1e73c4[0x0]['slice'](0x1, _0x1e73c4[0x0][_0x546812(0xbf)] - 0x1))) : _0x546812(0x324) === _0x546812(0x324) ? '' : this[_0x546812(0x45b)](); }, VisuMZ['MessageCore']['Window_Base_processEscapeCharacter'] = Window_Base[_0x137c0c(0x3b4)][_0x137c0c(0x4d2)], Window_Base[_0x137c0c(0x3b4)][_0x137c0c(0x4d2)] = function (_0x233245, _0xf647da) { const _0x3a850e = _0x137c0c; switch (_0x233245) { case 'C': _0xf647da[_0x3a850e(0x505)] ? VisuMZ[_0x3a850e(0x4bf)][_0x3a850e(0x4c7)][_0x3a850e(0x305)](this, _0x233245, _0xf647da) : this['obtainEscapeParam'](_0xf647da); break; case 'I': case '{': case '}': VisuMZ['MessageCore'][_0x3a850e(0x4c7)][_0x3a850e(0x305)](this, _0x233245, _0xf647da); break; case 'FS': this[_0x3a850e(0x190)](_0xf647da); break; case 'PX': this[_0x3a850e(0x399)](_0xf647da); break; case 'PY': this[_0x3a850e(0x3d2)](_0xf647da); break; case _0x3a850e(0x301): this[_0x3a850e(0xcf)](this[_0x3a850e(0x430)](_0xf647da)); break; case _0x3a850e(0xed): this[_0x3a850e(0x1ee)](_0xf647da); break; case _0x3a850e(0xc8): this[_0x3a850e(0x396)](_0xf647da); break; case _0x3a850e(0x352): this[_0x3a850e(0x350)](_0xf647da); break; case 'ITALIC': this[_0x3a850e(0x26c)](this[_0x3a850e(0x430)](_0xf647da)); break; case _0x3a850e(0x1f5): this[_0x3a850e(0x24a)](_0xf647da); break; case _0x3a850e(0x377): this[_0x3a850e(0x4f1)](_0xf647da); break; case _0x3a850e(0x294): this[_0x3a850e(0x33f)](_0xf647da); break; case _0x3a850e(0x398): this[_0x3a850e(0x4f9)](_0xf647da); break; case _0x3a850e(0x281): this[_0x3a850e(0x1b0)](_0xf647da); break; case _0x3a850e(0x1a9): this[_0x3a850e(0x1b0)](_0xf647da, !![]); break; default: this[_0x3a850e(0x19d)](_0x233245, _0xf647da); } }, Window_Base[_0x137c0c(0x3b4)]['processMessageCoreEscapeActions'] = function (_0x3c5ee8, _0x51958b) { const _0x379a87 = _0x137c0c; for (const _0x529cfc of VisuMZ[_0x379a87(0x4bf)][_0x379a87(0x452)][_0x379a87(0x269)]) { if (_0x529cfc[_0x379a87(0x384)] === _0x3c5ee8) { if (_0x529cfc['Type'] === '') this[_0x379a87(0x430)](_0x51958b); _0x529cfc['ActionJS'][_0x379a87(0x305)](this, _0x51958b); if (this[_0x379a87(0x456)] === Window_Message) { if (_0x379a87(0x3e0) !== _0x379a87(0x1f6)) { const _0x4dc8da = _0x529cfc[_0x379a87(0x99)] || 0x0; if (_0x4dc8da > 0x0) this[_0x379a87(0x191)](_0x4dc8da); } else return _0x4e2c7b = _0x24eb6c['replace'](/<LEFT>/gi, _0x379a87(0x248)), _0x106e04 = _0x2861b7[_0x379a87(0x38f)](/<\/LEFT>/gi, _0x379a87(0x383)), _0x3e40d7 = _0x45705e['replace'](/<CENTER>/gi, _0x379a87(0x38d)), _0x3378ca = _0x28f88f[_0x379a87(0x38f)](/<\/CENTER>/gi, _0x379a87(0x383)), _0xd56eeb = _0x43e649[_0x379a87(0x38f)](/<RIGHT>/gi, _0x379a87(0xe2)), _0x31b425 = _0xa69d0e[_0x379a87(0x38f)](/<\/RIGHT>/gi, _0x379a87(0x383)), _0xede316; } } } }, Window_Base[_0x137c0c(0x3b4)][_0x137c0c(0xdd)] = function () { const _0x3741c1 = _0x137c0c; this[_0x3741c1(0x146)]['fontSize'] += VisuMZ[_0x3741c1(0x4bf)]['Settings'][_0x3741c1(0x4a2)][_0x3741c1(0x32a)], this[_0x3741c1(0x146)][_0x3741c1(0x3fc)] = Math['min'](this[_0x3741c1(0x146)][_0x3741c1(0x3fc)], VisuMZ['MessageCore'][_0x3741c1(0x452)]['General'][_0x3741c1(0x46c)]); }, Window_Base[_0x137c0c(0x3b4)]['makeFontSmaller'] = function () { const _0x4d823f = _0x137c0c; this['contents'][_0x4d823f(0x3fc)] -= VisuMZ[_0x4d823f(0x4bf)][_0x4d823f(0x452)]['General'][_0x4d823f(0x32a)], this[_0x4d823f(0x146)][_0x4d823f(0x3fc)] = Math['max'](this[_0x4d823f(0x146)][_0x4d823f(0x3fc)], VisuMZ[_0x4d823f(0x4bf)][_0x4d823f(0x452)][_0x4d823f(0x4a2)][_0x4d823f(0x4b0)]); }, Window_Base['prototype']['processFsTextCode'] = function (_0x17ffc1) { const _0x208b1f = _0x137c0c, _0x4304e9 = this[_0x208b1f(0x430)](_0x17ffc1); this['contents'][_0x208b1f(0x3fc)] = _0x4304e9[_0x208b1f(0x3d1)](VisuMZ[_0x208b1f(0x4bf)]['Settings']['General'][_0x208b1f(0x4b0)], VisuMZ[_0x208b1f(0x4bf)][_0x208b1f(0x452)][_0x208b1f(0x4a2)]['FontBiggerCap']); }, Window_Base['prototype']['maxFontSizeInLine'] = function (_0x2506ee) { const _0x479e8d = _0x137c0c; let _0x1e34de = this[_0x479e8d(0x146)]['fontSize']; const _0x561b23 = /\x1b({|}|FS)(\[(\d+)])?/gi; for (; ;) { const _0x226b5a = _0x561b23['exec'](_0x2506ee); if (!_0x226b5a) { if (_0x479e8d(0x3cc) === _0x479e8d(0x3cc)) break; else { if (this[_0x479e8d(0x229)]) return; if (this[_0x479e8d(0x4a0)]) return; const _0x4f2db9 = new _0x55c9c3(0x0, 0x0, 0x0, 0x0); this[_0x479e8d(0x229)] = new _0x320180(_0x4f2db9), this[_0x479e8d(0x229)][_0x479e8d(0xfe)] = 0x0, this[_0x479e8d(0x4a0)] = new _0x426f0b(), this[_0x479e8d(0x389)](this['_pictureTextSprite'], 0x0), this[_0x479e8d(0x47e)] = 0x0, this['_pictureTextHeight'] = 0x0, this['_pictureTextCache'] = {}; } } const _0x45d970 = String(_0x226b5a[0x1])[_0x479e8d(0x282)](); if (_0x45d970 === '{') { if (_0x479e8d(0x1cb) !== _0x479e8d(0x1cb)) { const _0x10fff1 = _0x53719d['width'] || this[_0x479e8d(0xa9)], _0x419e1c = this[_0x479e8d(0x309)] !== _0x230d9a ? this[_0x479e8d(0x43b)]() : this['innerHeight'], _0x32ba5e = _0x10fff1 / _0x2c1fe2[_0x479e8d(0x46e)], _0x56c37a = _0x419e1c / _0xd9c695[_0x479e8d(0x3e3)], _0x105384 = _0x5adc6c['min'](_0x32ba5e, _0x56c37a, 0x1), _0x48e264 = this[_0x479e8d(0x309)] !== _0x5ac060 ? (this[_0x479e8d(0x36b)](0x0)[_0x479e8d(0x3e3)] - this[_0x479e8d(0x3df)]()) / 0x2 : 0x0, _0x55a8d9 = _0x4f1da7['width'] * _0x105384, _0x4b3e5a = _0x2d1ff1[_0x479e8d(0x3e3)] * _0x105384, _0x4d4b03 = _0x866cfd[_0x479e8d(0x4ae)]((_0x10fff1 - _0x55a8d9) / 0x2) + _0x31a105[_0x479e8d(0x3f8)], _0x24aa39 = _0x25040b[_0x479e8d(0x4ae)]((_0x419e1c - _0x4b3e5a) / 0x2) + _0x5f371b[_0x479e8d(0x1d9)] - _0x48e264 * 0x2; this[_0x479e8d(0x1bf)][_0x479e8d(0x1db)] = _0x3c8957, this[_0x479e8d(0x1bf)][_0x479e8d(0x2ca)](_0x21dfc0, 0x0, 0x0, _0x4c1bc5['width'], _0x4043fe[_0x479e8d(0x3e3)], _0x4d4b03, _0x24aa39, _0x55a8d9, _0x4b3e5a), this[_0x479e8d(0x1bf)]['paintOpacity'] = 0xff; } else this[_0x479e8d(0xdd)](); } else { if (_0x45d970 === '}') _0x479e8d(0x4a5) !== _0x479e8d(0x4a5) ? _0x4b526d++ : this[_0x479e8d(0x4a7)](); else { if (_0x45d970 === 'FS') { if (_0x479e8d(0x171) === _0x479e8d(0x2ea)) { if (!this[_0x479e8d(0x4a0)]) return; this['_pictureTextSprite'][_0x479e8d(0x33e)]['x'] = this[_0x479e8d(0x33e)]['x'], this[_0x479e8d(0x4a0)][_0x479e8d(0x33e)]['y'] = this['anchor']['y']; } else this[_0x479e8d(0x146)][_0x479e8d(0x3fc)] = parseInt(_0x226b5a[0x3])[_0x479e8d(0x3d1)](VisuMZ[_0x479e8d(0x4bf)]['Settings']['General'][_0x479e8d(0x4b0)], VisuMZ[_0x479e8d(0x4bf)][_0x479e8d(0x452)][_0x479e8d(0x4a2)][_0x479e8d(0x46c)]); } } } this[_0x479e8d(0x146)][_0x479e8d(0x3fc)] > _0x1e34de && ('lreQd' !== _0x479e8d(0x368) ? _0x1e34de = this['contents'][_0x479e8d(0x3fc)] : _0xd3fe4 = _0x43989a[_0x479e8d(0x4ae)]((this['width'] - _0x4ddc52[_0x479e8d(0x46e)]) / 0x2)); } return _0x1e34de; }, Window_Base[_0x137c0c(0x3b4)][_0x137c0c(0x399)] = function (_0x108011) { const _0x28bd5b = _0x137c0c; _0x108011['x'] = this[_0x28bd5b(0x430)](_0x108011), VisuMZ[_0x28bd5b(0x4bf)]['Settings'][_0x28bd5b(0x4a2)][_0x28bd5b(0x507)] && (_0x28bd5b(0x2d0) === _0x28bd5b(0x2d0) ? _0x108011['x'] += _0x108011[_0x28bd5b(0x3f8)] : (_0x281daa[_0x28bd5b(0x4bf)]['Game_Screen_clearPictures'][_0x28bd5b(0x305)](this), this[_0x28bd5b(0x186)]())); }, Window_Base['prototype']['processPyTextCode'] = function (_0x59cfb3) { const _0x5830db = _0x137c0c; _0x59cfb3['y'] = this[_0x5830db(0x430)](_0x59cfb3), VisuMZ[_0x5830db(0x4bf)][_0x5830db(0x452)][_0x5830db(0x4a2)]['RelativePXPY'] && (_0x59cfb3['y'] += _0x59cfb3[_0x5830db(0x1d9)]); }, Window_Base[_0x137c0c(0x3b4)][_0x137c0c(0xcf)] = function (_0xb5ddc) { const _0x2448ab = _0x137c0c; this[_0x2448ab(0x146)]['fontBold'] = !!_0xb5ddc; }, Window_Base[_0x137c0c(0x3b4)][_0x137c0c(0x26c)] = function (_0x226cff) { const _0x50fd61 = _0x137c0c; this[_0x50fd61(0x146)][_0x50fd61(0x160)] = !!_0x226cff; }, Window_Base['prototype']['processTextAlignmentChange'] = function (_0x339b3c) { const _0x5a381d = _0x137c0c, _0x3efcd6 = this[_0x5a381d(0x430)](_0x339b3c); if (!_0x339b3c['drawing']) return; switch (_0x3efcd6) { case 0x0: this[_0x5a381d(0xe5)](_0x5a381d(0x236)); return; case 0x1: this['setTextAlignment'](_0x5a381d(0x21d)); break; case 0x2: this[_0x5a381d(0xe5)](_0x5a381d(0x508)); break; case 0x3: this['setTextAlignment'](_0x5a381d(0x1f1)); break; }this[_0x5a381d(0x318)](_0x339b3c); }, Window_Base[_0x137c0c(0x3b4)][_0x137c0c(0x318)] = function (_0x1652d6) { const _0x132b2e = _0x137c0c; if (!_0x1652d6[_0x132b2e(0x505)]) return; if (_0x1652d6[_0x132b2e(0x3ef)]) return; if (this[_0x132b2e(0x4f7)]() === 'default') return; let _0x45067e = _0x1652d6['text'][_0x132b2e(0x39b)](_0x132b2e(0x46f), _0x1652d6[_0x132b2e(0x1ff)] + 0x1), _0x4f472a = _0x1652d6[_0x132b2e(0x30d)][_0x132b2e(0x39b)]('\x0a', _0x1652d6[_0x132b2e(0x1ff)] + 0x1); if (_0x45067e < 0x0) _0x45067e = _0x1652d6[_0x132b2e(0x30d)][_0x132b2e(0xbf)] + 0x1; if (_0x4f472a > 0x0) _0x45067e = Math[_0x132b2e(0x22e)](_0x45067e, _0x4f472a); const _0x5dfb5a = _0x1652d6[_0x132b2e(0x30d)][_0x132b2e(0x10d)](_0x1652d6['index'], _0x45067e), _0x121e0d = this[_0x132b2e(0x482)](_0x5dfb5a)['width'], _0x4c77f3 = _0x1652d6['width'] || this[_0x132b2e(0xa9)] - 0x8, _0x426bcb = this[_0x132b2e(0x456)] === Window_Message && $gameMessage[_0x132b2e(0xdf)]() !== ''; switch (this[_0x132b2e(0x4f7)]()) { case _0x132b2e(0x21d): _0x1652d6['x'] = _0x1652d6[_0x132b2e(0x3f8)]; break; case _0x132b2e(0x508): _0x1652d6['x'] = _0x1652d6[_0x132b2e(0x3f8)], _0x1652d6['x'] += Math['floor']((_0x4c77f3 - _0x121e0d) / 0x2); if (_0x426bcb) { if (_0x132b2e(0x3c6) !== _0x132b2e(0x36f)) _0x1652d6['x'] -= _0x1652d6[_0x132b2e(0x3f8)] / 0x2; else { const _0x21f352 = _0x503c3d['MessageCore']['Settings'][_0x132b2e(0x4a2)]; return _0x2a0790 = (_0x21f352[_0x132b2e(0x167)] || '') + _0x29dc8c + (_0x21f352[_0x132b2e(0x362)] || ''), _0x363a33 = _0x1010ff[_0x132b2e(0x38f)](/<(?:NEXT PAGE|NEXTPAGE)>/gi, ''), _0x418b1e = _0x46a229[_0x132b2e(0x38f)](/<(?:RNG|RAND|RANDOM)>(.*?)<\/(?:RNG|RAND|RANDOM)>/gi, (_0x1109b9, _0x4108be) => this[_0x132b2e(0x449)](_0x4108be)), _0x20b2d9; } } break; case 'right': _0x1652d6['x'] = _0x4c77f3 - _0x121e0d + _0x1652d6[_0x132b2e(0x3f8)]; _0x426bcb && (_0x1652d6['x'] -= _0x1652d6['startX']); break; } }, Window_Base[_0x137c0c(0x3b4)][_0x137c0c(0x482)] = function (_0x35b1ce) { const _0xd869e2 = _0x137c0c; _0x35b1ce = _0x35b1ce[_0xd869e2(0x38f)](/\x1b!/g, ''), _0x35b1ce = _0x35b1ce[_0xd869e2(0x38f)](/\x1b\|/g, ''), _0x35b1ce = _0x35b1ce['replace'](/\x1b\./g, ''); const _0x2968eb = this['createTextState'](_0x35b1ce, 0x0, 0x0, 0x0), _0x517418 = this[_0xd869e2(0x3e1)](); return _0x2968eb[_0xd869e2(0x505)] = ![], this[_0xd869e2(0x2df)](_0x2968eb), this['returnPreservedFontSettings'](_0x517418), { 'width': _0x2968eb['outputWidth'], 'height': _0x2968eb[_0xd869e2(0x178)] }; }, Window_Base['WORD_WRAP_PADDING'] = VisuMZ[_0x137c0c(0x4bf)][_0x137c0c(0x452)][_0x137c0c(0x1d5)][_0x137c0c(0x39f)] || 0x0, Window_Base[_0x137c0c(0x3b4)][_0x137c0c(0x1b0)] = function (_0xa987ad, _0x5d0153) { const _0x5e7fb4 = _0x137c0c, _0x548e6b = (_0xa987ad[_0x5e7fb4(0x3ef)] ? -0x1 : 0x1) * this[_0x5e7fb4(0x163)]('\x20'); if (!_0x5d0153) _0xa987ad['x'] += _0x548e6b; if (this['obtainEscapeParam'](_0xa987ad) > 0x0 && !_0x5d0153) _0xa987ad['x'] += _0x548e6b; if (_0xa987ad[_0x5e7fb4(0x3ef)]) return; let _0x98e2f1; if (_0x5d0153) _0x98e2f1 = _0xa987ad['text'][_0x5e7fb4(0x39b)](_0x5e7fb4(0x42a), _0xa987ad['index'] + 0x1); else { if (_0x5e7fb4(0x275) === _0x5e7fb4(0x4e8)) { if (this[_0x5e7fb4(0x47c)][_0x5e7fb4(0x435)](_0x478211 => _0x478211[_0x5e7fb4(0x3ff)])) return; this[_0x5e7fb4(0x4b8)](), this[_0x5e7fb4(0x1de)](), _0x481b6e[_0x5e7fb4(0x174)] = [], this[_0x5e7fb4(0x2c1)]['isOpen']() && this[_0x5e7fb4(0x2c1)][_0x5e7fb4(0x1e9)](); } else _0x98e2f1 = _0xa987ad[_0x5e7fb4(0x30d)][_0x5e7fb4(0x39b)](_0x5e7fb4(0xe0), _0xa987ad[_0x5e7fb4(0x1ff)] + 0x1); } let _0x280e9d = _0xa987ad[_0x5e7fb4(0x30d)][_0x5e7fb4(0x39b)]('\x0a', _0xa987ad['index'] + 0x1); if (_0x98e2f1 < 0x0) _0x98e2f1 = _0xa987ad[_0x5e7fb4(0x30d)]['length'] + 0x1; if (_0x280e9d > 0x0) _0x98e2f1 = Math[_0x5e7fb4(0x22e)](_0x98e2f1, _0x280e9d); const _0x40a811 = _0xa987ad[_0x5e7fb4(0x30d)]['substring'](_0xa987ad[_0x5e7fb4(0x1ff)], _0x98e2f1), _0x3864cb = this[_0x5e7fb4(0x131)](_0x40a811)[_0x5e7fb4(0x46e)]; let _0x161420 = _0xa987ad['width'] || this['innerWidth']; _0x161420 -= Window_Base[_0x5e7fb4(0x2c2)]; if (this[_0x5e7fb4(0x456)] === Window_Message) { const _0x1934bf = $gameMessage[_0x5e7fb4(0xdf)]() === '' ? 0x0 : ImageManager[_0x5e7fb4(0x333)] + 0x14; _0x161420 -= _0x1934bf, VisuMZ['MessageCore'][_0x5e7fb4(0x452)][_0x5e7fb4(0x1d5)]['TightWrap'] && (_0x161420 -= _0x1934bf); } let _0x53aa18 = ![]; if (_0xa987ad['x'] + _0x3864cb > _0xa987ad[_0x5e7fb4(0x3f8)] + _0x161420) { if ('vPvDp' === _0x5e7fb4(0x35c)) for (const _0x46ac93 of this[_0x5e7fb4(0x3f1)]) { if (_0x46ac93) { let _0x5f22eb = this[_0x5e7fb4(0x3f1)][_0x5e7fb4(0x39b)](_0x46ac93); this[_0x5e7fb4(0x339)](_0x5f22eb); } } else _0x53aa18 = !![]; } if (_0x3864cb === 0x0) { if (_0x5e7fb4(0x489) !== _0x5e7fb4(0x489)) { this[_0x5e7fb4(0x210)] = ![]; for (const _0x5c6149 of _0x4f2a2a['MessageCore'][_0x5e7fb4(0x452)][_0x5e7fb4(0x2e7)]) { _0x298a9e && _0x5a7b61[_0x5e7fb4(0x504)](_0x5c6149[_0x5e7fb4(0x22c)]) && (this[_0x5e7fb4(0x210)] = !![], _0x5b6cea = _0x205185['replace'](_0x5c6149[_0x5e7fb4(0x22c)], _0x5c6149['textCodeResult'][_0x5e7fb4(0x29b)](this))); } return _0x53874d || ''; } else _0x53aa18 = ![]; } _0x53aa18 && (_0x5e7fb4(0x417) !== _0x5e7fb4(0x417) ? (this[_0x5e7fb4(0x1fe)] = this[_0x5e7fb4(0x1fe)] || [], (this[_0x5e7fb4(0x4e6)](_0x53e12a) || _0x4f89c5) && this[_0x5e7fb4(0x1fe)][_0x5e7fb4(0x21e)](_0x520616)) : _0xa987ad[_0x5e7fb4(0x30d)] = _0xa987ad['text']['slice'](0x0, _0xa987ad[_0x5e7fb4(0x1ff)]) + '\x0a' + _0xa987ad['text'][_0x5e7fb4(0x30e)](_0xa987ad[_0x5e7fb4(0x1ff)])); }, Window_Base[_0x137c0c(0x3b4)][_0x137c0c(0x131)] = function (_0x439b94) { const _0xaa913f = _0x137c0c, _0x23c87f = this[_0xaa913f(0xda)](_0x439b94, 0x0, 0x0, 0x0), _0x4b3e5b = this[_0xaa913f(0x3e1)](); return _0x23c87f[_0xaa913f(0x505)] = ![], this[_0xaa913f(0x306)](![]), this['processAllText'](_0x23c87f), this['setWordWrap'](!![]), this['returnPreservedFontSettings'](_0x4b3e5b), { 'width': _0x23c87f[_0xaa913f(0xf3)], 'height': _0x23c87f['outputHeight'] }; }, Window_Base['prototype']['processCommonEvent'] = function (_0x49a8d9) { return this['obtainEscapeParam'](_0x49a8d9); }, Window_Base[_0x137c0c(0x3b4)][_0x137c0c(0x24a)] = function (_0x57ca09) { const _0x351bd9 = _0x137c0c, _0x5569d4 = this['obtainEscapeString'](_0x57ca09)[_0x351bd9(0x1f9)](','); if (!_0x57ca09['drawing']) return; const _0x575aac = _0x5569d4[0x0][_0x351bd9(0xca)](), _0xc36888 = _0x5569d4[0x1] || 0x0, _0x1336ae = _0x5569d4[0x2] || 0x0, _0x199dc2 = ImageManager[_0x351bd9(0x253)](_0x575aac), _0x21fd46 = this['contents']['paintOpacity']; _0x199dc2[_0x351bd9(0x28c)](this[_0x351bd9(0x423)]['bind'](this, _0x199dc2, _0x57ca09['x'], _0x57ca09['y'], _0xc36888, _0x1336ae, _0x21fd46)); }, Window_Base['prototype'][_0x137c0c(0x423)] = function (_0x870129, _0x3b01c9, _0x4f58cd, _0x216711, _0x27e0aa, _0x3e58bb) { const _0x5698c5 = _0x137c0c; _0x216711 = _0x216711 || _0x870129[_0x5698c5(0x46e)], _0x27e0aa = _0x27e0aa || _0x870129[_0x5698c5(0x3e3)], this[_0x5698c5(0x1bf)][_0x5698c5(0x1db)] = _0x3e58bb, this[_0x5698c5(0x1bf)][_0x5698c5(0x2ca)](_0x870129, 0x0, 0x0, _0x870129[_0x5698c5(0x46e)], _0x870129['height'], _0x3b01c9, _0x4f58cd, _0x216711, _0x27e0aa), this[_0x5698c5(0x1bf)][_0x5698c5(0x1db)] = 0xff; }, Window_Base['prototype']['processDrawCenteredPicture'] = function (_0xaf35ff) { const _0x52a318 = _0x137c0c, _0x50f8b4 = this[_0x52a318(0x44f)](_0xaf35ff)['split'](','); if (!_0xaf35ff[_0x52a318(0x505)]) return; const _0x57f117 = _0x50f8b4[0x0]['trim'](), _0x5291ee = ImageManager['loadPicture'](_0x57f117), _0x5d05ba = JsonEx[_0x52a318(0xeb)](_0xaf35ff), _0xda4bf = this[_0x52a318(0x146)][_0x52a318(0x1db)]; _0x5291ee[_0x52a318(0x28c)](this[_0x52a318(0x434)][_0x52a318(0x29b)](this, _0x5291ee, _0x5d05ba, _0xda4bf)); }, Window_Base[_0x137c0c(0x3b4)][_0x137c0c(0x434)] = function (_0x76984e, _0x19db93, _0x1db72a) { const _0xa57e90 = _0x137c0c, _0x2aae7f = _0x19db93[_0xa57e90(0x46e)] || this['innerWidth'], _0x4c4de0 = this['_index'] !== undefined ? this[_0xa57e90(0x43b)]() : this[_0xa57e90(0x16a)], _0x3c93f2 = _0x2aae7f / _0x76984e[_0xa57e90(0x46e)], _0x49d78a = _0x4c4de0 / _0x76984e[_0xa57e90(0x3e3)], _0x107e13 = Math['min'](_0x3c93f2, _0x49d78a, 0x1), _0x5f4c68 = this[_0xa57e90(0x309)] !== undefined ? (this[_0xa57e90(0x36b)](0x0)['height'] - this[_0xa57e90(0x3df)]()) / 0x2 : 0x0, _0x379e9a = _0x76984e[_0xa57e90(0x46e)] * _0x107e13, _0x2f132c = _0x76984e[_0xa57e90(0x3e3)] * _0x107e13, _0x387276 = Math[_0xa57e90(0x4ae)]((_0x2aae7f - _0x379e9a) / 0x2) + _0x19db93['startX'], _0x39f370 = Math[_0xa57e90(0x4ae)]((_0x4c4de0 - _0x2f132c) / 0x2) + _0x19db93[_0xa57e90(0x1d9)] - _0x5f4c68 * 0x2; this[_0xa57e90(0x1bf)]['paintOpacity'] = _0x1db72a, this[_0xa57e90(0x1bf)]['blt'](_0x76984e, 0x0, 0x0, _0x76984e[_0xa57e90(0x46e)], _0x76984e[_0xa57e90(0x3e3)], _0x387276, _0x39f370, _0x379e9a, _0x2f132c), this[_0xa57e90(0x1bf)][_0xa57e90(0x1db)] = 0xff; }, Window_Base[_0x137c0c(0x3b4)]['processColorLock'] = function (_0x1d5583) { const _0x974283 = _0x137c0c, _0x4cdfbe = this[_0x974283(0x430)](_0x1d5583); if (_0x1d5583[_0x974283(0x505)]) this[_0x974283(0x37d)](_0x4cdfbe > 0x0); }, Window_Base['prototype']['processCustomWait'] = function (_0x297fb7) { const _0x293409 = _0x137c0c, _0x37ca76 = this[_0x293409(0x430)](_0x297fb7); this[_0x293409(0x456)] === Window_Message && _0x297fb7['drawing'] && this[_0x293409(0x2b6)](_0x37ca76); }, VisuMZ[_0x137c0c(0x4bf)][_0x137c0c(0x4dd)] = function (_0x2b2768) { const _0x4f8a59 = _0x137c0c; if ($gameTemp[_0x4f8a59(0x12c)]()) { if (_0x4f8a59(0xbb) === _0x4f8a59(0xbb)) { let _0x343246 = _0x4f8a59(0x1f4)[_0x4f8a59(0x266)](_0x2b2768[_0x4f8a59(0x456)][_0x4f8a59(0x24b)]); alert(_0x343246), SceneManager[_0x4f8a59(0x4fa)](); } else _0x58d0de = this[_0x4f8a59(0xe3)](_0x484dca), _0x32789d = this['processActorNameAutoColorChanges'](_0x3958d1); } }, Window_Base['prototype'][_0x137c0c(0x292)] = function () { const _0xec26a3 = _0x137c0c; VisuMZ[_0xec26a3(0x4bf)][_0xec26a3(0x4dd)](this); }, Window_Base[_0x137c0c(0x3b4)][_0x137c0c(0x1d4)] = function () { const _0x286c34 = _0x137c0c; VisuMZ[_0x286c34(0x4bf)][_0x286c34(0x4dd)](this); }, Window_Base[_0x137c0c(0x3b4)][_0x137c0c(0x37e)] = function () { const _0x1da24a = _0x137c0c; VisuMZ[_0x1da24a(0x4bf)][_0x1da24a(0x4dd)](this); }, Window_Help['prototype'][_0x137c0c(0x3e5)] = function () { const _0x2fec4d = _0x137c0c; this[_0x2fec4d(0x306)]($gameSystem['isHelpWindowWordWrap']()); }, Window_Help[_0x137c0c(0x3b4)][_0x137c0c(0x114)] = function () { return !![]; }, VisuMZ[_0x137c0c(0x4bf)][_0x137c0c(0x155)] = Window_Help[_0x137c0c(0x3b4)][_0x137c0c(0x3bb)], Window_Help[_0x137c0c(0x3b4)]['refresh'] = function () { const _0x1f5b37 = _0x137c0c; this[_0x1f5b37(0x40c)](), VisuMZ[_0x1f5b37(0x4bf)][_0x1f5b37(0x155)]['call'](this), this[_0x1f5b37(0x3e5)](); }, VisuMZ[_0x137c0c(0x4bf)]['Window_Options_addGeneralOptions'] = Window_Options[_0x137c0c(0x3b4)]['addGeneralOptions'], Window_Options[_0x137c0c(0x3b4)][_0x137c0c(0x130)] = function () { const _0x543423 = _0x137c0c; VisuMZ[_0x543423(0x4bf)][_0x543423(0x22b)][_0x543423(0x305)](this), this['addMessageCoreCommands'](); }, Window_Options[_0x137c0c(0x3b4)][_0x137c0c(0x193)] = function () { const _0x48eae5 = _0x137c0c; if (VisuMZ[_0x48eae5(0x4bf)][_0x48eae5(0x452)][_0x48eae5(0x422)]['AddOption'] && TextManager[_0x48eae5(0x2d2)]()) { if (_0x48eae5(0x4b6) !== _0x48eae5(0x4b6)) { const _0x2283a9 = _0x23e5f0['MessageCore']['Settings']['Localization'][_0x48eae5(0x310)] || [], _0x19f8fd = _0x24459f[_0x48eae5(0x137)]; let _0x4640b7 = _0x2283a9[_0x48eae5(0x39b)](_0x19f8fd); _0x4640b7 += _0x132291 ? 0x1 : -0x1; if (_0x4640b7 >= _0x2283a9[_0x48eae5(0xbf)]) _0x4640b7 = _0x5a02ef ? 0x0 : _0x2283a9['length'] - 0x1; if (_0x4640b7 < 0x0) _0x4640b7 = _0x471ed3 ? _0x2283a9[_0x48eae5(0xbf)] - 0x1 : 0x0; this[_0x48eae5(0x3b5)](_0x48eae5(0x137), _0x2283a9[_0x4640b7]); } else this[_0x48eae5(0x138)](); } if (VisuMZ['MessageCore'][_0x48eae5(0x452)]['TextSpeed'][_0x48eae5(0x359)]) { if (_0x48eae5(0x27d) === 'axqYp') { const _0x4b9dee = this['getConfigValue']('textSpeed'); return _0x4b9dee > 0xa ? _0x4c0dfc['instantTextSpeed'] : _0x4b9dee; } else this['addMessageCoreTextSpeedCommand'](); } }, Window_Options[_0x137c0c(0x3b4)][_0x137c0c(0x138)] = function () { const _0xf9ed82 = _0x137c0c, _0x29c34c = TextManager[_0xf9ed82(0xaf)], _0x58c662 = _0xf9ed82(0x137); this[_0xf9ed82(0xf8)](_0x29c34c, _0x58c662); }, Window_Options[_0x137c0c(0x3b4)]['addMessageCoreTextSpeedCommand'] = function () { const _0x26ec4e = _0x137c0c, _0x5e8817 = TextManager[_0x26ec4e(0x4bd)], _0x426902 = _0x26ec4e(0x3c5); this['addCommand'](_0x5e8817, _0x426902); }, VisuMZ[_0x137c0c(0x4bf)]['Window_Options_statusText'] = Window_Options[_0x137c0c(0x3b4)]['statusText'], Window_Options[_0x137c0c(0x3b4)][_0x137c0c(0x4b1)] = function (_0x610140) { const _0x5042ca = _0x137c0c, _0x54c26b = this[_0x5042ca(0x42e)](_0x610140); if (_0x54c26b === 'textLocale') return this[_0x5042ca(0x3a8)](); if (_0x54c26b === _0x5042ca(0x3c5)) return this[_0x5042ca(0x3e8)](); return VisuMZ[_0x5042ca(0x4bf)][_0x5042ca(0x217)][_0x5042ca(0x305)](this, _0x610140); }, Window_Options[_0x137c0c(0x3b4)][_0x137c0c(0x3a8)] = function () { const _0x52694e = _0x137c0c, _0x7bcd1c = ConfigManager['textLocale']; return TextManager[_0x52694e(0x290)](_0x7bcd1c); }, Window_Options[_0x137c0c(0x3b4)][_0x137c0c(0x3e8)] = function () { const _0x187904 = _0x137c0c, _0xe0d270 = this['getConfigValue'](_0x187904(0x3c5)); return _0xe0d270 > 0xa ? TextManager[_0x187904(0x242)] : _0xe0d270; }, VisuMZ['MessageCore'][_0x137c0c(0x1b4)] = Window_Options['prototype'][_0x137c0c(0x1a8)], Window_Options[_0x137c0c(0x3b4)]['isVolumeSymbol'] = function (_0x11f0ac) { const _0x2ca44b = _0x137c0c; if (_0x11f0ac === _0x2ca44b(0x137)) return !![]; if (_0x11f0ac === _0x2ca44b(0x3c5)) return !![]; return VisuMZ['MessageCore'][_0x2ca44b(0x1b4)][_0x2ca44b(0x305)](this, _0x11f0ac); }, VisuMZ[_0x137c0c(0x4bf)][_0x137c0c(0x501)] = Window_Options['prototype'][_0x137c0c(0x3a1)], Window_Options[_0x137c0c(0x3b4)][_0x137c0c(0x3a1)] = function (_0x238692, _0x50bb23, _0x4c5f8c) { const _0x45063c = _0x137c0c; if (_0x238692 === _0x45063c(0x137)) return this['changeVisuMzTextLocale'](_0x50bb23, _0x4c5f8c); if (_0x238692 === _0x45063c(0x3c5)) return this['changeTextSpeed'](_0x238692, _0x50bb23, _0x4c5f8c); VisuMZ['MessageCore'][_0x45063c(0x501)]['call'](this, _0x238692, _0x50bb23, _0x4c5f8c); }, Window_Options[_0x137c0c(0x3b4)][_0x137c0c(0xf7)] = function (_0x5b9877, _0x3311a3) { const _0x282f33 = _0x137c0c, _0x29caa6 = VisuMZ[_0x282f33(0x4bf)][_0x282f33(0x452)][_0x282f33(0x422)][_0x282f33(0x310)] || [], _0x107432 = ConfigManager[_0x282f33(0x137)]; let _0x3f79b7 = _0x29caa6[_0x282f33(0x39b)](_0x107432); _0x3f79b7 += _0x5b9877 ? 0x1 : -0x1; if (_0x3f79b7 >= _0x29caa6[_0x282f33(0xbf)]) _0x3f79b7 = _0x3311a3 ? 0x0 : _0x29caa6[_0x282f33(0xbf)] - 0x1; if (_0x3f79b7 < 0x0) _0x3f79b7 = _0x3311a3 ? _0x29caa6['length'] - 0x1 : 0x0; this[_0x282f33(0x3b5)](_0x282f33(0x137), _0x29caa6[_0x3f79b7]); }, Window_Options[_0x137c0c(0x3b4)][_0x137c0c(0x4f0)] = function (_0x164c32, _0x28b698, _0x5da3f5) { const _0x34ac12 = _0x137c0c, _0x727a8f = this[_0x34ac12(0x3fe)](_0x164c32), _0x248753 = 0x1, _0x140de4 = _0x727a8f + (_0x28b698 ? _0x248753 : -_0x248753); if (_0x140de4 > 0xb && _0x5da3f5) this[_0x34ac12(0x3b5)](_0x164c32, 0x1); else { if (_0x34ac12(0x3db) !== _0x34ac12(0x3db)) return _0x304eac = _0x2f5175[_0x34ac12(0x38f)](/\x1bN\[(\d+)\]/gi, (_0xaadc99, _0x293502) => this['actorName'](_0x33ecea(_0x293502))), _0x1ee7f7 = _0x2f2f07[_0x34ac12(0x38f)](/\x1bP\[(\d+)\]/gi, (_0x140008, _0x18e80c) => this[_0x34ac12(0x3ab)](_0x236542(_0x18e80c))), _0x3f8d79 = _0x58a1d7[_0x34ac12(0x38f)](/\x1bG/gi, _0xe23a75[_0x34ac12(0x3f0)]), _0x1f2716; else this[_0x34ac12(0x3b5)](_0x164c32, _0x140de4['clamp'](0x1, 0xb)); } }, Window_Message[_0x137c0c(0x3b4)]['contentsHeight'] = function () { const _0x43be82 = _0x137c0c; let _0x1a404b = Window_Base[_0x43be82(0x3b4)][_0x43be82(0x431)][_0x43be82(0x305)](this); return _0x1a404b -= this[_0x43be82(0x3f2)](), _0x1a404b; }, Window_Message[_0x137c0c(0x3b4)]['refreshDimmerBitmap'] = function () { const _0x4c0b49 = _0x137c0c; Window_Base['prototype'][_0x4c0b49(0x40d)][_0x4c0b49(0x305)](this), VisuMZ[_0x4c0b49(0x4bf)]['Settings'][_0x4c0b49(0x4a2)][_0x4c0b49(0x379)] && this[_0x4c0b49(0x4cb)](); }, Window_Message['prototype'][_0x137c0c(0x4cb)] = function () { const _0x42e87c = _0x137c0c; this['_dimmerSprite']['x'] = Math[_0x42e87c(0x385)](this[_0x42e87c(0x46e)] / 0x2), this[_0x42e87c(0x376)][_0x42e87c(0x33e)]['x'] = 0.5, this['_dimmerSprite'][_0x42e87c(0x382)]['x'] = Graphics[_0x42e87c(0x46e)]; }, VisuMZ[_0x137c0c(0x4bf)][_0x137c0c(0x302)] = Window_Message['prototype'][_0x137c0c(0x177)], Window_Message['prototype'][_0x137c0c(0x177)] = function () { const _0x566d1c = _0x137c0c; VisuMZ['MessageCore']['Window_Message_clearFlags']['call'](this), this['clearActorNameAutoColor'](), this[_0x566d1c(0x3e5)](), this[_0x566d1c(0x37d)](![]), this['setTextAlignment'](_0x566d1c(0x236)), this[_0x566d1c(0x37e)](VisuMZ[_0x566d1c(0x4bf)][_0x566d1c(0x452)]['General'][_0x566d1c(0x420)]); }, Window_Message[_0x137c0c(0x3b4)][_0x137c0c(0x3e5)] = function () { const _0x8681bd = _0x137c0c; this[_0x8681bd(0x306)]($gameSystem['isMessageWindowWordWrap']()); }, Window_Message[_0x137c0c(0x3b4)]['isAutoColorAffected'] = function () { return !![]; }, Window_Message[_0x137c0c(0x3b4)][_0x137c0c(0x37e)] = function (_0x393396) { const _0x4fbe85 = _0x137c0c, _0x2ab97c = 0xb - ConfigManager[_0x4fbe85(0x3c5)]; _0x393396 = Math[_0x4fbe85(0x385)](_0x393396 * _0x2ab97c), this['_textDelayCount'] = _0x393396, this[_0x4fbe85(0x336)] = _0x393396; }, VisuMZ[_0x137c0c(0x4bf)][_0x137c0c(0x17c)] = Window_Message['prototype'][_0x137c0c(0x403)], Window_Message[_0x137c0c(0x3b4)][_0x137c0c(0x403)] = function () { const _0x2778d9 = _0x137c0c; return VisuMZ[_0x2778d9(0x4bf)][_0x2778d9(0x17c)]['call'](this) || Input[_0x2778d9(0x245)](VisuMZ[_0x2778d9(0x4bf)][_0x2778d9(0x452)][_0x2778d9(0x4a2)][_0x2778d9(0x35d)]); }, VisuMZ[_0x137c0c(0x4bf)][_0x137c0c(0x2a6)] = Window_Message['prototype']['updatePlacement'], Window_Message[_0x137c0c(0x3b4)][_0x137c0c(0x3dc)] = function () { const _0x269c65 = _0x137c0c; let _0x454631 = this['y']; this['x'] = Math['round']((Graphics[_0x269c65(0x433)] - this[_0x269c65(0x46e)]) / 0x2), VisuMZ[_0x269c65(0x4bf)][_0x269c65(0x2a6)][_0x269c65(0x305)](this); if (this[_0x269c65(0x10a)]) this['y'] = _0x454631; this['updateXyOffsets'](), this['updateForcedPlacement'](), this[_0x269c65(0x405)](), this['updateChoiceListHelpWindowPlacement'](); }, VisuMZ[_0x137c0c(0x4bf)]['Window_Message_newPage'] = Window_Message['prototype'][_0x137c0c(0x23f)], Window_Message['prototype'][_0x137c0c(0x23f)] = function (_0x36508f) { const _0x427bd0 = _0x137c0c; this[_0x427bd0(0x4fb)](_0x36508f), this['onNewPageMessageCore'](_0x36508f), VisuMZ[_0x427bd0(0x4bf)]['Window_Message_newPage'][_0x427bd0(0x305)](this, _0x36508f), this[_0x427bd0(0x447)](); }, Window_Message['prototype'][_0x137c0c(0x4fb)] = function (_0x165c09) { const _0x4194ec = _0x137c0c; if (!_0x165c09) return; this[_0x4194ec(0x3ce)] = ![], _0x165c09['text'] = this[_0x4194ec(0x17e)](_0x165c09[_0x4194ec(0x30d)]), this[_0x4194ec(0x210)] && (_0x4194ec(0x4ec) !== _0x4194ec(0x2c3) ? (_0x165c09[_0x4194ec(0x30d)] = this[_0x4194ec(0x450)](_0x165c09[_0x4194ec(0x30d)]), this[_0x4194ec(0x3ce)] = !![]) : this['_messageWindow'][_0x4194ec(0x1e9)]()); }, Window_Message['prototype'][_0x137c0c(0x450)] = function (_0x484521) { const _0x5a08a9 = _0x137c0c; if (this[_0x5a08a9(0x3ce)]) return _0x484521; return Window_Base['prototype'][_0x5a08a9(0x450)][_0x5a08a9(0x305)](this, _0x484521); }, Window_Message[_0x137c0c(0x3b4)][_0x137c0c(0x9c)] = function (_0x33664c) { const _0x3561d3 = _0x137c0c; this[_0x3561d3(0x4d9)](_0x33664c), this[_0x3561d3(0x15f)](_0x33664c), this[_0x3561d3(0x161)](); }, VisuMZ[_0x137c0c(0x4bf)]['Window_Message_terminateMessage'] = Window_Message[_0x137c0c(0x3b4)][_0x137c0c(0x243)], Window_Message['prototype'][_0x137c0c(0x243)] = function () { const _0x2f8dd7 = _0x137c0c; VisuMZ[_0x2f8dd7(0x4bf)][_0x2f8dd7(0x11e)][_0x2f8dd7(0x305)](this), this[_0x2f8dd7(0x177)](); if (this[_0x2f8dd7(0x194)]) this[_0x2f8dd7(0x2cb)](); }, Window_Message['prototype'][_0x137c0c(0x161)] = function () { const _0x2f2fc2 = _0x137c0c; this['width'] = $gameSystem[_0x2f2fc2(0x2d4)]() + this[_0x2f2fc2(0x351)]();; this['width'] = Math[_0x2f2fc2(0x22e)](Graphics[_0x2f2fc2(0x46e)], this[_0x2f2fc2(0x46e)]); const _0x149d5b = $gameSystem[_0x2f2fc2(0x1fc)](); this[_0x2f2fc2(0x3e3)] = SceneManager[_0x2f2fc2(0x481)][_0x2f2fc2(0x263)](_0x149d5b, ![]) + this[_0x2f2fc2(0x3f2)](), this[_0x2f2fc2(0x3e3)] = Math[_0x2f2fc2(0x22e)](Graphics[_0x2f2fc2(0x3e3)], this['height']); if ($gameTemp['_centerMessageWindow']) this['resetPositionX'](); }, Window_Message[_0x137c0c(0x3b4)][_0x137c0c(0x351)] = function () { return 0x0; }, Window_Message[_0x137c0c(0x3b4)][_0x137c0c(0x3f2)] = function () { return 0x0; }, Window_Message[_0x137c0c(0x3b4)]['resetPositionX'] = function () { const _0x32821f = _0x137c0c; this['x'] = (Graphics[_0x32821f(0x433)] - this[_0x32821f(0x46e)]) / 0x2, $gameTemp['_centerMessageWindow'] = undefined, this['clampPlacementPosition'](); }, Window_Message[_0x137c0c(0x3b4)][_0x137c0c(0x262)] = function () { const _0x46b379 = _0x137c0c, _0x14b52e = { 'x': this['x'], 'y': this['y'] }; Window_Base[_0x46b379(0x3b4)]['updateMove'][_0x46b379(0x305)](this), this[_0x46b379(0xd0)](_0x14b52e); }, Window_Message[_0x137c0c(0x3b4)][_0x137c0c(0x4ab)] = function () { return !![]; }, Window_Message['prototype'][_0x137c0c(0xd0)] = function (_0x2ab0f4) { const _0x25782b = _0x137c0c; if (this['_nameBoxWindow']) { if ('cYKUK' !== _0x25782b(0x4d4)) this['_nameBoxWindow']['x'] += this['x'] - _0x2ab0f4['x'], this[_0x25782b(0xb7)]['y'] += this['y'] - _0x2ab0f4['y']; else { const _0x509ba0 = _0x5c033b[_0x25782b(0x104)](0x0); _0x55d39b = _0x53b2fb['slice'](0x1), _0x509ba0[_0x25782b(0x504)](/[\u3040-\u30FF\u4E00-\u9FFF]/g) ? (_0xa46a2b[_0x25782b(0xbf)] > 0x0 && (_0x4307c5[_0x25782b(0x21e)](_0x4e66a1), _0x158940 = ''), _0x4b5cb9[_0x25782b(0x21e)](_0x509ba0 + _0x25782b(0x42a))) : _0x59a1df += _0x509ba0; } } }, Window_Message[_0x137c0c(0x3b4)][_0x137c0c(0xe9)] = function (_0x17c98b, _0x4781b6) { const _0x1c8e42 = _0x137c0c; this['moveTo'](this[_0x1c8e42(0x3c0)]['x'], this['_positionType'] * (Graphics[_0x1c8e42(0x455)] - this[_0x1c8e42(0x3e3)]) / 0x2, this[_0x1c8e42(0x3c0)][_0x1c8e42(0x46e)], this[_0x1c8e42(0x3c0)][_0x1c8e42(0x3e3)], _0x17c98b, _0x4781b6); }, Window_Message[_0x137c0c(0x3b4)][_0x137c0c(0x350)] = function (_0x338c9e) { const _0xeb7bf9 = _0x137c0c, _0x306222 = Window_Base[_0xeb7bf9(0x3b4)]['processCommonEvent'][_0xeb7bf9(0x305)](this, _0x338c9e); if (_0x338c9e[_0xeb7bf9(0x505)]) { if ('uJZJd' === _0xeb7bf9(0x234)) this[_0xeb7bf9(0x191)](_0x306222); else { const _0x4b782c = [_0xeb7bf9(0x444), _0xeb7bf9(0x4d3)]; return _0x4b782c['includes'](this['constructor'][_0xeb7bf9(0x24b)]); } } }, Window_Message[_0x137c0c(0x3b4)][_0x137c0c(0x191)] = function (_0x15c083) { const _0xc32578 = _0x137c0c; if ($gameParty[_0xc32578(0x2b5)]()) { } else $gameMap['addMessageCommonEvent'](_0x15c083); }, Window_Message[_0x137c0c(0x3b4)][_0x137c0c(0x2e3)] = function (_0x513a03) { const _0x82b291 = _0x137c0c; this['_textDelayCount']--, this[_0x82b291(0x4f8)] <= 0x0 && (this[_0x82b291(0x268)](_0x513a03), Window_Base[_0x82b291(0x3b4)]['processCharacter'][_0x82b291(0x305)](this, _0x513a03)); }, Window_Message[_0x137c0c(0x3b4)]['onProcessCharacter'] = function (_0xeef06a) { const _0x1e819b = _0x137c0c; this['_textDelayCount'] = this[_0x1e819b(0x336)]; if (this[_0x1e819b(0x336)] <= 0x0) this['_showFast'] = !![]; }, VisuMZ[_0x137c0c(0x4bf)][_0x137c0c(0x10b)] = Window_Message[_0x137c0c(0x3b4)][_0x137c0c(0x4d2)], Window_Message[_0x137c0c(0x3b4)][_0x137c0c(0x4d2)] = function (_0x40cbad, _0x5c097a) { const _0x2c65b9 = _0x137c0c; !_0x5c097a['drawing'] ? Window_Base[_0x2c65b9(0x3b4)][_0x2c65b9(0x4d2)]['call'](this, _0x40cbad, _0x5c097a) : VisuMZ[_0x2c65b9(0x4bf)][_0x2c65b9(0x10b)][_0x2c65b9(0x305)](this, _0x40cbad, _0x5c097a); }, VisuMZ[_0x137c0c(0x4bf)][_0x137c0c(0x48d)] = Window_Message[_0x137c0c(0x3b4)]['needsNewPage'], Window_Message[_0x137c0c(0x3b4)][_0x137c0c(0x461)] = function (_0x584637) { const _0x229ae8 = _0x137c0c; if (this[_0x229ae8(0x4f6)]) { if (_0x229ae8(0x2ed) === _0x229ae8(0x2ed)) return ![]; else _0x58aebd = !![], this[_0x229ae8(0x1e2)] = _0xe66e6a[_0x229ae8(0x22e)](_0x2409f7[_0x229ae8(0x424)](_0x4cc34d(_0xcaca56['$1'])) || 0x1, this[_0x229ae8(0x1e2)]), _0x35c839 = _0x2e2cc7[_0x229ae8(0x38f)](/<SHUFFLE:[ ]VAR (\d+)>/gi, ''); } return VisuMZ[_0x229ae8(0x4bf)][_0x229ae8(0x48d)]['call'](this, _0x584637); }, Window_Message[_0x137c0c(0x3b4)][_0x137c0c(0x4d9)] = function (_0x10e54c) { const _0x3b9904 = _0x137c0c; let _0x5855a1 = _0x10e54c[_0x3b9904(0x30d)]; this[_0x3b9904(0x1f8)] = {}; if (this[_0x3b9904(0x24c)]()) return _0x5855a1; _0x5855a1 = _0x5855a1[_0x3b9904(0x38f)](/<POSITION:[ ]*(.*?)>/gi, (_0x28ffbf, _0xd5d4f0) => { const _0x5dd286 = _0x3b9904; if (_0x5dd286(0x4bc) === _0x5dd286(0x4bc)) { const _0x313329 = _0xd5d4f0[_0x5dd286(0x1f9)](',')[_0x5dd286(0x141)](_0x5dc700 => Number(_0x5dc700) || 0x0); if (_0x313329[0x0] !== undefined) this[_0x5dd286(0x1f8)]['x'] = Number(_0x313329[0x0]); if (_0x313329[0x1] !== undefined) this[_0x5dd286(0x1f8)]['y'] = Number(_0x313329[0x1]); if (_0x313329[0x2] !== undefined) this['_forcedPosition'][_0x5dd286(0x46e)] = Number(_0x313329[0x2]); if (_0x313329[0x3] !== undefined) this[_0x5dd286(0x1f8)][_0x5dd286(0x3e3)] = Number(_0x313329[0x3]); return ''; } else this[_0x5dd286(0x137)] = _0x1c8cfb[_0x5dd286(0x4bf)][_0x5dd286(0x452)][_0x5dd286(0x422)]['DefaultLocale'] || _0x5dd286(0x187); }), _0x5855a1 = _0x5855a1['replace'](/<COORDINATES:[ ]*(.*?)>/gi, (_0x1c38e0, _0x46c146) => { const _0x141782 = _0x3b9904; if (_0x141782(0x116) !== _0x141782(0x402)) { const _0x5f5cb6 = _0x46c146[_0x141782(0x1f9)](',')[_0x141782(0x141)](_0x2cf317 => Number(_0x2cf317) || 0x0); if (_0x5f5cb6[0x0] !== undefined) this[_0x141782(0x1f8)]['x'] = Number(_0x5f5cb6[0x0]); if (_0x5f5cb6[0x1] !== undefined) this[_0x141782(0x1f8)]['y'] = Number(_0x5f5cb6[0x1]); return ''; } else _0x538aae[_0x141782(0x3b4)]['resetTextColor'][_0x141782(0x305)](this), this[_0x141782(0x453)](this[_0x141782(0x386)]()); }), _0x5855a1 = _0x5855a1[_0x3b9904(0x38f)](/<DIMENSIONS:[ ]*(.*?)>/gi, (_0x23c3b3, _0x3104ea) => { const _0x53f183 = _0x3b9904; if ('QffEp' !== 'QffEp') _0x556c73[_0x98f228] = this[_0x53f183(0x146)][_0x42df03]; else { const _0x36f873 = _0x3104ea[_0x53f183(0x1f9)](',')[_0x53f183(0x141)](_0x348a4a => Number(_0x348a4a) || 0x0); if (_0x36f873[0x0] !== undefined) this[_0x53f183(0x1f8)][_0x53f183(0x46e)] = Number(_0x36f873[0x2]); if (_0x36f873[0x1] !== undefined) this[_0x53f183(0x1f8)]['height'] = Number(_0x36f873[0x3]); return ''; } }), _0x5855a1 = _0x5855a1[_0x3b9904(0x38f)](/<OFFSET:[ ]*(.*?)>/gi, (_0x1d22c2, _0x4f2f57) => { const _0x2861ed = _0x3b9904, _0x29fc73 = _0x4f2f57[_0x2861ed(0x1f9)](',')[_0x2861ed(0x141)](_0x5e56c3 => Number(_0x5e56c3) || 0x0); let _0x400114 = _0x29fc73[0x0] || 0x0, _0x4e82fb = _0x29fc73[0x1] || 0x0; return $gameSystem[_0x2861ed(0x479)](_0x400114, _0x4e82fb), ''; }), _0x10e54c[_0x3b9904(0x30d)] = _0x5855a1; }, Window_Message[_0x137c0c(0x3b4)][_0x137c0c(0x235)] = function () { const _0x3b60e6 = _0x137c0c, _0x5ad599 = $gameSystem[_0x3b60e6(0x127)](); this['x'] += _0x5ad599['x'], this['y'] += _0x5ad599['y']; }, Window_Message[_0x137c0c(0x3b4)][_0x137c0c(0x484)] = function () { const _0x343888 = _0x137c0c; this[_0x343888(0x1f8)] = this[_0x343888(0x1f8)] || {}; const _0x1d234c = ['x', 'y', _0x343888(0x46e), _0x343888(0x3e3)]; for (const _0x102820 of _0x1d234c) { if (this[_0x343888(0x1f8)][_0x102820] !== undefined) { if ('ZSCOv' === _0x343888(0x117)) this[_0x102820] = Number(this[_0x343888(0x1f8)][_0x102820]); else { if (_0x55dba1[_0x343888(0x12c)]()) { let _0x821c61 = _0x343888(0x1f4)[_0x343888(0x266)](_0x662cc0[_0x343888(0x456)][_0x343888(0x24b)]); _0x5f0f65(_0x821c61), _0x7026e3['exit'](); } } } } }, Window_Message[_0x137c0c(0x3b4)][_0x137c0c(0x15f)] = function (_0x34d3bd) { const _0x33b856 = _0x137c0c; this['_currentAutoSize'] = ![]; let _0x4fc1b0 = _0x34d3bd['text']; _0x4fc1b0 = _0x4fc1b0[_0x33b856(0x38f)](/<(?:AUTO|AUTOSIZE|AUTO SIZE)>/gi, () => { const _0x4a1f6f = _0x33b856; if (_0x4a1f6f(0x22d) !== _0x4a1f6f(0x387)) return this[_0x4a1f6f(0x3dd)](_0x4fc1b0, !![], !![]), this[_0x4a1f6f(0x40a)](_0x4a1f6f(0x241)), ''; else this[_0x4a1f6f(0x3c0)] = _0x19e782[_0x4a1f6f(0xeb)](_0x32844f); }), _0x4fc1b0 = _0x4fc1b0[_0x33b856(0x38f)](/<(?:AUTOWIDTH|AUTO WIDTH)>/gi, () => { const _0x329a99 = _0x33b856; return this[_0x329a99(0x3dd)](_0x4fc1b0, !![], ![]), this['processAutoPosition']('none'), ''; }), _0x4fc1b0 = _0x4fc1b0[_0x33b856(0x38f)](/<(?:AUTOHEIGHT|AUTO HEIGHT)>/gi, () => { const _0x382ae4 = _0x33b856; if (_0x382ae4(0x226) === _0x382ae4(0x226)) return this['processAutoSize'](_0x4fc1b0, ![], !![]), this[_0x382ae4(0x40a)]('none'), ''; else { if (_0x5dfdb6[_0x382ae4(0x384)] === _0x478df9) { if (_0x129198[_0x382ae4(0x3bf)] === '') this['obtainEscapeParam'](_0x251802); _0x5cc231[_0x382ae4(0x21b)][_0x382ae4(0x305)](this, _0x34ad52); if (this[_0x382ae4(0x456)] === _0x3b1d9a) { const _0x315a04 = _0x22ce63[_0x382ae4(0x99)] || 0x0; if (_0x315a04 > 0x0) this[_0x382ae4(0x191)](_0x315a04); } } } }); if (SceneManager['isSceneBattle']()) _0x4fc1b0 = _0x4fc1b0[_0x33b856(0x38f)](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi, (_0x501be4, _0x12b184) => { const _0x25d5eb = _0x33b856; return this[_0x25d5eb(0x3dd)](_0x4fc1b0, !![], !![]), this[_0x25d5eb(0x40a)](_0x25d5eb(0x4cf), Number(_0x12b184) || 0x1), ''; }), _0x4fc1b0 = _0x4fc1b0[_0x33b856(0x38f)](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi, (_0x58f264, _0xf3b5c3) => { const _0x2aa67a = _0x33b856; return _0x2aa67a(0x468) === _0x2aa67a(0x468) ? (this[_0x2aa67a(0x3dd)](_0x4fc1b0, !![], !![]), this[_0x2aa67a(0x40a)](_0x2aa67a(0xa1), Number(_0xf3b5c3) || 0x0), '') : _0x4b8f73; }), _0x4fc1b0 = _0x4fc1b0[_0x33b856(0x38f)](/<(?:AUTOENEMY|AUTO ENEMY):[ ](.*?)>/gi, (_0x56d614, _0x31fe91) => { const _0x262b1b = _0x33b856; return _0x262b1b(0x460) !== _0x262b1b(0x460) ? (this[_0x262b1b(0x3dd)](_0x15515e, !![], !![]), this['processAutoPosition']('battle\x20enemy', _0x504c0b(_0x5449b2) || 0x0), '') : (this[_0x262b1b(0x3dd)](_0x4fc1b0, !![], !![]), this[_0x262b1b(0x40a)]('battle\x20enemy', Number(_0x31fe91) || 0x0), ''); }); else SceneManager[_0x33b856(0x43d)]() && (_0x4fc1b0 = _0x4fc1b0['replace'](/<(?:AUTOPLAYER|AUTO PLAYER)>/gi, (_0x27be46, _0x178d30) => { const _0x1ea59e = _0x33b856; if (_0x1ea59e(0xc4) !== _0x1ea59e(0x41d)) return this[_0x1ea59e(0x3dd)](_0x4fc1b0, !![], !![]), this[_0x1ea59e(0x40a)](_0x1ea59e(0x17d), 0x0), ''; else { _0x5d0f1c[_0x1ea59e(0x4bf)][_0x1ea59e(0x40f)][_0x1ea59e(0x305)](this, _0x248a95); const _0x124309 = _0x3f4683['MessageCore'][_0x1ea59e(0x452)][_0x1ea59e(0x344)]; _0x46443a[_0x1ea59e(0x4bf)][_0x1ea59e(0xb4)](_0x23e8bd, _0x124309[_0x1ea59e(0x480)]); } }), _0x4fc1b0 = _0x4fc1b0['replace'](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi, (_0x438cf5, _0x333473) => { const _0x108ecc = _0x33b856; if (_0x108ecc(0xf9) !== _0x108ecc(0x1b9)) return this['processAutoSize'](_0x4fc1b0, !![], !![]), this[_0x108ecc(0x40a)](_0x108ecc(0x3c2), Number(_0x333473) || 0x1), ''; else { const _0x396544 = _0x199f33['$1']['split'](',')['map'](_0x2e34e1 => _0x29eb6a(_0x2e34e1) || 0x0); if (_0x396544[_0x108ecc(0x3e2)](_0x1b8c77 => _0x378afa[_0x108ecc(0x424)](_0x1b8c77))) return ![]; } }), _0x4fc1b0 = _0x4fc1b0[_0x33b856(0x38f)](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi, (_0x308eab, _0x2c2161) => { const _0x206532 = _0x33b856; return this['processAutoSize'](_0x4fc1b0, !![], !![]), this[_0x206532(0x40a)]('map\x20party', Number(_0x2c2161) || 0x0), ''; }), _0x4fc1b0 = _0x4fc1b0[_0x33b856(0x38f)](/<(?:AUTOEVENT|AUTO EVENT):[ ](.*?)>/gi, (_0x58c789, _0x5a0b4d) => { const _0x2a2d29 = _0x33b856; return _0x2a2d29(0x49b) !== _0x2a2d29(0x4aa) ? (this['processAutoSize'](_0x4fc1b0, !![], !![]), this['processAutoPosition'](_0x2a2d29(0xf1), Number(_0x5a0b4d) || 0x0), '') : 0x0; })); _0x34d3bd['text'] = _0x4fc1b0; }, Window_Message[_0x137c0c(0x196)] = /<(?:AUTO|AUTOSIZE|AUTO SIZE|AUTOWIDTH|AUTO WIDTH|AUTOHEIGHT|AUTO HEIGHT|AUTOPLAYER|AUTO PLAYER)>/gi, Window_Message['_autoPosRegExp'] = /<(?:AUTOPARTY|AUTO PARTY|AUTOPLAYER|AUTO PLAYER|AUTOEVENT|AUTO EVENT|AUTOENEMY|AUTO ENEMY|AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi, Window_Message[_0x137c0c(0x3b4)]['processAutoSize'] = function (_0x2a6022, _0x3b5009, _0x172004) { const _0x51585b = _0x137c0c; _0x2a6022 = _0x2a6022[_0x51585b(0x38f)](Window_Message[_0x51585b(0x196)], ''), _0x2a6022 = _0x2a6022[_0x51585b(0x38f)](Window_Message[_0x51585b(0x48e)], ''), this[_0x51585b(0x406)] = !![], this['_currentAutoSize'] = !![], this[_0x51585b(0x306)](![]); const _0x10223f = this['textSizeExRaw'](_0x2a6022); if (_0x3b5009) { if ('Bgwvf' === 'ItSas') _0xc1179b = ![]; else { let _0x2c20c4 = _0x10223f[_0x51585b(0x46e)] + $gameSystem['windowPadding']() * 0x2 + 0x6; const _0x4d908c = $gameMessage[_0x51585b(0xdf)]() !== '', _0x2ce37c = ImageManager['faceWidth'], _0x3e576c = 0x14; _0x2c20c4 += _0x4d908c ? _0x2ce37c + _0x3e576c : 0x4; if (_0x2c20c4 % 0x2 !== 0x0) _0x2c20c4 += 0x1; $gameSystem[_0x51585b(0x96)](_0x2c20c4); } } if (_0x172004) { if (_0x51585b(0x3aa) === _0x51585b(0x3aa)) { let _0x2478a4 = Math[_0x51585b(0x1ea)](_0x10223f[_0x51585b(0x3e3)] / this[_0x51585b(0x3df)]()); $gameSystem['setMessageWindowRows'](_0x2478a4); } else _0xe285a5 = _0x18bcbd || _0x47da23['width'], _0x3da4f2 = _0x541a21 || _0x140674[_0x51585b(0x3e3)], this[_0x51585b(0x1bf)][_0x51585b(0x1db)] = _0x7f4274, this[_0x51585b(0x1bf)][_0x51585b(0x2ca)](_0xe777d8, 0x0, 0x0, _0x181e5a[_0x51585b(0x46e)], _0x34e058[_0x51585b(0x3e3)], _0x185109, _0x289b60, _0x478a81, _0x515cd1), this[_0x51585b(0x1bf)][_0x51585b(0x1db)] = 0xff; } this[_0x51585b(0x1fb)](), this[_0x51585b(0x1af)](), this['_autoSizeCheck'] = ![], this['_messagePositionReset'] = !![]; }, Window_Message[_0x137c0c(0x3b4)][_0x137c0c(0x1fb)] = function () { const _0x3a64fa = _0x137c0c; this[_0x3a64fa(0x161)](), this[_0x3a64fa(0x3dc)](), this[_0x3a64fa(0x356)](), this[_0x3a64fa(0xd1)](), this[_0x3a64fa(0x146)]['clear'](), this[_0x3a64fa(0x447)](); }, Window_Message[_0x137c0c(0x3b4)]['processAutoPosition'] = function (_0x5efe9e, _0xe91e52) { const _0x357b60 = _0x137c0c; switch (_0x5efe9e[_0x357b60(0xcd)]()[_0x357b60(0xca)]()) { case _0x357b60(0x4cf): this[_0x357b60(0x10a)] = $gameActors[_0x357b60(0x4c3)](_0xe91e52); break; case _0x357b60(0xa1): this[_0x357b60(0x10a)] = $gameParty[_0x357b60(0x465)]()[_0xe91e52 - 0x1]; break; case 'battle\x20enemy': this[_0x357b60(0x10a)] = $gameTroop[_0x357b60(0x465)]()[_0xe91e52 - 0x1]; break; case 'map\x20player': this['_autoPositionTarget'] = $gamePlayer; break; case _0x357b60(0x3c2): const _0x5707a2 = $gameActors['actor'](_0xe91e52)[_0x357b60(0x1ff)](); _0x5707a2 === 0x0 ? _0x357b60(0x463) !== _0x357b60(0x463) ? _0x2f8116 = this[_0x357b60(0x4ed)](_0x4c4dfd, _0x5ac430) : this[_0x357b60(0x10a)] = $gamePlayer : _0x357b60(0x2b0) === 'bgfYt' ? this[_0x357b60(0x10a)] = $gamePlayer[_0x357b60(0x3e7)]()[_0x357b60(0x1c3)](_0x5707a2 - 0x1) : this[_0x357b60(0xb7)] && (this[_0x357b60(0xb7)]['x'] += this['x'] - _0x19fd86['x'], this[_0x357b60(0xb7)]['y'] += this['y'] - _0x7beec1['y']); break; case _0x357b60(0x3ad): _0xe91e52 === 0x1 ? this[_0x357b60(0x10a)] = $gamePlayer : this[_0x357b60(0x10a)] = $gamePlayer[_0x357b60(0x3e7)]()[_0x357b60(0x1c3)](_0xe91e52 - 0x2); break; case _0x357b60(0xf1): this['_autoPositionTarget'] = $gameMap[_0x357b60(0x4e0)](_0xe91e52); break; }this[_0x357b60(0x10a)] && (_0x357b60(0x95) === 'bEYRR' ? this['y'] = _0xeb4803['y'] + _0x30e5c5['height'] : this[_0x357b60(0x102)]()); }, VisuMZ['MessageCore'][_0x137c0c(0x1c4)] = Window_Message['prototype']['synchronizeNameBox'], Window_Message[_0x137c0c(0x3b4)][_0x137c0c(0x32e)] = function () { const _0x31824c = _0x137c0c; this[_0x31824c(0x102)](), VisuMZ[_0x31824c(0x4bf)][_0x31824c(0x1c4)][_0x31824c(0x305)](this); }, Window_Message[_0x137c0c(0x3b4)][_0x137c0c(0x102)] = function () { const _0x192234 = _0x137c0c; if (!this['_autoPositionTarget']) return; const _0x3d7ce3 = SceneManager[_0x192234(0x481)]; if (!_0x3d7ce3) return; const _0x2ba0ea = _0x3d7ce3[_0x192234(0x12a)]; if (!_0x2ba0ea) return; const _0x2a696c = _0x2ba0ea['findTargetSprite'](this['_autoPositionTarget']); if (!_0x2a696c) return; let _0x1adec8 = _0x2a696c['x']; if (SceneManager[_0x192234(0x43d)]()) _0x1adec8 *= $gameScreen[_0x192234(0x4a4)](); else { if (SceneManager[_0x192234(0x1ec)]() && Imported[_0x192234(0x1a4)]) { if (_0x192234(0x249) !== _0x192234(0x249)) this['updateAutoPosition'](); else { let _0x18e6dc = _0x2a696c['x'] - Graphics[_0x192234(0x433)] * _0x2ba0ea[_0x192234(0x33e)]['x']; _0x1adec8 += _0x18e6dc * (_0x2ba0ea[_0x192234(0x382)]['x'] - 0x1); } } } _0x1adec8 -= this[_0x192234(0x46e)] / 0x2, _0x1adec8 -= (Graphics[_0x192234(0x46e)] - Graphics[_0x192234(0x433)]) / 0x2, _0x1adec8 += this[_0x192234(0xf4)](); let _0x38ec85 = _0x2a696c['y']; if (SceneManager[_0x192234(0x43d)]()) _0x192234(0x1c9) === _0x192234(0x195) ? (_0x52ba49['MessageCore'][_0x192234(0x3ba)][_0x192234(0x305)](this), this[_0x192234(0x101)]()) : (_0x38ec85 -= _0x2a696c[_0x192234(0x3e3)] + 0x8, _0x38ec85 *= $gameScreen[_0x192234(0x4a4)](), _0x38ec85 -= this[_0x192234(0x3e3)] * $gameScreen['zoomScale']()); else { if (SceneManager[_0x192234(0x1ec)]() && Imported[_0x192234(0x1a4)]) { if (_0x192234(0x374) !== 'xuWhg') { let _0x5aa8a5 = _0x2a696c[_0x192234(0x3e3)] * _0x2ba0ea['scale']['y']; _0x38ec85 -= this[_0x192234(0x3e3)] * _0x2ba0ea[_0x192234(0x382)]['y'] + _0x5aa8a5 + 0x8; let _0x177ca2 = _0x2a696c['y'] - Graphics[_0x192234(0x455)] * _0x2ba0ea[_0x192234(0x33e)]['y']; _0x38ec85 += _0x177ca2 * (_0x2ba0ea[_0x192234(0x382)]['y'] - 0x1); } else this[_0x192234(0x4d8)] > 0x0 && (this[_0x192234(0x4ab)]() && (this['x'] = this[_0x192234(0xb3)](this['x'], this[_0x192234(0x345)]), this['y'] = this[_0x192234(0xb3)](this['y'], this['_moveTargetY']), this[_0x192234(0x46e)] = this[_0x192234(0xb3)](this['width'], this[_0x192234(0x11d)]), this[_0x192234(0x3e3)] = this['applyMoveEasing'](this[_0x192234(0x3e3)], this[_0x192234(0x208)]), this['clampPlacementPosition']()), this[_0x192234(0x4d8)]--); } else _0x38ec85 -= _0x2a696c[_0x192234(0x3e3)] + 0x8, _0x38ec85 -= this[_0x192234(0x3e3)]; } _0x38ec85 -= (Graphics[_0x192234(0x3e3)] - Graphics[_0x192234(0x455)]) / 0x2, _0x38ec85 += this[_0x192234(0x285)](); const _0x196071 = $gameSystem[_0x192234(0x127)](); _0x1adec8 += _0x196071['x'], _0x38ec85 += _0x196071['y'], this['x'] = Math[_0x192234(0x385)](_0x1adec8), this['y'] = Math['round'](_0x38ec85), this[_0x192234(0x405)](!![], ![]), this[_0x192234(0x1f8)] = this[_0x192234(0x1f8)] || {}, this[_0x192234(0x1f8)]['x'] = this['x'], this[_0x192234(0x1f8)]['y'] = this['y'], this[_0x192234(0x1f8)][_0x192234(0x46e)] = this['width'], this[_0x192234(0x1f8)]['height'] = this[_0x192234(0x3e3)], this[_0x192234(0xb7)][_0x192234(0x3dc)](); }, Window_Message[_0x137c0c(0x3b4)][_0x137c0c(0xf4)] = function () { return 0x0; }, Window_Message['prototype'][_0x137c0c(0x285)] = function () { return 0x0; }, Window_Message[_0x137c0c(0x3b4)][_0x137c0c(0x2cb)] = function () { const _0x513914 = _0x137c0c; this[_0x513914(0x194)] = ![], this['_autoPositionTarget'] = undefined, $gameSystem['initMessageCore'](), this[_0x513914(0x1fb)](), this[_0x513914(0x4c8)] = 0x0; }, Window_Message[_0x137c0c(0x3b4)][_0x137c0c(0x2cc)] = function (_0x2f5bd4) { const _0x26cfe2 = _0x137c0c; return Window_Base['prototype'][_0x26cfe2(0x2cc)][_0x26cfe2(0x305)](this, _0x2f5bd4); }, Window_Message[_0x137c0c(0x3b4)][_0x137c0c(0x1dd)] = function (_0x5c665a) { const _0x372ba6 = _0x137c0c; return Window_Base[_0x372ba6(0x3b4)]['postConvertEscapeCharacters'][_0x372ba6(0x305)](this, _0x5c665a); }, Window_Message['prototype'][_0x137c0c(0x278)] = function (_0x41103e) { const _0x1ead57 = _0x137c0c; this[_0x1ead57(0x392)](_0x41103e), Window_Base[_0x1ead57(0x3b4)][_0x1ead57(0x278)][_0x1ead57(0x305)](this, _0x41103e), this[_0x1ead57(0x341)](_0x41103e); }, Window_Message[_0x137c0c(0x3b4)]['preFlushTextState'] = function (_0x40bba0) { }, Window_Message[_0x137c0c(0x3b4)]['postFlushTextState'] = function (_0x20e555) { }, Window_NameBox[_0x137c0c(0x3b4)][_0x137c0c(0x114)] = function () { return ![]; }, Window_NameBox[_0x137c0c(0x3b4)][_0x137c0c(0x3fa)] = function () { const _0x2b6698 = _0x137c0c; Window_Base['prototype'][_0x2b6698(0x3fa)][_0x2b6698(0x305)](this), this['changeTextColor'](this[_0x2b6698(0x386)]()); }, Window_NameBox[_0x137c0c(0x3b4)]['defaultColor'] = function () { const _0x499b63 = _0x137c0c, _0x266357 = VisuMZ[_0x499b63(0x4bf)]['Settings'][_0x499b63(0x4a2)][_0x499b63(0x4ea)]; return ColorManager['textColor'](_0x266357); }, VisuMZ[_0x137c0c(0x4bf)]['Window_NameBox_updatePlacement'] = Window_NameBox[_0x137c0c(0x3b4)][_0x137c0c(0x3dc)], Window_NameBox[_0x137c0c(0x3b4)][_0x137c0c(0x3dc)] = function () { const _0x24b33d = _0x137c0c; VisuMZ[_0x24b33d(0x4bf)][_0x24b33d(0x18c)][_0x24b33d(0x305)](this), this[_0x24b33d(0x499)](), this['updateOffsetPosition'](), this['clampPlacementPosition'](), this[_0x24b33d(0x348)](); }, Window_NameBox['prototype'][_0x137c0c(0x2cc)] = function (_0xe891b8) { const _0x3ab358 = _0x137c0c; return _0xe891b8 = _0xe891b8[_0x3ab358(0x38f)](/<LEFT>/gi, this[_0x3ab358(0x42b)][_0x3ab358(0x29b)](this, 0x0)), _0xe891b8 = _0xe891b8[_0x3ab358(0x38f)](/<CENTER>/gi, this[_0x3ab358(0x42b)]['bind'](this, 0x5)), _0xe891b8 = _0xe891b8['replace'](/<RIGHT>/gi, this['setRelativePosition'][_0x3ab358(0x29b)](this, 0xa)), _0xe891b8 = _0xe891b8[_0x3ab358(0x38f)](/<POSITION:[ ](\d+)>/gi, (_0x4497f8, _0x568aef) => this[_0x3ab358(0x42b)](parseInt(_0x568aef))), _0xe891b8 = _0xe891b8['replace'](/<\/LEFT>/gi, ''), _0xe891b8 = _0xe891b8[_0x3ab358(0x38f)](/<\/CENTER>/gi, ''), _0xe891b8 = _0xe891b8['replace'](/<\/RIGHT>/gi, ''), _0xe891b8 = _0xe891b8[_0x3ab358(0xca)](), Window_Base[_0x3ab358(0x3b4)][_0x3ab358(0x2cc)]['call'](this, _0xe891b8); }, Window_NameBox['prototype'][_0x137c0c(0x42b)] = function (_0xd13d9f) { const _0x210441 = _0x137c0c; return this[_0x210441(0x2f9)] = _0xd13d9f, ''; }, Window_NameBox['prototype'][_0x137c0c(0x499)] = function () { const _0x5a3cea = _0x137c0c; if ($gameMessage[_0x5a3cea(0x3d4)]()) return; this[_0x5a3cea(0x2f9)] = this[_0x5a3cea(0x2f9)] || 0x0; const _0x4ba8ab = this[_0x5a3cea(0x2c1)], _0x21a50e = Math[_0x5a3cea(0x4ae)](_0x4ba8ab[_0x5a3cea(0x46e)] * this[_0x5a3cea(0x2f9)] / 0xa); this['x'] = _0x4ba8ab['x'] + _0x21a50e - Math[_0x5a3cea(0x4ae)](this[_0x5a3cea(0x46e)] / 0x2), this['x'] = this['x'][_0x5a3cea(0x3d1)](_0x4ba8ab['x'], _0x4ba8ab['x'] + _0x4ba8ab['width'] - this['width']); }, Window_NameBox[_0x137c0c(0x3b4)][_0x137c0c(0x41c)] = function () { const _0x583e2c = _0x137c0c; if ($gameMessage['isRTL']()) return; this[_0x583e2c(0x2f9)] = this[_0x583e2c(0x2f9)] || 0x0; const _0x1d1590 = VisuMZ[_0x583e2c(0x4bf)][_0x583e2c(0x452)][_0x583e2c(0x4a2)][_0x583e2c(0x169)], _0x2f84df = VisuMZ[_0x583e2c(0x4bf)][_0x583e2c(0x452)][_0x583e2c(0x4a2)][_0x583e2c(0x343)], _0xeef51 = (0x5 - this['_relativePosition']) / 0x5; this['x'] += Math[_0x583e2c(0x4ae)](_0x1d1590 * _0xeef51), this['y'] += _0x2f84df; }, Window_NameBox[_0x137c0c(0x3b4)]['updateOverlappingY'] = function () { const _0x303cb5 = _0x137c0c, _0x238a36 = this[_0x303cb5(0x2c1)], _0x5d9388 = _0x238a36['y'], _0x5edb7f = VisuMZ[_0x303cb5(0x4bf)][_0x303cb5(0x452)][_0x303cb5(0x4a2)][_0x303cb5(0x343)]; _0x5d9388 > this['y'] && _0x5d9388 < this['y'] + this[_0x303cb5(0x3e3)] - _0x5edb7f && (this['y'] = _0x238a36['y'] + _0x238a36[_0x303cb5(0x3e3)]); }, VisuMZ[_0x137c0c(0x4bf)]['Window_NameBox_refresh'] = Window_NameBox['prototype']['refresh'], Window_NameBox[_0x137c0c(0x3b4)][_0x137c0c(0x3bb)] = function () { const _0xb2dd58 = _0x137c0c; this[_0xb2dd58(0x2f9)] = 0x0, VisuMZ['MessageCore'][_0xb2dd58(0x436)][_0xb2dd58(0x305)](this); }, Window_ChoiceList[_0x137c0c(0x3b4)][_0x137c0c(0x24c)] = function () { return ![]; }, Window_ChoiceList['prototype'][_0x137c0c(0x114)] = function () { return !![]; }, Window_ChoiceList['prototype'][_0x137c0c(0x43b)] = function () { const _0x1e5c89 = _0x137c0c; return $gameSystem[_0x1e5c89(0x3e4)]() + 0x8; }, Window_ChoiceList['prototype'][_0x137c0c(0x299)] = function () { return $gameSystem['getChoiceListMaxColumns'](); }, Window_ChoiceList[_0x137c0c(0x3b4)][_0x137c0c(0x29f)] = function () { const _0x23186d = _0x137c0c; this['refresh'](), this['selectDefault'](), this[_0x23186d(0x320)](), this[_0x23186d(0x3a9)](), this[_0x23186d(0x44c)](); }, Window_ChoiceList['prototype'][_0x137c0c(0x1a5)] = function () { const _0x309b4a = _0x137c0c; $gameMessage[_0x309b4a(0x4ff)](this[_0x309b4a(0x20e)]()), this['_messageWindow'][_0x309b4a(0x243)](), this[_0x309b4a(0x1de)](); if (this[_0x309b4a(0xba)]) { if ('OSHKl' !== _0x309b4a(0x10c)) var _0x25f70e = new _0x5f37a1(_0x19274f, 'i'); else this[_0x309b4a(0xba)][_0x309b4a(0x4eb)](), this['_helpWindow'][_0x309b4a(0x4d5)](); } }, VisuMZ[_0x137c0c(0x4bf)][_0x137c0c(0xc7)] = Window_ChoiceList[_0x137c0c(0x3b4)][_0x137c0c(0x2a9)], Window_ChoiceList[_0x137c0c(0x3b4)][_0x137c0c(0x2a9)] = function () { const _0x8df596 = _0x137c0c; VisuMZ[_0x8df596(0x4bf)]['Window_ChoiceList_callCancelHandler']['call'](this), this[_0x8df596(0xba)] && (this[_0x8df596(0xba)][_0x8df596(0x4eb)](), this[_0x8df596(0xba)][_0x8df596(0x4d5)]()); }, Window_ChoiceList[_0x137c0c(0x3b4)][_0x137c0c(0x3bb)] = function () { const _0xf44361 = _0x137c0c; this[_0xf44361(0xcc)](), this[_0xf44361(0x19c)](), this[_0xf44361(0x2c1)] && (_0xf44361(0x304) !== _0xf44361(0xbd) ? (this['updatePlacement'](), this[_0xf44361(0x295)]()) : _0x1624cc[_0xf44361(0x3b4)][_0xf44361(0x4d2)][_0xf44361(0x305)](this, _0x3bad9b, _0x160edd)), this[_0xf44361(0x447)](), this['updateBackground'](), this[_0xf44361(0x40d)](), Window_Selectable[_0xf44361(0x3b4)]['refresh']['call'](this); }, Window_ChoiceList['prototype']['makeCommandList'] = function () { const _0x396c41 = _0x137c0c; $gameMessage[_0x396c41(0x17f)] ? this[_0x396c41(0xff)]() : this['makeCommandListShuffle'](), this[_0x396c41(0x148)](), this[_0x396c41(0x40e)](); }, Window_ChoiceList[_0x137c0c(0x3b4)][_0x137c0c(0xff)] = function () { const _0x2dd06f = _0x137c0c, _0x13434c = $gameMessage[_0x2dd06f(0xbc)](); let _0x14d279 = 0x0; for (let _0x30219e of _0x13434c) { _0x30219e = this[_0x2dd06f(0x329)](_0x30219e); if (this[_0x2dd06f(0x327)](_0x30219e)) { const _0x97a08a = this[_0x2dd06f(0x4ac)](_0x30219e), _0xa68407 = this['isChoiceEnabled'](_0x30219e); this[_0x2dd06f(0xf8)](_0x97a08a, _0x2dd06f(0x440), _0xa68407, _0x14d279); } _0x14d279++; } }, Window_ChoiceList[_0x137c0c(0x3b4)][_0x137c0c(0x205)] = function () { const _0x422120 = _0x137c0c, _0x1b1d3c = $gameMessage[_0x422120(0xbc)](), _0x1311ef = $gameMessage[_0x422120(0x3d5)](), _0x8ddd29 = $gameMessage[_0x422120(0x46b)](), _0xded60a = _0x1b1d3c['length']; let _0x11e2b6 = 0x0; for (let _0x4a3dfb = 0x0; _0x4a3dfb < _0xded60a; _0x4a3dfb++) { if (this[_0x422120(0x47c)][_0x422120(0xbf)] >= _0x8ddd29) break; const _0x23ad63 = _0x1311ef[_0x4a3dfb]; let _0x3af2b6 = _0x1b1d3c[_0x23ad63]; if (_0x3af2b6 === undefined) continue; _0x3af2b6 = this['convertChoiceMacros'](_0x3af2b6); if (this[_0x422120(0x327)](_0x3af2b6)) { const _0x3ed8bc = this[_0x422120(0x4ac)](_0x3af2b6), _0x32ba55 = this[_0x422120(0x36e)](_0x3af2b6); this[_0x422120(0xf8)](_0x3ed8bc, _0x422120(0x440), _0x32ba55, _0x23ad63); } _0x11e2b6++; } }, Window_ChoiceList['prototype'][_0x137c0c(0x329)] = function (_0x180a2f) { const _0x4c3c4e = _0x137c0c; return Window_Base['prototype'][_0x4c3c4e(0x17e)][_0x4c3c4e(0x305)](this, _0x180a2f); }, Window_ChoiceList[_0x137c0c(0x3b4)]['isChoiceVisible'] = function (_0x1e929d) { const _0x3eadf5 = _0x137c0c; if (Imported[_0x3eadf5(0x115)]) $gameMessage[_0x3eadf5(0x3a5)](); if (_0x1e929d[_0x3eadf5(0x504)](/<HIDE>/i)) return ![]; if (_0x1e929d[_0x3eadf5(0x504)](/<SHOW>/i)) return !![]; if (_0x1e929d[_0x3eadf5(0x504)](/<SHOW[ ](?:|ALL )(?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)) { const _0x59e569 = RegExp['$1']['split'](',')[_0x3eadf5(0x141)](_0x3e2dc2 => Number(_0x3e2dc2) || 0x0); if (_0x59e569[_0x3eadf5(0x435)](_0xb7f606 => !$gameSwitches[_0x3eadf5(0x424)](_0xb7f606))) return ![]; } if (_0x1e929d[_0x3eadf5(0x504)](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)) { if (_0x3eadf5(0x1e8) !== _0x3eadf5(0x1e8)) return this[_0x3eadf5(0x1fe)] = this[_0x3eadf5(0x1fe)] || [], this['_pictureTextRefresh']['includes'](_0x3c06fd); else { const _0x1dfdaf = RegExp['$1'][_0x3eadf5(0x1f9)](',')[_0x3eadf5(0x141)](_0x5d970a => Number(_0x5d970a) || 0x0); if (_0x1dfdaf[_0x3eadf5(0x3e2)](_0x49bbb0 => !$gameSwitches['value'](_0x49bbb0))) return ![]; } } if (_0x1e929d[_0x3eadf5(0x504)](/<HIDE[ ](?:|ALL )(?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)) { if (_0x3eadf5(0x4c0) !== 'cAWPh') this[_0x3eadf5(0x146)][_0x3eadf5(0x3fc)] -= _0x169a9f[_0x3eadf5(0x4bf)]['Settings'][_0x3eadf5(0x4a2)][_0x3eadf5(0x32a)], this[_0x3eadf5(0x146)]['fontSize'] = _0x473399['max'](this[_0x3eadf5(0x146)]['fontSize'], _0xd12259[_0x3eadf5(0x4bf)]['Settings'][_0x3eadf5(0x4a2)][_0x3eadf5(0x4b0)]); else { const _0x34597e = RegExp['$1'][_0x3eadf5(0x1f9)](',')[_0x3eadf5(0x141)](_0x292ab1 => Number(_0x292ab1) || 0x0); if (_0x34597e[_0x3eadf5(0x3e2)](_0x5cb3d9 => $gameSwitches[_0x3eadf5(0x424)](_0x5cb3d9))) return ![]; } } if (_0x1e929d[_0x3eadf5(0x504)](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)) { if (_0x3eadf5(0x4be) !== _0x3eadf5(0x4be)) return _0x55624b[_0x3eadf5(0x4bf)][_0x3eadf5(0x17c)][_0x3eadf5(0x305)](this) || _0x53cb0a['isPressed'](_0x28a40b[_0x3eadf5(0x4bf)]['Settings'][_0x3eadf5(0x4a2)]['FastForwardKey']); else { const _0x474950 = RegExp['$1']['split'](',')[_0x3eadf5(0x141)](_0x5f03ba => Number(_0x5f03ba) || 0x0); if (_0x474950[_0x3eadf5(0x435)](_0x588e24 => $gameSwitches[_0x3eadf5(0x424)](_0x588e24))) return ![]; } } return !![]; }, Window_ChoiceList[_0x137c0c(0x3b4)]['parseChoiceText'] = function (_0x51d6bc) { const _0x1b3647 = _0x137c0c; let _0x312645 = _0x51d6bc; return _0x312645 = _0x312645[_0x1b3647(0x38f)](/<(?:BR|LINEBREAK)>/gi, '\x0a'), _0x312645 = _0x312645[_0x1b3647(0x38f)](/<LINE\x1bWrapBreak[0]BREAK>/gi, '\x0a'), _0x312645; }, Window_ChoiceList[_0x137c0c(0x3b4)][_0x137c0c(0x36e)] = function (_0x5013fe) { const _0x22c01a = _0x137c0c; if (Imported[_0x22c01a(0x115)]) $gameMessage[_0x22c01a(0x3a5)](); if (_0x5013fe['match'](/<DISABLE>/i)) return ![]; if (_0x5013fe[_0x22c01a(0x504)](/<ENABLE>/i)) return !![]; if (_0x5013fe['match'](/<ENABLE[ ](?:|ALL )(?:SWITCH|SWITCHES):[ ](.*?)>/i)) { if (_0x22c01a(0x288) === 'tFbvi') { const _0x2791ef = RegExp['$1'][_0x22c01a(0x1f9)](',')[_0x22c01a(0x141)](_0x3e66d3 => Number(_0x3e66d3) || 0x0); if (_0x2791ef[_0x22c01a(0x435)](_0x22a19f => !$gameSwitches['value'](_0x22a19f))) return ![]; } else _0x5865a2['MessageCore']['Scene_Boot_onDatabaseLoaded'][_0x22c01a(0x305)](this), _0x34ed97[_0x22c01a(0x4bf)][_0x22c01a(0xec)](), this[_0x22c01a(0x4e1)](), this[_0x22c01a(0x470)](), this[_0x22c01a(0xb5)](), this[_0x22c01a(0xd8)](); } if (_0x5013fe[_0x22c01a(0x504)](/<ENABLE ANY[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)) { const _0x56b9ec = RegExp['$1'][_0x22c01a(0x1f9)](',')[_0x22c01a(0x141)](_0x326d8d => Number(_0x326d8d) || 0x0); if (_0x56b9ec[_0x22c01a(0x3e2)](_0x443c5b => !$gameSwitches[_0x22c01a(0x424)](_0x443c5b))) return ![]; } if (_0x5013fe[_0x22c01a(0x504)](/<DISABLE[ ](?:|ALL )(?:SWITCH|SWITCHES):[ ](.*?)>/i)) { if (_0x22c01a(0xd4) !== 'EyTgG') { const _0x1579b4 = RegExp['$1'][_0x22c01a(0x1f9)](',')[_0x22c01a(0x141)](_0x3df4b3 => Number(_0x3df4b3) || 0x0); if (_0x1579b4[_0x22c01a(0x3e2)](_0x582d00 => $gameSwitches['value'](_0x582d00))) return ![]; } else { _0x352c95[_0x22c01a(0x4bf)][_0x22c01a(0x3bc)](_0x22c01a(0x3b0)); for (const _0x3b690a of _0x5e25a3[_0x22c01a(0x4bf)][_0x22c01a(0x452)][_0x22c01a(0x3b0)]) { _0x3b690a['textCodeCheck'] = new _0x51a1d6('\x1b' + _0x3b690a[_0x22c01a(0x384)] + _0x3b690a[_0x22c01a(0x3bf)], 'gi'), _0x3b690a[_0x22c01a(0x442)] !== '' && _0x3b690a[_0x22c01a(0x442)] !== _0x22c01a(0x2b1) ? _0x3b690a[_0x22c01a(0x3b6)] = new _0x39af03(_0x22c01a(0xfc) + _0x3b690a[_0x22c01a(0x442)][_0x22c01a(0x38f)](/\\/g, '\x1b') + '\x27') : _0x3b690a[_0x22c01a(0x3b6)] = _0x3b690a[_0x22c01a(0x27a)]; } } } if (_0x5013fe[_0x22c01a(0x504)](/<DISABLE ANY[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)) { if (_0x22c01a(0x1bc) !== _0x22c01a(0x1bc)) this[_0x22c01a(0x4d9)](_0x592210), this[_0x22c01a(0x15f)](_0x4fd2aa), this[_0x22c01a(0x161)](); else { const _0x22f544 = RegExp['$1'][_0x22c01a(0x1f9)](',')[_0x22c01a(0x141)](_0x2e0793 => Number(_0x2e0793) || 0x0); if (_0x22f544[_0x22c01a(0x435)](_0x504823 => $gameSwitches[_0x22c01a(0x424)](_0x504823))) return ![]; } } return !![]; }, Window_ChoiceList[_0x137c0c(0x3b4)]['clearChoiceHelpDescriptions'] = function () { const _0x363d6b = _0x137c0c; this['_choiceHelpDescriptions'] = {}, this[_0x363d6b(0xba)] && (this[_0x363d6b(0xba)]['clear'](), this[_0x363d6b(0xba)]['hide']()); }, Window_ChoiceList[_0x137c0c(0x3b4)][_0x137c0c(0x40e)] = function () { const _0xe51d31 = _0x137c0c, _0x5de75d = /<(?:HELP|HELP DESCRIPTION|DESCRIPTION)>\s*([\s\S]*)\s*<\/(?:HELP|HELP DESCRIPTION|DESCRIPTION)>/i; for (const _0x2106b1 of this['_list']) { if (_0xe51d31(0x10f) === _0xe51d31(0x10f)) { if (!_0x2106b1) continue; const _0xcc45b4 = this[_0xe51d31(0x47c)][_0xe51d31(0x39b)](_0x2106b1); if (_0x2106b1[_0xe51d31(0x24b)]['match'](_0x5de75d)) { if (_0xe51d31(0x2fc) !== _0xe51d31(0x185)) { const _0x45b940 = String(RegExp['$1']); this[_0xe51d31(0x472)][_0xcc45b4] = _0x45b940[_0xe51d31(0xca)](), _0x2106b1[_0xe51d31(0x24b)] = _0x2106b1[_0xe51d31(0x24b)][_0xe51d31(0x38f)](_0x5de75d, '')[_0xe51d31(0xca)](); } else { if (!_0x4bbf45[_0xed62d1]) return; this['_messageCommonEvents'] = this[_0xe51d31(0xe1)] || []; const _0x3cdcdc = this[_0xe51d31(0x41b)]['_eventId'], _0x3e3216 = new _0x100e80(_0x37c9db, _0x3cdcdc); this['_messageCommonEvents'][_0xe51d31(0x21e)](_0x3e3216); } } else this['_choiceHelpDescriptions'][_0xcc45b4] = ''; } else _0x3c9ba5 = !_0x1bb827; } }, Window_ChoiceList['prototype'][_0x137c0c(0x44c)] = function () { const _0x1d512f = _0x137c0c; if (this[_0x1d512f(0x47c)]['some'](_0x1ba080 => _0x1ba080[_0x1d512f(0x3ff)])) return; this[_0x1d512f(0x4b8)](), this['close'](), $gameMessage['_choices'] = [], this[_0x1d512f(0x2c1)][_0x1d512f(0x1d2)]() && this[_0x1d512f(0x2c1)][_0x1d512f(0x1e9)](); }, VisuMZ[_0x137c0c(0x4bf)][_0x137c0c(0x4ef)] = Window_ChoiceList[_0x137c0c(0x3b4)][_0x137c0c(0x3dc)], Window_ChoiceList[_0x137c0c(0x3b4)][_0x137c0c(0x3dc)] = function () { const _0xc23b99 = _0x137c0c; VisuMZ[_0xc23b99(0x4bf)][_0xc23b99(0x4ef)][_0xc23b99(0x305)](this), this[_0xc23b99(0x4b7)](), this['clampPlacementPosition'](); }, Window_ChoiceList[_0x137c0c(0x3b4)][_0x137c0c(0x295)] = function () { const _0x2bedfd = _0x137c0c; if (!this[_0x2bedfd(0x2f6)]) return; const _0xe70d53 = 0x8, _0x22e4d3 = this[_0x2bedfd(0x2f6)], _0x142c4e = this['x'] + this['width'], _0x4412af = Math['floor']((Graphics['width'] - Graphics[_0x2bedfd(0x433)]) / 0x2); _0x142c4e >= Graphics[_0x2bedfd(0x433)] + _0x4412af - _0x22e4d3[_0x2bedfd(0x46e)] + _0xe70d53 ? _0x22e4d3['x'] = -_0x22e4d3['width'] - _0xe70d53 : _0x22e4d3['x'] = this[_0x2bedfd(0x46e)] + _0xe70d53, _0x22e4d3['y'] = this[_0x2bedfd(0x3e3)] / 0x2 - _0x22e4d3[_0x2bedfd(0x3e3)] / 0x2; }, VisuMZ[_0x137c0c(0x4bf)][_0x137c0c(0x2ad)] = Window_ChoiceList[_0x137c0c(0x3b4)][_0x137c0c(0x14b)], Window_ChoiceList['prototype'][_0x137c0c(0x14b)] = function () { const _0x573a35 = _0x137c0c; if (this[_0x573a35(0x2c1)]) { if (_0x573a35(0x4de) === _0x573a35(0x4de)) return this[_0x573a35(0x45b)](); else { const _0x35ee01 = this[_0x573a35(0x2a0)](), _0x407269 = _0x35ee01 + this[_0x573a35(0x154)](_0x5835c9); let _0x4b5997 = ''; if (_0x407269[_0x573a35(0x504)](/<FG(?:| )(?:IMG|IMAGE|PIC|PICTURE):[ ](.*?)>/i)) _0x4b5997 = _0x192ef3(_0x1e33c5['$1'])[_0x573a35(0xca)](); else _0x407269[_0x573a35(0x504)](/<FG(?:| )(?:IMG|IMAGE|PIC|PICTURE)[ ]*(.*?):[ ](.*?)>/i) && (_0x4b5997 = _0x2086ca(_0x367a52['$2'])[_0x573a35(0xca)]()); return _0x4b5997; } } else return VisuMZ['MessageCore'][_0x573a35(0x2ad)][_0x573a35(0x305)](this); }, Window_ChoiceList[_0x137c0c(0x3b4)][_0x137c0c(0x45b)] = function () { const _0x3b73fd = _0x137c0c, _0x1d3ffc = $gameMessage['choicePositionType'](); if (_0x1d3ffc === 0x1) { if ('UNdlo' !== 'qljbW') return (Graphics[_0x3b73fd(0x433)] - this['windowWidth']()) / 0x2; else { if (_0x421dd2 === _0x3b73fd(0x137)) return this[_0x3b73fd(0xf7)](_0x28c7bc, _0x4fb1bf); if (_0xb4accf === _0x3b73fd(0x3c5)) return this[_0x3b73fd(0x4f0)](_0x5b3a1e, _0x771153, _0x16a8cd); _0x44161e[_0x3b73fd(0x4bf)][_0x3b73fd(0x501)]['call'](this, _0x4b0765, _0x4d0ed7, _0x437ff6); } } else return _0x1d3ffc === 0x2 ? this['_messageWindow']['x'] + this[_0x3b73fd(0x2c1)][_0x3b73fd(0x46e)] - this[_0x3b73fd(0x45c)]() : this['_messageWindow']['x']; }, Window_ChoiceList['prototype'][_0x137c0c(0x45c)] = function () { const _0x48dc67 = _0x137c0c, _0x3a92e8 = (this[_0x48dc67(0x428)]() + this['colSpacing']()) * this[_0x48dc67(0x299)]() + this['padding'] * 0x2; return Math[_0x48dc67(0x22e)](_0x3a92e8, Graphics[_0x48dc67(0x46e)]); }, Window_ChoiceList[_0x137c0c(0x3b4)]['numVisibleRows'] = function () { const _0x3eea4a = _0x137c0c, _0x3c2b3f = $gameMessage[_0x3eea4a(0xbc)]()[_0x3eea4a(0x141)](_0x497ae0 => this[_0x3eea4a(0x329)](_0x497ae0))[_0x3eea4a(0x2f8)](_0x10b269 => this['isChoiceVisible'](_0x10b269)); let _0x59fac8 = Math[_0x3eea4a(0x1ea)](_0x3c2b3f[_0x3eea4a(0xbf)] / this[_0x3eea4a(0x299)]()); if (!$gameMessage[_0x3eea4a(0x17f)]) { const _0x8b01c0 = $gameMessage['maxShuffleChoices'](); _0x59fac8 = Math[_0x3eea4a(0x1ea)](Math[_0x3eea4a(0x22e)](_0x8b01c0, _0x3c2b3f[_0x3eea4a(0xbf)]) / this[_0x3eea4a(0x299)]()); } return Math['max'](0x1, Math[_0x3eea4a(0x22e)](_0x59fac8, this[_0x3eea4a(0x33d)]())); }, Window_ChoiceList[_0x137c0c(0x3b4)][_0x137c0c(0x33d)] = function () { const _0x4e04e8 = _0x137c0c, _0x5eb742 = this[_0x4e04e8(0x2c1)], _0x3faa6d = _0x5eb742 ? _0x5eb742['y'] : 0x0, _0x27ba93 = _0x5eb742 ? _0x5eb742[_0x4e04e8(0x3e3)] : 0x0, _0x4adba8 = Graphics[_0x4e04e8(0x455)] / 0x2; if (_0x3faa6d < _0x4adba8 && _0x3faa6d + _0x27ba93 > _0x4adba8) return 'PbzlQ' === 'PbzlQ' ? 0x4 : (_0x48773c[_0x4e04e8(0x3de)](this), _0x1883d4[_0x4e04e8(0x4bf)][_0x4e04e8(0x3b1)][_0x4e04e8(0x305)](this, _0x33f1f0)); else { if (_0x4e04e8(0x3ed) !== _0x4e04e8(0x3ed)) this[_0x4e04e8(0x47c)][_0x132da0]['parameters'][0x0][_0x4e04e8(0x21e)](_0x3d0860); else return $gameSystem['getChoiceListMaxRows'](); } }, Window_ChoiceList[_0x137c0c(0x3b4)][_0x137c0c(0x428)] = function () { const _0x2b35fe = _0x137c0c; let _0x1ba9ce = this['getStartingChoiceWidth'](); for (const _0x5c1965 of this[_0x2b35fe(0x47c)]) { if (_0x2b35fe(0x357) !== _0x2b35fe(0x357)) return this[_0x2b35fe(0x4e0)]()['list']; else { const _0x3eabf2 = _0x5c1965[_0x2b35fe(0x24b)], _0x3b141f = this[_0x2b35fe(0x3be)](_0x3eabf2), _0x22744c = this['textSizeEx'](_0x3eabf2)[_0x2b35fe(0x46e)] + _0x3b141f, _0xb04836 = Math[_0x2b35fe(0x1ea)](_0x22744c) + this[_0x2b35fe(0x454)]() * 0x2; _0x1ba9ce = Math[_0x2b35fe(0x168)](_0x1ba9ce, _0xb04836); } } return _0x1ba9ce; }, Window_ChoiceList['prototype'][_0x137c0c(0x3c4)] = function () { const _0x4ab369 = _0x137c0c; let _0x2de941 = $gameSystem[_0x4ab369(0x149)](); const _0x49699c = $gameMessage[_0x4ab369(0xbc)](); for (const _0x4868b8 of _0x49699c) { _0x4868b8['match'](/<CHOICE WIDTH:[ ](\d+)>/gi) && (_0x2de941 = Math['max'](_0x2de941, Number(RegExp['$1']))); } return Math[_0x4ab369(0x168)](_0x2de941, 0x1); }, Window_ChoiceList[_0x137c0c(0x3b4)][_0x137c0c(0x4b7)] = function () { const _0x142cfd = _0x137c0c, _0x50a48d = $gameSystem[_0x142cfd(0xde)]() || 0x0, _0x419082 = this[_0x142cfd(0x2c1)]['y'], _0x5b24fc = this[_0x142cfd(0x2c1)][_0x142cfd(0x3e3)], _0x15fe46 = this[_0x142cfd(0x2c1)]['_nameBoxWindow'], _0x26f132 = _0x15fe46[_0x142cfd(0x4c8)] > 0x0 && _0x15fe46[_0x142cfd(0x46e)] > 0x0, _0x30c951 = _0x26f132 ? _0x15fe46['height'] : 0x0; if (_0x50a48d < 0x0 && (this['_messageWindow']['isClosed']() || this[_0x142cfd(0x2c1)]['isClosing']())) this['y'] = Math['round']((Graphics['boxHeight'] - this[_0x142cfd(0x3e3)]) / 0x2); else { if (_0x419082 >= Graphics[_0x142cfd(0x455)] / 0x2) _0x50a48d >= 0x0 ? this['y'] -= _0x50a48d : this['y'] = Math['floor']((_0x419082 - this[_0x142cfd(0x3e3)] - _0x30c951) / 0x2); else { if (_0x142cfd(0x45e) === _0x142cfd(0x45e)) { if (_0x50a48d >= 0x0) _0x142cfd(0x1dc) === _0x142cfd(0x1dc) ? this['y'] += _0x50a48d : this['prepareShowTextPluginCommandFollowups'](_0x2ce2cd); else { const _0x2b9190 = Graphics[_0x142cfd(0x455)] - (_0x419082 + _0x5b24fc + _0x30c951); this['y'] += Math['floor']((_0x2b9190 - this[_0x142cfd(0x3e3)]) / 0x2) + _0x30c951; } } else return ![]; } } }, Window_ChoiceList[_0x137c0c(0x3b4)][_0x137c0c(0x328)] = function (_0x32a71a) { const _0x29dae0 = _0x137c0c, _0x1dd337 = this['requestChoiceForegroundImage'](_0x32a71a); if (_0x1dd337) { const _0x3cebb9 = ImageManager[_0x29dae0(0x253)](_0x1dd337), _0x3b600e = this[_0x29dae0(0x2a0)](), _0x439f5e = _0x3b600e + this[_0x29dae0(0x154)](_0x32a71a), _0x2afa80 = this['itemRectWithPadding'](_0x32a71a); _0x3cebb9[_0x29dae0(0x28c)](this[_0x29dae0(0x4b3)][_0x29dae0(0x29b)](this, _0x32a71a, !![], _0x439f5e, _0x2afa80, _0x3cebb9)); return; } this[_0x29dae0(0x322)](_0x32a71a); }, Window_ChoiceList[_0x137c0c(0x3b4)][_0x137c0c(0x322)] = function (_0x5c1900) { const _0xec6b5c = _0x137c0c, _0x2d1c5b = this[_0xec6b5c(0x36b)](_0x5c1900), _0x3a9f39 = this[_0xec6b5c(0x2a0)](), _0x4d678f = _0x3a9f39 + this['commandName'](_0x5c1900); this['changePaintOpacity'](this[_0xec6b5c(0x2eb)](_0x5c1900)); const _0x445dec = this[_0xec6b5c(0xb8)](_0x4d678f)[_0xec6b5c(0x3e3)], _0x56a62a = _0x2d1c5b['x'] + this[_0xec6b5c(0x3be)](_0x4d678f), _0x3e5950 = Math[_0xec6b5c(0x168)](_0x2d1c5b['y'], _0x2d1c5b['y'] + Math[_0xec6b5c(0x385)]((_0x2d1c5b[_0xec6b5c(0x3e3)] - _0x445dec) / 0x2)); this[_0xec6b5c(0x48a)](_0x4d678f, _0x56a62a, _0x3e5950, _0x2d1c5b[_0xec6b5c(0x46e)]), this['changeChoiceBackgroundColor'](_0x5c1900), this['requestChoiceBackgroundImage'](_0x5c1900, _0x4d678f, _0x2d1c5b); }, Window_ChoiceList[_0x137c0c(0x3b4)]['choiceAlignText'] = function () { const _0x421cae = _0x137c0c; return $gameSystem[_0x421cae(0x375)]() !== _0x421cae(0x236) ? _0x421cae(0x9e)[_0x421cae(0x266)]($gameSystem[_0x421cae(0x375)]()) : ''; }, Window_ChoiceList[_0x137c0c(0x3b4)][_0x137c0c(0x3be)] = function (_0x3e0bc0) { const _0x455a8d = _0x137c0c; let _0x3079df = 0x0; if (_0x3e0bc0[_0x455a8d(0x504)](/<(?:CHOICE|CHOICE |)INDENT:[ ](\d+)>/gi)) { if ('nPLVe' !== _0x455a8d(0x314)) { _0x51fc83['MessageCore'][_0x455a8d(0x3bc)]('TextCodeActions'); for (const _0x5d3b1c of _0x39d711['MessageCore'][_0x455a8d(0x452)][_0x455a8d(0x269)]) { _0x5d3b1c[_0x455a8d(0x384)] = _0x5d3b1c[_0x455a8d(0x384)][_0x455a8d(0x282)](), _0x5d3b1c['textCodeCheck'] = new _0x1cc084('\x1b' + _0x5d3b1c[_0x455a8d(0x384)], 'gi'), _0x5d3b1c[_0x455a8d(0x3b6)] = '\x1b' + _0x5d3b1c[_0x455a8d(0x384)]; if (_0x5d3b1c[_0x455a8d(0x3bf)] === '') _0x5d3b1c['textCodeResult'] += '[0]'; } } else _0x3079df = Number(RegExp['$1']); } return _0x3079df; }, Window_ChoiceList[_0x137c0c(0x3b4)]['changeChoiceBackgroundColor'] = function (_0x114fe5) { const _0x345f28 = _0x137c0c; if (!Imported[_0x345f28(0xa7)]) return; const _0x4e138d = this[_0x345f28(0x154)](_0x114fe5); let _0xc862cc = ![], _0x44bad0 = ![], _0x2b9dcb = ColorManager['itemBackColor1'](), _0x45603a = ColorManager[_0x345f28(0x4c2)](); if (_0x4e138d[_0x345f28(0x504)](/<(?:BGCOLOR|BG COLOR):[ ](.*?),(.*?)>/gi)) _0x2b9dcb = ColorManager['getColor'](RegExp['$1'])[_0x345f28(0xca)](), _0x45603a = ColorManager['getColor'](RegExp['$2'])['trim'](), _0xc862cc = !![]; else { if (_0x4e138d[_0x345f28(0x504)](/<(?:BGCOLOR|BG COLOR):[ ](.*?)>/gi)) { let _0x1b2cd9 = String(RegExp['$1'])['toLowerCase']()['trim'](); switch (_0x1b2cd9) { case _0x345f28(0x3b9): _0x2b9dcb = _0x45603a = '#f26c4f', _0x44bad0 = !![]; break; case _0x345f28(0xdc): _0x2b9dcb = _0x45603a = _0x345f28(0x143), _0x44bad0 = !![]; break; case _0x345f28(0x19f): _0x2b9dcb = _0x45603a = _0x345f28(0x16f), _0x44bad0 = !![]; break; case _0x345f28(0x30c): _0x2b9dcb = _0x45603a = '#7cc576', _0x44bad0 = !![]; break; case _0x345f28(0x2a5): _0x2b9dcb = _0x45603a = _0x345f28(0x1b8), _0x44bad0 = !![]; break; case _0x345f28(0x49c): case 'violet': _0x2b9dcb = _0x45603a = _0x345f28(0x2a2), _0x44bad0 = !![]; break; case _0x345f28(0x34e): _0x2b9dcb = _0x45603a = _0x345f28(0x2bb), _0x44bad0 = !![]; break; case _0x345f28(0x34a): _0x2b9dcb = _0x45603a = _0x345f28(0x2b9), _0x44bad0 = !![]; break; case _0x345f28(0x15d): _0x2b9dcb = _0x45603a = _0x345f28(0x2e8), _0x44bad0 = !![]; break; case _0x345f28(0x319): case _0x345f28(0x18d): _0x2b9dcb = _0x45603a = _0x345f28(0x466), _0x44bad0 = !![]; break; case _0x345f28(0x182): _0x2b9dcb = _0x45603a = _0x345f28(0x503), _0x44bad0 = !![]; break; case _0x345f28(0x22a): _0x2b9dcb = _0x45603a = ColorManager[_0x345f28(0x12b)](), _0x44bad0 = !![]; break; case 'no': _0x2b9dcb = _0x45603a = ColorManager[_0x345f28(0x1f2)](), _0x44bad0 = !![]; break; case _0x345f28(0x321): _0x2b9dcb = _0x45603a = ColorManager[_0x345f28(0xc9)](), _0x44bad0 = !![]; break; case _0x345f28(0x2fe): _0x2b9dcb = _0x45603a = ColorManager['crisisColor'](), _0x44bad0 = !![]; break; default: _0x2b9dcb = _0x45603a = ColorManager['getColor'](_0x1b2cd9), _0x44bad0 = !![]; break; }_0xc862cc = !![]; } } if (!_0xc862cc) return; const _0x10f63c = this['itemRect'](_0x114fe5); this[_0x345f28(0x1bf)][_0x345f28(0x2d7)](_0x10f63c['x'], _0x10f63c['y'], _0x10f63c['width'], _0x10f63c[_0x345f28(0x3e3)]), this['drawCustomBackgroundColor'](_0x10f63c, _0x2b9dcb, _0x45603a, _0x44bad0); }, Window_ChoiceList[_0x137c0c(0x3b4)][_0x137c0c(0x43c)] = function (_0x468eac, _0x3f3c69, _0x4f6602, _0x2b7f1c) { const _0x53e0dc = _0x137c0c, _0x27e922 = ColorManager['itemBackColor1'](), _0x3c199c = ColorManager[_0x53e0dc(0x97)](), _0x13cfc7 = _0x3f3c69 ?? ColorManager[_0x53e0dc(0x12e)](), _0x854ae4 = _0x4f6602 ?? _0x3f3c69, _0x334bf4 = _0x468eac['x'], _0x539caa = _0x468eac['y'], _0x3f49e4 = _0x468eac[_0x53e0dc(0x46e)], _0x5a2bc9 = _0x468eac[_0x53e0dc(0x3e3)]; this[_0x53e0dc(0x1bf)][_0x53e0dc(0x233)](_0x334bf4, _0x539caa, _0x3f49e4, _0x5a2bc9, _0x13cfc7, _0x854ae4, !![]), _0x2b7f1c && this[_0x53e0dc(0x1bf)][_0x53e0dc(0x233)](_0x334bf4, _0x539caa, _0x3f49e4, _0x5a2bc9, _0x27e922, _0x854ae4, !![]), this[_0x53e0dc(0x1bf)][_0x53e0dc(0x1da)](_0x334bf4, _0x539caa, _0x3f49e4, _0x5a2bc9, _0x27e922); }, Window_ChoiceList[_0x137c0c(0x3b4)][_0x137c0c(0xee)] = function (_0x58b73f) { const _0x5b0576 = _0x137c0c, _0x393fdc = this[_0x5b0576(0x2a0)](), _0x41eafc = _0x393fdc + this[_0x5b0576(0x154)](_0x58b73f); let _0x133123 = ''; if (_0x41eafc[_0x5b0576(0x504)](/<FG(?:| )(?:IMG|IMAGE|PIC|PICTURE):[ ](.*?)>/i)) _0x133123 = String(RegExp['$1'])[_0x5b0576(0xca)](); else _0x41eafc[_0x5b0576(0x504)](/<FG(?:| )(?:IMG|IMAGE|PIC|PICTURE)[ ]*(.*?):[ ](.*?)>/i) && (_0x133123 = String(RegExp['$2'])[_0x5b0576(0xca)]()); return _0x133123; }, Window_ChoiceList[_0x137c0c(0x3b4)][_0x137c0c(0x36c)] = function (_0x545117, _0x9cfe9e, _0x56a1ec) { const _0xb72cc = _0x137c0c; let _0x316ce0 = ''; if (_0x9cfe9e[_0xb72cc(0x504)](/<BG(?:| )(?:IMG|IMAGE|PIC|PICTURE):[ ](.*?)>/i)) _0x316ce0 = String(RegExp['$1'])[_0xb72cc(0xca)](); else { if (_0x9cfe9e[_0xb72cc(0x504)](/<BG(?:| )(?:IMG|IMAGE|PIC|PICTURE)[ ]*(.*?):[ ](.*?)>/i)) { if (_0xb72cc(0x41f) !== _0xb72cc(0x41f)) { if (_0x5246e6[_0xb72cc(0x3d4)]()) return; this[_0xb72cc(0x2f9)] = this[_0xb72cc(0x2f9)] || 0x0; const _0x28b077 = this[_0xb72cc(0x2c1)], _0x5db495 = _0x5bc196[_0xb72cc(0x4ae)](_0x28b077[_0xb72cc(0x46e)] * this['_relativePosition'] / 0xa); this['x'] = _0x28b077['x'] + _0x5db495 - _0x3d3c86['floor'](this[_0xb72cc(0x46e)] / 0x2), this['x'] = this['x'][_0xb72cc(0x3d1)](_0x28b077['x'], _0x28b077['x'] + _0x28b077[_0xb72cc(0x46e)] - this[_0xb72cc(0x46e)]); } else _0x316ce0 = String(RegExp['$2'])[_0xb72cc(0xca)](); } } if (_0x316ce0) { const _0x11680a = ImageManager['loadPicture'](_0x316ce0); _0x11680a['addLoadListener'](this['drawChoiceLocationImage']['bind'](this, _0x545117, ![], _0x9cfe9e, _0x56a1ec, _0x11680a)); } }, Window_ChoiceList[_0x137c0c(0x3b4)]['drawChoiceLocationImage'] = function (_0xb3a334, _0x3b7989, _0x3c1fd3, _0x23b618, _0x3f7fc8) { const _0x2372a5 = _0x137c0c, _0x18fc37 = this['choiceAlignText'](), _0x2194d8 = _0x18fc37 + this[_0x2372a5(0x154)](_0xb3a334); if (_0x3c1fd3 !== _0x2194d8) return; const _0x2849a8 = this[_0x2372a5(0x36b)](_0xb3a334); if (['x', 'y', _0x2372a5(0x46e), _0x2372a5(0x3e3)][_0x2372a5(0x435)](_0x292b69 => _0x2849a8[_0x292b69] !== _0x23b618[_0x292b69])) return; let _0x50e6a1 = 0x0, _0x2be046 = ''; if (_0x3b7989 && _0x2194d8[_0x2372a5(0x504)](/<BG(?:| )(?:IMG|IMAGE|PIC|PICTURE):[ ](.*?)>/i)) { } else { if (_0x3b7989 && _0x2194d8['match'](/<FG(?:| )(?:IMG|IMAGE|PIC|PICTURE)[ ]*(.*?):[ ](.*?)>/i)) _0x2be046 = String(RegExp['$1'])['toLowerCase']()[_0x2372a5(0xca)](); else !_0x3b7989 && _0x2194d8[_0x2372a5(0x504)](/<BG(?:| )(?:IMG|IMAGE|PIC|PICTURE)[ ]*(.*?):[ ](.*?)>/i) && (_0x2be046 = String(RegExp['$1'])['toLowerCase']()['trim']()); } switch (_0x2be046) { case _0x2372a5(0x252): case _0x2372a5(0x11b): case _0x2372a5(0x4a8): case _0x2372a5(0x279): case _0x2372a5(0x128): case 'down\x20left': case '1': _0x50e6a1 = 0x1; break; case 'lowercenter': case 'lower-center': case _0x2372a5(0xad): case _0x2372a5(0x3cd): case _0x2372a5(0xc1): case 'down\x20center': case _0x2372a5(0x1e5): case '2': _0x50e6a1 = 0x2; break; case _0x2372a5(0x25e): case 'lower-right': case _0x2372a5(0x3e9): case 'downright': case _0x2372a5(0x125): case _0x2372a5(0x4ce): case '3': _0x50e6a1 = 0x3; break; case _0x2372a5(0x261): case _0x2372a5(0x366): case 'left': case '4': _0x50e6a1 = 0x4; break; case 'midcenter': case _0x2372a5(0x35b): case _0x2372a5(0x508): case _0x2372a5(0x23b): case '5': _0x50e6a1 = 0x5; break; case _0x2372a5(0x32d): case _0x2372a5(0x124): case 'right': case '6': _0x50e6a1 = 0x6; break; case _0x2372a5(0x1d1): case _0x2372a5(0x378): case _0x2372a5(0x103): case 'upleft': case 'up-left': case _0x2372a5(0xaa): case '7': _0x50e6a1 = 0x7; break; case _0x2372a5(0x106): case 'upper-center': case _0x2372a5(0x492): case _0x2372a5(0x237): case _0x2372a5(0x1e3): case _0x2372a5(0x42f): case 'up': case '8': _0x50e6a1 = 0x8; break; case _0x2372a5(0x192): case _0x2372a5(0x37b): case _0x2372a5(0xa5): case _0x2372a5(0x38a): case _0x2372a5(0xa8): case _0x2372a5(0x349): case '9': _0x50e6a1 = 0x9; break; }const _0x1c7950 = _0x3b7989 ? this[_0x2372a5(0x146)] : this[_0x2372a5(0x1bf)], _0x2efc2e = this[_0x2372a5(0x342)](_0xb3a334); !_0x3b7989 && _0x1c7950[_0x2372a5(0x2d7)](_0x2efc2e['x'] - 0x1, _0x2efc2e['y'] - 0x1, _0x2efc2e[_0x2372a5(0x46e)] + 0x2, _0x2efc2e['height'] + 0x2); const _0xec6461 = _0x2efc2e['x'] + 0x2, _0x19190c = _0x2efc2e['y'] + 0x2, _0x1d8b10 = _0x2efc2e[_0x2372a5(0x46e)] - 0x4, _0x37a442 = _0x2efc2e['height'] - 0x4, _0x20f8f1 = _0x3f7fc8[_0x2372a5(0x46e)], _0xfc4179 = _0x3f7fc8[_0x2372a5(0x3e3)]; let _0x35d592 = _0xec6461, _0x22aebf = _0x19190c, _0x2d5fe6 = _0x1d8b10, _0x1f0ee4 = _0x37a442; const _0x49315f = _0x1d8b10 / _0x20f8f1, _0x347620 = _0x37a442 / _0xfc4179; let _0x4f932e = Math['min'](_0x49315f, _0x347620); if (_0x3b7989) _0x4f932e = Math[_0x2372a5(0x22e)](_0x4f932e, 0x1); _0x50e6a1 !== 0x0 && (_0x2d5fe6 = Math[_0x2372a5(0x385)](_0x20f8f1 * _0x4f932e), _0x1f0ee4 = Math['round'](_0xfc4179 * _0x4f932e)); switch (_0x50e6a1) { case 0x1: case 0x4: case 0x7: _0x35d592 = _0xec6461; break; case 0x2: case 0x5: case 0x8: _0x35d592 += Math[_0x2372a5(0x385)]((_0x1d8b10 - _0x2d5fe6) / 0x2); break; case 0x3: case 0x6: case 0x9: _0x35d592 += _0x1d8b10 - _0x2d5fe6; break; }switch (_0x50e6a1) { case 0x7: case 0x8: case 0x9: _0x22aebf = _0x19190c; break; case 0x4: case 0x5: case 0x6: _0x22aebf += Math[_0x2372a5(0x385)]((_0x37a442 - _0x1f0ee4) / 0x2); break; case 0x1: case 0x2: case 0x3: _0x22aebf += _0x37a442 - _0x1f0ee4; break; }_0x1c7950[_0x2372a5(0x2ca)](_0x3f7fc8, 0x0, 0x0, _0x20f8f1, _0xfc4179, _0x35d592, _0x22aebf, _0x2d5fe6, _0x1f0ee4), _0x3b7989 && this['drawItemContents'](_0xb3a334); }, Window_ChoiceList[_0x137c0c(0x3b4)][_0x137c0c(0x3c1)] = function () { const _0x32a91a = _0x137c0c; this['_helpWindow'][_0x32a91a(0x4eb)](); if (!this[_0x32a91a(0x472)]) return; const _0x583f4c = this[_0x32a91a(0x1ff)](); if (this[_0x32a91a(0x472)][_0x583f4c]) { if (_0x32a91a(0x21f) === _0x32a91a(0x21f)) this[_0x32a91a(0xba)]['setText'](this[_0x32a91a(0x472)][_0x583f4c]), this[_0x32a91a(0xba)]['show'](); else return !![]; } else { if (_0x32a91a(0x1b6) !== _0x32a91a(0x418)) this['_helpWindow'][_0x32a91a(0x4eb)](), this['_helpWindow'][_0x32a91a(0x4d5)](); else { const _0x48e30f = _0x26b6ec[_0x32a91a(0x4fd)](); this[_0x32a91a(0x49e)](_0x48e30f, _0x590b80, _0x3f825f, _0x111389, _0x6b33d2); } } }, Window_EventItem[_0x137c0c(0x3b4)][_0x137c0c(0x365)] = function () { const _0xac99d5 = _0x137c0c, _0x4dc123 = $gameMessage[_0xac99d5(0x46a)](); _0x4dc123 === _0xac99d5(0x151) && Imported['VisuMZ_1_SkillsStatesCore'] ? this['makeSkillList']() : Window_ItemList['prototype'][_0xac99d5(0x365)][_0xac99d5(0x305)](this); }, Window_EventItem[_0x137c0c(0x3b4)][_0x137c0c(0x3d3)] = function () { const _0x5d0603 = _0x137c0c, _0x4e4e16 = $gameMessage[_0x5d0603(0x4fd)](); this[_0x5d0603(0x448)] = _0x4e4e16 ? _0x4e4e16[_0x5d0603(0x2a4)]()[_0x5d0603(0x2f8)](_0x3a0994 => this['includes'](_0x3a0994)) : [], this[_0x5d0603(0x27c)](null) && this[_0x5d0603(0x448)]['push'](null); }, VisuMZ[_0x137c0c(0x4bf)][_0x137c0c(0x4a9)] = Window_EventItem[_0x137c0c(0x3b4)]['includes'], Window_EventItem['prototype'][_0x137c0c(0x27c)] = function (_0x5e39a0) { const _0x4a60ed = _0x137c0c, _0x319e1c = $gameMessage[_0x4a60ed(0x46a)](); if (_0x319e1c === _0x4a60ed(0x316)) { if (!DataManager[_0x4a60ed(0x4da)](_0x5e39a0)) return ![]; const _0x31280b = $gameMessage[_0x4a60ed(0x49a)](); if (_0x31280b > 0x0) { if (_0x5e39a0['wtypeId'] !== _0x31280b) return ![]; } return !![]; } else { if (_0x319e1c === _0x4a60ed(0x209)) { if (!DataManager[_0x4a60ed(0x439)](_0x5e39a0)) return ![]; const _0x171c5f = $gameMessage[_0x4a60ed(0x38e)](); if (_0x171c5f > 0x0) { if (_0x4a60ed(0x2a8) === 'xOyNa') _0x5034af = _0x7382e8[_0x4a60ed(0x4bf)][_0x4a60ed(0x3ac)](_0x491e8b)[_0x4a60ed(0x173)](''); else { if (_0x5e39a0[_0x4a60ed(0xb0)] !== _0x171c5f) return ![]; } } const _0x2d6cde = $gameMessage[_0x4a60ed(0xa2)](); if (_0x2d6cde > 0x0) { if (_0x5e39a0['etypeId'] !== _0x2d6cde) return ![]; } return !![]; } else { if (_0x319e1c === 'skill') { if (!DataManager['isSkill'](_0x5e39a0)) return ![]; const _0x415427 = $gameMessage[_0x4a60ed(0x4fd)](); if (_0x415427[_0x4a60ed(0x100)](_0x5e39a0)) return ![]; if (!_0x415427[_0x4a60ed(0x313)](_0x5e39a0)) return ![]; const _0x10d3ca = $gameMessage['itemChoiceStypeId'](); if (_0x10d3ca > 0x0) { if (_0x4a60ed(0x346) !== _0x4a60ed(0x204)) { const _0x2d12a5 = DataManager[_0x4a60ed(0x197)](_0x5e39a0); if (!_0x2d12a5[_0x4a60ed(0x27c)](_0x10d3ca)) return ![]; } else this['textSpeed'] = _0x346c5b[_0x4a60ed(0x4bf)][_0x4a60ed(0x452)][_0x4a60ed(0x257)][_0x4a60ed(0x1eb)]; } return !![]; } else return VisuMZ[_0x4a60ed(0x4bf)][_0x4a60ed(0x4a9)]['call'](this, _0x5e39a0); } } }, VisuMZ['MessageCore'][_0x137c0c(0x3ee)] = Window_ItemList[_0x137c0c(0x3b4)][_0x137c0c(0x259)], Window_ItemList[_0x137c0c(0x3b4)][_0x137c0c(0x259)] = function (_0x4c19c2, _0x304307, _0x11de4c, _0x2e09d8) { const _0x5f2e11 = _0x137c0c, _0x5935c1 = $gameMessage['itemChoiceItypeId'](); if (_0x5935c1 === _0x5f2e11(0x151)) { const _0x332c2a = $gameMessage['itemChoiceActor'](); this[_0x5f2e11(0x49e)](_0x332c2a, _0x4c19c2, _0x304307, _0x11de4c, _0x2e09d8); } else { if (_0x5f2e11(0x3b7) === _0x5f2e11(0x1b5)) return !![]; else VisuMZ[_0x5f2e11(0x4bf)][_0x5f2e11(0x3ee)][_0x5f2e11(0x305)](this, _0x4c19c2, _0x304307, _0x11de4c, _0x2e09d8); } };