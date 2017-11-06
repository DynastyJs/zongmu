package com.gosun.sas.utils;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

/**
 * 图片转换类
 * 将图片转换成十六进制字符串，在程序中将十六进制字符串转换成图片
 * @author Abe
 *
 */
public class ImageUtils {
    
    /**
     * 根据字节流与文件名把字节流保存为文件
     * @param src 字节流
     * @param output 文件名
     */
    public static void saveToImageFile(byte[] src,String output){
          if( src==null || src.length == 0){
              return;
          }
          try{
              File dirPath = new File(output.substring(0, output.lastIndexOf("/") + 1));
              if (!dirPath.exists()) {
                  dirPath.mkdirs();
              }
              File file = new File(output);   
              if(Common.isLinuxOS()){
                  file.setWritable(true, false);  
              }
              FileOutputStream out = new FileOutputStream(file);
              out.write(src);
              out.close();
          }catch(Exception e){
              e.printStackTrace();
          }
    }
    /**
     * 根据字节流与文件名把字节流保存为文件
     * @param src 字节流
     * @param output 文件名
     */
    public static void saveToImageFile(String hexString,String output){
        saveToImageFile(hexStringToBytes(hexString), output);
    }
    
    /**
     * 将图片文件转换成十六进制字符串
     * @param file
     * @return
     */
    public static String imageFileToHexStr(String file){
        try{
            FileInputStream fis = new FileInputStream(file);
            ByteArrayOutputStream bos = new ByteArrayOutputStream();

            byte[] buff = new byte[1024];
            int len = 0;
            while ((len = fis.read(buff)) != -1) {
                bos.write(buff, 0, len);
            }
            // 得到图片的字节数组
            byte[] result = bos.toByteArray();

            // 字节数组转成十六进制
            return byte2HexStr(result);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "";
    }

    /**
     * 将十六进制字符串转换成字节输出流
     * @param src
     * @return
     */
    public static ByteArrayOutputStream strToOutStream(String src) {
        if (src == null || src.length() == 0) {
            return null;
        }
        ByteArrayOutputStream out=new ByteArrayOutputStream();
        try {
            byte[] bytes = src.getBytes();
            for (int i = 0; i < bytes.length; i += 2) {
                out.write(charToInt(bytes[i]) * 16 + charToInt(bytes[i + 1]));
            }
            out.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return out;
    }
    /**
     * 把16进制的文本流转换为字节流
     * @param hexString
     * @return
     */
    public static byte[] hexStringToBytes(String hexString) {  
        if (hexString == null || hexString.equals("")) {  
            return null;  
        }  
        hexString = hexString.toUpperCase();  
        int length = hexString.length() / 2;  
        char[] hexChars = hexString.toCharArray();  
        byte[] d = new byte[length];  
        for (int i = 0; i < length; i++) {  
            int pos = i * 2;  
            d[i] = (byte) (charToByte(hexChars[pos]) << 4 | charToByte(hexChars[pos + 1]));  
        }  
        return d;  
    }  
    
    public static byte charToByte(char c) {  
        return (byte) "0123456789ABCDEF".indexOf(c);  
    } 

    /**
     * 将十六进制字符串转换成字节输入流
     * @param src
     * @return
     */
    public static ByteArrayInputStream strToInStream(String src) {
        if (src == null || src.length() == 0) {
            return null;
        }
        ByteArrayInputStream input = new ByteArrayInputStream(strToOutStream(src).toByteArray());
        try {
            input.close();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return input;
    }

    /*
     * 实现字节数组向十六进制的转换方法一
     */
    private static String byte2HexStr(byte[] src) {
        StringBuilder stringBuilder = new StringBuilder("");  
        if (src == null || src.length <= 0) {  
            return null;  
        }  
        for (int i = 0; i < src.length; i++) {  
            int v = src[i] & 0xFF;  
            String hv = Integer.toHexString(v);  
            if (hv.length() < 2) {  
                stringBuilder.append(0);  
            }  
            stringBuilder.append(hv);  
        }  
        return stringBuilder.toString(); 
    }

    private static int charToInt(byte ch) {
        int val = 0;
        if (ch >= 0x30 && ch <= 0x39) {
            val = ch - 0x30;
        } else if (ch >= 0x41 && ch <= 0x46) {
            val = ch - 0x41 + 10;
        }
        return val;
    }
}