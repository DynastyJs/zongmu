/** 
*
*/
package com.gosun.healthwebsite.entity;

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

/** 
 * @ClassName: MultiLoopReName 
 * @Description: TODO 
 * @author linnan
 * @date 2017年7月5日 下午4:45:08  
 */
@Entity
@Table(name = "MULTILOOP_RENAME", schema = "HEALTH")
public class MultiLoopReName implements java.io.Serializable {

	private static final long serialVersionUID = 1647945855118973945L;

	private MultiLoopReNameId multiLoopReNameId;
	private String name;
	
	@EmbeddedId
	@AttributeOverrides({
			@AttributeOverride(name = "equipmentId", column = @Column(name = "EQUIPMENT_ID", nullable = false, precision = 10, scale = 0)),
			@AttributeOverride(name = "orderNo", column = @Column(name = "ORDER_NO", nullable = false, precision = 10, scale = 0)) })
	public MultiLoopReNameId getMultiLoopReNameId() {
		return multiLoopReNameId;
	}
	public void setMultiLoopReNameId(MultiLoopReNameId multiLoopReNameId) {
		this.multiLoopReNameId = multiLoopReNameId;
	}
	@Column(name = "NAME")
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	
}
