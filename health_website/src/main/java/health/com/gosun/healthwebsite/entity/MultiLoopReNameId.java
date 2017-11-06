/** 
*
*/
package com.gosun.healthwebsite.entity;

import javax.persistence.Column;
import javax.persistence.Embeddable;

/** 
 * @ClassName: MultiLoopReNameId 
 * @Description: TODO 
 * @author linnan
 * @date 2017年7月5日 下午5:09:15  
 */
@Embeddable
public class MultiLoopReNameId implements java.io.Serializable{

	private static final long serialVersionUID = -1647543566104522678L;

	private Long equipmentId;
	private Long orderNo;
	
	public MultiLoopReNameId(){
		
	}

	public MultiLoopReNameId(Long equipmentId, Long orderNo) {
		super();
		this.equipmentId = equipmentId;
		this.orderNo = orderNo;
	}
	
	@Column(name = "EQUIPMENT_ID", nullable = false, precision = 10, scale = 0)
	public Long getEquipmentId() {
		return equipmentId;
	}
	public void setEquipmentId(Long equipmentId) {
		this.equipmentId = equipmentId;
	}
	@Column(name = "ORDER_NO", nullable = false, precision = 10, scale = 0)
	public Long getOrderNo() {
		return orderNo;
	}
	public void setOrderNo(Long orderNo) {
		this.orderNo = orderNo;
	}
	
	public boolean equals(Object other) {
		if ((this == other))
			return true;
		if ((other == null))
			return false;
		if (!(other instanceof BizEquipmentStatusId))
			return false;
		MultiLoopReNameId castOther = (MultiLoopReNameId) other;

		return (this.getEquipmentId() == castOther.getEquipmentId())
				&& ((this.getOrderNo() == castOther.getOrderNo())
						|| (this.getOrderNo() != null && castOther.getOrderNo() != null
								&& this.getOrderNo().equals(castOther.getOrderNo())));
	}

	public int hashCode() {
		int result = 17;

		result = result + this.getEquipmentId().intValue();
		result = result + (getOrderNo() == null ? 0 : this.getOrderNo().hashCode());
		return result;
	}
}
