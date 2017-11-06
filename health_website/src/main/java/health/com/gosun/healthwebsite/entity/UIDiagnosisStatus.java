package com.gosun.healthwebsite.entity;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * Created by whoszus on 2016/8/3.
 *
 * @email whoszus@yahoo.com
 */
@Entity
@javax.persistence.Table(name = "VIEW_UI_DIAGNOSIS_STATUS", schema = "HEALTH", catalog = "")
public class UIDiagnosisStatus {
    private Long dataId;
    private String pathName;
    private String path;
    private String focusFlag;
    private String equipmentName;
    private Long nosignal;
    private String chnnName;
//    private Long dark;
    private Long bright;
    private Long color;
    private Long snow;
    private Long roll;
    private Long freeze;
    private Long shake;
    private Long covered;
    private Long fuzzy;
    private Long contrast;
    private String repairFlag;
    private String isMask;
    private String producer;
    private String moduleName;
    private String netAddress;
    private String move;
    private String chnnCode;
    private String dvsCode;
    private String dvsEquipmentId;
    private String chnnEquipmentId;



    @Id
    @Column(name = "DATA_ID",  insertable = true, updatable = true, precision = -127)
    public Long getDataId() {
        return dataId;
    }
    public void setDataId(Long dataId) {
        this.dataId = dataId;
    }

    @Basic
    @javax.persistence.Column(name = "FOCUS_FLAG", nullable = true, insertable = true, updatable = true, length = 1)
    public String getFocusFlag() {
        return focusFlag;
    }

    public void setFocusFlag(String focusFlag) {
        this.focusFlag = focusFlag;
    }

    @Basic
    @javax.persistence.Column(name = "EQUIPMENT_NAME", nullable = true, insertable = true, updatable = true)
    public String getEquipmentName() {
        return equipmentName;
    }

    public void setEquipmentName(String equipmentName) {
        this.equipmentName = equipmentName;
    }

    @Basic
    @javax.persistence.Column(name = "CHNN_NAME", nullable = false, insertable = true, updatable = true)
    public String getChnnName() {
        return chnnName;
    }

    public void setChnnName(String chnnName) {
        this.chnnName = chnnName;
    }

    @Basic
    @javax.persistence.Column(name = "NOSIGNAL", nullable = true, insertable = true, updatable = true, precision = -127)
    public Long getNosignal() {
        return nosignal;
    }

    public void setNosignal(Long nosignal) {
        this.nosignal = nosignal;
    }



    @Basic
    @javax.persistence.Column(name = "BRIGHT", nullable = true, insertable = true, updatable = true, precision = -127)
    public Long getBright() {
        return bright;
    }

    public void setBright(Long bright) {
        this.bright = bright;
    }

    @Basic
    @javax.persistence.Column(name = "COLOR", nullable = true, insertable = true, updatable = true, precision = -127)
    public Long getColor() {
        return color;
    }

    public void setColor(Long color) {
        this.color = color;
    }

    @Basic
    @javax.persistence.Column(name = "SNOW", nullable = true, insertable = true, updatable = true, precision = -127)
    public Long getSnow() {
        return snow;
    }

    public void setSnow(Long snow) {
        this.snow = snow;
    }
    @Basic
    @javax.persistence.Column(name = "ROLL", nullable = true, insertable = true, updatable = true, precision = -127)
    public Long getRoll() {
        return roll;
    }

    public void setRoll(Long roll) {
        this.roll = roll;
    }



    @Basic
    @javax.persistence.Column(name = "FREEZE", nullable = true, insertable = true, updatable = true, precision = -127)
    public Long getFreeze() {
        return freeze;
    }

    public void setFreeze(Long freeze) {
        this.freeze = freeze;
    }



    @Basic
    @javax.persistence.Column(name = "SHAKE", nullable = true, insertable = true, updatable = true, precision = -127)
    public Long getShake() {
        return shake;
    }

    public void setShake(Long shake) {
        this.shake = shake;
    }



    @Basic
    @javax.persistence.Column(name = "COVERED", nullable = true, insertable = true, updatable = true, precision = -127)
    public Long getCovered() {
        return covered;
    }

    public void setCovered(Long covered) {
        this.covered = covered;
    }



    @Basic
    @javax.persistence.Column(name = "FUZZY", nullable = true, insertable = true, updatable = true, precision = -127)
    public Long getFuzzy() {
        return fuzzy;
    }

    public void setFuzzy(Long fuzzy) {
        this.fuzzy = fuzzy;
    }
    
    


    @Column(name="CONTRAST")
    public Long getContrast() {
		return contrast;
	}
	public void setContrast(Long contrast) {
		this.contrast = contrast;
	}
	
	@Basic
    @javax.persistence.Column(name = "REPAIR_FLAG", nullable = true, insertable = true, updatable = true, length = 1)
    public String getRepairFlag() {
        return repairFlag;
    }

    public void setRepairFlag(String repairFlag) {
        this.repairFlag = repairFlag;
    }



    @Basic
    @javax.persistence.Column(name = "IS_MASK", nullable = true, insertable = true, updatable = true, length = 1)
    public String getIsMask() {
        return isMask;
    }

    public void setIsMask(String isMask) {
        this.isMask = isMask;
    }



