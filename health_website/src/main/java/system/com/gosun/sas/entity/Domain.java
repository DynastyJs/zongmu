package com.gosun.sas.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
import org.hibernate.annotations.Where;

/**
 * 用户登录记录实体
 * 
 * 使用Hibernate annotation定义二级缓存.
 * 
 * @author abe
 */
//JPA标识
@Entity
//表名与类名不相同时重新定义表名.
@Table(name = "TB_DOMAINMAP")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@Where(clause = "IS_DEL = 0")
public class Domain  implements Serializable{
	

	
	/**
	 * 
	 */
	private static final long serialVersionUID = -6216980274678558620L;


	private Long id;
	
	private Long parentId;
	
	private String name;
	
	private String children;
	
	private String type = "DOMAIN"; 
	
	private String iconSkin = "DOMAIN";
	
	private Domain parent;
	
	private Long isPlatform;
	
	@Id
	@Column(name="DOMAIN_ID")
	@GeneratedValue
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Column(name="PARENT_ID")
	public Long getParentId() {
		return parentId;
	}

	public void setParentId(Long parentId) {
		this.parentId = parentId;
	}
	
    @ManyToOne
    @JoinColumn(name = "PARENT_ID",referencedColumnName="DOMAIN_ID",insertable=false,updatable=false)
    @NotFound(action=NotFoundAction.IGNORE)
    public Domain getParent() {
        return parent;
    }
    public void setParent(Domain parent) {
        this.parent = parent;
    }

	@Column(name="DOMAIN_NAME")
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	
	@Column(name="IS_PLATFORM")
	public Long getIsPlatform() {
		return isPlatform;
	}

	public void setIsPlatform(Long isPlatform) {
		this.isPlatform = isPlatform;
	}

	@Transient
	public String getChildren() {
		return children;
	}

	public void setChildren(String children) {
		this.children = children;
	}

	@Transient
	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	@Transient
	public String getIconSkin() {
		return iconSkin;
	}

	public void setIconSkin(String iconSkin) {
		this.iconSkin = iconSkin;
	}
	
	
	
}