/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package v2.service.generic.sharing;

import v2.service.generic.sharing.utils.HashUtil;

/**
 *
 * @author root
 */
public class PublicURLTest {
    public static void main(String[] args) {
        String keyString = HashUtil.genPublicUrlHash("NOTEBOOK", "NO_RETURN", System.currentTimeMillis());
        System.out.println("key is:"+keyString);
    }
}
