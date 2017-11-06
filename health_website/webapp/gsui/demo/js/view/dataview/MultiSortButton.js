Gsui.define('Demo.view.dataview.MultiSortButton', {
    extend: 'Gsui.button.Button',
    xtype: 'dataview-multisort-sortbutton',

    config: {
        direction: "ASC",
        dataIndex: undefined
    },

    /**
     * @event changeDirection
     * Fired whenever the user clicks this button to change its direction
     * @param {String} direction The new direction (ASC or DESC)
     */
    handler: function() {
        this.toggleDirection();
    },

    /**
     * Updates the new direction of this button
     * @param {String} direction The new direction
     */
    updateDirection: function(direction) {
        this.setIconCls('sort-direction-' + direction.toLowerCase());
        this.fireEvent('changeDirection', this.getDirection());
    },

    /**
     * Toggles between ASC and DESC directions
     */
    toggleDirection: function() {
        this.setDirection(Gsui.String.toggle(this.getDirection(), "ASC", "DESC"));
    }
});
