package com.gosun.core.persistence;

import java.util.Collection;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaBuilder.In;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import jxl.write.DateTime;

import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;

import com.google.common.collect.Lists;
import com.gosun.core.utils.Collections3;
import com.gosun.core.utils.date.DateTimeUtils;

/**
 * 
 * @ClassName: DynamicSpecifications
 * @Description: 动态设置查询条件
 * @author lwh
 * @date 2015-6-25 下午1:34:56
 *
 */
public class DynamicSpecifications {
    public static <T> Specification<T> bySearchFilter(final Collection<SearchFilter> filters, final Class<T> clazz) {
        return new Specification<T>() {
            
            public Predicate toPredicate(Root<T> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
                if (Collections3.isNotEmpty(filters)) {

                    List<Predicate> predicates = Lists.newArrayList();
                    for (SearchFilter filter : filters) {
                        // nested path translate, 如Task的名为"user.name"的filedName, 转换为Task.user.name属性
                        String[] names = StringUtils.split(filter.fieldName, ".");
                        if(filter.operator.name().equals("OR")){
                        	String str1[] = names[0].split("#");
                        	Path expression1 = null;
                        	Path expression2 = null;
                        	Path expression3 = null;
                        	Path expression4 = null;
                        	expression1 = root.get(str1[0]);
                        	expression2 = root.get(str1[1]);
                        	if(str1.length==2){                        	
                            	predicates.add(    									
        								builder.or(
        										builder.equal(expression1, filter.value),
        										builder.equal(expression2, filter.value))
        								);
                                    	break;
                        	 }else if(str1.length==4){
                            	expression3 = root.get(str1[2]);
                            	expression4 = root.get(str1[3]);
                            	predicates.add(   									
        								builder.or(
        									builder.or(
        										builder.like(expression1, "%" + filter.value
        												+ "%"),
        										builder.like(expression2, "%"
        												+ filter.value + "%")), 
        									builder.or(
        										builder.like(expression3, "%"
        												+ filter.value + "%"),
        										builder.like(expression4, "%"
        												+ filter.value + "%"))
        								));
                                    	break;
                        	 }
							
                        }
                        Path expression = root.get(names[0]);
                        for (int i = 1; i < names.length; i++) {
                            expression = expression.get(names[i]);
                        }

                        // logic operator
                        switch (filter.operator) {
                        case EQ:
                            predicates.add(builder.equal(expression, filter.value));
                            break;
                        case LIKE:
                            predicates.add(builder.like(expression, "%" + filter.value + "%"));
                            break;
                        case ORGLIKE:
                            predicates.add(builder.like(expression,"%#" + filter.value + "#%"));
                            break;
                        case GT:
                            predicates.add(builder.greaterThan(expression, (Comparable) filter.value));
                            break;
                        case LT:
                            predicates.add(builder.lessThan(expression, (Comparable) filter.value));
                            break;
                        case GTE:
                            predicates.add(builder.greaterThanOrEqualTo(expression, (Comparable) filter.value));
                            break;
                        case LTE:
                            predicates.add(builder.lessThanOrEqualTo(expression, (Comparable) filter.value));
                            break;
                        case GE:
                            predicates.add(builder.greaterThanOrEqualTo(expression, new java.sql.Timestamp(DateTimeUtils.convertDateStringToDate(filter.value.toString()).getTime())));
                            break;
                        case LE:
                            predicates.add(builder.lessThanOrEqualTo(expression, new java.sql.Timestamp(DateTimeUtils.convertDateStringToDate(filter.value.toString()).getTime())));
                            break;
                        case IN:
                        	String str[]= filter.value.toString().split(",");
                        	In in = builder.in(expression); 
                        	 for(String o:str){ 
                                  in.value(o); 
                             } 
                            predicates.add(in);
                            break;
                        case ISNULLOR:
                        	predicates.add(builder.or(builder.isNull(expression),builder.equal(expression, filter.value))); 
                        	break;
                        case NOTEQ:
                        	predicates.add(builder.notEqual(expression, filter.value)); 
                        	break;
                        
                    	case ISNOTNULL:
                    		predicates.add(builder.isNotNull(expression)); 
                    		break;
        
                  		case ISNULL:
	                		predicates.add(builder.isNull(expression)); 
	                		break;
	                    }
                        	
                    }

                    // 将所有条件用 and 联合起来
                    if (predicates.size() > 0) {
                        return builder.and(predicates.toArray(new Predicate[predicates.size()]));
                    }
                }

                return builder.conjunction();
            }
        };
    }
}
