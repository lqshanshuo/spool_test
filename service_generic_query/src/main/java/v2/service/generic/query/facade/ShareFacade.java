/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package v2.service.generic.query.facade;

import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import v2.service.generic.query.entity.Share;

/**
 *
 * @author lqshanshuo
 */
@Stateless
public class ShareFacade extends AbstractFacade<Share> {

    @PersistenceContext(unitName = "queryPU")
    private EntityManager em;

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    public ShareFacade() {
        super(Share.class);
    }

    public void create(Share sharePOJO) {
        em.persist(sharePOJO);
    }

    public Share fetch(String token) {
        List<Share> list = em.createQuery("SELECT s FROM Share s WHERE s.token = :token AND s.deleted = FALSE")
                .setParameter("token", token)
                .getResultList();
        if(list.size()==1){
            return list.get(0);
        }
        return null;
    }
}
