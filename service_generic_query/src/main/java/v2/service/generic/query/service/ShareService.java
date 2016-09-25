/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package v2.service.generic.query.service;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import v2.service.generic.query.entity.Share;
import v2.service.generic.query.facade.ShareFacade;
import v2.service.generic.sharing.utils.HashUtil;

/**
 *
 * @author lqshanshuo
 */
@Stateless
public class ShareService {
    @EJB
    private ShareFacade shareFacade;
    public String generate(Share sharePOJO){
        String uniqueKey = ""+System.currentTimeMillis();
        String token = HashUtil.genPublicUrlHash("", uniqueKey, System.currentTimeMillis());
        //判断一下数据库中没有该token是更好的,不过token由两个时间戳生成,重复概率极低
        sharePOJO.setToken(token);
        sharePOJO.setDeleted(Boolean.FALSE);
        sharePOJO.setTag("SHARE");
        shareFacade.create(sharePOJO);
        return token;
    }
    public Share fetch(String token){
        Share share = shareFacade.fetch(token);
        return share;
    }
}
