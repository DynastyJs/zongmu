package com.gosun.healthwebsite.fsuservice;
import java.io.IOException;
import java.net.URL;
import java.util.Iterator;
import java.util.List;

import org.apache.axis.client.Service;
import org.dom4j.Attribute;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;



public class TestFSUServiceMain {

	public static void main(String[] args) throws IOException {
		try {  
		    URL url = new URL("http://10.17.185.153:8080/services/FSUService");  
		    FSUServiceSoapBindingStub fsuService = new FSUServiceSoapBindingStub(url,new Service());
		    String xmlData = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><Request><PK_Type><Name>GET_ALARM_MODEL</Name><Code>10007</Code></PK_Type><Info><FsuId/><FsuCode/></Info></Request>";
		    String result = fsuService.invoke(xmlData);  
		    System.out.println(result);  
		    
		    Document document = DocumentHelper.parseText(result);
		    Element rootNode  = document.getRootElement();
		    Element pk  = rootNode.element("PK_Type");
		    Element name   = pk.element("Name");
		    System.out.println(pk.attributeCount());
		    //listNodes(name);
		    System.out.println(name.getText());
		} catch (Exception e) {  
			e.printStackTrace();
			System.out.println(e.getMessage());
		}
	}
	
	//遍历当前节点下的所有节点  
    public static void listNodes(Element node){  
        System.out.println("当前节点的名称：" + node.getName());  
        //首先获取当前节点的所有属性节点  
        List<Attribute> list = node.attributes();  
        //遍历属性节点  
        for(Attribute attribute : list){  
            System.out.println("属性"+attribute.getName() +":" + attribute.getValue());  
        }  
        //如果当前节点内容不为空，则输出  
        if(!(node.getTextTrim().equals(""))){  
             System.out.println( node.getName() + "：" + node.getText());    
        }  
        //同时迭代当前节点下面的所有子节点  
        //使用递归  
        Iterator<Element> iterator = node.elementIterator();  
        while(iterator.hasNext()){  
            Element e = iterator.next();  
            listNodes(e);  
        }  
    }  
}
