package com.gosun.example.entity;

import java.util.List;

import net.sf.json.JSONObject;

/**
 * 树的实体类
 * @author liuxg
 * @date 2015年6月13日 上午9:38:28
 */
public class TreeNode {

	private Integer id;                         //节点id    
	private String name;                        //节点名称
	private String nodeType;                    //节点类型
	private String iconSkin;                    //icon的皮肤，对应ztree图标的className
	private boolean open = false;              //是否展开
	private boolean checked = false ;            //是否选中
	private List<TreeNode> children;            //孩子节点
	private JSONObject attributes;              //一些拓展字段	
	
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getNodeType() {
		return nodeType;
	}
	public void setNodeType(String nodeType) {
		this.nodeType = nodeType;
	}
	public String getIconSkin() {
		return iconSkin;
	}
	public void setIconSkin(String iconSkin) {
		this.iconSkin = iconSkin;
	}
	
	public JSONObject getAttributes() {
		return attributes;
	}
	public void setAttributes(JSONObject attributes) {
		this.attributes = attributes;
	}
	
	public List<TreeNode> getChildren() {
		return children;
	}
	public void setChildren(List<TreeNode> children) {
		this.children = children;
	}
	public boolean isOpen() {
		return open;
	}
	public void setOpen(boolean open) {
		this.open = open;
	}
	public boolean isChecked() {
		return checked;
	}
	public void setChecked(boolean checked) {
		this.checked = checked;
	}
	
}
