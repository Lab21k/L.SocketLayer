"use strict";

L.SocketLayer = L.GeoJSON.extend({

    initialize: function(data, options) {

        L.Util.setOptions(this, options);

        this.socket = io(options.socketHost);
        this._layers = {};


        if (options.channel) {
            var self = this;
            this.socket.on(options.channel, function() {
                self.options.updateLayers()
                    .then(function(data) {
                        self.clearLayers();
                        self.addData(data);
                    });
            });
        }

        if (data) {
            this.addData(data);
        }
    }
});

L.socketLayer = function(data, options) {
    return new L.SocketLayer(data, options);
};
