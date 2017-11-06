package com.gosun.sas.utils;

/**
 * 随机生成数工具类
 * @author Abe
 *
 */
public class RandomUtils {
    /**
     * 随机生成数据
     * @param min 最大数
     * @param max 最小数
     * @return
     */
    public static int generate(int min,int max){
        return min + (int)(Math.random() * ((max - min) + 1));
    }
}
