package com.gosun.healthwebsite.webservice;

import javax.jws.WebParam;
import javax.jws.WebService;
import javax.jws.soap.SOAPBinding;
import javax.jws.soap.SOAPBinding.Style;

/**
 * 
 * @author lwh
 *
 */
@WebService
@SOAPBinding(style = Style.RPC)
public interface IWSTestService {
	
	public String invoke(@WebParam(name="xml")String xml);
	
}
