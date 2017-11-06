/**
 * FSUServiceServiceLocator.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package com.gosun.healthwebsite.fsuservice;

public class FSUServiceServiceLocator extends org.apache.axis.client.Service implements com.gosun.healthwebsite.fsuservice.FSUServiceService {

    public FSUServiceServiceLocator() {
    }


    public FSUServiceServiceLocator(org.apache.axis.EngineConfiguration config) {
        super(config);
    }

    public FSUServiceServiceLocator(java.lang.String wsdlLoc, javax.xml.namespace.QName sName) throws javax.xml.rpc.ServiceException {
        super(wsdlLoc, sName);
    }

    // Use to get a proxy class for FSUService
    private java.lang.String FSUService_address = "http://127.0.0.1:8080/services/FSUService";

    public java.lang.String getFSUServiceAddress() {
        return FSUService_address;
    }

    // The WSDD service name defaults to the port name.
    private java.lang.String FSUServiceWSDDServiceName = "FSUService";

    public java.lang.String getFSUServiceWSDDServiceName() {
        return FSUServiceWSDDServiceName;
    }

    public void setFSUServiceWSDDServiceName(java.lang.String name) {
        FSUServiceWSDDServiceName = name;
    }

    public com.gosun.healthwebsite.fsuservice.FSUService getFSUService() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(FSUService_address);
        }
        catch (java.net.MalformedURLException e) {
            throw new javax.xml.rpc.ServiceException(e);
        }
        return getFSUService(endpoint);
    }

    public com.gosun.healthwebsite.fsuservice.FSUService getFSUService(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            com.gosun.healthwebsite.fsuservice.FSUServiceSoapBindingStub _stub = new com.gosun.healthwebsite.fsuservice.FSUServiceSoapBindingStub(portAddress, this);
            _stub.setPortName(getFSUServiceWSDDServiceName());
            return _stub;
        }
        catch (org.apache.axis.AxisFault e) {
            return null;
        }
    }

    public void setFSUServiceEndpointAddress(java.lang.String address) {
        FSUService_address = address;
    }

    /**
     * For the given interface, get the stub implementation.
     * If this service has no port for the given interface,
     * then ServiceException is thrown.
     */
    public java.rmi.Remote getPort(Class serviceEndpointInterface) throws javax.xml.rpc.ServiceException {
        try {
            if (com.gosun.healthwebsite.fsuservice.FSUService.class.isAssignableFrom(serviceEndpointInterface)) {
                com.gosun.healthwebsite.fsuservice.FSUServiceSoapBindingStub _stub = new com.gosun.healthwebsite.fsuservice.FSUServiceSoapBindingStub(new java.net.URL(FSUService_address), this);
                _stub.setPortName(getFSUServiceWSDDServiceName());
                return _stub;
            }
        }
        catch (java.lang.Throwable t) {
            throw new javax.xml.rpc.ServiceException(t);
        }
        throw new javax.xml.rpc.ServiceException("There is no stub implementation for the interface:  " + (serviceEndpointInterface == null ? "null" : serviceEndpointInterface.getName()));
    }

    /**
     * For the given interface, get the stub implementation.
     * If this service has no port for the given interface,
     * then ServiceException is thrown.
     */
    public java.rmi.Remote getPort(javax.xml.namespace.QName portName, Class serviceEndpointInterface) throws javax.xml.rpc.ServiceException {
        if (portName == null) {
            return getPort(serviceEndpointInterface);
        }
        java.lang.String inputPortName = portName.getLocalPart();
        if ("FSUService".equals(inputPortName)) {
            return getFSUService();
        }
        else  {
            java.rmi.Remote _stub = getPort(serviceEndpointInterface);
            ((org.apache.axis.client.Stub) _stub).setPortName(portName);
            return _stub;
        }
    }

    public javax.xml.namespace.QName getServiceName() {
        return new javax.xml.namespace.QName("http://FSUService.chinatowercom.com", "FSUServiceService");
    }

    private java.util.HashSet ports = null;

    public java.util.Iterator getPorts() {
        if (ports == null) {
            ports = new java.util.HashSet();
            ports.add(new javax.xml.namespace.QName("http://FSUService.chinatowercom.com", "FSUService"));
        }
        return ports.iterator();
    }

    /**
    * Set the endpoint address for the specified port name.
    */
    public void setEndpointAddress(java.lang.String portName, java.lang.String address) throws javax.xml.rpc.ServiceException {
        
if ("FSUService".equals(portName)) {
            setFSUServiceEndpointAddress(address);
        }
        else 
{ // Unknown Port Name
            throw new javax.xml.rpc.ServiceException(" Cannot set Endpoint Address for Unknown Port" + portName);
        }
    }

    /**
    * Set the endpoint address for the specified port name.
    */
    public void setEndpointAddress(javax.xml.namespace.QName portName, java.lang.String address) throws javax.xml.rpc.ServiceException {
        setEndpointAddress(portName.getLocalPart(), address);
    }

}
