package com.gosun.core.qpid;
import org.apache.qpid.client.AMQDestination;
import org.springframework.stereotype.Service;

@Service
public class ProducerServiceImpl implements ProducerService {
	
	/*@Autowired
	  private JmsTemplate jmsTemplate;
     */
	public void sendMessage(AMQDestination destination, final String message) {
		/*jmsTemplate.send(destination, new MessageCreator() {
			
			public Message createMessage(Session session) throws JMSException {
				TextMessage textMessage = session.createTextMessage(message);
				return textMessage;
			}
		});*/
	}

}
