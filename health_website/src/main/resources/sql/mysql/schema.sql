
CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `loginName` varchar(45) DEFAULT NULL,
  `userName` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8$$

--创建示例脚本语句
CREATE TABLE `task` (
  `id` int(11) NOT NULL,
  `title` varchar(45) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id_pk_idx` (`user_id`),
  CONSTRAINT `user_id_pk` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8$$

--开始创建Gsui demo脚本语句
SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_gsui_department
-- ----------------------------
DROP TABLE IF EXISTS `t_gsui_department`;
CREATE TABLE `t_gsui_department` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent` int(11) DEFAULT NULL,
  `path` varchar(255) DEFAULT NULL,
  `text` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_gsui_department
-- ----------------------------
INSERT INTO `t_gsui_department` VALUES ('1', '0', '/0/1', '广东');
INSERT INTO `t_gsui_department` VALUES ('2', '0', '/0/2', '湖北');
INSERT INTO `t_gsui_department` VALUES ('3', '0', '/0/3', '湖南');
INSERT INTO `t_gsui_department` VALUES ('4', '0', '/0/4', '广西');
INSERT INTO `t_gsui_department` VALUES ('5', '0', '/0/5', '海南');
INSERT INTO `t_gsui_department` VALUES ('6', '0', '/0/6', '四川');
INSERT INTO `t_gsui_department` VALUES ('7', '1', '/0/1/7', '广州');
INSERT INTO `t_gsui_department` VALUES ('8', '1', '/0/1/8', '深圳');
INSERT INTO `t_gsui_department` VALUES ('9', '1', '/0/1/9', '珠海');
INSERT INTO `t_gsui_department` VALUES ('10', '1', '/0/1/10', '汕头');
INSERT INTO `t_gsui_department` VALUES ('11', '1', '/0/1/11', '佛山');
INSERT INTO `t_gsui_department` VALUES ('12', '1', '/0/1/12', '湛江');
INSERT INTO `t_gsui_department` VALUES ('13', '1', '/0/1/13', '茂名');
INSERT INTO `t_gsui_department` VALUES ('14', '4', '/0/4/14', '南宁');
INSERT INTO `t_gsui_department` VALUES ('15', '4', '/0/4/15', '柳州');
INSERT INTO `t_gsui_department` VALUES ('16', '4', '/0/4/16', '桂林');
INSERT INTO `t_gsui_department` VALUES ('17', '4', '/0/4/17', '梧州');
INSERT INTO `t_gsui_department` VALUES ('18', '4', '/0/4/18', '北海');
INSERT INTO `t_gsui_department` VALUES ('19', '7', '/0/1/7/19', '天河区');
INSERT INTO `t_gsui_department` VALUES ('20', '7', '/0/1/7/20', '越秀区');
INSERT INTO `t_gsui_department` VALUES ('21', '7', '/0/1/7/21', '白云区');
INSERT INTO `t_gsui_department` VALUES ('22', '7', '/0/1/7/22', '海珠区');
INSERT INTO `t_gsui_department` VALUES ('23', '7', '/0/1/7/23', '番禺区');
INSERT INTO `t_gsui_department` VALUES ('24', '7', '/0/1/7/24', '萝岗区');

-- ----------------------------
-- Table structure for t_gsui_user
-- ----------------------------
DROP TABLE IF EXISTS `t_gsui_user`;
CREATE TABLE `t_gsui_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `memo` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_gsui_user
-- ----------------------------
INSERT INTO `t_gsui_user` VALUES ('2', 'name', '10', 'test');
INSERT INTO `t_gsui_user` VALUES ('3', 'czm', '23', 'chenzhiming');
INSERT INTO `t_gsui_user` VALUES ('4', 'aaa', '3333', 'aaa');
INSERT INTO `t_gsui_user` VALUES ('5', 'test', '33', 'test');

--结束创建Gsui demo脚本语句