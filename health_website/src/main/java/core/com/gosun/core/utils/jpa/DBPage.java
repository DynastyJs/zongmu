package com.gosun.core.utils.jpa;

import java.io.Serializable;
import java.util.ArrayList;

/**
 * 分页Page
 * @author lwh
 *
 */
public class DBPage implements Serializable{
	
	private static int DEFAULT_PAGE_SIZE = 20;
	
	private Object result;
	
	private int size = DEFAULT_PAGE_SIZE;
	
	private int start;
	
	private int total;
	
	  public static int getPageNo(int startIndex, int size)
	  {
	    return startIndex % size == 0 ? startIndex / size : startIndex / size + 1;
	  }
	
	  protected static int getStartOfPage(int pageNo)
	  {
	    return getStartOfPage(pageNo, DEFAULT_PAGE_SIZE);
	  }
	
	  public static int getStartOfPage(int pageNo, int size)
	  {
	    return (pageNo - 1) * size;
	  }
	
	  public DBPage()
	  {
	    this(0, 0, DEFAULT_PAGE_SIZE, new ArrayList());
	  }
	
	  public DBPage(int start, int total, int size, Object result)
	  {
	    this.start = start;
	    this.total = total;
	    this.size = size;
	    this.result = result;
	  }
	
	  public int getCurrent() {
	    return this.start;
	  }
	
	  public int getCurrentPageNo()
	  {
	    return this.start / this.size + 1;
	  }
	
	  public int getPages()
	  {
	    if (this.total % this.size == 0) {
	      return this.total / this.size;
	    }
	    return this.total / this.size + 1;
	  }
	
	  public Object getResult() {
	    return this.result;
	  }
	
	  public int getSize() {
	    return this.size;
	  }
	
	  public int getStart() {
	    return this.start;
	  }
	
	  public int getTotal() {
	    return this.total;
	  }
	
	  public boolean hasNextPage()
	  {
	    return getCurrentPageNo() < getPages() - 1;
	  }
	
	  public boolean hasPreviousPage()
	  {
	    return getCurrentPageNo() > 1;
	  }
	
	  public void setCurrent(int start) {
	    this.start = start;
	  }
	
	  public void setResult(Object result) {
	    this.result = result;
	  }
	
	  public void setSize(int size) {
	    this.size = size;
	  }
	
	  public void setStart(int start) {
	    this.start = start;
	  }
	
	  public void setTotal(int total) {
	    this.total = total;
	  }
	
}
