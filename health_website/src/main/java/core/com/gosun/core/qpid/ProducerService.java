package com.gosun.core.qpid;

import org.apache.qpid.client.AMQDestination;

public interface ProducerService {
	public void sendMessage(AMQDestination destination, final String message);
}
