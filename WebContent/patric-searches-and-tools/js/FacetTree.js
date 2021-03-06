/**
 * data model
 */
Ext.define('Ext.ux.facettree.Model', {
	extend : 'Ext.data.Model',
	fields : [{
		name : 'id',
		type : 'int'
	}, {
		name : 'name',
		type : 'string'
	}, {
		name : 'checked',
		type : 'boolean',
		defaultValue : false
	}, {
		name : 'iconCls',
		type : 'string',
		defaultValue : 'x-tree-noicon'
	}, {
		name : 'leaf',
		type : 'boolean'
	}]
});


/**
 * tree column
 */
Ext.define('Ext.ux.facettree.Column', {
  extend : 'Ext.grid.column.Column',
  alias : 'widget.facettreecolumn',

  tdCls: Ext.baseCSSPrefix + 'grid-cell-treecolumn',

  autoLock: true,
  lockable: false,
  draggable: false,
  hideable: false,

  iconCls: Ext.baseCSSPrefix + 'tree-icon',
  checkboxCls: Ext.baseCSSPrefix + 'tree-checkbox',
  elbowCls: Ext.baseCSSPrefix + 'tree-elbow',
  expanderCls: Ext.baseCSSPrefix + 'tree-expander',
  textCls: Ext.baseCSSPrefix + 'tree-node-text',
  innerCls: Ext.baseCSSPrefix + 'grid-cell-inner-treecolumn',
  isTreeColumn: true,

  cellTpl: [
      '<tpl for="lines">',
          '<img src="{parent.blankUrl}" class="{parent.childCls} {parent.elbowCls}-img ',
          '{parent.elbowCls}-<tpl if=".">line<tpl else>empty</tpl>"/>',
      '</tpl>',
/*      '<img src="{blankUrl}" class="{childCls} {elbowCls}-img {elbowCls}',
          '<tpl if="isLast">-end</tpl><tpl if="expandable">-plus {expanderCls}</tpl>"/>',*/
  '<tpl if="record.raw.renderstep == 2">',
      '<tpl if="checked !== null">',
          '<input type="button" role="checkbox" <tpl if="checked">aria-checked="true" </tpl>',
              'class="{childCls} {checkboxCls}<tpl if="checked"> {checkboxCls}-checked</tpl>"/>',
      '</tpl>',
  '</tpl>',
      '<img src="{blankUrl}" class="{childCls} {baseIconCls} ',
          '{baseIconCls}-<tpl if="leaf">leaf<tpl else>parent</tpl> {iconCls}"',
          '<tpl if="icon">style="background-image:url({icon})"</tpl>/>',
      '<tpl if="href">',
          '<a href="{href}" target="{hrefTarget}" class="{textCls} {childCls}">{value}</a>',
      '<tpl else>',
          '<span class="{textCls} {childCls}">{value}</span>',
      '</tpl>'
  ],

  initComponent: function() {
      var me = this;

      me.origRenderer = me.renderer;
      me.origScope = me.scope || window;

      me.renderer = me.treeRenderer;
      me.scope = me;

      me.callParent();
  },

  treeRenderer: function(value, metaData, record, rowIdx, colIdx, store, view){
      var me = this,
          cls = record.get('cls'),
          renderer = me.origRenderer,
          data = record.data,
          parent = record.parentNode,
          rootVisible = view.rootVisible,
          lines = [],
          parentData;

      if (cls) {
          metaData.tdCls += ' ' + cls;
      }

      while (parent && (rootVisible || parent.data.depth > 0)) {
          parentData = parent.data;
          lines[rootVisible ? parentData.depth : parentData.depth - 1] =
                  parentData.isLast ? 0 : 1;
          parent = parent.parentNode;
      }

      return me.getTpl('cellTpl').apply({
          record: record,
          baseIconCls: me.iconCls,
          iconCls: data.iconCls,
          icon: data.icon,
          checkboxCls: me.checkboxCls,
          checked: data.checked,
          elbowCls: me.elbowCls,
          expanderCls: me.expanderCls,
          textCls: me.textCls,
          leaf: data.leaf,
          expandable: record.isExpandable(),
          isLast: data.isLast,
          blankUrl: Ext.BLANK_IMAGE_URL,
          href: data.href,
          hrefTarget: data.hrefTarget,
          lines: lines,
          metaData: metaData,
          // subclasses or overrides can implement a getChildCls() method, which can
          // return an extra class to add to all of the cell's child elements (icon,
          // expander, elbow, checkbox).  This is used by the rtl override to add the
          // "x-rtl" class to these elements.
          childCls: me.getChildCls ? me.getChildCls() + ' ' : '',
          value: renderer ? renderer.apply(me.origScope, arguments) : value
      });
  }
});
