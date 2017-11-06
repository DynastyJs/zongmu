package com.gosun.healthwebsite.entity;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by whoszus on 2016/7/28.
 *
 * @email whoszus@yahoo.com
 */
@Entity
@Table(name = "BIZ_FOCUS_REPAIR", schema = "HEALTH", catalog = "")
public class BizFocusRepair implements Serializable{
    private static final long serialVersionUID = 1L;
    private Long id;
    private Long equipmentId;
    private String propertyName;
    private String type;
    private String focusFlag;
    private String repairFlag;

    @Id
    @SequenceGenerator(name="SEQ_BIZ_FOCUS_REPAIR", sequenceName="SEQ_BIZ_FOCUS_REPAIR")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_BIZ_FOCUS_REPAIR")
    @Column(name = "ID")
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Basic
    @Column(name = "EQUIPMENT_ID")
    public Long getEquipmentId() {
        return equipmentId;
    }

    public void setEquipmentId(Long equipmentId) {
        this.equipmentId = equipmentId;
    }

    @Basic
    @Column(name = "EQUIPMENT_PROPERTY_NAME")
    public String getPropertyName() {
        return propertyName;
    }

    public void setPropertyName(String propertyName) {
        this.propertyName = propertyName;
    }

    @Basic
    @Column(name = "TYPE")
    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Basic
    @Column(name = "FOCUS_FLAG")
    public String getFocusFlag() {
        return focusFlag;
    }

    public void setFocusFlag(String focusFlag) {
        this.focusFlag = focusFlag;
    }

    @Basic
    @Column(name = "REPAIR_FLAG")
    public String getRepairFlag() {
        return repairFlag;
    }

    public void setRepairFlag(String repairFlag) {
        this.repairFlag = repairFlag;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        BizFocusRepair that = (BizFocusRepair) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (equipmentId != null ? !equipmentId.equals(that.equipmentId) : that.equipmentId != null) return false;
        if (propertyName != null ? !propertyName.equals(that.propertyName) : that.propertyName != null)
            return false;
        if (type != null ? !type.equals(that.type) : that.type != null) return false;
        if (focusFlag != null ? !focusFlag.equals(that.focusFlag) : that.focusFlag != null) return false;
        if (repairFlag != null ? !repairFlag.equals(that.repairFlag) : that.repairFlag != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (equipmentId != null ? equipmentId.hashCode() : 0);
        result = 31 * result + (propertyName != null ? propertyName.hashCode() : 0);
        result = 31 * result + (type != null ? type.hashCode() : 0);
        result = 31 * result + (focusFlag != null ? focusFlag.hashCode() : 0);
        result = 31 * result + (repairFlag != null ? repairFlag.hashCode() : 0);
        return result;
    }
}
