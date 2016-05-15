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
            "sounds/start.mp3"
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
            soundEffect(523.25, 0.05, 0.2, "sine", 3, 0.8, 0, 600, true, 100, 0);
        };

        this.rightSelection = function () {
            // In questo caso on riprodurre un file ma genera un suono
            soundEffect(587.33, 0, 0.2, "square", 1, 0, 0);
            soundEffect(880, 0, 0.2, "square", 1, 0, 0.1);
            soundEffect(1174.66, 0, 0.3, "square", 1, 0, 0.2);
        };

        this.gameWin = function () {
            // TODO: find sound or effect
        };

        // Init the factory
        this.init();

        return this;
    });
