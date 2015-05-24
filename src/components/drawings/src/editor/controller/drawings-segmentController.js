/**
 * Segment controller.
 */

Drawings.SegmentController = function (model) {
    this.model = model;
};

Drawings.SegmentController.prototype = {

    handleContextMenuEvent: function (jxgSegment, event) {
        var segment = this.model.getShape(jxgSegment.id);

        var controller = this;

        var contextMenu = new Drawings.ContextMenu('#' + jxgSegment.rendNode.id, event);

        var setLengthMenuItem = {
            text: 'Задать длину',
            action: function () {
                controller._setLengthAction(segment);
            }
        };

        contextMenu.show([setLengthMenuItem]);
    },

    handleContextDefinitionMenuEvent: function (event){

        var contextDefinitionMenu = new Drawings.ContextMenu('#' + 'segmentDefinition', event);
        var setDefinitionMenuItem = {
            text: 'Просмотр определения',
            action: function(){
                window.sctpClient.get_link_content(3914661889,'string').done(function(content)
                {

                    $('#textArea').val(content);
                });
            }
        }
        contextDefinitionMenu.show([setDefinitionMenuItem]);
    },

    _setLengthAction: function (segment) {
        var length = prompt('Введите длину отрезка:');

        if (length != null) {
            segment.setLength(length);
            this.model.updated([segment]);
        }
    }
};