    @Basic
    @javax.persistence.Column(name = "PRODUCER", nullable = true, insertable = true, updatable = true)
    public String getProducer() {
        return producer;
    }

    public void setProducer(String producer) {
        this.producer = producer;
    }



    @Basic
    @javax.persistence.Column(name = "MODULE_NAME", nullable = true, insertable = true, updatable = true)
    public String getModuleName() {
        return moduleName;
    }

    public void setModuleName(String moduleName) {
        this.moduleName = moduleName;
    }


    @Basic
    @javax.persistence.Column(name = "NET_ADDRESS", nullable = true, insertable = true, updatable = true)
    public String getNetAddress() {
        return netAddress;
    }

    public void setNetAddress(String netAddress) {
        this.netAddress = netAddress;
    }

    @Column(name = "PATH_NAME")
    public String getPathName() {
        return pathName;
    }

    public void setPathName(String pathName) {
        this.pathName = pathName;
    }

    @Column(name = "PATH")
    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    @Column(name = "MOVE")
    public String getMove() {
        return move;
    }

    public void setMove(String move) {
        this.move = move;
    }

    @Column(name = "CHNN_CODE")
    public String getChnnCode() {
        return chnnCode;
    }

    public void setChnnCode(String chnnCode) {
        this.chnnCode = chnnCode;
    }
    @Column(name = "DVSCODE")
    public String getDvsCode() {
        return dvsCode;
    }

    public void setDvsCode(String dvsCode) {
        this.dvsCode = dvsCode;
    }

    @Column(name = "DVS_EQUIPMENT_ID")
    public String getDvsEquipmentId() {
        return dvsEquipmentId;
    }

    public void setDvsEquipmentId(String dvsEquipmentId) {
        this.dvsEquipmentId = dvsEquipmentId;
    }
    
    @Column(name = "CHNN_EQUIPMENT_ID")
    public String getChnnEquipmentId() {
		return chnnEquipmentId;
	}
	public void setChnnEquipmentId(String chnnEquipmentId) {
		this.chnnEquipmentId = chnnEquipmentId;
	}
	
	@Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        UIDiagnosisStatus that = (UIDiagnosisStatus) o;

        if (dataId != null ? !dataId.equals(that.dataId) : that.dataId != null) return false;
        if (focusFlag != null ? !focusFlag.equals(that.focusFlag) : that.focusFlag != null) return false;
        if (equipmentName != null ? !equipmentName.equals(that.equipmentName) : that.equipmentName != null)
            return false;
        if (chnnName != null ? !chnnName.equals(that.chnnName) : that.chnnName != null) return false;
        if (nosignal != null ? !nosignal.equals(that.nosignal) : that.nosignal != null) return false;
        if (bright != null ? !bright.equals(that.bright) : that.bright != null) return false;
        if (color != null ? !color.equals(that.color) : that.color != null) return false;
        if (snow != null ? !snow.equals(that.snow) : that.snow != null) return false;
        if (roll != null ? !roll.equals(that.roll) : that.roll != null) return false;
        if (freeze != null ? !freeze.equals(that.freeze) : that.freeze != null) return false;
        if (shake != null ? !shake.equals(that.shake) : that.shake != null) return false;
        if (covered != null ? !covered.equals(that.covered) : that.covered != null) return false;
        if (fuzzy != null ? !fuzzy.equals(that.fuzzy) : that.fuzzy != null) return false;
        if (repairFlag != null ? !repairFlag.equals(that.repairFlag) : that.repairFlag != null) return false;
        if (isMask != null ? !isMask.equals(that.isMask) : that.isMask != null) return false;
        if (producer != null ? !producer.equals(that.producer) : that.producer != null) return false;
        if (moduleName != null ? !moduleName.equals(that.moduleName) : that.moduleName != null) return false;
        if (netAddress != null ? !netAddress.equals(that.netAddress) : that.netAddress != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = dataId != null ? dataId.hashCode() : 0;
        result = 31 * result + (focusFlag != null ? focusFlag.hashCode() : 0);
        result = 31 * result + (equipmentName != null ? equipmentName.hashCode() : 0);
        result = 31 * result + (chnnName != null ? chnnName.hashCode() : 0);
        result = 31 * result + (nosignal != null ? nosignal.hashCode() : 0);
        result = 31 * result + (bright != null ? bright.hashCode() : 0);
        result = 31 * result + (color != null ? color.hashCode() : 0);
        result = 31 * result + (snow != null ? snow.hashCode() : 0);
        result = 31 * result + (roll != null ? roll.hashCode() : 0);
        result = 31 * result + (freeze != null ? freeze.hashCode() : 0);
        result = 31 * result + (shake != null ? shake.hashCode() : 0);
        result = 31 * result + (covered != null ? covered.hashCode() : 0);
        result = 31 * result + (fuzzy != null ? fuzzy.hashCode() : 0);
        result = 31 * result + (repairFlag != null ? repairFlag.hashCode() : 0);
        result = 31 * result + (isMask != null ? isMask.hashCode() : 0);
        result = 31 * result + (producer != null ? producer.hashCode() : 0);
        result = 31 * result + (moduleName != null ? moduleName.hashCode() : 0);
        result = 31 * result + (netAddress != null ? netAddress.hashCode() : 0);
        return result;
    }
}
