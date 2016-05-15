'use strict';

/**
 * @ngdoc service
 * @name geeGeeApp.GameSound
 * @description
 * # GameSound
 * Factory in the geeGeeApp.
 */
angular.module('geeGeeApp')
    .factory('GameSound', function () {
        
        const soundFiles = [
            "sounds/start.wav",
            "sounds/right_select.wav",
            "sounds/wrong_select.wav",
            "sound/game_win.wav"
        ];

        this.loadedSounds = undefined;

        /**
         * @ngdoc method
         * @name init
         * @description
         * Load sound files
         */
        this.init = function () {
            sounds.load(soundFiles);
            
            var self = this;

            sounds.whenLoaded = function () {
                self.loadedSounds = {
                    gameStart: sounds["sounds/start.wav"],
                    rightSelection: sounds["sounds/right_select.wav"],
                    wrongSelection: sounds["sounds/wrong_select.wav"],
                    gameWin: sounds["sounds/game_win.wav"]
                }
            };
        };

        /**
         * @ngdoc method
         * @name play
         * @description
         * Play the specified sound
         */
        this.play = function (sound) {
            if (!sound)
                return;

            sound.play();
        }

        /**
         * @ngdoc method
         * @name gameStart
         * @description
         * Play the game start sound
         */
        this.gameStart = function () {
            this.play(loadedSounds.gameStart);
        };

        this.wrongSelection = function () {
            this.play(loadedSounds.wrongSelection);
        };

        this.rightSelection = function () {
            // In questo caso on riprodurre un file ma genera un suono
            soundEffect(587.33, 0, 0.2, "square", 1, 0, 0);
            soundEffect(880, 0, 0.2, "square", 1, 0, 0.1);
            soundEffect(1174.66, 0, 0.3, "square", 1, 0, 0.2);
        };

        this.gameWin = function () {
            this.play(loadedSounds.gameWin);
        };

        // Init the factory
        this.init();

        return this;
    });
