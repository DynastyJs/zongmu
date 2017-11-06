package com.gosun.extend;

import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

public class CheckSessionTimeoutProcessorImpl implements HandlerInterceptor {
	@Autowired
	private HttpServletRequest request;

	@Override
	public void afterCompletion(HttpServletRequest arg0,
			HttpServletResponse arg1, Object arg2, Exception arg3)
			throws Exception {
		// TODO Auto-generated method stub

	}

	@Override
	public void postHandle(HttpServletRequest arg0, HttpServletResponse arg1,
			Object arg2, ModelAndView arg3) throws Exception {
		// TODO Auto-generated method stub

	}

	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		String accountName = request.getRemoteUser();
		if (accountName != null) {
			return true;
		} else {
//			response.sendRedirect("/security/login/sysCenterMain.html");
			PrintWriter out = response.getWriter();
			out.println("<html>");
			out.println("<script>");
			out.println("window.open ('/security/login/sysCenterMain.html','_top')");
			out.println("</script>");
			out.println("</html>");
		}

		return false;
	}
}
