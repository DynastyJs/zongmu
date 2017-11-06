package com.gosun.healthwebsite.webservice;

import javax.jws.WebService;
import javax.jws.soap.SOAPBinding;
import javax.jws.soap.SOAPBinding.Style;

@WebService
@SOAPBinding(style=Style.RPC)
public class WSTestServiceImpl implements IWSTestService {

	public String invoke(String xml) {
		// TODO Auto-generated method stub
		return xml;
	}

}
