//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.82;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.82] [CoreEngine]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Core_Engine_VisuStella_MZ
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Core Engine plugin is designed to fix any bugs that may have slipped
 * past RPG Maker MZ's source code and to give game devs more control over
 * RPG Maker MZ's various features, ranging from mechanics to aesthetics to
 * quality of life improvements.
 *
 * Features include all (but not limited to) the following:
 *
 * * Bug fixes for the problems existing in the RPG Maker MZ base code.
 * * Failsafes added for Script Call related event commands.
 * * Lots of Quality of Life Settings that can be activated through the
 *   Plugin Parameters.
 * * Control over the various Text Colors used throughout the game.
 * * Change up the maximum amount of gold carried, give it an icon attached to
 *   the label, and include text for overlap specifics.
 * * Preload images as the game boots up.
 * * Add specific background images for menus found throughout the game.
 * * A button assist window will appear at the top or bottom of the screen,
 *   detailing which buttons do what when inside a menu. This feature can be
 *   turned off.
 * * Choose which in-game battler parameters to display inside menus (ie ATK,
 *   DEF, AGI, etc.) and determine their maximum values, along with plenty of
 *   notetags to give more control over parameter, x-parameter, s-parameter
 *   bonuses through equipment, states, and other trait objects.
 * * Control over how the UI objects appear (such as the menu button, cancel
 *   button, left/right actor switch buttons).
 * * Reposition actors and enemies if the battle resolution is larger.
 * * Allow class names and nicknames to support text codes when displayed.
 * * Determine how windows behave in the game, if they will mask other windows,
 *   their line height properties, and more.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 0 ------
 *
 * This plugin is a Tier 0 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ Plugin library.
 *
 * ============================================================================
 * Important Changes: Bug Fixes
 * ============================================================================
 *
 * This plugin also serves to fix various bugs found in RPG Maker MZ that have
 * been unaddressed or not yet taken care of. The following is a list of bugs
 * that have been fixed by this plugin:
 *
 * ---
 *
 * Attack Skill Trait
 *
 * Enemies are unaffected by the Attack Skill Trait. This means if they have
 * an Attack action, they will always use Attack over and over even if their
 * Attack Skill Trait has been changed. This plugin will change it up so that
 * the Attack skill will comply with whatever their Attack Skill Trait's skill
 * is set to.
 *
 * ---
 *
 * Auto Battle Actor Skill Usage
 *
 * If an actor with Auto Battle has access to a skill but not have any access
 * to that skill's type, that actor will still be able to use the skill during
 * Auto Battle despite the fact that the actor cannot use that skill during
 * manual input.
 *
 * ---
 * 
 * Auto Battle Attack Seal Bypass
 * 
 * By default, if the attack skill is sealed via a trait and an actor has
 * auto-battle, the action can still be used via auto-battle. This is now fixed
 * and actors should not be able to attack via auto-battle if their attack
 * ability is sealed.
 * 
 * ---
 * 
 * Auto Battle Lock Up
 * 
 * If an auto battle Actor fights against an enemy whose DEF/MDF is too high,
 * they will not use any actions at all. This can cause potential game freezing
 * and softlocks. This plugin will change that and have them default to a
 * regular Attack.
 * 
 * ---
 * 
 * Auto Save After New Game
 * 
 * Normally, when starting a new game through the "New Game" option, there is
 * no auto save trigger. However, if you start a new game or load a saved game,
 * then go to the Game End screen, return back to the title screen, then start
 * a New Game, the auto save trigger occurs when it shouldn't. The Core Engine
 * will now patch this and prevent the trigger from taking place.
 * 
 * ---
 * 
 * Battle Forced End Action Crash
 * 
 * Depending on various circumstances, currently active battlers can be cleared
 * from the battle system at will due to a number of reasons. However, if it
 * just so happens that the targets are cleared, too, with actions remaining,
 * then a crash will follow up. This plugin will prevent that change. Fix made
 * by Olivia.
 * 
 * ---
 * 
 * Debug Console Refresh Bug
 * 
 * When pressing F5 to refresh while the debug console (DevTools) is open,
 * some graphics will fail to load properly. This started occurring since the
 * RPG Maker MZ 1.5.0 update and the code for loading the images has now been
 * reverted to the 1.4.4 version where it was last stable.
 * 
 * ---
 * 
 * Gamepad Repeat Input
 * 
 * Cleared inputs on gamepads do not have a downtime and will trigger the
 * following input frame. The causes problems with certain RPG Maker MZ menus
 * where the inputs have to be cleared as the next immediate frame will have
 * them inputted again. This plugin changes it so that whenever inputs are
 * cleared, there is a downtime equal to the keyboard clear frames before the
 * gamepad input is registered once more.
 * 
 * ---
 * 
 * Invisible Battle Sprites
 * 
 * If you removed a party member during battle and added that exact party
 * member back into the same slot, their sprite would appear invisible. The
 * VisuStella Core Engine will fix this problem and prevent it from happening.
 * 
 * ---
 * 
 * Instant Text Discrepancy for Window_Message
 * 
 * Window_Message displays text differently when it draws letters one by one
 * versus when the text is displayed instantly. This isn't noticeable with the
 * default font, but it's very visible when using something like Arial. The
 * error is due to Bitmap.measureTextWidth yielding a rounded value per letter
 * versus per word. The Core Engine will provide a bug fix that will single out
 * the cause and make it so that only Window_Message will not utilize any round
 * number values when determining the width of each letter, whether or not it
 * is shown instantly. This change will only affect Window_Message and not any
 * other window in order to prevent unintended side effects.
 * 
 * This can be disabled through the Plugin Parameters:
 * 
 * Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * 
 * ---
 *
 * Move Picture, Origin Differences
 *
 * If a Show Picture event command is made with an Origin setting of
 * "Upper Left" and a Move Picture event command is made afterwards with an
 * Origin setting of "Center", RPG Maker MZ would originally have it instantly
 * jump into the new origin setting without making a clean transition between
 * them. This plugin will create that clean transition between origins.
 *
 * ---
 * 
 * Overly-Protective Substitute
 * 
 * When an ally with critical health is being targeted by a friendly non-
 * Certain Hit skill (such as a heal or buff) and another ally has the
 * substitute state, the other ally would "protect" the originally targeted
 * ally and take the heal or buff.
 * 
 * The new changed behavior is that now, substitute will not trigger for any
 * actions whose scope targets allies.
 * 
 * ---
 * 
 * Skill List Active After Party Member Change
 * 
 * If the skill list is active (ie. the player can move the cursor around) and
 * the party member currently being viewed is changed via the button commands,
 * then previously, RPG Maker MZ would still have that window be active despite
 * having the cursor hidden temporarily. Upon pressing direction buttons, the
 * cursor reveals itself and both the skill type window and skill list window
 * are both active, making way for lots of potential problems to happen.
 * 
 * ---
 * 
 * Sprite Removal and Destroy Crash
 * 
 * A texture check will now occur for sprites that are being removed and
 * destroyed in order to prevent crashes. In the off chance that someone
 * creates a sprite through a script call and removes it through such, the
 * likelihood of this occurance becomes higher. This makes the "destroy"
 * property take into account a texture check in order to see if the sprite
 * removal is taking extra steps and will reduce those extra steps.
 * 
 * ---
 * 
 * Status Window Name Vertical Cutoffs
 * 
 * In the battle status windows, whenever actor names are displayed, the bitmap
 * used to display their name text do not extend vertically all the way,
 * causing letters like lowercase "Q" and "G" to be cut off, making them hard
 * to distinguish from one another. The Core Engine will remedy this by
 * extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * ---
 * 
 * Termination Clear Effects
 * 
 * In RPG Maker MZ, requesting an animation while transitioning between
 * scenes, such as going from the map scene to the battle scene, can cause
 * crashes. This is because the animation queue does not take off immediately
 * and will likely register incorrect targets for the scene. This plugin will
 * forcefully clear any registered animations and balloon effects when
 * terminating a scene in order to prevent crashes.
 * 
 * ---
 * 
 * Timer Sprite
 * 
 * By default, RPG Maker MZ adds Sprite_Timer into its spriteset, either for
 * maps or for battles. There is one major problem with this: when spritesets
 * are affected by filters, zooms, and/or blurs, this hinders how readable the
 * timer sprite is, making the information perceived by the player to be much
 * harder than it needs to be. The Core Engine adds the sprite to the parent
 * scene instead of the spriteset to ensure it's unobscured by anything else.
 * 
 * ---
 * 
 * Unusable Battle Items
 * 
 * If any party member is able to use an item in battle, then all party members
 * are able to use said item, even if that party member is supposed to be
 * unable to use that item. This is now changed so that battle items are
 * checked on an individual basis and not on a party-wide basis.
 * 
 * ---
 * 
 * Water Tile Bug
 * 
 * It seems like there's a new bug that occurs if you create a tileset from
 * scratch in RPG Maker MZ version 1.5.0+ and version 1.6.0+! What this bug
 * does is it causes many tiles to become water tiles without intending to.
 * You can find this out by turning off all the plugins in your project,
 * putting a Ship or Boat on what are normally ground tiles, and then seeing
 * the Ship or Boat traverse through it.
 * 
 * There are two ways to fix this. We cannot fix it through code in this plugin
 * as it's a problem that involves the tileset json data there are ways to work
 * around it so that you can get the proper water-flags to go where they need
 * to be at.
 * 
 * 1. Copy a working un-bugged tileset onto the currently bugged one and
 *    reapply the tile features like passability, terrain tags, etc. This will
 *    make sure the water-passability tiles get copied over correctly.
 * 
 * 2. If you're on RPG Maker MZ version 1.5.0 or above, select a working
 *    un-bugged tileset (usually a pre-existing tileset when a new project is
 *    made), click the "Copy Page" button, go to the bugged tileset and press
 *    "Paste Page". You'll have to reapply any different properties like
 *    passabilities and terrain tags, but the water tile flags should now be
 *    working properly.
 * 
 * The plugin will not fix the problem itself since flag data is delicate and
 * should not be tampered with midgame as the changes made by the plugin might
 * not match the desired settings.
 * 
 * This plugin, however, will also send out an alert message when coming across
 * such a tile. Pay attention to it and do one of the following two steps above
 * to fix the problem.
 * 
 * ---
 * 
 * Window Arrows Sprite Tearing
 * 
 * If a window object in RPG Maker MZ were to have an odd number for width size
 * then the arrow elements found for the window would be positioned on a half
 * pixel, giving it a blurry look and also have sprite tearing issues. This is
 * now fixed by rounding the number to the nearest whole number.
 * 
 * ---
 * 
 * Window Client Area Scaling Bug
 * 
 * If the window has a scale value different from 1.0, the client area (the
 * interactable parts) will not scale properly and appear clipped out. This
 * is now fixed by adjusting the client area to the window's scale values and
 * rounding upward to the nearest whole number.
 * 
 * ---
 * 
 * Window Skin Bleeding
 * 
 * This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 * been set from 96 to 95. This results in the window skin bleeding past the
 * window's intended borders. The Core Engine now reverts this change to
 * prevent the bleeding effect from happening.
 * 
 * ---
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Scroll-Linked Pictures
 *
 * - If a Parallax has a ! at the start of its filename, it is bound to the map
 * scrolling. The same thing now happens with pictures. If a Picture has a ! at
 * the start of its filename, it is bound to the map's scrolling as well.
 *
 * ---
 *
 * Movement Route Scripts
 *
 * - If code in a Movement Route Script command fails, instead of crashing the
 * game, it will now act as if nothing happened except to display the cause of
 * the error inside the console.
 *
 * ---
 * 
 * Script Call Failsafes
 * 
 * - If code found in Conditional Branches, Control Variables, and/or Script
 * Calls fail to activate, instead of crashing the game, it will now act as if
 * nothing happened except to display the cause of the error inside the
 * console.
 * 
 * ---
 * 
 * Digit Grouping
 * 
 * - There exists an option to change how numbers are displayed and converted
 * in your game. This option can be enabled or disabled by going into the
 * Plugin Manager > VisuMZ_0_OptionsCore > Quality of Life Settings >
 * Digit Grouping and toggling on/off whichever ones you want.
 * 
 * - Digit Grouping will follow the rules of whatever country/locale the Plugin
 * Parameters are set to. If it's to default 'en-US', then 1234567.123456 will
 * become 1,234,567.123456. Set it to 'es-ES' and it becomes 1.234.567,123456
 * instead.
 * 
 * - This uses JavaScript's Number.toLocaleString() function and will therefore
 * follow whatever rules it has. This means if there are trailing zeroes at the
 * end of a decimal, it will cut them off. Numbers like 123.45000 will become
 * 123.45 instead. Excess numbers past 6 decimal places will be rounded. A
 * number like 0.123456789 will become 0.123457 instead.
 * 
 * - Numbers in between [ and ], < and > will be excluded from digit grouping
 * in order for text codes to be preserved accurately. \I[1234] will remain as
 * \I[1234].
 * 
 * - If you would like to enter in a number without digit grouping, surround it
 * with {{ and }}. Typing in {{1234567890}} will yield 1234567890.
 * 
 * ---
 * 
 * Show Scrolling Text, additional functionality
 * 
 * The event command "Show Scrolling Text" now has additional functionality as
 * long as the VisuStella MZ Core Engine is installed. If the game dev inserts
 * "// Script Call" (without the quotes) inside the scrolling text, then the
 * entirity of the Show Scrolling Text event command will be ran as a giant
 * script call event command.
 * 
 * The reason why this functionality is added is because the "Script..." event
 * command contains only 12 lines maximum. This means for any script call
 * larger than 12 lines of code cannot be done by normal means as each script
 * call is ran as a separate instance.
 * 
 * By repurposing the "Show Scrolling Text" event command to be able to
 * function as an extended "Script..." event command, such a thing is now
 * possible with less hassle and more lines to code with.
 * 
 * This effect does not occur if the Show Scrolling Text event command does not
 * have "// Script Call" in its contents.
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * === Actors-Related Notetags ===
 *
 * Parameter limits can be adjusted in the Plugin Parameters, but this won't
 * lift the ability to change the values of an actor's initial or max level
 * past the editor's limits. Instead, this must be done through the usage of
 * notetags to accomplish the feat.
 *
 * ---
 *
 * <Max Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's max level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * <Initial Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's initial level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * === Classes-Related Notetags ===
 *
 * As actor levels can now surpass 99 due to the notetag system, there may be
 * some skills you wish certain classes can learn upon reaching higher levels
 * past 99, too.
 *
 * ---
 * 
 * <Learn At Level: x>
 *
 * - Used for: Class Skill Learn Notetags
 * - Replace 'x' with an integer to determine the level this class will learn
 *   the associated skill at.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the class's database value.
 *
 * ---
 *
 * === Enemies-Related Notetags ===
 *
 * Enemies are now given levels. The levels don't do anything except to serve
 * as a container for a number value. This way, levels can be used in damage
 * formulas (ie. a.atk - b.level) without causing any errors. To give enemies
 * levels, use the notetags below. These notetags also allow you to adjust the
 * base parameters, EXP, and Gold past the database limitations.
 *
 * ---
 *
 * <Level: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's level.
 * - If no level is declared, the level will default to 1.
 *
 * ---
 *
 * <param: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to alter.
 *   - This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * - Replace 'x' with an integer to set an enemy's 'param' base value.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 *
 * <EXP: x>
 * <Gold: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's EXP or Gold values.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 * 
 * === Animations-Related Notetags ===
 * 
 * Animations in RPG Maker MZ are done by Effekseer and the animation system
 * has been revamped. However, the animations are only centered on the targets
 * now, and cannot be attached to the head or foot. Insert these tags into
 * the names of the animations in the database to adjust their positions.
 * 
 * ---
 * 
 * <Head>
 * <Foot>
 * 
 * - Used for: Animation Name Tags
 * - Will set the animation to anchor on top of the sprite (if <Head> is used)
 *   or at the bottom of the sprite (if <Foot> is used).
 * 
 * ---
 * 
 * <Anchor X: x>
 * <Anchor Y: y>
 * 
 * <Anchor: x, y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation at a specific point within the sprite based on
 *   the 'x' and 'y' values.
 * - Replace 'x' and 'y' with numeric values representing their positions based
 *   on a rate where 0.0 is the furthest left/up (x, y respectively) to 1.0 for
 *   the furthest right/down (x, y respectively).
 * 
 * Examples:
 * 
 * <Anchor X: 0.4>
 * <Anchor Y: 0.8>
 * 
 * <Anchor: 0.2, 0.9>
 * 
 * ---
 * 
 * <Offset X: +x>
 * <Offset X: -x>
 * <Offset Y: +y>
 * <Offset Y: -y>
 * 
 * <Offset: +x, +y>
 * <Offset: -x, -y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation to be offset by an exact number of pixels.
 * - This does the same the editor does, except it lets you input values
 *   greater than 999 and lower than -999.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the animation's x and y coordinates by.
 * 
 * Examples:
 * 
 * <Offset X: +20>
 * <Offset Y: -50>
 * 
 * <Offset: +10, -30>
 * 
 * ---
 * 
 * <Mirror Offset X>
 * <No Mirror Offset X>
 * 
 * - Used for: Animation Name Tags
 * - If an animation is mirrored, you can choose to have the animation's Offset
 *   X value be mirrored, too (or not at all).
 * - If no name tag is discovered, this will use the setting found in the
 *   Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset X setting.
 * 
 * ---
 * 
 * <Rate: x>
 * 
 * - Used for: MV Animation Name Tags
 * - Allows you to adjust the update for this MV Animation.
 *   - Does NOT work with Effekseer animations.
 * - The lower the number, the faster.
 * - Replace 'x' with a number representing the animation update rate.
 *   - Default rate: 4.
 *   - Minimum rate: 1.
 *   - Maximum rate: 10.
 * 
 * ---
 *
 * === Quality of Life-Related Notetags ===
 *
 * By default, RPG Maker MZ does not offer an encounter step minimum after a
 * random encounter has finished. This means that one step immediately after
 * finishing a battle, the player can immediately enter another battle. The
 * Quality of Life improvement: Minimum Encounter Steps allows you to set a
 * buffer range between battles for the player to have some breathing room.
 *
 * ---
 *
 * <Minimum Encounter Steps: x>
 *
 * - Used for: Map Notetags
 * - Replace 'x' with the minimum number of steps before the player enters a
 *   random encounter on that map.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => Encounter Rate Min.
 *
 * ---
 *
 * Tile shadows are automatically added to certain tiles in the map editor.
 * These tile shadows may or may not fit some types of maps. You can turn them
 * on/off with the Quality of Life Plugin Parameters or you can override the
 * settings with the following notetags:
 *
 * ---
 *
 * <Show Tile Shadows>
 * <Hide Tile Shadows>
 *
 * - Used for: Map Notetags
 * - Use the respective notetag for the function you wish to achieve.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => No Tile Shadows.
 *
 * ---
 * 
 * <Scroll Lock X>
 * <Scroll Lock Y>
 * 
 * - Used for: Map Notetags
 * - Will prevent the map from being able to scroll left/right(x) or up/down(y)
 *   if these notetags are present.
 * - Useful for when maps are just slightly smaller than normal and the tiny
 *   scrolling is distracting.
 * - This will use the display nudge setting found in the Plugin Parameters.
 * - This setting will be disabled if the map is zoomed in.
 * 
 * ---
 * 
 * <Scroll Lock X: x>
 * <Scroll Lock Y: y>
 * 
 * - Used for: Map Notetags
 * - Will prevent the map from being able to scroll left/right(x) or up/down(y)
 *   if these notetags are present and will nudge the map camera slightly.
 * - Useful for when maps are just slightly smaller than normal and the tiny
 *   scrolling is distracting.
 * - Replace 'x' and 'y' with numbers between 0 and 1 to represent how much is
 *   being judged.
 *   - For example, for a 1280x720 resolution, a 27 tile wide map will benefit
 *     from a nudge of 0.15625. Play with these numbers to determine the best
 *     value for your maps.
 * - This setting will be disabled if the map is zoomed in.
 * 
 * ---
 *
 * === Basic, X, and S Parameters-Related Notetags ===
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * behaviors and give boosts to trait objects in a more controlled manner.
 *
 * ---
 *
 * <param Plus: +x>
 * <param Plus: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Rate: x%>
 * <param Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'param' value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Flat: +x>
 * <param Flat: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Max: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Sets max caps for the 'param' to be 'x'. If there are multiple max caps
 *   available to the unit, then the highest will be selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer to determine what the max cap should be.
 *
 * ---
 *
 * <xparam Plus: +x%>
 * <xparam Plus: -x%>
 *
 * <xparam Plus: +x.x>
 * <xparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Rate: x%>
 * <xparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'xparam' value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Flat: +x%>
 * <xparam Flat: -x%>
 *
 * <xparam Flat: +x.x>
 * <xparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <sparam Plus: +x%>
 * <sparam Plus: -x%>
 *
 * <sparam Plus: +x.x>
 * <sparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Rate: x%>
 * <sparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'sparam' value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Flat: +x%>
 * <sparam Flat: -x%>
 *
 * <sparam Flat: +x.x>
 * <sparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * === JavaScript Notetags: Basic, X, and S Parameters ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Basic, X, and S Parameters.
 *
 * ---
 *
 * <JS param Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' plus value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' rate value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' flat value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Max: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to determine what the max cap for 'param' should be. If there
 *   are multiple max caps available to the unit, then the highest is selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine the max cap for the
 *   desired parameter.
 *
 * ---
 *
 * <JS xparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' plus value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the X parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' rate value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the X parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Flat: code>
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' flat value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the X parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' plus value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the S parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' rate value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the S parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' flat value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the S parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 * 
 * === Battle Setting-Related Notetags ===
 * 
 * These tags will change the settings for battle regardless of how the battle
 * system is set up normally. Insert these tags in either the noteboxes of maps
 * or the names of troops for them to take effect. If both are present for a
 * specific battle, then priority goes to the setting found in the troop name.
 * 
 * ---
 * 
 * <FV>
 * <Front View>
 * <Battle View: FV>
 * <Battle View: Front View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to front view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/enemies/
 *   folder as they will used instead of the "sv_enemies" graphics.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <SV>
 * <Side View>
 * <Battle View: SV>
 * <Battle View: Side View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to side view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/sv_enemies/
 *   folder as they will used instead of the "enemies" graphics.
 * - Make sure your actors have "sv_actor" graphics attached to them.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <DTB>
 * <Battle System: DTB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the default battle system (DTB).
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <TPB Active>
 * <ATB Active>
 * <Battle System: TPB Active>
 * <Battle System: ATB Active>
 * 
 * <TPB Wait>
 * <ATB Wait>
 * <Battle System: TPB Wait>
 * <Battle System: ATB Wait>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the time progress battle system (TPB) or
 *   active turn battle system (ATB) if you have VisuMZ_2_BattleSystemATB
 *   installed for the game project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <BTB>
 * <Battle System: BTB>
 * 
 * <CTB>
 * <Battle System: CTB>
 * 
 * <ETB>
 * <Battle System: ETB>
 * 
 * <FTB>
 * <Battle System: FTB>
 * 
 * <OTB>
 * <Battle System: OTB>
 * 
 * <PTB>
 * <Battle System: PTB>
 * 
 * <STB>
 * <Battle System: STB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the respective battle system as long as you
 *   have those plugins installed in the current project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <Grid>
 * <Battle Grid>
 * 
 * <No Grid>
 * <No Battle Grid>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Requires VisuMZ_2_BattleGridSystem!
 * - Changes the battle system to utilize the Battle Grid System or not.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * - If none of these notetags or comment tags are found, refer to the default
 *   settings found in the Plugin Parameters.
 * 
 * ---
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
 * === Animation Commands ===
 * 
 * ---
 * 
 * Animation: Play at Coordinate
 * - Plays an animation on the screen at a specific x, y coordinate even if
 *   there is no sprite attached.
 * 
 *   Animation ID:
 *   - Plays this animation.
 * 
 *   Coordinates:
 * 
 *     X:
 *     Y:
 *     - X/Y coordinate used for the animation.
 *       You may use JavaScript code.
 * 
 *   Mirror Animation?:
 *   - Mirror the animation?
 * 
 *   Mute Animation?:
 *   - Mute the animation?
 * 
 * ---
 * 
 * === Audio Plugin Commands ===
 * 
 * ---
 * 
 * Audio: Change Current BGM Volume
 * - Changes the current BGM volume without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Volume:
 *   - Change the current BGM's volume to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 0 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pitch
 * - Changes the current BGM pitch without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pitch:
 *   - Change the current BGM's pitch to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 50 to 150.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pan
 * - Changes the current BGM pan without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pan:
 *   - Change the current BGM's pan to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from -100 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGM Volume
 * - Changes the current BGM volume without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Volume:
 *   - Change the current BGM's volume to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 0 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pitch
 * - Changes the current BGM pitch without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pitch:
 *   - Change the current BGM's pitch to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 50 to 150.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pan
 * - Changes the current BGM pan without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pan:
 *   - Change the current BGM's pan to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from -100 to 100.
 * 
 * ---
 * 
 * === Debug Plugin Commands ===
 * 
 * ---
 * 
 * Debug: Current Controller ID
 * - PLAY TEST ONLY.
 * - Shows current controller ID in debug console.
 * - If you press a key on the keyboard, this data will be erased.
 * - Also copies to computer clipboard if possible.
 * 
 * ---
 * 
 * === Export Plugin Commands ===
 * 
 * ---
 * 
 * Export: All Maps Text
 * - PLAY TEST ONLY. Exports all of the text from all maps,
 *   their events, event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: All Troops Text
 * - PLAY TEST ONLY. Exports all of the text from all troops,
 *   their event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: Current Map Text
 * - PLAY TEST ONLY. Exports all of the text on the current map,
 *   its events, the event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * Export: Current Troop Text
 * - PLAY TEST ONLY. Exports all of the text on the current troop,
 *   the troop's event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * === Game Plugin Commands ===
 * 
 * ---
 *
 * Game: Open URL
 * - Opens a website URL from the game.
 *
 *   URL:
 *   - Where do you want to take the player?
 *
 * ---
 * 
 * === Gold Plugin Commands ===
 * 
 * ---
 *
 * Gold: Gain/Lose
 * - Allows you to give/take more gold than the event editor limit.
 *
 *   Value:
 *   - How much gold should the player gain/lose?
 *   - Use negative values to remove gold.
 *
 * ---
 * 
 * === Map Plugin Commands ===
 * 
 * ---
 * 
 * Map: Once Parallel
 * - Plays a Common Event parallel to the event once without repeating itself
 *   when done.
 * - Map only!
 * 
 *   Common Event ID:
 *   - The ID of the parallel Common Event to play.
 *   - Does NOT repeat itself when finished.
 *   - When exiting map scene or changing maps, all Once Parallels are cleared.
 *   - Once Parallels are not retained upon reentering the scene or map.
 *   - Once Parallels are not stored in memory and cannot be saved.
 * 
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 * 
 * Picture: Coordinates Mode
 * - Play Test Mode only! Gets the coordinates of a specific picture as you
 *   move it across the screen.
 * 
 *   Picture ID: 
 *   - The ID of the pictures to track the coordinates of.
 * 
 * ---
 *
 * Picture: Easing Type
 * - Changes the easing type to a number of options.
 *
 *   Picture ID:
 *   - Which picture do you wish to apply this easing to?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 *   Instructions:
 *   - Insert this Plugin Command after a "Move Picture" event command.
 *   - Turn off "Wait for Completion" in the "Move Picture" event.
 *   - You may have to add in your own "Wait" event command after.
 *
 * ---
 * 
 * Picture: Erase All
 * - Erases all pictures on the screen because it's extremely tedious to do it
 *   one by one.
 * 
 * ---
 * 
 * Picture: Erase Range
 * - Erases all pictures within a range of numbers because it's extremely
 *   tedious to do it one by one.
 * 
 *   Starting ID:
 *   - The starting ID of the pictures to erase.
 * 
 *   Ending ID:
 *   - The ending ID of the pictures to erase.
 * 
 * ---
 * 
 * Picture: Rotate by Angle
 * - Rotates target picture by a amount angle over a set duration instead of
 *   continuously.
 * 
 *   Picture ID Number:
 *   - What is the ID of the picture you wish to rotate?
 *   - Use a number between 1 and 100.
 *   - You may use JavaScript code.
 * 
 *   Adjust Angle:
 *   - What is the angle you wish to rotate the picture by?
 *   - Use degrees (360 degrees per full rotation).
 *   - You may use JavaScript code.
 * 
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 * 
 *   Duration:
 *   - Duration of rotation effect in frames.
 *   - 60 frames = 1 second.
 *   - You may use JavaScript code.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * Picture: Rotate to Angle
 * - Rotates target picture to a certain angle over a set duration
 *   instead of continuously.
 * 
 *   Picture ID Number:
 *   - What is the ID of the picture you wish to rotate?
 *   - Use a number between 1 and 100.
 *   - You may use JavaScript code.
 * 
 *   Target Angle:
 *   - What is the target angle you wish to rotate the picture?
 *   - Use degrees (360 degrees per full rotation).
 *   - You may use JavaScript code.
 * 
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 * 
 *   Duration:
 *   - Duration of rotation effect in frames.
 *   - 60 frames = 1 second.
 *   - You may use JavaScript code.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * Picture: Show Icon
 * - Shows an icon instead of a picture image.
 * - The picture icon can be controlled like any other picture.
 * 
 *   General:
 *
 *     Picture ID Number:
 *     - What is the ID of the picture you wish to show at?
 *     - Use a number between 1 and 100.
 *     - You may use JavaScript code.
 *
 *     Icon Index:
 *     - Select the icon index to use for this picture.
 *     - You may use JavaScript code.
 *
 *     Smooth Icon?:
 *     - This will make the icon smoothed out or pixelated.
 * 
 *   Picture Settings:
 * 
 *     Position:
 *
 *       Origin:
 *       - What is the origin of this picture icon?
 *         - Upper Left
 *         - Center
 *
 *       Position X:
 *       - X coordinate of the picture.
 *       - You may use JavaScript code.
 *
 *       Position Y:
 *       - Y coordinate of the picture.
 *       - You may use JavaScript code.
 * 
 *     Scale:
 *
 *       Width %:
 *       - Horizontal scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 *
 *       Height %:
 *       - Vertical scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 * 
 *     Blend:
 *
 *       Opacity:
 *       - Insert a number to determine opacity level.
 *       - Use a number between 0 and 255.
 *       - You may use JavaScript code.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the picture?
 * 
 * ---
 * 
 * === Screen Shake Plugin Commands ===
 * 
 * ---
 * 
 * Screen Shake: Custom:
 * - Creates a custom screen shake effect and also sets the following uses of
 *   screen shake to this style.
 * 
 *   Shake Style:
 *   - Select shake style type.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   Power:
 *   - Power level for screen shake.
 * 
 *   Speed:
 *   - Speed level for screen shake.
 * 
 *   Duration:
 *   - Duration of screenshake.
 *   - You can use code as well.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * === Switch Plugin Commands ===
 * 
 * ---
 * 
 * Switches: Randomize ID(s)
 * - Select specific Switch ID's to randomize ON/OFF.
 * 
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 * 
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 * 
 * ---
 *
 * Switches: Randomize Range
 * - Select specific Switch ID Range to randomize ON/OFF.
 * - The ratio determines the ON/OFF distribution.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 *
 * ---
 *
 * Switches: Toggle ID(s)
 * - Select specific Switch ID's to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 *
 * ---
 *
 * Switches: Toggle Range
 * - Select specific Switch ID Range to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Battle System Change
 * - Switch to a different battle system in-game.
 * - Some battle systems REQUIRE their specific plugins!
 *
 *   Change To:
 *   - Choose which battle system to switch to.
 *     - Database Default (Use game database setting)
 *     - -
 *     - DTB: Default Turn Battle
 *     - TPB Active: Time Progress Battle (Active)
 *     - TPB Wait: Time Progress Battle (Wait)
 *     - -
 *     - BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *     - CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *     - OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *     - STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 *
 * ---
 * 
 * System: Load Images
 * - Allows you to (pre) load up images ahead of time.
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory?
 * 
 * ---
 *
 * System: Main Font Size
 * - Set the game's main font size.
 *
 *   Change To:
 *   - Change the font size to this number.
 *
 * ---
 *
 * System: Side View Battle
 * - Switch between Front View or Side View for battle.
 *
 *   Change To:
 *   - Choose which view type to switch to.
 *
 * ---
 *
 * System: Window Padding
 * - Change the game's window padding amount.
 *
 *   Change To:
 *   - Change the game's standard window padding to this value.
 *
 * ---
 * 
 * === Text Popup Command ===
 * 
 * ---
 * 
 * Text Popup: Show Text
 * - Adds text to a text popup window to briefly appear.
 * - Multiple text popups will be queued.
 * - Does not halt the game and works parallel to game activity.
 * 
 *   Text:
 *   - Write the text that you want to appear here.
 *   - You may use text codes.
 * 
 * ---
 * 
 * === Variable Plugin Commands ===
 * 
 * ---
 * 
 * Variable: JS Eval
 * - Pick a variable ID and value to alter through JS.
 * - Allows one line of code for variable ID and operand.
 * - Functions like RM2k3's Variable Pointers.
 * 
 *   Variable ID:
 *   - This is the target variable to alter.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 *   Operation Type:
 *   - What operation do you wish to use for this Plugin Command?
 * 
 *   Operand Modifier:
 *   - Value to be used in calculating the target variable.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 * ---
 * 
 * Variable: JS Block
 * - Pick a variable ID and value to alter through JS.
 * - Allows JS block code for variable ID and operand.
 * - Functions like RM2k3's Variable Pointers.
 * 
 *   Variable ID:
 *   - This is the target variable to alter.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 *   Operation Type:
 *   - What operation do you wish to use for this Plugin Command?
 * 
 *   Operand Modifier:
 *   - Value to be used in calculating the target variable.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quality of Life Settings
 * ============================================================================
 *
 * A variety of (optional) settings and changes are added with the Core Engine
 * to improve the quality of life for both the game devs and players alike.
 *
 * ---
 *
 * Play Test
 * 
 *   New Game on Boot:
 *   - Automatically start a new game on Play Test?
 *   - Only enabled during Play Test.
 *
 *   No Play Test Mode:
 *   - Force the game to be out of Play Test mode when play testing.
 * 
 *   Open Console on Boot:
 *   - Open the Debug Console upon booting up your game?
 *   - Only enabled during Play Test.
 *
 *   F6: Toggle Sound:
 *   - F6 Key Function: Turn on all sound to 100% or to 0%, toggling between
 *     the two.
 *   - Only enabled during Play Test.
 *
 *   F7: Toggle Fast Mode:
 *   - F7 Key Function: Toggle fast mode.
 *   - Only enabled during Play Test.
 * 
 *   CTRL + n: Quick Load:
 *   - CTRL + a number from 1 to 9 will yield a quick load of that safe file.
 *   - Does not count auto saves.
 *
 *   New Game > Common Event:
 *   - Runs a common event each time a new game is started.
 *   - Only enabled during Play Test.
 *
 * ---
 * 
 * Battle Test
 * 
 *   Add Item Type:
 *   Add Weapon Type:
 *   Add Armor Type:
 *   - Add copies of each database item, weapon, and/or armor?
 *   - Effective only during battle test.
 * 
 *   Added Quantity:
 *   - Determines how many items are added during a battle test instead of
 *     the maximum amount.
 * 
 *   Shift+R: Recover All:
 *   - For Play Test only!
 *   - During battle, pressing SHIFT + R will refill the whole party's HP
 *     and MP and status.
 * 
 *   Shift+T: Full TP
 *   - For Play Test only! 
 *   - During battle, pressing SHIFT + T will refill the whole party's TP.
 * 
 * ---
 *
 * Digit Grouping
 *
 *   Standard Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for standard text
 *     inside windows?
 *
 *   Ex Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for ex text,
 *     written through drawTextEx (like messages)?
 *
 *   Damage Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for in-battle
 *     damage sprites?
 *
 *   Gauge Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for visible gauge
 *     sprites such as HP, MP, and TP gauges?
 * 
 *   Country/Locale
 *   - Base the digit grouping on which country/locale?
 *   - This will follow all of the digit grouping rules found here:
 *     https://www.w3schools.com/JSREF/jsref_tolocalestring_number.asp
 *
 * ---
 *
 * Player Benefit
 *
 *   Encounter Rate Min:
 *   - Minimum number of steps the player can take without any
 *     random encounters.
 *
 *   Escape Always:
 *   - If the player wants to escape a battle, let them escape the battle
 *     with 100% chance.
 *
 *   Accuracy Formula:
 *   - Accuracy formula calculation change to
 *     Skill Hit% * (User HIT - Target EVA) for better results.
 *
 *   Accuracy Boost:
 *   - Boost HIT and EVA rates in favor of the player.
 *
 *   Level Up -> Full HP:
 *   Level Up -> Full MP:
 *   - Recovers full HP or MP when an actor levels up.
 *
 * ---
 * 
 * Picture-Related
 * 
 *   Anti-Zoom Pictures:
 *   - If on, prevents pictures from being affected by zoom.
 * 
 *   Picture Containers > Detach in Battle:
 *   - If detached, picture container will be separated from the spriteset
 *     while on the battle scene.
 *   - This will prevent any visual effects that alter the entire spriteset
 *     from affecting the detached picture container.
 * 
 *   Picture Containers > Detach in Map:
 *   - If detached, picture container will be separated from the spriteset
 *     while on the map scene.
 *   - This will prevent any visual effects that alter the entire spriteset
 *     from affecting the detached picture container.
 * 
 * ---
 *
 * Misc
 * 
 *   Animation: Mirror Offset X:
 *   - When animations are mirrored, mirror their Offset X values, too.
 *   - The animation name tags <Mirror Offset X> and <No Mirror Offset X> will
 *     override this effect for that specific animation.
 *
 *   Font Shadows:
 *   - If on, text uses shadows instead of outlines.
 *
 *   Font Smoothing:
 *   - If on, smoothes fonts shown in-game.
 * 
 *   Font Width Fix:
 *   - Fixes the font width issue with instant display non-monospaced fonts
 *     in the Message Window.
 *
 *   Key Item Protection:
 *   - If on, prevents Key Items from being able to be sold and from being
 *     able to be consumed.
 * 
 *   Map Name Text Code:
 *   - If on, map names will use text codes.
 *   - If off, only the raw map name will be used.
 *
 *   Modern Controls:
 *   - If on, allows usage of the Home/End buttons.
 *   - Home would scroll to the first item on a list.
 *   - End would scroll to the last item on a list.
 *   - Shift + Up would page up.
 *   - Shift + Down would page down.
 *
 *   MV Animation Rate:
 *   - Adjusts the rate at which MV animations play.
 *   - Default: 4.
 *   - Lower for faster.
 *   - Higher for slower.
 * 
 *   NewGame > CommonEvent:
 *   - Runs a common event each time a new game during any session is started.
 *   - Applies to all types of sessions, play test or not.
 *
 *   No Tile Shadows:
 *   - Removes tile shadows from being displayed in-game.
 *
 *   Pixel Image Rendering:
 *   - If on, pixelates the image rendering (for pixel games).
 *
 *   Require Focus?
 *   - Requires the game to be focused? If the game isn't focused, it will
 *     pause if it's not the active window.
 * 
 *   Shortcut Scripts:
 *   - Enables shortcut-based script variables and functions that can be used
 *     for script calls.
 *   - Shortcut list enabled for this is as follows:
 * 
 *     $commonEvent(id)
 *     - Queues a common event.
 *     - This does not interrupt the current event to run the desired common
 *       event. Any queued common events will run after the current event list
 *       has finished.
 *     - Replace 'id' with the ID of the common event you wish to queue.
 *     - Common events only run in the map scene and battle scene.
 * 
 *     $onceParallel(id)
 *     - Runs a common event in the background as a once parallel event.
 *     - Once parallel events will run in the background like a parallel
 *       process, except that it does not repeat after finishing.
 *     - Replace 'id' with the ID of the common event you wish to run.
 *     - Only works in the map scene and battle scene. Battle scene usage will
 *       require VisuMZ_1_BattleCore.
 * 
 *     $scene
 *     - Returns current scene.
 * 
 *     $spriteset
 *     - Returns current scene's spriteset if there is one.
 * 
 *     $subject
 *     - Returns last recorded identity of the battle's subject/user.
 * 
 *     $targets
 *     - Returns last recorded targets marked in battle.
 * 
 *     $target
 *     - Returns last recorded target marked in battle.
 *     - Works better with VisuMZ_1_BattleCore.
 * 
 *     $event
 *     - Returns currently initiated map event.
 *
 *   Smart Event Collision:
 *   - Makes events only able to collide with one another if they're
 *    'Same as characters' priority.
 * 
 *   Subfolder Name Purge:
 *   - Purge subfolder name from Plugin Parameters when reading data to let
 *     Plugin Commands work properly.
 *   - This is for plugins (such as the VisuMZ library) that utilize dynamic
 *     name registrations for Plugin Commands. Turn this on if you plan on
 *     using subfolders with VisuMZ plugins.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle System
 * ============================================================================
 * 
 * Choose which battle system to use for your game.
 * 
 * Some battle systems REQUIRE their specific plugins! This means if you do not
 * have the required battle system plugin installed, it will not change over.
 * The Core Engine plugin does not contain data for all of the battle systems
 * inside its code.
 * 
 * ---
 * 
 *   Database Default (Use game database setting)
 * 
 *   -
 * 
 *   DTB: Default Turn Battle
 *   TPB Active: Time Progress Battle (Active)
 *   TPB Wait: Time Progress Battle (Wait)
 * 
 *   -
 * 
 *   BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *   CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *   ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 *   FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 *   OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *   PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 *   STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * 
 *   -
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Color Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to have more control over which
 * colors appear for what conditions found in the game. You can use regular
 * numbers to use the colors predetermined by the game's Window Skin or you
 * can use the #rrggbb format for a hex color code.
 * 
 * If the game's Window Skin is changed mid-game, the colors used will still be
 * based off the default Window Skin's colors. This is due to storing them in a
 * cache and preventing extra processing and reduces lag.
 *
 * You can find out what hex codes belong to which color from this website:
 * https://htmlcolorcodes.com/
 *
 * ---
 *
 * Basic Colors
 * - These are colors that almost never change and are used globally throughout
 *   the in-game engine.
 *
 *   Normal:
 *   System:
 *   Crisis:
 *   Death:
 *   Gauge Back:
 *   HP Gauge:
 *   MP Gauge:
 *   MP Cost:
 *   Power Up:
 *   Power Down:
 *   CT Gauge:
 *   TP Gauge:
 *   Pending Color:
 *   EXP Gauge:
 *   MaxLv Gauge:
 *   - Use #rrggbb for custom colors or regular numbers
 *   for text colors from the Window Skin.
 *
 * ---
 *
 * Alpha Colors:
 * - These are colors that have a bit of transparency to them and are specified
 *   by the 'rgba(red, green, blue, alpha)' format.
 * - Replace 'red' with a number between 0-255 (integer).
 * - Replace 'green' with a number between 0-255 (integer).
 * - Replace 'blue' with a number between 0-255 (integer).
 * - Replace 'alpha' with a number between 0 and 1 (decimal).
 * 
 *   Window Font Outline:
 *   Gauge Number Outline:
 *   Dim Color:
 *   Item Back Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Conditional Colors:
 * - These require a bit of JavaScript knowledge. These determine what colors
 *   to use under which situations and uses such as different values of HP, MP,
 *   TP, for comparing equipment, and determine damage popup colors.
 * 
 *   JS: Actor HP Color:
 *   JS: Actor MP Color:
 *   JS: Actor TP Color:
 *   - Code used for determining what HP, MP, or TP color to use for actors.
 *
 *   JS: Parameter Change:
 *   - Code used for determining whatcolor to use for parameter changes.
 *
 *   JS: Damage Colors:
 *   - Code used for determining what color to use for damage types.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gold Settings
 * ============================================================================
 *
 * Gold is the main currency in RPG Maker MZ. The settings provided here will
 * determine how Gold appears in the game and certain behaviors Gold has.
 *
 * ---
 *
 * Gold Settings
 *
 *   Gold Max:
 *   - Maximum amount of Gold the party can hold.
 *   - Default 99999999
 *
 *   Gold Font Size:
 *   - Font size used for displaying Gold inside Gold Windows.
 *   - Default: 26
 *
 *   Gold Icon:
 *   - Icon used to represent Gold.
 *   - Use 0 for no icon.
 *
 *   Gold Overlap:
 *   - Text used too much Gold to fit in the window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Image Loading
 * ============================================================================
 *
 * Not all images are loaded at once in-game. RPG Maker MZ uses asynchronous
 * loading which means images are loaded when needed. This may cause delays in
 * when you want certain images to appear. However, if an image is loaded
 * beforehand, they can be used immediately provided they aren't removed from
 * the image cache.
 *
 * ---
 *
 * Image Loading
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory upon starting
 *     up the game?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Keyboard Input Settings
 * ============================================================================
 *
 * Settings for the game that utilize keyboard input. These are primarily for
 * the name input scene (Scene_Name) and the number input event command. These
 * settings have only been tested on English keyboards and may or may not be
 * compatible with other languages, so please disable these features if they do
 * not fit in with your game.
 * 
 * If a controller is connected upon entering the name change scene, it will
 * use the default manual-entry mode instead of the keyboard-entry mode. If a
 * controller button is pressed during the keyboard-entry mode, it will
 * automatically switch to the manual-entry mode.
 * 
 * This plugin does not provide support for controllers that are undetected by
 * RPG Maker MZ's default controller support.
 *
 * ---
 * 
 * Controls
 * 
 *   WASD Movement:
 *   - Enables or disables WASD movement for your game project.
 *   - Moves the W page down button to E.
 * 
 *   R Button: Dash Toggle:
 *   - Enables or disables R button as an Always Dash option toggle.
 * 
 * ---
 *
 * Name Input
 * 
 *   Enable?:
 *   - Enables keyboard input for name entry.
 *   - Only tested with English keyboards.
 * 
 *   Default Mode:
 *   - Select default mode when entering the scene.
 *     - Default - Uses Arrow Keys to select letters.
 *     - Keyboard - Uses Keyboard to type in letters.
 * 
 *   QWERTY Layout:
 *   - Uses the QWERTY layout for manual entry.
 * 
 *   Keyboard Message:
 *   - The message displayed when allowing keyboard entry.
 *   - You may use text codes here.
 * 
 *   Banned Words:
 *   - Players cannot use these words for names.
 *   - These include words inside the names.
 *   - If a banned word is used, a buzzer sound will play.
 *
 * ---
 *
 * Number Input
 * 
 *   Enable?:
 *   - Enables keyboard input for number entry.
 *   - Only tested with English keyboards.
 *
 * ---
 * 
 * Button Assist
 * 
 *   Finish Entry:
 *   - Text used to describe finish entry.
 * 
 *   Page Change:
 *   - Text used to describe character page changing.
 * 
 *   Switch to Keyboard:
 *   - Text used to describe the keyboard switch.
 * 
 *   Switch To Manual:
 *   - Text used to describe the manual entry switch.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Background Settings
 * ============================================================================
 *
 * These settings in the Plugin Parameters allow you to adjust the background
 * images used for each of the scenes. The images will be taken from the game
 * project folders img/titles1/ and img/titles2/ to load into the game.
 *
 * These settings are only available to scenes found within the Main Menu, the
 * Shop scene, and the Actor Naming scene.
 *
 * ---
 *
 * Menu Background Settings:
 * 
 *   Blur Strength:
 *   - Strength used for menu background snapshots.
 *   - Default: 8. Higher is stronger. Lower is weaker.
 *
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Individual background settings for the scene.
 *
 *   Scene_Unlisted
 *   - Individual background settings for any scenes that aren't listed above.
 *
 * ---
 *
 * Background Settings
 *
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 *
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Button Assist Window
 * ============================================================================
 *
 * In most modern RPG's, there exist small windows on the screen which tell the
 * player what the control schemes are for that scene. This plugin gives you
 * the option to add that window to the menu scenes in the form of a Button
 * Assist Window.
 *
 * ---
 *
 * General
 * 
 *   Enable:
 *   - Enable the Menu Button Assist Window.
 * 
 *   Location:
 *   - Determine the location of the Button Assist Window.
 *   - Requires Plugin Parameters => UI => Side Buttons ON.
 *
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   Split "Escape":
 *   - Used ONLY for those making their own custom keyboard key input maps.
 *   - "Split" option makes separate instances of "Cancel" and "Menu" keys.
 *   - "Don't" option will consolidate both into "Escape" keys.
 *
 * ---
 *
 * Text
 * 
 *   Text Format:
 *   - Format on how the buttons are displayed.
 *   - Text codes allowed. %1 - Key, %2 - Text
 * 
 *   Multi-Key Format:
 *   - Format for actions with multiple keys.
 *   - Text codes allowed. %1 - Key 1, %2 - Key 2
 * 
 *   OK Text:
 *   Cancel Text:
 *   Switch Actor Text:
 *   - Default text used to display these various actions.
 *
 * ---
 *
 * Keys
 * 
 *   Key: Unlisted Format:
 *   - If a key is not listed below, use this format.
 *   - Text codes allowed. %1 - Key
 * 
 *   Key: Up:
 *   Key: Down:
 *   Key: Left:
 *   Key: Right:
 *   Key: Shift:
 *   Key: Tab:
 *   Key: A through Z:
 *   - How this key is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Controller Button Assist Settings
 * ============================================================================
 *
 * These are sub-settings for the Button Assist Window Plugin Parameters. Where
 * the Button Assist Window Plugin Parameters are focused on keyboard entries,
 * these sections are focused on gamepad controllers.
 * 
 * Add multiple gamepads to the list to give them different button assist text.
 * If a gamepad is being used but not listed here, the button assist text will
 * default to the keyboard version.
 * 
 * For those looking for more information regarding controllers, visit this
 * site: https://gamepad-tester.com/
 *
 * ---
 *
 * ID Information
 * 
 *   Controller ID Name:
 *   - Exact string used for this controller ID.
 *   - Plugin Command "Debug: Current Controller ID" for ID help.
 *   - Example: Xbox 360 Controller (XInput STANDARD GAMEPAD)
 * 
 *   Similarity Match:
 *   - Partial string used to check for controller ID.
 *   - Plugin Command "Debug: Current Controller ID" for ID help.
 *   - This check occurs secondary to the exact name.
 *   - Example: Xbox
 *
 * ---
 *
 * Directions
 * 
 *   Up:
 *   Left:
 *   Right:
 *   Down:
 *   - How this button is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * Actions
 * 
 *   OK:
 *   Cancel:
 *   Menu:
 *   Shift:
 *   Page Up:
 *   Page Down:
 *   - How this button is shown in-game.
 *   - Text codes allowed.
 *   - *NOTE*: Controllers use a different mapping scheme from keyboards.
 *     - The "cancel" button is separate from the "menu" button though, for the
 *       majority of the button assist window help text, we'll be referring to
 *       the cancel button usually.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Layout Settings
 * ============================================================================
 *
 * These settings allow you to rearrange the positions of the scenes accessible
 * from the Main Menu, the Shop scene, and the Actor Naming scene. This will
 * require you to have some JavaScript knowledge to make the windows work the
 * way you would like.
 *
 * ---
 *
 * Menu Layout Settings
 *
 *   Scene_Title:
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Various options on adjusting the selected scene.
 *
 * ---
 *
 * Scene Window Settings
 *
 *   Background Type:
 *   - Selects the background type for the selected window.
 *   - Window
 *   - Dim
 *   - Transparent
 *
 *   JS: X, Y, W, H
 *   - Code used to determine the dimensions for the selected window.
 *
 * ---
 *
 * Scene_Title Settings
 * - The following are settings unique to Scene_Title.
 *
 * Title Screen
 *
 *   Document Title Format:
 *   - Format to display text in document title.
 *   - %1 - Main Title, %2 - Subtitle, %3 - Version
 *
 *   Subtitle:
 *   - Subtitle to be displayed under the title name.
 *   
 *   Version:
 *   - Version to be display in the title screen corner.
 *   
 *   JS: Draw Title:
 *   - Code used to draw the game title.
 *   
 *   JS: Draw Subtitle:
 *   - Code used to draw the game subtitle.
 *   
 *   JS: Draw Version:
 *   - Code used to draw the game version.
 *   
 *   Button Fade Speed:
 *   - Speed at which the buttons fade in at (1-255).
 *
 * ---
 *
 * Scene_GameEnd Settings
 * - The following are settings unique to Scene_GameEnd.
 *   
 *   Command Window List:
 *   - Window commands used by the title screen.
 *   - Add new commands here.
 *
 * ---
 *
 * Command Window List
 * - This is found under Scene_Title and Scene_GameEnd settings.
 *
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 * 
 * ---
 *
 * Title Picture Buttons:
 * - This is found under Scene_Title settings.
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 *
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 *
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 *
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 *
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Parameter Settings
 * ============================================================================
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * their behaviors and give boosts to trait objects in a controlled manner.
 *
 * ---
 *
 * Parameter Settings
 *
 *   Displayed Parameters
 *   - A list of the parameters that will be displayed in-game.
 *   - Shown in the Equip Menu.
 *   - Shown in the Status Menu.
 *
 *   Extended Parameters
 *   - The list shown in extended scenes (for other VisuStella plugins).
 *
 * ---
 *
 * === Basic Parameters ===
 *
 * MHP - MaxHP
 * - This is the maximum health points value. The amount of health points (HP)
 * a battler has determines whether or not the battler is in a living state or
 * a dead state. If the HP value is above 0, then the battler is living. If it
 * is 0 or below, the battler is in a dead state unless the battler has a way
 * to counteract death (usually through immortality). When the battler takes
 * damage, it is usually dealt to the HP value and reduces it. If the battler
 * is healed, then the HP value is increased. The MaxHP value determines what's
 * the maximum amount the HP value can be held at, meaning the battler cannot
 * be healed past that point.
 *
 * MMP - MaxMP
 * - This is the maximum magic points value. Magic points (MP) are typically
 * used for the cost of skills and spells in battle. If the battler has enough
 * MP to fit the cost of the said skill, the battler is able to use the said
 * skill provided that all of the skill's other conditions are met. If not, the
 * battler is then unable to use the skill. Upon using a skill that costs MP,
 * the battler's MP is reduced. However, the battler's MP can be recovered and
 * results in a gain of MP. The MaxMP value determines what is the maximum
 * amount the MP value can be held at, meaning the battler cannot recover MP
 * past the MaxMP value.
 *
 * ATK - Attack
 * - This is the attack value of the battler. By default, this stat is used for
 * the purpose of damage calculations only, and is typically used to represent
 * the battler's physical attack power. Given normal damage formulas, higher
 * values mean higher damage output for physical attacks.
 *
 * DEF - Defense
 * - This is the defense value of the battler. By default, this stat is used
 * for the purpose of damage calculations only, and is typically used to
 * represent the battler's physical defense. Given normal damage formulas,
 * higher values mean less damage received from physical attacks.
 *
 * MAT - Magic Attack
 * - This is the magic attack value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical attack power. Given normal damage formulas,
 * higher values mean higher damage output for magical attacks.
 *
 * MDF - Magic Defense
 * - This is the magic defense value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical defense. Given normal damage formulas,
 * higher values mean less damage received from magical attacks.
 *
 * AGI - Agility
 * - This is the agility value of the battler. By default, this stat is used to
 * determine battler's position in the battle turn's order. Given a normal turn
 * calculation formula, the higher the value, the faster the battler is, and
 * the more likely the battler will have its turn earlier in a turn.
 *
 * LUK - Luck
 * - This is the luck value of the battler. By default, this stat is used to
 * affect the success rate of states, buffs, and debuffs applied by the battler
 * and received by the battler. If the user has a higher LUK value, the state,
 * buff, or debuff is more likely to succeed. If the target has a higher LUK
 * value, then the state, buff, or debuff is less likely to succeed.
 *
 * ---
 *
 * Basic Parameters
 * 
 *   Show Actor Level?:
 *   - Show the actor level when displaying actors?
 *   - Affects for most windows in-game.
 *
 *   HP Crisis Rate:
 *   - HP Ratio at which a battler can be considered in crisis mode.
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 8 basic parameters:
 *   - MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 *
 * Parameter Caps:
 *
 *   MaxHP Cap:
 *   MaxMP Cap:
 *   ATK Cap:
 *   DEF Cap:
 *   MAT Cap:
 *   MDF Cap:
 *   AGI Cap:
 *   LUK Cap:
 *   - Formula used to determine the selected parameter's cap.
 *   - These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 *
 * ---
 *
 * === X Parameters ===
 *
 * HIT - Hit Rate%
 * - This determines the physical hit success rate of the any physical action.
 * All physical attacks make a check through the HIT rate to see if the attack
 * will connect. If the HIT value passes the randomizer check, the attack will
 * connect. If the HIT value fails to pass the randomizer check, the attack
 * will be considered a MISS.
 *
 * EVA - Evasion Rate%
 * - This determines the physical evasion rate against any incoming physical
 * actions. If the HIT value passes, the action is then passed to the EVA check
 * through a randomizer check. If the randomizer check passes, the physical
 * attack is evaded and will fail to connect. If the randomizer check passes,
 * the attempt to evade the action will fail and the action connects.
 *
 * CRI - Critical Hit Rate%
 * - Any actions that enable Critical Hits will make a randomizer check with
 * this number. If the randomizer check passes, extra damage will be carried
 * out by the initiated action. If the randomizer check fails, no extra damage
 * will be added upon the action.
 *
 * CEV - Critical Evasion Rate%
 * - This value is put against the Critical Hit Rate% in a multiplicative rate.
 * If the Critical Hit Rate is 90% and the Critical Evasion Rate is
 * 20%, then the randomizer check will make a check against 72% as the values
 * are calculated by the source code as CRI * (1 - CEV), therefore, with values
 * as 0.90 * (1 - 0.20) === 0.72.
 *
 * MEV - Magic Evasion Rate%
 * - Where EVA is the evasion rate against physical actions, MEV is the evasion
 * rate against magical actions. As there is not magical version of HIT, the
 * MEV value will always be bit against when a magical action is initiated. If
 * the randomizer check passes for MEV, the magical action will not connect. If
 * the randomizer check fails for MEV, the magical action will connect.
 *
 * MRF - Magic Reflect Rate%
 * - If a magical action connects and passes, there is a chance the magical
 * action can be bounced back to the caster. That chance is the Magic Reflect
 * Rate. If the randomizer check for the Magic Reflect Rate passes, then the
 * magical action is bounced back to the caster, ignoring the caster's Magic
 * Evasion Rate. If the randomizer check for the Magic Reflect Rate fails, then
 * the magical action will connect with its target.
 *
 * CNT - Counter Attack Rate%
 * - If a physical action connects and passes, there is a chance the physical
 * action can be avoided and a counter attack made by the user will land on the
 * attacking unit. This is the Counter Attack Rate. If the randomizer check for
 * the Counter Attack Rate passes, the physical action is evaded and the target
 * will counter attack the user. If the randomizer check fails, the physical
 * action will connect to the target.
 *
 * HRG - HP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxHP as gained HP with a 100% success rate.
 *
 * MRG - MP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxMP as gained MP with a 100% success rate.
 *
 * TRG - TP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxTP as gained TP with a 100% success rate.
 *
 * ---
 *
 * X Parameters
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 10 X parameters:
 *   - HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 *
 * Vocabulary
 *
 *   HIT:
 *   EVA:
 *   CRI:
 *   CEV:
 *   MEV:
 *   MRF:
 *   CNT:
 *   HRG:
 *   MRG:
 *   TRG:
 *   - In-game vocabulary used for the selected X Parameter.
 *
 * ---
 *
 * === S Parameters ===
 *
 * TGR - Target Rate
 * - Against the standard enemy, the Target Rate value determines the odds of
 * an enemy specifically targeting the user for a single target attack. At 0%,
 * the enemy will almost never target the user. At 100%, it will have normal
 * targeting opportunity. At 100%+, the user will have an increased chance of
 * being targeted.
 * *NOTE: For those using the Battle A.I. Core, any actions that have specific
 * target conditions will bypass the TGR rate.
 *
 * GRD - Guard Effect
 * - This is the effectiveness of guarding. This affects the guard divisor
 * value of 2. At 100% GRD, damage will become 'damage / (2 * 1.00)'. At 50%
 * GRD, damage will become 'damage / (2 * 0.50)'. At 200% GRD, damage will
 * become 'damage / (2 * 2.00)' and so forth.
 *
 * REC - Recovery Effect
 * - This is how effective heals are towards the user. The higher the REC rate,
 * the more the user is healed. If a spell were to heal for 100 and the user
 * has 300% REC, then the user is healed for 300 instead.
 *
 * PHA - Pharmacology
 * - This is how effective items are when used by the user. The higher the PHA
 * rate, the more effective the item effect. If the user is using a Potion that
 * recovers 100% on a target ally and the user has 300% PHA, then the target
 * ally will receive healing for 300 instead.
 *
 * MCR - MP Cost Rate
 * - This rate affects how much MP skills with an MP Cost will require to use.
 * If the user has 100% MCR, then the MP Cost will be standard. If the user has
 * 50% MCR, then all skills that cost MP will cost only half the required MP.
 * If the user has 200% MCR, then all skills will cost 200% their MP cost.
 *
 * TCR - TP Charge Rate
 * - This rate affects how much TP skills with an TP will charge when gaining
 * TP through various actions. At 100%, TP will charge normally. At 50%, TP
 * will charge at half speed. At 200%, TP will charge twice as fast.
 *
 * PDR - Physical Damage Rate
 * - This rate affects how much damage the user will take from physical damage.
 * If the user has 100% PDR, then the user takes the normal amount. If the user
 * has 50% PDR, then all physical damage dealt to the user is halved. If the
 * user has 200% PDR, then all physical damage dealt to the user is doubled.
 *
 * MDR - Magical Damage Rate
 * - This rate affects how much damage the user will take from magical damage.
 * If the user has 100% MDR, then the user takes the normal amount. If the user
 * has 50% MDR, then all magical damage dealt to the user is halved. If the
 * user has 200% MDR, then all magical damage dealt to the user is doubled.
 *
 * FDR - Floor Damage Rate
 * - On the field map, this alters how much damage the user will take when the
 * player walks over a tile that damages the party. The FDR value only affects
 * the damage dealt to the particular actor and not the whole party. If FDR is
 * at 100%, then the user takes the full damage. If FDR is at 50%, then only
 * half of the damage goes through. If FDR is at 200%, then floor damage is
 * doubled for that actor.
 *
 * EXR - Experience Rate
 * - This determines the amount of experience gain the user whenever the user
 * gains any kind of EXP. At 100% EXR, the rate of experience gain is normal.
 * At 50%, the experience gain is halved. At 200%, the experience gain for the
 * user is doubled.
 *
 * ---
 *
 * S Parameters
 *
 *   JS: Formula
 *   - Formula used to determine the total value all 10 S parameters:
 *   - TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 *
 * Vocabulary
 *
 *   TGR:
 *   GRD:
 *   REC:
 *   PHA:
 *   MCR:
 *   TCR:
 *   PDR:
 *   MDR:
 *   FDR:
 *   EXR:
 *   - In-game vocabulary used for the selected S Parameter.
 *
 * ---
 *
 * Icons
 * 
 *   Draw Icons?
 *   - Draw icons next to parameter names?
 *
 *   MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK:
 *   HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG:
 *   TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR:
 *   - Icon used for the selected parameter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Parameters Settings
 * ============================================================================
 *
 * As of version 1.07, you can add Custom Parameters to your game if RPG Maker
 * MZ's default set of parameters isn't enough for you. These parameters can
 * have variable functionality depending on how you code it. More importantly,
 * these are compatible with the VisuStella MZ menus and the VisuStella Core
 * Engine's Parameters settings.
 * 
 * For clarification, these settings do NOT create brand-new parameters for you
 * to use and add to your game nor are the bonuses supported by other plugins
 * in the VisuStella MZ library. These settings exist to function as a bridge
 * for non-VisuStella MZ plugins that have created their own parameter values
 * and to show them inside VisuStella menus.
 *
 * ---
 *
 * Custom Parameter
 * 
 *   Parameter Name:
 *   - What's the parameter's name?
 *   - Used for VisuStella MZ menus.
 * 
 *   Abbreviation:
 *   - What abbreviation do you want to use for the parameter?
 *   - Do not use special characters. Avoid numbers if possible.
 * 
 *   Icon:
 *   - What icon do you want to use to represent this parameter?
 *   - Used for VisuStella MZ menus.
 * 
 *   Type:
 *   - What kind of number value will be returned with this parameter?
 *     - Integer (Whole Numbers Only)
 *     - Float (Decimals are Allowed)
 * 
 *   JS: Value:
 *   - Run this code when this parameter is to be returned.
 *
 * ---
 * 
 * Instructions on Adding Custom Parameters to VisuStella Menus
 * 
 * In the Core Engine and Elements and Status Menu Core plugins, there are
 * plugin parameter fields for you to insert the parameters you want displayed
 * and visible to the player.
 * 
 * Insert in those the abbreviation of the custom parameter. For example, if
 * you want to add the "Strength" custom parameter and the abbreviation is
 * "str", then add "str" to the Core Engine/Elements and Status Menu Core's
 * plugin parameter field for "Strength" to appear in-game. Case does not
 * matter here so you can insert "str" or "STR" and it will register all the
 * same to make them appear in-game.
 * 
 * ---
 * 
 * Instructions on Using Custom Parameters as Mechanics
 * 
 * If you want to use a custom parameter in, say, a damage formula, refer to
 * the abbreviation you have set for the custom parameter. For example, if you
 * want to call upon the "Strength" custom parameter's value and its set
 * abbreviation is "str", then refer to it as such. This is case sensitive.
 * 
 * An example damage formula would be something like the following if using
 * "str" for "Strength" and "con" for "Constitution":
 * 
 *   a.str - b.con
 * 
 * These values are attached to the Game_Battlerbase prototype class.
 * 
 * ---
 * 
 * Instructions on Setting Custom Parameter Values
 * 
 * This requires JavaScript knowledge. There is no way around it. Whatever code
 * you insert into the "JS: Value" field will return the value desired. The
 * 'user' variable will refer to the Game_Battlerbase prototype object in which
 * the information is to be drawn from.
 * 
 * Depending on the "type" you've set for the Custom Parameter, the returned
 * value will be rounded using Math.round for integers and left alone if set as
 * a float number.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Resolution Settings
 * ============================================================================
 *
 * Alter various properties to make the game look better for varying screen
 * resolutions. This is mostly for RPG Maker MZ version 1.3.0 and up where the
 * Troops tab has been updated to match the screen resolution settings found in
 * the System 2 Database tab.
 *
 * ---
 * 
 * Maps
 * 
 *   Scroll Lock Small X?:
 *   Scroll Lock Small Y?:
 *   - Automatically scroll lock X/Y scrolling if the map is too small?
 *   - Useful for 1280x720 resolutions when the map is 27 tiles wide.
 *     - This will get rid of the subtle scrolling when moving from one half of
 *       the screen to the other.
 *   - This setting will be disabled if the map is zoomed in.
 * 
 *   Locked Display X?:
 *   Locked Display Y?:
 *   - What display X/Y value do you want for auto-scroll locked maps?
 *   - Use a number between 0 and 1 for best results.
 * 
 * ---
 *
 * Troops
 * 
 *   Reposition Actors:
 *   - Update the position of actors in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *   - Ignore if using the VisuStella MZ Battle Core.
 *   - When using the VisuStella MZ Battle Core, adjust the position through
 *     Battle Core > Parameters > Actor Battler Settings > JS: Home Position
 *
 *   Reposition Enemies:
 *   - Update the position of enemies in battle if the screen resolution
 *     has changed to become larger than 816x624.
 * 
 *     For MZ 1.3.0+?:
 *     - Both this parameter and its parent parameter need to be on when using
 *       RPG Maker MZ 1.3.0+.
 *     - If the Core Script is below 1.3.0, this setting is ignored. This does
 *       not take into account what version the editor is on. Pay attention to
 *       that as the plugin will not auto adjust for it.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Shake Settings
 * ============================================================================
 *
 * Get more screen shake effects into your game!
 * 
 * These effects have been added by Aries of Sheratan!
 *
 * ---
 *
 * Settings
 * 
 *   Default Style:
 *   - The default style used for screen shakes.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   JS: Original Style:
 *   JS: Random Style
 *   JS: Horizontal Style
 *   JS: Vertical Style
 *   - This code gives you control over screen shake for this screen
 *     shake style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Command List Settings
 * ============================================================================
 *
 * This plugin parameter allows you to adjust the commands that appear on the
 * title screen. Some JavaScript knowledge is needed.
 *
 * ---
 *
 * Title Command
 * 
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Picture Buttons Settings
 * ============================================================================
 *
 * These allow you to insert picture buttons on your title screen that can
 * send users to various links on the internet when clicked.
 *
 * ---
 *
 * Settings
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 * 
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 * 
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 * 
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * In previous iterations of RPG Maker, the Core Engine would allow you to
 * change the screen resolution. In MZ, that functionality is provided by
 * default but a number of UI settings still remain. These settings allow you
 * adjust how certain in-game objects and menus are displayed.
 *
 * ---
 *
 * UI Area
 *
 *   Fade Speed:
 *   - Default fade speed for transitions.
 *
 *   Box Margin:
 *   - Set the margin in pixels for the screen borders.
 *
 *   Command Window Width:
 *   - Sets the width for standard Command Windows.
 *
 *   Bottom Help Window:
 *   - Put the Help Window at the bottom of the screen?
 *
 *   Right Aligned Menus:
 *   - Put most command windows to the right side of the screen.
 *
 *   Show Buttons:
 *   - Show clickable buttons in your game?
 * 
 *     Show Cancel Button:
 *     Show Menu Button:
 *     Show Page Up/Down:
 *     Show Number Buttons:
 *     - Show/hide these respective buttons if the above is enabled.
 *     - If 'Show Buttons' is false, these will be hidden no matter what.
 *
 *   Button Area Height:
 *   - Sets the height for the button area.
 *
 *   Bottom Buttons:
 *   - Put the buttons at the bottom of the screen?
 *
 *   Side Buttons:
 *   - Push buttons to the side of the UI if there is room.
 *
 * ---
 *
 * Larger Resolutions
 *
 * ---
 *
 * Menu Objects
 *
 *   Level -> EXP Gauge:
 *   - Draw an EXP Gauge under the drawn level.
 *
 *   Parameter Arrow:
 *   - The arrow used to show changes in the parameter values.
 *
 * ---
 *
 * Text Code Support
 *
 *   Class Names:
 *   - Make class names support text codes?
 *
 *   Nicknames:
 *   - Make nicknames support text codes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Adjust the default settings of the windows in-game. This ranges from things
 * such as the line height (to better fit your font size) to the opacity level
 * (to fit your window skins).
 * 
 * These settings also allow you to add scroll bars to scrollable windows,
 * letting the player know how much of the window's contents there are left for
 * scrolling. The scroll bar can be enabled, disabled, have its thickness
 * changed, colors changed, etc.
 *
 * ---
 *
 * Window Defaults
 * 
 *   Enable Masking:
 *   - Enable window masking (windows hide other windows behind them)?
 *   - WARNING: Turning it on can obscure data.
 * 
 *   Correct Skin Bleed:
 *   - Allows you to enable/disable the window skin bleeding correction for
 *     those who wish to use the 95 calculator instead of 96 to augment higher
 *     and larger screen resolutions.
 *   - Read the "Bug Fixes" section if you don't understand what the window
 *     skin bleeding problem is.
 * 
 *   Line Height:
 *   - Default line height used for standard windows.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   Item Padding:
 *   - Default line padding used for standard windows.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   Back Opacity:
 *   - Default back opacity used for standard windows.
 *   - As of version 1.3.0, this is no longer needed.
 *   - This will still work for lower versions.
 * 
 *   Translucent Opacity:
 *   - Default translucent opacity used for standard windows.
 * 
 *   Window Opening Speed:
 *   - Default open speed used for standard windows.
 *   - Default: 32 (Use a number between 0-255)
 * 
 *   Column Spacing:
 *   - Default column spacing for selectable windows.
 *   - Default: 8
 * 
 *   Row Spacing:
 *   - Default row spacing for selectable windows.
 *   - Default: 4
 *
 * ---
 * 
 * Scroll Bar
 * 
 *   Show Scroll Bar?:
 *   - Show the scroll bar for scrollable windows?
 * 
 *   Thickness:
 *   - How thick do you want the scroll bar to be?
 * 
 *   Offset:
 *   - How much do you want to offset the scroll bar by?
 * 
 *   Bar Body Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Off Bar Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Off Bar Opacity:
 *   - What opacity value do you want the off bar opacity to be?
 *   - Use a number between 0 and 255.
 * 
 * ---
 * 
 * Selectable Items:
 * 
 *   Show Background?:
 *   - Selectable menu items have dark boxes behind them. Show them?
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   JS: Draw Background:
 *   - Code used to draw the background rectangle behind clickable menu objects
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: JS: Quick Functions
 * ============================================================================
 * 
 * WARNING: This feature is highly experimental! Use it at your own risk!
 * 
 * JavaScript Quick Functions allow you to quickly declare functions in the
 * global namespace for ease of access. It's so that these functions can be
 * used in Script Calls, Control Variable Script Inputs, Conditional Branch
 * Script Inputs, Damage Formulas, and more.
 * 
 * ---
 * 
 * JS: Quick Function
 * 
 *   Function Name:
 *   - The function's name in the global namespace.
 *   - Will not overwrite functions/variables of the same name.
 * 
 *   JS: Code:
 *   - Run this code when using the function.
 * 
 * ---
 * 
 * If you have a Function Name of "Example", then typing "Example()" in a
 * Script Call, Conditional Branch Script Input, or similar field will yield
 * whatever the code is instructed to return.
 * 
 * If a function or variable of a similar name already exists in the global
 * namespace, then the quick function will be ignored and not created.
 * 
 * If a quick function contains bad code that would otherwise crash the game,
 * a fail safe has been implemented to prevent it from doing so, display an
 * error log, and then return a 0 value.
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
 * Version 1.82: April 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Added failsafe for $textPopup when some windows have not been initialized
 *    and requesting the text popup.
 * * New Feature!
 * ** New Plugin Parameter and playtest shortcut added by Arisu:
 * *** Plugin Parameters > QoL Settings > Playtest > CTRL + n: Quick Load
 * **** CTRL + a number from 1 to 9 will yield a quick load of that save file.
 * **** Does not count auto saves.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.81: February 15, 2024
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added for future plugin: VisuMZ_2_BattleGridSystem
 * *** <Grid>
 * *** <No Grid>
 * **** Requires the future plugin VisuMZ_2_BattleGridSystem!
 * **** Read the help section for more information on these.
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > Window > Correct Skin Bleed
 * **** Allows you to enable/disable the window skin bleeding correction for
 *      those who wish to use the 95 calculator instead of 96 to augment higher
 *      and larger screen resolutions.
 * **** Read the "Bug Fixes" section if you don't understand what the window
 *      skin bleeding problem is.
 * 
 * Version 1.80: January 18, 2024
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Auto Save After New Game
 * **** Normally, when starting a new game through the "New Game" option, there
 *      is no auto save trigger. However, if you start a new game or load a
 *      saved game, then go to the Game End screen, return back to the title
 *      screen, then start a New Game, the auto save trigger occurs when it
 *      shouldn't. The Core Engine will now patch this and prevent the trigger
 *      from taking place.
 * 
 * Version 1.79: November 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Plugin Command added by Arisu:
 * ** Text Popup: Show Text
 * *** Adds text to a text popup window to briefly appear.
 * *** Multiple text popups will be queued.
 * *** Does not halt the game and works parallel to game activity.
 * 
 * Version 1.78: October 12, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Olivia and sponsored by AndyL:
 * *** QoL Settings > Battle Test > Shift+R: Recover All
 * **** For Play Test only! During battle, pressing SHIFT + R will refill the
 *      whole party's HP and MP and status.
 * *** QoL Settings > Battle Test > Shift+T: Full TP
 * **** For Play Test only! During battle, pressing SHIFT + T will refill the
 *      whole party's TP.
 * 
 * Version 1.77: August 17, 2023
 * * Bug Fixes!
 * ** Fixed a bug that would cause the BGS related Plugin Commands to crash.
 *    Fix made by Arisu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Scroll-Linked Pictures now work if the image file are in a folder within
 *    the img/pictures/ folder without the folder needing a ! at the start.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Picture: Rotate by Angle
 * **** Rotates target picture by a amount angle over a set duration instead of
 *      continuously.
 * **** View help file for more information on the Plugin Command.
 * *** Picture: Rotate to Angle
 * **** Rotates target picture to a certain angle over a set duration instead
 *      of continuously.
 * **** View help file for more information on the Plugin Command.
 * ** New Plugin Parameter added by Irina:
 * *** Parameters > Menu Button Assist > General > Split "Escape":
 * **** Used ONLY for those making their own custom keyboard key input maps.
 * **** "Split" option makes separate instances of "Cancel" and "Menu" keys.
 * **** "Don't" option will consolidate both into "Escape" keys.
 * 
 * Version 1.76: June 15, 2023
 * * Bug Fixes!
 * ** Fixed a bug that displayed the incorrect button press key for name input
 *    processing's cancel action. Fix made by Olivia.
 * 
 * Version 1.75: March 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** In Scene_Name, when using the Keyboard Input, the button assist windows
 *    will no longer display the keyboard shortcuts for Ok and Cancel, but
 *    instead, show them for ENTER and BKSP. Update made by Arisu.
 * ** In Scene_Name, when manual inputting, the Page Up/Dn keys are now
 *    displayed to show changing character pages.
 * * New Features!
 * ** New Plugin Parameters added by Arisu and sponsored by AndyL:
 * *** Params > Keyboard Input > Button Assist > Finish Entry
 * **** Text used to describe finish entry.
 * *** Params > Keyboard Input > Button Assist > Page Change
 * **** Text used to describe changing character pages.
 * *** Params > Window Settings > Scroll Bar
 * **** These settings also allow you to add scroll bars to scrollable windows,
 *      letting the player know how much of the window's contents there are
 *      left for scrolling. The scroll bar can be enabled, disabled, have its
 *      thickness changed, colors changed, etc.
 * 
 * Version 1.74: February 16, 2023
 * * Compatibility Update!
 * ** Plugin Commands for: Audio: Change Current BGM/BGS Volume/Pitch/Pan
 *    should now work properly with the updated RPG Maker MZ version and
 *    WebAudio changes. Update made by Arisu.
 * 
 * Version 1.73: January 20, 2023
 * * Compatibility Update!
 * ** Added better Effekseer version compatibility.
 * 
 * Version 1.72: December 15, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Skill List Active After Party Member Change
 * **** If the skill list is active (ie. the player can move the cursor around)
 *      and the party member currently being viewed is changed via the button
 *      commands, then previously, RPG Maker MZ would still have that window be
 *      active despite having the cursor hidden temporarily. Upon pressing
 *      direction buttons, the cursor reveals itself and both the skill type
 *      window and skill list window are both active, making way for lots of
 *      potential problems to happen.
 * ** Water Tile Bug
 * *** It seems like there's a new bug that occurs if you create a tileset from
 *     scratch in RPG Maker MZ version 1.5.0+ and version 1.6.0+! What this bug
 *     does is it causes many tiles to become water tiles without intending to.
 *     You can find this out by turning off all the plugins in your project,
 *     putting a Ship or Boat on what are normally ground tiles, and then
 *     seeing the Ship or Boat traverse through it.
 * *** There are two ways to fix this. We cannot fix it through code in this
 *     plugin as it's a problem that involves the tileset json data there are
 *     ways to work around it so that you can get the proper water-flags to go
 *     where they need to be at.
 * **** 1. Copy a working un-bugged tileset onto the currently bugged one and
 *      reapply the tile features like passability, terrain tags, etc. This
 *      will make sure the water-passability tiles get copied over correctly.
 * **** 2. If you're on RPG Maker MZ version 1.5.0 or above, select a working
 *      un-bugged tileset (usually a pre-existing tileset when a new project is
 *      made), click the "Copy Page" button, go to the bugged tileset and press
 *      "Paste Page". You'll have to reapply any different properties like
 *      passabilities and terrain tags, but the water tile flags should now be
 *      working properly.
 * *** The plugin will not fix the problem itself since flag data is delicate
 *     and should not be tampered with midgame as the changes made by the
 *     plugin might not match the desired settings.
 * *** This plugin, however, will also send out an alert message when coming
 *     across such a tile. Pay attention to it and do one of the following two
 *     steps above to fix the problem.
 * * Documentation Update!
 * ** Added "Skill List Active After Party Member Change" section to the
 *    "Important Changes: Bug Fixes" section of the help file.
 * ** Added "Water Tile Bug" section to the "Important Changes: Bug Fixes"
 *    section of the help file.
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Menu Backgrounds > Blur Strength
 * **** Strength used for menu background snapshots.
 * 
 * Version 1.71: November 10, 2022
 * * Bug Fixes!
 * ** Title Command Window should now allow for more than 4 custom commands
 *    without hidden commands. Fix made by Irina.
 * ** Fixed a problem with repeating animations from Visual State Effects
 *    causing softlocks. Fix made by Olivia.
 * 
 * Version 1.70: October 6, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** A texture check will now occur for sprites that are being removed and
 *     destroyed in order to prevent crashes. In the off chance that someone
 *     creates a sprite through a script call and removes it through such, the
 *     likelihood of this occurance becomes higher. This makes the destroy
 *     property take into account a texture check in order to see if the sprite
 *     removal is taking extra steps and will reduce those extra steps.
 * * Documentation Update!
 * ** Added "Sprite Removal and Destroy Crash" section to the "Important
 *    Changes: Bug Fixes" section.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.69: September 8, 2022
 * * Bug Fixes!
 * ** Fixed the combination of Button Assist Location: Top with Help Location:
 *    Bottom combination not working properly. Fix made by Irina.
 * 
 * Version 1.68: August 4, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Olivia and sponsored by Archeia:
 * *** Audio: Change Current BGM Volume
 * *** Audio: Change Current BGM Pitch
 * *** Audio: Change Current BGM Pan
 * *** Audio: Change Current BGS Volume
 * *** Audio: Change Current BGS Pitch
 * *** Audio: Change Current BGS Pan
 * **** Changes the current BGM/BGS volume/pitch/pan without changing any of
 *      the current BGM/BGS's other properties and without restarting BGM/BGS.
 * 
 * Version 1.67: July 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added notes for Line Height and Item Padding parameters:
 * *** Avoid using odd numbers.
 * *** Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * *** This setting will be disabled if the map is zoomed in.
 * * New Features!
 * ** New map notetags added by Irina and sponsored by AndyL:
 * *** <Scroll Lock X>
 * *** <Scroll Lock X: x>
 * *** <Scroll Lock Y>
 * *** <Scroll Lock Y: y>
 * **** Causes the map to not scroll left/right(x) or up/down(y). Useful for
 *      when maps are just slightly smaller than normal and the tiny scrolling
 *      is distracting.
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Screen Resolution > Maps > Scroll Lock Small X?
 * *** Plugin Parameters > Screen Resolution > Maps > Scroll Lock Small Y?
 * *** Plugin Parameters > Screen Resolution > Maps > Locked Display X?
 * *** Plugin Parameters > Screen Resolution > Maps > Locked Display Y?
 * **** Automatically scroll locks small maps to prevent them from scrolling
 *      horizontally/vertically. Useful for 1280x720 resolutions when the map
 *      is 27 tiles wide. This will get rid of the subtle scrolling when moving
 *      from one half of the screen to the other.
 * **** This setting will be disabled if the map is zoomed in.
 * * Feature Update!
 * ** Warnings added to Line Height and Item Padding parameters:
 * *** Avoid using odd numbers.
 * *** Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 * Version 1.66: July 14, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Debug Console Refresh Bug
 * **** When pressing F5 to refresh while the debug console (DevTools) is open,
 *      some graphics will fail to load properly. This started occurring since
 *      the RPG Maker MZ 1.5.0 update and the code for loading the images has
 *      now been reverted to the 1.4.4 version where it was last stable.
 * * Documentation Update!
 * ** Help file updated for new major bug fix.
 * 
 * Version 1.65: June 30, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Parameter Settings > Show Actor Level?
 * **** Show the actor level when displaying actors?
 * **** Used for most windows in-game.
 * 
 * Version 1.64: June 9, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command made by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** Debug: Current Controller ID
 * **** PLAY TEST ONLY. Shows current controller ID in debug console.
 * **** Also copies to computer clipboard if possible.
 * ** New Plugin Parameters made by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** Subsettings for Button Assist Window: Controller Button Assist
 * **** These are sub-settings for the Button Assist Window Plugin Parameters.
 *      Where the Button Assist Window Plugin Parameters are focused on
 *      keyboard entries, these sections are focused on gamepad controllers.
 * **** Add multiple gamepads to the list to give them different button assist
 *      text. If a gamepad is being used but not listed here, the button assist
 *      text will default to the keyboard version.
 * 
 * Version 1.63: May 2, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > QoL Settings > Misc > Map Name Text Code
 * **** If on, map names will use text codes.
 * **** If off, only the raw map name will be used.
 * * Feature Update!
 * ** The map name text code change will no longer be on forcefully. It is now
 *    something that can be toggled by Plugin Parameters. Update by Irina.
 * 
 * Version 1.62: April 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu and sponsored by Archeia:
 * *** Variable: JS Eval
 * **** Pick a variable ID and value to alter through JS.
 * **** Allows one line of code for variable ID and operand.
 * **** Functions like RM2k3's Variable Pointers.
 * *** Variable: JS Block
 * **** Pick a variable ID and value to alter through JS.
 * **** Allows JS block code for variable ID and operand.
 * **** Functions like RM2k3's Variable Pointers.
 * ** Map names can now use text codes. Made by Arisu and sponsored by Archeia.
 * 
 * Version 1.61: April 21, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Battle Forced End Action Crash
 * **** Depending on various circumstances, currently active battlers can be
 *      cleared from the battle system at will due to a number of reasons.
 *      However, if it just so happens that the targets are cleared, too, with
 *      actions remaining, then a crash will follow up. This plugin will
 *      prevent that change. Fix made by Olivia.
 * 
 * Version 1.60: April 14, 2022
 * * Bug Fixes!
 * ** Number Input window will now respond to Home/End keys properly.
 *    Fix made by Olivia.
 * 
 * Version 1.59: April 7, 2022
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.4 compatibility update!
 * *** "Shutdown" command should now be more compatible with other aspects of
 *     the client when running from Node JS client on other OS's.
 * 
 * Version 1.58: March 24, 2022
 * * Feature Update!
 * ** Plugin Commands now have separators for easier selection.
 * 
 * Version 1.57: March 3, 2022
 * * Compatibility Update!
 * ** The "Shutdown" command from the title screen should now be compatible
 *    with RPG Maker MZ 1.4.4 and up. Update made by Olivia.
 * 
 * Version 1.56: February 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New features added by Arisu and sponsored by Anon:
 * *** Plugin Parameters > QoL > Misc > Shortcut Scripts
 * **** Enables shortcut-based script variables and functions that can be used
 *      for script calls.
 * **** Shortcut list enabled for this is as follows:
 * ***** $commonEvent(id), $onceParallel(id), $scene, $spriteset, $subject, 
 *       $targets, $target, $event
 * ***** For more information on how to use them, review the help file.
 * 
 * Version 1.55: January 27, 2022
 * * Feature Update!
 * ** Once Parallels for the map are now able to update even while other events
 *    are running. Update made by Arisu.
 * 
 * Version 1.54: January 13, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Overly-Protective Substitute
 * *** When an ally with critical health is being targeted by a friendly non-
 *     Certain Hit skill (such as a heal or buff) and another ally has the
 *     substitute state, the other ally would "protect" the originally targeted
 *     ally and take the heal or buff.
 * *** The new changed behavior is that now, substitute will not trigger for
 *     any actions whose scope targets allies.
 * *** Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new MZ Bug: Overly-Protective Substitute.
 * * Feature Update!
 * ** Added a failsafe for those who did not update the plugin parameter
 *    settings and are using MV Animations.
 * 
 * Version 1.53: December 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetag added by Olivia:
 * *** <Rate: x>
 * **** Allows you to adjust the update for this MV Animation.
 * ***** Does NOT work with Effekseer animations.
 * **** The lower the number, the faster.
 * **** Replace 'x' with a number representing the animation update rate.
 * ***** Default rate: 4.
 * ***** Minimum rate: 1.
 * ***** Maximum rate: 10.
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > Qualify of Life Settings > MV Animation Rate
 * **** Adjusts the rate at which MV animations play.
 * **** Default: 4. Lower for faster. Higher for slower.
 * * Optimization Update!
 * ** MV Animations should run more optimized.
 * 
 * Version 1.52: December 16, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.0 compatibility update!
 * *** MV Animations played on screen level will now show up properly in the
 *     center of the screen.
 * 
 * Version 1.51: December 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** In the battle status windows, whenever actor names are displayed, the
 *     bitmap used to display their name text do not extend vertically all the
 *     way, causing letters like lowercase "Q" and "G" to be cut off, making
 *     them hard to distinguish from one another. The Core Engine will remedy
 *     this by extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * Version 1.50: November 4, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** By default, if the attack skill is sealed via a trait and an actor has
 *     auto-battle, the action can still be used via auto-battle. This is now
 *     fixed and actors should not be able to attack via auto-battle if their
 *     attack ability is sealed. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.49: October 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Command added by Arisu and sponsored by Anon:
 * *** Map: Once Parallel
 * **** Plays a Common Event parallel to the event once without repeating
 *      itself when done. Map only!
 * **** When exiting map scene or changing maps, all Once Parallels are cleared
 * **** Once Parallels are not retained upon reentering the scene or map.
 * **** Once Parallels are not stored in memory and cannot be saved.
 * 
 * Version 1.48: October 21, 2021
 * * Feature Update!
 * ** Bitmap.blt function will now have source coordinates and destination X
 *    and Y coordinates rounded to prevent blurring. Update made by Olivia.
 * 
 * Version 1.47: October 14, 2021
 * * Bug Fixes!
 * ** Prevents Number Input window from having a NaN value due to holding down
 *    the fast forward key. Fix made by Arisu.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * **** Fixes the font width issue with non-monospaced fonts in the Message
 *      Window. This is now an optional fix.
 * 
 * Version 1.46: September 23, 2021
 * * Documentation Update!
 * ** Added line to Plugin Command: "System: Battle System Change":
 * *** Some battle systems REQUIRE their specific plugins!
 * ** Added lines to "Plugin Parameters: Battle System":
 * *** Some battle systems REQUIRE their specific plugins! This means if you do
 *     not have the required battle system plugin installed, it will not change
 *     over. The Core Engine plugin does not contain data for all of the battle
 *     systems inside its code.
 * 
 * Version 1.45: September 17, 2021
 * * Bug Fixes!
 * ** Fixed a problem with "Picture: Coordinates Mode" to properly utilize the
 *    correct picture ID. Fix made by Arisu.
 * ** RPG Maker MZ Bug Fix:
 * *** Instant Text Discrepancy for Window_Message
 * **** Window_Message displays text differently when it draws letters one by
 *      one versus when the text is displayed instantly. This isn't noticeable
 *      with the default font, but it's very visible when using something like
 *      Arial. The error is due to Bitmap.measureTextWidth yielding a rounded
 *      value per letter versus per word. The Core Engine will provide a bug
 *      fix that will single out the cause and make it so that only
 *      Window_Message will not utilize any round number values when
 *      determining the width of each letter, whether or not it is shown
 *      instantly. This change will only affect Window_Message and not any
 *      other window in order to prevent unintended side effects.
 * **** Fix made by Yanfly.
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.44: August 20, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Anon.
 * *** "Animation: Play at Coordinate"
 * **** Plays an animation on the screen at a specific x, y coordinate even if
 *      there is no sprite attached.
 * 
 * Version 1.43: July 23, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Archeia!
 * *** "Picture: Coordinates Mode"
 * **** Play Test Mode only!
 * **** Gets the coordinates of a specific picture as you move it across the
 *      screen.
 * **** Helpful for those who don't want to do guess work on the screen
 *      coordinates when it comes to placing down pictures.
 * 
 * Version 1.42: July 16, 2021
 * * Documentation Update
 * ** Added text to "Plugin Parameters: Color Settings" for clarification:
 * *** If the game's Window Skin is changed mid-game, the colors used will
 *     still be based off the default Window Skin's colors. This is due to
 *     storing them in a cache and preventing extra processing and reduces lag.
 * 
 * Version 1.41: July 2, 2021
 * * Compatibility Update
 * ** Further compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update
 * ** Added extra notes to "Important Changes: Bug Fixes" section for the
 *    "Window Skin Bleeding" bug:
 * *** This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Version 1.40: June 25, 2021
 * * Compatibility Update
 * ** Compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update:
 * ** Plugin Parameters > Window Settings > Back Opacity
 * *** As of version 1.3.0, this is no longer needed.
 * *** This will still work for lower versions.
 * ** Help file updated for new features.
 * * Feature Updates!
 * ** Window Skin Bleeding fix updated to newest version.
 * * New Plugin Parameters added:
 * ** Plugin Parmaeters > Screen Resolution Settings
 * *** These settings have been moved from the UI settings to be its own thing.
 * **** This is mostly for RPG Maker MZ version 1.3.0 and up where the Troops
 *      tab has been updated to match the screen resolution settings found in
 *      the System 2 Database tab.
 * *** Reposition Enemies > For MZ 1.3.0+?
 * **** Both of these plugin parameters need to be set to true in order for the
 *      repositioning to work for MZ v1.3.0.
 * **** If the Core Script is below 1.3.0, this setting is ignored. This does
 *      not take into account what version the editor is on. Pay attention to
 *      that as the plugin will not auto adjust for it.
 * 
 * Version 1.39: June 18, 2021
 * * Bug Fixes!
 * ** Number Inputs should now work with the controller if keyboard Number
 *    Input is enabled. Fix made by Olivia.
 * ** RPG Maker Bug: Termination Clear Effects
 * *** In RPG Maker MZ, requesting an animation while transitioning between
 *     scenes, such as going from the map scene to the battle scene, can cause
 *     crashes. This is because the animation queue does not take off
 *     immediately and will likely register incorrect targets for the scene.
 *     This plugin will forcefully clear any registered animations and balloon
 *     effects when terminating a scene in order to prevent crashes.
 * * Documentation Update!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** <Battle View: x> Troop Name tags can now work with comment tags.
 * ** <Battle System: x> Troop Name tags can now work with comment tags.
 * *** Updates made by Irina.
 * 
 * Version 1.38: June 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Caz!
 * *** Picture: Show Icon
 * **** Shows an icon instead of a picture image.
 * **** The picture icon can be controlled like any other picture.
 * 
 * Version 1.37: May 21, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Switches: Randomize ID(s)
 * *** Switches: Randomize Range
 * *** Switches: Toggle ID(s)
 * *** Switches: Toggle Range
 * **** These Plugin Commands allow you to randomize the ON/OFF positions of
 *      switches or toggle them so that they flip their ON/OFF status.
 * 
 * Version 1.36: May 14, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Export: All Maps Text
 * *** Export: All Troops Text
 * *** Export: Current Map Text
 * *** Export: Current Troop Text
 * **** Play Test Only Plugin Commands. These Plugin Commands are used for
 *      extracting all messages, show choices, comments, and scrolling text to
 *      parse and export them as a TXT file. Useful for getting a game's script
 *      to a voice actor or voice actress.
 * 
 * Version 1.35: May 7, 2021
 * * Documentation Update!
 * ** Added the following text to "Parameter Settings" Plugin Parameters for
 *    extra clarity regarding Parameter Caps:
 * *** These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 * 
 * Version 1.34: April 23, 2021
 * * Bug Fixes!
 * ** For the vanilla Equip Status window, custom parameters with integer
 *    values will now show up as integers and not percentiles. Fix by Olivia.
 * * Documentation Update!
 * ** Added clarity to the <param: x> notetag for enemies.
 * *** This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * 
 * Version 1.33: April 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Window Skin Bleeding
 * *** Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 *     been set from 96 to 95. This results in the window skin bleeding past
 *     the window's intended borders. The Core Engine now reverts this change
 *     to prevent the bleeding effect from happening.
 * * Feature Update!
 * ** "Encounter Rate Minimum" now has a valid minimum value of 1. Update made
 *    by Olivia.
 * 
 * Version 1.32: April 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Item Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Weapon Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Armor Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Added Quantity
 * **** By default, RPG Maker MZ only adds 99 of items and not weapons or armor
 *      making it awkward for testing specific battle mechanics. These settings
 *      allow you to add in custom amounts of items, weapons, and/or armors if
 *      you so wish.
 * 
 * Version 1.31: March 26, 2021
 * * Feature Update!
 * ** Title screen buttons will now become fully opaque when hovered over them
 *    instead of only when pressed. Update made by Yanfly.
 * 
 * Version 1.30: March 19, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Invisible Battle Sprites
 * *** If you removed a party member during battle and added that exact party
 *     member back into the same slot, their sprite would appear invisible. The
 *     VisuStella Core Engine will fix this problem and prevent it from
 *     happening. Fix made by Olivia.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset
 * **** When animations are mirrored, mirror their Offset X values, too.
 * ** New animation name tags added by Arisu:
 * *** <Mirror Offset X> and <No Mirror Offset X>
 * **** If these text tags are placed in an animation's name, it will cause the
 *      offset X value to be mirrored when the animation is mirrored or have it
 *      ignored despite being mirrored.
 * 
 * Version 1.29: March 12, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Interactable window client area does not conform to the
 *    window's declared scale when the scale is anything but 1.0. This will now
 *    be fixed through this plugin. Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** Name Input should be more controller-friendly. If a controller is
 *    connected upon entering the name change scene, it will use the default
 *    manual-entry mode instead of the keyboard-entry mode. If a controller
 *    button is pressed during the keyboard-entry mode, it will automatically
 *    switch to the manual-entry mode.
 * ** This plugin does not provide support for controllers that are undetected
 *    by RPG Maker MZ's default controller support.
 * ** This feature was already implemented since version 1.27 but wasn't
 *    documented so here we are. Update made by Irina.
 * 
 * Version 1.28: March 5, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: The arrows drawn by a window skin will no longer by
 *    placed on a half pixel when a window's size is an odd number. This would
 *    cause sprite tearing problems and look awful. Fix made by Irina.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * 
 * Version 1.27: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Moved "Show Scrolling Text, additional functionality" section from Bug
 *    Fixes to Major Changes as it was placed in the wrong section.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > Keyboard Input > Name Input > Banned Words
 * **** Insert words you don't want your players to use for character names.
 * 
 * Version 1.26: February 19, 2021
 * * Bug Fixes!
 * ** Certain Plugin Parameters no longer have settings that restrict them to
 *    a maximum of 1. Fix made by Arisu.
 * * Feature Update!
 * ** Changed the default value for a New Game > Common Event upon Play Testing
 *    to 0 to prevent confusion. Update made by Arisu.
 * 
 * Version 1.25: February 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Show Scrolling Text, additional functionality added by Arisu
 * *** The event command "Show Scrolling Text" now has additional functionality
 *     as long as the VisuStella MZ Core Engine is installed. If the game dev
 *     inserts "// Script Call" (without the quotes) inside the scrolling text,
 *     then the entirity of the Show Scrolling Text event command will be ran
 *     as a giant script call event command.
 * *** The reason why this functionality is added is because the "Script..."
 *     event command contains only 12 lines maximum. This means for any script
 *     call larger than 12 lines of code cannot be done by normal means as each
 *     script call is ran as a separate instance.
 * *** By repurposing the "Show Scrolling Text" event command to be able to
 *     function as an extended "Script..." event command, such a thing is now
 *     possible with less hassle and more lines to code with.
 * *** This effect does not occur if the Show Scrolling Text event command does
 *     not have "// Script Call" in its contents.
 * 
 * Version 1.24: January 29, 2021
 * * Documentation Update!
 * ** Plugin Parameters: Custom Parameters Settings added the following note:
 * *** For clarification, these settings do NOT create brand-new parameters for
 *     you to use and add to your game nor are the bonuses supported by other
 *     plugins in the VisuStella MZ library. These settings exist to function
 *     as a bridge for non-VisuStella MZ plugins that have created their own
 *     parameter values and to show them inside VisuStella menus.
 * * Feature Update!
 * ** Default JS Plugin Parameter for the Title Command: "Shutdown" now has a
 *    note in it that reads: "Do NOT use this command with mobile devices or
 *    browser games. All it does is cause the game to display a blank, black
 *    canvas which the player is unable to do anything with. It does NOT force
 *    close the browser tab nor the app."
 * *** This is also why this command is disabled by default for any non-NodeJS
 *     client deployed game versions.
 * ** Disabled some bug fixes made by the Core Engine for the default RMMZ code
 *    base since the 1.1.1 version now contains those very same fixes.
 * 
 * Version 1.23: January 22, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: January 15, 2021
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Sprite_Timer is added to the spriteset for the parent
 *    scene, making it affected by any filers, zooms, and/or blurs, hindering
 *    its readability.
 * 
 * Version 1.21: January 8, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Keyboard Input > Controls > WASD Movement
 * *** Plugin Parameters > Keyboard Input > Controls > R Button: Dash Toggle
 * 
 * Version 1.20: January 1, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.19: December 25, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s) and feature updates!
 * * Bug Fixes!
 * ** Fixed typo inside of the comments inside the JS: Quick Functions.
 * * Feature Update!
 * ** Plugin Parameters > Color Settings > Outline Color is now renamed to
 *    Font Outline.
 * * New Features!
 * ** New Plugin Parameters added by Shaz!
 * *** Plugin Parameters > Color Settings > Gauge Number Outline
 * 
 * Version 1.18: December 18, 2020
 * * Bug Fixes!
 * ** Compatible string text from the Items and Equips Core will no longer
 *    register MaxHP and MaxMP as percentile values for the info window.
 * ** RPG Maker MZ Bug: Gamepads no longer go rapidfire after a cleared input.
 *    There is now a period of delay for gamepads after an input clear.
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * ** RPG Maker MV animations will no longer crash for unplayable sound
 *    effects. Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * New Features!
 * ** New Plugin Parameters added by Yanfly!
 * *** Plugin Parameters > Button Assist > Key: Shift
 * *** Plugin Parameters > Button Assist > Key: Tab
 * **** These let you assign text codes to the Shift and Tab buttons for the
 *      Button Assist windows.
 * *** Plugin Parameters > QoL Settings > Misc > NewGame > CommonEvent
 * **** For an all version (including non-play test) common event to start new
 *      games with.
 * 
 * Version 1.17: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.16: December 4, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Button Assist Window for the change name scene will now default to "Tab"
 *    for switching between both modes. Update made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > Keyboard Input > Default Mode
 * **** Select default mode when entering the scene.
 * 
 * Version 1.15: November 29, 2020
 * * Bug Fixes!
 * ** Pressing "Enter" in the change name scene while the actor's name is
 *    completely empty will no longer result in endless buzzer sounds. Fix made
 *    by Arisu.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** For the name change scene, the "Tab" key now also lets the user switch
 *    between the two modes. Update made by Yanfly.
 * * New Features!
 * ** Two new plugin parameters added to Keyboard Input:
 * *** "Switch To Keyboard" and "Switch To Manual"
 * **** These determine the text used for the button assist window when
 *      switching between the two modes. Update made by Yanfly.
 * **** Button Assist window now takes into consideration for these texts.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.14: November 22, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Command added by Yanfly!
 * *** System: Load Images
 * **** Allows you to (pre) load up images ahead of time.
 * 
 * Version 1.13: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: November 8, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Screen Shake Plugin Parameters and JS: Quick Function Plugin Parameters
 *    have been taken off experimental status.
 * * New Features!
 * ** New plugin parameters added by Arisu.
 * *** Plugin Parameters > Keyboard Input
 * **** Settings for the game that utilize keyboard input. These are primarily
 *      for the name input scene (Scene_Name) and the number input event
 *      command. These settings have only been tested on English keyboards and
 *      may or may not be compatible with other languages, so please disable
 *      these features if they do not fit in with your game.
 * 
 * Version 1.11: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Feature Update!
 * ** Bitmap smoothing now takes into consideration for rounding coordinates.
 *    Update made by Irina.
 * 
 * Version 1.10: October 25, 2020
 * * Feature Update!
 * ** Sprite animation location now adjusts position relative to the sprite's
 *    scale, too. Update made by Arisu.
 *
 * Version 1.09: October 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Auto Battle Lock Up. Fixed by Yanfly.
 * *** If an auto battle Actor fights against an enemy whose DEF/MDF is too
 *     high, they will not use any actions at all. This can cause potential
 *     game freezing and softlocks. This plugin will change that and have them
 *     default to a regular Attack.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.08: October 11, 2020
 * * Feature Update!
 * ** Altered sprite bitmaps via the various draw functions will now be marked
 *    as modified and will automatically purge themselves from graphical memory
 *    upon a sprite's removal to free up more resources. Change made by Yanfly.
 * ** Picture Sprite Origin anchors are now tied to the Game_Picture show and
 *    move commands instead of the Game_Interpretter commands. Change by Arisu.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** New documentation added for the new Plugin Parameter category:
 *    "Custom Parameters".
 * * New Features!
 * ** New Plugin Parameter "Custom Parameters" added by Yanfly.
 * *** Create custom parameters for your game! These will appear in
 *     VisuStella MZ menus.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Battler evasion pose can now occur if there is a miss. These were made
 *    separate in RPG Maker MZ and misses didn't enable the evasion pose. Fix
 *    made by Olivia.
 * * New Features!
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Frontview>, <Sideview> to change the battle view for that specific map,
 *     or troop regardless of what other settings are.
 * *** <DTB>, <TPB Active>, <TPB Wait> to change the battle system for that
 *     specific map or troop regardless of what other settings are.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** <Level: x> notetag for enemies is now fixed! Fix made by Arisu.
 * * Documentation Update!
 * ** Documentation added for the new "System: Battle System Change" Plugin
 *    Command and removed the old "System: Set Time Progress Battle".
 * * Feature Update!
 * ** The Plugin Command "System: Set Time Progress Battle" has been replaced
 *    with "System: Battle System Change" instead. This is to accommodate
 *    future plugins that allow for different battle systems. Added by Yanfly.
 * *** If you have previously used "System: Set Time Progress Battle", please
 *     replace them. We apologize for the inconvenience.
 * * New Features!
 * ** In the Core Engine's plugin parameters, you can now set the Battle System
 *    used. This will default to whatever is the game database's setting. This
 *    feature is used for the future when new battle systems are made. Feature
 *    added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Documentation Update!
 * ** Added new documentation for the "Title Command List" and Title Picture
 *    Buttons" plugin parameters. They now have a dedicated section each.
 * * Feature Updates!
 * ** Moved the "Title Command List" and "Title Picture Buttons" parameters
 *    from the Menu Layout > Title settings. They were far too hidden away and
 *    users had a hard time finding them. Update made by Yanfly.
 * *** Users who have customized these settings before will need to readjust
 *     them again. We apologize for the inconvenience.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Having QoL > Modern Controls disabled (why would you) used to prevent the
 *    down button from working. It works again. Fix made by Yanfly.
 * * New Feature!
 * ** Plugin default settings now come with a "Game End" option on the title
 *    screen. For those updating from version 1.02 or order, you can add this
 *    in by opening the Core Engine > Plugin Parameters > Menu Layout Settings
 *    > press "delete" on Scene_Title > open it up, then the new settings will
 *    fill in automatically.
 * * New Experimental Feature Added:
 * ** Screen Shake Settings added to the Plugin Parameters.
 * *** Screen Shake: Custom Plugin Command added!
 * *** Credit to Aries of Sheratan, who gave us permission to use her formula.
 * *** We'll be expanding on more screen shaking options in the future.
 * * Optimization Update
 * ** Digit Grouping now works more efficiently.
 * 
 * Version 1.02: August 30, 2020
 * * New Feature!
 * ** New Plugin Command: "Picture: Erase All". Added by Olivia.
 * *** Erases all pictures on the screen because it's extremely tedious to do
 *     it one by one.
 * ** New Plugin Command: "Picture: Erase Range"
 * *** Erases all pictures within a range of numbers because it's extremely
 *     tedious to do it one by one.
 * * Optimization Update
 * ** Added a more accurate means of parsing numbers for Digit Grouping.
 * ** Window_Base.prototype.textSizeEx now stores data to a cache.
 * * Documentation Update
 * ** Added a section to Major Changes: New Hard-Coded Features on
 *    Digit Grouping and explaining its intricacies.
 * ** Added a note to Plugin Parameters > UI > Reposition Actors to ignore the
 *    setting if using the Battle Core.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Digit grouping fixed to allow text codes to detect values larger than
 *    1000. Fix made by Olivia and Yanfly.
 * ** Param Plus, Rate, Flat notetags fixed. Fix made by Yanfly.
 * * New Experimental Feature Added:
 * ** JS: Quick Functions found in the Plugin Parameters
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
 * @command Separator_Animation
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AnimationPoint
 * @text Animation: Play at Coordinate
 * @desc Plays an animation on the screen at a specific x, y
 * coordinate even if there is no sprite attached.
 *
 * @arg AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Plays this animation.
 * @default 1
 * 
 * @arg Coordinates
 *
 * @arg pointX:eval
 * @text X
 * @parent Coordinates
 * @desc X coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 *
 * @arg pointY:eval
 * @text Y
 * @parent Coordinates
 * @desc Y coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 *
 * @arg Mirror:eval
 * @text Mirror Animation?
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 *
 * @arg Mute:eval
 * @text Mute Animation?
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the animation?
 * @default false
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Audio
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmVolume
 * @text Audio: Change Current BGM Volume
 * @desc Changes the current BGM volume without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg volume:eval
 * @text Volume
 * @desc Change the current BGM's volume to what amount?
 * You may use JavaScript code. Use numbers from 0 to 100.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmPitch
 * @text Audio: Change Current BGM Pitch
 * @desc Changes the current BGM pitch without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg pitch:eval
 * @text Pitch
 * @desc Change the current BGM's pitch to what amount?
 * You may use JavaScript code. Use numbers from 50 to 150.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmPan
 * @text Audio: Change Current BGM Pan
 * @desc Changes the current BGM pan without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg pan:eval
 * @text Pan
 * @desc Change the current BGM's pan to what amount?
 * You may use JavaScript code. Use numbers from -100 to 100.
 * @default 0
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsVolume
 * @text Audio: Change Current BGS Volume
 * @desc Changes the current BGS volume without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg volume:eval
 * @text Volume
 * @desc Change the current BGS's volume to what amount?
 * You may use JavaScript code. Use numbers from 0 to 100.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsPitch
 * @text Audio: Change Current BGS Pitch
 * @desc Changes the current BGS pitch without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg pitch:eval
 * @text Pitch
 * @desc Change the current BGS's pitch to what amount?
 * You may use JavaScript code. Use numbers from 50 to 150.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsPan
 * @text Audio: Change Current BGS Pan
 * @desc Changes the current BGS pan without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg pan:eval
 * @text Pan
 * @desc Change the current BGS's pan to what amount?
 * You may use JavaScript code. Use numbers from -100 to 100.
 * @default 0
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Debug
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DebugConsoleLastControllerID
 * @text Debug: Current Controller ID
 * @desc PLAY TEST ONLY. Shows current controller ID in debug console.
 * Also copies to computer clipboard if possible.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Export
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllMapText
 * @text Export: All Maps Text
 * @desc PLAY TEST ONLY. Exports all of the text from all maps,
 * their events, event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllTroopText
 * @text Export: All Troops Text
 * @desc PLAY TEST ONLY. Exports all of the text from all troops,
 * their event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurMapText
 * @text Export: Current Map Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current map,
 * its events, the event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurTroopText
 * @text Export: Current Troop Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current troop,
 * the troop's event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Game
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OpenURL
 * @text Game: Open URL
 * @desc Opens a website URL from the game.
 *
 * @arg URL:str
 * @text URL
 * @desc Where do you want to take the player?
 * @default https://www.google.com/
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Gold
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command GoldChange
 * @text Gold: Gain/Lose
 * @desc Allows you to give/take more gold than the event editor limit.
 *
 * @arg value:eval
 * @text Value
 * @desc How much gold should the player gain/lose?
 * Use negative values to remove gold. You may use JS.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Map
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapOnceParallel
 * @text Map: Once Parallel
 * @desc Plays a Common Event parallel to the event once without
 * repeating itself when done. Map only!
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc The ID of the parallel Common Event to play.
 * Does NOT repeat itself when finished.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Picture
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureCoordinatesMode
 * @text Picture: Coordinates Mode
 * @desc Play Test Mode only! Gets the coordinates of a specific
 * picture as you move it across the screen.
 *
 * @arg PictureID:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ID of the pictures to track the coordinates of.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEasingType
 * @text Picture: Easing Type
 * @desc Changes the easing type to a number of options.
 *
 * @arg pictureId:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Which picture do you wish to apply this easing to?
 * @default 1
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg LineBreak
 * @text ------------------------
 * @default --------------------------------
 *
 * @arg Instructions1
 * @text Instructions
 * @default Insert this Plugin Command after
 *
 * @arg Instructions2
 * @text -
 * @default a "Move Picture" event command.
 * 
 * @arg Instructions3
 * @text -
 * @default Turn off "Wait for Completion"
 *
 * @arg Instructions4
 * @text -
 * @default in the "Move Picture" event.
 *
 * @arg Instructions5
 * @text -
 * @default You may have to add in your own
 *
 * @arg Instructions6
 * @text -
 * @default "Wait" event command after.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseAll
 * @text Picture: Erase All
 * @desc Erases all pictures on the screen because it's extremely
 * tedious to do it one by one.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseRange
 * @text Picture: Erase Range
 * @desc Erases all pictures within a range of numbers because it's
 * extremely tedious to do it one by one.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type number
 * @min 1
 * @max 100
 * @desc The starting ID of the pictures to erase.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ending ID of the pictures to erase.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureRotateBy
 * @text Picture: Rotate By Angle
 * @desc Rotates target picture by a amount angle over a set duration
 * instead of continuously.
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @desc What is the ID of the picture you wish to rotate? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg AdjustAngle:eval
 * @text Adjust Angle
 * @desc What is the angle you wish to rotate the picture by?
 * Use degrees (360 degrees per full rotation).
 * @default 0
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of rotation effect in frames.
 * 60 frames = 1 second. You may use JavaScript code.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureRotate
 * @text Picture: Rotate to Angle
 * @desc Rotates target picture to a certain angle over a set duration
 * instead of continuously.
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @desc What is the ID of the picture you wish to rotate? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg TargetAngle:eval
 * @text Target Angle
 * @desc What is the target angle you wish to rotate the picture?
 * Use degrees (360 degrees per full rotation).
 * @default 0
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of rotation effect in frames.
 * 60 frames = 1 second. You may use JavaScript code.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 * 
 * @command PictureShowIcon
 * @text Picture: Show Icon
 * @desc Shows an icon instead of a picture image.
 * The picture icon can be controlled like any other picture.
 * 
 * @arg General
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @parent General
 * @desc What is the ID of the picture you wish to show at? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg IconIndex:eval
 * @text Icon Index
 * @parent General
 * @desc Select the icon index to use for this picture.
 * You may use JavaScript code.
 * @default 23
 *
 * @arg Smooth:eval
 * @text Smooth Icon?
 * @parent General
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc This will make the icon smoothed out or pixelated.
 * @default false
 * 
 * @arg PictureSettings
 * @text Picture Settings
 *
 * @arg Settings:struct
 * @text Settings
 * @parent PictureSettings
 * @type struct<ShowPicture>
 * @desc Alter the settings for how the picture will be shown.
 * @default {"Position":"","Origin:num":"0","PositionX:eval":"0","PositionY:eval":"0","Scale":"","ScaleX:eval":"100","ScaleY:eval":"100","Blend":"","Opacity:eval":"255","BlendMode:num":"0"}
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_ScreenShake
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ScreenShake
 * @text Screen Shake: Custom
 * @desc Creates a custom screen shake effect and also sets
 * the following uses of screen shake to this style.
 *
 * @arg Type:str
 * @text Shake Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc Select shake style type.
 * @default random
 *
 * @arg Power:num
 * @text Power
 * @type number
 * @min 1
 * @max 9
 * @desc Power level for screen shake.
 * @default 5
 *
 * @arg Speed:num
 * @text Speed
 * @type number
 * @min 1
 * @max 9
 * @desc Speed level for screen shake.
 * @default 5
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of screenshake.
 * You can use code as well.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Switch
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeOne
 * @text Switches: Randomize ID(s)
 * @desc Select specific Switch ID's to randomize ON/OFF.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeRange
 * @text Switches: Randomize Range
 * @desc Select specific Switch ID Range to randomize ON/OFF.
 * The ratio determines the ON/OFF distribution.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleOne
 * @text Switches: Toggle ID(s)
 * @desc Select specific Switch ID's to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleRange
 * @text Switches: Toggle Range
 * @desc Select specific Switch ID Range to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_System
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetBattleSystem
 * @text System: Battle System Change
 * @desc Switch to a different battle system in-game.
 * Some battle systems REQUIRE their specific plugins!
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB Wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to switch to.
 * @default database
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemLoadImages
 * @text System: Load Images
 * @desc Allows you to (pre) load up images ahead of time.
 *
 * @arg animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetFontSize
 * @text System: Main Font Size
 * @desc Set the game's main font size.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the font size to this number.
 * @default 26
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetSideView
 * @text System: Side View Battle
 * @desc Switch between Front View or Side View for battle.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Front View
 * @value Front View
 * @option Side View
 * @value Side View
 * @option Toggle
 * @value Toggle
 * @desc Choose which view type to switch to.
 * @default Toggle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetWindowPadding
 * @text System: Window Padding
 * @desc Change the game's window padding amount.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the game's standard window padding to this value.
 * Default: 12
 * @default 12
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_TextPopup
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TextPopupShow
 * @text Text Popup: Show Text
 * @desc Adds text to a text popup window to briefly appear.
 * Multiple text popups will be queued.
 *
 * @arg text:json
 * @text Text
 * @type note
 * @desc Write the text that you want to appear here.
 * You may use text codes.
 * @default "Insert message here."
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Variable
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableEvalReference
 * @text Variable: JS Eval
 * @desc Pick a variable ID and value to alter through JS.
 * Functions like RM2k3's Variable Pointers.
 *
 * @arg id:eval
 * @text Variable ID
 * @desc This is the target variable to alter.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default 1
 *
 * @arg operation:str
 * @text Operation Type
 * @type select
 * @option Set
 * @value =
 * @option Add
 * @value +
 * @option Sub
 * @value -
 * @option Mul
 * @value *
 * @option Div
 * @value /
 * @option Mod
 * @value %
 * @desc What operation do you wish to use for this Plugin Command?
 * @default =
 *
 * @arg operand:eval
 * @text Operand Modifier
 * @desc Value to be used in calculating the target variable.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableJsBlock
 * @text Variable: JS Block
 * @desc Pick a variable ID and value to alter through JS.
 * Functions like RM2k3's Variable Pointers.
 *
 * @arg id:func
 * @text Variable ID
 * @type note
 * @desc This is the target variable to alter.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default "// Declare Variables\nlet varID = 1;\n\n// Perform Calculations\n\n// Return Variable ID\nreturn varID;"
 *
 * @arg operation:str
 * @text Operation Type
 * @type select
 * @option Set
 * @value =
 * @option Add
 * @value +
 * @option Sub
 * @value -
 * @option Mul
 * @value *
 * @option Div
 * @value /
 * @option Mod
 * @value %
 * @desc What operation do you wish to use for this Plugin Command?
 * @default =
 *
 * @arg operand:func
 * @text Operand Modifier
 * @type note
 * @desc Value to be used in calculating the target variable.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default "// Declare Variables\nlet value = 0;\n\n// Perform Calculations\n\n// Return Variable ID\nreturn value;"
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
 * @param CoreEngine
 * @default Plugin Parameters
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param QoL:struct
 * @text Quality of Life Settings
 * @type struct<QoLSettings>
 * @desc Quality of Life settings for both developers and players.
 * @default {"PlayTest":"","NewGameBoot:eval":"true","ForceNoPlayTest:eval":"false","OpenConsole:eval":"true","F6key:eval":"true","F7key:eval":"true","NewGameCommonEvent:num":"0","BattleTest":"","BTestItems:eval":"true","BTestWeapons:eval":"true","BTestArmors:eval":"true","BTestAddedQuantity:num":"90","ShiftR_Toggle:eval":"true","ShiftT_Toggle:eval":"true","DigitGrouping":"","DigitGroupingStandardText:eval":"true","DigitGroupingExText:eval":"true","DigitGroupingDamageSprites:eval":"true","DigitGroupingGaugeSprites:eval":"true","DigitGroupingLocale:str":"en-US","PlayerBenefit":"","EncounterRateMinimum:num":"10","EscapeAlways:eval":"true","ImprovedAccuracySystem:eval":"true","AccuracyBoost:eval":"true","LevelUpFullHp:eval":"true","LevelUpFullMp:eval":"true","Pictures":"","AntiZoomPictures:eval":"true","PictureContainers":"","DetachBattlePictureContainer:eval":"false","DetachMapPictureContainer:eval":"false","Misc":"","AnimationMirrorOffset:eval":"false","AutoStretch:str":"default","FontShadows:eval":"false","FontSmoothing:eval":"true","FontWidthFix:eval":"true","KeyItemProtect:eval":"true","MapNameTextCode:eval":"true","ModernControls:eval":"true","MvAnimationRate:num":"4","NewGameCommonEventAll:num":"0","NoTileShadows:eval":"false","PixelateImageRendering:eval":"false","RequireFocus:eval":"false","ShortcutScripts:eval":"true","SmartEventCollisionPriority:eval":"true","SubfolderParse:eval":"true"}
 * 
 * @param BattleSystem:str
 * @text Battle System
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to use for your game.
 * Some battle systems REQUIRE their specific plugins!
 * @default database
 *
 * @param Color:struct
 * @text Color Settings
 * @type struct<Color>
 * @desc Change the colors used for in-game text.
 * @default {"BasicColors":"","ColorNormal:str":"0","ColorSystem:str":"16","ColorCrisis:str":"17","ColorDeath:str":"18","ColorGaugeBack:str":"19","ColorHPGauge1:str":"20","ColorHPGauge2:str":"21","ColorMPGauge1:str":"22","ColorMPGauge2:str":"23","ColorMPCost:str":"23","ColorPowerUp:str":"24","ColorPowerDown:str":"25","ColorCTGauge1:str":"26","ColorCTGauge2:str":"27","ColorTPGauge1:str":"28","ColorTPGauge2:str":"29","ColorTPCost:str":"29","ColorPending:str":"#2a847d","ColorExpGauge1:str":"30","ColorExpGauge2:str":"31","ColorMaxLvGauge1:str":"14","ColorMaxLvGauge2:str":"6","AlphaColors":"","OutlineColor:str":"rgba(0, 0, 0, 0.6)","DimColor1:str":"rgba(0, 0, 0, 0.6)","DimColor2:str":"rgba(0, 0, 0, 0)","ItemBackColor1:str":"rgba(32, 32, 32, 0.5)","ItemBackColor2:str":"rgba(0, 0, 0, 0.5)","ConditionalColors":"","ActorHPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If the actor is dead, return death color.\\n} else if (actor.isDead()) {\\n    return this.deathColor();\\n\\n// If the actor is dying, return crisis color.\\n} else if (actor.isDying()) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorMPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If MP rate is below 25%, return crisis color.\\n} else if (actor.mpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorTPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If TP rate is below 25%, return crisis color.\\n} else if (actor.tpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ParamChange:func":"\"// Set the variables used in this function.\\nlet change = arguments[0];\\n\\n// If a positive change, use power up color.\\nif (change > 0) {\\n    return this.powerUpColor();\\n\\n// If a negative change, use power down color.\\n} else if (change < 0) {\\n    return this.powerDownColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","DamageColor:func":"\"// Set the variables used in this function.\\nlet colorType = arguments[0];\\n\\n// Check the value of the color type\\n// and return an appropriate color.\\nswitch (colorType) {\\n\\n    case 0: // HP damage\\n        return \\\"#ffffff\\\";\\n\\n    case 1: // HP recover\\n        return \\\"#b9ffb5\\\";\\n\\n    case 2: // MP damage\\n        return \\\"#bb88bb\\\";\\n\\n    case 3: // MP recover\\n        return \\\"#80b0ff\\\";\\n\\n    default:\\n        return \\\"#808080\\\";\\n}\""}
 *
 * @param Gold:struct
 * @text Gold Settings
 * @type struct<Gold>
 * @desc Change up how gold operates and is displayed in-game.
 * @default {"GoldMax:num":"999999999","GoldFontSize:num":"24","GoldIcon:num":"314","GoldOverlap:str":"A Lot","ItemStyle:eval":"true"}
 *
 * @param ImgLoad:struct
 * @text Image Loading
 * @type struct<ImgLoad>
 * @desc Game images that will be loaded upon booting up the game.
 * Use this responsibly!!!
 * @default {"animations:arraystr":"[]","battlebacks1:arraystr":"[]","battlebacks2:arraystr":"[]","characters:arraystr":"[]","enemies:arraystr":"[]","faces:arraystr":"[]","parallaxes:arraystr":"[]","pictures:arraystr":"[]","sv_actors:arraystr":"[]","sv_enemies:arraystr":"[]","system:arraystr":"[\"Balloon\",\"IconSet\"]","tilesets:arraystr":"[]","titles1:arraystr":"[]","titles2:arraystr":"[]"}
 *
 * @param KeyboardInput:struct
 * @text Keyboard Input
 * @type struct<KeyboardInput>
 * @desc Settings for the game that utilize keyboard input.
 * @default {"Controls":"","WASD:eval":"false","DashToggleR:eval":"false","NameInput":"","EnableNameInput:eval":"true","DefaultMode:str":"keyboard","QwertyLayout:eval":"true","NameInputMessage:eval":"\"Type in this character's name.\\nPress \\\\c[5]ENTER\\\\c[0] when you're done.\\n\\n-or-\\n\\nPress \\\\c[5]arrow keys\\\\c[0]/\\\\c[5]TAB\\\\c[0] to switch\\nto manual character entry.\\n\\nPress \\\\c[5]ESC\\\\c[0]/\\\\c[5]TAB\\\\c[0] to use to keyboard.\"","NumberInput":"","EnableNumberInput:eval":"true","ButtonAssist":"","Keyboard:str":"Keyboard","Manual:str":"Manual"}
 *
 * @param MenuBg:struct
 * @text Menu Background Settings
 * @type struct<MenuBg>
 * @desc Change how menu backgrounds look for each scene.
 * @default {"Scene_Menu:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Item:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Skill:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Equip:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Status:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Options:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Save:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Load:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_GameEnd:struct":"{\"SnapshotOpacity:num\":\"128\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Shop:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Name:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Unlisted:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}"}
 *
 * @param ButtonAssist:struct
 * @text Menu Button Assist Window
 * @type struct<ButtonAssist>
 * @desc Settings pertaining to the Button Assist window found in in-game menus.
 * @default {"General":"","Enable:eval":"true","Location:str":"bottom","BgType:num":"0","Text":"","TextFmt:str":"%1:%2","MultiKeyFmt:str":"%1/%2","OkText:str":"Select","CancelText:str":"Back","SwitchActorText:str":"Switch Ally","Keys":"","KeyUnlisted:str":"\\}❪%1❫\\{","KeyUP:str":"^","KeyDOWN:str":"v","KeyLEFT:str":"<<","KeyRIGHT:str":">>","KeySHIFT:str":"\\}❪SHIFT❫\\{","KeyTAB:str":"\\}❪TAB❫\\{","KeyA:str":"A","KeyB:str":"B","KeyC:str":"C","KeyD:str":"D","KeyE:str":"E","KeyF:str":"F","KeyG:str":"G","KeyH:str":"H","KeyI:str":"I","KeyJ:str":"J","KeyK:str":"K","KeyL:str":"L","KeyM:str":"M","KeyN:str":"N","KeyO:str":"O","KeyP:str":"P","KeyQ:str":"Q","KeyR:str":"R","KeyS:str":"S","KeyT:str":"T","KeyU:str":"U","KeyV:str":"V","KeyW:str":"W","KeyX:str":"X","KeyY:str":"Y","KeyZ:str":"Z"}
 *
 * @param ControllerButtons:arraystruct
 * @text Controller Button Assist
 * @parent ButtonAssist:struct
 * @type struct<ControllerButtons>[]
 * @desc Make different icons appear for the Button Assist window when using different controllers.
 * @default []
 *
 * @param MenuLayout:struct
 * @text Menu Layout Settings
 * @type struct<MenuLayout>
 * @desc Change how menu layouts look for each scene.
 * @default {"Title:struct":"{\"TitleScreen\":\"\",\"DocumentTitleFmt:str\":\"%1: %2 - Version %3\",\"Subtitle:str\":\"Subtitle\",\"Version:str\":\"0.00\",\"drawGameTitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = $dataSystem.gameTitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 8;\\\\nbitmap.fontSize = 72;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameSubtitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4 + 72;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = Scene_Title.subtitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 6;\\\\nbitmap.fontSize = 48;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameVersion:func\":\"\\\"const bitmap = this._gameTitleSprite.bitmap;\\\\nconst x = 0;\\\\nconst y = Graphics.height - 20;\\\\nconst width = Math.round(Graphics.width / 4);\\\\nconst height = 20;\\\\nconst c1 = ColorManager.dimColor1();\\\\nconst c2 = ColorManager.dimColor2();\\\\nconst text = 'Version ' + Scene_Title.version;\\\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 3;\\\\nbitmap.fontSize = 16;\\\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\\\\\"left\\\\\\\");\\\"\",\"CommandRect:func\":\"\\\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\\\nconst rows = this.commandWindowRows();\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ButtonFadeSpeed:num\":\"4\"}","MainMenu:struct":"{\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const width = this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight();\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ItemMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaBottom() - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SkillMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SkillTypeWindow\":\"\",\"SkillTypeBgType:num\":\"0\",\"SkillTypeRect:func\":\"\\\"const rows = 3;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this._skillTypeWindow.height;\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._statusWindow.y + this._statusWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","EquipMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = this.statusWidth();\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = this.statusWidth();\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SlotWindow\":\"\",\"SlotBgType:num\":\"0\",\"SlotRect:func\":\"\\\"const commandWindowRect = this.commandWindowRect();\\\\nconst x = this.statusWidth();\\\\nconst y = commandWindowRect.y + commandWindowRect.height;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"return this.slotWindowRect();\\\"\"}","StatusMenu:struct":"{\"ProfileWindow\":\"\",\"ProfileBgType:num\":\"0\",\"ProfileRect:func\":\"\\\"const width = Graphics.boxWidth;\\\\nconst height = this.profileHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.statusParamsWindowRect().y - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusParamsWindow\":\"\",\"StatusParamsBgType:num\":\"0\",\"StatusParamsRect:func\":\"\\\"const width = this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusEquipWindow\":\"\",\"StatusEquipBgType:num\":\"0\",\"StatusEquipRect:func\":\"\\\"const width = Graphics.boxWidth - this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = this.statusParamsWidth();\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","OptionsMenu:struct":"{\"OptionsWindow\":\"\",\"OptionsBgType:num\":\"0\",\"OptionsRect:func\":\"\\\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\\\nconst width = 400;\\\\nconst height = this.calcWindowHeight(n, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SaveMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","LoadMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","GameEnd:struct":"{\"CommandList:arraystruct\":\"[\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"toTitle\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.toTitle;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"cancel\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.cancel;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.popScene();\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const rows = 2;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ShopMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const wx = 0;\\\\nconst wy = this.helpAreaTop();\\\\nconst ww = Graphics.boxWidth;\\\\nconst wh = this.helpAreaHeight();\\\\nreturn new Rectangle(wx, wy, ww, wh);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = this._goldWindow.x;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"DummyWindow\":\"\",\"DummyBgType:num\":\"0\",\"DummyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._commandWindow.y + this._commandWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"NumberWindow\":\"\",\"NumberBgType:num\":\"0\",\"NumberRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this._dummyWindow.y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"BuyWindow\":\"\",\"BuyBgType:num\":\"0\",\"BuyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SellWindow\":\"\",\"SellBgType:num\":\"0\",\"SellRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height =\\\\n    this.mainAreaHeight() -\\\\n    this._commandWindow.height -\\\\n    this._categoryWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","NameMenu:struct":"{\"EditWindow\":\"\",\"EditBgType:num\":\"0\",\"EditRect:func\":\"\\\"const rows = 9;\\\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\\\nconst padding = $gameSystem.windowPadding();\\\\nconst width = 600;\\\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"InputWindow\":\"\",\"InputBgType:num\":\"0\",\"InputRect:func\":\"\\\"const x = this._editWindow.x;\\\\nconst y = this._editWindow.y + this._editWindow.height;\\\\nconst rows = 9;\\\\nconst width = this._editWindow.width;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}"}
 *
 * @param Param:struct
 * @text Parameter Settings
 * @type struct<Param>
 * @desc Change up the limits of parameters and how they're calculated.
 * @default {"DisplayedParams:arraystr":"[\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","ExtDisplayedParams:arraystr":"[\"MaxHP\",\"MaxMP\",\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","BasicParameters":"","CrisisRate:num":"0.25","BasicParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet paramId = arguments[0];\\nlet base = this.paramBase(paramId);\\nlet plus = this.paramPlus(paramId);\\nlet paramRate = this.paramRate(paramId);\\nlet buffRate = this.paramBuffRate(paramId);\\nlet flatBonus = this.paramFlatBonus(paramId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\\n\\n// Determine the limits\\nconst maxValue = this.paramMax(paramId);\\nconst minValue = this.paramMin(paramId);\\n\\n// Final value\\nreturn Math.round(value.clamp(minValue, maxValue));\"","BasicParamCaps":"","BasicActorParamCaps":"","BasicActorParamMax0:str":"9999","BasicActorParamMax1:str":"9999","BasicActorParamMax2:str":"999","BasicActorParamMax3:str":"999","BasicActorParamMax4:str":"999","BasicActorParamMax5:str":"999","BasicActorParamMax6:str":"999","BasicActorParamMax7:str":"999","BasicEnemyParamCaps":"","BasicEnemyParamMax0:str":"999999","BasicEnemyParamMax1:str":"9999","BasicEnemyParamMax2:str":"999","BasicEnemyParamMax3:str":"999","BasicEnemyParamMax4:str":"999","BasicEnemyParamMax5:str":"999","BasicEnemyParamMax6:str":"999","BasicEnemyParamMax7:str":"999","XParameters":"","XParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet xparamId = arguments[0];\\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\\nlet plus = this.xparamPlus(xparamId);\\nlet paramRate = this.xparamRate(xparamId);\\nlet flatBonus = this.xparamFlatBonus(xparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","XParamVocab":"","XParamVocab0:str":"Hit","XParamVocab1:str":"Evasion","XParamVocab2:str":"Critical Rate","XParamVocab3:str":"Critical Evade","XParamVocab4:str":"Magic Evade","XParamVocab5:str":"Magic Reflect","XParamVocab6:str":"Counter","XParamVocab7:str":"HP Regen","XParamVocab8:str":"MP Regen","XParamVocab9:str":"TP Regen","SParameters":"","SParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet sparamId = arguments[0];\\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\\nlet plus = this.sparamPlus(sparamId);\\nlet paramRate = this.sparamRate(sparamId);\\nlet flatBonus = this.sparamFlatBonus(sparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","SParamVocab":"","SParamVocab0:str":"Aggro","SParamVocab1:str":"Guard","SParamVocab2:str":"Recovery","SParamVocab3:str":"Item Effect","SParamVocab4:str":"MP Cost","SParamVocab5:str":"TP Charge","SParamVocab6:str":"Physical DMG","SParamVocab7:str":"Magical DMG","SParamVocab8:str":"Floor DMG","SParamVocab9:str":"EXP Gain","Icons":"","DrawIcons:eval":"true","IconParam0:str":"84","IconParam1:str":"165","IconParam2:str":"76","IconParam3:str":"81","IconParam4:str":"101","IconParam5:str":"133","IconParam6:str":"140","IconParam7:str":"87","IconXParam0:str":"102","IconXParam1:str":"82","IconXParam2:str":"78","IconXParam3:str":"82","IconXParam4:str":"171","IconXParam5:str":"222","IconXParam6:str":"77","IconXParam7:str":"72","IconXParam8:str":"72","IconXParam9:str":"72","IconSParam0:str":"5","IconSParam1:str":"128","IconSParam2:str":"72","IconSParam3:str":"176","IconSParam4:str":"165","IconSParam5:str":"164","IconSParam6:str":"76","IconSParam7:str":"79","IconSParam8:str":"141","IconSParam9:str":"73"}
 *
 * @param CustomParam:arraystruct
 * @text Custom Parameters
 * @parent Param:struct
 * @type struct<CustomParam>[]
 * @desc Create custom parameters for your game!
 * These will appear in VisuStella MZ menus.
 * @default ["{\"ParamName:str\":\"Strength\",\"Abbreviation:str\":\"str\",\"Icon:num\":\"77\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.atk * 0.75) + (user.def * 0.25);\\\"\"}","{\"ParamName:str\":\"Dexterity\",\"Abbreviation:str\":\"dex\",\"Icon:num\":\"82\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.agi * 0.75) + (user.atk * 0.25);\\\"\"}","{\"ParamName:str\":\"Constitution\",\"Abbreviation:str\":\"con\",\"Icon:num\":\"81\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.def * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Intelligence\",\"Abbreviation:str\":\"int\",\"Icon:num\":\"79\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mat * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Wisdom\",\"Abbreviation:str\":\"wis\",\"Icon:num\":\"72\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mdf * 0.75) + (user.luk * 0.25);\\\"\"}","{\"ParamName:str\":\"Charisma\",\"Abbreviation:str\":\"cha\",\"Icon:num\":\"84\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.luk * 0.75) + (user.agi * 0.25);\\\"\"}"]
 *
 * @param ScreenResolution:struct
 * @text Screen Resolution Settings
 * @type struct<ScreenResolution>
 * @desc Alter various properties to make the game look better for varying screen resolutions.
 * @default {"Maps":"","AutoScrollLockX:eval":"true","AutoScrollLockY:eval":"true","DisplayLockX:num":"0.15625","DisplayLockY:num":"0.00000","Troops":"","RepositionActors:eval":"true","RepositionEnemies:eval":"true","RepositionEnemies130:eval":"false"}
 *
 * @param ScreenShake:struct
 * @text Screen Shake Settings
 * @type struct<ScreenShake>
 * @desc Get more screen shake effects into your game!
 * @default {"DefaultStyle:str":"random","originalJS:func":"\"// Calculation\\nthis.x += Math.round($gameScreen.shake());\"","randomJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","horzJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","vertJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\""}
 *
 * @param TitleCommandList:arraystruct
 * @text Title Command List
 * @type struct<Command>[]
 * @desc Window commands used by the title screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"newGame\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.newGame;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandNewGame();\\\"\"}","{\"Symbol:str\":\"continue\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.continue_;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandContinue();\\\"\"}","{\"Symbol:str\":\"options\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\"}","{\"Symbol:str\":\"shutdown\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return Utils.isNwjs();\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager.exit();\\\\n\\\\n// Note!\\\\n// Do NOT use this command with mobile devices or\\\\n// browser games. All it does is cause the game to\\\\n// display a blank, black canvas which the player\\\\n// is unable to do anything with. It does NOT force\\\\n// close the browser tab nor the app.\\\"\"}"]
 *
 * @param TitlePicButtons:arraystruct
 * @text Title Picture Buttons
 * @type struct<TitlePictureButton>[]
 * @desc Buttons that can be inserted into the title screen.
 * Add new title buttons here.
 * @default []
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Change up various in-game UI aspects.
 * @default {"UIArea":"","FadeSpeed:num":"24","BoxMargin:num":"4","CommandWidth:num":"240","BottomHelp:eval":"false","RightMenus:eval":"true","ShowButtons:eval":"true","cancelShowButton:eval":"true","menuShowButton:eval":"true","pagedownShowButton:eval":"true","numberShowButton:eval":"true","ButtonHeight:num":"52","BottomButtons:eval":"false","SideButtons:eval":"true","MenuObjects":"","LvExpGauge:eval":"true","ParamArrow:str":"→","TextCodeSupport":"","TextCodeClassNames:eval":"true","TextCodeNicknames:eval":"true"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Adjust various in-game window settings.
 * @default {"WindowDefaults":"","EnableMasking:eval":"false","LineHeight:num":"36","ItemPadding:num":"8","BackOpacity:num":"192","TranslucentOpacity:num":"160","OpenSpeed:num":"32","ColSpacing:num":"8","RowSpacing:num":"4","ScrollBar":"","ShowScrollBar:eval":"true","BarThickness:num":"2","BarOffset:num":"+2","BarBodyColor:str":"0","OffBarColor:str":"7","OffBarOpacity:num":"128","SelectableItems":"","ShowItemBackground:eval":"true","ItemHeight:num":"8","DrawItemBackgroundJS:func":"\"const rect = arguments[0];\\nconst c1 = ColorManager.itemBackColor1();\\nconst c2 = ColorManager.itemBackColor2();\\nconst x = rect.x;\\nconst y = rect.y;\\nconst w = rect.width;\\nconst h = rect.height;\\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\\nthis.contentsBack.strokeRect(x, y, w, h, c1);\"","TextPopup":"","DurationPerChat:num":"1.5","MinDuration:num":"90","MaxDuration:num":"300"}
 *
 * @param jsQuickFunc:arraystruct
 * @text JS: Quick Functions
 * @type struct<jsQuickFunc>[]
 * @desc Create quick JavaScript functions available from the
 * global namespace. Use with caution and moderation!!!
 * @default ["{\"FunctionName:str\":\"Example\",\"CodeJS:json\":\"\\\"// Insert this as a function anywhere you can input code\\\\n// such as Script Calls or Conditional Branch Scripts.\\\\n\\\\n// Process Code\\\\nreturn 'Example';\\\"\"}","{\"FunctionName:str\":\"Bad  Code  Name\",\"CodeJS:json\":\"\\\"// If a function name has spaces in them, the spaces will\\\\n// be removed. \\\\\\\"Bad  Code  Name\\\\\\\" becomes \\\\\\\"BadeCodeName\\\\\\\".\\\\n\\\\n// Process Code\\\\nOhNoItsBadCode()\\\\n\\\\n// If a function has bad code, a fail safe will catch the\\\\n// error and display it in the console.\\\"\"}","{\"FunctionName:str\":\"RandomNumber\",\"CodeJS:json\":\"\\\"// This generates a random number from 0 to itself.\\\\n// Example: RandomNumber(10)\\\\n\\\\n// Process Code\\\\nconst number = (arguments[0] || 0) + 1;\\\\nreturn Math.floor(number * Math.random());\\\"\"}","{\"FunctionName:str\":\"RandomBetween\",\"CodeJS:json\":\"\\\"// This generates a random number between two arguments.\\\\n// Example: RandomBetween(5, 10)\\\\n\\\\n// Process Code\\\\nlet min = Math.min(arguments[0] || 0, arguments[1] || 0);\\\\nlet max = Math.max(arguments[0] || 0, arguments[1] || 0);\\\\nreturn Math.floor(Math.random() * (max - min + 1) + min);\\\"\"}","{\"FunctionName:str\":\"RandomFrom\",\"CodeJS:json\":\"\\\"// Selects a number from the list of inserted numbers.\\\\n// Example: RandomFrom(5, 10, 15, 20)\\\\n\\\\n// Process Code\\\\nreturn arguments[Math.randomInt(arguments.length)];\\\"\"}"]
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
 * Quality of Life Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~QoLSettings:
 *
 * @param PlayTest
 * @text Play Test
 *
 * @param NewGameBoot:eval
 * @text New Game on Boot
 * @parent PlayTest
 * @type boolean
 * @on Start New Game
 * @off Keep Title Screen
 * @desc Automatically start a new game on Play Test?
 * Only enabled during Play Test.
 * @default false
 *
 * @param ForceNoPlayTest:eval
 * @text No Play Test Mode
 * @parent PlayTest
 * @type boolean
 * @on Cancel Play Test
 * @off Keep Play Test
 * @desc Force the game to be out of Play Test mode when play testing.
 * @default false
 *
 * @param OpenConsole:eval
 * @text Open Console on Boot
 * @parent PlayTest
 * @type boolean
 * @on Open
 * @off Don't Open
 * @desc Open the Debug Console upon booting up your game?
 * Only enabled during Play Test.
 * @default true
 *
 * @param F6key:eval
 * @text F6: Toggle Sound
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F6 Key Function: Turn on all sound to 100% or to 0%,
 * toggling between the two.
 * @default true
 *
 * @param F7key:eval
 * @text F7: Toggle Fast Mode
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F7 Key Function: Toggle fast mode.
 * @default true
 *
 * @param CtrlQuickLoad:eval
 * @text CTRL + n: Quick Load
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc CTRL + a number from 1 to 9 will yield a quick load of
 * that safe file. Does not count auto saves.
 * @default true
 *
 * @param NewGameCommonEvent:num
 * @text NewGame > CommonEvent
 * @parent PlayTest
 * @type common_event
 * @desc Runs a common event each time a new game during play test
 * session is started.
 * @default 0
 *
 * @param BattleTest
 * @text Battle Test
 *
 * @param BTestItems:eval
 * @text Add Item Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database item?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestWeapons:eval
 * @text Add Weapon Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database weapon?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestArmors:eval
 * @text Add Armor Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database armor?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestAddedQuantity:num
 * @text Added Quantity
 * @parent BattleTest
 * @type number
 * @min 1
 * @desc Determines how many items are added during a battle test instead of the maximum amount.
 * @default 90
 *
 * @param ShiftR_Toggle:eval
 * @text Shift+R: Recover All
 * @parent BattleTest
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc For Play Test only! During battle, pressing SHIFT + R will refill the whole party's HP and MP and status.
 * @default true
 *
 * @param ShiftT_Toggle:eval
 * @text Shift+T: Full TP
 * @parent BattleTest
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc For Play Test only! During battle, pressing SHIFT + T will refill the whole party's TP.
 * @default true
 *
 * @param DigitGrouping
 * @text Digit Grouping
 *
 * @param DigitGroupingStandardText:eval
 * @text Standard Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * standard text inside windows?
 * @default true
 *
 * @param DigitGroupingExText:eval
 * @text Ex Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * ex text, written through drawTextEx (like messages)?
 * @default true
 *
 * @param DigitGroupingDamageSprites:eval
 * @text Damage Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * in-battle damage sprites?
 * @default true
 *
 * @param DigitGroupingGaugeSprites:eval
 * @text Gauge Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * visible gauge sprites such as HP, MP, and TP gauges?
 * @default true
 *
 * @param DigitGroupingLocale:str
 * @text Country/Locale
 * @parent DigitGrouping
 * @type combo
 * @option ar-SA
 * @option bn-BD
 * @option bn-IN
 * @option cs-CZ
 * @option da-DK
 * @option de-AT
 * @option de-CH
 * @option de-DE
 * @option el-GR
 * @option en-AU
 * @option en-CA
 * @option en-GB
 * @option en-IE
 * @option en-IN
 * @option en-NZ
 * @option en-US
 * @option en-ZA
 * @option es-AR
 * @option es-CL
 * @option es-CO
 * @option es-ES
 * @option es-MX
 * @option es-US
 * @option fi-FI
 * @option fr-BE
 * @option fr-CA
 * @option fr-CH
 * @option fr-FR
 * @option he-IL
 * @option hi-IN
 * @option hu-HU
 * @option id-ID
 * @option it-CH
 * @option it-IT
 * @option jp-JP
 * @option ko-KR
 * @option nl-BE
 * @option nl-NL
 * @option no-NO
 * @option pl-PL
 * @option pt-BR
 * @option pt-PT
 * @option ro-RO
 * @option ru-RU
 * @option sk-SK
 * @option sv-SE
 * @option ta-IN
 * @option ta-LK
 * @option th-TH
 * @option tr-TR
 * @option zh-CN
 * @option zh-HK
 * @option zh-TW
 * @desc Base the digit grouping on which country/locale?
 * @default en-US
 *
 * @param PlayerBenefit
 * @text Player Benefit
 *
 * @param EncounterRateMinimum:num
 * @text Encounter Rate Min
 * @parent PlayerBenefit
 * @min 1
 * @desc Minimum number of steps the player can take without any random encounters.
 * @default 10
 *
 * @param EscapeAlways:eval
 * @text Escape Always
 * @parent PlayerBenefit
 * @type boolean
 * @on Always
 * @off Default
 * @desc If the player wants to escape a battle, let them escape the battle with 100% chance.
 * @default true
 *
 * @param ImprovedAccuracySystem:eval
 * @text Accuracy Formula
 * @parent PlayerBenefit
 * @type boolean
 * @on Improve
 * @off Default
 * @desc Accuracy formula calculation change to
 * Skill Hit% * (User HIT - Target EVA) for better results.
 * @default true
 *
 * @param AccuracyBoost:eval
 * @text Accuracy Boost
 * @parent PlayerBenefit
 * @type boolean
 * @on Boost
 * @off Default
 * @desc Boost HIT and EVA rates in favor of the player.
 * @default true
 *
 * @param LevelUpFullHp:eval
 * @text Level Up -> Full HP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full HP when an actor levels up.
 * @default true
 *
 * @param LevelUpFullMp:eval
 * @text Level Up -> Full MP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full MP when an actor levels up.
 * @default true
 *
 * @param Pictures
 * @text Picture-Related
 *
 * @param AntiZoomPictures:eval
 * @text Anti-Zoom Pictures
 * @parent Pictures
 * @type boolean
 * @on Anti-Zoom
 * @off Normal
 * @desc If on, prevents pictures from being affected by zoom.
 * @default true
 * 
 * @param PictureContainers
 * @text Picture Containers
 * @parent Pictures
 *
 * @param DetachBattlePictureContainer:eval
 * @text Detach in Battle
 * @parent PictureContainers
 * @type boolean
 * @on Detach
 * @off Normal
 * @desc If detached, picture container will be separated from
 * the spriteset while on the battle scene.
 * @default false
 *
 * @param DetachMapPictureContainer:eval
 * @text Detach in Map
 * @parent PictureContainers
 * @type boolean
 * @on Detach
 * @off Normal
 * @desc If detached, picture container will be separated from
 * the spriteset while on the map scene.
 * @default false
 *
 * @param Misc
 * @text Misc
 *
 * @param AnimationMirrorOffset:eval
 * @text Ani: Mirror Offset
 * @parent Misc
 * @type boolean
 * @on Mirror
 * @off Don't Mirror
 * @desc When animations are mirrored,
 * mirror their Offset X values, too.
 * @default false
 *
 * @param AutoStretch:str
 * @text Auto-Stretch
 * @parent Misc
 * @type select
 * @option Default
 * @value default
 * @option Stretch
 * @value stretch
 * @option Normal
 * @value normal
 * @desc Automatically stretch the game to fit the size of the client?
 * @default default
 *
 * @param FontShadows:eval
 * @text Font Shadows
 * @parent Misc
 * @type boolean
 * @on Shadows
 * @off Outlines
 * @desc If on, text uses shadows instead of outlines.
 * @default false
 *
 * @param FontSmoothing:eval
 * @text Font Smoothing
 * @parent Misc
 * @type boolean
 * @on Smooth
 * @off None
 * @desc If on, smoothes fonts shown in-game.
 * @default true
 *
 * @param FontWidthFix:eval
 * @text Font Width Fix
 * @parent Misc
 * @type boolean
 * @on Fix
 * @off Default
 * @desc Fixes the font width issue with instant display
 * non-monospaced fonts in the Message Window.
 * @default true
 *
 * @param KeyItemProtect:eval
 * @text Key Item Protection
 * @parent Misc
 * @type boolean
 * @on Unsellable
 * @off Sellable
 * @desc If on, prevents Key Items from being able to be sold and from being able to be consumed.
 * @default true
 *
 * @param MapNameTextCode:eval
 * @text Map Name Text Code
 * @parent Misc
 * @type boolean
 * @on Text Codes
 * @off Raw Text
 * @desc If on, map names will use text codes.
 * If off, only the raw map name will be used.
 * @default true
 *
 * @param ModernControls:eval
 * @text Modern Controls
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Default
 * @desc If on, allows usage of the Home/End buttons as well as other modern configs. Affects other VisuStella plugins.
 * @default true
 *
 * @param MvAnimationRate:num
 * @text MV Animation Rate
 * @parent Misc
 * @min 1
 * @max 10
 * @desc Adjusts the rate at which MV animations play.
 * Default: 4. Lower for faster. Higher for slower.
 * @default 4
 *
 * @param NewGameCommonEventAll:num
 * @text NewGame > CommonEvent
 * @parent Misc
 * @type common_event
 * @desc Runs a common event each time a new game during any session is started.
 * @default 0
 *
 * @param NoTileShadows:eval
 * @text No Tile Shadows
 * @parent Misc
 * @type boolean
 * @on Disable Tile Shadows
 * @off Default
 * @desc Removes tile shadows from being displayed in-game.
 * @default false
 *
 * @param PixelateImageRendering:eval
 * @text Pixel Image Rendering
 * @parent Misc
 * @type boolean
 * @on Pixelate
 * @off Smooth
 * @desc If on, pixelates the image rendering (for pixel games).
 * @default false
 *
 * @param RequireFocus:eval
 * @text Require Focus?
 * @parent Misc
 * @type boolean
 * @on Require
 * @off No Requirement
 * @desc Requires the game to be focused? If the game isn't
 * focused, it will pause if it's not the active window.
 * @default true
 *
 * @param ShortcutScripts:eval
 * @text Shortcut Scripts
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables shortcut-based scripts.
 * View the helpfile for more information.
 * @default true
 *
 * @param SmartEventCollisionPriority:eval
 * @text Smart Event Collision
 * @parent Misc
 * @type boolean
 * @on Only Same Level
 * @off Default
 * @desc Makes events only able to collide with one another if they're 'Same as characters' priority.
 * @default true
 *
 * @param SubfolderParse:eval
 * @text Subfolder Name Purge
 * @parent Misc
 * @type boolean
 * @on Purge Subfolders Names
 * @off Don't Purge Name
 * @desc Purge subfolder name from Plugin Parameters when reading
 * data to let Plugin Commands work properly.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param BasicColors
 * @text Basic Colors
 *
 * @param ColorNormal:str
 * @text Normal
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorSystem:str
 * @text System
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param ColorCrisis:str
 * @text Crisis
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param ColorDeath:str
 * @text Death
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param ColorGaugeBack:str
 * @text Gauge Back
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ColorHPGauge1:str
 * @text HP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 20
 *
 * @param ColorHPGauge2:str
 * @text HP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 21
 *
 * @param ColorMPGauge1:str
 * @text MP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param ColorMPGauge2:str
 * @text MP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorMPCost:str
 * @text MP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorPowerUp:str
 * @text Power Up
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorPowerDown:str
 * @text Power Down
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param ColorCTGauge1:str
 * @text CT Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param ColorCTGauge2:str
 * @text CT Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param ColorTPGauge1:str
 * @text TP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 28
 *
 * @param ColorTPGauge2:str
 * @text TP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorTPCost:str
 * @text TP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorPending:str
 * @text Pending Color
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #2a847d
 *
 * @param ColorExpGauge1:str
 * @text EXP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 30
 *
 * @param ColorExpGauge2:str
 * @text EXP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 31
 *
 * @param ColorMaxLvGauge1:str
 * @text MaxLv Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param ColorMaxLvGauge2:str
 * @text MaxLv Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param AlphaColors
 * @text Alpha Colors
 *
 * @param OutlineColor:str
 * @text Window Font Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param OutlineColorGauge:str
 * @text Gauge Number Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1.0)
 *
 * @param DimColor1:str
 * @text Dim Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param DimColor2:str
 * @text Dim Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0)
 *
 * @param ItemBackColor1:str
 * @text Item Back Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(32, 32, 32, 0.5)
 *
 * @param ItemBackColor2:str
 * @text Item Back Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param ConditionalColors
 * @text Conditional Colors
 *
 * @param ActorHPColor:func
 * @text JS: Actor HP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what HP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If the actor is dead, return death color.\n} else if (actor.isDead()) {\n    return this.deathColor();\n\n// If the actor is dying, return crisis color.\n} else if (actor.isDying()) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorMPColor:func
 * @text JS: Actor MP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what MP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If MP rate is below 25%, return crisis color.\n} else if (actor.mpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorTPColor:func
 * @text JS: Actor TP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what TP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If TP rate is below 25%, return crisis color.\n} else if (actor.tpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ParamChange:func
 * @text JS: Parameter Change
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining whatcolor to use for parameter changes.
 * @default "// Set the variables used in this function.\nlet change = arguments[0];\n\n// If a positive change, use power up color.\nif (change > 0) {\n    return this.powerUpColor();\n\n// If a negative change, use power down color.\n} else if (change < 0) {\n    return this.powerDownColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param DamageColor:func
 * @text JS: Damage Colors
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what color to use for damage types.
 * @default "// Set the variables used in this function.\nlet colorType = arguments[0];\n\n// Check the value of the color type\n// and return an appropriate color.\nswitch (colorType) {\n\n    case 0: // HP damage\n        return \"#ffffff\";\n\n    case 1: // HP recover\n        return \"#b9ffb5\";\n\n    case 2: // MP damage\n        return \"#bb88bb\";\n\n    case 3: // MP recover\n        return \"#80b0ff\";\n\n    default:\n        return \"#808080\";\n}"
 */
/* ----------------------------------------------------------------------------
 * Gold Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gold:
 *
 * @param GoldMax:num
 * @text Gold Max
 * @type num
 * @min 1
 * @desc Maximum amount of Gold the party can hold.
 * Default 99999999
 * @default 99999999
 *
 * @param GoldFontSize:num
 * @text Gold Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside Gold Windows.
 * Default: 26
 * @default 24
 *
 * @param GoldIcon:num
 * @text Gold Icon
 * @desc Icon used to represent Gold.
 * Use 0 for no icon.
 * @default 314
 *
 * @param GoldOverlap:str
 * @text Gold Overlap
 * @desc Text used too much Gold to fit in the window.
 * @default A Lot
 *
 * @param ItemStyle:eval
 * @text Item Style
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Draw gold in the item style?
 * ie: Icon, Label, Value
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Image Loading Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ImgLoad:
 *
 * @param animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default ["Balloon","IconSet"]
 *
 * @param tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Keyboard Input Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~KeyboardInput:
 *
 * @param Controls
 *
 * @param WASD:eval
 * @text WASD Movement
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables WASD movement for your game project.
 * Moves the W page down button to E.
 * @default false
 *
 * @param DashToggleR:eval
 * @text R Button: Dash Toggle
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables R button as an Always Dash option toggle.
 * @default false
 *
 * @param NameInput
 * @text Name Input
 *
 * @param EnableNameInput:eval
 * @text Enable?
 * @parent NameInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for name entry.
 * Only tested with English keyboards.
 * @default true
 * 
 * @param DefaultMode:str
 * @text Default Mode
 * @parent NameInput
 * @type select
 * @option Default - Uses Arrow Keys to select letters.
 * @value default
 * @option Keyboard - Uses Keyboard to type in letters.
 * @value keyboard
 * @desc Select default mode when entering the scene.
 * @default keyboard
 *
 * @param QwertyLayout:eval
 * @text QWERTY Layout
 * @parent NameInput
 * @type boolean
 * @on QWERTY Layout
 * @off ABCDEF Layout
 * @desc Uses the QWERTY layout for manual entry.
 * @default true
 *
 * @param NameInputMessage:eval
 * @text Keyboard Message
 * @parent NameInput
 * @type note
 * @desc The message displayed when allowing keyboard entry.
 * You may use text codes here.
 * @default "Type in this character's name.\nPress \\c[5]ENTER\\c[0] when you're done.\n\n-or-\n\nPress \\c[5]arrow keys\\c[0]/\\c[5]TAB\\c[0] to switch\nto manual character entry.\n\nPress \\c[5]ESC\\c[0]/\\c[5]TAB\\c[0] to use to keyboard."
 * 
 * @param BannedWords:arraystr
 * @text Banned Words
 * @parent NameInput
 * @type string[]
 * @desc Players cannot use these words for names.
 * These include words inside the names.
 * @default []
 *
 * @param NumberInput
 * @text Number Input
 *
 * @param EnableNumberInput:eval
 * @text Enable?
 * @parent NumberInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for number entry.
 * Only tested with English keyboards.
 * @default true
 *
 * @param ButtonAssist
 * @text Button Assist
 * 
 * @param Finish:str
 * @text Finish Entry
 * @parent ButtonAssist
 * @desc Text used to describe finish entry.
 * @default Finish
 * 
 * @param PageChange:str
 * @text Page Change
 * @parent ButtonAssist
 * @desc Text used to describe character page changing.
 * @default Page
 * 
 * @param Keyboard:str
 * @text Switch To Keyboard
 * @parent ButtonAssist
 * @desc Text used to describe the keyboard switch.
 * @default Keyboard
 * 
 * @param Manual:str
 * @text Switch To Manual
 * @parent ButtonAssist
 * @desc Text used to describe the manual entry switch.
 * @default Manual
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuBg:
 * 
 * @param BlurStrength:num
 * @text Blur Strength
 * @desc Strength used for menu background snapshots.
 * Default: 8. Higher is stronger. Lower is weaker.
 * @default 8
 *
 * @param Scene_Menu:struct
 * @text Scene_Menu
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Item:struct
 * @text Scene_Item
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Skill:struct
 * @text Scene_Skill
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Equip:struct
 * @text Scene_Equip
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Status:struct
 * @text Scene_Status
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Options:struct
 * @text Scene_Options
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Save:struct
 * @text Scene_Save
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Load:struct
 * @text Scene_Load
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_GameEnd:struct
 * @text Scene_GameEnd
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"128","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Shop:struct
 * @text Scene_Shop
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Name:struct
 * @text Scene_Name
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Unlisted:struct
 * @text Scene_Unlisted
 * @type struct<BgSettings>
 * @desc The individual background settings for any scenes that aren't listed here.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Button Assist Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ButtonAssist:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Enable the Menu Button Assist Window.
 * @default true
 *
 * @param Location:str
 * @text Location
 * @parent General
 * @type select
 * @option Top of Screen
 * @value top
 * @option Bottom of Screen
 * @value bottom
 * @desc Determine the location of the Button Assist Window.
 * Requires Plugin Parameters => UI => Side Buttons ON.
 * @default bottom
 *
 * @param BgType:num
 * @text Background Type
 * @parent General
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SplitEscape:eval
 * @text Split "Escape"
 * @parent General
 * @type boolean
 * @on Split
 * @off Don't
 * @desc "Split" makes separate instances of "Cancel" and "Menu".
 * "Don't" will consolidate both into "Escape".
 * @default false
 *
 * @param Text
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent Text
 * @desc Format on how the buttons are displayed.
 * Text codes allowed. %1 - Key, %2 - Text
 * @default %1:%2
 *
 * @param MultiKeyFmt:str
 * @text Multi-Key Format
 * @parent Text
 * @desc Format for actions with multiple keys.
 * Text codes allowed. %1 - Key 1, %2 - Key 2
 * @default %1/%2
 *
 * @param OkText:str
 * @text OK Text
 * @parent Text
 * @desc Default text used to display OK Key Action.
 * Text codes allowed.
 * @default Select
 *
 * @param CancelText:str
 * @text Cancel Text
 * @parent Text
 * @desc Default text used to display Cancel Key Action.
 * Text codes allowed.
 * @default Back
 *
 * @param SwitchActorText:str
 * @text Switch Actor Text
 * @parent Text
 * @desc Default text used to display Switch Actor Action.
 * Text codes allowed.
 * @default Switch Ally
 *
 * @param Keys
 *
 * @param KeyUnlisted:str
 * @text Key: Unlisted Format
 * @parent Keys
 * @desc If a key is not listed below, use this format.
 * Text codes allowed. %1 - Key
 * @default \}❪%1❫\{
 *
 * @param KeyUP:str
 * @text Key: Up
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default ^
 *
 * @param KeyDOWN:str
 * @text Key: Down
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default v
 *
 * @param KeyLEFT:str
 * @text Key: Left
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default <<
 *
 * @param KeyRIGHT:str
 * @text Key: Right
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default >>
 *
 * @param KeySHIFT:str
 * @text Key: Shift
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪SHIFT❫\{
 *
 * @param KeyTAB:str
 * @text Key: Tab
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪TAB❫\{
 *
 * @param KeyA:str
 * @text Key: A
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default A
 *
 * @param KeyB:str
 * @text Key: B
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default B
 *
 * @param KeyC:str
 * @text Key: C
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default C
 *
 * @param KeyD:str
 * @text Key: D
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default D
 *
 * @param KeyE:str
 * @text Key: E
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default E
 *
 * @param KeyF:str
 * @text Key: F
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default F
 *
 * @param KeyG:str
 * @text Key: G
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default G
 *
 * @param KeyH:str
 * @text Key: H
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default H
 *
 * @param KeyI:str
 * @text Key: I
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default I
 *
 * @param KeyJ:str
 * @text Key: J
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default J
 *
 * @param KeyK:str
 * @text Key: K
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default K
 *
 * @param KeyL:str
 * @text Key: L
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default L
 *
 * @param KeyM:str
 * @text Key: M
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default M
 *
 * @param KeyN:str
 * @text Key: N
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default N
 *
 * @param KeyO:str
 * @text Key: O
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default O
 *
 * @param KeyP:str
 * @text Key: P
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default P
 *
 * @param KeyQ:str
 * @text Key: Q
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Q
 *
 * @param KeyR:str
 * @text Key: R
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default R
 *
 * @param KeyS:str
 * @text Key: S
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default S
 *
 * @param KeyT:str
 * @text Key: T
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default T
 *
 * @param KeyU:str
 * @text Key: U
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default U
 *
 * @param KeyV:str
 * @text Key: V
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default V
 *
 * @param KeyW:str
 * @text Key: W
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default W
 *
 * @param KeyX:str
 * @text Key: X
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default X
 *
 * @param KeyY:str
 * @text Key: Y
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Y
 *
 * @param KeyZ:str
 * @text Key: Z
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Z
 *
 */
/* ----------------------------------------------------------------------------
 * Controller Buttons Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ControllerButtons:
 *
 * @param ID
 * @text ID Information
 *
 * @param Name:str
 * @text Controller ID Name
 * @parent ID
 * @desc Exact string used for this controller ID. Plugin Command
 * "Debug: Current Controller ID" for ID help.
 * @default Untitled
 *
 * @param Match:str
 * @text Similarity Match
 * @parent ID
 * @desc Similar text used for this controller ID. Plugin Command
 * "Debug: Current Controller ID" for ID help.
 * @default Untitled
 * 
 * @param Directions
 *
 * @param up:str
 * @text Up
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param left:str
 * @text Left
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param right:str
 * @text Right
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param down:str
 * @text Down
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 * 
 * @param Actions
 *
 * @param ok:str
 * @text OK
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param cancel:str
 * @text Cancel
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param menu:str
 * @text Menu
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param shift:str
 * @text Shift
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param pageup:str
 * @text Page Up
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param pagedown:str
 * @text Page Down
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuLayout:
 *
 * @param Title:struct
 * @text Scene_Title
 * @parent SceneSettings
 * @type struct<Title>
 * @desc Various options on adjusting the Title Scene.
 * @default {"TitleScreen":"","DocumentTitleFmt:str":"%1: %2 - Version %3","Subtitle:str":"Subtitle","Version:str":"0.00","drawGameTitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = $dataSystem.gameTitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 8;\\nbitmap.fontSize = 72;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameSubtitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4 + 72;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = Scene_Title.subtitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 6;\\nbitmap.fontSize = 48;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameVersion:func":"\"const bitmap = this._gameTitleSprite.bitmap;\\nconst x = 0;\\nconst y = Graphics.height - 20;\\nconst width = Math.round(Graphics.width / 4);\\nconst height = 20;\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\nconst text = 'Version ' + Scene_Title.version;\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 3;\\nbitmap.fontSize = 16;\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\"left\\\");\"","CommandRect:func":"\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\nconst rows = this.commandWindowRows();\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\nreturn new Rectangle(x, y, width, height);\"","ButtonFadeSpeed:num":"4"}
 *
 * @param MainMenu:struct
 * @text Scene_Menu
 * @parent SceneSettings
 * @type struct<MainMenu>
 * @desc Various options on adjusting the Main Menu Scene.
 * @default {"CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const width = this.mainCommandWidth();\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this.mainAreaHeight();\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ItemMenu:struct
 * @text Scene_Item
 * @parent SceneSettings
 * @type struct<ItemMenu>
 * @desc Various options on adjusting the Item Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaBottom() - y;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SkillMenu:struct
 * @text Scene_Skill
 * @parent SceneSettings
 * @type struct<SkillMenu>
 * @desc Various options on adjusting the Skill Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","SkillTypeWindow":"","SkillTypeBgType:num":"0","SkillTypeRect:func":"\"const rows = 3;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this._skillTypeWindow.height;\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._statusWindow.y + this._statusWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param EquipMenu:struct
 * @text Scene_Equip
 * @parent SceneSettings
 * @type struct<EquipMenu>
 * @desc Various options on adjusting the Equip Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = this.statusWidth();\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = this.statusWidth();\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SlotWindow":"","SlotBgType:num":"0","SlotRect:func":"\"const commandWindowRect = this.commandWindowRect();\\nconst x = this.statusWidth();\\nconst y = commandWindowRect.y + commandWindowRect.height;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"return this.slotWindowRect();\""}
 *
 * @param StatusMenu:struct
 * @text Scene_Status
 * @parent SceneSettings
 * @type struct<StatusMenu>
 * @desc Various options on adjusting the Status Menu Scene.
 * @default {"ProfileWindow":"","ProfileBgType:num":"0","ProfileRect:func":"\"const width = Graphics.boxWidth;\\nconst height = this.profileHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.statusParamsWindowRect().y - y;\\nreturn new Rectangle(x, y, width, height);\"","StatusParamsWindow":"","StatusParamsBgType:num":"0","StatusParamsRect:func":"\"const width = this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusEquipWindow":"","StatusEquipBgType:num":"0","StatusEquipRect:func":"\"const width = Graphics.boxWidth - this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = this.statusParamsWidth();\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param OptionsMenu:struct
 * @text Scene_Options
 * @parent SceneSettings
 * @type struct<OptionsMenu>
 * @desc Various options on adjusting the Options Menu Scene.
 * @default {"OptionsWindow":"","OptionsBgType:num":"0","OptionsRect:func":"\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\nconst width = 400;\\nconst height = this.calcWindowHeight(n, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SaveMenu:struct
 * @text Scene_Save
 * @parent SceneSettings
 * @type struct<SaveMenu>
 * @desc Various options on adjusting the Save Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param LoadMenu:struct
 * @text Scene_Load
 * @parent SceneSettings
 * @type struct<LoadMenu>
 * @desc Various options on adjusting the Load Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param GameEnd:struct
 * @text Scene_GameEnd
 * @parent SceneSettings
 * @type struct<GameEnd>
 * @desc Various options on adjusting the Game End Scene.
 * @default {"CommandList:arraystruct":"[\"{\\\"Symbol:str\\\":\\\"toTitle\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.toTitle;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"cancel\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.cancel;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.popScene();\\\\\\\"\\\"}\"]","CommandBgType:num":"0","CommandRect:func":"\"const rows = 2;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ShopMenu:struct
 * @text Scene_Shop
 * @parent SceneSettings
 * @type struct<ShopMenu>
 * @desc Various options on adjusting the Shop Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const wx = 0;\\nconst wy = this.helpAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.helpAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = this._goldWindow.x;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","DummyWindow":"","DummyBgType:num":"0","DummyRect:func":"\"const x = 0;\\nconst y = this._commandWindow.y + this._commandWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","NumberWindow":"","NumberBgType:num":"0","NumberRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._dummyWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._dummyWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","BuyWindow":"","BuyBgType:num":"0","BuyRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SellWindow":"","SellBgType:num":"0","SellRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height =\\n    this.mainAreaHeight() -\\n    this._commandWindow.height -\\n    this._categoryWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param NameMenu:struct
 * @text Scene_Name
 * @parent SceneSettings
 * @type struct<NameMenu>
 * @desc Various options on adjusting the Actor Rename Scene.
 * @default {"EditWindow":"","EditBgType:num":"0","EditRect:func":"\"const rows = 9;\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\nconst padding = $gameSystem.windowPadding();\\nconst width = 600;\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","InputWindow":"","InputBgType:num":"0","InputRect:func":"\"const x = this._editWindow.x;\\nconst y = this._editWindow.y + this._editWindow.height;\\nconst rows = 9;\\nconst width = this._editWindow.width;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\""}
 *
 */
/* ----------------------------------------------------------------------------
 * Main Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.mainCommandWidth();\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this.mainAreaHeight();\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaBottom() - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param SkillTypeBgType:num
 * @text Background Type
 * @parent SkillTypeWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SkillTypeRect:func
 * @text JS: X, Y, W, H
 * @parent SkillTypeWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 3;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this._skillTypeWindow.height;\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._statusWindow.y + this._statusWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._statusWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = this.statusWidth();\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this.statusWidth();\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SlotWindow
 * @text Slot Window
 *
 * @param SlotBgType:num
 * @text Background Type
 * @parent SlotWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SlotRect:func
 * @text JS: X, Y, W, H
 * @parent SlotWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const commandWindowRect = this.commandWindowRect();\nconst x = this.statusWidth();\nconst y = commandWindowRect.y + commandWindowRect.height;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.mainAreaHeight() - commandWindowRect.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "return this.slotWindowRect();"
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusMenu:
 *
 * @param ProfileWindow
 * @text Profile Window
 *
 * @param ProfileBgType:num
 * @text Background Type
 * @parent ProfileWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ProfileRect:func
 * @text JS: X, Y, W, H
 * @parent ProfileWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth;\nconst height = this.profileHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.statusParamsWindowRect().y - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusParamsWindow
 * @text Parameters Window
 *
 * @param StatusParamsBgType:num
 * @text Background Type
 * @parent StatusParamsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusParamsRect:func
 * @text JS: X, Y, W, H
 * @parent StatusParamsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusEquipWindow
 * @text Equipment Window
 *
 * @param StatusEquipBgType:num
 * @text Background Type
 * @parent StatusEquipWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusEquipRect:func
 * @text JS: X, Y, W, H
 * @parent StatusEquipWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = this.statusParamsWidth();\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Options Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~OptionsMenu:
 *
 * @param OptionsWindow
 * @text Options Window
 *
 * @param OptionsBgType:num
 * @text Background Type
 * @parent OptionsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param OptionsRect:func
 * @text JS: X, Y, W, H
 * @parent OptionsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\nconst width = 400;\nconst height = this.calcWindowHeight(n, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Load Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LoadMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Game End Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GameEnd:
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Game End screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"toTitle\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.toTitle;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandToTitle();\\\"\"}","{\"Symbol:str\":\"cancel\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.cancel;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.popScene();\\\"\"}"]
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandList:arraystruct
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandList:arraystruct
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 2;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.helpAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.helpAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = this._goldWindow.x;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param DummyWindow
 * @text Dummy Window
 *
 * @param DummyBgType:num
 * @text Background Type
 * @parent DummyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param DummyRect:func
 * @text JS: X, Y, W, H
 * @parent DummyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._commandWindow.y + this._commandWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._commandWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param NumberWindow
 * @text Number Window
 *
 * @param NumberBgType:num
 * @text Background Type
 * @parent NumberWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param NumberRect:func
 * @text JS: X, Y, W, H
 * @parent NumberWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusWidth();\nconst height = this._dummyWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._dummyWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param BuyWindow
 * @text Buy Window
 *
 * @param BuyBgType:num
 * @text Background Type
 * @parent BuyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param BuyRect:func
 * @text JS: X, Y, W, H
 * @parent BuyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SellWindow
 * @text Sell Window
 *
 * @param SellBgType:num
 * @text Background Type
 * @parent SellWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SellRect:func
 * @text JS: X, Y, W, H
 * @parent SellWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height =\n    this.mainAreaHeight() -\n    this._commandWindow.height -\n    this._categoryWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Name Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NameMenu:
 *
 * @param EditWindow
 * @text Edit Window
 *
 * @param EditBgType:num
 * @text Background Type
 * @parent EditWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param EditRect:func
 * @text JS: X, Y, W, H
 * @parent EditWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 9;\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\nconst padding = $gameSystem.windowPadding();\nconst width = 600;\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param InputWindow
 * @text Input Window
 *
 * @param InputBgType:num
 * @text Background Type
 * @parent InputWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param InputRect:func
 * @text JS: X, Y, W, H
 * @parent InputWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this._editWindow.x;\nconst y = this._editWindow.y + this._editWindow.height;\nconst rows = 9;\nconst width = this._editWindow.width;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Title Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Title:
 *
 * @param TitleScreen
 * @text Title Screen
 *
 * @param DocumentTitleFmt:str
 * @text Document Title Format
 * @parent TitleScreen
 * @desc Format to display text in document title.
 * %1 - Main Title, %2 - Subtitle, %3 - Version
 * @default %1: %2 - Version %3
 *
 * @param Subtitle:str
 * @text Subtitle
 * @parent TitleScreen
 * @desc Subtitle to be displayed under the title name.
 * @default Subtitle
 *
 * @param Version:str
 * @text Version
 * @parent TitleScreen
 * @desc Version to be display in the title screen corner.
 * @default 0.00
 *
 * @param drawGameTitle:func
 * @text JS: Draw Title
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game title.
 * @default "const x = 20;\nconst y = Graphics.height / 4;\nconst maxWidth = Graphics.width - x * 2;\nconst text = $dataSystem.gameTitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 8;\nbitmap.fontSize = 72;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameSubtitle:func
 * @text JS: Draw Subtitle
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game subtitle.
 * @default "const x = 20;\nconst y = Graphics.height / 4 + 72;\nconst maxWidth = Graphics.width - x * 2;\nconst text = Scene_Title.subtitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 6;\nbitmap.fontSize = 48;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameVersion:func
 * @text JS: Draw Version
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game version.
 * @default "const bitmap = this._gameTitleSprite.bitmap;\nconst x = 0;\nconst y = Graphics.height - 20;\nconst width = Math.round(Graphics.width / 4);\nconst height = 20;\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\nconst text = 'Version ' + Scene_Title.version;\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 3;\nbitmap.fontSize = 16;\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \"left\");"
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent TitleScreen
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const offsetX = $dataSystem.titleCommandWindow.offsetX;\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\nconst rows = this.commandWindowRows();\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\nconst y = Graphics.boxHeight - height - 96 + offsetY;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonFadeSpeed:num
 * @text Button Fade Speed
 * @parent TitleScreen
 * @type number
 * @min 1
 * @max 255
 * @desc Speed at which the buttons fade in at (1-255).
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param DisplayedParams:arraystr
 * @text Displayed Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc A list of the parameters that will be displayed in-game.
 * @default ["ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param ExtDisplayedParams:arraystr
 * @text Extended Parameters
 * @parent DisplayedParams:arraystr
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc The list shown in extended scenes (for other VisuStella plugins).
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param BasicParameters
 * @text Basic Parameters
 *
 * @param ShowActorLevel:eval
 * @text Show Actor Level?
 * @parent BasicParameters
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor level when displaying actors?
 * Affects for most windows in-game.
 * @default true
 *
 * @param CrisisRate:num
 * @text HP Crisis Rate
 * @parent BasicParameters
 * @desc HP Ratio at which a battler can be considered in crisis mode.
 * @default 0.25
 *
 * @param BasicParameterFormula:func
 * @text JS: Formula
 * @parent BasicParameters
 * @type note
 * @desc Formula used to determine the total value all 8 basic parameters: MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 * @default "// Determine the variables used in this calculation.\nlet paramId = arguments[0];\nlet base = this.paramBase(paramId);\nlet plus = this.paramPlus(paramId);\nlet paramRate = this.paramRate(paramId);\nlet buffRate = this.paramBuffRate(paramId);\nlet flatBonus = this.paramFlatBonus(paramId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\n\n// Determine the limits\nconst maxValue = this.paramMax(paramId);\nconst minValue = this.paramMin(paramId);\n\n// Final value\nreturn Math.round(value.clamp(minValue, maxValue));"
 *
 * @param BasicParamCaps
 * @text Parameter Caps
 * @parent BasicParameters
 *
 * @param BasicActorParamCaps
 * @text Actors
 * @parent BasicParamCaps
 *
 * @param BasicActorParamMax0:str
 * @text MaxHP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax1:str
 * @text MaxMP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax2:str
 * @text ATK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax3:str
 * @text DEF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax4:str
 * @text MAT Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax5:str
 * @text MDF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax6:str
 * @text AGI Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax7:str
 * @text LUK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamCaps
 * @text Enemies
 * @parent BasicParamCaps
 *
 * @param BasicEnemyParamMax0:str
 * @text MaxHP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999999
 *
 * @param BasicEnemyParamMax1:str
 * @text MaxMP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicEnemyParamMax2:str
 * @text ATK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax3:str
 * @text DEF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax4:str
 * @text MAT Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax5:str
 * @text MDF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax6:str
 * @text AGI Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax7:str
 * @text LUK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param XParameters
 * @text X Parameters
 *
 * @param XParameterFormula:func
 * @text JS: Formula
 * @parent XParameters
 * @type note
 * @desc Formula used to determine the total value all 10 X parameters: HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 * @default "// Determine the variables used in this calculation.\nlet xparamId = arguments[0];\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\nlet plus = this.xparamPlus(xparamId);\nlet paramRate = this.xparamRate(xparamId);\nlet flatBonus = this.xparamFlatBonus(xparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param XParamVocab
 * @text Vocabulary
 * @parent XParameters
 *
 * @param XParamVocab0:str
 * @text HIT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Hit
 *
 * @param XParamVocab1:str
 * @text EVA
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Evasion
 *
 * @param XParamVocab2:str
 * @text CRI
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Rate
 *
 * @param XParamVocab3:str
 * @text CEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Evade
 *
 * @param XParamVocab4:str
 * @text MEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Evade
 *
 * @param XParamVocab5:str
 * @text MRF
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Reflect
 *
 * @param XParamVocab6:str
 * @text CNT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Counter
 *
 * @param XParamVocab7:str
 * @text HRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default HP Regen
 *
 * @param XParamVocab8:str
 * @text MRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default MP Regen
 *
 * @param XParamVocab9:str
 * @text TRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default TP Regen
 *
 * @param SParameters
 * @text S Parameters
 *
 * @param SParameterFormula:func
 * @text JS: Formula
 * @parent SParameters
 * @type note
 * @desc Formula used to determine the total value all 10 S parameters: TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 * @default "// Determine the variables used in this calculation.\nlet sparamId = arguments[0];\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\nlet plus = this.sparamPlus(sparamId);\nlet paramRate = this.sparamRate(sparamId);\nlet flatBonus = this.sparamFlatBonus(sparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param SParamVocab
 * @text Vocabulary
 * @parent SParameters
 *
 * @param SParamVocab0:str
 * @text TGR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Aggro
 *
 * @param SParamVocab1:str
 * @text GRD
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Guard
 *
 * @param SParamVocab2:str
 * @text REC
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Recovery
 *
 * @param SParamVocab3:str
 * @text PHA
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Item Effect
 *
 * @param SParamVocab4:str
 * @text MCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default MP Cost
 *
 * @param SParamVocab5:str
 * @text TCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default TP Charge
 *
 * @param SParamVocab6:str
 * @text PDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Physical DMG
 *
 * @param SParamVocab7:str
 * @text MDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Magical DMG
 *
 * @param SParamVocab8:str
 * @text FDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Floor DMG
 *
 * @param SParamVocab9:str
 * @text EXR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default EXP Gain
 *
 * @param Icons
 * @text Icons
 *
 * @param DrawIcons:eval
 * @text Draw Icons?
 * @parent Icons
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Draw icons next to parameter names?
 * @default true
 *
 * @param IconParam0:str
 * @text MaxHP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 84
 *
 * @param IconParam1:str
 * @text MaxMP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconParam2:str
 * @text ATK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconParam3:str
 * @text DEF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 81
 *
 * @param IconParam4:str
 * @text MAT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 101
 *
 * @param IconParam5:str
 * @text MDF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 133
 *
 * @param IconParam6:str
 * @text AGI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 140
 *
 * @param IconParam7:str
 * @text LUK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 87
 *
 * @param IconXParam0:str
 * @text HIT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 102
 *
 * @param IconXParam1:str
 * @text EVA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam2:str
 * @text CRI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 78
 *
 * @param IconXParam3:str
 * @text CEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam4:str
 * @text MEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 171
 *
 * @param IconXParam5:str
 * @text MRF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 222
 *
 * @param IconXParam6:str
 * @text CNT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 77
 *
 * @param IconXParam7:str
 * @text HRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam8:str
 * @text MRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam9:str
 * @text TRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam0:str
 * @text TGR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 5
 *
 * @param IconSParam1:str
 * @text GRD
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 128
 *
 * @param IconSParam2:str
 * @text REC
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam3:str
 * @text PHA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 176
 *
 * @param IconSParam4:str
 * @text MCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconSParam5:str
 * @text TCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 164
 *
 * @param IconSParam6:str
 * @text PDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconSParam7:str
 * @text MDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 79
 *
 * @param IconSParam8:str
 * @text FDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 141
 *
 * @param IconSParam9:str
 * @text EXR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 73
 *
 */
/* ----------------------------------------------------------------------------
 * Commands Struct
 * ----------------------------------------------------------------------------
 */
/*~struct~Command:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc The symbol used for this command.
 * @default Symbol
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this title command.
 * If this has a value, ignore the JS: Text version.
 * @default Untitled
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine string used for the displayed name.
 * @default "return 'Text';"
 *
 * @param ShowJS:func
 * @text JS: Show
 * @type note
 * @desc JavaScript code used to determine if the item is shown or not.
 * @default "return true;"
 *
 * @param EnableJS:func
 * @text JS: Enable
 * @type note
 * @desc JavaScript code used to determine if the item is enabled or not.
 * @default "return true;"
 *
 * @param ExtJS:func
 * @text JS: Ext
 * @type note
 * @desc JavaScript code used to determine any ext data that should be added.
 * @default "return null;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this command is selected.
 * @default ""
 *
 */
/* ----------------------------------------------------------------------------
 * Title Picture Buttons
 * ----------------------------------------------------------------------------
 */
/*~struct~TitlePictureButton:
 *
 * @param PictureFilename:str
 * @text Picture's Filename
 * @type file
 * @dir img/pictures/
 * @desc Filename used for the picture.
 * @default 
 *
 * @param ButtonURL:str
 * @text Button URL
 * @desc URL for the button to go to upon being clicked.
 * @default https://www.google.com/
 *
 * @param PositionJS:func
 * @text JS: Position
 * @type note
 * @desc JavaScript code that helps determine the button's Position.
 * @default "this.x = Graphics.width - this.bitmap.width - 20;\nthis.y = Graphics.height - this.bitmap.height - 20;"
 *
 * @param OnLoadJS:func
 * @text JS: On Load
 * @type note
 * @desc JavaScript code that runs once this button bitmap is loaded.
 * @default "this.opacity = 0;\nthis.visible = true;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this button is pressed.
 * @default "const url = this._data.ButtonURL;\nVisuMZ.openURL(url);"
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param UIArea
 * @text UI Area
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent UIArea
 * @desc Default fade speed for transitions.
 * @default 24
 *
 * @param BoxMargin:num
 * @text Box Margin
 * @parent UIArea
 * @type number
 * @min 0
 * @desc Set the margin in pixels for the screen borders.
 * Default: 4
 * @default 4
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the width for standard Command Windows.
 * Default: 240
 * @default 240
 *
 * @param BottomHelp:eval
 * @text Bottom Help Window
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the Help Window at the bottom of the screen?
 * @default false
 *
 * @param RightMenus:eval
 * @text Right Aligned Menus
 * @parent UIArea
 * @type boolean
 * @on Right
 * @off Left
 * @desc Put most command windows to the right side of the screen.
 * @default true
 *
 * @param ShowButtons:eval
 * @text Show Buttons
 * @parent UIArea
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show clickable buttons in your game?
 * This will affect all buttons.
 * @default true
 *
 * @param cancelShowButton:eval
 * @text Show Cancel Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show cancel button?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param menuShowButton:eval
 * @text Show Menu Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show main menu button from the map scene?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param pagedownShowButton:eval
 * @text Show Page Up/Down
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show page up/down buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param numberShowButton:eval
 * @text Show Number Buttons
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show number adjustment buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param ButtonHeight:num
 * @text Button Area Height
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the height for the button area.
 * Default: 52
 * @default 52
 *
 * @param BottomButtons:eval
 * @text Bottom Buttons
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the buttons at the bottom of the screen?
 * @default false
 *
 * @param SideButtons:eval
 * @text Side Buttons
 * @parent UIArea
 * @type boolean
 * @on Side
 * @off Normal
 * @desc Push buttons to the side of the UI if there is room.
 * @default true
 *
 * @param MenuObjects
 * @text Menu Objects
 *
 * @param LvExpGauge:eval
 * @text Level -> EXP Gauge
 * @parent MenuObjects
 * @type boolean
 * @on Draw Gauge
 * @off Keep As Is
 * @desc Draw an EXP Gauge under the drawn level.
 * @default true
 *
 * @param ParamArrow:str
 * @text Parameter Arrow
 * @parent MenuObjects
 * @desc The arrow used to show changes in the parameter values.
 * @default →
 *
 * @param TextCodeSupport
 * @text Text Code Support
 *
 * @param TextCodeClassNames:eval
 * @text Class Names
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make class names support text codes?
 * @default true
 *
 * @param TextCodeNicknames:eval
 * @text Nicknames
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make nicknames support text codes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param WindowDefaults
 * @text Defaults
 *
 * @param EnableMasking:eval
 * @text Enable Masking
 * @parent WindowDefaults
 * @type boolean
 * @on Masking On
 * @off Masking Off
 * @desc Enable window masking (windows hide other windows behind 
 * them)? WARNING: Turning it on can obscure data.
 * @default false
 *
 * @param CorrectSkinBleeding:eval
 * @text Correct Skin Bleed
 * @parent WindowDefaults
 * @type boolean
 * @on Correct
 * @off Don't Correct
 * @desc Corrects window skin bleeding bug when used with higher
 * screen resolutions?
 * @default true
 *
 * @param LineHeight:num
 * @text Line Height
 * @parent WindowDefaults
 * @desc Default line height used for standard windows.
 * Default: 36. Avoid using odd numbers.
 * @default 36
 *
 * @param ItemPadding:num
 * @text Item Padding
 * @parent WindowDefaults
 * @desc Default line padding used for standard windows.
 * Default: 8. Avoid using odd numbers.
 * @default 8
 *
 * @param BackOpacity:num
 * @text Back Opacity
 * @parent WindowDefaults
 * @desc Default back opacity used for standard windows.
 * Default: 192
 * @default 192
 *
 * @param TranslucentOpacity:num
 * @text Translucent Opacity
 * @parent WindowDefaults
 * @desc Default translucent opacity used for standard windows.
 * Default: 160
 * @default 160
 *
 * @param OpenSpeed:num
 * @text Window Opening Speed
 * @parent WindowDefaults
 * @desc Default open speed used for standard windows.
 * Default: 32 (Use a number between 0-255)
 * @default 32
 * @default 24
 *
 * @param ColSpacing:num
 * @text Column Spacing
 * @parent WindowDefaults
 * @desc Default column spacing for selectable windows.
 * Default: 8
 * @default 8
 *
 * @param RowSpacing:num
 * @text Row Spacing
 * @parent WindowDefaults
 * @desc Default row spacing for selectable windows.
 * Default: 4
 * @default 4
 * 
 * @param ScrollBar
 * @text Scroll Bar
 *
 * @param ShowScrollBar:eval
 * @text Show Scroll Bar?
 * @parent ScrollBar
 * @type boolean
 * @on Show Scroll Bar
 * @off Don't Show
 * @desc Show the scroll bar for scrollable windows?
 * @default true
 *
 * @param BarThickness:num
 * @text Thickness
 * @parent ScrollBar
 * @type number
 * @min 1
 * @desc How thick do you want the scroll bar to be?
 * @default 2
 *
 * @param BarOffset:num
 * @text Offset
 * @parent ScrollBar
 * @desc How much do you want to offset the scroll bar by?
 * @default +2
 *
 * @param BarBodyColor:str
 * @text Bar Body Color
 * @parent ScrollBar
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param OffBarColor:str
 * @text Off Bar Color
 * @parent ScrollBar
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 7
 *
 * @param OffBarOpacity:num
 * @text Off Bar Opacity
 * @parent ScrollBar
 * @type number
 * @min 1
 * @max 255
 * @desc What opacity value do you want the off bar opacity
 * to be? Use a number between 0 and 255.
 * @default 128
 * 
 * @param SelectableItems
 * @text Selectable Items
 *
 * @param ShowItemBackground:eval
 * @text Show Background?
 * @parent SelectableItems
 * @type boolean
 * @on Show Backgrounds
 * @off No Backgrounds
 * @desc Selectable menu items have dark boxes behind them. Show them?
 * @default true
 *
 * @param ItemHeight:num
 * @text Item Height Padding
 * @parent SelectableItems
 * @desc Default padding for selectable items.
 * Default: 8. Avoid using odd numbers.
 * @default 8
 *
 * @param DrawItemBackgroundJS:func
 * @text JS: Draw Background
 * @parent SelectableItems
 * @type note
 * @desc Code used to draw the background rectangle behind clickable menu objects
 * @default "const rect = arguments[0];\nconst c1 = ColorManager.itemBackColor1();\nconst c2 = ColorManager.itemBackColor2();\nconst x = rect.x;\nconst y = rect.y;\nconst w = rect.width;\nconst h = rect.height;\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\nthis.contentsBack.strokeRect(x, y, w, h, c1);"
 *
 * @param TextPopup
 * @text Text Popup Window
 *
 * @param DurationPerChat:num
 * @text Duration Per Text
 * @parent TextPopup
 * @desc What is the increase in duration per text character?
 * @default 1.5
 *
 * @param MinDuration:num
 * @text Minimum Duration
 * @parent TextPopup
 * @type number
 * @min 1
 * @desc Minimum duration for window to stay on the screen.
 * @default 90
 *
 * @param MaxDuration:num
 * @text Maximum Duration
 * @parent TextPopup
 * @type number
 * @min 1
 * @desc Maximum duration for window to stay on the screen.
 * @default 300
 * 
 */
/* ----------------------------------------------------------------------------
 * Screen Resolution Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenResolution:
 *
 * @param Maps
 * 
 * @param AutoScrollLockX:eval
 * @text Scroll Lock Small X?
 * @parent Maps
 * @type boolean
 * @on Auto-Lock
 * @off Keep As Is
 * @desc Automatically scroll lock X scrolling if the map is too small?
 * @default true
 * 
 * @param AutoScrollLockY:eval
 * @text Scroll Lock Small Y?
 * @parent Maps
 * @type boolean
 * @on Auto-Lock
 * @off Keep As Is
 * @desc Automatically scroll lock Y scrolling if the map is too small?
 * @default true
 * 
 * @param DisplayLockX:num
 * @text Locked Display X?
 * @parent Maps
 * @desc What display X value do you want for auto-scroll locked
 * maps? Use a number between 0 and 1 for best results.
 * @default 0.15625
 * 
 * @param DisplayLockY:num
 * @text Locked Display Y?
 * @parent Maps
 * @desc What display Y value do you want for auto-scroll locked
 * maps? Use a number between 0 and 1 for best results.
 * @default 0.00000
 * 
 * @param Troops
 *
 * @param RepositionActors:eval
 * @text Reposition Actors
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of actors in battle if the screen resolution has changed. Ignore if using Battle Core.
 * @default true
 *
 * @param RepositionEnemies:eval
 * @text Reposition Enemies
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of enemies in battle if the screen resolution has changed.
 * @default true
 *
 * @param RepositionEnemies130:eval
 * @text For MZ 1.3.0+?
 * @parent RepositionEnemies:eval
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Both this parameter and its parent parameter need to be on when using RPG Maker MZ 1.3.0+.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Screen Shake Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenShake:
 *
 * @param DefaultStyle:str
 * @text Default Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc The default style used for screen shakes.
 * @default random
 *
 * @param originalJS:func
 * @text JS: Original Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\nthis.x += Math.round($gameScreen.shake());"
 *
 * @param randomJS:func
 * @text JS: Random Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param horzJS:func
 * @text JS: Horizontal Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param vertJS:func
 * @text JS: Vertical Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomParam:
 *
 * @param ParamName:str
 * @text Parameter Name
 * @desc What's the parameter's name?
 * Used for VisuStella MZ menus.
 * @default Untitled
 *
 * @param Abbreviation:str
 * @text Abbreviation
 * @parent ParamName:str
 * @desc What abbreviation do you want to use for the parameter?
 * Do not use special characters. Avoid numbers if possible.
 * @default unt
 *
 * @param Icon:num
 * @text Icon
 * @parent ParamName:str
 * @desc What icon do you want to use to represent this parameter?
 * Used for VisuStella MZ menus.
 * @default 160
 *
 * @param Type:str
 * @text Type
 * @parent ParamName:str
 * @type select
 * @option Integer (Whole Numbers Only)
 * @value integer
 * @option Float (Decimals are Allowed)
 * @value float
 * @desc What kind of number value will be returned with this parameter?
 * @default integer
 *
 * @param ValueJS:json
 * @text JS: Value
 * @type note
 * @desc Run this code when this parameter is to be returned.
 * @default "// Declare Constants\nconst user = this;\n\n// Calculations\nreturn 1;"
 *
 */
/* ----------------------------------------------------------------------------
 * Show Picture Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShowPicture:
 * 
 * @param Position
 *
 * @param Origin:num
 * @text Origin
 * @parent Position
 * @type select
 * @option 0 - Upper Left
 * @value 0
 * @option 1 - Center
 * @value 1
 * @desc What is the origin of this picture icon?
 * @default 0
 *
 * @param PositionX:eval
 * @text Position X
 * @parent Position
 * @desc X coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 *
 * @param PositionY:eval
 * @text Position Y
 * @parent Position
 * @desc Y coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 * 
 * @param Scale
 *
 * @param ScaleX:eval
 * @text Width %
 * @parent Scale
 * @desc Horizontal scale of the picture.
 * You may use JavaScript code.
 * @default 100
 *
 * @param ScaleY:eval
 * @text Height %
 * @parent Scale
 * @desc Vertical scale of the picture.
 * You may use JavaScript code.
 * @default 100
 * 
 * @param Blend
 *
 * @param Opacity:eval
 * @text Opacity
 * @parent Blend
 * @desc Insert a number to determine opacity level. Use a
 * number between 0 and 255. You may use JavaScript code.
 * @default 255
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @parent Blend
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the picture?
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * JS Quick Function Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~jsQuickFunc:
 *
 * @param FunctionName:str
 * @text Function Name
 * @desc The function's name in the global namespace.
 * Will not overwrite functions/variables of the same name.
 * @default Untitled
 *
 * @param CodeJS:json
 * @text JS: Code
 * @type note
 * @desc Run this code when using the function.
 * @default "// Insert this as a function anywhere you can input code\n// such as Script Calls or Conditional Branch Scripts.\n\n// Process Code\n"
 *
 */
//=============================================================================

const _0x4396be=_0x43c9;(function(_0x5cd7dd,_0x5c2171){const _0x380a20=_0x43c9,_0x38670b=_0x5cd7dd();while(!![]){try{const _0x5778c8=-parseInt(_0x380a20(0x885))/0x1+parseInt(_0x380a20(0x582))/0x2+parseInt(_0x380a20(0x41e))/0x3*(parseInt(_0x380a20(0x5c4))/0x4)+parseInt(_0x380a20(0x3ee))/0x5*(parseInt(_0x380a20(0x1b8))/0x6)+-parseInt(_0x380a20(0x37c))/0x7+parseInt(_0x380a20(0x7ce))/0x8*(parseInt(_0x380a20(0x2a2))/0x9)+parseInt(_0x380a20(0x219))/0xa*(-parseInt(_0x380a20(0x9d0))/0xb);if(_0x5778c8===_0x5c2171)break;else _0x38670b['push'](_0x38670b['shift']());}catch(_0x28bd95){_0x38670b['push'](_0x38670b['shift']());}}}(_0x2ff2,0x58bc9));var label=_0x4396be(0x7c7),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x4396be(0x2ac)](function(_0x2a3d74){const _0x46941d=_0x4396be;return _0x2a3d74['status']&&_0x2a3d74[_0x46941d(0x575)][_0x46941d(0x897)]('['+label+']');})[0x0];VisuMZ[label][_0x4396be(0x624)]=VisuMZ[label][_0x4396be(0x624)]||{},VisuMZ['ConvertParams']=function(_0xb34f1d,_0x9bf9f2){const _0x297adb=_0x4396be;for(const _0xedb7b8 in _0x9bf9f2){if(_0x297adb(0x675)!=='wUNPY'){var _0x16a5fa=_0xd930f2-2.25/2.75;return 7.5625*_0x16a5fa*_0x16a5fa+0.9375;}else{if(_0xedb7b8[_0x297adb(0x8e4)](/(.*):(.*)/i)){const _0x2bc01e=String(RegExp['$1']),_0x4b3031=String(RegExp['$2'])[_0x297adb(0x569)]()[_0x297adb(0x8b0)]();let _0x4fbe88,_0x1e3294,_0x3ac7f6;switch(_0x4b3031){case _0x297adb(0x27a):_0x4fbe88=_0x9bf9f2[_0xedb7b8]!==''?Number(_0x9bf9f2[_0xedb7b8]):0x0;break;case _0x297adb(0x481):_0x1e3294=_0x9bf9f2[_0xedb7b8]!==''?JSON['parse'](_0x9bf9f2[_0xedb7b8]):[],_0x4fbe88=_0x1e3294[_0x297adb(0x774)](_0x40318e=>Number(_0x40318e));break;case _0x297adb(0x28c):_0x4fbe88=_0x9bf9f2[_0xedb7b8]!==''?eval(_0x9bf9f2[_0xedb7b8]):null;break;case'ARRAYEVAL':_0x1e3294=_0x9bf9f2[_0xedb7b8]!==''?JSON[_0x297adb(0x708)](_0x9bf9f2[_0xedb7b8]):[],_0x4fbe88=_0x1e3294[_0x297adb(0x774)](_0x332e1a=>eval(_0x332e1a));break;case _0x297adb(0x620):_0x4fbe88=_0x9bf9f2[_0xedb7b8]!==''?JSON['parse'](_0x9bf9f2[_0xedb7b8]):'';break;case _0x297adb(0x9e5):_0x1e3294=_0x9bf9f2[_0xedb7b8]!==''?JSON[_0x297adb(0x708)](_0x9bf9f2[_0xedb7b8]):[],_0x4fbe88=_0x1e3294[_0x297adb(0x774)](_0x3ee808=>JSON[_0x297adb(0x708)](_0x3ee808));break;case _0x297adb(0x5fa):_0x4fbe88=_0x9bf9f2[_0xedb7b8]!==''?new Function(JSON[_0x297adb(0x708)](_0x9bf9f2[_0xedb7b8])):new Function(_0x297adb(0x5d2));break;case'ARRAYFUNC':_0x1e3294=_0x9bf9f2[_0xedb7b8]!==''?JSON[_0x297adb(0x708)](_0x9bf9f2[_0xedb7b8]):[],_0x4fbe88=_0x1e3294['map'](_0xa02bbc=>new Function(JSON[_0x297adb(0x708)](_0xa02bbc)));break;case'STR':_0x4fbe88=_0x9bf9f2[_0xedb7b8]!==''?String(_0x9bf9f2[_0xedb7b8]):'';break;case _0x297adb(0x64f):_0x1e3294=_0x9bf9f2[_0xedb7b8]!==''?JSON['parse'](_0x9bf9f2[_0xedb7b8]):[],_0x4fbe88=_0x1e3294['map'](_0x452f66=>String(_0x452f66));break;case _0x297adb(0x137):_0x3ac7f6=_0x9bf9f2[_0xedb7b8]!==''?JSON[_0x297adb(0x708)](_0x9bf9f2[_0xedb7b8]):{},_0xb34f1d[_0x2bc01e]={},VisuMZ[_0x297adb(0x162)](_0xb34f1d[_0x2bc01e],_0x3ac7f6);continue;case _0x297adb(0x225):_0x1e3294=_0x9bf9f2[_0xedb7b8]!==''?JSON[_0x297adb(0x708)](_0x9bf9f2[_0xedb7b8]):[],_0x4fbe88=_0x1e3294[_0x297adb(0x774)](_0x58edc5=>VisuMZ[_0x297adb(0x162)]({},JSON[_0x297adb(0x708)](_0x58edc5)));break;default:continue;}_0xb34f1d[_0x2bc01e]=_0x4fbe88;}}}return _0xb34f1d;},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0xc7)]=SceneManager[_0x4396be(0x757)],SceneManager[_0x4396be(0x757)]=function(){const _0x3c4012=_0x4396be;VisuMZ['CoreEngine']['SceneManager_exit'][_0x3c4012(0x8ee)](this);if(Utils['RPGMAKER_VERSION']>=_0x3c4012(0x89f)){if(_0x3c4012(0x130)!==_0x3c4012(0x130))this['initialize'](...arguments);else{if(typeof nw==='object')nw['App'][_0x3c4012(0x30b)]();}}},(_0x4a3826=>{const _0xbe13d2=_0x4396be,_0x467577=_0x4a3826[_0xbe13d2(0x862)];for(const _0x3428ce of dependencies){if(!Imported[_0x3428ce]){alert(_0xbe13d2(0x366)['format'](_0x467577,_0x3428ce)),SceneManager[_0xbe13d2(0x757)]();break;}}const _0x50c297=_0x4a3826[_0xbe13d2(0x575)];if(_0x50c297[_0xbe13d2(0x8e4)](/\[Version[ ](.*?)\]/i)){const _0x212842=Number(RegExp['$1']);if(_0x212842!==VisuMZ[label]['version']){if(_0xbe13d2(0x3a1)===_0xbe13d2(0x3a1))alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'['format'](_0x467577,_0x212842)),SceneManager['exit']();else return _0x1707f2[_0xbe13d2(0x83c)][_0xbe13d2(0x610)]['call'](this);}}if(_0x50c297[_0xbe13d2(0x8e4)](/\[Tier[ ](\d+)\]/i)){const _0x1779dc=Number(RegExp['$1']);_0x1779dc<tier?_0xbe13d2(0x29e)!==_0xbe13d2(0x29e)?!_0x1f5bf0[_0xbe13d2(0xbf)]()&&this['removePointAnimation'](_0x31fac1):(alert(_0xbe13d2(0x7fd)['format'](_0x467577,_0x1779dc,tier)),SceneManager['exit']()):_0xbe13d2(0x7ab)===_0xbe13d2(0x550)?_0x3b3bc9=_0x33ad92[_0xbe13d2(0x7c7)][_0xbe13d2(0x844)][_0xbe13d2(0x8ee)](this):tier=Math[_0xbe13d2(0x8cd)](_0x1779dc,tier);}VisuMZ[_0xbe13d2(0x162)](VisuMZ[label]['Settings'],_0x4a3826[_0xbe13d2(0x113)]);})(pluginData),((()=>{const _0x139615=_0x4396be;if(VisuMZ['CoreEngine'][_0x139615(0x624)][_0x139615(0x9e8)][_0x139615(0x29c)]??!![])for(const _0xb71142 in $plugins){const _0x500324=$plugins[_0xb71142];_0x500324['name'][_0x139615(0x8e4)](/(.*)\/(.*)/i)&&(_0x500324['name']=String(RegExp['$2'][_0x139615(0x8b0)]()));}})()),PluginManager[_0x4396be(0x7a3)](pluginData[_0x4396be(0x862)],'AnimationPoint',_0xde83c0=>{const _0x57acf6=_0x4396be;if(!SceneManager[_0x57acf6(0x9c8)])return;if(!SceneManager[_0x57acf6(0x9c8)]['_spriteset'])return;VisuMZ[_0x57acf6(0x162)](_0xde83c0,_0xde83c0);const _0x5b2575=Math['round'](_0xde83c0[_0x57acf6(0x4de)]),_0x314e06=Math[_0x57acf6(0xb9)](_0xde83c0[_0x57acf6(0x16d)]);$gameTemp[_0x57acf6(0x636)](_0x5b2575,_0x314e06,_0xde83c0[_0x57acf6(0x4ff)],_0xde83c0[_0x57acf6(0x619)],_0xde83c0[_0x57acf6(0x221)]);}),PluginManager[_0x4396be(0x7a3)](pluginData[_0x4396be(0x862)],'AudioChangeBgmVolume',_0xe6eb25=>{const _0x19050f=_0x4396be;VisuMZ['ConvertParams'](_0xe6eb25,_0xe6eb25);const _0x583ad9=Math[_0x19050f(0xb9)](_0xe6eb25['volume'])[_0x19050f(0x5d5)](0x0,0x64),_0x2bf3d1=AudioManager['_currentBgm'];_0x2bf3d1&&(_0x2bf3d1[_0x19050f(0x15c)]=_0x583ad9,_0x2bf3d1['pos']=AudioManager['_bgmBuffer'][_0x19050f(0x86e)](),AudioManager[_0x19050f(0x8a9)](_0x2bf3d1),AudioManager[_0x19050f(0x589)](_0x2bf3d1,_0x2bf3d1[_0x19050f(0x883)]),AudioManager[_0x19050f(0x2a8)][_0x19050f(0x183)](_0x2bf3d1[_0x19050f(0x883)]));}),PluginManager[_0x4396be(0x7a3)](pluginData['name'],_0x4396be(0x48e),_0x4f79b5=>{const _0x3c3931=_0x4396be;VisuMZ[_0x3c3931(0x162)](_0x4f79b5,_0x4f79b5);const _0x17f6cc=Math[_0x3c3931(0xb9)](_0x4f79b5[_0x3c3931(0x654)])['clamp'](0x32,0x96),_0x5b481a=AudioManager[_0x3c3931(0x6f8)];_0x5b481a&&(_0x5b481a[_0x3c3931(0x654)]=_0x17f6cc,_0x5b481a[_0x3c3931(0x883)]=AudioManager['_bgmBuffer'][_0x3c3931(0x86e)](),AudioManager[_0x3c3931(0x8a9)](_0x5b481a),AudioManager['playBgm'](_0x5b481a,_0x5b481a[_0x3c3931(0x883)]),AudioManager[_0x3c3931(0x2a8)][_0x3c3931(0x183)](_0x5b481a[_0x3c3931(0x883)]));}),PluginManager['registerCommand'](pluginData[_0x4396be(0x862)],_0x4396be(0x738),_0x1d6bff=>{const _0x5a78a4=_0x4396be;VisuMZ[_0x5a78a4(0x162)](_0x1d6bff,_0x1d6bff);const _0x35408f=Math[_0x5a78a4(0xb9)](_0x1d6bff[_0x5a78a4(0x9b2)])[_0x5a78a4(0x5d5)](-0x64,0x64),_0x2d8d61=AudioManager[_0x5a78a4(0x6f8)];_0x2d8d61&&(_0x2d8d61[_0x5a78a4(0x9b2)]=_0x35408f,_0x2d8d61[_0x5a78a4(0x883)]=AudioManager[_0x5a78a4(0x2a8)]['seek'](),AudioManager['updateBgmParameters'](_0x2d8d61),AudioManager[_0x5a78a4(0x589)](_0x2d8d61,_0x2d8d61[_0x5a78a4(0x883)]),AudioManager[_0x5a78a4(0x2a8)][_0x5a78a4(0x183)](_0x2d8d61[_0x5a78a4(0x883)]));}),PluginManager['registerCommand'](pluginData[_0x4396be(0x862)],'AudioChangeBgsVolume',_0x439595=>{const _0x3c6bf6=_0x4396be;VisuMZ[_0x3c6bf6(0x162)](_0x439595,_0x439595);const _0x359123=Math[_0x3c6bf6(0xb9)](_0x439595['volume'])[_0x3c6bf6(0x5d5)](0x0,0x64),_0x843c5d=AudioManager[_0x3c6bf6(0x46b)];if(_0x843c5d){if('pRTkB'===_0x3c6bf6(0x2f4))_0x843c5d[_0x3c6bf6(0x15c)]=_0x359123,_0x843c5d[_0x3c6bf6(0x883)]=AudioManager[_0x3c6bf6(0x588)][_0x3c6bf6(0x86e)](),AudioManager[_0x3c6bf6(0x44c)](_0x843c5d),AudioManager[_0x3c6bf6(0x96e)](_0x843c5d,_0x843c5d[_0x3c6bf6(0x883)]),AudioManager[_0x3c6bf6(0x588)][_0x3c6bf6(0x183)](_0x843c5d[_0x3c6bf6(0x883)]);else{const _0xd1456b=(_0x371d3d['CoreEngine'][_0x3c6bf6(0x624)][_0x3c6bf6(0x88e)]||_0x3c6bf6(0x25a))[_0x3c6bf6(0x569)]()[_0x3c6bf6(0x8b0)]();return _0x2df33c[_0x3c6bf6(0x7c7)]['CreateBattleSystemID'](_0xd1456b);}}}),PluginManager[_0x4396be(0x7a3)](pluginData[_0x4396be(0x862)],_0x4396be(0x3fe),_0xcaa884=>{const _0x2e4747=_0x4396be;VisuMZ[_0x2e4747(0x162)](_0xcaa884,_0xcaa884);const _0x25f86d=Math[_0x2e4747(0xb9)](_0xcaa884[_0x2e4747(0x654)])['clamp'](0x32,0x96),_0x1f5f72=AudioManager[_0x2e4747(0x46b)];_0x1f5f72&&(_0x1f5f72['pitch']=_0x25f86d,_0x1f5f72['pos']=AudioManager[_0x2e4747(0x588)][_0x2e4747(0x86e)](),AudioManager[_0x2e4747(0x44c)](_0x1f5f72),AudioManager[_0x2e4747(0x96e)](_0x1f5f72,_0x1f5f72[_0x2e4747(0x883)]),AudioManager['_bgsBuffer'][_0x2e4747(0x183)](_0x1f5f72[_0x2e4747(0x883)]));}),PluginManager[_0x4396be(0x7a3)](pluginData['name'],'AudioChangeBgsPan',_0x3d2936=>{const _0x1c14f0=_0x4396be;VisuMZ['ConvertParams'](_0x3d2936,_0x3d2936);const _0x4b8c41=Math['round'](_0x3d2936[_0x1c14f0(0x9b2)])[_0x1c14f0(0x5d5)](-0x64,0x64),_0xfe024d=AudioManager[_0x1c14f0(0x46b)];_0xfe024d&&(_0xfe024d[_0x1c14f0(0x9b2)]=_0x4b8c41,_0xfe024d[_0x1c14f0(0x883)]=AudioManager[_0x1c14f0(0x588)][_0x1c14f0(0x86e)](),AudioManager[_0x1c14f0(0x44c)](_0xfe024d),AudioManager[_0x1c14f0(0x96e)](_0xfe024d,_0xfe024d[_0x1c14f0(0x883)]),AudioManager[_0x1c14f0(0x588)][_0x1c14f0(0x183)](_0xfe024d[_0x1c14f0(0x883)]));}),PluginManager[_0x4396be(0x7a3)](pluginData[_0x4396be(0x862)],_0x4396be(0x31e),_0x49d689=>{const _0x2565f0=_0x4396be;if(!$gameTemp[_0x2565f0(0x863)]())return;const _0x515612=Input[_0x2565f0(0x7f5)]();navigator[_0x2565f0(0x669)]&&navigator['clipboard'][_0x2565f0(0x142)](_0x515612);}),PluginManager[_0x4396be(0x7a3)](pluginData[_0x4396be(0x862)],_0x4396be(0x9c1),_0x4fdcf3=>{const _0xd3e745=_0x4396be;if(!$gameTemp[_0xd3e745(0x863)]())return;if(!Utils['isNwjs']())return;SceneManager[_0xd3e745(0x9c8)][_0xd3e745(0x8f0)]=![],VisuMZ[_0xd3e745(0x7c7)][_0xd3e745(0x203)]();}),PluginManager[_0x4396be(0x7a3)](pluginData[_0x4396be(0x862)],'ExportAllTroopText',_0xa4046d=>{const _0x51ac3f=_0x4396be;if(!$gameTemp[_0x51ac3f(0x863)]())return;if(!Utils['isNwjs']())return;SceneManager[_0x51ac3f(0x9c8)][_0x51ac3f(0x8f0)]=![],VisuMZ['CoreEngine'][_0x51ac3f(0x32e)]();}),PluginManager[_0x4396be(0x7a3)](pluginData[_0x4396be(0x862)],'ExportCurMapText',_0x1adbbb=>{const _0x266a19=_0x4396be;if(!$gameTemp[_0x266a19(0x863)]())return;if(!Utils[_0x266a19(0x592)]())return;if(!$gameMap)return;if($gameMap[_0x266a19(0x213)]()<=0x0)return;VisuMZ[_0x266a19(0x162)](_0x1adbbb,_0x1adbbb);const _0x2e4644='Map%1'[_0x266a19(0x9c3)]($gameMap[_0x266a19(0x213)]()['padZero'](0x3)),_0x1e23c7=VisuMZ[_0x266a19(0x7c7)][_0x266a19(0x20f)]($gameMap['mapId']());VisuMZ[_0x266a19(0x7c7)][_0x266a19(0x965)](_0x1e23c7,_0x2e4644,!![]);}),PluginManager[_0x4396be(0x7a3)](pluginData[_0x4396be(0x862)],'ExportCurTroopText',_0xaa1577=>{const _0x229ad3=_0x4396be;if(!$gameTemp[_0x229ad3(0x863)]())return;if(!Utils[_0x229ad3(0x592)]())return;if(!$gameParty[_0x229ad3(0x2ee)]())return;VisuMZ[_0x229ad3(0x162)](_0xaa1577,_0xaa1577);const _0xf3be16=_0x229ad3(0x116)[_0x229ad3(0x9c3)]($gameTroop[_0x229ad3(0x1a4)][_0x229ad3(0x62d)](0x4)),_0x5bacb2=VisuMZ[_0x229ad3(0x7c7)][_0x229ad3(0x2cc)]($gameTroop['_troopId']);VisuMZ['CoreEngine'][_0x229ad3(0x965)](_0x5bacb2,_0xf3be16,!![]);}),VisuMZ[_0x4396be(0x7c7)]['ExportString']=function(_0x29f622,_0x1b8839,_0x2851fb){const _0x3382e3=_0x4396be,_0x32d76b=require('fs');let _0xae895f=_0x3382e3(0x69d)[_0x3382e3(0x9c3)](_0x1b8839||'0');_0x32d76b[_0x3382e3(0x4b3)](_0xae895f,_0x29f622,_0x220678=>{const _0x2b2474=_0x3382e3;if(_0x220678){if(_0x2b2474(0x80f)!==_0x2b2474(0x939))throw err;else{const _0x58177c=_0x1ea88a[_0x2b2474(0x8f6)](_0x1b9a93,_0x447dba)[_0x2b2474(0x2ac)](_0xad973d=>_0xad973d['isNormalPriority']());return _0x58177c[_0x2b2474(0x858)]>0x0;}}else _0x2851fb&&alert('Saved\x20file\x20as\x20%1\x20in\x20project\x20folder.'[_0x2b2474(0x9c3)](_0xae895f));});},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x203)]=function(){const _0x1e3bf4=_0x4396be,_0x503160=[];for(const _0x2bef31 of $dataMapInfos){if(!_0x2bef31)continue;_0x503160[_0x1e3bf4(0x8ab)](_0x2bef31['id']);}const _0x275913=_0x503160['length']*0x64+Math[_0x1e3bf4(0x31d)](0x64);alert(_0x1e3bf4(0x43b)[_0x1e3bf4(0x9c3)](_0x275913)),this[_0x1e3bf4(0x81f)]=[],this[_0x1e3bf4(0x73f)]=$dataMap;for(const _0x28524d of _0x503160){VisuMZ[_0x1e3bf4(0x7c7)]['loadMapData'](_0x28524d);}setTimeout(VisuMZ[_0x1e3bf4(0x7c7)]['exportAllMapStrings'][_0x1e3bf4(0x7d9)](this),_0x275913);},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x85b)]=function(_0x58121f){const _0x168295=_0x4396be,_0x3627cc=_0x168295(0x2e9)[_0x168295(0x9c3)](_0x58121f['padZero'](0x3)),_0x435da2=new XMLHttpRequest(),_0x271e31='data/'+_0x3627cc;_0x435da2[_0x168295(0x244)]('GET',_0x271e31),_0x435da2[_0x168295(0x123)](_0x168295(0x54b)),_0x435da2[_0x168295(0x8e1)]=()=>this[_0x168295(0x9bf)](_0x435da2,_0x58121f,_0x3627cc,_0x271e31),_0x435da2['onerror']=()=>DataManager[_0x168295(0x59a)](_0x168295(0x114),_0x3627cc,_0x271e31),_0x435da2[_0x168295(0x24c)]();},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x9bf)]=function(_0x459570,_0x5ba8b3,_0x477d4b,_0x3ceb14){const _0xc6a0c9=_0x4396be;$dataMap=JSON['parse'](_0x459570[_0xc6a0c9(0x6b8)]),DataManager['onLoad']($dataMap),this[_0xc6a0c9(0x81f)][_0x5ba8b3]=VisuMZ[_0xc6a0c9(0x7c7)]['ExtractStrFromMap'](_0x5ba8b3),$dataMap=this['_currentMap'];},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x470)]=function(){const _0x5d32a0=_0x4396be,_0x2337b1='AllMaps';this[_0x5d32a0(0x81f)][_0x5d32a0(0x3b9)](undefined)[_0x5d32a0(0x3b9)]('')[_0x5d32a0(0x3b9)](null);const _0x18d876=this[_0x5d32a0(0x81f)][_0x5d32a0(0xaf)]('\x0a\x0a\x0a\x0a\x0a')[_0x5d32a0(0x8b0)]();VisuMZ['CoreEngine'][_0x5d32a0(0x965)](_0x18d876,_0x2337b1,!![]),SceneManager[_0x5d32a0(0x9c8)]['_active']=!![];},VisuMZ['CoreEngine'][_0x4396be(0x20f)]=function(_0x37741e){const _0x5324d1=_0x4396be;if(!$dataMap)return'';let _0x3d6ef2='█'[_0x5324d1(0x642)](0x46)+'\x0a\x0a',_0x17c318='═'[_0x5324d1(0x642)](0x46)+'\x0a\x0a',_0x7380e='';this[_0x5324d1(0xa0a)]=0x0;for(const _0x3af504 of $dataMap[_0x5324d1(0x674)]){if(!_0x3af504)continue;let _0x3eb4a4=_0x3af504['id'],_0x3acb54=_0x3af504[_0x5324d1(0x862)],_0x2de520=_0x3af504[_0x5324d1(0x5c1)];for(const _0x3f4279 of _0x2de520){const _0x1b4dad=_0x2de520[_0x5324d1(0x22f)](_0x3f4279)+0x1;let _0x14d512=_0x17c318+_0x5324d1(0x44e),_0x4ee39a=VisuMZ[_0x5324d1(0x7c7)][_0x5324d1(0x634)](_0x3f4279['list']);if(_0x4ee39a[_0x5324d1(0x858)]>0x0){if(_0x7380e[_0x5324d1(0x858)]>0x0)_0x7380e+=_0x17c318+_0x5324d1(0x362);else{if('rOhqI'!=='rOhqI')_0x1dae24['log']('Show\x20Scrolling\x20Text\x20Script\x20Error'),_0x694f29['log'](_0x27e0bb);else{const _0x4c708c=$dataMapInfos[_0x37741e][_0x5324d1(0x862)];_0x7380e+=_0x3d6ef2+_0x5324d1(0x8c6)[_0x5324d1(0x9c3)](_0x37741e,_0x4c708c||_0x5324d1(0x2f5))+_0x3d6ef2;}}_0x7380e+=_0x14d512[_0x5324d1(0x9c3)](_0x3eb4a4,_0x3acb54,_0x1b4dad,_0x4ee39a);}}}return _0x7380e[_0x5324d1(0x858)]>0x0&&('xSMbe'!==_0x5324d1(0x98f)?(this[_0x5324d1(0x2d0)]={},_0x5eb63b[_0x5324d1(0x56f)]['initialize']['call'](this,_0x35a550),this[_0x5324d1(0x2dd)](_0x5af6b8['CoreEngine'][_0x5324d1(0x624)][_0x5324d1(0x775)][_0x5324d1(0x970)]||0x0),this['refresh']()):_0x7380e+=_0x17c318),_0x7380e;},VisuMZ['CoreEngine'][_0x4396be(0x32e)]=function(){const _0xc9a639=_0x4396be,_0x2fa213=$dataTroops[_0xc9a639(0x858)]*0xa+Math[_0xc9a639(0x31d)](0xa);alert(_0xc9a639(0x946)[_0xc9a639(0x9c3)](_0x2fa213));const _0x1918fe=[];for(const _0x5c123f of $dataTroops){if('MblWS'===_0xc9a639(0x560)){if(!_0x5c123f)continue;const _0x4ee41e=_0x5c123f['id'];_0x1918fe[_0x4ee41e]=VisuMZ[_0xc9a639(0x7c7)][_0xc9a639(0x2cc)](_0x4ee41e);}else{_0x37d972[_0xc9a639(0x983)]&&_0x5a88a4[_0xc9a639(0x983)]();const _0x4ba620=this[_0xc9a639(0x7fb)]();if(_0x4ba620)_0x4ba620[_0xc9a639(0xbd)](_0x20a2f2);}}setTimeout(VisuMZ[_0xc9a639(0x7c7)][_0xc9a639(0x43d)][_0xc9a639(0x7d9)](this,_0x1918fe),_0x2fa213);},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x2cc)]=function(_0x592825){const _0x2dbc6a=_0x4396be;if(!$dataTroops[_0x592825])return'';let _0x41ef4f='█'['repeat'](0x46)+'\x0a\x0a',_0x509ae2='═'['repeat'](0x46)+'\x0a\x0a',_0x5ee4a7='';this['_commonEventLayers']=0x0;const _0x1da72c=$dataTroops[_0x592825];let _0x2e2e32=_0x1da72c[_0x2dbc6a(0x5c1)];for(const _0x11b87e of _0x2e2e32){const _0x466ccc=_0x2e2e32[_0x2dbc6a(0x22f)](_0x11b87e)+0x1;let _0x1a641b=_0x509ae2+'《《《\x20Page\x20%1\x20》》》\x0a%2\x0a',_0x2aa4ed=VisuMZ[_0x2dbc6a(0x7c7)][_0x2dbc6a(0x634)](_0x11b87e[_0x2dbc6a(0x4e4)]);if(_0x2aa4ed[_0x2dbc6a(0x858)]>0x0){if(_0x2dbc6a(0x505)!==_0x2dbc6a(0x3f7)){if(_0x5ee4a7[_0x2dbc6a(0x858)]>0x0)_0x5ee4a7+=_0x509ae2+_0x2dbc6a(0x362);else{if(_0x2dbc6a(0xe9)!=='mVNJZ')_0x5ee4a7+=_0x41ef4f+_0x2dbc6a(0x884)[_0x2dbc6a(0x9c3)](_0x592825,_0x1da72c[_0x2dbc6a(0x862)]||'Unnamed')+_0x41ef4f;else return 7.5625*_0x379d3a*_0x51070c;}_0x5ee4a7+=_0x1a641b['format'](_0x466ccc,_0x2aa4ed);}else{var _0x4fda06=_0x3f88da(_0x232efa['$1']);try{_0x5d8f70+=_0x9f5d06(_0x4fda06);}catch(_0x4ef0b8){if(_0xcfc2e8[_0x2dbc6a(0x863)]())_0x3284a5[_0x2dbc6a(0x6cd)](_0x4ef0b8);}}}}return _0x5ee4a7[_0x2dbc6a(0x858)]>0x0&&(_0x5ee4a7+=_0x509ae2),_0x5ee4a7;},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x43d)]=function(_0x3faad9){const _0x3374f1=_0x4396be,_0x4ad6f8=_0x3374f1(0xeb);_0x3faad9[_0x3374f1(0x3b9)](undefined)[_0x3374f1(0x3b9)]('')[_0x3374f1(0x3b9)](null);const _0x3a3232=_0x3faad9[_0x3374f1(0xaf)](_0x3374f1(0x362))[_0x3374f1(0x8b0)]();VisuMZ[_0x3374f1(0x7c7)][_0x3374f1(0x965)](_0x3a3232,_0x4ad6f8,!![]),SceneManager['_scene'][_0x3374f1(0x8f0)]=!![];},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x634)]=function(_0x187a84){const _0x993ba6=_0x4396be;let _0x4a63c0='\x0a'+'─'[_0x993ba6(0x642)](0x46)+'\x0a',_0x706539='\x0a'+'┄'[_0x993ba6(0x642)](0x46)+'\x0a',_0x465eed='';for(const _0xc7cf13 of _0x187a84){if(_0x993ba6(0x70a)===_0x993ba6(0x70a)){if(!_0xc7cf13)continue;if(_0xc7cf13['code']===0x65)_0x465eed+=_0x4a63c0+'\x0a',_0x465eed+=_0x993ba6(0x96b),_0xc7cf13['parameters'][0x4]!==''&&_0xc7cf13[_0x993ba6(0x113)][0x4]!==undefined&&(_0x465eed+=_0x993ba6(0x6ac)[_0x993ba6(0x9c3)](_0xc7cf13['parameters'][0x4]));else{if(_0xc7cf13[_0x993ba6(0x1c5)]===0x191)_0x465eed+='%1\x0a'['format'](_0xc7cf13[_0x993ba6(0x113)][0x0]);else{if(_0xc7cf13['code']===0x192)_0x465eed+=_0x4a63c0,_0x465eed+=_0x993ba6(0x9cf)[_0x993ba6(0x9c3)](_0x706539,_0xc7cf13[_0x993ba6(0x113)][0x0]+0x1,_0xc7cf13['parameters'][0x1]);else{if(_0xc7cf13[_0x993ba6(0x1c5)]===0x193)_0x465eed+=_0x4a63c0,_0x465eed+=_0x993ba6(0x180)[_0x993ba6(0x9c3)](_0x706539);else{if(_0xc7cf13[_0x993ba6(0x1c5)]===0x194){if('LVgAu'===_0x993ba6(0x2c9))_0x465eed+=_0x4a63c0,_0x465eed+=_0x993ba6(0x361)[_0x993ba6(0x9c3)](_0x706539);else{this['_displayY']=this[_0x993ba6(0x169)]()[_0x993ba6(0x856)];return;}}else{if(_0xc7cf13['code']===0x69){if(_0x993ba6(0x8b5)===_0x993ba6(0x8b5))_0x465eed+=_0x4a63c0+'\x0a',_0x465eed+=_0x993ba6(0x24b);else{const _0x77253e=this['paramWidth']();this[_0x993ba6(0x2d1)](),this[_0x993ba6(0x865)](this[_0x993ba6(0x97f)][_0x993ba6(0x3ad)](_0x5f2c23,!![]),_0x3d265c,_0x139491,_0x77253e,_0x993ba6(0x595));}}else{if(_0xc7cf13['code']===0x6c)_0x993ba6(0x54d)==='pcOrI'?this[_0x993ba6(0x84e)][_0x993ba6(0x2dd)](_0xa06d6b[_0x993ba6(0x83c)]['CommandBgType']):(_0x465eed+=_0x4a63c0+'\x0a',_0x465eed+=_0x993ba6(0x564)[_0x993ba6(0x9c3)](_0xc7cf13[_0x993ba6(0x113)][0x0]));else{if(_0xc7cf13[_0x993ba6(0x1c5)]===0x198){if(_0x993ba6(0x22c)!==_0x993ba6(0x22c))return _0x223378[_0x993ba6(0x7c7)][_0x993ba6(0x624)]['Color'][_0x993ba6(0x795)]||_0x993ba6(0x6bf);else _0x465eed+=_0x993ba6(0xb6)['format'](_0xc7cf13[_0x993ba6(0x113)][0x0]);}else{if(_0xc7cf13['code']===0x75){const _0x57999d=$dataCommonEvents[_0xc7cf13[_0x993ba6(0x113)][0x0]];if(_0x57999d&&this['_commonEventLayers']<=0xa){this[_0x993ba6(0xa0a)]++;let _0x4f84ba=VisuMZ[_0x993ba6(0x7c7)][_0x993ba6(0x634)](_0x57999d[_0x993ba6(0x4e4)]);_0x4f84ba[_0x993ba6(0x858)]>0x0&&(_0x993ba6(0x871)!==_0x993ba6(0x8f3)?(_0x465eed+=_0x4a63c0,_0x465eed+=_0x706539,_0x465eed+=_0x993ba6(0x389)[_0x993ba6(0x9c3)](_0x57999d['id'],_0x57999d[_0x993ba6(0x862)]),_0x465eed+=_0x706539,_0x465eed+=_0x4f84ba,_0x465eed+=_0x706539,_0x465eed+=_0x993ba6(0x2fe)['format'](_0x57999d['id'],_0x57999d[_0x993ba6(0x862)]),_0x465eed+=_0x706539):_0x2d7aaf['scaleMode']=_0x15b73f[_0x993ba6(0x38d)][_0x993ba6(0x7bb)]),this['_commonEventLayers']--;}}}}}}}}}}}else this['_anglePlus'][_0x993ba6(0x2b7)]=this[_0x993ba6(0x42e)][_0x993ba6(0x874)];}return _0x465eed[_0x993ba6(0x858)]>0x0&&(_0x465eed+=_0x4a63c0),_0x465eed;},PluginManager[_0x4396be(0x7a3)](pluginData[_0x4396be(0x862)],_0x4396be(0x265),_0x4ff16c=>{const _0x1d3b76=_0x4396be;VisuMZ[_0x1d3b76(0x162)](_0x4ff16c,_0x4ff16c);const _0x45cb68=_0x4ff16c[_0x1d3b76(0x51e)];VisuMZ[_0x1d3b76(0x1cf)](_0x45cb68);}),PluginManager[_0x4396be(0x7a3)](pluginData[_0x4396be(0x862)],_0x4396be(0x1fd),_0x32ec5d=>{const _0x4f6ca6=_0x4396be;VisuMZ[_0x4f6ca6(0x162)](_0x32ec5d,_0x32ec5d);const _0x512e84=_0x32ec5d[_0x4f6ca6(0x61d)]||0x0;$gameParty[_0x4f6ca6(0x814)](_0x512e84);}),PluginManager[_0x4396be(0x7a3)](pluginData[_0x4396be(0x862)],'MapOnceParallel',_0x46e24d=>{const _0x26cf8f=_0x4396be;if(!SceneManager[_0x26cf8f(0x7ee)]())return;VisuMZ['ConvertParams'](_0x46e24d,_0x46e24d);const _0x4d8d48=_0x46e24d[_0x26cf8f(0x67e)];SceneManager[_0x26cf8f(0x9c8)][_0x26cf8f(0x41b)](_0x4d8d48);}),PluginManager[_0x4396be(0x7a3)](pluginData[_0x4396be(0x862)],'PictureCoordinatesMode',_0xc6b3f9=>{const _0xa50293=_0x4396be;if(!$gameTemp[_0xa50293(0x863)]())return;if(!Utils['isNwjs']())return;VisuMZ[_0xa50293(0x162)](_0xc6b3f9,_0xc6b3f9);const _0x336f09=_0xc6b3f9['PictureID']||0x1;$gameTemp[_0xa50293(0x544)]=_0x336f09;}),PluginManager[_0x4396be(0x7a3)](pluginData[_0x4396be(0x862)],_0x4396be(0x2f9),_0x3399ac=>{const _0x109340=_0x4396be;VisuMZ['ConvertParams'](_0x3399ac,_0x3399ac);const _0x54d63e=_0x3399ac['pictureId']||0x1,_0x24307a=_0x3399ac[_0x109340(0x152)]||'Linear',_0xb11fb5=$gameScreen[_0x109340(0x6cc)](_0x54d63e);if(_0xb11fb5){if(_0x109340(0x974)!=='pgmNI'){const _0x4cfa5c=_0x3e77e1?this['_scrollBarHorz']:this[_0x109340(0x314)];if(!_0x4cfa5c)return;const _0x5c38a0=_0x39e5be[_0x109340(0x6a9)],_0x14dee4=_0x5c38a0[_0x109340(0x55f)],_0x5f3cb8=_0x5c38a0[_0x109340(0xfc)];if(!_0x4cfa5c[_0x109340(0x71d)])return;_0x4cfa5c['x']=this['padding']+(_0x10a7b1?_0x14dee4:this[_0x109340(0x723)]+_0x5f3cb8),_0x4cfa5c['y']=this[_0x109340(0x1b4)]+(_0x2c2460?this['innerHeight']+_0x5f3cb8:_0x14dee4);}else _0xb11fb5['setEasingType'](_0x24307a);}}),PluginManager[_0x4396be(0x7a3)](pluginData['name'],'PictureEraseAll',_0x20b540=>{const _0x26c935=_0x4396be;for(let _0x2121ce=0x1;_0x2121ce<=0x64;_0x2121ce++){$gameScreen[_0x26c935(0x5ef)](_0x2121ce);}}),PluginManager[_0x4396be(0x7a3)](pluginData['name'],_0x4396be(0x3cd),_0x469567=>{const _0x3789d6=_0x4396be;VisuMZ[_0x3789d6(0x162)](_0x469567,_0x469567);const _0x5b44d5=Math['min'](_0x469567[_0x3789d6(0x491)],_0x469567[_0x3789d6(0x94e)]),_0x519514=Math[_0x3789d6(0x8cd)](_0x469567['StartID'],_0x469567[_0x3789d6(0x94e)]);for(let _0x50783c=_0x5b44d5;_0x50783c<=_0x519514;_0x50783c++){$gameScreen[_0x3789d6(0x5ef)](_0x50783c);}}),PluginManager[_0x4396be(0x7a3)](pluginData['name'],'PictureRotateBy',_0x409670=>{const _0x30f489=_0x4396be;VisuMZ['ConvertParams'](_0x409670,_0x409670);const _0x12cbc3=Math[_0x30f489(0xb9)](_0x409670['PictureID'])[_0x30f489(0x5d5)](0x1,0x64),_0x2beecb=-Number(_0x409670[_0x30f489(0x99a)]||0x0),_0x3ca3f1=Math['max'](_0x409670[_0x30f489(0x115)]||0x0,0x0),_0x439712=_0x409670['easingType']||_0x30f489(0x84b),_0x48e5d4=_0x409670['Wait'],_0x12e775=$gameScreen[_0x30f489(0x6cc)](_0x12cbc3);if(!_0x12e775)return;_0x12e775['changeAnglePlusData'](_0x2beecb,_0x3ca3f1,_0x439712);if(_0x48e5d4){if(_0x30f489(0x70c)==='wEmIA'){let _0xfd6575=this[_0x30f489(0x258)];this[_0x30f489(0x258)]=_0x2bfce6,_0xfd6575!==this[_0x30f489(0x258)]&&(this['refresh'](),_0x75c0db['playOk'](),this[_0x30f489(0x258)]===_0x30f489(0xf1)?this[_0x30f489(0x17a)](0x0):this[_0x30f489(0x17a)](-0x1));}else{const _0xf3736f=$gameTemp[_0x30f489(0x7a5)]();if(_0xf3736f)_0xf3736f[_0x30f489(0x5ab)](_0x3ca3f1);}}}),PluginManager[_0x4396be(0x7a3)](pluginData[_0x4396be(0x862)],_0x4396be(0x682),_0x57d9c8=>{const _0x152d57=_0x4396be;VisuMZ[_0x152d57(0x162)](_0x57d9c8,_0x57d9c8);const _0x578379=Math[_0x152d57(0xb9)](_0x57d9c8[_0x152d57(0x950)])[_0x152d57(0x5d5)](0x1,0x64),_0x463717=-Number(_0x57d9c8[_0x152d57(0x8ca)]||0x0),_0x20d0f0=Math[_0x152d57(0x8cd)](_0x57d9c8[_0x152d57(0x115)]||0x0,0x0),_0x5e0a27=_0x57d9c8[_0x152d57(0x152)]||_0x152d57(0x84b),_0x1c44f8=_0x57d9c8['Wait'],_0x5163e3=$gameScreen[_0x152d57(0x6cc)](_0x578379);if(!_0x5163e3)return;_0x5163e3['setAnglePlusData'](_0x463717,_0x20d0f0,_0x5e0a27);if(_0x1c44f8){if('cAZFH'!==_0x152d57(0x921))_0x6876be['CoreEngine'][_0x152d57(0x1ef)]['call'](this),this['loadGameImagesCoreEngine']();else{const _0x1be8c0=$gameTemp[_0x152d57(0x7a5)]();if(_0x1be8c0)_0x1be8c0[_0x152d57(0x5ab)](_0x20d0f0);}}}),PluginManager[_0x4396be(0x7a3)](pluginData[_0x4396be(0x862)],_0x4396be(0x34a),_0x591ac8=>{const _0x43ad82=_0x4396be;VisuMZ[_0x43ad82(0x162)](_0x591ac8,_0x591ac8);const _0xfd346f=Math[_0x43ad82(0xb9)](_0x591ac8[_0x43ad82(0x950)])[_0x43ad82(0x5d5)](0x1,0x64),_0x2d71c1=_0x591ac8[_0x43ad82(0x624)],_0x1bb665=_0x2d71c1[_0x43ad82(0x46a)]['clamp'](0x0,0x1),_0x1a9d85=Math[_0x43ad82(0xb9)](_0x2d71c1[_0x43ad82(0x2e4)]||0x0),_0x136dde=Math[_0x43ad82(0xb9)](_0x2d71c1[_0x43ad82(0x187)]||0x0),_0x2b5258=Math[_0x43ad82(0xb9)](_0x2d71c1[_0x43ad82(0x59d)]||0x0),_0x349c43=Math[_0x43ad82(0xb9)](_0x2d71c1[_0x43ad82(0x309)]||0x0),_0x28ed98=Math[_0x43ad82(0xb9)](_0x2d71c1[_0x43ad82(0x9ac)])['clamp'](0x0,0xff),_0x3fdc85=_0x2d71c1['BlendMode'],_0x21a8ca='VisuMZ\x20CoreEngine\x20PictureIcon\x20%1\x20%2',_0xb4cee=_0x591ac8['Smooth']?_0x43ad82(0x1d8):_0x43ad82(0x7dd),_0x13749f=_0x21a8ca[_0x43ad82(0x9c3)](_0x591ac8[_0x43ad82(0x99d)],_0xb4cee);$gameScreen[_0x43ad82(0x9bc)](_0xfd346f,_0x13749f,_0x1bb665,_0x1a9d85,_0x136dde,_0x2b5258,_0x349c43,_0x28ed98,_0x3fdc85);}),PluginManager[_0x4396be(0x7a3)](pluginData[_0x4396be(0x862)],_0x4396be(0x83f),_0x1047da=>{const _0x1987f0=_0x4396be;VisuMZ['ConvertParams'](_0x1047da,_0x1047da);const _0x53e00f=_0x1047da['Type']||_0x1987f0(0x3cb),_0x252cb9=_0x1047da[_0x1987f0(0x493)]['clamp'](0x1,0x9),_0x2bcda=_0x1047da[_0x1987f0(0x223)][_0x1987f0(0x5d5)](0x1,0x9),_0x170e51=_0x1047da['Duration']||0x1,_0x321480=_0x1047da[_0x1987f0(0x524)];$gameScreen['setCoreEngineScreenShakeStyle'](_0x53e00f),$gameScreen[_0x1987f0(0x99b)](_0x252cb9,_0x2bcda,_0x170e51);if(_0x321480){const _0x37cc4d=$gameTemp[_0x1987f0(0x7a5)]();if(_0x37cc4d)_0x37cc4d[_0x1987f0(0x5ab)](_0x170e51);}}),PluginManager['registerCommand'](pluginData[_0x4396be(0x862)],_0x4396be(0xb1),_0x5188c1=>{const _0x4d1a38=_0x4396be;if($gameParty['inBattle']())return;VisuMZ[_0x4d1a38(0x162)](_0x5188c1,_0x5188c1);const _0x4cc037=_0x5188c1['IDs'],_0xf3c972=(_0x5188c1[_0x4d1a38(0x6b5)]||0x0)/0x64;for(const _0x291387 of _0x4cc037){if('mQIBW'!==_0x4d1a38(0x28f)){const _0x24778f=Math['random']()<=_0xf3c972;$gameSwitches[_0x4d1a38(0x2a0)](_0x291387,_0x24778f);}else{_0x39dfe4['maxLevel']=_0x58b2be(_0x8804b5['$1']);if(_0x27676c['maxLevel']===0x0)_0x5918c6[_0x4d1a38(0x67b)]=_0x373a00[_0x4d1a38(0x83d)];}}}),PluginManager[_0x4396be(0x7a3)](pluginData['name'],_0x4396be(0xb4),_0x199877=>{const _0xac1ccf=_0x4396be;if($gameParty[_0xac1ccf(0x2ee)]())return;VisuMZ[_0xac1ccf(0x162)](_0x199877,_0x199877);const _0x54b86c=Math[_0xac1ccf(0x58b)](_0x199877['StartID'],_0x199877['EndingID']),_0x232877=Math['max'](_0x199877[_0xac1ccf(0x491)],_0x199877[_0xac1ccf(0x94e)]),_0x2ff02d=(_0x199877[_0xac1ccf(0x6b5)]||0x0)/0x64;for(let _0x5e4891=_0x54b86c;_0x5e4891<=_0x232877;_0x5e4891++){if('csrbr'==='RzMNH')return this[_0xac1ccf(0x97f)][_0xac1ccf(0x7c6)](_0xdf4478);else{const _0x34120c=Math[_0xac1ccf(0x3cb)]()<=_0x2ff02d;$gameSwitches[_0xac1ccf(0x2a0)](_0x5e4891,_0x34120c);}}}),PluginManager[_0x4396be(0x7a3)](pluginData[_0x4396be(0x862)],_0x4396be(0x6df),_0x1c0bd8=>{const _0x8e46c6=_0x4396be;if($gameParty[_0x8e46c6(0x2ee)]())return;VisuMZ['ConvertParams'](_0x1c0bd8,_0x1c0bd8);const _0x597a0c=_0x1c0bd8['IDs'];for(const _0x2d97b5 of _0x597a0c){const _0x692de6=$gameSwitches['value'](_0x2d97b5);$gameSwitches[_0x8e46c6(0x2a0)](_0x2d97b5,!_0x692de6);}}),PluginManager[_0x4396be(0x7a3)](pluginData[_0x4396be(0x862)],'SwitchToggleRange',_0x41be82=>{const _0x4e88a0=_0x4396be;if($gameParty[_0x4e88a0(0x2ee)]())return;VisuMZ['ConvertParams'](_0x41be82,_0x41be82);const _0x2f6ac5=Math[_0x4e88a0(0x58b)](_0x41be82[_0x4e88a0(0x491)],_0x41be82['EndingID']),_0xd022eb=Math[_0x4e88a0(0x8cd)](_0x41be82[_0x4e88a0(0x491)],_0x41be82['EndingID']);for(let _0x482926=_0x2f6ac5;_0x482926<=_0xd022eb;_0x482926++){const _0x2d744e=$gameSwitches[_0x4e88a0(0x61d)](_0x482926);$gameSwitches[_0x4e88a0(0x2a0)](_0x482926,!_0x2d744e);}}),PluginManager['registerCommand'](pluginData[_0x4396be(0x862)],_0x4396be(0x8bf),_0x1df2c4=>{const _0x47c7c0=_0x4396be;VisuMZ[_0x47c7c0(0x162)](_0x1df2c4,_0x1df2c4);const _0x19385b=_0x1df2c4[_0x47c7c0(0x906)]||0x1;$gameSystem[_0x47c7c0(0x8a8)](_0x19385b);}),PluginManager[_0x4396be(0x7a3)](pluginData[_0x4396be(0x862)],_0x4396be(0x65a),_0x5bc370=>{const _0x4e343e=_0x4396be;if($gameParty[_0x4e343e(0x2ee)]())return;VisuMZ[_0x4e343e(0x162)](_0x5bc370,_0x5bc370);const _0x3e78e8=_0x5bc370[_0x4e343e(0x906)];if(_0x3e78e8[_0x4e343e(0x8e4)](/Front/i))$gameSystem[_0x4e343e(0x859)](![]);else _0x3e78e8['match'](/Side/i)?$gameSystem[_0x4e343e(0x859)](!![]):_0x4e343e(0x7be)===_0x4e343e(0x7be)?$gameSystem[_0x4e343e(0x859)](!$gameSystem['isSideView']()):_0x5c3d1d[_0x4e343e(0x503)]&&(this[_0x4e343e(0x50d)]=_0x4e343e(0x387));}),PluginManager['registerCommand'](pluginData['name'],_0x4396be(0x779),_0x26dc30=>{const _0x20acbd=_0x4396be;if($gameParty[_0x20acbd(0x2ee)]())return;VisuMZ[_0x20acbd(0x162)](_0x26dc30,_0x26dc30);const _0x131d56=[_0x20acbd(0xdd),_0x20acbd(0x9ba),'me','se'];for(const _0x25ba60 of _0x131d56){const _0x2a9ebb=_0x26dc30[_0x25ba60],_0x1e4eb2=_0x20acbd(0x35c)[_0x20acbd(0x9c3)](_0x25ba60);for(const _0x21396e of _0x2a9ebb){AudioManager['createBuffer'](_0x1e4eb2,_0x21396e);}}}),PluginManager[_0x4396be(0x7a3)](pluginData[_0x4396be(0x862)],_0x4396be(0x1c0),_0x3e13b2=>{const _0x45c906=_0x4396be;if($gameParty[_0x45c906(0x2ee)]())return;VisuMZ['ConvertParams'](_0x3e13b2,_0x3e13b2);const _0x1c042d=[_0x45c906(0x40d),_0x45c906(0x3c6),_0x45c906(0x64b),'characters',_0x45c906(0x9ad),_0x45c906(0x737),_0x45c906(0x317),_0x45c906(0x5fc),_0x45c906(0x14a),_0x45c906(0x5de),_0x45c906(0x7a1),_0x45c906(0x2e7),_0x45c906(0x5e6),_0x45c906(0x7d5)];for(const _0x5dd56 of _0x1c042d){const _0x214ac8=_0x3e13b2[_0x5dd56],_0x18734f=_0x45c906(0x743)['format'](_0x5dd56);for(const _0x8cfe97 of _0x214ac8){_0x45c906(0x243)===_0x45c906(0x2e8)?(this[_0x45c906(0x169)]()[_0x45c906(0x7e4)]&&(this['_displayX']=this[_0x45c906(0x169)]()[_0x45c906(0x4b7)]),this[_0x45c906(0x169)]()['centerY']&&(this['_displayY']=this[_0x45c906(0x169)]()['displayY'])):ImageManager[_0x45c906(0xb5)](_0x18734f,_0x8cfe97);}}}),PluginManager[_0x4396be(0x7a3)](pluginData[_0x4396be(0x862)],_0x4396be(0x8d0),_0x3b0f14=>{const _0xf23961=_0x4396be;if($gameParty['inBattle']())return;VisuMZ['ConvertParams'](_0x3b0f14,_0x3b0f14);const _0x4ef14a=_0x3b0f14[_0xf23961(0x906)][_0xf23961(0x569)]()[_0xf23961(0x8b0)](),_0x359ff5=VisuMZ[_0xf23961(0x7c7)]['CreateBattleSystemID'](_0x4ef14a);$gameSystem[_0xf23961(0x536)](_0x359ff5);}),VisuMZ['CoreEngine'][_0x4396be(0x3fd)]=function(_0x5d16d9){const _0x4fda2d=_0x4396be;_0x5d16d9=_0x5d16d9||'DATABASE',_0x5d16d9=String(_0x5d16d9)['toUpperCase']()[_0x4fda2d(0x8b0)]();switch(_0x5d16d9){case'DTB':return 0x0;case _0x4fda2d(0x332):if(Imported[_0x4fda2d(0x9fa)]){if(_0x4fda2d(0x376)===_0x4fda2d(0x6be)){if(_0x54f7c3['inBattle']())return;_0x57ea96[_0x4fda2d(0x162)](_0x400578,_0x1f8a4d);const _0x262fc6=[_0x4fda2d(0xdd),_0x4fda2d(0x9ba),'me','se'];for(const _0x331bc2 of _0x262fc6){const _0x14d493=_0x89800e[_0x331bc2],_0x1bc47c=_0x4fda2d(0x35c)[_0x4fda2d(0x9c3)](_0x331bc2);for(const _0x45de0f of _0x14d493){_0x884f90[_0x4fda2d(0x709)](_0x1bc47c,_0x45de0f);}}}else ConfigManager['atbActive']=!![];}return 0x1;case'TPB\x20WAIT':Imported['VisuMZ_1_OptionsCore']&&(_0x4fda2d(0x9d1)!==_0x4fda2d(0xb8)?ConfigManager['atbActive']=![]:this['_forcedBattleSys']=_0x4fda2d(0x520));return 0x2;case _0x4fda2d(0x520):if(Imported[_0x4fda2d(0x1f6)])return'CTB';break;case _0x4fda2d(0x1f1):if(Imported[_0x4fda2d(0x394)])return _0x4fda2d(0x1f1);break;case _0x4fda2d(0x387):if(Imported['VisuMZ_2_BattleSystemBTB'])return _0x4fda2d(0x387);break;case'FTB':if(Imported[_0x4fda2d(0x53b)])return _0x4fda2d(0x13d)!=='NCYdr'?_0xcddd9b['CoreEngine']['Settings']['QoL']['SmartEventCollisionPriority']:'FTB';break;case _0x4fda2d(0x91f):if(Imported[_0x4fda2d(0x83b)])return _0x4fda2d(0x91f);break;case _0x4fda2d(0x126):if(Imported[_0x4fda2d(0x56b)]){if(_0x4fda2d(0x390)!==_0x4fda2d(0x7f8))return _0x4fda2d(0x126);else{const _0x1f6281=_0x4aa862['shift']();_0x1f6281[_0x4fda2d(0x255)]&&_0x1f6281[_0x4fda2d(0x1c4)]&&_0x1f6281[_0x4fda2d(0x504)]>0x0&&(_0x501219[_0x4fda2d(0x3f6)](_0x34d44f[_0x4fda2d(0x363)],0x0,~0x0),_0x398d4a[_0x4fda2d(0x521)](_0xaa0b54[_0x4fda2d(0x42f)],_0x1353c4[_0x4fda2d(0x42f)],_0x1f5231[_0x4fda2d(0x42f)]),_0x1f6281[_0x4fda2d(0x1dd)](_0x293824),_0x3ca1bd[_0x4fda2d(0x815)][_0x4fda2d(0x108)](),_0x355638['clear'](),_0xb3ddb4[_0x4fda2d(0x3f6)](_0x4ead58[_0x4fda2d(0x748)],0x1,~0x0),_0x2b32c0[_0x4fda2d(0x521)](_0x235d36[_0x4fda2d(0x488)],_0x546c81['REPLACE'],_0x5afed1[_0x4fda2d(0x488)]),_0x4701f6['blendFunc'](_0x210499[_0x4fda2d(0x30d)],_0x49c462[_0x4fda2d(0x495)]),_0x74aba3[_0x4fda2d(0x1dd)](_0x481300),_0x406fbf[_0x4fda2d(0x815)][_0x4fda2d(0x108)](),_0x1a94ff[_0x4fda2d(0x4db)](_0x4287ae['ONE'],_0x3d5665[_0x4fda2d(0x30f)]));}}break;case'PTB':if(Imported[_0x4fda2d(0x1e0)])return _0x4fda2d(0x703);break;}return $dataSystem[_0x4fda2d(0x3cc)];},PluginManager[_0x4396be(0x7a3)](pluginData[_0x4396be(0x862)],_0x4396be(0x3e2),_0x53e5d2=>{const _0x589337=_0x4396be;VisuMZ[_0x589337(0x162)](_0x53e5d2,_0x53e5d2);const _0x45f2d1=_0x53e5d2[_0x589337(0x906)]||0x1;$gameSystem[_0x589337(0x964)](_0x45f2d1);}),PluginManager[_0x4396be(0x7a3)](pluginData[_0x4396be(0x862)],_0x4396be(0x567),_0x517265=>{VisuMZ['ConvertParams'](_0x517265,_0x517265);const _0x534b68=_0x517265['text']||'';$textPopup(_0x534b68);}),PluginManager[_0x4396be(0x7a3)](pluginData[_0x4396be(0x862)],_0x4396be(0x54f),_0x5d36e9=>{const _0x7a9e57=_0x4396be;VisuMZ[_0x7a9e57(0x162)](_0x5d36e9,_0x5d36e9);const _0x16c011=_0x5d36e9['id']||0x1,_0x1e40b7=_0x5d36e9[_0x7a9e57(0x8c1)],_0x837728=_0x5d36e9[_0x7a9e57(0x224)]||0x0;let _0x38bc91=$gameVariables[_0x7a9e57(0x61d)](_0x16c011)||0x0;switch(_0x1e40b7){case'=':_0x38bc91=_0x837728;break;case'+':_0x38bc91+=_0x837728;break;case'-':_0x38bc91-=_0x837728;break;case'*':_0x38bc91*=_0x837728;break;case'/':_0x38bc91/=_0x837728;break;case'%':_0x38bc91%=_0x837728;break;}_0x38bc91=_0x38bc91||0x0,$gameVariables['setValue'](_0x16c011,_0x38bc91);}),PluginManager['registerCommand'](pluginData['name'],_0x4396be(0x4f0),_0xa9e9df=>{const _0x42dcc0=_0x4396be;VisuMZ[_0x42dcc0(0x162)](_0xa9e9df,_0xa9e9df);const _0x9ca75f=_0xa9e9df['id']()||0x1,_0x176226=_0xa9e9df[_0x42dcc0(0x8c1)],_0x8a45ad=_0xa9e9df['operand']()||0x0;let _0x51e4b3=$gameVariables[_0x42dcc0(0x61d)](_0x9ca75f)||0x0;switch(_0x176226){case'=':_0x51e4b3=_0x8a45ad;break;case'+':_0x51e4b3+=_0x8a45ad;break;case'-':_0x51e4b3-=_0x8a45ad;break;case'*':_0x51e4b3*=_0x8a45ad;break;case'/':_0x51e4b3/=_0x8a45ad;break;case'%':_0x51e4b3%=_0x8a45ad;break;}_0x51e4b3=_0x51e4b3||0x0,$gameVariables[_0x42dcc0(0x2a0)](_0x9ca75f,_0x51e4b3);}),VisuMZ['CoreEngine'][_0x4396be(0x87b)]=Scene_Boot[_0x4396be(0x56f)]['onDatabaseLoaded'],Scene_Boot['prototype']['onDatabaseLoaded']=function(){const _0x52ef22=_0x4396be;VisuMZ['CoreEngine'][_0x52ef22(0x87b)][_0x52ef22(0x8ee)](this),this[_0x52ef22(0xb2)](),this['process_VisuMZ_CoreEngine_Notetags'](),this[_0x52ef22(0x899)](),this[_0x52ef22(0x344)](),this['process_VisuMZ_CoreEngine_CustomParameters'](),this[_0x52ef22(0x4c4)](),VisuMZ['ParseAllNotetags']();},VisuMZ['CoreEngine'][_0x4396be(0x39c)]={},Scene_Boot[_0x4396be(0x56f)]['process_VisuMZ_CoreEngine_RegExp']=function(){const _0x2eec82=_0x4396be,_0x2be25f=[_0x2eec82(0x93e),'MAXMP',_0x2eec82(0x75b),'DEF',_0x2eec82(0x992),_0x2eec82(0x8f2),_0x2eec82(0x781),_0x2eec82(0x140)],_0x2beb1d=[_0x2eec82(0x5c7),_0x2eec82(0x16a),'CRI',_0x2eec82(0x458),_0x2eec82(0x26e),_0x2eec82(0x7d3),_0x2eec82(0x9b9),_0x2eec82(0x467),'MRG','TRG'],_0x164b1b=[_0x2eec82(0x135),'GRD',_0x2eec82(0x51d),_0x2eec82(0x778),_0x2eec82(0x1b1),_0x2eec82(0x90d),_0x2eec82(0x91c),_0x2eec82(0x68e),_0x2eec82(0x570),'EXR'],_0x542390=[_0x2be25f,_0x2beb1d,_0x164b1b],_0x1df8ef=[_0x2eec82(0xa00),_0x2eec82(0x444),_0x2eec82(0x153),'Max',_0x2eec82(0x3ff),_0x2eec82(0x798),'Rate2',_0x2eec82(0x197),'Flat1',_0x2eec82(0x641)];for(const _0x1ebe90 of _0x542390){if('QYCpA'!==_0x2eec82(0x73e)){if(this['_CoreEngineSettings']===_0x4d6cfb)this[_0x2eec82(0x308)]();if(this[_0x2eec82(0x4bf)][_0x2eec82(0x978)]===_0x23e9fc)this[_0x2eec82(0x308)]();this[_0x2eec82(0x4bf)][_0x2eec82(0x978)]=_0x17298f;}else{let _0x4e2e90='';if(_0x1ebe90===_0x2be25f)_0x4e2e90=_0x2eec82(0x77c);if(_0x1ebe90===_0x2beb1d)_0x4e2e90=_0x2eec82(0x9d8);if(_0x1ebe90===_0x164b1b)_0x4e2e90=_0x2eec82(0x32b);for(const _0x3cdc3d of _0x1df8ef){let _0x172c61=_0x2eec82(0x5df)['format'](_0x4e2e90,_0x3cdc3d);VisuMZ[_0x2eec82(0x7c7)]['RegExp'][_0x172c61]=[],VisuMZ['CoreEngine'][_0x2eec82(0x39c)][_0x172c61+'JS']=[];let _0x117b35=_0x2eec82(0x90a);if(['Plus','Flat'][_0x2eec82(0x897)](_0x3cdc3d))_0x117b35+=_0x2eec82(0x173);else{if(['Plus1',_0x2eec82(0x231)][_0x2eec82(0x897)](_0x3cdc3d)){if('KJwfh'!==_0x2eec82(0x3d5)){if(_0x4a4b09[_0x2eec82(0x863)]())_0x519a58[_0x2eec82(0x6cd)](_0x3ce9e4);}else _0x117b35+=_0x2eec82(0x2fc);}else{if([_0x2eec82(0x153),_0x2eec82(0x641)][_0x2eec82(0x897)](_0x3cdc3d))_0x117b35+=_0x2eec82(0x63d);else{if(_0x3cdc3d===_0x2eec82(0x98c))_0x117b35+=_0x2eec82(0x23f);else{if(_0x3cdc3d===_0x2eec82(0x798))_0x117b35+='(\x5cd+)([%％])>';else _0x3cdc3d==='Rate2'&&(_0x117b35+='(\x5cd+\x5c.?\x5cd+)>');}}}}for(const _0x5bb768 of _0x1ebe90){let _0x227842=_0x3cdc3d[_0x2eec82(0x437)](/[\d+]/g,'')[_0x2eec82(0x569)]();const _0x82614f=_0x117b35[_0x2eec82(0x9c3)](_0x5bb768,_0x227842);VisuMZ[_0x2eec82(0x7c7)]['RegExp'][_0x172c61][_0x2eec82(0x8ab)](new RegExp(_0x82614f,'i'));const _0x506e9e=_0x2eec82(0x57c)[_0x2eec82(0x9c3)](_0x5bb768,_0x227842);VisuMZ[_0x2eec82(0x7c7)]['RegExp'][_0x172c61+'JS'][_0x2eec82(0x8ab)](new RegExp(_0x506e9e,'i'));}}}}},Scene_Boot[_0x4396be(0x56f)][_0x4396be(0x937)]=function(){if(VisuMZ['ParseAllNotetags'])return;},Scene_Boot[_0x4396be(0x56f)][_0x4396be(0x899)]=function(){const _0x376780=_0x4396be,_0x4ce9f1=VisuMZ['CoreEngine']['Settings'];_0x4ce9f1[_0x376780(0x9e8)][_0x376780(0x711)]&&VisuMZ[_0x376780(0x7c0)](!![]);_0x4ce9f1[_0x376780(0x9e8)]['ModernControls']&&(Input['keyMapper'][0x23]='end',Input[_0x376780(0x994)][0x24]=_0x376780(0x209));if(_0x4ce9f1[_0x376780(0x775)]){const _0x3e6e3b=_0x4ce9f1['ButtonAssist'];_0x3e6e3b['KeySHIFT']=_0x3e6e3b[_0x376780(0x2c6)]||_0x376780(0x193),_0x3e6e3b['KeyTAB']=_0x3e6e3b[_0x376780(0x2b1)]||_0x376780(0x5a5);}_0x4ce9f1[_0x376780(0x4bc)][_0x376780(0x700)]&&(Input[_0x376780(0x994)][0x57]='up',Input[_0x376780(0x994)][0x41]=_0x376780(0x9d7),Input['keyMapper'][0x53]=_0x376780(0x22e),Input[_0x376780(0x994)][0x44]=_0x376780(0x595),Input[_0x376780(0x994)][0x45]=_0x376780(0x1c9));if(_0x4ce9f1[_0x376780(0x4bc)][_0x376780(0x360)]){if(_0x376780(0x843)!==_0x376780(0x500))Input['keyMapper'][0x52]=_0x376780(0x13b);else return _0x578a2b[_0x376780(0x474)];}_0x4ce9f1[_0x376780(0xa0e)][_0x376780(0x2c0)]=_0x4ce9f1[_0x376780(0xa0e)][_0x376780(0x2c0)][_0x376780(0x774)](_0x5f35b4=>_0x5f35b4['toUpperCase']()[_0x376780(0x8b0)]()),_0x4ce9f1[_0x376780(0xa0e)][_0x376780(0x998)]=_0x4ce9f1[_0x376780(0xa0e)][_0x376780(0x998)][_0x376780(0x774)](_0x4b04c1=>_0x4b04c1[_0x376780(0x569)]()['trim']()),_0x4ce9f1[_0x376780(0x9e8)][_0x376780(0x190)]=_0x4ce9f1['QoL'][_0x376780(0x190)]??!![],_0x4ce9f1[_0x376780(0x9e8)][_0x376780(0x429)]=_0x4ce9f1[_0x376780(0x9e8)][_0x376780(0x429)]??!![];},Scene_Boot['prototype']['process_VisuMZ_CoreEngine_Functions']=function(){this['process_VisuMZ_CoreEngine_jsQuickFunctions']();},Scene_Boot[_0x4396be(0x56f)][_0x4396be(0x9bb)]=function(){const _0x24e690=_0x4396be,_0x2c6fb7=VisuMZ['CoreEngine'][_0x24e690(0x624)][_0x24e690(0x938)];for(const _0x48ceb7 of _0x2c6fb7){if(_0x24e690(0x2d4)!==_0x24e690(0x2d4))this['makeCoreEngineCommandList']();else{const _0xfb19c2=_0x48ceb7[_0x24e690(0x9b0)][_0x24e690(0x437)](/[ ]/g,''),_0x306daa=_0x48ceb7[_0x24e690(0x5ed)];VisuMZ[_0x24e690(0x7c7)][_0x24e690(0x39e)](_0xfb19c2,_0x306daa);}}},VisuMZ['CoreEngine'][_0x4396be(0x39e)]=function(_0x532ae2,_0x2c4f41){const _0x401957=_0x4396be;if(!!window[_0x532ae2]){if(_0x401957(0x2c7)===_0x401957(0x45a))_0xad76f8[_0x401957(0x7c7)][_0x401957(0x92d)][_0x401957(0x8ee)](this);else{if($gameTemp[_0x401957(0x863)]())console[_0x401957(0x6cd)](_0x401957(0x5ee)[_0x401957(0x9c3)](_0x532ae2));}}const _0x2963ff=_0x401957(0x6a0)['format'](_0x532ae2,_0x2c4f41);window[_0x532ae2]=new Function(_0x2963ff);},Scene_Boot['prototype'][_0x4396be(0xc4)]=function(){const _0x3f542c=_0x4396be,_0x4e8e7b=VisuMZ['CoreEngine'][_0x3f542c(0x624)][_0x3f542c(0x82f)];if(!_0x4e8e7b)return;for(const _0x2127fa of _0x4e8e7b){if(_0x3f542c(0x2d5)!=='OQJqb'){if(!_0x2127fa)continue;VisuMZ[_0x3f542c(0x7c7)][_0x3f542c(0x489)](_0x2127fa);}else for(const _0x37b8ee of this[_0x3f542c(0x87a)]){this[_0x3f542c(0x7e2)](_0x37b8ee);}}},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x3a9)]={},VisuMZ['CoreEngine'][_0x4396be(0x443)]={},VisuMZ[_0x4396be(0x7c7)]['CustomParamType']={},VisuMZ[_0x4396be(0x7c7)]['CustomParamAbb']={},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x489)]=function(_0x6830b8){const _0x2c192a=_0x4396be,_0x1117ae=_0x6830b8[_0x2c192a(0x56e)],_0x2d437d=_0x6830b8[_0x2c192a(0x20a)],_0x493cfb=_0x6830b8[_0x2c192a(0x7ba)],_0x4082b3=_0x6830b8[_0x2c192a(0xa03)],_0x6c9bb0=new Function(_0x6830b8[_0x2c192a(0x30c)]);VisuMZ[_0x2c192a(0x7c7)][_0x2c192a(0x3a9)][_0x1117ae[_0x2c192a(0x569)]()[_0x2c192a(0x8b0)]()]=_0x2d437d,VisuMZ['CoreEngine'][_0x2c192a(0x443)][_0x1117ae[_0x2c192a(0x569)]()[_0x2c192a(0x8b0)]()]=_0x493cfb,VisuMZ[_0x2c192a(0x7c7)][_0x2c192a(0x1d2)][_0x1117ae['toUpperCase']()[_0x2c192a(0x8b0)]()]=_0x4082b3,VisuMZ['CoreEngine']['CustomParamAbb'][_0x1117ae[_0x2c192a(0x569)]()[_0x2c192a(0x8b0)]()]=_0x1117ae,Object[_0x2c192a(0x89e)](Game_BattlerBase[_0x2c192a(0x56f)],_0x1117ae,{'get'(){const _0x27a813=_0x6c9bb0['call'](this);return _0x4082b3==='integer'?Math['round'](_0x27a813):_0x27a813;}});},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x4b9)]={},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x79f)]={},Scene_Boot['prototype']['process_VisuMZ_CoreEngine_ControllerButtons']=function(){const _0xc4dbb4=_0x4396be,_0x3ad900=VisuMZ[_0xc4dbb4(0x7c7)][_0xc4dbb4(0x624)][_0xc4dbb4(0x4b9)];for(const _0x852831 of _0x3ad900){if('AsJtO'!=='hZtiU'){const _0x2736c5=(_0x852831['Name']||'')[_0xc4dbb4(0xd2)]()[_0xc4dbb4(0x8b0)](),_0x47c411=(_0x852831[_0xc4dbb4(0x812)]||'')[_0xc4dbb4(0xd2)]()[_0xc4dbb4(0x8b0)]();VisuMZ[_0xc4dbb4(0x7c7)][_0xc4dbb4(0x4b9)][_0x2736c5]=_0x852831,VisuMZ[_0xc4dbb4(0x7c7)][_0xc4dbb4(0x79f)][_0x47c411]=_0x2736c5;}else this[_0xc4dbb4(0x7db)]();}},VisuMZ[_0x4396be(0x9ed)]=function(){const _0x887607=_0x4396be;for(const _0x18302b of $dataActors){if(_0x887607(0x9f9)!==_0x887607(0x127)){if(_0x18302b)VisuMZ[_0x887607(0x7b8)](_0x18302b);}else return this[_0x887607(0x84e)]?this['_commandWindow'][_0x887607(0x59b)]():_0x5eac0f[_0x887607(0x7c7)][_0x887607(0x624)][_0x887607(0x756)][_0x887607(0x858)];}for(const _0xdf746d of $dataClasses){if(_0x887607(0x565)===_0x887607(0x565)){if(_0xdf746d)VisuMZ['ParseClassNotetags'](_0xdf746d);}else{const _0x972752=this[_0x887607(0x4dd)]();let _0x1c068c=_0x48db76[_0x887607(0x95d)];this[_0x887607(0x1be)](_0x30b832,_0x972752[0x0]);for(const _0x3164fe of _0x972752){const _0x13342=_0x3164fe[_0x887607(0x9f4)]();_0x13342>_0x1c068c&&(_0x1c068c=_0x13342,this['setAction'](_0x2529d3,_0x3164fe));}}}for(const _0x26e89e of $dataSkills){if(_0x26e89e)VisuMZ[_0x887607(0x936)](_0x26e89e);}for(const _0xd0a3d8 of $dataItems){if(_0xd0a3d8)VisuMZ[_0x887607(0x27f)](_0xd0a3d8);}for(const _0x249745 of $dataWeapons){if(_0x249745)VisuMZ[_0x887607(0x852)](_0x249745);}for(const _0x3d8b31 of $dataArmors){if(_0x3d8b31)VisuMZ['ParseArmorNotetags'](_0x3d8b31);}for(const _0xa4ad55 of $dataEnemies){if(_0x887607(0x10c)===_0x887607(0x854)){if(_0x385d3b[_0x887607(0x841)][_0x887607(0x8ee)](this)){const _0x4236d8=_0x1c379b[_0x887607(0x576)];let _0x50c4c4=_0x36213c[_0x887607(0x1db)];if(['',_0x887607(0x866)]['includes'](_0x50c4c4))_0x50c4c4=_0x5b8996[_0x887607(0x24a)]['call'](this);const _0x2169cf=_0x4c536e[_0x887607(0x2ae)][_0x887607(0x8ee)](this),_0x375a40=_0x30bc33[_0x887607(0x3c2)][_0x887607(0x8ee)](this);this[_0x887607(0x4cf)](_0x50c4c4,_0x4236d8,_0x2169cf,_0x375a40),this[_0x887607(0x463)](_0x4236d8,_0x591457[_0x887607(0x92e)][_0x887607(0x7d9)](this,_0x375a40));}}else{if(_0xa4ad55)VisuMZ['ParseEnemyNotetags'](_0xa4ad55);}}for(const _0x3f1a73 of $dataStates){if(_0x3f1a73)VisuMZ[_0x887607(0xcf)](_0x3f1a73);}for(const _0x480472 of $dataTilesets){if(_0x887607(0x5b3)!==_0x887607(0x5b3))return[0x25,0x26,0x27,0x28][_0x887607(0x5b4)](this['_inputSpecialKeyCode']);else{if(_0x480472)VisuMZ[_0x887607(0x684)](_0x480472);}}},VisuMZ[_0x4396be(0x7b8)]=function(_0x404594){},VisuMZ[_0x4396be(0x744)]=function(_0x5780d4){},VisuMZ[_0x4396be(0x936)]=function(_0x4e46e8){},VisuMZ[_0x4396be(0x27f)]=function(_0x3601cf){},VisuMZ[_0x4396be(0x852)]=function(_0x898bb){},VisuMZ[_0x4396be(0x734)]=function(_0x1dbe9a){},VisuMZ['ParseEnemyNotetags']=function(_0x652796){},VisuMZ[_0x4396be(0xcf)]=function(_0x2b930){},VisuMZ['ParseTilesetNotetags']=function(_0x1af46e){},VisuMZ['CoreEngine'][_0x4396be(0x7b8)]=VisuMZ[_0x4396be(0x7b8)],VisuMZ['ParseActorNotetags']=function(_0x5d603b){const _0x4c4d7e=_0x4396be;VisuMZ[_0x4c4d7e(0x7c7)]['ParseActorNotetags']['call'](this,_0x5d603b);const _0x10c235=_0x5d603b[_0x4c4d7e(0x531)];if(_0x10c235[_0x4c4d7e(0x8e4)](/<MAX LEVEL:[ ](\d+)>/i)){if(_0x4c4d7e(0x9fc)==='Vqszy'){_0x5d603b[_0x4c4d7e(0x67b)]=Number(RegExp['$1']);if(_0x5d603b[_0x4c4d7e(0x67b)]===0x0)_0x5d603b[_0x4c4d7e(0x67b)]=Number[_0x4c4d7e(0x83d)];}else{if(this[_0x4c4d7e(0x3f1)]<=0x0)return;const _0x2da5f6=this[_0x4c4d7e(0x3f1)],_0x443111=this[_0x4c4d7e(0x8ff)],_0xb10d1f=this[_0x4c4d7e(0x927)];this['_offsetX']=this[_0x4c4d7e(0x185)](this['_offsetX'],this['_targetOffsetX'],_0x2da5f6,_0x443111,_0xb10d1f),this[_0x4c4d7e(0x5a0)]=this[_0x4c4d7e(0x185)](this[_0x4c4d7e(0x5a0)],this[_0x4c4d7e(0x9f1)],_0x2da5f6,_0x443111,_0xb10d1f),this[_0x4c4d7e(0x3f1)]--;if(this[_0x4c4d7e(0x3f1)]<=0x0)this[_0x4c4d7e(0x335)]();}}_0x10c235[_0x4c4d7e(0x8e4)](/<INITIAL LEVEL:[ ](\d+)>/i)&&(_0x5d603b[_0x4c4d7e(0x9a5)]=Math['min'](Number(RegExp['$1']),_0x5d603b[_0x4c4d7e(0x67b)]));},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x744)]=VisuMZ['ParseClassNotetags'],VisuMZ[_0x4396be(0x744)]=function(_0xdde517){const _0x3bac78=_0x4396be;VisuMZ[_0x3bac78(0x7c7)][_0x3bac78(0x744)][_0x3bac78(0x8ee)](this,_0xdde517);if(_0xdde517[_0x3bac78(0x716)])for(const _0x48c43b of _0xdde517['learnings']){_0x48c43b[_0x3bac78(0x531)][_0x3bac78(0x8e4)](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x48c43b['level']=Math[_0x3bac78(0x8cd)](Number(RegExp['$1']),0x1));}},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x593)]=VisuMZ[_0x4396be(0x593)],VisuMZ[_0x4396be(0x593)]=function(_0x5cf372){const _0x5290cb=_0x4396be;VisuMZ[_0x5290cb(0x7c7)][_0x5290cb(0x593)][_0x5290cb(0x8ee)](this,_0x5cf372),_0x5cf372[_0x5290cb(0x79c)]=0x1;const _0x4f1b54=_0x5cf372[_0x5290cb(0x531)];if(_0x4f1b54['match'](/<LEVEL:[ ](\d+)>/i))_0x5cf372['level']=Number(RegExp['$1']);if(_0x4f1b54['match'](/<MAXHP:[ ](\d+)>/i))_0x5cf372[_0x5290cb(0x3d3)][0x0]=Number(RegExp['$1']);if(_0x4f1b54[_0x5290cb(0x8e4)](/<MAXMP:[ ](\d+)>/i))_0x5cf372[_0x5290cb(0x3d3)][0x1]=Number(RegExp['$1']);if(_0x4f1b54[_0x5290cb(0x8e4)](/<ATK:[ ](\d+)>/i))_0x5cf372['params'][0x2]=Number(RegExp['$1']);if(_0x4f1b54['match'](/<DEF:[ ](\d+)>/i))_0x5cf372[_0x5290cb(0x3d3)][0x3]=Number(RegExp['$1']);if(_0x4f1b54['match'](/<MAT:[ ](\d+)>/i))_0x5cf372['params'][0x4]=Number(RegExp['$1']);if(_0x4f1b54['match'](/<MDF:[ ](\d+)>/i))_0x5cf372[_0x5290cb(0x3d3)][0x5]=Number(RegExp['$1']);if(_0x4f1b54['match'](/<AGI:[ ](\d+)>/i))_0x5cf372['params'][0x6]=Number(RegExp['$1']);if(_0x4f1b54[_0x5290cb(0x8e4)](/<LUK:[ ](\d+)>/i))_0x5cf372['params'][0x7]=Number(RegExp['$1']);if(_0x4f1b54[_0x5290cb(0x8e4)](/<EXP:[ ](\d+)>/i))_0x5cf372[_0x5290cb(0x5db)]=Number(RegExp['$1']);if(_0x4f1b54[_0x5290cb(0x8e4)](/<GOLD:[ ](\d+)>/i))_0x5cf372['gold']=Number(RegExp['$1']);},VisuMZ['CoreEngine']['Graphics_defaultStretchMode']=Graphics[_0x4396be(0x507)],Graphics[_0x4396be(0x507)]=function(){const _0x23ec1a=_0x4396be;switch(VisuMZ[_0x23ec1a(0x7c7)]['Settings']['QoL'][_0x23ec1a(0x706)]){case'stretch':return!![];case _0x23ec1a(0x6ef):return![];default:return VisuMZ[_0x23ec1a(0x7c7)][_0x23ec1a(0x90b)][_0x23ec1a(0x8ee)](this);}},VisuMZ['CoreEngine'][_0x4396be(0x179)]=Graphics['printError'],Graphics[_0x4396be(0x81a)]=function(_0x275056,_0xd09cb6,_0x20ce39=null){const _0x46ea28=_0x4396be;VisuMZ[_0x46ea28(0x7c7)][_0x46ea28(0x179)][_0x46ea28(0x8ee)](this,_0x275056,_0xd09cb6,_0x20ce39),VisuMZ[_0x46ea28(0x7c0)](![]);},VisuMZ['CoreEngine'][_0x4396be(0x56a)]=Graphics[_0x4396be(0x546)],Graphics['_centerElement']=function(_0x4758ad){const _0x28c9f9=_0x4396be;VisuMZ['CoreEngine'][_0x28c9f9(0x56a)][_0x28c9f9(0x8ee)](this,_0x4758ad),this['_centerElementCoreEngine'](_0x4758ad);},Graphics[_0x4396be(0x1ad)]=function(_0x350519){const _0x33209c=_0x4396be;VisuMZ[_0x33209c(0x7c7)]['Settings'][_0x33209c(0x9e8)][_0x33209c(0x568)]&&(_0x350519['style'][_0x33209c(0x764)]='none');VisuMZ[_0x33209c(0x7c7)]['Settings'][_0x33209c(0x9e8)][_0x33209c(0x66d)]&&(_0x33209c(0x9e7)!==_0x33209c(0x9e7)?_0x229b82[_0x33209c(0x863)]()&&(_0x1b5c9a[_0x33209c(0x6cd)](_0x33209c(0x922)),_0x13924c['log'](_0x48e07b)):_0x350519[_0x33209c(0x36e)][_0x33209c(0x6ee)]=_0x33209c(0x17c));const _0x42644d=Math[_0x33209c(0x8cd)](0x0,Math[_0x33209c(0x346)](_0x350519[_0x33209c(0x67f)]*this['_realScale'])),_0x5ea826=Math['max'](0x0,Math['floor'](_0x350519['height']*this[_0x33209c(0x57f)]));_0x350519[_0x33209c(0x36e)]['width']=_0x42644d+'px',_0x350519[_0x33209c(0x36e)][_0x33209c(0x21d)]=_0x5ea826+'px';},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x157)]=Bitmap['prototype'][_0x4396be(0x480)],Bitmap[_0x4396be(0x56f)][_0x4396be(0x480)]=function(_0x5e79e7,_0x4a1b70){const _0x13d2fa=_0x4396be;VisuMZ[_0x13d2fa(0x7c7)][_0x13d2fa(0x157)][_0x13d2fa(0x8ee)](this,_0x5e79e7,_0x4a1b70),this[_0x13d2fa(0x913)]=!(VisuMZ['CoreEngine'][_0x13d2fa(0x624)][_0x13d2fa(0x9e8)][_0x13d2fa(0x66d)]??!![]);},Bitmap['prototype'][_0x4396be(0x166)]=function(){this['_customModified']=!![];},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x19f)]=Sprite[_0x4396be(0x56f)][_0x4396be(0x6d4)],Sprite['prototype']['destroy']=function(){const _0x1aa249=_0x4396be;if(this['_texture'])VisuMZ['CoreEngine'][_0x1aa249(0x19f)][_0x1aa249(0x8ee)](this);this[_0x1aa249(0x816)]();},Sprite['prototype'][_0x4396be(0x816)]=function(){const _0x5c4ed7=_0x4396be;if(!this[_0x5c4ed7(0x2e6)])return;if(!this[_0x5c4ed7(0x2e6)]['_customModified'])return;this['bitmap'][_0x5c4ed7(0x7e3)]&&!this[_0x5c4ed7(0x990)][_0x5c4ed7(0x7e3)][_0x5c4ed7(0x3e9)]&&('UbTvC'===_0x5c4ed7(0x768)?(this[_0x5c4ed7(0x763)]['centerX']=!![],this[_0x5c4ed7(0x763)]['displayX']=_0x5cd5a4['DisplayLockX']||0x0):this[_0x5c4ed7(0x2e6)][_0x5c4ed7(0x6d4)]());},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x665)]=Bitmap[_0x4396be(0x56f)][_0x4396be(0x9cc)],Bitmap['prototype'][_0x4396be(0x9cc)]=function(_0x195f31,_0x387e3f){const _0x3ecd=_0x4396be;VisuMZ[_0x3ecd(0x7c7)]['Bitmap_resize'][_0x3ecd(0x8ee)](this,_0x195f31,_0x387e3f),this[_0x3ecd(0x166)]();},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x4c1)]=Bitmap['prototype'][_0x4396be(0x7b7)],Bitmap[_0x4396be(0x56f)][_0x4396be(0x7b7)]=function(_0x16f330,_0x27e858,_0x1b4491,_0x47305c,_0x1fc4e5,_0x190bca,_0x336d44,_0x44f159,_0x1ed752){const _0x51690e=_0x4396be;_0x27e858=Math[_0x51690e(0xb9)](_0x27e858),_0x1b4491=Math[_0x51690e(0xb9)](_0x1b4491),_0x47305c=Math['round'](_0x47305c),_0x1fc4e5=Math['round'](_0x1fc4e5),_0x190bca=Math[_0x51690e(0xb9)](_0x190bca),_0x336d44=Math[_0x51690e(0xb9)](_0x336d44),VisuMZ['CoreEngine'][_0x51690e(0x4c1)][_0x51690e(0x8ee)](this,_0x16f330,_0x27e858,_0x1b4491,_0x47305c,_0x1fc4e5,_0x190bca,_0x336d44,_0x44f159,_0x1ed752),this[_0x51690e(0x166)]();},VisuMZ[_0x4396be(0x7c7)]['Bitmap_clearRect']=Bitmap[_0x4396be(0x56f)]['clearRect'],Bitmap[_0x4396be(0x56f)][_0x4396be(0x69e)]=function(_0x3ef7b7,_0x36d516,_0x23fc3e,_0x535863){const _0x58074d=_0x4396be;VisuMZ[_0x58074d(0x7c7)]['Bitmap_clearRect'][_0x58074d(0x8ee)](this,_0x3ef7b7,_0x36d516,_0x23fc3e,_0x535863),this['markCoreEngineModified']();},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x930)]=Bitmap[_0x4396be(0x56f)][_0x4396be(0x7da)],Bitmap[_0x4396be(0x56f)][_0x4396be(0x7da)]=function(_0xb1b495,_0x5bcd6c,_0x1e1522,_0x386c52,_0x40fcb2){const _0x2042a9=_0x4396be;VisuMZ[_0x2042a9(0x7c7)][_0x2042a9(0x930)][_0x2042a9(0x8ee)](this,_0xb1b495,_0x5bcd6c,_0x1e1522,_0x386c52,_0x40fcb2),this[_0x2042a9(0x166)]();},VisuMZ['CoreEngine'][_0x4396be(0x97b)]=Bitmap[_0x4396be(0x56f)][_0x4396be(0x16e)],Bitmap[_0x4396be(0x56f)][_0x4396be(0x16e)]=function(_0x59768f,_0x5dfdd7,_0x4b03e9,_0x5acb47,_0x50f983){const _0x5ac6ca=_0x4396be;VisuMZ[_0x5ac6ca(0x7c7)][_0x5ac6ca(0x97b)][_0x5ac6ca(0x8ee)](this,_0x59768f,_0x5dfdd7,_0x4b03e9,_0x5acb47,_0x50f983),this[_0x5ac6ca(0x166)]();},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x3fb)]=Bitmap[_0x4396be(0x56f)][_0x4396be(0x426)],Bitmap[_0x4396be(0x56f)]['gradientFillRect']=function(_0x3ec6df,_0x54f3d6,_0x24869b,_0x32a277,_0x32bbe9,_0x4a6060,_0x53ae43){const _0x274114=_0x4396be;VisuMZ[_0x274114(0x7c7)][_0x274114(0x3fb)][_0x274114(0x8ee)](this,_0x3ec6df,_0x54f3d6,_0x24869b,_0x32a277,_0x32bbe9,_0x4a6060,_0x53ae43),this[_0x274114(0x166)]();},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x5e5)]=Bitmap[_0x4396be(0x56f)]['drawCircle'],Bitmap['prototype'][_0x4396be(0x5be)]=function(_0x5c37cc,_0x48c063,_0x970e72,_0x5d8dd5){const _0x444acc=_0x4396be;_0x5c37cc=Math[_0x444acc(0xb9)](_0x5c37cc),_0x48c063=Math[_0x444acc(0xb9)](_0x48c063),_0x970e72=Math['round'](_0x970e72),VisuMZ['CoreEngine'][_0x444acc(0x5e5)][_0x444acc(0x8ee)](this,_0x5c37cc,_0x48c063,_0x970e72,_0x5d8dd5),this[_0x444acc(0x166)]();},VisuMZ['CoreEngine'][_0x4396be(0x93d)]=Bitmap[_0x4396be(0x56f)][_0x4396be(0x7b0)],Bitmap[_0x4396be(0x56f)][_0x4396be(0x7b0)]=function(_0x3f679a){const _0x136ea3=_0x4396be;return Math[_0x136ea3(0x421)](VisuMZ[_0x136ea3(0x7c7)][_0x136ea3(0x93d)][_0x136ea3(0x8ee)](this,_0x3f679a));},VisuMZ[_0x4396be(0x7c7)]['Bitmap_drawText']=Bitmap['prototype'][_0x4396be(0x865)],Bitmap[_0x4396be(0x56f)][_0x4396be(0x865)]=function(_0x305583,_0x22c58b,_0x152491,_0x4835e0,_0x3feb4c,_0x42877e){const _0x292ab4=_0x4396be;_0x22c58b=Math['round'](_0x22c58b),_0x152491=Math['round'](_0x152491),_0x4835e0=Math[_0x292ab4(0xb9)](_0x4835e0),_0x3feb4c=Math[_0x292ab4(0xb9)](_0x3feb4c),VisuMZ[_0x292ab4(0x7c7)][_0x292ab4(0x872)][_0x292ab4(0x8ee)](this,_0x305583,_0x22c58b,_0x152491,_0x4835e0,_0x3feb4c,_0x42877e),this[_0x292ab4(0x166)]();},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x601)]=Bitmap[_0x4396be(0x56f)]['_drawTextOutline'],Bitmap[_0x4396be(0x56f)][_0x4396be(0x9a6)]=function(_0x227244,_0x5ce093,_0x4a5f69,_0x2896a1){const _0x47eff1=_0x4396be;VisuMZ[_0x47eff1(0x7c7)]['Settings'][_0x47eff1(0x9e8)]['FontShadows']?_0x47eff1(0x220)==='wMSRA'?this[_0x47eff1(0x627)](_0x227244,_0x5ce093,_0x4a5f69,_0x2896a1):_0xbb24f1=_0x15f67c[_0x47eff1(0x511)]-_0x5a6d60:_0x47eff1(0x909)!==_0x47eff1(0x909)?_0x564e5b=!_0x17d0e9:VisuMZ['CoreEngine']['Bitmap_drawTextOutline'][_0x47eff1(0x8ee)](this,_0x227244,_0x5ce093,_0x4a5f69,_0x2896a1);},Bitmap[_0x4396be(0x56f)]['_drawTextShadow']=function(_0x15e659,_0x2a5c16,_0x12ca12,_0x18f2e5){const _0x34006d=_0x4396be,_0x4a0945=this[_0x34006d(0x415)];_0x4a0945[_0x34006d(0xa02)]=this[_0x34006d(0x3ce)],_0x4a0945[_0x34006d(0x1d7)](_0x15e659,_0x2a5c16+0x2,_0x12ca12+0x2,_0x18f2e5);},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x4d7)]=Input[_0x4396be(0x7db)],Input[_0x4396be(0x7db)]=function(){const _0x34c909=_0x4396be;VisuMZ['CoreEngine'][_0x34c909(0x4d7)][_0x34c909(0x8ee)](this),this[_0x34c909(0x807)]=undefined,this[_0x34c909(0x782)]=undefined,this[_0x34c909(0x76c)]=Input[_0x34c909(0x1f7)];},VisuMZ[_0x4396be(0x7c7)]['Input_update']=Input[_0x4396be(0x68b)],Input[_0x4396be(0x68b)]=function(){const _0x42d8df=_0x4396be;VisuMZ[_0x42d8df(0x7c7)]['Input_update'][_0x42d8df(0x8ee)](this);if(this[_0x42d8df(0x76c)])this['_gamepadWait']--;},VisuMZ[_0x4396be(0x7c7)]['Input_pollGamepads']=Input['_pollGamepads'],Input[_0x4396be(0x369)]=function(){const _0x42e580=_0x4396be;if(this[_0x42e580(0x76c)])return;VisuMZ['CoreEngine'][_0x42e580(0x914)]['call'](this);},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x4d3)]=Input[_0x4396be(0x8ec)],Input[_0x4396be(0x8ec)]=function(){const _0x525cf7=_0x4396be;VisuMZ[_0x525cf7(0x7c7)][_0x525cf7(0x4d3)][_0x525cf7(0x8ee)](this),document[_0x525cf7(0x1ee)]('keypress',this['_onKeyPress']['bind'](this));},VisuMZ['CoreEngine'][_0x4396be(0x681)]=Input[_0x4396be(0x349)],Input[_0x4396be(0x349)]=function(_0x13b5af){const _0x4f8249=_0x4396be;this[_0x4f8249(0x782)]=_0x13b5af[_0x4f8249(0x1fe)],VisuMZ[_0x4f8249(0x7c7)][_0x4f8249(0x681)]['call'](this,_0x13b5af),this[_0x4f8249(0x1dc)](null);},Input['_onKeyPress']=function(_0x145d52){const _0x50beed=_0x4396be;this[_0x50beed(0x151)](_0x145d52);},Input[_0x4396be(0x151)]=function(_0x792a54){const _0x4ced75=_0x4396be;this[_0x4ced75(0x782)]=_0x792a54[_0x4ced75(0x1fe)];let _0x1f7c60=String[_0x4ced75(0x553)](_0x792a54[_0x4ced75(0xe5)]);if(this[_0x4ced75(0x807)]===undefined){if(_0x4ced75(0x78f)!==_0x4ced75(0x78f)){if(this[_0x4ced75(0x8ba)]()&&this[_0x4ced75(0x6a8)][_0x4ced75(0x258)]!==_0x4ced75(0x9eb)){const _0x1449ee=_0x27763c[_0x4ced75(0x7c7)][_0x4ced75(0x624)]['KeyboardInput'];return _0x1449ee['PageChange']||'Page';}return _0x396411[_0x4ced75(0x56f)]['buttonAssistText1'][_0x4ced75(0x8ee)](this);}else this[_0x4ced75(0x807)]=_0x1f7c60;}else{if(_0x4ced75(0x1eb)!==_0x4ced75(0x353))this[_0x4ced75(0x807)]+=_0x1f7c60;else{_0x24d692[_0x4ced75(0x7c7)][_0x4ced75(0x298)]['call'](this);const _0xc69067=this[_0x4ced75(0x2de)]['_timerSprite'];if(_0xc69067)this['addChild'](_0xc69067);}}},VisuMZ['CoreEngine'][_0x4396be(0x254)]=Input[_0x4396be(0x6b3)],Input[_0x4396be(0x6b3)]=function(_0xf2254c){const _0x311cad=_0x4396be;if(_0xf2254c===0x8)return![];return VisuMZ[_0x311cad(0x7c7)]['Input_shouldPreventDefault'][_0x311cad(0x8ee)](this,_0xf2254c);},Input[_0x4396be(0x1a2)]=function(_0x6080da){const _0x3a9c32=_0x4396be;if(_0x6080da['match'](/backspace/i))return this[_0x3a9c32(0x782)]===0x8;if(_0x6080da['match'](/enter/i))return this[_0x3a9c32(0x782)]===0xd;if(_0x6080da[_0x3a9c32(0x8e4)](/escape/i))return this[_0x3a9c32(0x782)]===0x1b;},Input[_0x4396be(0x5b1)]=function(){return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39]['contains'](this['_inputSpecialKeyCode']);},Input[_0x4396be(0x4e5)]=function(){const _0x325682=_0x4396be;return[0x25,0x26,0x27,0x28][_0x325682(0x5b4)](this[_0x325682(0x782)]);},Input[_0x4396be(0x450)]=function(){const _0x4a6539=_0x4396be;if(navigator['getGamepads']){const _0x4362bd=navigator[_0x4a6539(0x310)]();if(_0x4362bd){if(_0x4a6539(0x9ef)!==_0x4a6539(0x333))for(const _0x507025 of _0x4362bd){if(_0x507025&&_0x507025['connected'])return!![];}else _0x12fb39[_0x4a6539(0x7c7)]['ColorManager_loadWindowskin'][_0x4a6539(0x8ee)](this),this['_colorCache']=this['_colorCache']||{};}}return![];},Input['isGamepadTriggered']=function(){const _0x3e3cdf=_0x4396be;if(navigator['getGamepads']){const _0x1f8640=navigator['getGamepads']();if(_0x1f8640){if(_0x3e3cdf(0x643)===_0x3e3cdf(0x4f3))_0x43bba3['CoreEngine']['Game_Picture_updateRotation'][_0x3e3cdf(0x8ee)](this),this[_0x3e3cdf(0x14b)]();else for(const _0x1894b9 of _0x1f8640){if(_0x1894b9&&_0x1894b9[_0x3e3cdf(0x47a)]){if(this[_0x3e3cdf(0x86f)](_0x1894b9))return!![];if(this['isGamepadAxisMoved'](_0x1894b9))return!![];}}}}return![];},Input[_0x4396be(0x86f)]=function(_0x3c840b){const _0x38bbe6=_0x4396be,_0x3587f5=_0x3c840b[_0x38bbe6(0x7e1)];for(let _0x228dd4=0x0;_0x228dd4<_0x3587f5[_0x38bbe6(0x858)];_0x228dd4++){if(_0x3587f5[_0x228dd4][_0x38bbe6(0x47b)])return!![];}return![];},Input[_0x4396be(0x10a)]=function(_0x3acb45){const _0x4b7a6b=_0x4396be,_0xb50e2c=_0x3acb45[_0x4b7a6b(0x343)],_0x2f0026=0.5;if(_0xb50e2c[0x0]<-_0x2f0026)return!![];if(_0xb50e2c[0x0]>_0x2f0026)return!![];if(_0xb50e2c[0x1]<-_0x2f0026)return!![];if(_0xb50e2c[0x1]>_0x2f0026)return!![];return![];},Input[_0x4396be(0x285)]=function(){return this['_lastGamepad']||null;},Input[_0x4396be(0x1dc)]=function(_0x38c717){const _0x5bacf5=_0x4396be;this[_0x5bacf5(0x7f2)]=_0x38c717;},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0xad)]=Input[_0x4396be(0x8a6)],Input[_0x4396be(0x8a6)]=function(_0x5f3071){const _0x2dbb43=_0x4396be;VisuMZ[_0x2dbb43(0x7c7)][_0x2dbb43(0xad)][_0x2dbb43(0x8ee)](this,_0x5f3071),(this[_0x2dbb43(0x86f)](_0x5f3071)||this[_0x2dbb43(0x10a)](_0x5f3071))&&this[_0x2dbb43(0x1dc)](_0x5f3071);},Input[_0x4396be(0x7f5)]=function(){const _0x4680d2=_0x4396be;return this[_0x4680d2(0x7f2)]?this[_0x4680d2(0x7f2)]['id']:'Keyboard';},VisuMZ['CoreEngine'][_0x4396be(0x58a)]=Tilemap['prototype']['_addShadow'],Tilemap[_0x4396be(0x56f)][_0x4396be(0x39f)]=function(_0x346d73,_0x1b8c46,_0x16af29,_0x3ded78){const _0xf36a74=_0x4396be;if($gameMap&&$gameMap[_0xf36a74(0x74e)]())return;VisuMZ[_0xf36a74(0x7c7)][_0xf36a74(0x58a)][_0xf36a74(0x8ee)](this,_0x346d73,_0x1b8c46,_0x16af29,_0x3ded78);},Tilemap[_0x4396be(0x117)][_0x4396be(0x56f)][_0x4396be(0x282)]=function(){const _0x52ff0e=_0x4396be;this[_0x52ff0e(0x46e)]();for(let _0x6aad50=0x0;_0x6aad50<Tilemap[_0x52ff0e(0x5ad)][_0x52ff0e(0x827)];_0x6aad50++){if(_0x52ff0e(0x559)!==_0x52ff0e(0x8db)){const _0x111e82=new PIXI[(_0x52ff0e(0x499))]();_0x111e82[_0x52ff0e(0x646)](0x800,0x800);if(VisuMZ[_0x52ff0e(0x7c7)][_0x52ff0e(0x624)][_0x52ff0e(0x9e8)]['PixelateImageRendering']){if('JGNZE'!==_0x52ff0e(0x230)){if(this[_0x52ff0e(0x4bf)]===_0x5e793b)this[_0x52ff0e(0x308)]();this[_0x52ff0e(0x4bf)][_0x52ff0e(0x88e)]=this[_0x52ff0e(0x800)]();}else _0x111e82['scaleMode']=PIXI[_0x52ff0e(0x38d)]['NEAREST'];}this[_0x52ff0e(0x485)][_0x52ff0e(0x8ab)](_0x111e82);}else{if(typeof _0x22ad78===_0x52ff0e(0x36b))_0xaa7aeb[_0x52ff0e(0x63f)]['quit']();}}},WindowLayer['prototype'][_0x4396be(0x299)]=function(){const _0x36eedd=_0x4396be;return SceneManager&&SceneManager[_0x36eedd(0x9c8)]?_0x36eedd(0x3ef)===_0x36eedd(0x3ef)?SceneManager['_scene'][_0x36eedd(0x898)]():_0x378581[_0x36eedd(0x7c7)][_0x36eedd(0x624)][_0x36eedd(0xa0e)][_0x36eedd(0x2c0)]['length']:!![];},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x7f3)]=WindowLayer[_0x4396be(0x56f)][_0x4396be(0x1dd)],WindowLayer[_0x4396be(0x56f)][_0x4396be(0x1dd)]=function render(_0x56d2e3){const _0x2b046b=_0x4396be;this[_0x2b046b(0x299)]()?VisuMZ[_0x2b046b(0x7c7)][_0x2b046b(0x7f3)]['call'](this,_0x56d2e3):_0x2b046b(0x8fa)!=='BQgpH'?this[_0x2b046b(0x449)](_0x56d2e3):this[_0x2b046b(0x375)]['x']=_0x512a2b[_0x2b046b(0x986)]+0x4;},WindowLayer[_0x4396be(0x56f)][_0x4396be(0x449)]=function render(_0x30e6c7){const _0x4edb5d=_0x4396be;if(!this[_0x4edb5d(0x1c4)])return;const _0x560427=new PIXI[(_0x4edb5d(0x33d))](),_0x231ac5=_0x30e6c7['gl'],_0x1dbe7d=this[_0x4edb5d(0xe0)]['clone']();_0x30e6c7['framebuffer']['forceStencil'](),_0x560427[_0x4edb5d(0x71d)]=this[_0x4edb5d(0x71d)],_0x30e6c7[_0x4edb5d(0x815)]['flush'](),_0x231ac5[_0x4edb5d(0x1e1)](_0x231ac5[_0x4edb5d(0x616)]);while(_0x1dbe7d[_0x4edb5d(0x858)]>0x0){if(_0x4edb5d(0x4ac)!==_0x4edb5d(0x8d5)){const _0x500068=_0x1dbe7d[_0x4edb5d(0x762)]();_0x500068['_isWindow']&&_0x500068[_0x4edb5d(0x1c4)]&&_0x500068[_0x4edb5d(0x504)]>0x0&&(_0x231ac5[_0x4edb5d(0x3f6)](_0x231ac5[_0x4edb5d(0x363)],0x0,~0x0),_0x231ac5[_0x4edb5d(0x521)](_0x231ac5['KEEP'],_0x231ac5[_0x4edb5d(0x42f)],_0x231ac5[_0x4edb5d(0x42f)]),_0x500068[_0x4edb5d(0x1dd)](_0x30e6c7),_0x30e6c7['batch']['flush'](),_0x560427[_0x4edb5d(0x7db)](),_0x231ac5[_0x4edb5d(0x3f6)](_0x231ac5[_0x4edb5d(0x748)],0x1,~0x0),_0x231ac5[_0x4edb5d(0x521)](_0x231ac5[_0x4edb5d(0x488)],_0x231ac5[_0x4edb5d(0x488)],_0x231ac5['REPLACE']),_0x231ac5[_0x4edb5d(0x4db)](_0x231ac5['ZERO'],_0x231ac5[_0x4edb5d(0x495)]),_0x560427[_0x4edb5d(0x1dd)](_0x30e6c7),_0x30e6c7[_0x4edb5d(0x815)][_0x4edb5d(0x108)](),_0x231ac5[_0x4edb5d(0x4db)](_0x231ac5[_0x4edb5d(0x495)],_0x231ac5[_0x4edb5d(0x30f)]));}else this[_0x4edb5d(0x42e)][_0x4edb5d(0x2b7)]=this['_anglePlus'][_0x4edb5d(0x874)];}_0x231ac5['disable'](_0x231ac5['STENCIL_TEST']),_0x231ac5[_0x4edb5d(0x7db)](_0x231ac5[_0x4edb5d(0x50f)]),_0x231ac5[_0x4edb5d(0x400)](0x0),_0x30e6c7['batch'][_0x4edb5d(0x108)]();for(const _0x60a690 of this['children']){if(_0x4edb5d(0x766)!=='LsZoL')return _0xd936f3[_0x4edb5d(0x7c7)][_0x4edb5d(0x1d2)][_0x7eda4f]===_0x4edb5d(0x136)?_0x1f41a7:_0x13e4ca((_0x396ab6*0x64)[_0x4edb5d(0xd1)](_0x1d873c))+'%';else!_0x60a690[_0x4edb5d(0x255)]&&_0x60a690[_0x4edb5d(0x1c4)]&&_0x60a690[_0x4edb5d(0x1dd)](_0x30e6c7);}_0x30e6c7[_0x4edb5d(0x815)][_0x4edb5d(0x108)]();},DataManager[_0x4396be(0x301)]=function(_0x59b6fa){const _0x2d4ca8=_0x4396be;return this[_0x2d4ca8(0x352)](_0x59b6fa)&&_0x59b6fa[_0x2d4ca8(0xec)]===0x2;},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x8ef)]=DataManager[_0x4396be(0x357)],DataManager[_0x4396be(0x357)]=function(){const _0x33bca=_0x4396be;VisuMZ[_0x33bca(0x7c7)][_0x33bca(0x8ef)][_0x33bca(0x8ee)](this),this['reservePlayTestNewGameCommonEvent'](),this[_0x33bca(0x422)]();},DataManager[_0x4396be(0x3e1)]=function(){const _0x40adb1=_0x4396be;if($gameTemp['isPlaytest']()){const _0x1eeb56=VisuMZ['CoreEngine'][_0x40adb1(0x624)][_0x40adb1(0x9e8)]['NewGameCommonEvent'];if(_0x1eeb56>0x0)$gameTemp['reserveCommonEvent'](_0x1eeb56);}},DataManager['reserveNewGameCommonEvent']=function(){const _0x3d8f78=_0x4396be,_0x4d5cc5=VisuMZ[_0x3d8f78(0x7c7)]['Settings']['QoL'][_0x3d8f78(0x62a)]||0x0;if(_0x4d5cc5>0x0)$gameTemp[_0x3d8f78(0x121)](_0x4d5cc5);},DataManager[_0x4396be(0x192)]=function(_0x44cc40){const _0x4f75a7=_0x4396be,_0x3d932e=$dataTroops[_0x44cc40];if(!_0x3d932e)return'';let _0x28a14d='';_0x28a14d+=_0x3d932e[_0x4f75a7(0x862)];for(const _0x1f1545 of _0x3d932e[_0x4f75a7(0x5c1)]){for(const _0x490a50 of _0x1f1545[_0x4f75a7(0x4e4)]){if(_0x4f75a7(0x637)!==_0x4f75a7(0x637)){if(!this[_0x4f75a7(0x3bf)]())return;if(this['_scrollBarHorz']||this[_0x4f75a7(0x314)])return;this['_lastScrollBarValues']={'horz':null,'vert':null,'maxHorz':null,'maxVert':null},this[_0x4f75a7(0x678)]=new _0x3c7d18(),this[_0x4f75a7(0x314)]=new _0x4e6a18(),this['addChild'](this['_scrollBarHorz']),this[_0x4f75a7(0x19c)](this['_scrollBarVert']);}else[0x6c,0x198]['includes'](_0x490a50[_0x4f75a7(0x1c5)])&&('GQSxU'!=='GQSxU'?_0x3389a6(_0x4f75a7(0x264)[_0x4f75a7(0x9c3)](_0x31a171)):(_0x28a14d+='\x0a',_0x28a14d+=_0x490a50[_0x4f75a7(0x113)][0x0]));}}return _0x28a14d;};(VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x624)][_0x4396be(0x9e8)]['ShortcutScripts']??!![])&&($scene=null,VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x924)]=Scene_Base[_0x4396be(0x56f)][_0x4396be(0x207)],Scene_Base[_0x4396be(0x56f)]['create']=function(){const _0x1bd9e3=_0x4396be;VisuMZ[_0x1bd9e3(0x7c7)][_0x1bd9e3(0x924)][_0x1bd9e3(0x8ee)](this),$scene=this;},$spriteset=null,VisuMZ['CoreEngine'][_0x4396be(0x868)]=Scene_Map['prototype']['createSpriteset'],Scene_Map[_0x4396be(0x56f)][_0x4396be(0x15d)]=function(){const _0x8838b0=_0x4396be;VisuMZ[_0x8838b0(0x7c7)][_0x8838b0(0x868)]['call'](this),$spriteset=this[_0x8838b0(0x2de)];},VisuMZ[_0x4396be(0x7c7)]['Scene_Battle_createSpriteset']=Scene_Battle[_0x4396be(0x56f)][_0x4396be(0x15d)],Scene_Battle[_0x4396be(0x56f)][_0x4396be(0x15d)]=function(){const _0xff1feb=_0x4396be;VisuMZ[_0xff1feb(0x7c7)][_0xff1feb(0x172)][_0xff1feb(0x8ee)](this),$spriteset=this[_0xff1feb(0x2de)];},VisuMZ['CoreEngine'][_0x4396be(0x4c5)]=Scene_Base['prototype'][_0x4396be(0x9b4)],Scene_Base[_0x4396be(0x56f)][_0x4396be(0x9b4)]=function(){const _0x3e7fd5=_0x4396be;VisuMZ[_0x3e7fd5(0x7c7)]['Scene_Base_terminate'][_0x3e7fd5(0x8ee)](this),$spriteset=null,$subject=null,$targets=null,$target=null;},$subject=null,$targets=null,$target=null,VisuMZ[_0x4396be(0x7c7)]['BattleManager_update']=BattleManager[_0x4396be(0x68b)],BattleManager[_0x4396be(0x68b)]=function(_0x291cde){const _0x4fb0c9=_0x4396be;VisuMZ[_0x4fb0c9(0x7c7)]['BattleManager_update'][_0x4fb0c9(0x8ee)](this,_0x291cde),$subject=this[_0x4fb0c9(0x1f4)],$targets=this['_targets'],$target=this[_0x4fb0c9(0x274)]||this[_0x4fb0c9(0x78a)][0x0];},$event=null,VisuMZ[_0x4396be(0x7c7)]['Game_Event_start']=Game_Event[_0x4396be(0x56f)][_0x4396be(0x851)],Game_Event['prototype'][_0x4396be(0x851)]=function(){const _0x549c0b=_0x4396be;VisuMZ['CoreEngine'][_0x549c0b(0x2b5)][_0x549c0b(0x8ee)](this),$event=this;},VisuMZ['CoreEngine']['Scene_Map_update']=Scene_Map[_0x4396be(0x56f)]['update'],Scene_Map['prototype'][_0x4396be(0x68b)]=function(){const _0x3704fd=_0x4396be;VisuMZ['CoreEngine'][_0x3704fd(0x6fb)]['call'](this),$gameMap[_0x3704fd(0x905)]();},Game_Map[_0x4396be(0x56f)][_0x4396be(0x905)]=function(){const _0x464646=_0x4396be;!this[_0x464646(0x745)]()&&$event!==null&&($event=null);},$commonEvent=function(_0x3f4dc0){if($gameTemp)$gameTemp['reserveCommonEvent'](_0x3f4dc0);},$onceParallel=function(_0x2ab766,_0x5ac9b4){const _0x5a1675=_0x4396be;if(SceneManager[_0x5a1675(0x7ee)]())$scene['playOnceParallelInterpreter'](_0x2ab766,_0x5ac9b4);else{if(SceneManager[_0x5a1675(0x3b6)]()){if(Imported[_0x5a1675(0x131)])$scene['playOnceParallelInterpreter'](_0x2ab766);else $gameTemp&&$gameTemp[_0x5a1675(0x863)]()&&alert(_0x5a1675(0x7ca));}else $gameTemp&&$gameTemp[_0x5a1675(0x863)]()&&alert('This\x20scene\x20cannot\x20utilize\x20a\x20Once\x20Parallel!');}});;StorageManager['jsonToZip']=function(_0x1dbafd){return new Promise((_0x29a91c,_0x1d9094)=>{const _0xb5231b=_0x43c9;if(_0xb5231b(0x901)!==_0xb5231b(0x88f))try{if(_0xb5231b(0x879)===_0xb5231b(0x819)){const _0x3b1a1c=this[_0xb5231b(0x5ca)]['bitmap'],_0x501083=this[_0xb5231b(0x67f)],_0x40e92a=this[_0xb5231b(0x21d)],_0x168977=this['padding'],_0x4e8af5=_0x22edaf[_0xb5231b(0x99e)](),_0x5bb664=_0x39a59b[_0xb5231b(0x473)]();_0x3b1a1c[_0xb5231b(0x9cc)](_0x501083,_0x40e92a),_0x3b1a1c[_0xb5231b(0x426)](0x0,0x0,_0x501083,_0x168977,_0x5bb664,_0x4e8af5,!![]),_0x3b1a1c[_0xb5231b(0x7da)](0x0,_0x168977,_0x501083,_0x40e92a-_0x168977*0x2,_0x4e8af5),_0x3b1a1c[_0xb5231b(0x426)](0x0,_0x40e92a-_0x168977,_0x501083,_0x168977,_0x4e8af5,_0x5bb664,!![]),this[_0xb5231b(0x5ca)][_0xb5231b(0x984)](0x0,0x0,_0x501083,_0x40e92a);}else{const _0x1e6625=pako[_0xb5231b(0x3cf)](_0x1dbafd,{'to':_0xb5231b(0x689),'level':0x1});if(_0x1e6625[_0xb5231b(0x858)]>=0xc350){}_0x29a91c(_0x1e6625);}}catch(_0x142852){_0x1d9094(_0x142852);}else this[_0xb5231b(0x480)](...arguments);});},TextManager[_0x4396be(0x71a)]=['','','','CANCEL','','',_0x4396be(0x3c7),'',_0x4396be(0x74c),_0x4396be(0x23c),'','',_0x4396be(0x1c1),_0x4396be(0x548),_0x4396be(0x870),'',_0x4396be(0x96d),'CTRL','ALT',_0x4396be(0x96a),_0x4396be(0x475),_0x4396be(0x8a1),'EISU',_0x4396be(0x2eb),_0x4396be(0x4fa),_0x4396be(0x2a4),'',_0x4396be(0x996),_0x4396be(0x5b0),_0x4396be(0x7eb),_0x4396be(0x8c5),'MODECHANGE',_0x4396be(0x25d),_0x4396be(0x1b0),_0x4396be(0x35d),_0x4396be(0x727),_0x4396be(0x840),_0x4396be(0x651),'UP',_0x4396be(0x9f3),'DOWN',_0x4396be(0x10d),_0x4396be(0x77f),'EXECUTE','PRINTSCREEN',_0x4396be(0x91b),_0x4396be(0x5d7),'','0','1','2','3','4','5','6','7','8','9',_0x4396be(0x469),_0x4396be(0x51f),_0x4396be(0xc5),_0x4396be(0x55d),_0x4396be(0x6c6),_0x4396be(0x867),'AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',_0x4396be(0x8fc),'',_0x4396be(0x85e),'',_0x4396be(0x6cb),'NUMPAD0',_0x4396be(0x12c),_0x4396be(0x919),_0x4396be(0x934),'NUMPAD4',_0x4396be(0x53c),_0x4396be(0xd3),_0x4396be(0x8b7),_0x4396be(0x58c),_0x4396be(0x8c9),'MULTIPLY',_0x4396be(0x368),'SEPARATOR','SUBTRACT','DECIMAL',_0x4396be(0x6c2),'F1','F2','F3','F4','F5','F6','F7','F8','F9',_0x4396be(0x1e8),'F11','F12','F13',_0x4396be(0x29d),_0x4396be(0x574),_0x4396be(0x960),_0x4396be(0xd5),'F18',_0x4396be(0x8df),_0x4396be(0x75f),_0x4396be(0x839),_0x4396be(0x591),_0x4396be(0x47f),'F24','','','','','','','','',_0x4396be(0x8b1),_0x4396be(0x529),'WIN_OEM_FJ_JISHO',_0x4396be(0x3e8),'WIN_OEM_FJ_TOUROKU','WIN_OEM_FJ_LOYA',_0x4396be(0x6c3),'','','','','','','','','','CIRCUMFLEX','EXCLAMATION',_0x4396be(0xb7),'HASH',_0x4396be(0x98d),_0x4396be(0x241),_0x4396be(0xfe),'UNDERSCORE',_0x4396be(0x799),_0x4396be(0x405),_0x4396be(0x9a9),_0x4396be(0x5c6),'PIPE','HYPHEN_MINUS',_0x4396be(0x3bd),_0x4396be(0x69f),_0x4396be(0x7e7),'','','','','VOLUME_MUTE',_0x4396be(0x658),'VOLUME_UP','','',_0x4396be(0x51f),_0x4396be(0x55d),_0x4396be(0x9fe),_0x4396be(0x206),_0x4396be(0x95e),'SLASH',_0x4396be(0x931),'','','','','','','','','','','','','','','','','','','','','','','','','','',_0x4396be(0x99f),_0x4396be(0x9a3),_0x4396be(0x134),_0x4396be(0x465),'',_0x4396be(0x972),_0x4396be(0x6fd),'',_0x4396be(0x817),_0x4396be(0x4b4),'',_0x4396be(0x68d),'','',_0x4396be(0x339),_0x4396be(0x9c5),_0x4396be(0x3ea),_0x4396be(0x600),_0x4396be(0x509),_0x4396be(0x59e),_0x4396be(0x2c3),'WIN_OEM_ATTN',_0x4396be(0x159),_0x4396be(0x649),_0x4396be(0x4fc),_0x4396be(0x966),_0x4396be(0x34f),'ATTN',_0x4396be(0x515),_0x4396be(0x468),_0x4396be(0x359),_0x4396be(0x8bb),_0x4396be(0x8b6),'',_0x4396be(0x2d3),_0x4396be(0x6a3),''],TextManager[_0x4396be(0x57e)]=VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x624)][_0x4396be(0x775)][_0x4396be(0x8cc)],TextManager[_0x4396be(0x920)]=VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x624)][_0x4396be(0x775)][_0x4396be(0x4da)],TextManager[_0x4396be(0x474)]=VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x624)][_0x4396be(0x775)][_0x4396be(0x287)],VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x7d0)]=TextManager[_0x4396be(0x77c)],TextManager[_0x4396be(0x77c)]=function(_0xf217b7){const _0xc5f20=_0x4396be;return typeof _0xf217b7===_0xc5f20(0x86d)?VisuMZ[_0xc5f20(0x7c7)][_0xc5f20(0x7d0)]['call'](this,_0xf217b7):this['paramName'](_0xf217b7);},TextManager['paramName']=function(_0x551c8d){const _0x12abf2=_0x4396be;_0x551c8d=String(_0x551c8d||'')[_0x12abf2(0x569)]();const _0x5c01fb=VisuMZ[_0x12abf2(0x7c7)][_0x12abf2(0x624)][_0x12abf2(0xa0e)];if(_0x551c8d===_0x12abf2(0x93e))return $dataSystem[_0x12abf2(0x771)][_0x12abf2(0x3d3)][0x0];if(_0x551c8d===_0x12abf2(0x2cb))return $dataSystem[_0x12abf2(0x771)][_0x12abf2(0x3d3)][0x1];if(_0x551c8d===_0x12abf2(0x75b))return $dataSystem[_0x12abf2(0x771)][_0x12abf2(0x3d3)][0x2];if(_0x551c8d==='DEF')return $dataSystem[_0x12abf2(0x771)][_0x12abf2(0x3d3)][0x3];if(_0x551c8d===_0x12abf2(0x992))return $dataSystem[_0x12abf2(0x771)][_0x12abf2(0x3d3)][0x4];if(_0x551c8d===_0x12abf2(0x8f2))return $dataSystem[_0x12abf2(0x771)][_0x12abf2(0x3d3)][0x5];if(_0x551c8d==='AGI')return $dataSystem[_0x12abf2(0x771)]['params'][0x6];if(_0x551c8d==='LUK')return $dataSystem[_0x12abf2(0x771)]['params'][0x7];if(_0x551c8d===_0x12abf2(0x5c7))return _0x5c01fb[_0x12abf2(0x483)];if(_0x551c8d==='EVA')return _0x5c01fb[_0x12abf2(0x176)];if(_0x551c8d===_0x12abf2(0x869))return _0x5c01fb[_0x12abf2(0x83a)];if(_0x551c8d==='CEV')return _0x5c01fb['XParamVocab3'];if(_0x551c8d===_0x12abf2(0x26e))return _0x5c01fb[_0x12abf2(0xe2)];if(_0x551c8d==='MRF')return _0x5c01fb[_0x12abf2(0x6af)];if(_0x551c8d==='CNT')return _0x5c01fb[_0x12abf2(0x5aa)];if(_0x551c8d==='HRG')return _0x5c01fb[_0x12abf2(0x502)];if(_0x551c8d===_0x12abf2(0x75e))return _0x5c01fb[_0x12abf2(0x623)];if(_0x551c8d===_0x12abf2(0x5dc))return _0x5c01fb[_0x12abf2(0xb0)];if(_0x551c8d===_0x12abf2(0x135))return _0x5c01fb[_0x12abf2(0x77b)];if(_0x551c8d==='GRD')return _0x5c01fb[_0x12abf2(0x11a)];if(_0x551c8d==='REC')return _0x5c01fb[_0x12abf2(0x4d6)];if(_0x551c8d==='PHA')return _0x5c01fb[_0x12abf2(0x5fd)];if(_0x551c8d===_0x12abf2(0x1b1))return _0x5c01fb[_0x12abf2(0x4a1)];if(_0x551c8d==='TCR')return _0x5c01fb[_0x12abf2(0x7fc)];if(_0x551c8d===_0x12abf2(0x91c))return _0x5c01fb[_0x12abf2(0x490)];if(_0x551c8d===_0x12abf2(0x68e))return _0x5c01fb['SParamVocab7'];if(_0x551c8d===_0x12abf2(0x570))return _0x5c01fb[_0x12abf2(0x5af)];if(_0x551c8d==='EXR')return _0x5c01fb[_0x12abf2(0x23e)];if(VisuMZ[_0x12abf2(0x7c7)][_0x12abf2(0x3a9)][_0x551c8d]){if('ZBNBq'===_0x12abf2(0x6c9))return VisuMZ['CoreEngine'][_0x12abf2(0x3a9)][_0x551c8d];else{const _0x326626=_0x425299[_0x12abf2(0x7a5)]();if(_0x326626)_0x326626[_0x12abf2(0x5ab)](_0x39ef2a);}}return'';},TextManager[_0x4396be(0x35e)]=function(_0x4270c7){const _0xbbc95a=_0x4396be,_0x2fd98e=Input[_0xbbc95a(0x7f5)]();return _0x2fd98e===_0xbbc95a(0x436)?this[_0xbbc95a(0x242)](_0x4270c7):this[_0xbbc95a(0x110)](_0x2fd98e,_0x4270c7);},TextManager['getKeyboardInputButtonString']=function(_0x33e8b9){const _0x1b482e=_0x4396be,_0x44ac71=VisuMZ['CoreEngine'][_0x1b482e(0x624)][_0x1b482e(0x775)][_0x1b482e(0x714)];if(!_0x44ac71){if(_0x33e8b9===_0x1b482e(0x604))_0x33e8b9=_0x1b482e(0x312);if(_0x33e8b9===_0x1b482e(0x303))_0x33e8b9=_0x1b482e(0x312);}let _0x1de37b=[];for(let _0x45b992 in Input[_0x1b482e(0x994)]){if(_0x1b482e(0x416)!==_0x1b482e(0x5e3)){_0x45b992=Number(_0x45b992);if(_0x45b992>=0x60&&_0x45b992<=0x69)continue;if([0x12,0x20][_0x1b482e(0x897)](_0x45b992))continue;_0x33e8b9===Input[_0x1b482e(0x994)][_0x45b992]&&_0x1de37b['push'](_0x45b992);}else{if(_0x5e0059[_0x1b482e(0x7c7)][_0x1b482e(0x624)][_0x1b482e(0xa0e)][_0x1b482e(0x7fa)]===![])return;if(this[_0x1b482e(0x2f3)]())this[_0x1b482e(0x6c1)](_0x5e9ac0,_0x5ea357,_0x2b29f7);_0x125915[_0x1b482e(0x7c7)][_0x1b482e(0x261)][_0x1b482e(0x8ee)](this,_0x3abb02,_0x2ad5a9,_0x185403);}}for(let _0x1c67c9=0x0;_0x1c67c9<_0x1de37b[_0x1b482e(0x858)];_0x1c67c9++){_0x1de37b[_0x1c67c9]=TextManager[_0x1b482e(0x71a)][_0x1de37b[_0x1c67c9]];}return this[_0x1b482e(0x6e6)](_0x1de37b);},TextManager['makeInputButtonString']=function(_0x5ad7eb){const _0x44a9ed=_0x4396be,_0xd412f9=VisuMZ['CoreEngine']['Settings'][_0x44a9ed(0x775)],_0x45d771=_0xd412f9[_0x44a9ed(0x3a0)],_0x4ec55f=_0x5ad7eb[_0x44a9ed(0x129)](),_0x28f089=_0x44a9ed(0x1fb)[_0x44a9ed(0x9c3)](_0x4ec55f);return _0xd412f9[_0x28f089]?_0xd412f9[_0x28f089]:_0x45d771['format'](_0x4ec55f);},TextManager['getInputMultiButtonStrings']=function(_0xb1872f,_0x2ef106){const _0x13a7ff=_0x4396be,_0x4192b6=VisuMZ[_0x13a7ff(0x7c7)][_0x13a7ff(0x624)][_0x13a7ff(0x775)],_0x1701a6=_0x4192b6[_0x13a7ff(0x8a7)],_0x317359=this[_0x13a7ff(0x35e)](_0xb1872f),_0x5253e9=this['getInputButtonString'](_0x2ef106);return _0x1701a6[_0x13a7ff(0x9c3)](_0x317359,_0x5253e9);},TextManager[_0x4396be(0x110)]=function(_0x12f5bd,_0x469c2b){const _0x5f1c56=_0x4396be,_0x56d7a3=_0x12f5bd[_0x5f1c56(0xd2)]()['trim'](),_0x8e1aa3=VisuMZ[_0x5f1c56(0x7c7)]['ControllerButtons'][_0x56d7a3];if(!_0x8e1aa3)return this[_0x5f1c56(0x590)](_0x12f5bd,_0x469c2b);return _0x8e1aa3[_0x469c2b]||this['getKeyboardInputButtonString'](_0x12f5bd,_0x469c2b);},TextManager[_0x4396be(0x590)]=function(_0x289e8c,_0x51f7c){const _0x24fa3a=_0x4396be,_0x3b9818=_0x289e8c[_0x24fa3a(0xd2)]()[_0x24fa3a(0x8b0)]();for(const _0x1a6d15 in VisuMZ[_0x24fa3a(0x7c7)][_0x24fa3a(0x79f)]){if('nCzwH'!==_0x24fa3a(0x7e5))this[_0x24fa3a(0x431)](_0x182dff);else{if(_0x3b9818['includes'](_0x1a6d15)){const _0x3cd263=VisuMZ['CoreEngine'][_0x24fa3a(0x79f)][_0x1a6d15],_0x51eb58=VisuMZ['CoreEngine']['ControllerButtons'][_0x3cd263];return _0x51eb58[_0x51f7c]||this[_0x24fa3a(0x242)](_0x51f7c);}}}return this[_0x24fa3a(0x242)](_0x51f7c);},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x2ea)]=ColorManager[_0x4396be(0x40b)],ColorManager[_0x4396be(0x40b)]=function(){const _0x4353c8=_0x4396be;VisuMZ['CoreEngine']['ColorManager_loadWindowskin'][_0x4353c8(0x8ee)](this),this[_0x4353c8(0x6e3)]=this['_colorCache']||{};},ColorManager[_0x4396be(0x2bc)]=function(_0x56c7e1,_0x54c421){const _0x272d67=_0x4396be;return _0x54c421=String(_0x54c421),this['_colorCache']=this[_0x272d67(0x6e3)]||{},_0x54c421['match'](/#(.*)/i)?this['_colorCache'][_0x56c7e1]=_0x272d67(0x48b)[_0x272d67(0x9c3)](String(RegExp['$1'])):this['_colorCache'][_0x56c7e1]=this[_0x272d67(0x1ff)](Number(_0x54c421)),this[_0x272d67(0x6e3)][_0x56c7e1];},ColorManager['getColor']=function(_0x4c299f){const _0x341f3b=_0x4396be;_0x4c299f=String(_0x4c299f);if(_0x4c299f[_0x341f3b(0x8e4)](/#(.*)/i)){if(_0x341f3b(0x82d)===_0x341f3b(0x8d3))this[_0x341f3b(0x52a)]=![];else return _0x341f3b(0x48b)['format'](String(RegExp['$1']));}else return this[_0x341f3b(0x1ff)](Number(_0x4c299f));},ColorManager[_0x4396be(0x4f6)]=function(){const _0x222152=_0x4396be;this[_0x222152(0x6e3)]={};},ColorManager['normalColor']=function(){const _0x40d402=_0x4396be,_0x4a01ee=_0x40d402(0x715);this[_0x40d402(0x6e3)]=this[_0x40d402(0x6e3)]||{};if(this[_0x40d402(0x6e3)][_0x4a01ee])return this['_colorCache'][_0x4a01ee];const _0x3629a3=VisuMZ[_0x40d402(0x7c7)][_0x40d402(0x624)][_0x40d402(0x191)]['ColorNormal'];return this[_0x40d402(0x2bc)](_0x4a01ee,_0x3629a3);},ColorManager['systemColor']=function(){const _0x9fe748=_0x4396be,_0x2e62d6=_0x9fe748(0x304);this[_0x9fe748(0x6e3)]=this[_0x9fe748(0x6e3)]||{};if(this[_0x9fe748(0x6e3)][_0x2e62d6])return this[_0x9fe748(0x6e3)][_0x2e62d6];const _0x1749f0=VisuMZ['CoreEngine'][_0x9fe748(0x624)][_0x9fe748(0x191)][_0x9fe748(0x33b)];return this[_0x9fe748(0x2bc)](_0x2e62d6,_0x1749f0);},ColorManager[_0x4396be(0x2dc)]=function(){const _0x4da922=_0x4396be,_0x183082='_stored_crisisColor';this[_0x4da922(0x6e3)]=this[_0x4da922(0x6e3)]||{};if(this[_0x4da922(0x6e3)][_0x183082])return this['_colorCache'][_0x183082];const _0x460030=VisuMZ[_0x4da922(0x7c7)][_0x4da922(0x624)][_0x4da922(0x191)]['ColorCrisis'];return this[_0x4da922(0x2bc)](_0x183082,_0x460030);},ColorManager['deathColor']=function(){const _0x16e73e=_0x4396be,_0x5c1125=_0x16e73e(0x628);this['_colorCache']=this[_0x16e73e(0x6e3)]||{};if(this[_0x16e73e(0x6e3)][_0x5c1125])return this['_colorCache'][_0x5c1125];const _0x39c2af=VisuMZ[_0x16e73e(0x7c7)][_0x16e73e(0x624)]['Color']['ColorDeath'];return this['getColorDataFromPluginParameters'](_0x5c1125,_0x39c2af);},ColorManager[_0x4396be(0x2ff)]=function(){const _0x2531d8=_0x4396be,_0x4c1c81=_0x2531d8(0x8d4);this['_colorCache']=this['_colorCache']||{};if(this[_0x2531d8(0x6e3)][_0x4c1c81])return this[_0x2531d8(0x6e3)][_0x4c1c81];const _0x490b18=VisuMZ[_0x2531d8(0x7c7)][_0x2531d8(0x624)][_0x2531d8(0x191)][_0x2531d8(0x53e)];return this[_0x2531d8(0x2bc)](_0x4c1c81,_0x490b18);},ColorManager[_0x4396be(0x6d1)]=function(){const _0x3203e2=_0x4396be,_0x56323c=_0x3203e2(0x404);this[_0x3203e2(0x6e3)]=this[_0x3203e2(0x6e3)]||{};if(this['_colorCache'][_0x56323c])return this[_0x3203e2(0x6e3)][_0x56323c];const _0x51acad=VisuMZ[_0x3203e2(0x7c7)][_0x3203e2(0x624)][_0x3203e2(0x191)][_0x3203e2(0x6a4)];return this['getColorDataFromPluginParameters'](_0x56323c,_0x51acad);},ColorManager['hpGaugeColor2']=function(){const _0x4d4438=_0x4396be,_0x11b119=_0x4d4438(0x2db);this['_colorCache']=this[_0x4d4438(0x6e3)]||{};if(this['_colorCache'][_0x11b119])return this[_0x4d4438(0x6e3)][_0x11b119];const _0x1fae9e=VisuMZ[_0x4d4438(0x7c7)][_0x4d4438(0x624)][_0x4d4438(0x191)][_0x4d4438(0x57a)];return this[_0x4d4438(0x2bc)](_0x11b119,_0x1fae9e);},ColorManager[_0x4396be(0x155)]=function(){const _0x3a8c76=_0x4396be,_0x32c21c='_stored_mpGaugeColor1';this[_0x3a8c76(0x6e3)]=this[_0x3a8c76(0x6e3)]||{};if(this[_0x3a8c76(0x6e3)][_0x32c21c])return this[_0x3a8c76(0x6e3)][_0x32c21c];const _0x18b30d=VisuMZ[_0x3a8c76(0x7c7)][_0x3a8c76(0x624)][_0x3a8c76(0x191)][_0x3a8c76(0x3f9)];return this[_0x3a8c76(0x2bc)](_0x32c21c,_0x18b30d);},ColorManager[_0x4396be(0x17f)]=function(){const _0x4dbd99=_0x4396be,_0x4b98c6=_0x4dbd99(0x7a6);this[_0x4dbd99(0x6e3)]=this[_0x4dbd99(0x6e3)]||{};if(this[_0x4dbd99(0x6e3)][_0x4b98c6])return this[_0x4dbd99(0x6e3)][_0x4b98c6];const _0x10cccd=VisuMZ[_0x4dbd99(0x7c7)]['Settings'][_0x4dbd99(0x191)][_0x4dbd99(0xa12)];return this[_0x4dbd99(0x2bc)](_0x4b98c6,_0x10cccd);},ColorManager[_0x4396be(0x33f)]=function(){const _0x56a200=_0x4396be,_0x1df45b=_0x56a200(0x702);this['_colorCache']=this[_0x56a200(0x6e3)]||{};if(this[_0x56a200(0x6e3)][_0x1df45b])return this[_0x56a200(0x6e3)][_0x1df45b];const _0x381f2b=VisuMZ[_0x56a200(0x7c7)]['Settings'][_0x56a200(0x191)][_0x56a200(0x1b7)];return this['getColorDataFromPluginParameters'](_0x1df45b,_0x381f2b);},ColorManager[_0x4396be(0x9b7)]=function(){const _0x5686b0=_0x4396be,_0x5f3220=_0x5686b0(0x4cd);this[_0x5686b0(0x6e3)]=this[_0x5686b0(0x6e3)]||{};if(this[_0x5686b0(0x6e3)][_0x5f3220])return this[_0x5686b0(0x6e3)][_0x5f3220];const _0x58d006=VisuMZ[_0x5686b0(0x7c7)][_0x5686b0(0x624)][_0x5686b0(0x191)]['ColorPowerUp'];return this['getColorDataFromPluginParameters'](_0x5f3220,_0x58d006);},ColorManager['powerDownColor']=function(){const _0x493fc8=_0x4396be,_0x25260d=_0x493fc8(0x7e6);this[_0x493fc8(0x6e3)]=this[_0x493fc8(0x6e3)]||{};if(this[_0x493fc8(0x6e3)][_0x25260d])return this[_0x493fc8(0x6e3)][_0x25260d];const _0x13f3ca=VisuMZ[_0x493fc8(0x7c7)][_0x493fc8(0x624)]['Color']['ColorPowerDown'];return this[_0x493fc8(0x2bc)](_0x25260d,_0x13f3ca);},ColorManager[_0x4396be(0x1a0)]=function(){const _0x175f7c=_0x4396be,_0x4fb3df=_0x175f7c(0x91e);this[_0x175f7c(0x6e3)]=this[_0x175f7c(0x6e3)]||{};if(this[_0x175f7c(0x6e3)][_0x4fb3df])return this[_0x175f7c(0x6e3)][_0x4fb3df];const _0xc638ed=VisuMZ[_0x175f7c(0x7c7)][_0x175f7c(0x624)][_0x175f7c(0x191)]['ColorCTGauge1'];return this[_0x175f7c(0x2bc)](_0x4fb3df,_0xc638ed);},ColorManager[_0x4396be(0x13a)]=function(){const _0x49fd32=_0x4396be,_0xc9b4d3=_0x49fd32(0x392);this[_0x49fd32(0x6e3)]=this[_0x49fd32(0x6e3)]||{};if(this[_0x49fd32(0x6e3)][_0xc9b4d3])return this[_0x49fd32(0x6e3)][_0xc9b4d3];const _0x432367=VisuMZ[_0x49fd32(0x7c7)][_0x49fd32(0x624)][_0x49fd32(0x191)][_0x49fd32(0x334)];return this['getColorDataFromPluginParameters'](_0xc9b4d3,_0x432367);},ColorManager['tpGaugeColor1']=function(){const _0x320336=_0x4396be,_0x42f87d=_0x320336(0x953);this['_colorCache']=this['_colorCache']||{};if(this['_colorCache'][_0x42f87d])return this[_0x320336(0x6e3)][_0x42f87d];const _0x5d8a80=VisuMZ[_0x320336(0x7c7)][_0x320336(0x624)][_0x320336(0x191)][_0x320336(0x433)];return this[_0x320336(0x2bc)](_0x42f87d,_0x5d8a80);},ColorManager[_0x4396be(0x6dc)]=function(){const _0x448905=_0x4396be,_0x5120dd=_0x448905(0x351);this[_0x448905(0x6e3)]=this[_0x448905(0x6e3)]||{};if(this[_0x448905(0x6e3)][_0x5120dd])return this[_0x448905(0x6e3)][_0x5120dd];const _0x999a3a=VisuMZ['CoreEngine'][_0x448905(0x624)][_0x448905(0x191)]['ColorTPGauge2'];return this[_0x448905(0x2bc)](_0x5120dd,_0x999a3a);},ColorManager['tpCostColor']=function(){const _0x4746c3=_0x4396be,_0x36727c=_0x4746c3(0x1d4);this['_colorCache']=this[_0x4746c3(0x6e3)]||{};if(this[_0x4746c3(0x6e3)][_0x36727c])return this[_0x4746c3(0x6e3)][_0x36727c];const _0x1ced8b=VisuMZ[_0x4746c3(0x7c7)]['Settings'][_0x4746c3(0x191)][_0x4746c3(0x4b1)];return this[_0x4746c3(0x2bc)](_0x36727c,_0x1ced8b);},ColorManager[_0x4396be(0x399)]=function(){const _0x4c0011=_0x4396be,_0x4bc821=_0x4c0011(0x93c);this[_0x4c0011(0x6e3)]=this['_colorCache']||{};if(this[_0x4c0011(0x6e3)][_0x4bc821])return this['_colorCache'][_0x4bc821];const _0x4fc82a=VisuMZ[_0x4c0011(0x7c7)][_0x4c0011(0x624)][_0x4c0011(0x191)][_0x4c0011(0x4b1)];return this['getColorDataFromPluginParameters'](_0x4bc821,_0x4fc82a);},ColorManager['expGaugeColor1']=function(){const _0xbe0310=_0x4396be,_0x2a2f4e=_0xbe0310(0x918);this[_0xbe0310(0x6e3)]=this[_0xbe0310(0x6e3)]||{};if(this['_colorCache'][_0x2a2f4e])return this[_0xbe0310(0x6e3)][_0x2a2f4e];const _0x13cec1=VisuMZ[_0xbe0310(0x7c7)][_0xbe0310(0x624)][_0xbe0310(0x191)][_0xbe0310(0x290)];return this[_0xbe0310(0x2bc)](_0x2a2f4e,_0x13cec1);},ColorManager[_0x4396be(0x24e)]=function(){const _0x5b1dc9=_0x4396be,_0x2f957f=_0x5b1dc9(0x212);this[_0x5b1dc9(0x6e3)]=this[_0x5b1dc9(0x6e3)]||{};if(this[_0x5b1dc9(0x6e3)][_0x2f957f])return this[_0x5b1dc9(0x6e3)][_0x2f957f];const _0x1d27b5=VisuMZ[_0x5b1dc9(0x7c7)][_0x5b1dc9(0x624)]['Color']['ColorExpGauge2'];return this[_0x5b1dc9(0x2bc)](_0x2f957f,_0x1d27b5);},ColorManager[_0x4396be(0x4a6)]=function(){const _0xc7fafd=_0x4396be,_0x32eaf5=_0xc7fafd(0x607);this[_0xc7fafd(0x6e3)]=this['_colorCache']||{};if(this[_0xc7fafd(0x6e3)][_0x32eaf5])return this[_0xc7fafd(0x6e3)][_0x32eaf5];const _0x597533=VisuMZ[_0xc7fafd(0x7c7)][_0xc7fafd(0x624)][_0xc7fafd(0x191)]['ColorMaxLvGauge1'];return this[_0xc7fafd(0x2bc)](_0x32eaf5,_0x597533);},ColorManager['maxLvGaugeColor2']=function(){const _0x2cfd93=_0x4396be,_0x2435ce=_0x2cfd93(0xa07);this[_0x2cfd93(0x6e3)]=this[_0x2cfd93(0x6e3)]||{};if(this[_0x2cfd93(0x6e3)][_0x2435ce])return this['_colorCache'][_0x2435ce];const _0xf883db=VisuMZ['CoreEngine'][_0x2cfd93(0x624)]['Color']['ColorMaxLvGauge2'];return this[_0x2cfd93(0x2bc)](_0x2435ce,_0xf883db);},ColorManager[_0x4396be(0x699)]=function(_0x4efa31){const _0x1f813a=_0x4396be;return VisuMZ[_0x1f813a(0x7c7)][_0x1f813a(0x624)][_0x1f813a(0x191)][_0x1f813a(0x371)][_0x1f813a(0x8ee)](this,_0x4efa31);},ColorManager[_0x4396be(0x435)]=function(_0x15d08c){const _0x22c3b8=_0x4396be;return VisuMZ[_0x22c3b8(0x7c7)]['Settings'][_0x22c3b8(0x191)][_0x22c3b8(0x385)]['call'](this,_0x15d08c);},ColorManager[_0x4396be(0x95f)]=function(_0x34af17){const _0x11f539=_0x4396be;return VisuMZ[_0x11f539(0x7c7)][_0x11f539(0x624)][_0x11f539(0x191)]['ActorTPColor']['call'](this,_0x34af17);},ColorManager[_0x4396be(0x430)]=function(_0x2b5389){const _0x1acb03=_0x4396be;return VisuMZ[_0x1acb03(0x7c7)][_0x1acb03(0x624)]['Color'][_0x1acb03(0x92b)][_0x1acb03(0x8ee)](this,_0x2b5389);},ColorManager[_0x4396be(0x2bb)]=function(_0x45fc0d){const _0x1ec86e=_0x4396be;return VisuMZ[_0x1ec86e(0x7c7)][_0x1ec86e(0x624)][_0x1ec86e(0x191)][_0x1ec86e(0x6de)][_0x1ec86e(0x8ee)](this,_0x45fc0d);},ColorManager[_0x4396be(0x3ce)]=function(){const _0x20d91f=_0x4396be;return VisuMZ[_0x20d91f(0x7c7)][_0x20d91f(0x624)][_0x20d91f(0x191)]['OutlineColor'];},ColorManager[_0x4396be(0x260)]=function(){const _0x4ba98b=_0x4396be;return VisuMZ[_0x4ba98b(0x7c7)][_0x4ba98b(0x624)]['Color']['OutlineColorDmg']||_0x4ba98b(0x138);},ColorManager[_0x4396be(0x2fb)]=function(){const _0x4cc0ef=_0x4396be;return VisuMZ[_0x4cc0ef(0x7c7)]['Settings'][_0x4cc0ef(0x191)]['OutlineColorGauge']||'rgba(0,\x200,\x200,\x201.0)';},ColorManager[_0x4396be(0x99e)]=function(){const _0x1b0500=_0x4396be;return VisuMZ[_0x1b0500(0x7c7)][_0x1b0500(0x624)][_0x1b0500(0x191)]['DimColor1'];},ColorManager[_0x4396be(0x473)]=function(){const _0x25fd30=_0x4396be;return VisuMZ[_0x25fd30(0x7c7)][_0x25fd30(0x624)][_0x25fd30(0x191)][_0x25fd30(0x393)];},ColorManager[_0x4396be(0x638)]=function(){const _0xb63e22=_0x4396be;return VisuMZ[_0xb63e22(0x7c7)][_0xb63e22(0x624)][_0xb63e22(0x191)]['ItemBackColor1'];},ColorManager[_0x4396be(0x3da)]=function(){const _0x597fe6=_0x4396be;return VisuMZ[_0x597fe6(0x7c7)]['Settings'][_0x597fe6(0x191)][_0x597fe6(0x539)];},SceneManager[_0x4396be(0x969)]=[],SceneManager['isSceneBattle']=function(){const _0x2bc227=_0x4396be;return this['_scene']&&this['_scene'][_0x2bc227(0x558)]===Scene_Battle;},SceneManager[_0x4396be(0x7ee)]=function(){const _0x27e681=_0x4396be;return this[_0x27e681(0x9c8)]&&this[_0x27e681(0x9c8)]['constructor']===Scene_Map;},SceneManager[_0x4396be(0x226)]=function(){return this['_scene']&&this['_scene']instanceof Scene_Map;},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x3b1)]=SceneManager[_0x4396be(0x480)],SceneManager['initialize']=function(){const _0x6268e3=_0x4396be;VisuMZ[_0x6268e3(0x7c7)][_0x6268e3(0x3b1)][_0x6268e3(0x8ee)](this),this[_0x6268e3(0x8f8)]();},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x635)]=SceneManager['onKeyDown'],SceneManager[_0x4396be(0x374)]=function(_0x35cde6){const _0x47067c=_0x4396be;if($gameTemp)this[_0x47067c(0x5a3)](_0x35cde6);VisuMZ[_0x47067c(0x7c7)][_0x47067c(0x635)][_0x47067c(0x8ee)](this,_0x35cde6);},SceneManager[_0x4396be(0x5a3)]=function(_0x1df877){const _0x3f0e90=_0x4396be;if(!_0x1df877[_0x3f0e90(0x967)]&&!_0x1df877[_0x3f0e90(0x8b4)]){if(_0x3f0e90(0x5d6)!==_0x3f0e90(0x5d6))this[_0x3f0e90(0x23d)]();else switch(_0x1df877[_0x3f0e90(0x1fe)]){case 0x52:this[_0x3f0e90(0x9d2)]();break;case 0x54:this[_0x3f0e90(0x1a1)]();break;case 0x75:this[_0x3f0e90(0x75a)]();break;case 0x76:if(Input['isPressed'](_0x3f0e90(0x762))||Input[_0x3f0e90(0x177)](_0x3f0e90(0x9a8)))return;this['playTestF7']();break;}}else{if(_0x1df877[_0x3f0e90(0x967)]){if(_0x3f0e90(0x4cc)!=='lzrKk'){let _0x2508d4=_0x1df877[_0x3f0e90(0x1fe)];if(_0x2508d4>=0x31&&_0x2508d4<=0x39){const _0x4f2e44=_0x2508d4-0x30;return SceneManager[_0x3f0e90(0x551)](_0x4f2e44);}else{if(_0x2508d4>=0x61&&_0x2508d4<=0x69){if('PWFiu'!==_0x3f0e90(0x3ab)){const _0x8a5cbd=_0x4fb40c-0x30;return _0x2c60cd[_0x3f0e90(0x551)](_0x8a5cbd);}else{const _0x4894d6=_0x2508d4-0x60;return SceneManager['playtestQuickLoad'](_0x4894d6);}}}}else _0x2e21fe=_0xcebefb['maxLvGaugeColor1'](),_0x452961=_0x471d13[_0x3f0e90(0x10e)]();}}},SceneManager[_0x4396be(0x75a)]=function(){const _0x117824=_0x4396be;if($gameTemp[_0x117824(0x863)]()&&VisuMZ['CoreEngine']['Settings']['QoL']['F6key']){if(ConfigManager[_0x117824(0x8e3)]!==0x0){if(_0x117824(0x6f0)===_0x117824(0x6f0))ConfigManager[_0x117824(0x514)]=0x0,ConfigManager[_0x117824(0x648)]=0x0,ConfigManager[_0x117824(0x11d)]=0x0,ConfigManager[_0x117824(0x8e3)]=0x0;else{const _0x2616d1=_0x5c819b['Abbreviation'],_0x353b6d=_0x8e60ce[_0x117824(0x20a)],_0xa8b2ba=_0x53d539[_0x117824(0x7ba)],_0x288908=_0x26d27c[_0x117824(0xa03)],_0x250e84=new _0x109ecd(_0x252f33['ValueJS']);_0x448a7e[_0x117824(0x7c7)][_0x117824(0x3a9)][_0x2616d1[_0x117824(0x569)]()[_0x117824(0x8b0)]()]=_0x353b6d,_0x15aab2[_0x117824(0x7c7)][_0x117824(0x443)][_0x2616d1[_0x117824(0x569)]()[_0x117824(0x8b0)]()]=_0xa8b2ba,_0x1f0589[_0x117824(0x7c7)][_0x117824(0x1d2)][_0x2616d1[_0x117824(0x569)]()[_0x117824(0x8b0)]()]=_0x288908,_0x3f7818['CoreEngine'][_0x117824(0x8dd)][_0x2616d1[_0x117824(0x569)]()[_0x117824(0x8b0)]()]=_0x2616d1,_0x5e8d98['defineProperty'](_0x813560[_0x117824(0x56f)],_0x2616d1,{'get'(){const _0x5f04d9=_0x117824,_0x38561f=_0x250e84[_0x5f04d9(0x8ee)](this);return _0x288908===_0x5f04d9(0x136)?_0x3b0d4f[_0x5f04d9(0xb9)](_0x38561f):_0x38561f;}});}}else ConfigManager[_0x117824(0x514)]=0x64,ConfigManager[_0x117824(0x648)]=0x64,ConfigManager[_0x117824(0x11d)]=0x64,ConfigManager[_0x117824(0x8e3)]=0x64;ConfigManager[_0x117824(0x58d)]();if(this['_scene'][_0x117824(0x558)]===Scene_Options){if('wwEuv'!==_0x117824(0x245)){if(this[_0x117824(0x9c8)][_0x117824(0x3d7)])this[_0x117824(0x9c8)][_0x117824(0x3d7)]['refresh']();if(this[_0x117824(0x9c8)]['_listWindow'])this[_0x117824(0x9c8)][_0x117824(0x486)][_0x117824(0x813)]();}else{try{_0x171d00[_0x117824(0x7c7)][_0x117824(0x948)][_0x117824(0x8ee)](this);}catch(_0x59df36){_0x50facf['isPlaytest']()&&(_0x39a260[_0x117824(0x6cd)](_0x117824(0x9e9)),_0x547307[_0x117824(0x6cd)](_0x59df36));}return!![];}}}},SceneManager[_0x4396be(0x2f0)]=function(){const _0x23ba43=_0x4396be;$gameTemp[_0x23ba43(0x863)]()&&VisuMZ[_0x23ba43(0x7c7)][_0x23ba43(0x624)][_0x23ba43(0x9e8)][_0x23ba43(0x227)]&&($gameTemp[_0x23ba43(0x697)]=!$gameTemp['_playTestFastMode']);},SceneManager[_0x4396be(0x9d2)]=function(){const _0x2b928e=_0x4396be;if(!VisuMZ[_0x2b928e(0x7c7)][_0x2b928e(0x624)][_0x2b928e(0x9e8)][_0x2b928e(0x190)])return;if(!$gameTemp[_0x2b928e(0x863)]())return;if(!SceneManager[_0x2b928e(0x3b6)]())return;if(!Input[_0x2b928e(0x177)](_0x2b928e(0x762)))return;for(const _0x2bddf2 of $gameParty[_0x2b928e(0xdf)]()){if(!_0x2bddf2)continue;_0x2bddf2[_0x2b928e(0x73c)]();}},SceneManager[_0x4396be(0x1a1)]=function(){const _0x48ec6=_0x4396be;if(!VisuMZ[_0x48ec6(0x7c7)][_0x48ec6(0x624)]['QoL'][_0x48ec6(0x429)])return;if(!$gameTemp['isPlaytest']())return;if(!SceneManager[_0x48ec6(0x3b6)]())return;if(!Input['isPressed']('shift'))return;for(const _0x2ea242 of $gameParty[_0x48ec6(0xdf)]()){if('TNicz'!==_0x48ec6(0x2d7)){if(!_0x2ea242)continue;_0x2ea242[_0x48ec6(0x8ac)](_0x2ea242['maxTp']());}else _0x3853d2[_0x48ec6(0x7c7)][_0x48ec6(0x948)]['call'](this);}},SceneManager[_0x4396be(0x551)]=function(_0x49801d){const _0xa2365c=_0x4396be;if(!$gameTemp[_0xa2365c(0x863)]())return;if(!DataManager[_0xa2365c(0x861)](_0x49801d))return;if(!(VisuMZ[_0xa2365c(0x7c7)][_0xa2365c(0x624)][_0xa2365c(0x9e8)][_0xa2365c(0x215)]??!![]))return;this['push'](Scene_QuickLoad),this[_0xa2365c(0x20d)](_0x49801d);},SceneManager[_0x4396be(0x8f8)]=function(){const _0x4efbf8=_0x4396be;this[_0x4efbf8(0x725)]=![],this['_hideButtons']=!VisuMZ[_0x4efbf8(0x7c7)][_0x4efbf8(0x624)]['UI']['ShowButtons'];},SceneManager[_0x4396be(0x1f0)]=function(_0x87c844){const _0x1e43c1=_0x4396be;VisuMZ[_0x1e43c1(0x7c7)][_0x1e43c1(0x624)]['UI'][_0x1e43c1(0x772)]&&(this[_0x1e43c1(0x725)]=_0x87c844);},SceneManager[_0x4396be(0x273)]=function(){const _0x30fadd=_0x4396be;return this[_0x30fadd(0x725)];},SceneManager[_0x4396be(0x446)]=function(){const _0x4c1596=_0x4396be;return this[_0x4c1596(0x1bc)];},SceneManager[_0x4396be(0x80a)]=function(){const _0x41119f=_0x4396be;return this[_0x41119f(0x446)]()||this[_0x41119f(0x273)]();},VisuMZ['CoreEngine'][_0x4396be(0x145)]=SceneManager[_0x4396be(0x189)],SceneManager['isGameActive']=function(){const _0x2a0afc=_0x4396be;if(VisuMZ[_0x2a0afc(0x7c7)]['Settings'][_0x2a0afc(0x9e8)][_0x2a0afc(0x246)]){if('MRybk'!=='MRybk'){const _0x33ec12=new _0x1a2bf[(_0x2a0afc(0x499))]();_0x33ec12[_0x2a0afc(0x646)](0x800,0x800),_0x541ec5[_0x2a0afc(0x7c7)][_0x2a0afc(0x624)][_0x2a0afc(0x9e8)][_0x2a0afc(0x66d)]&&(_0x33ec12[_0x2a0afc(0x3e4)]=_0x5527ba[_0x2a0afc(0x38d)][_0x2a0afc(0x7bb)]),this[_0x2a0afc(0x485)][_0x2a0afc(0x8ab)](_0x33ec12);}else return VisuMZ['CoreEngine']['SceneManager_isGameActive'][_0x2a0afc(0x8ee)](this);}else return!![];},SceneManager[_0x4396be(0xde)]=function(_0x5b94c4){const _0x4439f4=_0x4396be;if(_0x5b94c4 instanceof Error){if('NQnYv'==='NQnYv')this[_0x4439f4(0x926)](_0x5b94c4);else{const _0x35657a=new _0x8f6cb8(),_0x2f104f=this[_0x4439f4(0x7fb)]();_0x35657a['x']=_0x235d2a['x']-_0x2f104f['x'],_0x35657a['y']=_0x1277dd['y']-_0x2f104f['y'],_0x35657a['z']=0x64;const _0x2319cc=this[_0x4439f4(0x7fb)]();return _0x2319cc[_0x4439f4(0x19c)](_0x35657a),[_0x35657a];}}else{if(_0x5b94c4 instanceof Array&&_0x5b94c4[0x0]==='LoadError'){if(_0x4439f4(0x1b6)===_0x4439f4(0x1b6))this[_0x4439f4(0x81c)](_0x5b94c4);else{const _0x29ce9b=_0x4439f4(0x6ed);this[_0x4439f4(0x81f)][_0x4439f4(0x3b9)](_0x1e4f1c)[_0x4439f4(0x3b9)]('')[_0x4439f4(0x3b9)](null);const _0x72bf56=this[_0x4439f4(0x81f)]['join'](_0x4439f4(0x362))[_0x4439f4(0x8b0)]();_0x2eb283[_0x4439f4(0x7c7)][_0x4439f4(0x965)](_0x72bf56,_0x29ce9b,!![]),_0xa49134[_0x4439f4(0x9c8)][_0x4439f4(0x8f0)]=!![];}}else this[_0x4439f4(0x1c7)](_0x5b94c4);}this[_0x4439f4(0x659)]();},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x5f8)]=BattleManager[_0x4396be(0x455)],BattleManager[_0x4396be(0x455)]=function(){const _0x20fd75=_0x4396be;if(VisuMZ[_0x20fd75(0x7c7)]['Settings'][_0x20fd75(0x9e8)][_0x20fd75(0x7dc)]){if(_0x20fd75(0x61f)==='ILyxJ'){const _0x2a7b0b=_0x2abb30(this['constructor'][_0x20fd75(0x862)]),_0x40b242=this[_0x20fd75(0x124)](_0x2a7b0b);return _0x40b242?_0x40b242[_0x20fd75(0x2a7)]:0xc0;}else return this[_0x20fd75(0x16b)]();}else{if(_0x20fd75(0x73d)!==_0x20fd75(0x73d)){_0x1763d9[_0x20fd75(0x7c7)][_0x20fd75(0x1d9)]['call'](this);if(!_0x30ade8[_0x20fd75(0x305)])this['levelUpRecovery']();}else return VisuMZ[_0x20fd75(0x7c7)][_0x20fd75(0x5f8)][_0x20fd75(0x8ee)](this);}},BattleManager[_0x4396be(0x16b)]=function(){const _0x5a5720=_0x4396be;return $gameParty['performEscape'](),SoundManager[_0x5a5720(0x5a2)](),this[_0x5a5720(0xd7)](),!![];},BattleManager['isTpb']=function(){return $gameSystem['getBattleSystem']()>=0x1;},BattleManager['isActiveTpb']=function(){const _0x3487ee=_0x4396be;return $gameSystem[_0x3487ee(0x7f4)]()===0x1;},VisuMZ['CoreEngine'][_0x4396be(0x89d)]=Game_Temp['prototype']['initialize'],Game_Temp[_0x4396be(0x56f)][_0x4396be(0x480)]=function(){const _0x561b9e=_0x4396be;VisuMZ['CoreEngine'][_0x561b9e(0x89d)]['call'](this),this[_0x561b9e(0x64e)](),this[_0x561b9e(0x3b3)](),this[_0x561b9e(0x5f4)]();},Game_Temp[_0x4396be(0x56f)][_0x4396be(0x64e)]=function(){const _0xb17e98=_0x4396be;VisuMZ['CoreEngine'][_0xb17e98(0x624)][_0xb17e98(0x9e8)][_0xb17e98(0x9ea)]&&(this['_isPlaytest']=![]);},Game_Temp['prototype'][_0x4396be(0x25f)]=function(_0x21cd58){const _0x596026=_0x4396be;this[_0x596026(0x1ec)]=_0x21cd58;},Game_Temp[_0x4396be(0x56f)]['getLastPluginCommandInterpreter']=function(){const _0x249e51=_0x4396be;return this[_0x249e51(0x1ec)];},Game_Temp[_0x4396be(0x56f)]['clearForcedGameTroopSettingsCoreEngine']=function(){const _0x22243b=_0x4396be;this[_0x22243b(0x3a6)]=undefined,this[_0x22243b(0x50d)]=undefined,this[_0x22243b(0x4cb)]=undefined;},Game_Temp[_0x4396be(0x56f)]['applyForcedGameTroopSettingsCoreEngine']=function(_0x4756fa){const _0x2b3845=_0x4396be;$gameMap&&$dataMap&&$dataMap[_0x2b3845(0x531)]&&(_0x2b3845(0x5bf)===_0x2b3845(0x5bf)?this[_0x2b3845(0x644)]($dataMap[_0x2b3845(0x531)]):(this['_digitGrouping']=_0x5a6ff3['CoreEngine'][_0x2b3845(0x624)][_0x2b3845(0x9e8)][_0x2b3845(0x5b6)],this[_0x2b3845(0x2f8)]=_0x45899f['CoreEngine'][_0x2b3845(0x624)]['QoL'][_0x2b3845(0x236)]));const _0x151eb2=$dataTroops[_0x4756fa];if(_0x151eb2){let _0x12d93d=DataManager[_0x2b3845(0x192)](_0x151eb2['id']);this['parseForcedGameTroopSettingsCoreEngine'](_0x12d93d);}},Game_Temp[_0x4396be(0x56f)][_0x4396be(0x644)]=function(_0x4bb84c){const _0x5a0a92=_0x4396be;if(!_0x4bb84c)return;if(_0x4bb84c[_0x5a0a92(0x8e4)](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i))this[_0x5a0a92(0x3a6)]='FV';else{if(_0x4bb84c[_0x5a0a92(0x8e4)](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i))this['_forcedTroopView']='SV';else{if(_0x4bb84c[_0x5a0a92(0x8e4)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){if(_0x5a0a92(0x247)!=='Kikle'){const _0x24f50f=String(RegExp['$1']);if(_0x24f50f[_0x5a0a92(0x8e4)](/(?:FRONTVIEW|FRONT VIEW|FV)/i))this[_0x5a0a92(0x3a6)]='FV';else{if(_0x24f50f[_0x5a0a92(0x8e4)](/(?:SIDEVIEW|SIDE VIEW|SV)/i)){if(_0x5a0a92(0xe8)!==_0x5a0a92(0x4e8))this[_0x5a0a92(0x3a6)]='SV';else{if(this['EnableNameInput']()&&this[_0x5a0a92(0x6a8)][_0x5a0a92(0x258)]!=='keyboard')return _0x260273['getInputMultiButtonStrings']('pageup',_0x5a0a92(0x1c9));return _0x14933a[_0x5a0a92(0x56f)][_0x5a0a92(0x5c9)][_0x5a0a92(0x8ee)](this);}}}}else this[_0x5a0a92(0x6aa)]||this['_hovered']?this[_0x5a0a92(0x28d)]=0xff:(this[_0x5a0a92(0x28d)]+=this[_0x5a0a92(0x1c4)]?this[_0x5a0a92(0x407)]():-0x1*this[_0x5a0a92(0x407)](),this['opacity']=_0x50fdc7[_0x5a0a92(0x58b)](0xc0,this[_0x5a0a92(0x28d)]));}}}if(_0x4bb84c[_0x5a0a92(0x8e4)](/<(?:DTB)>/i))this[_0x5a0a92(0x50d)]=0x0;else{if(_0x4bb84c['match'](/<(?:TPB|ATB)[ ]ACTIVE>/i))this['_forcedBattleSys']=0x1;else{if(_0x4bb84c[_0x5a0a92(0x8e4)](/<(?:TPB|ATB)[ ]WAIT>/i))this['_forcedBattleSys']=0x2;else{if(_0x4bb84c['match'](/<(?:TPB|ATB)>/i))this[_0x5a0a92(0x50d)]=0x2;else{if(_0x4bb84c[_0x5a0a92(0x8e4)](/<(?:CTB)>/i)){if('jlAZL'!==_0x5a0a92(0x76a))this['_helpWindow'][_0x5a0a92(0x2dd)](_0x39d4dc[_0x5a0a92(0x83c)]['HelpBgType']);else{if(Imported['VisuMZ_2_BattleSystemCTB']){if(_0x5a0a92(0x15a)!=='olHIQ')return _0x4098fc(_0xbb045e)[_0x5a0a92(0x410)](_0x58fe19,_0x46a1fd);else this[_0x5a0a92(0x50d)]=_0x5a0a92(0x520);}}}else{if(_0x4bb84c[_0x5a0a92(0x8e4)](/<(?:STB)>/i)){if(Imported[_0x5a0a92(0x394)]){if('GZONg'!==_0x5a0a92(0x66e)){const _0x4b1287=this[_0x5a0a92(0x93b)](_0x3e1504),_0x36c103=new(_0x4b1287?_0x4f3caa:_0x46a305)(),_0x4a1a41=this[_0x5a0a92(0x8f1)](_0xf579fb);this[_0x5a0a92(0x76f)](_0x798129[0x0])&&(_0x502e40=!_0x25a102);_0x36c103[_0x5a0a92(0x85c)]=_0x23228d,_0x36c103[_0x5a0a92(0x3c9)](_0x4a1a41,_0x24492d,_0x399c0e,_0x4a11b6),_0x36c103[_0x5a0a92(0x1ca)](_0x59d033),this['addAnimationSpriteToContainer'](_0x36c103);if(this[_0x5a0a92(0x719)])this['_animationSprites'][_0x5a0a92(0x3b9)](_0x36c103);this[_0x5a0a92(0x93a)][_0x5a0a92(0x8ab)](_0x36c103);}else this['_forcedBattleSys']=_0x5a0a92(0x1f1);}}else{if(_0x4bb84c[_0x5a0a92(0x8e4)](/<(?:BTB)>/i))Imported[_0x5a0a92(0x503)]&&(_0x5a0a92(0x72b)!==_0x5a0a92(0x72b)?(_0x5ed854[_0x5a0a92(0x7c7)][_0x5a0a92(0x19b)]['call'](this,_0x1b84ae),_0x2e16be=this[_0x5a0a92(0x1f4)],_0x54adc8=this[_0x5a0a92(0x78a)],_0x145925=this[_0x5a0a92(0x274)]||this[_0x5a0a92(0x78a)][0x0]):this[_0x5a0a92(0x50d)]='BTB');else{if(_0x4bb84c['match'](/<(?:FTB)>/i))Imported['VisuMZ_2_BattleSystemFTB']&&('ykMOd'===_0x5a0a92(0x329)?this[_0x5a0a92(0x50d)]=_0x5a0a92(0x3fc):this[_0x5a0a92(0x2e6)][_0x5a0a92(0x6d4)]());else{if(_0x4bb84c[_0x5a0a92(0x8e4)](/<(?:OTB)>/i)){if(_0x5a0a92(0x698)!=='mtCXX'){if(Imported['VisuMZ_2_BattleSystemOTB']){if('JcMtE'==='YxPqb'){if(this[_0x5a0a92(0x42e)]===_0x138f72)this[_0x5a0a92(0x31a)]();const _0xa0047e=this[_0x5a0a92(0x42e)];if(_0xa0047e[_0x5a0a92(0x5cc)]<=0x0)return;_0xa0047e['current']=this[_0x5a0a92(0x12f)](_0xa0047e[_0x5a0a92(0x2b7)],_0xa0047e[_0x5a0a92(0x874)]),_0xa0047e[_0x5a0a92(0x5cc)]--,_0xa0047e['duration']<=0x0&&(_0xa0047e[_0x5a0a92(0x2b7)]=_0xa0047e[_0x5a0a92(0x874)]);}else this[_0x5a0a92(0x50d)]=_0x5a0a92(0x91f);}}else{let _0x18d2cd=0x0,_0x33aa0c=_0xada6f7[_0x5a0a92(0x21d)]-this[_0x5a0a92(0x694)](),_0xf19c63=_0x170341[_0x5a0a92(0x67f)],_0x4dd624=this['lineHeight']();return new _0xf609dc(_0x18d2cd,_0x33aa0c,_0xf19c63,_0x4dd624);}}else{if(_0x4bb84c[_0x5a0a92(0x8e4)](/<(?:ETB)>/i))'JAViO'===_0x5a0a92(0xe1)?Imported[_0x5a0a92(0x56b)]&&(this[_0x5a0a92(0x50d)]=_0x5a0a92(0x126)):_0x2d9930['isPressed'](_0x5a0a92(0x762))&&this[_0x5a0a92(0x5f7)]()?this[_0x5a0a92(0x808)]():this[_0x5a0a92(0x15e)](_0x1c3c77[_0x5a0a92(0x3c1)](_0x5a0a92(0x22e)));else{if(_0x4bb84c['match'](/<(?:PTB)>/i))Imported[_0x5a0a92(0x1e0)]&&('yLaXc'===_0x5a0a92(0x535)?this[_0x5a0a92(0x47e)](_0x3d3990[_0x5a0a92(0x789)]()['name'],_0x31fef5,_0x41397a,_0x240a06):this[_0x5a0a92(0x50d)]=_0x5a0a92(0x703));else{if(_0x4bb84c['match'](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x2225cf=String(RegExp['$1']);if(_0x2225cf['match'](/DTB/i)){if(_0x5a0a92(0x262)!==_0x5a0a92(0x9ff))this[_0x5a0a92(0x50d)]=0x0;else return _0x5d1fa4&&this[_0x5a0a92(0x97f)]?this[_0x5a0a92(0x97f)]['canEquip'](_0x2e84ff):_0xef7636[_0x5a0a92(0x7c7)][_0x5a0a92(0x8eb)][_0x5a0a92(0x8ee)](this,_0x3b249d);}else{if(_0x2225cf[_0x5a0a92(0x8e4)](/(?:TPB|ATB)[ ]ACTIVE/i))this[_0x5a0a92(0x50d)]=0x1;else{if(_0x2225cf[_0x5a0a92(0x8e4)](/(?:TPB|ATB)[ ]WAIT/i))this['_forcedBattleSys']=0x2;else{if(_0x2225cf[_0x5a0a92(0x8e4)](/CTB/i))Imported['VisuMZ_2_BattleSystemCTB']&&(this[_0x5a0a92(0x50d)]=_0x5a0a92(0x520));else{if(_0x2225cf['match'](/STB/i)){if(Imported[_0x5a0a92(0x394)]){if('nBwHd'===_0x5a0a92(0x7bd)){var _0x4cfb90=_0xff477a(_0x46d353['$1']);_0x32b91f+=_0x4cfb90;}else this[_0x5a0a92(0x50d)]=_0x5a0a92(0x1f1);}}else{if(_0x2225cf[_0x5a0a92(0x8e4)](/BTB/i))Imported[_0x5a0a92(0x503)]&&(this['_forcedBattleSys']=_0x5a0a92(0x387));else{if(_0x2225cf[_0x5a0a92(0x8e4)](/FTB/i)){if(_0x5a0a92(0x3dd)!==_0x5a0a92(0x3dd)){let _0x113866='sparam'+_0x4d0c44+_0x5a0a92(0x828);if(this[_0x5a0a92(0x41a)](_0x113866))return this[_0x5a0a92(0x165)][_0x113866];return this[_0x5a0a92(0x165)][_0x113866]=_0xa1b502[_0x5a0a92(0x7c7)]['Settings'][_0x5a0a92(0xa0e)]['SParameterFormula'][_0x5a0a92(0x8ee)](this,_0x3e843d),this['_cache'][_0x113866];}else Imported[_0x5a0a92(0x53b)]&&(this[_0x5a0a92(0x50d)]=_0x5a0a92(0x3fc));}else{if(_0x2225cf[_0x5a0a92(0x8e4)](/OTB/i)){if(_0x5a0a92(0x3ec)!==_0x5a0a92(0x3ec)){if(_0x3a1f46[_0x5a0a92(0x8e4)](/backspace/i))return this['_inputSpecialKeyCode']===0x8;if(_0x17d27a[_0x5a0a92(0x8e4)](/enter/i))return this[_0x5a0a92(0x782)]===0xd;if(_0xf4fffb[_0x5a0a92(0x8e4)](/escape/i))return this[_0x5a0a92(0x782)]===0x1b;}else Imported[_0x5a0a92(0x83b)]&&(this['_forcedBattleSys']=_0x5a0a92(0x91f));}else{if(_0x2225cf[_0x5a0a92(0x8e4)](/ETB/i))Imported[_0x5a0a92(0x56b)]&&(this[_0x5a0a92(0x50d)]=_0x5a0a92(0x126));else _0x2225cf[_0x5a0a92(0x8e4)](/PTB/i)&&(Imported[_0x5a0a92(0x1e0)]&&(this['_forcedBattleSys']=_0x5a0a92(0x703)));}}}}}}}}}}}}}}}}}}}}if(_0x4bb84c[_0x5a0a92(0x8e4)](/<(?:|BATTLE )GRID>/i))_0x5a0a92(0x395)!==_0x5a0a92(0x395)?_0x222022(_0x3fca0e):this[_0x5a0a92(0x4cb)]=!![];else _0x4bb84c[_0x5a0a92(0x8e4)](/<NO (?:|BATTLE )GRID>/i)&&(_0x5a0a92(0x668)===_0x5a0a92(0x668)?this[_0x5a0a92(0x4cb)]=![]:this[_0x5a0a92(0x5b9)]());},Game_Temp[_0x4396be(0x56f)]['createFauxAnimationQueue']=function(){this['_fauxAnimationQueue']=[];},Game_Temp[_0x4396be(0x56f)][_0x4396be(0x9c6)]=function(_0x57032e,_0x4578fb,_0x17f83c,_0x4398af){const _0x7136bd=_0x4396be;if(!this['showFauxAnimations']())return;_0x17f83c=_0x17f83c||![],_0x4398af=_0x4398af||![];if($dataAnimations[_0x4578fb]){if('rVjbM'!==_0x7136bd(0x904))return _0x27023f['outlineColorDmg']();else{const _0x2d87c5={'targets':_0x57032e,'animationId':_0x4578fb,'mirror':_0x17f83c,'mute':_0x4398af};this[_0x7136bd(0x106)][_0x7136bd(0x8ab)](_0x2d87c5);for(const _0x14a088 of _0x57032e){if(_0x14a088[_0x7136bd(0x8e0)]){if('lEUtV'===_0x7136bd(0xa10))_0x14a088[_0x7136bd(0x8e0)]();else return _0x493efc[_0x7136bd(0x7c7)][_0x7136bd(0x624)]['QoL'][_0x7136bd(0x7ec)]&&this[_0x7136bd(0xe4)]()[_0x7136bd(0x10b)]()?this[_0x7136bd(0xe4)]()[_0x7136bd(0x38a)]+0.05:this[_0x7136bd(0xe4)]()[_0x7136bd(0x38a)];}}}}},Game_Temp[_0x4396be(0x56f)][_0x4396be(0x900)]=function(){return!![];},Game_Temp[_0x4396be(0x56f)]['retrieveFauxAnimation']=function(){const _0x56f1ce=_0x4396be;return this[_0x56f1ce(0x106)][_0x56f1ce(0x762)]();},Game_Temp[_0x4396be(0x56f)][_0x4396be(0x5f4)]=function(){const _0x43848e=_0x4396be;this[_0x43848e(0x46d)]=[];},Game_Temp[_0x4396be(0x56f)][_0x4396be(0x636)]=function(_0x377942,_0x4dec9c,_0x447b22,_0x385d19,_0x1fba04){const _0x360806=_0x4396be;if(!this[_0x360806(0x547)]())return;_0x385d19=_0x385d19||![],_0x1fba04=_0x1fba04||![];if($dataAnimations[_0x447b22]){if(_0x360806(0x542)!==_0x360806(0x26c)){const _0x54925a={'x':_0x377942,'y':_0x4dec9c,'animationId':_0x447b22,'mirror':_0x385d19,'mute':_0x1fba04};this[_0x360806(0x46d)][_0x360806(0x8ab)](_0x54925a);}else _0x2dbf84[_0x360806(0x56f)]['update']['call'](this),this[_0x360806(0x957)](),this[_0x360806(0x522)]();}},Game_Temp[_0x4396be(0x56f)][_0x4396be(0x547)]=function(){return!![];},Game_Temp['prototype'][_0x4396be(0x75c)]=function(){const _0x2bb971=_0x4396be;return this[_0x2bb971(0x46d)][_0x2bb971(0x762)]();},VisuMZ[_0x4396be(0x7c7)]['Game_System_initialize']=Game_System[_0x4396be(0x56f)][_0x4396be(0x480)],Game_System[_0x4396be(0x56f)]['initialize']=function(){const _0x74d77d=_0x4396be;VisuMZ['CoreEngine'][_0x74d77d(0x91a)][_0x74d77d(0x8ee)](this),this[_0x74d77d(0x308)]();},Game_System[_0x4396be(0x56f)][_0x4396be(0x308)]=function(){const _0x2955e3=_0x4396be;this[_0x2955e3(0x4bf)]={'SideView':$dataSystem['optSideView'],'BattleSystem':this['initialBattleSystem'](),'FontSize':$dataSystem[_0x2955e3(0x75d)][_0x2955e3(0x35f)],'Padding':0xc};},Game_System['prototype'][_0x4396be(0x200)]=function(){const _0x23f32a=_0x4396be;if($gameTemp['_forcedTroopView']==='SV')return!![];else{if($gameTemp[_0x23f32a(0x3a6)]==='FV')return![];}if(this[_0x23f32a(0x4bf)]===undefined)this[_0x23f32a(0x308)]();if(this['_CoreEngineSettings']['SideView']===undefined)this['initCoreEngine']();return this[_0x23f32a(0x4bf)]['SideView'];},Game_System[_0x4396be(0x56f)]['setSideView']=function(_0x529b60){const _0x499592=_0x4396be;if(this[_0x499592(0x4bf)]===undefined)this[_0x499592(0x308)]();if(this[_0x499592(0x4bf)][_0x499592(0x978)]===undefined)this[_0x499592(0x308)]();this[_0x499592(0x4bf)]['SideView']=_0x529b60;},Game_System[_0x4396be(0x56f)][_0x4396be(0x3e3)]=function(){const _0x350bd3=_0x4396be;if(this[_0x350bd3(0x4bf)]===undefined)this[_0x350bd3(0x308)]();this[_0x350bd3(0x4bf)][_0x350bd3(0x88e)]=this['initialBattleSystem']();},Game_System[_0x4396be(0x56f)][_0x4396be(0x800)]=function(){const _0x591603=_0x4396be,_0x411925=(VisuMZ[_0x591603(0x7c7)]['Settings'][_0x591603(0x88e)]||_0x591603(0x25a))[_0x591603(0x569)]()[_0x591603(0x8b0)]();return VisuMZ[_0x591603(0x7c7)][_0x591603(0x3fd)](_0x411925);},Game_System[_0x4396be(0x56f)][_0x4396be(0x7f4)]=function(){const _0x4e10e8=_0x4396be;if($gameTemp[_0x4e10e8(0x50d)]!==undefined)return $gameTemp['_forcedBattleSys'];if(this[_0x4e10e8(0x4bf)]===undefined)this[_0x4e10e8(0x308)]();if(this[_0x4e10e8(0x4bf)][_0x4e10e8(0x88e)]===undefined)this[_0x4e10e8(0x3e3)]();return this['_CoreEngineSettings'][_0x4e10e8(0x88e)];},Game_System[_0x4396be(0x56f)]['setBattleSystem']=function(_0x35ebc9){const _0x1c7888=_0x4396be;if(this['_CoreEngineSettings']===undefined)this[_0x1c7888(0x308)]();if(this[_0x1c7888(0x4bf)]['BattleSystem']===undefined)this[_0x1c7888(0x3e3)]();this['_CoreEngineSettings'][_0x1c7888(0x88e)]=_0x35ebc9;},Game_System['prototype'][_0x4396be(0x8aa)]=function(){const _0x497e88=_0x4396be;if(this['_CoreEngineSettings']===undefined)this[_0x497e88(0x308)]();if(this[_0x497e88(0x4bf)][_0x497e88(0x528)]===undefined)this['initCoreEngine']();return this[_0x497e88(0x4bf)][_0x497e88(0x528)];},Game_System['prototype']['setMainFontSize']=function(_0x21b789){const _0x30bc48=_0x4396be;if(this[_0x30bc48(0x4bf)]===undefined)this['initCoreEngine']();if(this[_0x30bc48(0x4bf)][_0x30bc48(0x277)]===undefined)this['initCoreEngine']();this[_0x30bc48(0x4bf)][_0x30bc48(0x528)]=_0x21b789;},Game_System['prototype']['windowPadding']=function(){const _0x431820=_0x4396be;if(this[_0x431820(0x4bf)]===undefined)this[_0x431820(0x308)]();if(this[_0x431820(0x4bf)]['Padding']===undefined)this[_0x431820(0x308)]();return this['_CoreEngineSettings'][_0x431820(0x4d2)];},Game_System[_0x4396be(0x56f)]['setWindowPadding']=function(_0x32f23e){const _0x3d97e5=_0x4396be;if(this['_CoreEngineSettings']===undefined)this['initCoreEngine']();if(this[_0x3d97e5(0x4bf)]['TimeProgress']===undefined)this['initCoreEngine']();this[_0x3d97e5(0x4bf)][_0x3d97e5(0x4d2)]=_0x32f23e;},VisuMZ['CoreEngine'][_0x4396be(0x5bc)]=Game_Screen[_0x4396be(0x56f)][_0x4396be(0x480)],Game_Screen[_0x4396be(0x56f)][_0x4396be(0x480)]=function(){const _0x2a27a9=_0x4396be;VisuMZ[_0x2a27a9(0x7c7)][_0x2a27a9(0x5bc)]['call'](this),this[_0x2a27a9(0x214)]();},Game_Screen[_0x4396be(0x56f)]['initCoreEngineScreenShake']=function(){const _0x4156e5=_0x4396be,_0x87c1da=VisuMZ[_0x4156e5(0x7c7)][_0x4156e5(0x624)][_0x4156e5(0x83f)];this['_coreEngineShakeStyle']=_0x87c1da?.[_0x4156e5(0x1c8)]||'random';},Game_Screen[_0x4396be(0x56f)]['getCoreEngineScreenShakeStyle']=function(){const _0x1360ee=_0x4396be;if(this[_0x1360ee(0x997)]===undefined)this[_0x1360ee(0x214)]();return this[_0x1360ee(0x997)];},Game_Screen['prototype'][_0x4396be(0xa05)]=function(_0x1b54ac){const _0x149fea=_0x4396be;if(this[_0x149fea(0x997)]===undefined)this[_0x149fea(0x214)]();this[_0x149fea(0x997)]=_0x1b54ac[_0x149fea(0xd2)]()['trim']();},Game_Picture[_0x4396be(0x56f)][_0x4396be(0x21c)]=function(){const _0x2e9b0f=_0x4396be;if($gameParty['inBattle']())return![];return this[_0x2e9b0f(0x8d6)]()&&this['onlyfilename']()[_0x2e9b0f(0x45f)](0x0)==='!';},Game_Picture[_0x4396be(0x56f)]['onlyfilename']=function(){const _0x1af7c7=_0x4396be;return this[_0x1af7c7(0x6d6)][_0x1af7c7(0x3b0)]('/')[_0x1af7c7(0x129)]();},VisuMZ['CoreEngine']['Game_Picture_x']=Game_Picture['prototype']['x'],Game_Picture[_0x4396be(0x56f)]['x']=function(){const _0x3e0006=_0x4396be;if(this[_0x3e0006(0x21c)]()){if(_0x3e0006(0x660)===_0x3e0006(0x660))return this[_0x3e0006(0x1cc)]();else{const _0x3e854c=_0x5b9d7f[_0x3e0006(0x67f)]/this[_0x3e0006(0x8f9)]();_0x3e854c%0x1!==0x0&&_0x2c9d84[_0x3e0006(0x421)](_0x3e854c)===this[_0x3e0006(0x67f)]()&&!this['isLoopHorizontal']()&&(this['_centerCameraCheck'][_0x3e0006(0x7e4)]=!![],this[_0x3e0006(0x763)][_0x3e0006(0x4b7)]=_0xeeb3d3[_0x3e0006(0x9ae)]||0x0);}}else{if(_0x3e0006(0x696)===_0x3e0006(0x696))return VisuMZ[_0x3e0006(0x7c7)][_0x3e0006(0x525)][_0x3e0006(0x8ee)](this);else _0x1fc393[_0x3e0006(0x7c7)][_0x3e0006(0x89d)][_0x3e0006(0x8ee)](this),this[_0x3e0006(0x64e)](),this[_0x3e0006(0x3b3)](),this[_0x3e0006(0x5f4)]();}},Game_Picture['prototype'][_0x4396be(0x1cc)]=function(){const _0x554e3a=_0x4396be,_0x3c8983=$gameMap[_0x554e3a(0x4b7)]()*$gameMap['tileWidth']();return(this['_x']-_0x3c8983)*$gameScreen[_0x554e3a(0x724)]();},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x3c3)]=Game_Picture[_0x4396be(0x56f)]['y'],Game_Picture['prototype']['y']=function(){const _0x4a5014=_0x4396be;if(this['isMapScrollLinked']()){if('DXRuj'!==_0x4a5014(0x848))this[_0x4a5014(0x20e)]['x']=_0x48b6eb[_0x4a5014(0x20e)]()['x'],this['anchor']['y']=_0x1f235c['anchor']()['y'];else return this[_0x4a5014(0x377)]();}else return VisuMZ[_0x4a5014(0x7c7)][_0x4a5014(0x3c3)][_0x4a5014(0x8ee)](this);},Game_Picture[_0x4396be(0x56f)][_0x4396be(0x377)]=function(){const _0x4e35d9=_0x4396be,_0x4244dc=$gameMap[_0x4e35d9(0x856)]()*$gameMap[_0x4e35d9(0x722)]();return(this['_y']-_0x4244dc)*$gameScreen[_0x4e35d9(0x724)]();},VisuMZ['CoreEngine']['Game_Picture_scaleX']=Game_Picture[_0x4396be(0x56f)]['scaleX'],Game_Picture[_0x4396be(0x56f)][_0x4396be(0x3a3)]=function(){const _0x1b0ba6=_0x4396be;let _0x386d34=VisuMZ[_0x1b0ba6(0x7c7)][_0x1b0ba6(0x903)]['call'](this);return this['isMapScrollLinked']()&&(_0x1b0ba6(0x90c)===_0x1b0ba6(0x90c)?_0x386d34*=$gameScreen[_0x1b0ba6(0x724)]():this[_0x1b0ba6(0x151)](_0x1ba167)),_0x386d34;},VisuMZ[_0x4396be(0x7c7)]['Game_Picture_scaleY']=Game_Picture['prototype'][_0x4396be(0x7f0)],Game_Picture[_0x4396be(0x56f)][_0x4396be(0x7f0)]=function(){const _0x409057=_0x4396be;let _0x454bd4=VisuMZ['CoreEngine'][_0x409057(0x76b)]['call'](this);return this[_0x409057(0x21c)]()&&(_0x454bd4*=$gameScreen[_0x409057(0x724)]()),_0x454bd4;},Game_Picture[_0x4396be(0x56f)][_0x4396be(0x7bc)]=function(_0x32baaa){this['_coreEasingType']=_0x32baaa;},VisuMZ['CoreEngine'][_0x4396be(0x14d)]=Game_Picture[_0x4396be(0x56f)][_0x4396be(0x413)],Game_Picture[_0x4396be(0x56f)][_0x4396be(0x413)]=function(_0x298d5d){const _0x4b2cf5=_0x4396be;return this[_0x4b2cf5(0x8a0)]=this['_coreEasingType']||0x0,[0x0,0x1,0x2,0x3][_0x4b2cf5(0x897)](this[_0x4b2cf5(0x8a0)])?VisuMZ[_0x4b2cf5(0x7c7)]['Game_Picture_calcEasing'][_0x4b2cf5(0x8ee)](this,_0x298d5d):VisuMZ['ApplyEasing'](_0x298d5d,this[_0x4b2cf5(0x8a0)]);},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x4a2)]=Game_Picture[_0x4396be(0x56f)]['initRotation'],Game_Picture[_0x4396be(0x56f)][_0x4396be(0x70b)]=function(){const _0x1a8b21=_0x4396be;VisuMZ[_0x1a8b21(0x7c7)][_0x1a8b21(0x4a2)][_0x1a8b21(0x8ee)](this),this['initRotationCoreEngine']();},Game_Picture[_0x4396be(0x56f)][_0x4396be(0x31a)]=function(){const _0x23d32e=_0x4396be;this[_0x23d32e(0x42e)]={'current':0x0,'target':0x0,'duration':0x0,'wholeDuration':0x0,'easingType':_0x23d32e(0x84b)};},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x27c)]=Game_Picture[_0x4396be(0x56f)]['angle'],Game_Picture[_0x4396be(0x56f)]['angle']=function(){const _0x1298cb=_0x4396be;let _0xebabf7=VisuMZ[_0x1298cb(0x7c7)]['Game_Picture_angle'][_0x1298cb(0x8ee)](this);return _0xebabf7+=this[_0x1298cb(0x4f8)](),_0xebabf7;},Game_Picture['prototype']['anglePlus']=function(){const _0x24782b=_0x4396be;if(this[_0x24782b(0x42e)]===undefined)this[_0x24782b(0x31a)]();return this[_0x24782b(0x42e)][_0x24782b(0x2b7)]||0x0;},Game_Picture[_0x4396be(0x56f)][_0x4396be(0x211)]=function(_0x35813f,_0x1dd5bc,_0x1c0763){const _0x1872e3=_0x4396be;if(this[_0x1872e3(0x42e)]===undefined)this[_0x1872e3(0x31a)]();this[_0x1872e3(0x42e)][_0x1872e3(0x874)]=_0x35813f||0x0,this[_0x1872e3(0x42e)][_0x1872e3(0x5cc)]=_0x1dd5bc||0x0,this[_0x1872e3(0x42e)][_0x1872e3(0x161)]=_0x1dd5bc||0x0,this[_0x1872e3(0x42e)][_0x1872e3(0x152)]=_0x1c0763||_0x1872e3(0x84b),_0x1dd5bc<=0x0&&(this[_0x1872e3(0x42e)]['current']=this[_0x1872e3(0x42e)]['target']);},Game_Picture[_0x4396be(0x56f)]['changeAnglePlusData']=function(_0x450f3c,_0x26d415,_0x32023b){const _0xace9d7=_0x4396be;if(this[_0xace9d7(0x42e)]===undefined)this['initRotationCoreEngine']();this[_0xace9d7(0x42e)][_0xace9d7(0x874)]+=_0x450f3c||0x0,this[_0xace9d7(0x42e)]['duration']=_0x26d415||0x0,this[_0xace9d7(0x42e)][_0xace9d7(0x161)]=_0x26d415||0x0,this[_0xace9d7(0x42e)][_0xace9d7(0x152)]=_0x32023b||_0xace9d7(0x84b),_0x26d415<=0x0&&(_0xace9d7(0x92f)!==_0xace9d7(0x5b5)?this[_0xace9d7(0x42e)][_0xace9d7(0x2b7)]=this[_0xace9d7(0x42e)][_0xace9d7(0x874)]:(this['_helpWindow']&&this[_0xace9d7(0x746)][_0xace9d7(0x2dd)](_0x3c8136[_0xace9d7(0x83c)][_0xace9d7(0x3b8)]),this[_0xace9d7(0x486)]&&this['_listWindow'][_0xace9d7(0x2dd)](_0x54d8b3[_0xace9d7(0x83c)][_0xace9d7(0x7f6)])));},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x6d0)]=Game_Picture[_0x4396be(0x56f)][_0x4396be(0x4e9)],Game_Picture[_0x4396be(0x56f)][_0x4396be(0x4e9)]=function(){const _0xec2ec2=_0x4396be;VisuMZ[_0xec2ec2(0x7c7)]['Game_Picture_updateRotation'][_0xec2ec2(0x8ee)](this),this['updateAnglePlus']();},Game_Picture[_0x4396be(0x56f)]['updateAnglePlus']=function(){const _0x3e2ce4=_0x4396be;if(this[_0x3e2ce4(0x42e)]===undefined)this[_0x3e2ce4(0x31a)]();const _0xd9dfff=this['_anglePlus'];if(_0xd9dfff[_0x3e2ce4(0x5cc)]<=0x0)return;_0xd9dfff[_0x3e2ce4(0x2b7)]=this[_0x3e2ce4(0x12f)](_0xd9dfff['current'],_0xd9dfff['target']),_0xd9dfff['duration']--;if(_0xd9dfff[_0x3e2ce4(0x5cc)]<=0x0){if(_0x3e2ce4(0x5f1)!==_0x3e2ce4(0x9e1))_0xd9dfff[_0x3e2ce4(0x2b7)]=_0xd9dfff['target'];else{if(this[_0x3e2ce4(0x240)][_0x3e2ce4(0x477)]())return![];return _0x5ea449[_0x3e2ce4(0x7c7)]['BattleManager_checkSubstitute'][_0x3e2ce4(0x8ee)](this,_0x12f9bb);}}},Game_Picture[_0x4396be(0x56f)][_0x4396be(0x12f)]=function(_0x18b075,_0x391bf8){const _0x3d4175=_0x4396be,_0x2765ed=this[_0x3d4175(0x42e)],_0x2d4d60=_0x2765ed[_0x3d4175(0x152)],_0x6636d9=_0x2765ed[_0x3d4175(0x5cc)],_0x4e0638=_0x2765ed[_0x3d4175(0x161)],_0x5225ef=VisuMZ[_0x3d4175(0x5ae)]((_0x4e0638-_0x6636d9)/_0x4e0638,_0x2d4d60),_0x479f85=VisuMZ['ApplyEasing']((_0x4e0638-_0x6636d9+0x1)/_0x4e0638,_0x2d4d60),_0x41639a=(_0x18b075-_0x391bf8*_0x5225ef)/(0x1-_0x5225ef);return _0x41639a+(_0x391bf8-_0x41639a)*_0x479f85;},VisuMZ[_0x4396be(0x7c7)]['Game_Action_itemHit']=Game_Action['prototype']['itemHit'],Game_Action[_0x4396be(0x56f)]['itemHit']=function(_0x2ea69d){const _0xb3b214=_0x4396be;if(VisuMZ['CoreEngine'][_0xb3b214(0x624)][_0xb3b214(0x9e8)]['ImprovedAccuracySystem'])return this[_0xb3b214(0x7ad)](_0x2ea69d);else{if(_0xb3b214(0x77a)!==_0xb3b214(0x77a))this[_0xb3b214(0x81c)](_0x56e2ce);else return VisuMZ[_0xb3b214(0x7c7)][_0xb3b214(0x578)][_0xb3b214(0x8ee)](this,_0x2ea69d);}},Game_Action[_0x4396be(0x56f)][_0x4396be(0x7ad)]=function(_0x3ed354){const _0x35967c=_0x4396be,_0x45dca9=this['itemSuccessRate'](_0x3ed354),_0x442d9f=this['subjectHitRate'](_0x3ed354),_0x2fda3f=this[_0x35967c(0x79e)](_0x3ed354);return _0x45dca9*(_0x442d9f-_0x2fda3f);},VisuMZ['CoreEngine'][_0x4396be(0x1e6)]=Game_Action[_0x4396be(0x56f)][_0x4396be(0x3af)],Game_Action[_0x4396be(0x56f)]['itemEva']=function(_0x3a5f89){const _0x522f75=_0x4396be;return VisuMZ['CoreEngine']['Settings']['QoL'][_0x522f75(0x94d)]?0x0:_0x522f75(0x517)!=='FciHF'?VisuMZ[_0x522f75(0x7c7)][_0x522f75(0x1e6)][_0x522f75(0x8ee)](this,_0x3a5f89):_0x522f75(0x3b4);},Game_Action[_0x4396be(0x56f)][_0x4396be(0x60b)]=function(_0x41c557){const _0x212759=_0x4396be;return this[_0x212759(0x1fc)]()[_0x212759(0x9d5)]*0.01;},Game_Action['prototype'][_0x4396be(0x8fb)]=function(_0x3097d2){const _0x352a51=_0x4396be;if(VisuMZ[_0x352a51(0x7c7)][_0x352a51(0x624)][_0x352a51(0x9e8)][_0x352a51(0x7ec)]&&this[_0x352a51(0x352)]())return 0x1;if(this[_0x352a51(0x284)]())return VisuMZ['CoreEngine']['Settings']['QoL'][_0x352a51(0x7ec)]&&this[_0x352a51(0xe4)]()[_0x352a51(0x10b)]()?this[_0x352a51(0xe4)]()['hit']+0.05:this['subject']()[_0x352a51(0x38a)];else{if(_0x352a51(0x6eb)===_0x352a51(0x7ef)){const _0x4b29dd=this[_0x352a51(0x6cc)]();!_0x4b29dd[_0x352a51(0x20e)]()?_0x100bec[_0x352a51(0x7c7)][_0x352a51(0x34c)]['call'](this):(this[_0x352a51(0x20e)]['x']=_0x4b29dd[_0x352a51(0x20e)]()['x'],this[_0x352a51(0x20e)]['y']=_0x4b29dd['anchor']()['y']);}else return 0x1;}},Game_Action['prototype'][_0x4396be(0x79e)]=function(_0xa225f3){const _0x2253d=_0x4396be;if(this[_0x2253d(0xe4)]()[_0x2253d(0x10b)]()===_0xa225f3[_0x2253d(0x10b)]())return 0x0;if(this[_0x2253d(0x284)]())return VisuMZ[_0x2253d(0x7c7)][_0x2253d(0x624)][_0x2253d(0x9e8)][_0x2253d(0x7ec)]&&_0xa225f3[_0x2253d(0x109)]()?_0xa225f3[_0x2253d(0x283)]-0.05:_0xa225f3['eva'];else{if(this[_0x2253d(0x571)]())return _0xa225f3[_0x2253d(0x962)];else{if(_0x2253d(0x597)!==_0x2253d(0x597)){if(this[_0x2253d(0x997)]===_0x2d15e1)this[_0x2253d(0x214)]();return this[_0x2253d(0x997)];}else return 0x0;}}},VisuMZ[_0x4396be(0x7c7)]['Game_Action_updateLastTarget']=Game_Action[_0x4396be(0x56f)][_0x4396be(0x56c)],Game_Action['prototype'][_0x4396be(0x56c)]=function(_0x318ae7){const _0x59daa4=_0x4396be;VisuMZ[_0x59daa4(0x7c7)][_0x59daa4(0x8a3)]['call'](this,_0x318ae7);if(VisuMZ[_0x59daa4(0x7c7)][_0x59daa4(0x624)][_0x59daa4(0x9e8)][_0x59daa4(0x94d)])return;const _0xa491eb=_0x318ae7['result']();if(_0xa491eb['missed']){if(_0x59daa4(0x22d)==='dTGUM')0x1-this[_0x59daa4(0x3af)](_0x318ae7)>this['itemHit'](_0x318ae7)&&(_0xa491eb[_0x59daa4(0x1cb)]=![],_0xa491eb[_0x59daa4(0x434)]=!![]);else return this[_0x59daa4(0xe4)]()['hit']+0.05;}},VisuMZ[_0x4396be(0x7c7)]['Game_BattlerBase_initMembers']=Game_BattlerBase[_0x4396be(0x56f)][_0x4396be(0x82a)],Game_BattlerBase[_0x4396be(0x56f)][_0x4396be(0x82a)]=function(){const _0x561992=_0x4396be;this['_cache']={},VisuMZ['CoreEngine']['Game_BattlerBase_initMembers'][_0x561992(0x8ee)](this);},VisuMZ['CoreEngine'][_0x4396be(0x4d0)]=Game_BattlerBase[_0x4396be(0x56f)]['refresh'],Game_BattlerBase[_0x4396be(0x56f)][_0x4396be(0x813)]=function(){const _0x4f3c53=_0x4396be;this[_0x4f3c53(0x165)]={},VisuMZ[_0x4f3c53(0x7c7)][_0x4f3c53(0x4d0)]['call'](this);},Game_BattlerBase[_0x4396be(0x56f)][_0x4396be(0x41a)]=function(_0x26174a){const _0x55f672=_0x4396be;return this['_cache']=this[_0x55f672(0x165)]||{},this[_0x55f672(0x165)][_0x26174a]!==undefined;},Game_BattlerBase[_0x4396be(0x56f)][_0x4396be(0x2bd)]=function(_0x2b4d9a){const _0x1e2687=_0x4396be,_0x476c0a=(_0xf2f69a,_0x4d6e17)=>{const _0x19a21d=_0x43c9;if(!_0x4d6e17)return _0xf2f69a;if(_0x4d6e17[_0x19a21d(0x531)]['match'](VisuMZ[_0x19a21d(0x7c7)][_0x19a21d(0x39c)][_0x19a21d(0x2bd)][_0x2b4d9a])){var _0x39a957=Number(RegExp['$1']);_0xf2f69a+=_0x39a957;}if(_0x4d6e17[_0x19a21d(0x531)]['match'](VisuMZ[_0x19a21d(0x7c7)][_0x19a21d(0x39c)][_0x19a21d(0x2d2)][_0x2b4d9a])){if(_0x19a21d(0x427)===_0x19a21d(0x427)){var _0x52574f=String(RegExp['$1']);try{_0xf2f69a+=eval(_0x52574f);}catch(_0x27781c){if(_0x19a21d(0x4b8)===_0x19a21d(0x4b8)){if($gameTemp['isPlaytest']())console[_0x19a21d(0x6cd)](_0x27781c);}else this[_0x19a21d(0x106)]=[];}}else _0x134d94[_0x19a21d(0x7c7)][_0x19a21d(0x924)][_0x19a21d(0x8ee)](this),_0x3cc4f1=this;}return _0xf2f69a;};return this[_0x1e2687(0xf5)]()[_0x1e2687(0x307)](_0x476c0a,this[_0x1e2687(0x6a5)][_0x2b4d9a]);},Game_BattlerBase[_0x4396be(0x56f)][_0x4396be(0x3eb)]=function(_0x5d5a4c){const _0x57d2ad=_0x4396be;var _0x20d7f6='Basic'+(this[_0x57d2ad(0x10b)]()?_0x57d2ad(0x82e):_0x57d2ad(0x3a5))+'ParamMax'+_0x5d5a4c;if(this[_0x57d2ad(0x41a)](_0x20d7f6))return this[_0x57d2ad(0x165)][_0x20d7f6];this[_0x57d2ad(0x165)][_0x20d7f6]=eval(VisuMZ[_0x57d2ad(0x7c7)][_0x57d2ad(0x624)]['Param'][_0x20d7f6]);const _0x4d3283=(_0x5498e0,_0x526148)=>{const _0x3dcb77=_0x57d2ad;if(!_0x526148)return _0x5498e0;if(_0x526148[_0x3dcb77(0x531)][_0x3dcb77(0x8e4)](VisuMZ[_0x3dcb77(0x7c7)]['RegExp'][_0x3dcb77(0x3eb)][_0x5d5a4c])){if(_0x3dcb77(0x424)==='dSPpc')for(const _0x5c01d3 of _0x4b5220[_0x3dcb77(0x70d)]){const _0x245d13=new _0x3e1b24(_0x5c01d3);this[_0x3dcb77(0x19c)](_0x245d13);}else{var _0x5705da=Number(RegExp['$1']);if(_0x5705da===0x0)_0x5705da=Number[_0x3dcb77(0x83d)];_0x5498e0=Math['max'](_0x5498e0,_0x5705da);}}if(_0x526148[_0x3dcb77(0x531)][_0x3dcb77(0x8e4)](VisuMZ[_0x3dcb77(0x7c7)][_0x3dcb77(0x39c)]['paramMaxJS'][_0x5d5a4c])){var _0x48a3da=String(RegExp['$1']);try{if('RpDfV'==='leVeU')return!![];else _0x5498e0=Math[_0x3dcb77(0x8cd)](_0x5498e0,Number(eval(_0x48a3da)));}catch(_0x520500){if($gameTemp[_0x3dcb77(0x863)]())console[_0x3dcb77(0x6cd)](_0x520500);}}return _0x5498e0;};if(this[_0x57d2ad(0x165)][_0x20d7f6]===0x0)this[_0x57d2ad(0x165)][_0x20d7f6]=Number[_0x57d2ad(0x83d)];return this[_0x57d2ad(0x165)][_0x20d7f6]=this[_0x57d2ad(0xf5)]()[_0x57d2ad(0x307)](_0x4d3283,this['_cache'][_0x20d7f6]),this['_cache'][_0x20d7f6];},Game_BattlerBase[_0x4396be(0x56f)][_0x4396be(0x9a1)]=function(_0x830487){const _0x35ea79=_0x4396be,_0x41fc94=this[_0x35ea79(0x382)](Game_BattlerBase[_0x35ea79(0x67c)],_0x830487),_0x56abaa=(_0x14ee9f,_0x4a7d43)=>{const _0x30a65e=_0x35ea79;if(!_0x4a7d43)return _0x14ee9f;if(_0x4a7d43[_0x30a65e(0x531)]['match'](VisuMZ['CoreEngine']['RegExp'][_0x30a65e(0x8d9)][_0x830487])){var _0x488642=Number(RegExp['$1'])/0x64;_0x14ee9f*=_0x488642;}if(_0x4a7d43[_0x30a65e(0x531)][_0x30a65e(0x8e4)](VisuMZ['CoreEngine'][_0x30a65e(0x39c)][_0x30a65e(0x6e4)][_0x830487])){var _0x488642=Number(RegExp['$1']);_0x14ee9f*=_0x488642;}if(_0x4a7d43['note']['match'](VisuMZ[_0x30a65e(0x7c7)][_0x30a65e(0x39c)]['paramRateJS'][_0x830487])){var _0x47b730=String(RegExp['$1']);try{_0x14ee9f*=eval(_0x47b730);}catch(_0x2a7303){if($gameTemp['isPlaytest']())console[_0x30a65e(0x6cd)](_0x2a7303);}}return _0x14ee9f;};return this[_0x35ea79(0xf5)]()['reduce'](_0x56abaa,_0x41fc94);},Game_BattlerBase['prototype'][_0x4396be(0x72d)]=function(_0x54c95a){const _0x147508=_0x4396be,_0x220da4=(_0x472ed8,_0x3197ae)=>{const _0x4314c1=_0x43c9;if(!_0x3197ae)return _0x472ed8;if(_0x3197ae[_0x4314c1(0x531)][_0x4314c1(0x8e4)](VisuMZ[_0x4314c1(0x7c7)][_0x4314c1(0x39c)][_0x4314c1(0x406)][_0x54c95a])){var _0xc086ab=Number(RegExp['$1']);_0x472ed8+=_0xc086ab;}if(_0x3197ae[_0x4314c1(0x531)]['match'](VisuMZ[_0x4314c1(0x7c7)]['RegExp']['paramFlatJS'][_0x54c95a])){if(_0x4314c1(0x4fb)===_0x4314c1(0x4fb)){var _0x136b72=String(RegExp['$1']);try{_0x472ed8+=eval(_0x136b72);}catch(_0x4e46f8){if($gameTemp[_0x4314c1(0x863)]())console[_0x4314c1(0x6cd)](_0x4e46f8);}}else return _0x3458c9[_0x4314c1(0x7c7)][_0x4314c1(0x14d)][_0x4314c1(0x8ee)](this,_0x3e96ec);}return _0x472ed8;};return this[_0x147508(0xf5)]()[_0x147508(0x307)](_0x220da4,0x0);},Game_BattlerBase['prototype'][_0x4396be(0x77c)]=function(_0x253c77){const _0x243a8d=_0x4396be;let _0x4195d5=_0x243a8d(0x77c)+_0x253c77+_0x243a8d(0x828);if(this[_0x243a8d(0x41a)](_0x4195d5))return this[_0x243a8d(0x165)][_0x4195d5];return this['_cache'][_0x4195d5]=Math['round'](VisuMZ[_0x243a8d(0x7c7)][_0x243a8d(0x624)]['Param']['BasicParameterFormula'][_0x243a8d(0x8ee)](this,_0x253c77)),this[_0x243a8d(0x165)][_0x4195d5];},Game_BattlerBase['prototype'][_0x4396be(0x50c)]=function(_0xe530f9){const _0x1fd81f=(_0x5167ad,_0x160a36)=>{const _0x5055f8=_0x43c9;if(_0x5055f8(0x396)===_0x5055f8(0x396)){if(!_0x160a36)return _0x5167ad;if(_0x160a36[_0x5055f8(0x531)][_0x5055f8(0x8e4)](VisuMZ[_0x5055f8(0x7c7)]['RegExp'][_0x5055f8(0x541)][_0xe530f9])){if(_0x5055f8(0x2c2)!==_0x5055f8(0x2c2))switch(_0x5c4e1d[_0x5055f8(0x7c7)][_0x5055f8(0x624)]['QoL'][_0x5055f8(0x706)]){case _0x5055f8(0x5da):return!![];case'normal':return![];default:return _0x5deff7[_0x5055f8(0x7c7)][_0x5055f8(0x90b)][_0x5055f8(0x8ee)](this);}else{var _0x1eb36e=Number(RegExp['$1'])/0x64;_0x5167ad+=_0x1eb36e;}}if(_0x160a36[_0x5055f8(0x531)][_0x5055f8(0x8e4)](VisuMZ[_0x5055f8(0x7c7)]['RegExp'][_0x5055f8(0x87d)][_0xe530f9])){var _0x1eb36e=Number(RegExp['$1']);_0x5167ad+=_0x1eb36e;}if(_0x160a36[_0x5055f8(0x531)]['match'](VisuMZ[_0x5055f8(0x7c7)][_0x5055f8(0x39c)]['xparamPlusJS'][_0xe530f9])){if(_0x5055f8(0x311)===_0x5055f8(0x1af)){_0x110fdb[_0x5055f8(0x162)](_0x5b6927,_0x47f542);const _0x554156=_0x1a5aa7[_0x5055f8(0xb9)](_0x4631f1[_0x5055f8(0x950)])[_0x5055f8(0x5d5)](0x1,0x64),_0x331e32=-_0x29cfd7(_0x370ac5[_0x5055f8(0x99a)]||0x0),_0xd06493=_0x135398['max'](_0x494d13[_0x5055f8(0x115)]||0x0,0x0),_0x30f2b5=_0xc9e958[_0x5055f8(0x152)]||_0x5055f8(0x84b),_0x53eb6f=_0x34d732[_0x5055f8(0x524)],_0x38d08d=_0x1b3fbc['picture'](_0x554156);if(!_0x38d08d)return;_0x38d08d[_0x5055f8(0x330)](_0x331e32,_0xd06493,_0x30f2b5);if(_0x53eb6f){const _0x40af86=_0xb92702[_0x5055f8(0x7a5)]();if(_0x40af86)_0x40af86[_0x5055f8(0x5ab)](_0xd06493);}}else{var _0x5dffcd=String(RegExp['$1']);try{_0x5055f8(0x56d)!=='khNhG'?_0x5167ad+=eval(_0x5dffcd):_0x4af0c6+=_0x1d7b41(_0x19cd33);}catch(_0x2dc12f){if($gameTemp[_0x5055f8(0x863)]())console[_0x5055f8(0x6cd)](_0x2dc12f);}}}return _0x5167ad;}else{try{_0x212670[_0x5055f8(0x7c7)][_0x5055f8(0x581)]['call'](this,_0x28d1d9);}catch(_0x4506a3){_0x296540['isPlaytest']()&&(_0x4eb3c8['log'](_0x5055f8(0x922)),_0x160ddc[_0x5055f8(0x6cd)](_0x4506a3));}return!![];}};return this['traitObjects']()['reduce'](_0x1fd81f,0x0);},Game_BattlerBase[_0x4396be(0x56f)][_0x4396be(0x5ea)]=function(_0x25a3e2){const _0x1423b0=_0x4396be,_0x4754f7=(_0x32b0a3,_0x276f85)=>{const _0x23f672=_0x43c9;if(_0x23f672(0x36c)!==_0x23f672(0x367)){if(!_0x276f85)return _0x32b0a3;if(_0x276f85['note'][_0x23f672(0x8e4)](VisuMZ[_0x23f672(0x7c7)][_0x23f672(0x39c)]['xparamRate1'][_0x25a3e2])){if(_0x23f672(0x5ec)!==_0x23f672(0x951)){var _0x4b62dd=Number(RegExp['$1'])/0x64;_0x32b0a3*=_0x4b62dd;}else{const _0x40f4d7=_0x409e1b[_0x23f672(0x244)](_0x4ed2c3,'_blank');}}if(_0x276f85[_0x23f672(0x531)]['match'](VisuMZ[_0x23f672(0x7c7)][_0x23f672(0x39c)][_0x23f672(0x40f)][_0x25a3e2])){if(_0x23f672(0x7c4)!=='pDsxL'){var _0x4b62dd=Number(RegExp['$1']);_0x32b0a3*=_0x4b62dd;}else _0x31294b['VisuMZ_2_BattleSystemBTB']&&(this['_forcedBattleSys']='BTB');}if(_0x276f85['note'][_0x23f672(0x8e4)](VisuMZ[_0x23f672(0x7c7)][_0x23f672(0x39c)][_0x23f672(0x2fa)][_0x25a3e2])){var _0x1dd06d=String(RegExp['$1']);try{_0x32b0a3*=eval(_0x1dd06d);}catch(_0x3bab0b){if(_0x23f672(0x37f)!==_0x23f672(0x726)){if($gameTemp[_0x23f672(0x863)]())console['log'](_0x3bab0b);}else this[_0x23f672(0x2b9)][_0x23f672(0x19c)](_0x5e697c);}}return _0x32b0a3;}else this[_0x23f672(0x41c)](this[_0x23f672(0x1f4)]),this[_0x23f672(0x1f4)]=null;};return this[_0x1423b0(0xf5)]()['reduce'](_0x4754f7,0x1);},Game_BattlerBase[_0x4396be(0x56f)]['xparamFlatBonus']=function(_0x3ef072){const _0x23af02=_0x4396be,_0x12b366=(_0x262f48,_0x23663f)=>{const _0x266f13=_0x43c9;if('sfKAa'===_0x266f13(0x8f4)){if(!_0x23663f)return _0x262f48;if(_0x23663f[_0x266f13(0x531)][_0x266f13(0x8e4)](VisuMZ[_0x266f13(0x7c7)][_0x266f13(0x39c)][_0x266f13(0x751)][_0x3ef072])){if('lWYNa'==='TVmbb')_0x574e6d&&_0x293343[_0x266f13(0x68b)]();else{var _0x3f7129=Number(RegExp['$1'])/0x64;_0x262f48+=_0x3f7129;}}if(_0x23663f['note'][_0x266f13(0x8e4)](VisuMZ[_0x266f13(0x7c7)][_0x266f13(0x39c)][_0x266f13(0x464)][_0x3ef072])){var _0x3f7129=Number(RegExp['$1']);_0x262f48+=_0x3f7129;}if(_0x23663f[_0x266f13(0x531)][_0x266f13(0x8e4)](VisuMZ['CoreEngine']['RegExp'][_0x266f13(0x7a2)][_0x3ef072])){var _0x1d523d=String(RegExp['$1']);try{if(_0x266f13(0x687)===_0x266f13(0x687))_0x262f48+=eval(_0x1d523d);else return![];}catch(_0x5d599b){if($gameTemp['isPlaytest']())console[_0x266f13(0x6cd)](_0x5d599b);}}return _0x262f48;}else _0x58b16f='Item-%1-%2'[_0x266f13(0x9c3)](_0x5ce52d,_0x524257);};return this['traitObjects']()[_0x23af02(0x307)](_0x12b366,0x0);},Game_BattlerBase[_0x4396be(0x56f)][_0x4396be(0x9d8)]=function(_0x3a7f56){const _0x1f71f1=_0x4396be;let _0x98b201='xparam'+_0x3a7f56+'Total';if(this['checkCacheKey'](_0x98b201))return this[_0x1f71f1(0x165)][_0x98b201];return this['_cache'][_0x98b201]=VisuMZ['CoreEngine'][_0x1f71f1(0x624)][_0x1f71f1(0xa0e)][_0x1f71f1(0x59c)][_0x1f71f1(0x8ee)](this,_0x3a7f56),this['_cache'][_0x98b201];},Game_BattlerBase[_0x4396be(0x56f)]['sparamPlus']=function(_0x4834f0){const _0x915a50=_0x4396be,_0x4272f5=(_0x2aed24,_0x557e72)=>{const _0x84b076=_0x43c9;if(!_0x557e72)return _0x2aed24;if(_0x557e72['note'][_0x84b076(0x8e4)](VisuMZ[_0x84b076(0x7c7)][_0x84b076(0x39c)][_0x84b076(0x341)][_0x4834f0])){var _0x180d10=Number(RegExp['$1'])/0x64;_0x2aed24+=_0x180d10;}if(_0x557e72[_0x84b076(0x531)][_0x84b076(0x8e4)](VisuMZ['CoreEngine'][_0x84b076(0x39c)]['sparamPlus2'][_0x4834f0])){if(_0x84b076(0x5ac)!==_0x84b076(0x5ac)){if(!!_0x1633ec[_0x4af929]){if(_0x4829b0['isPlaytest']())_0x1c20dc[_0x84b076(0x6cd)](_0x84b076(0x5ee)[_0x84b076(0x9c3)](_0x92f774));}const _0x57cf39=_0x84b076(0x6a0)['format'](_0x39f615,_0x159f54);_0x58b762[_0x22bcd6]=new _0xdac840(_0x57cf39);}else{var _0x180d10=Number(RegExp['$1']);_0x2aed24+=_0x180d10;}}if(_0x557e72['note']['match'](VisuMZ[_0x84b076(0x7c7)]['RegExp'][_0x84b076(0x4c0)][_0x4834f0])){if(_0x84b076(0x720)!==_0x84b076(0x720))this['_menuButton']['x']=_0x339be1[_0x84b076(0x986)]+0x4;else{var _0x85d1d7=String(RegExp['$1']);try{_0x2aed24+=eval(_0x85d1d7);}catch(_0x117c8f){if($gameTemp[_0x84b076(0x863)]())console[_0x84b076(0x6cd)](_0x117c8f);}}}return _0x2aed24;};return this[_0x915a50(0xf5)]()['reduce'](_0x4272f5,0x0);},Game_BattlerBase[_0x4396be(0x56f)][_0x4396be(0x74a)]=function(_0x4f0e83){const _0x471e29=_0x4396be,_0x5ab1cc=(_0x3ca664,_0xcd58fb)=>{const _0x93caeb=_0x43c9;if(!_0xcd58fb)return _0x3ca664;if(_0xcd58fb[_0x93caeb(0x531)][_0x93caeb(0x8e4)](VisuMZ[_0x93caeb(0x7c7)][_0x93caeb(0x39c)]['sparamRate1'][_0x4f0e83])){if(_0x93caeb(0x932)!==_0x93caeb(0x932))_0x31f1e0&&(_0x425b34[_0x93caeb(0x1c4)]=this[_0x93caeb(0x3bf)]()&&this['isOpen']());else{var _0x16f1f7=Number(RegExp['$1'])/0x64;_0x3ca664*=_0x16f1f7;}}if(_0xcd58fb[_0x93caeb(0x531)]['match'](VisuMZ['CoreEngine'][_0x93caeb(0x39c)]['sparamRate2'][_0x4f0e83])){var _0x16f1f7=Number(RegExp['$1']);_0x3ca664*=_0x16f1f7;}if(_0xcd58fb[_0x93caeb(0x531)][_0x93caeb(0x8e4)](VisuMZ[_0x93caeb(0x7c7)][_0x93caeb(0x39c)][_0x93caeb(0x11e)][_0x4f0e83])){var _0x58e1f6=String(RegExp['$1']);try{_0x3ca664*=eval(_0x58e1f6);}catch(_0x17aa46){if($gameTemp[_0x93caeb(0x863)]())console['log'](_0x17aa46);}}return _0x3ca664;};return this['traitObjects']()[_0x471e29(0x307)](_0x5ab1cc,0x1);},Game_BattlerBase[_0x4396be(0x56f)][_0x4396be(0x49d)]=function(_0x10765a){const _0x5bb746=_0x4396be,_0x3dabeb=(_0x10a731,_0x4d6a38)=>{const _0x20056d=_0x43c9;if(_0x20056d(0x229)!==_0x20056d(0x79b)){if(!_0x4d6a38)return _0x10a731;if(_0x4d6a38['note'][_0x20056d(0x8e4)](VisuMZ[_0x20056d(0x7c7)][_0x20056d(0x39c)]['sparamFlat1'][_0x10765a])){var _0x404690=Number(RegExp['$1'])/0x64;_0x10a731+=_0x404690;}if(_0x4d6a38[_0x20056d(0x531)]['match'](VisuMZ['CoreEngine'][_0x20056d(0x39c)][_0x20056d(0x707)][_0x10765a])){if(_0x20056d(0xb3)===_0x20056d(0x9f0)){if(_0x413a50&&_0x53b22b[_0x20056d(0x47a)]){if(this['isGamepadButtonPressed'](_0x3a6910))return!![];if(this[_0x20056d(0x10a)](_0x29b048))return!![];}}else{var _0x404690=Number(RegExp['$1']);_0x10a731+=_0x404690;}}if(_0x4d6a38[_0x20056d(0x531)]['match'](VisuMZ[_0x20056d(0x7c7)][_0x20056d(0x39c)]['sparamFlatJS'][_0x10765a])){if(_0x20056d(0x1c6)==='bAgme'){var _0x13bbe1=String(RegExp['$1']);try{_0x20056d(0x3f0)===_0x20056d(0x3f0)?_0x10a731+=eval(_0x13bbe1):this[_0x20056d(0x486)][_0x20056d(0x2dd)](_0x28b191[_0x20056d(0x83c)][_0x20056d(0x7f6)]);}catch(_0x2de596){if($gameTemp['isPlaytest']())console[_0x20056d(0x6cd)](_0x2de596);}}else{if(_0x12f2a2[_0x20056d(0x50d)]!==_0xec8eaa)return _0x50c05e[_0x20056d(0x50d)];if(this[_0x20056d(0x4bf)]===_0x9c8e90)this['initCoreEngine']();if(this[_0x20056d(0x4bf)]['BattleSystem']===_0x223e0e)this[_0x20056d(0x3e3)]();return this[_0x20056d(0x4bf)][_0x20056d(0x88e)];}}return _0x10a731;}else this[_0x20056d(0x5f3)]=new _0x4713ea(_0x3c5308[_0x20056d(0xff)](_0x1e1401['BgFilename1'])),this[_0x20056d(0x7b9)]=new _0xa165d8(_0x9c7ec4[_0x20056d(0x692)](_0xfe5a59[_0x20056d(0x80c)])),this[_0x20056d(0x19c)](this[_0x20056d(0x5f3)]),this['addChild'](this[_0x20056d(0x7b9)]),this[_0x20056d(0x5f3)][_0x20056d(0x2e6)][_0x20056d(0x9aa)](this['adjustSprite'][_0x20056d(0x7d9)](this,this[_0x20056d(0x5f3)])),this['_backSprite2'][_0x20056d(0x2e6)]['addLoadListener'](this[_0x20056d(0x7e8)]['bind'](this,this[_0x20056d(0x7b9)]));};return this[_0x5bb746(0xf5)]()[_0x5bb746(0x307)](_0x3dabeb,0x0);},Game_BattlerBase[_0x4396be(0x56f)]['sparam']=function(_0x303c99){const _0x3ff289=_0x4396be;let _0x36f390=_0x3ff289(0x32b)+_0x303c99+_0x3ff289(0x828);if(this['checkCacheKey'](_0x36f390))return this[_0x3ff289(0x165)][_0x36f390];return this[_0x3ff289(0x165)][_0x36f390]=VisuMZ['CoreEngine']['Settings'][_0x3ff289(0xa0e)][_0x3ff289(0x79d)][_0x3ff289(0x8ee)](this,_0x303c99),this['_cache'][_0x36f390];},Game_BattlerBase[_0x4396be(0x56f)]['paramValueByName']=function(_0x2f9fd2,_0x5975c4){const _0x502f6f=_0x4396be;if(typeof paramId===_0x502f6f(0x86d))return this[_0x502f6f(0x77c)](_0x2f9fd2);_0x2f9fd2=String(_0x2f9fd2||'')[_0x502f6f(0x569)]();if(_0x2f9fd2===_0x502f6f(0x93e))return this['param'](0x0);if(_0x2f9fd2===_0x502f6f(0x2cb))return this[_0x502f6f(0x77c)](0x1);if(_0x2f9fd2===_0x502f6f(0x75b))return this[_0x502f6f(0x77c)](0x2);if(_0x2f9fd2==='DEF')return this[_0x502f6f(0x77c)](0x3);if(_0x2f9fd2===_0x502f6f(0x992))return this[_0x502f6f(0x77c)](0x4);if(_0x2f9fd2===_0x502f6f(0x8f2))return this[_0x502f6f(0x77c)](0x5);if(_0x2f9fd2===_0x502f6f(0x781))return this[_0x502f6f(0x77c)](0x6);if(_0x2f9fd2===_0x502f6f(0x140))return this[_0x502f6f(0x77c)](0x7);if(_0x2f9fd2===_0x502f6f(0x5c7))return _0x5975c4?String(Math[_0x502f6f(0xb9)](this[_0x502f6f(0x9d8)](0x0)*0x64))+'%':this[_0x502f6f(0x9d8)](0x0);if(_0x2f9fd2===_0x502f6f(0x16a))return _0x5975c4?String(Math['round'](this['xparam'](0x1)*0x64))+'%':this[_0x502f6f(0x9d8)](0x1);if(_0x2f9fd2===_0x502f6f(0x869))return _0x5975c4?String(Math[_0x502f6f(0xb9)](this[_0x502f6f(0x9d8)](0x2)*0x64))+'%':this[_0x502f6f(0x9d8)](0x2);if(_0x2f9fd2===_0x502f6f(0x458))return _0x5975c4?String(Math[_0x502f6f(0xb9)](this[_0x502f6f(0x9d8)](0x3)*0x64))+'%':this[_0x502f6f(0x9d8)](0x3);if(_0x2f9fd2===_0x502f6f(0x26e))return _0x5975c4?String(Math['round'](this[_0x502f6f(0x9d8)](0x4)*0x64))+'%':this[_0x502f6f(0x9d8)](0x4);if(_0x2f9fd2==='MRF')return _0x5975c4?String(Math[_0x502f6f(0xb9)](this[_0x502f6f(0x9d8)](0x5)*0x64))+'%':this[_0x502f6f(0x9d8)](0x5);if(_0x2f9fd2===_0x502f6f(0x9b9))return _0x5975c4?String(Math[_0x502f6f(0xb9)](this[_0x502f6f(0x9d8)](0x6)*0x64))+'%':this[_0x502f6f(0x9d8)](0x6);if(_0x2f9fd2==='HRG')return _0x5975c4?String(Math[_0x502f6f(0xb9)](this[_0x502f6f(0x9d8)](0x7)*0x64))+'%':this[_0x502f6f(0x9d8)](0x7);if(_0x2f9fd2==='MRG')return _0x5975c4?String(Math[_0x502f6f(0xb9)](this[_0x502f6f(0x9d8)](0x8)*0x64))+'%':this[_0x502f6f(0x9d8)](0x8);if(_0x2f9fd2===_0x502f6f(0x5dc))return _0x5975c4?String(Math[_0x502f6f(0xb9)](this[_0x502f6f(0x9d8)](0x9)*0x64))+'%':this[_0x502f6f(0x9d8)](0x9);if(_0x2f9fd2==='TGR')return _0x5975c4?String(Math['round'](this['sparam'](0x0)*0x64))+'%':this['sparam'](0x0);if(_0x2f9fd2===_0x502f6f(0x3b2))return _0x5975c4?String(Math[_0x502f6f(0xb9)](this['sparam'](0x1)*0x64))+'%':this['sparam'](0x1);if(_0x2f9fd2==='REC')return _0x5975c4?String(Math[_0x502f6f(0xb9)](this['sparam'](0x2)*0x64))+'%':this[_0x502f6f(0x32b)](0x2);if(_0x2f9fd2===_0x502f6f(0x778))return _0x5975c4?String(Math[_0x502f6f(0xb9)](this[_0x502f6f(0x32b)](0x3)*0x64))+'%':this[_0x502f6f(0x32b)](0x3);if(_0x2f9fd2==='MCR')return _0x5975c4?String(Math[_0x502f6f(0xb9)](this[_0x502f6f(0x32b)](0x4)*0x64))+'%':this['sparam'](0x4);if(_0x2f9fd2==='TCR')return _0x5975c4?String(Math[_0x502f6f(0xb9)](this[_0x502f6f(0x32b)](0x5)*0x64))+'%':this[_0x502f6f(0x32b)](0x5);if(_0x2f9fd2===_0x502f6f(0x91c))return _0x5975c4?String(Math[_0x502f6f(0xb9)](this['sparam'](0x6)*0x64))+'%':this[_0x502f6f(0x32b)](0x6);if(_0x2f9fd2===_0x502f6f(0x68e))return _0x5975c4?String(Math['round'](this[_0x502f6f(0x32b)](0x7)*0x64))+'%':this[_0x502f6f(0x32b)](0x7);if(_0x2f9fd2==='FDR')return _0x5975c4?String(Math['round'](this[_0x502f6f(0x32b)](0x8)*0x64))+'%':this[_0x502f6f(0x32b)](0x8);if(_0x2f9fd2===_0x502f6f(0x2be))return _0x5975c4?String(Math['round'](this['sparam'](0x9)*0x64))+'%':this['sparam'](0x9);if(VisuMZ[_0x502f6f(0x7c7)]['CustomParamAbb'][_0x2f9fd2]){const _0x3615d4=VisuMZ[_0x502f6f(0x7c7)][_0x502f6f(0x8dd)][_0x2f9fd2],_0xb7c1d3=this[_0x3615d4];return VisuMZ[_0x502f6f(0x7c7)]['CustomParamType'][_0x2f9fd2]===_0x502f6f(0x136)?_0xb7c1d3:_0x5975c4?String(Math[_0x502f6f(0xb9)](_0xb7c1d3*0x64))+'%':_0xb7c1d3;}return'';},Game_BattlerBase['prototype'][_0x4396be(0x199)]=function(){const _0x5cb8cf=_0x4396be;return this[_0x5cb8cf(0x712)]()&&this[_0x5cb8cf(0x84c)]<this[_0x5cb8cf(0x50b)]*VisuMZ[_0x5cb8cf(0x7c7)]['Settings'][_0x5cb8cf(0xa0e)][_0x5cb8cf(0x373)];},Game_Battler['prototype'][_0x4396be(0x80b)]=function(){const _0x54d967=_0x4396be;SoundManager[_0x54d967(0x9e3)](),this['requestMotion'](_0x54d967(0x785));},VisuMZ[_0x4396be(0x7c7)]['Game_Actor_paramBase']=Game_Actor[_0x4396be(0x56f)][_0x4396be(0x401)],Game_Actor[_0x4396be(0x56f)][_0x4396be(0x401)]=function(_0x12f8f6){const _0x4809e2=_0x4396be;if(this[_0x4809e2(0x79c)]>0x63)return this[_0x4809e2(0x5cb)](_0x12f8f6);return VisuMZ[_0x4809e2(0x7c7)][_0x4809e2(0x4ca)]['call'](this,_0x12f8f6);},Game_Actor[_0x4396be(0x56f)][_0x4396be(0x5cb)]=function(_0x474b21){const _0xab4a99=_0x4396be,_0x58b072=this[_0xab4a99(0x789)]()[_0xab4a99(0x3d3)][_0x474b21][0x63],_0x45514c=this[_0xab4a99(0x789)]()[_0xab4a99(0x3d3)][_0x474b21][0x62];return _0x58b072+(_0x58b072-_0x45514c)*(this[_0xab4a99(0x79c)]-0x63);},VisuMZ[_0x4396be(0x7c7)]['Game_Actor_changeClass']=Game_Actor[_0x4396be(0x56f)][_0x4396be(0x8de)],Game_Actor['prototype']['changeClass']=function(_0x21d471,_0x25b405){const _0x19e6d5=_0x4396be;$gameTemp[_0x19e6d5(0x305)]=!![],VisuMZ[_0x19e6d5(0x7c7)][_0x19e6d5(0x8c0)][_0x19e6d5(0x8ee)](this,_0x21d471,_0x25b405),$gameTemp[_0x19e6d5(0x305)]=undefined;},VisuMZ['CoreEngine'][_0x4396be(0x1d9)]=Game_Actor[_0x4396be(0x56f)][_0x4396be(0x2d8)],Game_Actor[_0x4396be(0x56f)][_0x4396be(0x2d8)]=function(){const _0x111188=_0x4396be;VisuMZ[_0x111188(0x7c7)][_0x111188(0x1d9)][_0x111188(0x8ee)](this);if(!$gameTemp['_changingClass'])this[_0x111188(0x4eb)]();},Game_Actor[_0x4396be(0x56f)][_0x4396be(0x4eb)]=function(){const _0x19b367=_0x4396be;this[_0x19b367(0x165)]={};if(VisuMZ[_0x19b367(0x7c7)][_0x19b367(0x624)]['QoL'][_0x19b367(0x7a0)])this[_0x19b367(0x84c)]=this[_0x19b367(0x50b)];if(VisuMZ['CoreEngine']['Settings'][_0x19b367(0x9e8)][_0x19b367(0x216)])this[_0x19b367(0x9b3)]=this[_0x19b367(0x97a)];},Game_Actor[_0x4396be(0x56f)]['expRate']=function(){const _0xeb27a9=_0x4396be;if(this['isMaxLevel']())return 0x1;const _0x301b7a=this[_0xeb27a9(0x857)]()-this[_0xeb27a9(0x2f7)](),_0x956543=this[_0xeb27a9(0x4ae)]()-this[_0xeb27a9(0x2f7)]();return(_0x956543/_0x301b7a)[_0xeb27a9(0x5d5)](0x0,0x1);},Game_Actor[_0x4396be(0x56f)][_0x4396be(0xf5)]=function(){const _0x5213d3=_0x4396be,_0x347df0=Game_Battler['prototype']['traitObjects'][_0x5213d3(0x8ee)](this);for(const _0x3046e4 of this['equips']()){_0x3046e4&&(_0x5213d3(0x40e)===_0x5213d3(0x6db)?this[_0x5213d3(0x69a)][_0x5213d3(0x2dd)](_0x27bb2d[_0x5213d3(0x83c)][_0x5213d3(0x1f8)]):_0x347df0[_0x5213d3(0x8ab)](_0x3046e4));}return _0x347df0[_0x5213d3(0x8ab)](this[_0x5213d3(0x789)](),this[_0x5213d3(0x4b5)]()),_0x347df0;},Object[_0x4396be(0x89e)](Game_Enemy[_0x4396be(0x56f)],_0x4396be(0x79c),{'get':function(){return this['getLevel']();},'configurable':!![]}),Game_Enemy[_0x4396be(0x56f)]['getLevel']=function(){const _0x179c19=_0x4396be;return this['enemy']()[_0x179c19(0x79c)];},Game_Enemy[_0x4396be(0x56f)][_0x4396be(0x6ec)]=function(){const _0x475cd1=_0x4396be;!this['_repositioned']&&(this[_0x475cd1(0x6e1)]+=Math[_0x475cd1(0xb9)]((Graphics[_0x475cd1(0x21d)]-0x270)/0x2),this[_0x475cd1(0x6e1)]-=Math[_0x475cd1(0x346)]((Graphics[_0x475cd1(0x21d)]-Graphics[_0x475cd1(0x511)])/0x2),$gameSystem[_0x475cd1(0x200)]()?this[_0x475cd1(0x65f)]-=Math[_0x475cd1(0x346)]((Graphics[_0x475cd1(0x67f)]-Graphics[_0x475cd1(0x986)])/0x2):this[_0x475cd1(0x65f)]+=Math[_0x475cd1(0xb9)]((Graphics[_0x475cd1(0x986)]-0x330)/0x2)),this[_0x475cd1(0x6ae)]=!![];},Game_Party['prototype'][_0x4396be(0x266)]=function(){const _0x35fce2=_0x4396be;return VisuMZ['CoreEngine'][_0x35fce2(0x624)]['Gold'][_0x35fce2(0x379)];},VisuMZ['CoreEngine'][_0x4396be(0x148)]=Game_Party[_0x4396be(0x56f)][_0x4396be(0x4ad)],Game_Party['prototype']['consumeItem']=function(_0x50a2a6){const _0x4295f4=_0x4396be;if(VisuMZ['CoreEngine'][_0x4295f4(0x624)][_0x4295f4(0x9e8)][_0x4295f4(0x62b)]&&DataManager[_0x4295f4(0x301)](_0x50a2a6))return;VisuMZ[_0x4295f4(0x7c7)]['Game_Party_consumeItem'][_0x4295f4(0x8ee)](this,_0x50a2a6);},Game_Party[_0x4396be(0x56f)][_0x4396be(0x454)]=function(){const _0x2f0125=_0x4396be,_0x308cb1=VisuMZ[_0x2f0125(0x7c7)][_0x2f0125(0x624)]['QoL'],_0x2bbb3e=_0x308cb1[_0x2f0125(0x3a2)]??0x63;let _0xac9cd0=[];(_0x308cb1[_0x2f0125(0x49c)]??!![])&&(_0x2f0125(0x7cd)===_0x2f0125(0x7cd)?_0xac9cd0=_0xac9cd0['concat']($dataItems):this[_0x2f0125(0x275)][_0x2f0125(0x35f)]+=0x6);(_0x308cb1[_0x2f0125(0x27b)]??!![])&&('almbU'===_0x2f0125(0x621)?(this[_0x2f0125(0x2e6)]=_0x424f14[_0x2f0125(0x95c)](this[_0x2f0125(0x2d0)]['PictureFilename']),this[_0x2f0125(0x2e6)][_0x2f0125(0x9aa)](this[_0x2f0125(0x48c)][_0x2f0125(0x7d9)](this))):_0xac9cd0=_0xac9cd0[_0x2f0125(0x479)]($dataWeapons));(_0x308cb1['BTestArmors']??!![])&&(_0xac9cd0=_0xac9cd0[_0x2f0125(0x479)]($dataArmors));for(const _0x35d89c of _0xac9cd0){if('DUWfs'!==_0x2f0125(0x647)){if(!_0x35d89c)continue;if(_0x35d89c['name'][_0x2f0125(0x8b0)]()<=0x0)continue;if(_0x35d89c[_0x2f0125(0x862)][_0x2f0125(0x8e4)](/-----/i))continue;this[_0x2f0125(0x378)](_0x35d89c,_0x2bbb3e);}else!this[_0x2f0125(0x2b2)]&&(this[_0x2f0125(0x2b2)]=_0x455fc4['gl'][_0x2f0125(0x8c4)](_0x10f939['gl'][_0x2f0125(0x3be)]));}},VisuMZ['CoreEngine']['Game_Troop_setup']=Game_Troop[_0x4396be(0x56f)]['setup'],Game_Troop[_0x4396be(0x56f)][_0x4396be(0x3c9)]=function(_0x17a825){const _0x529439=_0x4396be;$gameTemp['clearForcedGameTroopSettingsCoreEngine'](),$gameTemp[_0x529439(0x328)](_0x17a825),VisuMZ[_0x529439(0x7c7)][_0x529439(0x447)]['call'](this,_0x17a825);},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0xa06)]=Game_Map[_0x4396be(0x56f)]['setup'],Game_Map['prototype'][_0x4396be(0x3c9)]=function(_0x3203f7){const _0x22fc01=_0x4396be;VisuMZ[_0x22fc01(0x7c7)]['Game_Map_setup'][_0x22fc01(0x8ee)](this,_0x3203f7),this['checkCoreEngineDisplayCenter'](),this[_0x22fc01(0x423)](_0x3203f7);},Game_Map[_0x4396be(0x56f)][_0x4396be(0x423)]=function(){const _0x452f07=_0x4396be;this[_0x452f07(0x52a)]=VisuMZ['CoreEngine'][_0x452f07(0x624)][_0x452f07(0x9e8)][_0x452f07(0x6f4)]||![];const _0x50f00b=VisuMZ[_0x452f07(0x7c7)][_0x452f07(0x624)][_0x452f07(0x149)],_0x5d3e57=$dataMap?$dataMap[_0x452f07(0x531)]||'':'';if(_0x5d3e57[_0x452f07(0x8e4)](/<SHOW TILE SHADOWS>/i))this[_0x452f07(0x52a)]=![];else _0x5d3e57[_0x452f07(0x8e4)](/<HIDE TILE SHADOWS>/i)&&(this[_0x452f07(0x52a)]=!![]);if(_0x5d3e57['match'](/<SCROLL LOCK X>/i))this[_0x452f07(0x169)]()[_0x452f07(0x7e4)]=!![],this['centerCameraCheckData']()[_0x452f07(0x4b7)]=_0x50f00b['DisplayLockX'];else _0x5d3e57[_0x452f07(0x8e4)](/<SCROLL LOCK X: (.*?)>/i)&&(this[_0x452f07(0x169)]()[_0x452f07(0x7e4)]=!![],this[_0x452f07(0x169)]()[_0x452f07(0x4b7)]=Number(RegExp['$1']));if(_0x5d3e57[_0x452f07(0x8e4)](/<SCROLL LOCK Y>/i))this[_0x452f07(0x169)]()['centerY']=!![],this[_0x452f07(0x169)]()[_0x452f07(0x856)]=_0x50f00b[_0x452f07(0x4c6)];else _0x5d3e57['match'](/<SCROLL LOCK Y: (.*?)>/i)&&(this[_0x452f07(0x169)]()[_0x452f07(0x7a9)]=!![],this['centerCameraCheckData']()[_0x452f07(0x856)]=Number(RegExp['$1']));},Game_Map[_0x4396be(0x56f)][_0x4396be(0x74e)]=function(){const _0x5e0771=_0x4396be;if(this[_0x5e0771(0x52a)]===undefined)this[_0x5e0771(0x423)]();return this[_0x5e0771(0x52a)];},Game_Map[_0x4396be(0x56f)]['checkCoreEngineDisplayCenter']=function(){const _0x1f324a=_0x4396be,_0x461745=VisuMZ['CoreEngine'][_0x1f324a(0x624)][_0x1f324a(0x149)];this[_0x1f324a(0x763)]={'centerX':![],'centerY':![],'displayX':0x0,'displayY':0x0};if(_0x461745['AutoScrollLockX']){const _0x22e8d5=Graphics[_0x1f324a(0x67f)]/this[_0x1f324a(0x8f9)]();_0x22e8d5%0x1!==0x0&&Math[_0x1f324a(0x421)](_0x22e8d5)===this['width']()&&!this[_0x1f324a(0x40a)]()&&(this[_0x1f324a(0x763)][_0x1f324a(0x7e4)]=!![],this[_0x1f324a(0x763)][_0x1f324a(0x4b7)]=_0x461745[_0x1f324a(0x9ae)]||0x0);}if(_0x461745['AutoScrollLockY']){if(_0x1f324a(0x97e)!==_0x1f324a(0x97e))return _0x243423['areButtonsOutsideMainUI']()?this['mainAreaTopSideButtonLayout']():_0x2e88c2['CoreEngine'][_0x1f324a(0x893)][_0x1f324a(0x8ee)](this);else{const _0x228fa4=Graphics['height']/this[_0x1f324a(0x722)]();_0x228fa4%0x1!==0x0&&Math[_0x1f324a(0x421)](_0x228fa4)===this[_0x1f324a(0x21d)]()&&!this[_0x1f324a(0x29b)]()&&(this[_0x1f324a(0x763)][_0x1f324a(0x7a9)]=!![],this[_0x1f324a(0x763)][_0x1f324a(0x856)]=_0x461745['DisplayLockY']||0x0);}}$gameScreen[_0x1f324a(0x724)]()===0x1&&(this[_0x1f324a(0x169)]()[_0x1f324a(0x7e4)]&&(this['_displayX']=this['centerCameraCheckData']()['displayX']),this['centerCameraCheckData']()['centerY']&&(this['_displayY']=this[_0x1f324a(0x169)]()[_0x1f324a(0x856)]));},VisuMZ['CoreEngine'][_0x4396be(0x6a6)]=Game_Map['prototype'][_0x4396be(0x18a)],Game_Map[_0x4396be(0x56f)][_0x4396be(0x18a)]=function(_0x431aa3,_0x4c2aa1){const _0x16e16a=_0x4396be;VisuMZ[_0x16e16a(0x7c7)][_0x16e16a(0x6a6)]['call'](this,_0x431aa3,_0x4c2aa1),$gameScreen[_0x16e16a(0x724)]()===0x1&&(!this[_0x16e16a(0x40a)]()&&this[_0x16e16a(0x169)]()[_0x16e16a(0x7e4)]&&(this['_displayX']=this[_0x16e16a(0x169)]()[_0x16e16a(0x4b7)]),!this[_0x16e16a(0x29b)]()&&this['centerCameraCheckData']()['centerY']&&(this[_0x16e16a(0xa09)]=this[_0x16e16a(0x169)]()[_0x16e16a(0x856)]));},Game_Map[_0x4396be(0x56f)][_0x4396be(0x169)]=function(){const _0x3ed32d=_0x4396be;if(this[_0x3ed32d(0x763)]===undefined)this[_0x3ed32d(0x512)]();return this[_0x3ed32d(0x763)];},VisuMZ['CoreEngine'][_0x4396be(0x323)]=Game_Map[_0x4396be(0x56f)][_0x4396be(0x188)],Game_Map[_0x4396be(0x56f)][_0x4396be(0x188)]=function(_0x5a3dde){const _0x17a109=_0x4396be;if(this['centerCameraCheckData']()['centerY']&&$gameScreen[_0x17a109(0x724)]()===0x1){if(_0x17a109(0x892)===_0x17a109(0x892)){this['_displayY']=this[_0x17a109(0x169)]()[_0x17a109(0x856)];return;}else this[_0x17a109(0x88a)]['x']=this['_targetAnchor']['x'],this[_0x17a109(0x88a)]['y']=this[_0x17a109(0x43c)]['y'];}VisuMZ['CoreEngine'][_0x17a109(0x323)]['call'](this,_0x5a3dde);},VisuMZ[_0x4396be(0x7c7)]['Game_Map_scrollLeft']=Game_Map['prototype'][_0x4396be(0x38f)],Game_Map[_0x4396be(0x56f)]['scrollLeft']=function(_0x335642){const _0x265953=_0x4396be;if(this[_0x265953(0x169)]()[_0x265953(0x7e4)]&&$gameScreen[_0x265953(0x724)]()===0x1){if('OQwCt'!=='OQwCt')_0x51a1e1[_0x265953(0x7c7)][_0x265953(0x930)][_0x265953(0x8ee)](this,_0x323163,_0x59fc16,_0x4e495f,_0x54d751,_0x275712),this['markCoreEngineModified']();else{this[_0x265953(0x1e5)]=this['centerCameraCheckData']()[_0x265953(0x4b7)];return;}}VisuMZ[_0x265953(0x7c7)][_0x265953(0x292)][_0x265953(0x8ee)](this,_0x335642);},VisuMZ[_0x4396be(0x7c7)]['Game_Map_scrollRight']=Game_Map['prototype'][_0x4396be(0x233)],Game_Map[_0x4396be(0x56f)][_0x4396be(0x233)]=function(_0x57a2e1){const _0x1b10d7=_0x4396be;if(this['centerCameraCheckData']()[_0x1b10d7(0x7e4)]&&$gameScreen[_0x1b10d7(0x724)]()===0x1){this[_0x1b10d7(0x1e5)]=this[_0x1b10d7(0x169)]()[_0x1b10d7(0x4b7)];return;}VisuMZ[_0x1b10d7(0x7c7)][_0x1b10d7(0x47c)][_0x1b10d7(0x8ee)](this,_0x57a2e1);},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x259)]=Game_Map['prototype'][_0x4396be(0x86c)],Game_Map[_0x4396be(0x56f)][_0x4396be(0x86c)]=function(_0x123315){const _0x417047=_0x4396be;if(this[_0x417047(0x169)]()['centerY']&&$gameScreen['zoomScale']()===0x1){this[_0x417047(0xa09)]=this['centerCameraCheckData']()['displayY'];return;}VisuMZ[_0x417047(0x7c7)]['Game_Map_scrollUp'][_0x417047(0x8ee)](this,_0x123315);},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x2ba)]=Game_Character[_0x4396be(0x56f)]['processMoveCommand'],Game_Character[_0x4396be(0x56f)]['processMoveCommand']=function(_0x3b69f1){const _0x49050d=_0x4396be;try{'cfgVk'===_0x49050d(0x1e2)?_0x5973fa=_0x327673[_0x49050d(0x51b)](_0x238127):VisuMZ[_0x49050d(0x7c7)][_0x49050d(0x2ba)][_0x49050d(0x8ee)](this,_0x3b69f1);}catch(_0x5a7d6e){if($gameTemp[_0x49050d(0x863)]())console[_0x49050d(0x6cd)](_0x5a7d6e);}},Game_Player['prototype'][_0x4396be(0x95b)]=function(){const _0x21729b=_0x4396be,_0x5ae1cb=$gameMap[_0x21729b(0x3f8)]();this[_0x21729b(0x1f9)]=Math[_0x21729b(0x31d)](_0x5ae1cb)+Math[_0x21729b(0x31d)](_0x5ae1cb)+this[_0x21729b(0x739)]();},Game_Player[_0x4396be(0x56f)][_0x4396be(0x739)]=function(){const _0x1ed0f0=_0x4396be;if($dataMap&&$dataMap[_0x1ed0f0(0x531)]&&$dataMap[_0x1ed0f0(0x531)][_0x1ed0f0(0x8e4)](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i)){if('KfAka'!==_0x1ed0f0(0x269)){if(!this['_coreEasing'])return;if(this[_0x1ed0f0(0x53a)][_0x1ed0f0(0x5cc)]<=0x0)return;this['x']=this['applyCoreEasing'](this['x'],this['_coreEasing'][_0x1ed0f0(0x60a)]),this['y']=this[_0x1ed0f0(0x270)](this['y'],this[_0x1ed0f0(0x53a)][_0x1ed0f0(0x7c2)]),this[_0x1ed0f0(0x9a7)]['x']=this[_0x1ed0f0(0x270)](this[_0x1ed0f0(0x9a7)]['x'],this['_coreEasing'][_0x1ed0f0(0x829)]),this['scale']['y']=this[_0x1ed0f0(0x270)](this[_0x1ed0f0(0x9a7)]['y'],this[_0x1ed0f0(0x53a)][_0x1ed0f0(0x7df)]),this[_0x1ed0f0(0x28d)]=this[_0x1ed0f0(0x270)](this[_0x1ed0f0(0x28d)],this[_0x1ed0f0(0x53a)][_0x1ed0f0(0x7d2)]),this['backOpacity']=this[_0x1ed0f0(0x270)](this[_0x1ed0f0(0x7d4)],this[_0x1ed0f0(0x53a)][_0x1ed0f0(0x61a)]),this[_0x1ed0f0(0x146)]=this['applyCoreEasing'](this[_0x1ed0f0(0x146)],this[_0x1ed0f0(0x53a)][_0x1ed0f0(0x6fa)]),this[_0x1ed0f0(0x53a)]['duration']--;}else return Number(RegExp['$1']);}else return VisuMZ[_0x1ed0f0(0x7c7)]['Settings']['QoL'][_0x1ed0f0(0x380)];},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x4a4)]=Game_Event['prototype']['isCollidedWithEvents'],Game_Event[_0x4396be(0x56f)]['isCollidedWithEvents']=function(_0x33d47d,_0xcae8b4){const _0x3cd2cb=_0x4396be;if(this[_0x3cd2cb(0x80d)]())return this[_0x3cd2cb(0x57b)](_0x33d47d,_0xcae8b4);else{if(_0x3cd2cb(0x11b)===_0x3cd2cb(0x11b))return VisuMZ[_0x3cd2cb(0x7c7)]['Game_Event_isCollidedWithEvents'][_0x3cd2cb(0x8ee)](this,_0x33d47d,_0xcae8b4);else{const _0x7a235=this[_0x3cd2cb(0x776)]();return _0x7a235[_0x3cd2cb(0x8e4)](/\/\/[ ]SCRIPT[ ]CALL/i)?this['runCombinedScrollingTextAsCode'](_0x7a235):_0x47c0ea[_0x3cd2cb(0x7c7)][_0x3cd2cb(0x67a)][_0x3cd2cb(0x8ee)](this,_0x5431d5);}}},Game_Event[_0x4396be(0x56f)]['isSmartEventCollisionOn']=function(){const _0x41cc71=_0x4396be;return VisuMZ[_0x41cc71(0x7c7)]['Settings'][_0x41cc71(0x9e8)][_0x41cc71(0x9c4)];},Game_Event[_0x4396be(0x56f)][_0x4396be(0x57b)]=function(_0xe3ed4a,_0x1b7343){const _0x4a8704=_0x4396be;if(!this[_0x4a8704(0x688)]())return'YnRQr'!==_0x4a8704(0x4ec)?0x0:![];else{const _0x360716=$gameMap[_0x4a8704(0x8f6)](_0xe3ed4a,_0x1b7343)['filter'](_0x3a63e9=>_0x3a63e9[_0x4a8704(0x688)]());return _0x360716[_0x4a8704(0x858)]>0x0;}},VisuMZ[_0x4396be(0x7c7)]['Game_Interpreter_command105']=Game_Interpreter[_0x4396be(0x56f)][_0x4396be(0x11c)],Game_Interpreter[_0x4396be(0x56f)][_0x4396be(0x11c)]=function(_0x15356a){const _0x4d8998=_0x4396be,_0x331040=this['getCombinedScrollingText']();if(_0x331040[_0x4d8998(0x8e4)](/\/\/[ ]SCRIPT[ ]CALL/i)){if(_0x4d8998(0x238)!==_0x4d8998(0x238))this['x']=_0x6abd71['width'],this['y']=_0x1cffe5['height'],this[_0x4d8998(0x1c4)]=![],this[_0x4d8998(0x29a)]();else return this[_0x4d8998(0xc1)](_0x331040);}else{if(_0x4d8998(0x7cf)===_0x4d8998(0x104))_0x339a59=this['mainAreaHeightSideButtonLayout']();else return VisuMZ[_0x4d8998(0x7c7)]['Game_Interpreter_command105'][_0x4d8998(0x8ee)](this,_0x15356a);}},Game_Interpreter['prototype'][_0x4396be(0x776)]=function(){const _0x3032bd=_0x4396be;let _0x3bb85d='',_0x3ab4e2=this[_0x3032bd(0x9ab)]+0x1;while(this['_list'][_0x3ab4e2]&&this[_0x3032bd(0x402)][_0x3ab4e2][_0x3032bd(0x1c5)]===0x195){_0x3bb85d+=this[_0x3032bd(0x402)][_0x3ab4e2][_0x3032bd(0x113)][0x0]+'\x0a',_0x3ab4e2++;}return _0x3bb85d;},Game_Interpreter['prototype']['runCombinedScrollingTextAsCode']=function(_0x2f6c96){const _0x17460c=_0x4396be;try{'GlOOc'===_0x17460c(0x294)?_0x547666[_0x17460c(0xb5)](_0x166b7c,_0x42335f):eval(_0x2f6c96);}catch(_0xebb0e2){$gameTemp['isPlaytest']()&&(_0x17460c(0x276)!=='qySie'?(console[_0x17460c(0x6cd)](_0x17460c(0x882)),console[_0x17460c(0x6cd)](_0xebb0e2)):this[_0x17460c(0x291)]());}return!![];},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x278)]=Game_Interpreter[_0x4396be(0x56f)][_0x4396be(0x908)],Game_Interpreter['prototype']['command111']=function(_0x171210){const _0x146ada=_0x4396be;try{VisuMZ[_0x146ada(0x7c7)][_0x146ada(0x278)][_0x146ada(0x8ee)](this,_0x171210);}catch(_0x41b948){$gameTemp['isPlaytest']()&&(console[_0x146ada(0x6cd)](_0x146ada(0xc6)),console['log'](_0x41b948)),this['skipBranch']();}return!![];},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x581)]=Game_Interpreter[_0x4396be(0x56f)][_0x4396be(0x8a4)],Game_Interpreter['prototype'][_0x4396be(0x8a4)]=function(_0x27c8a2){const _0x5677f1=_0x4396be;try{VisuMZ[_0x5677f1(0x7c7)][_0x5677f1(0x581)]['call'](this,_0x27c8a2);}catch(_0x5c2d6f){if('mKBbl'===_0x5677f1(0x543)){let _0x791740=_0x3462c5[_0x5677f1(0x7c7)][_0x5677f1(0x27c)][_0x5677f1(0x8ee)](this);return _0x791740+=this['anglePlus'](),_0x791740;}else $gameTemp[_0x5677f1(0x863)]()&&(console[_0x5677f1(0x6cd)](_0x5677f1(0x922)),console['log'](_0x5c2d6f));}return!![];},VisuMZ['CoreEngine']['Game_Interpreter_command355']=Game_Interpreter[_0x4396be(0x56f)][_0x4396be(0x3f3)],Game_Interpreter[_0x4396be(0x56f)][_0x4396be(0x3f3)]=function(){const _0x1c8fa4=_0x4396be;try{if(_0x1c8fa4(0x5cf)===_0x1c8fa4(0x5cf))VisuMZ[_0x1c8fa4(0x7c7)]['Game_Interpreter_command355']['call'](this);else{const _0x519557=_0x2f4ed1[_0x1c8fa4(0x7c7)][_0x1c8fa4(0x624)]['ScreenShake'];if(_0x519557&&_0x519557[_0x1c8fa4(0x1bd)])return _0x519557[_0x1c8fa4(0x1bd)][_0x1c8fa4(0x8ee)](this);this['x']+=_0x508bbf[_0x1c8fa4(0xb9)](_0x54ef3b[_0x1c8fa4(0x7d1)]());}}catch(_0x5d8755){$gameTemp[_0x1c8fa4(0x863)]()&&(console[_0x1c8fa4(0x6cd)](_0x1c8fa4(0x9e9)),console[_0x1c8fa4(0x6cd)](_0x5d8755));}return!![];},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x234)]=Game_Interpreter[_0x4396be(0x56f)]['command357'],Game_Interpreter[_0x4396be(0x56f)][_0x4396be(0x4f5)]=function(_0x5b26f0){const _0x28bb3b=_0x4396be;return $gameTemp[_0x28bb3b(0x25f)](this),VisuMZ[_0x28bb3b(0x7c7)][_0x28bb3b(0x234)][_0x28bb3b(0x8ee)](this,_0x5b26f0);},Scene_Base[_0x4396be(0x56f)][_0x4396be(0x407)]=function(){const _0x4fa880=_0x4396be;return VisuMZ[_0x4fa880(0x7c7)][_0x4fa880(0x624)]['UI'][_0x4fa880(0x5a8)];},Scene_Base[_0x4396be(0x56f)][_0x4396be(0x36f)]=function(){return VisuMZ['CoreEngine']['Settings']['UI']['BottomHelp'];},Scene_Base['prototype'][_0x4396be(0x1e3)]=function(){const _0x3a036b=_0x4396be;return VisuMZ[_0x3a036b(0x7c7)]['Settings']['UI'][_0x3a036b(0x478)];},Scene_Base[_0x4396be(0x56f)][_0x4396be(0x24d)]=function(){const _0x5cf53b=_0x4396be;return VisuMZ[_0x5cf53b(0x7c7)][_0x5cf53b(0x624)]['UI'][_0x5cf53b(0x69b)];},Scene_Base[_0x4396be(0x56f)][_0x4396be(0x78e)]=function(){const _0x26caa7=_0x4396be;return VisuMZ[_0x26caa7(0x7c7)]['Settings']['UI'][_0x26caa7(0x4df)];},Scene_Base[_0x4396be(0x56f)][_0x4396be(0x28e)]=function(){const _0x344433=_0x4396be;return VisuMZ[_0x344433(0x7c7)][_0x344433(0x624)]['UI']['ButtonHeight'];},Scene_Base['prototype'][_0x4396be(0x898)]=function(){const _0x577875=_0x4396be;return VisuMZ['CoreEngine'][_0x577875(0x624)][_0x577875(0x222)][_0x577875(0x527)];},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x438)]=Scene_Base['prototype'][_0x4396be(0xe6)],Scene_Base['prototype'][_0x4396be(0xe6)]=function(){const _0x51a4ab=_0x4396be;VisuMZ[_0x51a4ab(0x7c7)][_0x51a4ab(0x438)][_0x51a4ab(0x8ee)](this),this['createButtonAssistWindow'](),this[_0x51a4ab(0x16c)](),this[_0x51a4ab(0xa08)]['x']=Math[_0x51a4ab(0xb9)](this[_0x51a4ab(0xa08)]['x']),this[_0x51a4ab(0xa08)]['y']=Math['round'](this[_0x51a4ab(0xa08)]['y']);},Scene_Base[_0x4396be(0x56f)][_0x4396be(0x650)]=function(){},Scene_Base[_0x4396be(0x56f)][_0x4396be(0x16c)]=function(){const _0x45bc92=_0x4396be;this[_0x45bc92(0x30e)]=new Window_TextPopup(),this[_0x45bc92(0x19c)](this[_0x45bc92(0x30e)]);},$textPopup=function(_0x59f74e){const _0x6e956a=_0x4396be,_0x541754=SceneManager[_0x6e956a(0x9c8)][_0x6e956a(0x30e)];_0x541754&&_0x541754['addQueue'](_0x59f74e);},Scene_Base['prototype'][_0x4396be(0x5c9)]=function(){const _0x1ebfbb=_0x4396be;return TextManager[_0x1ebfbb(0x57d)]('pageup','pagedown');},Scene_Base[_0x4396be(0x56f)][_0x4396be(0x7a4)]=function(){const _0x2fc4b7=_0x4396be;return TextManager[_0x2fc4b7(0x35e)](_0x2fc4b7(0x823));},Scene_Base['prototype']['buttonAssistKey3']=function(){const _0x59477d=_0x4396be;return TextManager['getInputButtonString'](_0x59477d(0x762));},Scene_Base[_0x4396be(0x56f)][_0x4396be(0x6c5)]=function(){return TextManager['getInputButtonString']('ok');},Scene_Base[_0x4396be(0x56f)]['buttonAssistKey5']=function(){const _0x2bf4a8=_0x4396be;return TextManager[_0x2bf4a8(0x35e)](_0x2bf4a8(0x604));},Scene_Base[_0x4396be(0x56f)][_0x4396be(0x84d)]=function(){const _0x4ae295=_0x4396be;if(this[_0x4ae295(0x2cf)]&&this[_0x4ae295(0x2cf)]['visible'])return TextManager['buttonAssistSwitch'];else{if(_0x4ae295(0x498)==='FatKE')return'';else{let _0x27a6f7=_0x537c8b[_0x4ae295(0x7c7)][_0x4ae295(0x850)][_0x4ae295(0x8ee)](this,_0x1f2b3e);return _0x27a6f7['x']=_0x50c197[_0x4ae295(0xb9)](_0x27a6f7['x']),_0x27a6f7['y']=_0xa82f7c[_0x4ae295(0xb9)](_0x27a6f7['y']),_0x27a6f7['width']=_0x25aaa7[_0x4ae295(0xb9)](_0x27a6f7[_0x4ae295(0x67f)]),_0x27a6f7[_0x4ae295(0x21d)]=_0x4faf1c[_0x4ae295(0xb9)](_0x27a6f7[_0x4ae295(0x21d)]),_0x27a6f7;}}},Scene_Base['prototype']['buttonAssistText2']=function(){return'';},Scene_Base[_0x4396be(0x56f)][_0x4396be(0x864)]=function(){return'';},Scene_Base['prototype'][_0x4396be(0x12a)]=function(){const _0x50f050=_0x4396be;return TextManager[_0x50f050(0x57e)];},Scene_Base['prototype'][_0x4396be(0x398)]=function(){const _0xcd5c2e=_0x4396be;return TextManager[_0xcd5c2e(0x920)];},Scene_Base[_0x4396be(0x56f)][_0x4396be(0x8ae)]=function(){return 0x0;},Scene_Base[_0x4396be(0x56f)]['buttonAssistOffset2']=function(){return 0x0;},Scene_Base['prototype'][_0x4396be(0x2a3)]=function(){return 0x0;},Scene_Base['prototype'][_0x4396be(0x63e)]=function(){return 0x0;},Scene_Base[_0x4396be(0x56f)][_0x4396be(0x759)]=function(){return 0x0;},VisuMZ[_0x4396be(0x7c7)]['Scene_Boot_loadSystemImages']=Scene_Boot['prototype'][_0x4396be(0x894)],Scene_Boot[_0x4396be(0x56f)][_0x4396be(0x894)]=function(){const _0x54dc4a=_0x4396be;VisuMZ['CoreEngine'][_0x54dc4a(0x1ef)][_0x54dc4a(0x8ee)](this),this[_0x54dc4a(0x587)]();},Scene_Boot[_0x4396be(0x56f)][_0x4396be(0x587)]=function(){const _0x11ea31=_0x4396be,_0x4d4275=[_0x11ea31(0x40d),'battlebacks1',_0x11ea31(0x64b),_0x11ea31(0x7de),'enemies',_0x11ea31(0x737),'parallaxes',_0x11ea31(0x5fc),_0x11ea31(0x14a),'sv_enemies',_0x11ea31(0x7a1),_0x11ea31(0x2e7),_0x11ea31(0x5e6),_0x11ea31(0x7d5)];for(const _0x40458b of _0x4d4275){const _0x26ac82=VisuMZ[_0x11ea31(0x7c7)][_0x11ea31(0x624)][_0x11ea31(0x661)][_0x40458b],_0x240bd6=_0x11ea31(0x743)[_0x11ea31(0x9c3)](_0x40458b);for(const _0x2c512a of _0x26ac82){ImageManager[_0x11ea31(0xb5)](_0x240bd6,_0x2c512a);}}},VisuMZ['CoreEngine'][_0x4396be(0x670)]=Scene_Boot[_0x4396be(0x56f)]['startNormalGame'],Scene_Boot['prototype'][_0x4396be(0x612)]=function(){const _0x554946=_0x4396be;Utils[_0x554946(0x7c8)]('test')&&VisuMZ['CoreEngine'][_0x554946(0x624)][_0x554946(0x9e8)][_0x554946(0x4ee)]?_0x554946(0x4e7)!=='NawIl'?this['startAutoNewGame']():(_0x5b4142[_0x554946(0x7c7)][_0x554946(0x4ed)][_0x554946(0x8ee)](this),this[_0x554946(0x383)]()):_0x554946(0x3db)==='hkWqd'?VisuMZ[_0x554946(0x7c7)]['Scene_Boot_startNormalGame'][_0x554946(0x8ee)](this):_0x264074[_0x554946(0x7c7)]['Window_Selectable_processTouch']['call'](this);},Scene_Boot[_0x4396be(0x56f)][_0x4396be(0x728)]=function(){const _0x4071eb=_0x4396be;this[_0x4071eb(0x62c)](),DataManager['setupNewGame'](),SceneManager[_0x4071eb(0xd4)](Scene_Map);},Scene_Boot['prototype'][_0x4396be(0x5f2)]=function(){const _0x5ccbba=_0x4396be,_0x353d8d=$dataSystem[_0x5ccbba(0x75d)][_0x5ccbba(0x81b)],_0x2443e1=$dataSystem['advanced'][_0x5ccbba(0xbc)],_0x8dcd5e=VisuMZ[_0x5ccbba(0x7c7)]['Settings']['UI'][_0x5ccbba(0xdb)];Graphics['boxWidth']=_0x353d8d-_0x8dcd5e*0x2,Graphics[_0x5ccbba(0x511)]=_0x2443e1-_0x8dcd5e*0x2,this['determineSideButtonLayoutValid']();},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x38e)]=Scene_Boot['prototype'][_0x4396be(0x74d)],Scene_Boot[_0x4396be(0x56f)]['updateDocumentTitle']=function(){const _0x304801=_0x4396be;this['isFullDocumentTitle']()?this[_0x304801(0x9c7)]():VisuMZ['CoreEngine']['Scene_Boot_updateDocumentTitle']['call'](this);},Scene_Boot[_0x4396be(0x56f)][_0x4396be(0x2ab)]=function(){const _0x1180e0=_0x4396be;if(Scene_Title[_0x1180e0(0x12e)]==='')return![];if(Scene_Title[_0x1180e0(0x12e)]==='Subtitle')return![];if(Scene_Title[_0x1180e0(0x462)]==='')return![];if(Scene_Title[_0x1180e0(0x462)]===_0x1180e0(0x4ea))return![];return!![];},Scene_Boot['prototype'][_0x4396be(0x9c7)]=function(){const _0x5abd48=_0x4396be,_0x56ea3a=$dataSystem[_0x5abd48(0x9b6)],_0x452833=Scene_Title[_0x5abd48(0x12e)]||'',_0x2146ae=Scene_Title[_0x5abd48(0x462)]||'',_0x360b5c=VisuMZ[_0x5abd48(0x7c7)][_0x5abd48(0x624)][_0x5abd48(0xae)][_0x5abd48(0x9b5)][_0x5abd48(0x8e5)],_0x1a29eb=_0x360b5c[_0x5abd48(0x9c3)](_0x56ea3a,_0x452833,_0x2146ae);document[_0x5abd48(0x615)]=_0x1a29eb;},Scene_Boot[_0x4396be(0x56f)][_0x4396be(0x1a9)]=function(){const _0x5096a4=_0x4396be;if(VisuMZ[_0x5096a4(0x7c7)][_0x5096a4(0x624)]['UI'][_0x5096a4(0x772)]){if(_0x5096a4(0x44f)!=='Qbgvd')this[_0x5096a4(0x629)]()?this[_0x5096a4(0x742)](_0x100449):_0x89b157[_0x5096a4(0x7c7)][_0x5096a4(0x780)]['call'](this,_0x2d6404);else{const _0x24f1b6=Graphics[_0x5096a4(0x67f)]-Graphics['boxWidth']-VisuMZ[_0x5096a4(0x7c7)][_0x5096a4(0x624)]['UI'][_0x5096a4(0xdb)]*0x2,_0x4b8f93=Sprite_Button[_0x5096a4(0x56f)][_0x5096a4(0x959)][_0x5096a4(0x8ee)](this)*0x4;if(_0x24f1b6>=_0x4b8f93)SceneManager['setSideButtonLayout'](!![]);}}},Scene_Title[_0x4396be(0x12e)]=VisuMZ['CoreEngine'][_0x4396be(0x624)][_0x4396be(0xae)][_0x4396be(0x9b5)][_0x4396be(0x3a8)],Scene_Title['version']=VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x624)][_0x4396be(0xae)][_0x4396be(0x9b5)][_0x4396be(0x496)],Scene_Title[_0x4396be(0x70d)]=VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x624)][_0x4396be(0xfd)],VisuMZ['CoreEngine'][_0x4396be(0x419)]=Scene_Title['prototype'][_0x4396be(0x37b)],Scene_Title['prototype']['drawGameTitle']=function(){const _0xe75abd=_0x4396be;VisuMZ[_0xe75abd(0x7c7)]['Settings'][_0xe75abd(0xae)][_0xe75abd(0x9b5)]['drawGameTitle'][_0xe75abd(0x8ee)](this);if(Scene_Title[_0xe75abd(0x12e)]!==''&&Scene_Title[_0xe75abd(0x12e)]!==_0xe75abd(0x3a8))this[_0xe75abd(0x8e8)]();if(Scene_Title[_0xe75abd(0x462)]!==''&&Scene_Title[_0xe75abd(0x462)]!==_0xe75abd(0x4ea))this['drawGameVersion']();},Scene_Title[_0x4396be(0x56f)][_0x4396be(0x8e8)]=function(){const _0x376129=_0x4396be;VisuMZ[_0x376129(0x7c7)]['Settings'][_0x376129(0xae)][_0x376129(0x9b5)][_0x376129(0x8e8)][_0x376129(0x8ee)](this);},Scene_Title[_0x4396be(0x56f)]['drawGameVersion']=function(){const _0x4d6455=_0x4396be;VisuMZ['CoreEngine'][_0x4d6455(0x624)][_0x4d6455(0xae)][_0x4d6455(0x9b5)][_0x4d6455(0x414)][_0x4d6455(0x8ee)](this);},Scene_Title[_0x4396be(0x56f)][_0x4396be(0x53d)]=function(){const _0xf35cef=_0x4396be;this[_0xf35cef(0x13e)]();const _0x44afb9=$dataSystem[_0xf35cef(0x580)][_0xf35cef(0x279)],_0x50af4b=this[_0xf35cef(0x20b)]();this[_0xf35cef(0x84e)]=new Window_TitleCommand(_0x50af4b),this[_0xf35cef(0x84e)][_0xf35cef(0x2dd)](_0x44afb9);const _0x3f34a2=this[_0xf35cef(0x20b)]();this['_commandWindow'][_0xf35cef(0x25e)](_0x3f34a2['x'],_0x3f34a2['y'],_0x3f34a2[_0xf35cef(0x67f)],_0x3f34a2[_0xf35cef(0x21d)]),this[_0xf35cef(0x84e)][_0xf35cef(0x533)](),this[_0xf35cef(0x84e)][_0xf35cef(0x813)](),this['_commandWindow'][_0xf35cef(0x39b)](),this[_0xf35cef(0x497)](this[_0xf35cef(0x84e)]);},Scene_Title[_0x4396be(0x56f)][_0x4396be(0x64a)]=function(){const _0x39d3d5=_0x4396be;if(this['_commandWindow']){if('ZpZER'==='ZpZER')return this[_0x39d3d5(0x84e)][_0x39d3d5(0x59b)]();else{const _0x2ede36=_0x1eb945[_0x39d3d5(0x9b6)],_0x32e68f=_0x3d66fa['subtitle']||'',_0x243df7=_0x4e6f3['version']||'',_0x55fc5f=_0x2a94a8[_0x39d3d5(0x7c7)][_0x39d3d5(0x624)]['MenuLayout']['Title'][_0x39d3d5(0x8e5)],_0x37086b=_0x55fc5f[_0x39d3d5(0x9c3)](_0x2ede36,_0x32e68f,_0x243df7);_0x1e1de4[_0x39d3d5(0x615)]=_0x37086b;}}else{if('CBZTK'!==_0x39d3d5(0x8be))this[_0x39d3d5(0x746)]['setBackgroundType'](_0x51ad2a[_0x39d3d5(0x83c)]['HelpBgType']);else return VisuMZ[_0x39d3d5(0x7c7)][_0x39d3d5(0x624)][_0x39d3d5(0x756)][_0x39d3d5(0x858)];}},Scene_Title['prototype'][_0x4396be(0x20b)]=function(){const _0x2dcf84=_0x4396be;return VisuMZ[_0x2dcf84(0x7c7)]['Settings'][_0x2dcf84(0xae)][_0x2dcf84(0x9b5)][_0x2dcf84(0x350)][_0x2dcf84(0x8ee)](this);},Scene_Title['prototype'][_0x4396be(0x13e)]=function(){const _0x140a64=_0x4396be;for(const _0x29e3cf of Scene_Title[_0x140a64(0x70d)]){if(_0x140a64(0x1bb)!==_0x140a64(0x9bd)){const _0x16b7b2=new Sprite_TitlePictureButton(_0x29e3cf);this[_0x140a64(0x19c)](_0x16b7b2);}else return _0x398e23[_0x140a64(0x618)](_0x4b9b4f,'','');}},VisuMZ[_0x4396be(0x7c7)]['Scene_Map_initialize']=Scene_Map[_0x4396be(0x56f)][_0x4396be(0x480)],Scene_Map['prototype']['initialize']=function(){const _0x2c00bd=_0x4396be;VisuMZ['CoreEngine'][_0x2c00bd(0x125)][_0x2c00bd(0x8ee)](this),$gameTemp[_0x2c00bd(0x158)](),this[_0x2c00bd(0x7b1)]();},VisuMZ[_0x4396be(0x7c7)]['Scene_Map_updateMainMultiply']=Scene_Map[_0x4396be(0x56f)][_0x4396be(0x62f)],Scene_Map[_0x4396be(0x56f)]['updateMainMultiply']=function(){const _0x47be79=_0x4396be;VisuMZ[_0x47be79(0x7c7)]['Scene_Map_updateMainMultiply'][_0x47be79(0x8ee)](this),$gameTemp['_playTestFastMode']&&!$gameMessage[_0x47be79(0x562)]()&&(this[_0x47be79(0x968)](),SceneManager[_0x47be79(0x297)]());},Scene_Map[_0x4396be(0x56f)][_0x4396be(0x9b4)]=function(){const _0x3ca9a2=_0x4396be;Scene_Message[_0x3ca9a2(0x56f)]['terminate'][_0x3ca9a2(0x8ee)](this),!SceneManager[_0x3ca9a2(0x2e2)](Scene_Battle)&&(this[_0x3ca9a2(0x2de)][_0x3ca9a2(0x68b)](),this[_0x3ca9a2(0x881)]['hide'](),this['_windowLayer'][_0x3ca9a2(0x1c4)]=![],SceneManager[_0x3ca9a2(0x54c)]()),$gameScreen[_0x3ca9a2(0x141)](),this[_0x3ca9a2(0x7b1)]();},VisuMZ['CoreEngine'][_0x4396be(0x7c9)]=Scene_Map[_0x4396be(0x56f)][_0x4396be(0x95a)],Scene_Map['prototype'][_0x4396be(0x95a)]=function(){const _0x2b38fc=_0x4396be;VisuMZ[_0x2b38fc(0x7c7)][_0x2b38fc(0x7c9)][_0x2b38fc(0x8ee)](this);if(SceneManager[_0x2b38fc(0x273)]()){if(_0x2b38fc(0x120)!==_0x2b38fc(0xa0c))this[_0x2b38fc(0x5a9)]();else return _0x28165f['PreserveNumbers'](_0x916cc9,'[',']');}},Scene_Map['prototype'][_0x4396be(0x5a9)]=function(){this['_menuButton']['x']=Graphics['boxWidth']+0x4;},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x85d)]=Scene_Map[_0x4396be(0x56f)]['updateScene'],Scene_Map[_0x4396be(0x56f)][_0x4396be(0x171)]=function(){const _0xb2765b=_0x4396be;VisuMZ[_0xb2765b(0x7c7)][_0xb2765b(0x85d)][_0xb2765b(0x8ee)](this),this[_0xb2765b(0xf6)]();},Scene_Map[_0x4396be(0x56f)]['updateDashToggle']=function(){const _0x39ba27=_0x4396be;if(Input[_0x39ba27(0x3c1)]('dashToggle')){if(_0x39ba27(0x60f)==='oJNYd')ConfigManager['alwaysDash']=!ConfigManager['alwaysDash'],ConfigManager['save']();else return this[_0x39ba27(0x712)]()&&this[_0x39ba27(0x84c)]<this['mhp']*_0x3a3e55[_0x39ba27(0x7c7)][_0x39ba27(0x624)][_0x39ba27(0xa0e)][_0x39ba27(0x373)];}},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x608)]=Scene_Map[_0x4396be(0x56f)][_0x4396be(0x968)],Scene_Map['prototype'][_0x4396be(0x968)]=function(){const _0x413521=_0x4396be;VisuMZ[_0x413521(0x7c7)][_0x413521(0x608)]['call'](this),this[_0x413521(0x995)]();},Scene_Map['prototype'][_0x4396be(0x7b1)]=function(){this['_onceParallelInterpreters']=[];},Scene_Map[_0x4396be(0x56f)][_0x4396be(0x995)]=function(){const _0x2605d1=_0x4396be;if(!this['_onceParallelInterpreters'])return;for(const _0x23a510 of this['_onceParallelInterpreters']){if(_0x2605d1(0x3f4)===_0x2605d1(0x835)){if(_0x441975[_0x2605d1(0x7c7)][_0x2605d1(0x624)]['QoL']['SubfolderParse']??!![])for(const _0x12f79e in _0x570cfb){const _0x5cae8b=_0x25591a[_0x12f79e];_0x5cae8b[_0x2605d1(0x862)][_0x2605d1(0x8e4)](/(.*)\/(.*)/i)&&(_0x5cae8b[_0x2605d1(0x862)]=_0x5ae30f(_0xfce563['$2'][_0x2605d1(0x8b0)]()));}}else{if(_0x23a510){if(_0x2605d1(0x235)!==_0x2605d1(0x235)){const _0x4011d4=_0x2ed389[_0x2605d1(0x7a5)]();if(_0x4011d4)_0x4011d4[_0x2605d1(0x5ab)](_0x32732e);}else _0x23a510[_0x2605d1(0x68b)]();}}}},Scene_Map['prototype'][_0x4396be(0x41b)]=function(_0x1574f4,_0x230cb2){const _0x26d2bb=_0x4396be,_0x4ee607=$dataCommonEvents[_0x1574f4];if(!_0x4ee607)return;const _0x10b9a8=new Game_OnceParallelInterpreter();this[_0x26d2bb(0x441)](_0x10b9a8),_0x10b9a8[_0x26d2bb(0x6bb)](_0x1574f4),_0x10b9a8[_0x26d2bb(0x3bc)](_0x230cb2);},Scene_Map['prototype'][_0x4396be(0x441)]=function(_0x31591b){const _0x393c0d=_0x4396be;this[_0x393c0d(0x679)]=this[_0x393c0d(0x679)]||[],this['_onceParallelInterpreters']['push'](_0x31591b);},Scene_Map['prototype'][_0x4396be(0x72f)]=function(_0x267183){const _0x239fdd=_0x4396be;this['_onceParallelInterpreters']=this[_0x239fdd(0x679)]||[],this[_0x239fdd(0x679)]['remove'](_0x267183);};function Game_OnceParallelInterpreter(){const _0x15cbbc=_0x4396be;this[_0x15cbbc(0x480)](...arguments);}Game_OnceParallelInterpreter[_0x4396be(0x56f)]=Object[_0x4396be(0x207)](Game_Interpreter[_0x4396be(0x56f)]),Game_OnceParallelInterpreter[_0x4396be(0x56f)][_0x4396be(0x558)]=Game_OnceParallelInterpreter,Game_OnceParallelInterpreter[_0x4396be(0x56f)][_0x4396be(0x6bb)]=function(_0x6b7e44){const _0x3c20f7=_0x4396be,_0x1d4e8b=$dataCommonEvents[_0x6b7e44];if(_0x1d4e8b)this['setup'](_0x1d4e8b[_0x3c20f7(0x4e4)],0x0);else{if(_0x3c20f7(0x6e7)===_0x3c20f7(0x955))for(let _0x3baa24=0x1;_0x3baa24<=0x64;_0x3baa24++){_0x31fc6e[_0x3c20f7(0x5ef)](_0x3baa24);}else this[_0x3c20f7(0x9b4)]();}},Game_OnceParallelInterpreter[_0x4396be(0x56f)]['setEvent']=function(_0x2a3190){this['_eventId']=_0x2a3190||0x0;},Game_OnceParallelInterpreter[_0x4396be(0x56f)][_0x4396be(0x9b4)]=function(){const _0x38a181=_0x4396be;if(!SceneManager[_0x38a181(0x7ee)]())return;SceneManager['_scene'][_0x38a181(0x72f)](this),Game_Interpreter[_0x38a181(0x56f)][_0x38a181(0x9b4)][_0x38a181(0x8ee)](this);},VisuMZ['CoreEngine']['Scene_MenuBase_helpAreaTop']=Scene_MenuBase[_0x4396be(0x56f)][_0x4396be(0x2da)],Scene_MenuBase['prototype']['helpAreaTop']=function(){const _0xcc6d21=_0x4396be;let _0x42e4d4=0x0;if(SceneManager['areButtonsOutsideMainUI']()){if(_0xcc6d21(0x5e1)!==_0xcc6d21(0x5e1))return this['_fauxAnimationSprites']['length']>0x0;else _0x42e4d4=this[_0xcc6d21(0x7cb)]();}else _0x42e4d4=VisuMZ[_0xcc6d21(0x7c7)]['Scene_MenuBase_helpAreaTop'][_0xcc6d21(0x8ee)](this);return _0x42e4d4;},Scene_MenuBase[_0x4396be(0x56f)]['helpAreaTopSideButtonLayout']=function(){const _0xaf3de2=_0x4396be;return this['isBottomHelpMode']()?this[_0xaf3de2(0x6d8)]():_0xaf3de2(0x5e7)!==_0xaf3de2(0x94b)?0x0:this[_0xaf3de2(0x1ff)](_0x3a0265(_0x50f122));},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x893)]=Scene_MenuBase[_0x4396be(0x56f)][_0x4396be(0x55a)],Scene_MenuBase['prototype']['mainAreaTop']=function(){const _0x14cbcf=_0x4396be;return SceneManager[_0x14cbcf(0x80a)]()?this['mainAreaTopSideButtonLayout']():_0x14cbcf(0x2e0)!=='aogFS'?![]:VisuMZ[_0x14cbcf(0x7c7)][_0x14cbcf(0x893)]['call'](this);},Scene_MenuBase[_0x4396be(0x56f)]['mainAreaTopSideButtonLayout']=function(){const _0x48012f=_0x4396be;if(!this[_0x48012f(0x36f)]()){if(_0x48012f(0x72c)===_0x48012f(0x907))this[_0x48012f(0x65b)]();else return this['helpAreaBottom']();}else return this[_0x48012f(0x448)]()&&this[_0x48012f(0x9e4)]()===_0x48012f(0x55e)?Window_ButtonAssist[_0x48012f(0x56f)][_0x48012f(0x694)]():0x0;},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x9e0)]=Scene_MenuBase[_0x4396be(0x56f)]['mainAreaHeight'],Scene_MenuBase[_0x4396be(0x56f)][_0x4396be(0x98a)]=function(){const _0x15ca64=_0x4396be;let _0x2883e2=0x0;return SceneManager[_0x15ca64(0x80a)]()?_0x2883e2=this[_0x15ca64(0x3aa)]():_0x2883e2=VisuMZ[_0x15ca64(0x7c7)][_0x15ca64(0x9e0)][_0x15ca64(0x8ee)](this),this[_0x15ca64(0x448)]()&&this[_0x15ca64(0x9e4)]()!=='button'&&(_0x15ca64(0x18c)==='gbzsH'?_0x2883e2-=Window_ButtonAssist[_0x15ca64(0x56f)]['lineHeight']():this[_0x15ca64(0x50d)]=0x1),_0x2883e2;},Scene_MenuBase[_0x4396be(0x56f)]['mainAreaHeightSideButtonLayout']=function(){const _0x1865cf=_0x4396be;return Graphics[_0x1865cf(0x511)]-this[_0x1865cf(0x44d)]();},VisuMZ[_0x4396be(0x7c7)]['Scene_MenuBase_createBackground']=Scene_MenuBase[_0x4396be(0x56f)][_0x4396be(0x403)],Scene_MenuBase[_0x4396be(0x56f)][_0x4396be(0x403)]=function(){const _0x3142d2=_0x4396be,_0x3fe504=VisuMZ[_0x3142d2(0x7c7)][_0x3142d2(0x624)][_0x3142d2(0x5bd)]['BlurStrength']??0x8;this[_0x3142d2(0x49e)]=new PIXI[(_0x3142d2(0x971))][(_0x3142d2(0x170))](_0x3fe504),this[_0x3142d2(0x7a8)]=new Sprite(),this[_0x3142d2(0x7a8)][_0x3142d2(0x2e6)]=SceneManager[_0x3142d2(0x24f)](),this['_backgroundSprite'][_0x3142d2(0x971)]=[this['_backgroundFilter']],this[_0x3142d2(0x19c)](this[_0x3142d2(0x7a8)]),this['setBackgroundOpacity'](0xc0),this[_0x3142d2(0x4d4)](this[_0x3142d2(0x7b5)]()),this[_0x3142d2(0x3a4)]();},Scene_MenuBase[_0x4396be(0x56f)][_0x4396be(0x7b5)]=function(){const _0xf20c45=_0x4396be,_0x22667c=String(this[_0xf20c45(0x558)]['name']),_0x587cda=this[_0xf20c45(0x124)](_0x22667c);if(_0x587cda){if(_0xf20c45(0x4c2)===_0xf20c45(0x4c2))return _0x587cda[_0xf20c45(0x2a7)];else{this[_0xf20c45(0x275)][_0xf20c45(0x7db)]();for(let _0x538528=0x1;_0x538528<=0x5;_0x538528++){this[_0xf20c45(0x579)](_0x538528);}}}else return 0xc0;},Scene_MenuBase[_0x4396be(0x56f)][_0x4396be(0x3a4)]=function(){const _0x26228f=_0x4396be,_0x541e04=String(this[_0x26228f(0x558)][_0x26228f(0x862)]),_0x432bde=this[_0x26228f(0x124)](_0x541e04);_0x432bde&&(_0x432bde[_0x26228f(0xba)]!==''||_0x432bde[_0x26228f(0x80c)]!=='')&&('rfICN'!==_0x26228f(0x9d4)?this['_forcedBattleSys']=0x0:(this['_backSprite1']=new Sprite(ImageManager[_0x26228f(0xff)](_0x432bde[_0x26228f(0xba)])),this[_0x26228f(0x7b9)]=new Sprite(ImageManager['loadTitle2'](_0x432bde[_0x26228f(0x80c)])),this[_0x26228f(0x19c)](this[_0x26228f(0x5f3)]),this[_0x26228f(0x19c)](this['_backSprite2']),this[_0x26228f(0x5f3)][_0x26228f(0x2e6)]['addLoadListener'](this[_0x26228f(0x7e8)][_0x26228f(0x7d9)](this,this[_0x26228f(0x5f3)])),this['_backSprite2'][_0x26228f(0x2e6)][_0x26228f(0x9aa)](this[_0x26228f(0x7e8)][_0x26228f(0x7d9)](this,this[_0x26228f(0x7b9)]))));},Scene_MenuBase[_0x4396be(0x56f)][_0x4396be(0x124)]=function(_0x35a732){const _0xdf9c21=_0x4396be;return VisuMZ[_0xdf9c21(0x7c7)]['Settings'][_0xdf9c21(0x5bd)][_0x35a732]||VisuMZ['CoreEngine'][_0xdf9c21(0x624)][_0xdf9c21(0x5bd)][_0xdf9c21(0x977)];},Scene_MenuBase[_0x4396be(0x56f)][_0x4396be(0x7e8)]=function(_0x51bc86){const _0x77c0f3=_0x4396be;this[_0x77c0f3(0x671)](_0x51bc86),this[_0x77c0f3(0x32c)](_0x51bc86);},VisuMZ['CoreEngine']['Scene_MenuBase_createCancelButton']=Scene_MenuBase[_0x4396be(0x56f)][_0x4396be(0x42c)],Scene_MenuBase[_0x4396be(0x56f)][_0x4396be(0x42c)]=function(){const _0x560f24=_0x4396be;VisuMZ[_0x560f24(0x7c7)][_0x560f24(0x3f2)][_0x560f24(0x8ee)](this);if(SceneManager[_0x560f24(0x273)]()){if(_0x560f24(0xdc)!==_0x560f24(0x1da))this[_0x560f24(0xc0)]();else{let _0x1d8321=_0x5accd5;if(_0x1d8321[0x0]==='0')return _0x1d8321;if(_0x1d8321[_0x1d8321[_0x560f24(0x858)]-0x1]==='.')return _0x241dd5(_0x1d8321)[_0x560f24(0x410)](_0xa712fa,_0x410161)+'.';else return _0x1d8321[_0x1d8321[_0x560f24(0x858)]-0x1]===','?_0x1948da(_0x1d8321)[_0x560f24(0x410)](_0x5a9380,_0x2d48ff)+',':_0x4c82fe(_0x1d8321)[_0x560f24(0x410)](_0x49ee77,_0x4cb242);}}},Scene_MenuBase[_0x4396be(0x56f)]['moveCancelButtonSideButtonLayout']=function(){const _0x1f7df6=_0x4396be;this[_0x1f7df6(0x375)]['x']=Graphics['boxWidth']+0x4;},VisuMZ['CoreEngine']['Scene_MenuBase_createPageButtons']=Scene_MenuBase[_0x4396be(0x56f)][_0x4396be(0x3d4)],Scene_MenuBase[_0x4396be(0x56f)][_0x4396be(0x3d4)]=function(){const _0x279cf0=_0x4396be;VisuMZ[_0x279cf0(0x7c7)][_0x279cf0(0x513)][_0x279cf0(0x8ee)](this);if(SceneManager[_0x279cf0(0x273)]()){if(_0x279cf0(0x917)===_0x279cf0(0x917))this[_0x279cf0(0x372)]();else{let _0xc63cca=_0x303e9a[_0x279cf0(0x192)](_0x232433['id']);this[_0x279cf0(0x644)](_0xc63cca);}}},Scene_MenuBase[_0x4396be(0x56f)]['movePageButtonSideButtonLayout']=function(){const _0x5ac698=_0x4396be;this['_pageupButton']['x']=-0x1*(this[_0x5ac698(0x2cf)][_0x5ac698(0x67f)]+this['_pagedownButton'][_0x5ac698(0x67f)]+0x8),this['_pagedownButton']['x']=-0x1*(this[_0x5ac698(0x27d)][_0x5ac698(0x67f)]+0x4);},Scene_MenuBase[_0x4396be(0x56f)][_0x4396be(0x448)]=function(){const _0x5c5038=_0x4396be;return VisuMZ[_0x5c5038(0x7c7)][_0x5c5038(0x624)][_0x5c5038(0x775)][_0x5c5038(0x98e)];},Scene_MenuBase['prototype'][_0x4396be(0x9e4)]=function(){const _0x5c87ee=_0x4396be;return SceneManager[_0x5c87ee(0x273)]()||SceneManager[_0x5c87ee(0x446)]()?VisuMZ[_0x5c87ee(0x7c7)][_0x5c87ee(0x624)][_0x5c87ee(0x775)][_0x5c87ee(0x690)]:'kxjFQ'!=='FWccs'?'button':this[_0x5c87ee(0x242)](_0x178256);},Scene_MenuBase[_0x4396be(0x56f)][_0x4396be(0x650)]=function(){const _0x40e655=_0x4396be;if(!this[_0x40e655(0x448)]())return;const _0x5d0dae=this[_0x40e655(0x758)]();this['_buttonAssistWindow']=new Window_ButtonAssist(_0x5d0dae),this['addWindow'](this['_buttonAssistWindow']);},Scene_MenuBase[_0x4396be(0x56f)][_0x4396be(0x758)]=function(){const _0x2dbd81=_0x4396be;if(this[_0x2dbd81(0x9e4)]()==='button'){if('SNtbZ'==='ZMbky')_0x438534['CoreEngine']['Spriteset_Base_updatePosition'][_0x2dbd81(0x8ee)](this),this['updatePositionCoreEngine']();else return this[_0x2dbd81(0x63a)]();}else return this[_0x2dbd81(0x787)]();},Scene_MenuBase['prototype'][_0x4396be(0x63a)]=function(){const _0x189196=_0x4396be,_0x517341=ConfigManager[_0x189196(0x9c9)]?(Sprite_Button[_0x189196(0x56f)][_0x189196(0x959)]()+0x6)*0x2:0x0,_0x531a1e=this['buttonY'](),_0x2bcd31=Graphics[_0x189196(0x986)]-_0x517341*0x2,_0x45ab3d=this[_0x189196(0x28e)]();return new Rectangle(_0x517341,_0x531a1e,_0x2bcd31,_0x45ab3d);},Scene_MenuBase[_0x4396be(0x56f)][_0x4396be(0x787)]=function(){const _0x58d5c1=_0x4396be,_0x17f1f7=Graphics[_0x58d5c1(0x986)],_0x14928b=Window_ButtonAssist[_0x58d5c1(0x56f)][_0x58d5c1(0x694)](),_0xba7878=0x0;let _0x166915=0x0;if(this[_0x58d5c1(0x9e4)]()==='top'){if(_0x58d5c1(0x952)==='IvNla')return _0x32a7eb[_0x58d5c1(0x7c7)]['Window_refreshBack'][_0x58d5c1(0x8ee)](this);else _0x166915=0x0;}else{if(_0x58d5c1(0x3a7)!=='rBFHX'){const _0xa757b8=_0x2157a2[_0x2ed7c6];_0xa757b8[_0x58d5c1(0x862)][_0x58d5c1(0x8e4)](/(.*)\/(.*)/i)&&(_0xa757b8[_0x58d5c1(0x862)]=_0xe3de2c(_0x5836a['$2']['trim']()));}else _0x166915=Graphics[_0x58d5c1(0x511)]-_0x14928b;}return new Rectangle(_0xba7878,_0x166915,_0x17f1f7,_0x14928b);},Scene_Menu[_0x4396be(0x83c)]=VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x624)][_0x4396be(0xae)][_0x4396be(0xfa)],VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x2df)]=Scene_Menu[_0x4396be(0x56f)][_0x4396be(0x207)],Scene_Menu[_0x4396be(0x56f)]['create']=function(){const _0xa198ec=_0x4396be;VisuMZ['CoreEngine'][_0xa198ec(0x2df)][_0xa198ec(0x8ee)](this),this[_0xa198ec(0x673)]();},Scene_Menu[_0x4396be(0x56f)]['setCoreEngineUpdateWindowBg']=function(){const _0x3b8ff6=_0x4396be;this[_0x3b8ff6(0x84e)]&&(_0x3b8ff6(0x5e9)===_0x3b8ff6(0x5e9)?this['_commandWindow'][_0x3b8ff6(0x2dd)](Scene_Menu[_0x3b8ff6(0x83c)][_0x3b8ff6(0x2a5)]):this['_forcedTroopView']='SV');if(this[_0x3b8ff6(0x4b0)]){if(_0x3b8ff6(0x2b8)!==_0x3b8ff6(0x39a))this['_goldWindow'][_0x3b8ff6(0x2dd)](Scene_Menu[_0x3b8ff6(0x83c)][_0x3b8ff6(0x822)]);else{if(_0x3bd3d7[_0x3b8ff6(0x633)]!==this[_0x3b8ff6(0x633)]())return![];return _0x2f116e[_0x3b8ff6(0x7c7)]['Settings'][_0x3b8ff6(0x740)][_0x3b8ff6(0x826)];}}if(this[_0x3b8ff6(0x457)]){if(_0x3b8ff6(0x97c)!=='PeMXu')this['_statusWindow'][_0x3b8ff6(0x2dd)](Scene_Menu['layoutSettings'][_0x3b8ff6(0x391)]);else return _0x9cc59e[_0x3b8ff6(0x57d)](_0x3b8ff6(0x72e),_0x3b8ff6(0x1c9));}},Scene_Menu[_0x4396be(0x56f)][_0x4396be(0x20b)]=function(){const _0x214b34=_0x4396be;return Scene_Menu[_0x214b34(0x83c)][_0x214b34(0x350)]['call'](this);},Scene_Menu[_0x4396be(0x56f)][_0x4396be(0x9c0)]=function(){const _0x45f4b9=_0x4396be;return Scene_Menu[_0x45f4b9(0x83c)]['GoldRect'][_0x45f4b9(0x8ee)](this);},Scene_Menu[_0x4396be(0x56f)]['statusWindowRect']=function(){const _0x41002c=_0x4396be;return Scene_Menu[_0x41002c(0x83c)][_0x41002c(0x610)]['call'](this);},Scene_Item[_0x4396be(0x83c)]=VisuMZ[_0x4396be(0x7c7)]['Settings'][_0x4396be(0xae)][_0x4396be(0x516)],VisuMZ['CoreEngine']['Scene_Item_create']=Scene_Item[_0x4396be(0x56f)][_0x4396be(0x207)],Scene_Item[_0x4396be(0x56f)][_0x4396be(0x207)]=function(){const _0x4e6633=_0x4396be;VisuMZ[_0x4e6633(0x7c7)]['Scene_Item_create'][_0x4e6633(0x8ee)](this),this[_0x4e6633(0x673)]();},Scene_Item[_0x4396be(0x56f)][_0x4396be(0x673)]=function(){const _0x482e96=_0x4396be;this[_0x482e96(0x746)]&&this['_helpWindow']['setBackgroundType'](Scene_Item[_0x482e96(0x83c)]['HelpBgType']);this[_0x482e96(0x845)]&&this[_0x482e96(0x845)][_0x482e96(0x2dd)](Scene_Item[_0x482e96(0x83c)]['CategoryBgType']);if(this[_0x482e96(0x69a)]){if('lhuxw'!==_0x482e96(0x388)){var _0x10e59c=_0x4191f8[_0x482e96(0x7c7)][_0x482e96(0x876)][_0x482e96(0x8ee)](this,_0x219fe0,_0x390eae,_0x3244a9,_0x10d622);if(this['useDigitGroupingEx']())_0x10e59c[_0x482e96(0x915)]=_0x5cf6d4(_0xc6524f[_0x482e96(0x370)](_0x10e59c[_0x482e96(0x915)]))||'';return _0x10e59c;}else this['_itemWindow'][_0x482e96(0x2dd)](Scene_Item['layoutSettings'][_0x482e96(0x1f8)]);}if(this['_actorWindow']){if('JLyAC'!==_0x482e96(0x5c2))this[_0x482e96(0x4a5)][_0x482e96(0x2dd)](Scene_Item[_0x482e96(0x83c)][_0x482e96(0x33a)]);else{_0x1b4b7e[_0x482e96(0x7c7)][_0x482e96(0x8a3)]['call'](this,_0x12a19d);if(_0x3ae280[_0x482e96(0x7c7)][_0x482e96(0x624)][_0x482e96(0x9e8)][_0x482e96(0x94d)])return;const _0x195500=_0x3a6bb4[_0x482e96(0x79a)]();_0x195500[_0x482e96(0x1cb)]&&(0x1-this[_0x482e96(0x3af)](_0xd5e3f1)>this[_0x482e96(0x929)](_0xc94ca3)&&(_0x195500[_0x482e96(0x1cb)]=![],_0x195500[_0x482e96(0x434)]=!![]));}}},Scene_Item[_0x4396be(0x56f)]['helpWindowRect']=function(){const _0x181a9b=_0x4396be;return Scene_Item['layoutSettings'][_0x181a9b(0x237)][_0x181a9b(0x8ee)](this);},Scene_Item[_0x4396be(0x56f)]['categoryWindowRect']=function(){const _0x4e130d=_0x4396be;return Scene_Item[_0x4e130d(0x83c)][_0x4e130d(0x100)][_0x4e130d(0x8ee)](this);},Scene_Item[_0x4396be(0x56f)][_0x4396be(0x494)]=function(){const _0x4ac497=_0x4396be;return Scene_Item[_0x4ac497(0x83c)][_0x4ac497(0x28a)][_0x4ac497(0x8ee)](this);},Scene_Item[_0x4396be(0x56f)][_0x4396be(0x144)]=function(){const _0x5d7ba0=_0x4396be;return Scene_Item[_0x5d7ba0(0x83c)][_0x5d7ba0(0x74b)][_0x5d7ba0(0x8ee)](this);},Scene_Skill[_0x4396be(0x83c)]=VisuMZ[_0x4396be(0x7c7)]['Settings']['MenuLayout'][_0x4396be(0x181)],VisuMZ[_0x4396be(0x7c7)]['Scene_Skill_create']=Scene_Skill[_0x4396be(0x56f)][_0x4396be(0x207)],Scene_Skill[_0x4396be(0x56f)][_0x4396be(0x207)]=function(){const _0x513ec3=_0x4396be;VisuMZ[_0x513ec3(0x7c7)][_0x513ec3(0x59f)][_0x513ec3(0x8ee)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Skill[_0x4396be(0x56f)][_0x4396be(0x673)]=function(){const _0xedd79c=_0x4396be;this[_0xedd79c(0x746)]&&this[_0xedd79c(0x746)][_0xedd79c(0x2dd)](Scene_Skill['layoutSettings']['HelpBgType']);if(this['_skillTypeWindow']){if(_0xedd79c(0x147)===_0xedd79c(0x147))this[_0xedd79c(0x5a7)][_0xedd79c(0x2dd)](Scene_Skill[_0xedd79c(0x83c)][_0xedd79c(0x993)]);else{if(_0x1f3320)_0x234cf3[_0xedd79c(0x27f)](_0x24deb9);}}this[_0xedd79c(0x457)]&&this[_0xedd79c(0x457)][_0xedd79c(0x2dd)](Scene_Skill[_0xedd79c(0x83c)][_0xedd79c(0x391)]);if(this[_0xedd79c(0x69a)]){if(_0xedd79c(0x34d)!==_0xedd79c(0x2c1))this[_0xedd79c(0x69a)][_0xedd79c(0x2dd)](Scene_Skill[_0xedd79c(0x83c)]['ItemBgType']);else{var _0x2e22fb=_0x58cfd6(_0x3668de['$1'])/0x64;_0x51c6b9+=_0x2e22fb;}}if(this[_0xedd79c(0x4a5)]){if(_0xedd79c(0x664)!==_0xedd79c(0x5cd))this['_actorWindow'][_0xedd79c(0x2dd)](Scene_Skill[_0xedd79c(0x83c)][_0xedd79c(0x33a)]);else{if(!this['isMenuButtonAssistEnabled']())return;const _0x1c752b=this[_0xedd79c(0x758)]();this[_0xedd79c(0x1ab)]=new _0x49ed66(_0x1c752b),this[_0xedd79c(0x497)](this[_0xedd79c(0x1ab)]);}}},Scene_Skill[_0x4396be(0x56f)][_0x4396be(0x611)]=function(){const _0x583a4d=_0x4396be;return Scene_Skill[_0x583a4d(0x83c)]['HelpRect']['call'](this);},Scene_Skill[_0x4396be(0x56f)]['skillTypeWindowRect']=function(){const _0x39506f=_0x4396be;return Scene_Skill[_0x39506f(0x83c)][_0x39506f(0x8b3)][_0x39506f(0x8ee)](this);},Scene_Skill[_0x4396be(0x56f)][_0x4396be(0x1a5)]=function(){const _0x3b54dc=_0x4396be;return Scene_Skill['layoutSettings'][_0x3b54dc(0x610)][_0x3b54dc(0x8ee)](this);},Scene_Skill[_0x4396be(0x56f)]['itemWindowRect']=function(){const _0xf0d452=_0x4396be;return Scene_Skill[_0xf0d452(0x83c)][_0xf0d452(0x28a)][_0xf0d452(0x8ee)](this);},Scene_Skill[_0x4396be(0x56f)][_0x4396be(0x144)]=function(){const _0x2bffc0=_0x4396be;return Scene_Skill[_0x2bffc0(0x83c)][_0x2bffc0(0x74b)][_0x2bffc0(0x8ee)](this);},Scene_Equip[_0x4396be(0x83c)]=VisuMZ['CoreEngine'][_0x4396be(0x624)][_0x4396be(0xae)][_0x4396be(0x530)],VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x632)]=Scene_Equip[_0x4396be(0x56f)][_0x4396be(0x207)],Scene_Equip[_0x4396be(0x56f)][_0x4396be(0x207)]=function(){const _0x1ad06=_0x4396be;VisuMZ[_0x1ad06(0x7c7)][_0x1ad06(0x632)][_0x1ad06(0x8ee)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Equip[_0x4396be(0x56f)]['setCoreEngineUpdateWindowBg']=function(){const _0x5888a9=_0x4396be;if(this[_0x5888a9(0x746)]){if(_0x5888a9(0x70e)!=='VCrCc'){const _0x16afb8=_0x16a358[_0x5888a9(0x7c7)][_0x5888a9(0x624)][_0x5888a9(0x4bc)];return _0x16afb8[_0x5888a9(0x896)]||_0x5888a9(0x364);}else this[_0x5888a9(0x746)][_0x5888a9(0x2dd)](Scene_Equip[_0x5888a9(0x83c)][_0x5888a9(0x3b8)]);}this[_0x5888a9(0x457)]&&this[_0x5888a9(0x457)][_0x5888a9(0x2dd)](Scene_Equip[_0x5888a9(0x83c)][_0x5888a9(0x391)]);if(this[_0x5888a9(0x84e)]){if(_0x5888a9(0x594)!==_0x5888a9(0x594))return this[_0x5888a9(0x9e4)]()===_0x5888a9(0x3b4)?this[_0x5888a9(0x63a)]():this[_0x5888a9(0x787)]();else this[_0x5888a9(0x84e)][_0x5888a9(0x2dd)](Scene_Equip['layoutSettings'][_0x5888a9(0x2a5)]);}this[_0x5888a9(0x949)]&&this['_slotWindow'][_0x5888a9(0x2dd)](Scene_Equip[_0x5888a9(0x83c)][_0x5888a9(0x61e)]),this[_0x5888a9(0x69a)]&&this['_itemWindow']['setBackgroundType'](Scene_Equip[_0x5888a9(0x83c)][_0x5888a9(0x1f8)]);},Scene_Equip['prototype'][_0x4396be(0x611)]=function(){const _0xfcdd56=_0x4396be;return Scene_Equip[_0xfcdd56(0x83c)]['HelpRect'][_0xfcdd56(0x8ee)](this);},Scene_Equip[_0x4396be(0x56f)][_0x4396be(0x1a5)]=function(){const _0xaa5647=_0x4396be;return Scene_Equip[_0xaa5647(0x83c)][_0xaa5647(0x610)][_0xaa5647(0x8ee)](this);},Scene_Equip[_0x4396be(0x56f)][_0x4396be(0x20b)]=function(){const _0x23337c=_0x4396be;return Scene_Equip[_0x23337c(0x83c)]['CommandRect'][_0x23337c(0x8ee)](this);},Scene_Equip[_0x4396be(0x56f)][_0x4396be(0x979)]=function(){const _0x151523=_0x4396be;return Scene_Equip[_0x151523(0x83c)][_0x151523(0x6ce)][_0x151523(0x8ee)](this);},Scene_Equip[_0x4396be(0x56f)][_0x4396be(0x494)]=function(){const _0x2d2f86=_0x4396be;return Scene_Equip[_0x2d2f86(0x83c)][_0x2d2f86(0x28a)]['call'](this);},Scene_Status[_0x4396be(0x83c)]=VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x624)]['MenuLayout'][_0x4396be(0x420)],VisuMZ['CoreEngine'][_0x4396be(0x12d)]=Scene_Status[_0x4396be(0x56f)][_0x4396be(0x207)],Scene_Status['prototype'][_0x4396be(0x207)]=function(){const _0x4e318e=_0x4396be;VisuMZ[_0x4e318e(0x7c7)]['Scene_Status_create'][_0x4e318e(0x8ee)](this),this[_0x4e318e(0x673)]();},Scene_Status[_0x4396be(0x56f)][_0x4396be(0x673)]=function(){const _0x313d02=_0x4396be;this[_0x313d02(0x583)]&&(_0x313d02(0x45c)!==_0x313d02(0x45c)?(this[_0x313d02(0x88a)]=_0x40b052,this[_0x313d02(0x43c)]=_0x1941d3[_0x313d02(0x713)](this[_0x313d02(0x88a)])):this[_0x313d02(0x583)]['setBackgroundType'](Scene_Status[_0x313d02(0x83c)][_0x313d02(0x902)]));if(this[_0x313d02(0x457)]){if(_0x313d02(0x880)!==_0x313d02(0x880)){if(this[_0x313d02(0x42e)]===_0x5dab87)this[_0x313d02(0x31a)]();this[_0x313d02(0x42e)]['target']+=_0xf3f341||0x0,this[_0x313d02(0x42e)][_0x313d02(0x5cc)]=_0x2dfab3||0x0,this[_0x313d02(0x42e)][_0x313d02(0x161)]=_0xd7c7c0||0x0,this[_0x313d02(0x42e)][_0x313d02(0x152)]=_0x4ddb1c||'Linear',_0x21758d<=0x0&&(this['_anglePlus'][_0x313d02(0x2b7)]=this[_0x313d02(0x42e)]['target']);}else this[_0x313d02(0x457)]['setBackgroundType'](Scene_Status['layoutSettings'][_0x313d02(0x391)]);}this['_statusParamsWindow']&&this[_0x313d02(0x25b)][_0x313d02(0x2dd)](Scene_Status[_0x313d02(0x83c)][_0x313d02(0x2fd)]),this[_0x313d02(0x802)]&&this[_0x313d02(0x802)][_0x313d02(0x2dd)](Scene_Status[_0x313d02(0x83c)][_0x313d02(0x2d9)]);},Scene_Status[_0x4396be(0x56f)][_0x4396be(0x963)]=function(){const _0x50abaf=_0x4396be;return Scene_Status[_0x50abaf(0x83c)][_0x50abaf(0x545)][_0x50abaf(0x8ee)](this);},Scene_Status[_0x4396be(0x56f)][_0x4396be(0x1a5)]=function(){const _0x293fd1=_0x4396be;return Scene_Status[_0x293fd1(0x83c)]['StatusRect'][_0x293fd1(0x8ee)](this);},Scene_Status[_0x4396be(0x56f)][_0x4396be(0x33c)]=function(){const _0x2cd928=_0x4396be;return Scene_Status[_0x2cd928(0x83c)][_0x2cd928(0x4f4)][_0x2cd928(0x8ee)](this);},Scene_Status[_0x4396be(0x56f)]['statusEquipWindowRect']=function(){const _0x42585d=_0x4396be;return Scene_Status['layoutSettings'][_0x42585d(0x9a2)][_0x42585d(0x8ee)](this);},Scene_Options[_0x4396be(0x83c)]=VisuMZ['CoreEngine'][_0x4396be(0x624)][_0x4396be(0xae)][_0x4396be(0xcb)],VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x8f7)]=Scene_Options['prototype'][_0x4396be(0x207)],Scene_Options[_0x4396be(0x56f)][_0x4396be(0x207)]=function(){const _0x471151=_0x4396be;VisuMZ[_0x471151(0x7c7)][_0x471151(0x8f7)]['call'](this),this['setCoreEngineUpdateWindowBg']();},Scene_Options[_0x4396be(0x56f)][_0x4396be(0x673)]=function(){const _0x4a8cff=_0x4396be;this['_optionsWindow']&&this[_0x4a8cff(0x3d7)][_0x4a8cff(0x2dd)](Scene_Options[_0x4a8cff(0x83c)]['OptionsBgType']);},Scene_Options['prototype'][_0x4396be(0x6b4)]=function(){const _0xd1147b=_0x4396be;return Scene_Options[_0xd1147b(0x83c)][_0xd1147b(0x175)][_0xd1147b(0x8ee)](this);},Scene_Save[_0x4396be(0x83c)]=VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x624)]['MenuLayout'][_0x4396be(0x1a3)],Scene_Save[_0x4396be(0x56f)][_0x4396be(0x207)]=function(){const _0x4d7b18=_0x4396be;Scene_File['prototype']['create']['call'](this),this[_0x4d7b18(0x673)]();},Scene_Save['prototype'][_0x4396be(0x673)]=function(){const _0x362546=_0x4396be;this['_helpWindow']&&(_0x362546(0x456)!==_0x362546(0x5e0)?this[_0x362546(0x746)]['setBackgroundType'](Scene_Save[_0x362546(0x83c)]['HelpBgType']):this[_0x362546(0x8e9)](_0x410df7['min'](this[_0x362546(0x6fc)](),0x0))),this[_0x362546(0x486)]&&(_0x362546(0x3df)!==_0x362546(0x316)?this[_0x362546(0x486)][_0x362546(0x2dd)](Scene_Save[_0x362546(0x83c)][_0x362546(0x7f6)]):this['_forcedTroopView']='FV');},Scene_Save['prototype'][_0x4396be(0x611)]=function(){const _0x43b51d=_0x4396be;return Scene_Save[_0x43b51d(0x83c)][_0x43b51d(0x237)][_0x43b51d(0x8ee)](this);},Scene_Save[_0x4396be(0x56f)][_0x4396be(0x70f)]=function(){const _0x34ae27=_0x4396be;return Scene_Save[_0x34ae27(0x83c)][_0x34ae27(0x973)]['call'](this);},Scene_Load[_0x4396be(0x83c)]=VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x624)]['MenuLayout'][_0x4396be(0x21b)],Scene_Load[_0x4396be(0x56f)][_0x4396be(0x207)]=function(){const _0x167a95=_0x4396be;Scene_File[_0x167a95(0x56f)][_0x167a95(0x207)][_0x167a95(0x8ee)](this),this[_0x167a95(0x673)]();},Scene_Load['prototype'][_0x4396be(0x673)]=function(){const _0x1da448=_0x4396be;this['_helpWindow']&&this[_0x1da448(0x746)]['setBackgroundType'](Scene_Load[_0x1da448(0x83c)][_0x1da448(0x3b8)]),this[_0x1da448(0x486)]&&this[_0x1da448(0x486)][_0x1da448(0x2dd)](Scene_Load[_0x1da448(0x83c)]['ListBgType']);},Scene_Load[_0x4396be(0x56f)][_0x4396be(0x611)]=function(){const _0xf48e86=_0x4396be;return Scene_Load['layoutSettings']['HelpRect'][_0xf48e86(0x8ee)](this);},Scene_Load[_0x4396be(0x56f)][_0x4396be(0x70f)]=function(){const _0x34bbe1=_0x4396be;return Scene_Load['layoutSettings'][_0x34bbe1(0x973)][_0x34bbe1(0x8ee)](this);};function Scene_QuickLoad(){const _0x3e9ce4=_0x4396be;this[_0x3e9ce4(0x480)](...arguments);}Scene_QuickLoad[_0x4396be(0x56f)]=Object['create'](Scene_Load[_0x4396be(0x56f)]),Scene_QuickLoad[_0x4396be(0x56f)]['constructor']=Scene_QuickLoad,Scene_QuickLoad[_0x4396be(0x56f)][_0x4396be(0x480)]=function(){const _0x5c9b1f=_0x4396be;Scene_Load[_0x5c9b1f(0x56f)][_0x5c9b1f(0x480)][_0x5c9b1f(0x8ee)](this);},Scene_QuickLoad['prototype']['create']=function(){const _0x4063f8=_0x4396be;this[_0x4063f8(0x891)](this[_0x4063f8(0x96f)]);},Scene_QuickLoad[_0x4396be(0x56f)][_0x4396be(0x732)]=function(_0x210c51){this['_saveFileID']=_0x210c51;},Scene_QuickLoad[_0x4396be(0x56f)][_0x4396be(0x851)]=function(){const _0x173e1c=_0x4396be;Scene_MenuBase[_0x173e1c(0x56f)][_0x173e1c(0x851)][_0x173e1c(0x8ee)](this);},Scene_GameEnd[_0x4396be(0x83c)]=VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x624)][_0x4396be(0xae)][_0x4396be(0x84a)],VisuMZ[_0x4396be(0x7c7)]['Scene_GameEnd_createBackground']=Scene_GameEnd[_0x4396be(0x56f)][_0x4396be(0x403)],Scene_GameEnd[_0x4396be(0x56f)][_0x4396be(0x403)]=function(){const _0x1a4730=_0x4396be;Scene_MenuBase[_0x1a4730(0x56f)]['createBackground'][_0x1a4730(0x8ee)](this);},Scene_GameEnd['prototype'][_0x4396be(0x53d)]=function(){const _0x47bd79=_0x4396be,_0x53ae20=this['commandWindowRect']();this[_0x47bd79(0x84e)]=new Window_GameEnd(_0x53ae20),this['_commandWindow'][_0x47bd79(0x463)]('cancel',this['popScene']['bind'](this)),this['addWindow'](this[_0x47bd79(0x84e)]),this[_0x47bd79(0x84e)][_0x47bd79(0x2dd)](Scene_GameEnd['layoutSettings'][_0x47bd79(0x2a5)]);},Scene_GameEnd[_0x4396be(0x56f)]['commandWindowRect']=function(){const _0x4b7140=_0x4396be;return Scene_GameEnd[_0x4b7140(0x83c)][_0x4b7140(0x350)][_0x4b7140(0x8ee)](this);},Scene_Shop[_0x4396be(0x83c)]=VisuMZ['CoreEngine'][_0x4396be(0x624)][_0x4396be(0xae)][_0x4396be(0x8ad)],VisuMZ['CoreEngine'][_0x4396be(0x1ba)]=Scene_Shop[_0x4396be(0x56f)][_0x4396be(0x207)],Scene_Shop[_0x4396be(0x56f)][_0x4396be(0x207)]=function(){const _0x3f03d2=_0x4396be;VisuMZ[_0x3f03d2(0x7c7)][_0x3f03d2(0x1ba)][_0x3f03d2(0x8ee)](this),this[_0x3f03d2(0x673)]();},Scene_Shop[_0x4396be(0x56f)][_0x4396be(0x673)]=function(){const _0x52c9c5=_0x4396be;this[_0x52c9c5(0x746)]&&this[_0x52c9c5(0x746)]['setBackgroundType'](Scene_Shop[_0x52c9c5(0x83c)]['HelpBgType']);if(this[_0x52c9c5(0x4b0)]){if(_0x52c9c5(0x99c)===_0x52c9c5(0x102)){const _0x2ac072=_0x3725ef[_0x52c9c5(0x56f)]['traitObjects'][_0x52c9c5(0x8ee)](this);for(const _0x2c0408 of this['equips']()){_0x2c0408&&_0x2ac072['push'](_0x2c0408);}return _0x2ac072[_0x52c9c5(0x8ab)](this[_0x52c9c5(0x789)](),this[_0x52c9c5(0x4b5)]()),_0x2ac072;}else this[_0x52c9c5(0x4b0)][_0x52c9c5(0x2dd)](Scene_Shop['layoutSettings'][_0x52c9c5(0x822)]);}this[_0x52c9c5(0x84e)]&&this[_0x52c9c5(0x84e)]['setBackgroundType'](Scene_Shop[_0x52c9c5(0x83c)]['CommandBgType']);this[_0x52c9c5(0x10f)]&&this['_dummyWindow']['setBackgroundType'](Scene_Shop[_0x52c9c5(0x83c)][_0x52c9c5(0x6ca)]);this[_0x52c9c5(0x90e)]&&this[_0x52c9c5(0x90e)][_0x52c9c5(0x2dd)](Scene_Shop[_0x52c9c5(0x83c)]['NumberBgType']);this[_0x52c9c5(0x457)]&&(_0x52c9c5(0x90f)==='mSqmB'?this[_0x52c9c5(0x457)][_0x52c9c5(0x2dd)](Scene_Shop[_0x52c9c5(0x83c)][_0x52c9c5(0x391)]):(_0x5eaedb[_0x52c9c5(0x7c7)]['Game_Event_start']['call'](this),_0x195d67=this));this[_0x52c9c5(0xc2)]&&this['_buyWindow'][_0x52c9c5(0x2dd)](Scene_Shop[_0x52c9c5(0x83c)][_0x52c9c5(0x935)]);this[_0x52c9c5(0x845)]&&this[_0x52c9c5(0x845)]['setBackgroundType'](Scene_Shop[_0x52c9c5(0x83c)][_0x52c9c5(0x3ae)]);if(this[_0x52c9c5(0x7d8)]){if('iBeIL'===_0x52c9c5(0x626)){const _0x59c572=this[_0x52c9c5(0x789)]()[_0x52c9c5(0x3d3)][_0x329049][0x63],_0x538262=this[_0x52c9c5(0x789)]()['params'][_0x2f6fd0][0x62];return _0x59c572+(_0x59c572-_0x538262)*(this['level']-0x63);}else this[_0x52c9c5(0x7d8)][_0x52c9c5(0x2dd)](Scene_Shop[_0x52c9c5(0x83c)][_0x52c9c5(0x9f7)]);}},Scene_Shop['prototype']['helpWindowRect']=function(){const _0x1ba119=_0x4396be;return Scene_Shop[_0x1ba119(0x83c)]['HelpRect']['call'](this);},Scene_Shop[_0x4396be(0x56f)][_0x4396be(0x9c0)]=function(){const _0x40f377=_0x4396be;return Scene_Shop['layoutSettings'][_0x40f377(0x128)][_0x40f377(0x8ee)](this);},Scene_Shop[_0x4396be(0x56f)][_0x4396be(0x20b)]=function(){const _0x3858c9=_0x4396be;return Scene_Shop[_0x3858c9(0x83c)]['CommandRect'][_0x3858c9(0x8ee)](this);},Scene_Shop['prototype'][_0x4396be(0x21f)]=function(){const _0x49b9bf=_0x4396be;return Scene_Shop[_0x49b9bf(0x83c)][_0x49b9bf(0x88b)]['call'](this);},Scene_Shop[_0x4396be(0x56f)]['numberWindowRect']=function(){const _0x1d395e=_0x4396be;return Scene_Shop[_0x1d395e(0x83c)][_0x1d395e(0x1aa)][_0x1d395e(0x8ee)](this);},Scene_Shop[_0x4396be(0x56f)][_0x4396be(0x1a5)]=function(){const _0x4a0f61=_0x4396be;return Scene_Shop[_0x4a0f61(0x83c)]['StatusRect'][_0x4a0f61(0x8ee)](this);},Scene_Shop['prototype'][_0x4396be(0x796)]=function(){const _0x477894=_0x4396be;return Scene_Shop[_0x477894(0x83c)]['BuyRect']['call'](this);},Scene_Shop['prototype'][_0x4396be(0x2aa)]=function(){const _0x35c4ab=_0x4396be;return Scene_Shop[_0x35c4ab(0x83c)][_0x35c4ab(0x100)][_0x35c4ab(0x8ee)](this);},Scene_Shop[_0x4396be(0x56f)][_0x4396be(0x60e)]=function(){const _0x58630c=_0x4396be;return Scene_Shop['layoutSettings'][_0x58630c(0x9ca)][_0x58630c(0x8ee)](this);},Scene_Name['layoutSettings']=VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x624)][_0x4396be(0xae)][_0x4396be(0x62e)],VisuMZ[_0x4396be(0x7c7)]['Scene_Name_create']=Scene_Name[_0x4396be(0x56f)][_0x4396be(0x207)],Scene_Name[_0x4396be(0x56f)][_0x4396be(0x207)]=function(){const _0x135d1d=_0x4396be;VisuMZ['CoreEngine'][_0x135d1d(0x26d)]['call'](this),this[_0x135d1d(0x673)]();},Scene_Name[_0x4396be(0x56f)]['setCoreEngineUpdateWindowBg']=function(){const _0x5cb730=_0x4396be;if(this['_editWindow']){if(_0x5cb730(0x561)===_0x5cb730(0x561))this[_0x5cb730(0x830)][_0x5cb730(0x2dd)](Scene_Name[_0x5cb730(0x83c)]['EditBgType']);else return _0x4ba745;}this[_0x5cb730(0x6a8)]&&this[_0x5cb730(0x6a8)][_0x5cb730(0x2dd)](Scene_Name['layoutSettings']['InputBgType']);},Scene_Name[_0x4396be(0x56f)][_0x4396be(0x44d)]=function(){return 0x0;},Scene_Name[_0x4396be(0x56f)][_0x4396be(0x5e8)]=function(){const _0x131923=_0x4396be;return Scene_Name[_0x131923(0x83c)]['EditRect'][_0x131923(0x8ee)](this);},Scene_Name[_0x4396be(0x56f)]['inputWindowRect']=function(){const _0x2e3d70=_0x4396be;return Scene_Name[_0x2e3d70(0x83c)][_0x2e3d70(0xa0b)][_0x2e3d70(0x8ee)](this);},Scene_Name[_0x4396be(0x56f)][_0x4396be(0x8ba)]=function(){const _0x201878=_0x4396be;if(!this[_0x201878(0x6a8)])return![];return VisuMZ[_0x201878(0x7c7)]['Settings'][_0x201878(0x4bc)][_0x201878(0x8ba)];},Scene_Name[_0x4396be(0x56f)]['buttonAssistKey1']=function(){const _0x402786=_0x4396be;if(this[_0x402786(0x8ba)]()&&this[_0x402786(0x6a8)][_0x402786(0x258)]!==_0x402786(0x9eb))return TextManager[_0x402786(0x57d)](_0x402786(0x72e),_0x402786(0x1c9));return Scene_MenuBase[_0x402786(0x56f)][_0x402786(0x5c9)]['call'](this);},Scene_Name[_0x4396be(0x56f)][_0x4396be(0x6c8)]=function(){const _0x246da4=_0x4396be;if(this['EnableNameInput']())return TextManager[_0x246da4(0x35e)](_0x246da4(0x823));else{if(_0x246da4(0x198)===_0x246da4(0x198))return Scene_MenuBase['prototype'][_0x246da4(0x6c8)][_0x246da4(0x8ee)](this);else this[_0x246da4(0x676)]()?this['drawGoldItemStyle']():_0x4c774b[_0x246da4(0x7c7)][_0x246da4(0x18b)][_0x246da4(0x8ee)](this);}},Scene_Name[_0x4396be(0x56f)][_0x4396be(0x6c5)]=function(){const _0xdacfe=_0x4396be;if(this[_0xdacfe(0x8ba)]()&&this[_0xdacfe(0x6a8)][_0xdacfe(0x258)]==='keyboard')return TextManager[_0xdacfe(0x6e6)]([_0xdacfe(0x548)]);return Scene_MenuBase[_0xdacfe(0x56f)][_0xdacfe(0x6c5)][_0xdacfe(0x8ee)](this);},Scene_Name[_0x4396be(0x56f)]['buttonAssistKey5']=function(){const _0x49b4e3=_0x4396be;if(this[_0x49b4e3(0x8ba)]()&&this[_0x49b4e3(0x6a8)][_0x49b4e3(0x258)]===_0x49b4e3(0x9eb)){if(_0x49b4e3(0x6bc)!==_0x49b4e3(0x21e))return TextManager['makeInputButtonString']([_0x49b4e3(0x6f3)]);else this[_0x49b4e3(0x275)][_0x49b4e3(0x35f)]<=0x60&&(this[_0x49b4e3(0x275)][_0x49b4e3(0x35f)]+=0x6);}return Scene_MenuBase[_0x49b4e3(0x56f)][_0x49b4e3(0x889)][_0x49b4e3(0x8ee)](this);},Scene_Name[_0x4396be(0x56f)][_0x4396be(0x84d)]=function(){const _0x1bd86e=_0x4396be;if(this[_0x1bd86e(0x8ba)]()&&this['_inputWindow'][_0x1bd86e(0x258)]!==_0x1bd86e(0x9eb)){const _0x1f842d=VisuMZ[_0x1bd86e(0x7c7)][_0x1bd86e(0x624)]['KeyboardInput'];return _0x1f842d[_0x1bd86e(0x896)]||_0x1bd86e(0x364);}return Scene_MenuBase[_0x1bd86e(0x56f)][_0x1bd86e(0x84d)][_0x1bd86e(0x8ee)](this);},Scene_Name['prototype'][_0x4396be(0x864)]=function(){const _0x4461c4=_0x4396be;if(this[_0x4461c4(0x8ba)]()){const _0x2f70f8=VisuMZ[_0x4461c4(0x7c7)]['Settings'][_0x4461c4(0x4bc)];return this[_0x4461c4(0x6a8)][_0x4461c4(0x258)]===_0x4461c4(0x9eb)?_0x2f70f8[_0x4461c4(0x436)]||_0x4461c4(0x436):_0x2f70f8['Manual']||'Manual';}else return Scene_MenuBase['prototype'][_0x4461c4(0x864)][_0x4461c4(0x8ee)](this);},Scene_Name[_0x4396be(0x56f)][_0x4396be(0x12a)]=function(){const _0x14d6ac=_0x4396be;if(this[_0x14d6ac(0x8ba)]()){if(_0x14d6ac(0x672)===_0x14d6ac(0x672)){const _0x525db8=VisuMZ['CoreEngine'][_0x14d6ac(0x624)]['KeyboardInput'];if(this[_0x14d6ac(0x6a8)][_0x14d6ac(0x258)]===_0x14d6ac(0x9eb))return _0x525db8[_0x14d6ac(0x201)]||_0x14d6ac(0x201);}else this[_0x14d6ac(0x6e3)]={};}return Scene_MenuBase[_0x14d6ac(0x56f)]['buttonAssistText4']['call'](this);},VisuMZ['CoreEngine'][_0x4396be(0x35b)]=Scene_Name['prototype'][_0x4396be(0x167)],Scene_Name['prototype']['onInputOk']=function(){const _0x3a1b0f=_0x4396be;this[_0x3a1b0f(0x7cc)]()?this['onInputBannedWords']():VisuMZ[_0x3a1b0f(0x7c7)][_0x3a1b0f(0x35b)][_0x3a1b0f(0x8ee)](this);},Scene_Name[_0x4396be(0x56f)]['doesNameContainBannedWords']=function(){const _0x22a657=_0x4396be,_0x5b81bb=VisuMZ[_0x22a657(0x7c7)][_0x22a657(0x624)][_0x22a657(0x4bc)];if(!_0x5b81bb)return![];const _0x25ee4e=_0x5b81bb[_0x22a657(0xf4)];if(!_0x25ee4e)return![];const _0x500b06=this[_0x22a657(0x830)][_0x22a657(0x862)]()['toLowerCase']();for(const _0x2a9a61 of _0x25ee4e){if(_0x22a657(0x4e1)!==_0x22a657(0x4e1))this['_helpWindow']&&this['_helpWindow'][_0x22a657(0x2dd)](_0x36bed2[_0x22a657(0x83c)][_0x22a657(0x3b8)]),this[_0x22a657(0x486)]&&this[_0x22a657(0x486)][_0x22a657(0x2dd)](_0x9ca6e3['layoutSettings'][_0x22a657(0x7f6)]);else{if(_0x500b06['includes'](_0x2a9a61[_0x22a657(0xd2)]()))return!![];}}return![];},Scene_Name['prototype'][_0x4396be(0x65b)]=function(){const _0x2b2b92=_0x4396be;SoundManager[_0x2b2b92(0x8e6)]();},VisuMZ[_0x4396be(0x7c7)]['Scene_Battle_update']=Scene_Battle[_0x4396be(0x56f)]['update'],Scene_Battle[_0x4396be(0x56f)][_0x4396be(0x68b)]=function(){const _0x1814ab=_0x4396be;VisuMZ[_0x1814ab(0x7c7)]['Scene_Battle_update'][_0x1814ab(0x8ee)](this);if($gameTemp[_0x1814ab(0x697)])this[_0x1814ab(0x8b9)]();},Scene_Battle[_0x4396be(0x56f)][_0x4396be(0x8b9)]=function(){const _0x3a6a84=_0x4396be;!BattleManager[_0x3a6a84(0x5f5)]()&&!this[_0x3a6a84(0x178)]&&!$gameMessage[_0x3a6a84(0x562)]()&&(this[_0x3a6a84(0x178)]=!![],this[_0x3a6a84(0x68b)](),SceneManager[_0x3a6a84(0x297)](),this[_0x3a6a84(0x178)]=![]);},VisuMZ['CoreEngine'][_0x4396be(0x4c8)]=Scene_Battle['prototype'][_0x4396be(0x42c)],Scene_Battle[_0x4396be(0x56f)][_0x4396be(0x42c)]=function(){const _0x33ead2=_0x4396be;VisuMZ[_0x33ead2(0x7c7)][_0x33ead2(0x4c8)][_0x33ead2(0x8ee)](this);if(SceneManager['isSideButtonLayout']()){if(_0x33ead2(0x55c)===_0x33ead2(0x55c))this[_0x33ead2(0x63b)]();else return this[_0x33ead2(0x1bc)];}},Scene_Battle['prototype']['repositionCancelButtonSideButtonLayout']=function(){const _0x2f5030=_0x4396be;this[_0x2f5030(0x375)]['x']=Graphics[_0x2f5030(0x986)]+0x4,this[_0x2f5030(0x1e3)]()?this[_0x2f5030(0x375)]['y']=Graphics[_0x2f5030(0x511)]-this['buttonAreaHeight']():this[_0x2f5030(0x375)]['y']=0x0;},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x295)]=Sprite_Button[_0x4396be(0x56f)][_0x4396be(0x480)],Sprite_Button[_0x4396be(0x56f)][_0x4396be(0x480)]=function(_0x2c5566){const _0x592a4d=_0x4396be;VisuMZ[_0x592a4d(0x7c7)][_0x592a4d(0x295)]['call'](this,_0x2c5566),this[_0x592a4d(0x5c0)]();},Sprite_Button['prototype'][_0x4396be(0x5c0)]=function(){const _0x26715c=_0x4396be,_0x1327ba=VisuMZ[_0x26715c(0x7c7)]['Settings']['UI'];this['_isButtonHidden']=![];switch(this[_0x26715c(0x717)]){case _0x26715c(0x604):this[_0x26715c(0x8cf)]=!_0x1327ba[_0x26715c(0x801)];break;case _0x26715c(0x72e):case _0x26715c(0x1c9):this[_0x26715c(0x8cf)]=!_0x1327ba['pagedownShowButton'];break;case _0x26715c(0x22e):case'up':case _0x26715c(0x2e5):case'up2':case'ok':this[_0x26715c(0x8cf)]=!_0x1327ba[_0x26715c(0x460)];break;case'menu':this[_0x26715c(0x8cf)]=!_0x1327ba[_0x26715c(0x549)];break;}},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x92d)]=Sprite_Button[_0x4396be(0x56f)]['updateOpacity'],Sprite_Button[_0x4396be(0x56f)][_0x4396be(0x7f7)]=function(){const _0x5d1adc=_0x4396be;SceneManager['areButtonsHidden']()||this[_0x5d1adc(0x8cf)]?_0x5d1adc(0x94c)==='TMUhv'?this[_0x5d1adc(0x3d1)]():this[_0x5d1adc(0x8a0)]=_0x4d1767:VisuMZ[_0x5d1adc(0x7c7)]['Sprite_Button_updateOpacity'][_0x5d1adc(0x8ee)](this);},Sprite_Button[_0x4396be(0x56f)][_0x4396be(0x3d1)]=function(){const _0x189e24=_0x4396be;this[_0x189e24(0x1c4)]=![],this[_0x189e24(0x28d)]=0x0,this['x']=Graphics[_0x189e24(0x67f)]*0xa,this['y']=Graphics[_0x189e24(0x21d)]*0xa;},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x268)]=Sprite_Battler[_0x4396be(0x56f)][_0x4396be(0x537)],Sprite_Battler[_0x4396be(0x56f)][_0x4396be(0x537)]=function(_0x53fc50,_0x286868,_0x523ed2){const _0x2e73ef=_0x4396be;(this['_targetOffsetX']!==_0x53fc50||this[_0x2e73ef(0x9f1)]!==_0x286868)&&(this[_0x2e73ef(0x532)]('Linear'),this[_0x2e73ef(0x8ff)]=_0x523ed2),VisuMZ[_0x2e73ef(0x7c7)][_0x2e73ef(0x268)][_0x2e73ef(0x8ee)](this,_0x53fc50,_0x286868,_0x523ed2);},Sprite_Battler[_0x4396be(0x56f)][_0x4396be(0x532)]=function(_0x378d71){this['_moveEasingType']=_0x378d71;},Sprite_Battler[_0x4396be(0x56f)]['updateMove']=function(){const _0xc192ab=_0x4396be;if(this[_0xc192ab(0x3f1)]<=0x0)return;const _0x45936d=this[_0xc192ab(0x3f1)],_0xc74741=this['_movementWholeDuration'],_0x3df615=this[_0xc192ab(0x927)];this[_0xc192ab(0x8d2)]=this[_0xc192ab(0x185)](this[_0xc192ab(0x8d2)],this['_targetOffsetX'],_0x45936d,_0xc74741,_0x3df615),this[_0xc192ab(0x5a0)]=this[_0xc192ab(0x185)](this[_0xc192ab(0x5a0)],this[_0xc192ab(0x9f1)],_0x45936d,_0xc74741,_0x3df615),this['_movementDuration']--;if(this[_0xc192ab(0x3f1)]<=0x0)this[_0xc192ab(0x335)]();},Sprite_Battler['prototype'][_0x4396be(0x185)]=function(_0x326ef5,_0x2c46e3,_0xfa7f91,_0x26e26c,_0x1ccfc8){const _0x11c975=_0x4396be,_0x4a1452=VisuMZ[_0x11c975(0x5ae)]((_0x26e26c-_0xfa7f91)/_0x26e26c,_0x1ccfc8||'Linear'),_0x1f3ed0=VisuMZ[_0x11c975(0x5ae)]((_0x26e26c-_0xfa7f91+0x1)/_0x26e26c,_0x1ccfc8||_0x11c975(0x84b)),_0x34dcba=(_0x326ef5-_0x2c46e3*_0x4a1452)/(0x1-_0x4a1452);return _0x34dcba+(_0x2c46e3-_0x34dcba)*_0x1f3ed0;},VisuMZ['CoreEngine'][_0x4396be(0x46f)]=Sprite_Actor[_0x4396be(0x56f)][_0x4396be(0x280)],Sprite_Actor['prototype'][_0x4396be(0x280)]=function(_0x1d76b5){const _0x4c62ea=_0x4396be;VisuMZ[_0x4c62ea(0x7c7)][_0x4c62ea(0x624)]['UI'][_0x4c62ea(0x820)]?_0x4c62ea(0x347)!==_0x4c62ea(0x7f9)?this['setActorHomeRepositioned'](_0x1d76b5):this['_screenX']-=_0x22be60[_0x4c62ea(0x346)]((_0x51b202[_0x4c62ea(0x67f)]-_0x55999b['boxWidth'])/0x2):VisuMZ[_0x4c62ea(0x7c7)][_0x4c62ea(0x46f)]['call'](this,_0x1d76b5);},Sprite_Actor[_0x4396be(0x56f)][_0x4396be(0x163)]=function(_0x1fb48f){const _0x9fb52a=_0x4396be;let _0x100388=Math[_0x9fb52a(0xb9)](Graphics[_0x9fb52a(0x67f)]/0x2+0xc0);_0x100388-=Math['floor']((Graphics[_0x9fb52a(0x67f)]-Graphics['boxWidth'])/0x2),_0x100388+=_0x1fb48f*0x20;let _0x3fd736=Graphics[_0x9fb52a(0x21d)]-0xc8-$gameParty[_0x9fb52a(0x773)]()*0x30;_0x3fd736-=Math[_0x9fb52a(0x346)]((Graphics[_0x9fb52a(0x21d)]-Graphics[_0x9fb52a(0x511)])/0x2),_0x3fd736+=_0x1fb48f*0x30,this[_0x9fb52a(0x747)](_0x100388,_0x3fd736);},Sprite_Actor[_0x4396be(0x56f)][_0x4396be(0x6da)]=function(){const _0x4caeae=_0x4396be;this[_0x4caeae(0x537)](0x4b0,0x0,0x78);},Sprite_Animation[_0x4396be(0x56f)][_0x4396be(0x1ca)]=function(_0x3d7c0a){this['_muteSound']=_0x3d7c0a;},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x8ce)]=Sprite_Animation[_0x4396be(0x56f)][_0x4396be(0x17d)],Sprite_Animation[_0x4396be(0x56f)][_0x4396be(0x17d)]=function(){const _0x3f817a=_0x4396be;if(this[_0x3f817a(0xf0)])return;VisuMZ[_0x3f817a(0x7c7)][_0x3f817a(0x8ce)][_0x3f817a(0x8ee)](this);},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x780)]=Sprite_Animation[_0x4396be(0x56f)]['setViewport'],Sprite_Animation[_0x4396be(0x56f)]['setViewport']=function(_0x48a504){const _0x58d81d=_0x4396be;this['isAnimationOffsetXMirrored']()?this[_0x58d81d(0x742)](_0x48a504):VisuMZ[_0x58d81d(0x7c7)][_0x58d81d(0x780)]['call'](this,_0x48a504);},Sprite_Animation[_0x4396be(0x56f)][_0x4396be(0x629)]=function(){const _0x184665=_0x4396be;if(!this[_0x184665(0x1df)])return![];const _0x437fd8=this[_0x184665(0x1df)][_0x184665(0x862)]||'';if(_0x437fd8[_0x184665(0x8e4)](/<MIRROR OFFSET X>/i))return!![];if(_0x437fd8['match'](/<NO MIRROR OFFSET X>/i))return![];return VisuMZ[_0x184665(0x7c7)][_0x184665(0x624)][_0x184665(0x9e8)]['AnimationMirrorOffset'];},Sprite_Animation[_0x4396be(0x56f)][_0x4396be(0x742)]=function(_0x252530){const _0x26cb68=_0x4396be,_0x14b61f=this[_0x26cb68(0x89a)],_0xf0e00b=this[_0x26cb68(0x89a)],_0x1e9e6e=this['_animation'][_0x26cb68(0x656)]*(this[_0x26cb68(0x6ab)]?-0x1:0x1)-_0x14b61f/0x2,_0x39aca2=this[_0x26cb68(0x1df)]['offsetY']-_0xf0e00b/0x2,_0x472f11=this[_0x26cb68(0x8e7)](_0x252530);_0x252530['gl'][_0x26cb68(0x228)](_0x1e9e6e+_0x472f11['x'],_0x39aca2+_0x472f11['y'],_0x14b61f,_0xf0e00b);},Sprite_Animation['prototype']['targetSpritePosition']=function(_0x44f457){const _0x44cc92=_0x4396be;if(_0x44f457[_0x44cc92(0x730)]){}const _0x4eb8a7=this[_0x44cc92(0x1df)][_0x44cc92(0x862)];let _0x377827=_0x44f457['height']*_0x44f457[_0x44cc92(0x9a7)]['y'],_0x405429=0x0,_0x6ba2a4=-_0x377827/0x2;if(_0x4eb8a7[_0x44cc92(0x8e4)](/<(?:HEAD|HEADER|TOP)>/i))_0x6ba2a4=-_0x377827;if(_0x4eb8a7[_0x44cc92(0x8e4)](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x6ba2a4=0x0;if(this['_animation']['alignBottom'])_0x6ba2a4=0x0;if(_0x4eb8a7['match'](/<(?:LEFT)>/i))_0x405429=-_0x44f457['width']/0x2;if(_0x4eb8a7[_0x44cc92(0x8e4)](/<(?:RIGHT)>/i))_0x405429=_0x44f457[_0x44cc92(0x67f)]/0x2;if(_0x4eb8a7[_0x44cc92(0x8e4)](/<ANCHOR X:[ ](\d+\.?\d*)>/i)){if(_0x44cc92(0x36a)==='RLuqz')_0x405429=Number(RegExp['$1'])*_0x44f457[_0x44cc92(0x67f)];else{_0x3d7367[_0x44cc92(0x162)](_0x861ba6,_0xb16d99);const _0x531c1f=_0x1e0197[_0x44cc92(0x26b)]||0x1,_0x5f4740=_0x46d8bb[_0x44cc92(0x152)]||_0x44cc92(0x84b),_0x3ea228=_0xe06400[_0x44cc92(0x6cc)](_0x531c1f);_0x3ea228&&_0x3ea228[_0x44cc92(0x7bc)](_0x5f4740);}}_0x4eb8a7[_0x44cc92(0x8e4)](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)&&(_0x6ba2a4=(0x1-Number(RegExp['$1']))*-_0x377827);if(_0x4eb8a7['match'](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)){if(_0x44cc92(0x98b)==='RTqem')_0x405429=Number(RegExp['$1'])*_0x44f457['width'],_0x6ba2a4=(0x1-Number(RegExp['$2']))*-_0x377827;else return _0x262b73[_0x44cc92(0x7c7)]['BattleManager_processEscape'][_0x44cc92(0x8ee)](this);}if(_0x4eb8a7[_0x44cc92(0x8e4)](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0x405429+=Number(RegExp['$1']);if(_0x4eb8a7['match'](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x6ba2a4+=Number(RegExp['$1']);_0x4eb8a7[_0x44cc92(0x8e4)](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x405429+=Number(RegExp['$1']),_0x6ba2a4+=Number(RegExp['$2']));const _0x2a4149=new Point(_0x405429,_0x6ba2a4);return _0x44f457[_0x44cc92(0x5f0)](),_0x44f457[_0x44cc92(0x17e)]['apply'](_0x2a4149);},Sprite_AnimationMV[_0x4396be(0x56f)][_0x4396be(0x156)]=function(){const _0x5ba5d5=_0x4396be;this[_0x5ba5d5(0x65d)]=VisuMZ[_0x5ba5d5(0x7c7)][_0x5ba5d5(0x624)][_0x5ba5d5(0x9e8)][_0x5ba5d5(0x753)]??0x4,this[_0x5ba5d5(0x4bb)](),this[_0x5ba5d5(0x65d)]=this[_0x5ba5d5(0x65d)][_0x5ba5d5(0x5d5)](0x1,0xa);},Sprite_AnimationMV[_0x4396be(0x56f)][_0x4396be(0x4bb)]=function(){const _0x56a167=_0x4396be;if(!this[_0x56a167(0x1df)]);const _0x5f387a=this[_0x56a167(0x1df)][_0x56a167(0x862)]||'';_0x5f387a[_0x56a167(0x8e4)](/<RATE:[ ](\d+)>/i)&&(this['_rate']=(Number(RegExp['$1'])||0x1)[_0x56a167(0x5d5)](0x1,0xa));},Sprite_AnimationMV['prototype'][_0x4396be(0x1ca)]=function(_0x2332aa){const _0x293ec0=_0x4396be;this[_0x293ec0(0xf0)]=_0x2332aa;},VisuMZ['CoreEngine'][_0x4396be(0x4e2)]=Sprite_AnimationMV['prototype'][_0x4396be(0x555)],Sprite_AnimationMV[_0x4396be(0x56f)][_0x4396be(0x555)]=function(_0x4c7901){const _0x48b12e=_0x4396be;this[_0x48b12e(0xf0)]&&(_0x4c7901=JsonEx[_0x48b12e(0x713)](_0x4c7901),_0x4c7901['se']&&(_0x4c7901['se']['volume']=0x0)),VisuMZ[_0x48b12e(0x7c7)][_0x48b12e(0x4e2)]['call'](this,_0x4c7901);},VisuMZ[_0x4396be(0x7c7)]['Sprite_AnimationMV_updatePosition']=Sprite_AnimationMV[_0x4396be(0x56f)][_0x4396be(0x523)],Sprite_AnimationMV['prototype']['updatePosition']=function(){const _0x2b4f22=_0x4396be;VisuMZ[_0x2b4f22(0x7c7)]['Sprite_AnimationMV_updatePosition'][_0x2b4f22(0x8ee)](this);if(this[_0x2b4f22(0x1df)][_0x2b4f22(0x43e)]===0x3){if(_0x2b4f22(0x809)===_0x2b4f22(0x3e0))_0x8d7655[_0x2b4f22(0x994)][0x23]=_0x2b4f22(0x68c),_0x27594c[_0x2b4f22(0x994)][0x24]='home';else{if(this['x']===0x0)this['x']=Math[_0x2b4f22(0xb9)](Graphics['width']/0x2);if(this['y']===0x0)this['y']=Math[_0x2b4f22(0xb9)](Graphics[_0x2b4f22(0x21d)]/0x2);}}},Sprite_Damage[_0x4396be(0x56f)][_0x4396be(0x2a9)]=function(_0x153cc6){const _0x13b526=_0x4396be;let _0x15592f=Math['abs'](_0x153cc6)[_0x13b526(0x910)]();this[_0x13b526(0x5e2)]()&&(_0x13b526(0x471)==='obCKE'?_0x15592f=VisuMZ[_0x13b526(0x370)](_0x15592f):this[_0x13b526(0x5b9)]());const _0x279eb1=this[_0x13b526(0x35f)](),_0x474490=Math[_0x13b526(0x346)](_0x279eb1*0.75);for(let _0x5b4b7b=0x0;_0x5b4b7b<_0x15592f[_0x13b526(0x858)];_0x5b4b7b++){if(_0x13b526(0x39d)!=='PbNfm'){if(_0x19276b[_0x13b526(0x2ee)]())return;_0x5ce215[_0x13b526(0x162)](_0x2dbda9,_0x14859b);const _0x50e49d=_0x3d93db[_0x13b526(0x906)];if(_0x50e49d[_0x13b526(0x8e4)](/Front/i))_0x4eb2fc['setSideView'](![]);else _0x50e49d[_0x13b526(0x8e4)](/Side/i)?_0xf175b1['setSideView'](!![]):_0x178a50[_0x13b526(0x859)](!_0x30a290[_0x13b526(0x200)]());}else{const _0x4621db=this[_0x13b526(0x2b6)](_0x474490,_0x279eb1);_0x4621db[_0x13b526(0x2e6)][_0x13b526(0x865)](_0x15592f[_0x5b4b7b],0x0,0x0,_0x474490,_0x279eb1,_0x13b526(0x42b)),_0x4621db['x']=(_0x5b4b7b-(_0x15592f[_0x13b526(0x858)]-0x1)/0x2)*_0x474490,_0x4621db['dy']=-_0x5b4b7b;}}},Sprite_Damage[_0x4396be(0x56f)][_0x4396be(0x5e2)]=function(){const _0x5061d5=_0x4396be;return VisuMZ[_0x5061d5(0x7c7)][_0x5061d5(0x624)][_0x5061d5(0x9e8)][_0x5061d5(0x4a9)];},Sprite_Damage[_0x4396be(0x56f)][_0x4396be(0x8e2)]=function(){const _0x7e3083=_0x4396be;return ColorManager[_0x7e3083(0x260)]();},VisuMZ['CoreEngine'][_0x4396be(0xe7)]=Sprite_Gauge['prototype']['gaugeRate'],Sprite_Gauge['prototype'][_0x4396be(0x4bd)]=function(){const _0x1e0c58=_0x4396be;return VisuMZ[_0x1e0c58(0x7c7)][_0x1e0c58(0xe7)][_0x1e0c58(0x8ee)](this)[_0x1e0c58(0x5d5)](0x0,0x1);},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x61c)]=Sprite_Gauge[_0x4396be(0x56f)][_0x4396be(0x9c2)],Sprite_Gauge[_0x4396be(0x56f)]['currentValue']=function(){const _0x28a661=_0x4396be;let _0x1215ce=VisuMZ['CoreEngine'][_0x28a661(0x61c)][_0x28a661(0x8ee)](this);return _0x1215ce;},Sprite_Gauge[_0x4396be(0x56f)][_0x4396be(0x895)]=function(){const _0x57c4bc=_0x4396be;let _0x479f44=this[_0x57c4bc(0x9c2)]();this['useDigitGrouping']()&&(_0x57c4bc(0x653)!==_0x57c4bc(0x653)?this['_commandWindow'][_0x57c4bc(0x2dd)](_0x1cd7be[_0x57c4bc(0x83c)][_0x57c4bc(0x2a5)]):_0x479f44=VisuMZ[_0x57c4bc(0x370)](_0x479f44));const _0xa07136=this[_0x57c4bc(0x886)]()-0x1,_0x25d7ba=this['textHeight']?this[_0x57c4bc(0x794)]():this[_0x57c4bc(0x8d7)]();this[_0x57c4bc(0x731)](),this['bitmap']['drawText'](_0x479f44,0x0,0x0,_0xa07136,_0x25d7ba,_0x57c4bc(0x595));},Sprite_Gauge['prototype'][_0x4396be(0x251)]=function(){return 0x3;},Sprite_Gauge[_0x4396be(0x56f)][_0x4396be(0x5e2)]=function(){const _0x52e73d=_0x4396be;return VisuMZ[_0x52e73d(0x7c7)][_0x52e73d(0x624)][_0x52e73d(0x9e8)][_0x52e73d(0x767)];},Sprite_Gauge[_0x4396be(0x56f)]['valueOutlineColor']=function(){const _0xb5c906=_0x4396be;return ColorManager[_0xb5c906(0x2fb)]();},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x4a7)]=Sprite_Picture['prototype']['loadBitmap'],Sprite_Picture[_0x4396be(0x56f)]['loadBitmap']=function(){const _0x36c8e7=_0x4396be;this[_0x36c8e7(0x685)]&&this[_0x36c8e7(0x685)][_0x36c8e7(0x8e4)](/VisuMZ CoreEngine PictureIcon (\d+)/i)?_0x36c8e7(0x5c3)!==_0x36c8e7(0x999)?this['loadIconBitmap'](Number(RegExp['$1'])):_0x46b68d[_0x36c8e7(0x862)]=_0x5d57f1(_0x1a7d40['$2'][_0x36c8e7(0x8b0)]()):_0x36c8e7(0x82c)===_0x36c8e7(0x82c)?VisuMZ[_0x36c8e7(0x7c7)][_0x36c8e7(0x4a7)][_0x36c8e7(0x8ee)](this):(this[_0x36c8e7(0x825)]['scale']['x']=0x1/this[_0x36c8e7(0x9a7)]['x'],this['_pictureContainer']['x']=-(this['x']/this[_0x36c8e7(0x9a7)]['x']));},Sprite_Picture['prototype'][_0x4396be(0x2b4)]=function(_0x2691e2){const _0x48ac7b=_0x4396be,_0x273d8d=ImageManager[_0x48ac7b(0x750)],_0x48427e=ImageManager[_0x48ac7b(0x1c2)],_0x34f28e=this[_0x48ac7b(0x685)][_0x48ac7b(0x8e4)](/SMOOTH/i);this[_0x48ac7b(0x2e6)]=new Bitmap(_0x273d8d,_0x48427e);const _0x2f57bb=ImageManager[_0x48ac7b(0x4ab)](_0x48ac7b(0x40c)),_0x2a8c40=_0x2691e2%0x10*_0x273d8d,_0x2f45b9=Math['floor'](_0x2691e2/0x10)*_0x48427e;this[_0x48ac7b(0x2e6)][_0x48ac7b(0x2af)]=_0x34f28e,this['bitmap'][_0x48ac7b(0x7b7)](_0x2f57bb,_0x2a8c40,_0x2f45b9,_0x273d8d,_0x48427e,0x0,0x0,_0x273d8d,_0x48427e);};function Sprite_TitlePictureButton(){this['initialize'](...arguments);}Sprite_TitlePictureButton['prototype']=Object[_0x4396be(0x207)](Sprite_Clickable[_0x4396be(0x56f)]),Sprite_TitlePictureButton[_0x4396be(0x56f)][_0x4396be(0x558)]=Sprite_TitlePictureButton,Sprite_TitlePictureButton['prototype'][_0x4396be(0x480)]=function(_0x4d3674){const _0x3bd935=_0x4396be;Sprite_Clickable[_0x3bd935(0x56f)]['initialize'][_0x3bd935(0x8ee)](this),this[_0x3bd935(0x2d0)]=_0x4d3674,this[_0x3bd935(0x14f)]=null,this[_0x3bd935(0x3c9)]();},Sprite_TitlePictureButton['prototype'][_0x4396be(0x3c9)]=function(){const _0x29e67c=_0x4396be;this['x']=Graphics[_0x29e67c(0x67f)],this['y']=Graphics['height'],this[_0x29e67c(0x1c4)]=![],this[_0x29e67c(0x29a)]();},Sprite_TitlePictureButton[_0x4396be(0x56f)][_0x4396be(0x29a)]=function(){const _0x34a3b7=_0x4396be;this[_0x34a3b7(0x2e6)]=ImageManager[_0x34a3b7(0x95c)](this['_data'][_0x34a3b7(0x783)]),this['bitmap']['addLoadListener'](this['onButtonImageLoad'][_0x34a3b7(0x7d9)](this));},Sprite_TitlePictureButton[_0x4396be(0x56f)][_0x4396be(0x48c)]=function(){const _0x3b60da=_0x4396be;this[_0x3b60da(0x2d0)][_0x3b60da(0x617)][_0x3b60da(0x8ee)](this),this['_data'][_0x3b60da(0x22b)][_0x3b60da(0x8ee)](this),this['setClickHandler'](this[_0x3b60da(0x2d0)][_0x3b60da(0x92e)][_0x3b60da(0x7d9)](this));},Sprite_TitlePictureButton[_0x4396be(0x56f)][_0x4396be(0x68b)]=function(){const _0x915d4b=_0x4396be;Sprite_Clickable['prototype'][_0x915d4b(0x68b)][_0x915d4b(0x8ee)](this),this['updateOpacity'](),this[_0x915d4b(0x8ea)]();},Sprite_TitlePictureButton['prototype'][_0x4396be(0x407)]=function(){const _0xf37cc4=_0x4396be;return VisuMZ['CoreEngine'][_0xf37cc4(0x624)][_0xf37cc4(0xae)][_0xf37cc4(0x9b5)][_0xf37cc4(0x318)];},Sprite_TitlePictureButton[_0x4396be(0x56f)][_0x4396be(0x7f7)]=function(){const _0x84452f=_0x4396be;if(this[_0x84452f(0x6aa)]||this[_0x84452f(0x44b)])this[_0x84452f(0x28d)]=0xff;else{if('ijDum'===_0x84452f(0x945))this[_0x84452f(0x28d)]+=this['visible']?this[_0x84452f(0x407)]():-0x1*this['fadeSpeed'](),this[_0x84452f(0x28d)]=Math['min'](0xc0,this[_0x84452f(0x28d)]);else{var _0x4e5c27=_0x110c94(_0x3b15fc['$1'])/0x64;_0x4d283a+=_0x4e5c27;}}},Sprite_TitlePictureButton['prototype']['setClickHandler']=function(_0x1b08f0){const _0x475b0e=_0x4396be;this[_0x475b0e(0x14f)]=_0x1b08f0;},Sprite_TitlePictureButton[_0x4396be(0x56f)][_0x4396be(0x982)]=function(){const _0x11e69a=_0x4396be;this[_0x11e69a(0x14f)]&&this[_0x11e69a(0x14f)]();},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x3c8)]=Spriteset_Base[_0x4396be(0x56f)][_0x4396be(0x480)],Spriteset_Base[_0x4396be(0x56f)][_0x4396be(0x480)]=function(){const _0x4e0513=_0x4396be;VisuMZ[_0x4e0513(0x7c7)]['Spriteset_Base_initialize'][_0x4e0513(0x8ee)](this),this[_0x4e0513(0x686)]();},Spriteset_Base[_0x4396be(0x56f)][_0x4396be(0x686)]=function(){const _0x10db5e=_0x4396be;this[_0x10db5e(0x93a)]=[],this[_0x10db5e(0x87a)]=[],this[_0x10db5e(0x22a)]=this[_0x10db5e(0x9a7)]['x'],this[_0x10db5e(0x5f9)]=this[_0x10db5e(0x9a7)]['y'];},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x1ac)]=Spriteset_Base[_0x4396be(0x56f)][_0x4396be(0x6d4)],Spriteset_Base[_0x4396be(0x56f)][_0x4396be(0x6d4)]=function(_0x4b7dbb){const _0x3f502d=_0x4396be;this[_0x3f502d(0x705)](),this[_0x3f502d(0x451)](),VisuMZ[_0x3f502d(0x7c7)][_0x3f502d(0x1ac)][_0x3f502d(0x8ee)](this,_0x4b7dbb);},VisuMZ[_0x4396be(0x7c7)]['Spriteset_Base_update']=Spriteset_Base[_0x4396be(0x56f)][_0x4396be(0x68b)],Spriteset_Base[_0x4396be(0x56f)][_0x4396be(0x68b)]=function(){const _0x46cda9=_0x4396be;VisuMZ['CoreEngine'][_0x46cda9(0x958)]['call'](this),this[_0x46cda9(0x818)](),this[_0x46cda9(0x38b)](),this['updateFauxAnimations'](),this[_0x46cda9(0x7c5)]();},Spriteset_Base[_0x4396be(0x56f)][_0x4396be(0x818)]=function(){},Spriteset_Base['prototype'][_0x4396be(0x38b)]=function(){const _0x28df35=_0x4396be;if(!VisuMZ['CoreEngine'][_0x28df35(0x624)]['QoL'][_0x28df35(0x52c)])return;if(this[_0x28df35(0x22a)]===this[_0x28df35(0x9a7)]['x']&&this[_0x28df35(0x5f9)]===this[_0x28df35(0x9a7)]['y'])return;this[_0x28df35(0x2e1)](),this['_cacheScaleX']=this[_0x28df35(0x9a7)]['x'],this[_0x28df35(0x5f9)]=this[_0x28df35(0x9a7)]['y'];},Spriteset_Base['prototype'][_0x4396be(0x2e1)]=function(){const _0x493031=_0x4396be;if(SceneManager['isSceneMap']()&&Spriteset_Map[_0x493031(0x461)])return;else{if(SceneManager[_0x493031(0x3b6)]()&&Spriteset_Battle[_0x493031(0x461)])return;}if(this['scale']['x']!==0x0){if('HTkEW'===_0x493031(0x1d0))this[_0x493031(0x825)][_0x493031(0x9a7)]['x']=0x1/this[_0x493031(0x9a7)]['x'],this['_pictureContainer']['x']=-(this['x']/this[_0x493031(0x9a7)]['x']);else{const _0x1c13c2='_stored_tpGaugeColor1';this[_0x493031(0x6e3)]=this['_colorCache']||{};if(this[_0x493031(0x6e3)][_0x1c13c2])return this[_0x493031(0x6e3)][_0x1c13c2];const _0xd997dc=_0x3e46b1[_0x493031(0x7c7)][_0x493031(0x624)][_0x493031(0x191)]['ColorTPGauge1'];return this['getColorDataFromPluginParameters'](_0x1c13c2,_0xd997dc);}}this['scale']['y']!==0x0&&(this[_0x493031(0x825)][_0x493031(0x9a7)]['y']=0x1/this[_0x493031(0x9a7)]['y'],this[_0x493031(0x825)]['y']=-(this['y']/this[_0x493031(0x9a7)]['y']));},VisuMZ['CoreEngine'][_0x4396be(0x7b3)]=Spriteset_Base[_0x4396be(0x56f)][_0x4396be(0x523)],Spriteset_Base[_0x4396be(0x56f)][_0x4396be(0x523)]=function(){const _0x179d32=_0x4396be;VisuMZ[_0x179d32(0x7c7)]['Spriteset_Base_updatePosition'][_0x179d32(0x8ee)](this),this[_0x179d32(0x81d)]();},Spriteset_Base[_0x4396be(0x56f)]['updatePositionCoreEngine']=function(){const _0x2d16a0=_0x4396be;if(!$gameScreen)return;if($gameScreen[_0x2d16a0(0x12b)]<=0x0)return;this['x']-=Math['round']($gameScreen[_0x2d16a0(0x7d1)]());const _0x4f9cd6=$gameScreen[_0x2d16a0(0x981)]();switch($gameScreen[_0x2d16a0(0x981)]()){case _0x2d16a0(0x4f9):this[_0x2d16a0(0x34e)]();break;case _0x2d16a0(0xbb):this[_0x2d16a0(0x598)]();break;case _0x2d16a0(0x466):this['updatePositionCoreEngineShakeVert']();break;default:this[_0x2d16a0(0x6f5)]();break;}},Spriteset_Base[_0x4396be(0x56f)][_0x4396be(0x34e)]=function(){const _0x174b63=_0x4396be,_0x5e48aa=VisuMZ[_0x174b63(0x7c7)][_0x174b63(0x624)][_0x174b63(0x83f)];if(_0x5e48aa&&_0x5e48aa[_0x174b63(0x1bd)]){if(_0x174b63(0x8f5)!==_0x174b63(0x150))return _0x5e48aa[_0x174b63(0x1bd)][_0x174b63(0x8ee)](this);else this[_0x174b63(0x4a5)][_0x174b63(0x2dd)](_0x32b4b4[_0x174b63(0x83c)][_0x174b63(0x33a)]);}this['x']+=Math[_0x174b63(0xb9)]($gameScreen[_0x174b63(0x7d1)]());},Spriteset_Base[_0x4396be(0x56f)][_0x4396be(0x6f5)]=function(){const _0x3993c4=_0x4396be,_0x427a77=VisuMZ[_0x3993c4(0x7c7)]['Settings'][_0x3993c4(0x83f)];if(_0x427a77&&_0x427a77[_0x3993c4(0x50a)]){if(_0x3993c4(0x9fd)===_0x3993c4(0x985))_0x2f7494['CoreEngine'][_0x3993c4(0x6d7)][_0x3993c4(0x8ee)](this);else return _0x427a77[_0x3993c4(0x50a)]['call'](this);}const _0x32934f=$gameScreen[_0x3993c4(0x956)]*0.75,_0x30d8b0=$gameScreen[_0x3993c4(0x80e)]*0.6,_0x57fd30=$gameScreen[_0x3993c4(0x12b)];this['x']+=Math[_0x3993c4(0xb9)](Math['randomInt'](_0x32934f)-Math['randomInt'](_0x30d8b0))*(Math[_0x3993c4(0x58b)](_0x57fd30,0x1e)*0.5),this['y']+=Math[_0x3993c4(0xb9)](Math[_0x3993c4(0x31d)](_0x32934f)-Math['randomInt'](_0x30d8b0))*(Math['min'](_0x57fd30,0x1e)*0.5);},Spriteset_Base[_0x4396be(0x56f)][_0x4396be(0x598)]=function(){const _0x4cc7cf=_0x4396be,_0x2f9f11=VisuMZ[_0x4cc7cf(0x7c7)][_0x4cc7cf(0x624)][_0x4cc7cf(0x83f)];if(_0x2f9f11&&_0x2f9f11[_0x4cc7cf(0x853)])return _0x2f9f11[_0x4cc7cf(0x853)][_0x4cc7cf(0x8ee)](this);const _0x46c798=$gameScreen[_0x4cc7cf(0x956)]*0.75,_0x44e66a=$gameScreen['_shakeSpeed']*0.6,_0x5baa43=$gameScreen[_0x4cc7cf(0x12b)];this['x']+=Math['round'](Math[_0x4cc7cf(0x31d)](_0x46c798)-Math['randomInt'](_0x44e66a))*(Math[_0x4cc7cf(0x58b)](_0x5baa43,0x1e)*0.5);},Spriteset_Base[_0x4396be(0x56f)][_0x4396be(0x4e0)]=function(){const _0x16ab78=_0x4396be,_0x135bd8=VisuMZ['CoreEngine'][_0x16ab78(0x624)][_0x16ab78(0x83f)];if(_0x135bd8&&_0x135bd8[_0x16ab78(0x566)])return _0x135bd8[_0x16ab78(0x566)][_0x16ab78(0x8ee)](this);const _0x2e15fe=$gameScreen[_0x16ab78(0x956)]*0.75,_0x33f74d=$gameScreen[_0x16ab78(0x80e)]*0.6,_0x38d79a=$gameScreen[_0x16ab78(0x12b)];this['y']+=Math[_0x16ab78(0xb9)](Math[_0x16ab78(0x31d)](_0x2e15fe)-Math[_0x16ab78(0x31d)](_0x33f74d))*(Math[_0x16ab78(0x58b)](_0x38d79a,0x1e)*0.5);},Spriteset_Base['prototype'][_0x4396be(0x232)]=function(){const _0x25de0e=_0x4396be;for(const _0x11fae1 of this[_0x25de0e(0x93a)]){if('bcnvM'===_0x25de0e(0x6b0))!_0x11fae1[_0x25de0e(0xbf)]()&&this[_0x25de0e(0x431)](_0x11fae1);else return _0x3246af[_0x25de0e(0x83c)][_0x25de0e(0xd0)]['call'](this);}this[_0x25de0e(0x941)]();},Spriteset_Base[_0x4396be(0x56f)][_0x4396be(0x941)]=function(){const _0x272e72=_0x4396be;for(;;){const _0x2417c9=$gameTemp[_0x272e72(0x66c)]();if(_0x2417c9){if(_0x272e72(0x6f6)!=='CJlPI'){if(this['_coreEngineShakeStyle']===_0x21e59e)this[_0x272e72(0x214)]();this[_0x272e72(0x997)]=_0xb8e227[_0x272e72(0xd2)]()[_0x272e72(0x8b0)]();}else this[_0x272e72(0x873)](_0x2417c9);}else{if('wTmxT'!==_0x272e72(0x5d3))break;else this[_0x272e72(0x4d5)]='';}}},Spriteset_Base['prototype'][_0x4396be(0x873)]=function(_0x28966d){const _0x1a647f=_0x4396be,_0x1e139b=$dataAnimations[_0x28966d[_0x1a647f(0x2cd)]],_0x331a98=_0x28966d[_0x1a647f(0x631)],_0x5e621f=_0x28966d[_0x1a647f(0x933)],_0x4c92e4=_0x28966d['mute'];let _0x5eda16=this[_0x1a647f(0x29f)]();const _0x57dfaa=this[_0x1a647f(0x710)]();if(this[_0x1a647f(0x1d6)](_0x1e139b))for(const _0x4bfd69 of _0x331a98){this[_0x1a647f(0x4d8)]([_0x4bfd69],_0x1e139b,_0x5e621f,_0x5eda16,_0x4c92e4),_0x5eda16+=_0x57dfaa;}else this[_0x1a647f(0x4d8)](_0x331a98,_0x1e139b,_0x5e621f,_0x5eda16,_0x4c92e4);},Spriteset_Base['prototype'][_0x4396be(0x1b9)]=function(_0x434282,_0x147ff2,_0x314c1d,_0x1b548b){const _0x2a6006=_0x4396be,_0x133b91=this[_0x2a6006(0x93b)](_0x147ff2),_0x5d35e3=new(_0x133b91?Sprite_AnimationMV:Sprite_Animation)(),_0x17c618=this[_0x2a6006(0x8f1)](_0x434282),_0x43d716=this[_0x2a6006(0x29f)](),_0x20f4df=_0x1b548b>_0x43d716?this[_0x2a6006(0x2ad)]():null;this[_0x2a6006(0x76f)](_0x434282[0x0])&&(_0x314c1d=!_0x314c1d),_0x5d35e3['targetObjects']=_0x434282,_0x5d35e3[_0x2a6006(0x3c9)](_0x17c618,_0x147ff2,_0x314c1d,_0x1b548b,_0x20f4df),this[_0x2a6006(0x805)](_0x5d35e3),this[_0x2a6006(0x719)][_0x2a6006(0x8ab)](_0x5d35e3);},Spriteset_Base['prototype'][_0x4396be(0x4d8)]=function(_0x4e97d9,_0x4b1ad3,_0x45b7eb,_0x4b05ad,_0xdd5a73){const _0x55a14a=_0x4396be,_0x585db5=this['isMVAnimation'](_0x4b1ad3),_0x12392b=new(_0x585db5?Sprite_AnimationMV:Sprite_Animation)(),_0x52dc1d=this[_0x55a14a(0x8f1)](_0x4e97d9);this[_0x55a14a(0x76f)](_0x4e97d9[0x0])&&(_0x45b7eb=!_0x45b7eb);_0x12392b[_0x55a14a(0x85c)]=_0x4e97d9,_0x12392b[_0x55a14a(0x3c9)](_0x52dc1d,_0x4b1ad3,_0x45b7eb,_0x4b05ad),_0x12392b['setMute'](_0xdd5a73),this[_0x55a14a(0x805)](_0x12392b);if(this[_0x55a14a(0x719)])this[_0x55a14a(0x719)]['remove'](_0x12392b);this[_0x55a14a(0x93a)]['push'](_0x12392b);},Spriteset_Base[_0x4396be(0x56f)]['addAnimationSpriteToContainer']=function(_0x2f6c6b){const _0x42b4a4=_0x4396be;this[_0x42b4a4(0x2b9)][_0x42b4a4(0x19c)](_0x2f6c6b);},Spriteset_Base[_0x4396be(0x56f)]['removeAnimation']=function(_0x186440){const _0x405b50=_0x4396be;this['_animationSprites'][_0x405b50(0x3b9)](_0x186440),this[_0x405b50(0x538)](_0x186440);for(const _0x3374fc of _0x186440['targetObjects']){if('Knegj'===_0x405b50(0x91d)){if(_0x3374fc[_0x405b50(0x983)]){if(_0x405b50(0x48d)!==_0x405b50(0x48d))return _0x51f448['CoreEngine'][_0x405b50(0x624)]['UI'][_0x405b50(0x69b)];else _0x3374fc[_0x405b50(0x983)]();}}else{const _0x4d1198=_0x17fa73[_0x405b50(0xa0d)]==_0x405b50(0x9e6)?_0x405b50(0x244):_0x13ff65[_0x405b50(0xa0d)]==_0x405b50(0x66a)?_0x405b50(0x851):'xdg-open';_0x2549cd('child_process')[_0x405b50(0x7d6)](_0x4d1198+'\x20'+_0x1812bc);}}_0x186440['destroy']();},Spriteset_Base[_0x4396be(0x56f)]['removeFauxAnimation']=function(_0xd66b40){const _0x71126f=_0x4396be;this['_fauxAnimationSprites']['remove'](_0xd66b40),this[_0x71126f(0x538)](_0xd66b40);for(const _0x46cd0d of _0xd66b40[_0x71126f(0x85c)]){_0x46cd0d[_0x71126f(0x983)]&&_0x46cd0d[_0x71126f(0x983)]();}_0xd66b40['destroy']();},Spriteset_Base[_0x4396be(0x56f)][_0x4396be(0x538)]=function(_0x59412a){const _0x148324=_0x4396be;this[_0x148324(0x2b9)][_0x148324(0xbd)](_0x59412a);},Spriteset_Base[_0x4396be(0x56f)][_0x4396be(0x705)]=function(){const _0xa3c95=_0x4396be;for(const _0x30efc9 of this[_0xa3c95(0x93a)]){this[_0xa3c95(0x431)](_0x30efc9);}},Spriteset_Base['prototype'][_0x4396be(0x3e7)]=function(){const _0x12b66d=_0x4396be;return this['_fauxAnimationSprites'][_0x12b66d(0x858)]>0x0;},Spriteset_Base[_0x4396be(0x56f)][_0x4396be(0x7c5)]=function(){const _0x5f4f0a=_0x4396be;for(const _0x15353f of this['_pointAnimationSprites']){!_0x15353f[_0x5f4f0a(0xbf)]()&&this['removePointAnimation'](_0x15353f);}this[_0x5f4f0a(0x6b6)]();},Spriteset_Base['prototype'][_0x4396be(0x6b6)]=function(){const _0x55c8aa=_0x4396be;for(;;){if(_0x55c8aa(0x71e)!=='SreMA'){const _0x420c1e=$gameTemp[_0x55c8aa(0x75c)]();if(_0x420c1e)this[_0x55c8aa(0x9a0)](_0x420c1e);else break;}else _0x15d140[_0x55c8aa(0x36e)]['font-smooth']=_0x55c8aa(0x2c8);}},Spriteset_Base[_0x4396be(0x56f)]['createPointAnimation']=function(_0x4b5c44){const _0x11c6ae=_0x4396be,_0x382c88=$dataAnimations[_0x4b5c44[_0x11c6ae(0x2cd)]],_0x22e244=this[_0x11c6ae(0x8d8)](_0x4b5c44),_0x220e65=_0x4b5c44[_0x11c6ae(0x933)],_0x1c044c=_0x4b5c44[_0x11c6ae(0x397)];let _0x2116cd=this[_0x11c6ae(0x29f)]();const _0x4263e6=this[_0x11c6ae(0x710)]();if(this['isAnimationForEach'](_0x382c88))for(const _0x567052 of _0x22e244){this[_0x11c6ae(0x1ea)]([_0x567052],_0x382c88,_0x220e65,_0x2116cd,_0x1c044c),_0x2116cd+=_0x4263e6;}else this[_0x11c6ae(0x1ea)](_0x22e244,_0x382c88,_0x220e65,_0x2116cd,_0x1c044c);},Spriteset_Base[_0x4396be(0x56f)][_0x4396be(0x8d8)]=function(_0x53fc51){const _0x52b9c4=new Sprite_Clickable(),_0x5af6a8=this['getPointAnimationLayer']();_0x52b9c4['x']=_0x53fc51['x']-_0x5af6a8['x'],_0x52b9c4['y']=_0x53fc51['y']-_0x5af6a8['y'],_0x52b9c4['z']=0x64;const _0x5319f3=this['getPointAnimationLayer']();return _0x5319f3['addChild'](_0x52b9c4),[_0x52b9c4];},Spriteset_Base[_0x4396be(0x56f)][_0x4396be(0x7fb)]=function(){return this;},Spriteset_Map[_0x4396be(0x56f)][_0x4396be(0x7fb)]=function(){return this['_tilemap']||this;},Spriteset_Battle['prototype'][_0x4396be(0x7fb)]=function(){const _0x596926=_0x4396be;return this[_0x596926(0x154)]||this;},Spriteset_Base[_0x4396be(0x56f)]['createPointAnimationSprite']=function(_0x44e6cf,_0x3bebde,_0x903d82,_0x136cc9,_0x38031e){const _0x80be33=_0x4396be,_0x562247=this[_0x80be33(0x93b)](_0x3bebde),_0x3e32cc=new(_0x562247?Sprite_AnimationMV:Sprite_Animation)();_0x3e32cc[_0x80be33(0x85c)]=_0x44e6cf,_0x3e32cc[_0x80be33(0x3c9)](_0x44e6cf,_0x3bebde,_0x903d82,_0x136cc9),_0x3e32cc[_0x80be33(0x1ca)](_0x38031e),this[_0x80be33(0x805)](_0x3e32cc),this[_0x80be33(0x87a)][_0x80be33(0x8ab)](_0x3e32cc);},Spriteset_Base[_0x4396be(0x56f)]['removePointAnimation']=function(_0x12005b){const _0x37f1e2=_0x4396be;this[_0x37f1e2(0x87a)]['remove'](_0x12005b),this[_0x37f1e2(0x2b9)][_0x37f1e2(0xbd)](_0x12005b);for(const _0xbe99c3 of _0x12005b['targetObjects']){_0xbe99c3['endAnimation']&&_0xbe99c3[_0x37f1e2(0x983)]();const _0x3a8707=this[_0x37f1e2(0x7fb)]();if(_0x3a8707)_0x3a8707[_0x37f1e2(0xbd)](_0xbe99c3);}_0x12005b[_0x37f1e2(0x6d4)]();},Spriteset_Base[_0x4396be(0x56f)][_0x4396be(0x451)]=function(){const _0x34978b=_0x4396be;for(const _0xb7ddc5 of this[_0x34978b(0x87a)]){this['removePointAnimation'](_0xb7ddc5);}},Spriteset_Base[_0x4396be(0x56f)][_0x4396be(0x218)]=function(){const _0x5ecbf3=_0x4396be;return this[_0x5ecbf3(0x87a)][_0x5ecbf3(0x858)]>0x0;},VisuMZ['CoreEngine'][_0x4396be(0x21a)]=Spriteset_Base[_0x4396be(0x56f)]['isAnimationPlaying'],Spriteset_Base[_0x4396be(0x56f)][_0x4396be(0x557)]=function(){const _0x553256=_0x4396be;return VisuMZ['CoreEngine'][_0x553256(0x21a)][_0x553256(0x8ee)](this)||this['isPointAnimationPlaying']();},Spriteset_Map[_0x4396be(0x461)]=VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x624)][_0x4396be(0x9e8)][_0x4396be(0x9d6)]||![],VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x1b5)]=Scene_Map['prototype'][_0x4396be(0x15d)],Scene_Map['prototype'][_0x4396be(0x15d)]=function(){const _0x3e9426=_0x4396be;VisuMZ[_0x3e9426(0x7c7)][_0x3e9426(0x1b5)]['call'](this);if(!Spriteset_Map[_0x3e9426(0x461)])return;const _0x3fc7dc=this[_0x3e9426(0x2de)];if(!_0x3fc7dc)return;this[_0x3e9426(0x825)]=_0x3fc7dc['_pictureContainer'];if(!this[_0x3e9426(0x825)])return;this[_0x3e9426(0x19c)](this[_0x3e9426(0x825)]);},Spriteset_Battle[_0x4396be(0x461)]=VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x624)][_0x4396be(0x9e8)][_0x4396be(0x8a2)]||![],VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x4e6)]=Scene_Battle['prototype'][_0x4396be(0x15d)],Scene_Battle[_0x4396be(0x56f)]['createSpriteset']=function(){const _0x492758=_0x4396be;VisuMZ[_0x492758(0x7c7)][_0x492758(0x4e6)][_0x492758(0x8ee)](this);if(!Spriteset_Battle[_0x492758(0x461)])return;const _0x370d17=this[_0x492758(0x2de)];if(!_0x370d17)return;this['_pictureContainer']=_0x370d17[_0x492758(0x825)];if(!this[_0x492758(0x825)])return;this[_0x492758(0x19c)](this[_0x492758(0x825)]);},Spriteset_Battle[_0x4396be(0x56f)][_0x4396be(0x403)]=function(){const _0x533aec=_0x4396be;this[_0x533aec(0x49e)]=new PIXI[(_0x533aec(0x971))][(_0x533aec(0x170))](clamp=!![]),this[_0x533aec(0x7a8)]=new Sprite(),this[_0x533aec(0x7a8)][_0x533aec(0x2e6)]=SceneManager['backgroundBitmap'](),this[_0x533aec(0x7a8)][_0x533aec(0x971)]=[this[_0x533aec(0x49e)]],this['_baseSprite'][_0x533aec(0x19c)](this[_0x533aec(0x7a8)]);},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x2b0)]=Spriteset_Battle['prototype'][_0x4396be(0x645)],Spriteset_Battle['prototype'][_0x4396be(0x645)]=function(){const _0xfb196e=_0x4396be;this['coreEngineRepositionEnemies']()&&(_0xfb196e(0x87e)===_0xfb196e(0x41f)?(_0x3cee87[_0xfb196e(0x7c7)]['Scene_Base_createWindowLayer'][_0xfb196e(0x8ee)](this),this[_0xfb196e(0x650)](),this['createTextPopupWindow'](),this[_0xfb196e(0xa08)]['x']=_0x3df7b9[_0xfb196e(0xb9)](this['_windowLayer']['x']),this[_0xfb196e(0xa08)]['y']=_0x4a3c4f['round'](this['_windowLayer']['y'])):this['repositionEnemiesByResolution']()),VisuMZ[_0xfb196e(0x7c7)][_0xfb196e(0x2b0)][_0xfb196e(0x8ee)](this);},Spriteset_Battle['prototype']['coreEngineRepositionEnemies']=function(){const _0x5a9e4d=_0x4396be,_0x3a004b=VisuMZ[_0x5a9e4d(0x7c7)]['Settings'][_0x5a9e4d(0x149)];if(!_0x3a004b)return![];if(Utils[_0x5a9e4d(0x16f)]>=_0x5a9e4d(0x1f2)&&!_0x3a004b[_0x5a9e4d(0x63c)]){if(_0x5a9e4d(0x8c8)===_0x5a9e4d(0x6d9)){let _0x193cf2=this[_0x5a9e4d(0x9c2)]();this[_0x5a9e4d(0x5e2)]()&&(_0x193cf2=_0x2613ef['GroupDigits'](_0x193cf2));const _0x3d6269=this[_0x5a9e4d(0x886)]()-0x1,_0x2980a8=this[_0x5a9e4d(0x794)]?this[_0x5a9e4d(0x794)]():this[_0x5a9e4d(0x8d7)]();this[_0x5a9e4d(0x731)](),this[_0x5a9e4d(0x2e6)][_0x5a9e4d(0x865)](_0x193cf2,0x0,0x0,_0x3d6269,_0x2980a8,_0x5a9e4d(0x595));}else return![];}return _0x3a004b[_0x5a9e4d(0x300)];},Spriteset_Battle[_0x4396be(0x56f)][_0x4396be(0x74f)]=function(){const _0x12ab2b=_0x4396be;for(member of $gameTroop[_0x12ab2b(0xdf)]()){member[_0x12ab2b(0x6ec)]();}},VisuMZ['CoreEngine'][_0x4396be(0x1e7)]=Window_Base[_0x4396be(0x56f)][_0x4396be(0x480)],Window_Base[_0x4396be(0x56f)][_0x4396be(0x480)]=function(_0x36dd29){const _0x242bea=_0x4396be;_0x36dd29['x']=Math[_0x242bea(0xb9)](_0x36dd29['x']),_0x36dd29['y']=Math[_0x242bea(0xb9)](_0x36dd29['y']),_0x36dd29[_0x242bea(0x67f)]=Math[_0x242bea(0xb9)](_0x36dd29[_0x242bea(0x67f)]),_0x36dd29[_0x242bea(0x21d)]=Math[_0x242bea(0xb9)](_0x36dd29[_0x242bea(0x21d)]),this[_0x242bea(0x3b7)](),VisuMZ[_0x242bea(0x7c7)]['Window_Base_initialize'][_0x242bea(0x8ee)](this,_0x36dd29),this['initCoreEasing']();},Window_Base['prototype']['initDigitGrouping']=function(){const _0x3eb651=_0x4396be;this[_0x3eb651(0x2f2)]=VisuMZ['CoreEngine'][_0x3eb651(0x624)][_0x3eb651(0x9e8)][_0x3eb651(0x5b6)],this['_digitGroupingEx']=VisuMZ['CoreEngine']['Settings'][_0x3eb651(0x9e8)][_0x3eb651(0x236)];},Window_Base[_0x4396be(0x56f)][_0x4396be(0x694)]=function(){const _0x3f975d=_0x4396be;return VisuMZ[_0x3f975d(0x7c7)][_0x3f975d(0x624)][_0x3f975d(0x222)][_0x3f975d(0x69c)];},Window_Base[_0x4396be(0x56f)]['itemPadding']=function(){const _0x4df819=_0x4396be;return VisuMZ[_0x4df819(0x7c7)]['Settings'][_0x4df819(0x222)][_0x4df819(0x695)];},Window_Base[_0x4396be(0x56f)]['updateBackOpacity']=function(){const _0x1b9211=_0x4396be;if($gameSystem[_0x1b9211(0x846)])this[_0x1b9211(0x7d4)]=$gameSystem[_0x1b9211(0x846)]();else{if(_0x1b9211(0x942)===_0x1b9211(0x19a)){if(this['_CoreEngineSettings']===_0x466c2e)this[_0x1b9211(0x308)]();if(this[_0x1b9211(0x4bf)][_0x1b9211(0x528)]===_0x42ced3)this['initCoreEngine']();return this[_0x1b9211(0x4bf)][_0x1b9211(0x528)];}else this[_0x1b9211(0x7d4)]=VisuMZ[_0x1b9211(0x7c7)]['Settings'][_0x1b9211(0x222)][_0x1b9211(0x5a6)];}},Window_Base['prototype'][_0x4396be(0x14e)]=function(){const _0x2c1f8c=_0x4396be;return VisuMZ['CoreEngine'][_0x2c1f8c(0x624)][_0x2c1f8c(0x222)][_0x2c1f8c(0x73b)];},Window_Base[_0x4396be(0x56f)][_0x4396be(0x573)]=function(){const _0x363555=_0x4396be;return VisuMZ['CoreEngine'][_0x363555(0x624)][_0x363555(0x222)][_0x363555(0x4fe)];},VisuMZ['CoreEngine'][_0x4396be(0x31f)]=Window_Base[_0x4396be(0x56f)][_0x4396be(0x68b)],Window_Base['prototype'][_0x4396be(0x68b)]=function(){const _0x505768=_0x4396be;VisuMZ[_0x505768(0x7c7)]['Window_Base_update']['call'](this),this[_0x505768(0x418)]();},Window_Base[_0x4396be(0x56f)]['updateOpen']=function(){const _0x294c2c=_0x4396be;this[_0x294c2c(0x663)]&&(_0x294c2c(0x6d5)===_0x294c2c(0x4b2)?(this[_0x294c2c(0x2cf)]['x']=-0x1*(this['_pageupButton'][_0x294c2c(0x67f)]+this[_0x294c2c(0x27d)]['width']+0x8),this[_0x294c2c(0x27d)]['x']=-0x1*(this[_0x294c2c(0x27d)][_0x294c2c(0x67f)]+0x4)):(this[_0x294c2c(0x504)]+=this[_0x294c2c(0x573)](),this[_0x294c2c(0x487)]()&&(this[_0x294c2c(0x663)]=![])));},Window_Base[_0x4396be(0x56f)][_0x4396be(0x5dd)]=function(){const _0x85a827=_0x4396be;if(this[_0x85a827(0x440)]){this[_0x85a827(0x504)]-=this[_0x85a827(0x573)]();if(this[_0x85a827(0x662)]()){if(_0x85a827(0x94a)==='hYwoI')this[_0x85a827(0x440)]=![];else{if(this['_CoreEngineSettings']===_0x48b16a)this[_0x85a827(0x308)]();if(this[_0x85a827(0x4bf)][_0x85a827(0x88e)]===_0xa22a9e)this[_0x85a827(0x3e3)]();this[_0x85a827(0x4bf)][_0x85a827(0x88e)]=_0x8f7ab7;}}}},VisuMZ['CoreEngine'][_0x4396be(0x61b)]=Window_Base[_0x4396be(0x56f)]['drawText'],Window_Base[_0x4396be(0x56f)][_0x4396be(0x865)]=function(_0x86550e,_0x39babf,_0x11f42c,_0x2002be,_0x6a4225){const _0x2095af=_0x4396be;if(this[_0x2095af(0x5e2)]())_0x86550e=VisuMZ[_0x2095af(0x370)](_0x86550e);VisuMZ[_0x2095af(0x7c7)][_0x2095af(0x61b)][_0x2095af(0x8ee)](this,_0x86550e,_0x39babf,_0x11f42c,_0x2002be,_0x6a4225);},Window_Base[_0x4396be(0x56f)][_0x4396be(0x5e2)]=function(){return this['_digitGrouping'];},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x876)]=Window_Base[_0x4396be(0x56f)][_0x4396be(0x5c5)],Window_Base['prototype'][_0x4396be(0x5c5)]=function(_0x5c63b6,_0x391180,_0x58bf7c,_0x5cc67f){const _0x56c149=_0x4396be;var _0x3af7b8=VisuMZ[_0x56c149(0x7c7)][_0x56c149(0x876)][_0x56c149(0x8ee)](this,_0x5c63b6,_0x391180,_0x58bf7c,_0x5cc67f);if(this[_0x56c149(0x101)]())_0x3af7b8[_0x56c149(0x915)]=String(VisuMZ[_0x56c149(0x370)](_0x3af7b8[_0x56c149(0x915)]))||'';return _0x3af7b8;},Window_Base[_0x4396be(0x56f)][_0x4396be(0x101)]=function(){const _0x2b7132=_0x4396be;return this[_0x2b7132(0x2f8)];},Window_Base['prototype'][_0x4396be(0x31c)]=function(_0x351b37){this['_digitGrouping']=_0x351b37;},Window_Base[_0x4396be(0x56f)]['enableDigitGroupingEx']=function(_0x911fbf){const _0x54a1e3=_0x4396be;this[_0x54a1e3(0x2f8)]=_0x911fbf;},VisuMZ['CoreEngine']['Window_Base_drawIcon']=Window_Base[_0x4396be(0x56f)][_0x4396be(0x943)],Window_Base[_0x4396be(0x56f)][_0x4396be(0x943)]=function(_0xeb2635,_0x151e72,_0x588bc7){const _0x43e3b2=_0x4396be;_0x151e72=Math['round'](_0x151e72),_0x588bc7=Math[_0x43e3b2(0xb9)](_0x588bc7),VisuMZ[_0x43e3b2(0x7c7)][_0x43e3b2(0x831)][_0x43e3b2(0x8ee)](this,_0xeb2635,_0x151e72,_0x588bc7);},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x2a6)]=Window_Base[_0x4396be(0x56f)][_0x4396be(0x834)],Window_Base[_0x4396be(0x56f)]['drawFace']=function(_0x4637d4,_0x4c85d1,_0x861eeb,_0x5d72da,_0x1f87e5,_0x5a2e1c){const _0x566025=_0x4396be;_0x1f87e5=_0x1f87e5||ImageManager[_0x566025(0x71c)],_0x5a2e1c=_0x5a2e1c||ImageManager['faceHeight'],_0x861eeb=Math[_0x566025(0xb9)](_0x861eeb),_0x5d72da=Math['round'](_0x5d72da),_0x1f87e5=Math[_0x566025(0xb9)](_0x1f87e5),_0x5a2e1c=Math[_0x566025(0xb9)](_0x5a2e1c),VisuMZ[_0x566025(0x7c7)][_0x566025(0x2a6)][_0x566025(0x8ee)](this,_0x4637d4,_0x4c85d1,_0x861eeb,_0x5d72da,_0x1f87e5,_0x5a2e1c);},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x17b)]=Window_Base[_0x4396be(0x56f)][_0x4396be(0x8af)],Window_Base[_0x4396be(0x56f)][_0x4396be(0x8af)]=function(_0x5b7315,_0x2c232d,_0x50f5ec,_0x49b161){const _0x1220b0=_0x4396be;_0x50f5ec=Math[_0x1220b0(0xb9)](_0x50f5ec),_0x49b161=Math['round'](_0x49b161),VisuMZ[_0x1220b0(0x7c7)][_0x1220b0(0x17b)][_0x1220b0(0x8ee)](this,_0x5b7315,_0x2c232d,_0x50f5ec,_0x49b161);},VisuMZ[_0x4396be(0x7c7)]['Window_Selectable_itemRect']=Window_Selectable['prototype'][_0x4396be(0x411)],Window_Selectable['prototype'][_0x4396be(0x411)]=function(_0xf3d30d){const _0x4ca150=_0x4396be;let _0x3a0a79=VisuMZ[_0x4ca150(0x7c7)][_0x4ca150(0x850)]['call'](this,_0xf3d30d);return _0x3a0a79['x']=Math[_0x4ca150(0xb9)](_0x3a0a79['x']),_0x3a0a79['y']=Math['round'](_0x3a0a79['y']),_0x3a0a79[_0x4ca150(0x67f)]=Math['round'](_0x3a0a79[_0x4ca150(0x67f)]),_0x3a0a79['height']=Math[_0x4ca150(0xb9)](_0x3a0a79[_0x4ca150(0x21d)]),_0x3a0a79;},VisuMZ[_0x4396be(0x7c7)]['Window_StatusBase_drawActorSimpleStatus']=Window_StatusBase['prototype'][_0x4396be(0x4e3)],Window_StatusBase[_0x4396be(0x56f)][_0x4396be(0x4e3)]=function(_0x5dde7d,_0x1a6921,_0x4228b7){const _0x1d6a8f=_0x4396be;_0x1a6921=Math[_0x1d6a8f(0xb9)](_0x1a6921),_0x4228b7=Math[_0x1d6a8f(0xb9)](_0x4228b7),VisuMZ['CoreEngine'][_0x1d6a8f(0x5fb)][_0x1d6a8f(0x8ee)](this,_0x5dde7d,_0x1a6921,_0x4228b7);},Window_Base[_0x4396be(0x56f)]['initCoreEasing']=function(){const _0x186a90=_0x4396be;this[_0x186a90(0x53a)]={'duration':0x0,'wholeDuration':0x0,'type':_0x186a90(0x453),'targetX':this['x'],'targetY':this['y'],'targetScaleX':this[_0x186a90(0x9a7)]['x'],'targetScaleY':this['scale']['y'],'targetOpacity':this[_0x186a90(0x28d)],'targetBackOpacity':this[_0x186a90(0x7d4)],'targetContentsOpacity':this['contentsOpacity']};},Window_Base['prototype']['updateCoreEasing']=function(){const _0x27314b=_0x4396be;if(!this[_0x27314b(0x53a)])return;if(this[_0x27314b(0x53a)][_0x27314b(0x5cc)]<=0x0)return;this['x']=this[_0x27314b(0x270)](this['x'],this[_0x27314b(0x53a)][_0x27314b(0x60a)]),this['y']=this[_0x27314b(0x270)](this['y'],this[_0x27314b(0x53a)][_0x27314b(0x7c2)]),this['scale']['x']=this[_0x27314b(0x270)](this[_0x27314b(0x9a7)]['x'],this[_0x27314b(0x53a)][_0x27314b(0x829)]),this[_0x27314b(0x9a7)]['y']=this['applyCoreEasing'](this[_0x27314b(0x9a7)]['y'],this['_coreEasing'][_0x27314b(0x7df)]),this['opacity']=this[_0x27314b(0x270)](this[_0x27314b(0x28d)],this[_0x27314b(0x53a)][_0x27314b(0x7d2)]),this[_0x27314b(0x7d4)]=this[_0x27314b(0x270)](this[_0x27314b(0x7d4)],this[_0x27314b(0x53a)][_0x27314b(0x61a)]),this[_0x27314b(0x146)]=this[_0x27314b(0x270)](this[_0x27314b(0x146)],this[_0x27314b(0x53a)]['targetContentsOpacity']),this['_coreEasing'][_0x27314b(0x5cc)]--;},Window_Base['prototype'][_0x4396be(0x270)]=function(_0x133d20,_0x4d7d6c){const _0x281d0e=_0x4396be;if(!this[_0x281d0e(0x53a)])return _0x4d7d6c;const _0x787cf5=this[_0x281d0e(0x53a)][_0x281d0e(0x5cc)],_0x516d16=this[_0x281d0e(0x53a)]['wholeDuration'],_0x2e7da8=this[_0x281d0e(0x271)]((_0x516d16-_0x787cf5)/_0x516d16),_0xed3610=this[_0x281d0e(0x271)]((_0x516d16-_0x787cf5+0x1)/_0x516d16),_0x3317e2=(_0x133d20-_0x4d7d6c*_0x2e7da8)/(0x1-_0x2e7da8);return _0x3317e2+(_0x4d7d6c-_0x3317e2)*_0xed3610;},Window_Base[_0x4396be(0x56f)]['calcCoreEasing']=function(_0x271d22){const _0x34d9cd=_0x4396be;if(!this[_0x34d9cd(0x53a)])return _0x271d22;return VisuMZ[_0x34d9cd(0x5ae)](_0x271d22,this[_0x34d9cd(0x53a)]['type']||_0x34d9cd(0x453));},Window_Base[_0x4396be(0x56f)]['anchorCoreEasing']=function(_0x576f43,_0x9cc573){const _0x54239e=_0x4396be;if(!this['_coreEasing'])return;this['x']=this[_0x54239e(0x53a)][_0x54239e(0x60a)],this['y']=this[_0x54239e(0x53a)][_0x54239e(0x7c2)],this[_0x54239e(0x9a7)]['x']=this[_0x54239e(0x53a)][_0x54239e(0x829)],this[_0x54239e(0x9a7)]['y']=this['_coreEasing'][_0x54239e(0x7df)],this['opacity']=this[_0x54239e(0x53a)][_0x54239e(0x7d2)],this[_0x54239e(0x7d4)]=this[_0x54239e(0x53a)]['targetBackOpacity'],this[_0x54239e(0x146)]=this[_0x54239e(0x53a)][_0x54239e(0x6fa)],this[_0x54239e(0x77e)](_0x576f43,_0x9cc573,this['x'],this['y'],this[_0x54239e(0x9a7)]['x'],this['scale']['y'],this[_0x54239e(0x28d)],this['backOpacity'],this[_0x54239e(0x146)]);},Window_Base[_0x4396be(0x56f)]['setupCoreEasing']=function(_0x563efd,_0x2b1032,_0x1c00b4,_0x2c6d29,_0x22af07,_0x54d5d9,_0x26ecfe,_0xf32992,_0x53178f){const _0x4cb017=_0x4396be;this[_0x4cb017(0x53a)]={'duration':_0x563efd,'wholeDuration':_0x563efd,'type':_0x2b1032,'targetX':_0x1c00b4,'targetY':_0x2c6d29,'targetScaleX':_0x22af07,'targetScaleY':_0x54d5d9,'targetOpacity':_0x26ecfe,'targetBackOpacity':_0xf32992,'targetContentsOpacity':_0x53178f};},Window_Base['prototype']['drawCurrencyValue']=function(_0x41c550,_0x42c747,_0x407391,_0x12d38b,_0x82e975){const _0x4da06e=_0x4396be;this[_0x4da06e(0x32d)](),this[_0x4da06e(0x275)]['fontSize']=VisuMZ[_0x4da06e(0x7c7)][_0x4da06e(0x624)][_0x4da06e(0x740)][_0x4da06e(0x1d3)];const _0x3222f8=VisuMZ[_0x4da06e(0x7c7)][_0x4da06e(0x624)]['Gold'][_0x4da06e(0x122)];if(_0x3222f8>0x0&&_0x42c747===TextManager[_0x4da06e(0x633)]){const _0x325500=_0x12d38b+(this[_0x4da06e(0x694)]()-ImageManager['iconHeight'])/0x2;this['drawIcon'](_0x3222f8,_0x407391+(_0x82e975-ImageManager[_0x4da06e(0x750)]),_0x325500),_0x82e975-=ImageManager['iconWidth']+0x4;}else this[_0x4da06e(0x923)](ColorManager[_0x4da06e(0x741)]()),this[_0x4da06e(0x865)](_0x42c747,_0x407391,_0x12d38b,_0x82e975,_0x4da06e(0x595)),_0x82e975-=this[_0x4da06e(0x459)](_0x42c747)+0x6;this[_0x4da06e(0x2d1)]();const _0x2933e2=this[_0x4da06e(0x459)](this[_0x4da06e(0x2f2)]?VisuMZ[_0x4da06e(0x370)](_0x41c550):_0x41c550);if(_0x2933e2>_0x82e975){if('HZCyb'===_0x4da06e(0x194))this[_0x4da06e(0x865)](VisuMZ[_0x4da06e(0x7c7)]['Settings'][_0x4da06e(0x740)][_0x4da06e(0xc8)],_0x407391,_0x12d38b,_0x82e975,_0x4da06e(0x595));else{_0x16af06[_0x4da06e(0x162)](_0x451d87,_0x4f29d8);const _0x54a3cf=_0x555076[_0x4da06e(0xb9)](_0x416a9f[_0x4da06e(0x15c)])['clamp'](0x0,0x64),_0x3e78b8=_0x2ff965[_0x4da06e(0x46b)];_0x3e78b8&&(_0x3e78b8['volume']=_0x54a3cf,_0x3e78b8[_0x4da06e(0x883)]=_0x2d54e0[_0x4da06e(0x588)]['seek'](),_0x3644f8[_0x4da06e(0x44c)](_0x3e78b8),_0x31b30e[_0x4da06e(0x96e)](_0x3e78b8,_0x3e78b8[_0x4da06e(0x883)]),_0x2acb29[_0x4da06e(0x588)]['_startPlaying'](_0x3e78b8[_0x4da06e(0x883)]));}}else this[_0x4da06e(0x865)](_0x41c550,_0x407391,_0x12d38b,_0x82e975,'right');this['resetFontSettings']();},Window_Base[_0x4396be(0x56f)][_0x4396be(0x6ad)]=function(_0x3e0cd7,_0x2dc78a,_0x22d69e,_0x5bd329,_0x13a9f4){const _0x3e537f=_0x4396be,_0x51a333=ImageManager[_0x3e537f(0x4ab)](_0x3e537f(0x40c)),_0x46879f=ImageManager[_0x3e537f(0x750)],_0x43e82b=ImageManager[_0x3e537f(0x1c2)],_0x1018c9=_0x3e0cd7%0x10*_0x46879f,_0x646993=Math[_0x3e537f(0x346)](_0x3e0cd7/0x10)*_0x43e82b,_0x2a9207=_0x5bd329,_0x380872=_0x5bd329;this[_0x3e537f(0x275)][_0x3e537f(0x3c5)][_0x3e537f(0x84f)]=_0x13a9f4,this[_0x3e537f(0x275)][_0x3e537f(0x7b7)](_0x51a333,_0x1018c9,_0x646993,_0x46879f,_0x43e82b,_0x2dc78a,_0x22d69e,_0x2a9207,_0x380872),this[_0x3e537f(0x275)][_0x3e537f(0x3c5)][_0x3e537f(0x84f)]=!![];},Window_Base[_0x4396be(0x56f)][_0x4396be(0x680)]=function(_0x55f13f,_0x1cb5a3,_0x58f894,_0x5f0f4d,_0x1b987e,_0x1a07f1){const _0x5e8c23=_0x4396be,_0x121a24=Math[_0x5e8c23(0x346)]((_0x58f894-0x2)*_0x5f0f4d),_0x986e47=Sprite_Gauge[_0x5e8c23(0x56f)][_0x5e8c23(0x76d)][_0x5e8c23(0x8ee)](this),_0x458f5f=_0x1cb5a3+this[_0x5e8c23(0x694)]()-_0x986e47-0x2;this[_0x5e8c23(0x275)][_0x5e8c23(0x7da)](_0x55f13f,_0x458f5f,_0x58f894,_0x986e47,ColorManager['gaugeBackColor']()),this['contents'][_0x5e8c23(0x426)](_0x55f13f+0x1,_0x458f5f+0x1,_0x121a24,_0x986e47-0x2,_0x1b987e,_0x1a07f1);},Window_Scrollable[_0x4396be(0x6a9)]={'enabled':VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x624)][_0x4396be(0x222)][_0x4396be(0x160)]??!![],'thickness':VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x624)][_0x4396be(0x222)][_0x4396be(0x45e)]??0x2,'offset':VisuMZ['CoreEngine'][_0x4396be(0x624)][_0x4396be(0x222)][_0x4396be(0x9b8)]??0x2,'bodyColor':VisuMZ['CoreEngine']['Settings']['Window'][_0x4396be(0x51a)]??0x0,'offColor':VisuMZ[_0x4396be(0x7c7)]['Settings'][_0x4396be(0x222)][_0x4396be(0x6cf)]??0x7,'offOpacity':VisuMZ[_0x4396be(0x7c7)]['Settings'][_0x4396be(0x222)][_0x4396be(0xf8)]??0x80},Window_Base[_0x4396be(0x56f)][_0x4396be(0x3bf)]=function(){const _0x97ff97=_0x4396be;return Window_Scrollable[_0x97ff97(0x6a9)][_0x97ff97(0x9f6)]&&Window_Scrollable[_0x97ff97(0x6a9)][_0x97ff97(0x55f)]>0x0;},VisuMZ['CoreEngine'][_0x4396be(0x925)]=Window_Base[_0x4396be(0x56f)]['createContents'],Window_Base['prototype'][_0x4396be(0x533)]=function(){const _0x31ec1c=_0x4396be;VisuMZ['CoreEngine'][_0x31ec1c(0x925)][_0x31ec1c(0x8ee)](this),this[_0x31ec1c(0x1d5)](),this[_0x31ec1c(0x337)](!![]),this[_0x31ec1c(0x337)](![]);},Window_Base[_0x4396be(0x56f)][_0x4396be(0x1d5)]=function(){const _0x414d7f=_0x4396be;if(!this['isScrollBarVisible']())return;if(this[_0x414d7f(0x678)]||this[_0x414d7f(0x314)])return;this['_lastScrollBarValues']={'horz':null,'vert':null,'maxHorz':null,'maxVert':null},this[_0x414d7f(0x678)]=new Sprite(),this[_0x414d7f(0x314)]=new Sprite(),this[_0x414d7f(0x19c)](this['_scrollBarHorz']),this[_0x414d7f(0x19c)](this[_0x414d7f(0x314)]);},Window_Base[_0x4396be(0x56f)][_0x4396be(0x337)]=function(_0xbd7190){const _0x3ea74a=_0x4396be,_0x47ba62=_0xbd7190?this[_0x3ea74a(0x678)]:this[_0x3ea74a(0x314)];if(!_0x47ba62)return;const _0x1b5a7c=Window_Scrollable['SCROLLBAR'],_0x50fdd8=_0x1b5a7c[_0x3ea74a(0x55f)],_0x4e0974=_0xbd7190?this[_0x3ea74a(0x723)]-_0x50fdd8*0x2:_0x50fdd8,_0x4f53e1=_0xbd7190?_0x50fdd8:this[_0x3ea74a(0x666)]-_0x50fdd8*0x2;_0x47ba62[_0x3ea74a(0x2e6)]=new Bitmap(_0x4e0974,_0x4f53e1),_0x47ba62['setFrame'](0x0,0x0,_0x4e0974,_0x4f53e1),this[_0x3ea74a(0xef)](_0xbd7190);},VisuMZ[_0x4396be(0x7c7)]['Window_Base_destroyContents']=Window_Base[_0x4396be(0x56f)][_0x4396be(0x784)],Window_Base['prototype'][_0x4396be(0x784)]=function(){const _0x9cc0ac=_0x4396be;VisuMZ['CoreEngine'][_0x9cc0ac(0x4ed)][_0x9cc0ac(0x8ee)](this),this['destroyScrollBarBitmaps']();},Window_Base['prototype'][_0x4396be(0x383)]=function(){const _0x595879=_0x4396be,_0x47ff68=[this['_scrollBarHorz'],this[_0x595879(0x314)]];for(const _0x494a0c of _0x47ff68){if(_0x494a0c&&_0x494a0c[_0x595879(0x2e6)])_0x494a0c['bitmap'][_0x595879(0x6d4)]();}},VisuMZ[_0x4396be(0x7c7)]['Window_Scrollable_update']=Window_Scrollable[_0x4396be(0x56f)][_0x4396be(0x68b)],Window_Scrollable[_0x4396be(0x56f)]['update']=function(){const _0x14d3fb=_0x4396be;VisuMZ[_0x14d3fb(0x7c7)][_0x14d3fb(0x821)]['call'](this),this[_0x14d3fb(0x42d)]();},Window_Scrollable[_0x4396be(0x56f)][_0x4396be(0x42d)]=function(){const _0x5f1467=_0x4396be;this[_0x5f1467(0x18d)](),this[_0x5f1467(0x49a)](!![]),this[_0x5f1467(0x49a)](![]),this['updateScrollBarPosition'](!![]),this['updateScrollBarPosition'](![]);},Window_Scrollable[_0x4396be(0x56f)]['updateScrollBarVisibility']=function(){const _0x2f3918=_0x4396be,_0x5741db=[this['_scrollBarHorz'],this[_0x2f3918(0x314)]];for(const _0x3441c0 of _0x5741db){if(_0x3441c0){if(_0x2f3918(0x2e3)===_0x2f3918(0x2e3))_0x3441c0[_0x2f3918(0x1c4)]=this['isScrollBarVisible']()&&this['isOpen']();else return _0x3f9e3d[_0x2f3918(0x7c7)][_0x2f3918(0x624)][_0x2f3918(0xae)][_0x2f3918(0x9b5)][_0x2f3918(0x318)];}}},Window_Scrollable[_0x4396be(0x56f)][_0x4396be(0x49a)]=function(_0x5d47e4){const _0x39678e=_0x4396be;if(!this[_0x39678e(0x139)])return;const _0x1c366b=this[_0x39678e(0x15b)](_0x5d47e4),_0x43878f=this[_0x39678e(0x324)](_0x5d47e4),_0x35f554=_0x5d47e4?_0x39678e(0x267):'vert',_0x42f1c8=_0x5d47e4?_0x39678e(0x452):_0x39678e(0x640);(this[_0x39678e(0x139)][_0x35f554]!==_0x1c366b||this[_0x39678e(0x139)][_0x42f1c8]!==_0x43878f)&&(_0x39678e(0x9b1)===_0x39678e(0x9cb)?this['_sideButtonLayout']=_0x40eb35:(this[_0x39678e(0x139)][_0x35f554]=_0x1c366b,this[_0x39678e(0x139)][_0x42f1c8]=_0x43878f,this[_0x39678e(0x718)](_0x5d47e4,_0x1c366b,_0x43878f)));},Window_Scrollable[_0x4396be(0x56f)][_0x4396be(0x15b)]=function(_0x2cdbc0){const _0x57b8e7=_0x4396be;if(this[_0x57b8e7(0x112)]!==undefined){if(_0x57b8e7(0x93f)!==_0x57b8e7(0x93f)){const _0x4ed5eb=_0x57b8e7(0x91e);this[_0x57b8e7(0x6e3)]=this[_0x57b8e7(0x6e3)]||{};if(this[_0x57b8e7(0x6e3)][_0x4ed5eb])return this[_0x57b8e7(0x6e3)][_0x4ed5eb];const _0x3a600d=_0x4eb1a1[_0x57b8e7(0x7c7)][_0x57b8e7(0x624)]['Color'][_0x57b8e7(0x508)];return this[_0x57b8e7(0x2bc)](_0x4ed5eb,_0x3a600d);}else return _0x2cdbc0?this[_0x57b8e7(0x76e)]():this[_0x57b8e7(0x87c)]['y'];}return _0x2cdbc0?this['scrollX']():this[_0x57b8e7(0x358)]();},Window_Scrollable['prototype'][_0x4396be(0x324)]=function(_0x17bd90){const _0x4a6baf=_0x4396be;if(this[_0x4a6baf(0x112)]!==undefined){if(_0x4a6baf(0x989)===_0x4a6baf(0x736)){let _0xc1d78c=0x0;for(const _0x210b07 of _0x5b41ef['CoreEngine'][_0x4a6baf(0x624)]['Param'][_0x4a6baf(0x2c0)]){const _0x2f19fe=this[_0x4a6baf(0x4b6)](),_0x1d1640=this[_0x4a6baf(0x46c)](_0xc1d78c);this[_0x4a6baf(0x320)](_0x2f19fe,_0x1d1640,_0x210b07),_0xc1d78c++;}}else return _0x17bd90?this[_0x4a6baf(0x52b)]():Math[_0x4a6baf(0x8cd)](0x0,this[_0x4a6baf(0x112)]-this[_0x4a6baf(0x666)]);}return _0x17bd90?this[_0x4a6baf(0x52b)]():this[_0x4a6baf(0x72a)]();},Window_Scrollable['prototype'][_0x4396be(0x5ff)]=function(){const _0x45839a=_0x4396be;if(this[_0x45839a(0x112)]!==undefined){if(_0x45839a(0x68f)===_0x45839a(0x43f))_0x429672[_0x45839a(0x859)](!![]);else return Math[_0x45839a(0x8cd)](0x0,this[_0x45839a(0x112)]);}return this[_0x45839a(0xa0f)]();},Window_Scrollable[_0x4396be(0x56f)][_0x4396be(0x718)]=function(_0x3f25fe,_0x2222eb,_0x4e856e){const _0x337e80=_0x4396be,_0xe729cc=_0x3f25fe?this[_0x337e80(0x678)]:this[_0x337e80(0x314)];if(!_0xe729cc)return;if(!_0xe729cc[_0x337e80(0x2e6)])return;const _0x12d7ed=_0xe729cc[_0x337e80(0x2e6)];_0x12d7ed[_0x337e80(0x7db)]();if(_0x4e856e<=0x0)return;const _0x24c94c=_0x3f25fe?this[_0x337e80(0x723)]/this['overallWidth']():this['innerHeight']/this[_0x337e80(0x5ff)](),_0x277398=_0x3f25fe?Math[_0x337e80(0xb9)](_0x2222eb*_0x24c94c):0x0,_0x19dc8f=_0x3f25fe?0x0:Math[_0x337e80(0xb9)](_0x2222eb*_0x24c94c),_0x38f366=_0x3f25fe?Math[_0x337e80(0xb9)](_0x12d7ed[_0x337e80(0x67f)]*_0x24c94c):_0x12d7ed[_0x337e80(0x67f)],_0x2350ac=_0x3f25fe?_0x12d7ed[_0x337e80(0x21d)]:Math[_0x337e80(0xb9)](_0x12d7ed[_0x337e80(0x21d)]*_0x24c94c),_0x2db080=Window_Scrollable[_0x337e80(0x6a9)],_0x57ea19=ColorManager['getColor'](_0x2db080[_0x337e80(0x484)]),_0x2b80d5=ColorManager['getColor'](_0x2db080['bodyColor']),_0x10c52c=_0x2db080['offOpacity'];_0x12d7ed[_0x337e80(0x476)]=_0x10c52c,_0x12d7ed[_0x337e80(0x118)](_0x57ea19),_0x12d7ed['paintOpacity']=0xff,_0x12d7ed[_0x337e80(0x7da)](_0x277398,_0x19dc8f,_0x38f366,_0x2350ac,_0x2b80d5);},Window_Base['prototype']['updateScrollBarPosition']=function(_0x43c38e){const _0x1a1698=_0x4396be,_0x65faa8=_0x43c38e?this[_0x1a1698(0x678)]:this[_0x1a1698(0x314)];if(!_0x65faa8)return;const _0x5f4869=Window_Scrollable[_0x1a1698(0x6a9)],_0x22d961=_0x5f4869[_0x1a1698(0x55f)],_0xb60334=_0x5f4869['offset'];if(!_0x65faa8['transform'])return;_0x65faa8['x']=this['padding']+(_0x43c38e?_0x22d961:this[_0x1a1698(0x723)]+_0xb60334),_0x65faa8['y']=this[_0x1a1698(0x1b4)]+(_0x43c38e?this[_0x1a1698(0x666)]+_0xb60334:_0x22d961);},Window_Selectable['prototype'][_0x4396be(0x15e)]=function(_0x89d9f6){const _0x271e88=_0x4396be;let _0x3d097a=this[_0x271e88(0x6fc)]();const _0xb82e8f=this['maxItems'](),_0x478a68=this[_0x271e88(0x47d)]();if(this[_0x271e88(0x518)]()&&(_0x3d097a<_0xb82e8f||_0x89d9f6&&_0x478a68===0x1)){_0x3d097a+=_0x478a68;if(_0x3d097a>=_0xb82e8f)_0x3d097a=_0xb82e8f-0x1;this[_0x271e88(0x8e9)](_0x3d097a);}else!this['isUseModernControls']()&&((_0x3d097a<_0xb82e8f-_0x478a68||_0x89d9f6&&_0x478a68===0x1)&&this['smoothSelect']((_0x3d097a+_0x478a68)%_0xb82e8f));},VisuMZ[_0x4396be(0x7c7)]['Window_Selectable_cursorDown']=Window_Selectable[_0x4396be(0x56f)][_0x4396be(0x15e)],Window_Selectable[_0x4396be(0x56f)][_0x4396be(0x15e)]=function(_0x2ffdc0){const _0x2bbce1=_0x4396be;this[_0x2bbce1(0x518)]()&&_0x2ffdc0&&this[_0x2bbce1(0x47d)]()===0x1&&this[_0x2bbce1(0x6fc)]()===this[_0x2bbce1(0x59b)]()-0x1?this['smoothSelect'](0x0):VisuMZ['CoreEngine'][_0x2bbce1(0x325)][_0x2bbce1(0x8ee)](this,_0x2ffdc0);},Window_Selectable['prototype'][_0x4396be(0x4f2)]=function(_0x3db40c){const _0x2bc1bc=_0x4396be;let _0x37c2a1=Math[_0x2bc1bc(0x8cd)](0x0,this[_0x2bc1bc(0x6fc)]());const _0x17817b=this[_0x2bc1bc(0x59b)](),_0x45cb96=this[_0x2bc1bc(0x47d)]();if(this[_0x2bc1bc(0x518)]()&&_0x37c2a1>0x0||_0x3db40c&&_0x45cb96===0x1){_0x37c2a1-=_0x45cb96;if(_0x37c2a1<=0x0)_0x37c2a1=0x0;this['smoothSelect'](_0x37c2a1);}else{if(!this[_0x2bc1bc(0x518)]()){if('hzQUA'===_0x2bc1bc(0x365))return _0x5c2d66[_0x2bc1bc(0x50d)];else(_0x37c2a1>=_0x45cb96||_0x3db40c&&_0x45cb96===0x1)&&(_0x2bc1bc(0x3ca)!=='rdpYe'?(this[_0x2bc1bc(0x813)](),_0x23dc2f[_0x2bc1bc(0x6c7)](),this[_0x2bc1bc(0x258)]==='default'?this[_0x2bc1bc(0x17a)](0x0):this['select'](-0x1)):this[_0x2bc1bc(0x8e9)]((_0x37c2a1-_0x45cb96+_0x17817b)%_0x17817b));}}},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x4d9)]=Window_Selectable[_0x4396be(0x56f)][_0x4396be(0x4f2)],Window_Selectable[_0x4396be(0x56f)][_0x4396be(0x4f2)]=function(_0x57176e){const _0x264a1e=_0x4396be;if(this['isUseModernControls']()&&_0x57176e&&this[_0x264a1e(0x47d)]()===0x1&&this[_0x264a1e(0x6fc)]()===0x0){if('cRjcm'!=='cRjcm'){const _0x4b6503=_0x5f0fd7['CoreEngine'][_0x264a1e(0x624)][_0x264a1e(0x83f)];if(_0x4b6503&&_0x4b6503[_0x264a1e(0x853)])return _0x4b6503['horzJS'][_0x264a1e(0x8ee)](this);const _0x487633=_0x51ff6f[_0x264a1e(0x956)]*0.75,_0x4465b7=_0x3e813b[_0x264a1e(0x80e)]*0.6,_0x5b4877=_0x50cb9d['_shakeDuration'];this['x']+=_0x3efa87[_0x264a1e(0xb9)](_0x1025e9['randomInt'](_0x487633)-_0x250601[_0x264a1e(0x31d)](_0x4465b7))*(_0x427ffe[_0x264a1e(0x58b)](_0x5b4877,0x1e)*0.5);}else this[_0x264a1e(0x8e9)](this[_0x264a1e(0x59b)]()-0x1);}else VisuMZ[_0x264a1e(0x7c7)][_0x264a1e(0x4d9)][_0x264a1e(0x8ee)](this,_0x57176e);},Window_Selectable[_0x4396be(0x56f)][_0x4396be(0x518)]=function(){const _0x25eb3e=_0x4396be;return VisuMZ['CoreEngine'][_0x25eb3e(0x624)]['QoL'][_0x25eb3e(0x5b2)];},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x6d7)]=Window_Selectable[_0x4396be(0x56f)][_0x4396be(0x296)],Window_Selectable[_0x4396be(0x56f)]['processCursorMove']=function(){const _0x42dfaa=_0x4396be;this[_0x42dfaa(0x518)]()?(this['processCursorMoveModernControls'](),this[_0x42dfaa(0x338)]()):VisuMZ[_0x42dfaa(0x7c7)][_0x42dfaa(0x6d7)][_0x42dfaa(0x8ee)](this);},Window_Selectable[_0x4396be(0x56f)][_0x4396be(0x5f7)]=function(){return!![];},Window_Selectable['prototype'][_0x4396be(0x2c5)]=function(){const _0x3ce3b0=_0x4396be;if(this['isCursorMovable']()){const _0x225fcb=this[_0x3ce3b0(0x6fc)]();if(Input['isRepeated'](_0x3ce3b0(0x22e))){if(_0x3ce3b0(0x911)!==_0x3ce3b0(0x6c0)){if(Input['isPressed']('shift')&&this[_0x3ce3b0(0x5f7)]())this[_0x3ce3b0(0x808)]();else{if(_0x3ce3b0(0x1d1)!==_0x3ce3b0(0x442))this[_0x3ce3b0(0x15e)](Input[_0x3ce3b0(0x3c1)](_0x3ce3b0(0x22e)));else{const _0x1edd43=_0x1598f2[_0x3ce3b0(0x61d)](_0x5a8b8b);_0x2fc20d['setValue'](_0x5a681c,!_0x1edd43);}}}else for(_0x2a7667 of _0x318ba4['members']()){_0xf74efa['moveRelativeToResolutionChange']();}}if(Input[_0x3ce3b0(0x605)]('up')){if(Input[_0x3ce3b0(0x177)](_0x3ce3b0(0x762))&&this['allowShiftScrolling']()){if(_0x3ce3b0(0x92c)==='cwyIk'){const _0x51bdef=_0x58c4f9[_0x3ce3b0(0x8ee)](this);return _0x3f2d65==='integer'?_0x4e63b1[_0x3ce3b0(0xb9)](_0x51bdef):_0x51bdef;}else this[_0x3ce3b0(0x7e9)]();}else{if(_0x3ce3b0(0x5d4)===_0x3ce3b0(0x961)){const _0x5b7257=this[_0x3ce3b0(0x1de)]();this[_0x3ce3b0(0x275)][_0x3ce3b0(0x7db)](),this[_0x3ce3b0(0x47e)](this['_text'],_0x5b7257['x'],_0x5b7257['y'],_0x5b7257[_0x3ce3b0(0x67f)]);}else this[_0x3ce3b0(0x4f2)](Input[_0x3ce3b0(0x3c1)]('up'));}}Input[_0x3ce3b0(0x605)](_0x3ce3b0(0x595))&&this[_0x3ce3b0(0x860)](Input['isTriggered']('right'));Input['isRepeated'](_0x3ce3b0(0x9d7))&&this[_0x3ce3b0(0x2f1)](Input[_0x3ce3b0(0x3c1)](_0x3ce3b0(0x9d7)));!this[_0x3ce3b0(0x9da)]('pagedown')&&Input[_0x3ce3b0(0x605)](_0x3ce3b0(0x1c9))&&this[_0x3ce3b0(0x808)]();if(!this[_0x3ce3b0(0x9da)](_0x3ce3b0(0x72e))&&Input[_0x3ce3b0(0x605)](_0x3ce3b0(0x72e))){if(_0x3ce3b0(0x691)!==_0x3ce3b0(0x602))this[_0x3ce3b0(0x7e9)]();else var _0xc7458a=_0x260eb7[_0x3ce3b0(0x5ae)](_0x3fd826*0x2,_0x3ce3b0(0x9f5))*0.5;}this[_0x3ce3b0(0x6fc)]()!==_0x225fcb&&(_0x3ce3b0(0x609)===_0x3ce3b0(0x577)?this['loadIconBitmap'](_0xd16852(_0x286330['$1'])):this['playCursorSound']());}},Window_Selectable[_0x4396be(0x56f)]['processCursorHomeEndTrigger']=function(){const _0x508876=_0x4396be;if(this[_0x508876(0x111)]()){const _0x2d50a6=this['index']();Input['isTriggered'](_0x508876(0x209))&&(_0x508876(0x71f)!=='gYaou'?this['smoothSelect'](Math['min'](this[_0x508876(0x6fc)](),0x0)):(_0x45a49e+=_0x43022a,_0x4e666b+='%1〘End\x20Choice\x20Selection〙%1'[_0x508876(0x9c3)](_0x11ca7c))),Input[_0x508876(0x3c1)](_0x508876(0x68c))&&('RheLF'!==_0x508876(0x71b)?this['smoothSelect'](Math[_0x508876(0x8cd)](this['index'](),this[_0x508876(0x59b)]()-0x1)):(this[_0x508876(0x275)]['fontSize']=this[_0x508876(0x4c7)](),this['contents'][_0x508876(0x865)](_0x57c939,_0x5e6fd6,_0x553f1e,_0x2b09db,this[_0x508876(0x9be)](),'left'))),this['index']()!==_0x2d50a6&&(_0x508876(0x6e0)===_0x508876(0x6e0)?this[_0x508876(0x5b9)]():(_0x5e4218[_0x508876(0x7c7)][_0x508876(0x4d3)][_0x508876(0x8ee)](this),_0x1451de['addEventListener'](_0x508876(0x842),this[_0x508876(0x639)][_0x508876(0x7d9)](this))));}},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x7f1)]=Window_Selectable['prototype'][_0x4396be(0x8ea)],Window_Selectable[_0x4396be(0x56f)]['processTouch']=function(){const _0x1672cb=_0x4396be;this[_0x1672cb(0x518)]()?this['processTouchModernControls']():_0x1672cb(0x8b8)==='Dylmx'?this[_0x1672cb(0x845)][_0x1672cb(0x2dd)](_0x2ebf0e['layoutSettings'][_0x1672cb(0x3ae)]):VisuMZ[_0x1672cb(0x7c7)][_0x1672cb(0x7f1)][_0x1672cb(0x8ee)](this);},Window_Selectable[_0x4396be(0x56f)][_0x4396be(0xf9)]=function(){const _0x885bb8=_0x4396be;VisuMZ[_0x885bb8(0x7c7)]['Window_Selectable_processTouch'][_0x885bb8(0x8ee)](this);},Window_Selectable[_0x4396be(0x56f)]['colSpacing']=function(){const _0x5d8221=_0x4396be;return VisuMZ['CoreEngine']['Settings'][_0x5d8221(0x222)][_0x5d8221(0x319)];},Window_Selectable['prototype']['rowSpacing']=function(){const _0x1824ac=_0x4396be;return VisuMZ[_0x1824ac(0x7c7)]['Settings']['Window']['RowSpacing'];},Window_Selectable[_0x4396be(0x56f)][_0x4396be(0x806)]=function(){const _0x268368=_0x4396be;return Window_Scrollable[_0x268368(0x56f)]['itemHeight'][_0x268368(0x8ee)](this)+VisuMZ[_0x268368(0x7c7)][_0x268368(0x624)]['Window'][_0x268368(0x302)];;},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x326)]=Window_Selectable[_0x4396be(0x56f)]['drawBackgroundRect'],Window_Selectable[_0x4396be(0x56f)][_0x4396be(0x386)]=function(_0x5b35b4){const _0x275c48=_0x4396be,_0x50b5b0=VisuMZ[_0x275c48(0x7c7)][_0x275c48(0x624)][_0x275c48(0x222)];if(_0x50b5b0[_0x275c48(0x88c)]===![])return;_0x50b5b0['DrawItemBackgroundJS']?_0x50b5b0['DrawItemBackgroundJS']['call'](this,_0x5b35b4):VisuMZ['CoreEngine']['Window_Selectable_drawBackgroundRect'][_0x275c48(0x8ee)](this,_0x5b35b4);},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x18b)]=Window_Gold[_0x4396be(0x56f)][_0x4396be(0x813)],Window_Gold[_0x4396be(0x56f)][_0x4396be(0x813)]=function(){const _0x5ca8b3=_0x4396be;if(this[_0x5ca8b3(0x676)]())this[_0x5ca8b3(0x887)]();else{if(_0x5ca8b3(0x940)!=='kJqNW')VisuMZ[_0x5ca8b3(0x7c7)][_0x5ca8b3(0x18b)]['call'](this);else return this[_0x5ca8b3(0x606)]();}},Window_Gold[_0x4396be(0x56f)][_0x4396be(0x676)]=function(){const _0x2d8417=_0x4396be;if(TextManager[_0x2d8417(0x633)]!==this[_0x2d8417(0x633)]())return![];return VisuMZ[_0x2d8417(0x7c7)][_0x2d8417(0x624)][_0x2d8417(0x740)]['ItemStyle'];},Window_Gold[_0x4396be(0x56f)][_0x4396be(0x887)]=function(){const _0x5a52a6=_0x4396be;this[_0x5a52a6(0x32d)](),this[_0x5a52a6(0x275)][_0x5a52a6(0x7db)](),this['contents']['fontSize']=VisuMZ[_0x5a52a6(0x7c7)][_0x5a52a6(0x624)][_0x5a52a6(0x740)][_0x5a52a6(0x1d3)];const _0x1f24a9=VisuMZ[_0x5a52a6(0x7c7)]['Settings'][_0x5a52a6(0x740)][_0x5a52a6(0x122)],_0x2c1393=this[_0x5a52a6(0x4a0)](0x0);if(_0x1f24a9>0x0){const _0x4b5dfd=_0x2c1393['y']+(this[_0x5a52a6(0x694)]()-ImageManager[_0x5a52a6(0x1c2)])/0x2;this[_0x5a52a6(0x943)](_0x1f24a9,_0x2c1393['x'],_0x4b5dfd);const _0x3ef7c4=ImageManager[_0x5a52a6(0x750)]+0x4;_0x2c1393['x']+=_0x3ef7c4,_0x2c1393[_0x5a52a6(0x67f)]-=_0x3ef7c4;}this[_0x5a52a6(0x923)](ColorManager[_0x5a52a6(0x741)]()),this['drawText'](this[_0x5a52a6(0x633)](),_0x2c1393['x'],_0x2c1393['y'],_0x2c1393[_0x5a52a6(0x67f)],_0x5a52a6(0x9d7));const _0x55ce90=this[_0x5a52a6(0x459)](this[_0x5a52a6(0x633)]())+0x6;;_0x2c1393['x']+=_0x55ce90,_0x2c1393['width']-=_0x55ce90,this[_0x5a52a6(0x2d1)]();const _0x1d4e9f=this[_0x5a52a6(0x61d)](),_0x165375=this['textWidth'](this[_0x5a52a6(0x2f2)]?VisuMZ[_0x5a52a6(0x370)](this[_0x5a52a6(0x61d)]()):this[_0x5a52a6(0x61d)]());if(_0x165375>_0x2c1393[_0x5a52a6(0x67f)]){if(_0x5a52a6(0x13f)!=='UtsDL')this['drawText'](VisuMZ[_0x5a52a6(0x7c7)][_0x5a52a6(0x624)]['Gold'][_0x5a52a6(0xc8)],_0x2c1393['x'],_0x2c1393['y'],_0x2c1393[_0x5a52a6(0x67f)],_0x5a52a6(0x595));else return this['item']()?_0xe72e5c[_0x5a52a6(0x7c7)]['Game_Action_numRepeats'][_0x5a52a6(0x8ee)](this):0x0;}else{if(_0x5a52a6(0x81e)!==_0x5a52a6(0x202))this[_0x5a52a6(0x865)](this[_0x5a52a6(0x61d)](),_0x2c1393['x'],_0x2c1393['y'],_0x2c1393['width'],_0x5a52a6(0x595));else{const _0x23a1f5=_0xeee45d[_0x4132a5][_0x5a52a6(0x862)];_0x2eee5b+=_0x15e9c8+_0x5a52a6(0x8c6)[_0x5a52a6(0x9c3)](_0x1e86ca,_0x23a1f5||_0x5a52a6(0x2f5))+_0x3799ed;}}this[_0x5a52a6(0x32d)]();},Window_StatusBase['prototype']['drawParamText']=function(_0x257fa2,_0x470d4b,_0x3e1996,_0x4ed546,_0x407206){const _0x47259c=_0x4396be;_0x4ed546=String(_0x4ed546||'')['toUpperCase']();if(VisuMZ['CoreEngine']['Settings'][_0x47259c(0xa0e)][_0x47259c(0x4ce)]){const _0x4fdb57=VisuMZ[_0x47259c(0x928)](_0x4ed546);_0x407206?_0x47259c(0x5b8)===_0x47259c(0x8ed)?(_0x4d5c33['prototype']['update'][_0x47259c(0x8ee)](this),this[_0x47259c(0x384)]()):(this[_0x47259c(0x6ad)](_0x4fdb57,_0x257fa2,_0x470d4b,this[_0x47259c(0x9be)]()),_0x3e1996-=this['gaugeLineHeight']()+0x2,_0x257fa2+=this['gaugeLineHeight']()+0x2):(this[_0x47259c(0x943)](_0x4fdb57,_0x257fa2+0x2,_0x470d4b+0x2),_0x3e1996-=ImageManager[_0x47259c(0x750)]+0x4,_0x257fa2+=ImageManager['iconWidth']+0x4);}const _0x2fd104=TextManager[_0x47259c(0x77c)](_0x4ed546);this['resetFontSettings'](),this[_0x47259c(0x923)](ColorManager['systemColor']()),_0x407206?_0x47259c(0x9ee)!=='XHPUh'?(_0x2d9872[_0x47259c(0x4d1)](),_0x3960f5[_0x47259c(0x1c3)]=new _0x3d0f48(),_0xd131ba['addChild'](_0x5555d2[_0x47259c(0x1c3)])):(this[_0x47259c(0x275)][_0x47259c(0x35f)]=this[_0x47259c(0x4c7)](),this[_0x47259c(0x275)][_0x47259c(0x865)](_0x2fd104,_0x257fa2,_0x470d4b,_0x3e1996,this[_0x47259c(0x9be)](),_0x47259c(0x9d7))):_0x47259c(0x35a)===_0x47259c(0x35a)?this[_0x47259c(0x865)](_0x2fd104,_0x257fa2,_0x470d4b,_0x3e1996):this[_0x47259c(0x50d)]=0x0,this[_0x47259c(0x32d)]();},Window_StatusBase[_0x4396be(0x56f)]['smallParamFontSize']=function(){return $gameSystem['mainFontSize']()-0x8;},Window_StatusBase[_0x4396be(0x56f)]['drawActorClass']=function(_0x514279,_0x435793,_0x2fdd02,_0x321601){const _0x45842c=_0x4396be;_0x321601=_0x321601||0xa8,this[_0x45842c(0x2d1)]();if(VisuMZ[_0x45842c(0x7c7)][_0x45842c(0x624)]['UI'][_0x45842c(0x2d6)])this[_0x45842c(0x47e)](_0x514279[_0x45842c(0x789)]()[_0x45842c(0x862)],_0x435793,_0x2fdd02,_0x321601);else{const _0x5eb93d=_0x514279[_0x45842c(0x789)]()[_0x45842c(0x862)][_0x45842c(0x437)](/\\I\[(\d+)\]/gi,'');this['drawText'](_0x5eb93d,_0x435793,_0x2fdd02,_0x321601);}},Window_StatusBase[_0x4396be(0x56f)]['drawActorNickname']=function(_0x176f4d,_0x469c3e,_0x577d9b,_0x6f4383){const _0x10c03c=_0x4396be;_0x6f4383=_0x6f4383||0x10e,this[_0x10c03c(0x2d1)]();if(VisuMZ['CoreEngine'][_0x10c03c(0x624)]['UI'][_0x10c03c(0x97d)])this['drawTextEx'](_0x176f4d['nickname'](),_0x469c3e,_0x577d9b,_0x6f4383);else{if('hpFQt'!=='KcUuL'){const _0x418660=_0x176f4d[_0x10c03c(0x2ed)]()[_0x10c03c(0x437)](/\\I\[(\d+)\]/gi,'');this[_0x10c03c(0x865)](_0x176f4d['nickname'](),_0x469c3e,_0x577d9b,_0x6f4383);}else{if(this[_0x10c03c(0x8ba)]()){const _0x6e0e3b=_0x150979[_0x10c03c(0x7c7)][_0x10c03c(0x624)]['KeyboardInput'];if(this['_inputWindow'][_0x10c03c(0x258)]==='keyboard')return _0x6e0e3b[_0x10c03c(0x201)]||_0x10c03c(0x201);}return _0x1a63ee[_0x10c03c(0x56f)][_0x10c03c(0x12a)]['call'](this);}}},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x261)]=Window_StatusBase[_0x4396be(0x56f)][_0x4396be(0x777)],Window_StatusBase['prototype'][_0x4396be(0x777)]=function(_0x4a49b1,_0x1b4cce,_0x1691d3){const _0x1ab8c7=_0x4396be;if(VisuMZ[_0x1ab8c7(0x7c7)][_0x1ab8c7(0x624)][_0x1ab8c7(0xa0e)][_0x1ab8c7(0x7fa)]===![])return;if(this[_0x1ab8c7(0x2f3)]())this[_0x1ab8c7(0x6c1)](_0x4a49b1,_0x1b4cce,_0x1691d3);VisuMZ[_0x1ab8c7(0x7c7)][_0x1ab8c7(0x261)][_0x1ab8c7(0x8ee)](this,_0x4a49b1,_0x1b4cce,_0x1691d3);},Window_StatusBase[_0x4396be(0x56f)][_0x4396be(0x2f3)]=function(){const _0x5956c7=_0x4396be;return VisuMZ['CoreEngine'][_0x5956c7(0x624)]['UI']['LvExpGauge'];},Window_StatusBase['prototype'][_0x4396be(0x6c1)]=function(_0x2c3928,_0x3ed757,_0x42e378){const _0x55c6d4=_0x4396be;if(!_0x2c3928)return;if(!_0x2c3928[_0x55c6d4(0x10b)]())return;const _0x126323=0x80,_0x3c2d7e=_0x2c3928[_0x55c6d4(0x760)]();let _0x328633=ColorManager[_0x55c6d4(0xa04)](),_0xae5d36=ColorManager[_0x55c6d4(0x24e)]();if(_0x3c2d7e>=0x1){if(_0x55c6d4(0x6e2)==='rDslO')_0x328633=ColorManager[_0x55c6d4(0x4a6)](),_0xae5d36=ColorManager[_0x55c6d4(0x10e)]();else return _0x5eaa62['CoreEngine'][_0x55c6d4(0x145)][_0x55c6d4(0x8ee)](this);}this[_0x55c6d4(0x680)](_0x3ed757,_0x42e378,_0x126323,_0x3c2d7e,_0x328633,_0xae5d36);},Window_EquipStatus['prototype'][_0x4396be(0x34b)]=function(){const _0x506996=_0x4396be;let _0x440e90=0x0;for(const _0x2c0061 of VisuMZ[_0x506996(0x7c7)][_0x506996(0x624)]['Param'][_0x506996(0x2c0)]){const _0xa8bc0f=this[_0x506996(0x4b6)](),_0x1fb31f=this[_0x506996(0x46c)](_0x440e90);this[_0x506996(0x320)](_0xa8bc0f,_0x1fb31f,_0x2c0061),_0x440e90++;}},Window_EquipStatus['prototype']['drawParamName']=function(_0x215066,_0x442e18,_0x4822b1){const _0x29e974=_0x4396be,_0x12f0c9=this[_0x29e974(0x4af)]()-this[_0x29e974(0x4b6)]()*0x2;this[_0x29e974(0x501)](_0x215066,_0x442e18,_0x12f0c9,_0x4822b1,![]);},Window_EquipStatus[_0x4396be(0x56f)][_0x4396be(0x9dc)]=function(_0x248fdf,_0x22842a,_0x637924){const _0x258d56=_0x4396be,_0x16dfad=this['paramWidth']();this[_0x258d56(0x2d1)](),this[_0x258d56(0x865)](this[_0x258d56(0x97f)][_0x258d56(0x3ad)](_0x637924,!![]),_0x248fdf,_0x22842a,_0x16dfad,_0x258d56(0x595));},Window_EquipStatus[_0x4396be(0x56f)][_0x4396be(0x6e8)]=function(_0x21f9d5,_0x1a606e){const _0x39f026=_0x4396be,_0xa6b83=this['rightArrowWidth']();this[_0x39f026(0x923)](ColorManager[_0x39f026(0x741)]());const _0x163072=VisuMZ[_0x39f026(0x7c7)][_0x39f026(0x624)]['UI'][_0x39f026(0x6a1)];this[_0x39f026(0x865)](_0x163072,_0x21f9d5,_0x1a606e,_0xa6b83,'center');},Window_EquipStatus[_0x4396be(0x56f)]['drawNewParam']=function(_0x110288,_0x970305,_0x4dedc1){const _0x4f338b=_0x4396be,_0x2af497=this[_0x4f338b(0x53f)](),_0xc78ad5=this[_0x4f338b(0x7af)][_0x4f338b(0x3ad)](_0x4dedc1),_0xa760eb=_0xc78ad5-this['_actor']['paramValueByName'](_0x4dedc1);this[_0x4f338b(0x923)](ColorManager[_0x4f338b(0x430)](_0xa760eb)),this[_0x4f338b(0x865)](this[_0x4f338b(0x7af)][_0x4f338b(0x3ad)](_0x4dedc1,!![]),_0x110288,_0x970305,_0x2af497,_0x4f338b(0x595));},VisuMZ['CoreEngine'][_0x4396be(0x8eb)]=Window_EquipItem[_0x4396be(0x56f)][_0x4396be(0x28b)],Window_EquipItem[_0x4396be(0x56f)][_0x4396be(0x28b)]=function(_0x3837ea){const _0x5c3aef=_0x4396be;if(_0x3837ea&&this[_0x5c3aef(0x97f)]){if('QpsEk'!==_0x5c3aef(0x735))return this[_0x5c3aef(0x97f)][_0x5c3aef(0x7c6)](_0x3837ea);else{this[_0x5c3aef(0x275)]['clear']();const _0x1e8765=_0x582209['_pictureCoordinatesMode'],_0x4bb360=_0x2f8b9d[_0x5c3aef(0x6cc)](_0x1e8765);if(!_0x4bb360)return;this['_lastOrigin']=_0x4bb360[_0x5c3aef(0x8fd)],this[_0x5c3aef(0x27e)]=_0x4bb360['_x'],this[_0x5c3aef(0x9d3)]=_0x4bb360['_y'];const _0x404018=_0x462fbd['itemBackColor1']();this[_0x5c3aef(0x275)][_0x5c3aef(0x7da)](0x0,0x0,this[_0x5c3aef(0x723)],this[_0x5c3aef(0x666)],_0x404018);const _0x324060=_0x5c3aef(0x2bf)[_0x5c3aef(0x9c3)](_0x4bb360[_0x5c3aef(0x8fd)]===0x0?_0x5c3aef(0x51c):_0x5c3aef(0x1a7)),_0x441ece=_0x5c3aef(0x272)[_0x5c3aef(0x9c3)](_0x4bb360['_x']),_0x26fe30=_0x5c3aef(0x252)[_0x5c3aef(0x9c3)](_0x4bb360['_y']),_0x5c9581=_0x5c3aef(0x855)['format'](_0x218e5d[_0x5c3aef(0x35e)]('cancel'));let _0x1dd8a7=_0x385d9e[_0x5c3aef(0x346)](this['innerWidth']/0x4);this['drawText'](_0x324060,_0x1dd8a7*0x0,0x0,_0x1dd8a7),this['drawText'](_0x441ece,_0x1dd8a7*0x1,0x0,_0x1dd8a7,_0x5c3aef(0x42b)),this['drawText'](_0x26fe30,_0x1dd8a7*0x2,0x0,_0x1dd8a7,_0x5c3aef(0x42b));const _0x1359f4=this['textSizeEx'](_0x5c9581)['width'],_0x51ee46=this['innerWidth']-_0x1359f4;this[_0x5c3aef(0x47e)](_0x5c9581,_0x51ee46,0x0,_0x1359f4);}}else return VisuMZ[_0x5c3aef(0x7c7)][_0x5c3aef(0x8eb)][_0x5c3aef(0x8ee)](this,_0x3837ea);},Window_StatusParams[_0x4396be(0x56f)]['maxItems']=function(){const _0x155e65=_0x4396be;return VisuMZ['CoreEngine'][_0x155e65(0x624)]['Param'][_0x155e65(0x2c0)]['length'];},Window_StatusParams[_0x4396be(0x56f)][_0x4396be(0x320)]=function(_0x3c550d){const _0x82f363=_0x4396be,_0x646d93=this[_0x82f363(0x4a0)](_0x3c550d),_0x14a9cc=VisuMZ[_0x82f363(0x7c7)][_0x82f363(0x624)]['Param'][_0x82f363(0x2c0)][_0x3c550d],_0x2db5a2=TextManager[_0x82f363(0x77c)](_0x14a9cc),_0x329b64=this[_0x82f363(0x97f)][_0x82f363(0x3ad)](_0x14a9cc,!![]);this[_0x82f363(0x501)](_0x646d93['x'],_0x646d93['y'],0xa0,_0x14a9cc,![]),this[_0x82f363(0x2d1)](),this[_0x82f363(0x865)](_0x329b64,_0x646d93['x']+0xa0,_0x646d93['y'],0x3c,'right');};if(VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x624)][_0x4396be(0x4bc)][_0x4396be(0x8ba)]){VisuMZ['CoreEngine'][_0x4396be(0x624)][_0x4396be(0x4bc)][_0x4396be(0x2a1)]&&(Window_NameInput[_0x4396be(0x721)]=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20',_0x4396be(0x364),'OK']);;VisuMZ['CoreEngine'][_0x4396be(0x5f6)]=Window_NameInput[_0x4396be(0x56f)]['initialize'],Window_NameInput[_0x4396be(0x56f)][_0x4396be(0x480)]=function(_0x4082c5){const _0x36f1cc=_0x4396be;this[_0x36f1cc(0x258)]=this[_0x36f1cc(0x8a5)](),VisuMZ[_0x36f1cc(0x7c7)][_0x36f1cc(0x5f6)][_0x36f1cc(0x8ee)](this,_0x4082c5);if(this[_0x36f1cc(0x258)]===_0x36f1cc(0xf1))_0x36f1cc(0x89b)===_0x36f1cc(0x6b9)?_0x16d580[_0x36f1cc(0x7c7)][_0x36f1cc(0x9e2)][_0x36f1cc(0x8ee)](this):this[_0x36f1cc(0x17a)](0x0);else{if(_0x36f1cc(0x249)!==_0x36f1cc(0x23a))Input[_0x36f1cc(0x7db)](),this['deselect']();else{if(_0x49c53e[_0x36f1cc(0x2ee)]())return;_0x152936[_0x36f1cc(0x162)](_0x2a1a1c,_0x2e3cca);const _0x151911=[_0x36f1cc(0x40d),_0x36f1cc(0x3c6),_0x36f1cc(0x64b),_0x36f1cc(0x7de),_0x36f1cc(0x9ad),_0x36f1cc(0x737),'parallaxes',_0x36f1cc(0x5fc),_0x36f1cc(0x14a),_0x36f1cc(0x5de),_0x36f1cc(0x7a1),'tilesets',_0x36f1cc(0x5e6),_0x36f1cc(0x7d5)];for(const _0x56f80c of _0x151911){const _0x371f90=_0x4aee22[_0x56f80c],_0x168449=_0x36f1cc(0x743)[_0x36f1cc(0x9c3)](_0x56f80c);for(const _0x5b29f2 of _0x371f90){_0x2f5e23['loadBitmap'](_0x168449,_0x5b29f2);}}}}},Window_NameInput[_0x4396be(0x56f)][_0x4396be(0x8a5)]=function(){const _0x19dfe2=_0x4396be;if(Input[_0x19dfe2(0x450)]())return _0x19dfe2(0xf1);return VisuMZ[_0x19dfe2(0x7c7)][_0x19dfe2(0x624)][_0x19dfe2(0x4bc)][_0x19dfe2(0x652)]||_0x19dfe2(0x9eb);},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x412)]=Window_NameInput[_0x4396be(0x56f)]['processHandling'],Window_NameInput[_0x4396be(0x56f)][_0x4396be(0x5d9)]=function(){const _0x98f717=_0x4396be;if(!this[_0x98f717(0x487)]())return;if(!this[_0x98f717(0x417)])return;if(this[_0x98f717(0x258)]===_0x98f717(0x9eb)&&Input[_0x98f717(0x6f9)]())_0x98f717(0x164)===_0x98f717(0x164)?this['switchModes'](_0x98f717(0xf1)):_0x1998d7[_0x98f717(0x7c7)][_0x98f717(0x46f)]['call'](this,_0x54d46f);else{if(Input[_0x98f717(0x1a2)]('backspace'))Input[_0x98f717(0x7db)](),this[_0x98f717(0x701)]();else{if(Input['isTriggered'](_0x98f717(0x823)))Input['clear'](),this[_0x98f717(0x258)]==='keyboard'?this[_0x98f717(0x761)](_0x98f717(0xf1)):this[_0x98f717(0x761)]('keyboard');else{if(this['_mode']===_0x98f717(0x9eb))_0x98f717(0x4ba)!=='AccPJ'?_0xff2ea3+=_0x98f717(0x173):this[_0x98f717(0x912)]();else{if(Input[_0x98f717(0x1a2)](_0x98f717(0x312))){if(_0x98f717(0x7b2)===_0x98f717(0x7b2))Input['clear'](),this[_0x98f717(0x761)](_0x98f717(0x9eb));else return this[_0x98f717(0x9c8)]&&this[_0x98f717(0x9c8)][_0x98f717(0x558)]===_0x526542;}else{if(_0x98f717(0xf2)!==_0x98f717(0x210))VisuMZ[_0x98f717(0x7c7)][_0x98f717(0x412)]['call'](this);else return;}}}}}},VisuMZ['CoreEngine'][_0x4396be(0x9e2)]=Window_NameInput[_0x4396be(0x56f)][_0x4396be(0x8ea)],Window_NameInput[_0x4396be(0x56f)][_0x4396be(0x8ea)]=function(){const _0xa35e5f=_0x4396be;if(!this[_0xa35e5f(0x3b5)]())return;if(this[_0xa35e5f(0x258)]==='keyboard'){if(TouchInput['isTriggered']()&&this[_0xa35e5f(0x3dc)]())_0xa35e5f(0x729)!==_0xa35e5f(0x729)?(_0x516056[_0xa35e5f(0x15c)]=_0x177140,_0x20ff73['pos']=_0x304f32[_0xa35e5f(0x2a8)][_0xa35e5f(0x86e)](),_0x2915c4[_0xa35e5f(0x8a9)](_0x412764),_0x231330['playBgm'](_0xcb9ccb,_0xf3cf51[_0xa35e5f(0x883)]),_0x7353fe[_0xa35e5f(0x2a8)][_0xa35e5f(0x183)](_0x1b7805[_0xa35e5f(0x883)])):this[_0xa35e5f(0x761)](_0xa35e5f(0xf1));else TouchInput[_0xa35e5f(0x85a)]()&&(_0xa35e5f(0x5ce)===_0xa35e5f(0x836)?this['_forcedBattleSys']=_0xa35e5f(0x1f1):this[_0xa35e5f(0x761)]('default'));}else VisuMZ['CoreEngine'][_0xa35e5f(0x9e2)][_0xa35e5f(0x8ee)](this);},Window_NameInput[_0x4396be(0x56f)][_0x4396be(0x912)]=function(){const _0x92bf2c=_0x4396be;if(Input[_0x92bf2c(0x1a2)](_0x92bf2c(0x1f5))){if(_0x92bf2c(0x13c)!=='PMpqC')Input[_0x92bf2c(0x7db)](),this[_0x92bf2c(0x9db)]();else{const _0x54629e=_0x1a7ca9[_0x92bf2c(0x21d)]/this[_0x92bf2c(0x722)]();_0x54629e%0x1!==0x0&&_0x402d51['ceil'](_0x54629e)===this[_0x92bf2c(0x21d)]()&&!this[_0x92bf2c(0x29b)]()&&(this[_0x92bf2c(0x763)][_0x92bf2c(0x7a9)]=!![],this['_centerCameraCheck']['displayY']=_0x1fbdf4[_0x92bf2c(0x4c6)]||0x0);}}else{if(Input['_inputString']!==undefined){if(_0x92bf2c(0xd8)===_0x92bf2c(0xd8)){let _0x2764a4=Input[_0x92bf2c(0x807)],_0x5c314c=_0x2764a4[_0x92bf2c(0x858)];for(let _0x4a1209=0x0;_0x4a1209<_0x5c314c;++_0x4a1209){if(this[_0x92bf2c(0x830)][_0x92bf2c(0xee)](_0x2764a4[_0x4a1209])){if('YAlrB'!=='YAlrB'){if(!this[_0x92bf2c(0x6a8)])return![];return _0x4b063d[_0x92bf2c(0x7c7)][_0x92bf2c(0x624)][_0x92bf2c(0x4bc)][_0x92bf2c(0x8ba)];}else SoundManager[_0x92bf2c(0x6c7)]();}else{if('UDEdf'===_0x92bf2c(0x19d))SoundManager[_0x92bf2c(0x8e6)]();else{const _0x10a585=_0xc713c4['boxWidth'],_0x1e5162=_0x511e1d[_0x92bf2c(0x56f)][_0x92bf2c(0x694)](),_0x5ca686=0x0;let _0x11913a=0x0;return this[_0x92bf2c(0x9e4)]()===_0x92bf2c(0x55e)?_0x11913a=0x0:_0x11913a=_0x1227ab[_0x92bf2c(0x511)]-_0x1e5162,new _0x58ef5e(_0x5ca686,_0x11913a,_0x10a585,_0x1e5162);}}}Input['clear']();}else{if(_0x3f9bfb)_0x47eaec[_0x92bf2c(0x7b8)](_0x8a18da);}}}},Window_NameInput[_0x4396be(0x56f)][_0x4396be(0x761)]=function(_0x1d1bb4){const _0x40ed83=_0x4396be;let _0x2caac4=this[_0x40ed83(0x258)];this[_0x40ed83(0x258)]=_0x1d1bb4;if(_0x2caac4!==this[_0x40ed83(0x258)]){if('KmpPn'===_0x40ed83(0x4dc))this['_forcedTroopView']='FV';else{this[_0x40ed83(0x813)](),SoundManager[_0x40ed83(0x6c7)]();if(this[_0x40ed83(0x258)]===_0x40ed83(0xf1)){if(_0x40ed83(0x7a7)==='OyOBE')this[_0x40ed83(0x17a)](0x0);else return _0x40ed83(0x91f);}else this['select'](-0x1);}}},VisuMZ[_0x4396be(0x7c7)]['Window_NameInput_cursorDown']=Window_NameInput[_0x4396be(0x56f)][_0x4396be(0x15e)],Window_NameInput['prototype'][_0x4396be(0x15e)]=function(_0x26a38b){const _0x1bcbc6=_0x4396be;if(this[_0x1bcbc6(0x258)]===_0x1bcbc6(0x9eb)&&!Input['isArrowPressed']())return;if(Input[_0x1bcbc6(0x5b1)]())return;VisuMZ[_0x1bcbc6(0x7c7)]['Window_NameInput_cursorDown'][_0x1bcbc6(0x8ee)](this,_0x26a38b),this['switchModes'](_0x1bcbc6(0xf1));},VisuMZ['CoreEngine'][_0x4396be(0x36d)]=Window_NameInput['prototype'][_0x4396be(0x4f2)],Window_NameInput[_0x4396be(0x56f)][_0x4396be(0x4f2)]=function(_0x24df1e){const _0x23c56e=_0x4396be;if(this[_0x23c56e(0x258)]===_0x23c56e(0x9eb)&&!Input[_0x23c56e(0x4e5)]())return;if(Input[_0x23c56e(0x5b1)]())return;VisuMZ[_0x23c56e(0x7c7)][_0x23c56e(0x36d)][_0x23c56e(0x8ee)](this,_0x24df1e),this[_0x23c56e(0x761)](_0x23c56e(0xf1));},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x4f1)]=Window_NameInput[_0x4396be(0x56f)][_0x4396be(0x860)],Window_NameInput[_0x4396be(0x56f)][_0x4396be(0x860)]=function(_0x35573e){const _0x4bb368=_0x4396be;if(this[_0x4bb368(0x258)]==='keyboard'&&!Input['isArrowPressed']())return;if(Input[_0x4bb368(0x5b1)]())return;VisuMZ[_0x4bb368(0x7c7)][_0x4bb368(0x4f1)][_0x4bb368(0x8ee)](this,_0x35573e),this[_0x4bb368(0x761)](_0x4bb368(0xf1));},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x64c)]=Window_NameInput[_0x4396be(0x56f)][_0x4396be(0x2f1)],Window_NameInput['prototype'][_0x4396be(0x2f1)]=function(_0x3155dd){const _0x5cc27e=_0x4396be;if(this[_0x5cc27e(0x258)]===_0x5cc27e(0x9eb)&&!Input[_0x5cc27e(0x4e5)]())return;if(Input['isNumpadPressed']())return;VisuMZ['CoreEngine']['Window_NameInput_cursorLeft'][_0x5cc27e(0x8ee)](this,_0x3155dd),this[_0x5cc27e(0x761)](_0x5cc27e(0xf1));},VisuMZ[_0x4396be(0x7c7)]['Window_NameInput_cursorPagedown']=Window_NameInput[_0x4396be(0x56f)][_0x4396be(0x808)],Window_NameInput[_0x4396be(0x56f)][_0x4396be(0x808)]=function(){const _0x3a2129=_0x4396be;if(this['_mode']===_0x3a2129(0x9eb))return;if(Input[_0x3a2129(0x5b1)]())return;VisuMZ[_0x3a2129(0x7c7)]['Window_NameInput_cursorPagedown'][_0x3a2129(0x8ee)](this),this[_0x3a2129(0x761)](_0x3a2129(0xf1));},VisuMZ['CoreEngine'][_0x4396be(0x428)]=Window_NameInput[_0x4396be(0x56f)][_0x4396be(0x7e9)],Window_NameInput['prototype'][_0x4396be(0x7e9)]=function(){const _0x103a91=_0x4396be;if(this[_0x103a91(0x258)]==='keyboard')return;if(Input[_0x103a91(0x5b1)]())return;VisuMZ[_0x103a91(0x7c7)][_0x103a91(0x428)]['call'](this),this['switchModes'](_0x103a91(0xf1));},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0xc9)]=Window_NameInput[_0x4396be(0x56f)][_0x4396be(0x813)],Window_NameInput[_0x4396be(0x56f)]['refresh']=function(){const _0x39a2f2=_0x4396be;if(this['_mode']==='keyboard'){if('VCXSO'!==_0x39a2f2(0x7ff))this[_0x39a2f2(0x457)][_0x39a2f2(0x2dd)](_0x58c361['layoutSettings']['StatusBgType']);else{this[_0x39a2f2(0x275)]['clear'](),this[_0x39a2f2(0x8da)]['clear'](),this[_0x39a2f2(0x2d1)]();let _0x5bd39d=VisuMZ[_0x39a2f2(0x7c7)][_0x39a2f2(0x624)][_0x39a2f2(0x4bc)]['NameInputMessage']['split']('\x0a'),_0x43f77e=_0x5bd39d['length'],_0x44f688=(this[_0x39a2f2(0x666)]-_0x43f77e*this[_0x39a2f2(0x694)]())/0x2;for(let _0x2fcbf9=0x0;_0x2fcbf9<_0x43f77e;++_0x2fcbf9){let _0x3de6bb=_0x5bd39d[_0x2fcbf9],_0x1243de=this[_0x39a2f2(0x6e5)](_0x3de6bb)[_0x39a2f2(0x67f)],_0x5850e0=Math['floor']((this[_0x39a2f2(0x275)][_0x39a2f2(0x67f)]-_0x1243de)/0x2);this[_0x39a2f2(0x47e)](_0x3de6bb,_0x5850e0,_0x44f688),_0x44f688+=this[_0x39a2f2(0x694)]();}}}else{if(_0x39a2f2(0x3e6)===_0x39a2f2(0x3e6))VisuMZ[_0x39a2f2(0x7c7)]['Window_NameInput_refresh']['call'](this);else return this[_0x39a2f2(0x88a)];}};};VisuMZ['CoreEngine'][_0x4396be(0x3fa)]=Window_ShopSell['prototype']['isEnabled'],Window_ShopSell[_0x4396be(0x56f)][_0x4396be(0x28b)]=function(_0x54b477){const _0x283310=_0x4396be;if(VisuMZ[_0x283310(0x7c7)][_0x283310(0x624)][_0x283310(0x9e8)]['KeyItemProtect']&&DataManager[_0x283310(0x301)](_0x54b477))return _0x283310(0x1e9)!==_0x283310(0x599)?![]:_0x339c9b['CoreEngine'][_0x283310(0x7d0)][_0x283310(0x8ee)](this,_0x3bb918);else{if(_0x283310(0x119)!=='CyKNk')this[_0x283310(0x375)]['x']=_0x643cfd[_0x283310(0x986)]+0x4,this['isBottomButtonMode']()?this[_0x283310(0x375)]['y']=_0x3078a2[_0x283310(0x511)]-this['buttonAreaHeight']():this[_0x283310(0x375)]['y']=0x0;else return VisuMZ['CoreEngine'][_0x283310(0x3fa)][_0x283310(0x8ee)](this,_0x54b477);}},Window_NumberInput[_0x4396be(0x56f)][_0x4396be(0x518)]=function(){return![];};VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x624)][_0x4396be(0x4bc)][_0x4396be(0x6f1)]&&(VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x195)]=Window_NumberInput['prototype']['start'],Window_NumberInput[_0x4396be(0x56f)][_0x4396be(0x851)]=function(){const _0x85e8a2=_0x4396be;VisuMZ['CoreEngine'][_0x85e8a2(0x195)][_0x85e8a2(0x8ee)](this),this[_0x85e8a2(0x17a)](this[_0x85e8a2(0x472)]-0x1),Input[_0x85e8a2(0x7db)]();},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x6f2)]=Window_NumberInput[_0x4396be(0x56f)]['processDigitChange'],Window_NumberInput[_0x4396be(0x56f)]['processDigitChange']=function(){const _0x24e778=_0x4396be;if(!this[_0x24e778(0x3b5)]())return;if(Input[_0x24e778(0x5b1)]()){if(_0x24e778(0x289)!==_0x24e778(0x289)){var _0x4ab2db=_0x1c3b65-2.625/2.75;return 7.5625*_0x4ab2db*_0x4ab2db+0.984375;}else this[_0x24e778(0x345)]();}else{if(Input[_0x24e778(0x1a2)](_0x24e778(0x26f))){if(_0x24e778(0x2ce)!==_0x24e778(0x2ce)){if(!this[_0x24e778(0x1df)])return![];const _0x36e534=this[_0x24e778(0x1df)][_0x24e778(0x862)]||'';if(_0x36e534[_0x24e778(0x8e4)](/<MIRROR OFFSET X>/i))return!![];if(_0x36e534[_0x24e778(0x8e4)](/<NO MIRROR OFFSET X>/i))return![];return _0x453f04[_0x24e778(0x7c7)][_0x24e778(0x624)]['QoL'][_0x24e778(0x340)];}else this[_0x24e778(0x2ef)]();}else{if(Input[_0x24e778(0x782)]===0x2e){if(_0x24e778(0x9af)===_0x24e778(0x9af))this[_0x24e778(0x73a)]();else return _0x4780b6['layoutSettings'][_0x24e778(0x973)][_0x24e778(0x8ee)](this);}else{if(Input[_0x24e778(0x782)]===0x24)this[_0x24e778(0x7ed)]();else Input[_0x24e778(0x782)]===0x23?this[_0x24e778(0x322)]():VisuMZ[_0x24e778(0x7c7)][_0x24e778(0x6f2)][_0x24e778(0x8ee)](this);}}}},Window_NumberInput[_0x4396be(0x56f)][_0x4396be(0x296)]=function(){const _0x1ac4d0=_0x4396be;if(!this[_0x1ac4d0(0x111)]())return;if(Input[_0x1ac4d0(0x5b1)]())this[_0x1ac4d0(0x345)]();else{if('NhSyJ'===_0x1ac4d0(0x6a7))return _0x41c192['CoreEngine']['CustomParamIcons'][_0x6117c7]||0x0;else Window_Selectable['prototype'][_0x1ac4d0(0x296)][_0x1ac4d0(0x8ee)](this);}},Window_NumberInput[_0x4396be(0x56f)][_0x4396be(0x338)]=function(){},Window_NumberInput[_0x4396be(0x56f)][_0x4396be(0x345)]=function(){const _0x23921a=_0x4396be;if(String(this[_0x23921a(0x797)])[_0x23921a(0x858)]>=this[_0x23921a(0x472)])return;const _0x20f1b3=Number(String(this[_0x23921a(0x797)])+Input['_inputString']);if(isNaN(_0x20f1b3))return;this[_0x23921a(0x797)]=_0x20f1b3;const _0x16c5a3='9'[_0x23921a(0x642)](this[_0x23921a(0x472)]);this['_number']=this[_0x23921a(0x797)][_0x23921a(0x5d5)](0x0,_0x16c5a3),Input[_0x23921a(0x7db)](),this[_0x23921a(0x813)](),SoundManager['playCursor'](),this['select'](this[_0x23921a(0x472)]-0x1);},Window_NumberInput[_0x4396be(0x56f)]['processKeyboardBackspace']=function(){const _0x308bdd=_0x4396be;this[_0x308bdd(0x797)]=Number(String(this[_0x308bdd(0x797)])['slice'](0x0,-0x1)),this[_0x308bdd(0x797)]=Math[_0x308bdd(0x8cd)](0x0,this[_0x308bdd(0x797)]),Input['clear'](),this[_0x308bdd(0x813)](),SoundManager['playCursor'](),this['select'](this[_0x308bdd(0x472)]-0x1);},Window_NumberInput[_0x4396be(0x56f)]['processKeyboardDelete']=function(){const _0x9431b6=_0x4396be;this[_0x9431b6(0x797)]=Number(String(this[_0x9431b6(0x797)])[_0x9431b6(0x4aa)](0x1)),this['_number']=Math[_0x9431b6(0x8cd)](0x0,this[_0x9431b6(0x797)]),Input[_0x9431b6(0x7db)](),this[_0x9431b6(0x813)](),SoundManager[_0x9431b6(0x4f7)](),this[_0x9431b6(0x17a)](this[_0x9431b6(0x472)]-0x1);},Window_NumberInput[_0x4396be(0x56f)]['processKeyboardHome']=function(){const _0x5f4318=_0x4396be;if(this[_0x5f4318(0x6fc)]()===0x0)return;Input[_0x5f4318(0x7db)](),this[_0x5f4318(0x813)](),SoundManager['playCursor'](),this[_0x5f4318(0x17a)](0x0);},Window_NumberInput[_0x4396be(0x56f)][_0x4396be(0x322)]=function(){const _0x185781=_0x4396be;if(this[_0x185781(0x6fc)]()===this['_maxDigits']-0x1)return;Input[_0x185781(0x7db)](),this[_0x185781(0x813)](),SoundManager[_0x185781(0x4f7)](),this[_0x185781(0x17a)](this[_0x185781(0x472)]-0x1);});function _0x43c9(_0x4959d6,_0x2d7a2b){const _0x2ff277=_0x2ff2();return _0x43c9=function(_0x43c9ad,_0x20eb97){_0x43c9ad=_0x43c9ad-0xad;let _0x2e6f30=_0x2ff277[_0x43c9ad];return _0x2e6f30;},_0x43c9(_0x4959d6,_0x2d7a2b);}function _0x2ff2(){const _0x58a805=['createPointAnimationTargets','paramRate1','contentsBack','TqXdf','NxFip','CustomParamAbb','changeClass','F19','startAnimation','onload','valueOutlineColor','seVolume','match','DocumentTitleFmt','playBuzzer','targetPosition','drawGameSubtitle','smoothSelect','processTouch','Window_EquipItem_isEnabled','_setupEventHandlers','YtKhO','call','DataManager_setupNewGame','_active','makeTargetSprites','MDF','VGawm','sfKAa','fzLRa','eventsXyNt','Scene_Options_create','initVisuMZCoreEngine','tileWidth','zJPVk','subjectHitRate','OS_KEY','_origin','createDimmerSprite','_movementWholeDuration','showFauxAnimations','UVzWB','ProfileBgType','Game_Picture_scaleX','rVjbM','updateCurrentEvent','option','IedNP','command111','hYpzj','<%1\x20%2:[\x20]','Graphics_defaultStretchMode','QWPTE','TCR','_numberWindow','mSqmB','toString','QLtPR','processKeyboardHandling','_smooth','Input_pollGamepads','text','_backSprite','BhIsx','_stored_expGaugeColor1','NUMPAD2','Game_System_initialize','INSERT','PDR','Knegj','_stored_ctGaugeColor1','OTB','buttonAssistCancel','cAZFH','Control\x20Variables\x20Script\x20Error','changeTextColor','Scene_Base_create','Window_Base_createContents','catchNormalError','_moveEasingType','GetParamIcon','itemHit','_targetScaleX','ParamChange','lGHdE','Sprite_Button_updateOpacity','CallHandlerJS','bsCpf','Bitmap_fillRect','BACK_QUOTE','nkvsP','mirror','NUMPAD3','BuyBgType','ParseSkillNotetags','process_VisuMZ_CoreEngine_Notetags','jsQuickFunc','oNCLp','_fauxAnimationSprites','isMVAnimation','_stored_pendingColor','Bitmap_measureTextWidth','MAXHP','qxthG','sxToZ','processFauxAnimationRequests','TwHmx','drawIcon','PqVEX','ijDum','Export\x20Troop\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','wtypeId','Game_Interpreter_command355','_slotWindow','hYwoI','spsHA','TMUhv','ImprovedAccuracySystem','EndingID','IconSParam8','PictureID','kWpqC','Rvhme','_stored_tpGaugeColor1','OUTBOUNCE','suvjJ','_shakePower','updateText','Spriteset_Base_update','blockWidth','createMenuButton','makeEncounterCount','loadPicture','MIN_SAFE_INTEGER','PERIOD','tpColor','F16','kvrXM','mev','profileWindowRect','setWindowPadding','ExportString','WIN_OEM_ENLW','ctrlKey','updateMain','_storedStack','PAUSE','〘Show\x20Text〙\x0a','Game_BattlerBase_initMembers','SHIFT','playBgs','_saveFileID','BgType','filters','META','ListRect','pgmNI','_phase','battlerHue','Scene_Unlisted','SideView','slotWindowRect','mmp','Bitmap_strokeRect','tqPmV','TextCodeNicknames','MdZgn','_actor','makeFontSmaller','getCoreEngineScreenShakeStyle','onClick','endAnimation','setFrame','YiuQj','boxWidth','IconParam6','OUTQUART','rdTch','mainAreaHeight','RTqem','Max','DOLLAR','Enable','xSMbe','_bitmap','IconXParam5','MAT','SkillTypeBgType','keyMapper','updateOnceParallelInterpreters','ESC','_coreEngineShakeStyle','ExtDisplayedParams','qMPzU','AdjustAngle','startShake','shXfb','IconIndex','dimColor1','OPEN_BRACKET','createPointAnimation','paramRate','StatusEquipRect','BACK_SLASH','arePageButtonsEnabled','initialLevel','_drawTextOutline','scale','ctrl','ASTERISK','addLoadListener','_index','Opacity','enemies','DisplayLockX','xevav','FunctionName','gOLyl','pan','_mp','terminate','Title','gameTitle','powerUpColor','BarOffset','CNT','bgs','process_VisuMZ_CoreEngine_jsQuickFunctions','showPicture','vrHIh','gaugeLineHeight','storeMapData','goldWindowRect','ExportAllMapText','currentValue','format','SmartEventCollisionPriority','WIN_OEM_JUMP','requestFauxAnimation','makeDocumentTitle','_scene','touchUI','SellRect','xCler','resize','_commandList','Scene_Base_terminateAnimationClearBugFix','%1〘Choice\x20%2〙\x20%3%1','11dPIoBs','qIYxy','playTestShiftR','_lastY','rfICN','successRate','DetachMapPictureContainer','left','xparam','zFEWY','isHandled','onNameOk','drawCurrentParam','_timerSprite','OUTCUBIC','updateAnchor','Scene_MenuBase_mainAreaHeight','jQoWS','Window_NameInput_processTouch','playMiss','getButtonAssistLocation','ARRAYJSON','darwin','JlRNX','QoL','Script\x20Call\x20Error','ForceNoPlayTest','keyboard','canUse','ParseAllNotetags','XHPUh','QZZqJ','DbAYk','_targetOffsetY','textAlign','RIGHT','evaluate','inbounce','enabled','SellBgType','usableSkills','LrRPd','VisuMZ_1_OptionsCore','GNcyd','Vqszy','bRZOW','COMMA','WZqxj','Plus','YXZZe','fillStyle','Type','expGaugeColor1','setCoreEngineScreenShakeStyle','Game_Map_setup','_stored_maxLvGaugeColor2','_windowLayer','_displayY','_commonEventLayers','InputRect','FcgZw','platform','Param','overallHeight','lEUtV','_width','ColorMPGauge2','Input_updateGamepadState','MenuLayout','join','XParamVocab9','SwitchRandomizeOne','process_VisuMZ_CoreEngine_RegExp','cAdeM','SwitchRandomizeRange','loadBitmap','%1\x0a','DOUBLE_QUOTE','avrrL','round','BgFilename1','horizontal','uiAreaHeight','removeChild','and\x20add\x20it\x20onto\x20this\x20one.','isPlaying','moveCancelButtonSideButtonLayout','runCombinedScrollingTextAsCode','_buyWindow','_height','process_VisuMZ_CoreEngine_CustomParameters','LESS_THAN','Conditional\x20Branch\x20Script\x20Error','SceneManager_exit','GoldOverlap','Window_NameInput_refresh','Scene_Battle_createSpritesetFix','OptionsMenu','Window_TitleCommand_selectLast','ogvYj','iywYt','ParseStateNotetags','EditRect','toFixed','toLowerCase','NUMPAD6','goto','F17','CorrectSkinBleeding','onEscapeSuccess','itImK','_makeFontNameText','IconSParam2','BoxMargin','ewFDE','bgm','catchException','members','children','JAViO','XParamVocab4','IconParam1','subject','charCode','createWindowLayer','Sprite_Gauge_gaugeRate','mpwXU','rlCKm','wMPtq','AllTroops','itypeId','setColorTone','add','updateScrollBarPosition','_muteSound','default','HsbRI','Game_Action_numRepeats','BannedWords','traitObjects','updateDashToggle','IconXParam3','OffBarOpacity','processTouchModernControls','MainMenu','framesMin','offset','TitlePicButtons','AMPERSAND','loadTitle1','CategoryRect','useDigitGroupingEx','kmeyu','BaslX','sMgcx','uGaPy','_fauxAnimationQueue','IconSParam6','flush','isEnemy','isGamepadAxisMoved','isActor','fGFym','SELECT','maxLvGaugeColor2','_dummyWindow','getControllerInputButtonString','isCursorMovable','_allTextHeight','parameters','$dataMap','Duration','Troop%1','Renderer','fillAll','CyKNk','SParamVocab1','DflMu','command105','meVolume','sparamRateJS','sqrt','EMdLB','reserveCommonEvent','GoldIcon','overrideMimeType','getCustomBackgroundSettings','Scene_Map_initialize','ETB','oItHV','GoldRect','pop','buttonAssistText4','_shakeDuration','NUMPAD1','Scene_Status_create','subtitle','applyEasingAnglePlus','ztxLI','VisuMZ_1_BattleCore','OkXLd','FKUeZ','CLOSE_BRACKET','TGR','integer','STRUCT','rgba(0,\x200,\x200,\x200.7)','_lastScrollBarValues','ctGaugeColor2','dashToggle','vOgHT','NCYdr','createTitleButtons','nlVwq','LUK','clearZoom','writeText','updateShadow','actorWindowRect','SceneManager_isGameActive','contentsOpacity','VRuip','Game_Party_consumeItem','ScreenResolution','sv_actors','updateAnglePlus','mXFLw','Game_Picture_calcEasing','translucentOpacity','_clickHandler','Ypdyb','_registerKeyInput','easingType','Plus2','_battleField','mpGaugeColor1','setupRate','Bitmap_initialize','clearForcedGameTroopSettingsCoreEngine','WIN_OEM_FINISH','olHIQ','scrollbar','volume','createSpriteset','cursorDown','apply','ShowScrollBar','wholeDuration','ConvertParams','setActorHomeRepositioned','chdzM','_cache','markCoreEngineModified','onInputOk','filterArea','centerCameraCheckData','EVA','processAlwaysEscape','createTextPopupWindow','pointY','strokeRect','RPGMAKER_VERSION','BlurFilter','updateScene','Scene_Battle_createSpriteset','([\x5c+\x5c-]\x5cd+)>','_scrollDuration','OptionsRect','XParamVocab1','isPressed','_playtestF7Looping','Graphics_printError','select','Window_Base_drawCharacter','pixelated','processSoundTimings','worldTransform','mpGaugeColor2','%1〘Choice\x20Cancel〙%1','SkillMenu','IconParam0','_startPlaying','onerror','applyEasing','textBaseline','PositionY','scrollDown','isGameActive','setDisplayPos','Window_Gold_refresh','gbzsH','updateScrollBarVisibility','uReZa','_image','ShiftR_Toggle','Color','createTroopNote','\x5c}❪SHIFT❫\x5c{','HZCyb','Window_NumberInput_start','_url','Flat','WjExC','isDying','oCFDy','BattleManager_update','addChild','UDEdf','_startDecrypting','Sprite_destroy','ctGaugeColor1','playTestShiftT','isSpecialCode','SaveMenu','_troopId','statusWindowRect','AEhkD','Center','updatePictureCoordinates','determineSideButtonLayoutValid','NumberRect','_buttonAssistWindow','Spriteset_Base_destroy','_centerElementCoreEngine','attackSkillId','CUnuz','PGUP','MCR','VIpPS','Game_Picture_show','padding','Scene_Map_createSpriteset_detach','DKyoW','ColorMPCost','3988182yCRJZa','createAnimationSprite','Scene_Shop_create','iIbNG','_hideButtons','originalJS','setAction','IconParam3','SystemLoadImages','CLEAR','iconHeight','_pictureCoordinatesWindow','visible','code','bAgme','catchUnknownError','DefaultStyle','pagedown','setMute','missed','xScrollLinkedOffset','_pauseSignSprite','Sprite_AnimationMV_updatePosition','openURL','HTkEW','FSLjy','CustomParamType','GoldFontSize','_stored_tpCostColor','createScrollBarSprites','isAnimationForEach','fillText','Smooth','Game_Actor_levelUp','VFdSd','TextStr','setLastGamepadUsed','render','baseTextRect','_animation','VisuMZ_2_BattleSystemPTB','enable','wADpU','isBottomButtonMode','windowRect','_displayX','Game_Action_itemEva','Window_Base_initialize','F10','VdyAO','createPointAnimationSprite','bYqkQ','_lastPluginCommandInterpreter','nw.gui','addEventListener','Scene_Boot_loadSystemImages','setSideButtonLayout','STB','1.3.0','isClosing','_subject','enter','VisuMZ_2_BattleSystemCTB','keyRepeatWait','ItemBgType','_encounterCount','Game_Picture_move','Key%1','item','GoldChange','keyCode','textColor','isSideView','Finish','NxBVf','ExportStrFromAllMaps','TextFmt','requiredWtypeId1','MINUS','create','displayName','home','ParamName','commandWindowRect','activate','prepareNextScene','anchor','ExtractStrFromMap','GJXDV','setAnglePlusData','_stored_expGaugeColor2','mapId','initCoreEngineScreenShake','CtrlQuickLoad','LevelUpFullMp','OUTSINE','isPointAnimationPlaying','15433910VtsdOd','Spriteset_Base_isAnimationPlaying','LoadMenu','isMapScrollLinked','height','RRNJS','dummyWindowRect','wMSRA','Mute','Window','Speed','operand','ARRAYSTRUCT','isInstanceOfSceneMap','F7key','viewport','JOXjI','_cacheScaleX','PositionJS','ynYCC','dTGUM','down','indexOf','JGNZE','Flat1','updateFauxAnimations','scrollRight','Game_Interpreter_PluginCommand','ugidt','DigitGroupingExText','HelpRect','HTYLy','endAction','qFBZI','_windowskin','TAB','updateMotion','SParamVocab9','(\x5cd+)>','_action','PERCENT','getKeyboardInputButtonString','WPTxL','open','FQhlF','RequireFocus','HsAae','skillTypes','KgTNg','TextJS','〘Scrolling\x20Text〙\x0a','send','isRightInputMode','expGaugeColor2','backgroundBitmap','addChildToBack','valueOutlineWidth','Y:\x20%1','UpdatePictureCoordinates','Input_shouldPreventDefault','_isWindow','cSMto','focus','_mode','Game_Map_scrollUp','DATABASE','_statusParamsWindow','buttonAssistOffset%1','SPACE','move','setLastPluginCommandInterpreter','outlineColorDmg','Window_StatusBase_drawActorLevel','gbxkU','setupFont','Saved\x20file\x20as\x20%1\x20in\x20project\x20folder.','OpenURL','maxGold','horz','Sprite_Battler_startMove','KfAka','WUifx','pictureId','LOdiW','Scene_Name_create','MEV','backspace','applyCoreEasing','calcCoreEasing','X:\x20%1','isSideButtonLayout','_target','contents','EMiey','TimeProgress','Game_Interpreter_command111','background','NUM','BTestWeapons','Game_Picture_angle','_pagedownButton','_lastX','ParseItemNotetags','setActorHome','Armor-%1-%2','_createInternalTextures','eva','isPhysical','getLastGamepadUsed','AnHAF','SwitchActorText','text%1','ygLxt','ItemRect','isEnabled','EVAL','opacity','buttonAreaHeight','Utkvz','ColorExpGauge1','setAttack','Game_Map_scrollLeft','_downArrowSprite','DxtYs','Sprite_Button_initialize','processCursorMove','updateEffekseer','Scene_Map_createSpritesetFix','isMaskingEnabled','setupButtonImage','isLoopVertical','SubfolderParse','F14','tqsvH','animationBaseDelay','setValue','QwertyLayout','45encaeW','buttonAssistOffset3','HANJA','CommandBgType','Window_Base_drawFace','SnapshotOpacity','_bgmBuffer','createDigits','categoryWindowRect','isFullDocumentTitle','filter','lastAnimationSprite','EnableJS','smooth','Spriteset_Battle_createEnemies','KeyTAB','_originalViewport','updatePadding','loadIconBitmap','Game_Event_start','createChildSprite','current','muyqw','_effectsContainer','Game_Character_processMoveCommand','damageColor','getColorDataFromPluginParameters','paramPlus','EXR','\x20Origin:\x20%1','DisplayedParams','FEaoY','mTAAZ','WIN_OEM_CUSEL','Enemy-%1-%2','processCursorMoveModernControls','KeySHIFT','EdmfE','none','LVgAu','ConvertNumberToString','MAXMP','ExtractStrFromTroop','animationId','wHbnw','_pageupButton','_data','resetTextColor','paramPlusJS','PA1','WScWh','qNeUW','TextCodeClassNames','kOSlM','levelUp','StatusEquipBgType','helpAreaTop','_stored_hpGaugeColor2','crisisColor','setBackgroundType','_spriteset','Scene_Menu_create','aogFS','adjustPictureAntiZoom','isNextScene','hfQAX','PositionX','down2','bitmap','tilesets','xPFMK','Map%1.json','ColorManager_loadWindowskin','JUNJA','waiting','nickname','inBattle','processKeyboardBackspace','playTestF7','cursorLeft','_digitGrouping','isExpGaugeDrawn','pRTkB','Unnamed','EWfhd','currentLevelExp','_digitGroupingEx','PictureEasingType','xparamRateJS','outlineColorGauge','([\x5c+\x5c-]\x5cd+)([%％])>','StatusParamsBgType','〘Common\x20Event\x20%1:\x20%2〙\x20End','gaugeBackColor','RepositionEnemies','isKeyItem','ItemHeight','menu','_stored_systemColor','_changingClass','ymuUv','reduce','initCoreEngine','ScaleY','loading','quit','ValueJS','ZERO','_textPopupWindow','ONE_MINUS_SRC_ALPHA','getGamepads','AVTwZ','escape','Window_MapName_refresh','_scrollBarVert','Weapon-%1-%2','UlJgy','parallaxes','ButtonFadeSpeed','ColSpacing','initRotationCoreEngine','IconSParam3','enableDigitGrouping','randomInt','DebugConsoleLastControllerID','Window_Base_update','drawItem','IconXParam8','processKeyboardEnd','Game_Map_scrollDown','maxScrollbar','Window_Selectable_cursorDown','Window_Selectable_drawBackgroundRect','setTopRow','applyForcedGameTroopSettingsCoreEngine','ykMOd','framesPerChar','sparam','centerSprite','resetFontSettings','ExportStrFromAllTroops','buttonAssistKey%1','changeAnglePlusData','iLqZL','TPB\x20ACTIVE','FwjNJ','ColorCTGauge2','onMoveEnd','checkSubstitute','setupScrollBarBitmap','processCursorHomeEndTrigger','WIN_OEM_RESET','ActorBgType','ColorSystem','statusParamsWindowRect','Graphics','pow','mpCostColor','AnimationMirrorOffset','sparamPlus1','etypeId','axes','process_VisuMZ_CoreEngine_Functions','processKeyboardDigitChange','floor','QvbRa','updateMove','_onKeyDown','PictureShowIcon','drawAllParams','Sprite_Picture_updateOrigin','xjEQM','updatePositionCoreEngineShakeOriginal','WIN_OEM_BACKTAB','CommandRect','_stored_tpGaugeColor2','isItem','dUbbw','cos','useFontWidthFix','turn','setupNewGame','scrollY','EREOF','ECPTq','Scene_Name_onInputOk','%1/','PGDN','getInputButtonString','fontSize','DashToggleR','%1〘End\x20Choice\x20Selection〙%1','\x0a\x0a\x0a\x0a\x0a','EQUAL','Page','jRzVH','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','bBkkJ','ADD','_pollGamepads','RLuqz','object','TaVHj','Window_NameInput_cursorUp','style','isBottomHelpMode','GroupDigits','ActorHPColor','movePageButtonSideButtonLayout','CrisisRate','onKeyDown','_cancelButton','LAEwr','yScrollLinkedOffset','gainItem','GoldMax','Game_Picture_initBasic','drawGameTitle','385987rkMkRN','IconParam4','INBOUNCE','hIHHH','EncounterRateMinimum','_refreshPauseSign','traitsPi','destroyScrollBarBitmaps','updateData','ActorMPColor','drawBackgroundRect','BTB','lhuxw','〘Common\x20Event\x20%1:\x20%2〙\x20Start','hit','updatePictureAntiZoom','measureText','SCALE_MODES','Scene_Boot_updateDocumentTitle','scrollLeft','NKdvx','StatusBgType','_stored_ctGaugeColor2','DimColor2','VisuMZ_2_BattleSystemSTB','HzfIH','Jnvuk','mute','buttonAssistText5','pendingColor','dFeWt','selectLast','RegExp','PbNfm','createJsQuickFunction','_addShadow','KeyUnlisted','OtAqN','BTestAddedQuantity','scaleX','createCustomBackgroundImages','Enemy','_forcedTroopView','rBFHX','Subtitle','CustomParamNames','mainAreaHeightSideButtonLayout','PWFiu','amKOn','paramValueByName','CategoryBgType','itemEva','split','SceneManager_initialize','GRD','createFauxAnimationQueue','button','isOpenAndActive','isSceneBattle','initDigitGrouping','HelpBgType','remove','guardSkillId','setEnemyAction','setEvent','OPEN_CURLY_BRACKET','VIEWPORT','isScrollBarVisible','wvXRb','isTriggered','ExtJS','Game_Picture_y','SUdAf','_context','battlebacks1','HELP','Spriteset_Base_initialize','setup','rdpYe','random','battleSystem','PictureEraseRange','outlineColor','deflate','PDOxb','hideButtonFromView','_lastCommandSymbol','params','createPageButtons','KJwfh','UNVZU','_optionsWindow','CIsxf','initBasic','itemBackColor2','hkWqd','isTouchedInsideFrame','sxizO','CRJLh','reGWb','OJGeD','reservePlayTestNewGameCommonEvent','SystemSetWindowPadding','resetBattleSystem','scaleMode','refreshActor','Metpm','isFauxAnimationPlaying','WIN_OEM_FJ_MASSHOU','destroyed','WIN_OEM_PA1','paramMax','XmwnQ','MaxDuration','5PrIDNT','wCOkb','axEpg','_movementDuration','Scene_MenuBase_createCancelButton','command355','uvypF','setTargetAnchor','stencilFunc','bknko','encounterStep','ColorMPGauge1','Window_ShopSell_isEnabled','Bitmap_gradientFillRect','FTB','CreateBattleSystemID','AudioChangeBgsPitch','Rate','clearStencil','paramBase','_list','createBackground','_stored_hpGaugeColor1','CLOSE_PAREN','paramFlat','fadeSpeed','autoRemovalTiming','INQUART','isLoopHorizontal','loadWindowskin','IconSet','animations','IupWM','xparamRate2','toLocaleString','itemRect','Window_NameInput_processHandling','calcEasing','drawGameVersion','context','JRYLB','active','updateCoreEasing','Scene_Title_drawGameTitle','checkCacheKey','playOnceParallelInterpreter','endBattlerActions','_targetX','129yOEBYr','mOKGM','StatusMenu','ceil','reserveNewGameCommonEvent','setupCoreEngine','Eqwms','VisuMZ_4_UniqueTileEffects','gradientFillRect','mDiEy','Window_NameInput_cursorPageup','ShiftT_Toggle','CommandList','center','createCancelButton','updateScrollBars','_anglePlus','KEEP','paramchangeTextColor','removeFauxAnimation','INQUAD','ColorTPGauge1','evaded','mpColor','Keyboard','replace','Scene_Base_createWindowLayer','nah','_upArrowSprite','Export\x20Map\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','_targetAnchor','exportAllTroopStrings','position','Hktmj','_closing','addOnceParallelInterpreter','NOeGm','CustomParamIcons','Plus1','INELASTIC','areButtonsHidden','Game_Troop_setup','isMenuButtonAssistEnabled','renderNoMask','OUTELASTIC','_hovered','updateBgsParameters','helpAreaHeight','《《《\x20Event\x20%1:\x20%2,\x20Page\x20%3\x20》》》\x0a%4\x0a','Qbgvd','isGamepadConnected','removeAllPointAnimations','maxHorz','LINEAR','setupBattleTestItems','processEscape','YFDGD','_statusWindow','CEV','textWidth','lYHrp','deactivate','bSZZC','INOUTBACK','BarThickness','charAt','numberShowButton','DETACH_PICTURE_CONTAINER','version','setHandler','xparamFlat2','QUOTE','vertical','HRG','EXSEL','COLON','Origin','_currentBgs','paramY','_pointAnimationQueue','_destroyInternalTextures','Sprite_Actor_setActorHome','exportAllMapStrings','obCKE','_maxDigits','dimColor2','buttonAssistSwitch','CAPSLOCK','paintOpacity','isForFriend','BottomButtons','concat','connected','pressed','Game_Map_scrollRight','maxCols','drawTextEx','F23','initialize','ARRAYNUM','checkPassage','XParamVocab0','offColor','_internalTextures','_listWindow','isOpen','REPLACE','createCustomParameter','gdmIF','#%1','onButtonImageLoad','wTenV','AudioChangeBgmPitch','IconSParam0','SParamVocab6','StartID','gkOsb','Power','itemWindowRect','ONE','Version','addWindow','FatKE','BaseTexture','checkScrollBarBitmap','updateSmoothScroll','BTestItems','sparamFlatBonus','_backgroundFilter','IconXParam0','itemLineRect','SParamVocab4','Game_Picture_initRotation','iLaVq','Game_Event_isCollidedWithEvents','_actorWindow','maxLvGaugeColor1','Sprite_Picture_loadBitmap','Scene_Map_shouldAutosave','DigitGroupingDamageSprites','substring','loadSystem','rhLud','consumeItem','currentExp','paramX','_goldWindow','ColorTPCost','jYxVZ','writeFile','WIN_ICO_00','actor','itemPadding','displayX','kLRaq','ControllerButtons','AccPJ','setupCustomRateCoreEngine','KeyboardInput','gaugeRate','SNPbo','_CoreEngineSettings','sparamPlusJS','Bitmap_blt','gXOKE','PRESERVCONVERSION(%1)','process_VisuMZ_CoreEngine_ControllerButtons','Scene_Base_terminate','DisplayLockY','smallParamFontSize','Scene_Battle_createCancelButton','globalAlpha','Game_Actor_paramBase','_forcedBattleGridSystem','XZZpy','_stored_powerUpColor','DrawIcons','addCommand','Game_BattlerBase_refresh','playLoad','Padding','Input_setupEventHandlers','setBackgroundOpacity','_battlerName','SParamVocab2','Input_clear','createFauxAnimationSprite','Window_Selectable_cursorUp','CancelText','blendFunc','pPpYY','makeActionList','pointX','CommandWidth','updatePositionCoreEngineShakeVert','QpwqB','Sprite_AnimationMV_processTimingData','drawActorSimpleStatus','list','isArrowPressed','Scene_Battle_createSpriteset_detach','WCdHZ','iCsNu','updateRotation','0.00','levelUpRecovery','YnRQr','Window_Base_destroyContents','NewGameBoot','PZeBt','VariableJsBlock','Window_NameInput_cursorRight','cursorUp','rsXBK','StatusParamsRect','command357','clearCachedKeys','playCursor','anglePlus','original','FINAL','RwsfK','WIN_OEM_AUTO','makeCommandList','OpenSpeed','AnimationID','GEuHu','drawParamText','XParamVocab7','VisuMZ_2_BattleSystemBTB','openness','wNlCa','pehWW','_defaultStretchMode','ColorCTGauge1','WIN_OEM_PA3','randomJS','mhp','xparamPlus','_forcedBattleSys','showDevTools','STENCIL_BUFFER_BIT','WYNiO','boxHeight','checkCoreEngineDisplayCenter','Scene_MenuBase_createPageButtons','bgmVolume','CRSEL','ItemMenu','ndCAM','isUseModernControls','measureTextWidthNoRounding','BarBodyColor','RevertPreserveNumbers','Upper\x20Left','REC','URL','SEMICOLON','CTB','stencilOp','updateDuration','updatePosition','Wait','Game_Picture_x','hBPTS','EnableMasking','FontSize','SCROLL_LOCK','_hideTileShadows','maxScrollX','AntiZoomPictures','BattleManager_checkSubstitute','Game_Picture_updateMove','_refreshArrows','EquipMenu','note','setMoveEasingType','createContents','deselect','gdsHp','setBattleSystem','startMove','removeAnimationFromContainer','ItemBackColor2','_coreEasing','VisuMZ_2_BattleSystemFTB','NUMPAD5','createCommandWindow','ColorGaugeBack','paramWidth','pySLk','xparamPlus1','bxiLU','DOZQg','_pictureCoordinatesMode','ProfileRect','_centerElement','showPointAnimations','ENTER','menuShowButton','%2%1%3','application/json','snapForBackground','DgYQN','refreshWithTextCodeSupport','VariableEvalReference','LJlsz','playtestQuickLoad','hasEncryptedImages','fromCharCode','WIojl','processTimingData','canAttack','isAnimationPlaying','constructor','VPlzl','mainAreaTop','CooCm','ltcOt','EQUALS','top','thickness','MblWS','QDNbe','isBusy','_onLoad','》Comment《\x0a%1\x0a','aovLh','vertJS','TextPopupShow','FontSmoothing','toUpperCase','Graphics_centerElement','VisuMZ_2_BattleSystemETB','updateLastTarget','GoMdc','Abbreviation','prototype','FDR','isMagical','_updateFilterArea','openingSpeed','F15','description','Symbol','fbNmj','Game_Action_itemHit','drawSegment','ColorHPGauge2','checkSmartEventCollision','<JS\x20%1\x20%2:[\x20](.*)>','getInputMultiButtonStrings','buttonAssistOk','_realScale','titleCommandWindow','Game_Interpreter_command122','800156GOXfvE','_profileWindow','tilesetFlags','_margin','src','loadGameImagesCoreEngine','_bgsBuffer','playBgm','Tilemap_addShadow','min','NUMPAD8','save','INOUTCIRC','updateOrigin','getControllerInputButtonMatch','F22','isNwjs','ParseEnemyNotetags','yMrlC','right','SuaIr','bYNLQ','updatePositionCoreEngineShakeHorz','JofJz','onXhrError','maxItems','XParameterFormula','ScaleX','WIN_OEM_WSCTRL','Scene_Skill_create','_offsetY','child_process','playEscape','onKeyDownKeysF6F7','close','\x5c}❪TAB❫\x5c{','BackOpacity','_skillTypeWindow','FadeSpeed','moveMenuButtonSideButtonLayout','XParamVocab6','wait','aEDfg','Layer','ApplyEasing','SParamVocab8','CONVERT','isNumpadPressed','ModernControls','dmOix','contains','alSBF','DigitGroupingStandardText','IconSParam4','MLEAx','playCursorSound','Click\x20\x22Copy\x20Page\x22\x20from\x20another\x20tileset\x27s\x20pages','_startLoading','Game_Screen_initialize','MenuBg','drawCircle','CodyA','initButtonHidden','pages','mAEZa','DRIvU','30172QLcUdw','createTextState','PLUS','HIT','asin','buttonAssistKey1','_dimmerSprite','paramBaseAboveLevel99','duration','RYaMD','WvzaH','TwUuy','NameInputMessage','numActions','return\x200','Pudkt','fgeuC','clamp','OGpIJ','DELETE','yTtVC','processHandling','stretch','exp','TRG','updateClose','sv_enemies','%1%2','QLNEf','QOpVc','useDigitGrouping','HgZga','INOUTSINE','Bitmap_drawCircle','titles1','DXTaa','editWindowRect','xkypz','xparamRate','onActorChange','nQeaW','CodeJS','WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function','erasePicture','updateTransform','glIDR','adjustBoxSize','_backSprite1','createPointAnimationQueue','isInputting','Window_NameInput_initialize','allowShiftScrolling','BattleManager_processEscape','_cacheScaleY','FUNC','Window_StatusBase_drawActorSimpleStatus','pictures','SParamVocab3','IconParam7','scrollbarHeight','WIN_OEM_PA2','Bitmap_drawTextOutline','MMJte','Scene_Title','cancel','isRepeated','mainAreaTopSideButtonLayout','_stored_maxLvGaugeColor1','Scene_Map_updateMain','VmNrW','targetX','itemSuccessRate','shouldAutosave','findSymbol','sellWindowRect','oJNYd','StatusRect','helpWindowRect','startNormalGame','mgpHm','voMfT','title','STENCIL_TEST','OnLoadJS','PreserveNumbers','Mirror','targetBackOpacity','Window_Base_drawText','Sprite_Gauge_currentValue','value','SlotBgType','auuUc','JSON','kVSNP','en-US','XParamVocab8','Settings','abs','qZqes','_drawTextShadow','_stored_deathColor','isAnimationOffsetXMirrored','NewGameCommonEventAll','KeyItemProtect','checkPlayerLocation','padZero','NameMenu','updateMainMultiply','eSisS','targets','Scene_Equip_create','currencyUnit','ExtractStrFromList','SceneManager_onKeyDown','requestPointAnimation','fXVJQ','itemBackColor1','_onKeyPress','buttonAssistWindowButtonRect','repositionCancelButtonSideButtonLayout','RepositionEnemies130','([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>','buttonAssistOffset4','App','maxVert','Flat2','repeat','ipHyz','parseForcedGameTroopSettingsCoreEngine','createEnemies','setSize','juJiX','bgsVolume','WIN_OEM_COPY','commandWindowRows','battlebacks2','Window_NameInput_cursorLeft','updateKeyText','forceOutOfPlaytest','ARRAYSTR','createButtonAssistWindow','LEFT','DefaultMode','izKvO','pitch','isEventTest','offsetX','font','VOLUME_DOWN','stop','SystemSetSideView','onInputBannedWords','key%1','_rate','IconSParam9','_screenX','wPeDd','ImgLoad','isClosed','_opening','QXxIv','Bitmap_resize','innerHeight','ybPIE','RUUpV','clipboard','win32','dropItems','retrieveFauxAnimation','PixelateImageRendering','GZONg','_clientArea','Scene_Boot_startNormalGame','scaleSprite','GSgCv','setCoreEngineUpdateWindowBg','events','wUNPY','isItemStyle','alphabetic','_scrollBarHorz','_onceParallelInterpreters','Game_Interpreter_command105','maxLevel','TRAIT_PARAM','IconSParam1','CommonEventID','width','drawGauge','Input_onKeyDown','PictureRotate','IconXParam9','ParseTilesetNotetags','_pictureName','initMembersCoreEngine','URJEN','isNormalPriority','string','makeFontBigger','update','end','WIN_ICO_CLEAR','MDR','UFYWA','Location','DmLRP','loadTitle2','consumable','lineHeight','ItemPadding','NBcBt','_playTestFastMode','OOQLF','hpColor','_itemWindow','RightMenus','LineHeight','Exported_Script_%1.txt','clearRect','CLOSE_CURLY_BRACKET','\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','ParamArrow','VisuMZ_3_EventChainReact','WIN_OEM_CLEAR','ColorHPGauge1','_paramPlus','Game_Map_setDisplayPos','fxrbj','_inputWindow','SCROLLBAR','_pressed','_mirror','【%1】\x0a','drawIconBySize','_repositioned','XParamVocab5','bcnvM','egxBE','showIncompleteTilesetError','_shouldPreventDefault','optionsWindowRect','Chance','processPointAnimationRequests','createKeyJS','responseText','UDHvN','_destroyCanvas','setCommonEvent','dzbtA','MwCoL','xxnyR','rgba(0,\x200,\x200,\x201.0)','blfbA','drawActorExpGauge','DIVIDE','WIN_OEM_FJ_ROYA','_previousClass','buttonAssistKey4','GREATER_THAN','playOk','buttonAssistKey3','ZBNBq','DummyBgType','SLEEP','picture','log','SlotRect','OffBarColor','Game_Picture_updateRotation','hpGaugeColor1','_refreshBack','redraw','destroy','WGvDx','_name','Window_Selectable_processCursorMove','mainAreaBottom','toUBA','retreat','JNpmf','tpGaugeColor2','_duration','DamageColor','SwitchToggleOne','yJfRy','_screenY','rDslO','_colorCache','paramRate2','textSizeEx','makeInputButtonString','adkHt','drawRightArrow','EJzsf','_showDevTools','mXOaP','moveRelativeToResolutionChange','AllMaps','image-rendering','normal','XpvqD','EnableNumberInput','Window_NumberInput_processDigitChange','BKSP','NoTileShadows','updatePositionCoreEngineShakeRand','CJlPI','Game_Action_setAttack','_currentBgm','isGamepadTriggered','targetContentsOpacity','Scene_Map_update','index','ALTGR','INOUTCUBIC','stypeId','WASD','processBack','_stored_mpCostColor','PTB','skillId','removeAllFauxAnimations','AutoStretch','sparamFlat2','parse','createBuffer','jqTIz','initRotation','cXkis','pictureButtons','VCrCc','listWindowRect','animationNextDelay','OpenConsole','isAlive','makeDeepCopy','SplitEscape','_stored_normalColor','learnings','_buttonType','refreshScrollBarBitmap','_animationSprites','stringKeyMap','GCCyF','faceWidth','transform','aWumA','ThSjz','IRtvM','LATIN1','tileHeight','innerWidth','zoomScale','_sideButtonLayout','ZarIe','END','startAutoNewGame','kxRfN','maxScrollY','wjEAd','aCRau','paramFlatBonus','pageup','removeOnceParallelInterpreter','_mainSprite','setupValueFont','prepare','iIEzy','ParseArmorNotetags','TpxPw','SCFvk','faces','AudioChangeBgmPan','encounterStepsMinimum','processKeyboardDelete','TranslucentOpacity','recoverAll','HQewU','QYCpA','_currentMap','Gold','systemColor','setViewportCoreEngineFix','img/%1/','ParseClassNotetags','isEventRunning','_helpWindow','setHome','ALWAYS','IconSParam7','sparamRate','ActorRect','BACKSPACE','updateDocumentTitle','areTileShadowsHidden','repositionEnemiesByResolution','iconWidth','xparamFlat1','Skill-%1-%2','MvAnimationRate','playCancel','aehrN','TitleCommandList','exit','buttonAssistWindowRect','buttonAssistOffset5','playTestF6','ATK','retrievePointAnimation','advanced','MRG','F20','expRate','switchModes','shift','_centerCameraCheck','font-smooth','_scaleX','LsZoL','DigitGroupingGaugeSprites','PSRTw','INSINE','jlAZL','Game_Picture_scaleY','_gamepadWait','gaugeHeight','scrollX','animationShouldMirror','Game_Interpreter_updateWaitMode','terms','SideButtons','maxBattleMembers','map','ButtonAssist','getCombinedScrollingText','drawActorLevel','PHA','SystemLoadAudio','DDUbX','SParamVocab0','param','makeCoreEngineCommandList','setupCoreEasing','PRINT','Sprite_Animation_setViewport','AGI','_inputSpecialKeyCode','PictureFilename','destroyContents','evade','_text','buttonAssistWindowSideRect','IconXParam2','currentClass','_targets','Class-%1-%2','xxyrg','setActionState','mainCommandWidth','XCeXd','_timeDuration','makeAutoBattleActions','INEXPO','sin','textHeight','OutlineColorGauge','buyWindowRect','_number','Rate1','OPEN_PAREN','result','PcPHg','level','SParameterFormula','targetEvaRate','ControllerMatches','LevelUpFullHp','system','xparamFlatJS','registerCommand','buttonAssistKey2','getLastPluginCommandInterpreter','_stored_mpGaugeColor2','OyOBE','_backgroundSprite','centerY','setSkill','okuPW','IconParam5','itemHitImprovedAccuracy','TMsRw','_tempActor','measureTextWidth','clearOnceParallelInterpreters','lQAVO','Spriteset_Base_updatePosition','Current\x20tileset\x20has\x20incomplete\x20flag\x20data.','getBackgroundOpacity','ycBKB','blt','ParseActorNotetags','_backSprite2','Icon','NEAREST','setEasingType','IEfvY','MqWcg','Scene_Load','ShowDevTools','show','targetY','Window_refreshBack','aDcDz','updatePointAnimations','canEquip','CoreEngine','isOptionValid','Scene_Map_createMenuButton','Once\x20Parallel\x20for\x20Battle\x20requires\x20VisuMZ_1_BattleCore!','helpAreaTopSideButtonLayout','doesNameContainBannedWords','zBZRA','1075768RnnitI','gsRcP','TextManager_param','shake','targetOpacity','MRF','backOpacity','titles2','exec','DurationPerChat','_sellWindow','bind','fillRect','clear','EscapeAlways','Pixelated','characters','targetScaleY','MinDuration','buttons','removePointAnimation','_baseTexture','centerX','nCzwH','_stored_powerDownColor','TILDE','adjustSprite','cursorPageup','outbounce','NONCONVERT','AccuracyBoost','processKeyboardHome','isSceneMap','jMzTg','scaleY','Window_Selectable_processTouch','_lastGamepad','WindowLayer_render','getBattleSystem','getLastUsedGamepadType','ListBgType','updateOpacity','kcyWH','NgPtw','ShowActorLevel','getPointAnimationLayer','SParamVocab5','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','_logWindow','VCXSO','initialBattleSystem','cancelShowButton','_statusEquipWindow','INCUBIC','Scene_TitleTransition','addAnimationSpriteToContainer','itemHeight','_inputString','cursorPagedown','xkIjL','areButtonsOutsideMainUI','performMiss','BgFilename2','isSmartEventCollisionOn','_shakeSpeed','KxHZI','framesMax','buttonAssistText%1','Match','refresh','gainGold','batch','destroyCoreEngineMarkedBitmaps','WIN_ICO_HELP','updatePictureSettings','dDLAR','printError','uiAreaWidth','catchLoadError','updatePositionCoreEngine','mnBTN','_storedMapText','RepositionActors','Window_Scrollable_update','GoldBgType','tab','RIheQ','_pictureContainer','ItemStyle','MAX_GL_TEXTURES','Total','targetScaleX','initMembers','ZUtGJ','bVhRh','ULpOK','Actor','CustomParam','_editWindow','Window_Base_drawIcon','restore','_targetScaleY','drawFace','kedmR','TGEZH','INBACK','IconXParam1','F21','XParamVocab2','VisuMZ_2_BattleSystemOTB','layoutSettings','MAX_SAFE_INTEGER','OUTCIRC','ScreenShake','HOME','ShowJS','keypress','GfFfT','Scene_MenuBase_helpAreaTop','_categoryWindow','windowOpacity','drawTextTopAligned','DXRuj','alpha','GameEnd','Linear','_hp','buttonAssistText1','_commandWindow','imageSmoothingEnabled','Window_Selectable_itemRect','start','ParseWeaponNotetags','horzJS','piPJh','%1:\x20Exit\x20','displayY','nextLevelExp','length','setSideView','isCancelled','loadMapData','targetObjects','Scene_Map_updateScene','CONTEXT_MENU','maxVisibleItems','cursorRight','savefileInfo','name','isPlaytest','buttonAssistText3','drawText','Untitled','QUESTION_MARK','Scene_Map_createSpriteset','CRI','OUTBACK','_lastOrigin','scrollUp','number','seek','isGamepadButtonPressed','ENTER_SPECIAL','IffLb','Bitmap_drawText','createFauxAnimation','target','Scene_SingleLoadTransition','Window_Base_createTextState','INOUTQUINT','cbole','dPFNG','_pointAnimationSprites','Scene_Boot_onDatabaseLoaded','origin','xparamPlus2','jiKjF','DEF','uKiQL','_mapNameWindow','Show\x20Scrolling\x20Text\x20Script\x20Error','pos','〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','99482xygqNq','bitmapWidth','drawGoldItemStyle','setAnchor','buttonAssistKey5','_anchor','DummyRect','ShowItemBackground','KAEyC','BattleSystem','DLHJu','EasKy','executeLoad','IzlDx','Scene_MenuBase_mainAreaTop','loadSystemImages','drawValue','PageChange','includes','isWindowMaskingEnabled','process_VisuMZ_CoreEngine_Settings','_viewportSize','oAIim','refreshDimmerBitmap','Game_Temp_initialize','defineProperty','1.4.4','_coreEasingType','KANA','DetachBattlePictureContainer','Game_Action_updateLastTarget','command122','defaultInputMode','_updateGamepadState','MultiKeyFmt','setMainFontSize','updateBgmParameters','mainFontSize','push','gainSilentTp','ShopMenu','buttonAssistOffset1','drawCharacter','trim','NUM_LOCK','PihGZ','SkillTypeRect','altKey','IIedm','ZOOM','NUMPAD7','kDeRd','updatePlayTestF7','EnableNameInput','PLAY','_textQueue','_animationQueue','CBZTK','SystemSetFontSize','Game_Actor_changeClass','operation','_targetOpacity','sceneTerminationClearEffects','getParameter','ACCEPT','〖〖〖\x20Map\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','updateWaitMode','pNhyy','NUMPAD9','TargetAngle','needsUpdate','OkText','max','Sprite_Animation_processSoundTimings','_isButtonHidden','SystemSetBattleSystem','RSdJG','_offsetX','aftZV','_stored_gaugeBackColor','ONPIa','onlyfilename','bitmapHeight'];_0x2ff2=function(){return _0x58a805;};return _0x2ff2();};VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x313)]=Window_MapName['prototype'][_0x4396be(0x813)],Window_MapName['prototype']['refresh']=function(){const _0x5da65d=_0x4396be;if(VisuMZ[_0x5da65d(0x7c7)][_0x5da65d(0x624)][_0x5da65d(0x9e8)]['MapNameTextCode']){if(_0x5da65d(0x26a)===_0x5da65d(0x554))return _0x37fd8e[_0x5da65d(0x35e)](_0x5da65d(0x823));else this['refreshWithTextCodeSupport']();}else _0x5da65d(0x6bd)==='aiMHK'?(_0x425481['_x']=_0x3e81f8['_x'],_0x40e458['_y']=_0x470d60['_y']):VisuMZ['CoreEngine'][_0x5da65d(0x313)][_0x5da65d(0x8ee)](this);},Window_MapName[_0x4396be(0x56f)][_0x4396be(0x54e)]=function(){const _0x5f33aa=_0x4396be;this[_0x5f33aa(0x275)]['clear']();if($gameMap[_0x5f33aa(0x208)]()){const _0xae0363=this['innerWidth'];this['drawBackground'](0x0,0x0,_0xae0363,this[_0x5f33aa(0x694)]());const _0x129778=this[_0x5f33aa(0x6e5)]($gameMap['displayName']())[_0x5f33aa(0x67f)];this['drawTextEx']($gameMap['displayName'](),Math[_0x5f33aa(0x346)]((_0xae0363-_0x129778)/0x2),0x0);}},Window_TitleCommand[_0x4396be(0x9cd)]=VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x624)][_0x4396be(0x756)],Window_TitleCommand[_0x4396be(0x56f)][_0x4396be(0x4fd)]=function(){const _0x2c1588=_0x4396be;this[_0x2c1588(0x77d)]();},Window_TitleCommand[_0x4396be(0x56f)]['makeCoreEngineCommandList']=function(){const _0x14228d=_0x4396be;for(const _0x4ec1dd of Window_TitleCommand['_commandList']){if(_0x4ec1dd[_0x14228d(0x841)][_0x14228d(0x8ee)](this)){if(_0x14228d(0x133)===_0x14228d(0x105))return _0x3cbf82[_0x14228d(0x7c7)][_0x14228d(0x624)][_0x14228d(0x9e8)][_0x14228d(0x767)];else{const _0x56e8f2=_0x4ec1dd[_0x14228d(0x576)];let _0x4fd19f=_0x4ec1dd[_0x14228d(0x1db)];if(['',_0x14228d(0x866)][_0x14228d(0x897)](_0x4fd19f))_0x4fd19f=_0x4ec1dd['TextJS'][_0x14228d(0x8ee)](this);const _0x193110=_0x4ec1dd['EnableJS'][_0x14228d(0x8ee)](this),_0x1a64bb=_0x4ec1dd[_0x14228d(0x3c2)][_0x14228d(0x8ee)](this);this[_0x14228d(0x4cf)](_0x4fd19f,_0x56e8f2,_0x193110,_0x1a64bb),this[_0x14228d(0x463)](_0x56e8f2,_0x4ec1dd[_0x14228d(0x92e)][_0x14228d(0x7d9)](this,_0x1a64bb));}}}},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0xcc)]=Window_TitleCommand['prototype'][_0x4396be(0x39b)],Window_TitleCommand[_0x4396be(0x56f)][_0x4396be(0x39b)]=function(){const _0x1df9a4=_0x4396be;VisuMZ[_0x1df9a4(0x7c7)][_0x1df9a4(0xcc)][_0x1df9a4(0x8ee)](this);if(!Window_TitleCommand[_0x1df9a4(0x3d2)])return;const _0xa32640=this[_0x1df9a4(0x60d)](Window_TitleCommand[_0x1df9a4(0x3d2)]),_0x34cb11=Math[_0x1df9a4(0x346)](this[_0x1df9a4(0x85f)]()/0x2)-0x1;this[_0x1df9a4(0x8e9)](_0xa32640),this[_0x1df9a4(0x174)]>0x1&&(this[_0x1df9a4(0x174)]=0x1,this[_0x1df9a4(0x49b)]()),this[_0x1df9a4(0x327)](_0xa32640-_0x34cb11);},Window_GameEnd[_0x4396be(0x9cd)]=VisuMZ['CoreEngine'][_0x4396be(0x624)][_0x4396be(0xae)][_0x4396be(0x84a)][_0x4396be(0x42a)],Window_GameEnd[_0x4396be(0x56f)]['makeCommandList']=function(){const _0x5afa04=_0x4396be;this[_0x5afa04(0x77d)]();},Window_GameEnd[_0x4396be(0x56f)][_0x4396be(0x77d)]=function(){const _0x21a19c=_0x4396be;for(const _0x525a85 of Window_GameEnd[_0x21a19c(0x9cd)]){if(_0x21a19c(0x6e9)!==_0x21a19c(0x8b2)){if(_0x525a85[_0x21a19c(0x841)][_0x21a19c(0x8ee)](this)){if(_0x21a19c(0x132)===_0x21a19c(0x18e))_0x1566af[_0x21a19c(0x7c7)][_0x21a19c(0x1fa)][_0x21a19c(0x8ee)](this,_0x12140f,_0x4b2b34,_0x46b94c,_0x49e2be,_0x293501,_0x2e302f,_0x7a1606,_0x178e70,_0x3177f3),this[_0x21a19c(0x3f5)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x93559]||{'x':0x0,'y':0x0});else{const _0x4233f5=_0x525a85['Symbol'];let _0x142878=_0x525a85[_0x21a19c(0x1db)];if(['','Untitled'][_0x21a19c(0x897)](_0x142878))_0x142878=_0x525a85[_0x21a19c(0x24a)]['call'](this);const _0x39ccfa=_0x525a85['EnableJS'][_0x21a19c(0x8ee)](this),_0x502aac=_0x525a85[_0x21a19c(0x3c2)][_0x21a19c(0x8ee)](this);this[_0x21a19c(0x4cf)](_0x142878,_0x4233f5,_0x39ccfa,_0x502aac),this['setHandler'](_0x4233f5,_0x525a85[_0x21a19c(0x92e)]['bind'](this,_0x502aac));}}}else _0x3410d['CoreEngine'][_0x21a19c(0x5bc)][_0x21a19c(0x8ee)](this),this['initCoreEngineScreenShake']();}};function Window_ButtonAssist(){this['initialize'](...arguments);}Window_ButtonAssist['prototype']=Object[_0x4396be(0x207)](Window_Base['prototype']),Window_ButtonAssist[_0x4396be(0x56f)]['constructor']=Window_ButtonAssist,Window_ButtonAssist[_0x4396be(0x56f)][_0x4396be(0x480)]=function(_0x5f1648){const _0x7fd718=_0x4396be;this['_data']={},Window_Base[_0x7fd718(0x56f)][_0x7fd718(0x480)][_0x7fd718(0x8ee)](this,_0x5f1648),this[_0x7fd718(0x2dd)](VisuMZ['CoreEngine'][_0x7fd718(0x624)][_0x7fd718(0x775)]['BgType']||0x0),this[_0x7fd718(0x813)]();},Window_ButtonAssist[_0x4396be(0x56f)][_0x4396be(0x68a)]=function(){const _0x597303=_0x4396be;this[_0x597303(0x275)]['fontSize']<=0x60&&(this[_0x597303(0x275)][_0x597303(0x35f)]+=0x6);},Window_ButtonAssist['prototype'][_0x4396be(0x980)]=function(){const _0x13fc8c=_0x4396be;if(this[_0x13fc8c(0x275)][_0x13fc8c(0x35f)]>=0x18){if(_0x13fc8c(0x9fb)===_0x13fc8c(0x8d1))return this[_0x13fc8c(0xc1)](_0x5849c6);else this[_0x13fc8c(0x275)][_0x13fc8c(0x35f)]-=0x6;}},Window_ButtonAssist[_0x4396be(0x56f)]['update']=function(){const _0x2076c5=_0x4396be;Window_Base['prototype'][_0x2076c5(0x68b)][_0x2076c5(0x8ee)](this),this[_0x2076c5(0x64d)]();},Window_ButtonAssist[_0x4396be(0x56f)]['updatePadding']=function(){const _0x306ea8=_0x4396be;this['padding']=SceneManager['_scene'][_0x306ea8(0x9e4)]()!==_0x306ea8(0x3b4)?0x0:0x8;},Window_ButtonAssist['prototype'][_0x4396be(0x64d)]=function(){const _0x29276c=_0x4396be,_0x52c27a=SceneManager[_0x29276c(0x9c8)];for(let _0x404839=0x1;_0x404839<=0x5;_0x404839++){if(this[_0x29276c(0x2d0)]['key%1'[_0x29276c(0x9c3)](_0x404839)]!==_0x52c27a[_0x29276c(0x32f)[_0x29276c(0x9c3)](_0x404839)]())return this['refresh']();if(this[_0x29276c(0x2d0)]['text%1'[_0x29276c(0x9c3)](_0x404839)]!==_0x52c27a[_0x29276c(0x811)['format'](_0x404839)]())return this['refresh']();}},Window_ButtonAssist[_0x4396be(0x56f)][_0x4396be(0x813)]=function(){const _0x271cad=_0x4396be;this[_0x271cad(0x275)][_0x271cad(0x7db)]();for(let _0x5a1759=0x1;_0x5a1759<=0x5;_0x5a1759++){if('eSisS'===_0x271cad(0x630))this[_0x271cad(0x579)](_0x5a1759);else return _0x14a5b2[_0x271cad(0x7c7)][_0x271cad(0x21a)][_0x271cad(0x8ee)](this)||this[_0x271cad(0x218)]();}},Window_ButtonAssist[_0x4396be(0x56f)][_0x4396be(0x579)]=function(_0x4c74db){const _0x5be57d=_0x4396be,_0x111579=this[_0x5be57d(0x723)]/0x5,_0x9513a9=SceneManager[_0x5be57d(0x9c8)],_0x1bdcb9=_0x9513a9[_0x5be57d(0x32f)[_0x5be57d(0x9c3)](_0x4c74db)](),_0x138850=_0x9513a9[_0x5be57d(0x811)[_0x5be57d(0x9c3)](_0x4c74db)]();this['_data'][_0x5be57d(0x65c)[_0x5be57d(0x9c3)](_0x4c74db)]=_0x1bdcb9,this[_0x5be57d(0x2d0)][_0x5be57d(0x288)[_0x5be57d(0x9c3)](_0x4c74db)]=_0x138850;if(_0x1bdcb9==='')return;if(_0x138850==='')return;const _0x6f7185=_0x9513a9[_0x5be57d(0x25c)[_0x5be57d(0x9c3)](_0x4c74db)](),_0x51ae4e=this[_0x5be57d(0x4b6)](),_0x331fbd=_0x111579*(_0x4c74db-0x1)+_0x51ae4e+_0x6f7185,_0x46f4d7=VisuMZ[_0x5be57d(0x7c7)][_0x5be57d(0x624)][_0x5be57d(0x775)][_0x5be57d(0x204)];this[_0x5be57d(0x47e)](_0x46f4d7['format'](_0x1bdcb9,_0x138850),_0x331fbd,0x0,_0x111579-_0x51ae4e*0x2);},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x770)]=Game_Interpreter['prototype'][_0x4396be(0x8c7)],Game_Interpreter[_0x4396be(0x56f)]['updateWaitMode']=function(){const _0x31452a=_0x4396be;if($gameTemp['_pictureCoordinatesMode']!==undefined)return VisuMZ[_0x31452a(0x7c7)][_0x31452a(0x253)]();return VisuMZ[_0x31452a(0x7c7)][_0x31452a(0x770)][_0x31452a(0x8ee)](this);},VisuMZ['CoreEngine'][_0x4396be(0x253)]=function(){const _0x191bc2=_0x4396be,_0x284c97=$gameTemp[_0x191bc2(0x544)]||0x0;(_0x284c97<0x0||_0x284c97>0x64||TouchInput[_0x191bc2(0x85a)]()||Input['isTriggered'](_0x191bc2(0x604)))&&($gameTemp['_pictureCoordinatesMode']=undefined,Input[_0x191bc2(0x7db)](),TouchInput[_0x191bc2(0x7db)]());const _0x378020=$gameScreen['picture'](_0x284c97);if(_0x378020){if(_0x191bc2(0x824)!==_0x191bc2(0x3ac))_0x378020['_x']=TouchInput['_x'],_0x378020['_y']=TouchInput['_y'];else{this[_0x191bc2(0x275)][_0x191bc2(0x7db)](),this[_0x191bc2(0x8da)][_0x191bc2(0x7db)](),this['resetTextColor']();let _0x5177e0=_0x4800f5[_0x191bc2(0x7c7)][_0x191bc2(0x624)][_0x191bc2(0x4bc)][_0x191bc2(0x5d0)][_0x191bc2(0x3b0)]('\x0a'),_0x197dfb=_0x5177e0[_0x191bc2(0x858)],_0x1133ac=(this[_0x191bc2(0x666)]-_0x197dfb*this[_0x191bc2(0x694)]())/0x2;for(let _0x5c6def=0x0;_0x5c6def<_0x197dfb;++_0x5c6def){let _0xf8a987=_0x5177e0[_0x5c6def],_0x348751=this['textSizeEx'](_0xf8a987)['width'],_0x5a211e=_0x3efb6d[_0x191bc2(0x346)]((this[_0x191bc2(0x275)][_0x191bc2(0x67f)]-_0x348751)/0x2);this[_0x191bc2(0x47e)](_0xf8a987,_0x5a211e,_0x1133ac),_0x1133ac+=this[_0x191bc2(0x694)]();}}}return VisuMZ[_0x191bc2(0x7c7)][_0x191bc2(0x1a8)](),$gameTemp[_0x191bc2(0x544)]!==undefined;},VisuMZ['CoreEngine']['updatePictureCoordinates']=function(){const _0x50f1cc=_0x4396be,_0x297cd8=SceneManager[_0x50f1cc(0x9c8)];if(!_0x297cd8)return;if(!_0x297cd8[_0x50f1cc(0x1c3)]){if(_0x50f1cc(0x4ef)===_0x50f1cc(0x613)){const _0x39b4bc=_0x350d78[_0x50f1cc(0x346)]((_0x4bb0bb-0x2)*_0x4da388),_0x1c58e6=_0x348fa4['prototype'][_0x50f1cc(0x76d)][_0x50f1cc(0x8ee)](this),_0x4080e0=_0x69d331+this[_0x50f1cc(0x694)]()-_0x1c58e6-0x2;this[_0x50f1cc(0x275)]['fillRect'](_0x21e2ab,_0x4080e0,_0x50402d,_0x1c58e6,_0x3d3ac8[_0x50f1cc(0x2ff)]()),this[_0x50f1cc(0x275)][_0x50f1cc(0x426)](_0x415043+0x1,_0x4080e0+0x1,_0x39b4bc,_0x1c58e6-0x2,_0x362feb,_0x4828af);}else SoundManager[_0x50f1cc(0x4d1)](),_0x297cd8[_0x50f1cc(0x1c3)]=new Window_PictureCoordinates(),_0x297cd8[_0x50f1cc(0x19c)](_0x297cd8['_pictureCoordinatesWindow']);}$gameTemp['_pictureCoordinatesMode']===undefined&&(SoundManager[_0x50f1cc(0x754)](),_0x297cd8[_0x50f1cc(0xbd)](_0x297cd8['_pictureCoordinatesWindow']),_0x297cd8[_0x50f1cc(0x1c3)]=undefined);};function Window_PictureCoordinates(){const _0x38f594=_0x4396be;this[_0x38f594(0x480)](...arguments);}Window_PictureCoordinates[_0x4396be(0x56f)]=Object[_0x4396be(0x207)](Window_Base[_0x4396be(0x56f)]),Window_PictureCoordinates[_0x4396be(0x56f)][_0x4396be(0x558)]=Window_PictureCoordinates,Window_PictureCoordinates[_0x4396be(0x56f)]['initialize']=function(){const _0x4bf5d0=_0x4396be;this[_0x4bf5d0(0x86b)]=_0x4bf5d0(0x439),this['_lastX']=_0x4bf5d0(0x439),this[_0x4bf5d0(0x9d3)]=_0x4bf5d0(0x439);const _0x1b5cf8=this[_0x4bf5d0(0x1e4)]();Window_Base['prototype'][_0x4bf5d0(0x480)][_0x4bf5d0(0x8ee)](this,_0x1b5cf8),this['setBackgroundType'](0x2);},Window_PictureCoordinates[_0x4396be(0x56f)]['windowRect']=function(){const _0x2c6393=_0x4396be;let _0x3d1ed2=0x0,_0x979fec=Graphics['height']-this['lineHeight'](),_0x558f3d=Graphics[_0x2c6393(0x67f)],_0x3040e1=this[_0x2c6393(0x694)]();return new Rectangle(_0x3d1ed2,_0x979fec,_0x558f3d,_0x3040e1);},Window_PictureCoordinates[_0x4396be(0x56f)][_0x4396be(0x2b3)]=function(){const _0x172482=_0x4396be;this[_0x172482(0x1b4)]=0x0;},Window_PictureCoordinates[_0x4396be(0x56f)][_0x4396be(0x68b)]=function(){const _0x17cdad=_0x4396be;Window_Base['prototype']['update'][_0x17cdad(0x8ee)](this),this[_0x17cdad(0x384)]();},Window_PictureCoordinates[_0x4396be(0x56f)]['updateData']=function(){const _0x5c950d=_0x4396be;if(!this[_0x5c950d(0x8cb)]())return;this[_0x5c950d(0x813)]();},Window_PictureCoordinates[_0x4396be(0x56f)][_0x4396be(0x8cb)]=function(){const _0xee4328=_0x4396be,_0x38320f=$gameTemp[_0xee4328(0x544)],_0x169169=$gameScreen[_0xee4328(0x6cc)](_0x38320f);return _0x169169?_0xee4328(0x78c)!==_0xee4328(0x55b)?this[_0xee4328(0x86b)]!==_0x169169[_0xee4328(0x8fd)]||this[_0xee4328(0x27e)]!==_0x169169['_x']||this[_0xee4328(0x9d3)]!==_0x169169['_y']:0x0:![];},Window_PictureCoordinates[_0x4396be(0x56f)]['refresh']=function(){const _0xc8b3b4=_0x4396be;this[_0xc8b3b4(0x275)]['clear']();const _0x458d95=$gameTemp[_0xc8b3b4(0x544)],_0x5395cf=$gameScreen[_0xc8b3b4(0x6cc)](_0x458d95);if(!_0x5395cf)return;this['_lastOrigin']=_0x5395cf['_origin'],this[_0xc8b3b4(0x27e)]=_0x5395cf['_x'],this[_0xc8b3b4(0x9d3)]=_0x5395cf['_y'];const _0x514dfe=ColorManager[_0xc8b3b4(0x638)]();this[_0xc8b3b4(0x275)][_0xc8b3b4(0x7da)](0x0,0x0,this[_0xc8b3b4(0x723)],this[_0xc8b3b4(0x666)],_0x514dfe);const _0x2797f9='\x20Origin:\x20%1'[_0xc8b3b4(0x9c3)](_0x5395cf['_origin']===0x0?'Upper\x20Left':_0xc8b3b4(0x1a7)),_0x4406dc=_0xc8b3b4(0x272)[_0xc8b3b4(0x9c3)](_0x5395cf['_x']),_0x4281b4=_0xc8b3b4(0x252)[_0xc8b3b4(0x9c3)](_0x5395cf['_y']),_0x50ea59='%1:\x20Exit\x20'[_0xc8b3b4(0x9c3)](TextManager['getInputButtonString']('cancel'));let _0x1e06a5=Math[_0xc8b3b4(0x346)](this['innerWidth']/0x4);this[_0xc8b3b4(0x865)](_0x2797f9,_0x1e06a5*0x0,0x0,_0x1e06a5),this[_0xc8b3b4(0x865)](_0x4406dc,_0x1e06a5*0x1,0x0,_0x1e06a5,_0xc8b3b4(0x42b)),this[_0xc8b3b4(0x865)](_0x4281b4,_0x1e06a5*0x2,0x0,_0x1e06a5,_0xc8b3b4(0x42b));const _0x5c96a1=this[_0xc8b3b4(0x6e5)](_0x50ea59)[_0xc8b3b4(0x67f)],_0x5782a9=this[_0xc8b3b4(0x723)]-_0x5c96a1;this['drawTextEx'](_0x50ea59,_0x5782a9,0x0,_0x5c96a1);};function Window_TextPopup(){const _0x489d72=_0x4396be;this[_0x489d72(0x480)](...arguments);}Window_TextPopup['prototype']=Object[_0x4396be(0x207)](Window_Base[_0x4396be(0x56f)]),Window_TextPopup[_0x4396be(0x56f)][_0x4396be(0x558)]=Window_TextPopup,Window_TextPopup['SETTINGS']={'framesPerChar':VisuMZ[_0x4396be(0x7c7)]['Settings']['Window'][_0x4396be(0x7d7)]??1.5,'framesMin':VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x624)][_0x4396be(0x222)][_0x4396be(0x7e0)]??0x5a,'framesMax':VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x624)]['Window'][_0x4396be(0x3ed)]??0x12c},Window_TextPopup['prototype']['initialize']=function(){const _0x5cad4d=_0x4396be,_0xac26f0=new Rectangle(0x0,0x0,0x1,0x1);Window_Base[_0x5cad4d(0x56f)][_0x5cad4d(0x480)][_0x5cad4d(0x8ee)](this,_0xac26f0),this[_0x5cad4d(0x504)]=0x0,this['_text']='',this[_0x5cad4d(0x8bc)]=[],this['_timeDuration']=0x0;},Window_TextPopup[_0x4396be(0x56f)]['isAutoColorAffected']=function(){return!![];},Window_TextPopup[_0x4396be(0x56f)]['addQueue']=function(_0x25473d){const _0x46729e=_0x4396be;if(this[_0x46729e(0x8bc)][this[_0x46729e(0x8bc)][_0x46729e(0x858)]-0x1]===_0x25473d)return;this[_0x46729e(0x8bc)]['push'](_0x25473d),SceneManager[_0x46729e(0x9c8)][_0x46729e(0x19c)](this);},Window_TextPopup[_0x4396be(0x56f)]['update']=function(){const _0x5840d9=_0x4396be;Window_Base['prototype'][_0x5840d9(0x68b)][_0x5840d9(0x8ee)](this),this[_0x5840d9(0x957)](),this[_0x5840d9(0x522)]();},Window_TextPopup[_0x4396be(0x56f)]['updateText']=function(){const _0x45329f=_0x4396be;if(this['_text']!=='')return;if(this[_0x45329f(0x8bc)][_0x45329f(0x858)]<=0x0)return;if(!this['isClosed']())return;this[_0x45329f(0x786)]=this['_textQueue'][_0x45329f(0x762)]();const _0x4bac62=Window_TextPopup['SETTINGS'],_0x5de8eb=Math[_0x45329f(0x421)](this[_0x45329f(0x786)]['length']*_0x4bac62[_0x45329f(0x32a)]);this[_0x45329f(0x790)]=_0x5de8eb['clamp'](_0x4bac62[_0x45329f(0xfb)],_0x4bac62[_0x45329f(0x810)]);const _0x76f1cb=this[_0x45329f(0x6e5)](this['_text']);let _0x5b8824=_0x76f1cb['width']+this[_0x45329f(0x4b6)]()*0x2;_0x5b8824+=$gameSystem['windowPadding']()*0x2;let _0x28e792=Math[_0x45329f(0x8cd)](_0x76f1cb['height'],this[_0x45329f(0x694)]());_0x28e792+=$gameSystem['windowPadding']()*0x2;const _0xe764c1=Math[_0x45329f(0xb9)]((Graphics[_0x45329f(0x67f)]-_0x5b8824)/0x2),_0x1c3a67=Math['round']((Graphics[_0x45329f(0x21d)]-_0x28e792)/0x2),_0x1cc4d4=new Rectangle(_0xe764c1,_0x1c3a67,_0x5b8824,_0x28e792);this[_0x45329f(0x25e)](_0x1cc4d4['x'],_0x1cc4d4['y'],_0x1cc4d4['width'],_0x1cc4d4[_0x45329f(0x21d)]),this[_0x45329f(0x533)](),this['refresh'](),this[_0x45329f(0x244)](),SceneManager['_scene'][_0x45329f(0x19c)](this);},Window_TextPopup['prototype']['refresh']=function(){const _0x5bfd8f=_0x4396be,_0x4571b2=this[_0x5bfd8f(0x1de)]();this[_0x5bfd8f(0x275)]['clear'](),this['drawTextEx'](this['_text'],_0x4571b2['x'],_0x4571b2['y'],_0x4571b2[_0x5bfd8f(0x67f)]);},Window_TextPopup[_0x4396be(0x56f)][_0x4396be(0x522)]=function(){const _0x38e540=_0x4396be;if(this['isOpening']()||this[_0x38e540(0x1f3)]())return;if(this['_timeDuration']<=0x0)return;this[_0x38e540(0x790)]--,this['_timeDuration']<=0x0&&(_0x38e540(0x306)!==_0x38e540(0x540)?(this[_0x38e540(0x5a4)](),this[_0x38e540(0x786)]=''):(this[_0x38e540(0x139)][_0x370434]=_0x25864e,this[_0x38e540(0x139)][_0x930ef4]=_0x568f06,this['refreshScrollBarBitmap'](_0x25efa5,_0x52142e,_0x478bcd)));},VisuMZ['ShowDevTools']=function(_0x3df341){const _0x429ab6=_0x4396be;if(Utils[_0x429ab6(0x7c8)]('test')){if('YUqRh'!==_0x429ab6(0x88d)){var _0x14ff7f=require(_0x429ab6(0x1ed))[_0x429ab6(0x222)]['get']();SceneManager[_0x429ab6(0x50e)]();if(_0x3df341)setTimeout(_0x14ff7f[_0x429ab6(0x257)][_0x429ab6(0x7d9)](_0x14ff7f),0x190);}else return 0.5*_0x3f5c52[_0x429ab6(0x33e)](0x2,0xa*_0x271187);}},VisuMZ[_0x4396be(0x5ae)]=function(_0x391231,_0x4b4390){const _0x7c3984=_0x4396be;_0x4b4390=_0x4b4390['toUpperCase']();var _0x12aec1=1.70158,_0x584046=0.7;switch(_0x4b4390){case'LINEAR':return _0x391231;case _0x7c3984(0x769):return-0x1*Math[_0x7c3984(0x354)](_0x391231*(Math['PI']/0x2))+0x1;case _0x7c3984(0x217):return Math[_0x7c3984(0x793)](_0x391231*(Math['PI']/0x2));case _0x7c3984(0x5e4):return-0.5*(Math[_0x7c3984(0x354)](Math['PI']*_0x391231)-0x1);case _0x7c3984(0x432):return _0x391231*_0x391231;case'OUTQUAD':return _0x391231*(0x2-_0x391231);case'INOUTQUAD':return _0x391231<0.5?0x2*_0x391231*_0x391231:-0x1+(0x4-0x2*_0x391231)*_0x391231;case _0x7c3984(0x803):return _0x391231*_0x391231*_0x391231;case _0x7c3984(0x9de):var _0xa97967=_0x391231-0x1;return _0xa97967*_0xa97967*_0xa97967+0x1;case _0x7c3984(0x6fe):return _0x391231<0.5?0x4*_0x391231*_0x391231*_0x391231:(_0x391231-0x1)*(0x2*_0x391231-0x2)*(0x2*_0x391231-0x2)+0x1;case _0x7c3984(0x409):return _0x391231*_0x391231*_0x391231*_0x391231;case _0x7c3984(0x988):var _0xa97967=_0x391231-0x1;return 0x1-_0xa97967*_0xa97967*_0xa97967*_0xa97967;case'INOUTQUART':var _0xa97967=_0x391231-0x1;return _0x391231<0.5?0x8*_0x391231*_0x391231*_0x391231*_0x391231:0x1-0x8*_0xa97967*_0xa97967*_0xa97967*_0xa97967;case'INQUINT':return _0x391231*_0x391231*_0x391231*_0x391231*_0x391231;case'OUTQUINT':var _0xa97967=_0x391231-0x1;return 0x1+_0xa97967*_0xa97967*_0xa97967*_0xa97967*_0xa97967;case _0x7c3984(0x877):var _0xa97967=_0x391231-0x1;return _0x391231<0.5?0x10*_0x391231*_0x391231*_0x391231*_0x391231*_0x391231:0x1+0x10*_0xa97967*_0xa97967*_0xa97967*_0xa97967*_0xa97967;case _0x7c3984(0x792):if(_0x391231===0x0)return 0x0;return Math[_0x7c3984(0x33e)](0x2,0xa*(_0x391231-0x1));case'OUTEXPO':if(_0x391231===0x1)return 0x1;return-Math[_0x7c3984(0x33e)](0x2,-0xa*_0x391231)+0x1;case'INOUTEXPO':if(_0x391231===0x0||_0x391231===0x1){if(_0x7c3984(0x492)!==_0x7c3984(0x492)){const _0x56bee8='_stored_gaugeBackColor';this[_0x7c3984(0x6e3)]=this['_colorCache']||{};if(this[_0x7c3984(0x6e3)][_0x56bee8])return this[_0x7c3984(0x6e3)][_0x56bee8];const _0x574821=_0x5d0e7f[_0x7c3984(0x7c7)]['Settings'][_0x7c3984(0x191)][_0x7c3984(0x53e)];return this['getColorDataFromPluginParameters'](_0x56bee8,_0x574821);}else return _0x391231;}var _0x251a74=_0x391231*0x2,_0x5baea9=_0x251a74-0x1;if(_0x251a74<0x1){if(_0x7c3984(0x614)!==_0x7c3984(0x5d8))return 0.5*Math[_0x7c3984(0x33e)](0x2,0xa*_0x5baea9);else _0x4cc6b8+=_0x2c3571+_0x7c3984(0x884)[_0x7c3984(0x9c3)](_0x1b9316,_0x2401b5[_0x7c3984(0x862)]||_0x7c3984(0x2f5))+_0x4ce857;}return 0.5*(-Math[_0x7c3984(0x33e)](0x2,-0xa*_0x5baea9)+0x2);case'INCIRC':var _0x251a74=_0x391231/0x1;return-0x1*(Math[_0x7c3984(0x11f)](0x1-_0x251a74*_0x391231)-0x1);case _0x7c3984(0x83e):var _0xa97967=_0x391231-0x1;return Math[_0x7c3984(0x11f)](0x1-_0xa97967*_0xa97967);case _0x7c3984(0x58e):var _0x251a74=_0x391231*0x2,_0x5baea9=_0x251a74-0x2;if(_0x251a74<0x1)return-0.5*(Math[_0x7c3984(0x11f)](0x1-_0x251a74*_0x251a74)-0x1);return 0.5*(Math[_0x7c3984(0x11f)](0x1-_0x5baea9*_0x5baea9)+0x1);case _0x7c3984(0x837):return _0x391231*_0x391231*((_0x12aec1+0x1)*_0x391231-_0x12aec1);case _0x7c3984(0x86a):var _0x251a74=_0x391231/0x1-0x1;return _0x251a74*_0x251a74*((_0x12aec1+0x1)*_0x251a74+_0x12aec1)+0x1;break;case _0x7c3984(0x45d):var _0x251a74=_0x391231*0x2,_0x182c1b=_0x251a74-0x2,_0x4ae683=_0x12aec1*1.525;if(_0x251a74<0x1)return 0.5*_0x251a74*_0x251a74*((_0x4ae683+0x1)*_0x251a74-_0x4ae683);return 0.5*(_0x182c1b*_0x182c1b*((_0x4ae683+0x1)*_0x182c1b+_0x4ae683)+0x2);case _0x7c3984(0x445):if(_0x391231===0x0||_0x391231===0x1)return _0x391231;var _0x251a74=_0x391231/0x1,_0x5baea9=_0x251a74-0x1,_0x1a9ea3=0x1-_0x584046,_0x4ae683=_0x1a9ea3/(0x2*Math['PI'])*Math[_0x7c3984(0x5c8)](0x1);return-(Math[_0x7c3984(0x33e)](0x2,0xa*_0x5baea9)*Math[_0x7c3984(0x793)]((_0x5baea9-_0x4ae683)*(0x2*Math['PI'])/_0x1a9ea3));case _0x7c3984(0x44a):var _0x1a9ea3=0x1-_0x584046,_0x251a74=_0x391231*0x2;if(_0x391231===0x0||_0x391231===0x1)return _0x7c3984(0x9d9)!==_0x7c3984(0x9d9)?_0x4f4088['CoreEngine'][_0x7c3984(0x624)][_0x7c3984(0x222)][_0x7c3984(0x527)]:_0x391231;var _0x4ae683=_0x1a9ea3/(0x2*Math['PI'])*Math[_0x7c3984(0x5c8)](0x1);return Math[_0x7c3984(0x33e)](0x2,-0xa*_0x251a74)*Math[_0x7c3984(0x793)]((_0x251a74-_0x4ae683)*(0x2*Math['PI'])/_0x1a9ea3)+0x1;case'INOUTELASTIC':var _0x1a9ea3=0x1-_0x584046;if(_0x391231===0x0||_0x391231===0x1){if(_0x7c3984(0x3c0)!==_0x7c3984(0x3c0))this[_0x7c3984(0x9a0)](_0x540127);else return _0x391231;}var _0x251a74=_0x391231*0x2,_0x5baea9=_0x251a74-0x1,_0x4ae683=_0x1a9ea3/(0x2*Math['PI'])*Math[_0x7c3984(0x5c8)](0x1);if(_0x251a74<0x1)return-0.5*(Math[_0x7c3984(0x33e)](0x2,0xa*_0x5baea9)*Math[_0x7c3984(0x793)]((_0x5baea9-_0x4ae683)*(0x2*Math['PI'])/_0x1a9ea3));return Math['pow'](0x2,-0xa*_0x5baea9)*Math['sin']((_0x5baea9-_0x4ae683)*(0x2*Math['PI'])/_0x1a9ea3)*0.5+0x1;case _0x7c3984(0x954):var _0x251a74=_0x391231/0x1;if(_0x251a74<0x1/2.75)return 7.5625*_0x251a74*_0x251a74;else{if(_0x251a74<0x2/2.75){var _0x182c1b=_0x251a74-1.5/2.75;return 7.5625*_0x182c1b*_0x182c1b+0.75;}else{if(_0x251a74<2.5/2.75){if(_0x7c3984(0x48a)!=='gdmIF'){if(_0x4c025c[_0x7c3984(0x863)]())_0x4d4ae0['log'](_0x3a5007);}else{var _0x182c1b=_0x251a74-2.25/2.75;return 7.5625*_0x182c1b*_0x182c1b+0.9375;}}else{if(_0x7c3984(0x4be)==='XrQhc')return this[_0x7c3984(0x725)];else{var _0x182c1b=_0x251a74-2.625/2.75;return 7.5625*_0x182c1b*_0x182c1b+0.984375;}}}}case _0x7c3984(0x37e):var _0x1e1d76=0x1-VisuMZ[_0x7c3984(0x5ae)](0x1-_0x391231,_0x7c3984(0x7ea));return _0x1e1d76;case'INOUTBOUNCE':if(_0x391231<0.5){if('mXFLw'!==_0x7c3984(0x14c)){_0x46062a[_0x7c3984(0x7c7)][_0x7c3984(0x1ce)][_0x7c3984(0x8ee)](this);if(this[_0x7c3984(0x1df)]['position']===0x3){if(this['x']===0x0)this['x']=_0x42e916['round'](_0xf95e6a['width']/0x2);if(this['y']===0x0)this['y']=_0x545c16[_0x7c3984(0xb9)](_0xb7630c[_0x7c3984(0x21d)]/0x2);}}else var _0x1e1d76=VisuMZ[_0x7c3984(0x5ae)](_0x391231*0x2,_0x7c3984(0x9f5))*0.5;}else{if(_0x7c3984(0xcd)==='ogvYj')var _0x1e1d76=VisuMZ[_0x7c3984(0x5ae)](_0x391231*0x2-0x1,'outbounce')*0.5+0.5;else _0x4f9d0f[_0x7c3984(0x7c7)][_0x7c3984(0x85b)](_0x345b9a);}return _0x1e1d76;default:return _0x391231;}},VisuMZ[_0x4396be(0x928)]=function(_0x2dea58){const _0x2cd24b=_0x4396be;_0x2dea58=String(_0x2dea58)[_0x2cd24b(0x569)]();const _0x5736f8=VisuMZ[_0x2cd24b(0x7c7)]['Settings']['Param'];if(_0x2dea58==='MAXHP')return _0x5736f8[_0x2cd24b(0x182)];if(_0x2dea58===_0x2cd24b(0x2cb))return _0x5736f8[_0x2cd24b(0xe3)];if(_0x2dea58===_0x2cd24b(0x75b))return _0x5736f8['IconParam2'];if(_0x2dea58===_0x2cd24b(0x87f))return _0x5736f8[_0x2cd24b(0x1bf)];if(_0x2dea58==='MAT')return _0x5736f8[_0x2cd24b(0x37d)];if(_0x2dea58===_0x2cd24b(0x8f2))return _0x5736f8[_0x2cd24b(0x7ac)];if(_0x2dea58===_0x2cd24b(0x781))return _0x5736f8[_0x2cd24b(0x987)];if(_0x2dea58===_0x2cd24b(0x140))return _0x5736f8[_0x2cd24b(0x5fe)];if(_0x2dea58===_0x2cd24b(0x5c7))return _0x5736f8[_0x2cd24b(0x49f)];if(_0x2dea58==='EVA')return _0x5736f8[_0x2cd24b(0x838)];if(_0x2dea58===_0x2cd24b(0x869))return _0x5736f8[_0x2cd24b(0x788)];if(_0x2dea58===_0x2cd24b(0x458))return _0x5736f8[_0x2cd24b(0xf7)];if(_0x2dea58===_0x2cd24b(0x26e))return _0x5736f8['IconXParam4'];if(_0x2dea58==='MRF')return _0x5736f8[_0x2cd24b(0x991)];if(_0x2dea58===_0x2cd24b(0x9b9))return _0x5736f8['IconXParam6'];if(_0x2dea58===_0x2cd24b(0x467))return _0x5736f8['IconXParam7'];if(_0x2dea58==='MRG')return _0x5736f8[_0x2cd24b(0x321)];if(_0x2dea58==='TRG')return _0x5736f8[_0x2cd24b(0x683)];if(_0x2dea58===_0x2cd24b(0x135))return _0x5736f8[_0x2cd24b(0x48f)];if(_0x2dea58===_0x2cd24b(0x3b2))return _0x5736f8[_0x2cd24b(0x67d)];if(_0x2dea58==='REC')return _0x5736f8[_0x2cd24b(0xda)];if(_0x2dea58===_0x2cd24b(0x778))return _0x5736f8[_0x2cd24b(0x31b)];if(_0x2dea58==='MCR')return _0x5736f8[_0x2cd24b(0x5b7)];if(_0x2dea58==='TCR')return _0x5736f8['IconSParam5'];if(_0x2dea58===_0x2cd24b(0x91c))return _0x5736f8[_0x2cd24b(0x107)];if(_0x2dea58===_0x2cd24b(0x68e))return _0x5736f8[_0x2cd24b(0x749)];if(_0x2dea58===_0x2cd24b(0x570))return _0x5736f8[_0x2cd24b(0x94f)];if(_0x2dea58===_0x2cd24b(0x2be))return _0x5736f8[_0x2cd24b(0x65e)];if(VisuMZ[_0x2cd24b(0x7c7)][_0x2cd24b(0x443)][_0x2dea58])return VisuMZ[_0x2cd24b(0x7c7)][_0x2cd24b(0x443)][_0x2dea58]||0x0;return 0x0;},VisuMZ[_0x4396be(0x2ca)]=function(_0x4b562b,_0x40c888,_0x1e2dbe){const _0x28b776=_0x4396be;if(_0x1e2dbe===undefined&&_0x4b562b%0x1===0x0)return _0x4b562b;if(_0x1e2dbe!==undefined&&[_0x28b776(0x93e),'MAXMP',_0x28b776(0x75b),_0x28b776(0x87f),_0x28b776(0x992),_0x28b776(0x8f2),'AGI',_0x28b776(0x140)][_0x28b776(0x897)](String(_0x1e2dbe)[_0x28b776(0x569)]()[_0x28b776(0x8b0)]()))return _0x4b562b;_0x40c888=_0x40c888||0x0;if(VisuMZ[_0x28b776(0x7c7)]['CustomParamAbb'][_0x1e2dbe]){if(VisuMZ[_0x28b776(0x7c7)][_0x28b776(0x1d2)][_0x1e2dbe]===_0x28b776(0x136)){if(_0x28b776(0x733)==='iIEzy')return _0x4b562b;else{const _0x109c47=_0x204ffd(_0xdaff77['$1']);if(_0x109c47['match'](/(?:FRONTVIEW|FRONT VIEW|FV)/i))this[_0x28b776(0x3a6)]='FV';else _0x109c47[_0x28b776(0x8e4)](/(?:SIDEVIEW|SIDE VIEW|SV)/i)&&(this[_0x28b776(0x3a6)]='SV');}}else{if(_0x28b776(0x331)===_0x28b776(0x1a6))_0x537e5c[_0x28b776(0x7c7)][_0x28b776(0x325)][_0x28b776(0x8ee)](this,_0x9249dd);else return String((_0x4b562b*0x64)['toFixed'](_0x40c888))+'%';}}return String((_0x4b562b*0x64)[_0x28b776(0xd1)](_0x40c888))+'%';},VisuMZ[_0x4396be(0x370)]=function(_0x8ddbd3){const _0x4fe53e=_0x4396be;_0x8ddbd3=String(_0x8ddbd3);if(!_0x8ddbd3)return _0x8ddbd3;if(typeof _0x8ddbd3!==_0x4fe53e(0x689))return _0x8ddbd3;const _0x205bf6=VisuMZ[_0x4fe53e(0x7c7)][_0x4fe53e(0x624)][_0x4fe53e(0x9e8)]['DigitGroupingLocale']||_0x4fe53e(0x622),_0x144b17={'maximumFractionDigits':0x6};_0x8ddbd3=_0x8ddbd3[_0x4fe53e(0x437)](/\[(.*?)\]/g,(_0x2faaf7,_0x332ff4)=>{const _0x35a256=_0x4fe53e;return VisuMZ[_0x35a256(0x618)](_0x332ff4,'[',']');}),_0x8ddbd3=_0x8ddbd3['replace'](/<(.*?)>/g,(_0x492e25,_0x5a0b56)=>{const _0x319bdd=_0x4fe53e;if(_0x319bdd(0x3d6)===_0x319bdd(0x878))_0x340cfc[_0x319bdd(0x7c7)][_0x319bdd(0x157)][_0x319bdd(0x8ee)](this,_0x50d25e,_0x2dfdac),this['_smooth']=!(_0x1822f3[_0x319bdd(0x7c7)][_0x319bdd(0x624)][_0x319bdd(0x9e8)][_0x319bdd(0x66d)]??!![]);else return VisuMZ['PreserveNumbers'](_0x5a0b56,'<','>');}),_0x8ddbd3=_0x8ddbd3['replace'](/\{\{(.*?)\}\}/g,(_0xbdc2ae,_0x2d0290)=>{const _0x223d3e=_0x4fe53e;if('cSMto'===_0x223d3e(0x256))return VisuMZ[_0x223d3e(0x618)](_0x2d0290,'','');else _0x39f7c3[_0x223d3e(0x7c7)]['Scene_Map_initialize'][_0x223d3e(0x8ee)](this),_0x44346d[_0x223d3e(0x158)](),this['clearOnceParallelInterpreters']();}),_0x8ddbd3=_0x8ddbd3[_0x4fe53e(0x437)](/(\d+\.?\d*)/g,(_0x331b49,_0x3d087f)=>{const _0x4179e3=_0x4fe53e;let _0x2e3c73=_0x3d087f;if(_0x2e3c73[0x0]==='0')return _0x2e3c73;if(_0x2e3c73[_0x2e3c73[_0x4179e3(0x858)]-0x1]==='.')return Number(_0x2e3c73)['toLocaleString'](_0x205bf6,_0x144b17)+'.';else return _0x2e3c73[_0x2e3c73['length']-0x1]===','?Number(_0x2e3c73)[_0x4179e3(0x410)](_0x205bf6,_0x144b17)+',':Number(_0x2e3c73)[_0x4179e3(0x410)](_0x205bf6,_0x144b17);});let _0x32f584=0x3;while(_0x32f584--){if('QyMoT'!==_0x4fe53e(0x1b2))_0x8ddbd3=VisuMZ[_0x4fe53e(0x51b)](_0x8ddbd3);else{const _0x51b438=_0x1f714a['CoreEngine'][_0x4fe53e(0x624)][_0x4fe53e(0x775)],_0x20ebb8=_0x51b438[_0x4fe53e(0x8a7)],_0xbced6e=this[_0x4fe53e(0x35e)](_0x2234db),_0x2545d1=this[_0x4fe53e(0x35e)](_0x296619);return _0x20ebb8['format'](_0xbced6e,_0x2545d1);}}return _0x8ddbd3;},VisuMZ['PreserveNumbers']=function(_0x3c6741,_0x264693,_0x2e9c0c){const _0x3154ab=_0x4396be;return _0x3c6741=_0x3c6741[_0x3154ab(0x437)](/(\d)/gi,(_0x5e0438,_0x3128fc)=>_0x3154ab(0x4c3)[_0x3154ab(0x9c3)](Number(_0x3128fc))),_0x3154ab(0x54a)[_0x3154ab(0x9c3)](_0x3c6741,_0x264693,_0x2e9c0c);},VisuMZ[_0x4396be(0x51b)]=function(_0x595e09){return _0x595e09=_0x595e09['replace'](/PRESERVCONVERSION\((\d+)\)/gi,(_0x5d1397,_0x1c9cb0)=>Number(parseInt(_0x1c9cb0))),_0x595e09;},VisuMZ['openURL']=function(_0x248771){const _0x38e7cf=_0x4396be;SoundManager['playOk']();if(!Utils[_0x38e7cf(0x592)]()){const _0x8f957d=window[_0x38e7cf(0x244)](_0x248771,'_blank');}else{if(_0x38e7cf(0x7b6)===_0x38e7cf(0x7b6)){const _0x2f600e=process[_0x38e7cf(0xa0d)]==_0x38e7cf(0x9e6)?_0x38e7cf(0x244):process[_0x38e7cf(0xa0d)]==_0x38e7cf(0x66a)?_0x38e7cf(0x851):'xdg-open';require(_0x38e7cf(0x5a1))[_0x38e7cf(0x7d6)](_0x2f600e+'\x20'+_0x248771);}else _0x2aeb70[_0x38e7cf(0x1cb)]=![],_0x33b771[_0x38e7cf(0x434)]=!![];}},VisuMZ[_0x4396be(0x6b7)]=function(_0xcd4fb5,_0x477b6a){const _0x35cf65=_0x4396be;if(!_0xcd4fb5)return'';const _0x4fd0cf=_0xcd4fb5['baseId']||_0xcd4fb5['id'];let _0x52a0e9='';_0xcd4fb5[_0x35cf65(0x9a5)]!==undefined&&_0xcd4fb5[_0x35cf65(0x2ed)]!==undefined&&(_0x52a0e9='Actor-%1-%2'['format'](_0x4fd0cf,_0x477b6a));if(_0xcd4fb5['expParams']!==undefined&&_0xcd4fb5['learnings']!==undefined){if(_0x35cf65(0xce)===_0x35cf65(0xce))_0x52a0e9=_0x35cf65(0x78b)[_0x35cf65(0x9c3)](_0x4fd0cf,_0x477b6a);else return _0x421e74[_0x35cf65(0x83c)][_0x35cf65(0x1aa)]['call'](this);}_0xcd4fb5[_0x35cf65(0x6ff)]!==undefined&&_0xcd4fb5[_0x35cf65(0x205)]!==undefined&&(_0x35cf65(0x3c4)===_0x35cf65(0xa01)?(this[_0x35cf65(0x165)]={},_0x34a09f[_0x35cf65(0x7c7)][_0x35cf65(0x96c)][_0x35cf65(0x8ee)](this)):_0x52a0e9=_0x35cf65(0x752)[_0x35cf65(0x9c3)](_0x4fd0cf,_0x477b6a));if(_0xcd4fb5[_0x35cf65(0xec)]!==undefined&&_0xcd4fb5[_0x35cf65(0x693)]!==undefined){if(_0x35cf65(0x506)==='pehWW')_0x52a0e9='Item-%1-%2'[_0x35cf65(0x9c3)](_0x4fd0cf,_0x477b6a);else{let _0x20d02b=_0x159f2c[_0x35cf65(0x625)](_0x250c99)[_0x35cf65(0x910)]();this['useDigitGrouping']()&&(_0x20d02b=_0x47b315[_0x35cf65(0x370)](_0x20d02b));const _0x46de89=this[_0x35cf65(0x35f)](),_0x2dd729=_0x5991f7[_0x35cf65(0x346)](_0x46de89*0.75);for(let _0x4a857d=0x0;_0x4a857d<_0x20d02b['length'];_0x4a857d++){const _0x4a9599=this[_0x35cf65(0x2b6)](_0x2dd729,_0x46de89);_0x4a9599['bitmap'][_0x35cf65(0x865)](_0x20d02b[_0x4a857d],0x0,0x0,_0x2dd729,_0x46de89,'center'),_0x4a9599['x']=(_0x4a857d-(_0x20d02b[_0x35cf65(0x858)]-0x1)/0x2)*_0x2dd729,_0x4a9599['dy']=-_0x4a857d;}}}return _0xcd4fb5[_0x35cf65(0x947)]!==undefined&&_0xcd4fb5['etypeId']===0x1&&(_0x52a0e9=_0x35cf65(0x315)['format'](_0x4fd0cf,_0x477b6a)),_0xcd4fb5['atypeId']!==undefined&&_0xcd4fb5[_0x35cf65(0x342)]>0x1&&('EasKy'!==_0x35cf65(0x890)?(_0x53450c['CoreEngine']['Scene_Menu_create']['call'](this),this['setCoreEngineUpdateWindowBg']()):_0x52a0e9=_0x35cf65(0x281)[_0x35cf65(0x9c3)](_0x4fd0cf,_0x477b6a)),_0xcd4fb5[_0x35cf65(0x66b)]!==undefined&&_0xcd4fb5[_0x35cf65(0x976)]!==undefined&&(_0x52a0e9=_0x35cf65(0x2c4)[_0x35cf65(0x9c3)](_0x4fd0cf,_0x477b6a)),_0xcd4fb5[_0x35cf65(0x408)]!==undefined&&_0xcd4fb5['maxTurns']!==undefined&&(_0x52a0e9='State-%1-%2'[_0x35cf65(0x9c3)](_0x4fd0cf,_0x477b6a)),_0x52a0e9;},Game_Picture[_0x4396be(0x56f)][_0x4396be(0x20e)]=function(){const _0x5907ee=_0x4396be;return this[_0x5907ee(0x88a)];},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x37a)]=Game_Picture[_0x4396be(0x56f)]['initBasic'],Game_Picture[_0x4396be(0x56f)][_0x4396be(0x3d9)]=function(){const _0x45024a=_0x4396be;VisuMZ[_0x45024a(0x7c7)][_0x45024a(0x37a)]['call'](this),this[_0x45024a(0x88a)]={'x':0x0,'y':0x0},this['_targetAnchor']={'x':0x0,'y':0x0};},VisuMZ[_0x4396be(0x7c7)]['Game_Picture_updateMove']=Game_Picture[_0x4396be(0x56f)][_0x4396be(0x348)],Game_Picture[_0x4396be(0x56f)]['updateMove']=function(){const _0x48fa8e=_0x4396be;this[_0x48fa8e(0x9df)]();const _0xe1b790=this[_0x48fa8e(0x6dd)];VisuMZ[_0x48fa8e(0x7c7)][_0x48fa8e(0x52e)]['call'](this),_0xe1b790>0x0&&this[_0x48fa8e(0x6dd)]<=0x0&&(this['_x']=this[_0x48fa8e(0x41d)],this['_y']=this['_targetY'],this[_0x48fa8e(0x765)]=this[_0x48fa8e(0x92a)],this['_scaleY']=this[_0x48fa8e(0x833)],this['_opacity']=this[_0x48fa8e(0x8c2)],this[_0x48fa8e(0x88a)]&&(this[_0x48fa8e(0x88a)]['x']=this['_targetAnchor']['x'],this[_0x48fa8e(0x88a)]['y']=this[_0x48fa8e(0x43c)]['y']));},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x1b3)]=Game_Picture[_0x4396be(0x56f)][_0x4396be(0x7c1)],Game_Picture[_0x4396be(0x56f)][_0x4396be(0x7c1)]=function(_0x827173,_0x64f417,_0x5724ed,_0xcb25cd,_0x2249ce,_0x86c2b4,_0x28bdd2,_0x3f7f97){const _0x49644a=_0x4396be;VisuMZ[_0x49644a(0x7c7)][_0x49644a(0x1b3)][_0x49644a(0x8ee)](this,_0x827173,_0x64f417,_0x5724ed,_0xcb25cd,_0x2249ce,_0x86c2b4,_0x28bdd2,_0x3f7f97),this['setAnchor']([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x64f417]||{'x':0x0,'y':0x0});},VisuMZ[_0x4396be(0x7c7)]['Game_Picture_move']=Game_Picture[_0x4396be(0x56f)][_0x4396be(0x25e)],Game_Picture['prototype']['move']=function(_0x2a4f21,_0x38bd80,_0x58c3db,_0x3d3696,_0x24a3ee,_0x3537ee,_0x431726,_0x5092d0,_0xc569a4){const _0x4afda4=_0x4396be;VisuMZ['CoreEngine'][_0x4afda4(0x1fa)][_0x4afda4(0x8ee)](this,_0x2a4f21,_0x38bd80,_0x58c3db,_0x3d3696,_0x24a3ee,_0x3537ee,_0x431726,_0x5092d0,_0xc569a4),this[_0x4afda4(0x3f5)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x2a4f21]||{'x':0x0,'y':0x0});},Game_Picture[_0x4396be(0x56f)][_0x4396be(0x9df)]=function(){const _0x4666c5=_0x4396be;this[_0x4666c5(0x6dd)]>0x0&&(this[_0x4666c5(0x88a)]['x']=this[_0x4666c5(0x185)](this['_anchor']['x'],this[_0x4666c5(0x43c)]['x']),this[_0x4666c5(0x88a)]['y']=this['applyEasing'](this[_0x4666c5(0x88a)]['y'],this[_0x4666c5(0x43c)]['y']));},Game_Picture['prototype'][_0x4396be(0x888)]=function(_0x51c935){const _0x14e018=_0x4396be;this[_0x14e018(0x88a)]=_0x51c935,this[_0x14e018(0x43c)]=JsonEx[_0x14e018(0x713)](this[_0x14e018(0x88a)]);},Game_Picture[_0x4396be(0x56f)][_0x4396be(0x3f5)]=function(_0x625cfe){const _0x17f403=_0x4396be;this[_0x17f403(0x43c)]=_0x625cfe;},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x34c)]=Sprite_Picture[_0x4396be(0x56f)][_0x4396be(0x58f)],Sprite_Picture[_0x4396be(0x56f)][_0x4396be(0x58f)]=function(){const _0x52e24b=_0x4396be,_0x565c57=this[_0x52e24b(0x6cc)]();if(!_0x565c57[_0x52e24b(0x20e)]()){if(_0x52e24b(0x7ae)===_0x52e24b(0x7ae))VisuMZ[_0x52e24b(0x7c7)]['Sprite_Picture_updateOrigin'][_0x52e24b(0x8ee)](this);else{if(_0x19d00a(this[_0x52e24b(0x797)])[_0x52e24b(0x858)]>=this[_0x52e24b(0x472)])return;const _0x3044c9=_0x3092ac(_0x3fe54f(this['_number'])+_0x1f66d7[_0x52e24b(0x807)]);if(_0x1f8226(_0x3044c9))return;this[_0x52e24b(0x797)]=_0x3044c9;const _0x15cb24='9'[_0x52e24b(0x642)](this[_0x52e24b(0x472)]);this[_0x52e24b(0x797)]=this[_0x52e24b(0x797)]['clamp'](0x0,_0x15cb24),_0x8424a6[_0x52e24b(0x7db)](),this[_0x52e24b(0x813)](),_0x57e50b[_0x52e24b(0x4f7)](),this[_0x52e24b(0x17a)](this[_0x52e24b(0x472)]-0x1);}}else this[_0x52e24b(0x20e)]['x']=_0x565c57[_0x52e24b(0x20e)]()['x'],this['anchor']['y']=_0x565c57[_0x52e24b(0x20e)]()['y'];},Game_Action[_0x4396be(0x56f)][_0x4396be(0x3bb)]=function(_0x25800f){const _0x5d666b=_0x4396be;if(_0x25800f){if('fDgZg'===_0x5d666b(0x596))return this[_0x5d666b(0x36f)]()?this[_0x5d666b(0x6d8)]():0x0;else{const _0x58ce5f=_0x25800f[_0x5d666b(0x704)];if(_0x58ce5f===0x1&&this[_0x5d666b(0xe4)]()[_0x5d666b(0x1ae)]()!==0x1)this[_0x5d666b(0x291)]();else _0x58ce5f===0x2&&this[_0x5d666b(0xe4)]()[_0x5d666b(0x3ba)]()!==0x2?this['setGuard']():this[_0x5d666b(0x7aa)](_0x58ce5f);}}else this[_0x5d666b(0x7db)]();},Game_Actor[_0x4396be(0x56f)][_0x4396be(0x9f8)]=function(){const _0x4bc28f=_0x4396be;return this['skills']()['filter'](_0x405644=>this[_0x4bc28f(0x9ec)](_0x405644)&&this[_0x4bc28f(0x248)]()[_0x4bc28f(0x897)](_0x405644['stypeId']));},Window_Base['prototype'][_0x4396be(0x8fe)]=function(){const _0x15e1b5=_0x4396be;this[_0x15e1b5(0x5ca)]=new Sprite(),this[_0x15e1b5(0x5ca)][_0x15e1b5(0x2e6)]=new Bitmap(0x0,0x0),this['_dimmerSprite']['x']=0x0,this[_0x15e1b5(0x250)](this[_0x15e1b5(0x5ca)]);},Window_Base[_0x4396be(0x56f)][_0x4396be(0x89c)]=function(){const _0x234d83=_0x4396be;if(this[_0x234d83(0x5ca)]){const _0x19d6de=this[_0x234d83(0x5ca)][_0x234d83(0x2e6)],_0x541fba=this['width'],_0x53be30=this['height'],_0x124f42=this['padding'],_0x580894=ColorManager['dimColor1'](),_0x5bb9af=ColorManager[_0x234d83(0x473)]();_0x19d6de[_0x234d83(0x9cc)](_0x541fba,_0x53be30),_0x19d6de['gradientFillRect'](0x0,0x0,_0x541fba,_0x124f42,_0x5bb9af,_0x580894,!![]),_0x19d6de['fillRect'](0x0,_0x124f42,_0x541fba,_0x53be30-_0x124f42*0x2,_0x580894),_0x19d6de[_0x234d83(0x426)](0x0,_0x53be30-_0x124f42,_0x541fba,_0x124f42,_0x580894,_0x5bb9af,!![]),this[_0x234d83(0x5ca)]['setFrame'](0x0,0x0,_0x541fba,_0x53be30);}},Game_Actor[_0x4396be(0x56f)][_0x4396be(0x791)]=function(){const _0x1ece1d=_0x4396be;for(let _0x1ca586=0x0;_0x1ca586<this[_0x1ece1d(0x5d1)]();_0x1ca586++){const _0x1cffb1=this[_0x1ece1d(0x4dd)]();let _0x402bda=Number[_0x1ece1d(0x95d)];this[_0x1ece1d(0x1be)](_0x1ca586,_0x1cffb1[0x0]);for(const _0x218068 of _0x1cffb1){const _0x44193e=_0x218068[_0x1ece1d(0x9f4)]();if(_0x44193e>_0x402bda){if(_0x1ece1d(0x510)===_0x1ece1d(0x667)){_0x1e1eec[_0x1ece1d(0x162)](_0x477285,_0x5b589f);const _0x57cad4=_0x373d7b[_0x1ece1d(0xb9)](_0x2d8ca2['PictureID'])['clamp'](0x1,0x64),_0x444133=-_0x426a64(_0x2aa7ca[_0x1ece1d(0x8ca)]||0x0),_0x231b7c=_0x1ef402['max'](_0x560234['Duration']||0x0,0x0),_0x538f1b=_0x4d106a[_0x1ece1d(0x152)]||'Linear',_0x165d01=_0x39c27a[_0x1ece1d(0x524)],_0xd4ed83=_0x21c3e1[_0x1ece1d(0x6cc)](_0x57cad4);if(!_0xd4ed83)return;_0xd4ed83[_0x1ece1d(0x211)](_0x444133,_0x231b7c,_0x538f1b);if(_0x165d01){const _0x2cb1f3=_0x2f43b3['getLastPluginCommandInterpreter']();if(_0x2cb1f3)_0x2cb1f3[_0x1ece1d(0x5ab)](_0x231b7c);}}else _0x402bda=_0x44193e,this[_0x1ece1d(0x1be)](_0x1ca586,_0x218068);}}}this[_0x1ece1d(0x78d)](_0x1ece1d(0x2ec));},Window_BattleItem[_0x4396be(0x56f)]['isEnabled']=function(_0x394dcb){const _0x4dc67d=_0x4396be;return BattleManager['actor']()?BattleManager[_0x4dc67d(0x4b5)]()[_0x4dc67d(0x9ec)](_0x394dcb):Window_ItemList[_0x4dc67d(0x56f)][_0x4dc67d(0x28b)]['call'](this,_0x394dcb);},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x298)]=Scene_Map[_0x4396be(0x56f)]['createSpriteset'],Scene_Map[_0x4396be(0x56f)][_0x4396be(0x15d)]=function(){const _0x28d36f=_0x4396be;VisuMZ[_0x28d36f(0x7c7)]['Scene_Map_createSpritesetFix'][_0x28d36f(0x8ee)](this);const _0x4283ef=this[_0x28d36f(0x2de)]['_timerSprite'];if(_0x4283ef)this[_0x28d36f(0x19c)](_0x4283ef);},VisuMZ['CoreEngine'][_0x4396be(0xca)]=Scene_Battle[_0x4396be(0x56f)][_0x4396be(0x15d)],Scene_Battle[_0x4396be(0x56f)][_0x4396be(0x15d)]=function(){const _0x2059f2=_0x4396be;VisuMZ[_0x2059f2(0x7c7)][_0x2059f2(0xca)][_0x2059f2(0x8ee)](this);const _0x322830=this[_0x2059f2(0x2de)][_0x2059f2(0x9dd)];if(_0x322830)this[_0x2059f2(0x19c)](_0x322830);},Sprite_Actor[_0x4396be(0x56f)][_0x4396be(0x68b)]=function(){const _0x5a4be2=_0x4396be;Sprite_Battler[_0x5a4be2(0x56f)]['update'][_0x5a4be2(0x8ee)](this),this[_0x5a4be2(0x143)]();if(this[_0x5a4be2(0x97f)])this['updateMotion']();else this[_0x5a4be2(0x4d5)]!==''&&(this['_battlerName']='');},Window[_0x4396be(0x56f)][_0x4396be(0x52f)]=function(){const _0x4bf90b=_0x4396be,_0x557313=this[_0x4bf90b(0xa11)],_0x12ddcf=this[_0x4bf90b(0xc3)],_0x3535e4=0x18,_0x4b83c2=_0x3535e4/0x2,_0x36cb72=0x60+_0x3535e4,_0x240335=0x0+_0x3535e4;this['_downArrowSprite'][_0x4bf90b(0x2e6)]=this[_0x4bf90b(0x23b)],this['_downArrowSprite']['anchor']['x']=0.5,this[_0x4bf90b(0x293)][_0x4bf90b(0x20e)]['y']=0.5,this[_0x4bf90b(0x293)][_0x4bf90b(0x984)](_0x36cb72+_0x4b83c2,_0x240335+_0x4b83c2+_0x3535e4,_0x3535e4,_0x4b83c2),this[_0x4bf90b(0x293)]['move'](Math[_0x4bf90b(0xb9)](_0x557313/0x2),Math[_0x4bf90b(0xb9)](_0x12ddcf-_0x4b83c2)),this['_upArrowSprite'][_0x4bf90b(0x2e6)]=this[_0x4bf90b(0x23b)],this['_upArrowSprite'][_0x4bf90b(0x20e)]['x']=0.5,this[_0x4bf90b(0x43a)][_0x4bf90b(0x20e)]['y']=0.5,this[_0x4bf90b(0x43a)][_0x4bf90b(0x984)](_0x36cb72+_0x4b83c2,_0x240335,_0x3535e4,_0x4b83c2),this[_0x4bf90b(0x43a)][_0x4bf90b(0x25e)](Math[_0x4bf90b(0xb9)](_0x557313/0x2),Math[_0x4bf90b(0xb9)](_0x4b83c2));},Window['prototype'][_0x4396be(0x381)]=function(){const _0x4048e8=_0x4396be,_0x460d8b=0x90,_0x12a61f=0x60,_0x562cc9=0x18;this[_0x4048e8(0x1cd)][_0x4048e8(0x2e6)]=this[_0x4048e8(0x23b)],this[_0x4048e8(0x1cd)][_0x4048e8(0x20e)]['x']=0.5,this[_0x4048e8(0x1cd)][_0x4048e8(0x20e)]['y']=0x1,this[_0x4048e8(0x1cd)][_0x4048e8(0x25e)](Math[_0x4048e8(0xb9)](this[_0x4048e8(0xa11)]/0x2),this[_0x4048e8(0xc3)]),this[_0x4048e8(0x1cd)][_0x4048e8(0x984)](_0x460d8b,_0x12a61f,_0x562cc9,_0x562cc9),this[_0x4048e8(0x1cd)][_0x4048e8(0x849)]=0xff;},Window[_0x4396be(0x56f)][_0x4396be(0x572)]=function(){const _0x3a33f5=_0x4396be,_0x19efa2=this[_0x3a33f5(0x66f)][_0x3a33f5(0x17e)][_0x3a33f5(0x15f)](new Point(0x0,0x0)),_0xcde0fd=this[_0x3a33f5(0x66f)][_0x3a33f5(0x168)];_0xcde0fd['x']=_0x19efa2['x']+this[_0x3a33f5(0x87c)]['x'],_0xcde0fd['y']=_0x19efa2['y']+this[_0x3a33f5(0x87c)]['y'],_0xcde0fd[_0x3a33f5(0x67f)]=Math[_0x3a33f5(0x421)](this['innerWidth']*this[_0x3a33f5(0x9a7)]['x']),_0xcde0fd[_0x3a33f5(0x21d)]=Math[_0x3a33f5(0x421)](this[_0x3a33f5(0x666)]*this['scale']['y']);},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0x7c3)]=Window['prototype'][_0x4396be(0x6d2)],Window[_0x4396be(0x56f)]['_refreshBack']=function(){const _0x15f7f0=_0x4396be,_0x552246=VisuMZ[_0x15f7f0(0x7c7)][_0x15f7f0(0x624)][_0x15f7f0(0x222)][_0x15f7f0(0xd6)]??!![];if(!_0x552246)return VisuMZ['CoreEngine']['Window_refreshBack'][_0x15f7f0(0x8ee)](this);const _0x45a18a=this[_0x15f7f0(0x585)],_0x565f18=Math[_0x15f7f0(0x8cd)](0x0,this[_0x15f7f0(0xa11)]-_0x45a18a*0x2),_0x6d98fb=Math[_0x15f7f0(0x8cd)](0x0,this['_height']-_0x45a18a*0x2),_0x5f413b=this[_0x15f7f0(0x916)],_0x344047=_0x5f413b['children'][0x0];_0x5f413b[_0x15f7f0(0x2e6)]=this[_0x15f7f0(0x23b)],_0x5f413b[_0x15f7f0(0x984)](0x0,0x0,0x60,0x60),_0x5f413b[_0x15f7f0(0x25e)](_0x45a18a,_0x45a18a),_0x5f413b[_0x15f7f0(0x9a7)]['x']=_0x565f18/0x60,_0x5f413b[_0x15f7f0(0x9a7)]['y']=_0x6d98fb/0x60,_0x344047[_0x15f7f0(0x2e6)]=this[_0x15f7f0(0x23b)],_0x344047[_0x15f7f0(0x984)](0x0,0x60,0x60,0x60),_0x344047['move'](0x0,0x0,_0x565f18,_0x6d98fb),_0x344047[_0x15f7f0(0x9a7)]['x']=0x1/_0x5f413b[_0x15f7f0(0x9a7)]['x'],_0x344047['scale']['y']=0x1/_0x5f413b[_0x15f7f0(0x9a7)]['y'],_0x5f413b[_0x15f7f0(0xed)](this['_colorTone']);},Game_Temp[_0x4396be(0x56f)][_0x4396be(0x8c3)]=function(){const _0x1587e8=_0x4396be;this[_0x1587e8(0x8bd)]=[],this[_0x1587e8(0x106)]=[],this[_0x1587e8(0x46d)]=[],this['_balloonQueue']=[];},VisuMZ['CoreEngine'][_0x4396be(0x9ce)]=Scene_Base[_0x4396be(0x56f)][_0x4396be(0x9b4)],Scene_Base['prototype'][_0x4396be(0x9b4)]=function(){const _0x268fbf=_0x4396be;if($gameTemp)$gameTemp[_0x268fbf(0x8c3)]();VisuMZ[_0x268fbf(0x7c7)]['Scene_Base_terminateAnimationClearBugFix'][_0x268fbf(0x8ee)](this);},Bitmap[_0x4396be(0x56f)][_0x4396be(0x519)]=function(_0x340ad8){const _0xc8f07f=_0x4396be,_0x576260=this[_0xc8f07f(0x415)];_0x576260[_0xc8f07f(0x58d)](),_0x576260[_0xc8f07f(0x657)]=this[_0xc8f07f(0xd9)]();const _0x52c3c6=_0x576260[_0xc8f07f(0x38c)](_0x340ad8)[_0xc8f07f(0x67f)];return _0x576260[_0xc8f07f(0x832)](),_0x52c3c6;},Window_Message['prototype']['textWidth']=function(_0x274428){const _0x37b420=_0x4396be;return this[_0x37b420(0x355)]()?this[_0x37b420(0x275)][_0x37b420(0x519)](_0x274428):Window_Base[_0x37b420(0x56f)][_0x37b420(0x459)]['call'](this,_0x274428);},Window_Message[_0x4396be(0x56f)][_0x4396be(0x355)]=function(){const _0x4e96d4=_0x4396be;return VisuMZ['CoreEngine']['Settings'][_0x4e96d4(0x9e8)]['FontWidthFix']??!![];},VisuMZ[_0x4396be(0x7c7)][_0x4396be(0xf3)]=Game_Action[_0x4396be(0x56f)]['numRepeats'],Game_Action['prototype']['numRepeats']=function(){const _0x596ded=_0x4396be;if(this['item']()){if(_0x596ded(0x286)===_0x596ded(0x2f6))for(const _0x5e544a of _0x25ed36[_0x596ded(0x4e4)]){[0x6c,0x198]['includes'](_0x5e544a['code'])&&(_0xc343e9+='\x0a',_0x57ddf2+=_0x5e544a[_0x596ded(0x113)][0x0]);}else return VisuMZ['CoreEngine'][_0x596ded(0xf3)]['call'](this);}else return _0x596ded(0x944)===_0x596ded(0x3d0)?this['buttonAssistWindowSideRect']():0x0;},VisuMZ[_0x4396be(0x7c7)]['Game_Action_setAttack']=Game_Action[_0x4396be(0x56f)]['setAttack'],Game_Action['prototype']['setAttack']=function(){const _0x5ef578=_0x4396be;this[_0x5ef578(0xe4)]()&&this['subject']()[_0x5ef578(0x556)]()?'NxFip'!==_0x5ef578(0x8dc)?(this[_0x5ef578(0x6e1)]+=_0x4c240c[_0x5ef578(0xb9)]((_0x3f019d[_0x5ef578(0x21d)]-0x270)/0x2),this[_0x5ef578(0x6e1)]-=_0x5dbe19[_0x5ef578(0x346)]((_0x197e6d['height']-_0x1dc9cd['boxHeight'])/0x2),_0x4f518b[_0x5ef578(0x200)]()?this[_0x5ef578(0x65f)]-=_0x448d35[_0x5ef578(0x346)]((_0x205bf8['width']-_0x3da41d['boxWidth'])/0x2):this[_0x5ef578(0x65f)]+=_0x3cb69f['round']((_0x2e2ff2['boxWidth']-0x330)/0x2)):VisuMZ['CoreEngine'][_0x5ef578(0x6f7)][_0x5ef578(0x8ee)](this):this[_0x5ef578(0x7db)]();},Sprite_Name['prototype'][_0x4396be(0x8d7)]=function(){return 0x24;},Sprite_Name['prototype'][_0x4396be(0x6d3)]=function(){const _0x565792=_0x4396be,_0x4c71fe=this[_0x565792(0x862)](),_0x1de40c=this[_0x565792(0x886)](),_0x5bcd57=this[_0x565792(0x8d7)]();this[_0x565792(0x263)](),this[_0x565792(0x2e6)]['clear'](),this[_0x565792(0x2e6)][_0x565792(0x847)](_0x4c71fe,0x4,0x0,_0x1de40c-0xa,_0x5bcd57,_0x565792(0x9d7));},Bitmap['prototype'][_0x4396be(0x847)]=function(_0x407310,_0x456cb1,_0x5a27f6,_0xd20fa6,_0x4009ec,_0x2925be){const _0x45e9de=_0x4396be,_0x107626=this[_0x45e9de(0x415)],_0x281427=_0x107626[_0x45e9de(0x4c9)];_0xd20fa6=_0xd20fa6||0xffffffff;let _0x13b961=_0x456cb1,_0x5583a9=Math[_0x45e9de(0xb9)](_0x5a27f6+0x18/0x2+this[_0x45e9de(0x35f)]*0.35);if(_0x2925be==='center'){if(_0x45e9de(0x4a3)!==_0x45e9de(0x4a3)){if(_0x1bcbee[_0x45e9de(0x6a2)])return!![];if(_0x3da70d[_0x45e9de(0x425)])return!![];return![];}else _0x13b961+=_0xd20fa6/0x2;}_0x2925be==='right'&&(_0x45e9de(0xea)!=='wMPtq'?(this[_0x45e9de(0x671)](_0x368f36),this['centerSprite'](_0x49ba3f)):_0x13b961+=_0xd20fa6),_0x107626['save'](),_0x107626[_0x45e9de(0x657)]=this[_0x45e9de(0xd9)](),_0x107626[_0x45e9de(0x9f2)]=_0x2925be,_0x107626[_0x45e9de(0x186)]=_0x45e9de(0x677),_0x107626[_0x45e9de(0x4c9)]=0x1,this[_0x45e9de(0x9a6)](_0x407310,_0x13b961,_0x5583a9,_0xd20fa6),_0x107626[_0x45e9de(0x4c9)]=_0x281427,this['_drawTextBody'](_0x407310,_0x13b961,_0x5583a9,_0xd20fa6),_0x107626[_0x45e9de(0x832)](),this[_0x45e9de(0x7e3)][_0x45e9de(0x68b)]();},VisuMZ['CoreEngine'][_0x4396be(0x52d)]=BattleManager[_0x4396be(0x336)],BattleManager[_0x4396be(0x336)]=function(_0x179dce){const _0x5973b4=_0x4396be;if(this[_0x5973b4(0x240)][_0x5973b4(0x477)]())return![];return VisuMZ[_0x5973b4(0x7c7)][_0x5973b4(0x52d)]['call'](this,_0x179dce);},BattleManager[_0x4396be(0x239)]=function(){const _0x142a2d=_0x4396be;if(this[_0x142a2d(0x1f4)])this[_0x142a2d(0x7fe)][_0x142a2d(0x239)](this[_0x142a2d(0x1f4)]);this[_0x142a2d(0x975)]=_0x142a2d(0x356),this[_0x142a2d(0x1f4)]&&this[_0x142a2d(0x1f4)]['numActions']()===0x0&&(this[_0x142a2d(0x41c)](this[_0x142a2d(0x1f4)]),this[_0x142a2d(0x1f4)]=null);},Bitmap['prototype'][_0x4396be(0x5bb)]=function(){const _0x53acdb=_0x4396be;this[_0x53acdb(0x18f)]=new Image(),this['_image'][_0x53acdb(0x8e1)]=this[_0x53acdb(0x563)]['bind'](this),this[_0x53acdb(0x18f)][_0x53acdb(0x184)]=this['_onError'][_0x53acdb(0x7d9)](this),this[_0x53acdb(0x6ba)](),this['_loadingState']=_0x53acdb(0x30a);if(Utils[_0x53acdb(0x552)]())this[_0x53acdb(0x19e)]();else{if(_0x53acdb(0x3d8)!==_0x53acdb(0x103)){this['_image'][_0x53acdb(0x586)]=this[_0x53acdb(0x196)];if(![]&&this[_0x53acdb(0x18f)]['width']>0x0){if(_0x53acdb(0x6b1)!==_0x53acdb(0x6b1))return _0xec6165[_0x53acdb(0x83c)][_0x53acdb(0x8b3)][_0x53acdb(0x8ee)](this);else this['_image'][_0x53acdb(0x8e1)]=null,this[_0x53acdb(0x563)]();}}else _0x2c6a12=_0x185e63['round'](_0x48669b),_0xc11b1f=_0x140c15[_0x53acdb(0xb9)](_0x4c6ebd),_0x510442=_0x2cb5e8[_0x53acdb(0xb9)](_0x48466b),_0x13540c=_0x49244c[_0x53acdb(0xb9)](_0x33dcf7),_0x3bd12b=_0x4e8198[_0x53acdb(0xb9)](_0x5bcc3b),_0x4c3d4f=_0x3a5667['round'](_0x10a9d1),_0x44dc1a['CoreEngine'][_0x53acdb(0x4c1)]['call'](this,_0x2ef79b,_0x5b3266,_0x5d1eee,_0x4753f6,_0x4e75bb,_0x4bf8d5,_0x9383be,_0x3340ab,_0x248af0),this[_0x53acdb(0x166)]();}},Scene_Skill['prototype'][_0x4396be(0x5eb)]=function(){const _0x23cda3=_0x4396be;Scene_MenuBase[_0x23cda3(0x56f)][_0x23cda3(0x5eb)][_0x23cda3(0x8ee)](this),this[_0x23cda3(0x3e5)](),this['_itemWindow'][_0x23cda3(0x45b)](),this[_0x23cda3(0x69a)][_0x23cda3(0x534)](),this[_0x23cda3(0x5a7)][_0x23cda3(0x20c)]();},Scene_Skill[_0x4396be(0x56f)][_0x4396be(0x9a4)]=function(){const _0x1ed041=_0x4396be;return this['_skillTypeWindow']&&this[_0x1ed041(0x5a7)][_0x1ed041(0x417)];},Game_Map[_0x4396be(0x56f)][_0x4396be(0x482)]=function(_0x276798,_0x4c4444,_0x5e86df){const _0x39ec6b=_0x4396be,_0x21a9a0=this[_0x39ec6b(0x584)](),_0x2e354a=this['allTiles'](_0x276798,_0x4c4444);for(const _0xbcddc4 of _0x2e354a){if('ekhai'===_0x39ec6b(0x526))this[_0x39ec6b(0x685)]&&this[_0x39ec6b(0x685)][_0x39ec6b(0x8e4)](/VisuMZ CoreEngine PictureIcon (\d+)/i)?this['loadIconBitmap'](_0x2d710c(_0x1d9da4['$1'])):_0x2fe667[_0x39ec6b(0x7c7)][_0x39ec6b(0x4a7)][_0x39ec6b(0x8ee)](this);else{const _0x265c2b=_0x21a9a0[_0xbcddc4];if(_0x265c2b===undefined||_0x265c2b===null){if($gameTemp[_0x39ec6b(0x863)]()&&!DataManager[_0x39ec6b(0x655)]()){let _0x36d85f=_0x39ec6b(0x7b4)+'\x0a';_0x36d85f+=_0x39ec6b(0x5ba)+'\x0a',_0x36d85f+=_0x39ec6b(0xbe),this[_0x39ec6b(0x6b2)]()?(alert(_0x36d85f),SceneManager[_0x39ec6b(0x757)]()):(console[_0x39ec6b(0x6cd)](_0x36d85f),!$gameTemp[_0x39ec6b(0x6ea)]&&($gameTemp[_0x39ec6b(0x6ea)]=!![],SceneManager[_0x39ec6b(0x50e)]()));}}if((_0x265c2b&0x10)!==0x0)continue;if((_0x265c2b&_0x5e86df)===0x0)return!![];if((_0x265c2b&_0x5e86df)===_0x5e86df){if(_0x39ec6b(0x755)!==_0x39ec6b(0x3de))return![];else _0x5c7ac2[_0x39ec6b(0x7c7)][_0x39ec6b(0x513)]['call'](this),_0x3e19c8['isSideButtonLayout']()&&this['movePageButtonSideButtonLayout']();}}}return![];},Game_Map[_0x4396be(0x56f)][_0x4396be(0x6b2)]=function(){const _0x3815c5=_0x4396be;if(Imported[_0x3815c5(0x6a2)])return!![];if(Imported[_0x3815c5(0x425)])return!![];return![];},Sprite_Animation[_0x4396be(0x56f)]['saveViewport']=function(_0x202fda){const _0x2e883d=_0x4396be;!this[_0x2e883d(0x2b2)]&&('ZUtGJ'===_0x2e883d(0x82b)?this[_0x2e883d(0x2b2)]=_0x202fda['gl']['getParameter'](_0x202fda['gl'][_0x2e883d(0x3be)]):(_0x596a03[_0x2e883d(0x7c7)]['Scene_Equip_create'][_0x2e883d(0x8ee)](this),this[_0x2e883d(0x673)]()));},VisuMZ['CoreEngine']['Scene_Map_shouldAutosave']=Scene_Map['prototype'][_0x4396be(0x60c)],Scene_Map[_0x4396be(0x56f)][_0x4396be(0x60c)]=function(){const _0x454ef0=_0x4396be,_0x180cdd=SceneManager[_0x454ef0(0x6c4)][_0x454ef0(0x862)];if([_0x454ef0(0x603),_0x454ef0(0x7bf),_0x454ef0(0x804),_0x454ef0(0x875)][_0x454ef0(0x897)](_0x180cdd))return![];return VisuMZ[_0x454ef0(0x7c7)][_0x454ef0(0x4a8)]['call'](this);};