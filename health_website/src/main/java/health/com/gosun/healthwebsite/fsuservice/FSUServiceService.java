/**
 * FSUServiceService.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package com.gosun.healthwebsite.fsuservice;

public interface FSUServiceService extends javax.xml.rpc.Service {
    public java.lang.String getFSUServiceAddress();

    public com.gosun.healthwebsite.fsuservice.FSUService getFSUService() throws javax.xml.rpc.ServiceException;

    public com.gosun.healthwebsite.fsuservice.FSUService getFSUService(java.net.URL portAddress) throws javax.xml.rpc.ServiceException;
}
