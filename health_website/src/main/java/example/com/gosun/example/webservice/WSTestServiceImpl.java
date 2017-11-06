package com.gosun.example.webservice;

import javax.jws.WebService;
import javax.jws.soap.SOAPBinding;
import javax.jws.soap.SOAPBinding.Style;

@WebService
@SOAPBinding(style=Style.RPC)
public class WSTestServiceImpl implements IWSTestService {

	public String doTest(String testStr) {
		// TODO Auto-generated method stub
		return "hello doTest -> " + testStr;
	}

}
